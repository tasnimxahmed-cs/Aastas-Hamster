const Commando = require('discord.js-commando')
const profileSchema = require('../../../schemas/profile-schema.js');
const levels = require('../../mongodb/levels.js');
const { Discord } = require('../../bot.js');

module.exports = class LeaderboardCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'leaderboard',
            aliases: ['lb'],
            group: 'xp',
            memberName: 'leaderboard',
            description: 'users ranked by level',
            argsType: 'single',
            argsCount: 0,
            userPermissions: [],
            ownerOnly: false,
        });
    };

    async run(message, args)
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

        var users = [];
        for(i=0;i<allProfiles.length;i++)
        {
            users.push(guild.members.cache.get(allProfiles[i].userId))
        }

        const lb = new Discord.MessageEmbed()
            .setTitle(guild.name + ' leaderboard:')
            .setDescription('flip through the pages using `⏪` and `⏩`!')
            .setColor('#ec8d3a')
            .setThumbnail(guild.iconURL());

            var lbMin = 25*0;
            var lbMax = 25*(0+1);

            if(lbMax > users.length)
            {
                lbMax = users.length;
            }

            for(var i=lbMin;i<lbMax;i++)
            {
                if(!users[i]) continue;
                console.log(users[i].displayName)
                if(allProfiles[i].level == undefined)
                {
                    var tempLevel = 0;
                }
                else
                {
                    var tempLevel = allProfiles[i].level;
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
    }
};

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
        if(!users[i]) continue;
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