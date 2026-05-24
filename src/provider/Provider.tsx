"use client";

import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ToastProvider } from "@/components/ui/toast";

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

const Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<SessionProvider refetchInterval={5 * 60}>
			<ToastProvider>
				<ImageKitProvider urlEndpoint={urlEndpoint}>
					{children}
				</ImageKitProvider>
			</ToastProvider>
		</SessionProvider>
	);
};

export default Provider;
