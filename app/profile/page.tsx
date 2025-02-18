"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarIcon, Wallet, History, Settings } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('/api/user/content')
      const data = await response.json()
      setUserData(data)
    }

    if (session?.user) {
      fetchUserData()
    }
  }, [session])

  if (!userData) return <div>Loading...</div>

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">John.eth</h1>
              <p className="text-muted-foreground">Joined December 2023</p>
              <div className="flex items-center gap-2 mt-2">
                <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span>4.9 Rating</span>
                <span className="text-muted-foreground">• 50 Reviews</span>
              </div>
            </div>
            <Button>Edit Profile</Button>
          </div>

          <Tabs defaultValue="prompts">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="prompts">프롬프트</TabsTrigger>
              <TabsTrigger value="lyrics">가사</TabsTrigger>
              <TabsTrigger value="saved">저장됨</TabsTrigger>
            </TabsList>

            <TabsContent value="prompts" className="mt-6">
              <div className="grid gap-6">
                {userData.prompts.map((prompt: any) => (
                  <Card key={prompt.id}>
                    <CardHeader>
                      <CardTitle>생성된 프롬프트</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{prompt.content}</p>
                      <p className="text-sm text-gray-500">
                        생성일: {new Date(prompt.createdAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lyrics" className="mt-6">
              <div className="grid gap-6">
                {userData.lyrics.map((lyric: any) => (
                  <Card key={lyric.id}>
                    <CardHeader>
                      <CardTitle>생성된 가사</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="whitespace-pre-wrap">{lyric.content}</pre>
                      <p className="text-sm text-gray-500">
                        생성일: {new Date(lyric.createdAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

