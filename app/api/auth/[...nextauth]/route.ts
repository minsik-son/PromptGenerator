// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import { authOptions } from "./auth-options"  // 같은 폴더에서 import

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }