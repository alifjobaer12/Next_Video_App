import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";
import bcrypt from "bcryptjs";

const userSchima = new mongoose.Schema<IUser>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

userSchima.pre<IUser>("save", async function () {
	if (!this.isModified("password")) {
		return;
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});


userSchima.methods.comparePassword = async function (candidatePassword: string) {
	return bcrypt.compare(candidatePassword, this.password);
};

const userModel =
	mongoose.models?.users || mongoose.model<IUser>("users", userSchima);

export default userModel;
