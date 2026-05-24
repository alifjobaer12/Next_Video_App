"use client";

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

type ToastVariant = "success" | "error" | "info";

type ToastItem = {
	id: string;
	title: string;
	description?: string;
	variant: ToastVariant;
};

type ToastInput = Omit<ToastItem, "id">;

type ToastContextValue = {
	toast: (toast: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const variantClasses: Record<ToastVariant, string> = {
	success: "alert-success text-success-content",
	error: "alert-error text-error-content",
	info: "alert-info text-info-content",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<ToastItem[]>([]);
	const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

	const removeToast = useCallback((id: string) => {
		setToasts((current) => current.filter((toast) => toast.id !== id));
		const timer = timersRef.current[id];
		if (timer) {
			clearTimeout(timer);
			delete timersRef.current[id];
		}
	}, []);

	const toast = useCallback(
		(toastInput: ToastInput) => {
			const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
			setToasts((current) => [...current, { id, ...toastInput }]);
			timersRef.current[id] = setTimeout(() => {
				removeToast(id);
			}, 3000);
		},
		[removeToast],
	);

	useEffect(() => {
		return () => {
			Object.values(timersRef.current).forEach(clearTimeout);
		};
	}, []);

	const value = useMemo(() => ({ toast }), [toast]);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<div className="toast toast-end toast-bottom z-100">
				{toasts.map((item) => (
					<div
						key={item.id}
						role="status"
						className={`alert ${variantClasses[item.variant]} min-w-72 shadow-lg`}
					>
						<div>
							<div className="font-semibold">{item.title}</div>
							{item.description ? (
								<div className="text-sm opacity-90">
									{item.description}
								</div>
							) : null}
						</div>
						<button
							type="button"
							aria-label="Dismiss toast"
							className="btn btn-ghost btn-xs"
							onClick={() => removeToast(item.id)}
						>
							✕
						</button>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}

	return context.toast;
}
