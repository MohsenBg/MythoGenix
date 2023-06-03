import NextAuth from "next-auth/next";
import { nextAuthOption } from "./config/nextAuthConfig";

const handler = NextAuth(nextAuthOption);

export { handler as GET, handler as POST };
