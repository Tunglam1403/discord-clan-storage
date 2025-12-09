import { SlashCommandBuilder } from "discord.js";
import jwt from "jsonwebtoken";

export const data = new SlashCommandBuilder()
    .setName("duyet")
    .setDescription("Duyệt yêu cầu xin đồ");

export async function execute(interaction) {
    const token = jwt.sign(
        { admin: true, userId: interaction.user.id },
        process.env.JWT_SECRET,
        { expiresIn: "30m" }
    );

    const link = `${process.env.WEB_URL}/admin?token=${token}`;

    return interaction.reply({
        content: `🔗 Trang duyệt đồ:\n${link}`,
        ephemeral: true
    });
}
