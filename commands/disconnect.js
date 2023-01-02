const cache = require("../cache.json")
const config = require("../config.json")

module.exports = {
    name : "Disconnect",
    description : "Disconnect account",

    async execute(client, interaction, args) {
        const channel = client.channels.cache.get(config.channels.disconnect)
        
        const embed = new EmbedBuilder()
            .setColor(0x36393e)
            .setAuthor({
                url : `https://www.roblox.com/games/${args[3]}`,
                iconURL : "https://tr.rbxcdn.com/ff5d30b3fb6afbfd6ff40696cfba6f52/352/352/Image/Png",
                name : args[2]
            })
            .setTitle(args[0])
            .setURL(`https://www.roblox.com/users/${args[1]}`)
            .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${args[1]}&width=420&height=420&format=png`)
            .setFooter({
                text : "Disconnected"
            })
            .addFields([
                {
                    name : "Rejoined",
                    value : args[4],
                    inline : true
                },
                {
                    name : "Retried",
                    value : args[5],
                    inline : true
                },
            ])
            .setTimestamp(Date.now())

        if (!cache.disconnect[args[1]]) {
            channel.send(`<@${config.userid}>`).then(message => {
                message.edit({content : "", embeds : [embed]})
                cache.disconnect[args[1]] = message

                setTimeout(function() {
                    message.delete().then(() => {
                        cache.disconnect[args[1]] = null
                    }).catch(() => {})
                }, 30 * (1000 * 60))
            })
        }

        if (cache.connect[args[1]]) {
            cache.connect[args[1]].delete().then(() => {
                cache.connect[args[1]] = null
            }).catch(() => {})
        }
    }
}
