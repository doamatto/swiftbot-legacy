const discord = require("discord.js");
const fs = require("fs");
const conf = require("./config.json");
const djs = new discord.Client();
djs.cmds = new discord.Collection();

fs.readdir('./events/', (err, files) => {
	if(err) return console.error(err);
	files.forEach(file => {
		let eFunc = require(`./events/${file}`);
		let eName = file.split(".")[0];
		djs.on(eName, (...args) => eFunc.run(djs, ...args));
	});
});

fs.readdir('./cmds', (err, files) => {
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
	if(m.author.bot) return; // If messages comes from a bot then ignore
	if(!m.content.startsWith(conf.prefix)) return; // Only read messages that have the prefix
	let prefix = (conf.prefix); // Set the prefix
	let msgArray = m.content.slice(prefix.length).split(/ +/g); // Split the two halves of the command
	let cmd = msgArray.shift().toLowerCase(); // The command would be before the first space...
	let args = msgArray.slice(1); // ...followed by arguments after the first space

	let cmdFile = djs.cmds.get(cmd) || djs.cmds.find(command => command.help.aliases && command.help.aliases.includes(cmd));
	if(!cmdFile) return;  // If the command doesn't exist, then stop before it starts throwing errors

	console.log(cmdFile);
	if(cmdFile) return cmdFile.run(djs, m, args);
});

djs.login(conf.token);