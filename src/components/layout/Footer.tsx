'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sparkles,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Youtube,
  Send,
} from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Features Overview', href: '/features' },
    { name: 'Pricing Plans', href: '/pricing' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Security & Compliance', href: '/security' },
    { name: 'Product Updates', href: '/changelog' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Help Center', href: '/help' },
    { name: 'API Documentation', href: '/docs' },
    { name: 'Community Forum', href: '/community' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press & Media', href: '/press' },
    { name: 'Partners', href: '/partners' },
    { name: 'Contact', href: '/contact' },
  ],
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/promptpal' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/promptpal' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/promptpal' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/promptpal' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@promptpal' },
];

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      {/* Main Footer */}
      <div className="container-wide section-padding">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-mint">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Prompt<span className="text-primary">Pal</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Empowering creators with AI-powered content generation. Create stunning images, videos, and more with intelligent prompt assistance.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h4 className="font-semibold text-sm mb-4">Newsletter Section</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates and tips delivered to your inbox.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pr-12 bg-background"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms & Condition
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PromptPal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
