const Commando = require('discord.js-commando');

module.exports = class SelfRoleMenuCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'selfrolemenu',
            aliases: ['srm'],
            group: 'misc',
            memberName: 'selfrolemenu',
            description: 'print self role menu',
            argsType: 'single',
            argsCount: 0,
            userPermissions: ['ADMINISTRATOR'],
            ownerOnly: true,
        });
    };

    async run(message, args)
    {
        if(args.length > 0)
        {
            message.reply('please use the appropriate arguments!');
            return;
        }
        var intro = "Hello! Please react to the following messages to give yourself your roles!";
        var classLev = "**Class Level**\n\n📙: `JPN 101`\n\n📕: `JPN 102`\n\n📗: `JPN 201`\n\n📘: `JPN 202`\n\n📚: `No JPN`";
        var prof = "**Professor**\n\n🍇: `Barkan Sensei`\n\n🍋: `Nakamura Sensei`\n\n🌸: `Sakurai Sensei`\n\n🍐: `Takeda Sensei`\n\n🍓: `Yokohama Sensei`";
        var pronouns = "**Pronouns**\n\n💙: `She/Her`\n\n💚: `He/Him`\n\n💛: `They/Them`\n\n🧡: `She/They`\n\n❤: `He/They`\n\n🤍: `All Pronouns`\n\n🖤: `No Pronouns`";
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
};