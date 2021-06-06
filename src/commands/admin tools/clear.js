const Commando = require('discord.js-commando')

module.exports = class ClearCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            aliases: [],
            group: 'admin tools',
            memberName: 'clear',
            description: 'bulk delete messages in a channel',
            argsType: 'single',
            argsCount: 0,
            userPermissions: ['MANAGE_MESSAGES'],
            ownerOnly: false,
        });
    };

    async run(message, args)
    {
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results);
        });
    }
};