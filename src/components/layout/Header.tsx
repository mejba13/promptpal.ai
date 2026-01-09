'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Sparkles,
  Menu,
  ChevronRight,
  Zap,
  Image,
  Video,
  MessageSquare,
  LayoutDashboard,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'How it Works', href: '#how-it-works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Testimonials', href: '#testimonials' },
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-border/50 shadow-soft'
          : 'bg-transparent'
      )}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-mint-500 to-emerald-500 flex items-center justify-center shadow-mint"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">
              Prompt<span className="text-mint-600">Pal</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center bg-slate-100/80 rounded-full px-1 py-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white hover:shadow-soft"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-sm font-medium h-10 px-4 hover:bg-slate-100">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white h-10 px-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="relative h-10 w-10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-5 border-b">
                  <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mint-500 to-emerald-500 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold">
                      Prompt<span className="text-mint-600">Pal</span>
                    </span>
                  </Link>
                </div>

                {/* Mobile Navigation */}
                <div className="flex-1 overflow-y-auto py-6">
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
                          className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium hover:bg-slate-100 transition-colors"
                        >
                          {item.name}
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Product Features */}
                  <div className="mt-8 px-4">
                    <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
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
                            className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-slate-100 transition-colors"
                          >
                            <div className="w-11 h-11 rounded-xl bg-mint-100 flex items-center justify-center">
                              <item.icon className="w-5 h-5 text-mint-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="p-5 border-t space-y-3 bg-slate-50">
                  <Link href="/login" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full h-12 rounded-xl font-medium">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium">
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
