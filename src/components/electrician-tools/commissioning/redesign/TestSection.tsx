import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface TestSectionProps {
  title: string;
  icon: ReactNode;
  count: number;
  variant: "visual" | "dead" | "live";
  children: ReactNode;
}

export const TestSection = ({ 
  title, 
  icon, 
  count,
  children 
}: TestSectionProps) => {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <Card className="bg-card border-elec-yellow/20 hover:border-elec-yellow/30">
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-elec-yellow">
                {icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <p className="text-sm text-white/70 mt-1">
                  {count} {count === 1 ? 'item' : 'items'} to complete
                </p>
              </div>
            </div>
            <div className="text-3xl font-bold text-elec-yellow">
              {count}
            </div>
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
