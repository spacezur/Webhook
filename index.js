const {Client, Events, GatewayIntentBits, MessageCollector} = require("discord.js")
const client = new Client({
    intents : [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
})

const cache = require("./cache.json")
const config = require("./config.json")

const {readdirSync} = require("fs")
client.commands = new Map()

for (command of readdirSync("./commands")) {
    const file = require(`./commands/${command}`)
    client.commands.set(file.name.toLowerCase(), file)
}

client.once(Events.ClientReady, () => {
	console.log(`Ready! Logged in as ${client.user.tag}`)
    client.user.setActivity({
        name : "spacezus",
        type : "WATCHING"
    })
})

client.on(Events.MessageCreate, async interaction => {
    if (interaction.author.bot && !interaction.webhookId) return
    if (!interaction.webhookId || interaction.channelId != config.channels.command) {
        interaction.delete().catch(() => {})
        return
    }

    const prefix = "-"
    const args = interaction.content.split(/ +/g) //interaction.content.slice(prefix.length).split(/ +/g)
    const command = args.shift().toLowerCase()

    if (client.commands.has(command)) {
        client.commands.get(command).execute(client, interaction, args)
    }

    interaction.delete().catch(() => {})
})

/**
    interaction.channel.messages.cache.map(async message => {
        message.embeds.map(async embeds => {
            if (embeds.data.footer.text == "1234567890") {
                message.delete()
            }
        })
    })
*/

client.login(config.token)