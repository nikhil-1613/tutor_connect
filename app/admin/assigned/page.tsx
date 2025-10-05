"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { getParentRequests, getTutorProfiles, ParentRequest, TutorProfile } from "@/lib/localStorage";
import { MapPin, Clock, DollarSign, Phone, User, BookOpen, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

interface AssignedPair {
  request: ParentRequest;
  tutor: TutorProfile;
}

export default function AdminAssignedPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [assignedPairs, setAssignedPairs] = useState<AssignedPair[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role !== "admin") {
      toast.error("Access denied. Admin account required.");
      router.push("/");
    } else {
      loadAssignedPairs();
    }
  }, [isAuthenticated, user, router]);

  const loadAssignedPairs = () => {
    const requests = getParentRequests();
    const tutors = getTutorProfiles();

    // Only approved requests are considered assigned
    const assignedRequests = requests.filter(r => r.status === "approved");

    const pairs: AssignedPair[] = assignedRequests
      .map(request => {
        const tutor = tutors.find(t => t.userId === request.assignedTutorId);
        return tutor ? { request, tutor } : null;
      })
      .filter(Boolean) as AssignedPair[];

    setAssignedPairs(pairs);
  };

  const handleMessageParent = (request: ParentRequest, tutor: TutorProfile) => {
    const message = `Hello! This is TutorConnect.\n\nYour assigned tutor is ${tutor.name}.\n📍 Location: ${tutor.address || "N/A"}\n📞 Contact: ${tutor.phoneNumber}\n\nPlease connect to discuss further details.`;
    const whatsappUrl = `https://wa.me/${request.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleMessageTutor = (tutor: TutorProfile, request: ParentRequest) => {
    let locationUrl = "N/A";

    if (request.pinPointLocation) {
      // Remove spaces in coordinates
      const cleanedCoordinates = request.pinPointLocation.replace(/\s/g, "");
      locationUrl = `https://www.google.com/maps/search/?api=1&query=${cleanedCoordinates}`;
    }

    const message = `Hello! This is TutorConnect.\n\nYou have been assigned to ${request.fatherName} & ${request.motherName}.\n📍 Address: ${request.address || "N/A"}\n📞 Parent Contact: ${request.phoneNumber}\n🗺 Location: ${locationUrl}\n\nPlease connect to discuss further details.`;

    const whatsappUrl = `https://wa.me/${tutor.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // const handleMessageTutor = (tutor: TutorProfile, request: ParentRequest) => {
  //   const message = `Hello! This is TutorConnect.\n\nYou have been assigned to ${request.fatherName} & ${request.motherName}.\n📍 Address: ${request.address || "N/A"}\n📞 Parent Contact: ${request.phoneNumber}\n\n Location: ${request.pinPointLocation}\nPlease connect to discuss further details.`;
  //   const whatsappUrl = `https://wa.me/${tutor.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  //   window.open(whatsappUrl, "_blank");
  // };

  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Assigned Requests</h1>
            <p className="text-muted-foreground">
              Parent-Tutor pairs that have been successfully matched
            </p>
          </div>

          {assignedPairs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Assigned Pairs Yet</h3>
                <p className="text-muted-foreground">
                  Start by reviewing new requests and assigning tutors.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {assignedPairs.map((pair, index) => (
                <motion.div
                  key={pair.request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Assignment #{index + 1}</CardTitle>
                        <Badge variant="secondary">Assigned</Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Parent Info */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                              P
                            </div>
                            <div>
                              <h4 className="font-semibold">Parent</h4>
                              <p className="text-sm text-muted-foreground">
                                {pair.request.fatherName} & {pair.request.motherName}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm pl-15">
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <User className="h-4 w-4 mt-0.5" />
                              <span>{pair.request.numberOfChildren} {parseInt(pair.request.numberOfChildren) === 1 ? "child" : "children"}</span>
                            </div>
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <BookOpen className="h-4 w-4 mt-0.5" />
                              <span>{pair.request.subjects.join(", ")}</span>
                            </div>
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4 mt-0.5" />
                              <span>{pair.request.preferredTimings}</span>
                            </div>
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <DollarSign className="h-4 w-4 mt-0.5" />
                              <span>
                                ₹{pair.request.paymentMin || "N/A"} - ₹{pair.request.paymentMax || "N/A"}
                              </span>
                            </div>
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4 mt-0.5" />
                              <span>{pair.request.address}</span>
                              {pair.request.pinPointLocation && (
                                <a
                                  href={pair.request.pinPointLocation}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary ml-2 inline-flex items-center gap-1 hover:underline"
                                >
                                  View on Map <ArrowRight className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <Phone className="h-4 w-4 mt-0.5" />
                              <span>{pair.request.phoneNumber}</span>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleMessageParent(pair.request, pair.tutor)}
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Message Parent via WhatsApp
                          </Button>
                        </div>

                        {/* Tutor Info */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center text-white font-semibold">
                              T
                            </div>
                            <div>
                              <h4 className="font-semibold">Tutor</h4>
                              <p className="text-sm text-muted-foreground">{pair.tutor.name}</p>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm pl-15">
                            <div>
                              <span className="text-muted-foreground">Qualification:</span> {pair.tutor.qualification}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Age:</span> {pair.tutor.age} | <span className="text-muted-foreground">Gender:</span> {pair.tutor.gender}
                            </div>
                            {pair.tutor.hasExperience && pair.tutor.yearsOfExperience && (
                              <div>
                                <span className="text-muted-foreground">Experience:</span> {pair.tutor.yearsOfExperience} years
                              </div>
                            )}
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4 mt-0.5" />
                              <span>{pair.tutor.availableTimings}</span>
                            </div>
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <DollarSign className="h-4 w-4 mt-0.5" />
                              <span>₹{pair.tutor.expectedSalary}/month</span>
                            </div>
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4 mt-0.5" />
                              <span>{pair.tutor.address}</span>
                            </div>
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <Phone className="h-4 w-4 mt-0.5" />
                              <span>{pair.tutor.phoneNumber}</span>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleMessageTutor(pair.tutor, pair.request)}
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Message Tutor via WhatsApp
                          </Button>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
                        Matched on {new Date(pair.request.createdAt).toLocaleDateString()}
                      </div>
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

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Header } from '@/components/Header';
// import { Footer } from '@/components/Footer';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { useAuth } from '@/contexts/AuthContext';
// import { getParentRequests, getTutorProfiles, ParentRequest, TutorProfile } from '@/lib/localStorage';
// import { MapPin, Clock, DollarSign, Phone, User, BookOpen, MessageCircle, ArrowRight } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { toast } from 'react-hot-toast';

// interface AssignedPair {
//   request: ParentRequest;
//   tutor: TutorProfile;
// }

// export default function AdminAssignedPage() {
//   const router = useRouter();
//   const { user, isAuthenticated } = useAuth();
//   const [assignedPairs, setAssignedPairs] = useState<AssignedPair[]>([]);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/login');
//     } else if (user?.role !== 'admin') {
//       toast.error('Access denied. Admin account required.');
//       router.push('/');
//     } else {
//       loadAssignedPairs();
//     }
//   }, [isAuthenticated, user, router]);

//   const loadAssignedPairs = () => {
//     const requests = getParentRequests();
//     const tutors = getTutorProfiles();

//     const assignedRequests = requests.filter(r => r.status === 'assigned' || r.status === 'completed');

//     const pairs: AssignedPair[] = assignedRequests.map(request => {
//       const tutor = tutors.find(t => t.userId === request.assignedTutorId);
//       return { request, tutor: tutor! };
//     }).filter(pair => pair.tutor);

//     setAssignedPairs(pairs);
//   };

//   const handleMessageParent = (phoneNumber: string, tutorName: string) => {
//     const message = `Hello! This is TutorConnect. Your assigned tutor is ${tutorName}. Please feel free to discuss further details.`;
//     const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   const handleMessageTutor = (phoneNumber: string, parentName: string) => {
//     const message = `Hello! This is TutorConnect. You have been assigned to ${parentName}'s family. Please connect with them to discuss details.`;
//     const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   if (!isAuthenticated || user?.role !== 'admin') {
//     return null;
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-1 py-8 bg-muted/30">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold mb-2">Assigned Requests</h1>
//             <p className="text-muted-foreground">
//               Parent-Tutor pairs that have been successfully matched
//             </p>
//           </div>

//           {assignedPairs.length === 0 ? (
//             <Card>
//               <CardContent className="py-12 text-center">
//                 <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
//                 <h3 className="text-lg font-semibold mb-2">No Assigned Pairs Yet</h3>
//                 <p className="text-muted-foreground">
//                   Start by reviewing new requests and assigning tutors.
//                 </p>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="space-y-6">
//               {assignedPairs.map((pair, index) => (
//                 <motion.div
//                   key={pair.request.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.1 }}
//                 >
//                   <Card className="hover:shadow-lg transition-all">
//                     <CardHeader>
//                       <div className="flex items-center justify-between">
//                         <CardTitle className="text-xl">Assignment #{index + 1}</CardTitle>
//                         <Badge variant={pair.request.status === 'completed' ? 'default' : 'secondary'}>
//                           {pair.request.status === 'completed' ? 'Completed' : 'Assigned'}
//                         </Badge>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                         <div className="space-y-4">
//                           <div className="flex items-center gap-3">
//                             <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
//                               P
//                             </div>
//                             <div>
//                               <h4 className="font-semibold">Parent</h4>
//                               <p className="text-sm text-muted-foreground">
//                                 {pair.request.fatherName} & {pair.request.motherName}
//                               </p>
//                             </div>
//                           </div>

//                           <div className="space-y-2 text-sm pl-15">
//                             <div className="flex items-start gap-2 text-muted-foreground">
//                               <User className="h-4 w-4 mt-0.5" />
//                               <span>{pair.request.numberOfChildren} {parseInt(pair.request.numberOfChildren) === 1 ? 'child' : 'children'}</span>
//                             </div>
//                             <div className="flex items-start gap-2 text-muted-foreground">
//                               <BookOpen className="h-4 w-4 mt-0.5" />
//                               <span>{pair.request.subjects.join(', ')}</span>
//                             </div>
//                             <div className="flex items-start gap-2 text-muted-foreground">
//                               <Clock className="h-4 w-4 mt-0.5" />
//                               <span>{pair.request.preferredTimings}</span>
//                             </div>
//                             <div className="flex items-start gap-2 text-muted-foreground">
//                               <DollarSign className="h-4 w-4 mt-0.5" />
//                               <span>₹{pair.request.paymentRange}/month</span>
//                             </div>
//                             <div className="flex items-start gap-2 text-muted-foreground">
//                               <MapPin className="h-4 w-4 mt-0.5" />
//                               <span>{pair.request.address}</span>
//                             </div>
//                             <div className="flex items-start gap-2 text-muted-foreground">
//                               <Phone className="h-4 w-4 mt-0.5" />
//                               <span>{pair.request.phoneNumber}</span>
//                             </div>
//                           </div>

//                           <Button
//                             variant="outline"
//                             className="w-full"
//                             onClick={() => handleMessageParent(pair.request.phoneNumber, pair.tutor.name)}
//                           >
//                             <MessageCircle className="mr-2 h-4 w-4" />
//                             Message Parent via WhatsApp
//                           </Button>
//                         </div>

//                         <div className="space-y-4">
//                           <div className="flex items-center gap-3">
//                             <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center text-white font-semibold">
//                               T
//                             </div>
//                             <div>
//                               <h4 className="font-semibold">Tutor</h4>
//                               <p className="text-sm text-muted-foreground">{pair.tutor.name}</p>
//                             </div>
//                           </div>

//                           <div className="space-y-2 text-sm pl-15">
//                             <div>
//                               <span className="text-muted-foreground">Qualification:</span> {pair.tutor.qualification}
//                             </div>
//                             <div>
//                               <span className="text-muted-foreground">Age:</span> {pair.tutor.age} | <span className="text-muted-foreground">Gender:</span> {pair.tutor.gender}
//                             </div>
//                             {pair.tutor.hasExperience && pair.tutor.yearsOfExperience && (
//                               <div>
//                                 <span className="text-muted-foreground">Experience:</span> {pair.tutor.yearsOfExperience} years
//                               </div>
//                             )}
//                             <div className="flex items-start gap-2 text-muted-foreground">
//                               <Clock className="h-4 w-4 mt-0.5" />
//                               <span>{pair.tutor.availableTimings}</span>
//                             </div>
//                             <div className="flex items-start gap-2 text-muted-foreground">
//                               <DollarSign className="h-4 w-4 mt-0.5" />
//                               <span>₹{pair.tutor.expectedSalary}/month</span>
//                             </div>
//                             <div className="flex items-start gap-2 text-muted-foreground">
//                               <MapPin className="h-4 w-4 mt-0.5" />
//                               <span>{pair.tutor.address}</span>
//                             </div>
//                             <div className="flex items-start gap-2 text-muted-foreground">
//                               <Phone className="h-4 w-4 mt-0.5" />
//                               <span>{pair.tutor.phoneNumber}</span>
//                             </div>
//                           </div>

//                           <Button
//                             variant="outline"
//                             className="w-full"
//                             onClick={() => handleMessageTutor(pair.tutor.phoneNumber, pair.request.fatherName)}
//                           >
//                             <MessageCircle className="mr-2 h-4 w-4" />
//                             Message Tutor via WhatsApp
//                           </Button>
//                         </div>
//                       </div>

//                       <div className="mt-6 pt-6 border-t">
//                         <div className="flex items-center justify-center text-sm text-muted-foreground">
//                           <span>Matched on {new Date(pair.request.createdAt).toLocaleDateString()}</span>
//                         </div>
//                       </div>
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
