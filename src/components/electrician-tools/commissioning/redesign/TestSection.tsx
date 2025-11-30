import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface TestSectionProps {
  title: string;
  icon: ReactNode;
  count: number;
  variant: "dead" | "live";
  children: ReactNode;
}

export const TestSection = ({ 
  title, 
  icon, 
  children 
}: TestSectionProps) => {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <Card className="bg-card border-elec-yellow/20 hover:border-elec-yellow/30">
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="text-elec-yellow shrink-0">
              {icon}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
          </div>
        </div>
      </Card>

      {/* Section Content */}
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};
