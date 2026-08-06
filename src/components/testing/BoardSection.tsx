/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState, useCallback, useEffect, useRef, memo } from 'react';
import { useHaptic } from '@/hooks/useHaptic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, AlertCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DistributionBoard, MAIN_BOARD_ID, isMainBoard as isMainBoardFn } from '@/types/distributionBoard';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { SPD_MAKES, SPD_LOCATIONS } from '@/constants/spdData';
import {
  FieldLimitationBadge,
  isFieldMarker,
} from '@/components/field-limitations';
import useReadingKeypad from '@/hooks/useReadingKeypad';

/* Paper-form field recipe — underline inputs on a transparent background,
   matching MWTestingTab + the EV charging reference implementation. */
const fieldCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const pickerTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white [&>span]:text-white data-[placeholder]:text-white [&[data-placeholder]>span]:text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none transition-colors touch-manipulation';

export interface BoardToolCallbacks {
  onScanBoard?: () => void;
  onScanTestResults?: () => void;
  onScribbleToTable?: () => void;
  onSmartAutoFill?: () => void;
  onQuickRcdPresets?: () => void;
  onBulkInfill?: () => void;
  onVoiceToggle?: () => void;
  voiceActive?: boolean;
  voiceConnecting?: boolean;
  /**
   * Check every circuit on this board against BS 7671 in one action.
   *
   * The checks already ran per cell and in a panel below the desktop table —
   * neither reachable at a consumer unit, and the panel does not exist on a
   * phone at all. This puts the answer one tap from the schedule.
   */
  onValidate?: () => void;
  /** Outstanding issues, shown on the button so they are visible unopened. */
  validateIssueCount?: number;
}

interface BoardSectionProps {
  board: DistributionBoard;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onUpdateBoard: (
    boardId: string,
    field: keyof DistributionBoard | Record<string, any>,
    value?: any
  ) => void;
  onRemoveBoard: (boardId: string) => void;
  onAddCircuit: () => void;
  circuitCount: number;
  completedCount: number;
  isMobile?: boolean;
  children?: React.ReactNode; // Circuit table will be passed as children
  // AI Tools - optional, pass to enable toolbar
  tools?: BoardToolCallbacks;
  showTools?: boolean;
  // ELE-830: Reorder — move this board up/down in the supply chain. Desktop
  // only; mobile ignores these props to avoid touching the mobile surface.
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  // Desktop context strip — earthing arrangement and nominal voltage shown
  // inline so users see the system context the Zs validator is checking
  // against (TT uses RCD-based limits, not MCB tables).
  earthingArrangement?: string;
  nominalVoltage?: string;
}

/**
 * DebouncedInput - Input with local state and debounced updates
 * Prevents focus loss on mobile by not triggering parent re-renders on every keystroke
 */
const DebouncedInput = memo(
  ({
    value,
    onChange,
    className,
    ...props
  }: {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    [key: string]: any;
  }) => {
    const [localValue, setLocalValue] = useState(value);
    const debounceTimerRef = useRef<NodeJS.Timeout>();

    // Sync local value when prop changes (e.g., from external updates)
    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    // Debounced onChange handler
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
          onChange(newValue);
        }, 300);
      },
      [onChange]
    );

    // Cleanup timer on unmount
    useEffect(() => {
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }, []);

    return <Input value={localValue} onChange={handleChange} className={className} {...props} />;
  }
);

DebouncedInput.displayName = 'DebouncedInput';

/**
 * Confirm chip — green when checked, used for Polarity / Phase Seq / Ring Final /
 * SPD Operational. Function declaration for HMR stability.
 */
function ConfirmChip({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={cn(
        'h-11 px-4 rounded-xl border flex items-center justify-center cursor-pointer select-none touch-manipulation',
        'text-sm transition-colors duration-150 active:scale-[0.97]',
        checked
          ? 'bg-green-500 border-green-500 text-black font-semibold'
          : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
      )}
    >
      <span>{label}</span>
    </button>
  );
}

/**
 * N/A chip — mutex with the SPD details panel.
 */
function NAChip({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={cn(
        'h-11 px-3.5 rounded-xl border flex items-center justify-center cursor-pointer select-none touch-manipulation',
        'text-[12px] transition-colors duration-150 active:scale-[0.97]',
        checked
          ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
          : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
      )}
    >
      <span>Not installed</span>
    </button>
  );
}

/**
 * SPD Type chip — elec-yellow when selected. Multi-select for T1/T2/T3.
 */
function TypeChip({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={cn(
        'h-11 px-4 rounded-xl border flex items-center justify-center cursor-pointer select-none touch-manipulation',
        'text-sm transition-colors duration-150 active:scale-[0.97]',
        checked
          ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
          : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
      )}
    >
      <span>{label}</span>
    </button>
  );
}

/**
 * BoardSection - Expandable section for a distribution board
 * Contains board verification data and circuit table
 */
const BoardSection: React.FC<BoardSectionProps> = ({
  board,
  isExpanded,
  onToggleExpanded,
  onUpdateBoard,
  onRemoveBoard,
  onAddCircuit,
  circuitCount,
  completedCount,
  isMobile = false,
  children,
  tools,
  showTools = false,
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false,
  earthingArrangement,
  nominalVoltage,
}) => {
  const haptic = useHaptic();
  const isMainBoard = isMainBoardFn(board) || board.id === MAIN_BOARD_ID;
  const canReorder = !isMobile && (onMoveUp !== undefined || onMoveDown !== undefined);

  // Calculate completion percentage from passed props
  const stats = useMemo(() => {
    const percent = circuitCount > 0 ? Math.round((completedCount / circuitCount) * 100) : 0;
    return { total: circuitCount, completed: completedCount, percent };
  }, [circuitCount, completedCount]);

  // Check if board verification is complete
  const verificationComplete =
    board.zdb && board.ipf && (board.confirmedCorrectPolarity || board.confirmedPhaseSequence);

  // Section-level completion counts — drive the numbered-header status read-outs
  const setupFilled = [
    (board.reference ?? '').toString().trim(),
    (board.location ?? '').toString().trim(),
    (board.zdb ?? '').toString().trim(),
    (board.ipf ?? '').toString().trim(),
  ].filter((v) => v !== '').length;

  const verifChecked = [
    board.confirmedCorrectPolarity,
    board.confirmedPhaseSequence,
    board.ringFinalCircuitConfirmed,
  ].filter(Boolean).length;

  const spdStatusText = board.spdNA
    ? 'Not installed'
    : (() => {
        const types = [
          board.spdT1 && 'T1',
          board.spdT2 && 'T2',
          board.spdT3 && 'T3',
        ].filter(Boolean);
        if (types.length === 0) return 'Configure';
        return types.join(' · ') + (board.spdOperationalStatus ? ' · Op' : '');
      })();

  // Zdb / Ipf validation — green tick when within typical range for the declared
  // earthing arrangement; amber when out of range. Neutral if empty.
  const parseNum = (v: string | number | undefined | null): number | null => {
    if (v === '' || v === null || v === undefined) return null;
    const n = typeof v === 'number' ? v : parseFloat(v);
    return isNaN(n) ? null : n;
  };
  const zdbNum = parseNum(board.zdb);
  const zdbStatus: 'neutral' | 'valid' | 'warn' =
    zdbNum === null
      ? 'neutral'
      : (() => {
          const ea = (earthingArrangement || '').toUpperCase();
          if (ea === 'TT') return zdbNum > 0 && zdbNum <= 200 ? 'valid' : 'warn';
          return zdbNum > 0 && zdbNum <= 0.8 ? 'valid' : 'warn';
        })();
  const ipfNum = parseNum(board.ipf);
  const ipfStatus: 'neutral' | 'valid' | 'warn' =
    ipfNum === null ? 'neutral' : ipfNum > 0 && ipfNum <= 25 ? 'valid' : 'warn';

  // ── Reading keypad — shared MW pattern for Zdb/Ipf ──
  // Field names are keyed per board id because several BoardSections render on
  // one page and data-keypad-field must be unique per input. Values still flow
  // through the existing onUpdateBoard path; the header verdict reuses the
  // zdbStatus/ipfStatus computed above (no new compliance logic).
  const zdbField = `zdb-${board.id}`;
  const ipfField = `ipf-${board.id}`;
  const keypadMeta = useMemo(
    () => ({
      [zdbField]: { label: 'Zdb — board loop impedance', unit: 'Ω' },
      [ipfField]: { label: 'Ipf — prospective fault current', unit: 'kA' },
    }),
    [zdbField, ipfField]
  );
  const keypadSequence = useMemo(() => [zdbField, ipfField], [zdbField, ipfField]);
  const keypad = useReadingKeypad({
    meta: keypadMeta,
    sequence: keypadSequence,
    getValue: (field) => String((field === zdbField ? board.zdb : board.ipf) ?? ''),
    setValue: (field, value) =>
      onUpdateBoard(board.id, field === zdbField ? 'zdb' : 'ipf', value),
    getStatus: (field) => {
      const s = field === zdbField ? zdbStatus : ipfStatus;
      if (s === 'valid') return { tone: 'pass', label: 'Within typical range' };
      if (s === 'warn') return { tone: 'check', label: 'Outside typical range' };
      return null;
    },
  });

  // Stop click propagation from reorder buttons so they don't toggle the collapse
  const handleMoveUp = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onMoveUp?.();
    },
    [onMoveUp]
  );
  const handleMoveDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onMoveDown?.();
    },
    [onMoveDown]
  );

  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04]"
      // Delegated press haptic — every chip/button tap in the board panel
      // buzzes like the MW tabs without wiring each onClick individually.
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) haptic.light();
      }}
    >
      {/* Completion bar — always visible at the very top of the card.
          Main boards use elec-yellow, sub-boards use a softer silver. */}
      <div className="relative h-[3px] bg-white/[0.04]">
        <div
          className={cn(
            'absolute inset-y-0 left-0 transition-[width] duration-300',
            isMainBoard ? 'bg-elec-yellow' : 'bg-white/40'
          )}
          style={{ width: `${stats.percent}%` }}
        />
      </div>

      <Collapsible open={isExpanded} onOpenChange={onToggleExpanded}>
        <CollapsibleTrigger asChild>
          {/* role=button (not <button>) so the reorder/remove action buttons below
              can legally nest inside the clickable header (fixes validateDOMNesting:
              <button> in <button>). Click handled by Radix; keyboard handled here. */}
          <div
            role="button"
            tabIndex={0}
            className="w-full testing-info-header group cursor-pointer"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggleExpanded();
              }
            }}
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="flex flex-col items-start min-w-0 flex-1 gap-1">
                {/* Desktop: Main/Sub label above the reference.
                    Mobile: compact inline label beside it. */}
                <span className={cn(
                  'hidden lg:block text-[12px] font-medium',
                  isMainBoard ? 'text-elec-yellow' : 'text-white'
                )}>
                  {isMainBoard ? 'Main board' : 'Sub-board'}
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base lg:text-lg font-semibold text-white truncate tracking-tight">
                    {board.reference || board.name}
                  </span>
                  {/* Mobile Main/Sub label — desktop replaced by the label above */}
                  <span
                    className={cn(
                      'inline lg:hidden text-[12px] font-medium shrink-0',
                      isMainBoard ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {isMainBoard ? 'Main' : 'Sub'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-white tabular-nums flex-wrap">
                  {earthingArrangement && (
                    <>
                      <span className="text-white">{earthingArrangement}</span>
                      <span className="text-white/30">·</span>
                    </>
                  )}
                  {nominalVoltage && (
                    <>
                      <span className="text-white">{nominalVoltage} V</span>
                      <span className="text-white/30">·</span>
                    </>
                  )}
                  <span>
                    {stats.total} circuit{stats.total !== 1 ? 's' : ''}
                  </span>
                  {board.location && (
                    <>
                      <span className="text-white/30">·</span>
                      <span>{board.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Text-only status label — desktop and mobile */}
              <span
                className={cn(
                  'text-[12px] font-medium shrink-0',
                  verificationComplete ? 'text-green-400' : 'text-amber-400'
                )}
              >
                {verificationComplete ? 'Verified' : 'In progress'}
              </span>

              {/* ELE-830 — reorder buttons, desktop branch only (prop-gated via
                  canReorder, not a breakpoint class: hidden lg:flex left the
                  768-1023px desktop branch with no reorder controls at all). */}
              {canReorder && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handleMoveUp}
                    disabled={isFirst}
                    title="Move board up"
                    aria-label={`Move ${board.name} up`}
                    className={cn(
                      'h-11 px-3 rounded-xl flex items-center justify-center text-[13px] font-semibold touch-manipulation',
                      'border border-white/[0.12] text-white active:scale-[0.98] transition-all',
                      isFirst
                        ? 'opacity-25 cursor-not-allowed'
                        : 'bg-white/[0.06] hover:bg-white/[0.1]'
                    )}
                  >
                    Move up
                  </button>
                  <button
                    type="button"
                    onClick={handleMoveDown}
                    disabled={isLast}
                    title="Move board down"
                    aria-label={`Move ${board.name} down`}
                    className={cn(
                      'h-11 px-3 rounded-xl flex items-center justify-center text-[13px] font-semibold touch-manipulation',
                      'border border-white/[0.12] text-white active:scale-[0.98] transition-all',
                      isLast
                        ? 'opacity-25 cursor-not-allowed'
                        : 'bg-white/[0.06] hover:bg-white/[0.1]'
                    )}
                  >
                    Move down
                  </button>
                </div>
              )}

              {/* Remove-board action — sub-boards only, desktop branch only
                  (prop-gated, not hidden lg: — see reorder note). Sits before
                  the chevron so the collapse affordance keeps the far edge. */}
              {!isMainBoard && !isMobile && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onRemoveBoard(board.id);
                  }}
                  title="Remove board"
                  aria-label={`Remove ${board.name}`}
                  className={cn(
                    'flex h-11 px-3 rounded-xl items-center justify-center shrink-0 touch-manipulation',
                    'text-[13px] font-semibold text-red-400 hover:bg-red-500/10 transition-colors'
                  )}
                >
                  Remove
                </button>
              )}

              <ChevronDown
                className={cn(
                  'h-5 w-5 text-white transition-transform duration-200',
                  isExpanded && 'rotate-180'
                )}
              />
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-5 space-y-4 border-t border-white/10">
            {/* Setup — recipe sub-heading with completion count */}
            <div className="hidden lg:flex items-baseline gap-3 pt-1">
              <h3 className="text-sm font-semibold text-white">Setup</h3>
              <span className="text-[12px] tabular-nums text-white/60">{setupFilled}/4</span>
              {earthingArrangement?.toUpperCase() === 'TT' && (
                <span className="ml-auto text-[11px] text-amber-300/90 shrink-0">
                  TT · Zs against circuit RCD
                </span>
              )}
            </div>

            {/* Board Details - Clean Grid Layout */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Reference */}
              <div className="space-y-2">
                <Label className="text-[12px] font-medium text-white">
                  Reference
                </Label>
                <DebouncedInput
                  value={board.reference}
                  onChange={(value) => onUpdateBoard(board.id, 'reference', value)}
                  placeholder="e.g. Main CU"
                  className={fieldCn}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="text-[12px] font-medium text-white">
                  Location
                </Label>
                <DebouncedInput
                  value={board.location || ''}
                  onChange={(value) => onUpdateBoard(board.id, 'location', value)}
                  placeholder="e.g. Garage, Kitchen"
                  className={fieldCn}
                />
              </div>

              {/* Zdb */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-[12px] font-medium text-white">
                    Z<sub className="text-[9px]">DB</sub> (Ω)
                  </Label>
                  <FieldLimitationBadge
                    compact
                    value={(board.zdb as string) || ''}
                    markers={['LIM']}
                    onChange={(v) => onUpdateBoard(board.id, 'zdb', v)}
                  />
                </div>
                <div className="relative">
                  {isFieldMarker(board.zdb as string) ? (
                    <Input
                      value={board.zdb as string}
                      disabled
                      className={cn(fieldCn, 'opacity-60')}
                    />
                  ) : (
                    <DebouncedInput
                      /* text + inputMode=decimal (MW ground truth): a number
                         input silently blanks keypad-written partials like
                         "0." mid-entry on touch devices. */
                      type="text"
                      inputMode="decimal"
                      value={board.zdb}
                      onChange={(value) => onUpdateBoard(board.id, 'zdb', value)}
                      placeholder="0.00"
                      className={cn(fieldCn, 'pr-14')}
                      {...keypad.field(zdbField)}
                    />
                  )}
                  {!isFieldMarker(board.zdb as string) && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      {zdbStatus === 'valid' && (
                        <Check className="h-3.5 w-3.5 text-green-400" strokeWidth={3} />
                      )}
                      {zdbStatus === 'warn' && (
                        <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                      )}
                      <span className="text-[12px] text-white/60">Ω</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Ipf */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-[12px] font-medium text-white">
                    I<sub className="text-[9px]">PF</sub> (kA)
                  </Label>
                  <FieldLimitationBadge
                    compact
                    value={(board.ipf as string) || ''}
                    markers={['LIM']}
                    onChange={(v) => onUpdateBoard(board.id, 'ipf', v)}
                  />
                </div>
                <div className="relative">
                  {isFieldMarker(board.ipf as string) ? (
                    <Input
                      value={board.ipf as string}
                      disabled
                      className={cn(fieldCn, 'opacity-60')}
                    />
                  ) : (
                    <DebouncedInput
                      type="text"
                      inputMode="decimal"
                      value={board.ipf}
                      onChange={(value) => onUpdateBoard(board.id, 'ipf', value)}
                      placeholder="0.0"
                      className={cn(fieldCn, 'pr-14')}
                      {...keypad.field(ipfField)}
                    />
                  )}
                  {!isFieldMarker(board.ipf as string) && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      {ipfStatus === 'valid' && (
                        <Check className="h-3.5 w-3.5 text-green-400" strokeWidth={3} />
                      )}
                      {ipfStatus === 'warn' && (
                        <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                      )}
                      <span className="text-[12px] text-white/60">kA</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Verification — desktop: recipe sub-heading + chips on a single row */}
            <div className="hidden lg:flex items-center gap-3 border-t border-white/[0.1] pt-4">
              <h3 className="text-sm font-semibold text-white">Verification</h3>
              <span className="text-[12px] tabular-nums text-white/60">{verifChecked}/3</span>
              <div className="ml-auto flex items-center gap-2 shrink-0">
                <ConfirmChip
                  label="Polarity"
                  checked={board.confirmedCorrectPolarity}
                  onToggle={() =>
                    onUpdateBoard(board.id, 'confirmedCorrectPolarity', !board.confirmedCorrectPolarity)
                  }
                />
                <ConfirmChip
                  label="Phase seq"
                  checked={board.confirmedPhaseSequence}
                  onToggle={() =>
                    onUpdateBoard(board.id, 'confirmedPhaseSequence', !board.confirmedPhaseSequence)
                  }
                />
                <ConfirmChip
                  label="Ring final"
                  checked={!!board.ringFinalCircuitConfirmed}
                  onToggle={() =>
                    onUpdateBoard(board.id, 'ringFinalCircuitConfirmed', !board.ringFinalCircuitConfirmed)
                  }
                />
              </div>
            </div>

            {/* Mobile: chips only, no editorial header */}
            <div className="flex lg:hidden flex-wrap items-center gap-2 border-t border-white/[0.1] pt-4">
              <ConfirmChip
                label="Polarity"
                checked={board.confirmedCorrectPolarity}
                onToggle={() =>
                  onUpdateBoard(board.id, 'confirmedCorrectPolarity', !board.confirmedCorrectPolarity)
                }
              />
              <ConfirmChip
                label="Phase seq"
                checked={board.confirmedPhaseSequence}
                onToggle={() =>
                  onUpdateBoard(board.id, 'confirmedPhaseSequence', !board.confirmedPhaseSequence)
                }
              />
              <ConfirmChip
                label="Ring final"
                checked={!!board.ringFinalCircuitConfirmed}
                onToggle={() =>
                  onUpdateBoard(board.id, 'ringFinalCircuitConfirmed', !board.ringFinalCircuitConfirmed)
                }
              />
            </div>

            {/* Surge protection — recipe sub-heading + "Not installed" chip on one row */}
            <div className="space-y-3 border-t border-white/[0.1] pt-4">
              {/* Desktop header with inline NAChip */}
              <div className="hidden lg:flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-3 min-w-0">
                  <h3 className="text-sm font-semibold text-white">Surge protection</h3>
                  <span className="text-[12px] text-white/60">SPD · {spdStatusText}</span>
                </div>
                <NAChip
                  checked={board.spdNA}
                  onToggle={() => {
                    const newVal = !board.spdNA;
                    onUpdateBoard(board.id, {
                      spdNA: newVal,
                      ...(newVal
                        ? {
                            spdOperationalStatus: false,
                            spdT1: false,
                            spdT2: false,
                            spdT3: false,
                          }
                        : {}),
                    });
                  }}
                />
              </div>
              {/* Mobile header with inline NAChip */}
              <div className="flex lg:hidden items-center justify-between gap-2">
                <div className="flex items-baseline gap-2.5">
                  <h3 className="text-sm font-semibold text-white">Surge protection</h3>
                  <span className="text-[12px] text-white/60">SPD</span>
                </div>
                <NAChip
                  checked={board.spdNA}
                  onToggle={() => {
                    const newVal = !board.spdNA;
                    onUpdateBoard(board.id, {
                      spdNA: newVal,
                      ...(newVal
                        ? {
                            spdOperationalStatus: false,
                            spdT1: false,
                            spdT2: false,
                            spdT3: false,
                          }
                        : {}),
                    });
                  }}
                />
              </div>

              {/* Only show detail fields when an SPD is present */}
              {!board.spdNA && (
                <div className="space-y-3">
                  {/* Type chips + Operational — single row, Operational pushed right */}
                  <div className="flex items-center flex-wrap gap-2">
                    <TypeChip
                      label="Type 1"
                      checked={!!board.spdT1}
                      onToggle={() => onUpdateBoard(board.id, 'spdT1', !board.spdT1)}
                    />
                    <TypeChip
                      label="Type 2"
                      checked={!!board.spdT2}
                      onToggle={() => onUpdateBoard(board.id, 'spdT2', !board.spdT2)}
                    />
                    <TypeChip
                      label="Type 3"
                      checked={!!board.spdT3}
                      onToggle={() => onUpdateBoard(board.id, 'spdT3', !board.spdT3)}
                    />
                    <div className="ml-auto flex items-center gap-2">
                      <span className="hidden sm:block h-8 w-px bg-white/[0.08]" />
                      <ConfirmChip
                        label="Operational"
                        checked={board.spdOperationalStatus}
                        onToggle={() =>
                          onUpdateBoard(
                            board.id,
                            'spdOperationalStatus',
                            !board.spdOperationalStatus
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* Details grid — Location / Make.
                      Model + Rated kA fields removed per ELE-1161 (Craig Soper).
                      spdModel / spdRatedCurrentKa remain in the data model + PDF
                      formatter so existing saved certs keep their values. */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-[12px] font-medium text-white">
                        Location
                      </Label>
                      <MobileSelectPicker
                        value={board.spdLocation || ''}
                        onValueChange={(v) => onUpdateBoard(board.id, 'spdLocation', v)}
                        options={SPD_LOCATIONS}
                        placeholder="Select"
                        title="SPD location"
                        triggerClassName={pickerTriggerCn}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[12px] font-medium text-white">
                        Make
                      </Label>
                      {/* ELE-871 — Allow free text when make isn't in dropdown.
                          If user picks "__custom__" or current value isn't in the list,
                          render a text input instead. */}
                      {board.spdMake && !SPD_MAKES.some((o) => o.value === board.spdMake) ? (
                        <Input
                          value={board.spdMake}
                          onChange={(e) =>
                            onUpdateBoard(board.id, { spdMake: e.target.value, spdModel: '' })
                          }
                          placeholder="Enter SPD make"
                          className={fieldCn}
                        />
                      ) : (
                        <MobileSelectPicker
                          value={board.spdMake || ''}
                          onValueChange={(v) => {
                            const next = v === '__custom__' ? 'Custom' : v;
                            onUpdateBoard(board.id, { spdMake: next, spdModel: '' });
                          }}
                          options={[
                            ...SPD_MAKES,
                            { value: '__custom__', label: 'Other (type your own)…' },
                          ]}
                          placeholder="Select"
                          title="SPD make"
                          triggerClassName={pickerTriggerCn}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Circuits — desktop header with inline toolbar (replaces the
                standalone tools-bar + orphaned "Circuits" label). Prop-gated
                rather than hidden lg:flex — the 768-1023px desktop branch
                (landscape phones / portrait tablets) previously had no Add
                circuit or tools at all. flex-wrap lets the buttons wrap on
                narrow landscape widths. */}
            {children && !isMobile && (
              <div className="flex flex-wrap items-center gap-3 border-t border-white/[0.1] pt-4">
                <h3 className="text-sm font-semibold text-white">Circuits</h3>
                <span className="text-[12px] tabular-nums text-white/60">{circuitCount}</span>
                {showTools && tools && (
                  <div className="ml-auto flex items-center gap-2 shrink-0">
                    <Button
                      onClick={tools.onScanBoard}
                      className="h-11 px-3 rounded-xl border border-white/[0.12] bg-white/[0.06] hover:bg-white/[0.1] text-white text-[13px] font-semibold touch-manipulation"
                    >
                      AI scan
                    </Button>
                    {tools.onValidate && (
                      <Button
                        onClick={tools.onValidate}
                        className={cn(
                          'h-11 px-3 rounded-xl text-[13px] font-semibold touch-manipulation border',
                          tools.validateIssueCount
                            ? 'border-orange-500/40 bg-orange-500/15 text-orange-200 hover:bg-orange-500/25'
                            : 'border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.1]'
                        )}
                      >
                        Validate
                        {tools.validateIssueCount ? (
                          <span className="ml-1.5 tabular-nums">{tools.validateIssueCount}</span>
                        ) : null}
                      </Button>
                    )}
                    <Button
                      onClick={onAddCircuit}
                      className="h-11 px-3 rounded-xl bg-elec-yellow text-black hover:bg-elec-yellow/90 text-[13px] font-semibold touch-manipulation"
                    >
                      Add circuit
                    </Button>
                    <Button
                      onClick={tools.onVoiceToggle}
                      disabled={tools.voiceConnecting}
                      className={cn(
                        'h-11 px-3 rounded-xl text-[13px] font-semibold touch-manipulation',
                        tools.voiceActive
                          ? 'bg-green-500 text-black hover:bg-green-500/90'
                          : 'border border-white/[0.12] bg-white/[0.06] hover:bg-white/[0.1] text-white'
                      )}
                    >
                      {tools.voiceActive
                        ? 'Stop'
                        : tools.voiceConnecting
                          ? 'Connecting'
                          : 'Voice'}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile tools bar — text-only buttons on the neutral recipe */}
            {isMobile && showTools && tools && (
              <div className="py-3 border-t border-white/10">
                <div className="grid grid-cols-2 gap-2 items-center">
                  <Button
                    onClick={tools.onScanBoard}
                    className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] hover:bg-white/[0.1] text-white text-[13px] font-semibold touch-manipulation active:scale-95"
                  >
                    AI scan
                  </Button>
                  <Button
                    onClick={onAddCircuit}
                    className="h-11 rounded-xl bg-elec-yellow text-black hover:bg-elec-yellow/90 text-[13px] font-semibold touch-manipulation active:scale-95"
                  >
                    Add circuit
                  </Button>
                  <Button
                    onClick={tools.onVoiceToggle}
                    disabled={tools.voiceConnecting}
                    className={cn(
                      'h-11 rounded-xl text-[13px] font-semibold touch-manipulation active:scale-95',
                      tools.voiceActive
                        ? 'bg-green-500 text-black'
                        : 'border border-white/[0.12] bg-white/[0.06] hover:bg-white/[0.1] text-white'
                    )}
                  >
                    {tools.voiceActive
                      ? 'Stop'
                      : tools.voiceConnecting
                        ? 'Connecting'
                        : 'Voice'}
                  </Button>
                  {tools.onValidate && (
                    <Button
                      onClick={tools.onValidate}
                      className={cn(
                        'h-11 rounded-xl text-[13px] font-semibold touch-manipulation active:scale-95 border',
                        tools.validateIssueCount
                          ? 'border-orange-500/40 bg-orange-500/15 text-orange-200'
                          : 'border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.1]'
                      )}
                    >
                      Validate
                      {tools.validateIssueCount ? (
                        <span className="ml-1.5 tabular-nums">{tools.validateIssueCount}</span>
                      ) : null}
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Fallback: Simple Add Circuit for mobile without tools */}
            {isMobile && !showTools && (
              <div className="py-3 border-t border-white/10">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-11 rounded-xl border-white/[0.12] bg-white/[0.06] text-white text-[13px] font-semibold hover:bg-white/[0.1] touch-manipulation"
                  onClick={onAddCircuit}
                >
                  Add circuit
                </Button>
              </div>
            )}

            {/* Circuit Table (passed as children) - matches EIC structure.
                ELE-830 desktop full-bleed: escape the card's p-5 padding on
                lg: so the table uses the full card width, like the mobile
                table's edge-to-edge treatment. Mobile unchanged. */}
            {children && (
              <div
                className={cn(
                  'testing-table-container mt-2',
                  !isMobile && 'lg:-mx-5 lg:rounded-none lg:border-x-0'
                )}
                data-autofill-section
              >
                {children}
              </div>
            )}

            {/* Mobile-only footer remove-board action — desktop removal moved to
                the collapsible header. */}
            {!isMainBoard && isMobile && (
              <div className="flex items-center justify-end pt-3 border-t border-white/5">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-11 px-3 text-red-400 hover:text-red-400 hover:bg-red-500/10 text-[13px] font-semibold touch-manipulation"
                  onClick={() => onRemoveBoard(board.id)}
                >
                  Remove board
                </Button>
              </div>
            )}

            {/* Scroll room so the last reading can rise clear of the keypad */}
            {keypad.spacer}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Reading keypad — coarse-pointer devices only */}
      {keypad.element}
    </div>
  );
};

export default BoardSection;
