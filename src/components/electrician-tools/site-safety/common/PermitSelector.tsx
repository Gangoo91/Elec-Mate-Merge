import React, { useMemo } from 'react';
import { CheckCircle2, FileText, X } from 'lucide-react';
import { useActivePermits, type PermitType, type PermitToWork } from '@/hooks/usePermitsToWork';

interface PermitSelectorProps {
  /** Filter to specific permit types, e.g. ['hot-work'] or ['electrical-isolation'] */
  permitTypes?: PermitType[];
  /** Currently selected permit ID */
  selectedPermitId: string | null;
  /** Called when a permit is selected or cleared */
  onSelect: (permitId: string | null, permit: PermitToWork | null) => void;
  /** Section label */
  label?: string;
}

export function PermitSelector({
  permitTypes,
  selectedPermitId,
  onSelect,
  label = 'Link to Permit (Optional)',
}: PermitSelectorProps) {
  const { data: activePermits = [] } = useActivePermits();

  const filteredPermits = useMemo(
    () =>
      permitTypes ? activePermits.filter((p) => permitTypes.includes(p.type)) : activePermits,
    [activePermits, permitTypes]
  );

  if (filteredPermits.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <FileText className="w-4 h-4 text-elec-yellow" />
        {label}
      </h3>
      <div className="space-y-2">
        {selectedPermitId && (
          <button
            onClick={() => onSelect(null, null)}
            className="w-full h-11 rounded-xl bg-white/5 border border-white/10 text-sm text-white flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all"
          >
            <X className="w-4 h-4" /> Clear Selection
          </button>
        )}
        {filteredPermits.map((permit) => (
          <button
            key={permit.id}
            onClick={() => onSelect(permit.id, permit)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border touch-manipulation active:scale-[0.99] transition-all ${
              selectedPermitId === permit.id
                ? 'bg-elec-yellow/10 border-elec-yellow/30'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedPermitId === permit.id
                  ? 'bg-elec-yellow border-elec-yellow'
                  : 'border-white/30'
              }`}
            >
              {selectedPermitId === permit.id && (
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-white">{permit.title}</p>
              <p className="text-xs text-white">
                {permit.location} &middot; {permit.issuer_name}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PermitSelector;
