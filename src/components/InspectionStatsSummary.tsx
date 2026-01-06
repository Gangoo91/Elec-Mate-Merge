
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'not-verified' | 'limitation' | '';
  notes?: string;
}

interface InspectionStatsSummaryProps {
  inspectionItems: InspectionItem[];
}

const InspectionStatsSummary = ({ inspectionItems }: InspectionStatsSummaryProps) => {
  const criticalIssues = inspectionItems.filter(item => item.outcome === 'C1' || item.outcome === 'C2').length;
  const improvements = inspectionItems.filter(item => item.outcome === 'C3').length;
  const satisfactory = inspectionItems.filter(item => item.outcome === 'satisfactory').length;

  // Only show if there are any stats to display
  if (criticalIssues === 0 && improvements === 0 && satisfactory === 0) {
    return null;
  }

  return (
    <Card className="bg-card border border-border/30 rounded-xl">
      <CardContent className="p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-500">{satisfactory}</div>
            <div className="text-xs text-foreground/80">Satisfactory</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-yellow-500">{improvements}</div>
            <div className="text-xs text-foreground/80">Improvements (C3)</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-red-500">{criticalIssues}</div>
            <div className="text-xs text-foreground/80">Critical Issues (C1/C2)</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InspectionStatsSummary;
