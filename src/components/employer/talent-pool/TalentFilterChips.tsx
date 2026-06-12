import { Badge } from '@/components/ui/badge';
import {
  X,
  SlidersHorizontal,
  Shield,
  Award,
  Briefcase,
  IdCard,
  PoundSterling,
} from 'lucide-react';
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
  const hasFilters =
    tierFilter !== 'all' ||
    selectedSpecialisms.length > 0 ||
    experienceFilter !== 'all' ||
    selectedEcsCards.length > 0 ||
    hasRateFilter;

  if (!hasFilters) return null;


  // Show max 3 chips, then "+N more" button
  const visibleChips: React.ReactNode[] = [];
  let hiddenCount = 0;

  // Tier chip
  if (tierFilter !== 'all') {
    if (visibleChips.length < 3) {
      const TierIcon = tierFilter === 'premium' ? Award : Shield;
      const tierColor =
        tierFilter === 'premium'
          ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
          : 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      visibleChips.push(
        <Badge
          key="tier"
          variant="secondary"
          className={`h-8 px-3 gap-1.5 hover:opacity-80 cursor-pointer touch-manipulation ${tierColor}`}
          onClick={onRemoveTier}
        >
          <TierIcon className="h-3 w-3" />
          {tierFilter === 'premium' ? 'Premium' : 'Verified+'}
          <X className="h-3 w-3 ml-1" />
        </Badge>
      );
    } else {
      hiddenCount++;
    }
  }


  // Specialism chips
  selectedSpecialisms.forEach((spec) => {
    if (visibleChips.length < 3) {
      visibleChips.push(
        <Badge
          key={spec}
          variant="secondary"
          className="h-8 px-3 gap-1.5 bg-white/[0.06] text-white border-white/[0.1] hover:bg-white/[0.1] cursor-pointer touch-manipulation"
          onClick={() => onRemoveSpecialism(spec)}
        >
          {spec}
          <X className="h-3 w-3 ml-1" />
        </Badge>
      );
    } else {
      hiddenCount++;
    }
  });

  // Experience chip
  if (experienceFilter !== 'all' && onRemoveExperience) {
    const expLabel =
      experienceFilter === 'entry'
        ? 'Entry (0-2yr)'
        : experienceFilter === 'mid'
          ? 'Mid (3-7yr)'
          : 'Senior (8+yr)';
    if (visibleChips.length < 3) {
      visibleChips.push(
        <Badge
          key="experience"
          variant="secondary"
          className="h-8 px-3 gap-1.5 bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20 cursor-pointer touch-manipulation"
          onClick={onRemoveExperience}
        >
          <Briefcase className="h-3 w-3" />
          {expLabel}
          <X className="h-3 w-3 ml-1" />
        </Badge>
      );
    } else {
      hiddenCount++;
    }
  }

  // ECS Card chips
  selectedEcsCards.forEach((card) => {
    if (visibleChips.length < 3 && onRemoveEcsCard) {
      const cardColor =
        card === 'Gold'
          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          : card === 'Blue'
            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
            : card === 'Green'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      visibleChips.push(
        <Badge
          key={`ecs-${card}`}
          variant="secondary"
          className={`h-8 px-3 gap-1.5 hover:opacity-80 cursor-pointer touch-manipulation ${cardColor}`}
          onClick={() => onRemoveEcsCard(card)}
        >
          <IdCard className="h-3 w-3" />
          {card} Card
          <X className="h-3 w-3 ml-1" />
        </Badge>
      );
    } else if (onRemoveEcsCard) {
      hiddenCount++;
    }
  });

  // Rate range chip
  if (hasRateFilter && onResetRateRange) {
    if (visibleChips.length < 3) {
      visibleChips.push(
        <Badge
          key="rate-range"
          variant="secondary"
          className="h-8 px-3 gap-1.5 bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20 cursor-pointer touch-manipulation"
          onClick={onResetRateRange}
        >
          <PoundSterling className="h-3 w-3" />£{rateRange[0]}-£{rateRange[1]}
          {rateRange[1] >= 500 ? '+' : ''}
          <X className="h-3 w-3 ml-1" />
        </Badge>
      );
    } else {
      hiddenCount++;
    }
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {visibleChips}

      {hiddenCount > 0 && (
        <button
          type="button"
          className="h-8 px-3 gap-1.5 shrink-0 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] font-medium text-white hover:bg-white/[0.08] transition-colors touch-manipulation inline-flex items-center"
          onClick={onOpenFilters}
        >
          <SlidersHorizontal className="h-3 w-3" />+{hiddenCount} more
        </button>
      )}

      <span className="text-sm text-white ml-auto shrink-0">
        {totalResults} {totalResults === 1 ? 'sparky' : 'sparkies'}
      </span>
    </div>
  );
}

export default TalentFilterChips;
