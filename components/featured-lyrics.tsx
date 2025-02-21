'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

/*
const featuredPrompts = [
  {
    id: 1,
    title: "Creative Story Generator",
    description: "Generate engaging short stories with complex characters and plot twists.",
    price: "0.1 ETH",
    category: "Creative Writing",
    rating: 4.8,
  },
  {
    id: 2,
    title: "SEO Content Optimizer",
    description: "Create SEO-optimized content that ranks well on search engines.",
    price: "0.08 ETH",
    category: "Marketing",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Code Refactoring Assistant",
    description: "Improve your code quality with smart refactoring suggestions.",
    price: "0.15 ETH",
    category: "Programming",
    rating: 4.7,
  },
]
*/

interface FeaturedLyricsProps {
    copyToClipboard: (text: string, index: number) => void;
    copiedIndex: number | null;
}

const featuredPrompts = [
  {
    id: 1,
    title: "Marry me",
    description: `
      [Folk / Acoustic] [D Major] [70 BPM] [Warm Tone]
      \n
      [Intro] [Soft Piano]
      (As the soft notes of a piano float through the air, a sense of nostalgia fills the room)
      \n
      [Verse 1] [Male Tenor] [Piano & Acoustic Guitar]
      Down a road, that's old as time,
      I found a love, that's purely mine,
      By the creek, under the willow tree,
      Barefoot and wild, as free as the sea.
      \n
      [Pre-Chorus] [Drums Enter]
      And I look into her eyes, clear as the summer sky,
      I know I want to make her mine, until the end of time.
      \n
      [Chorus] [All Instruments]
      Marry me, under the willow tree,
      Marry me, in the heart of the sea.
      With the stars as our canopy, 
      And the moon as our decree, 
      Oh, darling, won't you marry me?
      \n
      [Verse 2] [Male Tenor] [Piano, Subtle Drums]
      In her laughter, I found my home,
      In her heart, I'm no longer alone.
      Our love story, etched in the stone,
      In this life, and the one beyond unknown.
      \n
      [Pre-Chorus] [Build Up, More Drums]
      As I hold her close, under the twilight glow,
      With every heartbeat, my love continues to grow.
      \n
      [Chorus] [Intensify]
      Marry me, on this magic spree,
      Marry me, and set our spirits free.
      With the night as our jubilee,
      And our love as the key,
      Oh, darling, won't you marry me?
      \n
      [Bridge] [Male Tenor] [Soft Piano, Distant Drums]
      I'll build you a castle, where our dreams can reside,
      A haven of love, where we can confide.
      Through hardships and joy, by your side I'll abide,
      With your hand in mine, on life's great ride.
      \n
      [Chorus] [All Instruments, Crescendo]
      Marry me, in this symphony,
      Marry me, in perfect harmony.
      With the universe as our gallery,
      And our love as the testimony,
      Oh, darling, won't you marry me?
      \n
      [Outro] [Soft Piano, Fading Acoustic Guitar]
      (In the quietness of the night, the soft echo of the piano fades away... leaving the promise of a love everlasting)
      \n
      [Postlude] [Soft Piano & Acoustic Guitar]
      (As the melody lingers, a soft whisper in the night... "Marry me...")
    `,
    category: "Folk / Acoustic",
  },
  {
    id: 2,
    title: "Chasing Stars",
    description: `
                [POP] [G Major] [128 BPM] 
                \n
                [Intro] [Soft Synth Pad, Gentle Bell Sounds]  
                \n
                [Verse 1] [Female Soprano] [Acoustic Guitar & Light Percussion]  
                In the quiet of the night, where the dreams take flight,  
                I close my eyes, let the whispers guide my sight.  
                Every heartbeat's echo, a step toward the light,  
                A canvas unpainted, waiting for my might.  
                \n
                [Chorus] [Choir (Mixed), Full Band]  
                Oh, I’m chasing stars, reaching high and far,  
                With every distant spark, I know just who we are.  
                Together we'll rise, beyond the endless skies,  
                In the dance of our dreams, we’ll find our paradise.  
                \n
                [Verse 2] [Female Soprano] [Piano & Strings]  
                Through the storms and shadows, I’ll hold on to my fire,  
                Every trial faced, fuels this deep desire.  
                When the world feels heavy, and it all seems lost,  
                I’ll remember the vision, and I’ll pay the cost.  
                \n
                [Pre-Chorus] [Building Energy, Drums Enter]  
                So take my hand, let’s break the chains tonight,  
                We’ll pave our own way, with courage as our light.  
                \n
                [Chorus] [Choir (Mixed), Full Band]  
                Oh, I’m chasing stars, reaching high and far,  
                With every distant spark, I know just who we are.  
                Together we'll rise, beyond the endless skies,  
                In the dance of our dreams, we’ll find our paradise.  
                \n
                [Bridge] [Slower Tempo, Emotional Shift]  
                And when the night is dark, I’ll find my way,  
                Through the doubts and fears, I’ll never sway.  
                With each step forward, I’ll hear the call,  
                In the journey of our hearts, we’ll conquer all.  
                \n
                [Chorus] [Even More Powerful, Full Band with Brass]  
                Oh, I’m chasing stars, reaching high and far,  
                With every distant spark, I know just who we are.  
                Together we'll rise, beyond the endless skies,  
                In the dance of our dreams, we’ll find our paradise.  
                \n
                [Outro] [Fading Melody, Echoing Vocals]  
                So here we stand, with our dreams in hand,  
                Chasing stars forever, together we will stand.  
                In the glow of the night, we’ll light the way,  
                With hope as our guide, we’ll seize the day.`,
    category: "Pop",
  },
  {
    id: 3,
    title: "Sueños de Papel",
    description: `
    [Pop] [D Major] [115 BPM]
    \n
    [Verse 1] [Female Soprano] [Acoustic Guitar & Light Percussion]
    En un mundo de papel y tinta,
    Busco la verdad que nunca miento,
    Mis sueños se despliegan como el viento,
    En la noche con estrellas que parpadean.
    \n
    [Chorus] [Female Soprano] [Full Band Enters]
    Soy una soñadora, perdida en el mar de la creación,
    Mis pensamientos como olas, en los mares de la imaginación.
    Mi corazón late al ritmo de mis sueños de papel,
    Siguiendo el compás de la vida, bajo la luz del amanecer.
    \n
    [Verse 2] [Female Soprano] [Full Band]
    En los reinos de mis sueños, nado en ríos de inspiración,
    Mis aspiraciones como aves, volando en formación.
    En este universo de papel, mis deseos son la ley,
    Navegando en las corrientes de los sueños que yo creé.
    \n
    [Bridge] [Female Soprano] [Drums Fade, Soft Piano Enters]
    En las páginas de mi mente, veo mundos que aún no existen,
    Mis sueños como semillas, en la tierra del mañana resisten.
    A veces la realidad parece una prisión,
    Pero mis sueños me dan alas, me llevan en su canción.
    \n
    [Chorus] [Female Soprano] [Drums Re-enter, Full Band]
    Soy una soñadora, perdida en el mar de la creación,
    Mis pensamientos como olas, en los mares de la imaginación.
    Mi corazón late al ritmo de mis sueños de papel,
    Siguiendo el compás de la vida, bajo la luz del amanecer.
    \n
    [Outro] [Soft Acoustic Guitar, Echoing Vocals]
    Y mientras el mundo duerme, sueño con la libertad,
    En mi barco de papel, navego hacia la eternidad.`,
    category: "Pop",
  },
]

export function FeaturedLyrics() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleCopy = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("텍스트가 클립보드에 복사되었습니다!");
      
      // 1초 후에 복사 상태 초기화
      setTimeout(() => {
        setCopiedId(null);
      }, 1000);
    } catch (err) {
      toast.error("복사하는 중 오류가 발생했습니다.");
    }
  };

  const formatDescription = (text: string) => {
    return text.replace(/\n{2,}/g, '\n'); // 두 개 이상의 개행을 하나로 변환
  };

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Featured Lyrics</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPrompts.map((prompt) => (
            <Card key={prompt.id} className={`group relative overflow-hidden transition-all hover:shadow-lg ${expandedId === prompt.id ? 'h-auto' : 'h-[500px]'}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{prompt.title}</CardTitle>
                  </div>
                  <Badge variant="secondary">{prompt.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`relative ${expandedId === prompt.id ? '' : 'max-h-[300px] overflow-hidden'}`}>
                  <CardDescription className="mt-2 pl-0 whitespace-pre-line break-words">
                    {formatDescription(prompt.description)}
                  </CardDescription>
                  {expandedId !== prompt.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none" />
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Button
                  onClick={() => handleCopy(prompt.description, prompt.id)}
                >
                  {copiedId === prompt.id ? "Copied!" : "Copy"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setExpandedId(expandedId === prompt.id ? null : prompt.id)}
                >
                  {expandedId === prompt.id ? "Hide" : "More"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

