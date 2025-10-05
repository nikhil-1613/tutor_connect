"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { getTutorProfiles, TutorProfile } from "@/lib/localStorage";
import {
  User,
  Clock,
  MapPin,
  DollarSign,
  BookOpen,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function AdminNewTutorsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [tutors, setTutors] = useState<TutorProfile[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role !== "admin") {
      toast.error("Access denied. Admin account required.");
      router.push("/");
    } else {
      loadNewTutors();
    }
  }, [isAuthenticated, user, router]);

  const loadNewTutors = () => {
    const allTutors = getTutorProfiles();
    const sevenDaysAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
    const recentTutors = allTutors.filter(
      (t) => new Date(t.createdAt).getTime() > sevenDaysAgo
    );
    setTutors(recentTutors);
  };

  const handleMessageTutor = (phoneNumber: string, name: string) => {
    const message = `Welcome ${name}! Thank you for joining EduMatch. We’ll contact you soon about teaching opportunities.`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">New Tutors (Last 7 Days)</h1>
            <p className="text-muted-foreground">
              Recently registered tutors ready to start teaching.
            </p>
          </div>

          {tutors.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <UserPlus className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No New Tutors Yet</h3>
                <p className="text-muted-foreground">
                  New tutors will appear here once they register.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {tutors.map((tutor, index) => (
                <motion.div
                  key={tutor.userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-all border-2 hover:border-primary/50">
                    <CardHeader className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">
                        {tutor.name}
                      </CardTitle>
                      <Badge variant="outline">New</Badge>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>
                          {tutor.gender}, {tutor.age} yrs
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{tutor.qualification}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{tutor.availableTimings}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>₹{tutor.expectedSalary}/month</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{tutor.address}</span>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full mt-3"
                        onClick={() =>
                          handleMessageTutor(tutor.phoneNumber, tutor.name)
                        }
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Message Tutor via WhatsApp
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
