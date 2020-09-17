const Discord = require("discord.js")
const db = require("quick.db")
const fs = require('fs')
const yaml = require("js-yaml");
const { re } = require("mathjs");// made byy darkboy
const { mainprefix , token } = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
    name: "total",
    description: "total glitch projects",
    run: async (client, message, args) => {

    message.channel.send(`${db.get("DarkUpTime").length} uptimed project`)
    }
}