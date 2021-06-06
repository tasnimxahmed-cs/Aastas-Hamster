const Commando = require('discord.js-commando')

module.exports = class HitCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'hit',
            aliases: [],
            group: 'misc',
            memberName: 'hit',
            description: 'what you tryna hit',
            argsType: 'multiple',
            userPermissions: [],
            ownerOnly: false,
        });
    };

    async run(message, args)
    {
        if(args.length == 2)
        {
            if(args[0] == 'it' && args[1] == 'hammy')
            {
                message.channel.send('oHOOO BABYYYY nohOOOOO BABY awoohoohoohOOOOOOOOOOOOOOOOOOOO!');
            }
            else
            {
                message.reply("can't hit that, chief :/");
            }
        }
        else if(args.length == 5)
        {
            if(args[0] == 'me' && args[1] == 'for' && args[2] == 'it' && args[3] == 'one' && args[4] == 'time')
            {
                message.channel.send('OW!');
            }
            else if(args[0] == 'aasta' && args[1] == 'over' && args[2] == 'and' && args[3] == 'over' && args[4] == 'again')
            {
                message.channel.send('oOF!');
                message.channel.send('woMP!');
                message.channel.send('ripperoni');
                message.channel.send('hecC!');
                message.channel.send('*sob*');
            }
            else
            {
                message.reply("can't hit that, chief :/");
            }
        }
        else
        {
            message.reply("can't hit that, chief :/");
        }
    }
};