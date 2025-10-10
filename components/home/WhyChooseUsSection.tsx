"use client";

import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Clock, Heart, TrendingUp, Headphones, CircleCheck as CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    description: 'Quality education at prices that won\'t break the bank. Get the best value for your investment.',
    color: 'text-teal-500',
    bgColor: 'bg-teal-500/10'
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Choose schedules that work for you and your child. Morning, evening, or weekend sessions available.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    icon: Heart,
    title: 'Caring Tutors & One-On-One Attention',
    description: 'Our tutors are not just teachers, they\'re mentors who genuinely care about student success.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10'
  },
  {
    icon: TrendingUp,
    title: 'Performance Tracking',
    description: 'Regular evaluations and progress reports to keep you informed about your child\'s development.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    icon: Headphones,
    title: 'Exam Support',
    description: 'Extra attention and intensive coaching during exam periods to ensure excellent results.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  },
  {
    icon: CheckCircle,
    title: 'Quick Responses',
    description: 'Fast doubt clarification and responsive communication to keep learning on track.',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  }
];

export const WhyChooseUsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why To Choose TutorConnect?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive educational support that goes beyond traditional tutoring
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className={`${feature.bgColor} ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
