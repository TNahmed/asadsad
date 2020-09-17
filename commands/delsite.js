const Discord = require("discord.js")
const db = require("quick.db")
const fs = require('fs')
const yaml = require("js-yaml");
const { re } = require("mathjs");// made byy darkboy
const { mainprefix , token } = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
    name: "delsite",
    description: "delsite",
    run: async (client, message, args) => {
        let prefix = await db.get(`prefix_${message.guild.id}`);
        if(prefix === null) prefix = mainprefix;
      
        let projectname = args[0]
        if (!projectname) return message.channel.send(`:x: EXMAPLE: ${prefix}delsite {GlitchProjectLink} `);
        let database = db.get(`projects_${message.author.id}`)
        if(database) {
            let data = database.find(x => x.project === projectname)
            if(!data) return message.channel.send(":x: unable to find this link on database")
            let value = database.indexOf(data)
            delete database[value]
            var filter = database.filter(x => {
                return x !== null && x !== ''
            })
            db.set(`projects_${message.author.id}`, filter)
            return message.channel.send(`Deleted the **${projectname}** project from our uptimer`)
        } else {
            return message.channel.send("unable to find command!")

        }
    }
}