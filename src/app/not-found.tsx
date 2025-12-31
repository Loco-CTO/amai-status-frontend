"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { t, type Language, detectBrowserLanguage } from "@/lib/utils/i18n";
import { getCookie } from "@/lib/utils/cookies";
import styles from "@/styles/theme.module.css";

export default function NotFound() {
	const [language, setLanguage] = useState<Language>("en");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const lang = (getCookie("language") as Language) || detectBrowserLanguage();
		setLanguage(lang);
		setMounted(true);
	}, []);

	if (!mounted) return null;

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
						<line x1="9" y1="9" x2="15" y2="15" />
						<line x1="15" y1="9" x2="9" y2="15" />
					</svg>
				</div>
				<div className={styles.notFoundCode}>{t(language, "notFound.code")}</div>
				<h1 className={styles.errorTitle}>{t(language, "notFound.title")}</h1>
				<p className={styles.errorSubtitle}>
					{t(language, "notFound.description")}
				</p>
				<Link href="/" className={styles.notFoundButton}>
					{t(language, "notFound.button")}
				</Link>
			</div>
		</div>
	);
}
