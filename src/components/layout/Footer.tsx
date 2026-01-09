'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sparkles,
  Send,
  ArrowUpRight,
  Zap,
  Globe,
  Heart,
  Mail,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

// Social icons as SVG components (lucide deprecated some brand icons)
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
    { name: 'Features Overview', href: '/features', highlight: true },
    { name: 'Pricing Plans', href: '/pricing' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Security & Compliance', href: '/security' },
    { name: 'Product Updates', href: '/changelog' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Case Studies', href: '/case-studies', highlight: true },
    { name: 'Help Center', href: '/help' },
    { name: 'API Documentation', href: '/docs' },
    { name: 'Community Forum', href: '/community' },
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
  { name: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com/promptpal', color: 'hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]' },
  { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com/company/promptpal', color: 'hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]' },
  { name: 'GitHub', icon: GithubIcon, href: 'https://github.com/promptpal', color: 'hover:bg-foreground/10 hover:text-foreground' },
  { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com/promptpal', color: 'hover:bg-[#E4405F]/10 hover:text-[#E4405F]' },
  { name: 'YouTube', icon: YoutubeIcon, href: 'https://youtube.com/@promptpal', color: 'hover:bg-[#FF0000]/10 hover:text-[#FF0000]' },
];

const stats = [
  { value: '50K+', label: 'Active Users', icon: Globe },
  { value: '1M+', label: 'Prompts Created', icon: Zap },
  { value: '99.9%', label: 'Uptime', icon: CheckCircle2 },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer ref={ref} className="relative overflow-hidden">
      {/* Premium Background with Animated Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-muted/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(74,222,128,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_0%_100%,rgba(134,239,172,0.08),transparent)]" />

      {/* Animated Floating Orbs */}
      <motion.div
        className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-mint-400/20 to-mint-600/10 blur-3xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-40 right-[15%] w-48 h-48 rounded-full bg-gradient-to-br from-mint-300/15 to-mint-500/10 blur-3xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10">
        {/* CTA Section - Premium Bento Card */}
        <motion.div
          className="container-wide py-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            variants={scaleVariants}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-mint-500 via-mint-600 to-mint-700 p-1"
          >
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />

            <div className="relative rounded-[22px] bg-gradient-to-br from-mint-600/90 via-mint-600 to-mint-700 backdrop-blur-xl p-8 md:p-12 lg:p-16">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-mint-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium mb-4">
                      <Sparkles className="w-4 h-4" />
                      Join 50,000+ creators
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                      Start Creating<br />
                      <span className="text-mint-200">Stunning Content</span>
                    </h2>
                    <p className="text-white/80 text-lg max-w-md">
                      Transform your ideas into reality with AI-powered prompts. No credit card required.
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/signup" className="flex-1">
                    <Button
                      size="lg"
                      className="w-full h-14 bg-white text-mint-700 hover:bg-white/90 font-semibold text-base shadow-xl shadow-mint-900/20 hover:shadow-2xl hover:shadow-mint-900/30 transition-all duration-300 group"
                    >
                      Get Started Free
                      <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 border-2 border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/50 font-semibold text-base backdrop-blur-sm transition-all duration-300"
                    >
                      Watch Demo
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section - Floating Cards */}
        <motion.div
          className="container-wide pb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-mint-500/20 to-mint-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glass rounded-2xl p-4 md:p-6 border border-border/50 hover:border-mint-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-lg shadow-mint-500/20">
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Footer - Bento Grid */}
        <div className="border-t border-border/50">
          <motion.div
            className="container-wide py-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Brand Column - Large Bento */}
              <motion.div variants={itemVariants} className="lg:col-span-4">
                <div className="glass rounded-2xl p-6 border border-border/50 h-full">
                  <Link href="/" className="flex items-center gap-3 mb-6 group">
                    <motion.div
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-lg shadow-mint-500/30"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>
                    <span className="text-2xl font-bold tracking-tight">
                      Prompt<span className="text-primary">Pal</span>
                    </span>
                  </Link>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Empowering creators with AI-powered content generation. Create stunning images, videos, and more with intelligent prompt assistance.
                  </p>

                  {/* Social Links - Premium Style */}
                  <div className="flex items-center gap-2">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground transition-all duration-300 ${social.color}`}
                      >
                        <social.icon />
                        <span className="sr-only">{social.name}</span>
                      </motion.a>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                    <a href="mailto:hello@promptpal.ai" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                      <Mail className="w-4 h-4 text-mint-500" />
                      <span>hello@promptpal.ai</span>
                    </a>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-mint-500" />
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Links Grid - 3 Columns */}
              <motion.div variants={itemVariants} className="lg:col-span-5">
                <div className="glass rounded-2xl p-6 border border-border/50 h-full">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Product Links */}
                    <div>
                      <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-mint-500" />
                        Product
                      </h4>
                      <ul className="space-y-2.5">
                        {footerLinks.product.map((link) => (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              className={`text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group ${link.highlight ? 'text-mint-600 font-medium' : ''}`}
                            >
                              {link.name}
                              {link.highlight && (
                                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                      <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-mint-500" />
                        Resources
                      </h4>
                      <ul className="space-y-2.5">
                        {footerLinks.resources.map((link) => (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              className={`text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group ${link.highlight ? 'text-mint-600 font-medium' : ''}`}
                            >
                              {link.name}
                              {link.highlight && (
                                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                      <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-mint-500" />
                        Company
                      </h4>
                      <ul className="space-y-2.5">
                        {footerLinks.company.map((link) => (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                            >
                              {link.name}
                              {'badge' in link && link.badge && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-mint-500/10 text-mint-600 font-medium">
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
              </motion.div>

              {/* Newsletter - Featured Bento */}
              <motion.div variants={itemVariants} className="lg:col-span-3">
                <div className="relative overflow-hidden rounded-2xl p-6 h-full bg-gradient-to-br from-mint-50 to-mint-100/50 dark:from-mint-950/30 dark:to-mint-900/20 border border-mint-200/50 dark:border-mint-800/30">
                  {/* Decorative Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-mint-300/30 to-transparent rounded-full blur-2xl" />

                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center mb-4 shadow-lg shadow-mint-500/20">
                      <Mail className="w-5 h-5 text-white" />
                    </div>

                    <h4 className="font-semibold text-base mb-2">Stay Updated</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get the latest AI tips, prompts, and product updates.
                    </p>

                    <form onSubmit={handleSubscribe} className="space-y-3">
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pr-12 bg-background/80 border-border/50 focus:border-mint-500 focus:ring-mint-500/20"
                        />
                        <Button
                          type="submit"
                          size="icon"
                          disabled={isSubscribed}
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-gradient-to-r from-mint-500 to-mint-600 hover:from-mint-600 hover:to-mint-700 shadow-lg shadow-mint-500/20"
                        >
                          {isSubscribed ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                          <span className="sr-only">Subscribe</span>
                        </Button>
                      </div>

                      {isSubscribed && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-mint-600 font-medium"
                        >
                          Thanks for subscribing!
                        </motion.p>
                      )}
                    </form>

                    <p className="text-xs text-muted-foreground mt-3">
                      No spam, unsubscribe anytime.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar - Premium */}
        <div className="border-t border-border/50 bg-muted/30 backdrop-blur-sm">
          <div className="container-wide py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.div
                className="flex items-center gap-6 text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Link href="/terms" className="hover:text-foreground transition-colors hover:underline underline-offset-4">
                  Terms of Service
                </Link>
                <span className="w-1 h-1 rounded-full bg-border" />
                <Link href="/privacy" className="hover:text-foreground transition-colors hover:underline underline-offset-4">
                  Privacy Policy
                </Link>
                <span className="w-1 h-1 rounded-full bg-border" />
                <Link href="/cookies" className="hover:text-foreground transition-colors hover:underline underline-offset-4">
                  Cookies
                </Link>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <span>&copy; {new Date().getFullYear()} PromptPal.</span>
                <span className="hidden sm:inline">Made with</span>
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 hidden sm:inline" />
                <span className="hidden sm:inline">for creators</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
