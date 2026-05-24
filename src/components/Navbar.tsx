"use client";

import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";

const Navbar = () => {
	const [isLogin, setIsLogin] = useState(false);
	const router = useRouter();

	useEffect(() => {
		let mounted = true;
		getSession().then((session) => {
			if (!mounted) return;
			setIsLogin(Boolean(session));
		});
		return () => {
			mounted = false;
		};
	}, []);

	return (
		<div className="fixed inset-x-0 top-0 z-50 navbar bg-base-100 shadow-sm">
			<div className="navbar-start">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="lg:hidden bg-transparent px-2 "
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							{" "}
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>{" "}
						</svg>
					</div>
					<ul
						tabIndex={-1}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<Link
								className="hover:bg-transparent px-10"
								href="/"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								className="hover:bg-transparent px-10"
								href="/video"
							>
								Videos
							</Link>
						</li>
						<li>
							<Link
								className="hover:bg-white hover:text-black px-10"
								href="/video/upload"
							>
								Upload Videos
							</Link>
						</li>
					</ul>
				</div>
				<Link
					href="/"
					className="px-1 test-sm md:px-10 md:text-xl bg-transparent"
				>
					Video App
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						<Link className="hover:bg-transparent px-10" href="/">
							Home
						</Link>
					</li>
					<li>
						<Link
							className="hover:bg-transparent px-10"
							href="/video"
						>
							Videos
						</Link>
					</li>
					<li>
						<Link
							className="hover:bg-white hover:text-black px-10"
							href="/video/upload"
						>
							Upload Videos
						</Link>
					</li>
				</ul>
			</div>
			<div className="navbar-end">
				<Button
					variant="destructive"
					className="bg-white text-black px-6 mr-5 py-2 rounded-lg hover:bg-gray-200 active:scale-95 transition-colors duration-200"
					onClick={async () => {
						if (isLogin) {
							try {
								await signOut({ redirect: false });
							} finally {
								setIsLogin(false);
								router.push("/auth/login");
							}
						} else {
							router.push("/auth/login");
						}
					}}
				>
					{isLogin ? <LogOut size={10} /> : <LogIn size={10} />}
					{isLogin ? "Log Out" : "Log In"}
				</Button>
			</div>
		</div>
	);
};

export default Navbar;
