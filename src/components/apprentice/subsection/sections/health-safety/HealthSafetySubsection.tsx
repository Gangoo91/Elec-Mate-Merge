
import React, { useEffect, useState } from "react";
import { SubsectionProps } from "../../types";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface HealthSafetySubsectionProps extends SubsectionProps {
  subsectionType: string;
}

const HealthSafetySubsection = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete, 
  subsectionType 
}: HealthSafetySubsectionProps) => {
  // Dynamic import to prevent reference errors
  const [Component, setComponent] = React.useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    console.log("HealthSafetySubsection - Loading component for type:", subsectionType);
    setIsLoading(true);
    setLoadError(false);
    
    // First try the new folder structure
    import(`../../../content/subsection${subsectionType}/index`)
      .then(module => {
        console.log("Successfully loaded from new path structure");
        setComponent(() => module.default);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to load from new path structure:", error);
        
        // Fallback to old file structure
        import(`../../../content/Subsection${subsectionType}`)
          .then(module => {
            console.log("Successfully loaded from old path structure");
            setComponent(() => module.default);
            setIsLoading(false);
          })
          .catch(secondError => {
            console.error("All import attempts failed:", secondError);
            setComponent(null);
            setIsLoading(false);
            setLoadError(true);
            toast({
              title: "Content Load Error",
              description: "Failed to load the subsection content. Please try again later.",
              variant: "destructive"
            });
          });
      });
  }, [subsectionType]);

  if (isLoading) {
    return (
      <div className="p-6 text-center animate-pulse">
        <p className="text-muted-foreground font-medium">Loading content...</p>
        <p className="text-xs text-muted-foreground mt-2">Please wait while we load your learning materials.</p>
      </div>
    );
  }

  if (loadError || !Component) {
    return (
      <div className="p-6 text-center bg-red-900/10 border border-red-600/30 rounded-md">
        <p className="text-muted-foreground">Failed to load content</p>
        <p className="text-xs text-muted-foreground mt-2">
          There was an issue loading this section. This might be due to a technical problem or missing content.
        </p>
      </div>
    );
  }

  return <Component subsectionId={subsectionId} isCompleted={isCompleted} markAsComplete={markAsComplete} />;
};

export default HealthSafetySubsection;
