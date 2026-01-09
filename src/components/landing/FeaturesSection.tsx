'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  Image,
  Video,
  History,
  CreditCard,
  Wand2,
  Zap,
  ArrowRight,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const mainFeatures = [
  {
    icon: Sparkles,
    title: 'Smart Prompt Engine',
    subtitle: 'AI-Powered Suggestions',
    description:
      'Our AI analyzes your intent and suggests optimized prompts that generate better results every time. No prompt engineering skills required.',
    benefits: ['Context-aware suggestions', 'Style optimization', 'Quality scoring'],
    color: 'from-mint-500 to-emerald-500',
  },
  {
    icon: Image,
    title: 'Multi-Model Generation',
    subtitle: 'Access 15+ AI Models',
    description:
      'Access SDXL, Flux, DALL-E 3, Stable Diffusion 3, and more through one unified interface. The best model for every use case.',
    benefits: ['Automatic model selection', 'Batch processing', 'A/B comparison'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Video,
    title: 'Video & Animation',
    subtitle: 'Create Engaging Content',
    description:
      'Generate engaging short-form videos, animated content, and social media reels with AnimateDiff and Stable Video Diffusion.',
    benefits: ['4K video output', 'Custom animations', 'Social media formats'],
    color: 'from-purple-500 to-pink-500',
  },
];

const quickFeatures = [
  {
    icon: Wand2,
    title: 'One-Click Enhancement',
    description: 'Transform basic prompts into detailed, professional-grade descriptions instantly.',
  },
  {
    icon: History,
    title: 'Version History',
    description: 'Track versions, compare results, and build your personal prompt library.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Credits',
    description: 'Pay only for what you use with transparent, predictable pricing.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
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
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Premium layered background */}
      <div className="absolute inset-0">
        {/* Soft green-tinted gradient */}
        <div className="absolute inset-0 bg-section-mint" />

        {/* Subtle pattern texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.5) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Floating glow orbs */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-mint-100/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-mint-50/30 rounded-full blur-[100px]" />
      </div>

      {/* Top separator line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mint-200/40 to-transparent" />

      <div className="container-wide relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <Badge
            variant="secondary"
            className="mb-4 px-3 py-1 text-xs font-medium bg-mint-100/80 text-mint-700 border border-mint-200/50"
          >
            Powerful Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Everything You Need to
            <span className="block gradient-text">Create at Scale</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            AI-powered features designed to adapt to your unique workflows and help you create stunning content faster than ever.
          </p>
        </motion.div>

        {/* Main Features - Alternating Layout */}
        <div className="space-y-16 lg:space-y-24 mb-20 lg:mb-28">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                <p className="text-sm font-medium text-mint-600 uppercase tracking-wider mb-2">
                  {feature.subtitle}
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Benefits list */}
                <ul className="space-y-3 mb-8">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-mint-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-mint-600" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="outline"
                  className="group hover:bg-mint-50 hover:border-mint-300 transition-all"
                >
                  Learn More
                  <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>

              {/* Visual Card */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative surface-elevated rounded-3xl border border-white/60 p-8 overflow-hidden"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${feature.color}`} />

                  {/* Mock UI content */}
                  <div className="relative">
                    {index === 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-amber-400" />
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 border border-border/50">
                          <p className="text-sm text-muted-foreground mb-3">Your prompt:</p>
                          <p className="text-sm font-medium">"A serene mountain landscape"</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-mint-500" />
                          <span className="text-xs font-medium text-mint-600">AI Suggestion</span>
                        </div>
                        <div className="bg-mint-50 rounded-xl p-4 border border-mint-200/50">
                          <p className="text-sm">"A serene mountain landscape at golden hour, snow-capped peaks reflecting in crystal clear alpine lake, cinematic composition, 8K quality"</p>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Badge className="bg-mint-100 text-mint-700 text-xs">+Quality</Badge>
                          <Badge className="bg-blue-100 text-blue-700 text-xs">+Lighting</Badge>
                          <Badge className="bg-purple-100 text-purple-700 text-xs">+Detail</Badge>
                        </div>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="space-y-4">
                        <p className="text-sm font-medium mb-4">Select Model</p>
                        <div className="grid grid-cols-2 gap-3">
                          {['SDXL 1.0', 'Flux.1', 'DALL-E 3', 'SD 3'].map((model, i) => (
                            <div
                              key={model}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                i === 0
                                  ? 'border-mint-500 bg-mint-50'
                                  : 'border-border/50 hover:border-mint-300'
                              }`}
                            >
                              <p className="text-sm font-medium">{model}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {i === 0 ? 'Recommended' : 'Available'}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Batch size:</span>
                          <div className="flex items-center gap-2">
                            {[1, 2, 4].map((n) => (
                              <button
                                key={n}
                                className={`w-8 h-8 rounded-lg text-sm font-medium ${
                                  n === 4 ? 'bg-mint-500 text-white' : 'bg-slate-100'
                                }`}
                              >
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {index === 2 && (
                      <div className="space-y-4">
                        <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 flex items-end">
                            <div className="w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                          <Video className="w-12 h-12 text-purple-500" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <span className="text-xs font-medium bg-white/90 px-2 py-1 rounded">0:00 / 0:15</span>
                            <Badge className="bg-red-500 text-white text-xs">4K</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {['9:16', '16:9', '1:1', '4:5'].map((ratio, i) => (
                            <button
                              key={ratio}
                              className={`flex-1 py-2 rounded-lg text-xs font-medium ${
                                i === 1 ? 'bg-purple-500 text-white' : 'bg-slate-100'
                              }`}
                            >
                              {ratio}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {quickFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="h-full surface-elevated rounded-2xl border border-white/60 p-6 hover:shadow-soft-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-mint-100 flex items-center justify-center mb-4 group-hover:bg-mint-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-mint-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-20 lg:mt-24"
        >
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-mint-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-mint-400/10 rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-mint-500/20 text-mint-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Zap className="w-4 h-4" />
                  Start Creating Today
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Ready to Transform Your Workflow?
                </h3>
                <p className="text-slate-400 max-w-lg">
                  Join thousands of creators using PromptPal to generate stunning AI content. Start with 20 free credits.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-mint-500 hover:bg-mint-600 text-white h-12 px-8 rounded-xl">
                    Get Started Free
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 rounded-xl border-slate-600 text-white hover:bg-slate-800"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
