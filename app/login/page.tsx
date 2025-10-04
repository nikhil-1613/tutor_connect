"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    role: 'parent' as 'tutor' | 'parent' | 'admin'
  });

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'parent' as 'tutor' | 'parent' | 'admin'
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(loginForm.email, loginForm.password, loginForm.role);
    setIsLoading(false);

    if (success) {
      if (loginForm.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (loginForm.role === 'tutor') {
        router.push('/tutor/form');
      } else {
        router.push('/parent/form');
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupForm.password !== signupForm.confirmPassword) {
      return;
    }

    setIsLoading(true);
    const success = await signup(signupForm.email, signupForm.password, signupForm.name, signupForm.role);
    setIsLoading(false);

    if (success) {
      if (signupForm.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (signupForm.role === 'tutor') {
        router.push('/tutor/form');
      } else {
        router.push('/parent/form');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 dark:from-teal-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-primary rounded-full">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Welcome to EduMatch</CardTitle>
                <CardDescription>Sign in or create an account to continue</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="you@example.com"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>I am a</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            type="button"
                            variant={loginForm.role === 'parent' ? 'default' : 'outline'}
                            className="flex flex-col h-auto py-3"
                            onClick={() => setLoginForm({ ...loginForm, role: 'parent' })}
                          >
                            <Users className="h-5 w-5 mb-1" />
                            <span className="text-xs">Parent</span>
                          </Button>
                          <Button
                            type="button"
                            variant={loginForm.role === 'tutor' ? 'default' : 'outline'}
                            className="flex flex-col h-auto py-3"
                            onClick={() => setLoginForm({ ...loginForm, role: 'tutor' })}
                          >
                            <GraduationCap className="h-5 w-5 mb-1" />
                            <span className="text-xs">Tutor</span>
                          </Button>
                          <Button
                            type="button"
                            variant={loginForm.role === 'admin' ? 'default' : 'outline'}
                            className="flex flex-col h-auto py-3"
                            onClick={() => setLoginForm({ ...loginForm, role: 'admin' })}
                          >
                            <Shield className="h-5 w-5 mb-1" />
                            <span className="text-xs">Admin</span>
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-gradient-primary text-white" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={signupForm.name}
                          onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="you@example.com"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={signupForm.password}
                          onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                        <Input
                          id="signup-confirm-password"
                          type="password"
                          placeholder="••••••••"
                          value={signupForm.confirmPassword}
                          onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>I am a</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            type="button"
                            variant={signupForm.role === 'parent' ? 'default' : 'outline'}
                            className="flex flex-col h-auto py-3"
                            onClick={() => setSignupForm({ ...signupForm, role: 'parent' })}
                          >
                            <Users className="h-5 w-5 mb-1" />
                            <span className="text-xs">Parent</span>
                          </Button>
                          <Button
                            type="button"
                            variant={signupForm.role === 'tutor' ? 'default' : 'outline'}
                            className="flex flex-col h-auto py-3"
                            onClick={() => setSignupForm({ ...signupForm, role: 'tutor' })}
                          >
                            <GraduationCap className="h-5 w-5 mb-1" />
                            <span className="text-xs">Tutor</span>
                          </Button>
                          <Button
                            type="button"
                            variant={signupForm.role === 'admin' ? 'default' : 'outline'}
                            className="flex flex-col h-auto py-3"
                            onClick={() => setSignupForm({ ...signupForm, role: 'admin' })}
                          >
                            <Shield className="h-5 w-5 mb-1" />
                            <span className="text-xs">Admin</span>
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-gradient-primary text-white" disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Sign Up'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Demo credentials: admin@tutor.com (Admin role)
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
