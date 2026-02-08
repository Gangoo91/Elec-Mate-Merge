/**
 * RecommendationCard
 *
 * Reusable "do this next" CTA card with icon, title, description,
 * and action button. Used across all stat detail sheets.
 */

import { type LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export type RecommendationVariant = 'orange' | 'green' | 'purple' | 'yellow' | 'blue' | 'red';

const variantStyles: Record<RecommendationVariant, { bg: string; border: string; text: string; btnBg: string; iconBg: string }> = {
  orange: {
    bg: 'bg-orange-500/[0.08]',
    border: 'border-orange-500/20',
    text: 'text-orange-400',
    btnBg: 'bg-orange-500 active:bg-orange-600',
    iconBg: 'bg-orange-500/15',
  },
  green: {
    bg: 'bg-green-500/[0.08]',
    border: 'border-green-500/20',
    text: 'text-green-400',
    btnBg: 'bg-green-500 active:bg-green-600',
    iconBg: 'bg-green-500/15',
  },
  purple: {
    bg: 'bg-purple-500/[0.08]',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
    btnBg: 'bg-purple-500 active:bg-purple-600',
    iconBg: 'bg-purple-500/15',
  },
  yellow: {
    bg: 'bg-elec-yellow/[0.08]',
    border: 'border-elec-yellow/20',
    text: 'text-elec-yellow',
    btnBg: 'bg-elec-yellow active:bg-amber-500',
    iconBg: 'bg-elec-yellow/15',
  },
  blue: {
    bg: 'bg-blue-500/[0.08]',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    btnBg: 'bg-blue-500 active:bg-blue-600',
    iconBg: 'bg-blue-500/15',
  },
  red: {
    bg: 'bg-red-500/[0.08]',
    border: 'border-red-500/20',
    text: 'text-red-400',
    btnBg: 'bg-red-500 active:bg-red-600',
    iconBg: 'bg-red-500/15',
  },
};

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
  variant,
  onClose,
}: RecommendationCardProps) {
  const navigate = useNavigate();
  const styles = variantStyles[variant];

  const handleAction = () => {
    onClose?.();
    setTimeout(() => navigate(actionPath), 150);
  };

  return (
    <div className={cn('rounded-2xl border p-4', styles.bg, styles.border)}>
      <div className="flex items-start gap-3">
        <div className={cn('p-2.5 rounded-xl flex-shrink-0', styles.iconBg)}>
          <Icon className={cn('h-5 w-5', styles.text)} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white mb-0.5">{title}</h4>
          <p className="text-xs text-white/70 leading-relaxed">{description}</p>
        </div>
      </div>
      <button
        onClick={handleAction}
        className={cn(
          'mt-3 w-full flex items-center justify-center gap-2 h-12 rounded-xl',
          'text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all',
          styles.btnBg, 'text-black'
        )}
      >
        {actionLabel}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
