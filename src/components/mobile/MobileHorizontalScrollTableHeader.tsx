import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { rcdBsStandardOptions } from '@/types/protectiveDeviceTypes';
import { rcdTypeOptions } from '@/types/wiringTypes';

interface MobileHorizontalScrollTableHeaderProps {
  onFillAllRcdTestButton?: () => void;
  onFillAllAfdd?: () => void;
  onFillAllRcdBsStandard?: (value: string) => void;
  onFillAllRcdType?: (value: string) => void;
  onFillAllRcdRating?: (value: string) => void;
  onFillAllRcdRatingA?: (value: string) => void;
  onFillAllInsulationVoltage?: (value: string) => void;
  onFillAllInsulationLiveNeutral?: (value: string) => void;
  onFillAllInsulationLiveEarth?: (value: string) => void;
  onFillAllPolarity?: (value: string) => void;
  onFillAllFunctional?: () => void;
}

export const MobileHorizontalScrollTableHeader: React.FC<
  MobileHorizontalScrollTableHeaderProps
> = ({
  onFillAllRcdTestButton,
  onFillAllAfdd,
  onFillAllRcdBsStandard,
  onFillAllRcdType,
  onFillAllRcdRating,
  onFillAllRcdRatingA,
  onFillAllInsulationVoltage,
  onFillAllInsulationLiveNeutral,
  onFillAllInsulationLiveEarth,
  onFillAllPolarity,
  onFillAllFunctional,
}) => {
  const headerCell =
    'font-semibold text-xs p-0.5 text-center whitespace-nowrap border-r border-white/[0.08] bg-white/[0.06] text-white';

  return (
    <TableHeader className="sticky top-14 z-40 bg-white/[0.06] shadow-sm border-b border-white/[0.08] h-12">
      <TableRow className="hover:bg-transparent border-b border-white/[0.08]">
        {/* Circuit Details Group */}
        <TableHead className="sticky left-0 z-20 border-r-[3px] border-primary/40 font-bold text-xs p-0.5 text-center whitespace-nowrap bg-white/[0.08] text-white w-[83px] min-w-[83px] max-w-[83px]">
          C
        </TableHead>
        <TableHead className={`${headerCell} w-[152px] min-w-[152px] max-w-[152px]`}>
          Desc
        </TableHead>
        <TableHead className={`${headerCell} w-[92px] min-w-[92px] max-w-[92px]`}>Type</TableHead>
        <TableHead className={`${headerCell} w-[76px] min-w-[76px] max-w-[76px]`}>M</TableHead>
        <TableHead className={`${headerCell} w-[83px] min-w-[83px] max-w-[83px]`}>Pts</TableHead>

        {/* Conductor Details Group */}
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>
          Live
        </TableHead>
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>CPC</TableHead>

        {/* Protection Group */}
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>BS</TableHead>
        <TableHead className={`${headerCell} w-[76px] min-w-[76px] max-w-[76px]`}>Ty</TableHead>
        <TableHead className={`${headerCell} w-[92px] min-w-[92px] max-w-[92px]`}>A</TableHead>
        <TableHead className={`${headerCell} w-[83px] min-w-[83px] max-w-[83px]`}>kA</TableHead>
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>Zs</TableHead>

        {/* RCD Details Group */}
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>BS</span>
            {onFillAllRcdBsStandard && (
              <Select onValueChange={onFillAllRcdBsStandard}>
                <SelectTrigger className="h-6 w-6 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden touch-manipulation rounded-full active:bg-white/10">
                  <span>
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {rcdBsStandardOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-xs">
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
            <span>Ty</span>
            {onFillAllRcdType && (
              <Select onValueChange={onFillAllRcdType}>
                <SelectTrigger className="h-6 w-6 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden touch-manipulation rounded-full active:bg-white/10">
                  <span>
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {rcdTypeOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-xs">
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
                <SelectTrigger className="h-6 w-6 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden touch-manipulation rounded-full active:bg-white/10">
                  <span>
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {['10', '30', '100', '300', '500'].map((v) => (
                    <SelectItem key={v} value={v} className="text-xs">
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
            <span>A</span>
            {onFillAllRcdRatingA && (
              <Select onValueChange={onFillAllRcdRatingA}>
                <SelectTrigger className="h-6 w-6 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden touch-manipulation rounded-full active:bg-white/10">
                  <span>
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {['40', '63', '80', '100'].map((v) => (
                    <SelectItem key={v} value={v} className="text-xs">
                      {v}
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
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>r₂</TableHead>
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>
          R1+R2
        </TableHead>
        <TableHead className={`${headerCell} w-[92px] min-w-[92px] max-w-[92px]`}>R₂</TableHead>

        {/* Insulation Tests Group */}
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>V</span>
            {onFillAllInsulationVoltage && (
              <Select onValueChange={onFillAllInsulationVoltage}>
                <SelectTrigger className="h-6 w-6 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden touch-manipulation rounded-full active:bg-white/10">
                  <span>
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                  </span>
                </SelectTrigger>
                <SelectContent className="min-w-[140px]">
                  <SelectItem value="250V" className="py-3 text-base touch-manipulation">
                    250V
                  </SelectItem>
                  <SelectItem value="500V" className="py-3 text-base touch-manipulation">
                    500V
                  </SelectItem>
                  <SelectItem value="1000V" className="py-3 text-base touch-manipulation">
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
                <SelectTrigger className="h-6 w-6 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden touch-manipulation rounded-full active:bg-white/10">
                  <span>
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                  </span>
                </SelectTrigger>
                <SelectContent className="min-w-[140px]">
                  <SelectItem value=">200" className="py-3 text-base touch-manipulation">
                    &gt;200 MΩ
                  </SelectItem>
                  <SelectItem value=">999" className="py-3 text-base touch-manipulation">
                    &gt;999 MΩ
                  </SelectItem>
                  <SelectItem value="N/A" className="py-3 text-base touch-manipulation">
                    N/A
                  </SelectItem>
                  <SelectItem value="LIM" className="py-3 text-base touch-manipulation">
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
                <SelectTrigger className="h-6 w-6 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden touch-manipulation rounded-full active:bg-white/10">
                  <span>
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                  </span>
                </SelectTrigger>
                <SelectContent className="min-w-[140px]">
                  <SelectItem value=">200" className="py-3 text-base touch-manipulation">
                    &gt;200 MΩ
                  </SelectItem>
                  <SelectItem value=">999" className="py-3 text-base touch-manipulation">
                    &gt;999 MΩ
                  </SelectItem>
                  <SelectItem value="N/A" className="py-3 text-base touch-manipulation">
                    N/A
                  </SelectItem>
                  <SelectItem value="LIM" className="py-3 text-base touch-manipulation">
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
                <SelectTrigger className="h-6 w-6 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden touch-manipulation rounded-full active:bg-white/10">
                  <span>
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                  </span>
                </SelectTrigger>
                <SelectContent className="min-w-[160px]">
                  <SelectItem value="Correct" className="py-3 text-base touch-manipulation">
                    Correct
                  </SelectItem>
                  <SelectItem value="Incorrect" className="py-3 text-base touch-manipulation">
                    Incorrect
                  </SelectItem>
                  <SelectItem value="N/A" className="py-3 text-base touch-manipulation">
                    N/A
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[110px] min-w-[110px] max-w-[110px]`}>Zs</TableHead>

        {/* RCD Tests Group */}
        <TableHead className={`${headerCell} w-[92px] min-w-[92px] max-w-[92px]`}>ms</TableHead>
        <TableHead className={`${headerCell} w-[76px] min-w-[76px] max-w-[76px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>✓</span>
            {onFillAllRcdTestButton && (
              <button
                onClick={onFillAllRcdTestButton}
                className="h-6 w-6 p-0 flex items-center justify-center rounded-full touch-manipulation active:bg-white/10 text-amber-400"
                title="Fill all with Pass"
              >
                <CheckCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        </TableHead>

        {/* AFDD Group */}
        <TableHead className={`${headerCell} w-[76px] min-w-[76px] max-w-[76px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>AF</span>
            {onFillAllAfdd && (
              <button
                onClick={onFillAllAfdd}
                className="h-6 w-6 p-0 flex items-center justify-center rounded-full touch-manipulation active:bg-white/10 text-amber-400"
                title="Fill all with Pass"
              >
                <CheckCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        </TableHead>

        {/* Functional Group */}
        <TableHead className={`${headerCell} w-[76px] min-w-[76px] max-w-[76px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>Fn</span>
            {onFillAllFunctional && (
              <button
                onClick={onFillAllFunctional}
                className="h-6 w-6 p-0 flex items-center justify-center rounded-full touch-manipulation active:bg-white/10 text-amber-400"
                title="Fill all with Satisfactory"
              >
                <CheckCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[152px] min-w-[152px] max-w-[152px]`}>
          Notes
        </TableHead>

        {/* Actions Column */}
        <TableHead className="border-l border-white/[0.08] font-semibold text-xs p-0.5 text-center whitespace-nowrap bg-white/[0.06] text-white w-[83px] min-w-[83px] max-w-[83px]">
          Del
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
