import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { LoginForm } from '@/components/login-form'

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  // 이미 로그인한 사용자는 메인 페이지로 리다이렉트
  if (session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}

