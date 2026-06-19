const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

client.once('ready', () => {
    console.log(`Bot đã sẵn sàng! Đăng nhập dưới tên ${client.user.tag}`);
});

// Lệnh gửi bảng Ticket
client.on('messageCreate', async (message) => {
    if (message.content === '!ticket') {
    
        // 2. Gửi bảng Ticket
        const embed = new EmbedBuilder()
    .setTitle('°✩ :𝑴𝒊𝒏𝒅𝒍𝒆𝒔𝒔𝑪𝒍𝒖𝒃:･ ｡⋆ • SOS CENTER 🦋')
    .setColor(0xFF69B4) // Màu hồng pastel xinh xắn
    .setDescription(
        `**°✩ :𝑴𝒊𝒏𝒅𝒍𝒆𝒔𝒔𝑪𝒍𝒖𝒃:･ ｡⋆ XIN CHÀO! ☁️**\n\n` +
        `Chào mừng bạn đã ghé thăm nơi trú ẩn bình yên của chúng mình. Tại đây, mọi tâm tư, nguyện vọng hay bất kỳ khó khăn nào bạn đang gặp phải đều sẽ được lắng nghe và hỗ trợ một cách tận tâm nhất bởi đội ngũ Ban Quản Lý.\n\n` +
        `Để chúng mình có thể hỗ trợ bạn một cách chuyên nghiệp và nhanh chóng, hãy lựa chọn "loại hành lý" phù hợp với nhu cầu của bạn dưới đây:\n\n` +
        `🔔 **[HỖ TRỢ] Lắng Nghe Tâm Sự & Giải Đáp**\n` +
        `Dù là những vướng mắc nhỏ nhất trong hành trình trải nghiệm hay bất kỳ câu hỏi nào cần lời giải đáp, đừng ngần ngại chia sẻ. Tụi mình ở đây để đồng hành cùng bạn!\n\n` +
        `🖋️ **[DONATE] Tiếp Tế & Góp Sức Xây Dựng**\n` +
        `Sự ủng hộ của bạn chính là nguồn động lực và "viên gạch" quý giá giúp cộng đồng MindlessClub ngày càng phát triển, vươn xa và mang lại nhiều giá trị tốt đẹp hơn cho tất cả mọi người.\n\n` +
        `🤝 **[HỢP TÁC] Kết Nối Liên Minh**\n` +
        `Bạn đại diện cho một cộng đồng/tộc/server khác và mong muốn mở rộng mối quan hệ, giao lưu, liên minh hoặc cùng nhau thực hiện những dự án, sự kiện hoành tráng? Hãy mở lời để cùng tạo nên những điều ý nghĩa!\n\n` +
        `🚀 **[ỨNG TUYỂN] Gia Nhập Đội Ngũ Nhân Sự**\n` +
        `Bạn mang trong mình ngọn lửa nhiệt huyết và mong muốn cống hiến sức trẻ để cùng xây dựng cộng đồng? Hãy gửi tín hiệu đến tụi mình, chúng mình rất mong chờ sự góp mặt của bạn!\n\n` +
        `-----------------------------------------------------------\n` +
        `📌 **LƯU Ý NHO NHỎ:**\n` +
        `• Kênh Ticket tạo ra chỉ có bạn và đội ngũ Staff xem được, hãy hoàn toàn an tâm chia sẻ.\n` +
        `• Nghiêm cấm mọi hành vi tạo ticket để quấy rối hoặc không đúng mục đích.\n` +
        `• Hãy mô tả vấn đề thật chi tiết để nhận được sự hỗ trợ từ tụi mình nhanh chóng nhất nhé!\n` +
        `• Ticket sẽ tự động đóng sau 24h nếu không nhận được phản hồi từ bạn.`
    );
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('ticket_support').setLabel('Hỗ Trợ').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('ticket_donate').setLabel('Donate').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('ticket_partner').setLabel('Hợp Tác').setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId('ticket_apply').setLabel('Ứng Tuyển').setStyle(ButtonStyle.Secondary)
        );

        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

// Xử lý tạo kênh
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
const STAFF_ROLE_IDS = ['1496507777781203104', '1516479524370382974'];
    const instructions = {
        'ticket_support': 'Chào bạn, Staff sẽ hỗ trợ bạn sớm nhất.',
        'ticket_apply': 'Hãy điền mẫu: 1. Tên, 2. Kinh nghiệm, 3. Lý do tham gia?',
        'ticket_donate': 'Cảm ơn bạn đã muốn Donate!',
        'ticket_partner': 'Vui lòng cho biết thông tin đối tác của bạn.'
    };

    const channel = await interaction.guild.channels.create({
        name: `${interaction.user.username}-ticket`,
        type: ChannelType.GuildText,
        permissionOverwrites: [
            { id: interaction.guild.id, deny: [PermissionFlagsBits.ViewChannel] },
            { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
            { id: STAFF_ROLE_ID, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }
        ],
    });

    await channel.send(`${interaction.user}, ${instructions[interaction.customId] || 'Chào bạn!'}`);
    await interaction.reply({ content: `Kênh hỗ trợ: ${channel}`, flags: 64 });
});

client.login(process.env.TOKEN);
