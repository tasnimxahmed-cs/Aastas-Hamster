const Commando = require('discord.js-commando');
const { queue } = require('../../bot.js');
const { client, Discord } = require('../../bot.js');

module.exports = class QueueCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            aliases: ['queue', 'q'],
            group: 'audio',
            memberName: 'queue',
            description: 'queue',
            ownerOnly: false,
        })
    }

    async run(message)
    {
        if(!message.member.voice.channel) return message.reply('you must be in a voice channel to use this command!');
        if(!message.member.voice.channel.members.has('780270429381197866')) return message.reply('I am not in the voice channel!');
        const serverQ = queue.get(message.guild.id);
        const embed = new Discord.MessageEmbed()
            .setTitle("Ham's Jams 🐹🎶")
            .setThumbnail(client.user.avatarURL())
            .setColor('#ec8d3a')
            .setURL('https://github.com/tasnimxahmed-cs/Aastas-Hamster')
            .setFooter('© メアリーさん');
        for(var i=0;i<serverQ.songs.length;i++)
        {
            embed.addFields(
                {
                    name: `${i+1}`,
                    value: `${serverQ.songs[i].title}`,
                    inline: false
                }
            );
        }
        message.channel.send(embed).then((q) => {
            if(q.embeds[0].fields.length == 25)
            {
                q.react('⏪');
                q.react('⏩');
            }
        });
        //message.channel.send('*Please note that I can only show you the first 25 songs that are queued because Tasnim is too lazy to code page functionality!*');
    }
}

module.exports.updateQ = async (message) => {
    if(!message.member.voice.channel) return message.reply('you must be in a voice channel to use this command!');
    if(!message.member.voice.channel.members.has('780270429381197866')) return message.reply('I am not in the voice channel!');
    const serverQ = queue.get(message.guild.id);
    if(serverQ.songs.length <1) return message.reply('there are no songs queued!');

    const embed = new Discord.MessageEmbed()
            .setTitle("Ham's Jams 🐹🎶")
            .setThumbnail(client.user.avatarURL())
            .setColor('#ec8d3a')
            .setURL('https://github.com/tasnimxahmed-cs/Aastas-Hamster')
            .setFooter('© メアリーさん');

    qMin = 25*qPage;
    qMax = 25*(qPage+1);

    if(qMin <0)
    {
        qMin = serverQ.songs.length - (serverQ.songs.length%25);
        qMax = serverQ.songs.length;
    }
    if(qMax >serverQ.songs.length)
    {
        qMax = serverQ.songs.length;
    }

    for(var i=qMin;i<qMax;i++)
    {
        embed.addFields(
            {
                name: `${i+1}`,
                value: `${serverQ.songs[i].title}`,
                inline: false
            }
        );
    }
    message.channel.send(embed).then((q) => {
        q.react('⏪');
        q.react('⏩');
    });
}

module.exports.getQ = async (message) => {
    return queue.get(message.guild.id);
}