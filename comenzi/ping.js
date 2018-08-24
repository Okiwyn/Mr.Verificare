const Discord = require("discord.js");


exports.run = async(bot, message, args) => {

    const msg = await message.channel.send("`Pinging...`");
    const pingEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor("Ping!")
    .addField("Latency", `${msg.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField("API", `${bot.ping}ms`, true)
    msg.edit(pingEmbed);
}