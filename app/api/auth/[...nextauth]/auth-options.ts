// app/api/auth/[...nextauth]/auth-options.ts (같은 폴더에 새로 생성)
import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false;
      return true;
    },
    async session({ session, token }) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? '/' : baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}