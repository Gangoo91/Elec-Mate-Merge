import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  Camera,
  Wand2,
  Sparkles,
  MoreVertical,
  FileText,
  Pen,
  Zap,
  Shield,
  Grid,
  Layout,
  Table,
  Trash2,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduleHeaderProps {
  /** Number of circuits */
  circuitCount: number;
  /** Current view mode */
  viewMode: 'table' | 'card';
  /** Is mobile view */
  isMobile: boolean;
  /** Handlers */
  onAddCircuit: () => void;
  onScanBoard: () => void;
  onScanTestResults: () => void;
  onScribbleToTable: () => void;
  onSmartAutoFill: () => void;
  onRcdPresets: () => void;
  onBulkInfill: () => void;
  onQuickFillRcd: () => void;
  onToggleViewMode: () => void;
  onRemoveAllCircuits: () => void;
  onShowAnalytics: () => void;
  /** Additional class names */
  className?: string;
}

/**
 * Header toolbar for Schedule of Tests
 * Adapts between mobile and desktop layouts
 */
export const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({
  circuitCount,
  viewMode,
  isMobile,
  onAddCircuit,
  onScanBoard,
  onScanTestResults,
  onScribbleToTable,
  onSmartAutoFill,
  onRcdPresets,
  onBulkInfill,
  onQuickFillRcd,
  onToggleViewMode,
  onRemoveAllCircuits,
  onShowAnalytics,
  className = '',
}) => {
  if (isMobile) {
    return (
      <MobileHeader
        circuitCount={circuitCount}
        viewMode={viewMode}
        onAddCircuit={onAddCircuit}
        onScanBoard={onScanBoard}
        onScanTestResults={onScanTestResults}
        onScribbleToTable={onScribbleToTable}
        onSmartAutoFill={onSmartAutoFill}
        onRcdPresets={onRcdPresets}
        onBulkInfill={onBulkInfill}
        onQuickFillRcd={onQuickFillRcd}
        onToggleViewMode={onToggleViewMode}
        onRemoveAllCircuits={onRemoveAllCircuits}
        className={className}
      />
    );
  }

  return (
    <DesktopHeader
      circuitCount={circuitCount}
      onAddCircuit={onAddCircuit}
      onScanBoard={onScanBoard}
      onScanTestResults={onScanTestResults}
      onScribbleToTable={onScribbleToTable}
      onSmartAutoFill={onSmartAutoFill}
      onBulkInfill={onBulkInfill}
      onRemoveAllCircuits={onRemoveAllCircuits}
      onShowAnalytics={onShowAnalytics}
      className={className}
    />
  );
};

/**
 * Mobile-optimized sticky toolbar
 */
const MobileHeader: React.FC<Omit<ScheduleHeaderProps, 'isMobile' | 'onShowAnalytics'>> = ({
  circuitCount,
  viewMode,
  onAddCircuit,
  onScanBoard,
  onScanTestResults,
  onScribbleToTable,
  onSmartAutoFill,
  onRcdPresets,
  onBulkInfill,
  onQuickFillRcd,
  onToggleViewMode,
  onRemoveAllCircuits,
  className = '',
}) => {
  return (
    <>
      {/* Title Row */}
      <div className={cn('px-3 py-3', className)}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-medium text-white uppercase tracking-wider">Schedule of Tests</h2>
            <p className="text-[10px] text-white/40 mt-0.5">
              {circuitCount} circuit{circuitCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-y border-white/[0.06]">
        <div className="px-3 py-2 flex items-center justify-between gap-2">
          {/* Primary Actions */}
          <div className="flex items-center gap-2 flex-1">
            <button
              className="h-10 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-white/50 touch-manipulation active:scale-[0.98] flex items-center gap-1.5 flex-1 max-w-[100px] justify-center"
              onClick={onAddCircuit}
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>

            <button
              className="h-10 px-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 text-xs font-semibold text-elec-yellow touch-manipulation active:scale-[0.98] flex items-center gap-1.5 flex-1 max-w-[120px] justify-center"
              onClick={onScanBoard}
            >
              <Camera className="h-3.5 w-3.5" />
              Scan
            </button>

            <button
              className="h-10 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-elec-yellow touch-manipulation active:scale-[0.98] flex items-center gap-1.5 flex-1 max-w-[100px] justify-center"
              onClick={onSmartAutoFill}
            >
              <Zap className="h-3.5 w-3.5" />
              Quick
            </button>
          </div>

          {/* Overflow Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-10 w-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center touch-manipulation active:scale-[0.98] shrink-0">
                <MoreVertical className="h-4 w-4 text-white/40" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-background border-white/[0.08]">
              {/* AI Tools */}
              <div className="px-2 py-1.5 text-[10px] font-semibold text-white/30 uppercase tracking-wide">
                AI Tools
              </div>
              <DropdownMenuItem onClick={onScanTestResults} className="gap-3 py-2.5">
                <FileText className="h-4 w-4 text-elec-yellow" />
                <div className="flex flex-col">
                  <span className="font-medium text-white">Scan Test Results</span>
                  <span className="text-[11px] text-white/40">Photo of test sheet</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onScribbleToTable} className="gap-3 py-2.5">
                <Pen className="h-4 w-4 text-elec-yellow" />
                <div className="flex flex-col">
                  <span className="font-medium text-white">Text to Circuits</span>
                  <span className="text-[11px] text-white/40">Type or paste circuit list</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-white/[0.06]" />

              {/* Smart Features */}
              <div className="px-2 py-1.5 text-[10px] font-semibold text-white/30 uppercase tracking-wide">
                Smart Features
              </div>
              <DropdownMenuItem onClick={onRcdPresets} className="gap-3 py-2.5">
                <Shield className="h-4 w-4 text-blue-400" />
                <div className="flex flex-col">
                  <span className="font-medium text-white">RCD Presets</span>
                  <span className="text-[11px] text-white/40">Apply common RCD settings</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onBulkInfill} className="gap-3 py-2.5">
                <Grid className="h-4 w-4 text-green-400" />
                <div className="flex flex-col">
                  <span className="font-medium text-white">Bulk Infill</span>
                  <span className="text-[11px] text-white/40">Fill multiple circuits at once</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onQuickFillRcd} className="gap-3 py-2.5">
                <Zap className="h-4 w-4 text-elec-yellow" />
                <div className="flex flex-col">
                  <span className="font-medium text-white">Quick Fill RCD</span>
                  <span className="text-[11px] text-white/40">Auto-detect RCD protection</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-white/[0.06]" />

              {/* View Options */}
              <div className="px-2 py-1.5 text-[10px] font-semibold text-white/30 uppercase tracking-wide">
                View Options
              </div>
              <DropdownMenuItem onClick={onToggleViewMode} className="gap-3 py-2.5">
                {viewMode === 'table' ? (
                  <>
                    <Layout className="h-4 w-4 text-white/50" />
                    <span className="font-medium text-white">Switch to Card View</span>
                  </>
                ) : (
                  <>
                    <Table className="h-4 w-4 text-white/50" />
                    <span className="font-medium text-white">Switch to Table View</span>
                  </>
                )}
              </DropdownMenuItem>

              {circuitCount > 0 && (
                <>
                  <DropdownMenuSeparator className="bg-white/[0.06]" />
                  <DropdownMenuItem
                    onClick={onRemoveAllCircuits}
                    className="gap-3 py-2.5 text-red-400 focus:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="font-medium">Clear All Circuits</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

/**
 * Desktop header with clean, focused design
 * Only 3 primary actions: Board Scanner, Voice Assistant, Add Circuit
 */
const DesktopHeader: React.FC<{
  circuitCount: number;
  onAddCircuit: () => void;
  onScanBoard: () => void;
  onScanTestResults: () => void;
  onScribbleToTable: () => void;
  onSmartAutoFill: () => void;
  onBulkInfill: () => void;
  onRemoveAllCircuits: () => void;
  onShowAnalytics: () => void;
  className?: string;
}> = ({ circuitCount, onAddCircuit, onScanBoard, onSmartAutoFill, className = '' }) => {
  // Calculate stats
  const completedCircuits = 0; // Will be calculated from actual data
  const pendingCircuits = circuitCount;
  const progressPercent =
    circuitCount > 0 ? Math.round((completedCircuits / circuitCount) * 100) : 0;

  return (
    <div className={cn('px-4 lg:px-6 py-6 mb-4', className)}>
      <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border border-border/50 shadow-lg overflow-hidden">
        {/* Header Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-6">
            {/* Left: Icon + Title */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shrink-0">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground tracking-tight">
                  Schedule of Tests
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  BS 7671 compliant circuit testing & verification
                </p>
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div className="flex items-center gap-1">
              <StatCard value={circuitCount} label="Circuits" color="text-foreground" />
              <StatCard value={completedCircuits} label="Complete" color="text-green-400" />
              <StatCard value={pendingCircuits} label="Pending" color="text-amber-400" />
              <StatCard value={`${progressPercent}%`} label="Progress" color="text-primary" />
            </div>
          </div>

          {/* Action Buttons - Clean 4-button layout */}
          <div className="mt-6 flex items-center gap-3">
            {/* AI Board Scan - Primary Feature */}
            <Button
              onClick={onScanBoard}
              size="lg"
              className="h-12 px-6 gap-2.5 bg-primary/10 hover:bg-primary/20 text-foreground border border-primary/30 hover:border-primary/50 font-medium transition-all"
              variant="outline"
            >
              <Camera className="h-5 w-5 text-primary" />
              AI Board Scan
            </Button>

            {/* Voice Assistant - Premium Feature */}
            <Button
              size="lg"
              className="h-12 px-6 gap-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-purple-500/25 transition-all"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
              Voice Assistant
            </Button>

            {/* Smart Fill - Auto-populate Feature */}
            <Button
              onClick={onSmartAutoFill}
              size="lg"
              variant="outline"
              className="h-12 px-6 gap-2.5 text-amber-400 border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-500/50 font-medium transition-all"
            >
              <Sparkles className="h-5 w-5" />
              Smart Fill
            </Button>

            {/* Add Circuit - Standard Action */}
            <Button
              onClick={onAddCircuit}
              size="lg"
              variant="outline"
              className="h-12 px-6 gap-2.5 border-border/60 hover:bg-muted/50 font-medium transition-all"
            >
              <Plus className="h-5 w-5" />
              Add Circuit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Stat card component for header
 */
const StatCard: React.FC<{ value: number | string; label: string; color: string }> = ({
  value,
  label,
  color,
}) => (
  <div className="px-5 py-3 text-center min-w-[90px] border-r border-border/30 last:border-r-0">
    <div className={cn('text-2xl font-bold tabular-nums', color)}>{value}</div>
    <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
  </div>
);

export default ScheduleHeader;
