module.exports =
{
    commands: 'hit',
    expectedArgs: '`what you tryna hit`',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 2,
    maxArgs: 5,
    callback: (message, arguments, text) =>
    {
        if(arguments.length == 2)
        {
            if(arguments[0] == 'it' && arguments[1] == 'hammy')
            {
                message.channel.send('oHOOO BABYYYY nohOOOOO BABY awoohoohoohOOOOOOOOOOOOOOOOOOOO!');
            }
            else
            {
                message.channel.send("can't hit that, chief :/");
            }
        }
        else if(arguments.length == 5)
        {
            if(arguments[0] == 'me' && arguments[1] == 'for' && arguments[2] == 'it' && arguments[3] == 'one' && arguments[4] == 'time')
            {
                message.channel.send('OW!');
            }
            else if(arguments[0] == 'aasta' && arguments[1] == 'over' && arguments[2] == 'and' && arguments[3] == 'over' && arguments[4] == 'again')
            {
                message.channel.send('oOF!');
                message.channel.send('woMP!');
                message.channel.send('ripperoni');
                message.channel.send('hecC!');
                message.channel.send('*sob*');
            }
            else
            {
                message.channel.send("can't hit that, chief :/");
            }
        }
        else
        {
            message.channel.send("can't hit that, chief :/");
        }
    },
    permissions: [],
    requiredRoles: [],
}