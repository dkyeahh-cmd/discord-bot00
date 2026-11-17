const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates // ضروري عشان البوت يدخل الرومات الصوتية
    ]
});

// الأيدي تبع الروم الصوتي اللي تبيه يجلس فيه (حط أيدي الروم هنا)
const VOICE_CHANNEL_ID = '157233411719428188';

client.once('ready', async () => {
    console.log(`تم تسجيل الدخول بنجاح باسم ${client.user.tag}`);

    // Streaming ضبط حالة البوت على //
    client.user.setPresence({
        activities: [{
            name: 'اسم البوت أو الحالة حقك',
            type: Activity.Streaming,
            url: 'https://www.twitch.tv/twitch' // رابط توتش وهمي عشان تضبط علامة البريل //
        }],
        status: 'online',
    });

    // محاولة دخول الروم الصوتي أول ما يشتغل //
    try {
        const channel = await client.channels.fetch(VOICE_CHANNEL_ID);
        if (channel && channel.isVoiceBased()) {
            const { joinVoiceChannel } = require('@discordjs/voice');
            joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: true
            });
            console.log(`تم بنجاح الانضمام للروم الصوتي: ${channel.name}`);
        } else {
            console.log('الروم الصوتي غير موجود أو الأيدي خطأ!');
        }
    } catch (error) {
        console.error('صار خطأ أثناء محاولة دخول الروم الصوتي:', error);
    }
});

// تسجيل الدخول بطريقة آمنة باستخدام متغير البيئة السري
client.login(process.env.DISCORD_TOKEN);
