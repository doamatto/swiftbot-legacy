module.exports = {
    run: function (djs, m, args) {
      let user = m.mentions.members.first() ? m.mentions.users.first() : m.author;
      let ava = user.displayAvatarURL({
        format: "png",
        dynamic: true
      });
      if(user === m.author) {
        return m.channel.send({
          embed: {
            description: `You've got a pretty dope profile picture. Check it out *[here](${ava})*`,
            thumbnail: { "url": ava }
          }
        });
      } else {
        return m.channel.send({
          embed: {
            description: `${user.username} has a pretty dope profile picture. Check it out *[here](${ava})*`,
            thumbnail: { "url": ava }
          }
        });
      }
    },
    help: {
        name: "pfp"
    }
};