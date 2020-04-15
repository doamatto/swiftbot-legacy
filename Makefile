GOCMD=go
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
BINARY_NAME=swiftbot
BINARY_UNIX=$(BINARY_NAME)_unix

deps:
		$(GOGET) github.com/bwmarrin/discordgo

build:
		$(GOBUILD) -o $(BINARY_NAME) -v

test:
		$(GOTEST) -v ./...
		
clean:
		$(GOCLEAN)
		rm -f $(BINARY_NAME)
		rm -f $(BINARY_UNIX)