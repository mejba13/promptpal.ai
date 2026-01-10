'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Zap,
  Globe,
  Heart,
  Mail,
  MapPin,
  CheckCircle2,
  Shield,
  Star,
  Image as ImageIcon,
  Video,
  Wand2,
} from 'lucide-react';

// Social icons as SVG components
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const footerLinks = {
  product: [
    { name: 'Features Overview', href: '/features' },
    { name: 'Pricing Plans', href: '/pricing' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Security & Compliance', href: '/security' },
    { name: 'API Access', href: '/api' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers', badge: 'Hiring' },
    { name: 'Press & Media', href: '/press' },
    { name: 'Partners', href: '/partners' },
    { name: 'Contact', href: '/contact' },
  ],
};

const socialLinks = [
  { name: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com/promptpal' },
  { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com/company/promptpal' },
  { name: 'GitHub', icon: GithubIcon, href: 'https://github.com/promptpal' },
  { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com/promptpal' },
  { name: 'YouTube', icon: YoutubeIcon, href: 'https://youtube.com/@promptpal' },
];

// Premium Bento Card Component
function BentoCard({
  children,
  className = '',
  delay = 0,
  hover = true,
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  glow?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={hover ? { y: -4, scale: 1.01, transition: { duration: 0.25 } } : undefined}
      className={`relative group ${className}`}
    >
      {glow && (
        <motion.div
          className="absolute -inset-[2px] rounded-[28px] bg-gradient-to-r from-emerald-400 via-cyan-500 to-emerald-400 opacity-0 group-hover:opacity-50 blur-xl transition-all duration-700"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 200%' }}
        />
      )}
      <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-white/80 via-white/40 to-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full rounded-[24px] border border-slate-200/60 overflow-hidden shadow-lg shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-500 bg-white/80 backdrop-blur-xl">
        {children}
      </div>
    </motion.div>
  );
}

// Floating Element Component
function FloatingElement({ children, delay = 0, duration = 4, y = 10 }: { children: React.ReactNode; delay?: number; duration?: number; y?: number }) {
  return (
    <motion.div
      animate={{ y: [-y, y, -y] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
}

export function Footer() {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: '-100px' });

  return (
    <footer ref={ref} className="relative overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════
           PREMIUM BACKGROUND
      ═══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fdfb] via-[#f0fdf6] to-[#e8faf0]" />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-conic from-emerald-200/40 via-cyan-100/30 to-mint-200/40 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-conic from-mint-200/30 via-teal-100/20 to-emerald-200/30 blur-3xl"
        />
      </div>

      {/* Elegant grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #10b981 1px, transparent 1px),
            linear-gradient(to bottom, #10b981 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} duration={6} y={15}>
          <div className="absolute top-[20%] left-[5%] w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 opacity-50 blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={1} duration={5} y={12}>
          <div className="absolute top-[40%] right-[8%] w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 opacity-40 blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={2} duration={7} y={18}>
          <div className="absolute bottom-[30%] left-[12%] w-2 h-2 rounded-full bg-gradient-to-br from-mint-400 to-emerald-500 opacity-60" />
        </FloatingElement>
      </div>

      <div className="relative z-10">
        {/* ═══════════════════════════════════════════════════════════
             PREMIUM CTA SECTION
        ═══════════════════════════════════════════════════════════ */}
        <div className="container-wide pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            {/* Main CTA Card */}
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-1">
              {/* Animated border gradient */}
              <motion.div
                className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 opacity-50"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 200%' }}
              />

              <div className="relative rounded-[30px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 md:p-14 lg:p-16 overflow-hidden">
                {/* Background decorations */}
                <motion.div
                  className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl"
                  animate={{
                    background: [
                      'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
                    ],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute -bottom-32 -left-32 w-48 h-48 rounded-full blur-3xl"
                  animate={{
                    background: [
                      'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
                    ],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                      </motion.div>
                      <span className="text-sm font-medium text-white/90">
                        Join 150,000+ creators worldwide
                      </span>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
                    >
                      Ready to create
                      <br />
                      <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                        something amazing?
                      </span>
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-lg text-white/70 mb-8 max-w-md"
                    >
                      Transform your ideas into stunning visuals with AI-powered prompts. Start free, no credit card required.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="flex flex-wrap gap-4"
                    >
                      <Link href="/register">
                        <Button
                          size="lg"
                          className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white rounded-2xl shadow-xl shadow-emerald-500/30 group transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/40"
                        >
                          Get Started Free
                          <motion.div
                            className="ml-2"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </Button>
                      </Link>
                      <Link href="/demo">
                        <Button
                          size="lg"
                          variant="outline"
                          className="h-14 px-8 text-base font-semibold rounded-2xl border-2 border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                        >
                          Watch Demo
                        </Button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Right Content - Feature Grid */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {[
                      { icon: ImageIcon, label: 'Image Generation', value: '15+ Models' },
                      { icon: Video, label: 'Video Creation', value: 'HD Quality' },
                      { icon: Wand2, label: 'Smart Prompts', value: 'AI Enhanced' },
                      { icon: Zap, label: 'Fast Processing', value: '<5 Seconds' },
                    ].map((feature, i) => (
                      <motion.div
                        key={feature.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-3">
                          <feature.icon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <p className="text-sm text-white/60 mb-1">{feature.label}</p>
                        <p className="text-lg font-semibold text-white">{feature.value}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
             MAIN FOOTER CONTENT - BENTO GRID
        ═══════════════════════════════════════════════════════════ */}
        <div className="container-wide pb-16">
          <div className="grid grid-cols-12 gap-5">

            {/* Brand Card - Large */}
            <BentoCard delay={0.1} className="col-span-12 lg:col-span-4" glow>
              <div className="p-8 h-full">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 mb-6 group">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-emerald-500/30"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles className="w-7 h-7 text-white" />
                  </motion.div>
                  <span className="text-2xl font-bold tracking-tight text-slate-900">
                    Prompt<span className="text-emerald-600">Pal</span>
                  </span>
                </Link>

                <p className="text-slate-600 leading-relaxed mb-8">
                  Empowering creators with AI-powered content generation. Create stunning images, videos, and more with intelligent prompt assistance.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-2 mb-8">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-gradient-to-br hover:from-emerald-500 hover:to-cyan-500 flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-500/30"
                    >
                      <social.icon />
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="space-y-3 pt-6 border-t border-slate-100">
                  <a href="mailto:hello@promptpal.ai" className="flex items-center gap-3 text-sm text-slate-500 hover:text-slate-900 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <Mail className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span>hello@promptpal.ai</span>
                  </a>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Links Section */}
            <BentoCard delay={0.2} className="col-span-12 lg:col-span-5">
              <div className="p-8 h-full">
                <div className="grid grid-cols-3 gap-8">
                  {/* Product Links */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-5 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                      Product
                    </h4>
                    <ul className="space-y-3">
                      {footerLinks.product.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-sm text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1 group"
                          >
                            {link.name}
                            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources Links */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-5 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                      Resources
                    </h4>
                    <ul className="space-y-3">
                      {footerLinks.resources.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-sm text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1 group"
                          >
                            {link.name}
                            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Company Links */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-5 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                      Company
                    </h4>
                    <ul className="space-y-3">
                      {footerLinks.company.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-sm text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-2 group"
                          >
                            {link.name}
                            {'badge' in link && link.badge && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold">
                                {link.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Trust & Stats Card */}
            <BentoCard delay={0.3} className="col-span-12 lg:col-span-3">
              <div className="p-8 h-full relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-100 to-cyan-100 opacity-60 blur-2xl" />

                <div className="relative">
                  {/* Trust Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Shield className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <p className="font-bold text-slate-900">Enterprise Ready</p>
                      <p className="text-xs text-slate-500">SOC 2 Compliant</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-4">
                    {[
                      { icon: Globe, value: '150K+', label: 'Active Users' },
                      { icon: Zap, value: '10M+', label: 'Images Created' },
                      { icon: Star, value: '4.9/5', label: 'User Rating' },
                      { icon: CheckCircle2, value: '99.9%', label: 'Uptime SLA' },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                          <stat.icon className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-slate-900">{stat.value}</span>
                          <span className="text-xs text-slate-500">{stat.label}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Bottom Bar - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="col-span-12"
            >
              <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 px-8 py-5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                    <Link href="/terms" className="hover:text-slate-900 transition-colors">
                      Terms of Service
                    </Link>
                    <span className="w-1 h-1 rounded-full bg-slate-300 hidden md:block" />
                    <Link href="/privacy" className="hover:text-slate-900 transition-colors">
                      Privacy Policy
                    </Link>
                    <span className="w-1 h-1 rounded-full bg-slate-300 hidden md:block" />
                    <Link href="/cookies" className="hover:text-slate-900 transition-colors">
                      Cookies
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>&copy; {new Date().getFullYear()} PromptPal.</span>
                    <span className="hidden sm:inline">Made with</span>
                    <Heart className="w-4 h-4 text-red-500 fill-red-500 hidden sm:inline" />
                    <span className="hidden sm:inline">for creators</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
