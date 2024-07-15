export const event: IEvent<"ready"> = {
	name: "ready",
	run: async (client) => {
		console.log(`Logged in as ${client.user!.tag}`);
	},
};
