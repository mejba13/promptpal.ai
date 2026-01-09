'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: 'What is PromptPal and how does it work?',
    answer:
      'PromptPal is an AI-powered content creation platform that helps you generate high-quality images, videos, and social media content. Our smart prompt system analyzes your intent and suggests optimized prompts that produce better results. Simply describe what you want, let our AI enhance your prompt, and watch as stunning content is generated in seconds.',
  },
  {
    question: 'Do I need any technical knowledge to use PromptPal?',
    answer:
      'Not at all! PromptPal is designed for everyone, from beginners to professionals. Our smart prompt suggestions guide you through the process, automatically improving your descriptions for optimal AI output. If you can describe what you want in plain English, you can use PromptPal.',
  },
  {
    question: 'What AI models does PromptPal support?',
    answer:
      'We integrate with multiple best-in-class AI models including Stable Diffusion XL, Flux, DALL-E 3, and more for images. For video generation, we support AnimateDiff and Stable Video Diffusion. Our platform automatically selects the best model for your specific use case, or you can choose manually.',
  },
  {
    question: 'How does the credit system work?',
    answer:
      'Credits are our simple, transparent pricing system. Each generation costs a set number of credits based on the complexity and model used. Basic images start at 1-2 credits, HD images at 2-4 credits, and videos at 10-25 credits. You receive 20 free credits when you sign up, and can purchase more as needed.',
  },
  {
    question: 'Can I use the generated content commercially?',
    answer:
      'Yes! All content generated through PromptPal is yours to use commercially. This includes marketing materials, social media posts, product images, advertisements, and more. We retain no rights to your generated content.',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Absolutely! Every new user receives 20 free credits upon registration—no credit card required. This gives you a chance to explore the platform, test different features, and see the quality of outputs before committing to a paid plan.',
  },
  {
    question: 'How do I get support if I need help?',
    answer:
      'We offer multiple support channels: in-app chat for quick questions (response within 2 hours during business hours), email support for detailed inquiries (24-hour response), a comprehensive knowledge base with tutorials and guides, and a community forum where users share tips and prompts.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Yes, you can cancel your subscription at any time with no penalties or hidden fees. Your account will remain active until the end of your current billing period, and any unused credits will still be available to use.',
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Premium layered background */}
      <div className="absolute inset-0">
        {/* Cream section background */}
        <div className="absolute inset-0 bg-section-cream" />

        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.5) 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Floating glow orbs */}
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-mint-100/15 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-mint-50/20 rounded-full blur-[100px]" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column - Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Everything you need to know about PromptPal. Can't find the answer
              you're looking for? Reach out to our support team.
            </p>
            <Link href="/contact">
              <Button variant="outline" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Contact Support
              </Button>
            </Link>
          </motion.div>

          {/* Right Column - FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-white/60 rounded-xl px-6 surface-elevated data-[state=open]:shadow-soft-lg transition-all"
                >
                  <AccordionTrigger className="hover:no-underline py-5 text-left">
                    <span className="font-medium pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
