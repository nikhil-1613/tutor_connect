"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getParentRequests, getTutorProfiles } from '@/lib/localStorage';
import { Users, UserCheck, Clock, FileCheck, UserPlus, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    totalRequests: 0,
    approvedRequests: 0,
    pendingRequests: 0,
    assignedTutors: 0,
    availableTutors: 0,
    newTutors: 0
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'admin') {
      toast.error('Access denied. Admin account required.');
      router.push('/');
    } else {
      loadStats();
    }
  }, [isAuthenticated, user, router]);

  const loadStats = () => {
    const requests = getParentRequests();
    const tutors = getTutorProfiles();

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    setStats({
      totalRequests: requests.length,
      approvedRequests: requests.filter(r => r.status === 'completed').length,
      pendingRequests: requests.filter(r => r.status === 'pending').length,
      assignedTutors: tutors.filter(t => t.assigned).length,
      availableTutors: tutors.filter(t => !t.assigned).length,
      newTutors: tutors.filter(t => new Date(t.createdAt) > sevenDaysAgo).length
    });
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const statCards = [
    {
      title: 'Total Requests',
      value: stats.totalRequests,
      icon: FileCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      link: '/admin/requests'
    },
    {
      title: 'Approved Requests',
      value: stats.approvedRequests,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      link: '/admin/assigned'
    },
    {
      title: 'Pending Requests',
      value: stats.pendingRequests,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      link: '/admin/requests'
    },
    {
      title: 'Assigned Tutors',
      value: stats.assignedTutors,
      icon: UserCheck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      link: '/admin/assigned'
    },
    {
      title: 'Available Tutors',
      value: stats.availableTutors,
      icon: Users,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100 dark:bg-teal-900/30'
    },
    {
      title: 'New Tutors (7 days)',
      value: stats.newTutors,
      icon: UserPlus,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30'
    }
  ];

  const monthlyData = [
    { month: 'Jan', requests: 12, tutors: 8 },
    { month: 'Feb', requests: 19, tutors: 12 },
    { month: 'Mar', requests: 25, tutors: 18 },
    { month: 'Apr', requests: 32, tutors: 22 },
    { month: 'May', requests: 28, tutors: 25 },
    { month: 'Jun', requests: 35, tutors: 30 }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Here's an overview of your platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`${stat.bgColor} ${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                    {stat.link && (
                      <Link href={stat.link}>
                        <Button variant="link" className="px-0 mt-2 text-primary">
                          View Details →
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>Requests and Tutor registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{data.month}</span>
                        <span className="text-muted-foreground">
                          {data.requests} requests, {data.tutors} tutors
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <div
                          className="h-2 bg-gradient-primary rounded-full transition-all"
                          style={{ width: `${(data.requests / 40) * 100}%` }}
                        />
                        <div
                          className="h-2 bg-gradient-secondary rounded-full transition-all"
                          style={{ width: `${(data.tutors / 40) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-primary rounded-full" />
                    <span>Requests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-secondary rounded-full" />
                    <span>Tutors</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Navigate to key management areas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/requests">
                  <Button className="w-full justify-start" variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    View New Requests
                  </Button>
                </Link>
                <Link href="/admin/assigned">
                  <Button className="w-full justify-start" variant="outline">
                    <UserCheck className="mr-2 h-4 w-4" />
                    View Assigned Tutors
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="outline" disabled>
                  <Users className="mr-2 h-4 w-4" />
                  Manage Tutors (Coming Soon)
                </Button>
                <Button className="w-full justify-start" variant="outline" disabled>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Analytics (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
