const Commando = require('discord.js-commando')

module.exports = class statusCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'status',
            aliases: [],
            group: 'admin tools',
            memberName: 'status',
            description: 'change hammys status',
            argsType: 'multiple',
            userPermissions: ['ADMINISTRATOR'],
            ownerOnly: false,
        });
    };

    async run(message, args)
    {
        if(args.length < 3)
        {
            message.reply('please use the appropriate arguments!');
            return;
        }
        var stat = args[2];
        for(var i=3; i<args.length; i++)
        {
            stat += ' '+args[i];
        }
        message.client.user.setPresence({
            status: args[0],
            activity: {
                type: args[1],
                name: stat
            }
        });
    }
};