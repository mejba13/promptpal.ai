'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  Image,
  Video,
  MessageSquare,
  History,
  CreditCard,
  Wand2,
  Layers,
  Share2,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const features = [
  {
    icon: Sparkles,
    title: 'Smart Prompt Suggestions',
    description:
      'AI analyzes your intent and suggests optimized prompts that generate better results every time.',
    color: 'mint',
  },
  {
    icon: Image,
    title: 'Multi-Model Image Generation',
    description:
      'Access SDXL, Flux, DALL-E 3, and more through one simple interface. Best model for every use case.',
    color: 'mint',
  },
  {
    icon: Video,
    title: 'Video & Reel Creation',
    description:
      'Generate engaging short-form videos and animated content perfect for social media.',
    color: 'mint',
  },
  {
    icon: Wand2,
    title: 'One-Click Enhancement',
    description:
      'Transform basic prompts into detailed, professional-grade descriptions with GPT-4 optimization.',
    color: 'mint',
  },
  {
    icon: History,
    title: 'Prompt History & Tracking',
    description:
      'Never lose a great prompt. Track versions, compare results, and build your personal library.',
    color: 'mint',
  },
  {
    icon: CreditCard,
    title: 'Flexible Credit System',
    description:
      'Pay only for what you use. Start free, scale as you grow with transparent pricing.',
    color: 'mint',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
    },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            One Platform. Endless Possibilities.
          </h2>
          <p className="text-lg text-muted-foreground">
            AI-powered features designed to adapt to your unique workflows.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="h-full bg-white rounded-2xl border border-border/50 p-6 shadow-soft card-hover">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-mint-100 flex items-center justify-center mb-4 group-hover:bg-mint-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-mint-600" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-4 flex items-center text-sm font-medium text-mint-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 lg:mt-24"
        >
          <div className="relative bg-gradient-to-br from-mint-50 to-mint-100/50 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
              <svg
                className="w-full h-full"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="0.5" className="text-mint-500" />
                <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="0.5" className="text-mint-500" />
                <circle cx="200" cy="200" r="50" stroke="currentColor" strokeWidth="0.5" className="text-mint-500" />
              </svg>
            </div>

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-12 h-12 rounded-xl bg-mint-500 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Automated Task Management
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Eliminate manual work with intelligent automation. Save time on routine tasks
                  so your team can focus on innovation and growth.
                </p>
                <Link href="/features/automation">
                  <Button className="bg-mint-600 hover:bg-mint-700 text-white">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Mock Dashboard Card */}
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-soft-lg p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Sales Analysis</span>
                    <span className="text-xs text-muted-foreground">July 2024</span>
                  </div>
                  <div className="text-3xl font-bold mb-2">$480,000</div>

                  {/* Mini Chart */}
                  <div className="h-24 flex items-end gap-2 mt-4">
                    {[40, 65, 45, 80, 55, 70, 85].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex-1 bg-gradient-to-t from-mint-500 to-mint-400 rounded-t-sm"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
