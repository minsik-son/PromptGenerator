import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

// ✅ Google 로그인 설정
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt", // JWT 세션 사용
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ NextAuth 기본 설정 내보내기
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
