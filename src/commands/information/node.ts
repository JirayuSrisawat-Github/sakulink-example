import { stripIndent } from "common-tags";
import ms from "ms";

export default {
	name: "node",
	description: "Get the nodes information of the bot.",
	category: "information",
	run: async ({ client, interaction }: ICommandOptions) => {
		await interaction.deferReply();

		const nodes = client.manager.nodes.map((data) => ({
			options: data.options,
			stats: data.stats,
			connected: data.connected,
		}));

		const getEmoji = (isOnline: boolean) => (isOnline ? "<:online:1084867000641269861>" : "<:offline:1084867102218928158>");

		const embed = {
			author: {
				name: client.user!.username,
				icon_url: client.user!.displayAvatarURL(),
			},
			color: 0xffffff,
			description: `${client.user!.username} Nodes Information`,
			fields: nodes.map((item) => ({
				inline: true,
				name: `${getEmoji(item.connected)} ${item.options.identifier}`,
				value: stripIndent`
        ┊ Connected: \`${item.stats.players}\`
        ┊ Playing: \`${item.stats.playingPlayers}\`
        ┊ CPU: \`${(item.stats.cpu.lavalinkLoad * 100).toFixed(2)}% (${item.stats.cpu.cores})\`
        ┊ RAM: \`${(item.stats.memory.used / 1024 / 1024).toFixed(2)}MB/${(item.stats.memory.reservable / 1024 / 1024).toFixed(2)}MB\`
        ╰ Uptime: \`${ms(item.stats.uptime)}\`
        `,
			})),
		};

		interaction.editReply({
			embeds: [embed],
		});
	},
} as ICommand;
