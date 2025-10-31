import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AIProgressIndicatorProps {
  stage: 'parsing' | 'searching' | 'analyzing' | 'generating' | 'complete';
  message?: string;
  showTimeline?: boolean;
}

export const AIProgressIndicator = ({ 
  stage, 
  message, 
  showTimeline = false 
}: AIProgressIndicatorProps) => {
  const progressMap = {
    'parsing': 25,
    'searching': 50,
    'analyzing': 75,
    'generating': 90,
    'complete': 100
  };

  const stageLabels = {
    'parsing': 'Understanding your request...',
    'searching': 'Searching BS 7671 regulations...',
    'analyzing': 'Analyzing requirements...',
    'generating': 'Generating response...',
    'complete': 'Complete!'
  };

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-center gap-3">
        <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />
        <span className="text-sm font-medium text-elec-light">
          {message || stageLabels[stage]}
        </span>
      </div>
      
      <Progress 
        value={progressMap[stage]} 
        className="h-1.5 bg-elec-dark"
      />
      
      {showTimeline && (
        <div className="flex gap-2 mt-4">
          {Object.keys(progressMap).map((s) => (
            <div 
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                progressMap[s as keyof typeof progressMap] <= progressMap[stage]
                  ? 'bg-elec-yellow'
                  : 'bg-elec-gray/20'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
