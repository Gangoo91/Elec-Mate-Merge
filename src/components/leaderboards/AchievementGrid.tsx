
import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, Trophy, Star } from "lucide-react";

interface Achievement {
  icon: JSX.Element;
  name: string;
  description: string;
}

export const AchievementGrid = () => {
  const achievements: Achievement[] = [
    { icon: <Award className="h-8 w-8" />, name: "First Lesson", description: "Complete your first video lesson" },
    { icon: <Clock className="h-8 w-8" />, name: "7-Day Streak", description: "Learn for 7 consecutive days" },
    { icon: <Trophy className="h-8 w-8" />, name: "Quiz Master", description: "Score 100% on 5 different quizzes" },
    { icon: <Star className="h-8 w-8" />, name: "Top Contributor", description: "Help others in the community" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Latest Achievements</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((achievement, i) => (
          <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-elec-dark flex items-center justify-center mb-3">
                <div className="text-elec-yellow/50">{achievement.icon}</div>
              </div>
              <h3 className="font-medium mb-1">{achievement.name}</h3>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
