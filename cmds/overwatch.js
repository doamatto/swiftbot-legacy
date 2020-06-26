const nfetch = require("node-fetch");
module.exports = {
  run: function (djs, m, args) {
    let region = args[0];
    let tag = args[1];
    region = region.toLowerCase();
    if(region !== "us" || region !== "eu" || region !== "asia") {
      return m.channel.send("That's not a valid region. Make sure the region is either 'us', 'eu', or 'asia'");
    } // Ensures region is supported
    let username = tag.split("#")[0];
    if(username.length < 3 | username.length > 12) {
      return m.channel.send(`That doesn't look like a real username. They should be only 3-12 characters long. It seems your username is at ${username.length} characters.`);
    } // Ensures username abides by Blizzard rules
    let tagAlt = tag.replace("#", "-"); // The API needs this to be a hypen instead
    nfetch(`https://ow-api.com/v1/stats/pc/${region}/${tagAlt}/profile`, { method: 'GET'})
    .then(res => res.json()).then(json => {
      let qpStats = json.quickPlayStats;
      let compStats = json.competitiveStats;
      let level, prestige, rating;
      (function calcPrestiege() {
        if(json.prestige === 0 | json.prestige === undefined) {
          level = `Level ${json.level}`;
        } else {
          prestige = json.prestige * 100; // Each prestige is 100 levels;
          prestige += json.level; // Add the base level to the prestige level count
          level = `Level ${prestige}`;
        }
      });// Calculate prestiges into levels
      (function calcRank() {
        if(json.rating === 0) {
          rating = "Not Ranked";
        } else if(json.rating === 0 && json.level < 25){
          rating = "Can't Play Comp";
        } else {
          if(rating >= 1 <= 1499) {
            rating = `Ranked Bronze at ${json.rating}`;
          } else if(rating >= 1500 <= 1999) {
            rating = `Ranked Siler at ${json.rating}`;
          } else if(rating >= 2000 <= 2999) {
            rating = `Ranked Gold at ${json.rating}`;
          } else if(rating >= 3000 <= 3499) {
            rating = `Ranked Diamond at ${json.rating}`;
          } else if(rating >= 3500 <= 3999) {
            rating = `Ranked Master at ${json.rating}`;
          } else if(rating >= 4000) {
            rating = `Ranked Grandmaster at ${json.rating}`;
          }
        }
      }); // Calcualte comp rank based on rating
      (function ensureComp() {
        if(compStats.eliminationsAvg === undefined) {
          comp = `${username} hasn't played competitive this season yet.`;
        } else {
          comp = `${username} has won ${compStats.games.won} games. They've got an average of ${compStats.eliminationsAvg} elims, an average of ${compStats.damageDoneAvg} hitpoints, and healed an average of ${compStats.healingDoneAvg} healing. ${compMedals}${username} has also earned ${compStats.awards.cards} cards.`;
        }
      }); // Makes sure the user has played comp the current season

      function medalCalc(type) {
        let awards;
        if(type === "comp") {
          awards = qpStats.awards;
        } else if(type === "qp") {
          awards = compStats.awards;
        } else {
          console.error("Fatal flaw (;-;): There is no type provided when using !overwatch for fetching medal priority.");
          return m.channel.send("An ouchie just happened. You can report this bug at https://github.com/doamatto/swiftbot/issues. Make sure to mention: `There was no type provided when using !overwatch fo fetching medal priority");
        }
        if(awards.medals === 0 | awards.medals === undefined) {
          medals = "";
        } else  {
          let mostMedals = Math.max(awards.medalsBronze, awards.medalsSilver, awards.medalsGold);
          let phrase = `In total, they've collected ${awards.medals} medals, with the majority being`;
          if(awards.medalsBronze === mostMedals) {
            if(type === "comp") { compMedals = `${phrase} bronze. `; } else if(type === "qp") { qpMedals = `${phrase} bronze. `; }
          } else if(awards.medalsSilver === mostMedals) {
            if(type === "comp") { compMedals = `${phrase} silver. `; } else if(type === "qp") { qpMedals = `${phrase} silver. `; }
          } else if(awards.medalsGold === mostMedals) {
            if(type === "comp") { compMedals = `${phrase} gold. `; } else if(type === "qp") { qpMedals = `${phrase} gold. `; }
          }
        }
      } // Calculate majority of medals
      medalCalc("qp");
      medalCalc("comp");
      m.channel.send(`Here's ${tag}'s profile`, {
        embed: {
          title: `${tag}'s profile`,
          url: `https://playoverwatch.com/en-us/career/pc/${tagAlt}`,
          footer: { "text": "The data from Ow-Api.com might not be completely accurate. You can click on the profile link to see the most accurate version of the data via PlayOverwatch.com" },
          thumbnail: { url: json.icon },
          author: {
            "name": rating,
            "icon_url": json.ratingIcon
          },
          fields: [
            {
              "name": "Level and Prestige",
              "value": level
            }, {
              "name": "Quick Play Stats",
              "value": `${username} has won ${qpStats.games.won} games. They've got an average of ${qpStats.eliminationsAvg} elims, an average of ${qpStats.damageDoneAvg} hitpoints, and healed an average of ${qpStats.healingDoneAvg}. ${qpMedals}${username} has also earned ${qpStats.awards.cards} cards.`
            }, {
              "name": "Competitive Stats",
              "value": comp
            }
          ]
        }
      });
    });
  },
  help: {
    name: "overwatch"
  }
};