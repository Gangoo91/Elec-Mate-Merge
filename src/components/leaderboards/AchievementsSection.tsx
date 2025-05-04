
import { Award, Clock, Trophy, Star } from "lucide-react";
import { AchievementCard } from "./AchievementCard";
import { UserActivity } from "@/hooks/leaderboards/useLeaderboardData";

interface AchievementsSectionProps {
  currentUserRank: UserActivity | null;
  isMobile: boolean;
}

export const AchievementsSection = ({ currentUserRank, isMobile }: AchievementsSectionProps) => {
  const achievements = [
    { 
      icon: <Award className={`${isMobile ? 'h-5 w-5' : 'h-8 w-8'}`} />, 
      name: "First Lesson", 
      description: "Complete your first video lesson", 
      progress: 100 
    },
    { 
      icon: <Clock className={`${isMobile ? 'h-5 w-5' : 'h-8 w-8'}`} />, 
      name: "7-Day Streak", 
      description: "Learn for 7 consecutive days", 
      progress: currentUserRank?.streak ? (currentUserRank.streak / 7) * 100 : 0 
    },
    { 
      icon: <Trophy className={`${isMobile ? 'h-5 w-5' : 'h-8 w-8'}`} />, 
      name: "Quiz Master", 
      description: "Score 100% on 5 different quizzes", 
      progress: 60 
    },
    { 
      icon: <Star className={`${isMobile ? 'h-5 w-5' : 'h-8 w-8'}`} />, 
      name: "Top Contributor", 
      description: "Help others in the community", 
      progress: 30 
    },
  ];

  return (
    <div className="space-y-3 md:space-y-4">
      <h2 className="text-lg md:text-xl font-semibold">Latest Achievements</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {achievements.map((achievement, i) => (
          <AchievementCard 
            key={i}
            icon={achievement.icon}
            name={achievement.name}
            description={achievement.description}
            progress={achievement.progress}
          />
        ))}
      </div>
    </div>
  );
};
