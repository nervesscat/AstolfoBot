const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Borra la lista de reproducción",
  usage: "",
  aliases: ["cl", "cls"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Nada está en reproducción...**"
      );

    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return client.sendTime(message.channel, "❌ | **Nada está en reproducción...**");
      if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Debes estar en un chat de voz para usar este comando!**");
      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Debes estar en el mismo canal de voz para usar este comando!**");
    player.queue.clear();
    await client.sendTime(message.channel, "✅ | **Lista de reproducción limpia!**");
  },
};
