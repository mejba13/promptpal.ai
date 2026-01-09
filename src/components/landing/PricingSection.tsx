'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Check,
  Sparkles,
  Zap,
  Building2,
  ArrowRight,
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
    pricePerCredit: '$0.25/credit',
    icon: Sparkles,
    features: [
      '20 credits included',
      'Access to all AI models',
      'Standard quality outputs',
      'Prompt history & favorites',
      'Community support',
    ],
    cta: 'Get Started',
    ctaVariant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Growth',
    price: '$10',
    period: 'one-time',
    description: 'Best value for regular creators',
    credits: '50 credits',
    pricePerCredit: '$0.20/credit',
    icon: Zap,
    popular: true,
    features: [
      '50 credits included',
      'All AI models + HD outputs',
      'Smart prompt suggestions',
      'Priority generation queue',
      'Email support',
    ],
    cta: 'Buy Credits',
    ctaVariant: 'default' as const,
  },
  {
    name: 'Professional',
    price: '$15',
    period: 'one-time',
    description: 'For power users and agencies',
    credits: '100 credits',
    pricePerCredit: '$0.15/credit',
    icon: Zap,
    features: [
      '100 credits included',
      'All AI models + 4K outputs',
      'Advanced prompt enhancement',
      'Batch generation',
      'Priority support',
    ],
    cta: 'Buy Credits',
    ctaVariant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'volume pricing',
    description: 'For teams with high-volume needs',
    credits: 'Custom amount',
    pricePerCredit: 'Volume discount',
    icon: Building2,
    features: [
      'Custom credit packages',
      'Dedicated account manager',
      'API access',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const,
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="section-padding">
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your team—no hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                'relative rounded-2xl border bg-white overflow-hidden',
                plan.popular
                  ? 'border-mint-300 shadow-mint-lg scale-105 z-10'
                  : 'border-border shadow-soft'
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-xl bg-mint-500 text-white border-0 px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="p-6 lg:p-8">
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center',
                      plan.popular ? 'bg-mint-500' : 'bg-mint-100'
                    )}
                  >
                    <plan.icon
                      className={cn(
                        'w-5 h-5',
                        plan.popular ? 'text-white' : 'text-mint-600'
                      )}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{plan.name}</h3>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-xs">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-xs text-mint-600 font-medium mt-1">
                    {plan.pricePerCredit}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={cn(
                          'w-5 h-5 mt-0.5 shrink-0',
                          plan.popular ? 'text-mint-500' : 'text-mint-600'
                        )}
                      />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={plan.popular ? '/register?plan=pro' : '/register'}>
                  <Button
                    className={cn(
                      'w-full',
                      plan.popular
                        ? 'bg-mint-500 hover:bg-mint-600 text-white shadow-mint'
                        : ''
                    )}
                    variant={plan.ctaVariant}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.{' '}
            <Link href="/pricing" className="text-mint-600 hover:underline">
              View full comparison
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
