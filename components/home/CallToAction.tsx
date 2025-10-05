"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Header } from "../Header";

export const CallToAction = () => {
  return (
    
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32 px-4 sm:px-8 lg:px-20 my-16 sm:my-20 lg:my-24 mx-3 sm:mx-6 lg:mx-16 rounded-3xl bg-gradient-to-br from-primary via-purple-600 to-secondary text-primary-foreground shadow-2xl">
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent_70%)]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating glowing shapes */}
      <motion.div
        className="absolute -top-32 left-16 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-white/10 rounded-full blur-3xl"
        animate={{
          y: [0, 40, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[20rem] sm:w-[24rem] md:w-[28rem] h-[20rem] sm:h-[24rem] md:h-[28rem] bg-white/10 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Content */}
      <div className="relative container mx-auto text-center max-w-3xl sm:max-w-4xl">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent drop-shadow-md"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          Empower Your Child’s Learning Journey
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Discover passionate, qualified tutors who make learning engaging,
          affordable, and tailored to your child’s needs.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/login">
            <Button
              size="lg"
              variant="secondary"
              className="group px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <Link href="/learnmore" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/50 text-primary text-base font-bold hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Animated bottom gradient line */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        viewport={{ once: true }}
      />
    </section>
  );
};

// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";

// export const CallToAction = () => {
//   return (
//     <section className="relative overflow-hidden py-32 px-6 sm:px-10 lg:px-20 my-24 mx-4 sm:mx-8 lg:mx-16 rounded-3xl bg-gradient-to-br from-primary via-purple-600 to-secondary text-primary-foreground shadow-2xl">
//       {/* Animated Gradient Overlay */}
//       <motion.div
//         className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent_70%)]"
//         animate={{
//           backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* Floating glowing shapes */}
//       <motion.div
//         className="absolute -top-32 left-16 w-96 h-96 bg-white/10 rounded-full blur-3xl"
//         animate={{
//           y: [0, 40, 0],
//           opacity: [0.4, 0.7, 0.4],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] bg-white/10 rounded-full blur-3xl"
//         animate={{
//           y: [0, -30, 0],
//           opacity: [0.4, 0.8, 0.4],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 1,
//         }}
//       />

//       {/* Content */}
//       <div className="relative container mx-auto text-center max-w-4xl">
//         <motion.h2
//           className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent drop-shadow-md"
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           viewport={{ once: true }}
//         >
//           Empower Your Child’s Learning Journey
//         </motion.h2>

//         <motion.p
//           className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.3 }}
//           viewport={{ once: true }}
//         >
//           Discover passionate, qualified tutors who make learning engaging,
//           affordable, and tailored to your child’s needs.
//         </motion.p>

//         <motion.div
//           className="flex flex-col sm:flex-row justify-center items-center gap-4"
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <Link href="/signup">
//             <Button
//               size="lg"
//               variant="secondary"
//               className="group px-8 py-6 text-lg font-semibold bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               Get Started Now
//               <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//             </Button>
//           </Link>

//           <Link href="/learn-more">
//             <Button
//               size="lg"
//               variant="outline"
//               className="border-white/50 text-white hover:bg-white/10 transition-all duration-300"
//             >
//               Learn More
//             </Button>
//           </Link>
//         </motion.div>
//       </div>

//       {/* Animated bottom gradient line */}
//       <motion.div
//         className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
//         initial={{ opacity: 0, scaleX: 0 }}
//         whileInView={{ opacity: 1, scaleX: 1 }}
//         transition={{ duration: 1.4, ease: "easeInOut" }}
//         viewport={{ once: true }}
//       />
//     </section>
//   );
// };

// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";

// export const CallToAction = () => {
//   return (
//     <section className="relative overflow-hidden py-32 px-4 sm:px-6 lg:px-8 my-16 rounded-3xl bg-gradient-to-br from-primary via-purple-600 to-secondary text-primary-foreground shadow-2xl">
//       {/* Animated Gradient Overlay */}
//       <motion.div
//         className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2),transparent_70%)]"
//         animate={{
//           backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* Floating glowing shapes */}
//       <motion.div
//         className="absolute -top-32 left-16 w-96 h-96 bg-white/10 rounded-full blur-3xl"
//         animate={{
//           y: [0, 40, 0],
//           opacity: [0.4, 0.7, 0.4],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] bg-white/10 rounded-full blur-3xl"
//         animate={{
//           y: [0, -30, 0],
//           opacity: [0.4, 0.8, 0.4],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 1,
//         }}
//       />

//       {/* Content */}
//       <div className="relative container mx-auto text-center max-w-4xl">
//         <motion.h2
//           className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent drop-shadow-md"
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           viewport={{ once: true }}
//         >
//           Empower Your Child’s Learning Journey
//         </motion.h2>

//         <motion.p
//           className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.3 }}
//           viewport={{ once: true }}
//         >
//           Discover passionate, qualified tutors who make learning engaging,
//           affordable, and tailored to your child’s needs.
//         </motion.p>

//         <motion.div
//           className="flex flex-col sm:flex-row justify-center items-center gap-4"
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.5 }}
//           viewport={{ once: true }}
//         >
//           <Link href="/signup">
//             <Button
//               size="lg"
//               variant="secondary"
//               className="group p-4 text-lg font-semibold bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               Get Started Now
//               <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//             </Button>
//           </Link>

//           <Link href="/learn-more">
//             <Button
//               size="lg"
//               variant="outline"
//               className="border-white/50 text-white hover:bg-white/10 transition-all duration-300"
//             >
//               Learn More
//             </Button>
//           </Link>
//         </motion.div>
//       </div>

//       {/* Animated bottom gradient line */}
//       <motion.div
//         className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
//         initial={{ opacity: 0, scaleX: 0 }}
//         whileInView={{ opacity: 1, scaleX: 1 }}
//         transition={{ duration: 1.4, ease: "easeInOut" }}
//         viewport={{ once: true }}
//       />
//     </section>
//   );
// };

// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";

// export const CallToAction = () => {
//   return (
//     <section className="relative overflow-hidden py-28 bg-gradient-to-br from-primary via-purple-600 to-secondary text-primary-foreground">
//       {/* Soft overlay for added depth */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent_70%)]" />

//       {/* Floating subtle shapes */}
//       <motion.div
//         className="absolute -top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
//         initial={{ opacity: 0, scale: 0.8 }}
//         whileInView={{ opacity: 0.8, scale: 1 }}
//         transition={{ duration: 1 }}
//         viewport={{ once: true }}
//       />
//       <motion.div
//         className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
//         initial={{ opacity: 0, scale: 0.8 }}
//         whileInView={{ opacity: 0.8, scale: 1 }}
//         transition={{ duration: 1, delay: 0.4 }}
//         viewport={{ once: true }}
//       />

//       {/* Content */}
//       <div className="relative container mx-auto px-6 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           viewport={{ once: true }}
//           className="max-w-3xl mx-auto"
//         >
//           <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent drop-shadow-md">
//             Empower Your Child’s Learning Journey
//           </h2>

//           <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
//             Discover passionate, qualified tutors who make learning engaging, affordable, and tailored to your child’s needs.
//           </p>

//           <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
//             <Link href="/signup">
//               <Button
//                 size="lg"
//                 variant="secondary"
//                 className="group px-8 py-6 text-lg font-semibold bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 Get Started Now
//                 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//               </Button>
//             </Link>

//             <Link href="/learn-more">
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-white/50 text-white hover:bg-white/10 transition-all duration-300"
//               >
//                 Learn More
//               </Button>
//             </Link>
//           </div>
//         </motion.div>
//       </div>

//       {/* Animated gradient border ring (for motion feel) */}
//       <motion.div
//         className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
//         initial={{ opacity: 0, scaleX: 0 }}
//         whileInView={{ opacity: 1, scaleX: 1 }}
//         transition={{ duration: 1.2, ease: "easeInOut" }}
//         viewport={{ once: true }}
//       />
//     </section>
//   );
// };

// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";

// export const CallToAction = () => {
//   return (
//     <section className="relative py-24 bg-gradient-to-r from-primary to-secondary text-primary-foreground overflow-hidden">
//       {/* Subtle overlay for depth */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

//       <div className="container relative mx-auto px-4 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="max-w-3xl mx-auto"
//         >
//           {/* Section Title */}
//           <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 leading-tight">
//             Find the Perfect Tutor for Your Child Today!
//           </h2>

//           {/* Supporting Paragraph */}
//           <p className="text-base md:text-lg lg:text-xl text-primary-foreground/90 mb-10">
//             Join thousands of parents and students who trust us to match them
//             with the best tutors — personalized, verified, and affordable.
//           </p>

//           {/* CTA Button */}
//           <Link href="/signup">
//             <Button
//               size="lg"
//               variant="secondary"
//               className="group transition-all hover:scale-105 shadow-lg hover:shadow-xl px-8 py-6 text-lg font-semibold"
//             >
//               Get Started Now
//               <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//             </Button>
//           </Link>
//         </motion.div>
//       </div>

//       {/* Decorative blurred shapes */}
//       <motion.div
//         className="absolute -bottom-10 left-1/2 w-72 h-72 bg-white/10 rounded-full blur-3xl"
//         initial={{ opacity: 0, scale: 0.8 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1 }}
//         viewport={{ once: true }}
//       />
//       <motion.div
//         className="absolute top-10 right-1/4 w-48 h-48 bg-white/20 rounded-full blur-2xl"
//         initial={{ opacity: 0, scale: 0.8 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1, delay: 0.3 }}
//         viewport={{ once: true }}
//       />
//     </section>
//   );
// };

// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";

// export const CallToAction = () => {
//   return (
//     <section className="relative py-20 bg-gradient-to-r from-primary to-orange-500 text-primary-foreground overflow-hidden">
//       {/* Subtle gradient overlay for depth */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

//       <div className="container relative mx-auto px-4 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="max-w-3xl mx-auto"
//         >
//           <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
//             Find the Right Tutor for Your Child Today!
//           </h2>
//           <p className="text-lg md:text-xl mb-8 opacity-90">
//             Join thousands of satisfied parents and students who have already started their learning journey.
//           </p>

//           <Link href="/signup">
//             <Button
//               size="lg"
//               variant="secondary"
//               className="group transition-all hover:scale-105 shadow-lg hover:shadow-xl"
//             >
//               Get Started Now
//               <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//             </Button>
//           </Link>
//         </motion.div>
//       </div>

//       {/* Decorative shapes */}
//       <motion.div
//         className="absolute -bottom-10 left-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"
//         initial={{ opacity: 0, scale: 0.8 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1 }}
//         viewport={{ once: true }}
//       />
//       <motion.div
//         className="absolute top-10 right-1/4 w-40 h-40 bg-white/20 rounded-full blur-2xl"
//         initial={{ opacity: 0, scale: 0.8 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1, delay: 0.3 }}
//         viewport={{ once: true }}
//       />
//     </section>
//   );
// };
