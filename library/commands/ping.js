const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Responds with the latency of the bot.')
  .toJSON(),
  execute: async interaction => interaction.reply({ content: `Pong! Latency is ${interaction.client.ws.ping}ms.` })
};