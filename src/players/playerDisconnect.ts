export const event: IPlayerEvent<"playerDisconnect"> = {
	name: "playerDisconnect",
	run: (player) => {
		console.log(`player disconnected: ${player.guild}`);
	},
};
