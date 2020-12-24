const { client } = require('../bot.js');

module.exports =
{
    commands: 'status',
    expectedArgs: '`availability` `activity` `message`',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 3,
    maxArgs: null,
    callback: (message, arguments, text) =>
    {
        var stat = arguments[2];
        for(i=3; i<arguments.length; i++)
        {
            stat += ' '+arguments[i];
        }
        client.user.setPresence({
            status: arguments[0],
            activity: {
                type: arguments[1],
                name: stat
            }
        });
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}