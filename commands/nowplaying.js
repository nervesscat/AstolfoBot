const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "nowplaying",
  description: "Muestra qué canción está sonando actualmente",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["np", "nowplaying", "now playing"],
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

    let song = player.queue.current;
    let QueueEmbed = new MessageEmbed()
      .setAuthor("Actualmente reproduciendo", client.config.IconURL)
      .setColor("RANDOM")
      .setDescription(`[${song.title}](${song.uri})`)
      .addField("Pedida por", `${song.requester}`, true)
      .addField(
        "Duración",
        `${
          client.ProgressBar(player.position, player.queue.current.duration, 15)
            .Bar
        } \`${prettyMilliseconds(player.position, {
          colonNotation: true,
        })} / ${prettyMilliseconds(player.queue.current.duration, {
          colonNotation: true,
        })}\``
      )
      .setThumbnail(player.queue.current.displayThumbnail());
    return message.channel.send(QueueEmbed);
  },
};
