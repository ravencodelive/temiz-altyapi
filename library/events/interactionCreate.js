module.exports = interaction => {
  if (interaction.isCommand() && interaction.client.commands.some(cmd => cmd.data.name === interaction.commandName)) interaction.client.commands.find(cmd => cmd.data.name === interaction.commandName).execute(interaction);
};