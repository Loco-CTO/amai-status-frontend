import { useCallback } from "react";
import { Language, t } from "@/lib/utils/i18n";
import { formatLocalDateTime } from "@/lib/utils/dateFormat";
import type { HoveredMonitorInfo } from "@/types/ui";

interface TooltipData {
	timeDisplay: string;
	statusLabel: string;
	showIssues: boolean;
	degradedCount: number | undefined;
	downCount: number | undefined;
	degradedDuration: string | undefined;
	downDuration: string | undefined;
	pingText: string;
	sampleCount: number | undefined;
	showSampleCount: boolean;
}

function formatDuration(seconds: number): string {
	const roundedSeconds = Math.max(0, Math.round(seconds));
	if (roundedSeconds === 0) return "0s";

	const units = [
		{ label: "d", seconds: 86400 },
		{ label: "h", seconds: 3600 },
		{ label: "m", seconds: 60 },
		{ label: "s", seconds: 1 },
	];
	const parts: string[] = [];
	let remaining = roundedSeconds;

	for (const unit of units) {
		const value = Math.floor(remaining / unit.seconds);
		if (value === 0) continue;
		parts.push(`${value}${unit.label}`);
		remaining -= value * unit.seconds;
		if (parts.length === 2) break;
	}

	return parts.join(" ");
}

/**
 * Custom hook for computing tooltip display data.
 */
export function useTooltipComputation(
	language: Language,
	getStatusLabel: (status: "up" | "degraded" | "down" | "none") => string,
) {
	const computeTooltipData = useCallback(
		(hoveredMonitor: HoveredMonitorInfo | null): TooltipData | null => {
			if (!hoveredMonitor) return null;

			const timeDisplay =
				hoveredMonitor.interval === "all"
					? formatLocalDateTime(hoveredMonitor.timestamp || new Date(), language)
					: hoveredMonitor.typeLabel ||
						formatLocalDateTime(hoveredMonitor.timestamp || new Date(), language);

			const showIssues =
				hoveredMonitor.interval &&
				hoveredMonitor.interval !== "all" &&
				((hoveredMonitor.degradedCount !== undefined &&
					hoveredMonitor.degradedCount > 0) ||
					(hoveredMonitor.downCount !== undefined && hoveredMonitor.downCount > 0));

			let pingText = `${t(language, "heartbeat.ping")}: N/A`;
			if (
				hoveredMonitor.avgResponseTime !== null &&
				hoveredMonitor.avgResponseTime !== undefined
			) {
				pingText = `${t(language, "heartbeat.avg_ping")}: ${(
					hoveredMonitor.avgResponseTime * 1000
				).toFixed(0)}ms`;
			} else if (
				hoveredMonitor.responseTime !== null &&
				hoveredMonitor.responseTime !== undefined
			) {
				pingText = `${t(language, "heartbeat.ping")}: ${(
					hoveredMonitor.responseTime * 1000
				).toFixed(0)}ms`;
			}

			return {
				timeDisplay,
				statusLabel: getStatusLabel(hoveredMonitor.status),
				showIssues: showIssues || false,
				degradedCount: hoveredMonitor.degradedCount,
				downCount: hoveredMonitor.downCount,
				degradedDuration:
					hoveredMonitor.degradedDurationSeconds !== undefined
						? formatDuration(hoveredMonitor.degradedDurationSeconds)
						: undefined,
				downDuration:
					hoveredMonitor.downDurationSeconds !== undefined
						? formatDuration(hoveredMonitor.downDurationSeconds)
						: undefined,
				pingText,
				sampleCount: hoveredMonitor.count,
				showSampleCount: (hoveredMonitor.count || 0) > 1,
			};
		},
		[language, getStatusLabel],
	);

	return { computeTooltipData };
}
