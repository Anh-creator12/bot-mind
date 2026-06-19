const { ChannelType, PermissionFlagsBits } = require('discord.js');

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    // Định nghĩa các nội dung hướng dẫn
    const instructions = {
        'ticket_support': 'Chào bạn, Staff sẽ sớm hỗ trợ bạn nhé. Bạn vui lòng mô tả chi tiết vấn đề của mình ở đây.',
        'ticket_apply': 'Chào bạn, để ứng tuyển, hãy điền theo mẫu sau:\n1. Tên:\n2. Kinh nghiệm:\n3. Tại sao bạn muốn tham gia?',
        'ticket_donate': 'Cảm ơn bạn đã muốn Donate. Staff sẽ hướng dẫn bạn các bước tiếp theo.',
        'ticket_partner': 'Vui lòng cung cấp link server hoặc thông tin đối tác của bạn để chúng mình trao đổi nhé.'
    };

    const customId = interaction.customId;
    if (!instructions[customId]) return;

    // 1. Tạo kênh riêng tư
    const channelName = `${interaction.member.user.username}-${customId.split('_')[1]}`;
    const channel = await interaction.guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        permissionOverwrites: [
            {
                id: interaction.guild.id, // Ẩn với tất cả mọi người
                deny: [PermissionFlagsBits.ViewChannel],
            },
            {
                id: interaction.user.id, // Cho phép người tạo ticket xem
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
            },
            {
                id: 'YOUR_STAFF_ROLE_ID', // BẠN CẦN THAY ID CỦA ROLE STAFF VÀO ĐÂY
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
            },
        ],
    });

    // 2. Gửi hướng dẫn vào kênh mới
    await channel.send(`<@${interaction.user.id}> ${instructions[customId]}`);

    // 3. Phản hồi cho người dùng biết đã tạo kênh
    await interaction.reply({ content: `Kênh hỗ trợ đã được tạo tại: ${channel}`, flags: 64 });
});
