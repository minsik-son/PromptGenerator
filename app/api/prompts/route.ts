import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 })

  const { content } = await req.json()

  const prompt = await prisma.prompt.create({
    data: {
      content,
      userId: session.user.id,
    },
  })

  return new Response(JSON.stringify(prompt), { status: 201 })
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 })

  const prompts = await prisma.prompt.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10, // 최근 10개만 가져오기
  })

  return new Response(JSON.stringify(prompts))
} 