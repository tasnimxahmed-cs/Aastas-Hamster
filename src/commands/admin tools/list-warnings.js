const mongo = require('../../mongo.js');
const profileSchema = require('../../../schemas/profile-schema.js');
const Commando = require('discord.js-commando')

module.exports = class ListWarningsCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'listwarnings',
            aliases: ['lw'],
            group: 'admin tools',
            memberName: 'listwarnings',
            description: 'list previous warnings to a user',
            argsType: 'single',
            argsCount: 1,
            userPermissions: ['ADMINISTRATOR'],
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
        if(!target)
        {
            message.reply('please specify a user!');
            return;
        }

        const guildId = message.guild.id;
        const userId = target.id;

        await mongo().then(async mongoose => {
            try {
                const results = await profileSchema.findOne({
                    guildId,
                    userId,
                });

                let reply = `previous warnings for <@${userId}>:\n\n`;

                for(const warning of results.warnings)
                {
                    const { author, timestamp, reason } = warning;

                    reply += `by ${author} on ${new Date(timestamp).toLocaleDateString()} for "${reason}"\n\n`;
                }

                message.reply(reply);
            }
            finally {
                mongoose.connection.close();
            }
        });
    }
};