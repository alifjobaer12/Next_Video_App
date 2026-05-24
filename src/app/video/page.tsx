"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import { IVideo } from "@/interfaces/video.interface";
import Loading from "@/components/ui/loading";

export default function VideoFeedPage() {
	const [videos, setVideos] = useState<IVideo[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;

		const fetchVideos = async () => {
			try {
				const res = await fetch("/api/video");
				const json = await res.json().catch(() => null);
				if (!res.ok) {
					const msg = json?.message ?? "Failed to load videos";
					throw new Error(msg);
				}
				if (!mounted) return;
				setVideos(json?.data ?? []);
				setError(null);
			} catch (err: unknown) {
				if (!mounted) return;
				const e = err as Error;
				setError(e?.message ?? "An error occurred");
			} finally {
				if (!mounted) return;
				setLoading(false);
			}
		};

		// initial fetch
		fetchVideos();

		// poll every 10s for updates (simple cross-client update mechanism)
		const interval = setInterval(fetchVideos, 10_000);

		// also re-fetch when the tab becomes visible
		const onVisibility = () => {
			if (document.visibilityState === "visible") fetchVideos();
		};
		document.addEventListener("visibilitychange", onVisibility);

		return () => {
			mounted = false;
			clearInterval(interval);
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, []);

	return (
		<main className="min-h-screen px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-white mb-6">Videos</h1>

				{loading && (
					<Loading
						label="Loading videos..."
						className="py-8 justify-start"
					/>
				)}

				{error && (
					<div className="text-slate-300">
						<p>{error}</p>
						{error.toLowerCase().includes("unauthorized") && (
							<p className="mt-2">
								<Link
									href="/auth/login"
									className="text-blue-400 underline"
								>
									Sign in to view videos
								</Link>
							</p>
						)}
					</div>
				)}

				{!loading && !error && (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{videos && videos.length > 0 ? (
							videos.map((video) => (
								<VideoCard
									key={video._id?.toString()}
									video={video}
								/>
							))
						) : (
							<p className="text-slate-400">No videos found.</p>
						)}
					</div>
				)}
			</div>
		</main>
	);
}
