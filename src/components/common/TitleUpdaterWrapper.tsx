"use client";

import { useEffect, useState } from "react";
import { TitleUpdater } from "./TitleUpdater";
import axios from "axios";

export function TitleUpdaterWrapper() {
	const [siteTitle, setSiteTitle] = useState("Project 甘い");

	useEffect(() => {
		const fetchSiteTitle = async () => {
			try {
				const apiBase =
					process.env.NEXT_PUBLIC_SERVER_ADDRESS || "http://localhost:8000";
				const response = await axios.get<{
					configuration: { siteTitle?: string };
				}>(`${apiBase}/api/config`);
				if (response.data.configuration.siteTitle) {
					setSiteTitle(response.data.configuration.siteTitle);
				}
			} catch (error) {
				console.error("Failed to fetch site title:", error);
			}
		};

		fetchSiteTitle();
	}, []);

	return <TitleUpdater siteTitle={siteTitle} />;
}
