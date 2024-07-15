import type { VoicePacket, VoiceServer, VoiceState } from "sakulink";

export const event: IEvent<"raw"> = {
	name: "raw",
	run: (client, payload) => {
		client.manager.updateVoiceState(payload as VoicePacket | VoiceServer | VoiceState);
	},
};
