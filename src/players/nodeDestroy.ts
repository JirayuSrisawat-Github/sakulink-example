export const event: IPlayerEvent<"nodeDisconnect"> = {
	name: "nodeDisconnect",
	run: async (node, reason) => {
		console.error(`destroyed event: ${node.options.identifier}`);
	},
};
