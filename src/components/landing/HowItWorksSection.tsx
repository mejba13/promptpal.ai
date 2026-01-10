'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  UserPlus,
  Wand2,
  Rocket,
  Sparkles,
  Check,
  ArrowRight,
  MousePointer2,
  Zap,
  Download,
} from 'lucide-react';

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
// BENTO CARD
// ═══════════════════════════════════════════════════════════

function BentoCard({
  children,
  className = '',
  delay = 0,
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glow?: boolean;
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
      {glow && (
        <motion.div
          className="absolute -inset-[2px] rounded-[28px] bg-gradient-to-r from-emerald-400 via-cyan-500 to-emerald-400 opacity-0 group-hover:opacity-60 blur-xl transition-all duration-700"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 200%' }}
        />
      )}
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
// STEP 1 - SIGNUP DEMO
// ═══════════════════════════════════════════════════════════

function SignupDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <motion.div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <UserPlus className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">Quick Setup</h4>
          <p className="text-xs text-slate-500">2 minute signup</p>
        </div>
      </div>

      {/* Form Demo */}
      <div className="space-y-3">
        <motion.div
          animate={{ opacity: step >= 0 ? 1 : 0.4 }}
          className="bg-slate-50 rounded-xl p-3 border border-slate-100"
        >
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Email</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-slate-700 font-medium">creator@example.com</p>
            {step >= 1 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center"
              >
                <Check className="w-2.5 h-2.5 text-white" />
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: step >= 1 ? 1 : 0.4 }}
          className="bg-slate-50 rounded-xl p-3 border border-slate-100"
        >
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Password</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-slate-700 font-medium">••••••••••••</p>
            {step >= 2 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center"
              >
                <Check className="w-2.5 h-2.5 text-white" />
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.button
          animate={{
            background: step >= 2 ? 'linear-gradient(to right, #10b981, #06b6d4)' : '#e2e8f0',
            scale: step === 3 ? [1, 0.98, 1] : 1,
          }}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
        >
          {step >= 3 ? (
            <>
              <Check className="w-4 h-4" />
              Account Created!
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-emerald-600 text-xs font-medium"
          >
            <Sparkles className="w-3 h-3" />
            +20 Free Credits Added!
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// STEP 2 - PROMPT DEMO
// ═══════════════════════════════════════════════════════════

function PromptDemo() {
  const [phase, setPhase] = useState<'typing' | 'enhancing' | 'done'>('typing');
  const [typed, setTyped] = useState('');
  const fullText = 'a cozy coffee shop';

  useEffect(() => {
    const cycle = async () => {
      setPhase('typing');
      setTyped('');

      // Typing animation
      for (let i = 0; i <= fullText.length; i++) {
        await new Promise(r => setTimeout(r, 80));
        setTyped(fullText.slice(0, i));
      }

      await new Promise(r => setTimeout(r, 500));
      setPhase('enhancing');
      await new Promise(r => setTimeout(r, 2500));
      setPhase('done');
      await new Promise(r => setTimeout(r, 2000));
    };

    cycle();
    const interval = setInterval(cycle, 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <motion.div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/30"
          whileHover={{ scale: 1.1, rotate: -5 }}
        >
          <Wand2 className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">Smart Prompts</h4>
          <p className="text-xs text-slate-500">AI-enhanced descriptions</p>
        </div>
        <motion.div
          animate={phase === 'enhancing' ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: phase === 'enhancing' ? Infinity : 0 }}
          className={`ml-auto px-2.5 py-1 rounded-full text-[10px] font-bold ${
            phase === 'enhancing' ? 'bg-violet-100 text-violet-700' : phase === 'done' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {phase === 'typing' ? 'Input' : phase === 'enhancing' ? 'Enhancing...' : 'Ready!'}
        </motion.div>
      </div>

      {/* Input */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <MousePointer2 className="w-3 h-3 text-slate-400" />
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Your idea</p>
        </div>
        <p className="text-sm text-slate-700">
          "{typed}
          {phase === 'typing' && <span className="animate-pulse text-violet-500">|</span>}"
        </p>
      </div>

      {/* Enhanced Output */}
      {(phase === 'enhancing' || phase === 'done') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={phase === 'enhancing' ? { rotate: 360 } : {}}
              transition={{ duration: 2, repeat: phase === 'enhancing' ? Infinity : 0, ease: 'linear' }}
            >
              <Sparkles className="w-3 h-3 text-violet-500" />
            </motion.div>
            <p className="text-[10px] text-violet-600 uppercase tracking-wider font-semibold">AI Enhanced</p>
          </div>
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-200/50">
            <p className="text-xs text-slate-700 leading-relaxed">
              {phase === 'done'
                ? '"A warm, inviting artisan coffee shop interior with exposed brick walls, soft morning light streaming through vintage windows, steaming latte with intricate foam art, cozy wooden furniture, plants and bookshelves, cinematic composition, 8K quality"'
                : '"Enhancing your prompt with lighting, atmosphere, composition..."'
              }
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// STEP 3 - GENERATE DEMO
// ═══════════════════════════════════════════════════════════

function GenerateDemo() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'generating' | 'complete'>('generating');

  // Coffee shop themed images to match the prompt demo
  const generatedImages = [
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=200&h=200&fit=crop&q=80',
  ];

  useEffect(() => {
    const cycle = async () => {
      setPhase('generating');
      setProgress(0);

      // Progress animation
      for (let i = 0; i <= 100; i += 2) {
        await new Promise(r => setTimeout(r, 50));
        setProgress(i);
      }

      setPhase('complete');
      await new Promise(r => setTimeout(r, 3000));
    };

    cycle();
    const interval = setInterval(cycle, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <motion.div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Rocket className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">Instant Creation</h4>
          <p className="text-xs text-slate-500">Generate in seconds</p>
        </div>
        <motion.div
          animate={phase === 'generating' ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 1, repeat: phase === 'generating' ? Infinity : 0 }}
          className={`ml-auto w-2.5 h-2.5 rounded-full ${phase === 'complete' ? 'bg-emerald-500' : 'bg-pink-500'}`}
        />
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {generatedImages.map((imageUrl, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-xl overflow-hidden relative bg-slate-100"
            animate={{
              opacity: phase === 'complete' || progress > (i + 1) * 25 ? 1 : 0.4,
            }}
          >
            {/* Actual image */}
            <img
              src={imageUrl}
              alt={`Generated coffee shop ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {progress <= (i + 1) * 25 && phase === 'generating' && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
                <motion.div
                  className="w-5 h-5 border-2 border-slate-300 border-t-pink-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            )}

            {(phase === 'complete' || progress > (i + 1) * 25) && i === 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1.5 right-1.5 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">{phase === 'complete' ? 'Complete!' : 'Generating...'}</span>
          <span className="text-slate-700 font-medium">{progress}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {phase === 'complete' && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-semibold flex items-center justify-center gap-2"
        >
          <Download className="w-3.5 h-3.5" />
          Download All (4K)
        </motion.button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN SECTION
// ═══════════════════════════════════════════════════════════

const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    subtitle: 'Quick 2-minute setup',
    description: 'Sign up free and get 20 credits to start. No credit card required.',
    features: ['Free starter credits', 'No setup required', 'Instant access'],
    gradient: 'from-emerald-500 to-cyan-500',
    icon: UserPlus,
  },
  {
    number: '02',
    title: 'Describe Your Vision',
    subtitle: 'AI-enhanced prompting',
    description: 'Enter a basic idea and let our AI transform it into a detailed prompt.',
    features: ['Smart suggestions', 'One-click enhance', 'Style presets'],
    gradient: 'from-violet-500 to-purple-500',
    icon: Wand2,
  },
  {
    number: '03',
    title: 'Generate & Download',
    subtitle: 'Instant AI creation',
    description: 'Watch your ideas come to life in seconds. Download in high resolution.',
    features: ['Multiple formats', 'High resolution', 'Commercial license'],
    gradient: 'from-pink-500 to-rose-500',
    icon: Rocket,
  },
];

export function HowItWorksSection() {
  const { x, y } = useMouseParallax(0.01);

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 overflow-hidden">
      {/* ═══ PREMIUM BACKGROUND ═══ */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fefdfb] to-[#f8fdfb]" />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ x, y }} className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-conic from-emerald-100/30 via-cyan-50/20 to-violet-100/30 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15], rotate: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-conic from-pink-100/25 via-purple-50/20 to-emerald-100/25 blur-3xl"
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
          <div className="absolute top-[15%] left-[10%] w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 opacity-50 blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={1} duration={5} y={15}>
          <div className="absolute top-[40%] right-[8%] w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 opacity-40 blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={2} duration={7} y={25}>
          <div className="absolute bottom-[20%] left-[5%] w-2 h-2 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 opacity-60" />
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
              <Zap className="w-4 h-4 text-emerald-600" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Simple Process
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Start Creating in
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Three Simple Steps
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12">
                <motion.path
                  d="M0 8 Q60 2 120 6 T240 4 T300 8"
                  fill="none"
                  stroke="url(#steps-underline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="steps-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From signup to stunning AI content in minutes. No technical knowledge required—just bring your ideas.
          </p>
        </motion.div>

        {/* ═══ BENTO GRID ═══ */}
        <div className="grid grid-cols-12 gap-5">
          {/* Step 1 Card */}
          <BentoCard delay={0.1} className="col-span-12 lg:col-span-4" glow>
            <div className="grid md:grid-cols-2 lg:grid-cols-1 h-full">
              <div className="p-6 lg:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r lg:border-b lg:border-r-0 border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-emerald-500/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <UserPlus className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className="text-5xl font-bold text-slate-100">01</span>
                </div>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">{steps[0].subtitle}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{steps[0].title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{steps[0].description}</p>
                <ul className="space-y-2">
                  {steps[0].features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-emerald-600" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-slate-50/50 to-white">
                <SignupDemo />
              </div>
            </div>
          </BentoCard>

          {/* Step 2 Card */}
          <BentoCard delay={0.2} className="col-span-12 lg:col-span-4" glow>
            <div className="grid md:grid-cols-2 lg:grid-cols-1 h-full">
              <div className="p-6 lg:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r lg:border-b lg:border-r-0 border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-xl shadow-violet-500/30"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <Wand2 className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className="text-5xl font-bold text-slate-100">02</span>
                </div>
                <p className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-2">{steps[1].subtitle}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{steps[1].title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{steps[1].description}</p>
                <ul className="space-y-2">
                  {steps[1].features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-violet-100 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-violet-600" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-slate-50/50 to-white">
                <PromptDemo />
              </div>
            </div>
          </BentoCard>

          {/* Step 3 Card */}
          <BentoCard delay={0.3} className="col-span-12 lg:col-span-4" glow>
            <div className="grid md:grid-cols-2 lg:grid-cols-1 h-full">
              <div className="p-6 lg:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r lg:border-b lg:border-r-0 border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-xl shadow-pink-500/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Rocket className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className="text-5xl font-bold text-slate-100">03</span>
                </div>
                <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">{steps[2].subtitle}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{steps[2].title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{steps[2].description}</p>
                <ul className="space-y-2">
                  {steps[2].features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-pink-100 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-pink-600" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-slate-50/50 to-white">
                <GenerateDemo />
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
