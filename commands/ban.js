const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
                .setName('ban')
                .setDescription('Command pour kick un membre du serveur.')
                .addUserOption(option =>
                    option.setName('pseudo')
                            .setDescription('La personne à kick')
                            .setRequired(true))
                .addStringOption(option =>
                    option.setName('addreason')
                            .setDescription('Ajoutez une raison a l\'exclusion'))
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        if (interaction.member.permissions.has("KICK_MEMBERS")) {
            const target = interaction.options.getUser('pseudo');
            const raison = interaction.options.getString('addreason');
            const member = interaction.user.id;

            interaction.guild.members.ban(target).then(() => {
            interaction.reply(`@${target.username} s'est fais kick. Il reviendra plus sage nous l'esperont`);
            interaction.guild.channels.cache.get('1036996167952773190').send(`@${target.username} s'est fais ban par <@${member}> pour la raison suivante: "${raison}"`)
            }).catch((err) => {
                interaction.reply('Il y\'as une erreur')
                console.log(err);
            });
        }
    }
}