export type Language = "en" | "ja" | "ko" | "zh-TW" | "zh-CN";

type Translations = {
	[key: string]: string | Translations;
};

const translations: Record<Language, Translations> = {
	en: require("@/locales/en.json"),
	ja: require("@/locales/ja.json"),
	ko: require("@/locales/ko.json"),
	"zh-TW": require("@/locales/zh-TW.json"),
	"zh-CN": require("@/locales/zh-CN.json"),
};

/**
 * Translates a key path to a localized string.
 * @param language - The language to translate to
 * @param path - Dot-separated path to the translation key (e.g., 'status_indicator.up')
 * @returns The translated string, or the path if translation not found
 */
export function t(language: Language, path: string): string {
	const keys = path.split(".");
	let current: string | Translations | undefined = translations[language];

	for (const key of keys) {
		if (typeof current === "object" && current !== null) {
			current = current[key];
		} else {
			return path;
		}
		if (!current) {
			return path;
		}
	}

	return typeof current === "string" ? current : path;
}

export function detectBrowserLanguage(): Language {
	if (typeof window === "undefined") return "en";

	const browserLang = navigator.language;

	if (browserLang === "ja") return "ja";
	if (browserLang === "ko") return "ko";
	if (browserLang === "zh-TW" || browserLang === "zh-HK") return "zh-TW";
	if (browserLang.startsWith("zh")) return "zh-CN";
	return "en";
}

export function getLanguageName(lang: Language): string {
	const name = translations[lang]["name"];
	return typeof name === "string" ? name : lang;
}
