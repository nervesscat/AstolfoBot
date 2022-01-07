const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Para invitarme a tu server",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["inv"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let embed = new MessageEmbed()
      .setAuthor(
        "Invita " + client.user.tag + " a tu server!",
        client.user.displayAvatarURL()
      )
      .setColor("BLUE")
      .setDescription(
        `Puedes invitarme clickeando [aquí](https://discord.com/oauth2/authorize?client_id=${
          client.config.ClientID
        }&permissions=${
          client.config.Permissions
        }&scope=bot%20${client.config.Scopes.join("%20")}&redirect_url=${
          client.config.Website
        }${client.config.CallbackURL}&response_type=code)`
      );
    message.channel.send(embed);
  },
};
