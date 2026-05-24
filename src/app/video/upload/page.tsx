"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import Textarea from "@/components/ui/textarea";
import FileUpload from "@/components/FileUpload";
import { ImageKitUploadResult } from "@/interfaces/fileUpload.interface";
import { UploadCloud, XCircle } from "lucide-react";

const VideoUploadPage = () => {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [uploadResult, setUploadResult] =
		useState<ImageKitUploadResult | null>(null);
	const [progress, setProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const onUploadSuccess = (res: ImageKitUploadResult) => {
		setUploadResult(res);
		setError(null);
	};

	const onUploadProgress = (p: number) => {
		setProgress(p);
	};

	const onUploading = (uploading: boolean) => {
		setIsUploading(uploading);
		if (uploading) {
			setUploadResult(null);
		}
	};

	const handlePublish = async () => {
		if (!uploadResult) {
			setError("Please upload a video before publishing.");
			return;
		}

		if (title.trim() === "" || description.trim() === "") {
			setError("Title and description are required.");
			return;
		}

		setSubmitting(true);
		setError(null);

		try {
			const body = {
				title: title.trim(),
				description: description.trim(),
				url: uploadResult.url,
				thumbnail:
					(uploadResult.thumbnail as string) || uploadResult.url,
			};

			const res = await fetch("/api/video/upload", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			const json = await res.json().catch(() => null);
			if (!res.ok) {
				throw new Error(json?.message ?? "Failed to publish video");
			}

			// navigate to video list
			router.push("/video");
		} catch (err: unknown) {
			const e = err as Error;
			setError(e?.message ?? "An error occurred while publishing");
		} finally {
			setSubmitting(false);
		}
	};

	const handleCancel = () => {
		router.back();
	};

	return (
		<main className="min-h-screen px-4 py-8">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-2xl font-bold text-white mb-4">
					Upload Video
				</h1>

				<div className="space-y-4">
					<label className="block">
						<div className="text-sm text-slate-300 mb-1">Title</div>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter a title"
						/>
					</label>

					<label className="block">
						<div className="text-sm text-slate-300 mb-1">
							Description
						</div>
						<Textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Short description"
							rows={4}
						/>
					</label>

					<label className="block">
						<div className="text-sm text-slate-300 mb-2">
							Video file
						</div>
						<div className="rounded-md border border-slate-700 bg-slate-900/40 p-4">
							<FileUpload
								fileType="video"
								onSuccess={onUploadSuccess}
								onProgress={onUploadProgress}
								onUploading={onUploading}
							/>

							<div className="mt-3">
								<div className="w-full h-2 bg-slate-800 rounded overflow-hidden">
									<div
										className="h-full bg-primary transition-[width]"
										style={{ width: `${progress}%` }}
									/>
								</div>
								<div className="text-xs text-slate-400 mt-1">
									{progress}%
								</div>
							</div>

							{uploadResult && (
								<div className="mt-3 text-sm text-slate-300">
									Uploaded:{" "}
									{uploadResult.name ??
										uploadResult.fileId ??
										"video"}
								</div>
							)}

							{error && (
								<div className="mt-2 text-sm text-red-400">
									{error}
								</div>
							)}
						</div>
					</label>

					<div className="flex gap-3 justify-end">
						<Button
							variant="error"
							onClick={handleCancel}
							disabled={submitting}
						>
							<XCircle className="mr-1 h-4 w-4" />
							Cancel
						</Button>
						<Button
						variant="success"
							onClick={handlePublish}
							disabled={
								submitting || isUploading || !uploadResult
							}
						>
							{submitting ? (
								<Loading
									label="Publishing..."
									size="sm"
									className="justify-start"
								/>
							) : (
								<>
									<UploadCloud className="mr-1 h-4 w-4" />
									Publish
								</>
							)}
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default VideoUploadPage;
