import React from 'react';
import DefectObservationCard from './DefectObservationCard';

interface DefectObservation {
  id: string;
  item: string;
  defectCode: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A' | 'LIM';
  description: string;
  recommendation: string;
  rectified: boolean;
  inspectionItemId?: string;
}

interface DefectObservationsListProps {
  defectObservations: DefectObservation[];
  reportId: string;
  onAddObservation: () => void;
  onUpdateObservation: (
    id: string,
    field: keyof DefectObservation | '__BULK__',
    value: any
  ) => void;
  onRemoveObservation: (id: string) => void;
  certificateContext?: {
    certificateNumber?: string;
    certificateType?: 'eicr' | 'eic';
    installationAddress?: string;
    clientName?: string;
    clientPhone?: string;
    clientEmail?: string;
    inspectorName?: string;
    companyName?: string;
    companyPhone?: string;
    companyEmail?: string;
    registrationScheme?: string;
    registrationNumber?: string;
  };
}

const DefectObservationsList = ({
  defectObservations,
  reportId,
  onAddObservation,
  onUpdateObservation,
  onRemoveObservation,
  certificateContext,
}: DefectObservationsListProps) => {
  if (defectObservations.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-white/[0.06] rounded-xl">
        <p className="text-white text-sm mb-1">No observations recorded</p>
        <p className="text-white/25 text-xs">
          Complete the inspection checklist to auto-populate observations
        </p>
      </div>
    );
  }

  // Count by category for the summary banner
  const c1Count = defectObservations.filter((d) => d.defectCode === 'C1').length;
  const c2Count = defectObservations.filter((d) => d.defectCode === 'C2').length;
  const c3Count = defectObservations.filter((d) => d.defectCode === 'C3').length;
  const fiCount = defectObservations.filter((d) => d.defectCode === 'FI').length;

  return (
    <div className="space-y-4">
      {/* Summary banner — BS 7671:2018+A4:2026 Section K */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5">
        <div className="flex items-center gap-2 flex-wrap">
          {c1Count > 0 && (
            <span className="text-xs font-bold text-red-300 bg-red-500/20 border border-red-500/40 px-2.5 py-1 rounded-lg">
              {c1Count} C1
            </span>
          )}
          {c2Count > 0 && (
            <span className="text-xs font-bold text-orange-300 bg-orange-500/20 border border-orange-500/40 px-2.5 py-1 rounded-lg">
              {c2Count} C2
            </span>
          )}
          {c3Count > 0 && (
            <span className="text-xs font-bold text-yellow-300 bg-yellow-500/20 border border-yellow-500/40 px-2.5 py-1 rounded-lg">
              {c3Count} C3
            </span>
          )}
          {fiCount > 0 && (
            <span className="text-xs font-bold text-blue-300 bg-blue-500/20 border border-blue-500/40 px-2.5 py-1 rounded-lg">
              {fiCount} FI
            </span>
          )}
        </div>
        {(c1Count > 0 || c2Count > 0) && (
          <p className="text-xs text-red-300/80 mt-2.5 leading-relaxed">
            C1/C2 observations affect the overall assessment. Immediate or urgent remedial action is required.
          </p>
        )}
        {(c3Count > 0 || fiCount > 0) && (
          <p className="text-xs text-white/50 mt-2 leading-relaxed">
            C3/FI observations are advisory and do not affect the overall assessment.
          </p>
        )}
      </div>

      {/* All observations in stable order — no DOM movement on code change */}
      {defectObservations.map((defect, index) => (
        <DefectObservationCard
          key={defect.id}
          defect={defect}
          reportId={reportId}
          index={index}
          onUpdate={onUpdateObservation}
          onRemove={onRemoveObservation}
          certificateContext={certificateContext}
        />
      ))}
    </div>
  );
};

export default DefectObservationsList;
