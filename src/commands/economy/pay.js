const economy = require('../../mongodb/economy.js');
const Commando = require('discord.js-commando')

module.exports = class PayCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'pay',
            aliases: [],
            group: 'economy',
            memberName: 'pay',
            description: 'pay a user',
            argsType: 'multiple',
            argsCount: 2,
            userPermissions: [],
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

        const { guild, member } = message;

        const target = message.mentions.users.first();
        if(!target)
        {
            message.reply('please use the appropriate arguments!');
            return;
        }

        const coinsToGive = args[1];
        if(isNaN(coinsToGive) || coinsToGive < 0)
        {
            message.reply('please use the appropriate arguments!');
            return;
        }

        const coinsOwned = await economy.getCoins(guild.id, member.id);
        if(coinsOwned < coinsToGive)
        {
            message.reply(`you do not have ${coinsToGive} paasta!`);
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

        message.reply(`you have given <@${target.id}> ${coinsToGive} paasta! They now have ${newBalance} paasta, and you have ${remainingCoins} paasta!`);
    }
};