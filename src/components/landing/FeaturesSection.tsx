'use client';

import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import {
  Sparkles,
  Image as ImageIcon,
  Video,
  History,
  CreditCard,
  Wand2,
  Zap,
  ArrowRight,
  Check,
  Play,
  Pause,
  Layers,
  Cpu,
  Palette,
  Settings2,
  BarChart3,
  Shield,
  Globe,
  Star,
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

function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  useEffect(() => {
    if (!startOnView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView]);

  return { count, ref };
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
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  glow?: boolean;
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={hover ? { y: -6, scale: 1.01, transition: { duration: 0.25 } } : undefined}
      className={`relative group ${className}`}
    >
      {glow && (
        <motion.div
          className="absolute -inset-[2px] rounded-[28px] bg-gradient-to-r from-emerald-400 via-cyan-500 to-emerald-400 opacity-0 group-hover:opacity-60 blur-xl transition-all duration-700"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 200%' }}
        />
      )}
      <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-white/90 via-white/50 to-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className={`relative h-full rounded-[24px] border overflow-hidden shadow-lg transition-all duration-500 ${
        dark
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50 shadow-slate-900/30 hover:shadow-2xl hover:shadow-slate-900/40'
          : 'bg-white/80 backdrop-blur-xl border-slate-200/60 shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30'
      }`}>
        {children}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// TYPING ANIMATION
// ═══════════════════════════════════════════════════════════

function TypeWriter({ text, speed = 30, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
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
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return (
    <span>
      {displayed}
      {!isDone && <span className="animate-pulse text-emerald-500">|</span>}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════
// ANIMATED PROMPT ENHANCEMENT DEMO
// ═══════════════════════════════════════════════════════════

function PromptEnhancementDemo() {
  const [phase, setPhase] = useState<'typing' | 'enhancing' | 'complete'>('typing');
  const [currentDemo, setCurrentDemo] = useState(0);

  const demos = [
    {
      input: 'a beautiful sunset',
      enhanced: 'A breathtaking sunset over calm ocean waters, golden hour lighting with vibrant orange and pink hues reflecting on gentle waves, silhouetted palm trees, professional landscape photography, 8K resolution, cinematic composition',
      tags: ['+Atmosphere', '+Composition', '+Quality'],
    },
    {
      input: 'cute cat portrait',
      enhanced: 'An adorable fluffy Persian cat with striking emerald eyes, soft studio lighting with warm tones, shallow depth of field bokeh background, professional pet photography, ultra-detailed fur texture, 4K quality',
      tags: ['+Lighting', '+Detail', '+Style'],
    },
    {
      input: 'futuristic city',
      enhanced: 'A sprawling cyberpunk metropolis at night, neon-lit skyscrapers with holographic advertisements, flying vehicles between buildings, rain-slicked streets with colorful reflections, blade runner aesthetic, ultra-wide cinematic shot',
      tags: ['+Mood', '+Detail', '+Scene'],
    },
  ];

  const current = demos[currentDemo];

  useEffect(() => {
    const cycle = async () => {
      setPhase('typing');
      await new Promise(r => setTimeout(r, 2000));
      setPhase('enhancing');
      await new Promise(r => setTimeout(r, 3500));
      setPhase('complete');
      await new Promise(r => setTimeout(r, 2500));
      setCurrentDemo((d) => (d + 1) % demos.length);
    };

    cycle();
    const interval = setInterval(cycle, 8500);
    return () => clearInterval(interval);
  }, [currentDemo]);

  return (
    <div className="h-full p-6 relative overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl"
        animate={{
          background: phase === 'enhancing'
            ? ['radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)', 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)', 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)']
            : 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Wand2 className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">Prompt Enhancement</h4>
          <p className="text-xs text-slate-500">AI-powered optimization</p>
        </div>
        <motion.div
          className={`ml-auto px-2.5 py-1 rounded-full text-[10px] font-bold ${
            phase === 'enhancing'
              ? 'bg-emerald-100 text-emerald-700'
              : phase === 'complete'
              ? 'bg-cyan-100 text-cyan-700'
              : 'bg-slate-100 text-slate-600'
          }`}
          animate={phase === 'enhancing' ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5, repeat: phase === 'enhancing' ? Infinity : 0 }}
        >
          {phase === 'typing' ? 'Input' : phase === 'enhancing' ? 'Processing...' : 'Enhanced'}
        </motion.div>
      </div>

      {/* Input Section */}
      <div className="mb-4">
        <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-2">Your Prompt</p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-sm text-slate-700 font-mono">
            {phase === 'typing' ? <TypeWriter text={`"${current.input}"`} speed={60} /> : `"${current.input}"`}
          </p>
        </div>
      </div>

      {/* Enhanced Output */}
      <AnimatePresence mode="wait">
        {(phase === 'enhancing' || phase === 'complete') && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={phase === 'enhancing' ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: phase === 'enhancing' ? Infinity : 0, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4 text-emerald-500" />
              </motion.div>
              <p className="text-[11px] text-emerald-600 uppercase tracking-wider font-semibold">AI Enhanced</p>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold"
              >
                +340% detail
              </motion.span>
            </div>
            <div className="relative">
              <motion.div
                className="absolute -inset-[2px] bg-gradient-to-r from-emerald-500/40 via-cyan-500/40 to-emerald-500/40 rounded-xl blur-sm"
                animate={phase === 'enhancing' ? { opacity: [0.5, 0.8, 0.5] } : { opacity: 0.3 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div className="relative bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-xl p-4 border border-emerald-200/50">
                <p className="text-xs text-slate-700 leading-relaxed">
                  {phase === 'enhancing' ? (
                    <TypeWriter text={current.enhanced} speed={12} />
                  ) : (
                    current.enhanced
                  )}
                </p>
              </div>
            </div>

            {/* Enhancement Tags */}
            {phase === 'complete' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex gap-2 mt-3"
              >
                {current.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 font-medium shadow-sm"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MODEL SELECTOR DEMO
// ═══════════════════════════════════════════════════════════

function ModelSelectorDemo() {
  const [selectedModel, setSelectedModel] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const models = [
    { name: 'SDXL Turbo', speed: 'Fast', quality: 95, icon: Zap, color: 'from-emerald-500 to-cyan-500' },
    { name: 'DALL-E 3', speed: 'Medium', quality: 98, icon: Sparkles, color: 'from-violet-500 to-purple-500' },
    { name: 'Flux Pro', speed: 'Fast', quality: 97, icon: Cpu, color: 'from-blue-500 to-cyan-500' },
    { name: 'Midjourney', speed: 'Slow', quality: 99, icon: Palette, color: 'from-amber-500 to-orange-500' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedModel((m) => (m + 1) % models.length);
      setIsGenerating(true);
      setTimeout(() => setIsGenerating(false), 1500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/30"
            whileHover={{ scale: 1.1, rotate: -5 }}
          >
            <Layers className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">Model Selection</h4>
            <p className="text-xs text-slate-500">15+ AI models available</p>
          </div>
        </div>
        <motion.div
          animate={isGenerating ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: isGenerating ? Infinity : 0 }}
          className={`w-2.5 h-2.5 rounded-full ${isGenerating ? 'bg-emerald-500' : 'bg-slate-300'}`}
        />
      </div>

      {/* Model Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {models.map((model, i) => (
          <motion.button
            key={model.name}
            onClick={() => setSelectedModel(i)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 ${
              selectedModel === i
                ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-cyan-50 shadow-lg shadow-emerald-500/20'
                : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-md'
            }`}
          >
            {selectedModel === i && (
              <motion.div
                layoutId="model-indicator"
                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg"
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            )}
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${model.color} flex items-center justify-center mb-2 shadow-md`}>
              <model.icon className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm font-semibold text-slate-900">{model.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-slate-500">{model.speed}</span>
              <span className="text-[10px] text-slate-400">•</span>
              <span className="text-[10px] text-emerald-600 font-medium">{model.quality}% quality</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Quality Indicator */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500 font-medium">Output Quality</span>
          <span className="text-sm font-bold text-slate-900">{models[selectedModel].quality}%</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
            initial={{ width: '0%' }}
            animate={{ width: `${models[selectedModel].quality}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// VIDEO GENERATION DEMO
// ═══════════════════════════════════════════════════════════

function VideoGenerationDemo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 2));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="h-full p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <motion.div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Video className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">Video Generation</h4>
          <p className="text-xs text-slate-500">AI-powered animations</p>
        </div>
      </div>

      {/* Video Preview */}
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-slate-900">
        {/* Actual Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4"
          poster="https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&h=450&fit=crop&q=80"
          muted
          loop
          playsInline
          autoPlay
        />

        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-slate-700" />
            ) : (
              <Play className="w-6 h-6 text-slate-700 ml-1" />
            )}
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white font-medium bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
              0:{String(Math.floor(progress / 6.67)).padStart(2, '0')}
            </span>
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-white font-medium bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
              0:15
            </span>
          </div>
        </div>

        {/* Quality Badge */}
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 py-1 rounded-lg shadow-lg">
            4K HDR
          </span>
        </div>
      </div>

      {/* Aspect Ratio Selector */}
      <div className="flex gap-2">
        {['9:16', '16:9', '1:1', '4:5'].map((ratio, i) => (
          <motion.button
            key={ratio}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              i === 1
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {ratio}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// STATS DISPLAY
// ═══════════════════════════════════════════════════════════

function StatsDisplay() {
  const stats = [
    { value: 150, suffix: 'K+', label: 'Active Users', icon: Globe },
    { value: 10, suffix: 'M+', label: 'Images Generated', icon: ImageIcon },
    { value: 99.9, suffix: '%', label: 'Uptime', icon: Shield },
    { value: 4.9, suffix: '/5', label: 'User Rating', icon: Star },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      {stats.map((stat, i) => {
        const { count, ref } = useCounter(stat.value * (stat.suffix === '%' ? 10 : 1), 2000);
        const displayValue = stat.suffix === '%' || stat.suffix === '/5'
          ? (count / 10).toFixed(1)
          : count.toLocaleString();

        return (
          <motion.div
            key={stat.label}
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-2">
              <stat.icon className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {displayValue}{stat.suffix}
            </p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
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
// FEATURE CARD
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group"
    >
      <div className="h-full p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/60 hover:border-slate-300/60 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300">
        <motion.div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
          whileHover={{ scale: 1.1, rotate: -5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        <h3 className="font-bold text-slate-900 text-base mb-2">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN FEATURES SECTION
// ═══════════════════════════════════════════════════════════

export function FeaturesSection() {
  const { x, y } = useMouseParallax(0.01);

  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
      {/* ═══ PREMIUM BACKGROUND ═══ */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fdfb] via-[#f0fdf6] to-white" />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ x, y }} className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 45, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-gradient-conic from-emerald-200/40 via-cyan-100/30 to-mint-200/40 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, -45, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-conic from-mint-200/30 via-teal-100/20 to-emerald-200/30 blur-3xl"
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
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} duration={6} y={20}>
          <div className="absolute top-[10%] left-[8%] w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 opacity-50 blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={1} duration={5} y={15}>
          <div className="absolute top-[30%] right-[12%] w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 opacity-40 blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={2} duration={7} y={25}>
          <div className="absolute bottom-[25%] left-[5%] w-2 h-2 rounded-full bg-gradient-to-br from-mint-400 to-emerald-500 opacity-60" />
        </FloatingElement>
        <FloatingElement delay={0.5} duration={8} y={18}>
          <div className="absolute top-[60%] right-[6%] w-5 h-5 rounded-full bg-gradient-to-br from-violet-300 to-purple-400 opacity-30 blur-sm" />
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
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200/60 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Everything You Need to
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Create at Scale
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12">
                <motion.path
                  d="M0 8 Q40 2 80 6 T160 4 T200 8"
                  fill="none"
                  stroke="url(#features-underline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="features-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            AI-powered features designed to adapt to your unique workflows and help you create stunning content faster than ever before.
          </p>
        </motion.div>

        {/* ═══ BENTO GRID ═══ */}
        <div className="grid grid-cols-12 gap-5 mb-16">

          {/* Main Feature - Prompt Enhancement */}
          <BentoCard delay={0.1} className="col-span-12 lg:col-span-7" glow>
            <div className="grid md:grid-cols-2 h-full">
              {/* Left - Content */}
              <div className="p-8 flex flex-col justify-center">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Wand2 className="w-7 h-7 text-white" />
                </motion.div>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">AI-Powered Suggestions</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">Smart Prompt Engine</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Our AI analyzes your intent and suggests optimized prompts that generate better results every time. No prompt engineering skills required.
                </p>
                <ul className="space-y-3">
                  {['Context-aware suggestions', 'Style optimization', 'Quality scoring'].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              {/* Right - Demo */}
              <div className="border-l border-slate-100 bg-gradient-to-br from-slate-50/50 to-white">
                <PromptEnhancementDemo />
              </div>
            </div>
          </BentoCard>

          {/* Stats Card */}
          <BentoCard delay={0.2} className="col-span-12 sm:col-span-6 lg:col-span-5">
            <div className="h-full flex flex-col">
              <div className="p-6 pb-0">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <BarChart3 className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Platform Stats</h4>
                    <p className="text-xs text-slate-500">Real-time metrics</p>
                  </div>
                </div>
              </div>
              <StatsDisplay />
            </div>
          </BentoCard>

          {/* Model Selector */}
          <BentoCard delay={0.3} className="col-span-12 sm:col-span-6 lg:col-span-5">
            <ModelSelectorDemo />
          </BentoCard>

          {/* Video Generation */}
          <BentoCard delay={0.35} className="col-span-12 lg:col-span-7" glow>
            <div className="grid md:grid-cols-2 h-full">
              {/* Left - Demo */}
              <div className="border-r border-slate-100 bg-gradient-to-br from-slate-50/50 to-white order-2 md:order-1">
                <VideoGenerationDemo />
              </div>
              {/* Right - Content */}
              <div className="p-8 flex flex-col justify-center order-1 md:order-2">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6 shadow-xl shadow-pink-500/30"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <Video className="w-7 h-7 text-white" />
                </motion.div>
                <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">Create Engaging Content</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">Video & Animation</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Generate engaging short-form videos, animated content, and social media reels with AnimateDiff and Stable Video Diffusion.
                </p>
                <ul className="space-y-3">
                  {['4K video output', 'Custom animations', 'Social media formats'].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-pink-600" />
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* ═══ QUICK FEATURES GRID ═══ */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          <FeatureCard
            icon={Wand2}
            title="One-Click Enhancement"
            description="Transform basic prompts into detailed, professional-grade descriptions instantly."
            gradient="from-violet-500 to-purple-500"
            delay={0.1}
          />
          <FeatureCard
            icon={History}
            title="Version History"
            description="Track versions, compare results, and build your personal prompt library."
            gradient="from-blue-500 to-cyan-500"
            delay={0.15}
          />
          <FeatureCard
            icon={CreditCard}
            title="Flexible Credits"
            description="Pay only for what you use with transparent, predictable pricing."
            gradient="from-amber-500 to-orange-500"
            delay={0.2}
          />
          <FeatureCard
            icon={Settings2}
            title="Advanced Settings"
            description="Fine-tune every parameter for complete control over your generations."
            gradient="from-pink-500 to-rose-500"
            delay={0.25}
          />
        </div>

        {/* ═══ CTA BANNER ═══ */}
        <BentoCard delay={0.3} hover={false} dark>
          <div className="p-10 md:p-14 relative overflow-hidden">
            {/* Animated background */}
            <motion.div
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)',
                ],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-32 -left-32 w-48 h-48 rounded-full blur-3xl"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                ],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 mb-5"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-4 h-4 text-emerald-400" />
                  </motion.div>
                  <span className="text-sm font-semibold text-emerald-400">Start Creating Today</span>
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Transform Your Workflow?
                </h3>
                <p className="text-slate-400 max-w-lg text-lg">
                  Join thousands of creators using PromptPal to generate stunning AI content. Start with 20 free credits.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white rounded-2xl shadow-xl shadow-emerald-500/30 group transition-all duration-300"
                  >
                    Get Started Free
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-base font-semibold rounded-2xl border-2 border-slate-600 text-white bg-transparent hover:bg-slate-800 hover:border-slate-500 transition-all duration-300"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
