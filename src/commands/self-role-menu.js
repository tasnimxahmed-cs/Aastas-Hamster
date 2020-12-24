module.exports =
{
    commands: 'srm',
    expectedArgs: '',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) =>
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
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}