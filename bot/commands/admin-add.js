import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import User from "../../server/models/User.js";

export const data = new SlashCommandBuilder()
    .setName("admin-add")
    .setDescription("Thêm người quản lý duyệt đồ")
    .addUserOption(option =>
        option.setName("user")
            .setDescription("Người cần thêm quyền")
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
    const target = interaction.options.getUser("user");
    await User.updateOne(
        { userId: target.id },
        { $set: { role: "admin" } },
        { upsert: true }
    );

    return interaction.reply(`✅ Đã thêm quyền admin cho <@${target.id}>`);
}
