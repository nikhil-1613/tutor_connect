"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { getParentRequests, getTutorProfiles, updateParentRequest, updateTutorProfile, ParentRequest, TutorProfile } from '@/lib/localStorage';
import { MapPin, Clock, DollarSign, GraduationCap, Phone, User, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function AdminRequestsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [requests, setRequests] = useState<ParentRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ParentRequest | null>(null);
  const [suggestedTutors, setSuggestedTutors] = useState<TutorProfile[]>([]);
  const [showTutorModal, setShowTutorModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'admin') {
      toast.error('Access denied. Admin account required.');
      router.push('/');
    } else {
      loadRequests();
    }
  }, [isAuthenticated, user, router]);

  const loadRequests = () => {
    const allRequests = getParentRequests();
    const pendingRequests = allRequests.filter(r => r.status === 'pending');
    setRequests(pendingRequests);
  };

  const findSuggestedTutors = (request: ParentRequest) => {
    const allTutors = getTutorProfiles();

    const availableTutors = allTutors.filter(tutor => !tutor.assigned);

    const matchedTutors = availableTutors.filter(tutor => {
      if (request.preferredGender !== 'any' && tutor.gender !== request.preferredGender) {
        return false;
      }

      const tutorSalary = parseInt(tutor.expectedSalary);
      const paymentRangeParts = request.paymentRange.split('-');
      const minPayment = parseInt(paymentRangeParts[0]);
      const maxPayment = parseInt(paymentRangeParts[1] || paymentRangeParts[0]);

      if (tutorSalary < minPayment || tutorSalary > maxPayment) {
        return false;
      }

      return true;
    });

    return matchedTutors;
  };

  const handleViewTutors = (request: ParentRequest) => {
    setSelectedRequest(request);
    const tutors = findSuggestedTutors(request);
    setSuggestedTutors(tutors);
    setShowTutorModal(true);
  };

  const handleAssignTutor = (tutor: TutorProfile) => {
    if (!selectedRequest) return;

    updateParentRequest(selectedRequest.id, {
      status: 'assigned',
      assignedTutorId: tutor.userId
    });

    updateTutorProfile(tutor.userId, {
      assigned: true
    });

    toast.success('Tutor assigned successfully!');

    const whatsappMessage = `Hello! You have been matched through EduMatch. Parent: ${selectedRequest.fatherName}/${selectedRequest.motherName}, Contact: ${selectedRequest.phoneNumber}. Tutor: ${tutor.name}, Contact: ${tutor.phoneNumber}. Please connect to discuss further details.`;
    const whatsappUrl = `https://wa.me/${tutor.phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    setShowTutorModal(false);
    loadRequests();
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">New Requests</h1>
            <p className="text-muted-foreground">
              Review and assign tutors to parent requests
            </p>
          </div>

          {requests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Pending Requests</h3>
                <p className="text-muted-foreground">
                  All requests have been processed. Check back later for new requests.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {requests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {request.fatherName} & {request.motherName}
                          </CardTitle>
                          <Badge className="mt-2" variant="secondary">
                            {request.syllabus}
                          </Badge>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{request.numberOfChildren} {parseInt(request.numberOfChildren) === 1 ? 'child' : 'children'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <GraduationCap className="h-4 w-4" />
                          <span>{request.preferredGender === 'any' ? 'Any' : request.preferredGender} tutor</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <BookOpen className="h-4 w-4 mt-0.5" />
                          <span>{request.subjects.join(', ')}</span>
                        </div>
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4 mt-0.5" />
                          <span>{request.preferredTimings}</span>
                        </div>
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <DollarSign className="h-4 w-4 mt-0.5" />
                          <span>₹{request.paymentRange}/month</span>
                        </div>
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4 mt-0.5" />
                          <span>{request.address}</span>
                        </div>
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4 mt-0.5" />
                          <span>{request.phoneNumber}</span>
                        </div>
                      </div>

                      {request.additionalRequirements && (
                        <div className="pt-3 border-t">
                          <p className="text-sm font-medium mb-1">Additional Requirements:</p>
                          <p className="text-sm text-muted-foreground">{request.additionalRequirements}</p>
                        </div>
                      )}

                      <Button
                        className="w-full bg-gradient-primary text-white"
                        onClick={() => handleViewTutors(request)}
                      >
                        View Suggested Tutors
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Dialog open={showTutorModal} onOpenChange={setShowTutorModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Suggested Tutors</DialogTitle>
            <DialogDescription>
              Tutors matching the requirements for {selectedRequest?.fatherName} & {selectedRequest?.motherName}
            </DialogDescription>
          </DialogHeader>

          {suggestedTutors.length === 0 ? (
            <div className="py-12 text-center">
              <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Matching Tutors Found</h3>
              <p className="text-muted-foreground">
                No tutors currently match the specified requirements. Try adjusting the criteria or wait for new tutors to register.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {suggestedTutors.map((tutor) => (
                <Card key={tutor.userId} className="hover:shadow-lg transition-all">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{tutor.name}</h4>
                        <p className="text-sm text-muted-foreground">{tutor.qualification}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                        {tutor.name.substring(0, 2).toUpperCase()}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Age:</span> {tutor.age}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gender:</span> {tutor.gender}
                      </div>
                    </div>

                    {tutor.hasExperience && tutor.yearsOfExperience && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Experience:</span> {tutor.yearsOfExperience} years
                      </div>
                    )}

                    <div className="space-y-1 text-sm">
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 mt-0.5" />
                        <span>{tutor.availableTimings}</span>
                      </div>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4 mt-0.5" />
                        <span>₹{tutor.expectedSalary}/month</span>
                      </div>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4 mt-0.5" />
                        <span>{tutor.phoneNumber}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-primary text-white"
                      onClick={() => handleAssignTutor(tutor)}
                    >
                      Assign Tutor
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
