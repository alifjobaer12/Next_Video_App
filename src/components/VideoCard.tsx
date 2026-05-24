"use client";

import { IVideo } from "@/interfaces/video.interface";
import { Video } from "@imagekit/next";

export default function VideoCard({ video }: { video: IVideo }) {
	const videoPath = video.url?.trim();

	return (
		<article className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow">
			<div className="relative w-full" style={{ aspectRatio: "9/16" }}>
				{videoPath ? (
					<Video
						src={videoPath}
						controls={video.controles ?? true}
						width={500}
						height={500}
						className="object-cover w-full h-full"
					/>
				) : (
					<div className="flex h-full items-center justify-center bg-slate-950 text-sm text-slate-500">
						Video not available
					</div>
				)}
			</div>

			<div className="p-3">
				<h3 className="font-semibold text-lg text-white">
					{video.title}
				</h3>
				<p className="text-sm text-slate-400 line-clamp-2 mt-1">
					{video.description}
				</p>
			</div>
		</article>
	);
}
