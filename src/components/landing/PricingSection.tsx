'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
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
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ═══════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════

function useMouseParallax(intensity: number = 0.02) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      x.set((e.clientX - centerX) * intensity);
      y.set((e.clientY - centerY) * intensity);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [intensity, x, y]);

  return { x: springX, y: springY };
}

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

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
    bgGradient: 'from-slate-50 to-slate-100',
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
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
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
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-50 to-purple-50',
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
    bgGradient: 'from-blue-50 to-cyan-50',
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
  { icon: Shield, label: '14-day money back', description: 'No questions asked' },
  { icon: Clock, label: 'Credits never expire', description: 'Use them anytime' },
  { icon: Headphones, label: 'Priority support', description: 'We\'re here to help' },
];

// ═══════════════════════════════════════════════════════════
// FLOATING ELEMENT
// ═══════════════════════════════════════════════════════════

function FloatingElement({ children, delay = 0, duration = 4, y = 15 }: { children: React.ReactNode; delay?: number; duration?: number; y?: number }) {
  return (
    <motion.div
      animate={{ y: [-y, y, -y] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// PRICING CARD
// ═══════════════════════════════════════════════════════════

function PricingCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative group',
        plan.popular && 'lg:-mt-4 lg:mb-4'
      )}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'relative h-full rounded-[28px] overflow-hidden transition-all duration-500',
          plan.popular
            ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl shadow-slate-400/20'
            : 'bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-lg shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30'
        )}
      >
        {/* Popular badge */}
        {plan.popular && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-0 left-0 right-0 flex justify-center z-10"
          >
            <div className="px-4 py-1.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-b-xl shadow-lg">
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Most Popular</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Savings badge */}
        {plan.savings && !plan.popular && (
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-semibold',
                'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200/50'
              )}
            >
              {plan.savings}
            </motion.div>
          </div>
        )}

        {/* Gradient top accent for non-popular cards */}
        {!plan.popular && (
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.gradient}`} />
        )}

        <div className={cn('p-7 lg:p-8', plan.popular && 'pt-12')}>
          {/* Icon & Name */}
          <div className="flex items-start gap-4 mb-6">
            <motion.div
              animate={isHovered ? { scale: 1.1, rotate: -5 } : { scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className={cn(
                'w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg',
                plan.popular
                  ? 'bg-gradient-to-br from-emerald-400 to-teal-500'
                  : `bg-gradient-to-br ${plan.gradient}`
              )}
            >
              <plan.icon className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h3 className={cn(
                'font-bold text-xl',
                plan.popular ? 'text-white' : 'text-slate-900'
              )}>
                {plan.name}
              </h3>
              <p className={cn(
                'text-sm mt-0.5',
                plan.popular ? 'text-slate-400' : 'text-slate-500'
              )}>
                {plan.description}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className={cn(
                'text-5xl font-bold tracking-tight',
                plan.popular ? 'text-white' : 'text-slate-900'
              )}>
                {plan.price}
              </span>
              <span className={cn(
                'text-sm font-medium',
                plan.popular ? 'text-slate-400' : 'text-slate-500'
              )}>
                {plan.period}
              </span>
            </div>
            <div className={cn(
              'flex items-center gap-2 mt-3 py-2 px-3 rounded-xl',
              plan.popular ? 'bg-white/5' : 'bg-slate-50'
            )}>
              <span className={cn(
                'text-sm font-semibold',
                plan.popular ? 'text-emerald-400' : 'text-emerald-600'
              )}>
                {plan.credits}
              </span>
              <span className={cn(
                'text-xs',
                plan.popular ? 'text-slate-500' : 'text-slate-400'
              )}>
                • {plan.pricePerCredit}
              </span>
            </div>
            {plan.savings && plan.popular && (
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30"
              >
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">{plan.savings}</span>
              </motion.div>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-3.5 mb-8">
            {plan.features.map((feature, i) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-start gap-3"
              >
                <motion.div
                  animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                  className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                    plan.popular ? 'bg-emerald-500/20' : 'bg-gradient-to-br from-emerald-100 to-teal-100'
                  )}
                >
                  <Check className={cn(
                    'w-3 h-3',
                    plan.popular ? 'text-emerald-400' : 'text-emerald-600'
                  )} />
                </motion.div>
                <span className={cn(
                  'text-sm leading-relaxed',
                  plan.popular ? 'text-slate-300' : 'text-slate-600'
                )}>
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <Link href={plan.name === 'Enterprise' ? '/contact' : `/register?plan=${plan.name.toLowerCase()}`}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className={cn(
                  'w-full h-13 rounded-xl font-semibold text-base transition-all duration-300 group/btn',
                  plan.popular
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                )}
              >
                {plan.cta}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Animated border glow for popular card */}
        {plan.popular && (
          <motion.div
            className="absolute inset-0 rounded-[28px] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent)',
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['200% 0', '-200% 0'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN SECTION
// ═══════════════════════════════════════════════════════════

export function PricingSection() {
  const { x, y } = useMouseParallax(0.01);

  return (
    <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden">
      {/* ═══ PREMIUM BACKGROUND ═══ */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fefdfb] via-white to-[#f8fdfb]" />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ x, y }} className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15], rotate: [0, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-conic from-emerald-100/30 via-teal-50/20 to-cyan-100/30 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1], rotate: [0, -20, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-conic from-violet-100/25 via-purple-50/20 to-pink-100/25 blur-3xl"
          />
        </motion.div>
      </div>

      {/* Elegant grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} duration={5} y={20}>
          <div className="absolute top-[12%] left-[8%] w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 opacity-50 blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={1.5} duration={6} y={15}>
          <div className="absolute top-[35%] right-[6%] w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 opacity-40 blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={2.5} duration={7} y={25}>
          <div className="absolute bottom-[25%] left-[4%] w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 opacity-60" />
        </FloatingElement>
        <FloatingElement delay={3} duration={5.5} y={18}>
          <div className="absolute bottom-[15%] right-[10%] w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 opacity-45 blur-[1px]" />
        </FloatingElement>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="container-wide relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 mb-6"
          >
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Simple Pricing
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Pay Only for What
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                You Create
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12">
                <motion.path
                  d="M0 8 Q50 2 100 6 T200 8"
                  fill="none"
                  stroke="url(#pricing-underline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="pricing-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Flexible credit packages with no subscriptions. Buy once, use anytime.
            The more credits you buy, the more you save.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Guarantees Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200/60 p-6 lg:p-8">
            <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
              {guarantees.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow"
                  >
                    <item.icon className="w-5 h-5 text-emerald-600" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-slate-600">
            Start with <span className="font-semibold text-emerald-600">20 free credits</span> when you sign up.{' '}
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold group"
            >
              View full comparison
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.span>
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
