import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { rcdBsStandardOptions } from '@/types/protectiveDeviceTypes';
import { rcdTypeOptions } from '@/types/wiringTypes';
import { columnGroups } from '@/utils/mobileTableUtils';
import { cn } from '@/lib/utils';

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
  const headerCell = "font-semibold text-xs p-0.5 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground";

  return (
    <TableHeader className="sticky top-14 z-40 bg-elec-gray shadow-sm border-b h-12">
      <TableRow className="hover:bg-transparent border-b border-border">
        {/* Circuit Details Group */}
        <TableHead className="sticky left-0 z-20 border-r-[3px] border-primary/40 font-bold text-xs p-0.5 text-center whitespace-nowrap bg-elec-gray-light text-foreground w-[66px] min-w-[66px] max-w-[66px]">
          C
        </TableHead>
        <TableHead className={cn(headerCell, "w-[120px] min-w-[120px] max-w-[120px]")}>
          Desc
        </TableHead>
        <TableHead className={cn(headerCell, "w-[88px] min-w-[88px] max-w-[88px]")}>
          Type
        </TableHead>
        <TableHead className={cn(headerCell, "w-[60px] min-w-[60px] max-w-[60px]")}>
          M
        </TableHead>
        <TableHead className={cn(headerCell, "w-[66px] min-w-[66px] max-w-[66px]")}>
          Pts
        </TableHead>

        {/* Conductor Details Group */}
        <TableHead className={cn(headerCell, "w-[88px] min-w-[88px] max-w-[88px]")}>
          Live
        </TableHead>
        <TableHead className={cn(headerCell, "w-[88px] min-w-[88px] max-w-[88px]")}>
          CPC
        </TableHead>

        {/* Protection Group */}
        <TableHead className={cn(headerCell, "w-[88px] min-w-[88px] max-w-[88px]")}>
          BS
        </TableHead>
        <TableHead className={cn(headerCell, "w-[60px] min-w-[60px] max-w-[60px]")}>
          Ty
        </TableHead>
        <TableHead className={cn(headerCell, "w-[72px] min-w-[72px] max-w-[72px]")}>
          A
        </TableHead>
        <TableHead className={cn(headerCell, "w-[66px] min-w-[66px] max-w-[66px]")}>
          kA
        </TableHead>
        <TableHead className={cn(headerCell, "w-[88px] min-w-[88px] max-w-[88px]")}>
          Zs
        </TableHead>

        {/* RCD Details Group */}
        <TableHead className={cn(headerCell, "w-[88px] min-w-[88px] max-w-[88px]")}>
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
        <TableHead className={cn(headerCell, "w-[88px] min-w-[88px] max-w-[88px]")}>
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
        <TableHead className={cn(headerCell, "w-[72px] min-w-[72px] max-w-[72px]")}>
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
        <TableHead className={cn(headerCell, "w-[72px] min-w-[72px] max-w-[72px]")}>
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
        <TableHead className={cn(headerCell, "w-[72px] min-w-[72px] max-w-[72px]")}>
          r₁
        </TableHead>
        <TableHead className={cn(headerCell, "w-[72px] min-w-[72px] max-w-[72px]")}>
          rₙ
        </TableHead>
        <TableHead className={cn(headerCell, "w-[88px] min-w-[88px] max-w-[88px]")}>
          r₂
        </TableHead>
        <TableHead className={cn(headerCell, "w-[88px] min-w-[88px] max-w-[88px]")}>
          R1+R2
        </TableHead>
        <TableHead className={cn(headerCell, "w-[72px] min-w-[72px] max-w-[72px]")}>
          R₂
        </TableHead>

        {/* Insulation Tests Group */}
        <TableHead className={cn(headerCell, "w-[88px] min-w-[88px] max-w-[88px]")}>
          V
        </TableHead>
        <TableHead className={cn(headerCell, "w-[88px] min-w-[88px] max-w-[88px]")}>
          L-L
        </TableHead>
        <TableHead className={cn(headerCell, "w-[88px] min-w-[88px] max-w-[88px]")}>
          L-E
        </TableHead>

        {/* Earth Fault Tests Group */}
        <TableHead className={cn(headerCell, "w-[60px] min-w-[60px] max-w-[60px]")}>
          Pol
        </TableHead>
        <TableHead className={cn(headerCell, "w-[88px] min-w-[88px] max-w-[88px]")}>
          Zs
        </TableHead>

        {/* RCD Tests Group */}
        <TableHead className={cn(headerCell, "w-[72px] min-w-[72px] max-w-[72px]")}>
          ms
        </TableHead>
        <TableHead className={cn(headerCell, "w-[60px] min-w-[60px] max-w-[60px]")}>
          <div className="flex items-center justify-center gap-0">
            <span>✓</span>
            {onFillAllRcdTestButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onFillAllRcdTestButton}
                className="h-4 w-4 p-0 hover:bg-green-500/20 text-green-600"
                title="Fill all with Pass"
              >
                <CheckCircle className="h-3 w-3" />
              </Button>
            )}
          </div>
        </TableHead>

        {/* AFDD Group */}
        <TableHead className={cn(headerCell, "w-[60px] min-w-[60px] max-w-[60px]")}>
          <div className="flex items-center justify-center gap-0">
            <span>AF</span>
            {onFillAllAfdd && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onFillAllAfdd}
                className="h-4 w-4 p-0 hover:bg-green-500/20 text-green-600"
                title="Fill all with Pass"
              >
                <CheckCircle className="h-3 w-3" />
              </Button>
            )}
          </div>
        </TableHead>

        {/* Functional Group */}
        <TableHead className={cn(headerCell, "w-[60px] min-w-[60px] max-w-[60px]")}>
          Fn
        </TableHead>
        <TableHead className={cn(headerCell, "w-[120px] min-w-[120px] max-w-[120px]")}>
          Notes
        </TableHead>

        {/* Actions Column */}
        <TableHead className="border-l border-border font-semibold text-xs p-0.5 text-center whitespace-nowrap bg-elec-gray text-foreground w-[66px] min-w-[66px] max-w-[66px]">
          Del
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
