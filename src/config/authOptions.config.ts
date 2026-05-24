import { NextAuthOptions } from "next-auth";
// import GithubProviders from "next-auth/providers/github";
import envConfig from "./env.config";
import CredentialsProviders from "next-auth/providers/credentials";
import { connectDB } from "./mongoDB.config";
import userModel from "@/models/user.model";

export const authOptions: NextAuthOptions = {
	providers: [
		// GithubProviders({
		// 	clientId: envConfig.GITHUB_ID,
		// 	clientSecret: envConfig.GITHUB_SECRET,
		// }),
		CredentialsProviders({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { email, password } = credentials || {};

				if (!email || !password) {
					throw new Error("Email and password are required");
				}

				try {
					await connectDB();

					const user = await userModel.findOne({ email });

					if (!user) {
						throw new Error("Invalid email or password");
					}

					const isPasswordValid = await user.comparePassword(
						password,
						user.password,
					);

					if (!isPasswordValid) {
						throw new Error("Invalid password");
					}

					return {
						id: user._id.toString(),
						email: user.email,
					};
				} catch (error) {
					console.error("Error in credentials provider:", error);
					throw new Error("An error occurred during authentication");
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
		error: "/auth/login",
	},
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	secret: envConfig.NEXTAUTH_SECRET,
};
