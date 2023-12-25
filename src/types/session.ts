import {User} from "@/prisma-types"

export type UserInSession = Pick<User,
  "id" |
  "email" |
  "name" |
  "image" |
  "bio" |
  "isPrivate" |
  "finishInit"
>;
