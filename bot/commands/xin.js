import { SlashCommandBuilder } from "discord.js";
import jwt from "jsonwebtoken";

export const data = new SlashCommandBuilder()
    .setName("xin")
    .setDescription("Xin đồ từ kho bang");

export async function execute(interaction) {
    const token = jwt.sign(
        { userId: interaction.user.id },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
    );

    const link = `${process.env.WEB_URL}/dashboard?token=${token}`;

    return interaction.reply({
        content: `🔗 Link xin đồ của bạn:\n${link}`,
        ephemeral: true
    });
}
