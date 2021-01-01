const { Discord } = require('../../bot.js');
const profileSchema = require('../../../schemas/profile-schema.js');
const levels = require('../../mongodb/levels.js');

module.exports =
{
    commands: ['rank', 'level', 'badge'],
    expectedArgs: '',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) =>
    {
        const { guild, member, channel } = message;
        const guildId = guild.id;
        const userId = member.id;

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

        const badge = new Discord.MessageEmbed()
            .setTitle('Rank: ' + rank.toString() + '\nLevel: ' + level)
            .setDescription(xp + ' / ' + nextLevel + ' XP')
            .setColor(member.displayHexColor)
            .setThumbnail(member.user.avatarURL())
            .setFooter(member.user.tag)
        ;

        channel.send(badge);

    },
    permissions: [],
    requiredRoles: [],
}