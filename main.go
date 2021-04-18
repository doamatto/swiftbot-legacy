package main

import (
	"flag"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/bwmarrin/discordgo"
)

var (
	token   string
	version string
	prefix  string = "+"
)

func init() {
	version = "0.1.0"
	flag.StringVar(&token, "t", "", "Discord bot token")
	flag.Parse()
}

func main() {
	dg, err := discordgo.New("Bot " + token)
	if err != nil {
		fmt.Println("There was a problem starting Swift; error connecting to Discord: ", err)
		return
	}

	dg.AddHandler(cmd)

	dg.Identify.Intents = discordgo.MakeIntent(
		discordgo.IntentsGuildMessages |
			discordgo.IntentsGuilds |
			discordgo.IntentsGuildMembers)
	err = dg.Open()
	if err != nil {
		fmt.Println("There was a problem starting Swift; error opening connections: ", err)
	}

	fmt.Println(fmt.Sprintf("We're ready for take off. Swift %s is live.", version))

	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt, os.Kill)
	<-sc
	dg.Close()
}

func cmd(s *discordgo.Session, m *discordgo.MessageCreate) {
	if m.Author.ID == s.State.User.ID {
		return
	}
}
