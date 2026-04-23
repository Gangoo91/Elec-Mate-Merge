import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRight, Star, CheckCircle, Zap } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import type { EnhancedElectrician } from './SparkProfileSheet';
import { IconButton } from './editorial';

interface AvailabilityCalendarProps {
  electricians: EnhancedElectrician[];
  labourBankIds: string[];
  onSelectElectrician: (electrician: EnhancedElectrician, date: Date) => void;
}

export function AvailabilityCalendar({
  electricians,
  labourBankIds,
  onSelectElectrician,
}: AvailabilityCalendarProps) {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const today = new Date();

  const handlePrevWeek = () => setWeekStart(addDays(weekStart, -7));
  const handleNextWeek = () => setWeekStart(addDays(weekStart, 7));

  // Get availability for an electrician on a specific day
  const getAvailability = (electrician: EnhancedElectrician, date: Date) => {
    const slot = electrician.availabilitySlots.find(
      (s) => new Date(s.date).toDateString() === date.toDateString()
    );
    return slot?.slots || [];
  };

  return (
    <div className="space-y-4">
      {/* Week Navigation */}
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <IconButton onClick={handlePrevWeek} aria-label="Previous week">
            <ChevronLeft className="h-5 w-5" />
          </IconButton>
          <h3 className="font-semibold text-white">
            {format(weekStart, 'd MMM')} - {format(addDays(weekStart, 6), 'd MMM yyyy')}
          </h3>
          <IconButton onClick={handleNextWeek} aria-label="Next week">
            <ChevronRight className="h-5 w-5" />
          </IconButton>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={`text-center p-2 rounded-lg ${
                isSameDay(day, today) ? 'bg-elec-yellow/10' : ''
              }`}
            >
              <p className="text-xs text-white">{format(day, 'EEE')}</p>
              <p
                className={`text-sm font-medium text-white ${isSameDay(day, today) ? 'text-elec-yellow' : ''}`}
              >
                {format(day, 'd')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Electricians with Availability */}
      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {electricians.map((electrician) => {
            const isInLabourBank = labourBankIds.includes(electrician.id);
            const initials = electrician.name
              .split(' ')
              .map((n) => n[0])
              .join('');

            return (
              <div key={electrician.id} className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-3">
                {/* Electrician Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={electrician.avatar} alt={electrician.name} />
                      <AvatarFallback className="bg-elec-yellow text-black text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    {isInLabourBank && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Zap className="w-2.5 h-2.5 text-black" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-white truncate">{electrician.name}</span>
                      {electrician.verified && (
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white">
                      <span>{electrician.ecsCardType}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                        {electrician.rating}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-white">£{electrician.dayRate}</p>
                    <p className="text-xs text-white">/day</p>
                  </div>
                </div>

                {/* Availability Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day) => {
                    const slots = getAvailability(electrician, day);
                    const isPast = day < today && !isSameDay(day, today);
                    const hasAvailability = slots.length > 0;

                    return (
                      <button
                        key={day.toISOString()}
                        disabled={isPast || !hasAvailability}
                        onClick={() => hasAvailability && onSelectElectrician(electrician, day)}
                        className={`h-10 rounded-lg transition-all touch-manipulation ${
                          isPast
                            ? 'bg-white/[0.04] opacity-50'
                            : hasAvailability
                              ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30'
                              : 'bg-red-500/10 border border-red-500/20'
                        }`}
                      >
                        {hasAvailability && !isPast && (
                          <div className="flex flex-col items-center gap-0.5">
                            {slots.includes('morning') && (
                              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                            )}
                            {slots.includes('afternoon') && (
                              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                            )}
                            {slots.includes('evening') && (
                              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Legend */}
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-3">
        <div className="flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-emerald-500/20 border border-emerald-500/30 rounded" />
            <span className="text-white">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-red-500/10 border border-red-500/20 rounded" />
            <span className="text-white">Unavailable</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span className="text-white">Day shift</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-amber-400 rounded-full" />
            <span className="text-white">Evening</span>
          </div>
        </div>
      </div>
    </div>
  );
}
