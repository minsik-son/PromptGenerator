'use client';

export function Hero() {

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-indigo-100 dark:from-purple-950 dark:to-indigo-950" />
      <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-15 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-4xl font-bold tracking-tight sm:text-4xl">
              Create Prompts with AI
          </h3>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Generate prompts for your favorite AI models
          </p>
        </div>
      </div>
    </div>
  )
}

