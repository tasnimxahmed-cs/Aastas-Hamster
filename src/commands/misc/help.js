const Commando = require('discord.js-commando');
const { client, Discord } = require('../../bot.js');

module.exports = class XCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: [],
            group: 'misc',
            memberName: 'help',
            description: 'command menu',
            argsType: 'single',
            argsCount: 0,
            userPermissions: [],
            ownerOnly: false,
        });
    };

    async run(message, args)
    {
        if(message.member.hasPermission('ADMINISTRATOR'))
        {
            const embed = new Discord.MessageEmbed()
                .setTitle("Aasta's Hamster 🐹")
                .setThumbnail(client.user.avatarURL())
                .setColor('#ec8d3a')
                .setURL('https://github.com/tasnimxahmed-cs/pipsqueak')
                .setFooter('© メアリーさん')
                .addFields(
                    {
                        name: 'Help Menu',
                        value: 'React with an emoji to view corresponding commands!',
                        inline: true,
                    },
                    {
                        name: '`🛠` Admin Tools',
                        value: 'imagine not being admin lmaoo',
                        inline: false,
                    },
                    {
                        name: '`🌸` にほんご',
                        value: 'Learn Japanese with Hammy! 🤓',
                        inline: false,
                    },
                    {
                        name: '`🎶` Music',
                        value: "Ham's Jams! 🎧",
                        inline: false,
                    },
                    {
                        name: '`💴` Economy',
                        value: "Let's get this bread! 🍞",
                        inline: false,
                    },
                    {
                        name: '`🧪` XP',
                        value: 'Chug Jug 🥤',
                        inline: false,
                    },
                    {
                        name: '`👾` Miscellaneous',
                        value: 'Who knows? 🤷‍♂️',
                        inline: false,
                    },
                );
            message.channel.send(embed).then((message) => {
                message.react('🛠');
                message.react('🌸');
                message.react('🎶');
                message.react('💴');
                message.react('🧪');
                message.react('👾');
            });
        }
        else
        {
            const embed = new Discord.MessageEmbed()
                .setTitle("Aasta's Hamster 🐹")
                .setThumbnail(client.user.avatarURL())
                .setColor('#ec8d3a')
                .setURL('https://github.com/tasnimxahmed-cs/pipsqueak')
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
                        name: '`🎶` Music',
                        value: "Ham's Jams! 🎧",
                        inline: false,
                    },
                    {
                        name: '`💴` Economy',
                        value: "Let's get this bread! 🍞",
                        inline: false,
                    },
                    {
                        name: '`🧪` XP',
                        value: 'Chug Jug 🥤',
                        inline: false,
                    },
                    {
                        name: '`👾` Miscellaneous',
                        value: 'Who knows? 🤷‍♂️',
                        inline: false,
                    },
                );
            message.channel.send(embed).then((message) => {
                message.react('🌸');
                message.react('🎶');
                message.react('💴');
                message.react('🧪');
                message.react('👾');
            });
        }
    }
};