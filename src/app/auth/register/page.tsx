"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loading from "@/components/ui/loading";

const RegisterPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const router = useRouter();

	const handelleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitting(true);

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			setSubmitting(false);
			return;
		}

		try {
			const res = await axios.post("/api/auth/register", {
				email,
				password,
			});

			console.log("Registration response:", res);

			if (!res.data.success) {
				alert(res.data.message || "Registration failed");
				return;
			}

			alert("Registration successful! Please log in.");
			router.push("/auth/login");
			// Optionally, you can also log the user in immediately after registration
			// by calling the login API or using NextAuth's signIn function.
		} catch (error) {
			console.error("Registration error:", error);
			alert("An error occurred during registration");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 antialiased selection:bg-cyan-500/30 selection:text-cyan-400">
			{/* Form Container */}
			<div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
				<h1 className="mb-6 text-3xl font-bold tracking-tight text-white">
					Create an account
				</h1>

				<form onSubmit={handelleRegister} className="space-y-5">
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

					{/* Confirm Password Input */}
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
							Confirm Password
						</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition duration-200 hover:border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
							placeholder="••••••••"
							required
						/>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={submitting}
						className="group relative mt-2 flex w-full items-center justify-center rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 active:scale-[0.98]"
					>
						{submitting ? (
							<Loading
								label="Registering..."
								size="sm"
								className="justify-start text-white"
							/>
						) : (
							"Register"
						)}
					</button>
				</form>
				<div className="mt-6 text-center text-sm text-slate-400">
					<p className="mt-4 text-center text-sm text-slate-400">
						Already have an account?{" "}
						<Link
							href="/auth/login"
							className="font-semibold text-cyan-500 hover:text-cyan-400"
						>
							Log in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
