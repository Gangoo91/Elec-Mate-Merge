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
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-elec-light flex items-center gap-3 text-base sm:text-lg font-medium">
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {children}
          {points?.length ? (
            <ul className="space-y-1.5 text-elec-light text-sm sm:text-[0.95rem]">
              {points.map((p, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                  <span className="flex-1 leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </CardContent>
      </Card>
    </Section>
  );
};

export default InfoBox;
