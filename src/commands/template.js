const Commando = require('discord.js-commando')

module.exports = class XCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: '',
            aliases: [],
            group: '',
            memberName: '',
            description: '',
            argsType: 'single',
            argsCount: 1,
            userPermissions: [],
            ownerOnly: false,
        });
    };

    async run(message, args)
    {
        
    }
};