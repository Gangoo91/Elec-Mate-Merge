import React, { useState } from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { wiringTypeOptions } from '@/types/wiringTypes';
import { referenceMethodOptions, cableSizeOptions } from '@/types/cableTypes';

interface EnhancedTestResultDesktopTableHeaderProps {
  showRegulationStatus?: boolean;
  collapsedGroups: Set<string>;
  onToggleGroup: (groupName: string) => void;
  // ELE-871 — RCD/AFDD/Functional bulk-fill now accept a value (Pass/Fail/N/A etc)
  onFillAllRcdTestButton?: (value: string) => void;
  onFillAllAfdd?: (value: string) => void;
  onFillAllRcdBsStandard?: (value: string) => void;
  onFillAllRcdType?: (value: string) => void;
  onFillAllRcdRating?: (value: string) => void;
  onFillAllRcdRatingA?: (value: string) => void;
  onFillAllMaxZs?: () => void;
  onFillAllInsulationVoltage?: (value: string) => void;
  onFillAllInsulationLiveNeutral?: (value: string) => void;
  onFillAllInsulationLiveEarth?: (value: string) => void;
  onFillAllPolarity?: (value: string) => void;
  onFillAllFunctional?: (value: string) => void;
  onFillAllWiringType?: (value: string) => void;
  onFillAllRefMethod?: (value: string) => void;
  // P2.3 — conductor-size bulk fill (same option source as the row cells)
  onFillAllLiveSize?: (value: string) => void;
  onFillAllCpcSize?: (value: string) => void;
  onFillAllKa?: (value: string) => void;
  onFillAllBsStandard?: (value: string) => void;
  onFillAllCurve?: (value: string) => void;
  onFillAllPhase?: (value: string) => void;
  onFillAllAfddNA?: () => void;
  // ELE-871 — smart RCD per-circuit fill based on bsStandard
  onSmartFillRcd?: () => void;
  // ELE-1494 — select-all. Optional, so surfaces that opt out are unchanged.
  allSelected?: boolean;
  someSelected?: boolean;
  onToggleSelectAll?: () => void;
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
  onFillAllMaxZs,
  onFillAllInsulationVoltage,
  onFillAllInsulationLiveNeutral,
  onFillAllInsulationLiveEarth,
  onFillAllPolarity,
  onFillAllFunctional,
  onFillAllWiringType,
  onFillAllRefMethod,
  onFillAllLiveSize,
  onFillAllCpcSize,
  onFillAllKa,
  onFillAllBsStandard,
  onFillAllCurve,
  onFillAllPhase,
  onFillAllAfddNA,
  onSmartFillRcd,
  allSelected = false,
  someSelected = false,
  onToggleSelectAll,
}) => {
  const [rcdBsPopoverOpen, setRcdBsPopoverOpen] = useState(false);
  const [rcdTypePopoverOpen, setRcdTypePopoverOpen] = useState(false);
  const [rcdRatingPopoverOpen, setRcdRatingPopoverOpen] = useState(false);
  const [rcdRatingAPopoverOpen, setRcdRatingAPopoverOpen] = useState(false);
  const [irVoltagePopoverOpen, setIrVoltagePopoverOpen] = useState(false);
  const [irLiveNeutralPopoverOpen, setIrLiveNeutralPopoverOpen] = useState(false);
  const [irLiveEarthPopoverOpen, setIrLiveEarthPopoverOpen] = useState(false);
  const [polarityPopoverOpen, setPolarityPopoverOpen] = useState(false);

  const isGroupCollapsed = (groupName: string) => collapsedGroups.has(groupName);

  return (
    <TableHeader>
      {/* Group Headers Row */}
      <TableRow className="sot-header-group hover:bg-transparent">
        {/* Actions — first column, NOT sticky (founder call): it scrolls away
            under the pinned Way column. Outside every group colSpan. */}
        <TableHead
          colSpan={1}
          className="sot-header-group-cell w-[210px] min-w-[210px] max-w-[210px]"
        />
        {/* Way + Description — always-visible sticky pair; label row below
            carries the names, so these group-row cells stay empty. Description
            is the last frozen column (edge shadow). */}
        <TableHead
          colSpan={1}
          className="sot-header-group-cell sot-sticky-col w-[112px] min-w-[112px] max-w-[112px]"
        />
        <TableHead
          colSpan={1}
          className="sot-header-group-cell sot-sticky-col-2 sot-sticky-last min-w-[244px] max-w-[244px]"
        />
        {/* Phase — single column (width matches the 78px label/body cells) */}
        <TableHead
          colSpan={1}
          className="sot-header-group-cell w-20 min-w-[78px] max-w-[78px]"
        />

        <TableHead colSpan={isGroupCollapsed('circuit') ? 1 : 3} className="sot-header-group-cell">
          <button
            onClick={() => onToggleGroup('circuit')}
            className="sot-collapse-btn w-full justify-center text-[11px]"
          >
            {isGroupCollapsed('circuit') ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
            Circuit details
          </button>
        </TableHead>

        <TableHead colSpan={isGroupCollapsed('conductor') ? 1 : 2} className="sot-header-group-cell">
          <button
            onClick={() => onToggleGroup('conductor')}
            className="sot-collapse-btn w-full justify-center text-[11px]"
          >
            {isGroupCollapsed('conductor') ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
            Conductors
          </button>
        </TableHead>

        <TableHead colSpan={isGroupCollapsed('protection') ? 1 : 5} className="sot-header-group-cell">
          <button
            onClick={() => onToggleGroup('protection')}
            className="sot-collapse-btn w-full justify-center text-[11px]"
          >
            {isGroupCollapsed('protection') ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
            Protective device
          </button>
        </TableHead>

        <TableHead colSpan={isGroupCollapsed('rcdDetails') ? 1 : 4} className="sot-header-group-cell">
          <button
            onClick={() => onToggleGroup('rcdDetails')}
            className="sot-collapse-btn w-full justify-center text-[11px]"
          >
            {isGroupCollapsed('rcdDetails') ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
            RCD details
          </button>
        </TableHead>

        <TableHead colSpan={isGroupCollapsed('continuity') ? 1 : 5} className="sot-header-group-cell">
          <button
            onClick={() => onToggleGroup('continuity')}
            className="sot-collapse-btn w-full justify-center text-[11px]"
          >
            {collapsedGroups.has('continuity') ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
            Continuity tests
          </button>
        </TableHead>

        {/* ELE-871 — overflow-hidden + key on the button stops the duplicate-label
            visual artifact during the colSpan recalc when toggling collapse. */}
        <TableHead colSpan={isGroupCollapsed('insulation') ? 1 : 3} className="sot-header-group-cell overflow-hidden">
          <button
            key={isGroupCollapsed('insulation') ? 'insulation-collapsed' : 'insulation-expanded'}
            onClick={() => onToggleGroup('insulation')}
            className="sot-collapse-btn w-full justify-center text-[11px]"
          >
            {isGroupCollapsed('insulation') ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
            Insulation
          </button>
        </TableHead>

        <TableHead colSpan={isGroupCollapsed('zs') ? 1 : 2} className="sot-header-group-cell">
          <button
            onClick={() => onToggleGroup('zs')}
            className="sot-collapse-btn w-full justify-center text-[11px]"
          >
            {isGroupCollapsed('zs') ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
            Zs (Ω)
          </button>
        </TableHead>

        <TableHead colSpan={isGroupCollapsed('rcd') ? 1 : 2} className="sot-header-group-cell">
          <button
            onClick={() => onToggleGroup('rcd')}
            className="sot-collapse-btn w-full justify-center text-[11px]"
          >
            {isGroupCollapsed('rcd') ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
            RCD tests
          </button>
        </TableHead>

        {/* AFDD + Func — single-column groups, so collapsing does nothing:
            plain banners, no dead chevron buttons. */}
        <TableHead colSpan={1} className="sot-header-group-cell text-[11px] font-semibold text-white">
          AFDD
        </TableHead>

        <TableHead colSpan={1} className="sot-header-group-cell text-[11px] font-semibold text-white">
          Func
        </TableHead>

        {/* Notes — the label row below carries the name */}
        <TableHead className="sot-header-group-cell" />

        {/* Keeps the group row's cell count level with the label row when the
            BS 7671 column is shown */}
        {showRegulationStatus && <TableHead className="sot-header-group-cell" />}
      </TableRow>

      {/* Individual Column Headers Row */}
      <TableRow className="sot-header-labels hover:bg-transparent">
        {/* Actions — first column, NOT sticky (founder call): scrolls away
            under the pinned Way column. */}
        <TableHead className="sot-header-cell text-[10.5px] font-semibold text-white w-[210px] min-w-[210px] max-w-[210px] text-center">
          {onToggleSelectAll ? (
            <div className="flex items-center justify-center gap-2">
              {/* Indeterminate is set on the node — it is a DOM property, not an
                  attribute, so React cannot express it in JSX. */}
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected && !allSelected;
                }}
                onChange={onToggleSelectAll}
                aria-label={allSelected ? 'Clear selection' : 'Select every circuit on this board'}
                className="h-4 w-4 shrink-0 accent-elec-yellow cursor-pointer touch-manipulation"
              />
              <span>Actions</span>
            </div>
          ) : (
            'Actions'
          )}
        </TableHead>

        {/* Circuit Number — sticky at left:0 */}
        <TableHead
          className="sot-header-cell text-[10.5px] font-semibold text-white sot-sticky-col w-[112px] min-w-[112px] max-w-[112px]"
          data-group="circuit"
        >
          Way
        </TableHead>

        {/* Description — always visible, sticky flush after Way (founder call:
            sits before 1P/3P), last frozen column */}
        <TableHead
          className="sot-header-cell text-[10.5px] font-semibold text-white sot-sticky-col-2 sot-sticky-last min-w-[244px] max-w-[244px]"
          data-group="circuit"
        >
          Description
        </TableHead>

        {/* Phase - Always visible */}
        <TableHead className="sot-header-cell text-[10.5px] font-semibold text-white w-20 min-w-[78px] max-w-[78px]" data-group="phase">
          <div className="flex items-center justify-center gap-1.5">
            <span>1P/3P</span>
            {onFillAllPhase && (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all">Fill</button>
                </PopoverTrigger>
                <PopoverContent className="w-32 p-2 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="center">
                  <p className="text-[10px] text-white mb-2 font-semibold">Fill all phase</p>
                  {['1P', '3P'].map((v) => (
                    <Button key={v} variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllPhase(v)}>{v}</Button>
                  ))}
                </PopoverContent>
              </Popover>
            )}
          </div>
        </TableHead>

        {/* Circuit Details */}
        {!isGroupCollapsed('circuit') && (
          <>
            <TableHead className="sot-header-cell text-[10.5px] font-semibold text-white min-w-[140px] max-w-[140px]" data-group="circuit">
              <div className="flex items-center justify-center gap-2">
                <span>Wiring type</span>
                {onFillAllWiringType && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all">Fill</button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 max-h-80 overflow-y-auto p-2 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="center">
                      <p className="text-[10px] text-white mb-2 font-semibold">Fill all wiring type</p>
                      {/* P2.3 — same option source as the row cells (TypeOfWiringCell) */}
                      {wiringTypeOptions.map((o) => (
                        <Button key={o.value} variant="ghost" size="sm" className="w-full justify-start text-left text-xs h-auto min-h-8 py-1.5 whitespace-normal font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllWiringType(o.value)}>{o.label}</Button>
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead className="sot-header-cell text-[10.5px] font-semibold text-white min-w-[100px] max-w-[100px]" data-group="circuit">
              <div className="flex items-center justify-center gap-2">
                <span>Ref method</span>
                {onFillAllRefMethod && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all">Fill</button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 max-h-80 overflow-y-auto p-2 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="center">
                      <p className="text-[10px] text-white mb-2 font-semibold">Fill all ref method</p>
                      {/* P2.3 — same option source as the row cells (RefMethodCell) */}
                      {referenceMethodOptions.map((o) => (
                        <Button key={o.value} variant="ghost" size="sm" className="w-full justify-start text-left text-xs h-auto min-h-8 py-1.5 whitespace-normal font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllRefMethod(o.value)}>{o.label}</Button>
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-16 min-w-[64px] max-w-[64px]"
              data-group="circuit"
            >
              Points
            </TableHead>
          </>
        )}

        {/* Collapsed groups keep ONE narrow column (the group row banner has
            colSpan 1) — every row renders a placeholder cell for it so header
            and body columns stay aligned in both states. */}
        {isGroupCollapsed('circuit') && <TableHead className="sot-header-cell" data-group="circuit" />}

        {/* Conductor Details */}
        {!isGroupCollapsed('conductor') && (
          <>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-24 min-w-[90px] max-w-[90px]"
              data-group="conductor"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Live mm²</span>
                {onFillAllLiveSize && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all">Fill</button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 max-h-80 overflow-y-auto p-2 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="center">
                      <p className="text-[10px] text-white mb-2 font-semibold">Fill all live mm²</p>
                      {/* P2.3 — same option source as the row cells (ConductorCells) */}
                      {cableSizeOptions.map((o) => (
                        <Button key={o.value} variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllLiveSize(o.value)}>{o.label}</Button>
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-24 min-w-[90px] max-w-[90px]"
              data-group="conductor"
            >
              <div className="flex items-center justify-center gap-2">
                <span>CPC mm²</span>
                {onFillAllCpcSize && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all">Fill</button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 max-h-80 overflow-y-auto p-2 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="center">
                      <p className="text-[10px] text-white mb-2 font-semibold">Fill all CPC mm²</p>
                      {/* P2.3 — same option source as the row cells (ConductorCells) */}
                      {cableSizeOptions.map((o) => (
                        <Button key={o.value} variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllCpcSize(o.value)}>{o.label}</Button>
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
          </>
        )}

        {isGroupCollapsed('conductor') && <TableHead className="sot-header-cell" data-group="conductor" />}

        {/* Protective Device */}
        {!isGroupCollapsed('protection') && (
          <>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-40 min-w-[160px] max-w-[160px]"
              data-group="protection"
            >
              <div className="flex items-center justify-center gap-2">
                <span>BS (EN)</span>
                {onFillAllBsStandard && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all">Fill</button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-2 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="center">
                      <p className="text-[10px] text-white mb-2 font-semibold">Fill all BS standard</p>
                      {['MCB (BS EN 60898)', 'RCBO (BS EN 61009)', 'Fuse (BS 88)', 'Fuse (BS 1361)', 'Fuse (BS 3036)', 'MCCB (BS EN 60947)'].map((v) => (
                        <Button key={v} variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllBsStandard(v)}>{v}</Button>
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-28 min-w-[100px] max-w-[100px]"
              data-group="protection"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Type</span>
                {onFillAllCurve && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all (MCB/RCBO only)">Fill</button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="center">
                      <p className="text-[10px] text-white mb-2 font-semibold">Fill all curve (MCB/RCBO)</p>
                      {['B', 'C', 'D'].map((v) => (
                        <Button key={v} variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllCurve(v)}>Curve {v}</Button>
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-28 min-w-[95px] max-w-[95px]"
              data-group="protection"
            >
              Rating A
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-28 min-w-[100px] max-w-[100px]"
              data-group="protection"
            >
              <div className="flex items-center justify-center gap-2">
                <span>kA</span>
                {onFillAllKa && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all">Fill</button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="center">
                      <p className="text-[10px] text-white mb-2 font-semibold">Fill all kA</p>
                      {['3', '6', '10', '16', '25'].map((v) => (
                        <Button key={v} variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllKa(v)}>{v} kA</Button>
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-32 min-w-[132px] max-w-[132px]"
              data-group="protection"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Max Zs Ω</span>
                {onFillAllMaxZs && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="text-[9.5px] font-bold text-elec-yellow touch-manipulation"
                        title="Auto-fill all Max Zs values"
                      >
                        Auto
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-3 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="start">
                      <div className="space-y-3">
                        <div className="text-xs text-white">
                          <div className="font-semibold mb-1 text-white">Maximum permitted Zs</div>
                          <div className="text-[10px] text-white">
                            Values from BS 7671 Tables 41.2, 41.3, 41.4. These are the maximum
                            permitted values - the tables already account for Cmin (0.95).
                          </div>
                        </div>
                        <div className="pt-2 border-t border-white/10">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full text-xs h-8 bg-elec-yellow border-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 hover:text-black"
                            onClick={() => {
                              onFillAllMaxZs();
                            }}
                          >
                            Auto-fill all Max Zs
                          </Button>
                          <div className="text-[10px] text-white mt-2">
                            Automatically calculates Max Zs based on BS Standard, Curve, and Rating
                            for each circuit
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

        {isGroupCollapsed('protection') && <TableHead className="sot-header-cell" data-group="protection" />}

        {/* RCD Details */}
        {!isGroupCollapsed('rcdDetails') && (
          <>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-40 min-w-[140px] max-w-[140px]"
              data-group="rcd-details"
            >
              <div className="flex items-center justify-center gap-2">
                <span>BS (EN)</span>
                {onFillAllRcdBsStandard && (
                  <Popover open={rcdBsPopoverOpen} onOpenChange={setRcdBsPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all RCD BS Standards">
                        Fill
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllRcdBsStandard('RCD (BS EN 61008)');
                            setRcdBsPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          BS EN 61008
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdBsStandard('RCBO (BS EN 61009)');
                            setRcdBsPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          BS EN 61009
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdBsStandard('RCD (BS 7288)');
                            setRcdBsPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          BS 7288
                        </button>
                        {/* ELE-871 — N/A option for non-RCD circuits */}
                        <button
                          onClick={() => {
                            onFillAllRcdBsStandard('N/A');
                            setRcdBsPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          N/A
                        </button>
                        {/* ELE-871 — Smart fill: per-circuit based on bsStandard */}
                        {onSmartFillRcd && (
                          <button
                            onClick={() => {
                              onSmartFillRcd();
                              setRcdBsPopoverOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-semibold rounded-md bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors touch-manipulation mt-1"
                          >
                            Smart fill (auto by device)
                          </button>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-28 min-w-[105px] max-w-[105px]"
              data-group="rcd-details"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Type</span>
                {onFillAllRcdType && (
                  <Popover open={rcdTypePopoverOpen} onOpenChange={setRcdTypePopoverOpen}>
                    <PopoverTrigger asChild>
                      <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all RCD Types">
                        Fill
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllRcdType('AC');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          AC
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdType('A');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdType('F');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          F
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdType('B');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          B
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdType('B+');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          B+
                        </button>
                        {/* ELE-871 — N/A option */}
                        <button
                          onClick={() => {
                            onFillAllRcdType('N/A');
                            setRcdTypePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          N/A
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-28 min-w-[100px] max-w-[100px]"
              data-group="rcd-details"
            >
              <div className="flex items-center justify-center gap-2">
                <span>mA</span>
                {onFillAllRcdRating && (
                  <Popover open={rcdRatingPopoverOpen} onOpenChange={setRcdRatingPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all RCD IΔn ratings">
                        Fill
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllRcdRating('10mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          10mA
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRating('30mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          30mA
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRating('100mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          100mA
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRating('300mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          300mA
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRating('500mA');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          500mA
                        </button>
                        {/* ELE-871 — N/A option */}
                        <button
                          onClick={() => {
                            onFillAllRcdRating('N/A');
                            setRcdRatingPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          N/A
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-20 min-w-[75px] max-w-[75px]"
              data-group="rcd-details"
            >
              <div className="flex items-center justify-center gap-2">
                <span>A</span>
                {onFillAllRcdRatingA && (
                  <Popover open={rcdRatingAPopoverOpen} onOpenChange={setRcdRatingAPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button
                        className="text-[9.5px] font-bold text-elec-yellow touch-manipulation"
                        title="Quick fill all RCD current ratings"
                      >
                        Fill
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('16');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          16A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('25');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          25A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('32');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          32A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('40');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          40A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('50');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          50A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('63');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          63A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('80');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          80A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('100');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          100A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('125');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          125A
                        </button>
                        {/* ELE-871 — N/A option */}
                        <button
                          onClick={() => {
                            onFillAllRcdRatingA('N/A');
                            setRcdRatingAPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          N/A
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
          </>
        )}

        {isGroupCollapsed('rcdDetails') && <TableHead className="sot-header-cell" data-group="rcd-details" />}

        {/* Continuity Tests */}
        {!isGroupCollapsed('continuity') && (
          <>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-20 min-w-[75px] max-w-[75px]"
              data-group="continuity"
            >
              r₁ Ω
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-20 min-w-[75px] max-w-[75px]"
              data-group="continuity"
            >
              rₙ Ω
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-20 min-w-[75px] max-w-[75px]"
              data-group="continuity"
            >
              r₂ Ω
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-32 min-w-[132px] max-w-[132px]"
              data-group="continuity"
            >
              R₁+R₂ Ω
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-20 min-w-[75px] max-w-[75px]"
              data-group="continuity"
            >
              R₂ Ω
            </TableHead>
          </>
        )}

        {isGroupCollapsed('continuity') && <TableHead className="sot-header-cell" data-group="continuity" />}

        {/* Insulation Tests */}
        {!isGroupCollapsed('insulation') && (
          <>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-28 min-w-[104px] max-w-[104px]"
              data-group="insulation"
            >
              <div className="flex items-center justify-center gap-2">
                <span>V</span>
                {onFillAllInsulationVoltage && (
                  <Popover open={irVoltagePopoverOpen} onOpenChange={setIrVoltagePopoverOpen}>
                    <PopoverTrigger asChild>
                      <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all Test Voltages">
                        Fill
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllInsulationVoltage('250V');
                            setIrVoltagePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          250V
                        </button>
                        <button
                          onClick={() => {
                            onFillAllInsulationVoltage('500V');
                            setIrVoltagePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          500V
                        </button>
                        <button
                          onClick={() => {
                            onFillAllInsulationVoltage('1000V');
                            setIrVoltagePopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          1000V
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-28 min-w-[104px] max-w-[104px]"
              data-group="insulation"
            >
              <div className="flex items-center justify-center gap-2">
                <span>L-N MΩ</span>
                {onFillAllInsulationLiveNeutral && (
                  <Popover
                    open={irLiveNeutralPopoverOpen}
                    onOpenChange={setIrLiveNeutralPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <button
                        className="text-[9.5px] font-bold text-elec-yellow touch-manipulation"
                        title="Quick fill all Live-Neutral readings"
                      >
                        Fill
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllInsulationLiveNeutral('>200');
                            setIrLiveNeutralPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          &gt;200 MΩ
                        </button>
                        <button
                          onClick={() => {
                            onFillAllInsulationLiveNeutral('>999');
                            setIrLiveNeutralPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          &gt;999 MΩ
                        </button>
                        <button
                          onClick={() => {
                            onFillAllInsulationLiveNeutral('N/A');
                            setIrLiveNeutralPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          N/A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllInsulationLiveNeutral('LIM');
                            setIrLiveNeutralPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          LIM
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-28 min-w-[104px] max-w-[104px]"
              data-group="insulation"
            >
              <div className="flex items-center justify-center gap-2">
                <span>L-E MΩ</span>
                {onFillAllInsulationLiveEarth && (
                  <Popover open={irLiveEarthPopoverOpen} onOpenChange={setIrLiveEarthPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button
                        className="text-[9.5px] font-bold text-elec-yellow touch-manipulation"
                        title="Quick fill all Live-Earth readings"
                      >
                        Fill
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllInsulationLiveEarth('>200');
                            setIrLiveEarthPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          &gt;200 MΩ
                        </button>
                        <button
                          onClick={() => {
                            onFillAllInsulationLiveEarth('>999');
                            setIrLiveEarthPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          &gt;999 MΩ
                        </button>
                        <button
                          onClick={() => {
                            onFillAllInsulationLiveEarth('N/A');
                            setIrLiveEarthPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          N/A
                        </button>
                        <button
                          onClick={() => {
                            onFillAllInsulationLiveEarth('LIM');
                            setIrLiveEarthPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          LIM
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
          </>
        )}

        {isGroupCollapsed('insulation') && <TableHead className="sot-header-cell" data-group="insulation" />}

        {/* Zs (Ω) Tests */}
        {!isGroupCollapsed('zs') && (
          <>
            <TableHead className="sot-header-cell text-[10.5px] font-semibold text-white w-28 min-w-[100px] max-w-[100px]" data-group="zs">
              <div className="flex items-center justify-center gap-2">
                <span>Pol</span>
                {onFillAllPolarity && (
                  <Popover open={polarityPopoverOpen} onOpenChange={setPolarityPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all Polarity">
                        Fill
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="start">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            onFillAllPolarity('Correct');
                            setPolarityPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          Correct
                        </button>
                        <button
                          onClick={() => {
                            onFillAllPolarity('Incorrect');
                            setPolarityPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          Incorrect
                        </button>
                        <button
                          onClick={() => {
                            onFillAllPolarity('N/A');
                            setPolarityPopoverOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-md text-white hover:bg-elec-yellow hover:text-black transition-colors touch-manipulation"
                        >
                          N/A
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
            <TableHead className="sot-header-cell text-[10.5px] font-semibold text-white w-24 min-w-[85px] max-w-[85px]" data-group="zs">
              Zs Ω
            </TableHead>
          </>
        )}

        {isGroupCollapsed('zs') && <TableHead className="sot-header-cell" data-group="zs" />}

        {/* RCD Tests */}
        {!isGroupCollapsed('rcd') && (
          <>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-24 min-w-[90px] max-w-[90px]"
              data-group="rcd-tests"
            >
              ms
            </TableHead>
            <TableHead
              className="sot-header-cell text-[10.5px] font-semibold text-white w-28 min-w-[100px] max-w-[100px]"
              data-group="rcd-tests"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Btn</span>
                {/* ELE-871 — Pass / Fail / N/A menu (was Pass-only) */}
                {onFillAllRcdTestButton && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all">Fill</button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-2 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="center">
                      <p className="text-[10px] text-white mb-2 font-semibold">Fill all RCD btn</p>
                      <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllRcdTestButton('✓')}>All pass</Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllRcdTestButton('✗')}>All fail</Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllRcdTestButton('N/A')}>All N/A</Button>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableHead>
          </>
        )}

        {isGroupCollapsed('rcd') && <TableHead className="sot-header-cell" data-group="rcd-tests" />}

        {/* AFDD Test — ELE-871 Sat / Unsat / N/A menu */}
        <TableHead className="sot-header-cell text-[10.5px] font-semibold text-white w-16 min-w-[60px] max-w-[60px]" data-group="afdd">
          <div className="flex items-center justify-center gap-2">
            <span>Test</span>
            {onFillAllAfdd && (
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all">Fill</button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-2 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="center">
                    <p className="text-[10px] text-white mb-2 font-semibold">Fill all AFDD</p>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllAfdd('✓')}>All satisfactory</Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllAfdd('✗')}>All unsatisfactory</Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllAfdd('N/A')}>All N/A</Button>
                  </PopoverContent>
                </Popover>
              )}
          </div>
        </TableHead>

        {/* Functional — ELE-871 Sat / Unsat / N/A menu. Group banner above says
            'Func', so this label mirrors AFDD's 'Test' (no stacked duplicate). */}
        <TableHead
          className="sot-header-cell text-[10.5px] font-semibold text-white w-16 min-w-[70px] max-w-[70px]"
          data-group="functional"
        >
          <div className="flex items-center justify-center gap-2">
            <span>Test</span>
            {onFillAllFunctional && (
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-[9.5px] font-bold text-elec-yellow touch-manipulation" title="Quick fill all">Fill</button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-2 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]" align="center">
                    <p className="text-[10px] text-white mb-2 font-semibold">Fill all functional</p>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllFunctional('✓')}>All satisfactory</Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllFunctional('✗')}>All unsatisfactory</Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8 font-medium text-white hover:bg-elec-yellow hover:text-black" onClick={() => onFillAllFunctional('N/A')}>All N/A</Button>
                  </PopoverContent>
                </Popover>
              )}
          </div>
        </TableHead>

        {/* Remarks Column */}
        <TableHead className="sot-header-cell text-[10.5px] font-semibold text-white min-w-[80px]">Notes</TableHead>

        {/* Regulation Status Column */}
        {showRegulationStatus && (
          <TableHead className="sot-header-cell text-[10.5px] font-semibold text-white min-w-[80px]">BS 7671</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};

// Memoised — the parent keeps every fill handler referentially stable
// (useCallback + resultsRef), so the ~15-popover header no longer re-renders
// on every keystroke in the grid.
export default React.memo(EnhancedTestResultDesktopTableHeader);
