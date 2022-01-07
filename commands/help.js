const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Información sobre el bot",
  usage: "[comando]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
   run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
            .setAuthor(
              `Comandos de ${client.user.username}`,
              client.config.IconURL
            )
            .setColor("#DEA5A4")
            .setFooter(
              `Para obtener información de cada comando, escribe ${
                GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
              }help [Command] | Sexo ñiñiñi`
            ).setDescription(`${Commands.join("\n")}
  

  `);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(message.channel, `❌ | No se pudo encontrar el comando.`);

      let embed = new MessageEmbed()
        .setAuthor(`Comando: ${cmd.name}`, client.config.IconURL)
        .setDescription(cmd.description)
        .setColor("#C1BBDD")
        //.addField("Name", cmd.name, true)
        .addField("Alias", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Modo de Uso",
          `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        
        .setFooter(
          `Prefijo - ${
            GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

};
