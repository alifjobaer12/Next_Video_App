import { cn } from "@/lib/utils";

type LoadingProps = {
	label?: string;
	className?: string;
	size?: "sm" | "md" | "lg";
};

const sizeClasses: Record<NonNullable<LoadingProps["size"]>, string> = {
	sm: "h-4 w-4",
	md: "h-5 w-5",
	lg: "h-6 w-6",
};

export default function Loading({
	label = "Loading...",
	className,
	size = "md",
}: LoadingProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-center gap-3 text-slate-400",
				className,
			)}
		>
			<span
				aria-hidden="true"
				className={cn(
					"inline-block animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400",
					sizeClasses[size],
				)}
			/>
			{label ? <span className="text-sm">{label}</span> : null}
		</div>
	);
}
