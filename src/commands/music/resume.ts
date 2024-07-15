export default {
	name: "resume",
	description: "Resume current song.",
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

		player.pause(false);
		return await interaction.reply({
			embeds: [
				{
					color: 0xffffff,
					description: "It's now playing!",
				},
			],
		});
	},
} as ICommand;
