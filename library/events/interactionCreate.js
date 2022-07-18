const { InteractionType } = require('discord.js');

module.exports = async interaction => {
  if (interaction.type === InteractionType.ApplicationCommand && interaction.client.commands.some(cmd => cmd.data.name === interaction.commandName)) interaction.client.commands.find(cmd => cmd.data.name === interaction.commandName).execute(interaction);
  if (interaction.type === InteractionType.ModalSubmit && interaction.client.commands.find(cmd => cmd.events?.submit[interaction.customId])) return interaction.client.commands.find(cmd => cmd.events?.submit[interaction.customId])?.events.submit[interaction.customId](interaction);
};