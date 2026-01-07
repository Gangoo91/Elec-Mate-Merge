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
}

export const MobileHorizontalScrollTableHeader: React.FC<MobileHorizontalScrollTableHeaderProps> = ({
  onFillAllRcdTestButton,
  onFillAllAfdd,
  onFillAllRcdBsStandard,
  onFillAllRcdType,
  onFillAllRcdRating,
  onFillAllRcdRatingA
}) => {
  return (
    <TableHeader className="sot-mobile-header">
      <TableRow className="hover:bg-transparent">
        {/* Circuit Details Group */}
        <TableHead className="sot-mobile-header-cell sot-mobile-sticky min-w-[70px]">
          <span className="text-elec-yellow font-bold">C#</span>
        </TableHead>
        <TableHead className="sot-mobile-header-cell min-w-[100px]">
          Desc
        </TableHead>
        <TableHead className="sot-mobile-header-cell">
          Wiring
        </TableHead>
        <TableHead className="sot-mobile-header-cell">
          Method
        </TableHead>
        <TableHead className="sot-mobile-header-cell">
          Pts
        </TableHead>

        {/* Conductor Details Group */}
        <TableHead className="sot-mobile-header-cell">
          Live
        </TableHead>
        <TableHead className="sot-mobile-header-cell">
          CPC
        </TableHead>

        {/* Protection Group */}
        <TableHead className="sot-mobile-header-cell min-w-[80px]">
          BS
        </TableHead>
        <TableHead className="sot-mobile-header-cell">
          Type
        </TableHead>
        <TableHead className="sot-mobile-header-cell">
          A
        </TableHead>
        <TableHead className="sot-mobile-header-cell">
          kA
        </TableHead>
        <TableHead className="sot-mobile-header-cell">
          Max
        </TableHead>

        {/* RCD Details Group */}
        <TableHead className="sot-mobile-header-cell">
          <div className="flex items-center justify-center gap-0.5">
            <span>BS</span>
            {onFillAllRcdBsStandard && (
              <Select onValueChange={onFillAllRcdBsStandard}>
                <SelectTrigger className="h-5 w-5 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                </SelectTrigger>
                <SelectContent>
                  {rcdBsStandardOptions.map((o) => <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className="sot-mobile-header-cell">
          <div className="flex items-center justify-center gap-0.5">
            <span>Type</span>
            {onFillAllRcdType && (
              <Select onValueChange={onFillAllRcdType}>
                <SelectTrigger className="h-5 w-5 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                </SelectTrigger>
                <SelectContent>
                  {rcdTypeOptions.map((o) => <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className="sot-mobile-header-cell">
          <div className="flex items-center justify-center gap-0.5">
            <span>mA</span>
            {onFillAllRcdRating && (
              <Select onValueChange={onFillAllRcdRating}>
                <SelectTrigger className="h-5 w-5 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                </SelectTrigger>
                <SelectContent>
                  {['10', '30', '100', '300', '500'].map((v) => <SelectItem key={v} value={v} className="text-xs">{v}mA</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className="sot-mobile-header-cell">
          <div className="flex items-center justify-center gap-0.5">
            <span>A</span>
            {onFillAllRcdRatingA && (
              <Select onValueChange={onFillAllRcdRatingA}>
                <SelectTrigger className="h-5 w-5 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                </SelectTrigger>
                <SelectContent>
                  {['40', '63', '80', '100'].map((v) => <SelectItem key={v} value={v} className="text-xs">{v}A</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>

        {/* Continuity Tests Group */}
        <TableHead className="sot-mobile-header-cell">r₁</TableHead>
        <TableHead className="sot-mobile-header-cell">rₙ</TableHead>
        <TableHead className="sot-mobile-header-cell">r₂</TableHead>
        <TableHead className="sot-mobile-header-cell">R1+R2</TableHead>
        <TableHead className="sot-mobile-header-cell">R₂</TableHead>

        {/* Insulation Tests Group */}
        <TableHead className="sot-mobile-header-cell">V</TableHead>
        <TableHead className="sot-mobile-header-cell">L-L</TableHead>
        <TableHead className="sot-mobile-header-cell">L-E</TableHead>

        {/* Earth Fault Tests Group */}
        <TableHead className="sot-mobile-header-cell">Pol</TableHead>
        <TableHead className="sot-mobile-header-cell">Zs</TableHead>

        {/* RCD Tests Group */}
        <TableHead className="sot-mobile-header-cell">ms</TableHead>
        <TableHead className="sot-mobile-header-cell">
          <div className="flex items-center justify-center gap-0.5">
            <span>Btn</span>
            {onFillAllRcdTestButton && (
              <button
                onClick={onFillAllRcdTestButton}
                className="sot-fill-all-btn text-green-500"
                title="Fill all circuits with Pass"
              >
                <CheckCircle className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </TableHead>

        {/* AFDD Group */}
        <TableHead className="sot-mobile-header-cell">
          <div className="flex items-center justify-center gap-0.5">
            <span>AFDD</span>
            {onFillAllAfdd && (
              <button
                onClick={onFillAllAfdd}
                className="sot-fill-all-btn text-green-500"
                title="Fill all circuits with Pass"
              >
                <CheckCircle className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </TableHead>

        {/* Functional Group */}
        <TableHead className="sot-mobile-header-cell">Func</TableHead>
        <TableHead className="sot-mobile-header-cell">Notes</TableHead>

        {/* Actions Column */}
        <TableHead className="sot-mobile-header-cell min-w-[60px]">
          Del
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
