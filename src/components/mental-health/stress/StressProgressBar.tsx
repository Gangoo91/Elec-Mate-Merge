
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const StressProgressBar = () => {
  const [progressValue] = useState(65);

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Your Stress Management Progress</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Beginner</span>
          <span>Intermediate</span>
          <span>Advanced</span>
        </div>
        <Progress value={progressValue} className="h-2" />
        <p className="text-sm text-muted-foreground">
          You've completed {progressValue}% of stress management techniques
        </p>
      </div>
    </div>
  );
};

export default StressProgressBar;
