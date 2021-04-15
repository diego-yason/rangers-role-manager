require("dotenv").config();

const Discord = require("discord.js"),
      client = new Discord.Client(),
      axios = require("axios").default;

// Monitor
// REMINDME to uncomment this area
/*
axios.post(process.env.MONITOR);
const monitor = setInterval(() => {
    axios.post(process.env.MONITOR);
}, 300000);
*/
client.once("ready", () => {
    console.log("Ready!");
});

client.login(process.env.TOKEN);