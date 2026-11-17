const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates // ضروري عشان البوت يدخل الرومات الصوتية
    ]
});

// الأيدي تبع الروم الصوتي اللي تبيه يجلس فيه (حط أيدي الروم هنا)
const VOICE_CHANNEL_ID = '1572334111719428188'; 

client.once('ready', async () => {
    console.log(`تم تسجيل الدخول بنجاح باسم: ${client.user.tag}`);

    // ضبط حالة البوت على Streaming
    client.user.setPresence({
        activities: [{
            name: 'اسم البث أو الحالة حقك',
            type: ActivityType.Streaming,
            url: 'https://www.twitch.tv/twitch' // رابط تويتش وهمي عشان تضبط علامة البربل
        }],
        status: 'online',
    });

    // محاولة دخول الروم الصوتي أول ما يشتغل
    try {
        const channel = await client.channels.fetch(VOICE_CHANNEL_ID);
        if (channel && channel.isVoiceBased()) {
            const { joinVoiceChannel } = require('@discordjs/voice');
            joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            console.log(`دخل البوت الروم الصوتي بنجاح: ${channel.name}`);
        } else {
            console.log('ما قدرت أحصل الروم الصوتي، تأكد من الأيدي!');
        }
    } catch (error) {
        console.error('صار خطأ أثناء محاولة دخول الروم الصوتي:', error);
    }
});

// ضع توكن بوتك هنا (يفضل ينحط في بيئة العمل بس كبداية حطه هنا لو تبي)
client.login('');
