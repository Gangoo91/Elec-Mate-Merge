import React, { useEffect, useState } from 'react';
import { SubsectionProps } from '../../types';
import { toast } from '@/hooks/use-toast';

interface HealthSafetySubsectionProps extends SubsectionProps {
  subsectionType: string;
}

const HealthSafetySubsection = ({
  subsectionId,
  isCompleted,
  markAsComplete,
  subsectionType,
}: HealthSafetySubsectionProps) => {
  // Dynamic import to prevent reference errors
  const [Component, setComponent] = React.useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    console.log('HealthSafetySubsection - Loading component for type:', subsectionType);
    setIsLoading(true);
    setLoadError(false);

    // First try the new folder structure
    import(`../../../content/subsection${subsectionType}/index`)
      .then((module) => {
        console.log('Successfully loaded from new path structure');
        setComponent(() => module.default);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load from new path structure:', error);

        // Fallback to old file structure
        import(`../../../content/Subsection${subsectionType}`)
          .then((module) => {
            console.log('Successfully loaded from old path structure');
            setComponent(() => module.default);
            setIsLoading(false);
          })
          .catch((secondError) => {
            console.error('All import attempts failed:', secondError);
            setComponent(null);
            setIsLoading(false);
            setLoadError(true);
            toast({
              title: 'Content Load Error',
              description: 'Failed to load the subsection content. Please try again later.',
              variant: 'destructive',
            });
          });
      });
  }, [subsectionType]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 text-center animate-pulse space-y-1">
        <p className="text-[14px] text-white/85 leading-relaxed">Loading content...</p>
        <p className="text-[12px] text-white/55">
          Please wait while we load your learning materials.
        </p>
      </div>
    );
  }

  if (loadError || !Component) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Load error
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          There was an issue loading this section. This might be due to a technical problem or
          missing content.
        </p>
      </div>
    );
  }

  return (
    <Component
      subsectionId={subsectionId}
      isCompleted={isCompleted}
      markAsComplete={markAsComplete}
    />
  );
};

export default HealthSafetySubsection;
