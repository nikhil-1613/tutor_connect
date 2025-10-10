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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { addTutorProfile, TutorProfile } from "@/lib/localStorage";
import { CircleCheck as CheckCircle2, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function TutorFormPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    qualification: "",
    hasExperience: "no",
    yearsOfExperience: "",
    address: "",
    availableTimings: "",
    expectedSalary: "",
    phoneNumber: "",
    referredBy: "",
    subjects: [] as string[], // ✅ added subjects array
  });

  // ✅ Random subjects list for dropdown
  const subjectsList = [
    "Mathematics",
    "Science",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Economics",
    "History",
    "Geography",
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role !== "tutor") {
      toast.error("Access denied. Tutor account required.");
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  // ✅ Handle subject checkbox toggle
  const handleSubjectToggle = (subject: string) => {
    setFormData((prev) => {
      const isSelected = prev.subjects.includes(subject);
      return {
        ...prev,
        subjects: isSelected
          ? prev.subjects.filter((s) => s !== subject)
          : [...prev.subjects, subject],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.subjects.length === 0) {
      toast.error("Please select at least one subject.");
      return;
    }

    setIsLoading(true);

    const tutorProfile: TutorProfile = {
      userId: user?.id || "",
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      qualification: formData.qualification,
      hasExperience: formData.hasExperience === "yes",
      yearsOfExperience:
        formData.hasExperience === "yes"
          ? formData.yearsOfExperience
          : undefined,
      address: formData.address,
      availableTimings: formData.availableTimings,
      expectedSalary: formData.expectedSalary,
      phoneNumber: formData.phoneNumber,
      referredBy: formData.referredBy || undefined,
      subjects: formData.subjects, // ✅ include subjects in profile
      assigned: false,
      createdAt: new Date().toISOString(),
    };

    addTutorProfile(tutorProfile);
    toast.success("Profile submitted successfully!");
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (!isAuthenticated || user?.role !== "tutor") {
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
                  <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your tutor profile has been submitted successfully. Our
                    admin team will review your profile and match you with
                    suitable students.
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
                <CardTitle className="text-3xl">Tutor Registration Form</CardTitle>
                <CardDescription>
                  Please fill in your details to join our network of quality
                  educators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) =>
                          setFormData({ ...formData, age: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="cursor-pointer">
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="cursor-pointer">
                          Female
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other" className="cursor-pointer">
                          Other
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualification">
                      Educational Qualification *
                    </Label>
                    <Input
                      id="qualification"
                      placeholder="e.g., B.Tech, M.Sc, B.Ed"
                      value={formData.qualification}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          qualification: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Teaching Experience *</Label>
                    <RadioGroup
                      value={formData.hasExperience}
                      onValueChange={(value) =>
                        setFormData({ ...formData, hasExperience: value })
                      }
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="exp-yes" />
                        <Label htmlFor="exp-yes" className="cursor-pointer">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="exp-no" />
                        <Label htmlFor="exp-no" className="cursor-pointer">
                          No
                        </Label>
                      </div>
                    </RadioGroup>

                    {formData.hasExperience === "yes" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Label htmlFor="yearsOfExperience">
                          Years of Experience *
                        </Label>
                        <Input
                          id="yearsOfExperience"
                          type="number"
                          value={formData.yearsOfExperience}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              yearsOfExperience: e.target.value,
                            })
                          }
                          required={formData.hasExperience === "yes"}
                          className="mt-2"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* ✅ Subjects dropdown */}
                  <div className="space-y-2">
                    <Label>Subjects You Can Teach *</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {formData.subjects.length > 0
                            ? formData.subjects.join(", ")
                            : "Select subjects"}
                          <ChevronDown className="w-4 h-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        <DropdownMenuLabel>
                          Select one or more subjects
                        </DropdownMenuLabel>
                        {subjectsList.map((subject) => (
                          <DropdownMenuCheckboxItem
                            key={subject}
                            checked={formData.subjects.includes(subject)}
                            onCheckedChange={() => handleSubjectToggle(subject)}
                          >
                            {subject}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {formData.subjects.length === 0 && (
                      <p className="text-sm text-red-500">
                        Please select at least one subject.
                      </p>
                    )}
                  </div>

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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timings">Available Timings *</Label>
                      <Input
                        id="timings"
                        placeholder="e.g., 9 AM - 1 PM, Weekdays"
                        value={formData.availableTimings}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            availableTimings: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salary">
                        Expected Salary (per month) *
                      </Label>
                      <Input
                        id="salary"
                        placeholder="e.g., 15000"
                        value={formData.expectedSalary}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expectedSalary: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referredBy">
                      Who referred you? (Optional)
                    </Label>
                    <Input
                      id="referredBy"
                      placeholder="Name of person who referred you"
                      value={formData.referredBy}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          referredBy: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit Application"}
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

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Header } from '@/components/Header';
// import { Footer } from '@/components/Footer';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { useAuth } from '@/contexts/AuthContext';
// import { addTutorProfile, TutorProfile } from '@/lib/localStorage';
// import { CircleCheck as CheckCircle2 } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { toast } from 'react-hot-toast';

// export default function TutorFormPage() {
//   const router = useRouter();
//   const { user, isAuthenticated } = useAuth();
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     gender: 'male',
//     qualification: '',
//     hasExperience: 'no',
//     yearsOfExperience: '',
//     address: '',
//     availableTimings: '',
//     expectedSalary: '',
//     phoneNumber: '',
//     referredBy: ''
//   });

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/login');
//     } else if (user?.role !== 'tutor') {
//       toast.error('Access denied. Tutor account required.');
//       router.push('/');
//     }
//   }, [isAuthenticated, user, router]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const tutorProfile: TutorProfile = {
//       userId: user?.id || '',
//       name: formData.name,
//       age: formData.age,
//       gender: formData.gender,
//       qualification: formData.qualification,
//       hasExperience: formData.hasExperience === 'yes',
//       yearsOfExperience: formData.hasExperience === 'yes' ? formData.yearsOfExperience : undefined,
//       address: formData.address,
//       availableTimings: formData.availableTimings,
//       expectedSalary: formData.expectedSalary,
//       phoneNumber: formData.phoneNumber,
//       referredBy: formData.referredBy || undefined,
//       assigned: false,
//       createdAt: new Date().toISOString()
//     };

//     addTutorProfile(tutorProfile);
//     toast.success('Profile submitted successfully!');
//     setIsLoading(false);
//     setIsSubmitted(true);
//   };

//   if (!isAuthenticated || user?.role !== 'tutor') {
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
//                   <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
//                   <p className="text-muted-foreground mb-6">
//                     Your tutor profile has been submitted successfully. Our admin team will review your profile and match you with suitable students.
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
//                 <CardTitle className="text-3xl">Tutor Registration Form</CardTitle>
//                 <CardDescription>
//                   Please fill in your details to join our network of quality educators
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="name">Full Name *</Label>
//                       <Input
//                         id="name"
//                         value={formData.name}
//                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                         required
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="age">Age *</Label>
//                       <Input
//                         id="age"
//                         type="number"
//                         value={formData.age}
//                         onChange={(e) => setFormData({ ...formData, age: e.target.value })}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Gender *</Label>
//                     <RadioGroup
//                       value={formData.gender}
//                       onValueChange={(value) => setFormData({ ...formData, gender: value })}
//                       className="flex gap-4"
//                     >
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="male" id="male" />
//                         <Label htmlFor="male" className="cursor-pointer">Male</Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="female" id="female" />
//                         <Label htmlFor="female" className="cursor-pointer">Female</Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="other" id="other" />
//                         <Label htmlFor="other" className="cursor-pointer">Other</Label>
//                       </div>
//                     </RadioGroup>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="qualification">Educational Qualification *</Label>
//                     <Input
//                       id="qualification"
//                       placeholder="e.g., B.Tech, M.Sc, B.Ed"
//                       value={formData.qualification}
//                       onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
//                       required
//                     />
//                   </div>

//                   <div className="space-y-4">
//                     <Label>Teaching Experience *</Label>
//                     <RadioGroup
//                       value={formData.hasExperience}
//                       onValueChange={(value) => setFormData({ ...formData, hasExperience: value })}
//                       className="flex gap-4"
//                     >
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="yes" id="exp-yes" />
//                         <Label htmlFor="exp-yes" className="cursor-pointer">Yes</Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="no" id="exp-no" />
//                         <Label htmlFor="exp-no" className="cursor-pointer">No</Label>
//                       </div>
//                     </RadioGroup>

//                     {formData.hasExperience === 'yes' && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         exit={{ opacity: 0, height: 0 }}
//                       >
//                         <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
//                         <Input
//                           id="yearsOfExperience"
//                           type="number"
//                           value={formData.yearsOfExperience}
//                           onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
//                           required={formData.hasExperience === 'yes'}
//                           className="mt-2"
//                         />
//                       </motion.div>
//                     )}
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
//                       <Label htmlFor="timings">Available Timings *</Label>
//                       <Input
//                         id="timings"
//                         placeholder="e.g., 9 AM - 1 PM, Weekdays"
//                         value={formData.availableTimings}
//                         onChange={(e) => setFormData({ ...formData, availableTimings: e.target.value })}
//                         required
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="salary">Expected Salary (per month) *</Label>
//                       <Input
//                         id="salary"
//                         placeholder="e.g., 15000"
//                         value={formData.expectedSalary}
//                         onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
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
//                     <Label htmlFor="referredBy">Who referred you? (Optional)</Label>
//                     <Input
//                       id="referredBy"
//                       placeholder="Name of person who referred you"
//                       value={formData.referredBy}
//                       onChange={(e) => setFormData({ ...formData, referredBy: e.target.value })}
//                     />
//                   </div>

//                   <div className="pt-4">
//                     <Button
//                       type="submit"
//                       className="w-full bg-gradient-primary text-white"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? 'Submitting...' : 'Submit Application'}
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
