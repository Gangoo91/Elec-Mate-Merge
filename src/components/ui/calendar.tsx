import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-3',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-bold text-white',
        nav: 'space-x-1 flex items-center',
        nav_button:
          'h-8 w-8 inline-flex items-center justify-center rounded-lg bg-transparent text-white hover:bg-white/[0.08] active:bg-white/[0.12] touch-manipulation transition-colors',
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse',
        head_row: 'flex',
        head_cell: 'text-white text-[11px] font-bold uppercase tracking-wider rounded-md w-10 py-2',
        row: 'flex w-full mt-1',
        cell: 'h-10 w-10 text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
        day: cn(
          'h-10 w-10 p-0 font-semibold text-white rounded-full inline-flex items-center justify-center',
          'touch-manipulation transition-all',
          'hover:bg-white/[0.06] active:bg-white/[0.1]',
          'aria-selected:opacity-100'
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-elec-yellow text-black font-bold hover:bg-elec-yellow focus:bg-elec-yellow shadow-[0_0_8px_rgba(250,204,21,0.3)]',
        day_today: 'ring-1 ring-elec-yellow text-elec-yellow font-bold',
        day_outside:
          'day-outside text-white opacity-20 aria-selected:bg-white/[0.06] aria-selected:text-white aria-selected:opacity-40',
        day_disabled: 'text-white opacity-20 cursor-not-allowed',
        day_range_middle: 'aria-selected:bg-white/[0.06] aria-selected:text-white',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
