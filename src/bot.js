//nodejs
const path = require('path');
//const fs = require('fs');
require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 100;

//discordjs
const { Client, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
exports.Discord = Discord;
//const client = new Client({
    //partials: ['MESSAGE', 'REACTION']
//});
const Commando = require('discord.js-commando');
const client = new Commando.CommandoClient({
    owner: '223631161891618816',
    commandPrefix: process.env.PREFIX,
    partials: ['MESSAGE', 'REACTION']

});
exports.client = client;

//mongodb
const mongo = require('./mongo.js');

const levels = require('./mongodb/levels.js');

const voice = require('./mongodb/voice.js')

const leaderboard = require('./commands/xp/leaderboard.js');
lbPage = 0;

//const messageCount = require('./old mdb/message-counter.js');
//const readFlashcards = require('./old mdb/read-flashcards.js');

//redis
const redis = require('./redis.js');
//const mee6Migrate = require('./commands/mee6-migrate.js');
const { env } = require('process');
exports.redis = redis;
const redisKeyPrefix = 'muted-';
exports.redisKeyPrefix = redisKeyPrefix;
redis.expire(message => {
    if(message.startsWith(redisKeyPrefix))
    {
        const split = message.split('-');
        const memberId = split[1];
        const guildId = split[2];

        const guild = client.guilds.cache.get(guildId);
        const member = guild.members.cache.get(memberId);

        const mutedRole = guild.roles.cache.find((role) => role.name === 'muted');
        member.roles.remove(mutedRole);
    }
});



//messageCount(client);
//readFlashcards(client);

//ready
client.on('ready', async () => {
    console.log(`${client.user.tag} has logged in.`);

    client.registry
    .registerGroups([
        ['admin tools', 'admin tools'],
        ['xp', 'xp'],
        ['economy', 'economy'],
        ['nihongo', 'nihongo'],
        ['audio', 'audio'],
        ['misc', 'misc'],
    ])
    //.registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

    /*command handler
    const baseFile = 'command-base.js';
    const commandBase = require(`./commands/${baseFile}`);
    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files)
        {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if(stat.isDirectory())
            {
                readCommands(path.join(dir, file));
            }
            else if(file !== baseFile)
            {
                const option = require(path.join(__dirname, dir, file));
                commandBase(client, option);
            }
        }
    }
    //readCommands('commands');
    //levels(client);*/
    
    //boot status
    client.user.setPresence({
        status: 'online',
        activity: {
            type: 2,
            name: 'sensei! 🤓'
        }
    });
    client.user.setUsername("Aasta's Hamster");

    //boot stats
    const hunterJapanese = client.guilds.cache.get('749100160402849805');
    const memCountChannel = hunterJapanese.channels.cache.get('786482126315978772');
    memCountChannel.setName('Member Count: '+(hunterJapanese.memberCount.toString()));

});

module.exports.queue = new Map();

const q = require('./commands/audio/queue.js');
qPage = 0;

//new member
client.on('guildMemberAdd', async (member) => {
    
    //welcome msg
    const channel = member.guild.channels.cache.get('778473299016417330');
    const message = `いらっしゃいませ！<@${member.id}> is now a part of the **${member.guild.name}** family! We're so excited you're here!\n\nPlease change your nickname to your real name and head on over to ${member.guild.channels.cache.get('785002534640418876').toString()} to have our bot add some roles to your account! We want to get to know a bit more about you, and it's important that you have the right teacher assigned: each teacher will have access to a private text channel meant just for you and your classmates who have the same sensei!\n\nNext, go introduce yourself in ${member.guild.channels.cache.get('785335528949415937').toString()} and then say hi in ${member.guild.channels.cache.get('749100160868548690').toString()}, ask for help in ${member.guild.channels.cache.get('749111308951224360').toString()}, or put your skills to the test in ${member.guild.channels.cache.get('778477527886594048').toString()}. Feel free to chat anytime! Have fun with the server, use the bots, join the voice channels and study/chill with us :D If you have any questions or suggestions, feel free to ping ${member.guild.roles.cache.get('778482064210919434').toString()} in ${member.guild.channels.cache.get('779145280863993896').toString()}! We hope you enjoy your stay!!`

    channel.send(message);

    //mem count stat
    const hunterJapanese = client.guilds.cache.get('749100160402849805');
    const memCountChannel = hunterJapanese.channels.cache.get('786482126315978772');
    memCountChannel.setName('Member Count: '+(hunterJapanese.memberCount).toString());

    //mute check
    const redisClient = await redis();
    try
    {
        redisClient.get(`${redisKeyPrefix}${member.id}-${member.guild.id}`, (err, result) => {
            if(err)
            {
                console.log('Redis GET error:', err);
            }
            else if(result)
            {
                const role = member.guild.roles.cache.find(role => role.name === 'muted')
                if(role)
                {
                    member.roles.add(role);
                }
            }
        });
    }
    finally
    {
        redisClient.quit();
    }
});

//remove member
client.on('guildMemberRemove', (member) => {
    
    //mem count stat
    const hunterJapanese = client.guilds.cache.get('749100160402849805');
    const memCountChannel = hunterJapanese.channels.cache.get('786482126315978772');
    memCountChannel.setName('Member Count: '+(hunterJapanese.memberCount).toString());
});

//ban member
client.on('guildBanAdd', (guild, user) => {
    
    //mem count stat
    const hunterJapanese = client.guilds.cache.get('749100160402849805');
    const memCountChannel = hunterJapanese.channels.cache.get('786482126315978772');
    memCountChannel.setName('Member Count: '+(hunterJapanese.memberCount).toString());
});

//voice channel
client.on('voiceStateUpdate', async (oldS, newS) => {
    vcList = ['778468325508251700','778468467774324747']
    if(newS.channelID == null)
    {
        await voice.end(newS.guild.id, newS.member.id)
        await voice.vc(newS.guild.id, newS.member.id)
    }
    else if(vcList.includes(newS.channelID.toString()))
    {
        if(oldS.channelID != null && vcList.includes(oldS.channelID.toString()))
        {
            return
        }

        await voice.start(newS.guild.id, newS.member.id)
    }
});

//reaction added
client.on('messageReactionAdd', async (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    //embeds
    //help + flashcards
    if(reaction.message.embeds.length > 0 && (!reaction.me))
    {
        const admins = ['223631161891618816'];
        const ppl = reaction.message.guild.members.cache.array();
        for(i=0;i<ppl.length;i++)
        {
            if(ppl[i].roles.cache)
            {
                var arrRoles = ppl[i].roles.cache.array();
                for(j=0;j<arrRoles.length;j++)
                {
                    if(arrRoles[j] == '778482064210919434')
                    {
                        admins.push(ppl[i].id);
                    }
                }
            }
        }
        var arrEmb = reaction.message.embeds;
        if(arrEmb[0].fields.length != 0)
        {
            //leaderboard
            if(arrEmb[0].title != null)
            {
                if(arrEmb[0].title.includes('leaderboard'))
                {
                    if(name === '⏪')
                    {
                        lbPage--;
                        await leaderboard.updateLb(reaction.message, lbPage);

                        if(lbPage == -1)
                        {
                            maxPage = ((await leaderboard.getUsers(reaction.message)).length/25).toString();

                            if((await leaderboard.getUsers(reaction.message)).length%25 != 0)
                            {
                                for(i=0;i<maxPage.length;i++)
                                {
                                    if(maxPage[i] == '.')
                                    {
                                        maxPage = maxPage.slice(0,i);
                                        break;
                                    }
                                }
                            }
                            lbPage = maxPage;
                        }
                    }
                    else
                    {
                        lbPage++;

                        maxPage = ((await leaderboard.getUsers(reaction.message)).length/25).toString();
                        if((await leaderboard.getUsers(reaction.message)).length%25 != 0)
                        {
                            for(i=0;i<maxPage.length;i++)
                            {
                                if(maxPage[i] == '.')
                                {
                                    maxPage = maxPage.slice(0,i);
                                    break;
                                }
                            }
                        }

                        if(lbPage > maxPage)
                        {
                            lbPage = 0;
                        }

                        await leaderboard.updateLb(reaction.message, lbPage);
                    }
                }
                else if(arrEmb[0].title.toLowerCase().includes('jams'))
                {
                    if(name === '⏪')
                    {
                        qPage--;
                        q.updateQ(reaction.message);

                        const sQ = await q.getQ(reaction.message);
                        if(qPage == -1)
                        {
                            maxQPage = (sQ.songs.length/25).toString();
                            if(sQ.songs.length%25 != 0)
                            {
                                for(i=0;i<maxQPage.length;i++)
                                {
                                    if(maxQPage[i] == '.')
                                    {
                                        maxQPage = maxQPage.slice(0,i);
                                        break;
                                    }
                                }
                            }
                            qPage = maxQPage;
                        }
                    }
                    else
                    {
                        qPage++;

                        const sQ = await q.getQ(reaction.message);
                        maxQPage = (sQ.songs.length/25).toString();
                        if(sQ.songs.length%25 != 0)
                        {
                            for(var i=0;i<maxQPage.length;i++)
                            {
                                if(maxQPage[i] == '.')
                                {
                                    maxQPage = maxQPage.slice(0,i);
                                    break;
                                }
                            }
                        }

                        if(qPage > maxQPage)
                        {
                            qPage = 0;
                        }

                        q.updateQ(reaction.message);
                    }
                }
            }
            
            var field1 = arrEmb[0].fields[0];
            if(field1.name === 'Help Menu')
            {
                if(arrEmb[0].fields.length == 7)
                {
                    switch (name) {
                        case '🌸':
                            var embed = new Discord.MessageEmbed()
                                .setTitle("🌸 にほんご")
                                .setDescription('Help Menu')
                                .setColor('#ec8d3a')
                                .addFields(
                                    {
                                        name: process.env.PREFIX+'jpn `word`',
                                        value: 'English-Japanese and Japanese-English dictionary.\n`word` search term (english, romaji, kana, kanji)',
                                        inline: true,
                                    },
                                    {
                                        name: process.env.PREFIX+'kanji `word`',
                                        value: 'Kanji dictionary.\n`word` kanji',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'example `word`',
                                        value: 'Kanji, kana, and english examples of `word `.\n`word` search term (english, kana, kanji)',
                                        inline: false,
                                    },
                                );
                                reaction.message.channel.send(embed);
                            break;
                        case '🎶':
                            var embed = new Discord.MessageEmbed()
                                .setTitle("🎶 Music")
                                .setDescription('Help Menu')
                                .setColor('#ec8d3a')
                                .addFields(
                                    {
                                        name: process.env.PREFIX+'play `song title/url`',
                                        value: 'Play `song` in your voice channel.',
                                        inline: true,
                                    },
                                    {
                                        name: process.env.PREFIX+'skip `number`',
                                        value: 'Skip to `number` song in queue.',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'stop',
                                        value: 'Stop playing music in your voice channel.',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'queue',
                                        value: 'View the song queue.',
                                        inline: false,
                                    },
                                );
                                reaction.message.channel.send(embed);
                            break;
                        case '💴':
                            embed = new Discord.MessageEmbed()
                                .setTitle("💴 Economy")
                                .setDescription('Help Menu')
                                .setColor('#ec8d3a')
                                .addFields(
                                    {
                                        name: process.env.PREFIX+'balance `tag`',
                                        value: "View balance\n`tag` @member",
                                        inline: true,
                                    },
                                    {
                                        name: process.env.PREFIX+'pay `tag` `amount`',
                                        value: 'Pay a user\n`tag` @member\n`amount` amount to pay',
                                        inline: false,
                                    },
                                );
                                reaction.message.channel.send(embed);
                            break;
                        case '🧪':
                            embed = new Discord.MessageEmbed()
                                .setTitle("🧪 XP")
                                .setDescription('Help Menu')
                                .setColor('#ec8d3a')
                                .addFields(
                                    {
                                        name: process.env.PREFIX+'leaderboard',
                                        value: "View users ranked by level",
                                        inline: true,
                                    },
                                    {
                                        name: process.env.PREFIX+'rank `tag`',
                                        value: 'View user profile\n`tag` user',
                                        inline: false,
                                    },
                                );
                                reaction.message.channel.send(embed);
                            break;
                        case '👾':
                            embed = new Discord.MessageEmbed()
                                .setTitle("👾 Miscellaneous")
                                .setDescription('Help Menu')
                                .setColor('#ec8d3a')
                                .addFields(
                                    {
                                        name: process.env.PREFIX+'help',
                                        value: 'Help Menu',
                                        inline: true,
                                    },
                                    {
                                        name: process.env.PREFIX+'st `reset`',
                                        value: 'View study timer\n`reset` resets timer to 0',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'dev',
                                        value: 'Hammy info.',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'ping',
                                        value: 'Ping Hammy',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'latency',
                                        value: 'Ping Hammy and Discordjs',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'hit',
                                        value: 'Hit things',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'selfrolemenu',
                                        value: 'Print self role menu',
                                        inline: false,
                                    },
                                );
                                reaction.message.channel.send(embed);
                            break;
                        case '🛠':
                            embed = new Discord.MessageEmbed()
                                .setTitle("🛠 Admin Tools")
                                .setDescription('Help Menu')
                                .setColor('#ec8d3a')
                                .addFields(
                                    {
                                        name: process.env.PREFIX+'ban `tag`',
                                        value: 'Ban a member\n`tag` @member',
                                        inline: true,
                                    },
                                    {
                                        name: process.env.PREFIX+'kick `tag`',
                                        value: 'Kick a member\n`tag` @member',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'mute `tag` `duration` `unit`',
                                        value: 'Mute a member\n`tag` @member\n`duration` number\n`unit` m(inutes), h(ours), d(ays), life',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'unmute `tag`',
                                        value: 'Unmute a muted member\n`tag` @member',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'warn `tag` `reason`',
                                        value: 'Warn a member\n`tag` @member',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'listwarnings `tag`',
                                        value: 'List previous warnings\n`tag` @member',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'status `availability` `activity` `message`',
                                        value: "Set Hammy's status\n`availability` online, idle, invisible, dnd\n`activity` PLAYING, LISTENING, WATCHING, COMPETING",
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'clear',
                                        value: 'Bulk delete messages in a channel',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'addbalance `tag` `amount`',
                                        value: "Add paasta to a user's balance\n`tag` @member\n`amount` amount to add",
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'poll `question` `-o option`',
                                        value: 'Host a poll\n`question` question to poll\n`-o option`type -o before each option',
                                        inline: false,
                                    },
                                );
                                const last = reaction.users.cache.last();
                                if(admins.includes(last.id))
                                {
                                    reaction.message.channel.send(embed);
                                }
                                else
                                {
                                    reaction.message.channel.send(`<@${last.id}>, you're not an administrator!`);
                                }
                            break;
                    }
                }
                else
                {
                    switch (name) {
                        case '🌸':
                            var embed = new Discord.MessageEmbed()
                                .setTitle("🌸 にほんご")
                                .setDescription('Help Menu')
                                .setColor('#ec8d3a')
                                .addFields(
                                    {
                                        name: process.env.PREFIX+'jpn `word`',
                                        value: 'English-Japanese and Japanese-English dictionary.\n`word` search term (english, romaji, kana, kanji)',
                                        inline: true,
                                    },
                                    {
                                        name: process.env.PREFIX+'kanji `word`',
                                        value: 'Kanji dictionary.\n`word` kanji',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'example `word`',
                                        value: 'Kanji, kana, and english examples of `word `.\n`word` search term (english, kana, kanji)',
                                        inline: false,
                                    },
                                );
                                reaction.message.channel.send(embed);
                            break;
                        case '🎶':
                            var embed = new Discord.MessageEmbed()
                                .setTitle("🎶 Music")
                                .setDescription('Help Menu')
                                .setColor('#ec8d3a')
                                .addFields(
                                    {
                                        name: process.env.PREFIX+'play `song title/url`',
                                        value: 'Play `song` in your voice channel.',
                                        inline: true,
                                    },
                                    {
                                        name: process.env.PREFIX+'skip `number`',
                                        value: 'Skip to `number` song in queue.',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'stop',
                                        value: 'Stop playing music in your voice channel.',
                                        inline: false,
                                    },
                                    {
                                        name: process.env.PREFIX+'queue',
                                        value: 'View the song queue.',
                                        inline: false,
                                    },
                                );
                                reaction.message.channel.send(embed);
                            break;
                        case '💴':
                            embed = new Discord.MessageEmbed()
                                .setTitle("💴 Economy")
                                .setDescription('Help Menu')
                                .setColor('#ec8d3a')
                                .addFields(
                                    {
                                        name: process.env.PREFIX+'balance `tag`',
                                        value: "View balance\n`tag` @member",
                                        inline: true,
                                    },
                                    {
                                        name: process.env.PREFIX+'pay `tag` `amount`',
                                        value: 'Pay a user\n`tag` @member\n`amount` amount to pay',
                                        inline: false,
                                    },
                                );
                                reaction.message.channel.send(embed);
                            break;
                        case '🧪':
                            embed = new Discord.MessageEmbed()
                                .setTitle("🧪 XP")
                                .setDescription('Help Menu')
                                .setColor('#ec8d3a')
                                .addFields(
                                    {
                                        name: process.env.PREFIX+'leaderboard',
                                        value: "View users ranked by level",
                                        inline: true,
                                    },
                                    {
                                        name: process.env.PREFIX+'rank `tag`',
                                        value: 'View user profile\n`tag` user',
                                        inline: false,
                                    },
                                );
                                reaction.message.channel.send(embed);
                            break;
                        case '👾':
                            embed = new Discord.MessageEmbed()
                                .setTitle("👾 Miscellaneous")
                                .setDescription('Help Menu')
                                .setColor('#ec8d3a')
                                .addFields(
                                    {
                                        name: process.env.PREFIX+'help',
                                        value: 'Help Menu',
                                        inline: true,
                                    },
                                    {
                                        name: process.env.PREFIX+'st `reset`',
                                        value: 'View study timer\n`reset` reset timer to 0',
                                        inline: false,
                                    },
                                );
                                reaction.message.channel.send(embed);
                            break;
                    }
                }
            }
        }
        else
        {
            if(reaction.message.embeds[0].footer != null)
            {
                if(reaction.message.embeds[0].footer.text.includes('Card'))
                {
                    if(name === '⏪')
                    {
                        reaction.message.delete();
                        cardIndex--;
                        if(cardIndex < 0)
                        {
                            cardIndex = cards.length-1;
                        }
                        currCard = cards[cardIndex];
                        fCard
                        .setTitle(currCard.front)
                        .setFooter('Chapter ' + currCard.chapter.toString() +'\n⏪Previous Card; 🔁Flip Card; ⏩Next Card')
                        ;
                        reaction.message.channel.send(fCard).then( (card) => {
                            card.react('⏪');
                            card.react('🔁');
                            card.react('⏩');
                        });
                        cardState = 'front';

                    }
                    else if(name === '🔁')
                    {
                        reaction.message.delete();
                        if(cardState === 'front')
                        {
                            fCard.setTitle(currCard.back);
                            cardState = 'back';
                        }
                        else
                        {
                            fCard.setTitle(currCard.front);
                            cardState = 'front';
                        }
                        reaction.message.channel.send(fCard).then( (card) => {
                            card.react('⏪');
                            card.react('🔁');
                            card.react('⏩');
                        });
                    }
                    else if(name === '⏩')
                    {
                        cardIndex++
                        if(cardIndex >= cards.length)
                        {
                            cardIndex = 0;
                        }
                        currCard = cards[cardIndex];
                        fCard
                        .setTitle(currCard.front)
                        .setFooter('Chapter ' + currCard.chapter.toString() +'\n⏪Previous Card; 🔁Flip Card; ⏩Next Card')
                        ;
                        reaction.message.delete();
                        reaction.message.channel.send(fCard).then((card) => {
                            card.react('⏪');
                            card.react('🔁');
                            card.react('⏩');
                        });
                        cardState = 'front';
                    }
                }
            }
        }
        return;
    }

    //roles    
    //class level
    if(reaction.message.id === '832121866898505758') {
        switch (name) {
            case '📙':
                member.roles.add('779991142049120286');
                break;
            case '📕':
                member.roles.add('779991296088997898');
                break;
            case '📗':
                member.roles.add('779991359627984936');
                break;
            case '📘':
                member.roles.add('779991425235550228');
                break;
            case '📚':
                member.roles.add('785997424912367676');
                break;
        }
        return;
    }
    //prof
    if(reaction.message.id === '832121867552161812') {
        switch (name) {
            case '🍇':
                member.roles.add('779989949058777108');
                break;
            case '🍋':
                member.roles.add('780277964540477461');
                break;
            case '🌸':
                member.roles.add('779989721346080768');
                break;
            case '🍐':
                member.roles.add('779990060057231380');
                break;
            case '🍓':
                member.roles.add('779989636318494741');
                break;
        }
        return;
    }
    //pronouns
    if(reaction.message.id === '832121867988631594') {
        switch (name) {
            case '💙':
                member.roles.add('779984174852735007');
                break;
            case '💚':
                member.roles.add('779985463213293578');
                break;
            case '💛':
                member.roles.add('779985428966932511');
                break;
            case '🧡':
                member.roles.add('779985399560798229');
                break;
            case '❤':
                member.roles.add('779985345202225183');
                break;
            case '🤍':
                member.roles.add('779985234115559435');
                break;
            case '🖤':
                member.roles.add('779984906360586250');
                break;
        }
        return;
    }
});

//reaction removed
client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;

    //roles
    const member = reaction.message.guild.members.cache.get(user.id);
    //class level
    if(reaction.message.id === '832121866898505758') {
        switch (name) {
            case '📙':
                member.roles.remove('779991142049120286');
                break;
            case '📕':
                member.roles.remove('779991296088997898');
                break;
            case '📗':
                member.roles.remove('779991359627984936');
                break;
            case '📘':
                member.roles.remove('779991425235550228');
                break;
            case '📚':
                member.roles.remove('785997424912367676');
                break;
        }
        return;
    }
    //prof
    if(reaction.message.id === '832121867552161812') {
        switch (name) {
            case '🍇':
                member.roles.remove('779989949058777108');
                break;
            case '🍋':
                member.roles.remove('780277964540477461');
                break;
            case '🌸':
                member.roles.remove('779989721346080768');
                break;
            case '🍐':
                member.roles.remove('779990060057231380');
                break;
            case '🍓':
                member.roles.remove('779989636318494741');
                break;
        }
        return;
    }
    //pronouns
    if(reaction.message.id === '832121867988631594') {
        switch (name) {
            case '💙':
                member.roles.remove('779984174852735007');
                break;
            case '💚':
                member.roles.remove('779985463213293578');
                break;
            case '💛':
                member.roles.remove('779985428966932511');
                break;
            case '🧡':
                member.roles.remove('779985399560798229');
                break;
            case '❤':
                member.roles.remove('779985345202225183');
                break;
            case '🤍':
                member.roles.remove('779985234115559435');
                break;
            case '🖤':
                member.roles.remove('779984906360586250');
                break;
        }
        return;
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);