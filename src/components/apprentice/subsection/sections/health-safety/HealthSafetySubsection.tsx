
import React, { useEffect } from "react";
import { SubsectionProps } from "../../types";

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

  useEffect(() => {
    // Fix the import path to correctly reference the components
    import(`../../../content/Subsection${subsectionType}`)
      .then(module => {
        setComponent(() => module.default);
      })
      .catch(error => {
        console.error("Failed to load subsection component:", error);
        setComponent(null);
      });
  }, [subsectionType]);

  if (!Component) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">Loading content...</p>
        <p className="text-xs text-muted-foreground mt-2">If this message persists, there might be an issue with the content loading.</p>
      </div>
    );
  }

  return <Component subsectionId={subsectionId} isCompleted={isCompleted} markAsComplete={markAsComplete} />;
};

export default HealthSafetySubsection;
