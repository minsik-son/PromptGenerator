import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// import { prisma } from "@/lib/prisma"  // 주석 처리

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // 기본적인 이메일 확인만 수행
      if (!user.email) return false
      return true
    },
    async session({ session, token }) {
      // DB 조회 없이 기본 세션 반환
      return session
    },
    async redirect({ url, baseUrl }) {
      // 로그인 후 항상 홈페이지로 리다이렉트
      if (url.startsWith(baseUrl)) {
        return '/'
      }
      return baseUrl
    },
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 