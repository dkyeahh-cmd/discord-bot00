const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// أيدي الروم الصوتي
const VOICE_CHANNEL_ID = '1572334111719428188';

client.once('ready', async () => {
    console.log(`تم تسجيل الدخول بنجاح باسم ${client.user.tag}`);

    // محاولة دخول الروم الصوتي مع حماية كاملة ضد الأخطاء
    try {
        const channel = await client.channels.fetch(VOICE_CHANNEL_ID);
        if (channel && channel.isVoiceBased()) {
            joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: true
            });
            console.log(`تم بنجاح الانضمام للروم الصوتي: ${channel.name}`);
        } else {
            console.log('الروم الصوتي غير موجود أو ليس روم صوتي!');
        }
    } catch (error) {
        console.error('خطأ أثناء محاولة دخول الروم الصوتي (تأكد أن البوت يملك صلاحية رؤية الروم ودخوله):', error.message);
    }
});

// منع البوت من الإغلاق بسبب الأخطاء المفاجئة
process.on('unhandledRejection', error => {
    console.error('خطأ غير معالج تم تجنبه:', error);
});

// تسجيل الدخول باستخدام متغير البيئة السري
client.login(process.env.DISCORD_TOKEN);
