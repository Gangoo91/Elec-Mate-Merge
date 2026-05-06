/**
 * VerificationFilter — editorial filter pills for verification check list.
 *
 * No icons. Active state uses elec-yellow; counts shown as semantic tones
 * (red / amber / emerald / yellow) on the count badge only.
 */

import { cn } from '@/lib/utils';

interface VerificationFilterProps {
  selectedFilter: 'all' | 'pass' | 'fail' | 'testing';
  onFilterChange: (filter: 'all' | 'pass' | 'fail' | 'testing') => void;
  counts: {
    all: number;
    pass: number;
    fail: number;
    testing: number;
  };
}

export const VerificationFilter = ({
  selectedFilter,
  onFilterChange,
  counts,
}: VerificationFilterProps) => {
  const filters: Array<{
    id: 'all' | 'pass' | 'fail' | 'testing';
    label: string;
    count: number;
    countTone: string;
  }> = [
    { id: 'all', label: 'All', count: counts.all, countTone: 'text-white/85' },
    { id: 'fail', label: 'Failed', count: counts.fail, countTone: 'text-red-300' },
    {
      id: 'testing',
      label: 'Testing required',
      count: counts.testing,
      countTone: 'text-amber-300',
    },
    { id: 'pass', label: 'Passed', count: counts.pass, countTone: 'text-emerald-300' },
  ];

  return (
    <ul className="flex flex-wrap gap-1.5">
      {filters.map((filter) => {
        const active = selectedFilter === filter.id;
        return (
          <li key={filter.id}>
            <button
              type="button"
              onClick={() => onFilterChange(filter.id)}
              className={cn(
                'inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-2 min-h-[40px] border transition-colors touch-manipulation',
                active
                  ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                  : 'text-white/85 border-white/15 hover:border-white/30'
              )}
            >
              {filter.label}
              <span
                className={cn(
                  'tabular-nums font-semibold',
                  active ? 'text-elec-yellow' : filter.countTone
                )}
              >
                {filter.count}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
