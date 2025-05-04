
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface AchievementCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  progress: number;
}

export const AchievementCard = ({ icon, name, description, progress }: AchievementCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="pt-6 flex flex-col items-center text-center">
        <div className="h-16 w-16 rounded-full bg-elec-dark flex items-center justify-center mb-3">
          <div className="text-elec-yellow/50">{icon}</div>
        </div>
        <h3 className="font-medium mb-1">{name}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="w-full mt-3">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-right mt-1">{Math.round(progress)}%</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
