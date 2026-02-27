import React from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  ChevronDown,
  Plus,
  Trash2,
  Zap,
  CheckCircle,
  Camera,
  Mic,
  Check,
} from 'lucide-react';
import { DistributionBoard, MAIN_BOARD_ID } from '@/types/distributionBoard';

export interface MobileBoardToolCallbacks {
  onScanBoard: () => void;
  onVoiceToggle: () => void;
  voiceActive: boolean;
  voiceConnecting: boolean;
}

interface MobileBoardSectionProps {
  board: DistributionBoard;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onUpdateBoard: (boardId: string, field: keyof DistributionBoard, value: any) => void;
  onRemoveBoard?: (boardId: string) => void;
  onAddCircuit: (boardId: string) => void;
  circuitCount: number;
  completedCount: number;
  children?: React.ReactNode;
  tools?: MobileBoardToolCallbacks;
}

/**
 * DebouncedInput - Input with local state and debounced updates
 * Prevents focus loss on mobile by not triggering parent re-renders on every keystroke
 */
const DebouncedInput = React.memo(
  ({
    value,
    onChange,
    className,
    style,
    ...props
  }: {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
  }) => {
    const [localValue, setLocalValue] = React.useState(value || '');
    const debounceTimerRef = React.useRef<NodeJS.Timeout>();

    React.useEffect(() => {
      setLocalValue(value || '');
    }, [value]);

    const handleChange = React.useCallback(
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

    React.useEffect(() => {
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }, []);

    return (
      <input
        value={localValue}
        onChange={handleChange}
        className={className}
        style={style}
        {...props}
      />
    );
  }
);

DebouncedInput.displayName = 'MobileBoardDebouncedInput';

/**
 * MobileBoardSection - Mobile-optimised distribution board section
 * Extracted from EICScheduleOfTesting inline mobile board JSX
 */
const MobileBoardSection: React.FC<MobileBoardSectionProps> = ({
  board,
  isExpanded,
  onToggleExpanded,
  onUpdateBoard,
  onRemoveBoard,
  onAddCircuit,
  circuitCount,
  completedCount,
  children,
  tools,
}) => {
  const progressPercent =
    circuitCount > 0 ? Math.round((completedCount / circuitCount) * 100) : 0;
  const isComplete = progressPercent === 100;
  const isMainBoard = board.id === MAIN_BOARD_ID || board.order === 0;

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggleExpanded}>
      {/* Board Header */}
      <CollapsibleTrigger className="w-full" asChild>
        <button className="w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors bg-card/50 border-y border-border/30 active:bg-card/90">
          {/* Progress Ring */}
          <div className="relative flex-shrink-0">
            <svg className="w-12 h-12 -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                className="text-border/30"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                strokeDasharray={`${progressPercent * 1.26} 126`}
                strokeLinecap="round"
                className={isComplete ? 'text-green-500' : 'text-elec-yellow'}
              />
            </svg>
            <div
              className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${isComplete ? 'text-green-400' : 'text-elec-yellow'}`}
            >
              {isComplete ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Zap className="h-5 w-5" />
              )}
            </div>
          </div>

          {/* Board Info */}
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-base ${isComplete ? 'text-green-400' : 'text-foreground'}`}
            >
              {board.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-white mt-0.5">
              <span>
                {circuitCount} circuit{circuitCount !== 1 ? 's' : ''}
              </span>
              <span>·</span>
              <span
                className={
                  isComplete
                    ? 'text-green-400 font-medium'
                    : progressPercent > 0
                      ? 'text-elec-yellow font-medium'
                      : ''
                }
              >
                {progressPercent}% complete
              </span>
            </div>
          </div>

          {/* Chevron */}
          <ChevronDown
            className={`h-5 w-5 text-white transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        {/* Board Details */}
        <div className="p-4 bg-card/30 border-b border-border/20 space-y-3">
          {/* Board Reference & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white uppercase tracking-wide block mb-1">
                Reference
              </label>
              <DebouncedInput
                type="text"
                value={board.reference || ''}
                onChange={(value) => onUpdateBoard(board.id, 'reference', value)}
                placeholder={board.name}
                className="w-full h-11 px-3 rounded-lg bg-card border border-border/50 text-sm focus:border-elec-yellow focus:outline-none touch-manipulation"
                style={{ fontSize: '16px' }}
              />
            </div>
            <div>
              <label className="text-xs text-white uppercase tracking-wide block mb-1">
                Location
              </label>
              <DebouncedInput
                type="text"
                value={board.location || ''}
                onChange={(value) => onUpdateBoard(board.id, 'location', value)}
                placeholder="e.g., Garage, Kitchen"
                className="w-full h-11 px-3 rounded-lg bg-card border border-border/50 text-sm focus:border-elec-yellow focus:outline-none touch-manipulation"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          {/* ZDB & IPF Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white uppercase tracking-wide block mb-1">
                Z<sub>DB</sub> (Ω)
              </label>
              <div className="relative">
                <DebouncedInput
                  type="text"
                  inputMode="decimal"
                  value={board.zdb || ''}
                  onChange={(value) => onUpdateBoard(board.id, 'zdb', value)}
                  placeholder="0.00"
                  className="w-full h-11 px-3 pr-8 rounded-lg bg-card border border-border/50 text-sm focus:border-elec-yellow focus:outline-none touch-manipulation"
                  style={{ fontSize: '16px' }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white">
                  Ω
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs text-white uppercase tracking-wide block mb-1">
                I<sub>PF</sub> (kA)
              </label>
              <div className="relative">
                <DebouncedInput
                  type="text"
                  inputMode="decimal"
                  value={board.ipf || ''}
                  onChange={(value) => onUpdateBoard(board.id, 'ipf', value)}
                  placeholder="0.0"
                  className="w-full h-11 px-3 pr-8 rounded-lg bg-card border border-border/50 text-sm focus:border-elec-yellow focus:outline-none touch-manipulation"
                  style={{ fontSize: '16px' }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white">
                  kA
                </span>
              </div>
            </div>
          </div>

          {/* Quick Checks - Row 1: Polarity & Phase Sequence */}
          <div className="flex flex-wrap gap-2 relative z-10">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onUpdateBoard(
                  board.id,
                  'confirmedCorrectPolarity',
                  !board.confirmedCorrectPolarity
                );
              }}
              className={`h-11 rounded-lg text-sm font-medium transition-all touch-manipulation active:scale-95 flex items-center gap-2 px-3 cursor-pointer select-none ${
                board.confirmedCorrectPolarity
                  ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                  : 'bg-card border border-border/50 text-white'
              }`}
            >
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 pointer-events-none ${board.confirmedCorrectPolarity ? 'bg-green-500 border-green-500' : 'border-white'}`}
              >
                {board.confirmedCorrectPolarity && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="pointer-events-none">Polarity</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onUpdateBoard(
                  board.id,
                  'confirmedPhaseSequence',
                  !board.confirmedPhaseSequence
                );
              }}
              className={`h-11 rounded-lg text-sm font-medium transition-all touch-manipulation active:scale-95 flex items-center gap-2 px-3 cursor-pointer select-none ${
                board.confirmedPhaseSequence
                  ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                  : 'bg-card border border-border/50 text-white'
              }`}
            >
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 pointer-events-none ${board.confirmedPhaseSequence ? 'bg-green-500 border-green-500' : 'border-white'}`}
              >
                {board.confirmedPhaseSequence && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="pointer-events-none">Phase Seq</span>
            </button>
          </div>

          {/* SPD Section - Row 2 */}
          <div className="flex flex-wrap items-center gap-2 mt-2 relative z-10">
            <span className="text-xs text-white mr-1">SPD:</span>
            {/* SPD N/A */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const newValue = !board.spdNA;
                onUpdateBoard(board.id, 'spdNA', newValue);
                if (newValue) {
                  onUpdateBoard(board.id, 'spdOperationalStatus', false);
                  onUpdateBoard(board.id, 'spdT1', false);
                  onUpdateBoard(board.id, 'spdT2', false);
                  onUpdateBoard(board.id, 'spdT3', false);
                }
              }}
              className={`h-11 rounded-lg text-sm font-medium transition-all touch-manipulation active:scale-95 flex items-center gap-2 px-3 cursor-pointer select-none ${
                board.spdNA
                  ? 'bg-elec-yellow/20 border border-elec-yellow/30 text-elec-yellow'
                  : 'bg-card border border-border/50 text-white'
              }`}
            >
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 pointer-events-none ${board.spdNA ? 'bg-elec-yellow border-elec-yellow' : 'border-white'}`}
              >
                {board.spdNA && <Check className="h-3 w-3 text-black" />}
              </div>
              <span className="pointer-events-none">N/A</span>
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
                        onUpdateBoard(board.id, fieldName, !isChecked);
                      }}
                      className={`h-11 px-3 rounded-lg text-sm font-medium transition-all touch-manipulation active:scale-95 flex items-center gap-2 cursor-pointer select-none ${
                        isChecked
                          ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                          : 'bg-card border border-border/50 text-white'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 pointer-events-none ${isChecked ? 'bg-blue-500 border-blue-500' : 'border-white'}`}
                      >
                        {isChecked && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className="pointer-events-none">{type}</span>
                    </button>
                  );
                })}

                {/* Divider */}
                <div className="h-6 w-px bg-border/50 mx-1" />

                {/* SPD OK */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onUpdateBoard(
                      board.id,
                      'spdOperationalStatus',
                      !board.spdOperationalStatus
                    );
                  }}
                  className={`h-11 rounded-lg text-sm font-medium transition-all touch-manipulation active:scale-95 flex items-center gap-2 px-3 cursor-pointer select-none ${
                    board.spdOperationalStatus
                      ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                      : 'bg-card border border-border/50 text-white'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 pointer-events-none ${board.spdOperationalStatus ? 'bg-green-500 border-green-500' : 'border-white'}`}
                  >
                    {board.spdOperationalStatus && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className="pointer-events-none">SPD OK</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tools Bar - Above Circuit Table */}
        {tools && (
          <div className="-mx-4 grid grid-cols-[1fr_1fr_48px] gap-2 p-4 bg-background border-y border-border/30">
            <Button
              className="h-12 rounded-xl bg-elec-yellow text-black font-bold hover:bg-elec-yellow/90 touch-manipulation active:scale-95"
              onClick={tools.onScanBoard}
            >
              <Camera className="h-5 w-5 mr-2" />
              AI Scan
            </Button>
            <Button
              className="h-12 rounded-xl bg-card border border-border/50 text-foreground font-semibold hover:bg-card/80 touch-manipulation active:scale-95"
              onClick={() => onAddCircuit(board.id)}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Circuit
            </Button>
            <Button
              className={`h-12 w-12 rounded-xl touch-manipulation active:scale-95 ${
                tools.voiceActive
                  ? 'bg-green-500 text-white'
                  : tools.voiceConnecting
                    ? 'bg-yellow-500 text-black animate-pulse'
                    : 'bg-purple-600 text-white'
              }`}
              onClick={tools.onVoiceToggle}
              disabled={tools.voiceConnecting}
            >
              <Mic className={`h-5 w-5 ${tools.voiceActive ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
        )}

        {/* Circuit Content (passed as children) */}
        <div className="bg-background">
          {circuitCount === 0 ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm text-white mb-3">No circuits yet</p>
              <Button
                onClick={() => onAddCircuit(board.id)}
                className="h-11 bg-elec-yellow text-black font-medium hover:bg-elec-yellow/90 touch-manipulation"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Circuit
              </Button>
            </div>
          ) : (
            children
          )}

          {/* Add Circuit to This Board */}
          {circuitCount > 0 && (
            <div className="p-4 border-t border-border/20">
              <Button
                onClick={() => onAddCircuit(board.id)}
                variant="outline"
                className="w-full h-11 border-dashed border-white/20 text-white hover:bg-white/5 touch-manipulation"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Circuit to {board.name}
              </Button>
            </div>
          )}
        </div>

        {/* Board Actions Footer */}
        {!isMainBoard && onRemoveBoard && (
          <div className="p-3 bg-card/30 border-t border-border/20 flex justify-between items-center">
            <span className="text-xs text-white">
              {circuitCount} circuit{circuitCount !== 1 ? 's' : ''} in this board
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveBoard(board.id)}
              className="h-8 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Remove Board
            </Button>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileBoardSection;
