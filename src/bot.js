require('dotenv').config();

const { Client, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

const mongo = require('./mongo.js');

const messageCount = require('./message-counter.js');

//ready
client.on('ready', async () => {
    console.log(`${client.user.tag} has logged in.`);

    client.user.setPresence({
        status: 'online',
        activity: {
            type: 2,
            name: 'Takeda Sensei'
        }
    });
    client.user.setUsername("Aasta's Hamster");

    const hunterJapanese = client.guilds.cache.get('749100160402849805');
    const memCountChannel = hunterJapanese.channels.cache.get('786482126315978772');
    memCountChannel.setName('Member Count: '+(hunterJapanese.memberCount.toString()));

    await mongo().then(mongoose => {
        try
        {
            console.log('Connected to mongo!');
        }
        finally
        {
            mongoose.connection.close();
        }
    });

    messageCount(client);
});

//message sent
client.on('message', (message) => {
    if(message.author.bot) return;
    if(message.content.startsWith(process.env.PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(process.env.PREFIX.length)
        .split(/\s+/);

        //pingpong
        if(CMD_NAME.toLowerCase() === 'ping')
        {
            message.channel.send('pong!');
            return;
        }
        //hit me
        if(CMD_NAME.toLowerCase() === 'hit' && args.length == 5 && args[0].toLowerCase() === 'me' && args[1].toLowerCase() === 'for' && args[2].toLowerCase() === 'it' && args[3].toLowerCase() === 'one' && args[4].toLowerCase() === 'time')
        {
            message.channel.send('OW!');
            return;
        }
        if(CMD_NAME.toLowerCase() === 'hit' && args.length == 5 && args[0].toLowerCase() === 'aasta' && args[1].toLowerCase() === 'over' && args[2].toLowerCase() === 'and' && args[3].toLowerCase() === 'over' && args[4].toLowerCase() === 'again')
        {
            message.channel.send('oOF!');
            message.channel.send('woMP!');
            message.channel.send('ripperoni');
            message.channel.send('hecC!');
            message.channel.send('*sob*');
            return;
        }
        if(CMD_NAME.toLowerCase() === 'hit' && args.length == 2 && args[0].toLowerCase() === 'it' && args[1].toLowerCase() === 'hammy')
        {
            message.channel.send('oHOOO BABYYYY nohOOOOO BABY awoohoohoohOOOOOOOOOOOOOOOOOOOO!');
            return;
        }

        //help
        if(CMD_NAME.toLowerCase() === 'help' || CMD_NAME.toLowerCase() === 'pls')
        {
            if(message.member.hasPermission('ADMINISTRATOR'))
            {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Aasta's Hamster 🐹")
                    .setThumbnail(client.user.avatarURL())
                    .setColor('#ec8d3a')
                    .setURL('https://github.com/tasnimxahmed-cs/Aastas-Hamster')
                    .setFooter('© メアリーさん')
                    .addFields(
                        {
                            name: 'Help Menu',
                            value: 'React with an emoji to view corresponding commands!',
                            inline: true,
                        },
                        {
                            name: '`🌸` にほんご',
                            value: 'Learn Japanese with Hammy! 🤓',
                            inline: false,
                        },
                        {
                            name: '`🤡` For Fun',
                            value: 'Working hard, or hardly working? 🤔',
                            inline: false,
                        },
                        {
                            name: '`🌱` Miscellaneous',
                            value: 'Who knows? 🤷‍♂️',
                            inline: true,
                        },
                        {
                            name: '`🛠` Admin Tools',
                            value: 'imagine not being admin lmaoo',
                            inline: false,
                        },
                    );
                message.channel.send(embed).then((message) => {
                    message.react('🌸');
                    message.react('🤡');
                    message.react('🌱');
                    message.react('🛠');
                });
                return;
            }
            else
            {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Aasta's Hamster 🐹")
                    .setThumbnail(client.user.avatarURL())
                    .setColor('#ec8d3a')
                    .setURL('https://github.com/tasnimxahmed-cs/Aastas-Hamster')
                    .setFooter('© メアリーさん')
                    .addFields(
                        {
                            name: 'Help Menu',
                            value: 'React with the corresponding emoji to view commands!',
                            inline: true,
                        },
                        {
                            name: '`🌸` にほんご',
                            value: 'Learn Japanese with Hammy! 🤓',
                            inline: false,
                        },
                        {
                            name: '`🤡` For Fun',
                            value: 'Working hard, or hardly working? 🤔',
                            inline: false,
                        },
                        {
                            name: '`🌱` Miscellaneous',
                            value: 'Who knows? 🤷‍♂️',
                            inline: true,
                        },
                    );
                message.channel.send(embed).then((message) => {
                    message.react('🌸');
                    message.react('🤡');
                    message.react('🌱');
                });
                return;
            }
            
        }

        //ban
        if(CMD_NAME.toLowerCase() === 'ban')
        {
            if(message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('BAN_MEMBERS'))
            {
                const target = message.mentions.users.first();
                if(target)
                {
                    const targetMember = message.guild.members.cache.get(target.id);
                    targetMember.ban();
                    message.channel.send('They have been banned.');
                }
                else
                {
                    message.channel.send(`<@${message.member.id}>, please specify who to ban!`);
                }
            }
            else
            {
                message.channel.send(`<@${message.member.id}>, you do not have permission to use this command!`);
            }
        }

        //kick
        if(CMD_NAME.toLowerCase() === 'kick')
        {
            if(message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('KICK_MEMBERS'))
            {
                const target = message.mentions.users.first();
                if(target)
                {
                    const targetMember = message.guild.members.cache.get(target.id);
                    targetMember.kick();
                    message.channel.send('They have been kicked.');
                }
                else
                {
                    message.channel.send(`<@${message.member.id}>, please specify who to kick!`);
                }
            }
            else
            {
                message.channel.send(`<@${message.member.id}>, you do not have permission to use this command!`);
            }
        }

        //clear
        if(CMD_NAME.toLowerCase() === 'clear')
        {
            if(message.member.hasPermission('ADMINISTRATOR'))
            {
                message.channel.messages.fetch().then((results) => {
                    message.channel.bulkDelete(results);
                });
            }
            return;
        }

        //status
        if(CMD_NAME.toLowerCase() === 'status')
        {
            if(message.member.hasPermission('ADMINISTRATOR'))
            {
                var stat = args[2];
                for(i=3; i<args.length; i++)
                {
                    stat += ' '+args[i];
                }
                client.user.setPresence({
                    status: args[0],
                    activity: {
                        type: args[1],
                        name: stat
                    }
                });
            }
            return;
        }

        //info
        if(CMD_NAME.toLowerCase() === 'info')
        {
            const { guild } = message;
            const { name, region, memberCount, owner } = guild;
            const icon = guild.iconURL();
            const embed = new Discord.MessageEmbed()
            .setTitle(`${name}`)
            .setThumbnail(icon)
            .addFields(
                {
                    name: 'Region',
                    value: region,
                },
                {
                    name: 'Members',
                    value: memberCount,
                },
                {
                    name: 'Owner',
                    value: owner.user.tag,
                },
            )
            .setColor('#ffb7c5');

            message.channel.send(embed);
            return;
        }

        //dev
        if(CMD_NAME.toLowerCase() === 'dev')
        {
            const embed = new Discord.MessageEmbed()
                .setTitle("Aasta's Hamster 🐹")
                .setThumbnail(client.user.avatarURL())
                .setColor('#ec8d3a')
                .setURL('https://github.com/tasnimxahmed-cs/Aastas-Hamster')
                .setFooter('© メアリーさん')
                .addFields(
                    {
                        name: 'Developer',
                        value: 'Tasnim Ahmed',
                        inline: true,
                    },
                    {
                        name: 'Language',
                        value: 'Javascript',
                        inline: false,
                    },
                    {
                        name: 'Github Repository',
                        value: 'https://github.com/tasnimxahmed-cs/Aastas-Hamster',
                        inline: false,
                    },
                );
            message.channel.send(embed);
            return;
        }

        //poll
        if(CMD_NAME.toLowerCase() === 'poll1')
        {
            if(message.member.hasPermission('ADMINISTRATOR'))
            {
                const fetched = message.channel.messages.fetch({limit: 2}).then((results => {
                    let lm = results.last();
                    lm.react('👍');
                    lm.react('👎');
                }));
                message.delete();
            }
            return;
        }

        //pollv2
        if(CMD_NAME.toLowerCase() === 'poll2')
        {

        }


        //roleMenu
        if(CMD_NAME.toLowerCase() === 'rolemenu')
        {
            var intro = "Hello! Please react to the following messages to give yourself your roles!";
            var classLev = "**Class Level**\n\n📙: `JPN 101`\n\n📕: `JPN 102`\n\n📗: `JPN 201`\n\n📘: `JPN 202`\n\n📚: `No JPN`";
            var prof = "**Professor**\n\n🍇: `Barkan Sensei`\n\n🍋: `Nakamura Sensei`\n\n🌸: `Sakurai Sensei`\n\n🍐: `Takeda Sensei`\n\n🍓: `Yokohama Sensei`";
            var gradYear = "**Graduating Year**\n\n🍗: `2021`\n\n🐔: `2022`\n\n🐤: `2023`\n\n🐥: `2024`\n\n🐣: `2025`";
            var pronouns = "**Pronouns**\n\n💙: `She/Her`\n\n💚: `He/His`\n\n💛: `They/Them`\n\n🧡: `She/They`\n\n❤: `He/They`\n\n🤍: `All Pronouns`\n\n🖤: `No Pronouns`";
            message.channel.send(intro);
            message.channel.send(classLev).then(sentClassLev => {
                sentClassLev.react("📙");
                sentClassLev.react("📕");
                sentClassLev.react("📗");
                sentClassLev.react("📘");
                sentClassLev.react("📚");
            });
            message.channel.send(prof).then(sentProf => {
                sentProf.react("🍇");
                sentProf.react("🍋");
                sentProf.react("🌸");
                sentProf.react("🍐");
                sentProf.react("🍓");
            });
            message.channel.send(gradYear).then(sentGradYear => {
                sentGradYear.react("🍗");
                sentGradYear.react("🐔");
                sentGradYear.react("🐤");
                sentGradYear.react("🐥");
                sentGradYear.react("🐣");
            });
            message.channel.send(pronouns).then(sentPronouns => {
                sentPronouns.react("💙");
                sentPronouns.react("💚");
                sentPronouns.react("💛");
                sentPronouns.react("🧡");
                sentPronouns.react("❤");
                sentPronouns.react("🤍");
                sentPronouns.react("🖤");
            });
            return;
        }
    }
});

//new member
client.on('guildMemberAdd', (member) => {
    
    //welcome msg
    const channel = member.guild.channels.cache.get('778473299016417330');
    const message = `いらっしゃいませ！<@${member.id}> is now a part of the **${member.guild.name}** family! We're so excited you're here!\n\nPlease change your nickname to your real name and head on over to ${member.guild.channels.cache.get('785002534640418876').toString()} to have our bot add some roles to your account! We want to get to know a bit more about you, and it's important that you have the right teacher assigned: each teacher will have access to a private text channel meant just for you and your classmates who have the same sensei!\n\nNext, go introduce yourself in ${member.guild.channels.cache.get('785335528949415937').toString()} and then say hi in ${member.guild.channels.cache.get('749100160868548690').toString()}, ask for help in ${member.guild.channels.cache.get('749111308951224360').toString()}, or put your skills to the test in ${member.guild.channels.cache.get('778477527886594048').toString()}. Feel free to chat anytime! Have fun with the server, use the bots, join the voice channels and study/chill with us :D If you have any questions or suggestions, feel free to ping ${member.guild.roles.cache.get('778482064210919434').toString()} in ${member.guild.channels.cache.get('779145280863993896').toString()}! We hope you enjoy your stay!!`

    channel.send(message);

    //mem count stat
    const hunterJapanese = client.guilds.cache.get('749100160402849805');
    const memCountChannel = hunterJapanese.channels.cache.get('786482126315978772');
    memCountChannel.setName('Member Count: '+(hunterJapanese.memberCount).toString());
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

//reaction added
client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;

    //help
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
        if(arrEmb[0].fields.length == 0) return;
        var field1 = arrEmb[0].fields[0];
        if(field1.name === 'Help Menu')
        {
            if(arrEmb[0].fields.length == 5)
            {
                switch (name) {
                    case '🌸':
                        var embed = new Discord.MessageEmbed()
                            .setTitle("🌸 にほんご")
                            .setDescription('Help Menu')
                            .setColor('#ec8d3a')
                            .addFields(
                                {
                                    name: 'Coming soon!',
                                    value: 'Coming Soon!',
                                    inline: true,
                                },
                            );
                            reaction.message.channel.send(embed);
                        break;
                    case '🤡':
                        embed = new Discord.MessageEmbed()
                            .setTitle("🤡 For Fun")
                            .setDescription('Help Menu')
                            .setColor('#ec8d3a')
                            .addFields(
                                {
                                    name: process.env.PREFIX+'ping',
                                    value: 'Pong!',
                                    inline: true,
                                },
                                {
                                    name: process.env.PREFIX+'hit me for it one time',
                                    value: 'Hit Hammy',
                                    inline: false,
                                },
                            );
                            reaction.message.channel.send(embed);
                        break;
                    case '🌱':
                        embed = new Discord.MessageEmbed()
                            .setTitle("🌱 Miscellaneous")
                            .setDescription('Help Menu')
                            .setColor('#ec8d3a')
                            .addFields(
                                {
                                    name: process.env.PREFIX+'help',
                                    value: 'Prints the help menu!',
                                    inline: true,
                                },
                                {
                                    name: process.env.PREFIX+'dev',
                                    value: 'Information about Hammy!',
                                    inline: false,
                                },
                                {
                                    name: process.env.PREFIX+'info',
                                    value: `Information about ${reaction.message.guild.name}!`,
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
                                    value: 'Ban a member.\n`tag` @member',
                                    inline: true,
                                },
                                {
                                    name: process.env.PREFIX+'kick `tag`',
                                    value: 'Kick a member.\n`tag` @member',
                                    inline: false,
                                },
                                {
                                    name: process.env.PREFIX+'status `availability` `activity` `message`',
                                    value: "Set Hammy's status!\n`availability` online, idle, invisible, dnd\n`activity` PLAYING, LISTENING, WATCHING, COMPETING",
                                    inline: false,
                                },
                                {
                                    name: process.env.PREFIX+'clear',
                                    value: 'Bulk delete messages in a channel.',
                                    inline: false,
                                },
                                {
                                    name: process.env.PREFIX+'poll',
                                    value: 'Hammy reacts to the last message with `👍` and `👎`.',
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
                                    name: 'Coming soon!',
                                    value: 'Coming Soon!',
                                    inline: true,
                                },
                            );
                            reaction.message.channel.send(embed);
                        break;
                    case '🤡':
                        embed = new Discord.MessageEmbed()
                            .setTitle("🤡 For Fun")
                            .setDescription('Help Menu')
                            .setColor('#ec8d3a')
                            .addFields(
                                {
                                    name: process.env.PREFIX+'ping',
                                    value: 'Pong!',
                                    inline: true,
                                },
                                {
                                    name: process.env.PREFIX+'hit me for it one time',
                                    value: 'Hit Hammy',
                                    inline: false,
                                },
                            );
                            reaction.message.channel.send(embed);
                        break;
                    case '🌱':
                        embed = new Discord.MessageEmbed()
                            .setTitle("🌱 Miscellaneous")
                            .setDescription('Help Menu')
                            .setColor('#ec8d3a')
                            .addFields(
                                {
                                    name: process.env.PREFIX+'help',
                                    value: 'Prints the help menu!',
                                    inline: true,
                                },
                                {
                                    name: process.env.PREFIX+'dev',
                                    value: 'Information about Hammy!',
                                    inline: false,
                                },
                                {
                                    name: process.env.PREFIX+'info',
                                    value: `Information about ${reaction.message.guild.name}!`,
                                    inline: false,
                                },
                            );
                            reaction.message.channel.send(embed);
                        break;
                }
            }
        }
        return;
    }

    //roles
    const member = reaction.message.guild.members.cache.get(user.id);
    //class level
    if(reaction.message.id === '786152384027820032') {
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
    if(reaction.message.id === '786152384543457301') {
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
    //grad year
    if(reaction.message.id === '786152385222541324') {
        switch (name) {
            case '🍗':
                member.roles.add('779988296973287484');
                break;
            case '🐔':
                member.roles.add('779988406166880287');
                break;
            case '🐤':
                member.roles.add('779988463310733333');
                break;
            case '🐥':
                member.roles.add('779988556046794753');
                break;
            case '🐣':
                member.roles.add('779988607942393856');
                break;
        }
        return;
    }
    //pronouns
    if(reaction.message.id === '786152385969389578') {
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
    if(reaction.message.id === '786152384027820032') {
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
    if(reaction.message.id === '786152384543457301') {
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
    //grad year
    if(reaction.message.id === '786152385222541324') {
        switch (name) {
            case '🍗':
                member.roles.remove('779988296973287484');
                break;
            case '🐔':
                member.roles.remove('779988406166880287');
                break;
            case '🐤':
                member.roles.remove('779988463310733333');
                break;
            case '🐥':
                member.roles.remove('779988556046794753');
                break;
            case '🐣':
                member.roles.remove('779988607942393856');
                break;
        }
        return;
    }
    //pronouns
    if(reaction.message.id === '786152385969389578') {
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