"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Wallet } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from 'next/image';

export function Navigation() {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <div className="mr-4 flex justify-between h-16 items-center">
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
            {/*
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/browse" className="transition-colors hover:text-foreground/80 text-foreground">
              Browse
            </Link>
            <Link href="/sell" className="transition-colors hover:text-foreground/80 text-foreground">
              Sell
            </Link>
            <Link href="/governance" className="transition-colors hover:text-foreground/80 text-foreground">
              Governance
            </Link>
            <Link href="/profile" className="transition-colors hover:text-foreground/80 text-foreground">
              Profile
            </Link>
          </nav>
          */}
        </div>
        {/*
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <nav className="grid gap-6 px-2 py-6">
              <Link href="/browse" className="hover:text-foreground/80">
                Browse
              </Link>
              <Link href="/sell" className="hover:text-foreground/80">
                Sell
              </Link>
              <Link href="/governance" className="hover:text-foreground/80">
                Governance
              </Link>
              <Link href="/profile" className="hover:text-foreground/80">
                Profile
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        */}
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/pages/howToUse" className="text-sm text-muted-foreground hover:text-foreground">
            How to Use
          </Link>
          <Link href="/pages/aboutUs" className="text-sm text-muted-foreground hover:text-foreground">
            About Us
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/*  //로그인 버튼 일시적으로 비활성
         {isLoggedIn ? (
            <Button variant="outline" className="ml-2" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="ml-2">
                Login
              </Button>
            </Link>
          )}
          */}
        </div>
      </div>
    </header>
  )
}

