module.exports =
{
    commands: 'ping',
    expectedArgs: '',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) =>
    {
        message.channel.send('Pong!');
    },
    permissions: [],
    requiredRoles: [],
}