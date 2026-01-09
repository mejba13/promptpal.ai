'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Check,
  Sparkles,
  Zap,
  Building2,
  ArrowRight,
  Crown,
  Shield,
  Clock,
  Headphones,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Starter',
    price: '$5',
    period: 'one-time',
    description: 'Perfect for trying out PromptPal',
    credits: '20 credits',
    pricePerCredit: '$0.25 per credit',
    icon: Sparkles,
    gradient: 'from-slate-500 to-slate-600',
    features: [
      '20 AI generation credits',
      'All standard AI models',
      'Standard quality outputs',
      'Prompt history & favorites',
      'Community support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$10',
    period: 'one-time',
    description: 'Best value for regular creators',
    credits: '50 credits',
    pricePerCredit: '$0.20 per credit',
    savings: 'Save 20%',
    icon: Zap,
    gradient: 'from-mint-500 to-emerald-500',
    popular: true,
    features: [
      '50 AI generation credits',
      'All AI models + HD quality',
      'Smart prompt suggestions',
      'Priority generation queue',
      'Email support',
    ],
    cta: 'Buy Credits',
  },
  {
    name: 'Professional',
    price: '$15',
    period: 'one-time',
    description: 'For power users and agencies',
    credits: '100 credits',
    pricePerCredit: '$0.15 per credit',
    savings: 'Save 40%',
    icon: Crown,
    gradient: 'from-purple-500 to-pink-500',
    features: [
      '100 AI generation credits',
      'All AI models + 4K quality',
      'Advanced prompt enhancement',
      'Batch generation',
      'Priority support',
    ],
    cta: 'Buy Credits',
    popular: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'volume pricing',
    description: 'For teams with high-volume needs',
    credits: 'Unlimited',
    pricePerCredit: 'Volume discount',
    icon: Building2,
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      'Custom credit packages',
      'Dedicated account manager',
      'Full API access',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const guarantees = [
  { icon: Shield, label: '14-day money back' },
  { icon: Clock, label: 'Credits never expire' },
  { icon: Headphones, label: 'Priority support' },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Premium layered background */}
      <div className="absolute inset-0">
        {/* Light section with subtle mint tint */}
        <div className="absolute inset-0 bg-section-light" />

        {/* Cross-hatch subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(34, 197, 94, 0.4) 1px, transparent 1px),
              linear-gradient(rgba(34, 197, 94, 0.4) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Floating glow orbs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-mint-100/15 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-50/20 rounded-full blur-[120px]" />

      {/* Top separator */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mint-200/30 to-transparent" />

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
            Simple Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Pay Only for What You
            <span className="gradient-text"> Create</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Flexible credit packages with no subscriptions. Buy once, use anytime. The more credits you buy, the more you save.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 max-w-7xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={cn(
                'relative rounded-3xl overflow-hidden transition-all duration-300',
                plan.popular
                  ? 'bg-gradient-to-b from-mint-500 via-mint-600 to-emerald-600 shadow-mint-lg lg:scale-105 z-10'
                  : 'surface-elevated border border-white/60 hover:shadow-soft-lg'
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 flex justify-center">
                  <Badge className="rounded-none rounded-b-xl bg-white text-mint-700 border-0 px-4 py-1 font-semibold shadow-lg">
                    Most Popular
                  </Badge>
                </div>
              )}

              {/* Savings Badge */}
              {plan.savings && !plan.popular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-mint-100 text-mint-700 border-0 text-xs font-medium">
                    {plan.savings}
                  </Badge>
                </div>
              )}

              <div className={cn('p-6 lg:p-8', plan.popular && 'pt-10')}>
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-2xl flex items-center justify-center',
                      plan.popular
                        ? 'bg-white/20'
                        : `bg-gradient-to-br ${plan.gradient}`
                    )}
                  >
                    <plan.icon
                      className={cn(
                        'w-6 h-6',
                        plan.popular ? 'text-white' : 'text-white'
                      )}
                    />
                  </div>
                  <div>
                    <h3 className={cn('font-bold text-lg', plan.popular && 'text-white')}>
                      {plan.name}
                    </h3>
                    <p className={cn('text-xs', plan.popular ? 'text-white/70' : 'text-muted-foreground')}>
                      {plan.description}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className={cn('text-4xl lg:text-5xl font-bold tracking-tight', plan.popular && 'text-white')}>
                      {plan.price}
                    </span>
                    <span className={cn('text-sm', plan.popular ? 'text-white/60' : 'text-muted-foreground')}>
                      {plan.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={cn('text-sm font-medium', plan.popular ? 'text-white/90' : 'text-foreground')}>
                      {plan.credits}
                    </span>
                    <span className={cn('text-xs', plan.popular ? 'text-white/60' : 'text-muted-foreground')}>
                      • {plan.pricePerCredit}
                    </span>
                  </div>
                  {plan.savings && plan.popular && (
                    <Badge className="mt-2 bg-white/20 text-white border-0 text-xs">
                      {plan.savings}
                    </Badge>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                        plan.popular ? 'bg-white/20' : 'bg-mint-100'
                      )}>
                        <Check className={cn('w-3 h-3', plan.popular ? 'text-white' : 'text-mint-600')} />
                      </div>
                      <span className={cn('text-sm', plan.popular ? 'text-white/90' : 'text-muted-foreground')}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={plan.name === 'Enterprise' ? '/contact' : `/register?plan=${plan.name.toLowerCase()}`}>
                  <Button
                    className={cn(
                      'w-full h-12 rounded-xl font-semibold transition-all',
                      plan.popular
                        ? 'bg-white hover:bg-white/90 text-mint-700 shadow-lg hover:shadow-xl'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 lg:gap-12"
        >
          {guarantees.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <div className="w-8 h-8 rounded-lg bg-mint-100 flex items-center justify-center">
                <item.icon className="w-4 h-4 text-mint-600" />
              </div>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Start with 20 free credits when you sign up.{' '}
            <Link href="/pricing" className="text-mint-600 hover:text-mint-700 font-medium hover:underline">
              View full comparison →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
