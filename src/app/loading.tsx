import Loading from "@/components/ui/loading";

export default function LoadingPage() {
	return (
		<main className="min-h-screen px-4 py-8">
			<div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center">
				<Loading label="Loading page..." size="lg" />
			</div>
		</main>
	);
}
