"use client";

import { useEffect, useState } from "react";
import { detectBrowserLanguage, type Language } from "@/lib/utils/i18n";
import { getCookie } from "@/lib/utils/cookies";

interface TitleUpdaterProps {
	siteTitle?: string;
}

export function TitleUpdater({
	siteTitle = "Project 甘い",
}: TitleUpdaterProps) {
	const [language, setLanguage] = useState<Language>("en");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const lang = (getCookie("language") as Language) || detectBrowserLanguage();
		setLanguage(lang);

		const titleFormatted = t(lang, "header.title");
		document.title = `${siteTitle} | ${titleFormatted}`;
		setMounted(true);

		const handleStorageChange = () => {
			const updatedLang =
				(getCookie("language") as Language) || detectBrowserLanguage();
			setLanguage(updatedLang);
			const titleFormatted = t(updatedLang, "header.title");
			document.title = `${siteTitle} | ${titleFormatted}`;
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, [siteTitle]);

	useEffect(() => {
		if (mounted) {
			const titleFormatted = t(language, "header.title");
			document.title = `${siteTitle} | ${titleFormatted}`;
		}
	}, [language, mounted, siteTitle]);

	return null;
}

function t(language: Language, key: string): string {
	const translations: Record<Language, Record<string, string>> = {
		en: { "header.title": "Status" },
		ja: { "header.title": "ステータス" },
		ko: { "header.title": "상태" },
		"zh-TW": { "header.title": "狀態" },
		"zh-CN": { "header.title": "状态" },
	};
	return translations[language]?.[key] || "Status";
}
