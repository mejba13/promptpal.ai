'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Star, Quote, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

const testimonials = [
  {
    quote: "PromptPal transformed how we create content. What used to take hours now takes minutes. The smart prompts feature alone saved our team countless hours of iteration.",
    author: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechStart',
    rating: 5,
    metric: '10x',
    metricLabel: 'Faster Content',
    avatar: '/avatars/sarah.jpg',
    gradient: 'from-emerald-500 to-cyan-500',
  },
  {
    quote: "As an e-commerce seller, product photography was my biggest expense. PromptPal's AI generation has cut my visual content costs by 80% while improving quality.",
    author: 'Michael Ross',
    role: 'Founder',
    company: 'StyleBox',
    rating: 5,
    metric: '80%',
    metricLabel: 'Cost Reduction',
    avatar: '/avatars/michael.jpg',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    quote: "The flexibility of their pricing plans allowed us to scale seamlessly. PromptPal is a more streamlined, cloud-first approach to AI content generation.",
    author: 'Austin Arthur',
    role: 'Product Designer',
    company: 'Finlogix',
    rating: 5,
    metric: '5x',
    metricLabel: 'Business Growth',
    avatar: '/avatars/austin.jpg',
    gradient: 'from-pink-500 to-rose-500',
  },
];

const logos = [
  'Google', 'Microsoft', 'Stripe', 'Notion', 'Figma', 'Vercel'
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
// TESTIMONIAL CARD
// ═══════════════════════════════════════════════════════════

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="h-full rounded-[24px] border border-slate-200/60 bg-white/80 backdrop-blur-sm overflow-hidden shadow-lg shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-500 relative"
      >
        {/* Gradient top accent */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient}`} />

        <div className="p-8">
          {/* Quote Icon */}
          <motion.div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center mb-6 shadow-lg`}
            animate={isHovered ? { scale: 1.1, rotate: -5 } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Quote className="w-5 h-5 text-white" />
          </motion.div>

          {/* Quote */}
          <p className="text-slate-600 leading-relaxed mb-8 text-sm lg:text-base">
            "{testimonial.quote}"
          </p>

          {/* Author */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-slate-100 shadow-md">
                <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                <AvatarFallback className={`bg-gradient-to-br ${testimonial.gradient} text-white font-semibold text-sm`}>
                  {testimonial.author.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-slate-900">{testimonial.author}</p>
                <p className="text-xs text-slate-500">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              {[...Array(testimonial.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Metric */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-4xl font-bold bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                  {testimonial.metric}
                </p>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">
                  {testimonial.metricLabel}
                </p>
              </div>
              <motion.div
                className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors"
                animate={isHovered ? { rotate: 10 } : { rotate: 0 }}
              >
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN SECTION
// ═══════════════════════════════════════════════════════════

export function TestimonialsSection() {
  const { x, y } = useMouseParallax(0.01);

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden">
      {/* ═══ PREMIUM BACKGROUND ═══ */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fefdfb] to-[#f8fdfb]" />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ x, y }} className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full bg-gradient-conic from-emerald-100/30 via-cyan-50/20 to-violet-100/30 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15], rotate: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-gradient-conic from-pink-100/25 via-purple-50/20 to-emerald-100/25 blur-3xl"
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
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Customer Stories
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Real Results from
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Real Creators
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12">
                <motion.path
                  d="M0 8 Q40 2 80 6 T160 4 T200 8"
                  fill="none"
                  stroke="url(#testimonials-underline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="testimonials-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Discover how creators and businesses are achieving measurable results with our AI platform.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Logos Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 lg:mt-20"
        >
          <p className="text-center text-sm text-slate-500 mb-10 font-medium">
            Trusted by innovative teams at world-class companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {logos.map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.4, y: 0 }}
                whileHover={{ opacity: 0.7, scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                className="text-2xl font-bold text-slate-400 cursor-default transition-all"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="/reviews"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm group"
          >
            Read all customer stories
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
