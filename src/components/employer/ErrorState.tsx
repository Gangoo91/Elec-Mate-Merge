import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from './editorial';

interface ErrorStateProps {
  /** Error title */
  title?: string;
  /** Error message/description */
  message?: string;
  /** Retry callback */
  onRetry?: () => void;
  /** Go home callback */
  onHome?: () => void;
  /** Whether retry is in progress */
  isRetrying?: boolean;
}

/**
 * Consistent error state for employer hub sections.
 * Shows error message with retry and home buttons.
 */
export function ErrorState({
  title = 'Something went wrong',
  message = "We couldn't load this content. Please try again.",
  onRetry,
  onHome,
  isRetrying = false,
}: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[300px] p-4">
      <div className="max-w-sm w-full bg-[hsl(0_0%_12%)] border border-red-500/20 rounded-2xl p-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

        <p className="text-sm text-white mb-6">{message}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <SecondaryButton onClick={onRetry} disabled={isRetrying}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Retrying...' : 'Try Again'}
            </SecondaryButton>
          )}

          {onHome && (
            <SecondaryButton onClick={onHome}>
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </SecondaryButton>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Empty state for when there's no data
 */
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center">
      {icon && <div className="mb-4 text-white">{icon}</div>}

      <h3 className="text-lg font-medium text-white mb-1">{title}</h3>

      {description && <p className="text-sm text-white mb-4 max-w-xs">{description}</p>}

      {action && (
        <PrimaryButton onClick={action.onClick} className="mt-2">
          {action.label}
        </PrimaryButton>
      )}
    </div>
  );
}
