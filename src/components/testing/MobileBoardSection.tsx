import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  ChevronDown,
  Plus,
  CircuitBoard,
  CheckCircle,
  AlertCircle,
  Camera,
  Mic,
  MoreVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DistributionBoard, MAIN_BOARD_ID } from '@/types/distributionBoard';
import { useHaptics } from '@/hooks/useHaptics';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface MobileBoardToolCallbacks {
  onScanBoard?: () => void;
  onVoiceToggle?: () => void;
  voiceActive?: boolean;
  voiceConnecting?: boolean;
}

interface MobileBoardSectionProps {
  board: DistributionBoard;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onAddCircuit: () => void;
  onRemoveBoard?: () => void;
  circuitCount: number;
  completedCount: number;
  children?: React.ReactNode;
  tools?: MobileBoardToolCallbacks;
}

/**
 * MobileBoardSection - Collapsible board card with progress ring for mobile
 * Optimized for touch interaction with large tap targets
 */
const MobileBoardSection: React.FC<MobileBoardSectionProps> = ({
  board,
  isExpanded,
  onToggleExpanded,
  onAddCircuit,
  onRemoveBoard,
  circuitCount,
  completedCount,
  children,
  tools,
}) => {
  const haptics = useHaptics();
  const isMainBoard = board.id === MAIN_BOARD_ID || board.order === 0;

  // Calculate completion percentage
  const stats = useMemo(() => {
    const percent = circuitCount > 0 ? Math.round((completedCount / circuitCount) * 100) : 0;
    return { total: circuitCount, completed: completedCount, percent };
  }, [circuitCount, completedCount]);

  // Check if board verification is complete
  const verificationComplete = board.zdb && board.ipf &&
    (board.confirmedCorrectPolarity || board.confirmedPhaseSequence);

  const handleToggle = () => {
    haptics.tap();
    onToggleExpanded();
  };

  const handleAddCircuit = () => {
    haptics.tap();
    onAddCircuit();
  };

  // Progress ring SVG
  const ProgressRing = () => {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (stats.percent / 100) * circumference;

    return (
      <svg className="h-12 w-12 -rotate-90" viewBox="0 0 44 44">
        {/* Background circle */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-white/10"
        />
        {/* Progress circle */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            'transition-all duration-500',
            stats.percent === 100 ? 'text-green-400' :
            stats.percent > 50 ? 'text-amber-400' : 'text-elec-yellow'
          )}
        />
        {/* Center text */}
        <text
          x="22"
          y="22"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-white text-[10px] font-bold rotate-90"
          style={{ transformOrigin: '22px 22px' }}
        >
          {stats.percent}%
        </text>
      </svg>
    );
  };

  return (
    <div className="-mx-4 bg-card/50 border-y border-white/10">
      <Collapsible open={isExpanded} onOpenChange={handleToggle}>
        {/* Header - Full width tappable area */}
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center gap-3 p-4 active:bg-white/5 transition-colors touch-manipulation">
            {/* Progress Ring */}
            <ProgressRing />

            {/* Board Info */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2">
                <CircuitBoard className={cn(
                  "h-4 w-4 shrink-0",
                  isMainBoard ? "text-elec-yellow" : "text-blue-400"
                )} />
                <span className="font-semibold text-white truncate">
                  {board.reference || board.name}
                </span>
                {verificationComplete ? (
                  <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50 mt-0.5">
                <span>{stats.total} circuit{stats.total !== 1 ? 's' : ''}</span>
                {stats.completed > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-green-400">{stats.completed} done</span>
                  </>
                )}
                {board.location && (
                  <>
                    <span>•</span>
                    <span className="truncate">{board.location}</span>
                  </>
                )}
              </div>
            </div>

            {/* Expand indicator */}
            <ChevronDown className={cn(
              "h-5 w-5 text-white/40 transition-transform duration-200 shrink-0",
              isExpanded && "rotate-180"
            )} />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          {/* Quick Actions Bar */}
          <div className="-mx-4 px-4 py-3 bg-black/20 border-t border-white/5 flex items-center gap-2 overflow-x-auto">
            <Button
              onClick={handleAddCircuit}
              className="h-12 px-4 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold shrink-0 touch-manipulation active:scale-95 transition-transform"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Circuit
            </Button>

            {tools?.onScanBoard && (
              <Button
                onClick={() => { haptics.tap(); tools.onScanBoard?.(); }}
                variant="outline"
                className="h-12 px-4 border-white/20 hover:bg-white/10 shrink-0 touch-manipulation active:scale-95 transition-transform"
              >
                <Camera className="h-4 w-4 mr-2" />
                Scan
              </Button>
            )}

            {tools?.onVoiceToggle && (
              <Button
                onClick={() => { haptics.tap(); tools.onVoiceToggle?.(); }}
                variant="outline"
                className={cn(
                  "h-12 w-12 p-0 shrink-0 touch-manipulation active:scale-95 transition-all",
                  tools.voiceActive
                    ? "bg-green-500/20 border-green-500 ring-2 ring-green-500/30"
                    : tools.voiceConnecting
                    ? "bg-yellow-500/20 border-yellow-500 animate-pulse"
                    : "border-white/20 hover:bg-white/10"
                )}
              >
                <Mic className={cn(
                  "h-5 w-5",
                  tools.voiceActive ? "text-green-500" :
                  tools.voiceConnecting ? "text-yellow-500" : "text-white"
                )} />
              </Button>
            )}

            {!isMainBoard && onRemoveBoard && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-12 w-12 p-0 shrink-0 touch-manipulation"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background">
                  <DropdownMenuItem
                    onClick={() => { haptics.impact(); onRemoveBoard(); }}
                    className="text-red-400 focus:text-red-400"
                  >
                    Remove Board
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Circuit content */}
          <div className="p-4">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default MobileBoardSection;
