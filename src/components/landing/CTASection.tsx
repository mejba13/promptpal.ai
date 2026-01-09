'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Image,
  Wand2,
} from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Premium layered background */}
      <div className="absolute inset-0">
        {/* White to mint gradient */}
        <div className="absolute inset-0 bg-section-white" />

        {/* Radial glow from center */}
        <div className="absolute inset-0 bg-gradient-radial from-mint-50/40 via-transparent to-transparent" style={{ backgroundPosition: 'center 60%', backgroundSize: '100% 150%' }} />
      </div>

      {/* Floating glow orbs */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-mint-100/20 rounded-full blur-[100px]" />
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-emerald-50/25 rounded-full blur-[90px]" />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Main CTA Card */}
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-mint-500/20 rounded-full blur-[128px]" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-mint-400/10 rounded-full blur-[96px]" />
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `
                    linear-gradient(white 1px, transparent 1px),
                    linear-gradient(90deg, white 1px, transparent 1px)
                  `,
                  backgroundSize: '60px 60px',
                }}
              />
            </div>

            <div className="relative px-8 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Content */}
                <div className="text-center lg:text-left">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="inline-flex items-center gap-2 bg-mint-500/20 text-mint-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                  >
                    <Sparkles className="w-4 h-4" />
                    Start Creating Today
                  </motion.div>

                  {/* Headline */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight"
                  >
                    Ready to Transform Your{' '}
                    <span className="bg-gradient-to-r from-mint-400 to-emerald-400 bg-clip-text text-transparent">
                      Creative Workflow?
                    </span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-lg text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0"
                  >
                    Join 150,000+ creators using PromptPal to generate stunning AI content. Get 20 free credits to start.
                  </motion.p>

                  {/* Email Form */}
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 mb-6"
                  >
                    <Input
                      type="email"
                      placeholder="Enter your work email"
                      className="h-13 bg-white/10 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/15 focus:border-mint-500/50 rounded-xl"
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="h-13 bg-mint-500 hover:bg-mint-600 text-white font-semibold shrink-0 rounded-xl shadow-mint px-8"
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.form>

                  {/* Trust indicators */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-slate-400"
                  >
                    {['No credit card required', '20 free credits', 'Cancel anytime'].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-mint-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Right Content - Floating Cards */}
                <div className="hidden lg:block relative">
                  <div className="relative h-[400px]">
                    {/* Main Dashboard Preview Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 30, rotate: 3 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="absolute top-0 left-0 right-12"
                    >
                      <div className="bg-white rounded-2xl shadow-2xl p-6 border border-border/50">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-amber-400" />
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 mb-4">
                          <p className="text-xs text-muted-foreground mb-2">Your prompt</p>
                          <p className="text-sm font-medium">"A majestic mountain landscape at sunset..."</p>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="aspect-square bg-gradient-to-br from-mint-100 to-mint-200 rounded-xl flex items-center justify-center">
                              <Image className="w-6 h-6 text-mint-500" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Stats Card */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="absolute right-0 top-1/3"
                    >
                      <div className="bg-white rounded-2xl shadow-xl p-4 w-48 border border-border/50">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-mint-100 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-mint-600" />
                          </div>
                          <span className="text-xs font-medium">This Month</span>
                        </div>
                        <p className="text-2xl font-bold text-mint-600">247</p>
                        <p className="text-xs text-muted-foreground">Images Generated</p>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="w-3/4 h-full bg-mint-500 rounded-full" />
                          </div>
                          <span className="text-xs text-mint-600 font-medium">75%</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Generation Status Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="absolute bottom-0 left-8"
                    >
                      <div className="bg-white rounded-2xl shadow-xl p-4 w-56 border border-border/50">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Wand2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">AI Enhanced</p>
                            <p className="text-xs text-muted-foreground">Prompt optimized</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: '100%' }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 1 }}
                              className="h-full bg-gradient-to-r from-mint-500 to-emerald-500 rounded-full"
                            />
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-mint-500" />
                        </div>
                      </div>
                    </motion.div>
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
