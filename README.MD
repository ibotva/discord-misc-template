# `discord-misc-template` :boom:
## Getting started

> :black_square_button: = Done
>
> :white_square_button: = Either in development, or unfinished.

`discord-misc-template` is a template with docs and examples for the library [discord-misc](https://github.com/TobiDMV/discord-misc) <- Link here

<br>
<br>

### Installation :part_alternation_mark:
> run `git clone https://github.com/TobiDMV/discord-misc-template.git ./discord-bot-name`
> 
> then run `cd ./discord-bot-name && npm install`

<br>
<br>

### Todo :dart:
> -  #### :white_square_button: Commands
> > - Create adaptive help command with buttons for scrolling through categories. Add category argument to command object in `discord-misc`
> > - Create basic moderation commands

### Guide

Getting started is relatively easy, after you have installed, go ahead and open `./config.example/json`, it should look like this:
```json
{
    "token": "",
    "blacklisted": [],
    "developers": []
}
```
> If you dont already have a token for your bot, you can get one here. [Discord Developer Portal](https://discord.com/developers/applications), and [here](https://www.writebots.com/discord-bot-token/#:~:text=Generating%20Your%20Token%20Step-by-Step%201%201.%20Go%20to,Add%20Your%20Bot%20to%20a%20Discord%20Server%20) is a guide how to do that.

After youve opened it and added your token, go ahead and throw a string with your user id in the `developers` array.

Now open up `index.js`, it should look like this:
```js
const { Client, IntentsBitField, Events, channelMention } = require("discord.js")
const { ClientManager } = require("discord-misc")
const config = require("./config.example.json")

const client = new Client({
    intents: [ IntentsBitField.Flags.Guilds ]
})

const manager = new ClientManager(client, {
    blacklisted: config.blacklisted,
    developers: config.developers
})

client.on(Events.ClientReady, async () => {
    manager.loadCommands(__dirname, "/commands")
    await manager.publishCommands()

    manager.interactions.pre(async interaction => {
        interaction.testValue = "Pong!!!"
    })

    manager.listen()
})

client.login(config.token)
```

Theres actually not anything to do here, but i am putting it here as a reference for people who want to use the library.

Now, go ahead and make your first command. You can use `ping.js` to write it, or use that as an example and make a new file.

your command should follow this structure, and the execute function ***should always be async, and should always return and accept the interaction object to work with the library***

```js
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping!!!"),

    async execute(interaction) {
        interaction.reply(interaction.testValue)
        return interaction
    }
}
```

To run the program, run `npm start`