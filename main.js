const discord = require("discord.js");
const fs = require("fs");
const conf = require("./config.json");
const djs = new discord.Client();
djs.cmds = new discord.Collection();

fs.readdir("events/", (err, files) => {
	if(err) return console.error(err);
	files.forEach(file => {
		let eFunc = require(`./events/${file}`);
		let eName = file.split(".")[0];
		djs.on(eName, (...args) => eFunc.run(djs, ...args));
	});
});

fs.readdir("cmds/", (err, files) => {
	if(err) return console.error(err);
	let file = files.filter(f => f.split(".").pop() === "js");
	if(file.length <= 0) {
		console.log("No commands found!");
		return;
	}

	file.forEach((f) => {
		let props = require(`./cmds/${f}`);
		djs.cmds.set(props.help.name, props);
		console.log(`${f} was loaded!`);
	});
});

djs.on("message", m => {
	if(m.author.bot) return;
	if(!m.content.startsWith(conf.prefix)) return;
	let prefix = (conf.prefix);
	let msgArray = m.content.split(/ +/g);
	let cmd = msgArray[0];
	let args = msgArray.slice(1);

	let cmdFile = djs.cmds.get(cmd.slice(prefix.length));
	if(cmdFile) return cmdFile.run(djs, m, args);
});

djs.login(conf.token);