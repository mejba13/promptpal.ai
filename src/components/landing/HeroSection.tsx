'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Play,
  Sparkles,
  Image as ImageIcon,
  Video,
  Wand2,
  Users,
  TrendingUp,
  Star,
  Shield,
  Check,
} from 'lucide-react';

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
}

// Bento card wrapper component
function BentoCard({
  children,
  className = '',
  delay = 0,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`relative group ${className}`}
    >
      {/* Gradient border effect */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-white/80 via-white/40 to-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
        {children}
      </div>
    </motion.div>
  );
}

// Typing animation component
function TypeWriter({ text, speed = 50, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setIsDone(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setIsDone(true);
        onComplete?.();
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return (
    <span>
      {displayed}
      {!isDone && <span className="animate-pulse">|</span>}
    </span>
  );
}

// Premium AI Demo showcase - Dark mode studio interface
function AIDemo() {
  const [phase, setPhase] = useState<'input' | 'enhancing' | 'generating' | 'complete'>('input');
  const [currentDemo, setCurrentDemo] = useState(0);
  const [progress, setProgress] = useState(0);

  const demos = [
    {
      input: 'a cute robot',
      enhanced: 'Adorable companion robot with expressive LED eyes, soft rounded chrome body, warm ambient lighting, Pixar-style 3D render, 8K detail',
      colors: ['from-cyan-400 to-blue-500', 'from-blue-400 to-indigo-500', 'from-indigo-400 to-purple-500', 'from-purple-400 to-pink-500'],
      model: 'SDXL Turbo',
    },
    {
      input: 'mountain sunset',
      enhanced: 'Majestic snow-capped peaks at golden hour, dramatic clouds with coral and amber hues, crystal alpine lake reflection, cinematic wide shot, National Geographic style',
      colors: ['from-orange-400 to-rose-500', 'from-rose-400 to-pink-500', 'from-amber-400 to-orange-500', 'from-yellow-400 to-amber-500'],
      model: 'DALL-E 3',
    },
    {
      input: 'cyberpunk street',
      enhanced: 'Neon-drenched Tokyo alley at midnight, holographic advertisements reflecting on rain-slicked streets, steam rising from vents, Blade Runner atmosphere, volumetric lighting',
      colors: ['from-violet-500 to-purple-600', 'from-fuchsia-500 to-pink-600', 'from-cyan-400 to-teal-500', 'from-blue-500 to-cyan-500'],
      model: 'Flux Pro',
    },
  ];

  const current = demos[currentDemo];

  useEffect(() => {
    const cycle = async () => {
      setPhase('input');
      setProgress(0);
      await new Promise(r => setTimeout(r, 1500));

      setPhase('enhancing');
      await new Promise(r => setTimeout(r, 2500));

      setPhase('generating');
      for (let i = 0; i <= 100; i += 5) {
        setProgress(i);
        await new Promise(r => setTimeout(r, 80));
      }

      setPhase('complete');
      await new Promise(r => setTimeout(r, 2000));

      setCurrentDemo((d) => (d + 1) % demos.length);
    };

    cycle();
    const interval = setInterval(cycle, 9000);
    return () => clearInterval(interval);
  }, [currentDemo]);

  return (
    <div className="h-full bg-slate-900 rounded-2xl overflow-hidden relative">
      {/* Glow effects */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />

      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-semibold text-white">AI Studio</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-medium">PRO</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </div>
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Input prompt */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Your Prompt</span>
          </div>
          <div className="bg-slate-800/50 rounded-xl px-3 py-2.5 border border-slate-700/50">
            <p className="text-xs text-slate-300 font-mono">
              {phase === 'input' ? <TypeWriter text={`"${current.input}"`} speed={80} /> : `"${current.input}"`}
            </p>
          </div>
        </div>

        {/* AI Enhancement */}
        <AnimatePresence mode="wait">
          {(phase === 'enhancing' || phase === 'generating' || phase === 'complete') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Wand2 className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-medium">AI Enhanced</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">+94% quality</span>
              </div>
              <div className="relative">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/50 via-cyan-500/50 to-emerald-500/50 rounded-xl blur-sm" />
                <div className="relative bg-slate-800 rounded-xl px-3 py-2.5 border border-emerald-500/30">
                  <p className="text-[11px] text-slate-200 leading-relaxed">
                    {phase === 'enhancing' ? (
                      <TypeWriter text={current.enhanced} speed={20} />
                    ) : (
                      current.enhanced
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Model & Quality indicators */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[9px] px-2 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 font-medium">
            {current.model}
          </span>
          <span className="text-[9px] px-2 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700">
            4K Ultra HD
          </span>
          <span className="text-[9px] px-2 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700">
            Batch: 4
          </span>
        </div>

        {/* Generated Images Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Generated</span>
            {phase === 'generating' && (
              <span className="text-[10px] text-cyan-400 font-medium">{progress}%</span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {current.colors.map((color, i) => (
              <motion.div
                key={i}
                className="relative aspect-square rounded-lg overflow-hidden"
                initial={{ opacity: 0.3, scale: 0.95 }}
                animate={{
                  opacity: phase === 'complete' || (phase === 'generating' && progress > (i + 1) * 25) ? 1 : 0.3,
                  scale: phase === 'complete' || (phase === 'generating' && progress > (i + 1) * 25) ? 1 : 0.95,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow ring for active */}
                {i === 0 && phase === 'complete' && (
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 rounded-lg opacity-60 blur-sm" />
                )}

                <div className={`relative w-full h-full bg-gradient-to-br ${color} rounded-lg`}>
                  {/* Loading shimmer */}
                  {phase === 'generating' && progress <= (i + 1) * 25 && (
                    <div className="absolute inset-0 bg-slate-800/80 flex items-center justify-center">
                      <motion.div
                        className="w-4 h-4 border-2 border-slate-600 border-t-cyan-400 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                  )}

                  {/* Completion overlay */}
                  {(phase === 'complete' || (phase === 'generating' && progress > (i + 1) * 25)) && (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                      {i === 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center"
                        >
                          <Check className="w-2.5 h-2.5 text-white" />
                        </motion.div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="pt-1">
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: phase === 'complete' ? '100%' : `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat card component
function StatCard({
  value,
  suffix = '',
  label,
  icon: Icon,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
  delay?: number;
}) {
  const count = useCounter(value, 2000);

  return (
    <BentoCard delay={delay} className="h-full">
      <div className="p-5 h-full flex flex-col justify-between">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-100 to-emerald-100 flex items-center justify-center mb-3">
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <p className="text-3xl font-bold text-slate-900 tracking-tight">
            {count.toLocaleString()}{suffix}
          </p>
          <p className="text-xs text-slate-500 font-medium mt-1">{label}</p>
        </div>
      </div>
    </BentoCard>
  );
}

// Feature mini card
function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}) {
  return (
    <BentoCard delay={delay} className="h-full">
      <div className="p-5 h-full">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-semibold text-slate-900 text-sm mb-1">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
    </BentoCard>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fdfb] via-[#f0fdf6] to-[#ecfdf3]" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-radial from-mint-200/50 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-radial from-emerald-200/40 to-transparent blur-3xl"
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container-wide relative pt-24 pb-16 lg:pt-28 lg:pb-20">
        {/* Main Bento Grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-5">

          {/* === HERO CARD - Main headline and CTA === */}
          <BentoCard delay={0} hover={false} className="col-span-12 lg:col-span-7 row-span-2">
            <div className="p-8 lg:p-10 h-full flex flex-col justify-center relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-mint-100/50 to-transparent rounded-full blur-2xl" />

              <div className="relative">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-6"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-700">AI-Powered Content Platform</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-5"
                >
                  Create stunning
                  <br />
                  content with{' '}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                      AI magic
                    </span>
                    <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 200 12">
                      <motion.path
                        d="M0 8 Q40 2 100 6 T200 8"
                        fill="none"
                        stroke="url(#hero-underline)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                      />
                      <defs>
                        <linearGradient id="hero-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md"
                >
                  Transform simple ideas into professional images, videos, and content. Smart prompts make everyone a creative expert.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-3 mb-6"
                >
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="h-12 px-6 text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/20 group"
                    >
                      Start free trial
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-6 text-sm font-medium rounded-xl border-slate-200 hover:bg-slate-50 group"
                  >
                    <Play className="mr-2 w-4 h-4 text-emerald-600" />
                    Watch demo
                  </Button>
                </motion.div>

                {/* Trust signals */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4 text-xs text-slate-500"
                >
                  {['No credit card', '20 free credits', 'Cancel anytime'].map((item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      {item}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </BentoCard>

          {/* === AI DEMO CARD === */}
          <BentoCard delay={0.15} className="col-span-12 sm:col-span-6 lg:col-span-5 row-span-2">
            <AIDemo />
          </BentoCard>

          {/* === STATS ROW === */}
          <div className="col-span-6 sm:col-span-3">
            <StatCard value={150} suffix="K+" label="Active creators" icon={Users} delay={0.2} />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <StatCard value={10} suffix="M+" label="Images generated" icon={ImageIcon} delay={0.25} />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <StatCard value={98} suffix="%" label="AI accuracy rate" icon={TrendingUp} delay={0.3} />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <StatCard value={4.9} suffix="/5" label="User rating" icon={Star} delay={0.35} />
          </div>

          {/* === FEATURES ROW === */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <FeatureCard
              icon={ImageIcon}
              title="AI Image Generation"
              description="Create stunning visuals with 15+ AI models including SDXL, DALL-E 3, and Flux"
              gradient="from-blue-500 to-cyan-500"
              delay={0.4}
            />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <FeatureCard
              icon={Video}
              title="Video & Animation"
              description="Generate engaging video content and animations for social media and marketing"
              gradient="from-violet-500 to-purple-500"
              delay={0.45}
            />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <FeatureCard
              icon={Wand2}
              title="Smart Prompts"
              description="AI-powered prompt enhancement that transforms basic ideas into detailed descriptions"
              gradient="from-amber-500 to-orange-500"
              delay={0.5}
            />
          </div>

          {/* === TRUST BAR === */}
          <BentoCard delay={0.55} hover={false} className="col-span-12">
            <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Trusted by 500+ companies worldwide</p>
                  <p className="text-xs text-slate-500">Enterprise-grade security & 99.9% uptime SLA</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {['Google', 'Microsoft', 'Stripe', 'Vercel', 'Notion'].map((company, i) => (
                  <motion.span
                    key={company}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    whileHover={{ opacity: 0.7 }}
                    className="text-sm font-semibold text-slate-400 cursor-default hidden sm:block"
                  >
                    {company}
                  </motion.span>
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
