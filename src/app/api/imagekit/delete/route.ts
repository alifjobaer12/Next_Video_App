import { authOptions } from "@/config/authOptions.config";
import envConfig from "@/config/env.config";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type DeleteBody = {
	fileId?: string;
};

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
				},
				{ status: 401 },
			);
		}

		const body = (await req.json()) as DeleteBody;
		const fileId = body?.fileId?.trim();

		if (!fileId) {
			return NextResponse.json(
				{
					success: false,
					message: "fileId is required",
				},
				{ status: 400 },
			);
		}

		const auth = Buffer.from(`${envConfig.IMAGEKIT_PRIVATE_KEY}:`).toString(
			"base64",
		);

		const imageKitRes = await fetch(
			`https://api.imagekit.io/v1/files/${encodeURIComponent(fileId)}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Basic ${auth}`,
				},
			},
		);

		if (!imageKitRes.ok) {
			const errorText = await imageKitRes.text();
			return NextResponse.json(
				{
					success: false,
					message: "Failed to delete file from ImageKit",
					error: errorText,
				},
				{ status: imageKitRes.status },
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: "File deleted successfully",
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error deleting file from ImageKit:", error);
		return NextResponse.json(
			{
				success: false,
				message: "An error occurred while deleting file",
			},
			{ status: 500 },
		);
	}
}
