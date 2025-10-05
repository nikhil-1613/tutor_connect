"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { addParentRequest, ParentRequest } from "@/lib/localStorage";
import { CircleCheck as CheckCircle2, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const subjects = [
  "Telugu",
  "Hindi",
  "English",
  "Mathematics",
  "Physics",
  "Science",
  "Social",
];

export default function ParentFormPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fatherName: "",
    motherName: "",
    numberOfChildren: "",
    syllabus: "",
    subjects: [] as string[],
    preferredGender: "",
    address: "",
    pinPointLocation: "",
    preferredTimings: "",
    paymentMin: "",
    paymentMax: "",
    paymentDependsOnDemo: "",
    phoneNumber: "",
    additionalRequirements: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role !== "parent") {
      toast.error("Access denied. Parent account required.");
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  const handleSubjectToggle = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  // 🧭 Fetch and autofill user's location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setFormData((prev) => ({
          ...prev,
          pinPointLocation: `${latitude}, ${longitude}`,
        }));
        window.open(locationLink, "_blank");
        toast.success("Location added successfully!");
      },
      (err) => {
        toast.error("Failed to get location. Please enable GPS or try manually.");
        console.error(err);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.subjects.length === 0) {
      toast.error("Please select at least one subject");
      return;
    }

    setIsLoading(true);

    const parentRequest: ParentRequest = {
      id: `req-${Date.now()}`,
      userId: user?.id || "",
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      numberOfChildren: formData.numberOfChildren,
      syllabus: formData.syllabus,
      subjects: formData.subjects,
      preferredGender: formData.preferredGender,
      address: formData.address,
      preferredTimings: formData.preferredTimings,
      phoneNumber: formData.phoneNumber,
      additionalRequirements: formData.additionalRequirements || undefined,
      status: "pending",
      createdAt: new Date().toISOString(),
      pinPointLocation: formData.pinPointLocation || undefined,
      paymentMin: formData.paymentMin,
      paymentMax: formData.paymentMax,
      paymentDependsOnDemo: formData.paymentDependsOnDemo,
    };

    addParentRequest(parentRequest);
    toast.success("Request submitted successfully!");
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (!isAuthenticated || user?.role !== "parent") {
    return null;
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12 bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 dark:from-teal-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto text-center"
            >
              <Card className="shadow-xl">
                <CardContent className="pt-12 pb-8">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    Request Submitted!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your request. Our admin team will review your
                    requirements and suggest suitable tutors shortly.
                  </p>
                  <Button
                    onClick={() => router.push("/")}
                    className="w-full bg-gradient-primary text-white"
                  >
                    Back to Home
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 dark:from-teal-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl">Find a Tutor</CardTitle>
                <CardDescription>
                  Tell us about your requirements and we'll match you with the
                  perfect tutor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Parent Names */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fatherName">Father's Name *</Label>
                      <Input
                        id="fatherName"
                        value={formData.fatherName}
                        onChange={(e) =>
                          setFormData({ ...formData, fatherName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motherName">Mother's Name *</Label>
                      <Input
                        id="motherName"
                        value={formData.motherName}
                        onChange={(e) =>
                          setFormData({ ...formData, motherName: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Children & Syllabus */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="children">Number of Children *</Label>
                      <Input
                        id="children"
                        type="number"
                        min="1"
                        value={formData.numberOfChildren}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            numberOfChildren: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="syllabus">Syllabus *</Label>
                      <Select
                        value={formData.syllabus}
                        onValueChange={(value) =>
                          setFormData({ ...formData, syllabus: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select syllabus" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CCE">CCE</SelectItem>
                          <SelectItem value="CBSE">CBSE</SelectItem>
                          <SelectItem value="ICSE">ICSE</SelectItem>
                          <SelectItem value="State Board">
                            State Board
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="space-y-3">
                    <Label>Subjects Required *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {subjects.map((subject) => (
                        <div
                          key={subject}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={subject}
                            checked={formData.subjects.includes(subject)}
                            onCheckedChange={() => handleSubjectToggle(subject)}
                          />
                          <Label
                            htmlFor={subject}
                            className="cursor-pointer text-sm font-normal"
                          >
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label htmlFor="preferredGender">
                      Preferred Tutor Gender *
                    </Label>
                    <Select
                      value={formData.preferredGender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, preferredGender: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="any">No Preference</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      required
                      rows={3}
                    />
                  </div>

                  {/* Pin Point Location */}
                  <div className="space-y-2">
                    <Label htmlFor="pinPointLocation">
                      Pin Point Location (Google Maps or Coordinates)
                    </Label>
                    <div className="flex gap-3">
                      <Input
                        id="pinPointLocation"
                        placeholder="Paste link or will auto-fill after location access"
                        value={formData.pinPointLocation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pinPointLocation: e.target.value,
                          })
                        }
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleUseCurrentLocation}
                      >
                        <MapPin className="h-4 w-4 mr-2" /> Use Current
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Click “Use Current” to detect and fill your coordinates automatically.
                    </p>
                  </div>

                  {/* Timings & Payment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timings">Preferred Timings *</Label>
                      <Input
                        id="timings"
                        placeholder="e.g., 4 PM - 6 PM, Weekdays"
                        value={formData.preferredTimings}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferredTimings: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <Label>Payment Range (per month) *</Label>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">
                            Min ₹
                          </Label>
                          <Input
                            type="number"
                            value={formData.paymentMin}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                paymentMin: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">
                            Max ₹
                          </Label>
                          <Input
                            type="number"
                            value={formData.paymentMax}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                paymentMax: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">
                            Demo ₹
                          </Label>
                          <Input
                            type="number"
                            value={formData.paymentDependsOnDemo}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                paymentDependsOnDemo: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Additional */}
                  <div className="space-y-2">
                    <Label htmlFor="additional">
                      Additional Requirements (Optional)
                    </Label>
                    <Textarea
                      id="additional"
                      placeholder="Any specific requirements or preferences..."
                      value={formData.additionalRequirements}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          additionalRequirements: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit Request"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useAuth } from "@/contexts/AuthContext";
// import { addParentRequest, ParentRequest } from "@/lib/localStorage";
// import { CircleCheck as CheckCircle2 } from "lucide-react";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";

// const subjects = [
//   "Telugu",
//   "Hindi",
//   "English",
//   "Mathematics",
//   "Physics",
//   "Science",
//   "Social",
// ];

// export default function ParentFormPage() {
//   const router = useRouter();
//   const { user, isAuthenticated } = useAuth();
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     fatherName: "",
//     motherName: "",
//     numberOfChildren: "",
//     syllabus: "",
//     subjects: [] as string[],
//     preferredGender: "",
//     address: "",
//     pinPointLocation: "",
//     preferredTimings: "",
//     paymentMin: "",
//     paymentMax: "",
//     paymentDependsOnDemo: "",
//     phoneNumber: "",
//     additionalRequirements: "",
//   });

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/login");
//     } else if (user?.role !== "parent") {
//       toast.error("Access denied. Parent account required.");
//       router.push("/");
//     }
//   }, [isAuthenticated, user, router]);

//   const handleSubjectToggle = (subject: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       subjects: prev.subjects.includes(subject)
//         ? prev.subjects.filter((s) => s !== subject)
//         : [...prev.subjects, subject],
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.subjects.length === 0) {
//       toast.error("Please select at least one subject");
//       return;
//     }

//     setIsLoading(true);

//     const paymentRange = `Min: ₹${formData.paymentMin || "N/A"}, Max: ₹${
//       formData.paymentMax || "N/A"
//     }, Depends on Demo: ₹${formData.paymentDependsOnDemo || "N/A"}`;

//     const parentRequest: ParentRequest = {
//       id: `req-${Date.now()}`,
//       userId: user?.id || "",
//       fatherName: formData.fatherName,
//       motherName: formData.motherName,
//       numberOfChildren: formData.numberOfChildren,
//       syllabus: formData.syllabus,
//       subjects: formData.subjects,
//       preferredGender: formData.preferredGender,
//       address: formData.address,
//       preferredTimings: formData.preferredTimings,
//       phoneNumber: formData.phoneNumber,
//       additionalRequirements: formData.additionalRequirements || undefined,
//       status: "pending",
//       createdAt: new Date().toISOString(),
//       pinPointLocation: formData.pinPointLocation || undefined,
//     };

//     addParentRequest(parentRequest);
//     toast.success("Request submitted successfully!");
//     setIsLoading(false);
//     setIsSubmitted(true);
//   };

//   if (!isAuthenticated || user?.role !== "parent") {
//     return null;
//   }

//   if (isSubmitted) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <main className="flex-1 py-12 bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 dark:from-teal-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className="max-w-md mx-auto text-center"
//             >
//               <Card className="shadow-xl">
//                 <CardContent className="pt-12 pb-8">
//                   <div className="flex justify-center mb-6">
//                     <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
//                       <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
//                     </div>
//                   </div>
//                   <h2 className="text-2xl font-bold mb-4">
//                     Request Submitted!
//                   </h2>
//                   <p className="text-muted-foreground mb-6">
//                     Thank you for your request. Our admin team will review your
//                     requirements and suggest suitable tutors shortly.
//                   </p>
//                   <Button
//                     onClick={() => router.push("/")}
//                     className="w-full bg-gradient-primary text-white"
//                   >
//                     Back to Home
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-1 py-12 bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 dark:from-teal-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="max-w-3xl mx-auto"
//           >
//             <Card className="shadow-xl">
//               <CardHeader>
//                 <CardTitle className="text-3xl">Find a Tutor</CardTitle>
//                 <CardDescription>
//                   Tell us about your requirements and we'll match you with the
//                   perfect tutor
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {/* Parent Names */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="fatherName">Father's Name *</Label>
//                       <Input
//                         id="fatherName"
//                         value={formData.fatherName}
//                         onChange={(e) =>
//                           setFormData({ ...formData, fatherName: e.target.value })
//                         }
//                         required
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="motherName">Mother's Name *</Label>
//                       <Input
//                         id="motherName"
//                         value={formData.motherName}
//                         onChange={(e) =>
//                           setFormData({ ...formData, motherName: e.target.value })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Children & Syllabus */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="children">Number of Children *</Label>
//                       <Input
//                         id="children"
//                         type="number"
//                         min="1"
//                         value={formData.numberOfChildren}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             numberOfChildren: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="syllabus">Syllabus *</Label>
//                       <Select
//                         value={formData.syllabus}
//                         onValueChange={(value) =>
//                           setFormData({ ...formData, syllabus: value })
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select syllabus" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="CCE">CCE</SelectItem>
//                           <SelectItem value="CBSE">CBSE</SelectItem>
//                           <SelectItem value="ICSE">ICSE</SelectItem>
//                           <SelectItem value="State Board">
//                             State Board
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   {/* Subjects */}
//                   <div className="space-y-3">
//                     <Label>Subjects Required *</Label>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                       {subjects.map((subject) => (
//                         <div
//                           key={subject}
//                           className="flex items-center space-x-2"
//                         >
//                           <Checkbox
//                             id={subject}
//                             checked={formData.subjects.includes(subject)}
//                             onCheckedChange={() => handleSubjectToggle(subject)}
//                           />
//                           <Label
//                             htmlFor={subject}
//                             className="cursor-pointer text-sm font-normal"
//                           >
//                             {subject}
//                           </Label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Gender */}
//                   <div className="space-y-2">
//                     <Label htmlFor="preferredGender">
//                       Preferred Tutor Gender *
//                     </Label>
//                     <Select
//                       value={formData.preferredGender}
//                       onValueChange={(value) =>
//                         setFormData({ ...formData, preferredGender: value })
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select preference" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="male">Male</SelectItem>
//                         <SelectItem value="female">Female</SelectItem>
//                         <SelectItem value="any">No Preference</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {/* Address */}
//                   <div className="space-y-2">
//                     <Label htmlFor="address">Address *</Label>
//                     <Textarea
//                       id="address"
//                       placeholder="Enter your complete address"
//                       value={formData.address}
//                       onChange={(e) =>
//                         setFormData({ ...formData, address: e.target.value })
//                       }
//                       required
//                       rows={3}
//                     />
//                   </div>

//                   {/* Pin Point Location */}
//                   <div className="space-y-2">
//                     <Label htmlFor="pinPointLocation">
//                       Pin Point Location (Google Maps Link or Description)
//                     </Label>
//                     <Input
//                       id="pinPointLocation"
//                       placeholder="Paste your Google Maps link or describe nearby landmarks"
//                       value={formData.pinPointLocation}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           pinPointLocation: e.target.value,
//                         })
//                       }
//                     />
//                   </div>

//                   {/* Timings */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="timings">Preferred Timings *</Label>
//                       <Input
//                         id="timings"
//                         placeholder="e.g., 4 PM - 6 PM, Weekdays"
//                         value={formData.preferredTimings}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             preferredTimings: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>

//                     {/* Payment Fields */}
//                     <div className="space-y-2">
//                       <Label>Payment Range (per month) *</Label>
//                       <div className="grid grid-cols-3 gap-3">
//                         <Input
//                           placeholder="Min ₹"
//                           type="number"
//                           value={formData.paymentMin}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               paymentMin: e.target.value,
//                             })
//                           }
//                           required
//                         />
//                         <Input
//                           placeholder="Max ₹"
//                           type="number"
//                           value={formData.paymentMax}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               paymentMax: e.target.value,
//                             })
//                           }
//                           required
//                         />
//                         <Input
//                           placeholder="Demo ₹"
//                           type="number"
//                           value={formData.paymentDependsOnDemo}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               paymentDependsOnDemo: e.target.value,
//                             })
//                           }
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Phone */}
//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone Number *</Label>
//                     <Input
//                       id="phone"
//                       type="tel"
//                       placeholder="+91 98765 43210"
//                       value={formData.phoneNumber}
//                       onChange={(e) =>
//                         setFormData({ ...formData, phoneNumber: e.target.value })
//                       }
//                       required
//                     />
//                   </div>

//                   {/* Additional */}
//                   <div className="space-y-2">
//                     <Label htmlFor="additional">
//                       Additional Requirements (Optional)
//                     </Label>
//                     <Textarea
//                       id="additional"
//                       placeholder="Any specific requirements or preferences..."
//                       value={formData.additionalRequirements}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           additionalRequirements: e.target.value,
//                         })
//                       }
//                       rows={3}
//                     />
//                   </div>

//                   {/* Submit */}
//                   <div className="pt-4">
//                     <Button
//                       type="submit"
//                       className="w-full bg-gradient-primary text-white"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? "Submitting..." : "Submit Request"}
//                     </Button>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );

// "use client";

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Header } from '@/components/Header';
// import { Footer } from '@/components/Footer';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
// import { useAuth } from '@/contexts/AuthContext';
// import { addParentRequest, ParentRequest } from '@/lib/localStorage';
// import { CircleCheck as CheckCircle2 } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { toast } from 'react-hot-toast';

// const subjects = ['Telugu', 'Hindi', 'English', 'Mathematics', 'Physics', 'Science', 'Social'];

// export default function ParentFormPage() {
//   const router = useRouter();
//   const { user, isAuthenticated } = useAuth();
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     fatherName: '',
//     motherName: '',
//     numberOfChildren: '',
//     syllabus: '',
//     subjects: [] as string[],
//     preferredGender: '',
//     address: '',
//     preferredTimings: '',
//     paymentRange: '',
//     phoneNumber: '',
//     additionalRequirements: ''
//   });

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/login');
//     } else if (user?.role !== 'parent') {
//       toast.error('Access denied. Parent account required.');
//       router.push('/');
//     }
//   }, [isAuthenticated, user, router]);

//   const handleSubjectToggle = (subject: string) => {
//     setFormData(prev => ({
//       ...prev,
//       subjects: prev.subjects.includes(subject)
//         ? prev.subjects.filter(s => s !== subject)
//         : [...prev.subjects, subject]
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.subjects.length === 0) {
//       toast.error('Please select at least one subject');
//       return;
//     }

//     setIsLoading(true);

//     const parentRequest: ParentRequest = {
//       id: `req-${Date.now()}`,
//       userId: user?.id || '',
//       fatherName: formData.fatherName,
//       motherName: formData.motherName,
//       numberOfChildren: formData.numberOfChildren,
//       syllabus: formData.syllabus,
//       subjects: formData.subjects,
//       preferredGender: formData.preferredGender,
//       address: formData.address,
//       preferredTimings: formData.preferredTimings,
//       paymentRange: formData.paymentRange,
//       phoneNumber: formData.phoneNumber,
//       additionalRequirements: formData.additionalRequirements || undefined,
//       status: 'pending',
//       createdAt: new Date().toISOString()
//     };

//     addParentRequest(parentRequest);
//     toast.success('Request submitted successfully!');
//     setIsLoading(false);
//     setIsSubmitted(true);
//   };

//   if (!isAuthenticated || user?.role !== 'parent') {
//     return null;
//   }

//   if (isSubmitted) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <main className="flex-1 py-12 bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 dark:from-teal-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className="max-w-md mx-auto text-center"
//             >
//               <Card className="shadow-xl">
//                 <CardContent className="pt-12 pb-8">
//                   <div className="flex justify-center mb-6">
//                     <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
//                       <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
//                     </div>
//                   </div>
//                   <h2 className="text-2xl font-bold mb-4">Request Submitted!</h2>
//                   <p className="text-muted-foreground mb-6">
//                     Thank you for your request. Our admin team will review your requirements and suggest suitable tutors shortly.
//                   </p>
//                   <Button onClick={() => router.push('/')} className="w-full bg-gradient-primary text-white">
//                     Back to Home
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-1 py-12 bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 dark:from-teal-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="max-w-3xl mx-auto"
//           >
//             <Card className="shadow-xl">
//               <CardHeader>
//                 <CardTitle className="text-3xl">Find a Tutor</CardTitle>
//                 <CardDescription>
//                   Tell us about your requirements and we'll match you with the perfect tutor
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="fatherName">Father's Name *</Label>
//                       <Input
//                         id="fatherName"
//                         value={formData.fatherName}
//                         onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
//                         required
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="motherName">Mother's Name *</Label>
//                       <Input
//                         id="motherName"
//                         value={formData.motherName}
//                         onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="children">Number of Children *</Label>
//                       <Input
//                         id="children"
//                         type="number"
//                         min="1"
//                         value={formData.numberOfChildren}
//                         onChange={(e) => setFormData({ ...formData, numberOfChildren: e.target.value })}
//                         required
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="syllabus">Syllabus *</Label>
//                       <Select value={formData.syllabus} onValueChange={(value) => setFormData({ ...formData, syllabus: value })}>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select syllabus" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="CCE">CCE</SelectItem>
//                           <SelectItem value="CBSE">CBSE</SelectItem>
//                           <SelectItem value="ICSE">ICSE</SelectItem>
//                           <SelectItem value="State Board">State Board</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <Label>Subjects Required *</Label>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                       {subjects.map((subject) => (
//                         <div key={subject} className="flex items-center space-x-2">
//                           <Checkbox
//                             id={subject}
//                             checked={formData.subjects.includes(subject)}
//                             onCheckedChange={() => handleSubjectToggle(subject)}
//                           />
//                           <Label
//                             htmlFor={subject}
//                             className="cursor-pointer text-sm font-normal"
//                           >
//                             {subject}
//                           </Label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="preferredGender">Preferred Tutor Gender *</Label>
//                     <Select value={formData.preferredGender} onValueChange={(value) => setFormData({ ...formData, preferredGender: value })}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select preference" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="male">Male</SelectItem>
//                         <SelectItem value="female">Female</SelectItem>
//                         <SelectItem value="any">No Preference</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="address">Address *</Label>
//                     <Textarea
//                       id="address"
//                       placeholder="Enter your complete address"
//                       value={formData.address}
//                       onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                       required
//                       rows={3}
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="timings">Preferred Timings *</Label>
//                       <Input
//                         id="timings"
//                         placeholder="e.g., 4 PM - 6 PM, Weekdays"
//                         value={formData.preferredTimings}
//                         onChange={(e) => setFormData({ ...formData, preferredTimings: e.target.value })}
//                         required
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="payment">Payment Range (per month) *</Label>
//                       <Input
//                         id="payment"
//                         placeholder="e.g., 10000-15000"
//                         value={formData.paymentRange}
//                         onChange={(e) => setFormData({ ...formData, paymentRange: e.target.value })}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone Number *</Label>
//                     <Input
//                       id="phone"
//                       type="tel"
//                       placeholder="+91 98765 43210"
//                       value={formData.phoneNumber}
//                       onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="additional">Additional Requirements (Optional)</Label>
//                     <Textarea
//                       id="additional"
//                       placeholder="Any specific requirements or preferences..."
//                       value={formData.additionalRequirements}
//                       onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
//                       rows={3}
//                     />
//                   </div>

//                   <div className="pt-4">
//                     <Button
//                       type="submit"
//                       className="w-full bg-gradient-primary text-white"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? 'Submitting...' : 'Submit Request'}
//                     </Button>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }
