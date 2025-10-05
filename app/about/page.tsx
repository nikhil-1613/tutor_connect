"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To make quality education accessible to every child by connecting them with passionate, qualified tutors who care about their success.'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'We build strong relationships between tutors, parents, and students, creating a supportive learning ecosystem.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain high standards in tutor selection and continuously monitor performance to ensure the best educational outcomes.'
    },
    {
      icon: Heart,
      title: 'Care & Support',
      description: 'Beyond academics, our tutors provide mentorship and emotional support to help students grow holistically.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 dark:from-teal-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">About TutorConnect</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                TutorConnect is a platform dedicated to connecting quality tutors with students who need personalized educational support. We believe that every child deserves access to excellent education, and every passionate teacher deserves the opportunity to make a difference.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all border-2">
                    <CardContent className="p-8">
                      <div className="bg-gradient-primary w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                        <value.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded with a vision to transform education, EduMatch started from a simple observation: many talented tutors struggled to find students, while parents found it challenging to locate qualified tutors who matched their requirements.
                </p>
                <p>
                  We created a platform that bridges this gap, making it easy for parents to find the perfect tutor for their children while providing tutors with opportunities to share their knowledge and passion for teaching.
                </p>
                <p>
                  Today, we're proud to have connected hundreds of families with dedicated tutors, helping students achieve their academic goals and fostering a love for learning that lasts a lifetime.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
