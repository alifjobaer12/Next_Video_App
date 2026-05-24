import { IVideo, VIDEO_DIMENSIONS } from "@/interfaces/video.interface";
import mongoose from "mongoose";

const videoSchima = new mongoose.Schema<IVideo>({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	thumbnail: {
		type: String,
		required: true,
	},
	controles: {
		type: Boolean,
		default: true,
	},
	transformation: {
		width: {
			type: Number,
			default: VIDEO_DIMENSIONS.width,
		},
		height: {
			type: Number,
			default: VIDEO_DIMENSIONS.height,
		},
		quality: {
			type: Number,
			min: 1,
			max: 100,
			default: 80,
		},
	},
});

const videoModel =
	mongoose.models?.videos || mongoose.model<IVideo>("videos", videoSchima);

export default videoModel;
