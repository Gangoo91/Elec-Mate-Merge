import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhyThisMattersProps {
  title?: string;
  points: string[];
  className?: string;
}

const WhyThisMatters: React.FC<WhyThisMattersProps> = ({ title = "Why this matters", points, className }) => {
  if (!points?.length) return null;

  return (
    <section aria-label="Why this matters" className={cn("mb-6", className)}>
      <Card className="border-elec-yellow/20 bg-elec-dark/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="list-disc pl-5 space-y-1 text-elec-light text-sm">
            {points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default WhyThisMatters;
