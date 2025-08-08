import * as React from "react";
import { Lightbulb } from "lucide-react";
import InfoBox from "@/components/common/InfoBox";

interface WhyThisMattersProps {
  title?: string;
  points: string[];
  className?: string;
}

const WhyThisMatters: React.FC<WhyThisMattersProps> = ({
  title = "Why this matters",
  points,
  className,
}) => {
  if (!points?.length) return null;

  return (
    <InfoBox
      title={title}
      icon={<Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />}
      points={points}
      className={className}
    />
  );
};

export default WhyThisMatters;
