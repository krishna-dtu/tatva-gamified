// This is for question part 
import React, { useState } from 'react';
import { SpaceButton } from '@/components/ui/space-button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AstronautMascot from './AstronautMascot';
import SpaceBackground from './SpaceBackground';
import { GraduationCap, BookOpen, Brain } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from 'inspector/promises';

interface QuestionnaireProps {
  onComplete: (preferences: any) => void;
  userName: string;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete, userName }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    class: '',
    subjects: [] as string[],
    level: ''
  });

  const [mascotMessage, setMascotMessage] = useState(
    `Hi ${userName}! I need to know a bit about you to customize your cosmic learning experience!`
  );

  const classes = [
    '1st - 3rd Grade', '4th - 6th Grade', '7th - 9th Grade', 
    '10th - 12th Grade', 'College', 'Adult Learner'
  ];

  const subjects = [
    { name: 'Science', icon: '🔬', color: 'text-primary' },
    { name: 'Mathematics', icon: '🧮', color: 'text-secondary' },
    { name: 'English', icon: '📚', color: 'text-accent' },
    { name: 'History', icon: '🏛️', color: 'text-primary' },
    { name: 'Geography', icon: '🌍', color: 'text-secondary' },
    { name: 'Computer Science', icon: '💻', color: 'text-accent' }
  ];

  const levels = [
    { id: 'beginner', label: 'Beginner', desc: 'Just starting my journey' },
    { id: 'intermediate', label: 'Explorer', desc: 'I know some basics' },
    { id: 'advanced', label: 'Space Captain', desc: 'I\'m ready for challenges' }
  ];

  const handleClassSelect = (selectedClass: string) => {
    setPreferences(prev => ({ ...prev, class: selectedClass }));
    setMascotMessage("Perfect! Now, which subjects excite you the most? Pick as many as you like!");
    setCurrentStep(1);
  };

  const handleSubjectToggle = (subject: string) => {
    setPreferences(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleLevelSelect = async(level: string) => {
    setPreferences(prev => ({ ...prev, level }));
    setMascotMessage("Excellent! Your personalized space academy is ready. Let's begin the adventure!");
    let token = await supabase.auth.getSession()
    const apitoken = {"token" :  token.data.session.access_token,"grade_level" : level , "subjects" : preferences.subjects , "skill_level" : preferences.class , "name" : userName};
    console.log("Preference",apitoken)


    // --------------------------------------
    // Data you want to send

    

  try {
    const response = await fetch("http://127.0.0.1:8000/create_user", {
      method: "POST",               // POST request
      headers: {
        "Content-Type": "application/json"  // Tell server it's JSON
      },
      body: JSON.stringify(apitoken)     // Convert JS object to JSON string
      
    });
    // const { error } = await supabase.auth.signOut();
    // console.log("Signing Out")

    const result = await response.json();   // Parse JSON response
    console.log("Server response:", result);

  } catch (error) {
    console.error("Error sending POST request:", error);
  }
    // ----------------------------------------
    setTimeout(() => {
      onComplete({ ...preferences, level });
    }, 2000);
  };

  const goToNextStep = () => {
    if (preferences.subjects.length > 0) {
      setMascotMessage("Great choices! Finally, what's your current skill level?");
      setCurrentStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-cosmic relative overflow-hidden">
      <SpaceBackground />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          {/* Astronaut Mascot */}
          <div className="text-center mb-8">
            <AstronautMascot 
              message={mascotMessage}
              variant="talking"
              size="lg"
            />
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mb-8">
            {[0, 1, 2].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full mx-2 transition-all duration-300 ${
                  step <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Card className="cosmic-card p-6">
            {/* Step 1: Class Selection */}
            {currentStep === 0 && (
              <div>
                <div className="text-center mb-6">
                  <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-orbitron font-bold text-foreground mb-2">
                    What's your grade level?
                  </h2>
                  <p className="text-muted-foreground">
                    This helps me customize your learning missions
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {classes.map((classLevel) => (
                    <SpaceButton
                      key={classLevel}
                      variant="ghost"
                      size="lg"
                      onClick={() => handleClassSelect(classLevel)}
                      className="h-16 text-left justify-start"
                    >
                      {classLevel}
                    </SpaceButton>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Subject Selection */}
            {currentStep === 1 && (
              <div>
                <div className="text-center mb-6">
                  <BookOpen className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h2 className="text-2xl font-orbitron font-bold text-foreground mb-2">
                    Choose your subjects
                  </h2>
                  <p className="text-muted-foreground">
                    Select all subjects you want to explore
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {subjects.map((subject) => (
                    <SpaceButton
                      key={subject.name}
                      variant={preferences.subjects.includes(subject.name) ? "primary" : "ghost"}
                      size="lg"
                      onClick={() => handleSubjectToggle(subject.name)}
                      className="h-16 flex-col space-y-1"
                    >
                      <span className="text-2xl">{subject.icon}</span>
                      <span className="text-sm">{subject.name}</span>
                    </SpaceButton>
                  ))}
                </div>

                {preferences.subjects.length > 0 && (
                  <SpaceButton
                    variant="cosmic"
                    size="lg"
                    onClick={goToNextStep}
                    className="w-full"
                  >
                    Continue Mission 🚀
                  </SpaceButton>
                )}
              </div>
            )}

            {/* Step 3: Level Selection */}
            {currentStep === 2 && (
              <div>
                <div className="text-center mb-6">
                  <Brain className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h2 className="text-2xl font-orbitron font-bold text-foreground mb-2">
                    Your skill level?
                  </h2>
                  <p className="text-muted-foreground">
                    Be honest - I'll adjust the difficulty accordingly
                  </p>
                </div>

                <div className="space-y-4">
                  {levels.map((level) => (
                    <SpaceButton
                      key={level.id}
                      variant="ghost"
                      size="lg"
                      onClick={() => handleLevelSelect(level.id)}
                      className="w-full h-16 flex-col text-left justify-center"
                    >
                      <div className="font-semibold">{level.label}</div>
                      <div className="text-sm text-muted-foreground">{level.desc}</div>
                    </SpaceButton>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;