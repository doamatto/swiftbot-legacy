module.exports = {
  run: function (djs, m, args) {
    return m.channel.send("Right now, I don't have a proper command list. You can see a list at https://github.com/doamatto/switbot/wiki/Commands, however");
  }, 
  help: {
    name: "help",
    aliases: [ "h", "cmds" ]
  }
};