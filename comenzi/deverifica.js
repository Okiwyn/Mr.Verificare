const Discord = require('discord.js');

exports.run = async(bot, message, args) => {
    message.delete();

    let nvRole = message.guild.roles.find(`name`, "Neverificat");
    let vRole = message.guild.roles.find(`name`, "Verificat");
    let mRole = message.guild.roles.find(`name`, "Membri");


    if (message.author.id !== `286893840902914048`) return message.channel.send("❌ Doar Xeavye are voie să folosească această comandă.");

    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("❌ Acest user nu există sau poate nu e în server.").then(msg => msg.delete(5000));
    if(rMember.roles.has(nvRole.id)) return message.reply("❌ Acest user este încă Neverificat.").then(msg => msg.delete(5000));
  
    await(rMember.addRole(nvRole.id));
    await(rMember.removeRole(mRole.id));
    await(rMember.removeRole(vRole.id));
    message.channel.send('✔ Acest user a fost deverificat.').then(msg => msg.delete(5000));
    rMember.send('```Tocmai ce ai fost deverificat de pe serverul las vegas gang.```');

}