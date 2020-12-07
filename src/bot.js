require('dotenv').config();

const { Client, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

//ready
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);

    client.user.setPresence({
        status: 'online',
        activity: {
            type: 2,
            name: 'Takeda Sensei'
        }
    });
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
        if(CMD_NAME === 'ping')
        {
            message.channel.send('pong!');
            return;
        }
        //hit me
        if(CMD_NAME === 'hit' && args.length == 5 && args[0] === 'me' && args[1] === 'for' && args[2] === 'it' && args[3] === 'one' && args[4] === 'time')
        {
            message.channel.send('OW!');
            return;
        }
        if(CMD_NAME === 'hit' && args.length == 5 && args[0] === 'aasta' && args[1] === 'over' && args[2] === 'and' && args[3] === 'over' && args[4] === 'again')
        {
            message.channel.send('oOF!');
            message.channel.send('woMP!');
            message.channel.send('ripperoni');
            message.channel.send('hecC!');
            message.channel.send('*sob*');
            return;
        }

        //clear
        if(CMD_NAME === 'clear')
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
        if(CMD_NAME === 'status')
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
        if(CMD_NAME === 'info')
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
        if(CMD_NAME === 'dev')
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

        //clearChannel
        if (CMD_NAME === 'cc' || CMD_NAME === 'clearChannel')
        {
            if(message.member.hasPermission('ADMINISTRATOR'))
            {
                message.channel.messages.fetch().then((results) => {
                    message.channel.bulkDelete(results);
                });
            }
            return;
        }

        //poll
        if(CMD_NAME === 'poll')
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

        //roleMenu
        if(CMD_NAME === 'roleMenu')
        {
            var intro = "Hello! Please react to the following messages to give yourself your roles!";
            var classLev = "**Class Level**\n\n📙: `JPN 101`\n\n📕: `JPN 102`\n\n📗: `JPN 201`\n\n📘: `JPN 202`";
            var prof = "**Professor**\n\n🍇: `Barkan Sensei`\n\n🍋: `Nakamura Sensei`\n\n🌸: `Sakurai Sensei`\n\n🍐: `Takeda Sensei`\n\n🍓: `Yokohama Sensei`";
            var gradYear = "**Graduating Year**\n\n🍗: `2021`\n\n🐔: `2022`\n\n🐤: `2023`\n\n🐥: `2024`\n\n🐣: `2025`";
            var pronouns = "**Pronouns**\n\n💙: `She/Her`\n\n💚: `He/His`\n\n💛: `They/Them`\n\n🧡: `She/They`\n\n❤: `He/They`\n\n🤍: `All Pronouns`\n\n🖤: `No Pronouns`";
            message.channel.send(intro);
            message.channel.send(classLev).then(sentClassLev => {
                sentClassLev.react("📙");
                sentClassLev.react("📕");
                sentClassLev.react("📗");
                sentClassLev.react("📘");
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
    const channel = member.guild.channels.cache.get('778473299016417330');
    const message = `いらっしゃいませ！<@${member.id}> is now a part of the **${member.guild.name}** family! We're so excited you're here!\n\nPlease change your nickname to your real name and head on over to ${member.guild.channels.cache.get('785002534640418876').toString()} to have our bot add some roles to your account! We want to get to know a bit more about you, and it's important that you have the right teacher assigned: each teacher will have access to a private text channel meant just for you and your classmates who have the same sensei!\n\nNext, go introduce yourself in ${member.guild.channels.cache.get('785322972562980895').toString()} and then say hi in ${member.guild.channels.cache.get('749100160868548690').toString()}, ask for help in ${member.guild.channels.cache.get('749111308951224360').toString()}, or put your skills to the test in ${member.guild.channels.cache.get('778477527886594048').toString()}. Feel free to chat anytime! Have fun with the server, use the bots, join the voice channels and study/chill with us :D If you have any questions or suggestions, feel free to ping ${member.guild.roles.cache.get('778482064210919434').toString()} in ${member.guild.channels.cache.get('779145280863993896').toString()}! We hope you enjoy your stay!!`

    channel.send(message);
});

//reaction added
client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;

    //roles
    const member = reaction.message.guild.members.cache.get(user.id);
    //class level
    if(reaction.message.id === '785035923477757952') {
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
        }
    }
    //prof
    if(reaction.message.id === '785035924076625940') {
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
    }
    //grad year
    if(reaction.message.id === '785035924496580628') {
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
    }
    //pronouns
    if(reaction.message.id === '785035924970536971') {
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
    }
});

//reaction removed
client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;

    //roles
    const member = reaction.message.guild.members.cache.get(user.id);
    //class level
    if(reaction.message.id === '785035923477757952') {
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
        }
    }
    //prof
    if(reaction.message.id === '785035924076625940') {
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
    }
    //grad year
    if(reaction.message.id === '785035924496580628') {
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
    }
    //pronouns
    if(reaction.message.id === '785035924970536971') {
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
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);