export interface ImageKitUploadResult {
	url: string;
	fileId?: string;
	name?: string;
	size?: number;
	thumbnail?: string;
	[key: string]: unknown;
}

export interface IFileUpload {
	onSuccess: (res: ImageKitUploadResult) => void;
	onProgress?: (progress: number) => void;
	onUploading?: (uploading: boolean) => void;
	fileType?: "image" | "video";
}
