
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface EICInspectionItem {
  id: string;
  itemNumber: string;
  description: string;
  outcome: '' | 'satisfactory' | 'not-applicable';
  notes?: string;
}

interface EICInspectionStatsSummaryProps {
  inspectionItems: EICInspectionItem[];
}

const EICInspectionStatsSummary: React.FC<EICInspectionStatsSummaryProps> = ({ inspectionItems }) => {
  const totalItems = inspectionItems.length;
  const completed = inspectionItems.filter(item => item.outcome !== '').length;
  const satisfactory = inspectionItems.filter(item => item.outcome === 'satisfactory').length;
  const notApplicable = inspectionItems.filter(item => item.outcome === 'not-applicable').length;

  // Only show if there are any stats to display
  if (completed === 0) {
    return null;
  }

  return (
    <Card className="border border-border bg-card rounded-xl">
      <CardContent className="p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-bold text-elec-yellow">{completed}/{totalItems}</div>
            <div className="text-xs text-foreground/80">Completed</div>
          </div>
          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-bold text-green-500">{satisfactory}</div>
            <div className="text-xs text-foreground/80">Satisfactory</div>
          </div>
          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-bold text-neutral-400">{notApplicable}</div>
            <div className="text-xs text-foreground/80">Not Applicable</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EICInspectionStatsSummary;
