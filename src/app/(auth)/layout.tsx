'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Sparkles, Star, Zap, Shield, Users, Image as ImageIcon } from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// FLOATING ELEMENTS
// ═══════════════════════════════════════════════════════════

function FloatingOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════
// ANIMATED STATS
// ═══════════════════════════════════════════════════════════

function AnimatedStat({ value, label, icon: Icon, delay = 0 }: { value: string; label: string; icon: React.ElementType; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 0.8, duration: 0.6 }}
      className="text-center"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-2 border border-white/20"
      >
        <Icon className="w-5 h-5 text-white" />
      </motion.div>
      <motion.p
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 1, type: 'spring', stiffness: 200 }}
        className="text-2xl font-bold text-white"
      >
        {value}
      </motion.p>
      <p className="text-xs text-white/60 font-medium">{label}</p>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// TESTIMONIAL CARD
// ═══════════════════════════════════════════════════════════

function TestimonialCard() {
  const testimonials = [
    {
      quote: "PromptPal transformed our content workflow. What took hours now takes minutes.",
      author: "Sarah Anderson",
      role: "Marketing Director",
      avatar: "SA",
    },
    {
      quote: "The AI suggestions are incredibly smart. Our creative output has tripled.",
      author: "Michael Chen",
      role: "Creative Lead",
      avatar: "MC",
    },
    {
      quote: "Best investment for our design team. The quality is consistently amazing.",
      author: "Emily Roberts",
      role: "Design Manager",
      avatar: "ER",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="absolute bottom-8 left-8 right-8 lg:right-auto lg:max-w-sm"
    >
      <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                {testimonials[current].avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{testimonials[current].author}</p>
                <p className="text-xs text-white/60">{testimonials[current].role}</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-white/90 leading-relaxed italic">
              "{testimonials[current].quote}"
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-1.5 mt-4">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// FEATURE PILLS
// ═══════════════════════════════════════════════════════════

function FeaturePills() {
  const features = [
    { icon: Zap, text: '20 Free Credits' },
    { icon: Shield, text: 'No Card Required' },
    { icon: ImageIcon, text: '15+ AI Models' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="absolute top-8 left-8 flex flex-wrap gap-2"
    >
      {features.map((feature, i) => (
        <motion.div
          key={feature.text}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 + i * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium"
        >
          <feature.icon className="w-3.5 h-3.5" />
          {feature.text}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN AUTH LAYOUT
// ═══════════════════════════════════════════════════════════

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ═══════════════════════════════════════════════════════════
          LEFT SIDE - VIDEO BACKGROUND
      ═══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        {/* Video Background - AI/Digital Creative Theme */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/5377700/5377700-uhd_2560_1440_25fps.mp4"
          poster="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&q=80"
          muted
          loop
          playsInline
          autoPlay
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-emerald-900/80 to-slate-900/90" />

        {/* Animated Mesh Gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating Orbs */}
        <FloatingOrb
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-3xl"
          delay={0}
        />
        <FloatingOrb
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 blur-3xl"
          delay={2}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full w-full p-8">
          {/* Feature Pills */}
          <FeaturePills />

          {/* Center Content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/30"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
            >
              Create stunning
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                content with AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-white/70 max-w-md mb-10"
            >
              Join thousands of creators using smart prompts to generate
              professional images, videos, and more.
            </motion.p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 lg:gap-12">
              <AnimatedStat value="150K+" label="Active Users" icon={Users} delay={0} />
              <div className="w-px h-16 bg-white/20" />
              <AnimatedStat value="10M+" label="Generations" icon={ImageIcon} delay={0.1} />
              <div className="w-px h-16 bg-white/20" />
              <AnimatedStat value="4.9" label="User Rating" icon={Star} delay={0.2} />
            </div>
          </div>

          {/* Testimonial */}
          <TestimonialCard />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          RIGHT SIDE - FORM
      ═══════════════════════════════════════════════════════════ */}
      <div className="flex-1 lg:w-[45%] relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30" />

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-emerald-100/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-cyan-100/40 to-transparent rounded-full blur-3xl" />

        {/* Subtle Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Form Container */}
        <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 py-12 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-md"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            >
              <Link href="/" className="flex items-center gap-3 mb-10 group">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-emerald-500/30"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  Prompt<span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Pal</span>
                </span>
              </Link>
            </motion.div>

            {/* Form Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Video Section */}
        <div className="lg:hidden fixed inset-0 -z-10">
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            src="https://videos.pexels.com/video-files/5377700/5377700-uhd_2560_1440_25fps.mp4"
            muted
            loop
            playsInline
            autoPlay
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
        </div>
      </div>
    </div>
  );
}
