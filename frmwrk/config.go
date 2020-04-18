package config

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

var (
	token  string
	prefix string

	config *configStruct
)

type configStruct struct {
	token  string `json:"token"`
	prefix string `json:"prefix"`
}

func ReadConfig(filename string) error {
	fmt.Println("Reading config file...")

	file, err := ioutil.ReadFile(filename)

	if err != nil {
		fmt.Println(err.Error())
		return err
	}

	fmt.Println(string(file))

	err = json.Unmarshal(file, &config)

	if err != nil {
		fmt.Println(err.Error())
		return err
	}

	Token = config.Token
	BotPrefix = config.BotPrefix

	return nil
}
