export default {
	name: "loop",
	description: "Loop the current song or queue.",
	category: "music",
	options: [
		{
			name: "type",
			description: "Type of loop",
			type: 3,
			required: true,
			choices: [
				{
					name: "None",
					value: "none",
				},
				{
					name: "Song",
					value: "song",
				},
				{
					name: "Queue",
					value: "queue",
				},
			],
		},
	],
	run: async ({ client, interaction, args }: ICommandOptions) => {
		const player = client.manager.players.get(interaction.guildId!);
		if (!player || !player.queue.current)
			return await interaction.reply({
				embeds: [
					{
						color: 0xffffff,
						description: "No music playing in this server!",
					},
				],
			});

		const loopType = args.getString("type");

		switch (loopType) {
			case "queue": {
				player.setQueueRepeat(true);
				await interaction.reply({
					embeds: [
						{
							color: 0xffffff,
							description: "It's now looping the whole queue!",
						},
					],
				});
			}
			case "song": {
				player.setTrackRepeat(true);
				await interaction.reply({
					embeds: [
						{
							color: 0xffffff,
							description: "It's now looping the current song!",
						},
					],
				});
			}
			default: {
				player.setTrackRepeat(false);
				player.setQueueRepeat(false);
				await interaction.reply({
					embeds: [
						{
							color: 0xffffff,
							description: "It's now not looping anything!",
						},
					],
				});
			}
		}
	},
} as ICommand;
