import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section */}
      <div className="relative hidden w-1/2 p-8 lg:block">
        <div className="h-full w-full overflow-hidden rounded-[40px] bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300">
          <div className="flex h-full flex-col items-center justify-center px-8 text-center text-gray-800">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">Flowers&Saints</h1>
            </div>
            <h2 className="mb-6 text-4xl font-bold">Get Started with Us</h2>
            <p className="mb-12 text-lg">Complete these easy steps to register your account.</p>

            <div className="w-full max-w-sm space-y-4">
              <div className="rounded-lg bg-white/80 p-4 backdrop-blur-sm shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">1</span>
                  <span className="text-lg">Sign up your account</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/60 p-4 backdrop-blur-sm shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 text-white">
                    2
                  </span>
                  <span className="text-lg">Set up your workspace</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/60 p-4 backdrop-blur-sm shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 text-white">
                    3
                  </span>
                  <span className="text-lg">Set up your profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md rounded-[40px] bg-white p-12 shadow-lg">
          <div className="mx-auto max-w-sm">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">Sign Up Account</h2>
            <p className="mb-8 text-gray-600">Enter your personal data to create your account.</p>

            <form className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    className="h-12 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="First Name"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    className="h-12 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Last Name"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Input
                  className="h-12 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="example@flowersandsaints.com"
                  type="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Input
                  className="h-12 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your Best Password"
                  type="password"
                  required
                />
                <p className="text-sm text-gray-500">Must be at least 8 characters.</p>
              </div>

              <Button className="h-12 w-full bg-blue-500 text-white hover:bg-blue-600">
                Sign Up
              </Button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:text-blue-600 hover:underline">
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

