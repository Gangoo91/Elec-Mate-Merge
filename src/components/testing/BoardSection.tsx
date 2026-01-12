import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  ChevronDown,
  Plus,
  Trash2,
  Zap,
  MapPin,
  CircuitBoard,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DistributionBoard, MAIN_BOARD_ID } from '@/types/distributionBoard';

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
          <div className="p-4 space-y-4 border-t border-white/10">
            {/* Board Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Reference */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-white/60 uppercase tracking-wide">
                  Reference
                </Label>
                <Input
                  value={board.reference}
                  onChange={(e) => onUpdateBoard(board.id, 'reference', e.target.value)}
                  placeholder="e.g. Main CU, Sub-DB1"
                  className="h-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-elec-yellow/50"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-white/60 uppercase tracking-wide">
                  Location
                </Label>
                <Input
                  value={board.location || ''}
                  onChange={(e) => onUpdateBoard(board.id, 'location', e.target.value)}
                  placeholder="e.g. Garage, Kitchen"
                  className="h-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-elec-yellow/50"
                />
              </div>

              {/* Zdb */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-white/60 uppercase tracking-wide">
                  Z<sub className="text-[9px]">db</sub> (Ω)
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    value={board.zdb}
                    onChange={(e) => onUpdateBoard(board.id, 'zdb', e.target.value)}
                    placeholder="0.00"
                    className="h-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-elec-yellow/50 pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-xs">Ω</span>
                </div>
              </div>

              {/* Ipf */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-white/60 uppercase tracking-wide">
                  I<sub className="text-[9px]">pf</sub> (kA)
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    value={board.ipf}
                    onChange={(e) => onUpdateBoard(board.id, 'ipf', e.target.value)}
                    placeholder="0.0"
                    className="h-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-elec-yellow/50 pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-xs">kA</span>
                </div>
              </div>
            </div>

            {/* Verification Checkboxes */}
            <div className={cn("flex flex-wrap gap-4", isMobile && "gap-2")}>
              <label className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all",
                "hover:bg-white/5",
                board.confirmedCorrectPolarity && "bg-green-500/10 border border-green-500/20",
                isMobile && "px-2 py-1.5 text-xs"
              )}>
                <Checkbox
                  checked={board.confirmedCorrectPolarity}
                  onCheckedChange={(checked) => onUpdateBoard(board.id, 'confirmedCorrectPolarity', checked === true)}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <span className={cn("text-sm text-white/80", isMobile && "text-xs")}>Correct Polarity</span>
              </label>

              <label className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all",
                "hover:bg-white/5",
                board.confirmedPhaseSequence && "bg-green-500/10 border border-green-500/20",
                isMobile && "px-2 py-1.5 text-xs"
              )}>
                <Checkbox
                  checked={board.confirmedPhaseSequence}
                  onCheckedChange={(checked) => onUpdateBoard(board.id, 'confirmedPhaseSequence', checked === true)}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <span className={cn("text-sm text-white/80", isMobile && "text-xs")}>Phase Sequence</span>
              </label>

              <label className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all",
                "hover:bg-white/5",
                board.spdOperationalStatus && "bg-green-500/10 border border-green-500/20",
                isMobile && "px-2 py-1.5 text-xs"
              )}>
                <Checkbox
                  checked={board.spdOperationalStatus}
                  onCheckedChange={(checked) => onUpdateBoard(board.id, 'spdOperationalStatus', checked === true)}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  disabled={board.spdNA}
                />
                <span className={cn("text-sm text-white/80", isMobile && "text-xs")}>SPD Operational</span>
              </label>

              <label className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all",
                "hover:bg-white/5",
                board.spdNA && "bg-white/5 border border-white/10",
                isMobile && "px-2 py-1.5 text-xs"
              )}>
                <Checkbox
                  checked={board.spdNA}
                  onCheckedChange={(checked) => {
                    onUpdateBoard(board.id, 'spdNA', checked === true);
                    if (checked) onUpdateBoard(board.id, 'spdOperationalStatus', false);
                  }}
                  className="data-[state=checked]:bg-white/50 data-[state=checked]:border-white/50"
                />
                <span className={cn("text-sm text-white/60", isMobile && "text-xs")}>SPD N/A</span>
              </label>
            </div>

            {/* Circuit Table (passed as children) */}
            {children && (
              <div className="pt-2">
                {children}
              </div>
            )}

            {/* Actions */}
            <div className={cn(
              "flex items-center justify-between pt-2 border-t border-white/10",
              isMobile && "pt-3"
            )}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9 text-elec-yellow hover:text-elec-yellow hover:bg-elec-yellow/10",
                  isMobile && "h-10 text-sm"
                )}
                onClick={onAddCircuit}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Circuit
              </Button>

              {!isMainBoard && (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-9 text-red-400 hover:text-red-300 hover:bg-red-500/10",
                    isMobile && "h-10 text-sm"
                  )}
                  onClick={() => onRemoveBoard(board.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Board
                </Button>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default BoardSection;
