const Commando = require('discord.js-commando');
const JishoAPI = require('unofficial-jisho-api')
const { client, Discord } = require('../../bot.js');

module.exports = class XCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'example',
            aliases: ['ex'],
            group: 'nihongo',
            memberName: 'example',
            description: 'search jisho for examples',
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
            message.reply('please enter one word at a time!');
            return;
        }
        const jisho = new JishoAPI();
        jisho.searchForExamples(args).then((data) => {
                try
                {
                    let example = data.results[0]
                    const embed = new Discord.MessageEmbed()
                    .setTitle(args)
                    .setThumbnail(client.user.avatarURL())
                    .setColor('#ec8d3a')
                    .setURL(data.uri)
                    .addFields(
                        {
                            name:'kanji',
                            value:example.kanji,
                            inline:true
                        },
                        {
                            name:'kana',
                            value:example.kana,
                            inline:false
                        },
                        {
                            name:'english',
                            value:example.english,
                            inline:false
                        }
                    );
                    message.channel.send(embed);
                }
                catch
                {
                    message.reply('query not found!');
                }
        });
    }
};