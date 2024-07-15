import type { ClientEvents, CommandInteraction, CommandInteractionOptionResolver, GuildMember } from "discord.js";
import type { SakulinkClient } from "../src/client";
import type { Node, Player, Track, TrackEndEvent, TrackExceptionEvent, TrackStartEvent, TrackStuckEvent, UnresolvedTrack, WebSocketClosedEvent } from "sakulink";

declare global {
	type Events = ClientEvents & { raw: [payload: object] };

	interface ICommandOptions {
		readonly client: SakulinkClient;
		readonly interaction: Interaction;
		readonly args: CommandInteractionOptionResolver;
	}

	interface IEvent<K extends keyof Events> {
		name: keyof Events;
		once?: boolean;
		run: (client: SakulinkClient, ...args: Events[K]) => void;
	}

	type ICommand = {
		readonly category: string;
		readonly run: ICommandRun;
	} & ChatInputApplicationCommandData;

	interface Interaction extends CommandInteraction {
		readonly member: GuildMember;
	}

	interface IPlayerEvents {
		nodeCreate(node: Node): void;
		nodeDestroy(node: Node): void;
		nodeConnect(node: Node): void;
		nodeReconnect(node: Node): void;
		nodeDisconnect(
			node: Node,
			reason: {
				code?: number;
				reason?: string;
			},
		): void;
		nodeError(node: Node, error: Error): void;
		nodeRaw(payload: unknown): void;
		playerCreate(player: Player): void;
		playerDestroy(player: Player): void;
		queueEnd(player: Player, track: Track | UnresolvedTrack, payload: TrackEndEvent): void;
		playerMove(player: Player, initChannel: string, newChannel: string): void;
		playerDisconnect(player: Player, oldChannel: string): void;
		trackStart(player: Player, track: Track, payload: TrackStartEvent): void;
		trackEnd(player: Player, track: Track, payload: TrackEndEvent): void;
		trackStuck(player: Player, track: Track, payload: TrackStuckEvent): void;
		trackError(player: Player, track: Track | UnresolvedTrack, payload: TrackExceptionEvent): void;
		socketClosed(player: Player, payload: WebSocketClosedEvent): void;
	}

	interface IPlayerEvent<K extends keyof IPlayerEvents> {
		readonly name: K;
		readonly run: IPlayerEvents[K];
	}

	type ICommandRun = (options: ICommandOptions) => void;
}
