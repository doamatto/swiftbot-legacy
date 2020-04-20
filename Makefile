BINARY_NAME=swiftbot
BINARY_UNIX=$(BINARY_NAME)_unix

deps:
		go github.com/bwmarrin/discordgo

build:
		go -o $(BINARY_NAME) -v

test:
		go -v ./...

clean:
		go
		rm -f $(BINARY_NAME)
		rm -f $(BINARY_UNIX)