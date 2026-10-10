import { X } from 'lucide-react';
import type { ExperienceLevel } from '@/hooks/useTalentPool';

interface TalentFilterChipsProps {
  tierFilter: 'all' | 'verified' | 'premium';
  selectedSpecialisms: string[];
  experienceFilter?: ExperienceLevel;
  selectedEcsCards?: string[];
  rateRange?: [number, number];
  onRemoveTier: () => void;
  onRemoveSpecialism: (spec: string) => void;
  onRemoveExperience?: () => void;
  onRemoveEcsCard?: (card: string) => void;
  onResetRateRange?: () => void;
  onOpenFilters: () => void;
  totalResults: number;
}

const chipCls =
  'inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.04] px-3.5 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.08]';

/** The filters in use, as plain chips that wrap. Tap one to remove it. */
export function TalentFilterChips({
  tierFilter,
  selectedSpecialisms,
  experienceFilter = 'all',
  selectedEcsCards = [],
  rateRange = [150, 500],
  onRemoveTier,
  onRemoveSpecialism,
  onRemoveExperience,
  onRemoveEcsCard,
  onResetRateRange,
  onOpenFilters,
  totalResults,
}: TalentFilterChipsProps) {
  const hasRateFilter = rateRange[0] > 150 || rateRange[1] < 500;
  const chips: { key: string; label: string; onRemove: () => void }[] = [];
  if (tierFilter !== 'all')
    chips.push({
      key: 'tier',
      label: tierFilter === 'premium' ? 'Premium' : 'Verified+',
      onRemove: onRemoveTier,
    });
  selectedSpecialisms.forEach((spec) =>
    chips.push({ key: `spec-${spec}`, label: spec, onRemove: () => onRemoveSpecialism(spec) })
  );
  if (experienceFilter !== 'all' && onRemoveExperience)
    chips.push({
      key: 'experience',
      label:
        experienceFilter === 'entry'
          ? 'Entry (0 to 2 yrs)'
          : experienceFilter === 'mid'
            ? 'Mid (3 to 7 yrs)'
            : 'Senior (8+ yrs)',
      onRemove: onRemoveExperience,
    });
  if (onRemoveEcsCard)
    selectedEcsCards.forEach((card) =>
      chips.push({
        key: `ecs-${card}`,
        label: `${card} card`,
        onRemove: () => onRemoveEcsCard(card),
      })
    );
  if (hasRateFilter && onResetRateRange)
    chips.push({
      key: 'rate',
      label: `£${rateRange[0]} to £${rateRange[1]}${rateRange[1] >= 500 ? '+' : ''} a day`,
      onRemove: onResetRateRange,
    });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={c.onRemove}
          aria-label={`Remove ${c.label}`}
          className={chipCls}
        >
          {c.label}
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      ))}
      <button type="button" onClick={onOpenFilters} className={chipCls}>
        Change filters
      </button>
      <span className="ml-auto text-[13px] text-white">
        {totalResults} {totalResults === 1 ? 'match' : 'matches'}
      </span>
    </div>
  );
}

export default TalentFilterChips;
