const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "disconnect",
  description: "Detiene la música y me desconecta del server",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["leave", "exit", "quit", "dc", "stop"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Debes estar en un chat de voz para usar este comando!**");
    if (!player) return client.sendTime(message.channel,"❌ | **Nada está en reproducción...**");
    await client.sendTime(message.channel,":notes: | **Desconectado!**");
    await message.react("✅");
    player.destroy();
  },
};
