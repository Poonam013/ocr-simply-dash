
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Auth = () => {
  const [view, setView] = useState<'login' | 'register'>('login');
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background Blurs */}
      <div className="floating-blur floating-blur-1"></div>
      <div className="floating-blur floating-blur-2"></div>
      <div className="floating-blur floating-blur-3"></div>
      
      <div className="absolute top-6 left-6 z-10 flex items-center space-x-4">
        <Button variant="outline" size="icon" asChild className="bg-secondary/30 backdrop-blur-sm border-white/10">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        
        <Link to="/" className="font-medium">BilingualOCR</Link>
      </div>
      
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>
      
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md glass-morphism rounded-xl p-8 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">
              {view === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {view === 'login' 
                ? 'Enter your credentials to access your account' 
                : 'Fill in the information to get started'}
            </p>
          </div>
          
          <form className="space-y-4">
            {view === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  className="bg-secondary/30 backdrop-blur-sm border-white/10" 
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="hello@example.com" 
                className="bg-secondary/30 backdrop-blur-sm border-white/10" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="bg-secondary/30 backdrop-blur-sm border-white/10" 
              />
            </div>
            
            <Button type="submit" className="w-full mt-6">
              {view === 'login' ? 'Sign in' : 'Create account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            {view === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button 
                  onClick={() => setView('register')}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button 
                  onClick={() => setView('login')}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-muted-foreground">
            By continuing, you agree to our{' '}
            <a href="#" className="hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="hover:underline">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
