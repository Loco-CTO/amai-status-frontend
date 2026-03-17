"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/theme.module.css";
import { Language, t } from "@/lib/utils/i18n";

interface LoadingScreenProps {
	apiBase: string;
	language: Language;
	progress?: number;
	monitorLoadStates?: Record<string, "pending" | "loading" | "done" | "error">;
	onFadeComplete?: () => void;
}

/**
 * Loading screen component shown during initial app setup.
 * Displays progress bar and status messages while preloading data.
 * @param language - The current application language
 * @param apiBase - The API base URL
 * @param progress - Loading progress percentage (0-100)
 * @param onFadeComplete - Callback when fade-out animation completes
 */
export function LoadingScreen({
	language,
	apiBase,
	progress = 0,
	monitorLoadStates = {},
	onFadeComplete,
}: LoadingScreenProps) {
	const [displayProgress, setDisplayProgress] = useState(progress);
	const [isFading, setIsFading] = useState(false);

	useEffect(() => {
		setDisplayProgress(progress);
	}, [progress]);

	useEffect(() => {
		if (progress >= 100) {
			const fadeTimer = setTimeout(() => {
				setIsFading(true);

				const completeTimer = setTimeout(() => {
					onFadeComplete?.();
				}, 800);

				return () => clearTimeout(completeTimer);
			}, 300);

			return () => clearTimeout(fadeTimer);
		}

		return undefined;
	}, [progress, onFadeComplete]);

	return (
		<div
			className={`${styles.loadingContainer} ${
				isFading ? styles.loadingFadeOut : ""
			}`}
		>
			<div className={styles.loadingContent}>
				<Image
					src={`${apiBase}/logo.png`}
					alt="logo"
					width={80}
					height={80}
					className={styles.loadingLogo}
					unoptimized
				/>
				<div className={styles.progressBarWrapper}>
					<div
						className={styles.progressBar}
						style={{
							width: `${displayProgress}%`,
						}}
					/>
				</div>
				<p className={styles.loadingText}>
					{displayProgress < 100
						? `${Math.round(displayProgress)}%`
						: t(language, "header.ready")}
				</p>
				{Object.keys(monitorLoadStates).length > 0 && (
					<div className={styles.monitorLoadingList}>
						{Object.entries(monitorLoadStates).map(([monitorName, status]) => (
							<div key={monitorName} className={styles.monitorLoadingItem}>
								<span className={styles.monitorLoadingName}>{monitorName}</span>
								<span
									className={`${styles.monitorLoadingBadge} ${
										status === "done"
											? styles.monitorLoadingDone
											: status === "loading"
												? styles.monitorLoadingActive
												: status === "error"
													? styles.monitorLoadingError
													: styles.monitorLoadingPending
									}`}
								>
									{status}
								</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
