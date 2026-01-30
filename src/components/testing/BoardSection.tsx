import React, { useMemo, useState, useCallback, useEffect, useRef, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  ChevronDown,
  Plus,
  Trash2,
  MapPin,
  CircuitBoard,
  CheckCircle,
  AlertCircle,
  Camera,
  Mic,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DistributionBoard, MAIN_BOARD_ID } from '@/types/distributionBoard';

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
  onUpdateBoard: (boardId: string, field: keyof DistributionBoard, value: any) => void;
  onRemoveBoard: (boardId: string) => void;
  onAddCircuit: () => void;
  circuitCount: number;
  completedCount: number;
  isMobile?: boolean;
  children?: React.ReactNode; // Circuit table will be passed as children
  // AI Tools - optional, pass to enable toolbar
  tools?: BoardToolCallbacks;
  showTools?: boolean;
}

/**
 * DebouncedInput - Input with local state and debounced updates
 * Prevents focus loss on mobile by not triggering parent re-renders on every keystroke
 */
const DebouncedInput = memo(({
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
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  }, [onChange]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <Input
      value={localValue}
      onChange={handleChange}
      className={className}
      {...props}
    />
  );
});

DebouncedInput.displayName = 'DebouncedInput';

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
}) => {
  const isMainBoard = board.id === MAIN_BOARD_ID || board.order === 0;

  // Calculate completion percentage from passed props
  const stats = useMemo(() => {
    const percent = circuitCount > 0 ? Math.round((completedCount / circuitCount) * 100) : 0;
    return { total: circuitCount, completed: completedCount, percent };
  }, [circuitCount, completedCount]);

  // Check if board verification is complete
  const verificationComplete = board.zdb && board.ipf &&
    (board.confirmedCorrectPolarity || board.confirmedPhaseSequence);

  return (
    <div className={cn("testing-info-section overflow-hidden", isMobile && "rounded-lg")}>
      <Collapsible open={isExpanded} onOpenChange={onToggleExpanded}>
        <CollapsibleTrigger asChild>
          <button className="w-full testing-info-header group">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={cn(
                "p-2 rounded-lg transition-colors",
                isMainBoard ? "bg-elec-yellow/20" : "bg-blue-500/20"
              )}>
                <CircuitBoard className={cn(
                  "h-5 w-5",
                  isMainBoard ? "text-elec-yellow" : "text-blue-400"
                )} />
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="font-semibold text-white truncate">
                  {board.reference || board.name}
                </span>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span>{stats.total} circuit{stats.total !== 1 ? 's' : ''}</span>
                  {stats.total > 0 && (
                    <>
                      <span>•</span>
                      <span className={cn(
                        stats.percent === 100 ? "text-green-400" :
                        stats.percent > 50 ? "text-amber-400" : "text-white/50"
                      )}>
                        {stats.percent}% complete
                      </span>
                    </>
                  )}
                  {board.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {board.location}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {verificationComplete ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-400" />
              )}
              <ChevronDown className={cn(
                "h-5 w-5 text-white/50 transition-transform duration-200",
                isExpanded && "rotate-180"
              )} />
            </div>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-5 space-y-5 border-t border-white/10">
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
                  className="h-11 bg-black/30 border-white/10 text-white placeholder:text-white/25 focus:border-elec-yellow/50 focus:bg-black/40 rounded-lg"
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
                  className="h-11 bg-black/30 border-white/10 text-white placeholder:text-white/25 focus:border-elec-yellow/50 focus:bg-black/40 rounded-lg"
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
                    className="h-11 bg-black/30 border-white/10 text-white placeholder:text-white/25 focus:border-elec-yellow/50 focus:bg-black/40 rounded-lg pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm font-medium">Ω</span>
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
                    className="h-11 bg-black/30 border-white/10 text-white placeholder:text-white/25 focus:border-elec-yellow/50 focus:bg-black/40 rounded-lg pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm font-medium">kA</span>
                </div>
              </div>
            </div>

            {/* Verification Buttons - Row 1: Polarity & Phase Sequence */}
            <div className={cn("flex items-center flex-wrap gap-2", isMobile && "gap-1.5")}>
              <button
                type="button"
                onClick={() => onUpdateBoard(board.id, 'confirmedCorrectPolarity', !board.confirmedCorrectPolarity)}
                className={cn(
                  "h-10 px-4 rounded-lg border flex items-center gap-2 cursor-pointer select-none",
                  "transition-colors duration-150 touch-manipulation",
                  board.confirmedCorrectPolarity
                    ? "bg-green-500/20 border-green-500/50 text-green-400"
                    : "bg-card border-border text-muted-foreground hover:bg-accent"
                )}
              >
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Polarity</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateBoard(board.id, 'confirmedPhaseSequence', !board.confirmedPhaseSequence)}
                className={cn(
                  "h-10 px-4 rounded-lg border flex items-center gap-2 cursor-pointer select-none",
                  "transition-colors duration-150 touch-manipulation",
                  board.confirmedPhaseSequence
                    ? "bg-green-500/20 border-green-500/50 text-green-400"
                    : "bg-card border-border text-muted-foreground hover:bg-accent"
                )}
              >
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Phase Seq</span>
              </button>
            </div>

            {/* SPD Section - Row 2 */}
            <div className={cn("flex items-center flex-wrap gap-2 mt-2", isMobile && "gap-1.5")}>
              <span className="text-xs text-muted-foreground mr-1">SPD:</span>

              {/* SPD N/A */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('[BoardSection] SPD N/A clicked, current value:', board.spdNA);
                  const newVal = !board.spdNA;
                  console.log('[BoardSection] Setting spdNA to:', newVal);
                  onUpdateBoard(board.id, 'spdNA', newVal);
                  if (newVal) {
                    onUpdateBoard(board.id, 'spdOperationalStatus', false);
                    onUpdateBoard(board.id, 'spdT1', false);
                    onUpdateBoard(board.id, 'spdT2', false);
                    onUpdateBoard(board.id, 'spdT3', false);
                  }
                }}
                className={cn(
                  "h-10 px-4 rounded-lg border flex items-center gap-2 cursor-pointer select-none",
                  "transition-colors duration-150 touch-manipulation",
                  board.spdNA
                    ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                    : "bg-card border-border text-muted-foreground hover:bg-accent"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0",
                  board.spdNA
                    ? "bg-amber-500 border-amber-500"
                    : "border-muted-foreground"
                )}>
                  {board.spdNA && <Check className="h-3 w-3 text-black" />}
                </div>
                <span className="text-sm font-medium">N/A</span>
              </button>

              {/* SPD Type T1, T2, T3 - only show when SPD is applicable */}
              {!board.spdNA && (
                <>
                  {(['T1', 'T2', 'T3'] as const).map((type) => {
                    const fieldName = `spd${type}` as 'spdT1' | 'spdT2' | 'spdT3';
                    const isChecked = board[fieldName] ?? false;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log(`[BoardSection] SPD ${type} clicked, current:`, isChecked);
                          onUpdateBoard(board.id, fieldName, !isChecked);
                        }}
                        className={cn(
                          "h-10 px-4 rounded-lg border flex items-center gap-2 cursor-pointer select-none",
                          "transition-colors duration-150 touch-manipulation",
                          isChecked
                            ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                            : "bg-card border-border text-muted-foreground hover:bg-accent"
                        )}
                      >
                        <div className={cn(
                          "w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0",
                          isChecked
                            ? "bg-blue-500 border-blue-500"
                            : "border-muted-foreground"
                        )}>
                          {isChecked && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className="text-sm font-medium">{type}</span>
                      </button>
                    );
                  })}

                  {/* Divider */}
                  <div className="h-6 w-px bg-border mx-1" />

                  {/* SPD OK */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('[BoardSection] SPD OK clicked, current:', board.spdOperationalStatus);
                      onUpdateBoard(board.id, 'spdOperationalStatus', !board.spdOperationalStatus);
                    }}
                    className={cn(
                      "h-10 px-4 rounded-lg border flex items-center gap-2 cursor-pointer select-none",
                      "transition-colors duration-150 touch-manipulation",
                      board.spdOperationalStatus
                        ? "bg-green-500/20 border-green-500/50 text-green-400"
                        : "bg-card border-border text-muted-foreground hover:bg-accent"
                    )}
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">SPD OK</span>
                  </button>
                </>
              )}
            </div>

            {/* Tools Bar - Above Circuit Table (Desktop & Mobile) */}
            {showTools && tools && (
              <div className={cn(
                "py-3 border-t border-white/10",
                isMobile ? "-mx-5 px-5 bg-background border-y border-border/30" : ""
              )}>
                <div className={cn(
                  "flex items-center gap-2",
                  isMobile ? "grid grid-cols-[1fr_1fr_48px]" : "flex flex-wrap"
                )}>
                  {/* AI Board Scan */}
                  <Button
                    onClick={tools.onScanBoard}
                    className={cn(
                      "font-semibold touch-manipulation active:scale-95",
                      isMobile
                        ? "h-12 rounded-xl bg-elec-yellow text-black hover:bg-elec-yellow/90"
                        : "h-10 bg-white/5 border border-white/20 hover:bg-white/10 text-white"
                    )}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {isMobile ? "AI Scan" : "AI Board Scan"}
                  </Button>

                  {/* Add Circuit */}
                  <Button
                    onClick={onAddCircuit}
                    className={cn(
                      "font-semibold touch-manipulation active:scale-95",
                      isMobile
                        ? "h-12 rounded-xl bg-card border border-border/50 text-foreground hover:bg-card/80"
                        : "h-10 bg-white/5 border border-white/20 hover:bg-white/10 text-white"
                    )}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Circuit
                  </Button>

                  {/* Voice Assistant */}
                  <Button
                    onClick={tools.onVoiceToggle}
                    disabled={tools.voiceConnecting}
                    className={cn(
                      "touch-manipulation active:scale-95",
                      isMobile ? "h-12 w-12 rounded-xl" : "h-10",
                      tools.voiceActive
                        ? "bg-green-500 text-white"
                        : tools.voiceConnecting
                        ? "bg-yellow-500 text-black animate-pulse"
                        : isMobile
                          ? "bg-purple-600 text-white"
                          : "bg-white/5 border border-white/20 hover:bg-white/10 text-white"
                    )}
                  >
                    <Mic className={cn("h-4 w-4", tools.voiceActive && "animate-pulse", !isMobile && "mr-2")} />
                    {!isMobile && (tools.voiceActive ? "Tap to Stop" : tools.voiceConnecting ? "Connecting..." : "Voice")}
                  </Button>

                  {/* Desktop-only: Spacer */}
                  {!isMobile && (
                    <div className="flex-1 min-w-0" />
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
                  className="w-full h-11 border-white/20 hover:bg-white/5"
                  onClick={onAddCircuit}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Circuit
                </Button>
              </div>
            )}

            {/* Circuit Table (passed as children) - matches EIC structure */}
            {children && (
              <div className="testing-table-container mt-2" data-autofill-section>
                {children}
              </div>
            )}

            {/* Actions - Clean footer */}
            {!isMainBoard && (
              <div className="flex items-center justify-end pt-3 border-t border-white/5">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-9 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 text-xs",
                    isMobile && "h-10"
                  )}
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
