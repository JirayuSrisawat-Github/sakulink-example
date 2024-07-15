export const event: IPlayerEvent<"playerDestroy"> = {
	name: "playerDestroy",
	run: (player) => {
		console.log(`player destroyed: ${player.guild}`);
	},
};
