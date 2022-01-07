const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "grab",
  description: "Guarda la canción actual en tu DM",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["save"],
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
   message.author.send(new MessageEmbed()
   .setAuthor(`Canción guardada`, client.user.displayAvatarURL({
    dynamic: true
  }))
  .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
  .setURL(player.queue.current.uri)
  .setColor("RANDOM")
  .setTitle(`**${player.queue.current.title}**`)
  .addField(`⌛ Duración: `, `\`${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}\``, true)
  .addField(`🎵 Autor: `, `\`${player.queue.current.author}\``, true)
  .addField(`▶ Reproducela:`, `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
  }play ${player.queue.current.uri}\``)
  .addField(`🔎 Guardada en:`, `<#${message.channel.id}>`)
  .setFooter(`Pedida por: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
    dynamic: true
  }))
    ).catch(e=>{
      return message.channel.send("**:x: Tus DMs están desactivados**")
    })    

    client.sendTime(message.channel, "✅ | **Checa tu DM!**")
  },
};