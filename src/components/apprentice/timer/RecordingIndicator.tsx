
import { Circle } from "lucide-react";
import { useAutomatedTraining } from "@/hooks/useAutomatedTraining";
import { cn } from "@/lib/utils";

interface RecordingIndicatorProps {
  className?: string;
  showText?: boolean;
}

/**
 * A small indicator that shows when training time is being recorded
 */
const RecordingIndicator = ({ className, showText = false }: RecordingIndicatorProps) => {
  const { isTracking } = useAutomatedTraining();
  
  if (!isTracking) return null;
  
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Circle 
        className={cn(
          "h-2.5 w-2.5 fill-green-500 text-green-500", 
          isTracking && "animate-pulse"
        )} 
      />
      {showText && (
        <span className="text-xs text-green-400 font-medium">Recording</span>
      )}
    </div>
  );
};

export default RecordingIndicator;
