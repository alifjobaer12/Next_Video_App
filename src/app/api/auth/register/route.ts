import { connectDB } from "@/config/mongoDB.config";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

		if (!email || !password) {
			return NextResponse.json(
				{
					success: false,
					error: "Email and password are required",
				},
				{
					status: 400,
				},
			);
		}

		await connectDB();

		const existingUser = await userModel.findOne({ email });

		if (existingUser) {
			return NextResponse.json(
				{
					success: false,
					error: "User already exists",
				},
				{
					status: 400,
				},
			);
		}

		const newUser = await userModel.create({
			email,
			password,
		});

		return NextResponse.json(
			{
				success: true,
				message: "User registered successfully",
				data: {
					user: {
						id: newUser._id,
						email: newUser.email,
						createdAt: newUser.createdAt,
						updatedAt: newUser.updatedAt,
					},
				},
			},
			{
				status: 201,
			},
		);
	} catch (error) {
		console.error("Error in registration:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Internal Server Error",
			},
			{
				status: 500,
			},
		);
	}
}
