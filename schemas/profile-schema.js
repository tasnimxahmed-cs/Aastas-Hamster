const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
};

const profileSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    coins: {
      type: Number,
      default: 0,
    },
    xp: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    warnings: {
      type: [Object],
    },
    vcStart: {
      type: Number,
      default: 0
    },
    vcEnd: {
      type: Number,
      default: 0
    },
    vc: {
      type: String
    }
});

module.exports = mongoose.model('profiles', profileSchema);