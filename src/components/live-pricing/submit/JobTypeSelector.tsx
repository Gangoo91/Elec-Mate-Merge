/**
 * JobTypeSelector - Unified entry point for job type selection
 *
 * Automatically renders:
 * - Mobile (<640px): Bottom sheet with search (JobTypeSelectorMobile)
 * - Desktop (>=640px): Inline popover combobox (JobTypeSelectorDesktop)
 */

import React, { useEffect, useState } from "react";
import { JobTypeConfig } from "@/hooks/useJobTypes";
import JobTypeSelectorMobile from "./JobTypeSelectorMobile";
import JobTypeSelectorDesktop from "./JobTypeSelectorDesktop";

export interface JobTypeSelectorProps {
  value: string | null;
  onChange: (jobType: string | null, config: JobTypeConfig | null) => void;
  className?: string;
}

const JobTypeSelector: React.FC<JobTypeSelectorProps> = ({
  value,
  onChange,
  className,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <JobTypeSelectorMobile
        value={value}
        onChange={onChange}
        className={className}
      />
    );
  }

  return (
    <JobTypeSelectorDesktop
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default JobTypeSelector;
