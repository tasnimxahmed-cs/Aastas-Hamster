require('dotenv').config();
const { redis, redisKeyPrefix } = require('../bot.js');

module.exports =
{
    commands: 'mute',
    expectedArgs: '`user` `duration` `unit`',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 3,
    maxArgs: 3,
    callback: async (message, arguments, text) =>
    {
        const syntax = process.env.PREFIX+'mute `user` `duration` `unit(m, h, d, or life)`';

        const duration = arguments[1];
        const durationType = arguments[2];

        if(isNaN(duration))
        {
            message.channel.send('Please provide a number for the duration! '+syntax);
            return;
        }

        const durations =
        {
            m: 60,
            h: 60 * 60,
            d: 60 * 60 * 24,
            life: -1
        }

        if(!durations[durationType])
        {
            message.channel.send('Please provide a valid duration type! ' +syntax);
            return;
        }

        const seconds = duration * durations[durationType];

        const target = message.mentions.users.first();

        if(!target)
        {
            message.channel.send('Please tag a member to mute!');
            return;
        }

        const role = message.guild.roles.cache.find(role => role.name === 'muted')
        if(role)
        {
            message.guild.members.cache.get(target.id).roles.add(role);
        }

        const redisClient = await redis();
        try
        {
            const redisKey = `${redisKeyPrefix}${target.id}-${message.guild.id}`;

            if(seconds > 0)
            {
                redisClient.set(redisKey, 'true', 'EX', seconds);
            }
            else
            {
                redisClient.set(redisKey, 'true');
            }
        }
        finally
        {
            redisClient.quit()
        }
    },
    permissions: 'MANAGE_ROLES',
    requiredRoles: [],
}