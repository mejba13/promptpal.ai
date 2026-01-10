'use client';

import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
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
  Zap,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════

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

// Mouse parallax hook
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
// PREMIUM BENTO CARD
// ═══════════════════════════════════════════════════════════

function BentoCard({
  children,
  className = '',
  delay = 0,
  hover = true,
  glow = false,
  gradient = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={hover ? { y: -6, scale: 1.01, transition: { duration: 0.25 } } : undefined}
      className={`relative group ${className}`}
    >
      {/* Animated glow effect */}
      {glow && (
        <motion.div
          className="absolute -inset-[2px] rounded-[28px] bg-gradient-to-r from-mint-400 via-emerald-500 to-cyan-400 opacity-0 group-hover:opacity-70 blur-xl transition-all duration-700"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 200%' }}
        />
      )}

      {/* Gradient border effect */}
      <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-white/90 via-white/50 to-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main card */}
      <div className={`relative h-full rounded-[24px] border border-slate-200/60 overflow-hidden shadow-lg shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-500 ${gradient ? 'bg-gradient-to-br from-white/90 via-white/80 to-mint-50/50' : 'bg-white/80'} backdrop-blur-xl`}>
        {children}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// TYPING ANIMATION
// ═══════════════════════════════════════════════════════════

function TypeWriter({ text, speed = 50 }: { text: string; speed?: number }) {
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
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!isDone && <span className="animate-pulse text-cyan-400">|</span>}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════
// PREMIUM AI DEMO - EMERALD GLASSMORPHISM STUDIO
// ═══════════════════════════════════════════════════════════

function AIDemo() {
  const [phase, setPhase] = useState<'input' | 'enhancing' | 'generating' | 'complete'>('input');
  const [currentDemo, setCurrentDemo] = useState(0);
  const [progress, setProgress] = useState(0);

  const demos = [
    {
      input: 'a cute robot',
      enhanced: 'Adorable companion robot with expressive LED eyes, soft rounded chrome body, warm ambient lighting, Pixar-style 3D render, 8K detail',
      images: [
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=200&fit=crop&q=80',
        'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=200&h=200&fit=crop&q=80',
        'https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=200&h=200&fit=crop&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&q=80',
      ],
      model: 'SDXL Turbo',
    },
    {
      input: 'mountain sunset',
      enhanced: 'Majestic snow-capped peaks at golden hour, dramatic clouds with coral and amber hues, crystal alpine lake reflection, cinematic wide shot',
      images: [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&q=80',
        'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=200&h=200&fit=crop&q=80',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=200&fit=crop&q=80',
      ],
      model: 'DALL-E 3',
    },
    {
      input: 'cyberpunk street',
      enhanced: 'Neon-drenched Tokyo alley at midnight, holographic advertisements reflecting on rain-slicked streets, volumetric lighting',
      images: [
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=200&h=200&fit=crop&q=80',
        'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=200&h=200&fit=crop&q=80',
        'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=200&h=200&fit=crop&q=80',
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&h=200&fit=crop&q=80',
      ],
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
    <div className="h-full bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-[22px] overflow-hidden relative">
      {/* Premium mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(6,182,212,0.3)_0%,_transparent_50%)]" />

      {/* Animated floating orbs */}
      <motion.div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-300/20 to-transparent blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Header with glassmorphism */}
      <div className="px-5 py-4 border-b border-white/20 flex items-center justify-between relative backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white tracking-tight">AI Studio</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-sm text-white font-bold border border-white/30 shadow-sm">PRO</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-white/80 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
            <motion.div
              className="w-2 h-2 rounded-full bg-white shadow-sm shadow-white/50"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Live
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80 hover:bg-red-400 transition-colors shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80 hover:bg-amber-400 transition-colors shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm" />
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4 relative">
        {/* Input prompt with glass effect */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-white/70 uppercase tracking-widest font-semibold">Your Prompt</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20 shadow-inner">
            <p className="text-sm text-white font-mono">
              {phase === 'input' ? <TypeWriter text={`"${current.input}"`} speed={80} /> : `"${current.input}"`}
            </p>
          </div>
        </div>

        {/* AI Enhancement with premium animation */}
        <AnimatePresence mode="wait">
          {(phase === 'enhancing' || phase === 'generating' || phase === 'complete') && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ rotate: phase === 'enhancing' ? 360 : 0 }}
                  transition={{ duration: 2, repeat: phase === 'enhancing' ? Infinity : 0, ease: 'linear' }}
                >
                  <Wand2 className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-[11px] text-white uppercase tracking-widest font-semibold">AI Enhanced</span>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white font-bold border border-white/30"
                >
                  +94% quality
                </motion.span>
              </div>
              <div className="relative">
                <motion.div
                  className="absolute -inset-[2px] bg-gradient-to-r from-white/40 via-cyan-200/40 to-white/40 rounded-2xl blur-md"
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/30">
                  <p className="text-[12px] text-white leading-relaxed">
                    {phase === 'enhancing' ? (
                      <TypeWriter text={current.enhanced} speed={15} />
                    ) : (
                      current.enhanced
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Model & Quality tags */}
        <div className="flex items-center gap-2 flex-wrap">
          {[current.model, '4K Ultra HD', 'Batch: 4'].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm text-white/90 border border-white/20 font-medium"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Generated Images Grid with premium styling */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-white/70 uppercase tracking-widest font-semibold">Generated</span>
            {phase === 'generating' && (
              <motion.span
                className="text-[12px] text-white font-bold"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {progress}%
              </motion.span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {current.images.map((imageUrl, i) => (
              <motion.div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden"
                initial={{ opacity: 0.3, scale: 0.9 }}
                animate={{
                  opacity: phase === 'complete' || (phase === 'generating' && progress > (i + 1) * 25) ? 1 : 0.3,
                  scale: phase === 'complete' || (phase === 'generating' && progress > (i + 1) * 25) ? 1 : 0.9,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {/* Selection ring for first item */}
                {i === 0 && phase === 'complete' && (
                  <motion.div
                    className="absolute -inset-[3px] bg-gradient-to-r from-white via-cyan-200 to-white rounded-xl"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                <div className="relative w-full h-full rounded-xl shadow-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                  {/* Actual image */}
                  <img
                    src={imageUrl}
                    alt={`Generated ${current.input} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Loading state */}
                  {phase === 'generating' && progress <= (i + 1) * 25 && (
                    <div className="absolute inset-0 bg-emerald-900/60 flex items-center justify-center backdrop-blur-sm">
                      <motion.div
                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                  )}

                  {/* Complete overlay */}
                  {(phase === 'complete' || (phase === 'generating' && progress > (i + 1) * 25)) && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent" />
                      {i === 0 && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                          className="absolute top-1.5 right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                        </motion.div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress bar with gradient animation */}
        <div className="pt-2">
          <div className="h-1.5 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6), rgba(255,255,255,0.9))',
                backgroundSize: '200% 100%',
              }}
              initial={{ width: '0%', backgroundPosition: '0% 50%' }}
              animate={{
                width: phase === 'complete' ? '100%' : `${progress}%`,
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                width: { duration: 0.3 },
                backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PREMIUM STAT CARD
// ═══════════════════════════════════════════════════════════

function StatCard({
  value,
  suffix = '',
  label,
  icon: Icon,
  delay = 0,
  gradient = 'from-mint-500 to-emerald-600',
}: {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
  delay?: number;
  gradient?: string;
}) {
  const count = useCounter(value, 2500);

  return (
    <BentoCard delay={delay} className="h-full" glow>
      <div className="p-6 h-full flex flex-col justify-between relative overflow-hidden">
        {/* Background decoration */}
        <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-2xl`} />

        <motion.div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        <div>
          <motion.p
            className="text-4xl font-bold text-slate-900 tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.2 }}
          >
            {typeof value === 'number' && value % 1 !== 0 ? (count / 10).toFixed(1) : count.toLocaleString()}{suffix}
          </motion.p>
          <p className="text-sm text-slate-500 font-medium mt-1">{label}</p>
        </div>
      </div>
    </BentoCard>
  );
}

// ═══════════════════════════════════════════════════════════
// PREMIUM FEATURE CARD
// ═══════════════════════════════════════════════════════════

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
    <BentoCard delay={delay} className="h-full" gradient>
      <div className="p-6 h-full relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className={`absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-3xl`} />

        <motion.div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-xl`}
          whileHover={{ scale: 1.1, rotate: -5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
        <h3 className="font-bold text-slate-900 text-base mb-2">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
    </BentoCard>
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
// MAIN HERO SECTION
// ═══════════════════════════════════════════════════════════

export function HeroSection() {
  const { x, y } = useMouseParallax(0.015);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ═══ PREMIUM BACKGROUND ═══ */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fdfb] via-[#f0fdf6] to-[#e8faf0]" />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ x, y }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 -right-32 w-[800px] h-[800px] rounded-full bg-gradient-conic from-mint-200/50 via-emerald-100/30 to-cyan-200/50 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute -bottom-32 -left-32 w-[700px] h-[700px] rounded-full bg-gradient-conic from-emerald-200/40 via-teal-100/30 to-mint-200/40 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-cyan-100/30 to-transparent blur-3xl"
          />
        </motion.div>
      </div>

      {/* Elegant grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #10b981 1px, transparent 1px),
            linear-gradient(to bottom, #10b981 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} duration={6} y={20}>
          <div className="absolute top-[15%] left-[10%] w-3 h-3 rounded-full bg-gradient-to-br from-mint-400 to-emerald-500 opacity-60 blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={1} duration={5} y={15}>
          <div className="absolute top-[25%] right-[15%] w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 opacity-50 blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={2} duration={7} y={25}>
          <div className="absolute bottom-[30%] left-[8%] w-2 h-2 rounded-full bg-gradient-to-br from-emerald-400 to-mint-500 opacity-70" />
        </FloatingElement>
        <FloatingElement delay={0.5} duration={8} y={18}>
          <div className="absolute top-[40%] right-[8%] w-5 h-5 rounded-full bg-gradient-to-br from-teal-300 to-cyan-400 opacity-40 blur-sm" />
        </FloatingElement>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="container-wide relative pt-28 pb-20 lg:pt-32 lg:pb-24">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 lg:gap-5">

          {/* ════════════════════════════════════════════════════════════
               MAIN HERO CARD - Headlines, CTAs
          ════════════════════════════════════════════════════════════ */}
          <BentoCard delay={0} hover={false} className="col-span-12 lg:col-span-7 row-span-2" gradient>
            <div className="p-8 lg:p-12 h-full flex flex-col justify-center relative overflow-hidden">
              {/* Decorative gradient orb */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-radial from-mint-100/60 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-radial from-cyan-100/40 to-transparent rounded-full blur-2xl" />

              <div className="relative z-10">
                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-mint-50 border border-emerald-200/60 mb-8 shadow-sm"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </motion.div>
                  <span className="text-sm font-semibold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                    AI-Powered Content Platform
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold">
                    NEW
                  </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-6"
                >
                  Create stunning
                  <br />
                  content with{' '}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                      AI magic
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 200 15">
                      <motion.path
                        d="M0 10 Q30 3 60 8 T120 6 T200 10"
                        fill="none"
                        stroke="url(#hero-underline-gradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
                      />
                      <defs>
                        <linearGradient id="hero-underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="50%" stopColor="#14b8a6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg"
                >
                  Transform simple ideas into professional images, videos, and content. Smart prompts make everyone a creative expert.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="flex flex-wrap gap-4 mb-8"
                >
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white rounded-2xl shadow-xl shadow-slate-900/25 group transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/30"
                    >
                      Start free trial
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-base font-semibold rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:bg-white/80 group transition-all duration-300"
                  >
                    <Play className="mr-2 w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                    Watch demo
                  </Button>
                </motion.div>

                {/* Trust Signals */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="flex flex-wrap gap-6 text-sm text-slate-500"
                >
                  {[
                    { text: 'No credit card', icon: Shield },
                    { text: '20 free credits', icon: Zap },
                    { text: 'Cancel anytime', icon: Check },
                  ].map((item, i) => (
                    <motion.span
                      key={item.text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <item.icon className="w-3 h-3 text-emerald-600" />
                      </div>
                      {item.text}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </BentoCard>

          {/* ════════════════════════════════════════════════════════════
               AI DEMO CARD
          ════════════════════════════════════════════════════════════ */}
          <BentoCard delay={0.15} className="col-span-12 sm:col-span-6 lg:col-span-5 row-span-2" glow>
            <AIDemo />
          </BentoCard>

          {/* ════════════════════════════════════════════════════════════
               STATS ROW
          ════════════════════════════════════════════════════════════ */}
          <div className="col-span-6 sm:col-span-3">
            <StatCard
              value={150}
              suffix="K+"
              label="Active creators"
              icon={Users}
              delay={0.2}
              gradient="from-blue-500 to-indigo-600"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <StatCard
              value={10}
              suffix="M+"
              label="Images generated"
              icon={ImageIcon}
              delay={0.25}
              gradient="from-violet-500 to-purple-600"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <StatCard
              value={98}
              suffix="%"
              label="AI accuracy rate"
              icon={TrendingUp}
              delay={0.3}
              gradient="from-emerald-500 to-teal-600"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <StatCard
              value={49}
              suffix="/5"
              label="User rating"
              icon={Star}
              delay={0.35}
              gradient="from-amber-500 to-orange-600"
            />
          </div>

          {/* ════════════════════════════════════════════════════════════
               FEATURES ROW
          ════════════════════════════════════════════════════════════ */}
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
          <div className="col-span-12 sm:col-span-12 lg:col-span-4">
            <FeatureCard
              icon={Wand2}
              title="Smart Prompts"
              description="AI-powered prompt enhancement that transforms basic ideas into detailed descriptions"
              gradient="from-amber-500 to-orange-500"
              delay={0.5}
            />
          </div>

          {/* ════════════════════════════════════════════════════════════
               TRUST BAR
          ════════════════════════════════════════════════════════════ */}
          <BentoCard delay={0.55} hover={false} className="col-span-12" gradient>
            <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Shield className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <p className="text-base font-bold text-slate-900">Trusted by 500+ companies worldwide</p>
                  <p className="text-sm text-slate-500">Enterprise-grade security & 99.9% uptime SLA</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                {['Google', 'Microsoft', 'Stripe', 'Vercel', 'Notion'].map((company, i) => (
                  <motion.span
                    key={company}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.35 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    whileHover={{ opacity: 0.7, scale: 1.05 }}
                    className="text-base font-bold text-slate-400 cursor-default hidden sm:block transition-all duration-200"
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
    </section>
  );
}
