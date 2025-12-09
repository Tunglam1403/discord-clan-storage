import { Client, GatewayIntentBits, Collection } from "discord.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages
    ]
});

// Load commands
client.commands = new Collection();
const commandsPath = path.join(process.cwd(), "bot/commands");
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Handle interactions
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return;

    try {
        await cmd.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({
            content: "❌ Lỗi rồi!",
            ephemeral: true
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
