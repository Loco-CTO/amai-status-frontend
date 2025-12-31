"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/theme.module.css";
import {
	Language,
	getLanguageName,
	detectBrowserLanguage,
} from "@/lib/utils/i18n";
import { getCookie, setCookie } from "@/lib/utils/cookies";
import { Selector, type SelectorOption } from "./Selector";

interface LanguageSelectorProps {
	language?: Language;
	onLanguageChange?: (lang: Language) => void;
}

const LANGUAGE_OPTIONS: SelectorOption[] = [
	{ value: "en", label: "English" },
	{ value: "ja", label: "日本語" },
	{ value: "ko", label: "한국어" },
	{ value: "zh-TW", label: "繁體中文" },
	{ value: "zh-CN", label: "简体中文" },
];

export function LanguageSelector({
	language: initialLanguage,
	onLanguageChange,
}: LanguageSelectorProps) {
	const [language, setLanguage] = useState<Language>(initialLanguage || "en");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const savedLanguage = getCookie("language") as Language | null;
		const detected = savedLanguage || detectBrowserLanguage();

		setLanguage(detected);
		onLanguageChange?.(detected);
		setMounted(true);
	}, [onLanguageChange]);

	const handleLanguageChange = (value: string | number) => {
		const lang = value as Language;
		setLanguage(lang);
		setCookie("language", lang);
		onLanguageChange?.(lang);
	};

	if (!mounted) return null;

	return (
		<div className={styles.languageSelector}>
			<Selector
				options={LANGUAGE_OPTIONS}
				value={language}
				onChange={handleLanguageChange}
				icon="language"
				label={getLanguageName(language)}
				ariaLabel="Language selector"
			/>
		</div>
	);
}
