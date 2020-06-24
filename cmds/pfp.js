module.exports = {
    run: function (djs, m, args) {
      let user = m.mentions.members.first();
      if(user == undefined)
        return m.channel.send("You need to tag the person you want to see the profile picture of");
      m.channel.send({
        embed: {
          description: `${user.username} has a pretty dope profile picture. Check it out *[here](${ava})*`,
          image: { url:user.displayAvatarURL }
        }
      });
    },
    help: {
        name: "poke"
    }
};