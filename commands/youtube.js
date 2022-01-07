const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "youtube",
    description: "Empieza una sesión en Youtube Together",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["yt"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {require("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Debes estar en un chat de voz para usar este comando!**");
        if(!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE"))return client.sendTime(message.channel, "❌ | **El Bot no tiene permisos**");

        let Invite = await message.member.voice.channel.activityInvite("755600276941176913")//Made using discordjs-activity package
        let embed = new MessageEmbed()
        .setAuthor("YouTube Together", "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1")
        .setColor("#FF0000")
        .setDescription(`
Usando **YouTube Together** puedes ver videos con tus amigos en un canal de voz. Clickea *Unirse a YouTube Together* para unirte!

__**[Unirse a YouTube Together](https://discord.com/invite/${Invite.code})**__

⚠ **PD:** Solo funciona en PC
`)
        message.channel.send(embed)
    },
};
