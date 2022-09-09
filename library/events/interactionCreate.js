const { InteractionType } = require('discord.js');

module.exports = async (client, interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand && client.commands.some(cmd => cmd.data.name === interaction.commandName)) client.commands.find(cmd => cmd.data.name === interaction.commandName).execute(interaction);
  if (interaction.type === InteractionType.ModalSubmit && client.commands.find(cmd => cmd.events?.submit[interaction.customId])) return client.commands.find(cmd => cmd.events?.submit[interaction.customId])?.events.submit[interaction.customId](interaction);
};
