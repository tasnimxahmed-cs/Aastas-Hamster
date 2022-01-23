const Commando = require('discord.js-commando')
const voice = require('../../mongodb/voice.js')
const { Discord } = require('../../bot.js');

module.exports = class XCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'study timer',
            aliases: ['st'],
            group: 'misc',
            memberName: '',
            description: 'voice channel time logger',
            argsType: 'single',
            argsCount: 1,
            userPermissions: [],
            ownerOnly: false,
        });
    };

    async run(message, args)
    {
        const { guild, member, channel } = message;
        let vcList = ['778468325508251700','778468467774324747']
        let t = '00:00:00'
        if(args.length > 0)
        {
            if(args == 'reset')
            {
                await voice.reset(message.member.guild.id, message.member.id);
                message.reply('your study timer has been reset!');
                if(message.member.voice != null)
                {
                    if(vcList.includes(message.member.voice.id.toString()))
                    {
                        await voice.start(message.member.guild.id, message.member.id);
                    }
                }
                return;
            }
        }
        if(message.member.voice.channelID != null)
        {
            if(vcList.includes(message.member.voice.channelID.toString()))
            {
                await voice.end(message.member.guild.id, message.member.id);
                t = await voice.vc(message.member.guild.id, message.member.id);
            }
        }
        else
        {
            t = await voice.vc(message.member.guild.id, message.member.id);
        }

        const user = guild.members.cache.get(member.id);

        const clock = new Discord.MessageEmbed()
            .setTitle(t)
            .setDescription('keep at it, chump.')
            .setColor(user.displayHexColor)
            .setThumbnail(user.user.avatarURL())
            .setFooter(user.user.tag)
        ;

        channel.send(clock);
    }
};