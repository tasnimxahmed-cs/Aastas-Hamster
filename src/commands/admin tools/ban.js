const Commando = require('discord.js-commando')

module.exports = class BanCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            aliases: [],
            group: 'admin tools',
            memberName: 'ban',
            description: 'ban a user\nban `tag`',
            argsType: 'single',
            argsCount: 1,
            userPermissions: ['BAN_MEMBERS'],
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
            targetMember.ban();
            message.channel.send('They have been banned.');
        }
        else
        {
            message.channel.send(`<@${message.member.id}>, please specify who to ban!`);
        }
    }
};