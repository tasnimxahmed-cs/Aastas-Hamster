const mongoose = require('mongoose');

const flashcardSchema = mongoose.Schema({

    front: {
        type: String,
        required: true
    },

    back: {
        type: String,
        required: true
    },

    chapter: {
        type: Number,
        required: true
    },

    isKanji: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('flashcards', flashcardSchema);