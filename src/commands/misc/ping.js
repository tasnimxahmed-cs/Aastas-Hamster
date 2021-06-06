const Commando = require('discord.js-commando')

module.exports = class PingCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: [],
            group: 'misc',
            memberName: 'ping',
            description: 'ping hammy',
            argsType: 'single',
            argsCount: 0,
            userPermissions: ['ADMINISTRATOR'],
            ownerOnly: true,
        });
    };

    async run(message, args)
    {
        message.reply('pong!');
    }
};