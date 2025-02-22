'use client';

import { useState } from 'react';

export function Hero() {
  const [activeTab, setActiveTab] = useState('song');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-indigo-100 dark:from-purple-950 dark:to-indigo-950" />
      <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Create Suno Prompts with AI
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Transform your ideas into beautiful songs with our AI-powered Suno Prompts generator
          </p>
        </div>
      </div>
    </div>
  )
}

