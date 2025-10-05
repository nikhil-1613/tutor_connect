"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpenCheck, UserCheck, ShieldCheck, GraduationCap } from "lucide-react";

const icons = [BookOpenCheck, UserCheck, ShieldCheck, GraduationCap];

const howItWorks = [
  {
    step: "1",
    title: "Submit Request",
    description: "Tell us about your requirements",
  },
  {
    step: "2",
    title: "Get Tutor Details",
    description: "Receive matched tutor profiles",
  },
  {
    step: "3",
    title: "Admin Verification",
    description: "We verify and approve the match",
  },
  {
    step: "4",
    title: "Start Learning",
    description: "Begin your educational journey",
  },
];

export const HowItWorks = () => {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-teal-50 to-pink-50 dark:from-purple-950/20 dark:via-teal-950/20 dark:to-pink-950/20" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Follow these simple steps to find the perfect tutor and start your learning journey.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="relative group overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all rounded-2xl">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 text-white shadow-lg group-hover:scale-105 transition-transform">
                      <Icon className="w-8 h-8" />
                      <span className="absolute -bottom-2 right-0 bg-white dark:bg-gray-900 text-primary font-bold rounded-full text-xs px-2 py-0.5 shadow">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-teal-500 to-purple-500 transition-opacity" />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
