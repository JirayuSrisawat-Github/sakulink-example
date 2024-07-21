export default {
    name: "autoplay",
    description: "Set autoplay",
    category: "music",
    run: async ({ client, interaction }: ICommandOptions) => {
        const player = client.manager.players.get(interaction.guildId!);
        if (!player || !player?.queue?.current)
            return await interaction.reply({
                embeds: [
                    {
                        color: 0xffffff,
                        description: "No music playing in this server!",
                    },
                ],
            });

        player.setAutoplay(true, interaction.user);
        return await interaction.reply({
            embeds: [
                {
                    color: 0xffffff,
                    description: "Autoplay is on!",
                },
            ],
        });
    },
} as ICommand;
