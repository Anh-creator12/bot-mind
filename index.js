const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js');
const client = new Client({ const express = require('express'); // Thêm dòng này

// 2. KHỞI TẠO WEB SERVER (Đặt ở đây)
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Bot is running 24/7!');
});

app.listen(port, () => {
  console.log(`Web server đang chạy tại cổng ${port}`);
});

// 3. KHỞI TẠO BOT (Phần code cũ của bạn bắt đầu từ đây)
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

// ID Role Staff - Hãy đảm bảo ID này chính xác
const STAFF_ROLE_ID = '1496507777781203104'; 

client.once('ready', () => {
    console.log(`Bot đã sẵn sàng! Đăng nhập dưới tên ${client.user.tag}`);
});

// KHỐI XỬ LÝ TIN NHẮN (Gộp !ticket và tydc vào đây để tránh lặp)
client.on('messageCreate', async (message) => {
    // Luôn có dòng này để tránh bot tự phản hồi tin nhắn của chính nó
    if (message.author.bot) return;

    // 1. Lệnh !ticket
    if (message.content === '!ticket') {
        const embed = new EmbedBuilder()
            .setTitle('°✩ :𝑴𝒊𝒏𝒅𝒍𝒆𝒔𝒔𝑪𝒍𝒖𝒃:･ ｡⋆ • SOS CENTER 🦋')
            .setColor(0xFF69B4)
            .setDescription(
                `**°✩ :𝑴𝒊𝒏𝒅𝒍𝒆𝒔𝒔𝑪𝒍𝒖𝒃:･ ｡⋆ XIN CHÀO! ☁️**\n\n` +
                `Chào mừng bạn đã ghé thăm nơi trú ẩn bình yên của chúng mình. Tại đây, mọi tâm tư, nguyện vọng hay bất kỳ khó khăn nào bạn đang gặp phải đều sẽ được lắng nghe và hỗ trợ một cách tận tâm nhất bởi đội ngũ Ban Quản Lý.\n\n` +
                `Để chúng mình có thể hỗ trợ bạn một cách chuyên nghiệp và nhanh chóng, hãy lựa chọn "loại hành lý" phù hợp với nhu cầu của bạn dưới đây:\n\n` +
                `🔔 **[HỖ TRỢ] Lắng Nghe Tâm Sự & Giải Đáp**\n` +
                `🖋️ **[DONATE] Tiếp Tế & Góp Sức Xây Dựng**\n` +
                `🤝 **[HỢP TÁC] Kết Nối Liên Minh**\n` +
                `🚀 **[ỨNG TUYỂN] Gia Nhập Đội Ngũ Nhân Sự**\n\n` +
                `-----------------------------------------------------------\n` +
                `📌 **LƯU Ý NHO NHỎ:**\n` +
                `• Kênh Ticket tạo ra chỉ có bạn và đội ngũ Staff xem được.\n` +
                `• Nghiêm cấm mọi hành vi tạo ticket để quấy rối hoặc không đúng mục đích.\n` +
                `• Hãy mô tả vấn đề thật chi tiết để nhận được sự hỗ trợ từ tụi mình nhanh chóng nhất nhé!`
            );
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('ticket_support').setLabel('Hỗ Trợ').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('ticket_donate').setLabel('Donate').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('ticket_partner').setLabel('Hợp Tác').setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId('ticket_apply').setLabel('Ứng Tuyển').setStyle(ButtonStyle.Secondary)
        );
        await message.channel.send({ embeds: [embed], components: [row] });
    }

    // 2. Lệnh tydc
    if (message.content.trim() === 'tydc') {
        const warningText = `**🚫 CẢNH BÁO NGHIÊM TRỌNG TỪ BAN QUẢN LÝ**\n\n` +
            `Tao nhắc lần cuối cấm TÌNH YÊU DISCORD trong server, đã có rất nhiều người yêu xong out server và làm sv bị thiếu hụt mem thậm chí mất mem quan trọng! Điều này không chỉ ảnh hưởng đến cá nhân hai bên mà ảnh hưởng đến TẬP THỂ CẢ SERVER.\n\n` +
            `T không muốn nhắc thêm 1 lần nào nữa vì đã quá đáng lắm rồi? Yêu đương ra ngoài chém nhau offline hay sao yêu trên mạng cũng phải offline mxh. Tụi bây có não không!? CẤM TUYỆT ĐỐI YÊU TRONG Server TAO. 1 lần cuối, nếu phát hiện trường hợp treo room nhạc, nảy sinh tình cảm, mập mờ / tán tỉnh trong server sẽ bị **BAN VĨNH VIỄN**.\n\n` +
            `https://media.discordapp.net/attachments/1517487777716113539/1517495220592312440/image.png?ex=6a367d0e&is=6a352b8e&hm=7ba3dce019fb3329bbc549bd6a5dee85d8eb42b710f30d6d98a7b4822fe45b2c&=&format=webp&quality=lossless&width=648&height=364`;

        await message.channel.send({ content: warningText });
        await message.delete().catch(() => {});
    }
});

// KHỐI XỬ LÝ NÚT BẤM (TICKET)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.replied || interaction.deferred) return; // Chống lỗi 40060

    const instructions = {
        'ticket_support': 'Chào bạn, Staff sẽ sớm hỗ trợ bạn nhé.',
        'ticket_apply': 'Chào bạn, hãy điền mẫu: 1. Tên, 2. Kinh nghiệm, 3. Lý do tham gia?',
        'ticket_donate': 'Cảm ơn bạn đã muốn Donate!',
        'ticket_partner': 'Vui lòng cung cấp thông tin liên hệ.'
    };

    try {
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
        await interaction.reply({ content: `Kênh đã tạo: ${channel}`, ephemeral: true });
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Lỗi tạo kênh, kiểm tra quyền Bot!', ephemeral: true });
    }
});

client.login(process.env.TOKEN);
