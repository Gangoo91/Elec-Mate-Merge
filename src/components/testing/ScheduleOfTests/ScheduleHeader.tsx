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
 * Desktop header with clean action bar
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
  onScanTestResults,
  onScribbleToTable,
  onSmartAutoFill,
  onBulkInfill,
  onRemoveAllCircuits,
  onShowAnalytics,
  className = '',
}) => {
  return (
    <div className={cn('space-y-4 px-4 lg:px-6 py-4 mb-4', className)}>
      {/* Title Row */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-foreground">Schedule of Tests</h2>
          <p className="text-sm text-muted-foreground">
            BS 7671 Electrical Installation Certificate
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1.5 text-sm font-medium">
          {circuitCount} {circuitCount === 1 ? 'circuit' : 'circuits'}
        </Badge>
      </div>

      {/* Action Bar - All visible on desktop */}
      <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-card/50 border border-border">
        {/* Primary Action */}
        <Button onClick={onAddCircuit} className="h-10 px-4 gap-2">
          <Plus className="h-4 w-4" />
          Add Circuit
        </Button>

        <div className="w-px h-8 bg-border" />

        {/* AI Tools */}
        <Button
          onClick={onScanBoard}
          className="h-10 px-4 gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          <Camera className="h-4 w-4" />
          Scan Board
        </Button>
        <Button
          onClick={onScanTestResults}
          variant="outline"
          className="h-10 px-4 gap-2"
        >
          <FileText className="h-4 w-4" />
          Scan Results
        </Button>
        <Button
          onClick={onScribbleToTable}
          variant="outline"
          className="h-10 px-4 gap-2"
        >
          <Pen className="h-4 w-4" />
          Text to Circuits
        </Button>

        <div className="w-px h-8 bg-border" />

        {/* Smart Features */}
        <Button
          onClick={onSmartAutoFill}
          variant="outline"
          className="h-10 px-4 gap-2 text-amber-400 border-amber-500/30 hover:bg-amber-500/10"
        >
          <Zap className="h-4 w-4" />
          Auto-Fill
        </Button>
        <Button
          onClick={onBulkInfill}
          variant="outline"
          className="h-10 px-4 gap-2"
        >
          <Grid className="h-4 w-4" />
          Bulk Infill
        </Button>
        <Button
          onClick={onShowAnalytics}
          variant="outline"
          className="h-10 px-4 gap-2"
          disabled={circuitCount === 0}
        >
          <BarChart3 className="h-4 w-4" />
          Analytics
        </Button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Destructive Action */}
        {circuitCount > 0 && (
          <Button
            onClick={onRemoveAllCircuits}
            variant="ghost"
            className="h-10 px-4 gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default ScheduleHeader;
