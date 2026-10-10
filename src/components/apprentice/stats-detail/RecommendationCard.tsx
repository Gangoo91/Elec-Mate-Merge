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
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-white" strokeWidth={1.5} />
        <div className="mb-3 min-w-0 flex-1 space-y-1">
          <h4 className="text-[14px] font-semibold text-white">{title}</h4>
          <p className="text-[13px] text-white leading-relaxed">{description}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleAction}
        className="mt-auto flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.14] text-[14px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.3] active:bg-white/[0.06]"
      >
        {actionLabel}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
