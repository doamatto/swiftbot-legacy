module.exports = {
    run: function(djs, m, args) {
        if(!m.member.hasPermission("MANAGE_MESSAGES"))
            return m.reply("Swift might be able to delete messages, but you can't. (You need the *Manage Messages* permission)");
        if(!m.guild.me.hasPermission("MANAGE_MESSAGES"))
            return m.reply("You might be able to delete people, but Swift can't. (Make sure Swift has the permission *Manage Messages*)");

        var dCount;

        try {
            dCount = parseInt(args[0], 10);
        } catch(err) {
            return m.reply("Nice try, but that's not a number. (If it is a number, then report this as a bug)");
        }
        if(!dCount)
            return m.reply("Swift is many things. A mind reader is not one of them. (You need to give a number of messages to delete)");
        if(dCount > 100) { // Cap deletes at 100 to keep it fast (I think there's also a ratelimit)
            while(dCount > 100) {
                dCount--;
            }
        }
        // TODO: Ignore decimals
        const f = m.channel.messages.fetch({limit: dCount})
        .then(function(list) {
            m.channel.bulkDelete(list)
            .then(msg => {
                m.reply(`Deleted ${msg.size} messages.`);
            })        
            .catch(err => {
                m.channel.send(`Swift is strong, just not strong enough. (\`${err}\`)`);
                return console.error(err);
            });
        })
        .catch(err => {
            m.channel.send(`Swift is strong, just not strong enough. (\`${err}\`)`);
            return console.error(err);
        });
    },

    help: {
        name: "purge"
    }
};