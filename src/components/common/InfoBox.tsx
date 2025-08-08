import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface InfoBoxProps {
  title: string;
  icon?: React.ReactNode;
  points?: string[];
  className?: string;
  as?: "aside" | "section" | "div";
}

// Mobile-first, reusable info box with consistent dark elec styling
const InfoBox: React.FC<InfoBoxProps & { children?: React.ReactNode }> = ({
  title,
  icon,
  points,
  className,
  as: As = "aside",
  children,
}) => {
  const Section: any = As as any;

  return (
    <Section aria-label={title} className={cn("mb-4 sm:mb-6", className)}>
      <Card className="border-elec-yellow/20 bg-elec-dark/40">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {children}
          {points?.length ? (
            <ul className="list-disc pl-5 space-y-1.5 text-elec-light text-sm sm:text-[0.95rem]">
              {points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          ) : null}
        </CardContent>
      </Card>
    </Section>
  );
};

export default InfoBox;
