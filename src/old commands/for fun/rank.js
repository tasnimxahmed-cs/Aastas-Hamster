const { Discord } = require('../../bot.js');
const profileSchema = require('../../../schemas/profile-schema.js');
const levels = require('../../mongodb/levels.js');

module.exports =
{
    commands: ['rank', 'level', 'badge'],
    expectedArgs: '',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 0,
    maxArgs: 1,
    requiredChannel: '🌸rankings',
    callback: async (message, arguments, text) =>
    {
        const { guild, member, channel } = message;
        const guildId = guild.id;
        if(arguments.length > 0)
        {
            const target = message.mentions.users.first();
            
            if(!target)
            {
                message.reply('please specify a user!');
                return;
            }

            userId = target.id;
        }
        else
        {
            userId = member.id;
        }

        const profiles = await levels.getProfiles(guildId, userId);
        const myProfile = profiles[0];
        const allProfiles = profiles[1];

        const { xp, level } = myProfile;
        const nextLevel = 5 * (level * level) + 50 * level + 100;
        
        var rank = 1;
        for(i=0;i<allProfiles.length;i++)
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

    },
    permissions: [],
    requiredRoles: [],
}