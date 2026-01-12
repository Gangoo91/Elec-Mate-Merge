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
    <TableHeader>
      {/* Group Headers Row */}
      <TableRow className="sot-header-group hover:bg-transparent">
        {/* Circuit Number - Always visible */}
        <TableHead
          colSpan={1}
          className="sot-header-group-cell w-20 min-w-[80px] max-w-[80px] bg-blue-500/10"
        >
          <span className="text-elec-yellow font-bold">C#</span>
        </TableHead>

        {/* Phase - Always visible */}
        <TableHead
          colSpan={1}
          className="sot-header-group-cell w-14 min-w-[56px] max-w-[56px] bg-purple-500/10"
        >
          <span className="text-purple-400 font-semibold text-xs">Phase</span>
        </TableHead>

        <TableHead
          colSpan={4}
          className="sot-header-group-cell bg-blue-500/5"
        >
          <button
            onClick={() => onToggleGroup('circuit')}
            className="sot-collapse-btn w-full justify-center"
          >
            {isGroupCollapsed('circuit') ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            Circuit Details
          </button>
        </TableHead>

        <TableHead
          colSpan={2}
          className="sot-header-group-cell bg-emerald-500/5"
        >
          <button
            onClick={() => onToggleGroup('conductor')}
            className="sot-collapse-btn w-full justify-center"
          >
            {isGroupCollapsed('conductor') ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            Conductors
          </button>
        </TableHead>

        <TableHead
          colSpan={5}
          className="sot-header-group-cell bg-orange-500/5"
        >
          <button
            onClick={() => onToggleGroup('protection')}
            className="sot-collapse-btn w-full justify-center"
          >
            {isGroupCollapsed('protection') ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            Protective Device
          </button>
        </TableHead>

        <TableHead
          colSpan={4}
          className="sot-header-group-cell bg-rose-500/5"
        >
          <button
            onClick={() => onToggleGroup('rcdDetails')}
            className="sot-collapse-btn w-full justify-center"
          >
            {isGroupCollapsed('rcdDetails') ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            RCD Details
          </button>
        </TableHead>

        <TableHead colSpan={5} className="sot-header-group-cell bg-violet-500/5">
          <button
            onClick={() => onToggleGroup('continuity')}
            className="sot-collapse-btn w-full justify-center"
          >
            {collapsedGroups.has('continuity') ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            Continuity Tests
          </button>
        </TableHead>

        <TableHead
          colSpan={3}
          className="sot-header-group-cell bg-purple-500/5"
        >
          <button
            onClick={() => onToggleGroup('insulation')}
            className="sot-collapse-btn w-full justify-center"
          >
            {isGroupCollapsed('insulation') ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            Insulation
          </button>
        </TableHead>

        <TableHead
          colSpan={2}
          className="sot-header-group-cell bg-amber-500/5"
        >
          <button
            onClick={() => onToggleGroup('zs')}
            className="sot-collapse-btn w-full justify-center"
          >
            {isGroupCollapsed('zs') ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            Zs (Ω)
          </button>
        </TableHead>

        <TableHead
          colSpan={2}
          className="sot-header-group-cell bg-indigo-500/5"
        >
          <button
            onClick={() => onToggleGroup('rcd')}
            className="sot-collapse-btn w-full justify-center"
          >
            {isGroupCollapsed('rcd') ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            RCD Tests
          </button>
        </TableHead>

        <TableHead
          colSpan={1}
          className="sot-header-group-cell bg-cyan-500/5"
        >
          <button
            onClick={() => onToggleGroup('afdd')}
            className="sot-collapse-btn w-full justify-center"
          >
            {isGroupCollapsed('afdd') ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            AFDD
          </button>
        </TableHead>

        <TableHead
          colSpan={1}
          className="sot-header-group-cell bg-teal-500/5"
        >
          <button
            onClick={() => onToggleGroup('functional')}
            className="sot-collapse-btn w-full justify-center"
          >
            {isGroupCollapsed('functional') ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            Func
          </button>
        </TableHead>

        <TableHead className="sot-header-group-cell">
          Notes
        </TableHead>
      </TableRow>

      {/* Individual Column Headers Row */}
      <TableRow className="sot-header-labels hover:bg-transparent">
        {/* Circuit Number - Always visible */}
        <TableHead className="sot-header-cell sot-sticky-col w-20 min-w-[80px] max-w-[80px]" data-group="circuit">
          Circuit
        </TableHead>

        {/* Phase - Always visible */}
        <TableHead className="sot-header-cell w-14 min-w-[56px] max-w-[56px]" data-group="phase">
          1P/3P
        </TableHead>

        {/* Circuit Details */}
        {!isGroupCollapsed('circuit') && (
          <>
            <TableHead className="sot-header-cell min-w-[200px] max-w-[200px] sticky left-[80px] z-35" data-group="circuit">Description</TableHead>
            <TableHead className="sot-header-cell min-w-[110px] max-w-[110px]" data-group="circuit">Wiring Type</TableHead>
            <TableHead className="sot-header-cell min-w-[90px] max-w-[90px]" data-group="circuit">Ref Method</TableHead>
            <TableHead className="sot-header-cell w-16 min-w-[64px] max-w-[64px]" data-group="circuit">Points</TableHead>
          </>
        )}

        {/* Conductor Details */}
        {!isGroupCollapsed('conductor') && (
          <>
            <TableHead className="sot-header-cell w-24 min-w-[90px] max-w-[90px]" data-group="conductor">Live mm²</TableHead>
            <TableHead className="sot-header-cell w-24 min-w-[90px] max-w-[90px]" data-group="conductor">CPC mm²</TableHead>
          </>
        )}

        {/* Protective Device */}
        {!isGroupCollapsed('protection') && (
          <>
            <TableHead className="sot-header-cell w-28 min-w-[110px] max-w-[110px]" data-group="protection">BS (EN)</TableHead>
            <TableHead className="sot-header-cell w-20 min-w-[75px] max-w-[75px]" data-group="protection">Type</TableHead>
            <TableHead className="sot-header-cell w-20 min-w-[75px] max-w-[75px]" data-group="protection">Rating A</TableHead>
            <TableHead className="sot-header-cell w-20 min-w-[75px] max-w-[75px]" data-group="protection">kA</TableHead>
            <TableHead className="sot-header-cell w-24 min-w-[90px] max-w-[90px]" data-group="protection">
              <div className="flex items-center justify-center gap-1">
                <span>Max Zs</span>
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
                        <div className="text-xs text-foreground">
                          <div className="font-semibold mb-1">Maximum Permitted Zs</div>
                          <div className="text-[10px] text-muted-foreground">
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
                          <div className="text-[10px] text-muted-foreground mt-2">
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
            <TableHead className="sot-header-cell w-24 min-w-[85px] max-w-[85px]" data-group="rcd-details">
              <div className="flex items-center justify-center gap-1">
                <span>BS (EN)</span>
                {onFillAllRcdBsStandard && (
                  <Popover open={rcdBsPopoverOpen} onOpenChange={setRcdBsPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button className="sot-fill-all-btn" title="Quick fill all RCD BS Standards">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 bg-background border-border" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllRcdBsStandard('RCD (BS EN 61008)');
                            setRcdBsPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          BS EN 61008
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdBsStandard('RCBO (BS EN 61009)');
                            setRcdBsPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          BS EN 61009
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdBsStandard('RCD (BS 7288)');
                            setRcdBsPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          BS 7288
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead className="sot-header-cell w-16 min-w-[60px] max-w-[60px]" data-group="rcd-details">
              <div className="flex items-center justify-center gap-1">
                <span>Type</span>
                {onFillAllRcdType && (
                  <Popover open={rcdTypePopoverOpen} onOpenChange={setRcdTypePopoverOpen}>
                    <PopoverTrigger asChild>
                      <button className="sot-fill-all-btn" title="Quick fill all RCD Types">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 bg-background border-border" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllRcdType('AC');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          AC
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdType('A');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdType('F');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          F
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdType('B');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          B
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdType('B+');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          B+
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead className="sot-header-cell w-16 min-w-[60px] max-w-[60px]" data-group="rcd-details">
              <div className="flex items-center justify-center gap-1">
                <span>mA</span>
                {onFillAllRcdRating && (
                  <Popover open={rcdRatingPopoverOpen} onOpenChange={setRcdRatingPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button className="sot-fill-all-btn" title="Quick fill all RCD IΔn ratings">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 bg-background border-border" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllRcdRating('10mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          10mA
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRating('30mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          30mA
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRating('100mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          100mA
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRating('300mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          300mA
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRating('500mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          500mA
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead className="sot-header-cell w-16 min-w-[60px] max-w-[60px]" data-group="rcd-details">
              <div className="flex items-center justify-center gap-1">
                <span>A</span>
                {onFillAllRcdRatingA && (
                  <Popover open={rcdRatingAPopoverOpen} onOpenChange={setRcdRatingAPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button className="sot-fill-all-btn" title="Quick fill all RCD current ratings">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 bg-background border-border" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('16');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          16A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('25');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          25A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('32');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          32A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('40');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          40A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('50');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          50A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('63');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          63A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('80');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          80A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('100');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
                        >
                          100A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('125');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors"
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
            <TableHead className="sot-header-cell w-16 min-w-[60px] max-w-[60px]" data-group="continuity">r₁</TableHead>
            <TableHead className="sot-header-cell w-16 min-w-[60px] max-w-[60px]" data-group="continuity">rₙ</TableHead>
            <TableHead className="sot-header-cell w-16 min-w-[60px] max-w-[60px]" data-group="continuity">r₂</TableHead>
            <TableHead className="sot-header-cell w-16 min-w-[65px] max-w-[65px]" data-group="continuity">R₁+R₂</TableHead>
            <TableHead className="sot-header-cell w-16 min-w-[60px] max-w-[60px]" data-group="continuity">R₂</TableHead>
          </>
        )}

        {/* Insulation Tests */}
        {!isGroupCollapsed('insulation') && (
          <>
            <TableHead className="sot-header-cell w-16 min-w-[60px] max-w-[60px]" data-group="insulation">V</TableHead>
            <TableHead className="sot-header-cell w-16 min-w-[60px] max-w-[60px]" data-group="insulation">L-L</TableHead>
            <TableHead className="sot-header-cell w-16 min-w-[60px] max-w-[60px]" data-group="insulation">L-E</TableHead>
          </>
        )}

        {/* Zs (Ω) Tests */}
        {!isGroupCollapsed('zs') && (
          <>
            <TableHead className="sot-header-cell w-20 min-w-[70px] max-w-[70px]" data-group="zs">Polarity</TableHead>
            <TableHead className="sot-header-cell w-16 min-w-[60px] max-w-[60px]" data-group="zs">Zs</TableHead>
          </>
        )}

        {/* RCD Tests */}
        {!isGroupCollapsed('rcd') && (
          <>
            <TableHead className="sot-header-cell w-16 min-w-[60px] max-w-[60px]" data-group="rcd-tests">ms</TableHead>
            <TableHead className="sot-header-cell w-16 min-w-[60px] max-w-[60px]" data-group="rcd-tests">
              <div className="flex items-center justify-center gap-1">
                <span>Btn</span>
                {onFillAllRcdTestButton && (
                  <button onClick={onFillAllRcdTestButton} className="sot-fill-all-btn text-green-500" title="Fill all with Pass">
                    <CheckCircle className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </TableHead>
          </>
        )}

        {/* AFDD Test */}
        {!isGroupCollapsed('afdd') && (
          <TableHead className="sot-header-cell w-16 min-w-[60px] max-w-[60px]" data-group="afdd">
            <div className="flex items-center justify-center gap-1">
              <span>Test</span>
              {onFillAllAfdd && (
                <button onClick={onFillAllAfdd} className="sot-fill-all-btn text-green-500" title="Fill all with Pass">
                  <CheckCircle className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </TableHead>
        )}

        {/* Functional */}
        {!isGroupCollapsed('functional') && (
          <TableHead className="sot-header-cell w-16 min-w-[70px] max-w-[70px]" data-group="functional">Func</TableHead>
        )}

        {/* Remarks Column */}
        <TableHead className="sot-header-cell min-w-[80px]">Notes</TableHead>

        {/* Regulation Status Column */}
        {showRegulationStatus && (
          <TableHead className="sot-header-cell min-w-[80px]">BS 7671</TableHead>
        )}

        {/* Actions Column */}
        <TableHead className="sot-header-cell min-w-[60px] w-[60px]">
          Del
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default EnhancedTestResultDesktopTableHeader;
