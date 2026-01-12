import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, SlidersHorizontal, Clock, Shield, Award, Zap } from "lucide-react";

interface TalentFilterChipsProps {
  availabilityFilter: 'all' | 'now' | 'week';
  tierFilter: 'all' | 'verified' | 'premium';
  selectedSpecialisms: string[];
  labourBankOnly: boolean;
  onRemoveAvailability: () => void;
  onRemoveTier: () => void;
  onRemoveSpecialism: (spec: string) => void;
  onRemoveLabourBank: () => void;
  onOpenFilters: () => void;
  totalResults: number;
}

export function TalentFilterChips({
  availabilityFilter,
  tierFilter,
  selectedSpecialisms,
  labourBankOnly,
  onRemoveAvailability,
  onRemoveTier,
  onRemoveSpecialism,
  onRemoveLabourBank,
  onOpenFilters,
  totalResults,
}: TalentFilterChipsProps) {
  const hasFilters = availabilityFilter !== 'all' || tierFilter !== 'all' || selectedSpecialisms.length > 0 || labourBankOnly;

  if (!hasFilters) return null;

  const filterCount = [
    availabilityFilter !== 'all',
    tierFilter !== 'all',
    ...selectedSpecialisms.map(() => true),
    labourBankOnly,
  ].filter(Boolean).length;

  // Show max 3 chips, then "+N more" button
  const visibleChips: React.ReactNode[] = [];
  let hiddenCount = 0;

  // Availability chip
  if (availabilityFilter !== 'all') {
    if (visibleChips.length < 3) {
      visibleChips.push(
        <Badge
          key="availability"
          variant="secondary"
          className="h-8 px-3 gap-1.5 bg-success/10 text-success border-success/30 hover:bg-success/20 cursor-pointer touch-manipulation"
          onClick={onRemoveAvailability}
        >
          <Clock className="h-3 w-3" />
          {availabilityFilter === 'now' ? 'Available Now' : 'This Week'}
          <X className="h-3 w-3 ml-1" />
        </Badge>
      );
    } else {
      hiddenCount++;
    }
  }

  // Tier chip
  if (tierFilter !== 'all') {
    if (visibleChips.length < 3) {
      const TierIcon = tierFilter === 'premium' ? Award : Shield;
      const tierColor = tierFilter === 'premium' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' : 'text-blue-400 bg-blue-500/10 border-blue-500/30';
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

  // Labour Bank chip
  if (labourBankOnly) {
    if (visibleChips.length < 3) {
      visibleChips.push(
        <Badge
          key="labour-bank"
          variant="secondary"
          className="h-8 px-3 gap-1.5 bg-success/10 text-success border-success/30 hover:bg-success/20 cursor-pointer touch-manipulation"
          onClick={onRemoveLabourBank}
        >
          <Zap className="h-3 w-3" />
          Labour Bank
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
          className="h-8 px-3 gap-1.5 bg-white/5 border-white/20 hover:bg-white/10 cursor-pointer touch-manipulation"
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

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {visibleChips}

      {hiddenCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 gap-1.5 shrink-0 touch-manipulation"
          onClick={onOpenFilters}
        >
          <SlidersHorizontal className="h-3 w-3" />
          +{hiddenCount} more
        </Button>
      )}

      <span className="text-sm text-muted-foreground ml-auto shrink-0">
        {totalResults} {totalResults === 1 ? 'sparky' : 'sparkies'}
      </span>
    </div>
  );
}

export default TalentFilterChips;
