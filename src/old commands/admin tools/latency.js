module.exports =
{
    commands: ['latency', 'lat'],
    expectedArgs: '',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 0,
    maxArgs: null,
    callback: (message, arguments, text) =>
    {
        message.reply('calculating ping...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp;

            resultMessage.edit(`bot latency: ${ping} | api latency: ${message.client.ws.ping}`);
        });
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: [],
}