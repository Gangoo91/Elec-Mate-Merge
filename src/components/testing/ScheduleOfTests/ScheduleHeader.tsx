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
 * Mobile-optimized sticky toolbar - Clean 3-action design
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
      {/* Compact Title + Stats Row */}
      <div className={cn('px-4 py-2 bg-background border-b border-border/30', className)}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Schedule of Tests</h2>
          </div>
          <Badge variant="secondary" className="px-2.5 py-1 text-xs font-medium">
            {circuitCount} {circuitCount === 1 ? 'circuit' : 'circuits'}
          </Badge>
        </div>
      </div>

      {/* Sticky Toolbar - 3 Primary Actions + Menu */}
      <div className="sticky top-0 z-20 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="px-3 py-2 flex items-center justify-between gap-2">
          {/* Primary Actions - Clean & Focused */}
          <div className="flex items-center gap-2 flex-1">
            {/* Add Circuit */}
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-3 gap-1.5 flex-1 max-w-[100px] hover:bg-primary/10 hover:border-primary/30 font-medium"
              onClick={onAddCircuit}
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>

            {/* Scan Board - Hero Feature */}
            <Button
              size="sm"
              className="h-10 px-3 gap-1.5 flex-1 max-w-[120px] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 font-medium shadow-sm"
              onClick={onScanBoard}
            >
              <Camera className="h-4 w-4" />
              Scan
            </Button>

            {/* Quick Entry - Speed Feature */}
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-3 gap-1.5 flex-1 max-w-[100px] hover:bg-amber-500/10 hover:border-amber-500/30 font-medium text-amber-500"
              onClick={onSmartAutoFill}
            >
              <Zap className="h-4 w-4" />
              Quick
            </Button>
          </div>

          {/* Overflow Menu - Everything Else */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 shrink-0 hover:bg-muted"
              >
                <MoreVertical className="h-5 w-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-card border-border">
              {/* AI Tools Section */}
              <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                AI Tools
              </div>
              <DropdownMenuItem onClick={onScanTestResults} className="gap-3 py-2.5">
                <FileText className="h-4 w-4 text-primary" />
                <div className="flex flex-col">
                  <span className="font-medium">Scan Test Results</span>
                  <span className="text-[11px] text-muted-foreground">Photo of test sheet</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onScribbleToTable} className="gap-3 py-2.5">
                <Pen className="h-4 w-4 text-primary" />
                <div className="flex flex-col">
                  <span className="font-medium">Text to Circuits</span>
                  <span className="text-[11px] text-muted-foreground">Type or paste circuit list</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Smart Features Section */}
              <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                Smart Features
              </div>
              <DropdownMenuItem onClick={onRcdPresets} className="gap-3 py-2.5">
                <Shield className="h-4 w-4 text-blue-400" />
                <div className="flex flex-col">
                  <span className="font-medium">RCD Presets</span>
                  <span className="text-[11px] text-muted-foreground">Apply common RCD settings</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onBulkInfill} className="gap-3 py-2.5">
                <Grid className="h-4 w-4 text-green-400" />
                <div className="flex flex-col">
                  <span className="font-medium">Bulk Infill</span>
                  <span className="text-[11px] text-muted-foreground">Fill multiple circuits at once</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onQuickFillRcd} className="gap-3 py-2.5">
                <Zap className="h-4 w-4 text-amber-400" />
                <div className="flex flex-col">
                  <span className="font-medium">Quick Fill RCD</span>
                  <span className="text-[11px] text-muted-foreground">Auto-detect RCD protection</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* View Options */}
              <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                View Options
              </div>
              <DropdownMenuItem onClick={onToggleViewMode} className="gap-3 py-2.5">
                {viewMode === 'table' ? (
                  <>
                    <Layout className="h-4 w-4" />
                    <span className="font-medium">Switch to Card View</span>
                  </>
                ) : (
                  <>
                    <Table className="h-4 w-4" />
                    <span className="font-medium">Switch to Table View</span>
                  </>
                )}
              </DropdownMenuItem>

              {circuitCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={onRemoveAllCircuits}
                    className="gap-3 py-2.5 text-destructive focus:text-destructive"
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
}> = ({
  circuitCount,
  onAddCircuit,
  onScanBoard,
  onSmartAutoFill,
  className = '',
}) => {
  // Calculate stats
  const completedCircuits = 0; // Will be calculated from actual data
  const pendingCircuits = circuitCount;
  const progressPercent = circuitCount > 0 ? Math.round((completedCircuits / circuitCount) * 100) : 0;

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
                <h2 className="text-2xl font-bold text-foreground tracking-tight">Schedule of Tests</h2>
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
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
const StatCard: React.FC<{ value: number | string; label: string; color: string }> = ({ value, label, color }) => (
  <div className="px-5 py-3 text-center min-w-[90px] border-r border-border/30 last:border-r-0">
    <div className={cn("text-2xl font-bold tabular-nums", color)}>{value}</div>
    <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
  </div>
);

export default ScheduleHeader;
