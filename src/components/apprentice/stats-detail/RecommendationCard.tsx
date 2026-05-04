/**
 * RecommendationCard
 *
 * Reusable "do this next" CTA card with icon, title, description,
 * and action button. Used across all stat detail sheets.
 */

import { type LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type RecommendationVariant = 'orange' | 'green' | 'purple' | 'yellow' | 'blue' | 'red';

interface RecommendationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  actionPath: string;
  variant: RecommendationVariant;
  onClose?: () => void;
}

export function RecommendationCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionPath,
  variant: _variant,
  onClose,
}: RecommendationCardProps) {
  const navigate = useNavigate();

  const handleAction = () => {
    navigate(actionPath);
    setTimeout(() => onClose?.(), 50);
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <Icon className="h-4 w-4 text-white/55 flex-shrink-0 mt-1" />
        <div className="flex-1 min-w-0 space-y-1">
          <h4 className="text-[14px] font-semibold text-white">{title}</h4>
          <p className="text-[13px] text-white/70 leading-relaxed">{description}</p>
        </div>
      </div>
      <button
        onClick={handleAction}
        className="mt-3 w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[14px] font-semibold touch-manipulation active:scale-[0.98] transition-all"
      >
        {actionLabel}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
