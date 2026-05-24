import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-8">
			<div className="max-w-4xl w-full">
				<div className="grid gap-8 sm:grid-cols-2 items-center">
					<section>
						<h1 className="text-4xl font-bold mb-4">
							Next Video App
						</h1>
						<p className="text-slate-400 mb-6">
							Upload, manage, and share videos with
							ImageKit-powered uploads and a lightweight admin
							flow.
						</p>

						<div className="flex gap-3">
							<Link href="/video">
								<Button
									className="bg-white text-sm text-black px-6 py-2 "
									variant="destructive"
								>
									Browse Videos
								</Button>
							</Link>

							<Link href="/video/upload">
								<Button variant="ghost">Upload</Button>
							</Link>
						</div>
					</section>

					<div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
						<p className="text-sm text-slate-300">Quick tips</p>
						<ul className="mt-3 space-y-2 text-slate-400 text-sm">
							<li>• Sign in to upload and manage your videos.</li>
							<li>• Use the uploader to attach thumbnails.</li>
							<li>• Video metadata is saved to MongoDB.</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	);
}
