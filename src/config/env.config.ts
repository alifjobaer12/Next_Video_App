if (!process.env.MONGO_URI) {
	throw new Error("MONGO_URI is not defined in environment variables");
}

if (!process.env.GITHUB_ID) {
	console.log("GITHUB_ID is not defined in environment variables. GitHub authentication will be disabled.");
	
	// throw new Error("GITHUB_ID is not defined in environment variables");
}

if (!process.env.GITHUB_SECRET) {
	console.log("GITHUB_ID is not defined in environment variables. GitHub authentication will be disabled.");
	// throw new Error("GITHUB_SECRET is not defined in environment variables");
}

if (!process.env.NEXTAUTH_SECRET) {
	throw new Error("NEXTAUTH_SECRET is not defined in environment variables");
}

if (!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
	console.log("NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is not defined in environment variables. Image upload functionality may be affected.");
	// throw new Error("NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is not defined in environment variables");
}

if (!process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY) {
	console.log("NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY is not defined in environment variables. Image upload functionality may be affected.");
	// throw new Error("NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY is not defined in environment variables");
}

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
	console.log("IMAGEKIT_PRIVATE_KEY is not defined in environment variables. Image upload functionality may be affected.");
	// throw new Error("IMAGEKIT_PRIVATE_KEY is not defined in environment variables");
}

const envConfig = {
	MONGO_URI: process.env.MONGO_URI,
	GITHUB_ID: process.env.GITHUB_ID,
	GITHUB_SECRET: process.env.GITHUB_SECRET,
	NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
	NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
	NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
	IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
};

export default envConfig;
