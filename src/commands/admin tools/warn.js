const mongo = require('../../mongo.js');
const profileSchema = require('../../../schemas/profile-schema.js');
const Commando = require('discord.js-commando')

module.exports = class WarnCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            aliases: [],
            group: 'admin tools',
            memberName: 'warn',
            description: 'warn a user',
            argsType: 'multiple',
            userPermissions: ['ADMINISTRATOR'],
            ownerOnly: false,
        });
    };

    async run(message, args)
    {
        const target = message.mentions.users.first();

        if(!target)
        {
            message.reply('please specify a user to warn!');
            return;
        }

        args.shift();

        const guildId = message.guild.id;
        const userId = target.id;
        const reason = args.join(' ');

        const warning = {
            author: message.member.user.tag,
            timestamp: new Date().getTime(),
            reason
        };

        await mongo().then(async mongoose => {
            try {
                await profileSchema.findOneAndUpdate({
                   guildId,
                   userId 
                },
                {
                    guildId,
                    userId,
                    $push: {
                        warnings: warning,
                    }
                },
                {
                    upsert: true,
                });
            }
            finally
            {
                mongoose.connection.close();
            }
        });
    }
};