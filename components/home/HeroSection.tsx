"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 dark:from-teal-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />

      <div className="absolute inset-0 opacity-30">
        <svg className="absolute top-10 left-10 text-teal-300" width="80" height="80" viewBox="0 0 80 80" fill="currentColor">
          <circle cx="40" cy="40" r="40" opacity="0.2" />
        </svg>
        <svg className="absolute bottom-20 right-20 text-purple-300" width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
          <rect width="100" height="100" opacity="0.2" />
        </svg>
        <svg className="absolute top-1/2 right-10 text-pink-300" width="60" height="60" viewBox="0 0 60 60" fill="currentColor">
          <polygon points="30,0 60,60 0,60" opacity="0.2" />
        </svg>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Find the Perfect{' '}
                <span className="bg-gradient-primary bg-clip-text text-black rounded-lg shadow-lg p-1 m-1">
                  Tutor
                </span>{' '}
                for Your Child
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Connect with experienced, caring tutors who provide quality education at affordable rates with flexible timings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/tutor/form">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all">
                  <Users className="mr-2 h-5 w-5" />
                  Join as Tutor
                </Button>
              </Link>
              <Link href="/parent/form">
                <Button size="lg" variant="outline" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Find a Tutor
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Tutors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 blur-3xl animate-pulse" />

              <svg viewBox="0 0 400 400" className="w-full h-full">
                <circle cx="200" cy="200" r="180" fill="currentColor" className="text-teal-100 dark:text-teal-900/30" />

                <g transform="translate(100, 120)">
                  <rect x="0" y="0" width="200" height="160" rx="8" fill="currentColor" className="text-white dark:text-gray-800" />

                  <rect x="20" y="20" width="160" height="80" rx="4" fill="currentColor" className="text-teal-500" opacity="0.3" />

                  <circle cx="100" cy="140" r="20" fill="currentColor" className="text-purple-500" />

                  <text x="100" y="200" textAnchor="middle" className="fill-current text-gray-700 dark:text-gray-300" fontSize="14" fontWeight="600">
                    Learning
                  </text>
                </g>

                <circle cx="120" cy="100" r="12" fill="currentColor" className="text-yellow-400" />
                <circle cx="290" cy="150" r="10" fill="currentColor" className="text-pink-400" />
                <circle cx="310" cy="280" r="14" fill="currentColor" className="text-blue-400" />
              </svg>
            </div>

            <div className="absolute top-10 -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 animate-bounce">
              <BookOpen className="h-8 w-8 text-teal-500" />
            </div>

            <div className="absolute bottom-20 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 animate-bounce" style={{ animationDelay: '0.5s' }}>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
