const mongo = require('./mongo.js');
const fs = require('fs');
const flashcardSchema = require('../../schemas/flashcard-schema.js');

module.exports = client => {
    client.on('message', async message => {
        if(message.author.bot) return;
        if(message.content.startsWith(process.env.PREFIX)) {
            const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(process.env.PREFIX.length)
            .split(/\s+/);

            if(CMD_NAME.toLowerCase() === 'addflashcards' || CMD_NAME.toLowerCase() === 'addfc')
            {
                if(!message.member.hasPermission('ADMINISTRATOR')) return;
                
                if(args.length == 0)
                {
                    message.channel.send('Please enter a path to a TXT file!');
                    return;
                }

                const csv = args[0];
                const cards = fs.readFileSync('C:/Users/Tasnim Ahmed/hamster/flashcards/'+csv+'.txt', 'utf8');
                var splitString = cards.split('	');
                var fixedArr = [];
                for(i=0;i<splitString.length;i++)
                {
                    fixedArr.push(splitString[i].trim());
                }
                var chap = [];
                var prop = 1;
                const tempObj = { front: 'valF', back: 'valB', chapter: 1, isKanji: true};
                var arrObj = [];
                for(i=0;i<fixedArr.length;i++)
                {
                    if(prop == 1)
                    {
                        tempObj.front = fixedArr[i];
                        prop++;
                    }
                    else if(prop == 2)
                    {
                        tempObj.back = fixedArr[i];
                        prop++;
                    }
                    else if(prop == 3)
                    {
                        tempObj.chapter = parseInt(fixedArr[i], 10);
                        prop++;
                    }
                    else if(prop == 4)
                    {
                        tempObj.isKanji = fixedArr[i];
                        prop = 1;
                        arrObj.push({front: tempObj.front, back: tempObj.back, chapter: tempObj.chapter, isKanji: tempObj.isKanji});
                    }
                }

                await mongo().then(async mongoose => {
                    try
                    {
                        await flashcardSchema.insertMany(arrObj, {ordered: true});
                    }
                    finally
                    {
                        mongoose.connection.close();
                    }
                });
            }
        }
    });
};