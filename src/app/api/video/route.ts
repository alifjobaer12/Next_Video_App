import { connectDB } from "@/config/mongoDB.config";
import videoModel from "@/models/video.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const session = await getServerSession();

		if (!session) {
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
				},
				{
					status: 401,
				},
			);
		}

		await connectDB();

		const videos = await videoModel.find().sort({ createdAt: -1 }).lean();

		if (!videos || videos.length === 0) {
			return NextResponse.json(
				{
					success: false,
					message: "No videos found",
					data: null,
				},
				{
					status: 404,
				},
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: "Videos retrieved successfully",
				data: videos,
			},
			{
				status: 200,
			},
		);
	} catch (error) {
		console.error("Error retrieving videos:", error);
		return NextResponse.json(
			{
				success: false,
				error: "An error occurred while retrieving videos",
			},
			{
				status: 500,
			},
		);
	}
}
