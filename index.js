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