const nfetch = require("node-fetch");
module.exports = {
    run: function (djs, m, args) {
        if(m.mentions.users.size < 1)
            return m.message.send("Who did you say you were going to hug? (You need to mention the user you want to hug)");
        if(m.mentions.users.size > 1)
            return m.message.send("You're such a great Care Bear. Unfortunately, Swift isn't. (Mention only one user to hug)");
        let u = m.guild.member(m.mentions.users.first());
        nfetch.get("https://nekos.life/api/hug")
        .then(r => {
            m.channel.send(`${message.author.username} hugged ${u}. How sweet.`, {
                embed: {
                    image: {
                        url: r.body.url
                    }
                }
            });
        });
    }
}