import type { AggregatedHeartbeatNode, Monitor } from "./models";

export interface ConfigResponse {
	configuration: {
		degraded_threshold: number;
		footerText: string;
		[key: string]: string | number | boolean | null;
	};
}

export interface StatusResponse {
	timestamp: string;
	monitors: Monitor[];
}

export interface VersionResponse {
	api_version: string;
}

export interface AggregatedHeartbeatResponse {
	monitor_name: string;
	interval: string;
	heartbeat: AggregatedHeartbeatNode[];
}
