import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const userData = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        prompts: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 10
        },
        lyrics: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 10
        },
        savedPrompts: {
          include: {
            prompt: true
          }
        },
        savedLyrics: {
          include: {
            lyric: true
          }
        }
      }
    })

    return NextResponse.json(userData)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    )
  }
} 