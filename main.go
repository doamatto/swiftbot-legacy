package main

import (
	"fmt"
	"io/ioutil"
	"strings"

	dgo "github.com/bwmarrin/discordgo"
)

var (
	conf  *frmwrk.config
	botID string
	bot   *dgo.Session
)

type (
	cmdStruct struct {
		cmd command
	}

	cmdMap map[string]cmdStruct

	cmdHandler struct {
		cmds cmdMap
	}
)

func init() {
	conf = conf.readConf("config.json") // Load Config file
	prefix := conf.prefix               // Set prefix
}

func start() {
	cmdImport()
	bot, err := dgo.New(conf.token) // Start bot
	if err != nil {
		fmt.Println("Couldn't start Discord bot: ", err)
		return
	}

	u, err := bot.User("@me") // Fetch account details
	if err != nil {
		fmt.Println("Couldn't fetch account details: ", err)
		return
	}

	botID = u.ID
	bot.AddHandler(msgHandle) // Activate handler for messages
	// Bot.AddHandler (eventHandle) // Activate handler for events

	err = bot.Open()
	if err != nil {
		fmt.Println("Couldn't start bot:", err)
		return
	}
	fmt.Println("The eagle has landed. Swift is running.")
	<-make(chan struct{})
}

func cmdImport(handler cmdHandler, s *dgo.Session, m *dgo.MessageCreate) {
	cmds, err := ioutil.ReadDir("./cmds")
	if err != nil {
		fmt.Println("Couldn't import commands: ", err)
		return
	}
	for _, cmd := range cmds {
		fmt.Println("Loading command ", cmd.Name())
		cmdstruct := cmdStruct{command: command, help: helpmsg}
		cmdHandler.cmds[name] = cmdstruct
		if len(name) > 1 {
			handler.cmds[name[:1]] = cmdstruct
		}
	}
}

func msgHandle(handler cmdHandler, s *dgo.Session, m *dgo.MessageCreate) {
	content := m.Content
	if !strings.HasPrefix(content, conf.prefix) {
		return
	} // Check if prefix is used; stop if it isn't
	user := m.Author
	if m.Author.ID == botID {
		return
	} // Prevent bot from messaging itself

	args := strings.Fields(content)
	name := strings.ToLower(args[0])
}
