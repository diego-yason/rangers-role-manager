require("dotenv").config();

const Discord = require("discord.js"),
      client = new Discord.Client(),
      axios = require("axios").default.create();

client.once("ready", () => {
    console.log("Ready!");
});

client.login(process.env.TOKEN);