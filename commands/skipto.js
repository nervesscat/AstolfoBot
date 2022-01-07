const { MessageEmbed } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");

module.exports = {
  name: "skipto",
  description: `Salta a una canción específica de la lista de reproducción`,
  usage: "<número>",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["st"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    const player = client.Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: false,
    });

    if (!player) return client.sendTime(message.channel, "❌ | **Nada está en reproducción...**");
    if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Debes estar en un chat de voz para usar este comando!**");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Debes estar en el mismo canal de voz para usar este comando!**");

    try {
      if (!args[0]) return client.sendTime(message.channel, `**Modo de Uso**: \`${GuildDB.prefix}skipto [número]\``);
      //if the wished track is bigger then the Queue Size
      if (Number(args[0]) > player.queue.size) return client.sendTime(message.channel, `❌ | Esa canción no está en la lista, intentelo de nuevo.`);
      //remove all tracks to the jumped song
      player.queue.remove(0, Number(args[0]) - 1);
      //stop the player
      player.stop();
      //Send Success Message
      return client.sendTime(message.channel, `⏭ Saltada \`${Number(args[0] - 1)}\` canciones`);
    } catch (e) {
      console.log(String(e.stack).bgRed);
      client.sendError(message.channel, "Algo erróneo sucedió.");
    }
  },
};
