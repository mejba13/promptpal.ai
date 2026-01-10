'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MessageCircle, Sparkles, HelpCircle, ArrowRight, Mail, Clock } from 'lucide-react';
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

const faqs = [
  {
    question: 'What is PromptPal and how does it work?',
    answer:
      'PromptPal is an AI-powered content creation platform that helps you generate high-quality images, videos, and social media content. Our smart prompt system analyzes your intent and suggests optimized prompts that produce better results. Simply describe what you want, let our AI enhance your prompt, and watch as stunning content is generated in seconds.',
    category: 'Getting Started',
  },
  {
    question: 'Do I need any technical knowledge to use PromptPal?',
    answer:
      'Not at all! PromptPal is designed for everyone, from beginners to professionals. Our smart prompt suggestions guide you through the process, automatically improving your descriptions for optimal AI output. If you can describe what you want in plain English, you can use PromptPal.',
    category: 'Getting Started',
  },
  {
    question: 'What AI models does PromptPal support?',
    answer:
      'We integrate with multiple best-in-class AI models including Stable Diffusion XL, Flux, DALL-E 3, and more for images. For video generation, we support AnimateDiff and Stable Video Diffusion. Our platform automatically selects the best model for your specific use case, or you can choose manually.',
    category: 'Features',
  },
  {
    question: 'How does the credit system work?',
    answer:
      'Credits are our simple, transparent pricing system. Each generation costs a set number of credits based on the complexity and model used. Basic images start at 1-2 credits, HD images at 2-4 credits, and videos at 10-25 credits. You receive 20 free credits when you sign up, and can purchase more as needed.',
    category: 'Pricing',
  },
  {
    question: 'Can I use the generated content commercially?',
    answer:
      'Yes! All content generated through PromptPal is yours to use commercially. This includes marketing materials, social media posts, product images, advertisements, and more. We retain no rights to your generated content.',
    category: 'Licensing',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Absolutely! Every new user receives 20 free credits upon registration—no credit card required. This gives you a chance to explore the platform, test different features, and see the quality of outputs before committing to a paid plan.',
    category: 'Pricing',
  },
  {
    question: 'How do I get support if I need help?',
    answer:
      'We offer multiple support channels: in-app chat for quick questions (response within 2 hours during business hours), email support for detailed inquiries (24-hour response), a comprehensive knowledge base with tutorials and guides, and a community forum where users share tips and prompts.',
    category: 'Support',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Yes, you can cancel your subscription at any time with no penalties or hidden fees. Your account will remain active until the end of your current billing period, and any unused credits will still be available to use.',
    category: 'Billing',
  },
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
// FAQ ITEM
// ═══════════════════════════════════════════════════════════

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <AccordionItem
        value={`item-${index}`}
        className="group border-0 mb-3"
        onPointerDown={() => setIsOpen(!isOpen)}
      >
        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-lg hover:shadow-slate-200/30 transition-all duration-300 data-[state=open]:shadow-lg data-[state=open]:shadow-emerald-100/40 data-[state=open]:border-emerald-200/60"
        >
          <AccordionTrigger className="hover:no-underline px-6 py-5 text-left">
            <div className="flex items-start gap-4 w-full">
              <motion.div
                animate={isOpen ? { scale: 1.1, rotate: -5 } : { scale: 1, rotate: 0 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center flex-shrink-0 group-hover:from-emerald-200 group-hover:to-teal-200 transition-colors"
              >
                <HelpCircle className="w-5 h-5 text-emerald-600" />
              </motion.div>
              <div className="flex-1 min-w-0 pr-4">
                <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1 block">
                  {faq.category}
                </span>
                <span className="font-semibold text-slate-900 text-base leading-snug block">
                  {faq.question}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-5">
            <div className="pl-14 pr-4">
              <p className="text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </AccordionContent>
        </motion.div>
      </AccordionItem>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN SECTION
// ═══════════════════════════════════════════════════════════

export function FAQSection() {
  const { x, y } = useMouseParallax(0.01);

  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden">
      {/* ═══ PREMIUM BACKGROUND ═══ */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fdfb] via-[#fefdfb] to-white" />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ x, y }} className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.2, 0.12], rotate: [0, 15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-gradient-conic from-emerald-100/30 via-teal-50/20 to-cyan-100/30 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.18, 0.1], rotate: [0, -15, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-gradient-conic from-violet-100/25 via-purple-50/15 to-emerald-100/25 blur-3xl"
          />
        </motion.div>
      </div>

      {/* Elegant dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} duration={6} y={18}>
          <div className="absolute top-[15%] left-[12%] w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 opacity-45 blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={2} duration={5} y={12}>
          <div className="absolute top-[40%] right-[8%] w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 opacity-35 blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={3} duration={7} y={20}>
          <div className="absolute bottom-[30%] left-[6%] w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-50" />
        </FloatingElement>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="container-wide relative">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column - Header & Support Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            {/* Badge */}
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
                FAQ
              </span>
            </motion.div>

            {/* Title */}
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Frequently Asked
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  Questions
                </span>
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12">
                  <motion.path
                    d="M0 8 Q50 2 100 6 T200 8"
                    fill="none"
                    stroke="url(#faq-underline)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="faq-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              Everything you need to know about PromptPal. Can&apos;t find the answer
              you&apos;re looking for? We&apos;re here to help.
            </p>

            {/* Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8 shadow-xl"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Still have questions?</h3>
                  <p className="text-slate-400 text-sm">Our support team is ready to help</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-slate-300">support@promptpal.ai</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-slate-300">Response within 2 hours</span>
                </div>
              </div>

              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25 group">
                    Contact Support
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - FAQ Accordion */}
          <div className="lg:col-span-3">
            <Accordion type="single" collapsible className="space-y-0">
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </Accordion>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 font-medium transition-colors"
              >
                <span>📚</span>
                Read Documentation
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 font-medium transition-colors"
              >
                <span>💬</span>
                Join Community
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
