const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder } = require('discord.js');
const { inspect } = require('util');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('eval')
  .setDescription('Evaluates code for Bot Developer.')
  .toJSON(),
  execute: async interaction => {
    if (interaction.user.id != interaction.client.properties.developerId) return;

    const row = new ActionRowBuilder().addComponents([new TextInputBuilder()
    .setLabel('Code')
    .setCustomId('code')
    .setValue(interaction.client.database.get('last-evaluated-code') || '')
    .setStyle(2)
    .setPlaceholder('Code to evaluate.')
    .setRequired(true)]);

    return await interaction.showModal(new ModalBuilder().setCustomId('evaluate-code').setTitle('Evaluate Code').addComponents([row]));
  },
  events: {
    submit: { 
      'evaluate-code': async interaction => {
        await interaction.deferReply({ ephemeral: true });
        let code = interaction.fields.getTextInputValue('code');
        await interaction.client.database.set('last-evaluated-code', code);
    
        try {
          const result = await eval(!code.includes('await') ? code : `(async () => { ${code} })()`);
          return interaction.followUp({ content: '```js\n' + inspect(result, { depth: 0 }).slice(0, 1990) + '```' });
        } catch(error) {
          return interaction.followUp({ content: '```js\n' + inspect(error, { depth: 0 }).slice(0, 1990) + '```' });
        };
      }
    }
  }
};
