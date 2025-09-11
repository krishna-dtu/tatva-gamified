import React, { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import AuthScreen from '@/components/AuthScreen';
import Questionnaire from '@/components/Questionnaire';
import Dashboard from '@/components/Dashboard';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

type AppState = 'splash' | 'auth' | 'questionnaire' | 'dashboard' | 'quiz';

let f = async() =>{
  let ans = await supabase.auth.getSession();
}
const Index = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [preferences, setPreferences] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        
        
        if (session?.user) {
          // User is authenticated, move to questionnaire if no preferences
          const update = async() =>{
            if (!preferences) {
            setAppState('questionnaire');
          } else {
            setAppState('dashboard');
          }
          }
          const fetch_data = async() =>{
            let token = await supabase.auth.getSession()
            let apitoken  = token.data.session.access_token  
            const result = await  fetch(`http://127.0.0.1:8000/test?token=${apitoken}`,{
              method : "POST",
              headers: {
                'content-type': 'application/json',
              }
            })
            const ans = await result.json()
            setPreferences(ans.ans)
            if(!(ans.ans)){
              setAppState('questionnaire')
            }
            else{
              setAppState('dashboard')
            }
          }

          fetch_data() 
          
        } else {
          // User is not authenticated, show auth screen after splash
          if (appState !== 'splash') {
            setAppState('auth');
          }
        }
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSplashComplete = () => {
    if (user) {
      setAppState(preferences ? 'dashboard' : 'questionnaire');
    } else {
      setAppState('auth');
    }
  };

  const handleAuthComplete = (userData: any) => {
    const { isSignup } = userData;
    
    setAppState(isSignup ? 'questionnaire' : 'dashboard');
  };

  const handleQuestionnaireComplete = (userPreferences: any) => {
    setPreferences(userPreferences);
    setAppState('dashboard');
  };

  const handleStartQuiz = (subject: string) => {
    // TODO: Implement quiz flow
    console.log('Starting quiz for:', subject);
  };

  // Show loading while checking auth state
  if (isLoading) {
    return <div className="min-h-screen bg-cosmic flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-foreground">Loading your space adventure...</p>
      </div>
    </div>;
  }

  // Render current screen based on app state
  switch (appState) {
    case 'splash':
      return <SplashScreen onComplete={handleSplashComplete} />;
    
    case 'auth':
      return <AuthScreen onAuthComplete={handleAuthComplete} />;
    
    case 'questionnaire':
      return (
        <Questionnaire 
          onComplete={handleQuestionnaireComplete}
          userName={user?.user_metadata?.name || user?.email || 'Explorer'}
        />
      );
    
    case 'dashboard':
      return (
        <Dashboard 
          user={user}
          preferences={preferences}
          onStartQuiz={handleStartQuiz}
        />
      );
    
    default:
      return <SplashScreen onComplete={handleSplashComplete} />;
  }
};

export default Index;
