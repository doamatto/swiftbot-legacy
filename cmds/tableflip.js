module.exports = {
	run: function (djs, m, args) {
		m.channel.send("(°-°)\\ ┬─┬").then(m => {
			setTimeout(() => {
				m.edit("(╯°□°)╯    ]").then(m => {
					setTimeout(() => {
						m.edit("(╯°□°)╯  ︵  ┻━┻");
					}, 500);
				});
			}, 500);
		});
	},

	help: {
        name: "tableflip",
        aliases: [ "tf" ] 
	}
};