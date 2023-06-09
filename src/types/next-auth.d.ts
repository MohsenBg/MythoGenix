import NextAuth from "next-auth";

declare module "next-auth" {
  interface Email {
    id: string;
    address: string;
    verified: boolean;
    verifyToken?: string;
  }
  interface User {
    id: string;
    username: string;
    email: Email;
    accessToken: string;
  }

  interface Session {
    user: User;
  }
}
