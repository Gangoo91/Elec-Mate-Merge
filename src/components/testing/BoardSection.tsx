import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  Plus,
  Trash2,
  Zap,
  MapPin,
  CircuitBoard,
  CheckCircle,
  AlertCircle,
  Camera,
  Mic,
  Wand2,
  Sparkles,
  FileText,
  Pen,
  Shield,
  Grid
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
                "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all touch-manipulation",
                "hover:bg-white/5 active:scale-[0.98]",
                board.spdNA && "bg-amber-500/10 border border-amber-500/30",
                !board.spdNA && "border border-transparent",
                isMobile && "px-2 py-1.5 text-xs"
              )}>
                <Checkbox
                  checked={board.spdNA}
                  onCheckedChange={(checked) => {
                    onUpdateBoard(board.id, 'spdNA', checked === true);
                    if (checked) onUpdateBoard(board.id, 'spdOperationalStatus', false);
                  }}
                  className="h-5 w-5 border-elec-yellow/50 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                />
                <span className={cn("text-sm text-white", isMobile && "text-xs")}>SPD N/A</span>
              </label>
            </div>

            {/* Mobile Action Bar - Above table */}
            {isMobile && showTools && tools && (
              <div className="py-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  {/* AI Scan Button - Primary action */}
                  {tools.onScanBoard && (
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 h-11 bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
                      onClick={tools.onScanBoard}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      AI Scan
                    </Button>
                  )}

                  {/* Add Circuit Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-11 border-white/20 hover:bg-white/5 font-medium touch-manipulation active:scale-[0.98]"
                    onClick={onAddCircuit}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Circuit
                  </Button>

                  {/* Voice Button */}
                  {tools.onVoiceToggle && (
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-11 w-11 p-0 flex-shrink-0 touch-manipulation active:scale-[0.98] transition-all duration-200",
                        tools.voiceActive
                          ? "bg-green-500/20 border-green-500 ring-2 ring-green-500/30"
                          : tools.voiceConnecting
                          ? "bg-yellow-500/20 border-yellow-500 animate-pulse"
                          : "bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/30"
                      )}
                      onClick={tools.onVoiceToggle}
                      disabled={tools.voiceConnecting}
                    >
                      <Mic className={cn(
                        "h-5 w-5",
                        tools.voiceActive ? "text-green-500 animate-pulse" :
                        tools.voiceConnecting ? "text-yellow-500" : "text-purple-400"
                      )} />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* AI Tools Toolbar - Desktop only */}
            {showTools && tools && !isMobile && (
              <div className="flex items-center gap-2 py-3 border-t border-white/10">
                {/* Primary: AI Board Scanner */}
                {tools.onScanBoard && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-3 hover:bg-primary/10 hover:border-primary/30"
                    title="AI Scan Board"
                    onClick={tools.onScanBoard}
                  >
                    <Camera className="h-4 w-4 mr-1.5 text-primary" />
                    <span className="text-xs">Scan Board</span>
                  </Button>
                )}

                {/* AI Tools Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 w-9 p-0 hover:bg-primary/10 hover:border-primary/30"
                      title="AI Tools"
                    >
                      <Wand2 className="h-4 w-4 text-primary" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-background z-50">
                    {tools.onScanTestResults && (
                      <DropdownMenuItem onClick={tools.onScanTestResults}>
                        <FileText className="mr-2 h-4 w-4" />
                        AI Scan Test Results
                      </DropdownMenuItem>
                    )}
                    {tools.onScribbleToTable && (
                      <DropdownMenuItem onClick={tools.onScribbleToTable}>
                        <Pen className="mr-2 h-4 w-4" />
                        Scribble to Table
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Smart Tools Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 w-9 p-0 hover:bg-primary/10 hover:border-primary/30"
                      title="Smart Tools"
                    >
                      <Sparkles className="h-4 w-4 text-primary" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-background z-50">
                    {tools.onSmartAutoFill && (
                      <DropdownMenuItem onClick={tools.onSmartAutoFill}>
                        <Zap className="mr-2 h-4 w-4" />
                        Smart Auto-Fill
                      </DropdownMenuItem>
                    )}
                    {tools.onQuickRcdPresets && (
                      <DropdownMenuItem onClick={tools.onQuickRcdPresets}>
                        <Shield className="mr-2 h-4 w-4" />
                        Quick RCD Presets
                      </DropdownMenuItem>
                    )}
                    {tools.onBulkInfill && (
                      <DropdownMenuItem onClick={tools.onBulkInfill}>
                        <Grid className="mr-2 h-4 w-4" />
                        Bulk Infill
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Voice Button */}
                {tools.onVoiceToggle && (
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-9 w-9 p-0 transition-all duration-200",
                      tools.voiceActive
                        ? "bg-green-500/20 border-green-500 ring-2 ring-green-500/30"
                        : tools.voiceConnecting
                        ? "bg-yellow-500/20 border-yellow-500 animate-pulse"
                        : "hover:bg-primary/10 hover:border-primary/30"
                    )}
                    title={tools.voiceActive ? "Voice active - click to stop" : "Start voice input"}
                    onClick={tools.onVoiceToggle}
                    disabled={tools.voiceConnecting}
                  >
                    <Mic className={cn(
                      "h-4 w-4",
                      tools.voiceActive ? "text-green-500 animate-pulse" :
                      tools.voiceConnecting ? "text-yellow-500" : "text-primary"
                    )} />
                  </Button>
                )}
              </div>
            )}

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
              {/* Add Circuit - only show on desktop (mobile has it above table) */}
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 text-elec-yellow hover:text-elec-yellow hover:bg-elec-yellow/10"
                  onClick={onAddCircuit}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Circuit
                </Button>
              )}

              {/* Spacer on mobile */}
              {isMobile && <div />}

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
