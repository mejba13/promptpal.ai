'use client';

import { motion } from 'framer-motion';
import {
  UserPlus,
  Wand2,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const steps = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Sign Up & Connect Your Tools',
    description:
      'Integrate with your Slack, Google, or Notion—no coding required. Get started in minutes.',
    features: ['Quick 2-min setup', 'Connect 50+ tools', 'Free trial included'],
  },
  {
    step: '02',
    icon: Wand2,
    title: 'Customize Workflows with AI',
    description:
      'Personalize automation flows for your team\'s exact needs. Our AI suggests optimal configurations.',
    features: ['Smart suggestions', 'Custom templates', 'Team collaboration'],
  },
  {
    step: '03',
    icon: Rocket,
    title: 'Launch Automation & Watch Results',
    description:
      'Track performance in real-time dashboards and measure productivity gains instantly.',
    features: ['Real-time analytics', 'Performance reports', 'ROI tracking'],
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground">
            From signup to stunning AI content in minutes. No learning curve required.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-mint-300 to-mint-100 -translate-x-1/2 z-0" />
              )}

              <div className="relative z-10">
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-mint-100 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-mint-600" />
                  </div>
                  <span className="text-sm font-bold text-mint-500">
                    Step {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {step.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {step.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-mint-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <Link
                  href={`/how-it-works#step-${step.step}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-mint-600 hover:text-mint-700 transition-colors group"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link href="/register">
            <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-mint">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
