
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
    import(`../../../content/Subsection${subsectionType}`).then(module => {
      setComponent(() => module.default);
    });
  }, [subsectionType]);

  if (!Component) {
    return <p>Loading content...</p>;
  }

  return <Component subsectionId={subsectionId} isCompleted={isCompleted} markAsComplete={markAsComplete} />;
};

export default HealthSafetySubsection;
