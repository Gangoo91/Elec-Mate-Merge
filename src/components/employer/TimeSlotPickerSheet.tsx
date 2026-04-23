import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Sunrise, Sun, Moon, Clock, Verified, CalendarCheck } from 'lucide-react';
import type { EnhancedElectrician } from './SparkProfileSheet';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { PrimaryButton, SecondaryButton, checkboxClass } from './editorial';

export type TimeSlot = 'morning' | 'afternoon' | 'evening';

interface TimeSlotPickerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  electrician: EnhancedElectrician | null;
  date: Date | null;
  availableSlots: TimeSlot[];
  onConfirm: (electrician: EnhancedElectrician, date: Date, slots: TimeSlot[]) => void;
}

const SLOT_CONFIG: Record<
  TimeSlot,
  {
    label: string;
    time: string;
    hours: number;
    icon: typeof Sunrise;
    color: string;
  }
> = {
  morning: {
    label: 'Morning',
    time: '07:00 - 12:00',
    hours: 5,
    icon: Sunrise,
    color: 'text-amber-500',
  },
  afternoon: {
    label: 'Afternoon',
    time: '12:00 - 17:00',
    hours: 5,
    icon: Sun,
    color: 'text-yellow-500',
  },
  evening: {
    label: 'Evening',
    time: '17:00 - 21:00',
    hours: 4,
    icon: Moon,
    color: 'text-indigo-400',
  },
};

export const TimeSlotPickerSheet = ({
  open,
  onOpenChange,
  electrician,
  date,
  availableSlots,
  onConfirm,
}: TimeSlotPickerSheetProps) => {
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);

  const toggleSlot = (slot: TimeSlot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const selectAll = () => {
    setSelectedSlots([...availableSlots]);
  };

  const clearSelection = () => {
    setSelectedSlots([]);
  };

  const estimatedCost = useMemo(() => {
    if (!electrician) return 0;
    const totalHours = selectedSlots.reduce((acc, slot) => acc + SLOT_CONFIG[slot].hours, 0);
    const hourlyRate = electrician.dayRate / 8; // Assume 8-hour day rate
    return Math.round(totalHours * hourlyRate);
  }, [selectedSlots, electrician]);

  const handleConfirm = () => {
    if (!electrician || !date || selectedSlots.length === 0) return;
    onConfirm(electrician, date, selectedSlots);
    toast.success(`Booking request sent to ${electrician.name}`);
    setSelectedSlots([]);
    onOpenChange(false);
  };

  // Reset selection when sheet opens with new data
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedSlots([]);
    }
    onOpenChange(open);
  };

  if (!electrician || !date) return null;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[85vh] rounded-t-2xl flex flex-col bg-[hsl(0_0%_8%)] border-t border-white/[0.06]"
      >
        <SheetHeader className="shrink-0 pb-4 border-b border-white/[0.06]">
          <SheetTitle className="flex items-center gap-2 text-white">
            <CalendarCheck className="h-5 w-5 text-elec-yellow" />
            Select Time Slots
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          {/* Electrician Info */}
          <div className="flex items-center gap-3 p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl">
            <Avatar className="h-12 w-12 border-2 border-elec-yellow">
              <AvatarImage src={electrician.avatar} alt={electrician.name} />
              <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow">
                {electrician.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{electrician.name}</span>
                {electrician.verified && <Verified className="h-4 w-4 text-elec-yellow" />}
              </div>
              <div className="text-sm text-white">{electrician.qualifications[0]}</div>
            </div>
            <Badge variant="outline" className="border-white/20 text-white">
              £{electrician.dayRate}/day
            </Badge>
          </div>

          {/* Date Display */}
          <div className="text-center p-3 bg-elec-yellow/5 rounded-xl border border-elec-yellow/20">
            <div className="text-sm text-white">Booking for</div>
            <div className="text-lg font-semibold text-white">
              {format(date, 'EEEE, d MMMM yyyy')}
            </div>
          </div>

          <Separator className="bg-white/[0.06]" />

          {/* Quick Actions */}
          <div className="flex gap-2">
            <SecondaryButton
              size="sm"
              className="flex-1"
              onClick={selectAll}
              disabled={selectedSlots.length === availableSlots.length}
            >
              Select All
            </SecondaryButton>
            <SecondaryButton
              size="sm"
              className="flex-1"
              onClick={clearSelection}
              disabled={selectedSlots.length === 0}
            >
              Clear
            </SecondaryButton>
          </div>

          {/* Time Slots */}
          <div className="space-y-3">
            <div className="text-[11px] font-semibold text-white uppercase tracking-[0.18em]">
              Available Slots
            </div>
            {(['morning', 'afternoon', 'evening'] as TimeSlot[]).map((slot) => {
              const config = SLOT_CONFIG[slot];
              const Icon = config.icon;
              const isAvailable = availableSlots.includes(slot);
              const isSelected = selectedSlots.includes(slot);

              return (
                <button
                  key={slot}
                  onClick={() => isAvailable && toggleSlot(slot)}
                  disabled={!isAvailable}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left touch-manipulation',
                    isAvailable
                      ? isSelected
                        ? 'border-elec-yellow bg-elec-yellow/5'
                        : 'border-white/[0.06] bg-[hsl(0_0%_12%)] hover:border-elec-yellow/50'
                      : 'border-white/[0.06] bg-white/[0.02] opacity-50 cursor-not-allowed'
                  )}
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center',
                      isAvailable ? 'bg-white/[0.06]' : 'bg-white/[0.04]'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-6 w-6',
                        isAvailable ? config.color : 'text-white'
                      )}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="font-medium text-white">{config.label}</div>
                    <div className="flex items-center gap-1 text-sm text-white">
                      <Clock className="h-3.5 w-3.5" />
                      {config.time}
                    </div>
                  </div>

                  {isAvailable && (
                    <Checkbox checked={isSelected} className={checkboxClass} />
                  )}

                  {!isAvailable && (
                    <Badge variant="secondary" className="text-xs bg-white/[0.06] text-white">
                      Unavailable
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 pt-4 border-t border-white/[0.06] bg-[hsl(0_0%_8%)] space-y-3 pb-safe">
          {/* Cost Estimate */}
          {selectedSlots.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl">
              <div>
                <div className="text-sm text-white">Estimated Cost</div>
                <div className="text-xs text-white">
                  {selectedSlots.reduce((acc, s) => acc + SLOT_CONFIG[s].hours, 0)} hours
                </div>
              </div>
              <div className="text-2xl font-bold text-white">£{estimatedCost}</div>
            </div>
          )}

          <PrimaryButton
            size="lg"
            fullWidth
            onClick={handleConfirm}
            disabled={selectedSlots.length === 0}
          >
            {selectedSlots.length === 0
              ? 'Select at least one slot'
              : `Request Booking (${selectedSlots.length} slot${selectedSlots.length > 1 ? 's' : ''})`}
          </PrimaryButton>
        </div>
      </SheetContent>
    </Sheet>
  );
};
