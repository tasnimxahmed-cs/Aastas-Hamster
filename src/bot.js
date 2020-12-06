require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});
const PREFIX = ":]";

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

client.on('message', (message) => {
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

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
        }
    }
});

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