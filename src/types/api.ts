/**
 * API Response Types
 * Types for API responses from the backend
 */

export interface ConfigResponse {
	configuration: {
		degraded_threshold: number;
		footerText: string;
		[key: string]: any;
	};
}

export interface StatusResponse {
	timestamp: string;
	monitors: any[];
}

export interface VersionResponse {
	api_version: string;
	frontend_version?: string;
}

export interface AggregatedHeartbeatResponse {
	monitor_name: string;
	interval: string;
	heartbeat: any[];
}
