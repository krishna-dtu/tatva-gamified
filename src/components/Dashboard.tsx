import React, { useState, useEffect } from 'react';
import { SpaceButton } from '@/components/ui/space-button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AstronautMascot from './AstronautMascot';
import SpaceBackground from './SpaceBackground';
import { 
  Trophy, 
  Target, 
  Zap, 
  BookOpen, 
  Calculator, 
  Beaker,
  Users,
  Award,
  Star
} from 'lucide-react';

interface DashboardProps {
  user: any;
  preferences: any;
  onStartQuiz: (subject: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, preferences, onStartQuiz }) => {
  const [points, setPoints] = useState(420);
  const [streak, setStreak] = useState(7);
  const [level, setLevel] = useState(5);
  const [mascotMessage, setMascotMessage] = useState(
    `Welcome back, ${user.name}! Ready for today's cosmic mission?`
  );

  const subjectData = [
    { 
      name: 'Science', 
      icon: Beaker, 
      progress: 75, 
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      nextLevel: 'Quantum Physics',
      points: 150
    },
    { 
      name: 'Mathematics', 
      icon: Calculator, 
      progress: 60, 
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      nextLevel: 'Algebra Basics',
      points: 120
    },
    { 
      name: 'English', 
      icon: BookOpen, 
      progress: 85, 
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      nextLevel: 'Creative Writing',
      points: 180
    }
  ];

  const dailyMissions = [
    { task: 'Complete 3 Science questions', progress: 2, total: 3, reward: 50 },
    { task: 'Solve 5 Math problems', progress: 1, total: 5, reward: 75 },
    { task: 'Read 2 English stories', progress: 0, total: 2, reward: 40 }
  ];

  const leaderboard = [
    { rank: 1, name: 'Cosmic Explorer', points: 2840, avatar: '🚀' },
    { rank: 2, name: 'Star Navigator', points: 2650, avatar: '⭐' },
    { rank: 3, name: user.name, points: points, avatar: '🌟' },
    { rank: 4, name: 'Galaxy Traveler', points: 2380, avatar: '🛸' },
    { rank: 5, name: 'Space Pioneer', points: 2200, avatar: '🌌' }
  ];

  useEffect(() => {
    const messages = [
      "The cosmos is full of knowledge waiting to be discovered!",
      "Every question you answer makes you a stronger explorer!",
      "Your curiosity is your greatest superpower!",
      "Ready to unlock new galaxies of learning?"
    ];
    
    const interval = setInterval(() => {
      setMascotMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-cosmic relative overflow-hidden">
      <SpaceBackground />
      
      <div className="relative z-10 p-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <AstronautMascot 
              message={mascotMessage}
              variant="floating"
              size="md"
            />
          </div>
          
          <h1 className="text-3xl font-orbitron font-bold text-foreground mb-2">
            Mission Control Center
          </h1>
          <p className="text-muted-foreground">
            Welcome back, Space Explorer {user.name}!
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="cosmic-card p-4 text-center">
            <Star className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{points}</div>
            <div className="text-sm text-muted-foreground">Cosmic Points</div>
          </Card>
          
          <Card className="cosmic-card p-4 text-center">
            <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </Card>
          
          <Card className="cosmic-card p-4 text-center">
            <Trophy className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">Level {level}</div>
            <div className="text-sm text-muted-foreground">Explorer Rank</div>
          </Card>
        </div>

        {/* Daily Missions */}
        <Card className="cosmic-card p-6 mb-8">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-xl font-orbitron font-bold text-foreground">
              Today's Missions
            </h2>
          </div>
          
          <div className="space-y-4">
            {dailyMissions.map((mission, index) => (
              <div key={index} className="bg-muted/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground font-medium">{mission.task}</span>
                  <span className="text-accent font-bold">+{mission.reward} ⭐</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={(mission.progress / mission.total) * 100} 
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">
                    {mission.progress}/{mission.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {subjectData.map((subject) => (
            <Card key={subject.name} className="cosmic-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="text-center mb-4">
                <div className={`w-16 h-16 rounded-full ${subject.bgColor} flex items-center justify-center mx-auto mb-3`}>
                  <subject.icon className={`w-8 h-8 ${subject.color}`} />
                </div>
                <h3 className="text-xl font-orbitron font-bold text-foreground mb-1">
                  {subject.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Next: {subject.nextLevel}
                </p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-semibold">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Points Earned</span>
                <span className="text-accent font-bold">{subject.points} ⭐</span>
              </div>

              <SpaceButton 
                variant="primary" 
                size="lg" 
                className="w-full"
                onClick={() => onStartQuiz(subject.name)}
              >
                Start Mission 🚀
              </SpaceButton>
            </Card>
          ))}
        </div>

        {/* Leaderboard */}
        <Card className="cosmic-card p-6">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-secondary mr-2" />
            <h2 className="text-xl font-orbitron font-bold text-foreground">
              Cosmic Leaderboard
            </h2>
          </div>
          
          <div className="space-y-3">
            {leaderboard.map((player) => (
              <div 
                key={player.rank}
                className={`flex items-center p-3 rounded-lg transition-all ${
                  player.name === user.name 
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'bg-muted/10'
                }`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-lg">{player.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      #{player.rank} {player.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {player.points} cosmic points
                    </div>
                  </div>
                </div>
                {player.rank <= 3 && (
                  <Award className={`w-5 h-5 ${
                    player.rank === 1 ? 'text-accent' : 
                    player.rank === 2 ? 'text-muted-foreground' : 
                    'text-destructive'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;