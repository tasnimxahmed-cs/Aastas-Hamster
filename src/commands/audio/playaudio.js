const Commando = require('discord.js-commando');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { queue } = require('../../bot.js');
const { getData, getPreview, getTracks } = require('spotify-url-info')

module.exports = class PlayAudioCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'playaudio',
            aliases: ['play', 'p'],
            group: 'audio',
            memberName: 'playaudio',
            description: 'plays audio',
            argsType: 'single',
            argsCount: 1,
            ownerOnly: false,
        })
    }

    async run(message, args)
    {
        const { voice } = message.member;

        const voice_channel = message.member.voice.channel;

        if(!voice.channelID)
        {
            message.reply('you must be in a voice channel!');
            return;
        }

        if(args.length < 1)
        {
            message.reply('please enter a song title!');
            return;
        }

        const serverQ = queue.get(message.guild.id);
        let song = {};
        let songURL = args;

        if(ytdl.validateURL(args[0]))
        {
            const songInfo = await ytdl.getInfo(args[0]);
            song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url };
        }
        else
        {
            const videoFinder = async (query) => {
                const videoResult = await ytSearch(query);
                return (videoResult.videos.length>1) ? videoResult.videos[0] : null;
            }

            if(args.includes('https://open.spotify.com'))
            {
                let s = await getPreview(args);
                var search = s.title+' '+s.artist;
            }
            else
            {
                var search = '';
                for(var i=0;i<args.length;i++)
                {
                    search+= args[i];
                }
            }
            
            const video = await videoFinder(search);
            if(video)
            {
                song = { title: video.title, url: video.url };
            }
            else
            {
                message.reply("i couldn't find your video! please try something else!");
            }
        }

        if(!serverQ)
        {
            const qConst = {
                voice_channel: voice_channel,
                text_channel: message.channel,
                connection: null,
                songs: []
            }

            queue.set(message.guild.id, qConst);
            qConst.songs.push(song);

            try
            {
                const connection = await voice_channel.join();
                qConst.connection = connection
                video_player(message.guild, qConst.songs[0]);
            }
            catch
            {
                queue.delete(message.guild.id);
                message.channel.send('there was an error connecting!');
                throw err;
            }
        }
        else
        {
            serverQ.songs.push(song);
            return message.channel.send(`🎶 **${song.title}** added to queue!`);
        }
    }
}

const video_player = async (guild, song) => {
    const songQ = queue.get(guild.id);

    if(!song)
    {
        songQ.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, { filter: 'audioonly' });
    songQ.connection.play(stream, { seek:0, volume: 0.5 })
    .on('finish', () => {
        songQ.songs.shift();
        video_player(guild, songQ.songs[0]);
    });
await songQ.text_channel.send(`🎶 Now playing **${song.title}**!`);
}