'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  ShoppingBag,
  Landmark,
  HeartPulse,
  GraduationCap,
  Factory,
  ArrowRight,
  TrendingUp,
  Users,
  Zap,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

const solutions = [
  {
    id: 'retail',
    icon: ShoppingBag,
    title: 'E-Commerce & Retail',
    description: 'Create product images, lifestyle shots, and marketing content that converts.',
    features: ['Product photography', 'Lifestyle imagery', 'Social media content', 'A/B testing visuals'],
    gradient: 'from-emerald-500 to-cyan-500',
    stat: '3x',
    statLabel: 'Faster content creation',
    color: 'emerald',
  },
  {
    id: 'marketing',
    icon: TrendingUp,
    title: 'Marketing & Agencies',
    description: 'Scale creative output for campaigns, social media, and client deliverables.',
    features: ['Campaign visuals', 'Brand assets', 'Social media content', 'Client presentations'],
    gradient: 'from-violet-500 to-purple-500',
    stat: '80%',
    statLabel: 'Cost reduction',
    color: 'violet',
  },
  {
    id: 'finance',
    icon: Landmark,
    title: 'Financial Services',
    description: 'Streamline report generation and visualize complex data beautifully.',
    features: ['Report visualization', 'Presentation graphics', 'Data storytelling', 'Compliant assets'],
    gradient: 'from-blue-500 to-cyan-500',
    stat: '5x',
    statLabel: 'Productivity boost',
    color: 'blue',
  },
  {
    id: 'healthcare',
    icon: HeartPulse,
    title: 'Healthcare',
    description: 'Generate patient education materials and compliant marketing assets.',
    features: ['Patient education', 'Training materials', 'Medical illustrations', 'Compliant content'],
    gradient: 'from-pink-500 to-rose-500',
    stat: '60%',
    statLabel: 'Time saved',
    color: 'pink',
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education & E-Learning',
    description: 'Create engaging course materials and educational illustrations.',
    features: ['Course visuals', 'Interactive content', 'Student materials', 'Multi-format exports'],
    gradient: 'from-amber-500 to-orange-500',
    stat: '2x',
    statLabel: 'Student engagement',
    color: 'amber',
  },
  {
    id: 'manufacturing',
    icon: Factory,
    title: 'Manufacturing',
    description: 'Generate technical documentation and product catalog visuals.',
    features: ['Technical illustrations', 'Product catalogs', 'Training docs', 'Safety materials'],
    gradient: 'from-slate-600 to-slate-700',
    stat: '40%',
    statLabel: 'Documentation faster',
    color: 'slate',
  },
];

// ═══════════════════════════════════════════════════════════
// BENTO CARD
// ═══════════════════════════════════════════════════════════

function BentoCard({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
      className={`relative group ${className}`}
    >
      <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-white/90 via-white/50 to-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full rounded-[24px] border border-slate-200/60 bg-white/80 backdrop-blur-xl overflow-hidden shadow-lg shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-500">
        {children}
      </div>
    </motion.div>
  );
}

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
// SOLUTION CARD
// ═══════════════════════════════════════════════════════════

function SolutionCard({ solution, index }: { solution: typeof solutions[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200/50' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200/50' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200/50' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200/50' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200/50' },
    slate: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200/50' },
  };

  const colors = colorClasses[solution.color] || colorClasses.emerald;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="h-full rounded-[24px] border border-slate-200/60 bg-white/80 backdrop-blur-sm overflow-hidden shadow-lg shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-500"
      >
        {/* Gradient top accent */}
        <div className={`h-1.5 bg-gradient-to-r ${solution.gradient}`} />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center shadow-lg`}
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <solution.icon className="w-6 h-6 text-white" />
            </motion.div>
            <div className="text-right">
              <p className={`text-2xl font-bold bg-gradient-to-r ${solution.gradient} bg-clip-text text-transparent`}>
                {solution.stat}
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{solution.statLabel}</p>
            </div>
          </div>

          {/* Content */}
          <h3 className="text-lg font-bold text-slate-900 mb-2">{solution.title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{solution.description}</p>

          {/* Features */}
          <ul className="grid grid-cols-2 gap-2 mb-4">
            {solution.features.map((feature, i) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center gap-2 text-xs text-slate-600"
              >
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${solution.gradient}`} />
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <Link href={`/solutions/${solution.id}`}>
            <motion.div
              className={`flex items-center justify-between p-3 rounded-xl ${colors.bg} ${colors.border} border transition-all group-hover:shadow-md`}
            >
              <span className={`text-sm font-semibold ${colors.text}`}>Learn more</span>
              <motion.div
                animate={isHovered ? { x: 4 } : { x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className={`w-4 h-4 ${colors.text}`} />
              </motion.div>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN SECTION
// ═══════════════════════════════════════════════════════════

export function SolutionsSection() {
  const { x, y } = useMouseParallax(0.01);

  return (
    <section id="solutions" className="relative py-24 lg:py-32 overflow-hidden">
      {/* ═══ PREMIUM BACKGROUND ═══ */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fdfb] via-[#f0fdf6] to-white" />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ x, y }} className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, 45, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-gradient-conic from-emerald-100/30 via-cyan-50/20 to-violet-100/30 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15], rotate: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-gradient-conic from-pink-100/25 via-amber-50/20 to-blue-100/25 blur-3xl"
          />
        </motion.div>
      </div>

      {/* Elegant grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} duration={6} y={20}>
          <div className="absolute top-[10%] right-[15%] w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 opacity-50 blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={1} duration={5} y={15}>
          <div className="absolute top-[50%] left-[5%] w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 opacity-40 blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={2} duration={7} y={25}>
          <div className="absolute bottom-[15%] right-[10%] w-2 h-2 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 opacity-60" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200/60 mb-6"
          >
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
              <Globe className="w-4 h-4 text-emerald-600" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Industry Solutions
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Built for Every
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Industry
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12">
                <motion.path
                  d="M0 8 Q40 2 80 6 T160 4 T200 8"
                  fill="none"
                  stroke="url(#industry-underline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="industry-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From retail to healthcare, our AI adapts to diverse industries—helping businesses scale smarter, faster, and with precision.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.id} solution={solution} index={index} />
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <BentoCard delay={0.4} className="col-span-12">
          <div className="p-8 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Users, value: '500+', label: 'Enterprise Clients', gradient: 'from-emerald-500 to-cyan-500' },
                { icon: Globe, value: '45+', label: 'Countries', gradient: 'from-violet-500 to-purple-500' },
                { icon: Zap, value: '10M+', label: 'Assets Generated', gradient: 'from-pink-500 to-rose-500' },
                { icon: TrendingUp, value: '95%', label: 'Client Satisfaction', gradient: 'from-amber-500 to-orange-500' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-3 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 mb-4">
            Need a custom solution for your enterprise?
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="h-13 px-8 text-base font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white rounded-2xl shadow-xl shadow-emerald-500/30 group transition-all duration-300"
            >
              Contact Enterprise Sales
              <motion.div
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
