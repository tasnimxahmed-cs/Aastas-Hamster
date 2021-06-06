const mongo = require('../../mongo.js');
const profileSchema = require('../../../schemas/profile-schema.js');

module.exports =
{
    commands: ['listwarnings', 'lw'],
    expectedArgs: '`user`',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text) =>
    {
        const target = message.mentions.users.first();
        if(!target)
        {
            message.reply('Please specify a user!');
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
    },
    permissions: [],
    requiredRoles: [],
}