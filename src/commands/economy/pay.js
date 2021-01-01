const economy = require('../../mongodb/economy.js');

module.exports = {
    commands: 'pay',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '`user` `amount`',
    callback: async (message, arguments, text) => {
        const { guild, member } = message;

        const target = message.mentions.users.first();
        if(!target)
        {
            message.channel.send('Please specify a user to pay.');
            return;
        }

        const coinsToGive = arguments[1];
        if(isNaN(coinsToGive) || coinsToGive < 0)
        {
            message.channel.send('Please provide a valid number of paasta to give.');
            return;
        }

        const coinsOwned = await economy.getCoins(guild.id, member.id);
        if(coinsOwned < coinsToGive)
        {
            message.channel.send(`You do not have ${coinsToGive} paasta!`);
            return;
        }

        const remainingCoins = await economy.addCoins(
            guild.id,
            member.id,
            coinsToGive * -1
        );
        const newBalance = await economy.addCoins(
            guild.id,
            target.id,
            coinsToGive
        );

        message.channel.send(`You have given <@${target.id}> ${coinsToGive} paasta! They now have ${newBalance} paasta, and you have ${remainingCoins} paasta!`);
    }
}