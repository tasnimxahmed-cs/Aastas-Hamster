const Commando = require('discord.js-commando');
const JishoAPI = require('unofficial-jisho-api')
const { client, Discord } = require('../../bot.js');

module.exports = class XCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'kanji',
            aliases: [],
            group: 'nihongo',
            memberName: 'kanji',
            description: 'search jisho for a kanji',
            argsType: 'single',
            userPermissions: [],
            ownerOnly: false,
        });
    };

    async run(message, args)
    {
        if(args == '' || args == ' ')
        {
            message.reply('please enter a search term!');
            return;
        }
        else if(args.includes(' '))
        {
            message.reply('please enter one kanji at a time!');
            return;
        }
        
        const jisho = new JishoAPI();
        jisho.searchForKanji(args).then(result => {
            if(result.found)
            {
                const embed = new Discord.MessageEmbed()
                .setTitle(args + ' (' +JSON.stringify(result.kunyomi[0])+')')
                .setThumbnail(client.user.avatarURL())
                .setColor('#ec8d3a')
                .setURL(result.uri)
                .setFooter('stroke count: ' +result.strokeCount)
                .setDescription(result.meaning);

                message.channel.send(embed);
                message.channel.send(result.strokeOrderGifUri);
            }
            else
            {
                message.reply('query not found!');
            }
        });
    }
};