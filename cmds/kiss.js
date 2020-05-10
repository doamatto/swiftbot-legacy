const nfetch = require("node-fetch");
module.exports = {
    run: function (djs, m, args) {
        if(m.mentions.members.size < 1)
            return m.channel.send("Who did you say you were going to kiss? (You need to mention the user you want to kiss)");
        if(m.mentions.members.size > 1)
            return m.channel.send("You're such a great Care Bear. Unfortunately, Swift isn't. (Mention only one user to kiss)");
        let u = m.guild.member(m.mentions.members.first());
        nfetch("https://nekos.life/api/kiss", {
            method: 'GET'
        })
        .then(res => res.json())
        .then(json => {
            if(m.mentions.members.first() === m.guild.me) {
                m.channel.send(`Aww, thanks ${m.author.username}:)`, {
                    embed: {
                        image: {
                            url: json.url
                        }
                    }
                });
            } else {
                m.channel.send(`${m.author.username} kiss ${u}. How sweet.`, {
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
        name: "kiss"
    }
}