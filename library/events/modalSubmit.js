const { inspect } = require('util');

module.exports = async interaction => {
  if(interaction.customId === 'evulate-code') {
    await interaction.deferReply({ ephemeral: true });
    let code = interaction.getTextInputValue('code');
    await interaction.client.database.set('last-evaluated-code', code);

    try {
      const result = await eval(!code.includes('await') ? code : `(async () => { ${code} })()`);
      return interaction.followUp({ content: '```js\n' + inspect(result, { depth: 0 }).slice(0, 1990) + '```' });
    } catch(error) {
      return interaction.followUp({ content: '```js\n' + inspect(error, { depth: 0 }).slice(0, 1990) + '```' });
    };

  }; 
};
