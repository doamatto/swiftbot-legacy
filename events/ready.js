const conf = require("../config.json");
const scheduler = require("node-schedule");
const wait = require("util").promisify(setTimeout);

module.exports.run = (djs) => {
    wait(1000);
    
    console.log(`Logged in as ${djs.user.username}`);
    djs.user.setActivity(`${conf.prefix}help | ${djs.guilds.size} servers`);
    console.log("Presence Changed Successfully.");
    scheduler.scheduleJob("*/15 * * * *", function() {
        djs.user.setActivity(`${conf.prefix}help | ${djs.guilds.size} servers`);
    });
    console.log("Presence Scheduler enabled.");
    console.log("-------");
};