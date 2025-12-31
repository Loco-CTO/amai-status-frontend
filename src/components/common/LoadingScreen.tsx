"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/theme.module.css";
import { Language, t } from "@/lib/utils/i18n";

interface LoadingScreenProps {
	apiBase: string;
	language: Language;
	progress?: number;
	onFadeComplete?: () => void;
}

export function LoadingScreen({
	language,
	apiBase,
	progress = 0,
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
	}, [progress, onFadeComplete]);

	return (
		<div
			className={`${styles.loadingContainer} ${
				isFading ? styles.loadingFadeOut : ""
			}`}
		>
			<div className={styles.loadingContent}>
				<img
					src={`${apiBase}/logo.png`}
					alt="logo"
					className={styles.loadingLogo}
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
			</div>
		</div>
	);
}
