import React, { useState } from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, CheckCircle, Calculator } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface EnhancedTestResultDesktopTableHeaderProps {
  showRegulationStatus?: boolean;
  collapsedGroups: Set<string>;
  onToggleGroup: (groupName: string) => void;
  onFillAllRcdTestButton?: () => void;
  onFillAllAfdd?: () => void;
  onFillAllRcdBsStandard?: (value: string) => void;
  onFillAllRcdType?: (value: string) => void;
  onFillAllRcdRating?: (value: string) => void;
  onFillAllRcdRatingA?: (value: string) => void;
  onFillAllMaxZs?: () => void;
}

const EnhancedTestResultDesktopTableHeader: React.FC<EnhancedTestResultDesktopTableHeaderProps> = ({
  showRegulationStatus = false,
  collapsedGroups,
  onToggleGroup,
  onFillAllRcdTestButton,
  onFillAllAfdd,
  onFillAllRcdBsStandard,
  onFillAllRcdType,
  onFillAllRcdRating,
  onFillAllRcdRatingA,
  onFillAllMaxZs
}) => {
  const [rcdBsPopoverOpen, setRcdBsPopoverOpen] = useState(false);
  const [rcdTypePopoverOpen, setRcdTypePopoverOpen] = useState(false);
  const [rcdRatingPopoverOpen, setRcdRatingPopoverOpen] = useState(false);
  const [rcdRatingAPopoverOpen, setRcdRatingAPopoverOpen] = useState(false);
  
  const isGroupCollapsed = (groupName: string) => collapsedGroups.has(groupName);

  return (
    <TableHeader className="sticky top-0 z-20">
      {/* Group Headers Row - Cleaner styling with subtle colour bands */}
      <TableRow className="bg-muted/50 border-b border-border/50">
        {/* Circuit Number - Always visible */}
        <TableHead
          colSpan={1}
          className="font-semibold text-blue-400 text-center bg-blue-500/10 border-b-2 border-blue-500/50 w-20 min-w-[80px] max-w-[80px]"
        >
          Circuit #
        </TableHead>

        <TableHead
          colSpan={4}
          className="font-semibold text-blue-400 text-center bg-blue-500/10 border-b-2 border-blue-500/50"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleGroup('circuit')}
            className="gap-1.5 h-7 px-3 w-full justify-center text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 transition-colors"
          >
            {isGroupCollapsed('circuit') ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            Circuit Details
          </Button>
        </TableHead>

        <TableHead
          colSpan={2}
          className="font-semibold text-emerald-400 text-center bg-emerald-500/10 border-b-2 border-emerald-500/50"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleGroup('conductor')}
            className="gap-1.5 h-7 px-3 w-full justify-center text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20 transition-colors"
          >
            {isGroupCollapsed('conductor') ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            Conductors
          </Button>
        </TableHead>

        <TableHead
          colSpan={5}
          className="font-semibold text-amber-400 text-center bg-amber-500/10 border-b-2 border-amber-500/50"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleGroup('protection')}
            className="gap-1.5 h-7 px-3 w-full justify-center text-amber-400 hover:text-amber-300 hover:bg-amber-500/20 transition-colors"
          >
            {isGroupCollapsed('protection') ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            Protective Device
          </Button>
        </TableHead>

        <TableHead
          colSpan={4}
          className="font-semibold text-rose-400 text-center bg-rose-500/10 border-b-2 border-rose-500/50"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleGroup('rcdDetails')}
            className="gap-1.5 h-7 px-3 w-full justify-center text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 transition-colors"
          >
            {isGroupCollapsed('rcdDetails') ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            RCD Details
          </Button>
        </TableHead>

        <TableHead colSpan={5} className="bg-purple-500/10 border-b-2 border-purple-500/50 text-center font-semibold text-sm h-10 px-2">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleGroup('continuity')}
              className="h-7 px-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 transition-colors"
            >
              {collapsedGroups.has('continuity') ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            <span className="text-purple-400">Continuity Tests</span>
          </div>
        </TableHead>

        <TableHead
          colSpan={3}
          className="font-semibold text-violet-400 text-center bg-violet-500/10 border-b-2 border-violet-500/50"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleGroup('insulation')}
            className="gap-1.5 h-7 px-3 w-full justify-center text-violet-400 hover:text-violet-300 hover:bg-violet-500/20 transition-colors"
          >
            {isGroupCollapsed('insulation') ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            Insulation Resistance
          </Button>
        </TableHead>

        <TableHead
          colSpan={2}
          className="font-semibold text-yellow-400 text-center bg-yellow-500/10 border-b-2 border-yellow-500/50"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleGroup('zs')}
            className="gap-1.5 h-7 px-3 w-full justify-center text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/20 transition-colors"
          >
            {isGroupCollapsed('zs') ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            Zs (Ω)
          </Button>
        </TableHead>

        <TableHead
          colSpan={2}
          className="font-semibold text-indigo-400 text-center bg-indigo-500/10 border-b-2 border-indigo-500/50"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleGroup('rcd')}
            className="gap-1.5 h-7 px-3 w-full justify-center text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/20 transition-colors"
          >
            {isGroupCollapsed('rcd') ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            RCD Tests
          </Button>
        </TableHead>

        <TableHead
          colSpan={1}
          className="font-semibold text-pink-400 text-center bg-pink-500/10 border-b-2 border-pink-500/50"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleGroup('afdd')}
            className="gap-1.5 h-7 px-3 w-full justify-center text-pink-400 hover:text-pink-300 hover:bg-pink-500/20 transition-colors"
          >
            {isGroupCollapsed('afdd') ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            AFDD
          </Button>
        </TableHead>

        <TableHead
          colSpan={1}
          className="font-semibold text-cyan-400 text-center bg-cyan-500/10 border-b-2 border-cyan-500/50"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleGroup('functional')}
            className="gap-1.5 h-7 px-3 w-full justify-center text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 transition-colors"
          >
            {isGroupCollapsed('functional') ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            Functional
          </Button>
        </TableHead>

        <TableHead className="font-semibold text-muted-foreground text-center bg-muted/20 border-b-2 border-border/50 px-2">
          Remarks
        </TableHead>
      </TableRow>

      {/* Individual Column Headers Row - Cleaner sub-headers */}
      <TableRow className="bg-muted/30 border-b border-border/30">
        {/* Circuit Number - Always visible */}
        <TableHead className="w-20 min-w-[80px] max-w-[80px] sticky left-0 z-40 font-medium text-blue-300/90 bg-blue-500/5 px-2 text-xs leading-tight text-center">
          Circuit number
        </TableHead>

        {/* Circuit Details */}
        {!isGroupCollapsed('circuit') && (
          <>
            <TableHead className="min-w-[220px] max-w-[220px] sticky left-[80px] z-35 font-medium text-blue-300/90 bg-blue-500/5 px-2 text-xs leading-tight text-center">Circuit description</TableHead>
            <TableHead className="min-w-[120px] max-w-[120px] font-medium text-blue-300/90 bg-blue-500/5 px-2 text-xs leading-tight break-words text-center">Type of wiring</TableHead>
            <TableHead className="min-w-[100px] max-w-[100px] font-medium text-blue-300/90 bg-blue-500/5 px-2 text-xs leading-tight break-words text-center">Reference method</TableHead>
            <TableHead className="w-16 min-w-[64px] max-w-[64px] font-medium text-blue-300/90 bg-blue-500/5 px-2 text-xs leading-tight text-center">No. of points</TableHead>
          </>
        )}

        {/* Conductor Details */}
        {!isGroupCollapsed('conductor') && (
          <>
            <TableHead className="w-28 min-w-[110px] max-w-[110px] font-medium text-emerald-300/90 bg-emerald-500/5 px-2 text-xs leading-tight break-words text-center">Live (mm²)</TableHead>
            <TableHead className="w-28 min-w-[110px] max-w-[110px] font-medium text-emerald-300/90 bg-emerald-500/5 px-2 text-xs leading-tight break-words text-center">cpc (mm²)</TableHead>
          </>
        )}

        {/* Protective Device */}
        {!isGroupCollapsed('protection') && (
          <>
            <TableHead className="w-32 min-w-[120px] max-w-[120px] font-medium text-amber-300/90 bg-amber-500/5 px-2 text-xs leading-tight break-words text-center">BS (EN)</TableHead>
            <TableHead className="w-24 min-w-[85px] max-w-[85px] font-medium text-amber-300/90 bg-amber-500/5 px-2 text-xs leading-tight text-center">Type</TableHead>
            <TableHead className="w-24 min-w-[85px] max-w-[85px] font-medium text-amber-300/90 bg-amber-500/5 px-2 text-xs leading-tight break-words text-center">Rating (A)</TableHead>
            <TableHead className="w-24 min-w-[90px] max-w-[90px] font-medium text-amber-300/90 bg-amber-500/5 px-2 text-xs leading-tight text-center">Breaking capacity (kA)</TableHead>
            <TableHead className="w-28 min-w-[100px] max-w-[100px] font-medium text-amber-300/90 bg-amber-500/5 px-2 text-xs leading-tight break-words text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span>Maximum permitted Zs (Ω)</span>
                {onFillAllMaxZs && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="h-5 w-5 p-0 flex items-center justify-center rounded-full hover:bg-elec-yellow/20 text-elec-yellow hover:text-elec-yellow/80 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-elec-yellow/50"
                        title="Auto-fill all Max Zs values"
                      >
                        <Calculator className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-3 bg-background border-border" align="start">
                      <div className="space-y-3">
                        <div className="text-xs text-muted-foreground">
                          <div className="font-semibold mb-1">Maximum Permitted Zs</div>
                          <div className="text-[10px] text-muted-foreground/70">
                            Values from BS 7671 Tables 41.2, 41.3, 41.4. These are the maximum permitted values - the tables already account for Cmin (0.95).
                          </div>
                        </div>
                        <div className="pt-2 border-t border-border">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full text-xs h-8"
                            onClick={() => {
                              onFillAllMaxZs();
                            }}
                          >
                            <Calculator className="h-3 w-3 mr-2" />
                            Auto-Fill All Max Zs
                          </Button>
                          <div className="text-[10px] text-muted-foreground/70 mt-2">
                            Automatically calculates Max Zs based on BS Standard, Curve, and Rating for each circuit
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
          </>
        )}
        
        {/* RCD Details */}
        {!isGroupCollapsed('rcdDetails') && (
          <>
            <TableHead className="w-24 min-w-[85px] max-w-[85px] font-medium text-rose-300/90 bg-rose-500/5 px-2 text-xs leading-tight break-words text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span>BS (EN)</span>
                {onFillAllRcdBsStandard && (
                  <Popover open={rcdBsPopoverOpen} onOpenChange={setRcdBsPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button
                        className="h-5 w-5 p-0 flex items-center justify-center rounded-full hover:bg-elec-yellow/20 text-elec-yellow hover:text-elec-yellow/80 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-elec-yellow/50"
                        title="Quick fill all RCD BS Standards"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 bg-background border-border" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllRcdBsStandard('RCD (BS EN 61008)');
                            setRcdBsPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          BS EN 61008
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdBsStandard('RCBO (BS EN 61009)');
                            setRcdBsPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          BS EN 61009
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdBsStandard('RCD (BS 7288)');
                            setRcdBsPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          BS 7288
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead className="w-20 min-w-[70px] max-w-[70px] font-medium text-rose-300/90 bg-rose-500/5 px-2 text-xs leading-tight text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span>Type</span>
                {onFillAllRcdType && (
                  <Popover open={rcdTypePopoverOpen} onOpenChange={setRcdTypePopoverOpen}>
                    <PopoverTrigger asChild>
                      <button
                        className="h-5 w-5 p-0 flex items-center justify-center rounded-full hover:bg-elec-yellow/20 text-elec-yellow hover:text-elec-yellow/80 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-elec-yellow/50"
                        title="Quick fill all RCD Types"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 bg-background border-border" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllRcdType('AC');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          AC
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdType('A');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdType('F');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          F
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdType('B');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          B
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdType('B+');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          B+
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead className="w-20 min-w-[75px] max-w-[75px] font-medium text-rose-300/90 bg-rose-500/5 px-2 text-xs leading-tight break-words text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span>IΔn (mA)</span>
                {onFillAllRcdRating && (
                  <Popover open={rcdRatingPopoverOpen} onOpenChange={setRcdRatingPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button
                        className="h-5 w-5 p-0 flex items-center justify-center rounded-full hover:bg-elec-yellow/20 text-elec-yellow hover:text-elec-yellow/80 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-elec-yellow/50"
                        title="Quick fill all RCD IΔn ratings"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 bg-background border-border" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllRcdRating('10mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          10mA
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRating('30mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          30mA
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRating('100mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          100mA
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRating('300mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          300mA
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRating('500mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          500mA
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead className="w-20 min-w-[75px] max-w-[75px] font-medium text-rose-300/90 bg-rose-500/5 px-2 text-xs leading-tight break-words text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span>Rating (A)</span>
                {onFillAllRcdRatingA && (
                  <Popover open={rcdRatingAPopoverOpen} onOpenChange={setRcdRatingAPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button
                        className="h-5 w-5 p-0 flex items-center justify-center rounded-full hover:bg-elec-yellow/20 text-elec-yellow hover:text-elec-yellow/80 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-elec-yellow/50"
                        title="Quick fill all RCD current ratings"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 bg-background border-border" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('16');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          16A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('25');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          25A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('32');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          32A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('40');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          40A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('50');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          50A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('63');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          63A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('80');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          80A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('100');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          100A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('125');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-600 hover:text-foreground transition-colors"
                        >
                          125A
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
          </>
        )}
        
        {/* Continuity Tests */}
        {!isGroupCollapsed('continuity') && (
          <>
            <TableHead className="w-20 min-w-[75px] max-w-[75px] font-medium text-purple-300/90 bg-purple-500/5 px-2 text-xs leading-tight break-words text-center">r₁ (line) (Ω)</TableHead>
            <TableHead className="w-20 min-w-[75px] max-w-[75px] font-medium text-purple-300/90 bg-purple-500/5 px-2 text-xs leading-tight break-words text-center">rₙ (neutral)</TableHead>
            <TableHead className="w-20 min-w-[75px] max-w-[75px] font-medium text-purple-300/90 bg-purple-500/5 px-2 text-xs leading-tight break-words text-center">r₂ (cpc)</TableHead>
            <TableHead className="w-20 min-w-[75px] max-w-[75px] font-medium text-purple-300/90 bg-purple-500/5 px-2 text-xs leading-tight break-words text-center">(R₁ + R₂)</TableHead>
            <TableHead className="w-20 min-w-[75px] max-w-[75px] font-medium text-purple-300/90 bg-purple-500/5 px-2 text-xs leading-tight break-words text-center">R₂</TableHead>
          </>
        )}

        {/* Insulation Tests */}
        {!isGroupCollapsed('insulation') && (
          <>
            <TableHead className="w-20 min-w-[80px] max-w-[80px] font-medium text-violet-300/90 bg-violet-500/5 px-2 text-center text-xs leading-tight break-words">Test voltage (V)</TableHead>
            <TableHead className="w-20 min-w-[80px] max-w-[80px] font-medium text-violet-300/90 bg-violet-500/5 px-2 text-center text-xs leading-tight break-words">Live - Live (MΩ)</TableHead>
            <TableHead className="w-20 min-w-[80px] max-w-[80px] font-medium text-violet-300/90 bg-violet-500/5 px-2 text-center text-xs leading-tight break-words">Live - Earth (MΩ)</TableHead>
          </>
        )}

        {/* Zs (Ω) Tests */}
        {!isGroupCollapsed('zs') && (
          <>
            <TableHead className="w-24 min-w-[90px] max-w-[90px] font-medium text-yellow-300/90 bg-yellow-500/5 px-2 text-center text-xs leading-tight break-words">Polarity</TableHead>
            <TableHead className="w-24 min-w-[85px] max-w-[85px] font-medium text-yellow-300/90 bg-yellow-500/5 px-2 text-center text-xs leading-tight break-words">Maximum measured</TableHead>
          </>
        )}

        {/* RCD Tests */}
        {!isGroupCollapsed('rcd') && (
          <>
            <TableHead className="w-20 min-w-[80px] max-w-[80px] font-medium text-indigo-300/90 bg-indigo-500/5 px-2 text-center text-xs leading-tight break-words">Disconnection time (ms)</TableHead>
            <TableHead className="w-24 min-w-[90px] max-w-[90px] font-medium text-indigo-300/90 bg-indigo-500/5 px-2 text-center text-xs leading-tight">
              <div className="flex items-center justify-center gap-1">
                <span className="break-words">Test button operation</span>
                {onFillAllRcdTestButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onFillAllRcdTestButton}
                    className="h-6 w-6 p-0 hover:bg-green-500/20 text-green-500 hover:text-green-400 transition-all hover:scale-110"
                    title="Fill all circuits with Pass"
                  >
                    <CheckCircle className="h-4 w-4 transition-all" />
                  </Button>
                )}
              </div>
            </TableHead>
          </>
        )}

        {/* AFDD Test */}
        {!isGroupCollapsed('afdd') && (
          <TableHead className="min-w-[100px] max-w-fit font-medium text-pink-300/90 bg-pink-500/5 px-2 text-center text-xs leading-tight">
            <div className="flex items-center justify-center gap-1">
              <span className="break-words">Manual test button operation</span>
              {onFillAllAfdd && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onFillAllAfdd}
                  className="h-6 w-6 p-0 hover:bg-green-500/20 text-green-500 hover:text-green-400 flex-shrink-0 transition-all hover:scale-110"
                  title="Fill all circuits with Pass"
                >
                  <CheckCircle className="h-4 w-4 transition-all" />
                </Button>
              )}
            </div>
          </TableHead>
        )}

        {/* Functional */}
        {!isGroupCollapsed('functional') && (
          <TableHead className="min-w-[100px] max-w-fit font-medium text-cyan-300/90 bg-cyan-500/5 px-2 text-center text-xs leading-tight break-words">Functional</TableHead>
        )}

        {/* Remarks Column */}
        <TableHead className="min-w-[100px] max-w-fit font-medium text-muted-foreground bg-muted/10 px-2 text-xs leading-tight text-center">Remarks</TableHead>

        {/* Regulation Status Column */}
        {showRegulationStatus && (
          <TableHead className="min-w-[100px] max-w-fit font-medium text-muted-foreground bg-muted/10 px-2 text-xs leading-tight break-words text-center">BS 7671</TableHead>
        )}

        {/* Actions Column */}
        <TableHead className="min-w-[80px] w-[80px] bg-muted/20 font-semibold text-primary px-2 text-center text-xs leading-tight">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default EnhancedTestResultDesktopTableHeader;
