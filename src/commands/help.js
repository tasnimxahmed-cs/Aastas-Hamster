const { client, Discord } = require('../bot.js');

module.exports =
{
    commands: ['help', 'pls'],
    expectedArgs: '',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) =>
    {
        if(message.member.hasPermission('ADMINISTRATOR'))
        {
            const embed = new Discord.MessageEmbed()
                .setTitle("Aasta's Hamster 🐹")
                .setThumbnail(client.user.avatarURL())
                .setColor('#ec8d3a')
                .setURL('https://github.com/tasnimxahmed-cs/Aastas-Hamster')
                .setFooter('© メアリーさん')
                .addFields(
                    {
                        name: 'Help Menu',
                        value: 'React with an emoji to view corresponding commands!',
                        inline: true,
                    },
                    {
                        name: '`🌸` にほんご',
                        value: 'Learn Japanese with Hammy! 🤓',
                        inline: false,
                    },
                    {
                        name: '`🤡` For Fun',
                        value: 'Working hard, or hardly working? 🤔',
                        inline: false,
                    },
                    {
                        name: '`👾` Miscellaneous',
                        value: 'Who knows? 🤷‍♂️',
                        inline: true,
                    },
                    {
                        name: '`🛠` Admin Tools',
                        value: 'imagine not being admin lmaoo',
                        inline: false,
                    },
                );
            message.channel.send(embed).then((message) => {
                message.react('🌸');
                message.react('🤡');
                message.react('👾');
                message.react('🛠');
            });
        }
        else
        {
            const embed = new Discord.MessageEmbed()
                .setTitle("Aasta's Hamster 🐹")
                .setThumbnail(client.user.avatarURL())
                .setColor('#ec8d3a')
                .setURL('https://github.com/tasnimxahmed-cs/Aastas-Hamster')
                .setFooter('© メアリーさん')
                .addFields(
                    {
                        name: 'Help Menu',
                        value: 'React with the corresponding emoji to view commands!',
                        inline: true,
                    },
                    {
                        name: '`🌸` にほんご',
                        value: 'Learn Japanese with Hammy! 🤓',
                        inline: false,
                    },
                    {
                        name: '`🤡` For Fun',
                        value: 'Working hard, or hardly working? 🤔',
                        inline: false,
                    },
                    {
                        name: '`👾` Miscellaneous',
                        value: 'Who knows? 🤷‍♂️',
                        inline: true,
                    },
                );
            message.channel.send(embed).then((message) => {
                message.react('🌸');
                message.react('🤡');
                message.react('👾');
            });
        }
    },
    permissions: [],
    requiredRoles: [],
}