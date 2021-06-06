const economy = require('../../mongodb/economy.js');
const Commando = require('discord.js-commando')

module.exports = class BalanceCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'balance',
            aliases: ['bal'],
            group: 'economy',
            memberName: 'balance',
            description: 'check balance',
            argsType: 'single',
            argsCount: 1,
            userPermissions: [],
            ownerOnly: false,
        });
    };

    async run(message, args)
    {
        if(args.includes(' '))
        {
            message.reply('please use the appropriate arguments!');
            return;
        }

        const target = message.mentions.users.first() || message.author;
        const targetId = target.id;

        const targetMember = message.guild.members.cache.get(targetId);
        const targetName = targetMember.nickname;

        const guildId = message.guild.id;
        const userId = targetId;

        const coins = await economy.getCoins(guildId, userId);
        
        message.reply(`${targetName} has ${coins} paasta!`);
    }
};