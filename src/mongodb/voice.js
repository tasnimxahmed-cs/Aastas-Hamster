const mongo = require('../mongo.js');
const profileSchema = require('../../schemas/profile-schema.js');

module.exports.start = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try
        {
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            },
            {
                guildId,
                userId,
                vcStart: Date.now()
            },
            {
                upsert: true,
                new: true
            });
        }
        finally
        {
            mongoose.connection.close();
        }
    });
};

module.exports.end = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try
        {
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            },
            {
                guildId,
                userId,
                vcEnd: Date.now()
            },
            {
                upsert: true,
                new: true
            });
        }
        finally
        {
            mongoose.connection.close();
        }
    });
};

module.exports.vc = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try
        {
            const p = await profileSchema.findOne({
                guildId,
                userId
            });

            const ms = p.vcEnd - p.vcStart
            seconds = Math.floor((ms / 1000) % 60),
            minutes = Math.floor((ms / (1000 * 60)) % 60),
            hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;

            t = hours + ":" + minutes + ":" + seconds;


            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            },
            {
                guildId,
                userId,
                vc: t
            },
            {
                upsert: true,
                new: true
            });

            return t
        }
        finally
        {
            mongoose.connection.close();
        }
    });
};

module.exports.reset = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try
        {
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            },
            {
                guildId,
                userId,
                vcStart: 0,
                vcEnd: 0,
                vc: '00:00:00'
            },
            {
                upsert: true,
                new: true
            });
        }
        finally
        {
            mongoose.connection.close();
        }
    });
};