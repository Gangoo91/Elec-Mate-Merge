import React from 'react';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PhaseTypeCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

/**
 * PhaseTypeCell — circuit phase / phase-assignment for the schedule of tests.
 *
 * Encodes both `phaseType` and `phaseAssignment` in one selector so a row
 * always shows what the user wants to see at a glance:
 *
 *   "L1"           → 1P circuit on phase L1
 *   "L2"           → 1P circuit on phase L2
 *   "L3"           → 1P circuit on phase L3
 *   "L1+L2+L3"     → 3P circuit (all three phases)
 *   "1P"           → 1P circuit, phase unspecified (single-phase board)
 *   "—" / "N/A"    → not applicable
 */
type PhaseValue = 'NA' | '1P' | 'L1' | 'L2' | 'L3' | 'L1+L2+L3';

const decode = (result: TestResult): PhaseValue => {
  const phaseType = result.phaseType;
  const assignment = result.phaseAssignment;

  if (phaseType === '3P' || assignment === 'L1,L2,L3') return 'L1+L2+L3';
  if (assignment === 'L1') return 'L1';
  if (assignment === 'L2') return 'L2';
  if (assignment === 'L3') return 'L3';
  if (phaseType === '1P') return '1P';
  return 'NA';
};

const apply = (
  value: PhaseValue,
  onUpdate: (id: string, field: keyof TestResult, value: string) => void,
  id: string
) => {
  switch (value) {
    case 'L1+L2+L3':
      onUpdate(id, 'phaseType', '3P');
      onUpdate(id, 'phaseAssignment', 'L1,L2,L3');
      return;
    case 'L1':
    case 'L2':
    case 'L3':
      onUpdate(id, 'phaseType', '1P');
      onUpdate(id, 'phaseAssignment', value);
      return;
    case '1P':
      onUpdate(id, 'phaseType', '1P');
      onUpdate(id, 'phaseAssignment', '');
      return;
    case 'NA':
    default:
      onUpdate(id, 'phaseType', '');
      onUpdate(id, 'phaseAssignment', '');
      return;
  }
};

const labelFor = (v: PhaseValue): string => {
  if (v === 'L1+L2+L3') return '3P';
  if (v === 'L1' || v === 'L2' || v === 'L3') return v;
  if (v === '1P') return '1P';
  return '—';
};

export const PhaseTypeCell: React.FC<PhaseTypeCellProps> = ({ result, onUpdate }) => {
  const value = decode(result);

  return (
    <TableCell className="p-0 h-8 align-middle w-20 min-w-[78px] max-w-[78px]">
      <Select value={value} onValueChange={(v) => apply(v as PhaseValue, onUpdate, result.id)}>
        <SelectTrigger
          className={[
            'h-8 w-full text-sm bg-transparent border-0 rounded-none px-1.5 gap-1',
            '[&_svg]:h-3 [&_svg]:w-3 hover:bg-white/[0.06]',
            'focus:bg-white/[0.06] focus:ring-1 focus:ring-elec-yellow focus:ring-inset',
            value === 'L1+L2+L3' || value === 'L1' || value === 'L2' || value === 'L3'
              ? 'text-white font-medium tabular-nums'
              : 'text-white',
          ].join(' ')}
        >
          <SelectValue>{labelFor(value)}</SelectValue>
        </SelectTrigger>
        <SelectContent className="z-[9999] min-w-[220px]">
          <SelectItem value="NA" className="group text-sm">
            <span className="font-medium">—</span>
          </SelectItem>
          <SelectItem value="1P" className="group text-sm">
            <span className="font-medium">1P</span>
          </SelectItem>
          <SelectItem value="L1" className="group text-sm">
            <div>
              <span className="font-medium tabular-nums leading-snug">L1</span>
              <span className="text-xs text-white/60 leading-snug group-data-[state=checked]:text-black/70">
                Single-pole on L1
              </span>
            </div>
          </SelectItem>
          <SelectItem value="L2" className="group text-sm">
            <div>
              <span className="font-medium tabular-nums leading-snug">L2</span>
              <span className="text-xs text-white/60 leading-snug group-data-[state=checked]:text-black/70">
                Single-pole on L2
              </span>
            </div>
          </SelectItem>
          <SelectItem value="L3" className="group text-sm">
            <div>
              <span className="font-medium tabular-nums leading-snug">L3</span>
              <span className="text-xs text-white/60 leading-snug group-data-[state=checked]:text-black/70">
                Single-pole on L3
              </span>
            </div>
          </SelectItem>
          <SelectItem value="L1+L2+L3" className="group text-sm">
            <div>
              <span className="font-medium tabular-nums leading-snug">L1 · L2 · L3</span>
              <span className="text-xs text-white/60 leading-snug group-data-[state=checked]:text-black/70">
                Three-pole
              </span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
  );
};

export default PhaseTypeCell;
