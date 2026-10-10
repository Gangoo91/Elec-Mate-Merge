import { cn } from '@/lib/utils';
import { LEARN_LIST, learnTag } from '@/components/apprentice/learn-ui/learnUi';
import { TEST_OPTIONS } from './data/testOptions';

interface TestPickerCardsProps {
  active: string;
  onSelect: (value: string) => void;
}

/**
 * The four tests as one list of rows (edge to edge on a phone, two columns
 * from sm:). They were four separate gold-edged cards, so the choice read as
 * four billboards; the chosen test now carries a volt bar and a volt title.
 */
const TestPickerCards = ({ active, onSelect }: TestPickerCardsProps) => (
  <ul
    className={cn(
      LEARN_LIST,
      'sm:grid sm:grid-cols-2 sm:divide-y-0 sm:[&>li]:border-b sm:[&>li]:border-white/[0.06] sm:[&>li:nth-child(odd)]:border-r'
    )}
  >
    {TEST_OPTIONS.map((t) => {
      const Icon = t.icon;
      const isActive = active === t.value;
      const isLive = t.state === 'live';

      return (
        <li key={t.value} className="h-full">
          <button
            type="button"
            onClick={() => onSelect(t.value)}
            aria-pressed={isActive}
            className={cn(
              'flex h-full w-full flex-col gap-1.5 px-5 py-4 text-left transition-colors touch-manipulation sm:px-6',
              'hover:bg-white/[0.04] active:bg-white/[0.07]',
              isActive && 'bg-white/[0.04] shadow-[inset_3px_0_0_0_hsl(var(--elec-yellow))]'
            )}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <Icon
                  aria-hidden
                  strokeWidth={1.5}
                  className={cn('h-4 w-4 shrink-0', isActive ? 'text-elec-yellow' : 'text-white')}
                />
                <span className="font-mono text-[12px] tabular-nums text-white">{t.reg}</span>
              </span>
              {/* The safety fact, not a decoration. */}
              <span className={learnTag(isLive ? 'danger' : 'neutral')}>
                {isLive ? 'Live test' : 'Dead test'}
              </span>
            </span>

            <span
              className={cn(
                'text-[15px] font-semibold leading-tight tracking-tight',
                isActive ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {t.label}
            </span>

            <span className="text-[13.5px] font-medium leading-snug text-white">{t.plain}</span>
            <span className="text-[13px] leading-snug text-white">{t.proves}</span>
          </button>
        </li>
      );
    })}
  </ul>
);

export default TestPickerCards;
