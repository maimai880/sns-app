import type {NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    })
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    // @ts-ignore
    async session({session}) {
      return {
        ...session,
        user: await prisma.user.findUnique({
          where: {email: session.user?.email || ""}
        })
      }
    }
  }
}
