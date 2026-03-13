import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type {
  HazardTableSection as HazardTableSectionType,
  HazardRow,
} from '@/types/safety-template';
import { getRiskColour, getRiskLabel } from '@/utils/safety-template-renderer';

interface Props {
  section: HazardTableSectionType;
  mode: 'preview' | 'edit';
  onChange?: (section: HazardTableSectionType) => void;
}

function RiskBadge({ rating }: { rating: number }) {
  return (
    <span
      className={`inline-flex items-center justify-center min-w-[2rem] px-1.5 py-0.5 rounded text-[11px] font-bold ${getRiskColour(rating)}`}
    >
      {rating} ({getRiskLabel(rating)})
    </span>
  );
}

function HazardCard({
  hazard,
  index,
  mode,
  onUpdate,
  onRemove,
}: {
  hazard: HazardRow;
  index: number;
  mode: 'preview' | 'edit';
  onUpdate?: (h: HazardRow) => void;
  onRemove?: () => void;
}) {
  const [expanded, setExpanded] = useState(mode === 'edit');

  if (mode === 'preview') {
    return (
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left rounded-lg border border-white/[0.08] bg-white/[0.02] touch-manipulation"
      >
        <div className="p-3 flex items-start gap-3">
          <span className="text-[11px] font-bold text-white bg-white/[0.06] rounded w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
            {index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white">{hazard.hazard}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-[10px] text-white">Risk:</span>
              <RiskBadge rating={hazard.risk_rating} />
              <span className="text-[10px] text-white mx-1">Residual:</span>
              <RiskBadge rating={hazard.residual_risk} />
            </div>
            {expanded && (
              <div className="mt-2 space-y-2">
                <p className="text-[11px] text-white">
                  <span className="font-semibold">Who at risk:</span> {hazard.who_at_risk}
                </p>
                <p className="text-[11px] text-white">
                  <span className="font-semibold">
                    Initial: L{hazard.likelihood} x S{hazard.severity} = {hazard.risk_rating}
                  </span>
                </p>
                <div>
                  <p className="text-[11px] font-semibold text-white mb-1">Controls:</p>
                  <ul className="space-y-0.5">
                    {hazard.controls.map((c, ci) => (
                      <li key={ci} className="text-[11px] text-white flex items-start gap-1.5">
                        <span className="text-green-400 mt-0.5 flex-shrink-0">&#10003;</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-[11px] text-white">
                  <span className="font-semibold">
                    Residual: L{hazard.residual_likelihood} x S{hazard.residual_severity} ={' '}
                    {hazard.residual_risk}
                  </span>
                </p>
              </div>
            )}
          </div>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
          )}
        </div>
      </button>
    );
  }

  // Edit mode
  const update = (patch: Partial<HazardRow>) => {
    const updated = { ...hazard, ...patch };
    updated.risk_rating = updated.likelihood * updated.severity;
    updated.residual_risk = updated.residual_likelihood * updated.residual_severity;
    onUpdate?.(updated);
  };

  return (
    <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-white bg-white/[0.06] rounded w-6 h-6 flex items-center justify-center">
          {index + 1}
        </span>
        <button
          onClick={onRemove}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-red-400 active:bg-red-500/10 touch-manipulation"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <Input
        value={hazard.hazard}
        onChange={(e) => update({ hazard: e.target.value })}
        placeholder="Hazard description"
        className="h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white"
      />
      <Input
        value={hazard.who_at_risk}
        onChange={(e) => update({ who_at_risk: e.target.value })}
        placeholder="Who is at risk"
        className="h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white"
      />

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-[10px] font-semibold text-white block mb-1">Likelihood</label>
          <select
            value={hazard.likelihood}
            onChange={(e) => update({ likelihood: Number(e.target.value) })}
            className="w-full h-11 rounded-lg bg-white/[0.03] border border-white/[0.1] text-white text-sm px-2 touch-manipulation"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-semibold text-white block mb-1">Severity</label>
          <select
            value={hazard.severity}
            onChange={(e) => update({ severity: Number(e.target.value) })}
            className="w-full h-11 rounded-lg bg-white/[0.03] border border-white/[0.1] text-white text-sm px-2 touch-manipulation"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-semibold text-white block mb-1">Risk</label>
          <div className="h-11 flex items-center">
            <RiskBadge rating={hazard.risk_rating} />
          </div>
        </div>
      </div>

      <div>
        <label className="text-[10px] font-semibold text-white block mb-1">Controls</label>
        {hazard.controls.map((c, ci) => (
          <div key={ci} className="flex gap-2 mb-1.5">
            <Input
              value={c}
              onChange={(e) => {
                const controls = [...hazard.controls];
                controls[ci] = e.target.value;
                update({ controls });
              }}
              className="h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white flex-1"
              placeholder="Control measure"
            />
            <button
              onClick={() => {
                const controls = hazard.controls.filter((_, i) => i !== ci);
                update({ controls });
              }}
              className="h-11 w-11 rounded-lg flex items-center justify-center text-red-400 active:bg-red-500/10 touch-manipulation flex-shrink-0"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        <button
          onClick={() => update({ controls: [...hazard.controls, ''] })}
          className="text-[11px] text-elec-yellow font-semibold flex items-center gap-1 touch-manipulation h-8"
        >
          <Plus className="h-3 w-3" /> Add control
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-[10px] font-semibold text-white block mb-1">Residual L</label>
          <select
            value={hazard.residual_likelihood}
            onChange={(e) => update({ residual_likelihood: Number(e.target.value) })}
            className="w-full h-11 rounded-lg bg-white/[0.03] border border-white/[0.1] text-white text-sm px-2 touch-manipulation"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-semibold text-white block mb-1">Residual S</label>
          <select
            value={hazard.residual_severity}
            onChange={(e) => update({ residual_severity: Number(e.target.value) })}
            className="w-full h-11 rounded-lg bg-white/[0.03] border border-white/[0.1] text-white text-sm px-2 touch-manipulation"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-semibold text-white block mb-1">Residual</label>
          <div className="h-11 flex items-center">
            <RiskBadge rating={hazard.residual_risk} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HazardTableSection({ section, mode, onChange }: Props) {
  const updateHazard = (index: number, h: HazardRow) => {
    const hazards = [...section.hazards];
    hazards[index] = h;
    onChange?.({ ...section, hazards });
  };

  const removeHazard = (index: number) => {
    const hazards = section.hazards.filter((_, i) => i !== index);
    onChange?.({ ...section, hazards });
  };

  const addHazard = () => {
    const newHazard: HazardRow = {
      hazard: '',
      who_at_risk: 'Operatives, other trades',
      likelihood: 2,
      severity: 3,
      risk_rating: 6,
      controls: [''],
      residual_likelihood: 1,
      residual_severity: 3,
      residual_risk: 3,
    };
    onChange?.({ ...section, hazards: [...section.hazards, newHazard] });
  };

  return (
    <div className="space-y-2">
      {section.hazards.map((h, i) => (
        <HazardCard
          key={i}
          hazard={h}
          index={i}
          mode={mode}
          onUpdate={(updated) => updateHazard(i, updated)}
          onRemove={() => removeHazard(i)}
        />
      ))}
      {mode === 'edit' && (
        <button
          onClick={addHazard}
          className="w-full h-11 rounded-xl border border-dashed border-white/[0.15] text-white text-sm font-semibold flex items-center justify-center gap-2 touch-manipulation active:bg-white/[0.03]"
        >
          <Plus className="h-4 w-4" /> Add Hazard
        </button>
      )}
    </div>
  );
}

export default HazardTableSection;
