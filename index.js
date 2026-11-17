const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// أيدي الروم الصوتي
const VOICE_CHANNEL_ID = '1570291534618951693';

client.once('ready', async () => {
    console.log(`تم تسجيل الدخول بنجاح باسم ${client.user.tag}`);

    // ضبط حالة البوت على Streaming بشكل صحيح ومفعل
    client.user.setPresence({
        activities: [{
            name: '.',
            type: ActivityType.Streaming,
            url: 'https://www.twitch.tv/twitch' // رابط توتش ضروري عشان تظهر علامة البث البنفسجية
        }],
        status: 'online',
    });

    // محاولة دخول الروم الصوتي مع عكس إعدادات المايك والسماعة
    try {
        const channel = await client.channels.fetch(VOICE_CHANNEL_ID);
        if (channel && channel.isVoiceBased()) {
            joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: true,   // السماعة مغلقة (Deafened)
                selfMute: false   // المايك مفتوح (Unmuted)
            });
            console.log(`تم بنجاح الانضمام للروم الصوتي: ${channel.name}`);
        } else {
            console.log('الروم الصوتي غير موجود أو ليس روم صوتي!');
        }
    } catch (error) {
        console.error('خطأ أثناء محاولة دخول الروم الصوتي:', error.message);
    }
});

// منع البوت من الإغلاق بسبب الأخطاء المفاجئة
process.on('unhandledRejection', error => {
    console.error('خطأ غير معالج تم تجنبه:', error);
});

// تسجيل الدخول باستخدام متغير البيئة السري
client.login(process.env.DISCORD_TOKEN);
