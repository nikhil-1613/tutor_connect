"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { QuotesSection } from '@/components/home/QuotesSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { HowItWorks } from '@/components/home/HowitWorks';
import { CallToAction } from '@/components/home/CallToAction';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WhyChooseUsSection />
        <HowItWorks />
        <QuotesSection />
        <TestimonialsSection />
        <CallToAction/>
      </main>
      <Footer />
    </div>
  );
}
