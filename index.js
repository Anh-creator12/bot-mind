const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent 
    ] 
});

client.once('ready', () => {
    console.log(`Bot đã sẵn sàng! Đăng nhập dưới tên ${client.user.tag}`);
});

// Lệnh gửi bảng Ticket
client.on('messageCreate', async (message) => {
    if (message.content === '!ticket') {
        const embed = new EmbedBuilder()
            .setTitle('°✩ :𝑴𝒊𝒏𝒅𝒍𝒆𝒔𝒔𝑪𝒍𝒖𝒃:･ ｡⋆ • SOS CENTER 🦋')
            .setColor(0x0099FF)
            .setDescription(`**°✩ :𝑴𝒊𝒏𝒅𝒍𝒆𝒔𝒔𝑪𝒍𝒖𝒃:･ ｡⋆ XIN CHÀO! ☁️**\n\nChào mừng bạn đã ghé thăm nơi trú ẩn của chúng mình. Dù bạn đang gặp những "cơn bão" hay chỉ muốn tìm kiếm một chốn bình yên để cùng đồng hành, Ban Quản Lý luôn sẵn sàng lắng nghe và hỗ trợ bạn.\n\nHãy lựa chọn "tâm tư" của bạn bên dưới để kết nối với tụi mình nhé:\n\n🔔 **[HỖ TRỢ] Lắng Nghe Tâm Sự:**\nBạn đang gặp khó khăn hay có bất kỳ thắc mắc nào cần giải đáp? Đừng giữ những nỗi niềm đó một mình, tụi mình luôn ở đây để sẻ chia cùng bạn!\n\n🖋️ **[DONATE] Góp Sức Xây Dựng:**\nĐể "hệ sinh thái" của chúng ta ngày càng lớn mạnh, mang lại nhiều trải nghiệm tuyệt vời hơn, rất cần những tấm lòng vàng của các bạn.\n\n🤝 **[HỢP TÁC] Mở Rộng Kết Nối:**\nBạn đại diện cho một cộng đồng khác và muốn chúng ta cùng nhau giao lưu, liên minh?\n\n🚀 **[ỨNG TUYỂN] Gia Nhập Đội Ngũ:**\nBạn yêu thích không gian này và muốn góp sức mình để phát triển cộng đồng?\n\n-----------------------------------------------------------\n📌 **LƯU Ý NHO NHỎ:**\n• Ticket chỉ có bạn và Staff thấy thôi.\n• Tuyệt đối không spam.\n• Sau 24h không phản hồi, ticket sẽ đóng tự động.`);

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('ticket_support').setLabel('Hỗ Trợ').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('ticket_donate').setLabel('Donate').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('ticket_partner').setLabel('Hợp Tác').setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId('ticket_apply').setLabel('Ứng Tuyển').setStyle(ButtonStyle.Secondary)
        );

        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

// Xử lý khi có người bấm nút
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'ticket_support') {
        await interaction.reply({ content: 'Đang tạo kênh hỗ trợ cho bạn...', ephemeral: true });
        // Tại đây bạn có thể thêm code tạo kênh channel.create...
    } else if (interaction.customId === 'ticket_apply') {
        await interaction.reply({ content: 'Cảm ơn bạn đã quan tâm ứng tuyển! Hãy chờ Staff liên hệ nhé.', ephemeral: true });
    }
    // Bạn có thể thêm các case khác tương tự cho Donate và Partner
});

client.login(process.env.TOKEN);
