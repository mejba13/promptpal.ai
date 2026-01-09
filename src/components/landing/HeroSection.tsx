'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Zap,
  DollarSign,
  Globe,
  TrendingUp,
  Shield,
  Clock,
  BarChart3,
  Image,
  Users,
} from 'lucide-react';

const statsCards = [
  {
    icon: Zap,
    value: '12,500',
    label: 'Daily AI Tasks Automated',
    badge: '+42%',
    badgeColor: 'bg-mint-100 text-mint-700',
    description: 'AI optimization reducing manual workload',
  },
  {
    icon: DollarSign,
    value: '$480K',
    label: 'Cost Savings Generated',
    badge: null,
    badgeColor: '',
    description: 'AI optimization reducing expenses for clients',
  },
  {
    icon: Globe,
    value: '150K+',
    label: 'Global Users',
    badge: null,
    badgeColor: '',
    description: 'Across 40+ countries worldwide',
  },
  {
    icon: BarChart3,
    value: '98%',
    label: 'AI-Powered Accuracy',
    badge: null,
    badgeColor: '',
    description: 'Validated with real customer data',
  },
];

const bottomMetrics = [
  { icon: Shield, value: '500+', label: 'Companies Trust Us' },
  { icon: Clock, value: '99.9%', label: 'Uptime SLA' },
  { icon: TrendingUp, value: '50M+', label: 'Tasks Automated' },
  { icon: Users, value: '4.9/5', label: 'Customer Rating' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Premium layered background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 gradient-hero" />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.4) 1px, transparent 0)
            `,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-mint-200/20 rounded-full blur-[100px] animate-pulse-soft" />
        <div className="absolute bottom-40 left-1/4 w-[300px] h-[300px] bg-mint-100/25 rounded-full blur-[80px] animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        className="container-wide relative pt-28 pb-16 lg:pt-36 lg:pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Stats Cards - Top Row */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-16 lg:mb-20"
        >
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.25 }
              }}
              className="group relative"
            >
              <div className="relative surface-elevated rounded-2xl border border-white/60 p-5 lg:p-6 hover:shadow-soft-lg transition-all duration-300 overflow-hidden">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-mint-50/0 to-mint-100/0 group-hover:from-mint-50/40 group-hover:to-mint-100/20 transition-all duration-500" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-mint-100 to-mint-50 flex items-center justify-center group-hover:from-mint-200 group-hover:to-mint-100 transition-colors duration-300 shadow-sm">
                      <stat.icon className="w-5 h-5 text-mint-600" />
                    </div>
                    {stat.badge && (
                      <Badge className={`${stat.badgeColor} text-xs font-semibold px-2.5 py-0.5 border-0 shadow-sm`}>
                        {stat.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-1.5">
                    {stat.label}
                  </p>
                  <p className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Hero Content - Center */}
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <Badge
              variant="secondary"
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-white/80 text-mint-700 border border-mint-200/60 rounded-full shadow-soft hover:shadow-soft-lg transition-all"
            >
              <Sparkles className="w-4 h-4 mr-2 text-mint-500" />
              Your All-in-One AI Content Platform
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08]"
          >
            Supercharge Your
            <br />
            Content with{' '}
            <span className="relative inline-block">
              <span className="gradient-text">AI-Powered</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-mint-400 via-mint-500 to-emerald-500 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </span>
            <br />
            Creation
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mt-7 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Our AI SaaS platform helps teams create stunning images, videos, and content—without complexity. Smart prompts make everyone an AI expert.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="h-14 px-8 text-base font-semibold bg-mint-500 hover:bg-mint-600 text-white shadow-mint hover:shadow-mint-lg transition-all duration-300 rounded-xl group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base font-medium rounded-xl bg-white/70 border-border/60 hover:border-mint-300 hover:bg-white shadow-soft hover:shadow-soft-lg group"
            >
              <Play className="mr-2 w-5 h-5 text-mint-600 group-hover:scale-110 transition-transform" />
              Book a Demo
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {[
              'No credit card required',
              '20 free credits on signup',
              'Cancel anytime',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-mint-500 flex-shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Metrics Bar */}
        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <div className="surface-elevated-lg rounded-2xl border border-white/60 p-6 lg:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {bottomMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mint-100 to-mint-50 flex items-center justify-center group-hover:from-mint-200 group-hover:to-mint-100 transition-colors duration-300 shadow-sm">
                    <metric.icon className="w-5 h-5 text-mint-600" />
                  </div>
                  <div>
                    <p className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                      {metric.value}
                    </p>
                    <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest">
                      {metric.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f5fbf7] to-transparent pointer-events-none" />
    </section>
  );
}
