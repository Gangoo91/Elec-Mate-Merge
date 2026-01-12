import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Zap, MapPin, Factory, Box, Grid3X3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DistributionBoard,
  MAIN_BOARD_ID,
  BOARD_MANUFACTURERS,
  BOARD_TYPES,
  BOARD_LOCATIONS,
  BOARD_SIZES,
  BoardType
} from '@/types/distributionBoard';

interface BoardSetupCardProps {
  board: DistributionBoard;
  onUpdate: (field: keyof DistributionBoard, value: any) => void;
  onRemove?: () => void;
  isRemovable?: boolean;
  className?: string;
}

/**
 * BoardSetupCard - Mobile-friendly card for configuring a distribution board
 * Used in wizard Installation step to collect board details
 */
const BoardSetupCard: React.FC<BoardSetupCardProps> = ({
  board,
  onUpdate,
  onRemove,
  isRemovable = true,
  className
}) => {
  const isMainBoard = board.id === MAIN_BOARD_ID || board.order === 0;

  return (
    <Card className={cn(
      "bg-card/50 border-white/10 overflow-hidden",
      isMainBoard && "border-elec-yellow/30",
      className
    )}>
      {/* Board Header */}
      <div className={cn(
        "px-4 py-3 flex items-center justify-between",
        isMainBoard ? "bg-elec-yellow/10" : "bg-white/5"
      )}>
        <div className="flex items-center gap-2">
          <Zap className={cn(
            "h-4 w-4",
            isMainBoard ? "text-elec-yellow" : "text-blue-400"
          )} />
          <span className="font-semibold text-white">
            {board.name}
          </span>
          {isMainBoard && (
            <span className="text-xs px-2 py-0.5 bg-elec-yellow/20 text-elec-yellow rounded-full">
              Primary
            </span>
          )}
        </div>

        {isRemovable && !isMainBoard && onRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Reference / Custom Name */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-white/60 flex items-center gap-1.5">
            <span>Board Reference</span>
          </Label>
          <Input
            value={board.reference}
            onChange={(e) => onUpdate('reference', e.target.value)}
            placeholder="e.g. Main Consumer Unit, Garage DB"
            className="h-11 touch-manipulation bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-elec-yellow/50"
          />
        </div>

        {/* Location & Manufacturer Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Location */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-white/60 flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              Location
            </Label>
            <Select
              value={board.location || ''}
              onValueChange={(value) => onUpdate('location', value)}
            >
              <SelectTrigger className="h-11 touch-manipulation bg-white/5 border-white/10 text-white focus:border-elec-yellow/50">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                {BOARD_LOCATIONS.map((loc) => (
                  <SelectItem key={loc} value={loc} className="text-white">
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Manufacturer */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-white/60 flex items-center gap-1.5">
              <Factory className="h-3 w-3" />
              Manufacturer
            </Label>
            <Select
              value={board.make || ''}
              onValueChange={(value) => onUpdate('make', value)}
            >
              <SelectTrigger className="h-11 touch-manipulation bg-white/5 border-white/10 text-white focus:border-elec-yellow/50">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                {BOARD_MANUFACTURERS.map((make) => (
                  <SelectItem key={make} value={make} className="text-white">
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Board Type & Size Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Board Type */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-white/60 flex items-center gap-1.5">
              <Box className="h-3 w-3" />
              Board Type
            </Label>
            <Select
              value={board.type || ''}
              onValueChange={(value) => onUpdate('type', value as BoardType)}
            >
              <SelectTrigger className="h-11 touch-manipulation bg-white/5 border-white/10 text-white focus:border-elec-yellow/50">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                {BOARD_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="text-white">
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Board Size (Ways) */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-white/60 flex items-center gap-1.5">
              <Grid3X3 className="h-3 w-3" />
              Size (Ways)
            </Label>
            <Select
              value={board.totalWays?.toString() || ''}
              onValueChange={(value) => onUpdate('totalWays', parseInt(value, 10))}
            >
              <SelectTrigger className="h-11 touch-manipulation bg-white/5 border-white/10 text-white focus:border-elec-yellow/50">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                {BOARD_SIZES.map((size) => (
                  <SelectItem key={size} value={size.toString()} className="text-white">
                    {size} way
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Model Number (Optional) */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-white/60">
            Model Number <span className="text-white/40">(optional)</span>
          </Label>
          <Input
            value={board.model || ''}
            onChange={(e) => onUpdate('model', e.target.value)}
            placeholder="e.g. VML110"
            className="h-11 touch-manipulation bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-elec-yellow/50"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BoardSetupCard;
