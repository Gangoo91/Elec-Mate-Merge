import React from "react";
import { LucideIcon, Inbox, Search, FileX, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateType = "no-data" | "no-results" | "error" | "custom";

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
  "no-data": Inbox,
  "no-results": Search,
  "error": AlertCircle,
  "custom": FileX,
};

const defaultColors: Record<EmptyStateType, string> = {
  "no-data": "text-muted-foreground bg-muted/30",
  "no-results": "text-info bg-info/10",
  "error": "text-destructive bg-destructive/10",
  "custom": "text-elec-yellow bg-elec-yellow/10",
};

/**
 * Mobile-optimized empty state component.
 * Use when a list/section has no content to display.
 */
export function MobileEmptyState({
  type = "no-data",
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
    <div className={cn(
      "flex flex-col items-center justify-center text-center py-12 px-6",
      className
    )}>
      <div className={cn(
        "p-4 rounded-2xl mb-4",
        colorClasses
      )}>
        <Icon className="h-8 w-8" />
      </div>

      <h3 className="text-base font-semibold text-foreground mb-1">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-muted-foreground max-w-xs mb-4">
          {description}
        </p>
      )}

      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
          {actionLabel && onAction && (
            <Button
              onClick={onAction}
              className="flex-1 h-11"
            >
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <Button
              variant="outline"
              onClick={onSecondaryAction}
              className="flex-1 h-11"
            >
              {secondaryActionLabel}
            </Button>
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
    <div className={cn(
      "flex items-center justify-center gap-3 py-8 px-4",
      "border-2 border-dashed border-border rounded-xl",
      className
    )}>
      <Icon className="h-5 w-5 text-muted-foreground shrink-0" />
      <span className="text-sm text-muted-foreground">{message}</span>
      {actionLabel && onAction && (
        <Button
          variant="link"
          size="sm"
          onClick={onAction}
          className="h-auto p-0 text-sm"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
