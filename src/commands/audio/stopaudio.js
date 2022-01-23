const Commando = require('discord.js-commando');
const { queue } = require('../../bot.js');

module.exports = class StopAudioCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'stopaudio',
            aliases: ['stop', 'leave'],
            group: 'audio',
            memberName: 'stopaudio',
            description: 'stops audio',
            ownerOnly: false,
        })
    }

    async run(message)
    {
        if(!message.member.voice.channel) return message.reply('you must be in a voice channel to use this command!');
        if(!message.member.voice.channel.members.has('780270429381197866')) return message.reply('I am not in the voice channel!')
        const serverQ = queue.get(message.guild.id);
        if(!serverQ) return message.member.voice.channel.leave();
        serverQ.songs = [];
        serverQ.connection.dispatcher.end();
        message.channel.send('Hammy left the voice channel :(');
    }
}