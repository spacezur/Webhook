const {Client, Events, GatewayIntentBits} = require('discord.js')
const client = new Client({
    intents : [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages
    ]
})
const {token} = require('./config.json')

client.once(Events.ClientReady, () => {
	console.log(`Ready! Logged in as ${client.user.tag}`)
})

client.on(Events.MessageCreate, async interaction => {
    if (interaction.guild || !interaction.webhookId) {
        interaction.delete()
        return
    }

    if (interaction.channelId == '1058420655579738162') {
        interaction.channel.send('<@628959628780240906>').then(msg => msg.delete())
        setTimeout(function() {
            interaction.delete()
        }, 12 * (1000 * 60 * 60))
    }

    if (interaction.channelId == '1058420590689669131') {
        setTimeout(function() {
            interaction.delete()
        }, 10 * (1000 * 60))
    }
})

client.login(token)
