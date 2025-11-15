import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Loader2 } from "lucide-react";

interface Stage {
  name: string;
  description: string;
  status: 'pending' | 'active' | 'complete';
}

interface DesignProcessingTimelineProps {
  stages: Stage[];
}

export function DesignProcessingTimeline({ stages }: DesignProcessingTimelineProps) {
  return (
    <div className="space-y-4">
      {stages.map((stage, index) => {
        const isLast = index === stages.length - 1;
        
        return (
          <div key={index} className="relative">
            {/* Timeline Line */}
            {!isLast && (
              <div className={cn(
                "absolute left-4 top-8 w-0.5 h-full -ml-px",
                stage.status === 'complete' ? "bg-primary" : "bg-muted"
              )} />
            )}
            
            {/* Stage Item */}
            <div className="flex gap-4 items-start">
              {/* Icon */}
              <div className={cn(
                "rounded-full p-2 flex items-center justify-center flex-shrink-0",
                stage.status === 'complete' && "bg-primary text-primary-foreground",
                stage.status === 'active' && "bg-primary/20 text-primary",
                stage.status === 'pending' && "bg-muted text-muted-foreground"
              )}>
                {stage.status === 'complete' && <CheckCircle className="h-4 w-4" />}
                {stage.status === 'active' && <Loader2 className="h-4 w-4 animate-spin" />}
                {stage.status === 'pending' && <Circle className="h-4 w-4" />}
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-8">
                <div className={cn(
                  "font-medium",
                  stage.status === 'active' && "text-primary",
                  stage.status === 'pending' && "text-muted-foreground"
                )}>
                  {stage.name}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stage.description}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
