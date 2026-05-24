import { authOptions } from "@/config/authOptions.config";
import NextAuth from "next-auth";

const handeler = NextAuth(authOptions);

export { handeler as GET, handeler as POST };