BINARY_NAME=swiftbot
BINARY_UNIX=$(BINARY_NAME)_unix

deps:
		go get github.com/bwmarrin/discordgo

build:
		go build -o $(BINARY_NAME) -v

test:
		go test -v ./...

clean:
		go clean
		rm -f $(BINARY_NAME)
		rm -f $(BINARY_UNIX)