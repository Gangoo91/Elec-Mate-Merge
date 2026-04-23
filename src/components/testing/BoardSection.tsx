/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState, useCallback, useEffect, useRef, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  ChevronDown,
  ChevronUp,
  ChevronDown as ChevronDownMove,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Camera,
  Mic,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DistributionBoard, MAIN_BOARD_ID, isMainBoard as isMainBoardFn } from '@/types/distributionBoard';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  SPD_MAKES,
  getSpdModelsForMake,
  SPD_LOCATIONS,
  SPD_RATED_KA,
} from '@/constants/spdData';

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
        'h-10 px-3.5 rounded-lg border flex items-center gap-2 cursor-pointer select-none touch-manipulation',
        'transition-colors duration-150',
        checked
          ? 'bg-green-500/15 border-green-500/40 text-green-400'
          : 'bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]'
      )}
    >
      <div
        className={cn(
          'w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors',
          checked ? 'bg-green-500' : 'border-2 border-white/30'
        )}
      >
        {checked && <Check className="h-3 w-3 text-black" strokeWidth={3} />}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

/**
 * N/A chip — amber, mutex with the SPD details panel.
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
        'h-9 px-3 rounded-lg border flex items-center gap-2 cursor-pointer select-none touch-manipulation',
        'transition-colors duration-150 text-xs font-semibold uppercase tracking-wider',
        checked
          ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
          : 'bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]'
      )}
    >
      <div
        className={cn(
          'w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 transition-colors',
          checked ? 'bg-amber-500' : 'border-2 border-white/30'
        )}
      >
        {checked && <Check className="h-2.5 w-2.5 text-black" strokeWidth={3} />}
      </div>
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
        'h-10 px-4 rounded-lg border flex items-center gap-2 cursor-pointer select-none touch-manipulation',
        'transition-colors duration-150',
        checked
          ? 'bg-elec-yellow/15 border-elec-yellow/50 text-elec-yellow'
          : 'bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]'
      )}
    >
      <div
        className={cn(
          'w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors',
          checked ? 'bg-elec-yellow' : 'border-2 border-white/30'
        )}
      >
        {checked && <Check className="h-3 w-3 text-black" strokeWidth={3} />}
      </div>
      <span className="text-sm font-semibold">{label}</span>
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
      className={cn(
        'testing-info-section overflow-hidden',
        isMobile && 'rounded-lg',
        !isMobile && (isMainBoard ? 'testing-info-section--main' : 'testing-info-section--sub')
      )}
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
          <button className="w-full testing-info-header group">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="flex flex-col items-start min-w-0 flex-1 gap-1">
                {/* Desktop: eyebrow with Main/Sub tag in editorial style (college pattern).
                    Mobile: keeps the compact inline pill from before. */}
                <span className={cn(
                  'hidden lg:block text-[10px] font-medium uppercase tracking-[0.18em]',
                  isMainBoard ? 'text-elec-yellow' : 'text-white/70'
                )}>
                  {isMainBoard ? 'Main board' : 'Sub-board'}
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base lg:text-lg font-semibold text-white truncate tracking-tight">
                    {board.reference || board.name}
                  </span>
                  {/* Mobile Main/Sub pill — desktop replaced by eyebrow above */}
                  <span
                    className={cn(
                      'inline-flex lg:hidden items-center text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0',
                      isMainBoard
                        ? 'bg-elec-yellow/15 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-blue-500/15 border border-blue-500/40 text-blue-300'
                    )}
                  >
                    {isMainBoard ? 'Main' : 'Sub'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-white/60 tabular-nums flex-wrap">
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
              {/* Desktop: text-only status eyebrow, no pill (college editorial) */}
              <span
                className={cn(
                  'hidden lg:inline text-[10px] font-semibold uppercase tracking-[0.18em] shrink-0',
                  verificationComplete ? 'text-green-400' : 'text-amber-400'
                )}
              >
                {verificationComplete ? 'Verified' : 'In progress'}
              </span>

              {/* Mobile keeps the bare icon (unchanged) */}
              {verificationComplete ? (
                <CheckCircle className="h-4 w-4 text-green-400 lg:hidden" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-400 lg:hidden" />
              )}

              {/* ELE-830 — reorder buttons, desktop only, stop propagation */}
              {canReorder && (
                <div className="hidden lg:flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handleMoveUp}
                    disabled={isFirst}
                    title="Move board up"
                    aria-label={`Move ${board.name} up`}
                    className={cn(
                      'h-9 w-9 rounded-md flex items-center justify-center',
                      'border border-white/10 text-white active:scale-[0.98] transition-all',
                      isFirst
                        ? 'opacity-25 cursor-not-allowed'
                        : 'bg-white/[0.03] hover:bg-white/[0.08]'
                    )}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleMoveDown}
                    disabled={isLast}
                    title="Move board down"
                    aria-label={`Move ${board.name} down`}
                    className={cn(
                      'h-9 w-9 rounded-md flex items-center justify-center',
                      'border border-white/10 text-white active:scale-[0.98] transition-all',
                      isLast
                        ? 'opacity-25 cursor-not-allowed'
                        : 'bg-white/[0.03] hover:bg-white/[0.08]'
                    )}
                  >
                    <ChevronDownMove className="h-4 w-4" />
                  </button>
                </div>
              )}

              <ChevronDown
                className={cn(
                  'h-5 w-5 text-white transition-transform duration-200',
                  isExpanded && 'rotate-180'
                )}
              />

              {/* Remove-board trash icon — sub-boards only, desktop only. Moved up
                  from the footer so destructive action lives with the board header. */}
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
                    'hidden lg:flex h-9 w-9 rounded-md items-center justify-center shrink-0',
                    'border border-white/10 bg-white/[0.03] text-white/60',
                    'hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-colors'
                  )}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-5 space-y-4 border-t border-white/10">
            {/* 01 · SETUP — numbered editorial section with completion count */}
            <div className="hidden lg:flex items-center gap-3 pt-1">
              <span className="text-[11px] font-semibold tabular-nums text-elec-yellow tracking-[0.18em]">01</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">Setup</span>
              <span className="text-[10px] tabular-nums text-white/60">{setupFilled}/4</span>
              <span className="flex-1 h-px bg-white/[0.06]" />
              {earthingArrangement?.toUpperCase() === 'TT' && (
                <span className="text-[11px] text-amber-300/90 shrink-0">
                  TT · Zs against circuit RCD
                </span>
              )}
            </div>

            {/* Board Details - Clean Grid Layout */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Reference */}
              <div className="space-y-2">
                <Label className="text-[11px] font-semibold text-white uppercase tracking-wider">
                  Reference
                </Label>
                <DebouncedInput
                  value={board.reference}
                  onChange={(value) => onUpdateBoard(board.id, 'reference', value)}
                  placeholder="e.g. Main CU"
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/40 focus:border-elec-yellow/50 focus:bg-white/[0.05] rounded-lg transition-colors"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="text-[11px] font-semibold text-white uppercase tracking-wider">
                  Location
                </Label>
                <DebouncedInput
                  value={board.location || ''}
                  onChange={(value) => onUpdateBoard(board.id, 'location', value)}
                  placeholder="e.g. Garage, Kitchen"
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/40 focus:border-elec-yellow/50 focus:bg-white/[0.05] rounded-lg transition-colors"
                />
              </div>

              {/* Zdb */}
              <div className="space-y-2">
                <Label className="text-[11px] font-semibold text-white uppercase tracking-wider">
                  Z<sub className="text-[9px]">DB</sub> (Ω)
                </Label>
                <div className="relative">
                  <DebouncedInput
                    type="number"
                    step="0.01"
                    value={board.zdb}
                    onChange={(value) => onUpdateBoard(board.id, 'zdb', value)}
                    placeholder="0.00"
                    className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/40 focus:border-elec-yellow/50 focus:bg-white/[0.05] rounded-lg pr-14 transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    {zdbStatus === 'valid' && (
                      <Check className="h-3.5 w-3.5 text-green-400" strokeWidth={3} />
                    )}
                    {zdbStatus === 'warn' && (
                      <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                    )}
                    <span className="text-white text-sm font-medium">Ω</span>
                  </span>
                </div>
              </div>

              {/* Ipf */}
              <div className="space-y-2">
                <Label className="text-[11px] font-semibold text-white uppercase tracking-wider">
                  I<sub className="text-[9px]">PF</sub> (kA)
                </Label>
                <div className="relative">
                  <DebouncedInput
                    type="number"
                    step="0.1"
                    value={board.ipf}
                    onChange={(value) => onUpdateBoard(board.id, 'ipf', value)}
                    placeholder="0.0"
                    className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/40 focus:border-elec-yellow/50 focus:bg-white/[0.05] rounded-lg pr-14 transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    {ipfStatus === 'valid' && (
                      <Check className="h-3.5 w-3.5 text-green-400" strokeWidth={3} />
                    )}
                    {ipfStatus === 'warn' && (
                      <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                    )}
                    <span className="text-white text-sm font-medium">kA</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 02 · VERIFICATION — desktop: header + chips on a single row */}
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-[11px] font-semibold tabular-nums text-elec-yellow tracking-[0.18em]">02</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">Verification</span>
              <span className="text-[10px] tabular-nums text-white/60">{verifChecked}/3</span>
              <span className="flex-1 h-px bg-white/[0.06]" />
              <div className="flex items-center gap-2 shrink-0">
                <ConfirmChip
                  label="Polarity"
                  checked={board.confirmedCorrectPolarity}
                  onToggle={() =>
                    onUpdateBoard(board.id, 'confirmedCorrectPolarity', !board.confirmedCorrectPolarity)
                  }
                />
                <ConfirmChip
                  label="Phase Seq"
                  checked={board.confirmedPhaseSequence}
                  onToggle={() =>
                    onUpdateBoard(board.id, 'confirmedPhaseSequence', !board.confirmedPhaseSequence)
                  }
                />
                <ConfirmChip
                  label="Ring Final"
                  checked={!!board.ringFinalCircuitConfirmed}
                  onToggle={() =>
                    onUpdateBoard(board.id, 'ringFinalCircuitConfirmed', !board.ringFinalCircuitConfirmed)
                  }
                />
              </div>
            </div>

            {/* Mobile: chips only, no editorial header */}
            <div className="flex lg:hidden flex-wrap items-center gap-2">
              <ConfirmChip
                label="Polarity"
                checked={board.confirmedCorrectPolarity}
                onToggle={() =>
                  onUpdateBoard(board.id, 'confirmedCorrectPolarity', !board.confirmedCorrectPolarity)
                }
              />
              <ConfirmChip
                label="Phase Seq"
                checked={board.confirmedPhaseSequence}
                onToggle={() =>
                  onUpdateBoard(board.id, 'confirmedPhaseSequence', !board.confirmedPhaseSequence)
                }
              />
              <ConfirmChip
                label="Ring Final"
                checked={!!board.ringFinalCircuitConfirmed}
                onToggle={() =>
                  onUpdateBoard(board.id, 'ringFinalCircuitConfirmed', !board.ringFinalCircuitConfirmed)
                }
              />
            </div>

            {/* 03 · SURGE PROTECTION — header + "Not installed" chip on one row */}
            <div className="space-y-3">
              {/* Desktop header with inline NAChip */}
              <div className="hidden lg:flex items-center gap-3">
                <span className="text-[11px] font-semibold tabular-nums text-elec-yellow tracking-[0.18em]">03</span>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">Surge Protection</span>
                <span className="text-[10px] uppercase tracking-wider text-white/50">SPD</span>
                <span className="text-[10px] tabular-nums text-white/60">{spdStatusText}</span>
                <span className="flex-1 h-px bg-white/[0.06]" />
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
                  <h4 className="text-sm font-semibold text-white">Surge Protection</h4>
                  <span className="text-[10px] uppercase tracking-wider text-white font-semibold">SPD</span>
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

                  {/* Details grid — Location / Make / Model / Rated kA */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] font-semibold text-white uppercase tracking-wider">
                        Location
                      </Label>
                      <MobileSelectPicker
                        value={board.spdLocation || ''}
                        onValueChange={(v) => onUpdateBoard(board.id, 'spdLocation', v)}
                        options={SPD_LOCATIONS}
                        placeholder="Select"
                        title="SPD Location"
                        triggerClassName="h-11 bg-white/[0.03] border-white/[0.08] rounded-lg text-white [&>span]:text-white data-[placeholder]:text-white/80 [&[data-placeholder]>span]:text-white/80 hover:bg-white/[0.05] transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] font-semibold text-white uppercase tracking-wider">
                        Make
                      </Label>
                      <MobileSelectPicker
                        value={board.spdMake || ''}
                        onValueChange={(v) => {
                          // Changing make wipes model — models are cascaded from make
                          onUpdateBoard(board.id, {
                            spdMake: v,
                            spdModel: '',
                          });
                        }}
                        options={SPD_MAKES}
                        placeholder="Select"
                        title="SPD Make"
                        triggerClassName="h-11 bg-white/[0.03] border-white/[0.08] rounded-lg text-white [&>span]:text-white data-[placeholder]:text-white/80 [&[data-placeholder]>span]:text-white/80 hover:bg-white/[0.05] transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] font-semibold text-white uppercase tracking-wider">
                        Model
                      </Label>
                      <MobileSelectPicker
                        value={board.spdModel || ''}
                        onValueChange={(v) => onUpdateBoard(board.id, 'spdModel', v)}
                        options={getSpdModelsForMake(board.spdMake || '')}
                        placeholder={board.spdMake ? 'Select' : 'Pick make first'}
                        title="SPD Model"
                        disabled={!board.spdMake}
                        triggerClassName="h-11 bg-white/[0.03] border-white/[0.08] rounded-lg text-white [&>span]:text-white data-[placeholder]:text-white/80 [&[data-placeholder]>span]:text-white/80 hover:bg-white/[0.05] transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] font-semibold text-white uppercase tracking-wider">
                        Rated kA
                      </Label>
                      <MobileSelectPicker
                        value={board.spdRatedCurrentKa || ''}
                        onValueChange={(v) => onUpdateBoard(board.id, 'spdRatedCurrentKa', v)}
                        options={SPD_RATED_KA}
                        placeholder="Select"
                        title="Rated kA"
                        triggerClassName="h-11 bg-white/[0.03] border-white/[0.08] rounded-lg text-white [&>span]:text-white data-[placeholder]:text-white/80 [&[data-placeholder]>span]:text-white/80 hover:bg-white/[0.05] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 04 · CIRCUITS — desktop header with inline toolbar (replaces the
                standalone tools-bar + orphaned "Circuits" label). */}
            {children && !isMobile && (
              <div className="hidden lg:flex items-center gap-3 pt-1">
                <span className="text-[11px] font-semibold tabular-nums text-elec-yellow tracking-[0.18em]">04</span>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">Circuits</span>
                <span className="text-[10px] tabular-nums text-white/60">{circuitCount}</span>
                <span className="flex-1 h-px bg-white/[0.06]" />
                {showTools && tools && (
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      onClick={tools.onScanBoard}
                      className="h-8 px-3 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] text-white text-xs font-medium"
                    >
                      <Camera className="h-3.5 w-3.5 mr-1.5" />
                      AI Scan
                    </Button>
                    <Button
                      onClick={onAddCircuit}
                      className="h-8 px-3 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] text-white text-xs font-medium"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1.5" />
                      Add Circuit
                    </Button>
                    <Button
                      onClick={tools.onVoiceToggle}
                      disabled={tools.voiceConnecting}
                      className={cn(
                        'h-8 px-3 text-xs font-medium',
                        tools.voiceActive
                          ? 'bg-green-500 text-white hover:bg-green-500/90'
                          : tools.voiceConnecting
                            ? 'bg-yellow-500 text-black animate-pulse'
                            : 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] text-white'
                      )}
                    >
                      <Mic
                        className={cn(
                          'h-3.5 w-3.5 mr-1.5',
                          tools.voiceActive && 'animate-pulse'
                        )}
                      />
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

            {/* Mobile tools bar — unchanged from before */}
            {isMobile && showTools && tools && (
              <div className="py-3 border-y border-border/30 bg-background">
                <div className="grid grid-cols-[1fr_1fr_44px] gap-2 items-center">
                  <Button
                    onClick={tools.onScanBoard}
                    className="font-semibold touch-manipulation active:scale-95 h-12 rounded-xl bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    AI Scan
                  </Button>
                  <Button
                    onClick={onAddCircuit}
                    className="font-semibold touch-manipulation active:scale-95 h-12 rounded-xl bg-card border border-border/50 text-foreground hover:bg-card/80"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Circuit
                  </Button>
                  <Button
                    onClick={tools.onVoiceToggle}
                    disabled={tools.voiceConnecting}
                    className={cn(
                      'touch-manipulation active:scale-95 h-12 w-12 rounded-xl',
                      tools.voiceActive
                        ? 'bg-green-500 text-white'
                        : tools.voiceConnecting
                          ? 'bg-yellow-500 text-black animate-pulse'
                          : 'bg-purple-600 text-white'
                    )}
                  >
                    <Mic
                      className={cn('h-4 w-4', tools.voiceActive && 'animate-pulse')}
                    />
                  </Button>
                </div>
              </div>
            )}

            {/* Fallback: Simple Add Circuit for mobile without tools */}
            {isMobile && !showTools && (
              <div className="py-3 border-t border-white/10">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-11 border-white/20 hover:bg-white/5"
                  onClick={onAddCircuit}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Circuit
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
                  className="h-10 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 text-xs"
                  onClick={() => onRemoveBoard(board.id)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Remove Board
                </Button>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default BoardSection;
