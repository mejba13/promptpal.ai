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
  TrendingUp,
  Users,
  Zap,
  Star,
  DollarSign,
  BarChart3,
  Globe,
} from 'lucide-react';

const stats = [
  {
    icon: Zap,
    label: 'Daily AI Tasks Automated',
    value: '12,500',
    change: '+42%',
    description: 'AI optimization reducing expenses for clients',
  },
  {
    icon: DollarSign,
    label: 'Cost Savings Generated',
    value: '$480,000',
    description: 'AI optimization reducing expenses for clients',
  },
  {
    icon: Globe,
    label: 'Global Users',
    value: '150K+',
    sublabel: 'Across 40+ countries',
  },
  {
    icon: BarChart3,
    label: 'AI-Powered Predictions',
    value: '98%',
    description: 'Validated with real customer data',
  },
];

const trustBadges = [
  { label: '500+', sublabel: 'Companies Trust Us' },
  { label: '99.9%', sublabel: 'Uptime SLA' },
  { label: '50M+', sublabel: 'Tasks Automated' },
  { label: '4.9', sublabel: 'Companies Trust Us', icon: Star },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden gradient-hero">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-mint-100/50 to-transparent blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-mint-50/50 to-transparent blur-3xl"
        />
      </div>

      <div className="container-wide relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="secondary"
              className="px-4 py-1.5 text-sm font-medium bg-mint-100 text-mint-700 border-mint-200 hover:bg-mint-100"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Your All-in-One AI Content Platform
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
          >
            Supercharge Your Content with{' '}
            <span className="gradient-text">AI-Powered</span> Creation
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
          >
            Our AI SaaS platform helps teams create stunning images, videos, and content—
            without complexity. Smart prompts make everyone an AI expert.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-mint hover:shadow-mint-lg transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base group"
            >
              <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              Book a Demo
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-mint-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-mint-500" />
              <span>20 free credits on signup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-mint-500" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 lg:mt-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl border border-border/50 p-6 shadow-soft card-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-mint-100 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-mint-600" />
                    </div>
                    {stat.change && (
                      <Badge
                        variant="secondary"
                        className="bg-mint-100 text-mint-700 text-xs"
                      >
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                  {stat.sublabel && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.sublabel}
                    </p>
                  )}
                  {stat.description && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {stat.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges Row */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.sublabel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                  {badge.label}
                  {badge.icon && <badge.icon className="w-5 h-5 text-amber-400 fill-amber-400" />}
                </div>
                <p className="text-sm text-muted-foreground">{badge.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
