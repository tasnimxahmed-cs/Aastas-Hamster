module.exports =
{
    commands: ['rockpaperscissor', 'rps'],
    expectedArgs: '`amount`',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text) =>
    {
        if(isNaN(arguments[0]))
        {
            message.channel.send('Please specify how many paasta you would like to gamble!');
            return;
        }

        randNum = Math.floor(Math.random() * 3);
        //0 = rock, 1 = paper, 2 = scissor

        message.channel.send('rock, paper, scissors, says, shoot!').then((rps) => {
            rps.react('🗻');
            rps.react('📄');
            rps.react('✂');
        })
    },
    permissions: [],
    requiredRoles: [],
}