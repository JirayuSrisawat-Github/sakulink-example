export default {
	name: "ping",
	description: "Get the ping of the bot.",
	category: "information",
	run: async ({ client, interaction }: ICommandOptions) => {
		await interaction.reply({
			embeds: [
				{
					color: 0xffffff,
					description: `Pong! \`${client.ws.ping}ms\``,
				},
			],
		});
	},
} as ICommand;
