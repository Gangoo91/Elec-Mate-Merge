/**
 * DailyGoalSelector
 *
 * Bottom sheet with 4 daily XP goal options.
 * Casual / Regular / Serious / Intense.
 */

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Target, Check } from 'lucide-react';
import { DAILY_GOAL_OPTIONS } from '@/data/xpConfig';
import { cn } from '@/lib/utils';

interface DailyGoalSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentGoal: number;
  onSelect: (goal: number) => void;
}

export function DailyGoalSelector({
  open,
  onOpenChange,
  currentGoal,
  onSelect,
}: DailyGoalSelectorProps) {
  const handleSelect = (value: number) => {
    onSelect(value);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl p-0">
        <div className="p-5 pb-8 space-y-5">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white text-lg">
              <div className="p-1.5 rounded-lg bg-elec-yellow/10">
                <Target className="h-5 w-5 text-elec-yellow" />
              </div>
              Set Daily XP Goal
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-2.5">
            {DAILY_GOAL_OPTIONS.map((option) => {
              const isActive = currentGoal === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    'w-full flex items-center justify-between p-4 rounded-xl border transition-all touch-manipulation active:scale-[0.98]',
                    isActive
                      ? 'bg-elec-yellow/10 border-elec-yellow/40'
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'
                  )}
                >
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'font-semibold text-base',
                        isActive ? 'text-elec-yellow' : 'text-white'
                      )}>
                        {option.label}
                      </span>
                      <span className={cn(
                        'text-sm font-medium',
                        isActive ? 'text-elec-yellow/80' : 'text-white/50'
                      )}>
                        {option.value} XP/day
                      </span>
                    </div>
                    <p className="text-sm text-white/50 mt-0.5">{option.description}</p>
                  </div>

                  {isActive && (
                    <div className="p-1 rounded-full bg-elec-yellow">
                      <Check className="h-4 w-4 text-black" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default DailyGoalSelector;
