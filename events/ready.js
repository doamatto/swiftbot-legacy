const conf = require("../config.json");
const scheduler = require("node-schedule");
const wait = require("util").promisify(setTimeout);

module.exports.run = (djs) => {
    wait(1000);
    
    console.log(`Logged in as ${djs.user.username}`);
    if(djs.guilds.size === undefined) {
        djs.user.setActivity(`${conf.prefix}help`);
    } else {
        djs.user.setActivity(`${conf.prefix}help | ${djs.guilds.size} servers`);
    }
    console.log("Presence Changed Successfully.");
    scheduler.scheduleJob("*/15 * * * *", function() {
        if(djs.guilds.size === undefined) {
            djs.user.setActivity(`${conf.prefix}help`);
        } else {
            djs.user.setActivity(`${conf.prefix}help | ${djs.guilds.size} servers`);
        }
    });
    console.log("Presence Scheduler enabled.");
    console.log("-------");
};