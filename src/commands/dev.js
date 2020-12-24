const { client, Discord } = require('../bot.js');

module.exports =
{
    commands: 'dev',
    expectedArgs: '',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) =>
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
    },
    permissions: [],
    requiredRoles: [],
}