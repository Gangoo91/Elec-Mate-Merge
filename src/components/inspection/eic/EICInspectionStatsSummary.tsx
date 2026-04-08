import React from 'react';

interface EICInspectionItem {
  id: string;
  itemNumber: string;
  description: string;
  outcome: '' | 'satisfactory' | 'not-applicable' | 'limitation';
  notes?: string;
}

interface EICInspectionStatsSummaryProps {
  inspectionItems: EICInspectionItem[];
}

const EICInspectionStatsSummary: React.FC<EICInspectionStatsSummaryProps> = ({
  inspectionItems,
}) => {
  const totalItems = inspectionItems.length;
  const completed = inspectionItems.filter((item) => item.outcome !== '').length;
  const satisfactory = inspectionItems.filter((item) => item.outcome === 'satisfactory').length;
  const notApplicable = inspectionItems.filter((item) => item.outcome === 'not-applicable').length;
  const limitation = inspectionItems.filter((item) => item.outcome === 'limitation').length;

  if (completed === 0) {
    return null;
  }

  return (
    <div className="bg-white/[0.03] rounded-lg p-3">
      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="space-y-1">
          <div className="text-xl font-bold text-elec-yellow">
            {completed}/{totalItems}
          </div>
          <div className="text-[10px] text-white">Completed</div>
        </div>
        <div className="space-y-1">
          <div className="text-xl font-bold text-green-400">{satisfactory}</div>
          <div className="text-[10px] text-white">Satisfactory</div>
        </div>
        <div className="space-y-1">
          <div className="text-xl font-bold text-white">{notApplicable}</div>
          <div className="text-[10px] text-white">N/A</div>
        </div>
        <div className="space-y-1">
          <div className="text-xl font-bold text-amber-500">{limitation}</div>
          <div className="text-[10px] text-white">LIM</div>
        </div>
      </div>
    </div>
  );
};

export default EICInspectionStatsSummary;
