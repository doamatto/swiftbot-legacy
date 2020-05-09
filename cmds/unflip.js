module.exports = {
	run: function (djs, m, args) {
		m.channel.send("(╯°□°)╯  ︵  ┻━┻").then(ms => {
			setTimeout(() => {
				ms.edit("(╯°□°)╯    ]").then(mss => {
					setTimeout(() => {
						mss.edit("(°-°)\\ ┬─┬");
					}, 500);
				});
			}, 500);
		});
	},

	help: {
        name: "unflip",
        alias: "uf"
	}
};