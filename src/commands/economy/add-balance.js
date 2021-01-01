const economy = require('../../mongodb/economy.js');

module.exports = {
    commands: ['addbalance', 'addbal'],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '`user` `amount`',
    permissionError: 'You must be an administrator to use this command.',
    permissions: 'ADMINISTRATOR',
    callback: async (message, arguments) => {
        const mention = message.mentions.users.first();

        if(!mention)
        {
            message.channel.send('Please tag a user to add paasta to.');
            return;
        }

        const coins = arguments[1];
        if(isNaN(coins))
        {
            message.channel.send('Please provide a valid number of paasta.');
            return;
        }

        const guildId = message.guild.id;
        const userId = mention.id;

        const newCoins = await economy.addCoins(guildId, userId, coins);

        message.channel.send(`You have given <@${userId}> ${coins} paasta; They now have ${newCoins} paasta!`);
    }
}