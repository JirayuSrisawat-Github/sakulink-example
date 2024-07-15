import ms from "ms";

export default {
	name: "play",
	description: "Play some music.",
	category: "music",
	options: [
		{
			name: "query",
			description: "Music URL/name",
			required: true,
			type: 3,
		},
	],
	run: async ({ client, interaction, args }: ICommandOptions) => {
		await interaction.deferReply();
		let player = client.manager.players.get(interaction.guildId!);

		if (!player)
			player = client.manager.create({
				node: args.getString("node") || undefined,
				guild: interaction.guild!.id,
				voiceChannel: interaction.member.voice.channelId!,
				textChannel: interaction.channel!.id,
				volume: 80,
				selfDeafen: true,
				selfMute: false,
			});

		if (player.state !== "CONNECTED") player.connect();

		const result = await client.manager.search(args.getString("query")!, interaction.user);

		switch (result.loadType) {
			case "error":
				{
					await interaction.editReply({
						embeds: [
							{
								color: 0xffffff,
								description: "Sorry, couldn't find any results!",
							},
						],
					});
				}
				break;
			case "empty":
				{
					await interaction.editReply({
						embeds: [
							{
								color: 16711680,
								description: "Sorry, couldn't find any results!",
							},
						],
					});
				}
				break;
			case "playlist":
				{
					player.queue.add(result.playlist!.tracks);
					if (!player.playing) player.play();

					await interaction.editReply({
						embeds: [
							{
								color: 0xffffff,
								title: result.playlist!.name,
								url: result.playlist!.tracks[0].uri,
								footer: {
									text: `Node: ${player.node.options.identifier} | Duration: ${ms(result.playlist!.duration, {
										long: true,
									})}`,
								},
								author: {
									name: `Included ${result.playlist!.tracks.length} tracks in the queue!`,
									icon_url: result.playlist!.tracks[0]?.thumbnail!,
								},
							},
						],
					});
				}
				break;
			default:
				{
					player.queue.add(result.tracks[0]);
					if (!player.playing) player.play();

					await interaction.editReply({
						embeds: [
							{
								color: 0xffffff,
								title: result.tracks[0].title,
								url: result.tracks[0].uri,
								footer: {
									text: `Node: ${player.node.options.identifier} | Duration: ${ms(result.tracks[0].duration, {
										long: true,
									})}`,
								},
								author: {
									name: `${result.tracks[0].title} Has been added to the queue!`,
									icon_url: result.tracks[0].artworkUrl,
								},
							},
						],
					});
				}
				break;
		}
	},
} as ICommand;
