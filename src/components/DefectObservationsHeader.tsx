
import React from 'react';
import { CardTitle } from '@/components/ui/card';
import { Circle, CheckCircle } from 'lucide-react';

interface DefectObservationsHeaderProps {
  hasUnsavedChanges: boolean;
  criticalIssues: number;
  improvements: number;
}

const DefectObservationsHeader = ({ 
  hasUnsavedChanges, 
  criticalIssues, 
  improvements 
}: DefectObservationsHeaderProps) => {
  return (
    <CardTitle className="text-elec-yellow">
      <div className="flex items-center gap-2">
        <span className="font-semibold">Defects and Observations</span>
        {hasUnsavedChanges ? (
          <Circle className="h-4 w-4 text-orange-500 fill-current" />
        ) : (
          <CheckCircle className="h-4 w-4 text-green-500" />
        )}
      </div>
    </CardTitle>
  );
};

export default DefectObservationsHeader;
