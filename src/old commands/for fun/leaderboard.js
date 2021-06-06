const { Discord } = require('../../bot.js');
const profileSchema = require('../../../schemas/profile-schema.js');
const levels = require('../../mongodb/levels.js');

module.exports =
{
    commands: ['lb', 'leaderboard'],
    expectedArgs: '',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 0,
    maxArgs: 0,
    requiredChannel: '🌸rankings',
    callback: async (message, arguments, text) =>
    {
        const { guild, member, channel } = message;
        const guildId = guild.id;
        const userId = member.id;

        const profiles = await levels.getProfiles(guildId, userId);
        const allProfiles = profiles[1];

        allProfiles.sort((a, b) => {
            if(a.level > b.level)
            {
                return 1;
            }
            else
            {
                return -1;
            }
        });
        allProfiles.reverse();

        users = [];
        for(i=0;i<allProfiles.length;i++)
        {
            users.push(guild.members.cache.get(allProfiles[i].userId))
        }

        const lb = new Discord.MessageEmbed()
            .setTitle(guild.name + ' leaderboard:')
            .setDescription('flip through the pages using `⏪` and `⏩`!')
            .setColor('#ec8d3a')
            .setThumbnail(guild.iconURL());

            lbMin = 25*0;
            lbMax = 25*(0+1);

            if(lbMax > users.length)
            {
                lbMax = users.length;
            }

            for(i=lbMin;i<lbMax;i++)
            {
                if(allProfiles[i].level == undefined)
                {
                    tempLevel = 0;
                }
                else
                {
                    tempLevel = allProfiles[i].level;
                }
                
                lb.addFields(
                    {
                        name: '#' + (i+1).toString() + ': '+ users[i].displayName,
                        value: 'level '+ tempLevel,
                        inline: false
                    }
                );
            }

            channel.send(lb).then((board) => {
                board.react('⏪');
                board.react('⏩');
            });
    },
    permissions: [],
    requiredRoles: [],
}

module.exports.getUsers = async (message) => {
    const profiles = await levels.getProfiles(message.guild.id, message.member.id);
    const allProfiles = profiles[1];

    allProfiles.sort((a, b) => {
        if(a.level > b.level)
        {
            return 1;
        }
        else
        {
            return -1;
        }
    });
    allProfiles.reverse();

    users = [];
    for(i=0;i<allProfiles.length;i++)
    {
        users.push(message.guild.members.cache.get(allProfiles[i].userId))
    }

    return users;
};

module.exports.updateLb = async (message, lbPage) => {
    const profiles = await levels.getProfiles(message.guild.id, message.member.id);
    const allProfiles = profiles[1];

    allProfiles.sort((a, b) => {
        if(a.level > b.level)
        {
            return 1;
        }
        else
        {
            return -1;
        }
    });
    allProfiles.reverse();

    users = [];
    for(i=0;i<allProfiles.length;i++)
    {
        users.push(message.guild.members.cache.get(allProfiles[i].userId))
    }
    const lb = new Discord.MessageEmbed()
        .setTitle(message.guild.name + ' leaderboard:')
        .setDescription('flip through the pages using `⏪` and `⏩`!')
        .setColor('#ec8d3a')
        .setThumbnail(message.guild.iconURL());

    lbMin = 25*lbPage;
    lbMax = 25*(lbPage+1);
    
    if(lbMin < 0)
    {
        lbMin = users.length - (users.length%25);
        lbMax = (lbMin + (users.length%25));
    }
    if(lbMax > users.length)
    {
        lbMax = users.length;
    }

    for(i=lbMin;i<lbMax;i++)
    {
        if(allProfiles[i].level == undefined || null)
        {
            tempLevel = 0;
        }
        else
        {
            tempLevel = allProfiles[i].level;
        }

        lb.addFields(
            {
                name: '#' + (i+1).toString() + ': '+ users[i].displayName,
                value: 'level '+ tempLevel,
                inline: false
            }
        );
    }

    message.channel.send(lb).then((board) => {
        board.react('⏪');
        board.react('⏩');
    });
}