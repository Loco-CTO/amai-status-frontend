"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/theme.module.css";
import { Selector, type SelectorOption } from "./Selector";

const INTERVAL_OPTIONS: SelectorOption[] = [
	{ value: 5, label: "5s" },
	{ value: 10, label: "10s" },
	{ value: 15, label: "15s" },
	{ value: 30, label: "30s" },
	{ value: 45, label: "45s" },
	{ value: 60, label: "60s" },
];

const STORAGE_KEY = "updateInterval";
const DEFAULT_INTERVAL = 15;

interface UpdateIntervalSelectorProps {
	onIntervalChange?: (interval: number) => void;
}

export function UpdateIntervalSelector({
	onIntervalChange,
}: UpdateIntervalSelectorProps) {
	const [interval, setInterval] = useState(DEFAULT_INTERVAL);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		const loadedInterval = saved ? parseInt(saved, 10) : DEFAULT_INTERVAL;
		setInterval(loadedInterval);
		onIntervalChange?.(loadedInterval);
		setMounted(true);
	}, [onIntervalChange]);

	const handleIntervalChange = (value: string | number) => {
		const newInterval = typeof value === "string" ? parseInt(value, 10) : value;
		setInterval(newInterval);
		localStorage.setItem(STORAGE_KEY, String(newInterval));
		onIntervalChange?.(newInterval);
	};

	if (!mounted) return null;

	return (
		<div className={styles.updateIntervalSelector}>
			<Selector
				options={INTERVAL_OPTIONS}
				value={interval}
				onChange={handleIntervalChange}
				icon="schedule"
				expandUp
				ariaLabel="Update interval selector"
			/>
		</div>
	);
}
