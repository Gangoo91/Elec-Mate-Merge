import { LucideIcon, Inbox, Search, FileX, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PrimaryButton, SecondaryButton } from './editorial';

type EmptyStateType = 'no-data' | 'no-results' | 'error' | 'custom';

interface MobileEmptyStateProps {
  type?: EmptyStateType;
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

const defaultIcons: Record<EmptyStateType, LucideIcon> = {
  'no-data': Inbox,
  'no-results': Search,
  error: AlertCircle,
  custom: FileX,
};

const defaultColors: Record<EmptyStateType, string> = {
  'no-data': 'text-white bg-white/[0.06]',
  'no-results': 'text-blue-400 bg-blue-500/10',
  error: 'text-red-400 bg-red-500/10',
  custom: 'text-elec-yellow bg-elec-yellow/10',
};

/**
 * Mobile-optimized empty state component.
 * Use when a list/section has no content to display.
 */
export function MobileEmptyState({
  type = 'no-data',
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
}: MobileEmptyStateProps) {
  const Icon = icon || defaultIcons[type];
  const colorClasses = defaultColors[type];

  return (
    <div
      className={cn('flex flex-col items-center justify-center text-center py-12 px-6', className)}
    >
      <div className={cn('p-4 rounded-2xl mb-4', colorClasses)}>
        <Icon className="h-8 w-8" />
      </div>

      <h3 className="text-base font-semibold text-white mb-1">{title}</h3>

      {description && <p className="text-sm text-white max-w-xs mb-4">{description}</p>}

      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
          {actionLabel && onAction && (
            <PrimaryButton onClick={onAction} fullWidth>
              {actionLabel}
            </PrimaryButton>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <SecondaryButton onClick={onSecondaryAction} fullWidth>
              {secondaryActionLabel}
            </SecondaryButton>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Inline empty state for smaller spaces (within cards, lists).
 */
interface InlineEmptyStateProps {
  icon?: LucideIcon;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function InlineEmptyState({
  icon: Icon = Inbox,
  message,
  actionLabel,
  onAction,
  className,
}: InlineEmptyStateProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-3 py-8 px-4',
        'border-2 border-dashed border-white/[0.08] rounded-xl',
        className
      )}
    >
      <Icon className="h-5 w-5 text-white shrink-0" />
      <span className="text-sm text-white">{message}</span>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="h-auto p-0 text-sm text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation font-medium"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
