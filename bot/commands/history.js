import { SlashCommandBuilder } from "discord.js";
import jwt from "jsonwebtoken";

export const data = new SlashCommandBuilder()
    .setName("history")
    .setDescription("Xem lịch sử phát đồ")
    .addUserOption(option =>
        option.setName("user")
            .setDescription("Xem lịch sử của một user cụ thể")
    );

export async function execute(interaction) {
    const user = interaction.options.getUser("user");
    const token = jwt.sign(
        {
            admin: true,
            userId: interaction.user.id,
            targetUser: user?.id || null
        },
        process.env.JWT_SECRET,
        { expiresIn: "30m" }
    );

    const link = `${process.env.WEB_URL}/history?token=${token}`;
    return interaction.reply({ content: `📜 Lịch sử:\n${link}`, ephemeral: true });
}
