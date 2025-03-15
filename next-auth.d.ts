import { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    username: string,
    // isTwoFactorEnabled: boolean,
    // isOAuth: boolean
}

declare module "next-auth" {
    interface Session {
      user: ExtendedUser
    }
}