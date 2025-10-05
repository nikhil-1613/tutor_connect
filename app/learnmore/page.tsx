"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpenCheck,
  UserCheck,
  ShieldCheck,
  GraduationCap,
  MessageCircle,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const steps = [
  {
    icon: BookOpenCheck,
    title: "Submit Your Request",
    description:
      "Tell us what subject you need help with, your learning goals, and preferred schedule. Our system instantly begins matching you with qualified tutors.",
  },
  {
    icon: UserCheck,
    title: "Get Personalized Tutor Matches",
    description:
      "You’ll receive a curated list of tutors that best fit your child’s learning style and your preferences — reviewed by our expert matching team.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Vetted Tutors",
    description:
      "Every tutor undergoes background verification, qualification checks, and performance evaluations to ensure your peace of mind.",
  },
  {
    icon: GraduationCap,
    title: "Start Learning Seamlessly",
    description:
      "Once you select your tutor, start lessons right away! Track progress, communicate easily, and see your child grow with confidence.",
  },
];

const extraSections = [
  {
    title: "Why Choose Us?",
    content:
      "We combine technology with human expertise to make learning personal, safe, and effective. Our tutors are passionate educators who bring energy and empathy to every session.",
  },
  {
    title: "Safety & Quality Assurance",
    content:
      "We conduct rigorous tutor verification and ongoing performance reviews. Your trust and your child’s learning experience are our top priorities.",
  },
  {
    title: "Support When You Need It",
    content:
      "Our admin and support team are always available to assist — whether it’s rescheduling, feedback, or custom learning plans.",
  },
];

export default function LearnMorePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <Header />

      {/* Animated background blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-teal-300/20 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content */}
      <main className="relative flex-1">
        <div className="container mx-auto px-6 py-24 sm:py-28 lg:py-32">
          {/* Page heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Learn More About How We Work
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              From your first tutor request to your first lesson, we make every
              step transparent, easy, and secure.
            </p>
          </motion.div>

          {/* Steps Section */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <Card className="relative group overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all rounded-2xl bg-white/80 dark:bg-gray-900/40 backdrop-blur-sm">
                    <CardContent className="p-8 flex flex-col items-center text-center space-y-5">
                      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-purple-600 text-white shadow-lg group-hover:scale-105 transition-transform">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Extra info sections */}
          <div className="space-y-16 max-w-4xl mx-auto">
            {extraSections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
              Still have questions or need personalized guidance?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our team is here to help you at every step — from selecting the
              right tutor to ensuring a smooth learning experience.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Contact Support
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-teal-600 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-gray-800"
                >
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
