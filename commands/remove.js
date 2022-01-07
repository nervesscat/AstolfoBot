const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

  module.exports = {
    name: "remove",
    description: `Remueve una canción de la lista de reproducción`,
    usage: "[número]",
    permissions: {
      channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
      member: [],
    },
    aliases: ["rm"],

    /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.players.get(message.guild.id);
    const song = player.queue.slice(args[0] - 1, 1); 
    if (!player) return client.sendTime(message.channel, "❌ | **Nada está en reproducción...**");
    if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Debes estar en un chat de voz para usar este comando!**");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Debes estar en el mismo canal de voz para usar este comando!**");
        
    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return message.channel.send("No hay nada en la lista para remover");
    let rm = new MessageEmbed()
      .setDescription(`✅ **|** Canción removida **\`${Number(args[0])}\`** de la lista!`)
      .setColor("GREEN")
      if (isNaN(args[0]))rm.setDescription(`**Modo de Uso - **${client.config.prefix}\`remove [número]\``);
      if (args[0] > player.queue.length)
      rm.setDescription(`La lista solo tiene ${player.queue.length} canciones!`);
    await message.channel.send(rm);
    player.queue.remove(Number(args[0]) - 1);
  },
};