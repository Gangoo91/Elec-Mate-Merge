import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import {
  rcdBsStandardOptions,
  bsStandardOptions,
  protectiveDeviceCurveOptions,
  bs3871TypeOptions,
} from '@/types/protectiveDeviceTypes';
import { rcdTypeOptions, wiringTypeOptions } from '@/types/wiringTypes';
import { referenceMethodOptions, cableSizeOptions } from '@/types/cableTypes';

interface MobileHorizontalScrollTableHeaderProps {
  // ELE-871 — RCD/AFDD/Functional bulk-fill accept a value (Pass/Fail/N/A)
  onFillAllRcdTestButton?: (value: string) => void;
  onFillAllAfdd?: (value: string) => void;
  onFillAllBsStandard?: (value: string) => void;
  onFillAllCurve?: (value: string) => void;
  onFillAllKa?: (value: string) => void;
  onFillAllRcdBsStandard?: (value: string) => void;
  onFillAllRcdType?: (value: string) => void;
  onFillAllRcdRating?: (value: string) => void;
  onFillAllRcdRatingA?: (value: string) => void;
  /** Adds the Smart fill entry to the RCD BS Fill menu (value '__smart__') */
  showSmartFillRcd?: boolean;
  onFillAllInsulationVoltage?: (value: string) => void;
  onFillAllInsulationLiveNeutral?: (value: string) => void;
  onFillAllInsulationLiveEarth?: (value: string) => void;
  onFillAllPolarity?: (value: string) => void;
  onFillAllFunctional?: (value: string) => void;
  // P2.3 — circuit-details bulk fill (same option sources as the row cells)
  onFillAllWiringType?: (value: string) => void;
  onFillAllRefMethod?: (value: string) => void;
  onFillAllLiveSize?: (value: string) => void;
  onFillAllCpcSize?: (value: string) => void;
}

export const MobileHorizontalScrollTableHeader: React.FC<
  MobileHorizontalScrollTableHeaderProps
> = ({
  onFillAllRcdTestButton,
  onFillAllAfdd,
  onFillAllBsStandard,
  onFillAllCurve,
  onFillAllKa,
  onFillAllRcdBsStandard,
  onFillAllRcdType,
  onFillAllRcdRating,
  onFillAllRcdRatingA,
  showSmartFillRcd = false,
  onFillAllInsulationVoltage,
  onFillAllInsulationLiveNeutral,
  onFillAllInsulationLiveEarth,
  onFillAllPolarity,
  onFillAllFunctional,
  onFillAllWiringType,
  onFillAllRefMethod,
  onFillAllLiveSize,
  onFillAllCpcSize,
}) => {
  const headerCell =
    'font-semibold text-xs p-0.5 text-center whitespace-nowrap border-r border-white/[0.08] bg-[hsl(0_0%_12%)] text-white';
  // Bulk fill is the biggest time-saver in the schedule, so it gets a real 44px
  // target: h-11 for the height, and an invisible pseudo-element for the width
  // so the narrow 76px columns still fit their label beside it.
  const fillTrigger =
    "relative h-11 w-auto min-w-[36px] px-2 border-0 bg-transparent shadow-none [&>svg]:hidden touch-manipulation rounded active:bg-white/10 after:absolute after:content-[''] after:-inset-x-1 after:inset-y-0";
  const fillLabel = <span className="text-[10px] font-semibold leading-none text-elec-yellow">Fill</span>;

  // Not viewport-sticky — inside the board panel there is no 56px bar to park
  // under, so the old sticky top-14 painted a phantom empty band above the labels.
  return (
    <TableHeader className="z-40 bg-[hsl(0_0%_12%)] border-b border-white/[0.08] h-14">
      <TableRow className="hover:bg-transparent border-b border-white/[0.08]">
        {/* Circuit Details Group — the single header row has no group banners,
            so labels carry the disambiguation ('Max Zs' vs 'Zs', 'RCD BS' vs
            'BS') instead of repeating one-word codes. */}
        <TableHead className="sticky left-0 z-20 border-r border-white/[0.08] font-bold text-xs p-0.5 text-center whitespace-nowrap bg-[hsl(0_0%_12%)] text-white w-[83px] min-w-[83px] max-w-[83px] shadow-[4px_0_8px_-2px_rgba(0,0,0,0.5)]">
          Way
        </TableHead>
        <TableHead className={`${headerCell} w-[152px] min-w-[152px] max-w-[152px]`}>
          Desc
        </TableHead>
        <TableHead className={`${headerCell} w-[92px] min-w-[92px] max-w-[92px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>Type</span>
            {onFillAllWiringType && (
              <Select onValueChange={onFillAllWiringType}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent className="max-w-[min(92vw,320px)]">
                  {wiringTypeOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-xs whitespace-normal focus:bg-elec-yellow focus:text-black">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[76px] min-w-[76px] max-w-[76px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>Ref</span>
            {onFillAllRefMethod && (
              <Select onValueChange={onFillAllRefMethod}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent className="max-w-[min(92vw,320px)]">
                  {referenceMethodOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-xs whitespace-normal focus:bg-elec-yellow focus:text-black">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[83px] min-w-[83px] max-w-[83px]`}>Pts</TableHead>

        {/* Conductor Details Group */}
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>Live</span>
            {onFillAllLiveSize && (
              <Select onValueChange={onFillAllLiveSize}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent className="min-w-[120px]">
                  {cableSizeOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-xs focus:bg-elec-yellow focus:text-black">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>CPC</span>
            {onFillAllCpcSize && (
              <Select onValueChange={onFillAllCpcSize}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent className="min-w-[120px]">
                  {cableSizeOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-xs focus:bg-elec-yellow focus:text-black">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>

        {/* Protection Group */}
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>BS</span>
            {onFillAllBsStandard && (
              <Select onValueChange={onFillAllBsStandard}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent>
                  {bsStandardOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-xs focus:bg-elec-yellow focus:text-black">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[76px] min-w-[76px] max-w-[76px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>Curve</span>
            {onFillAllCurve && (
              <Select onValueChange={onFillAllCurve}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent>
                  {protectiveDeviceCurveOptions
                    .filter((o) => o.value !== 'N/A')
                    .map((o) => (
                      <SelectItem key={o.value} value={o.value} className="text-xs focus:bg-elec-yellow focus:text-black">
                        Curve {o.label}
                      </SelectItem>
                    ))}
                  {/* ELE-1604 — BS 3871 types, offered alongside B/C/D. The
                      handler only writes each to rows on its own standard. */}
                  {bs3871TypeOptions
                    .filter((o) => o.value !== 'N/A')
                    .map((o) => (
                      <SelectItem key={`bs3871-${o.value}`} value={o.value} className="text-xs focus:bg-elec-yellow focus:text-black">
                        {o.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[92px] min-w-[92px] max-w-[92px]`}>Rating A</TableHead>
        <TableHead className={`${headerCell} w-[83px] min-w-[83px] max-w-[83px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>kA</span>
            {onFillAllKa && (
              <Select onValueChange={onFillAllKa}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent>
                  {['3', '6', '10', '16', '25'].map((v) => (
                    <SelectItem key={v} value={v} className="text-xs focus:bg-elec-yellow focus:text-black">
                      {v} kA
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        {/* Maximum permitted Zs — NOT the measured reading (that column is
            further right under 'Zs') */}
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>Max Zs</TableHead>

        {/* RCD Details Group */}
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>RCD BS</span>
            {onFillAllRcdBsStandard && (
              <Select onValueChange={onFillAllRcdBsStandard}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent>
                  {rcdBsStandardOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-xs focus:bg-elec-yellow focus:text-black">
                      {o.label}
                    </SelectItem>
                  ))}
                  {/* ELE-871 — per-circuit fill based on the protective device */}
                  {showSmartFillRcd && (
                    <SelectItem
                      value="__smart__"
                      className="text-xs font-semibold text-elec-yellow focus:bg-elec-yellow focus:text-black"
                    >
                      Smart fill (auto by device)
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[92px] min-w-[92px] max-w-[92px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>RCD type</span>
            {onFillAllRcdType && (
              <Select onValueChange={onFillAllRcdType}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent>
                  {rcdTypeOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-xs focus:bg-elec-yellow focus:text-black">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[92px] min-w-[92px] max-w-[92px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>mA</span>
            {onFillAllRcdRating && (
              <Select onValueChange={onFillAllRcdRating}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent>
                  {/* Canonical values carry the unit — same vocabulary as the
                      desktop cells, so certs round-trip across breakpoints */}
                  {['10mA', '30mA', '100mA', '300mA', '500mA', 'N/A'].map((v) => (
                    <SelectItem key={v} value={v} className="text-xs focus:bg-elec-yellow focus:text-black">
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[92px] min-w-[92px] max-w-[92px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>RCD A</span>
            {onFillAllRcdRatingA && (
              <Select onValueChange={onFillAllRcdRatingA}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent>
                  {/* ELE-871 parity with desktop: 16–125 A plus N/A */}
                  {['16', '25', '32', '40', '50', '63', '80', '100', '125', 'N/A'].map((v) => (
                    <SelectItem key={v} value={v} className="text-xs focus:bg-elec-yellow focus:text-black">
                      {v === 'N/A' ? 'N/A' : `${v}A`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>

        {/* Continuity Tests Group */}
        <TableHead className={`${headerCell} w-[92px] min-w-[92px] max-w-[92px]`}>r₁</TableHead>
        <TableHead className={`${headerCell} w-[92px] min-w-[92px] max-w-[92px]`}>rₙ</TableHead>
        <TableHead className={`${headerCell} w-[132px] min-w-[132px] max-w-[132px]`}>r₂</TableHead>
        <TableHead className={`${headerCell} w-[132px] min-w-[132px] max-w-[132px]`}>
          R₁+R₂
        </TableHead>
        <TableHead className={`${headerCell} w-[92px] min-w-[92px] max-w-[92px]`}>R₂</TableHead>

        {/* Insulation Tests Group */}
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>V</span>
            {onFillAllInsulationVoltage && (
              <Select onValueChange={onFillAllInsulationVoltage}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent className="min-w-[140px]">
                  <SelectItem value="250V" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    250V
                  </SelectItem>
                  <SelectItem value="500V" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    500V
                  </SelectItem>
                  <SelectItem value="1000V" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    1000V
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>L-N</span>
            {onFillAllInsulationLiveNeutral && (
              <Select onValueChange={onFillAllInsulationLiveNeutral}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent className="min-w-[140px]">
                  <SelectItem value=">200" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    &gt;200 MΩ
                  </SelectItem>
                  <SelectItem value=">999" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    &gt;999 MΩ
                  </SelectItem>
                  <SelectItem value="N/A" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    N/A
                  </SelectItem>
                  <SelectItem value="LIM" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    LIM
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>L-E</span>
            {onFillAllInsulationLiveEarth && (
              <Select onValueChange={onFillAllInsulationLiveEarth}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent className="min-w-[140px]">
                  <SelectItem value=">200" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    &gt;200 MΩ
                  </SelectItem>
                  <SelectItem value=">999" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    &gt;999 MΩ
                  </SelectItem>
                  <SelectItem value="N/A" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    N/A
                  </SelectItem>
                  <SelectItem value="LIM" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    LIM
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        {/* Earth Fault Tests Group */}
        <TableHead className={`${headerCell} w-[76px] min-w-[76px] max-w-[76px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>Pol</span>
            {onFillAllPolarity && (
              <Select onValueChange={onFillAllPolarity}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent className="min-w-[160px]">
                  <SelectItem value="Correct" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    Correct
                  </SelectItem>
                  <SelectItem value="Incorrect" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    Incorrect
                  </SelectItem>
                  <SelectItem value="N/A" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    N/A
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        {/* Measured Zs reading — the limit lives in 'Max Zs' further left */}
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>Zs</TableHead>

        {/* RCD Tests Group */}
        <TableHead className={`${headerCell} w-[92px] min-w-[92px] max-w-[92px]`}>ms</TableHead>
        <TableHead className={`${headerCell} w-[76px] min-w-[76px] max-w-[76px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>Btn</span>
            {/* ELE-871 — Pass / Fail / N/A menu (was Pass-only) */}
            {onFillAllRcdTestButton && (
              <Select onValueChange={onFillAllRcdTestButton}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent className="min-w-[140px]">
                  <SelectItem value="✓" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    All pass ✓
                  </SelectItem>
                  <SelectItem value="✗" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    All fail ✗
                  </SelectItem>
                  <SelectItem value="N/A" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    All N/A
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>

        {/* AFDD Group */}
        <TableHead className={`${headerCell} w-[76px] min-w-[76px] max-w-[76px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>AFDD</span>
            {onFillAllAfdd && (
              <Select onValueChange={onFillAllAfdd}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent className="min-w-[160px]">
                  <SelectItem value="✓" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    All satisfactory ✓
                  </SelectItem>
                  <SelectItem value="✗" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    All unsatisfactory ✗
                  </SelectItem>
                  <SelectItem value="N/A" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    All N/A
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>

        {/* Functional Group */}
        <TableHead className={`${headerCell} w-[76px] min-w-[76px] max-w-[76px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>Func</span>
            {onFillAllFunctional && (
              <Select onValueChange={onFillAllFunctional}>
                <SelectTrigger className={fillTrigger}>{fillLabel}</SelectTrigger>
                <SelectContent className="min-w-[160px]">
                  <SelectItem value="✓" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    All satisfactory ✓
                  </SelectItem>
                  <SelectItem value="✗" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    All unsatisfactory ✗
                  </SelectItem>
                  <SelectItem value="N/A" className="py-3 text-base touch-manipulation focus:bg-elec-yellow focus:text-black">
                    All N/A
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[152px] min-w-[152px] max-w-[152px]`}>
          Notes
        </TableHead>
        {/* Actions — right-hand end on mobile (founder call: a 213px frozen
            zone eats too much phone width; desktop's Actions column is
            first-but-not-sticky, so neither breakpoint freezes it) */}
        <TableHead className="border-r-0 font-semibold text-xs p-0.5 text-center whitespace-nowrap text-white w-[200px] min-w-[200px] max-w-[200px]">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
