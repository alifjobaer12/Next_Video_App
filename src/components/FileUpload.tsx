"use client";

import {
	IFileUpload,
	ImageKitUploadResult,
} from "@/interfaces/fileUpload.interface";
import Loading from "@/components/ui/loading";
import { upload } from "@imagekit/next";
import axios from "axios";
import React, { useState } from "react";

const FileUpload = (props: IFileUpload) => {
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const validateFile = (file: File) => {
		if (props.fileType === "video" && !file.type.startsWith("video/")) {
			setError("Please select a valid video file.");
			return false;
		}

		console.log(file.size);

		if (file.size > 10 * 1024 * 1024) {
			setError("File size must be less than 10 MB");
			return false;
		}

		return true;
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file || !validateFile(file)) {
			return;
		}
		setUploading(true);
		props.onUploading?.(true);
		setError(null);

		try {
			const authRes = await axios.get("/api/imagekit/upload-auth");
			const authData = authRes.data.data;
			console.log(authData);

			const res = (await upload({
				file,
				fileName: file.name,
				publicKey: authData.publicKey,
				signature: authData.signature,
				token: authData.token,
				expire: authData.expire,
				onProgress: (progress) => {
					if (props.onProgress && progress.lengthComputable) {
						const percent = Math.round(
							(progress.loaded / progress.total) * 100,
						);
						props.onProgress(percent);
					}
				},
			})) as unknown as ImageKitUploadResult;

			console.log("Upload response:", res);
			props.onSuccess(res);
		} catch (error) {
			console.error("Error uploading file:", error);
			setError("Failed to upload file. Please try again.");
		} finally {
			setUploading(false);
			props.onUploading?.(false);
		}
	};

	return (
		<>
			<input
				type="file"
				accept={props.fileType === "video" ? "video/*" : "image/*"}
				onChange={handleFileChange}
			/>
			{uploading && (
				<Loading
					label="Uploading..."
					size="sm"
					className="mt-3 justify-start"
				/>
			)}
			{error && (
				<span className="text-red-500">
					<br /> {error}
				</span>
			)}
		</>
	);
};

export default FileUpload;
