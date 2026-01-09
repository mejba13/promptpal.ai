'use client';

import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp } from 'lucide-react';
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
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-muted/30">
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
            See How Teams Are Scaling with AI
          </h2>
          <p className="text-lg text-muted-foreground">
            From startups to enterprises, discover how our AI platform delivers measurable
            results across industries.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl border border-border/50 p-6 lg:p-8 shadow-soft card-hover">
                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-mint-200" />
                  <p className="relative text-muted-foreground leading-relaxed pl-4">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-mint-100">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback className="bg-mint-100 text-mint-700 font-medium">
                        {testimonial.author
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
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
                <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-mint-600">
                      {testimonial.metric}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.metricLabel}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-mint-300" />
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
          className="mt-16 pt-16 border-t border-border/50"
        >
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by innovative teams worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-60">
            {['Google', 'Microsoft', 'Stripe', 'Notion', 'Figma', 'Vercel'].map(
              (company) => (
                <div
                  key={company}
                  className="text-xl font-bold text-muted-foreground/50"
                >
                  {company}
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
