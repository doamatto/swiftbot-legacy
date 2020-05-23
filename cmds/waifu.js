const nfetch = require("node-fetch");
module.exports = {
    run: function (djs, m, args) {
        if(m.mentions.members.size < 1)
            return m.channel.send("Who did you say was your waifu? (You need to mention the user you want to claim as a waifu)");
        if(m.mentions.members.size > 1)
            return m.channel.send("Adorable. Swift hates adorable thing (Mention only one user to claim a waifu)");
        let u = m.guild.member(m.mentions.members.first());
        nfetch("https://nekos.life/api/v2/img/waifu", {
            method: 'GET'
        })
        .then(res => res.json())
        .then(json => {
            if(m.mentions.members.first() === m.guild.me) {
                m.channel.send(`Aww, thanks ${m.author.username} :)`);
            } else {
                m.channel.send(`${u} is ${m.author.username}'s waifu. Yikes.`, {
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
        name: "waifu"
    }
};