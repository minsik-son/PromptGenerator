"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Wallet, ChevronDown, Music } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface NavigationProps {
  sticky: boolean;
}

export function Navigation({ sticky }: NavigationProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [promptMenuOpen, setPromptMenuOpen] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <header className={`top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${sticky ? 'sticky' : ''}`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
                src="/images/PromptAI-logo.png" 
                alt="Prompt AI Logo"
                width={40}
                height={40}
                className="mr-2"
            />
            <span className="text-2xl font-light">
                Prompt Ai
            </span>
          </Link>
        </div>
        
        {/* 모바일 메뉴 */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pl-0">
            <nav className="grid gap-6 px-2 py-6">
              {/* 모바일용 아코디언 메뉴 */}
              <Collapsible
                open={promptMenuOpen}
                onOpenChange={setPromptMenuOpen}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <button className="flex w-full items-center justify-between text-sm text-muted-foreground hover:text-foreground py-2">
                    Prompt Generator
                    <ChevronDown className={`h-4 w-4 transition-transform ${promptMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-1 pl-4 space-y-3 animate-accordion-down pb-2">
                  <Link href="/music-prompt" className="flex items-center text-sm text-muted-foreground hover:text-foreground py-1">
                    Music Prompt
                  </Link>
                  <Link href="/image-prompt" className="flex items-center text-sm text-muted-foreground hover:text-foreground py-1">
                    Image Prompt
                  </Link>
                </CollapsibleContent>
              </Collapsible>
              
              <Link href="/pages/howToUse" className="text-sm text-muted-foreground hover:text-foreground">
                How to Use
              </Link>
              <Link href="/pages/aboutUs" className="text-sm text-muted-foreground hover:text-foreground">
                About Us
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        
        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex items-center space-x-6 justify-end">
          <div className="relative h-16 flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors h-16">
                  Prompt Generator
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="absolute top-[32px] left-0 border-t-0 rounded-none rounded-b-md w-[160px] shadow-md"
                sideOffset={0}
                style={{ marginTop: '-1px' }}
              >
                <DropdownMenuItem asChild className="justify-start px-4 py-2.5">
                  <Link href="/music-prompt" className="w-full">
                    Music Prompt
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="justify-start px-4 py-2.5">
                  <Link href="/image-prompt" className="w-full">
                    Image Prompt
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Link href="/pages/howToUse" className="text-sm text-muted-foreground hover:text-foreground transition-colors h-16 flex items-center">
            How to Use
          </Link>
          <Link href="/pages/aboutUs" className="text-sm text-muted-foreground hover:text-foreground transition-colors h-16 flex items-center">
            About Us
          </Link>
        </nav>
      </div>
    </header>
  )
}

