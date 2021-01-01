module.exports =
{
    commands: 'poll',
    expectedArgs: '',
    permissionError: 'You do not have permission to run this command.',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments, text) =>
    {
        var ques = '';
        var comp = false;
        var opt = [];
        var optStr = '';

        for(i=0;i<arguments.length;i++)
        {
            if(arguments[i] === '-o')
            {
                if(comp)
                {
                    optStr = optStr.substring(1);
                    opt.push(optStr);
                    optStr = '';
                }
                else
                {
                    ques = ques.substring(1);
                    ques += '?';
                    comp = true;
                }
            }
            else
            {
                if(comp)
                {
                    optStr += ' '+arguments[i];
                    if(i == arguments.length-1) opt.push(optStr);
                }
                else
                {
                    ques += ' '+arguments[i];
                }
            }
        }

        var allEmojis =
        [
            '⚪', '⚫', '🔴', '🔵', '🟠', '🟡', '🟢', '🟣', '🟤', '⬛', '⬜', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '🟫'
        ];
        var randEmojis = [];

        if(opt.length > 18)
        {
            message.channel.send('Please give less than 18 options!');
            return;
        }

        for(i=0;i<opt.length;i++)
        {
            var randEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
            while(randEmojis.includes(randEmoji))
            {
                randEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
            }
            randEmojis.push(randEmoji);
        }

        var poll = '**' +ques + '**' + '\n\n';
        for(i=0;i<opt.length;i++)
        {
            poll += randEmojis[i] + ': ' + opt[i];
            if(i!=opt.length-1) poll+='\n';
        }

        message.delete();

        message.channel.send(poll).then( (message) => {
            for(i=0;i<opt.length;i++)
            {
                message.react(randEmojis[i]);
            }
        });
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}