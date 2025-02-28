"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Wallet } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from 'next/image';

interface NavigationProps {
  sticky: boolean;
}

export function Navigation({ sticky = false }: NavigationProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Prompt Generator
              </Link>
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
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Prompt Generator
          </Link>
          <Link href="/pages/howToUse" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How to Use
          </Link>
          <Link href="/pages/aboutUs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About Us
          </Link>
        </nav>
      </div>
    </header>
  )
}

