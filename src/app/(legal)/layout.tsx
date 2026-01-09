import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container-wide h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-mint">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Prompt<span className="text-primary">Pal</span>
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container-wide py-12 md:py-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container-wide text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} PromptPal. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
