export const event: IPlayerEvent<"playerCreate"> = {
	name: "playerCreate",
	run: (player) => {
		console.log(`player created: ${player.guild}`);
	},
};
