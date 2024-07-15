import { GuildMember, CommandInteractionOptionResolver } from "discord.js";

export const event: IEvent<"interactionCreate"> = {
	name: "interactionCreate",
	run: async (client, interaction) => {
		if (interaction.isCommand()) {
			const command = client.commands.get(interaction.commandName);

			const options = <CommandInteractionOptionResolver>interaction.options;

			if (command.category === "music") {
				if (!(<GuildMember>interaction.member!).voice.channelId)
					return await interaction.reply({
						embeds: [
							{
								color: 0xffffff,
								description: "You must be in a voice channel to use this command!",
							},
						],
					});

				if (interaction.guild!.members.me!.voice.channel && interaction.guild!.members.me!.voice.channelId !== (<GuildMember>interaction.member!).voice.channelId)
					return await interaction.reply({
						embeds: [
							{
								color: 0xffffff,
								description: "You must be in the same voice channel as me to use this command!",
							},
						],
					});
			}

			command.run({
				client,
				interaction: interaction,
				args: options,
			});
		}
	},
};
