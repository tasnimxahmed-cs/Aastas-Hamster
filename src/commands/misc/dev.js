const Commando = require('discord.js-commando')
const { client, Discord } = require('../../bot.js');

module.exports = class DeveloperCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'developer',
            aliases: ['dev'],
            group: 'misc',
            memberName: 'developer',
            description: 'developer info',
            argsType: 'single',
            argsCount: 0,
            userPermissions: ['ADMINISTRATOR'],
            ownerOnly: true,
        });
    };

    async run(message, args)
    {
        const embed = new Discord.MessageEmbed()
            .setTitle("Aasta's Hamster 🐹")
            .setThumbnail(client.user.avatarURL())
            .setColor('#ec8d3a')
            .setURL('https://github.com/tasnimxahmed-cs/Aastas-Hamster')
            .setFooter('© メアリーさん')
            .addFields(
                {
                    name: 'Developer',
                    value: 'Tasnim Ahmed',
                    inline: true,
                },
                {
                    name: 'Language',
                    value: 'Javascript',
                    inline: false,
                },
                {
                    name: 'Github Repository',
                    value: 'https://github.com/tasnimxahmed-cs/Aastas-Hamster',
                    inline: false,
                },
            );
        message.channel.send(embed);
    }
};