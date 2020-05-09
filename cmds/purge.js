module.exports = {
    run: function(m, args) {
        if(!m.member.hasPermission("MANAGE_MESSAGES"))
            return m.reply("Swift might be able to delete messages, but you can't. (You need the *Manage Messages* permission)");
        if(!m.guild.me.hasPermission("MANAGE_MESSAGES"))
            return m.reply("You might be able to ban people, but Swift can't. (Make sure Swift has the permission *Manage Messages*.");

        try {
            var dCount = parseInt(args[0], 10);
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
        const f = m.channel.fetchMessages({limit: dCount});
        m.channel.bulkDelete(f)
        .then(msg => {
            m.reply(`Deleted ${msg.size} messages.`);
        })        
        .catch(err => {
            m.reply("Something went wrong! The Ghost Busters are on the   case!");
            console.error(`Couldn't delete some messages because ${err}`);
        });
    },

    help: {
        name: "purge"
    }
}