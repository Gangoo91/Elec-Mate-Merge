
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Medal, Star, Trophy, CheckCircle, Target, BookOpen, ArrowDown, Gift, ChevronDown } from "lucide-react";
import { UserActivity } from "@/hooks/leaderboards/types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { getUserDisplayName } from "./leaderboardUtils";
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AchievementsSectionProps {
  currentUserRank: UserActivity | null;
  isMobile: boolean;
}

export const AchievementsSection = ({ currentUserRank, isMobile }: AchievementsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Filter achievements based on selected category
  const filteredAchievements = selectedCategory === "all" 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className={isMobile ? "p-4 pb-2" : "pb-2"}>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-elec-yellow" />
          Achievements
        </CardTitle>
        <CardDescription>
          Complete challenges and milestones to earn achievements and points
        </CardDescription>
      </CardHeader>
      <CardContent className={isMobile ? "p-4 pt-2" : "pt-2"}>
        <div className="mb-6">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full bg-elec-dark">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="learning">Learning</SelectItem>
              <SelectItem value="challenge">Challenges</SelectItem>
              <SelectItem value="special">Special</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-muted-foreground">
              Monthly Top 3 Reward: <span className="text-elec-yellow font-medium">£50 Voucher Each</span>
            </span>
            <Badge variant="gold" className="ml-auto">
              <Gift className="h-3 w-3 mr-1" />
              Top Prize
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredAchievements.map((achievement, index) => (
            <AchievementCard 
              key={index}
              achievement={achievement}
              isEarned={currentUserRank?.achievements?.some(a => a.id === achievement.id) || false}
            />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="outline" className="border-elec-yellow/20">
            View All Available Achievements
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface AchievementCardProps {
  achievement: {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    points: number;
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
    requirements?: {
      current?: number;
      target: number;
    };
  };
  isEarned: boolean;
}

const AchievementCard = ({ achievement, isEarned }: AchievementCardProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return <Trophy className="h-5 w-5" />;
      case 'medal': return <Medal className="h-5 w-5" />;
      case 'star': return <Star className="h-5 w-5" />;
      case 'award': return <Award className="h-5 w-5" />;
      case 'target': return <Target className="h-5 w-5" />;
      case 'book': return <BookOpen className="h-5 w-5" />;
      default: return <Award className="h-5 w-5" />;
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-500';
      case 'medium': return 'bg-amber-500/20 text-amber-500';
      case 'hard': return 'bg-red-500/20 text-red-500';
      case 'expert': return 'bg-purple-500/20 text-purple-500';
      default: return 'bg-blue-500/20 text-blue-500';
    }
  };
  
  return (
    <div className={`border rounded-lg p-4 transition-all ${isEarned ? 'bg-elec-yellow/5 border-elec-yellow/30' : 'bg-elec-dark/70 border-elec-yellow/10 opacity-90'}`}>
      <div className="flex justify-between items-start">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${isEarned ? 'bg-elec-yellow/20 text-elec-yellow' : 'bg-elec-dark text-elec-yellow/50'}`}>
          {getIcon(achievement.icon)}
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getDifficultyColor(achievement.difficulty)}>
            {achievement.difficulty}
          </Badge>
          <Badge variant={isEarned ? "default" : "outline"} className={isEarned ? "bg-elec-yellow text-elec-dark" : ""}>
            +{achievement.points} pts
          </Badge>
        </div>
      </div>
      
      <div className="mt-3">
        <h3 className="font-semibold flex items-center gap-2">
          {achievement.name}
          {isEarned && <CheckCircle className="h-4 w-4 text-green-500" />}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
      </div>
      
      {achievement.requirements && (
        <div className="mt-3 space-y-1">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{achievement.requirements.current || 0} / {achievement.requirements.target}</span>
          </div>
          <Progress 
            value={((achievement.requirements.current || 0) / achievement.requirements.target) * 100} 
            className="h-1"
          />
        </div>
      )}
    </div>
  );
};

// Enhanced achievements data with more challenges and higher point values
const achievements = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first quiz with a score of 80% or higher',
    icon: 'star',
    category: 'learning',
    points: 150,
    difficulty: 'easy' as const
  },
  {
    id: '2',
    name: 'Consistent Learner',
    description: 'Maintain a learning streak for 7 consecutive days',
    icon: 'medal',
    category: 'challenge',
    points: 400,
    difficulty: 'medium' as const,
    requirements: {
      current: 5,
      target: 7
    }
  },
  {
    id: '3',
    name: 'Module Master',
    description: 'Complete all lessons in a module with perfect scores',
    icon: 'trophy',
    category: 'learning',
    points: 800,
    difficulty: 'hard' as const
  },
  {
    id: '4',
    name: 'Knowledge Explorer',
    description: 'Access and study content from all available categories',
    icon: 'book',
    category: 'learning',
    points: 500,
    difficulty: 'medium' as const,
    requirements: {
      current: 7,
      target: 10
    }
  },
  {
    id: '5',
    name: 'Community Contributor',
    description: 'Answer 10 questions from other users in the community forums',
    icon: 'award',
    category: 'challenge',
    points: 600,
    difficulty: 'medium' as const,
    requirements: {
      current: 3,
      target: 10
    }
  },
  {
    id: '6',
    name: 'Early Adopter',
    description: 'One of the first 1,000 users to join the platform',
    icon: 'award',
    category: 'special',
    points: 750,
    difficulty: 'easy' as const
  },
  {
    id: '7',
    name: 'Lightning Fast',
    description: 'Complete a quiz in less than 3 minutes with 100% accuracy',
    icon: 'target',
    category: 'challenge',
    points: 550,
    difficulty: 'hard' as const
  },
  {
    id: '8',
    name: 'Study Marathon',
    description: 'Spend more than 5 hours learning in a single day',
    icon: 'medal',
    category: 'challenge',
    points: 650,
    difficulty: 'hard' as const
  },
  {
    id: '9',
    name: 'Perfect Attendance',
    description: 'Log in every day for a month',
    icon: 'trophy',
    category: 'special',
    points: 1500,
    difficulty: 'expert' as const,
    requirements: {
      current: 21,
      target: 30
    }
  },
  // New challenges with higher point values
  {
    id: '10',
    name: 'Documentation Expert',
    description: 'Submit 5 detailed documentation reports with proper formatting',
    icon: 'book',
    category: 'challenge',
    points: 950,
    difficulty: 'hard' as const,
    requirements: {
      current: 2,
      target: 5
    }
  },
  {
    id: '11',
    name: 'Safety Champion',
    description: 'Complete all safety case studies with perfect scores',
    icon: 'award',
    category: 'learning',
    points: 1200,
    difficulty: 'expert' as const
  },
  {
    id: '12',
    name: 'Calculation Wizard',
    description: 'Successfully complete 20 different electrical calculations',
    icon: 'star',
    category: 'challenge',
    points: 900,
    difficulty: 'hard' as const,
    requirements: {
      current: 8,
      target: 20
    }
  },
  {
    id: '13',
    name: 'Regulation Master',
    description: 'Pass the regulations assessment with at least 95% accuracy',
    icon: 'trophy',
    category: 'learning',
    points: 1100,
    difficulty: 'expert' as const
  },
  {
    id: '14',
    name: 'Mentor Support',
    description: 'Help 3 other apprentices solve technical problems',
    icon: 'medal',
    category: 'special',
    points: 850,
    difficulty: 'medium' as const,
    requirements: {
      current: 1,
      target: 3
    }
  },
  {
    id: '15',
    name: 'Professional Development',
    description: 'Complete 3 professional development modules',
    icon: 'star',
    category: 'learning',
    points: 700,
    difficulty: 'medium' as const,
    requirements: {
      current: 1,
      target: 3
    }
  }
];

export default AchievementsSection;
