const Discord = require('discord.js');

const config = require('./config.json');

const client = new Discord.Client();

client.login(config.token);

// sets the bot's activity to a random entry from the defined list
function setRandomActivity() {
    // get all activities. extracted into a local variable to possibly later add some statistics to it
    let statuses = config.activities;
    // pick one
    let choice = statuses[Math.floor(Math.random() * statuses.length)];
    // set it!
    console.log(`changing activity to ${choice.name}`)
    client.user.setActivity(choice.name, { type: choice.type });
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    setRandomActivity();

    // sets a timer to change the activity regularly
    setInterval(setRandomActivity, config.activityChangeInterval * 1000);
});


// when a message is received
client.on('message', msg => {
    console.log("Got a new message. Deletable: " + msg.deletable);
    setTimeout(() => {
        if (msg.deletable) {
            msg.delete();
        } else if (!msg.deleted) {
            msg.react('💔');
        }
    }, config.reactionTime * 1000);
});