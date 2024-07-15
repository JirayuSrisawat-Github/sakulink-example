export const event: IPlayerEvent<"queueEnd"> = {
	name: "queueEnd",
	run: async (player, track) => {
		console.log(`queue ended: ${player.guild}`);
		return player.destroy();
	},
};
