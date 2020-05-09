module.exports = {
    run: function(djs, m, args) {
        if(!m.member.hasPermission("BAN_MEMBERS")) return m.reply("Swift might be able to ban people, but you can't. (You need the *Ban Members* permission)");
        if(m.mentions.members.size === 0) return m.reply("Swift is many things. A mind reader is not one of them. (You need to mention who to ban)");
        if(!m.guild.me.hasPermission("BAN_MEMBERS")) return m.reply("You might be able to ban people, but Swift can't. (Make sure Swift has the permission *Ban Members*)");

        let member = m.mentions.members.first();
        if(!member.bannable) return m.reply(`Swift might be strong, but ${member.user.tag} is stronger. (This user is either the server owner or has a role above Swift's.)`);
        let reason = args.slice(1).join(" ");
        let banName = member.user.username;
        let banDisc = member.user.discriminator;
        let banner = m.author.tag;

        member.ban(reason).catch(err => {
            m.channel.send(`Swift is strong, just not strong enough. (${err})`);
            return console.error(err);
        });
        if(reason === "" || reason === " ") {
            m.channel.send(`${banName}#${banDisc} was banned by ${banner} for no rhyme or reason.`);
        } else {
            m.channel.send(`${banName}#${banDisc} was banned by ${banner} for "${reason}"`);
        }
    },

    help: {
        name: "ban"
    }
};