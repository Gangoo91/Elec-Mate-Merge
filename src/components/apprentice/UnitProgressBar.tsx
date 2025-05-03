
import { Progress } from "@/components/ui/progress";

interface UnitProgressBarProps {
  progressPercent: number;
}

const UnitProgressBar = ({ progressPercent }: UnitProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">Unit Progress</span>
        <span className="text-sm font-medium">{progressPercent}%</span>
      </div>
      <Progress value={progressPercent} className="h-2 bg-elec-yellow/20" />
    </div>
  );
};

export default UnitProgressBar;
