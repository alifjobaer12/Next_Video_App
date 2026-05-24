"use client";

import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [checkingSession, setCheckingSession] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const redirectIfLoggedIn = async () => {
			const session = await getSession();

			if (session) {
				router.replace("/");
				return;
			}

			setCheckingSession(false);
		};

		redirectIfLoggedIn();
	}, [router]);

	const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const res = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (res?.error || !res?.ok) {
				alert(res?.error ?? "Invalid email or password");
				return;
			}

			alert("Login successful!");
			router.replace("/");
		} finally {
			setSubmitting(false);
		}
	};

	if (checkingSession) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-400">
				<Loading label="Checking session..." size="lg" />
			</div>
		);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 antialiased selection:bg-cyan-500/30 selection:text-cyan-400">
			{/* Form Container */}
			<div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
				<h1 className="mb-6 text-3xl font-bold tracking-tight text-white">
					Welcome back
				</h1>

				<form onSubmit={handleLogin} className="space-y-5">
					{/* Email Input */}
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
							Email Address
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition duration-200 hover:border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
							placeholder="you@example.com"
							required
						/>
					</div>
					{/* Password Input */}
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition duration-200 hover:border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
							placeholder="••••••••"
							required
						/>
					</div>
					{/* Submit Button */}
					<button
						type="submit"
						className="group relative mt-2 flex w-full items-center justify-center rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 active:scale-[0.98]"
					>
						Login
					</button>
					disabled={submitting}
					<div className="mt-6 text-center text-sm text-slate-400">
						<p className="mt-4 text-center text-sm text-slate-400">
							{submitting ? (
								<Loading
									label="Logging in..."
									size="sm"
									className="justify-start text-slate-950"
								/>
							) : (
								"Log in"
							)}
							<Link
								href="/auth/register"
								className="font-semibold text-cyan-500 hover:text-cyan-400"
							>
								Register
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
