const mongo = require('../../mongo.js');
const profileSchema = require('../../../schemas/profile-schema.js');

module.exports =
{
    commands: ['warn'],
    expectedArgs: '`user` `reason`',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 2,
    maxArgs: null,
    callback: async (message, arguments, text) =>
    {
        const target = message.mentions.users.first();

        if(!target)
        {
            message.reply('Please specify a user to warn!');
            return;
        }

        arguments.shift();

        const guildId = message.guild.id;
        const userId = target.id;
        const reason = arguments.join(' ');

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

    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: [],
}