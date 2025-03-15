import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    // Cuando se loguea con una cuenta de Google o Github esto automaticamente deja el email verificado
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Anullar el OAuth  si no tienen el email verificado
      if(account?.provider !== "credentials") return true;

      if(!user.id) return false;
      const existingUser = await getUserById(user.id);

      // Previene loguearse sin tener el email verificado
      if(!existingUser?.emailVerified) return false;

      // if(existingUser.isTwoFactorEnabled) {
      //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
      //   console.log({
      //     twoFactorConfirmation
      //   });

      //   if(!twoFactorConfirmation) return false;

      //   await db.twoFactorConfirmation.delete({
      //     where: {
      //       id: twoFactorConfirmation.id
      //     }
      //   })
      // };

      return true;
    },
    async session({ token, session }){
      console.log({token})
      if(session.user) {
        if(token.sub) session.user.id = token.sub;
        if(token.username) session.user.username = token.username as string;
      };

      return session;
    },
    async jwt({ token }) {
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if(!existingUser) return token;

      token.username = existingUser.username;

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
})