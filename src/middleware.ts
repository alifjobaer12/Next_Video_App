import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		const token = req.nextauth.token;
		const { pathname } = req.nextUrl;

		// 1. Redirect logged-in users away from auth pages
		if (
			token &&
			(pathname === "/auth/login/" ||
				pathname === "/auth/register/" ||
				pathname.startsWith("/api/auth/") ||
				pathname === "/login" ||
				pathname === "/register")
		) {
			return NextResponse.redirect(new URL("/", req.url));
		}

		return NextResponse.next();
	},
	{
		callbacks: {
			authorized({ req, token }) {
				const { pathname } = req.nextUrl;

				// 2. Define public routes that anyone can access
				if (
					pathname.startsWith("/api/auth/") ||
					pathname.startsWith("/auth/") ||
					pathname === "/"
				) {
					return true;
				}

				// 3. Require a token for everything else
				return !!token;
			},
		},
		// 4. Tell NextAuth to redirect to your custom login page if unauthorized
		pages: {
			signIn: "/auth/login",
		},
	},
);

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - Any file with a common static extension (covers the public folder)
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
