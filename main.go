package main

import (
	"fmt"

	"./frmwrk"
	dgo "github.com/bwmarrin/discordgo"
)

var (
	conf  *frmwrk.config
	cmd   *frmwrk.CmdHandler
	botID string
	bot   *discordgo.Session
)

func init() {
	conf = frmwrk.readConf("config.json") // Load Config file
	prefix := conf.prefix // Set prefix
}

func start() {
	cmd = frmwrk.cmdHandler() 
	regCommands()
	bot, err := discordgo.New(conf.token) // Start bot
	if err != nil {
		fmt.Println("Couldn't start Discord bot: ", err)
		return
	}

	u, err := bot.User("@me") // Fetch account details
	if err != nil {
		fmt.Println("Couldn't fetch account details: ", err))
		return
	}

	botID = u.ID
	Bot.AddHandler(msgHandle) // Activate handler for messages

	err = bot.Open()
	if err != nil {
		fmt.Println("Couldn't start bot:", err)
		return
	}
	fmt.Println("The eagle has landed. Swift is running.")
	<-make(chan struct{})
}

func msgHandle(s *dgo.Session, m *dgo.MessageCreate) {
	content := m.Content
	user := m.Author
	if m.Author.ID == botID {
		return
	} // Prevent bot from messaging itself

	if len(content) <= len(prefix) { return }
	if content[:len(prefix)] != prefix { return }
	content = content[len(prefix):]
	if len(content) < 1 { return }

	args := strings.Fields(content)
	name := strings.ToLower(args[0])
	cmd, found := cmdHandler.Get(name)

	if !found { return }
}

func regCommands() {
	cmdHandler.Reg("ping", cmd.ping, "First there's a ping, then there's a...")
}