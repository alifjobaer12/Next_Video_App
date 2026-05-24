import mongoose from "mongoose";


declare global {
	var mongoConn: {
		isConnected: mongoose.Connection | null;
		promise: Promise<mongoose.Connection> | null;
	}
}

export {};