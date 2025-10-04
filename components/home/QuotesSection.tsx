"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  },
  {
    text: "Education is not preparation for life; education is life itself.",
    author: "John Dewey"
  },
  {
    text: "The roots of education are bitter, but the fruit is sweet.",
    author: "Aristotle"
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi"
  }
];

export const QuotesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-pink-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Words of Wisdom</h2>
          <p className="text-muted-foreground">Inspirational quotes about education and learning</p>
        </div>

        <div className="max-w-4xl mx-auto relative h-64 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Card className="h-full flex flex-col items-center justify-center p-8 sm:p-12 bg-card/50 backdrop-blur-sm border-2">
                <Quote className="h-12 w-12 text-primary mb-6 opacity-30" />
                <blockquote className="text-xl sm:text-2xl font-medium text-center mb-6 leading-relaxed">
                  "{quotes[currentIndex].text}"
                </blockquote>
                <cite className="text-base sm:text-lg text-muted-foreground not-italic font-semibold">
                  — {quotes[currentIndex].author}
                </cite>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
