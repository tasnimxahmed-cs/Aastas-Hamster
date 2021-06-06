const economy = require('../../mongodb/economy.js');

module.exports = {
    commands: ['balance', 'bal'],
    maxArgs: 1,
    expectedArgs: "`user`",
    callback: async (message) => {
        const target = message.mentions.users.first() || message.author;
        const targetId = target.id;

        const guildId = message.guild.id;
        const userId = targetId;

        const coins = await economy.getCoins(guildId, userId);
        
        message.channel.send(`That user has ${coins} paasta!`);
    }
};