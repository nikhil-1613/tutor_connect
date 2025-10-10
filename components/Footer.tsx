"use client";

import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              {/* <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-black rounded-lg shadow-xl p-2"> */}
              <span className="text-2xl  font-bold bg-clip-text dark:text-white text-black rounded-lg p-2">
                TutorConnect
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting quality tutors with students for a brighter educational future.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Users</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tutor/form" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Join as Tutor
                </Link>
              </li>
              <li>
                <Link href="/parent/form" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Find a Tutor
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <span>support@edumatch.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>Hyderabad, Telangana, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TutorConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
