const Commando = require('discord.js-commando');
const { queue } = require('../../bot.js');

module.exports = class SkipAudioCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'skipaudio',
            aliases: ['skip'],
            group: 'audio',
            memberName: 'skipaudio',
            description: 'skips audio',
            argsType: 'multiple',
            argsCount: 2,
            ownerOnly: false,
        })
    }

    async run(message, args)
    {
        if(!message.member.voice.channel) return message.reply('you must be in a voice channel to use this command!');

        const serverQ = queue.get(message.guild.id);

        if(!serverQ)
        {
            return message.reply('there are no songs in the queue!');
        }
        if(serverQ.songs.length == 1)
        {
            return message.reply('there are no songs queued up next!');
        }

        if(args.length >= 1)
        {
            if(parseInt(args[0]) >= serverQ.songs.length)
            {
                for(var i=0;i<serverQ.songs.length-1;i++)
                {
                    serverQ.songs.shift();
                    serverQ.connection.dispatcher.end();
                }
            }
            else
            {
                for(var i=0;i<(parseInt(args[0])-1);i++)
                {
                    serverQ.songs.shift();
                    serverQ.connection.dispatcher.end();
                }
            }
        }
        else{
            serverQ.connection.dispatcher.end();
        }
    }
}