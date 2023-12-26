import {UserInSession} from "@/lib/next-auth"

declare module "next-auth" {
  interface Session {
    user: UserInSession
  }
}
