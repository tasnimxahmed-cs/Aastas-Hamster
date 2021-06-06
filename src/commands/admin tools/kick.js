const Commando = require('discord.js-commando')

module.exports = class KickCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            aliases: [],
            group: 'admin tools',
            memberName: 'kick',
            description: 'kick a user',
            argsType: 'single',
            argsCount: 1,
            userPermissions: ['KICK_MEMBERS'],
            ownerOnly: false,
        });
    };

    async run(message, args)
    {
        if(args.includes(' '))
        {
            message.reply('please use the appropriate arguments!');
            return;
        }
        const target = message.mentions.users.first();
        if(target)
        {
            const targetMember = message.guild.members.cache.get(target.id);
            targetMember.kick();
            message.channel.send('They have been kicked.');
        }
        else
        {
            message.channel.send(`<@${message.member.id}>, please specify who to kick!`);
        }
    }
};