import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import User from "../../server/models/User.js";

export const data = new SlashCommandBuilder()
    .setName("admin-remove")
    .setDescription("Gỡ quyền duyệt đồ")
    .addUserOption(option =>
        option.setName("user")
            .setDescription("Người cần gỡ quyền")
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
    const target = interaction.options.getUser("user");
    await User.updateOne(
        { userId: target.id },
        { $set: { role: "member" } }
    );

    return interaction.reply(`❎ Đã gỡ quyền admin của <@${target.id}>`);
}
