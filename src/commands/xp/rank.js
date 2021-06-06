const { Discord } = require('../../bot.js');
const profileSchema = require('../../../schemas/profile-schema.js');
const levels = require('../../mongodb/levels.js');
const Commando = require('discord.js-commando')

module.exports = class RankCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'rank',
            aliases: ['badge', 'level'],
            group: 'xp',
            memberName: 'rank',
            description: 'user profile',
            argsType: 'multiple',
            argsCount: 2,
            userPermissions: [],
            ownerOnly: false,
        });
    };

    async run(message, args)
    {
        const { guild, member, channel } = message;
        const guildId = guild.id;
        if(args.length > 0)
        {
            const target = message.mentions.users.first();
            
            if(!target)
            {
                message.reply('please use the appropriate arguments!');
                return;
            }

            var userId = target.id;
        }
        else
        {
            var userId = member.id;
        }

        if(args.length > 1)
        {
            message.reply('please use the appropriate arguments!');
            return;
        }

        const profiles = await levels.getProfiles(guildId, userId);
        const myProfile = profiles[0];
        const allProfiles = profiles[1];

        const { xp, level } = myProfile;
        const nextLevel = 5 * (level * level) + 50 * level + 100;
        
        var rank = 1;
        for(var i=0;i<allProfiles.length;i++)
        {
            if(allProfiles[i].userId != userId)
            {
                if(level < allProfiles[i].level)
                {
                    rank++;
                }
                else if(level == allProfiles[i].level)
                {
                    if(xp < allProfiles[i].xp)
                    {
                        rank++;
                    }
                }
            }
        }

        const user = guild.members.cache.get(userId);

        const badge = new Discord.MessageEmbed()
            .setTitle('Rank: ' + rank.toString() + '\nLevel: ' + level)
            .setDescription(xp + ' / ' + nextLevel + ' XP')
            .setColor(user.displayHexColor)
            .setThumbnail(user.user.avatarURL())
            .setFooter(user.user.tag)
        ;

        channel.send(badge);
    }
};