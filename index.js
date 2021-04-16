require("dotenv").config();

const Discord = require("discord.js"),
      client = new Discord.Client(),
      axios = require("axios").default.create({
          headers: {
              authorization: `BOT ${process.env.TOKEN}`,
          },
          baseURL: "https://discord.com/api/v8",
      });

/**
 * @type {object} Holds all the IDs used for the bot
 */
const roles = {
    needsPassword: "831920421485543514",
    onDuty: "831911359465259009",
};

/**
 * @type {object} Holds all the setTimeout instances
 */
const timers = {},
      serverId = "711423679371804755";

// Monitor

function hour(time) {
    //     hour * m  * s  * ms
    return time * 60 * 60 * 100;
}

require("axios").default.post(process.env.MONITOR);
const monitor = setInterval(() => {
    require("axios").default.post(process.env.MONITOR);
}, 300000);

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    if (newMember.roles.cache.has(roles.onDuty) && roles[newMember.id]) {
        // logged in
        console.log(`${newMember.nickname} logged in! Now starting 1 hour timer`);
        timers[newMember.id] = setTimeout(async () => {
            const current = await axios.get(`/guilds/${serverId}/members/${newMember.id}`);

            axios.patch(`/guilds/${serverId}/members/${newMember.id}`, {
                roles: current.roles.filter((value, index, array) => value !== roles.onDuty), // filter out the on duty role
            });
            console.log(`Removed ${current.nick}'s login status!`);
        }, hour(1));
    } else if (newMember.roles.cache.has(roles.needsPassword)) {
        // already logged out
        console.log(`${newMember.nickname} logged out! Cancelling their 1 hour timer.`);
        clearTimeout(timers[newMember.id]);
        timers[newMember.id] = null;
    }
});

client.once("ready", () => {
    console.log("Ready!");
});

client.login(process.env.TOKEN);