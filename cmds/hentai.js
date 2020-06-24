const nfetch = require("node-fetch");
module.exports = {
  run: function (djs, m, args) {
    if(!m.channel.nsfw) {
      return m.channel.send("To use this command, you need to run it in a channel marked as 'NSFW.'");
    }
    nfetch("https://nekos.life/api/v2/img/Random_hentai_gif", {
      method: 'GET'
    })
    .then(res => res.json()).then(json => {
      m.channel.send(`Don't beat your meat too hard, mkay?`, {
        embed: {
          image: { url: json.url }
        }
      });
    });
  },
  help: {
      name: "hentai"
  }
};