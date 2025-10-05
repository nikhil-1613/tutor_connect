"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { getTutorProfiles, updateTutorProfile, TutorProfile } from "@/lib/localStorage";
import {
  User,
  Clock,
  MapPin,
  DollarSign,
  BookOpen,
  MessageCircle,
  Users,
  MoreVertical,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function AdminTutorsPage() {
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
      loadTutors();
    }
  }, [isAuthenticated, user, router]);

  const loadTutors = () => {
    const allTutors = getTutorProfiles();
    setTutors(allTutors);
  };

  const handleMessageTutor = (phoneNumber: string, name: string) => {
    const message = `Hello ${name}, this is EduMatch Admin. We’d like to discuss tutoring opportunities with you.`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    toast.success(`WhatsApp message opened for ${name}`);
  };

  const handleToggleAssigned = (tutor: TutorProfile) => {
    updateTutorProfile(tutor.userId, { assigned: !tutor.assigned });
    toast.success(`${tutor.name} is now ${tutor.assigned ? "Available" : "Assigned"}`);
    loadTutors();
  };

  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">All Tutors</h1>
            <p className="text-muted-foreground">
              Browse and manage all tutor profiles.
            </p>
          </div>

          {tutors.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">
                  No Tutor Profiles Found
                </h3>
                <p className="text-muted-foreground">
                  Tutors will appear here once they register.
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
                  <Card className="hover:shadow-lg transition-all border-2 hover:border-primary/50 relative">
                    {/* 3-dot menu */}
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-1">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleMessageTutor(tutor.phoneNumber, tutor.name)}>
                            Message via WhatsApp
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleAssigned(tutor)}>
                            Mark as {tutor.assigned ? "Available" : "Assigned"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <CardHeader className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">
                        {tutor.name}
                      </CardTitle>
                      <Badge variant={tutor.assigned ? "default" : "secondary"}>
                        {tutor.assigned ? "Assigned" : "Available"}
                      </Badge>
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

                      {tutor.hasExperience && (
                        <div className="text-sm text-muted-foreground">
                          Experience: {tutor.yearsOfExperience} years
                        </div>
                      )}

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

// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useAuth } from "@/contexts/AuthContext";
// import { getTutorProfiles, TutorProfile } from "@/lib/localStorage";
// import {
//   User,
//   Clock,
//   MapPin,
//   DollarSign,
//   BookOpen,
//   MessageCircle,
//   Users,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";

// export default function AdminTutorsPage() {
//   const router = useRouter();
//   const { user, isAuthenticated } = useAuth();
//   const [tutors, setTutors] = useState<TutorProfile[]>([]);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/login");
//     } else if (user?.role !== "admin") {
//       toast.error("Access denied. Admin account required.");
//       router.push("/");
//     } else {
//       loadTutors();
//     }
//   }, [isAuthenticated, user, router]);

//   const loadTutors = () => {
//     const allTutors = getTutorProfiles();
//     setTutors(allTutors);
//   };

//   const handleMessageTutor = (phoneNumber: string, name: string) => {
//     const message = `Hello ${name}, this is EduMatch Admin. We’d like to discuss tutoring opportunities with you.`;
//     const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   if (!isAuthenticated || user?.role !== "admin") return null;

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-1 py-8 bg-muted/30">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold mb-2">All Tutors</h1>
//             <p className="text-muted-foreground">
//               Browse and manage all tutor profiles.
//             </p>
//           </div>

//           {tutors.length === 0 ? (
//             <Card>
//               <CardContent className="py-12 text-center">
//                 <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
//                 <h3 className="text-lg font-semibold mb-2">
//                   No Tutor Profiles Found
//                 </h3>
//                 <p className="text-muted-foreground">
//                   Tutors will appear here once they register.
//                 </p>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {tutors.map((tutor, index) => (
//                 <motion.div
//                   key={tutor.userId}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                 >
//                   <Card className="hover:shadow-lg transition-all border-2 hover:border-primary/50">
//                     <CardHeader className="flex items-center justify-between">
//                       <CardTitle className="text-lg font-semibold">
//                         {tutor.name}
//                       </CardTitle>
//                       <Badge variant={tutor.assigned ? "default" : "secondary"}>
//                         {tutor.assigned ? "Assigned" : "Available"}
//                       </Badge>
//                     </CardHeader>

//                     <CardContent className="space-y-3">
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <User className="h-4 w-4" />
//                         <span>
//                           {tutor.gender}, {tutor.age} yrs
//                         </span>
//                       </div>

//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <BookOpen className="h-4 w-4" />
//                         <span>{tutor.qualification}</span>
//                       </div>

//                       {tutor.hasExperience && (
//                         <div className="text-sm text-muted-foreground">
//                           Experience: {tutor.yearsOfExperience} years
//                         </div>
//                       )}

//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <Clock className="h-4 w-4" />
//                         <span>{tutor.availableTimings}</span>
//                       </div>

//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <DollarSign className="h-4 w-4" />
//                         <span>₹{tutor.expectedSalary}/month</span>
//                       </div>

//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <MapPin className="h-4 w-4" />
//                         <span>{tutor.address}</span>
//                       </div>

//                       <Button
//                         variant="outline"
//                         className="w-full mt-3"
//                         onClick={() =>
//                           handleMessageTutor(tutor.phoneNumber, tutor.name)
//                         }
//                       >
//                         <MessageCircle className="mr-2 h-4 w-4" />
//                         Message Tutor via WhatsApp
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }