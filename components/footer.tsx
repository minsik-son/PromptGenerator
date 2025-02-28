"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mt-1 border-t pt-2 flex flex-col sm:flex-row justify-center items-center">
        {/* About Us 링크 */}
        <Link
          href="/pages/aboutUs"
          className="text-sm text-muted-foreground hover:text-foreground mx-2"
        >
          About Us
        </Link>

        {/* 저작권 표시 */}
        <p className="text-sm text-muted-foreground mx-2">
          © {new Date().getFullYear()} Prompt AI.
        </p>

        {/* 아이콘 버튼 그룹 */}
        <div className="flex space-x-3 mx-2">
          <Button
            onClick={() => window.open("mailto:ai.prompt.gene@gmail.com", "_blank")}
            variant="ghost"
            size="icon"
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => window.open("https://github.com/Prompt-AI-Pro", "_blank")}
            variant="ghost"
            size="icon"
          >
            <Github className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
