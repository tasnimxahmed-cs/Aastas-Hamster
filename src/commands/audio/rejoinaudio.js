const Commando = require('discord.js-commando');

module.exports = class RejoinAudioCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'rejoinaudio',
            aliases: ['rejoin', 'rj'],
            group: 'audio',
            memberName: 'rejoinaudio',
            description: 'rejoins audio',
            ownerOnly: false,
        })
    }

    async run(message)
    {
        if(!message.member.voice.channel) return message.reply('you must be in a voice channel to use this command!');
        message.member.voice.channel.join();
        message.channel.send('Hammy has re-entered the voice channel!');
    }
}