module.exports = {
  Admins: ["567177086041587712"], //Admin del Bot
  ExpressServer: true, //Si quieres correr el website
  DefaultPrefix: process.env.Prefix || "as!", //Prefix predeterminado
  Port: 3000, //Puerto
  SupportServer: "",
  Token: process.env.Token || "Token", //Discord Bot Token
  ClientID: process.env.Discord_ClientID || "858182253249953824", //Discord Client ID
  ClientSecret: process.env.Discord_ClientSecret || "r4cw5OcHZRXiTOIU4mMHul253MTYpFaS", //Discord Client Secret
  Scopes: ["identify", "guilds", "applications.commands"], //Discord OAuth2 Scopes
  ServerDeafen: true, //Si quieres que el bot esté ensordecido
  DefaultVolume: 100, //Volumen por default
  CallbackURL: "/api/callback", //Discord API Callback
  "24/7": true, //Si quieres qué el bot esté 24/7
  CookieSecret: "Astolfo mi dios uwu",
 
  EmbedColor: "RANDOM", 
  Permissions: 2205281600,
  Website: process.env.Website || "localhost",
  
  Presence: {
    status: "online", // Para usar el online, idle, and dnd
    name: "Music", //
    type: "LISTENING", // PLAYING, WATCHING, LISTENING, STREAMING
  },

  //Lavalink
  Lavalink: {
    id: "Main",
    host: "lava.link",
    port: 80, 
    pass: "youshallnotpass",
    secure: false,
  },

  //Ir a https://developer.spotify.com/dashboard/
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "c853a10a7c2c472d90d30b4a8db1f5b4", //Spotify Client ID
    ClientSecret: process.env.Spotify_ClientSecret || "37027fc838594797bfeff8eec62ce351", //Spotify Client Secret
  },
};
