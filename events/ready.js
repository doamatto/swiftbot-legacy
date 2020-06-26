const conf = require("../config.json");

module.exports.run = (djs) => {
    setTimeout(1000);
    console.log(`Logged in as ${djs.user.username}`);
    if(djs.guilds.size === undefined) {
        djs.user.setActivity(`${conf.prefix}help`);
    } else {
        djs.user.setActivity(`${conf.prefix}help | ${djs.guilds.size} servers`);
    }
    console.log("Presence Changed Successfully.");
    setInterval(() => {
      if(djs.guilds.size === undefined) {
          djs.user.setActivity(`${conf.prefix}help`);
      } else {
          djs.user.setActivity(`${conf.prefix}help | ${djs.guilds.size} servers`);
      }
    }, 15000);
    console.log("Presence Scheduler enabled.");
    console.log("-------");
};