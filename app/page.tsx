import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { FeaturedPrompts } from "@/components/featured-prompts"
import { Footer } from "@/components/footer"
import { SelectMode } from "@/components/selectMode"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { signOut } from "next-auth/react"
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// 클라이언트 컴포넌트 동적 임포트
const SongGeneratorForm = dynamic(() => import('@/components/generators/SongGeneratorForm'), {
  ssr: false
});

const LyricsGeneratorFormAdvanced = dynamic(() => import('@/components/generators/LyricsGeneratorFormAdvanced'), {
  ssr: false
});

export default async function Home() {
  const session = await getServerSession(authOptions)

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  if (!session) {
    redirect("/login")
  }

  // 로그인한 사용자는 메인 페이지 표시
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <SelectMode />
      </main>
      <Footer />
    </div>
  )
}

