const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js');

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

// Lệnh !ticket để gửi bảng chọn
client.on('messageCreate', async (message) => {
    if (message.content === '!ticket') {
        const embed = new EmbedBuilder()
            .setTitle('°✩ :𝑴𝒊𝒏𝒅𝒍𝒆𝒔𝒔𝑪𝒍𝒖𝒃:･ ｡⋆ • SOS CENTER 🦋')
            .setColor(0xFF69B4)
            .setDescription('Chào mừng bạn đã ghé thăm nơi trú ẩn của chúng mình. Hãy chọn mục bạn cần hỗ trợ bên dưới nhé!');

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('ticket_support').setLabel('Hỗ Trợ').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('ticket_donate').setLabel('Donate').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('ticket_apply').setLabel('Ứng Tuyển').setStyle(ButtonStyle.Secondary)
        );

        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

// Xử lý khi nhấn nút tạo kênh
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    const instructions = {
        'ticket_support': 'Chào bạn, Staff sẽ sớm hỗ trợ bạn nhé. Bạn vui lòng mô tả chi tiết vấn đề ở đây.',
        'ticket_apply': 'Chào bạn, để ứng tuyển, hãy điền theo mẫu sau:\n1. Tên:\n2. Kinh nghiệm:\n3. Tại sao bạn muốn tham gia?',
        'ticket_donate': 'Cảm ơn bạn đã muốn Donate. Staff sẽ hướng dẫn bạn các bước tiếp theo.'
    };

    const channel = await interaction.guild.channels.create({
        name: `${interaction.user.username}-ticket`,
        type: ChannelType.GuildText,
        permissionOverwrites: [
            { id: interaction.guild.id, deny: [PermissionFlagsBits.ViewChannel] },
            { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }
        ],
    });

    await channel.send(`${interaction.user}, ${instructions[interaction.customId] || 'Chào bạn!'}`);
    await interaction.reply({ content: `Kênh hỗ trợ đã tạo: ${channel}`, flags: 64 });
});

client.login(process.env.TOKEN);
