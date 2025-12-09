import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import registerCommands from "./utils/registerCommands.js";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

client.once("ready", () => {
  console.log(`🤖 Bot logged in as ${client.user.tag}`);
  registerCommands(client);
});

client.login(process.env.DISCORD_TOKEN);
