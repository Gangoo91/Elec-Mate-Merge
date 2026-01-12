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
  return (
    <TableHeader className="sticky top-14 z-40 bg-elec-gray shadow-sm border-b h-14">
      <TableRow className="hover:bg-transparent border-b border-border">
        {/* Circuit Details Group */}
        <TableHead className="sticky left-0 z-20 border-r-[3px] border-primary/40 font-bold text-xs p-1 text-center whitespace-nowrap bg-elec-gray-light text-foreground">
          Circuit
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          Desc
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          Type
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          Method
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          Points
        </TableHead>

        {/* Conductor Details Group */}
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          Live
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          CPC
        </TableHead>

        {/* Protection Group */}
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          BS
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          Type
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          Rating
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          kA
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          Max Zs
        </TableHead>

        {/* RCD Details Group */}
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          <div className="flex items-center justify-center gap-0.5">
            <span>BS</span>
            {onFillAllRcdBsStandard && (
              <Select onValueChange={onFillAllRcdBsStandard}>
                <SelectTrigger className="h-5 w-5 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </SelectTrigger>
                <SelectContent>
                  {rcdBsStandardOptions.map((o) => <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          <div className="flex items-center justify-center gap-0.5">
            <span>Type</span>
            {onFillAllRcdType && (
              <Select onValueChange={onFillAllRcdType}>
                <SelectTrigger className="h-5 w-5 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </SelectTrigger>
                <SelectContent>
                  {rcdTypeOptions.map((o) => <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          <div className="flex items-center justify-center gap-0.5">
            <span>mA</span>
            {onFillAllRcdRating && (
              <Select onValueChange={onFillAllRcdRating}>
                <SelectTrigger className="h-5 w-5 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </SelectTrigger>
                <SelectContent>
                  {['10', '30', '100', '300', '500'].map((v) => <SelectItem key={v} value={v} className="text-xs">{v}mA</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          <div className="flex items-center justify-center gap-0.5">
            <span>A</span>
            {onFillAllRcdRatingA && (
              <Select onValueChange={onFillAllRcdRatingA}>
                <SelectTrigger className="h-5 w-5 p-0 border-0 bg-transparent shadow-none [&>svg]:hidden">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </SelectTrigger>
                <SelectContent>
                  {['40', '63', '80', '100'].map((v) => <SelectItem key={v} value={v} className="text-xs">{v}A</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          </div>
        </TableHead>

        {/* Continuity Tests Group */}
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          r₁
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          rₙ
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          r₂
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          R1+R2
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          R₂
        </TableHead>

        {/* Insulation Tests Group */}
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          Test V
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          L-L
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          L-E
        </TableHead>

        {/* Earth Fault Tests Group */}
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          Polarity
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          Zs
        </TableHead>

        {/* RCD Tests Group */}
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          RCD ms
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          <div className="flex items-center justify-center gap-0.5">
            <span>Btn</span>
            {onFillAllRcdTestButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onFillAllRcdTestButton}
                className="h-6 w-6 p-0 hover:bg-green-500/20 text-green-600 hover:text-green-700 transition-all hover:scale-110"
                title="Fill all circuits with Pass"
              >
                <CheckCircle className="h-4 w-4 transition-all" />
              </Button>
            )}
          </div>
        </TableHead>

        {/* AFDD Group */}
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          <div className="flex items-center justify-center gap-0.5">
            <span>AFDD</span>
            {onFillAllAfdd && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onFillAllAfdd}
                className="h-6 w-6 p-0 hover:bg-green-500/20 text-green-600 hover:text-green-700 transition-all hover:scale-110"
                title="Fill all circuits with Pass"
              >
                <CheckCircle className="h-4 w-4 transition-all" />
              </Button>
            )}
          </div>
        </TableHead>

        {/* Functional Group */}
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          Function
        </TableHead>
        <TableHead className="font-semibold text-xs p-1 text-center whitespace-nowrap border-r border-border bg-elec-gray text-foreground">
          Remarks
        </TableHead>

        {/* Actions Column */}
        <TableHead className="border-l border-border font-semibold text-xs p-1 text-center whitespace-nowrap bg-elec-gray text-foreground min-w-[50px]">
          Delete
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
