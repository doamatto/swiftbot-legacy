const nfetch = require("node-fetch");
module.exports = {
  run: function (djs, m, args) {
    if(!m.channel.nsfw) {
      return m.channel.send("To use this command, you need to run it in a channel marked as 'NSFW.'");
    }
    nfetch("https://nekos.life/api/v2/img/Random_hentai_gif", {
      method: 'GET'
    }).then(res => res.json()).then(json => {
      m.channel.send(`Don't beat your meat too hard, mkay?`, {
        embed: {
          image: { url: json.url }
        }
      });
    }).on("error", (err) => {
      console.error(`Fatal error when fetching hentai. Here's the error: ${err}`);
      return m.channel.send(`Something went wrong. Go to https://github.com/doamatto/swiftbot/issues and report this bug. Make sure to mention the following: ${err}`)
    });
  },
  help: {
      name: "hentai"
  }
};