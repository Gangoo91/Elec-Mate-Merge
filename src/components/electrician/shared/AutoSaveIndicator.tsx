import React, { useEffect, useState } from "react";
import { Cloud, CloudOff, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutoSaveIndicatorProps {
  isSaving?: boolean;
  lastSaved?: Date;
  className?: string;
}

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  isSaving = false,
  lastSaved,
  className
}) => {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    if (!lastSaved) return;

    const updateTimeAgo = () => {
      const seconds = Math.floor((Date.now() - lastSaved.getTime()) / 1000);
      
      if (seconds < 60) {
        setTimeAgo("Just now");
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        setTimeAgo(`${minutes}m ago`);
      } else {
        const hours = Math.floor(seconds / 3600);
        setTimeAgo(`${hours}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [lastSaved]);

  if (!lastSaved && !isSaving) return null;

  return (
    <div className={cn(
      "flex items-center gap-2 text-sm text-muted-foreground px-3 py-1.5 rounded-lg bg-card/50 border border-border/50",
      className
    )}>
      {isSaving ? (
        <>
          <Cloud className="h-4 w-4 animate-pulse text-primary" />
          <span>Saving...</span>
        </>
      ) : lastSaved ? (
        <>
          <Check className="h-4 w-4 text-green-500" />
          <span>Saved {timeAgo}</span>
        </>
      ) : null}
    </div>
  );
};
