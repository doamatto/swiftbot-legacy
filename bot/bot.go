package bot

import (
	"fmt"

	"../config"
	"github.com/bwmarrin/discordgo"
)

var (
	botID string
	Bot   *discordgo.Session
)

func Start() {
	Bot, err := discordgo.New("Bot " + config.Token)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	u, err := Bot.User("@me")
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	botID = u.ID
	Bot.AddHandler(messageHandler)

	err = Bot.Open()

	fmt.Println("The eagle has landed. Swift is running.")
}

func messageHandler(s *discordgo.Session, m *discordgo.MessageCreate) {
	if m.Author.ID == botID {
		return
	}

	if m.Content == "ping" {
		_, _ = s.ChannelMessageSend(m.ChannelID, "pong")
	}
}
