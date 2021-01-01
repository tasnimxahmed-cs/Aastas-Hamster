module.exports =
{
    commands: 'clear',
    expectedArgs: '',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) =>
    {
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results);
        });
    },
    permissions: 'MANAGE_MESSAGES',
    requiredRoles: [],
}