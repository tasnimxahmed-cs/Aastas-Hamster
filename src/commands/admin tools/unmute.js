const { redis, redisKeyPrefix } = require('../../bot.js');

module.exports =
{
    commands: 'unmute',
    expectedArgs: '`user`',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text) =>
    {
        const target = message.mentions.users.first();

        const mutedRole = message.guild.roles.cache.find(role => role.name === 'muted')

        const redisClient = await redis();
        try
        {
            redisClient.del(`${redisKeyPrefix}${target.id}-${message.guild.id}`);
            message.guild.members.cache.get(target.id).roles.remove(mutedRole);
        }
        finally
        {
            redisClient.quit();
        }
    },
    permissions: 'MANAGE_ROLES',
    requiredRoles: [],
}