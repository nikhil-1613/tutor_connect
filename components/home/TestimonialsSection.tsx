"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Star, User } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Parent',
    rating: 5,
    text: 'EduMatch helped us find an amazing tutor for my daughter. Her grades have improved significantly, and she actually enjoys learning now!',
    avatar: 'PS'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Parent',
    rating: 5,
    text: 'The flexibility in timings and affordable pricing made it possible for us to provide quality education to our son. Highly recommended!',
    avatar: 'RK'
  },
  {
    name: 'Anita Reddy',
    role: 'Parent',
    rating: 5,
    text: 'Our tutor is not just knowledgeable but also very caring. She goes the extra mile to ensure our kids understand every concept thoroughly.',
    avatar: 'AR'
  },
  {
    name: 'Suresh Patel',
    role: 'Parent',
    rating: 5,
    text: 'The regular progress reports and exam preparation support have been invaluable. We see consistent improvement in our children\'s performance.',
    avatar: 'SP'
  },
  {
    name: 'Lakshmi Nair',
    role: 'Parent',
    rating: 5,
    text: 'Finding the right tutor was so easy through EduMatch. The matching process considers all our requirements and preferences perfectly.',
    avatar: 'LN'
  },
  {
    name: 'Vikram Singh',
    role: 'Parent',
    rating: 5,
    text: 'The tutors are professional, punctual, and passionate about teaching. Our son looks forward to every session!',
    avatar: 'VS'
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Parents Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from families who have transformed their children's education with EduMatch
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.text}"
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
