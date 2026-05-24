import mongoose from "mongoose";

export const VIDEO_DIMENSIONS = {
	width: 1080,
	height: 1920,
} as const;

export interface IVideo extends mongoose.Document {
	title: string;
	description: string;
	url: string;
	thumbnail: string;
	controles?: boolean;
	transformation?: {
		width: number;
		height: number;
		quality?: number;
	};
}
