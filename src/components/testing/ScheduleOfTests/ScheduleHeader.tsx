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
      {/* Title Section */}
      <div className={cn('px-4 py-3 border-b border-border/50 bg-background', className)}>
        <h2 className="text-xl font-bold text-foreground">Schedule of Tests</h2>
        <span className="text-sm text-muted-foreground">
          {circuitCount} {circuitCount === 1 ? 'circuit' : 'circuits'}
        </span>
      </div>

      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm px-3 py-2 flex items-center gap-2 justify-between">
        {/* AI Scan - Hero Action */}
        <Button
          variant="default"
          size="sm"
          className="h-10 px-4 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          onClick={onScanBoard}
        >
          <Camera className="h-4 w-4" />
          <span>Scan Board</span>
        </Button>

        <div className="flex items-center gap-2">
          {/* Primary Add Button */}
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-10 p-0 shrink-0 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
            onClick={onAddCircuit}
          >
            <Plus className="h-5 w-5 text-primary" />
          </Button>

          <div className="w-px h-8 bg-border/50" />

          {/* AI Tools Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 shrink-0 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                title="AI Tools"
              >
                <Wand2 className="h-4 w-4 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background z-50">
              <DropdownMenuItem onClick={onScanTestResults}>
                <FileText className="mr-2 h-4 w-4" />
                AI Scan Test Results
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onScribbleToTable}>
                <Pen className="mr-2 h-4 w-4" />
                Scribble to Table
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Smart Tools Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 shrink-0 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                title="Smart Tools"
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background z-50">
              <DropdownMenuItem onClick={onSmartAutoFill}>
                <Zap className="mr-2 h-4 w-4" />
                Smart Auto-Fill
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onRcdPresets}>
                <Shield className="mr-2 h-4 w-4" />
                Quick RCD Presets
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onBulkInfill}>
                <Grid className="mr-2 h-4 w-4" />
                Bulk Infill
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* More Options Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 shrink-0 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                title="More Options"
              >
                <MoreVertical className="h-4 w-4 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background z-50">
              <DropdownMenuItem onClick={onToggleViewMode}>
                {viewMode === 'table' ? (
                  <>
                    <Layout className="mr-2 h-4 w-4" /> Switch to Card View
                  </>
                ) : (
                  <>
                    <Table className="mr-2 h-4 w-4" /> Switch to Table View
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onQuickFillRcd}>
                <Zap className="mr-2 h-4 w-4 text-primary" />
                Quick Fill RCD
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onRemoveAllCircuits} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All Circuits
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

/**
 * Desktop header with grouped actions
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
    <div className={cn('flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-8', className)}>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">Circuit Test Results</h3>
        <p className="text-sm text-muted-foreground">
          Enter test results for each circuit according to BS 7671
        </p>
      </div>

      {/* Actions - Better grouped */}
      <div className="flex flex-wrap gap-3 w-full sm:w-auto">
        {/* AI Tools Group - Primary */}
        <div className="flex gap-2 p-2 rounded-lg bg-primary/5 border border-primary/20">
          <Button
            onClick={onScanBoard}
            size="sm"
            className="h-9 text-sm px-4 gap-2"
          >
            <Camera className="h-4 w-4" />
            Scan Board
          </Button>
          <Button
            onClick={onScanTestResults}
            size="sm"
            variant="outline"
            className="h-9 text-sm px-4 gap-2 text-foreground bg-background/50 hover:bg-accent hover:text-accent-foreground"
          >
            <FileText className="h-4 w-4" />
            Scan Results
          </Button>
        </div>

        {/* Smart Tools Group */}
        <div className="flex gap-2 p-2 rounded-lg bg-card/50 border border-border">
          <Button
            onClick={onScribbleToTable}
            size="sm"
            variant="outline"
            className="h-9 text-sm px-4 gap-2 border-transparent hover:bg-muted"
          >
            <Pen className="h-4 w-4" />
            Text to Circuits
          </Button>
          <Button
            onClick={onSmartAutoFill}
            size="sm"
            variant="outline"
            className="h-9 text-sm px-4 gap-2 border-transparent hover:bg-muted"
          >
            <Zap className="h-4 w-4" />
            Smart Auto-Fill
          </Button>
          <Button
            onClick={onBulkInfill}
            size="sm"
            variant="outline"
            className="h-9 text-sm px-4 gap-2 border-transparent hover:bg-muted"
          >
            <Grid className="h-4 w-4" />
            Bulk Infill
          </Button>
        </div>

        {/* Primary Actions */}
        <div className="flex gap-2">
          <Button onClick={onAddCircuit} size="sm" className="h-9 px-4 gap-2">
            <Plus className="h-4 w-4" />
            Add Circuit
          </Button>
          {circuitCount > 0 && (
            <Button
              onClick={onRemoveAllCircuits}
              size="sm"
              variant="destructive"
              className="h-9 px-4 gap-2"
            >
              Remove All
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleHeader;
