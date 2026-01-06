
import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'not-verified' | 'limitation' | '';
  notes?: string;
}

interface InspectionSectionItem {
  id: string;
  item: string;
  clause: string;
  description?: string;
}

interface InspectionSectionProgressProps {
  sectionItems: InspectionSectionItem[];
  inspectionItems: InspectionItem[];
}

const InspectionSectionProgress = ({ sectionItems, inspectionItems }: InspectionSectionProgressProps) => {
  const getSectionProgress = () => {
    const filteredItems = inspectionItems.filter(item => 
      sectionItems.some(sItem => sItem.id === item.id)
    );
    const inspectedItems = filteredItems.filter(item => item.outcome !== '');
    // Ensure we always show the actual section item count, not filtered count
    return { total: sectionItems.length, completed: inspectedItems.length };
  };

  const progress = getSectionProgress();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <div className="text-xs bg-muted px-2 py-1 rounded whitespace-nowrap">
        {progress.completed}/{progress.total} completed
      </div>
      <div className="flex items-center justify-center sm:justify-start">
        {progress.completed === progress.total && progress.total > 0 ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : progress.completed > 0 ? (
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        ) : (
          <div className="h-4 w-4 bg-white/10 rounded-full" />
        )}
      </div>
    </div>
  );
};

export default InspectionSectionProgress;
