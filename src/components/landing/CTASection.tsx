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
} from 'lucide-react';

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-mint-500 via-mint-600 to-mint-700"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute -right-20 -top-20 w-96 h-96 text-white/10"
              viewBox="0 0 400 400"
              fill="none"
            >
              <circle cx="200" cy="200" r="200" fill="currentColor" />
            </svg>
            <svg
              className="absolute -left-10 -bottom-10 w-64 h-64 text-white/10"
              viewBox="0 0 400 400"
              fill="none"
            >
              <circle cx="200" cy="200" r="200" fill="currentColor" />
            </svg>
          </div>

          <div className="relative px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-6"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              {/* Headline */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Automate Your Sales Analysis with AI
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Automate, monetize & launch an advanced workflow on PromptPal.
                Start creating stunning AI content today.
              </p>

              {/* Email Form */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 bg-white text-mint-700 hover:bg-white/90 font-semibold shrink-0"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>20 free credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Status Tracker Card (floating) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-4 w-64">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-sm">Status Tracker</span>
                  <span className="text-xs text-mint-600 font-medium">See All</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-mint-100 flex items-center justify-center text-xs font-medium text-mint-700">
                      TK
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Tahsan Kina</p>
                      <p className="text-xs text-muted-foreground">UI Designer</p>
                    </div>
                    <span className="text-xs text-mint-600 font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium text-purple-700">
                      KM
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Keliana Mery</p>
                      <p className="text-xs text-muted-foreground">Developer</p>
                    </div>
                    <span className="text-xs text-muted-foreground">03m</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
