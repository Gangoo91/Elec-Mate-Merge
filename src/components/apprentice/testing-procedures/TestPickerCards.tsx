import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';
import { TEST_OPTIONS } from './data/testOptions';

interface TestPickerCardsProps {
  active: string;
  onSelect: (value: string) => void;
}

const TestPickerCards = ({ active, onSelect }: TestPickerCardsProps) => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
    {TEST_OPTIONS.map((t) => {
      const Icon = t.icon;
      const isActive = active === t.value;
      const isLive = t.state === 'live';

      return (
        <button
          key={t.value}
          type="button"
          onClick={() => onSelect(t.value)}
          aria-pressed={isActive}
          className={cn(
            CARD_BASE,
            CARD_NEUTRAL,
            'flex flex-col gap-2 p-4 text-left sm:p-5 touch-manipulation',
            'lg:hover:-translate-y-0.5',
            isActive && 'border-elec-yellow'
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Icon
                aria-hidden
                className={cn('h-4 w-4 shrink-0', isActive ? 'text-elec-yellow' : 'text-white')}
              />
              <span className="font-mono text-[11px] tabular-nums text-white">{t.reg}</span>
            </div>
            {/* The safety fact, not a decoration. */}
            <span
              className={cn(
                'shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]',
                isLive
                  ? 'border-red-500/50 bg-red-500/[0.12] text-red-300'
                  : 'border-white/15 bg-white/[0.05] text-white'
              )}
            >
              {isLive ? 'Live test' : 'Dead test'}
            </span>
          </div>

          <h3
            className={cn(
              'text-[15px] font-semibold leading-tight tracking-tight',
              isActive ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {t.label}
          </h3>

          <p className="text-[13.5px] font-medium leading-snug text-white">{t.plain}</p>
          <p className="text-[12.5px] leading-snug text-white opacity-80">{t.proves}</p>
        </button>
      );
    })}
  </div>
);

export default TestPickerCards;
