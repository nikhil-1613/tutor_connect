"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Parent",
    rating: 5,
    text: "EduMatch helped us find an amazing tutor for my daughter. Her grades have improved significantly, and she actually enjoys learning now!",
    avatar: "PS",
  },
  {
    name: "Rajesh Kumar",
    role: "Parent",
    rating: 5,
    text: "The flexibility in timings and affordable pricing made it possible for us to provide quality education to our son. Highly recommended!",
    avatar: "RK",
  },
  {
    name: "Anita Reddy",
    role: "Parent",
    rating: 5,
    text: "Our tutor is not just knowledgeable but also very caring. She goes the extra mile to ensure our kids understand every concept thoroughly.",
    avatar: "AR",
  },
  {
    name: "Suresh Patel",
    role: "Parent",
    rating: 5,
    text: "The regular progress reports and exam preparation support have been invaluable. We see consistent improvement in our children’s performance.",
    avatar: "SP",
  },
  {
    name: "Lakshmi Nair",
    role: "Parent",
    rating: 5,
    text: "Finding the right tutor was so easy through EduMatch. The matching process considers all our requirements and preferences perfectly.",
    avatar: "LN",
  },
  {
    name: "Vikram Singh",
    role: "Parent",
    rating: 5,
    text: "The tutors are professional, punctual, and passionate about teaching. Our son looks forward to every session!",
    avatar: "VS",
  },
];

export const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/40 to-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            What Parents Say
          </h2>
          <p className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto">
            Real experiences from families who have transformed their children’s education with EduMatch
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 60, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: -60, scale: 0.9, rotate: 5 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <Card className="h-full border-2 border-primary/20 bg-background/70 backdrop-blur-lg shadow-2xl hover:shadow-primary/30 transition-all duration-700 transform hover:scale-[1.02]">
                <CardContent className="p-10 space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-white text-xl font-bold mb-3">
                      {current.avatar}
                    </div>
                    <h4 className="font-semibold text-xl">{current.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {current.role}
                    </p>
                    <div className="flex justify-center gap-1 mb-4">
                      {Array.from({ length: current.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-base sm:text-lg text-muted-foreground italic leading-relaxed max-w-2xl">
                      “{current.text}”
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Dots / Pagination */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-3 w-3 rounded-full transition-all ${
                  i === index
                    ? "bg-primary scale-125 shadow-md"
                    : "bg-muted-foreground/40 hover:bg-primary/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// "use client";

// import { Card, CardContent } from '@/components/ui/card';
// import { Star, User } from 'lucide-react';
// import { motion } from 'framer-motion';

// const testimonials = [
//   {
//     name: 'Priya Sharma',
//     role: 'Parent',
//     rating: 5,
//     text: 'EduMatch helped us find an amazing tutor for my daughter. Her grades have improved significantly, and she actually enjoys learning now!',
//     avatar: 'PS'
//   },
//   {
//     name: 'Rajesh Kumar',
//     role: 'Parent',
//     rating: 5,
//     text: 'The flexibility in timings and affordable pricing made it possible for us to provide quality education to our son. Highly recommended!',
//     avatar: 'RK'
//   },
//   {
//     name: 'Anita Reddy',
//     role: 'Parent',
//     rating: 5,
//     text: 'Our tutor is not just knowledgeable but also very caring. She goes the extra mile to ensure our kids understand every concept thoroughly.',
//     avatar: 'AR'
//   },
//   {
//     name: 'Suresh Patel',
//     role: 'Parent',
//     rating: 5,
//     text: 'The regular progress reports and exam preparation support have been invaluable. We see consistent improvement in our children\'s performance.',
//     avatar: 'SP'
//   },
//   {
//     name: 'Lakshmi Nair',
//     role: 'Parent',
//     rating: 5,
//     text: 'Finding the right tutor was so easy through EduMatch. The matching process considers all our requirements and preferences perfectly.',
//     avatar: 'LN'
//   },
//   {
//     name: 'Vikram Singh',
//     role: 'Parent',
//     rating: 5,
//     text: 'The tutors are professional, punctual, and passionate about teaching. Our son looks forward to every session!',
//     avatar: 'VS'
//   }
// ];

// export const TestimonialsSection = () => {
//   return (
//     <section className="py-20 bg-muted/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Parents Say</h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Real experiences from families who have transformed their children's education with EduMatch
//             </p>
//           </motion.div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={testimonial.name}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
//                 <CardContent className="p-6 space-y-4">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
//                       {testimonial.avatar}
//                     </div>
//                     <div>
//                       <h4 className="font-semibold">{testimonial.name}</h4>
//                       <p className="text-sm text-muted-foreground">{testimonial.role}</p>
//                     </div>
//                   </div>

//                   <div className="flex gap-1">
//                     {Array.from({ length: testimonial.rating }).map((_, i) => (
//                       <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                     ))}
//                   </div>

//                   <p className="text-muted-foreground leading-relaxed">
//                     "{testimonial.text}"
//                   </p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
