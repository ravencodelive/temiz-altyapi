const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('eval')
  .setDescription('Evaluates code for Bot Developer.')
  .toJSON(),
  execute: async interaction => {
    if (interaction.user.id != interaction.client.properties.developerId) return;
    
    const { Modal, TextInputComponent, showModal } = require('discord-modals');
    const defaultValue = interaction.client.database.get('last-evaluated-code') || '';
    return showModal(new Modal().setCustomId('evulate-code').setTitle('Evulate Code').addComponents(new TextInputComponent().setDefaultValue(defaultValue).setLabel('Code').setCustomId('code').setStyle('LONG').setPlaceholder('Code to evaluate.').setRequired(true)), { client: interaction.client, interaction });
  }
};
