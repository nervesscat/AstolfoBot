const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "seek",
    description: "Adelanta la canción",
    usage: "<tiempo s/m/h>",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["forward"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "❌ | **Nada está en reproducción...**");
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Debes estar en un chat de voz para usar este comando!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Debes estar en el mismo canal de voz para usar este comando!**");
        if (!player.queue.current.isSeekable) return client.sendTime(message.channel, "❌ | **No soy capaz de adelantar está canción**");
        let SeekTo = client.ParseHumanTime(args.join(" "));
        if (!SeekTo) return client.sendTime(message.channel, `**Modo de Uso - **\`${GuildDB.prefix}seek <s/m/h>\` \n**Ejemplo - **\`${GuildDB.prefix}seek 2m 10s\``);
        player.seek(SeekTo * 1000);
        message.react("✅");
    },
};

