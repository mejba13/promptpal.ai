'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Zap,
  Image,
  Video,
  MessageSquare,
  LayoutDashboard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Product', href: '#features' },
  { name: 'Features', href: '#how-it-works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'About Us', href: '#about' },
];

const productDropdown = [
  {
    name: 'AI Image Generation',
    description: 'Create stunning visuals with smart prompts',
    href: '/features/images',
    icon: Image,
  },
  {
    name: 'Video & Reels',
    description: 'Generate engaging video content',
    href: '/features/video',
    icon: Video,
  },
  {
    name: 'Smart Prompts',
    description: 'AI-powered prompt suggestions',
    href: '/features/prompts',
    icon: MessageSquare,
  },
  {
    name: 'Dashboard',
    description: 'Manage all your content',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass border-b border-border/50 shadow-soft'
          : 'bg-transparent'
      )}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-mint"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">
              Prompt<span className="text-primary">Pal</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-sm font-medium">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-mint hover:shadow-mint-lg transition-all duration-300 group">
                Get Started
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="relative">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold">
                      Prompt<span className="text-primary">Pal</span>
                    </span>
                  </Link>
                </div>

                {/* Mobile Navigation */}
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-1 px-4">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium hover:bg-muted transition-colors"
                        >
                          {item.name}
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Product Features */}
                  <div className="mt-6 px-4">
                    <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Features
                    </p>
                    <div className="space-y-1">
                      {productDropdown.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-mint-100 flex items-center justify-center">
                              <item.icon className="w-5 h-5 text-mint-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="p-4 border-t space-y-3">
                  <Link href="/login" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90 shadow-mint">
                      Get Started Free
                      <Zap className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
