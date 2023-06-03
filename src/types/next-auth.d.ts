import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    username: string;
    email: string;
    accessToken: string;
  }

  interface Session {
    user: User;
  }
}
