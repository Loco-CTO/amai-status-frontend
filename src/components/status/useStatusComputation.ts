import { useCallback } from "react";
import { Monitor } from "@/types/models";
import { t } from "@/lib/utils/i18n";
import type { Language } from "@/lib/utils/i18n";

interface StatusComputationState {
	degradedThreshold: number;
	language: Language;
}

/**
 * Custom hook for computing status-related data.
 * Encapsulates status indicator calculations to reduce component complexity.
 */
export function useStatusComputation(state: StatusComputationState) {
	/**
	 * Gets the status indicator text and status for a monitor.
	 * @param monitor - The monitor to get status for
	 * @returns Object containing display text and status level
	 */
	const getStatusIndicatorText = useCallback(
		(monitor: Monitor): { text: string; status: "up" | "degraded" | "down" } => {
			if (!monitor.current_status.is_up) {
				return { text: t(state.language, "status_indicator.down"), status: "down" };
			}

			if (monitor.history.length > 0) {
				const latestRecord = monitor.history[monitor.history.length - 1];
				if (
					latestRecord.response_time &&
					latestRecord.response_time * 1000 > state.degradedThreshold
				) {
					return {
						text: t(state.language, "status_indicator.degraded"),
						status: "degraded",
					};
				}
			}

			return { text: t(state.language, "status_indicator.up"), status: "up" };
		},
		[state.degradedThreshold, state.language],
	);

	/**
	 * Gets the localized label for a monitor status.
	 * @param status - The status value ('up', 'degraded', 'down', or 'none')
	 * @returns Localized status label string
	 */
	const getStatusLabel = useCallback(
		(status: "up" | "degraded" | "down" | "none"): string => {
			if (status === "none") {
				return "No Data";
			}
			const key = `status_indicator.${status}` as const;
			return t(state.language, key);
		},
		[state.language],
	);

	return {
		getStatusIndicatorText,
		getStatusLabel,
	};
}
