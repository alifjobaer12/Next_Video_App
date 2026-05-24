import mongoose from "mongoose";
import envConfig from "./env.config";

if (!global.mongoConn) {
	global.mongoConn = {
		isConnected: null,
		promise: null,
	};
}

export const connectDB = async () => {
	if (global.mongoConn.isConnected) {
		console.log("Already connected to MongoDB");
		return global.mongoConn.isConnected;
	}

	if (!global.mongoConn.promise) {
		global.mongoConn.promise = mongoose
			.connect(envConfig.MONGO_URI)
			.then((mongoose) => mongoose.connection);
	}

	try {
		await global.mongoConn.promise;
		global.mongoConn.isConnected = mongoose.connection;
		console.log("Connected to MongoDB");
	} catch (error) {
		global.mongoConn.promise = null;
		throw error;
	}

	return global.mongoConn.isConnected;
};
