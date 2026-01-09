import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-mint">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Prompt<span className="text-primary">Pal</span>
            </span>
          </Link>
          {children}
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-mint-500 via-mint-600 to-mint-700">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 32V0h32"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center p-12 text-white">
          <div className="max-w-md text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Create stunning content with AI
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join thousands of creators using smart prompts to generate
              professional images, videos, and more.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div>
                <p className="text-2xl font-bold">150K+</p>
                <p className="text-white/70">Active Users</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-2xl font-bold">10M+</p>
                <p className="text-white/70">Generations</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-2xl font-bold">4.9</p>
                <p className="text-white/70">User Rating</p>
              </div>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="absolute bottom-12 left-12 bg-white/10 backdrop-blur rounded-xl p-4 max-w-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium">
                SA
              </div>
              <div>
                <p className="text-sm font-medium">Sarah Anderson</p>
                <p className="text-xs text-white/70">Marketing Director</p>
              </div>
            </div>
            <p className="text-sm text-white/90">
              "PromptPal transformed our content workflow. What took hours now takes minutes."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
