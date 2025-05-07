
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface MilestonesDisplayProps {
  className?: string;
}

export const MilestonesDisplay = ({ className }: MilestonesDisplayProps) => {
  const [achievedMilestones, setAchievedMilestones] = useState<number[]>([]);
  
  useEffect(() => {
    // Load achieved milestones from localStorage
    const storedMilestones = JSON.parse(localStorage.getItem('achievedMilestones') || '[]');
    setAchievedMilestones(storedMilestones);
  }, []);
  
  if (achievedMilestones.length === 0) {
    return null; // Don't show anything if no milestones achieved
  }
  
  return (
    <Card className={cn("border-elec-yellow/20 bg-elec-gray", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-elec-yellow" />
          Learning Milestones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {achievedMilestones.map((minutes, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-elec-yellow" />
              <span>
                {minutes < 60 
                  ? `${minutes} minutes of learning` 
                  : `${Math.floor(minutes / 60)} hour${minutes >= 120 ? 's' : ''} of learning`}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestonesDisplay;
