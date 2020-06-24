const ytdl = require("ytdl-core");
module.exports = {
  run: function (djs, m, args) {
    const vc = message.member.voiceChannel;
    if(!vc)
      return m.channel.send("I can hear the music and you can't. Maybe if we both were in a voice channel that would help you hear it too!");
    vc.join().then(function(con) {
      const stream = ytdl(args[0], { filter: "audioonly" });
      const dispatch = con.playStream(stream, {
        seek: 0,
        volume: 1
      });
      con.on("error", (err) => {
        console.error(`There was an issue with the music functionality of the bot. The error is as follows: ${err}`);
        return m.channel.send(`Seems I can't play music. Report this bug at https://github.com/doamatto/swiftbot/issues. Mention this error: ${err}`);
      });
      dispatch.on("disconnected", () => { vc.leave(); });
    }).catch(err => {
      console.error(`There was an issue connecting to a voice channel. The error is as follows: ${err}`);
      return m.channel.send(`Seems I can't play music. Report this bug at https://github.com/doamatto/swiftbot/issues. Mention this error: ${err}`);
    });
  },
  help: {
      name: "play"
  }
};