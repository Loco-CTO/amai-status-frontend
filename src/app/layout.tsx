import type { Metadata } from "next";
import "@/styles/theme.css";
import { TitleUpdaterWrapper } from "@/components/common/TitleUpdaterWrapper";

/**
 * Generates metadata for the application.
 * Fetches site title from API configuration for dynamic metadata.
 * @returns Promise with page metadata including title, description, and icons
 */
export async function generateMetadata(): Promise<Metadata> {
	const apiBase =
		process.env.NEXT_PUBLIC_SERVER_ADDRESS || "http://localhost:8182";

	try {
		const response = await fetch(`${apiBase}/api/config`, {
			next: { revalidate: 3600 },
		});

		if (response.ok) {
			const data = await response.json();
			const siteTitle = data.configuration?.siteTitle || "Project 甘い";
			return {
				title: `${siteTitle} | Status`,
				description: "Service status monitoring page",
				icons: {
					icon: `${apiBase}/logo.png`,
				},
			};
		}
	} catch (error) {
		console.error("Failed to fetch metadata:", error);
	}

	return {
		title: "Project 甘い | Status",
		description: "Service status monitoring page",
		icons: {
			icon: `${apiBase}/logo.png`,
		},
	};
}

/**
 * Root layout component for the application.
 * Provides the basic HTML structure and includes the title updater.
 * @param children - Page content to render
 */
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body>
				<TitleUpdaterWrapper />
				{children}
			</body>
		</html>
	);
}
