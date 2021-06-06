const m6 = require('mee6-levels-api');
const mongo = require('../mongo.js');
const profileSchema = require('../../schemas/profile-schema.js');

module.exports =
{
    commands: ['mm'],
    expectedArgs: '',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) =>
    {
        const lb = await m6.getLeaderboardPage(message.guild.id);
            
        await mongo().then( async (mongoose) => {
            try
            {
                const guildId = message.guild.id;
                for(i=0;i<lb.length;i++)
                {
                    let userId = lb[i].id;
                    let level = lb[i].level;
                    if(level == 0) level = 1;
                    await profileSchema.findOneAndUpdate(
                        {
                            guildId,
                            userId
                        },
                        {
                            guildId,
                            userId,
                            $inc: {
                                level: 1
                            }

                        },
                        {
                            upsert: true,
                            new: true
                        }
                    )
                }
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