import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

// ✅ Google 로그인 설정
export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // JWT 세션 사용
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ 최신 NextAuth 방식 적용
const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
