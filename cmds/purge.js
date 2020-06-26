module.exports = {
  run: function(djs, m, args) {
    if(!m.member.hasPermission("MANAGE_MESSAGES")) {
      return m.reply("Swift might be able to delete messages, but you can't. (You need the *Manage Messages* permission)");
    } // Ensures user has permission to delete messages
    if(!m.guild.me.hasPermission("MANAGE_MESSAGES")) {
      return m.reply("You might be able to delete people, but Swift can't. (Make sure Swift has the permission *Manage Messages*)");
    } // Ensures bot has permission to delete messages
    var dCount;
    if(!args[0]) {
      return m.reply("Swift is many things. A mind reader is not one of them. (You need to give a number of messages to delete)");
    } // If no arguments, then fail
    try {
      dCount = parseInt(args[0], 10);
    } catch(err) {
      return m.reply("Nice try, but that's not a number. (If it is a number, then report this as a bug)");
    } // Ensures number of messages is a number
    if(args[0] % 1 != 0) {
      return m.channel.send("I might be powerful, but there's one thing I can't do. And that's split messages. (When providing a number, make sure it isn't a partial (fraction, decimal, etc)");
    } // Ensures number of messages isn't a decimal

    if(dCount > 100) { // Cap deletes at 100 to keep it fast (I think there's also a ratelimit)
      while(dCount > 100) {
        dCount--;
      }
    } else if(dCount <= 1) {
      return m.channel.send("Okay, now that's just lazy. (Now just do !purge 2, ya lazy bum)");
    } // Also caps at 1 at min because that's just lazy

    m.channel.messages.fetch({limit: dCount}).then(function(list) {
      m.channel.bulkDelete(list)
      .then(msg => {
        m.reply(`Deleted ${msg.size} messages.`);
      })
      .catch(err => {
        m.channel.send(`Swift is strong, just not strong enough. (\`${err}\`)`);
        return console.error(err);
      });
    }).catch(err => {
      m.channel.send(`Swift is strong, just not strong enough. (\`${err}\`)`);
      return console.error(err);
    });
  },

  help: {
    name: "purge"
  }
};