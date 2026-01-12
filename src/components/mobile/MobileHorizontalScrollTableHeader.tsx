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
  const headerCell = "font-semibold text-[10px] p-0.5 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground";

  return (
    <TableHeader className="sticky top-14 z-40 bg-elec-gray shadow-sm border-b h-12">
      <TableRow className="hover:bg-transparent border-b border-border">
        {/* Circuit Details Group */}
        <TableHead className="sticky left-0 z-20 border-r-[3px] border-primary/40 font-bold text-[10px] p-0.5 text-center whitespace-nowrap bg-elec-gray-light text-foreground w-[44px] min-w-[44px] max-w-[44px]">
          C
        </TableHead>
        <TableHead className={`${headerCell} w-[70px] min-w-[70px] max-w-[70px]`}>
          Desc
        </TableHead>
        <TableHead className={`${headerCell} w-[60px] min-w-[60px] max-w-[60px]`}>
          Type
        </TableHead>
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>
          Mth
        </TableHead>
        <TableHead className={`${headerCell} w-[50px] min-w-[50px] max-w-[50px]`}>
          Pts
        </TableHead>

        {/* Conductor Details Group */}
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>
          Live
        </TableHead>
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>
          CPC
        </TableHead>

        {/* Protection Group */}
        <TableHead className={`${headerCell} w-[60px] min-w-[60px] max-w-[60px]`}>
          BS
        </TableHead>
        <TableHead className={`${headerCell} w-[50px] min-w-[50px] max-w-[50px]`}>
          Ty
        </TableHead>
        <TableHead className={`${headerCell} w-[50px] min-w-[50px] max-w-[50px]`}>
          A
        </TableHead>
        <TableHead className={`${headerCell} w-[50px] min-w-[50px] max-w-[50px]`}>
          kA
        </TableHead>
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>
          Zs
        </TableHead>

        {/* RCD Details Group */}
        <TableHead className={`${headerCell} w-[60px] min-w-[60px] max-w-[60px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>BS</span>
            {onFillAllRcdBsStandard && (
              <Select onValueChange={onFillAllRcdBsStandard}>
                <SelectTrigger className="h-4 w-4 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                </SelectTrigger>
                <SelectContent>
                  {rcdBsStandardOptions.map((o) => <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>Ty</span>
            {onFillAllRcdType && (
              <Select onValueChange={onFillAllRcdType}>
                <SelectTrigger className="h-4 w-4 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                </SelectTrigger>
                <SelectContent>
                  {rcdTypeOptions.map((o) => <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[50px] min-w-[50px] max-w-[50px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>mA</span>
            {onFillAllRcdRating && (
              <Select onValueChange={onFillAllRcdRating}>
                <SelectTrigger className="h-4 w-4 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                </SelectTrigger>
                <SelectContent>
                  {['10', '30', '100', '300', '500'].map((v) => <SelectItem key={v} value={v} className="text-xs">{v}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className={`${headerCell} w-[50px] min-w-[50px] max-w-[50px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>A</span>
            {onFillAllRcdRatingA && (
              <Select onValueChange={onFillAllRcdRatingA}>
                <SelectTrigger className="h-4 w-4 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                </SelectTrigger>
                <SelectContent>
                  {['40', '63', '80', '100'].map((v) => <SelectItem key={v} value={v} className="text-xs">{v}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>

        {/* Continuity Tests Group */}
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>r₁</TableHead>
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>rₙ</TableHead>
        <TableHead className={`${headerCell} w-[70px] min-w-[70px] max-w-[70px]`}>r₂</TableHead>
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>R1+R2</TableHead>
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>R₂</TableHead>

        {/* Insulation Tests Group */}
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>V</TableHead>
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>L-L</TableHead>
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>L-E</TableHead>

        {/* Earth Fault Tests Group */}
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>Pol</TableHead>
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>Zs</TableHead>

        {/* RCD Tests Group */}
        <TableHead className={`${headerCell} w-[55px] min-w-[55px] max-w-[55px]`}>ms</TableHead>
        <TableHead className={`${headerCell} w-[50px] min-w-[50px] max-w-[50px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>Btn</span>
            {onFillAllRcdTestButton && (
              <button
                onClick={onFillAllRcdTestButton}
                className="h-4 w-4 p-0 hover:bg-green-500/20 text-green-600"
                title="Fill all with Pass"
              >
                <CheckCircle className="h-3 w-3" />
              </button>
            )}
          </div>
        </TableHead>

        {/* AFDD Group */}
        <TableHead className={`${headerCell} w-[50px] min-w-[50px] max-w-[50px]`}>
          <div className="flex items-center justify-center gap-0">
            <span>AF</span>
            {onFillAllAfdd && (
              <button
                onClick={onFillAllAfdd}
                className="h-4 w-4 p-0 hover:bg-green-500/20 text-green-600"
                title="Fill all with Pass"
              >
                <CheckCircle className="h-3 w-3" />
              </button>
            )}
          </div>
        </TableHead>

        {/* Functional Group */}
        <TableHead className={`${headerCell} w-[50px] min-w-[50px] max-w-[50px]`}>Fn</TableHead>
        <TableHead className={`${headerCell} w-[80px] min-w-[80px] max-w-[80px]`}>Notes</TableHead>

        {/* Actions Column */}
        <TableHead className="border-l border-border font-semibold text-[10px] p-0.5 text-center whitespace-nowrap bg-elec-gray text-foreground w-[50px] min-w-[50px] max-w-[50px]">
          Del
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
