'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  UserPlus,
  Wand2,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const steps = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Create Your Account',
    subtitle: 'Quick 2-minute setup',
    description:
      'Sign up free and get 20 credits to start. No credit card required. Connect your favorite tools instantly.',
    features: ['Free starter credits', 'No setup required', 'Instant access'],
    gradient: 'from-mint-500 to-emerald-500',
    bgGradient: 'from-mint-50 to-emerald-50',
  },
  {
    step: '02',
    icon: Wand2,
    title: 'Describe Your Vision',
    subtitle: 'AI-enhanced prompting',
    description:
      'Enter a basic idea and let our AI transform it into a detailed, optimized prompt for stunning results.',
    features: ['Smart suggestions', 'One-click enhance', 'Style presets'],
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
  {
    step: '03',
    icon: Rocket,
    title: 'Generate & Download',
    subtitle: 'Instant AI creation',
    description:
      'Watch your ideas come to life in seconds. Download high-resolution images and videos ready to use.',
    features: ['Multiple formats', 'High resolution', 'Commercial license'],
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group"
    >
      {/* Connector Line */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-24 left-full w-full h-px z-0">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
            className="h-full bg-gradient-to-r from-border via-mint-300 to-border origin-left"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.8 + index * 0.15 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-mint-400"
          />
        </div>
      )}

      <div className="relative">
        {/* Card */}
        <div className="relative surface-elevated rounded-3xl border border-white/60 p-8 hover:shadow-soft-lg transition-all duration-300 overflow-hidden">
          {/* Background gradient */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br ${step.bgGradient}`} />

          <div className="relative">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-5xl font-bold text-border/50 group-hover:text-mint-200 transition-colors">
                {step.step}
              </span>
            </div>

            {/* Content */}
            <p className="text-xs font-semibold uppercase tracking-wider text-mint-600 mb-2">
              {step.subtitle}
            </p>
            <h3 className="text-xl lg:text-2xl font-bold mb-3">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {step.description}
            </p>

            {/* Features */}
            <ul className="space-y-2.5">
              {step.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm">
                  <div className="w-5 h-5 rounded-full bg-mint-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-mint-600" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Premium layered background */}
      <div className="absolute inset-0">
        {/* Cream-tinted gradient for contrast with previous section */}
        <div className="absolute inset-0 bg-section-cream" />

        {/* Subtle diagonal pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(34, 197, 94, 0.3) 25%, transparent 25%),
              linear-gradient(225deg, rgba(34, 197, 94, 0.3) 25%, transparent 25%)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Floating glow orbs */}
      <div className="absolute top-20 left-0 w-[350px] h-[350px] bg-mint-100/25 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-0 w-[450px] h-[450px] bg-emerald-100/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-mint-50/15 rounded-full blur-[100px]" />

      <div className="container-wide relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <Badge
            variant="secondary"
            className="mb-4 px-3 py-1 text-xs font-medium bg-mint-100/80 text-mint-700 border border-mint-200/50"
          >
            Simple Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Start Creating in
            <span className="gradient-text"> Three Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From signup to stunning AI content in minutes. No technical knowledge required—just bring your ideas.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 mb-16 lg:mb-20">
          {steps.map((step, index) => (
            <StepCard key={step.step} step={step} index={index} />
          ))}
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative bg-gradient-to-br from-mint-500 via-mint-600 to-emerald-600 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '32px 32px',
                }}
              />
            </div>

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Ready to Start?
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                  Your First Creation Awaits
                </h3>
                <p className="text-white/80 text-lg max-w-xl">
                  Join 150,000+ creators already using PromptPal. Start free with 20 credits—no credit card needed.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-white/90 text-mint-700 h-13 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 px-8 rounded-xl border-white/30 bg-white/10 text-white hover:bg-white/20 font-medium"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
