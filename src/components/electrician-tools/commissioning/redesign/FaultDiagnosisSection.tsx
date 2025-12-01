import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface FaultDiagnosisSectionProps {
  title: string;
  icon: ReactNode;
  count: number;
  variant: "diagnostic" | "fix";
  children: ReactNode;
}

export const FaultDiagnosisSection = ({ 
  title, 
  icon, 
  children 
}: FaultDiagnosisSectionProps) => {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <Card className="bg-card border-red-500/20 hover:border-red-500/30">
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="text-red-400 shrink-0">
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
