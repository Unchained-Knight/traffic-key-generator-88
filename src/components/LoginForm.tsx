
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loginWithEmail, getCurrentUser, mockUsers } from '@/utils/accessControl';
import { useToast } from '@/components/ui/use-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const user = loginWithEmail(email, password);
    if (user) {
      toast({
        title: 'Login successful',
        description: `Welcome, ${user.name}! You are logged in as a ${user.role}.`,
      });
    } else {
      setError('Invalid email or password');
    }
  };

  const handleQuickLogin = (userType: 'admin' | 'viewer') => {
    const user = userType === 'admin' ? mockUsers[0] : mockUsers[1];
    setEmail(user.email);
    setPassword('password'); // In a mock demo, we're using a dummy password
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login to Traffic Manager</CardTitle>
        <CardDescription>
          Enter your credentials to access the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-center mb-3 text-muted-foreground">
            For demo purposes, you can use:
          </p>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 text-xs" 
              onClick={() => handleQuickLogin('admin')}
            >
              Login as Admin
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 text-xs" 
              onClick={() => handleQuickLogin('viewer')}
            >
              Login as Viewer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
