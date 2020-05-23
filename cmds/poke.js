const nfetch = require("node-fetch");
module.exports = {
    run: function (djs, m, args) {
        if(m.mentions.members.size < 1)
            return m.channel.send("Who did you say you were going to poke? (You need to mention the user you want to poke)");
        if(m.mentions.members.size > 1)
            return m.channel.send("Adorable. Swift hates adorable thing (Mention only one user to poke)");
        let u = m.guild.member(m.mentions.members.first());
        nfetch("https://nekos.life/api/v2/img/poke", {
            method: 'GET'
        })
        .then(res => res.json())
        .then(json => {
            if(m.mentions.members.first() === m.guild.me) {
                m.channel.send(`I'll pass ${m.author.username}. :)`);
            } else {
                m.channel.send(`${m.author.username} poked ${u}. Yikes.`, {
                embed: {
                    image: {
                        url: json.url
                    }
                }
            });

            }
        });
    },
    help: {
        name: "poke"
    }
};