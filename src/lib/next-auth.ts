import type {NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import {User} from "@/prisma-types"

export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    })
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({session, user: adapterUser}) => {
      const user = adapterUser as User

      return {
        ...session,
        user: !user ? session.user : {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          bio: user.bio,
          isPrivate: user.isPrivate,
          finishInit: user.finishInit,
        }
      }
    }
  }
}

export type UserInSession = Pick<User,
  "id" |
  "email" |
  "name" |
  "image" |
  "bio" |
  "isPrivate" |
  "finishInit"
>;
