import NextAuth from "next-auth"
import User from "@/prisma-types"

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
