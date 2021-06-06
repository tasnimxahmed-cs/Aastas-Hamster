const economy = require('../../mongodb/economy.js');
const Commando = require('discord.js-commando')

module.exports = class AddBalanceCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'addbalance',
            aliases: ['addbal'],
            group: 'economy',
            memberName: 'addbalance',
            description: 'add paasta to balance',
            argsType: 'multiple',
            argsCount: 2,
            userPermissions: ['ADMINISTRATOR'],
            ownerOnly: false,
        });
    };

    async run(message, args)
    {
        if(args.length !== 2)
        {
            message.reply('please use the appropriate arguments!');
            return;
        }

        const mention = message.mentions.users.first();

        if(!mention)
        {
            message.reply('please use the appropriate arguments!');
            return;
        }

        const coins = args[1];
        if(isNaN(coins))
        {
            message.reply('please use the appropriate arguments!');
            return;
        }

        const guildId = message.guild.id;
        const userId = mention.id;

        const newCoins = await economy.addCoins(guildId, userId, coins);

        message.reply(`you have given <@${userId}> ${coins} paasta; they now have ${newCoins} paasta!`);
    }
};