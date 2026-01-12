import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
  onHome,
  isRetrying = false,
}: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[300px] p-4">
      <Card className="max-w-sm w-full border-destructive/20 bg-destructive/5">
        <CardContent className="pt-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground mb-6">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <Button
                variant="outline"
                onClick={onRetry}
                disabled={isRetrying}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`} />
                {isRetrying ? "Retrying..." : "Try Again"}
              </Button>
            )}

            {onHome && (
              <Button
                variant="ghost"
                onClick={onHome}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
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

export function EmptyState({
  icon,
  title,
  description,
  action
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center">
      {icon && (
        <div className="mb-4 text-muted-foreground/60">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-medium text-foreground mb-1">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-muted-foreground mb-4 max-w-xs">
          {description}
        </p>
      )}

      {action && (
        <Button onClick={action.onClick} className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}
