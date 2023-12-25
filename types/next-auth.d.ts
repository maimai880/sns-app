import NextAuth from "next-auth"
import User from "@/prisma-types"
import {UserInSession} from "@/types/session"

declare module "next-auth" {
  interface Session {
    user: UserInSession
  }
}
