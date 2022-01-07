const { MessageEmbed, MessageReaction } = require("discord.js");

module.exports = {
  name: "config",
  description: "Cambia la configuración del bot",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: ["ADMINISTRATOR"],
  },
  aliases: ["conf"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let Config = new MessageEmbed()
      .setAuthor("Configuración del Server", client.config.IconURL)
      .setColor("RANDOM")
      .addField("Prefijo", GuildDB.prefix, true)
      .addField("Rol DJ", GuildDB.DJ ? `<@&${GuildDB.DJ}>` : "Not Set", true)
      .setDescription(`
Que deseas configurar?

:one: - Prefijo del Server
:two: - Rol de DJ
`);

    let ConfigMessage = await message.channel.send(Config);
    await ConfigMessage.react("1️⃣");
    await ConfigMessage.react("2️⃣");
    let emoji = await ConfigMessage.awaitReactions(
      (reaction, user) =>
        user.id === message.author.id &&
        ["1️⃣", "2️⃣"].includes(reaction.emoji.name),
      { max: 1, errors: ["time"], time: 30000 }
    ).catch(() => {
      ConfigMessage.reactions.removeAll();
      client.sendTime(
        message.channel, "❌ | **Tardaste mucho en responder. Si quieres configurar, usa el comando de nuevo!**"
      );
      ConfigMessage.delete(Config);
    });
    let isOk = false;
    try {
      emoji = emoji.first();
    } catch {
      isOk = true;
    }
    if (isOk) return; //im idiot sry ;-;
    /**@type {MessageReaction} */
    let em = emoji;
    ConfigMessage.reactions.removeAll();
    if (em._emoji.name === "1️⃣") {
      await client.sendTime(message.channel, "A qué prefijo deseas cambiar?");
      let prefix = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );
      if (!prefix.first())
        return client.sendTime(message.channel, "Tardaste mucho en responder.");
      prefix = prefix.first();
      prefix = prefix.content;

      await client.database.guild.set(message.guild.id, {
        prefix: prefix,
        DJ: GuildDB.DJ,
      });

      client.sendTime(
        message.channel, `El prefijo fue cambiado exitosamente \`${prefix}\``
      );
    } else {
      await client.sendTime(
        message.channel, "Por favor, menciona el rol al que quieres asignar como DJ."
      );
      let role = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );
      if (!role.first())
        return client.sendTime(message.channel, "Tardaste mucho en responder.");
      role = role.first();
      if (!role.mentions.roles.first())
        return client.sendTime(
          message.channel, "Por favor, menciona el rol al que quieres asignar como DJ."
        );
      role = role.mentions.roles.first();

      await client.database.guild.set(message.guild.id, {
        prefix: GuildDB.prefix,
        DJ: role.id,
      });

      client.sendTime(
        message.channel, "El Rol de DJ fue asignado exitosamente a <@&" + role.id + ">"
      );
    }
  },
};
