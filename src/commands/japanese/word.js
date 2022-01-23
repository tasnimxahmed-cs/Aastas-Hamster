const Commando = require('discord.js-commando');
const JishoAPI = require('unofficial-jisho-api')
const { client, Discord } = require('../../bot.js');

module.exports = class XCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'jpn',
            aliases: [],
            group: 'nihongo',
            memberName: 'jpn',
            description: 'search jisho for a word/phrase',
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
        jisho.searchForPhrase(args).then((data) => {
            if(data.meta.status == 200)
            {
                const embed = new Discord.MessageEmbed()
                .setTitle(data.data[0].japanese[0].word+' ('+data.data[0].japanese[0].reading+')')
                .setThumbnail(client.user.avatarURL())
                .setColor('#ec8d3a')
                .setFooter(data.data[0].senses[0].parts_of_speech[0])
                .setDescription(data.data[0].senses[0].english_definitions[0]);
                message.channel.send(embed);
            }
            else
            {
                message.reply('query not found!');
            }
        });
    }
};