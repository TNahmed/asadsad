const Discord = require("discord.js")
const db = require("quick.db")
const fs = require('fs')
const yaml = require("js-yaml");
const { mainprefix , token } = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
    name: "uptime",
    description: "Show bot stats",
    run: async (client, message, args) => {
  let args2 = args[0]
  let prefix = await db.get(`prefix_${message.guild.id}`);
  if(prefix === null) prefix = mainprefix;
  let wrongusage = new Discord.MessageEmbed()
  .setTitle(`** Wrong Usage**`)
  .setDescription(`Exmaple: ${prefix}uptime (Project Link)`)
 if(!args2) return message.channel.send(`** WRONG USAGE**\n${prefix}uptime (Project Link)`);
 if (!args2.toLowerCase().startsWith('http://')) return message.channel.send('URL must starts with "http://".');

 if (!args2.toLowerCase().endsWith('.glitch.me')) return message.channel.send('URL must end with ".glitch.me".');
 let database = db.get(`projects_${message.author.id}`)

 if(database && database.find(x => x.project === args2)) return message.channel.send(":x: This is already Uptimed Project.")
 const checks = db.fetch(`projects_${message.author.id}`)
 console.log(checks)
 const log = {
   project: args2
 }
 db.push(`projects_${message.author.id}`, log) 
 db.push("DarkUpTime", { url: args2})
 return message.channel.send(`${args2} It's Hosted now`)

}
}