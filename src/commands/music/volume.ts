export default {
	name: "volume",
	description: "Adjust the volume of the current song.",
	category: "music",
	options: [
		{
			name: "volume",
			description: "Percent of vulume",
			required: true,
			type: 10,
		},
	],
	run: async ({ client, interaction, args }: ICommandOptions) => {
		const player = client.manager.players.get(interaction.guildId!);
		if (!player || !player?.queue?.current) {
			return await interaction.reply({
				embeds: [
					{
						color: 0xffffff,
						description: "No music playing in this server",
					},
				],
			});
		}

		player.setVolume(args.getNumber("volume")!);

		return await interaction.reply({
			embeds: [
				{
					color: 0xffffff,
					description: `Adjusted the volume to ${`${args.getNumber("volume")}`.padStart(2, "0")}%`,
				},
			],
		});
	},
} as ICommand;
