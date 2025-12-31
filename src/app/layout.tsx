import type { Metadata } from "next";
import "@/styles/theme.css";
import { TitleUpdaterWrapper } from "@/components/common/TitleUpdaterWrapper";

export async function generateMetadata(): Promise<Metadata> {
	try {
		const apiBase =
			process.env.NEXT_PUBLIC_SERVER_ADDRESS || "http://localhost:8182";
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

	const apiBase =
		process.env.NEXT_PUBLIC_SERVER_ADDRESS || "http://localhost:8182";

	return {
		title: "Project 甘い | Status",
		description: "Service status monitoring page",
		icons: {
			icon: `${apiBase}/logo.png`,
		},
	};
}

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
