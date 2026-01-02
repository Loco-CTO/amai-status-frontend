"use client";

import styles from "@/styles/theme.module.css";
import { Language, t } from "@/lib/utils/i18n";

interface BackendUnreachableProps {
	apiBase: string;
	language: Language;
}

/**
 * Error screen displayed when the backend API is unreachable.
 * Shows troubleshooting information and the attempted API URL.
 * @param apiBase - The API base URL that failed to connect
 * @param language - The current application language
 */
export function BackendUnreachable({
	apiBase,
	language,
}: BackendUnreachableProps) {
	return (
		<div className={styles.errorContainer}>
			<div className={styles.errorContent}>
				<div className={styles.errorIconWrapper}>
					<svg
						className={styles.errorIcon}
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<circle cx="12" cy="12" r="10" />
						<line x1="12" y1="8" x2="12" y2="12" />
						<line x1="12" y1="16" x2="12.01" y2="16" />
					</svg>
				</div>
				<h1 className={styles.errorTitle}>
					{t(language, "error.backend_unreachable_title")}
				</h1>
				<p className={styles.errorSubtitle}>
					{t(language, "error.backend_unreachable_subtitle")}
				</p>
				<div className={styles.errorDetails}>
					<p className={styles.errorLabel}>{t(language, "error.backend_address")}</p>
					<code className={styles.errorCode}>{apiBase}</code>
				</div>
				<div className={styles.errorHelpText}>
					<p>{t(language, "error.backend_unreachable_help")}</p>
				</div>
			</div>
		</div>
	);
}
