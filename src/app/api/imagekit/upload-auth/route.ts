import envConfig from "@/config/env.config";
import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const imagekitAuth = getUploadAuthParams({
			privateKey: envConfig.IMAGEKIT_PRIVATE_KEY as string,
			publicKey: envConfig.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
		});

		return NextResponse.json(
			{
				success: true,
				message:
					"ImageKit upload authentication parameters retrieved successfully",
				data: {
					...imagekitAuth,
					publicKey: envConfig.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
					urlEndpoint: envConfig.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
				},
			},
			{
				status: 200,
			},
		);
	} catch (error) {
		console.error(
			"Error retrieving ImageKit upload authentication parameters:",
			error,
		);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to retrieve ImageKit upload authentication parameters",
			},
			{
				status: 500,
			},
		);
	}
}
