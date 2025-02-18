import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 })

  const { promptId } = await req.json()

  const savedPrompt = await prisma.savedPrompt.create({
    data: {
      promptId,
      userId: session.user.id,
    },
  })

  return new Response(JSON.stringify(savedPrompt), { status: 201 })
} 