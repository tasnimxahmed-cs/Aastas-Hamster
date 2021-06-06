const Commando = require('discord.js-commando')

module.exports = class LatencyCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'latency',
            aliases: ['lat'],
            group: 'misc',
            memberName: 'latency',
            description: 'ping hammy and discordjs',
            argsType: 'single',
            argsCount: 1,
            userPermissions: ['ADMINISTRATOR'],
            ownerOnly: true,
        });
    };

    async run(message, args)
    {
        message.reply('calculating ping...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp;

            resultMessage.edit(`bot latency: ${ping} | api latency: ${message.client.ws.ping}`);
        });
    }
};