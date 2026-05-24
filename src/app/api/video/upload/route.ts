import { connectDB } from "@/config/mongoDB.config";
import { IVideo } from "@/interfaces/video.interface";
import videoModel from "@/models/video.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

		const body: IVideo = await req.json();

		if (
			body.title.trim() === "" ||
			body.description.trim() === "" ||
			body.url.trim() === "" ||
			body.thumbnail.trim() === ""
		) {
			return NextResponse.json(
				{
					success: false,
					message: "All fields are required",
				},
				{
					status: 400,
				},
			);
		}

		await connectDB();

		const newVideo = await videoModel.create(body);

		return NextResponse.json(
			{
				success: true,
				message: "Video created successfully",
				data: newVideo,
			},
			{
				status: 201,
			},
		);
	} catch (error) {
		console.error("Error creating video:", error);
		return NextResponse.json(
			{
				success: false,
				error: "An error occurred while creating the video",
			},
			{
				status: 500,
			},
		);
	}
}
