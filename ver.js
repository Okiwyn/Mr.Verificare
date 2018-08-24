const token = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});

const prefix = `v!!!`;

bot.on("guildMemberAdd", function(member) {

    let role = member.guild.roles.find("name", "Neverificat");
    member.addRole(role).catch(console.error);

    const joinEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor('Bună!')
    .setDescription('```Bună!\nBine ai venit în Las Vegas Gang!\nEu sunt Mr.Verificare.\n\nEu sunt cel care protejează acest server de boți care crează spam sau de raids.\nAcum, ești un membru neverificat, cea ce înseamnă că nu ai permisiunile să vezi toate canalele.\nDacă vrei să devi verificat fă următorii pași:\n\n1.Intră pe server.\n2.Apasă pe canalul "verificare".\n3.Scrie "vreau sa fiu verificat".\n\nGata! Ești verificat.```')

    member.send(joinEmbed);

});

bot.on("ready", async () => {

  console.log(`${bot.user.username} e pornit.`);
  bot.user.setStatus("dnd");

});

bot.on('message', async message => {

    if(message.content.startsWith('vreau sa fiu verificat') || message.content.startsWith('vreau să fiu verificat')) {
        message.delete();
        
        let role = message.member.guild.roles.find("name", "Neverificat");
        let role2 = message.member.guild.roles.find("name", "Verificat");
        let role3 = message.member.guild.roles.find("name", "Membri");

        message.member.removeRole(role).catch(console.error);
        message.member.addRole(role2).catch(console.error);
        message.member.addRole(role3).catch(console.error);


        }

    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLocaleLowerCase();

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    try {

      delete require.cache[require.resolve(`./comenzi/${cmd}.js`)];

      let commandFile = require(`./comenzi/${cmd}.js`);
      commandFile.run(bot, message, args);


    } catch (e) {
        console.log(e.stack);
    } finally {
      console.log(`${message.author.tag} a folosit comanda '${cmd}'.`);
    }

});

bot.login(process.env.BOT_TOKEN);
