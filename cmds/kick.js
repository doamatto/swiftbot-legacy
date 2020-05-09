module.exports = {
    run: function(djs, m, args) {
        if(!m.member.hasPermission("KICK_MEMBERS")) return m.reply("Swift might be able to kick people, but you can't. (You need the *Kick Members* permission)");
        if(m.mentions.members.size === 0) return m.reply("Swift is many things. A mind reader is not one of them. (You need to mention who to kick)");
        if(!m.guild.me.hasPermission("KICK_MEMBERS")) return m.reply("You might be able to kick people, but Swift can't. (Make sure Swift has the permission *Kick Members*)");

        let member = m.mentions.members.first();
        if(!member.kickable) return m.reply(`Swift might be strong, but ${member.user.tag} is stronger. (This user is either the server owner or has a role above Swift's.)`);
        let reason = args.slice(1).join(" ");
        let kName = member.user.username;
        let kDisc = member.user.discriminator;
        let ker = m.author.tag;

        member.kick(reason).catch(err => {
            m.channel.send(`Swift is strong, just not strong enough. (${err})`);
            return console.error(err);
        });
        if(reason === "" || reason === " ") {
            m.channel.send(`${kName}#${kDisc} was kicked by ${ker} for no rhyme or reason.`);
        } else {
            m.channel.send(`${kName}#${kDisc} was kicked by ${ker} for "${reason}"`);
        }
    },

    help: {
        name: "kick"
    }
};