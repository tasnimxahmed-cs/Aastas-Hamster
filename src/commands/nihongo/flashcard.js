const { Discord } = require('../../bot.js');
const flashcardSchema = require('../../../schemas/flashcard-schema.js');

module.exports =
{
    commands: ['flashcard', 'fc'],
    expectedArgs: '`chapter(s)`',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text) =>
    {
        var chaps = arguments[0].trim().split(',');
        for(i=0;i<chaps.length;i++)
        {
            chaps[i] = parseInt(chaps[i], 10);
        }

        cards = await flashcardSchema.find({ chapter: chaps });
        cardIndex = 0;
        currCard = cards[cardIndex];
        if(currCard == null) return;
        cardState = 'front';
        fCard = new Discord.MessageEmbed()
            .setTitle(currCard.front)
            .setColor('#ffb7c5')
            .setURL('https://quizlet.com/tasnimxahmed/folders/jpn-101?x=1xqt&i=29r7r0')
            .setFooter('Chapter ' + currCard.chapter.toString() +'\n⏪Previous Card; 🔁Flip Card; ⏩Next Card')
        ;
        message.channel.send(fCard).then((card) => {
            card.react('⏪');
            card.react('🔁');
            card.react('⏩');
        });
    },
    permissions: [],
    requiredRoles: [],
}