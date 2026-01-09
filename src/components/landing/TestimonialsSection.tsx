'use client';

import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const testimonials = [
  {
    quote:
      "The flexibility of their pricing plans allowed us to scale seamlessly. Software for accounting firms is notoriously outdated, slow, and hard to use. PromptPal is different—it's a more streamlined, cloud-first approach.",
    author: 'Austin Arthur',
    role: 'Product Designer',
    company: 'Finlogix',
    rating: 5,
    metric: '5x',
    metricLabel: 'Business Growth',
    avatar: '/avatars/austin.jpg',
    gradient: 'from-mint-500 to-emerald-500',
  },
  {
    quote:
      "PromptPal transformed how we create content. What used to take hours now takes minutes. The smart prompts feature alone saved our team countless hours of iteration.",
    author: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechStart',
    rating: 5,
    metric: '10x',
    metricLabel: 'Faster Content',
    avatar: '/avatars/sarah.jpg',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    quote:
      "As an e-commerce seller, product photography was my biggest expense. PromptPal's AI generation has cut my visual content costs by 80% while improving quality.",
    author: 'Michael Ross',
    role: 'Founder',
    company: 'StyleBox',
    rating: 5,
    metric: '80%',
    metricLabel: 'Cost Reduction',
    avatar: '/avatars/michael.jpg',
    gradient: 'from-purple-500 to-pink-500',
  },
];

const stats = [
  { value: '150K+', label: 'Active Users' },
  { value: '10M+', label: 'Images Created' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '99.9%', label: 'Uptime' },
];

const logos = [
  { name: 'Google', opacity: 0.4 },
  { name: 'Microsoft', opacity: 0.5 },
  { name: 'Stripe', opacity: 0.45 },
  { name: 'Notion', opacity: 0.5 },
  { name: 'Figma', opacity: 0.45 },
  { name: 'Vercel', opacity: 0.4 },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Premium layered background */}
      <div className="absolute inset-0">
        {/* Mint-tinted gradient panel */}
        <div className="absolute inset-0 bg-section-mint" />

        {/* Circular pattern texture */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.6) 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* Floating glow orbs */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-mint-100/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] bg-emerald-100/25 rounded-full blur-[90px]" />
      <div className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-mint-50/20 rounded-full blur-[80px]" />

      <div className="container-wide relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <Badge
            variant="secondary"
            className="mb-4 px-3 py-1 text-xs font-medium bg-mint-100/80 text-mint-700 border border-mint-200/50"
          >
            Customer Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Real Results from
            <span className="gradient-text"> Real Creators</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From startups to enterprises, discover how our AI platform delivers measurable results across industries.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-16 lg:mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              className="text-center p-6 surface-elevated rounded-2xl border border-white/60"
            >
              <p className="text-3xl lg:text-4xl font-bold tracking-tight gradient-text mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group"
            >
              <div className="h-full surface-elevated rounded-3xl border border-white/60 p-8 hover:shadow-soft-lg transition-all duration-300 relative overflow-hidden">
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient}`} />

                {/* Quote Icon */}
                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center`}>
                    <Quote className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Quote */}
                <p className="text-muted-foreground leading-relaxed mb-8 text-sm lg:text-base">
                  "{testimonial.quote}"
                </p>

                {/* Author & Rating */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-mint-100">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback className="bg-mint-100 text-mint-700 font-semibold">
                        {testimonial.author
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Metric */}
                <div className="pt-6 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-4xl font-bold bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                        {testimonial.metric}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
                        {testimonial.metricLabel}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-mint-100 flex items-center justify-center group-hover:bg-mint-200 transition-colors">
                      <TrendingUp className="w-5 h-5 text-mint-600" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logos Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 lg:mt-24"
        >
          <p className="text-center text-sm text-muted-foreground mb-10 font-medium">
            Trusted by innovative teams at world-class companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: logo.opacity }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                className="text-2xl font-bold text-slate-400 hover:text-slate-500 transition-colors cursor-default"
              >
                {logo.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View All Reviews Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="/reviews"
            className="inline-flex items-center gap-2 text-mint-600 hover:text-mint-700 font-medium text-sm group"
          >
            Read all customer stories
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
