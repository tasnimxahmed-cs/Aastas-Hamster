const mongo = require('../mongo.js');
const profileSchema = require('../../schemas/profile-schema.js');

module.exports = (client) => {
    client.on('message', message => {
        const { guild, member } = message;

        const exp = Math.floor(Math.random() * (25 - 15 +1)) + 15;

        addXP(guild.id, member.id, exp, message);
    });
};

const getNeededXP = (level) => 5 * (level * level) + 50 * level + 100;

const blockedChannels = ['780310394316390421', '785962847984943134', '789172435655983166', '778777999096676362', '785322972562980895', '778469732365893672', '779463580373745684', '778470005615886356', '778469133167624262', '789125456132702239', '778481473476886598', '786290377493708820', '786687626798694410', '780272789571371029', '779145280863993896', '778475535679356969', '778471463103627265', '780260726517923841', '785002534640418876', '778473299016417330', '778483592505327646'];

const addXP = async (guildId, userId, xpToAdd, message) => {
    if(message.member.user.bot || blockedChannels.includes(message.channel.id)) return;

    await mongo().then(async mongoose => {
        try
        {
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId,
            },
            {
                guildId,
                userId,
                $inc: {
                    xp: xpToAdd
                },
            },
            {
                upsert: true,
                new: true
            });

            let { xp, level } = result;
            const needed = getNeededXP(level);

            if(xp >= needed)
            {
                ++level;
                xp-= needed;

                const rankChannel = message.guild.channels.cache.get('780260726517923841');
                rankChannel.send(`<@${userId}>, you are now level ${level} with ${xp} experience! You now need ${getNeededXP(level)} XP to level up again!`);
                
                await profileSchema.updateOne(
                    {
                        guildId,
                        userId,
                    },
                    {
                        level,
                        xp,
                    }
                );
            }
        }
        finally
        {
            mongoose.connection.close();
        }
    });
};

module.exports.getProfiles = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try
        {
            var arrProfiles = [];
            
            const myProfile = await profileSchema.findOne({ guildId: guildId, userId: userId });
            arrProfiles.push(myProfile);

            const allProfiles = await profileSchema.find({ guildId: guildId }).lean();
            arrProfiles.push(allProfiles);

            return arrProfiles;
        }
        finally
        {
            mongoose.connection.close();
        }
    });
};

module.exports.addXP = addXP;