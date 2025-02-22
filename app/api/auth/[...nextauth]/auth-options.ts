// app/api/auth/[...nextauth]/auth-options.ts (같은 폴더에 새로 생성)
import type { NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}