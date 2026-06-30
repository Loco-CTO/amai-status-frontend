import type { HeartbeatInterval } from "@/types/models";

export function getEffectiveHeartbeatItemCount(
	baseMax: number,
	interval: HeartbeatInterval,
): number {
	if (interval === "all") return baseMax;
	if (interval === "hour") return Math.floor(baseMax / 1.25);
	if (interval === "day") return Math.floor(baseMax / 1.5);
	if (interval === "week") return Math.floor(baseMax / 1.75);
	return baseMax;
}
