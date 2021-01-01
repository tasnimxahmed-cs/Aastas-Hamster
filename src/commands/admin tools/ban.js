module.exports =
{
    commands: 'ban',
    expectedArgs: '`user`',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) =>
    {
        const target = message.mentions.users.first();
        if(target)
        {
            const targetMember = message.guild.members.cache.get(target.id);
            targetMember.ban();
            message.channel.send('They have been banned.');
        }
        else
        {
            message.channel.send(`<@${message.member.id}>, please specify who to ban!`);
        }
    },
    permissions: 'BAN_MEMBERS',
    requiredRoles: [],
}