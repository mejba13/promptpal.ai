'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ShoppingBag,
  Landmark,
  HeartPulse,
  GraduationCap,
  Factory,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const solutions = [
  {
    id: 'retail',
    icon: ShoppingBag,
    title: 'Retail',
    subtitle: 'Personalized customer experiences.',
    description:
      'Create product images, lifestyle shots, and marketing content that resonates with your audience. Generate A/B test variations instantly and scale your visual content across all channels.',
    features: [
      'Product image generation',
      'Lifestyle photography creation',
      'Social media content at scale',
      'A/B testing visuals',
    ],
  },
  {
    id: 'finance',
    icon: Landmark,
    title: 'Finance',
    subtitle: 'Fraud detection & smart predictions.',
    description:
      'Streamline report generation, create professional presentations, and visualize complex data. PromptPal helps financial teams communicate insights more effectively.',
    features: [
      'Report visualization',
      'Presentation graphics',
      'Data-driven content',
      'Compliant documentation',
    ],
  },
  {
    id: 'healthcare',
    icon: HeartPulse,
    title: 'Healthcare',
    subtitle: 'Faster diagnosis & workflow efficiency.',
    description:
      'Generate patient education materials, create training content, and produce compliant marketing assets. All while maintaining the highest standards of accuracy.',
    features: [
      'Patient education content',
      'Training materials',
      'Compliant marketing',
      'Medical illustrations',
    ],
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education',
    subtitle: 'Engaging learning experiences.',
    description:
      'Create interactive course materials, generate educational illustrations, and produce engaging content that helps students learn better and faster.',
    features: [
      'Course illustrations',
      'Interactive visuals',
      'Student engagement content',
      'Multi-format exports',
    ],
  },
  {
    id: 'manufacturing',
    icon: Factory,
    title: 'Manufacturing',
    subtitle: 'Streamlined operations & documentation.',
    description:
      'Generate technical documentation visuals, create training materials, and produce marketing content for complex industrial products.',
    features: [
      'Technical illustrations',
      'Training documentation',
      'Product catalogs',
      'Safety materials',
    ],
  },
];

export function SolutionsSection() {
  return (
    <section id="solutions" className="section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Header & Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-32"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Transforming Every Industry with Smarter AI Solutions
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              From retail to healthcare, our AI adapts to diverse industries—helping
              businesses scale smarter, faster, and with precision.
            </p>

            {/* Dashboard Preview */}
            <div className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden">
              <div className="p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-muted-foreground">
                    PromptPal Dashboard
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Welcome Back, Tahsan</span>
                  <span className="text-xs text-muted-foreground">This Week</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-2xl font-bold">8:26:44</p>
                    <p className="text-xs text-muted-foreground">Worked This Week</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">$4,647</p>
                    <p className="text-xs text-muted-foreground">Earned This Week</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">435</p>
                    <p className="text-xs text-muted-foreground">Project Worked</p>
                  </div>
                </div>
                {/* Mini Chart */}
                <div className="h-16 flex items-end gap-1">
                  {[30, 45, 60, 35, 70, 55, 80, 45, 65, 75, 50, 85].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-mint-500 to-mint-400 rounded-t-sm"
                        style={{ height: `${h}%` }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion type="single" collapsible defaultValue="retail" className="space-y-4">
              {solutions.map((solution) => (
                <AccordionItem
                  key={solution.id}
                  value={solution.id}
                  className="border border-border rounded-xl px-6 data-[state=open]:shadow-soft data-[state=open]:border-mint-200 transition-all"
                >
                  <AccordionTrigger className="hover:no-underline py-5">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-lg bg-mint-100 flex items-center justify-center shrink-0">
                        <solution.icon className="w-5 h-5 text-mint-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{solution.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {solution.subtitle}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="pl-14">
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {solution.description}
                      </p>
                      <ul className="grid grid-cols-2 gap-2 mb-4">
                        {solution.features.map((feature) => (
                          <li
                            key={feature}
                            className="text-sm flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-mint-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/solutions/${solution.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-mint-600 hover:text-mint-700 transition-colors group"
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
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
