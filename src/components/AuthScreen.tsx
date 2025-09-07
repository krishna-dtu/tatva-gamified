import React, { useState } from 'react';
import { SpaceButton } from '@/components/ui/space-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import AstronautMascot from './AstronautMascot';
import SpaceBackground from './SpaceBackground';
import { Mail, Phone, User, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthScreenProps {
  onAuthComplete: (userData: any) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthComplete }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [mascotMessage, setMascotMessage] = useState(
    "Welcome to the cosmos, Explorer! Ready to begin your learning journey?"
  );
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMascotMessage("Great! Let's blast off to your personalized learning space!");
    
    try {
      if (isLogin) {
        // Sign in existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        setMascotMessage("Welcome back, Space Explorer! 🚀");
        onAuthComplete({
          name: data.user?.user_metadata?.name || 'Space Explorer',
          email: data.user?.email,
          phone: data.user?.user_metadata?.phone
        });
      } else {
        // Sign up new user
        const redirectUrl = `${window.location.origin}/`;
        
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              name: formData.name,
              phone: formData.phone
            }
          }
        });

        if (error) throw error;

        if (data.user && !data.session) {
          setMascotMessage("Check your email for verification link, Explorer! 📧");
          toast({
            title: "Verification Required",
            description: "Please check your email and click the verification link to complete your registration."
          });
        } else {
          setMascotMessage("Welcome to the galaxy, new Explorer! 🌟");
          onAuthComplete({
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          });
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setMascotMessage("Oops! Houston, we have a problem. Try again, Explorer!");
      toast({
        title: "Authentication Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMascotMessage(
      isLogin 
        ? "New to our galaxy? Let's create your explorer profile!" 
        : "Welcome back, Space Explorer! Ready for more adventures?"
    );
  };

  return (
    <div className="min-h-screen bg-cosmic relative overflow-hidden">
      <SpaceBackground />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Astronaut Mascot */}
          <div className="text-center mb-8">
            <AstronautMascot 
              message={mascotMessage}
              variant="talking"
              size="lg"
            />
          </div>

          {/* Auth Card */}
          <Card className="cosmic-card p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-orbitron font-bold text-foreground mb-2">
                {isLogin ? 'Welcome Back!' : 'Join the Mission!'}
              </h2>
              <p className="text-muted-foreground">
                {isLogin ? 'Continue your space adventure' : 'Start your learning journey'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Explorer Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10 bg-input/50 border-border/50 text-foreground"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="explorer@galaxy.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 bg-input/50 border-border/50 text-foreground"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 12345 67890"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10 bg-input/50 border-border/50 text-foreground"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 bg-input/50 border-border/50 text-foreground"
                    required
                  />
                </div>
              </div>

              <SpaceButton 
                type="submit" 
                variant="cosmic" 
                size="lg" 
                className="w-full group"
                disabled={isLoading}
              >
                {isLoading ? '🛸 Loading...' : (isLogin ? '🚀 Launch Mission' : '🌟 Begin Adventure')}
              </SpaceButton>

              <div className="text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                >
                  {isLogin ? "New explorer? Join the mission!" : "Already have an account? Sign in!"}
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;