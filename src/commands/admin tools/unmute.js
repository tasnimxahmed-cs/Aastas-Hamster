const { redis, redisKeyPrefix } = require('../../bot.js');
const Commando = require('discord.js-commando')

module.exports = class UnmuteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            aliases: [],
            group: 'admin tools',
            memberName: 'unmute',
            description: 'unmute a user',
            argsType: 'single',
            argsCount: 1,
            userPermissions: ['MANAGE_ROLES'],
            ownerOnly: false,
        });
    };

    async run(message, args)
    {
        if(args.includes(' '))
        {
            message.reply('please use the appropriate syntax!');
            return;
        }

        const target = message.mentions.users.first();
        if(!target)
        {
            message.reply('please use the appropriate syntax!');
            return;
        }

        const mutedRole = message.guild.roles.cache.find(role => role.name === 'muted')

        const redisClient = await redis();
        try
        {
            redisClient.del(`${redisKeyPrefix}${target.id}-${message.guild.id}`);
            message.guild.members.cache.get(target.id).roles.remove(mutedRole);
            message.reply(`unmuted <@${target.id}>.`);
        }
        finally
        {
            redisClient.quit();
        }
    }
};