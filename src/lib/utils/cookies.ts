/**
 * Sets a cookie in the browser with an expiration date.
 * @param name - Cookie name
 * @param value - Cookie value
 * @param days - Number of days until expiration (default: 365)
 */
export function setCookie(name: string, value: string, days = 365) {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	const expires = `expires=${date.toUTCString()}`;
	document.cookie = `${name}=${value};${expires};path=/`;
}

/**
 * Retrieves a cookie value from the browser.
 * @param name - Cookie name to retrieve
 * @returns The cookie value, or null if not found
 */
export function getCookie(name: string): string | null {
	const nameEQ = `${name}=`;
	const cookies = document.cookie.split(";");

	for (let cookie of cookies) {
		cookie = cookie.trim();
		if (cookie.startsWith(nameEQ)) {
			return cookie.substring(nameEQ.length);
		}
	}

	return null;
}
