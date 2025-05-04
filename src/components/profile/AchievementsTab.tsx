
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Award, Star, BookOpen, Zap, GraduationCap } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

const AchievementsTab = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray overflow-hidden">
        <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-elec-yellow/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-elec-yellow/10">
              <Trophy className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-2xl">Your Achievements</CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1">
                Track your progress and accomplishments
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AchievementCard 
              title="Course Completion"
              description="Complete your first course"
              icon={BookOpen}
              progress={0}
              isLocked
            />
            
            <AchievementCard 
              title="Learning Streak"
              description="Log in for 7 consecutive days"
              icon={Zap}
              progress={30}
              isLocked={false}
            />
            
            <AchievementCard 
              title="Perfect Score"
              description="Score 100% on any quiz"
              icon={Star}
              progress={0}
              isLocked
            />
            
            <AchievementCard 
              title="Early Adopter"
              description="Join during platform launch"
              icon={Award}
              progress={100}
              isLocked={false}
              isCompleted
            />
          </div>
          
          <div className="text-center mt-6">
            <Button 
              variant="outline" 
              className="border-elec-yellow/30 hover:bg-elec-yellow/10 text-xs sm:text-sm"
              size={isMobile ? "sm" : "default"}
              asChild
            >
              <a href="/apprentice/study">
                <GraduationCap className="mr-2 h-4 w-4" />
                Continue Learning
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface AchievementCardProps {
  title: string;
  description: string;
  icon: any;
  progress: number;
  isLocked: boolean;
  isCompleted?: boolean;
}

const AchievementCard = ({ 
  title, 
  description, 
  icon: Icon, 
  progress, 
  isLocked,
  isCompleted = false
}: AchievementCardProps) => {
  return (
    <div className={`p-4 rounded-lg border ${
      isCompleted 
        ? "border-elec-yellow bg-elec-yellow/10" 
        : isLocked 
          ? "border-gray-500/20 bg-gray-500/5" 
          : "border-elec-yellow/30 bg-elec-yellow/5"
    }`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${
          isCompleted 
            ? "bg-elec-yellow/30 text-elec-yellow" 
            : isLocked 
              ? "bg-gray-500/20 text-gray-500/60" 
              : "bg-elec-yellow/10 text-elec-yellow/80"
        }`}>
          <Icon className="h-4 w-4" />
        </div>
        
        <div>
          <h3 className={`font-medium ${
            isLocked ? "text-gray-400" : ""
          }`}>{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
          
          {!isLocked && (
            <div className="mt-2 h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-elec-yellow" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          
          {isCompleted && (
            <span className="text-xs text-elec-yellow mt-2 block">
              Completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementsTab;
