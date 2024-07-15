export const event: IPlayerEvent<"nodeConnect"> = {
	name: "nodeConnect",
	run: async (node) => {
		console.log(`node redied: ${node.options.identifier}`);
	},
};
