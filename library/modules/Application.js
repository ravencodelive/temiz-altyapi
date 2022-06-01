const Discord = require('discord.js');
const fs = require('node:fs');

class Client {
  
  constructor(token) {
    (async () => {
      const client = new Discord.Client({ intents: Object.keys(Discord.Intents.FLAGS) });
      require('discord-modals')(client);
      this.client = client;
      this.client.database = require('quick.db');
      this.client.properties = require('./Application.config.js');
      client.commands = new Discord.Collection();

      await this.handleEvents();
      client.login(token);

      await new Promise(resolve => client.once('ready', () => this.handleCommands().then(resolve)));
    })();
  };

  client() {
    return this.client;
  };

  handleEvents() {
    return new Promise(resolve => {
      const files = fs.readdirSync('./library/events');
      for (const file of files) {
        const event = require(`../events/${file}`);
        const eventName = file.split('.')[0];
        this.client.on(eventName, (...args) => event(...args, this.client));
      };
      return resolve();
    });
  };

  handleCommands() {
    return new Promise(async resolve => {
      console.log('Started refreshing application (/) commands.');
      const files = fs.readdirSync('./library/commands');
      for (const file of files) {
        const command = require(`../commands/${file}`);
        this.client.commands.set(command.data.name, command);
      };
      
      await this.submitCommands();

      console.log('Successfully reloaded application (/) commands.');
      return resolve();
    });
  };

  submitCommands() {
    return new Promise(resolve => {
      const { REST } = require('@discordjs/rest');
      const { Routes } = require('discord-api-types/v9');

      const rest = new REST({ version: '10' }).setToken(this.client.token);
      rest.put(Routes.applicationCommands(this.client.user.id), { body: this.client.commands.map(cmd => cmd.data) }).then(resolve);
    });
  };

};

module.exports = Client;