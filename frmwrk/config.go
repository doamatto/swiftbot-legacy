package frmwrk

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

type configStruct struct {
	token  string `json:"token"`
	prefix string `json:"prefix"`
}

func readConf(filename string) *configStruct {
	body, err := ioutil.ReadFile(filename)
	if err != nil {
		fmt.Println("error loading config,", err)
		return nil
	}
	var conf configStruct
	json.Unmarshal(body, &conf)
	return &conf
}
