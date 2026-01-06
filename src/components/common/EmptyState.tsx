import { ReactNode } from 'react';
import { LucideIcon, Inbox, FileX, Search, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type EmptyStateVariant = 'default' | 'search' | 'error' | 'folder';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  variant?: EmptyStateVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  children?: ReactNode;
  compact?: boolean;
}

const variantIcons: Record<EmptyStateVariant, LucideIcon> = {
  default: Inbox,
  search: Search,
  error: FileX,
  folder: FolderOpen,
};

const variantColors: Record<EmptyStateVariant, string> = {
  default: 'from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/20 text-elec-yellow',
  search: 'from-info/20 to-info/5 border-info/20 text-info',
  error: 'from-destructive/20 to-destructive/5 border-destructive/20 text-destructive',
  folder: 'from-muted/20 to-muted/5 border-white/10 text-muted-foreground',
};

export function EmptyState({
  title,
  description,
  icon,
  variant = 'default',
  action,
  secondaryAction,
  className,
  children,
  compact = false,
}: EmptyStateProps) {
  const Icon = icon || variantIcons[variant];
  const colorClasses = variantColors[variant];

  if (compact) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-8 px-4 text-center', className)}>
        <div className={cn(
          'p-2.5 rounded-xl bg-gradient-to-br border mb-3',
          colorClasses
        )}>
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-sm font-medium text-white/80">{title}</p>
        {description && (
          <p className="text-xs text-white/50 mt-1 max-w-[200px]">{description}</p>
        )}
        {action && (
          <Button
            size="sm"
            variant="outline"
            onClick={action.onClick}
            className="mt-3 h-8 text-xs"
          >
            {action.label}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-6 text-center',
      'rounded-xl border border-white/5 bg-white/[0.02]',
      className
    )}>
      <div className={cn(
        'p-4 rounded-2xl bg-gradient-to-br border mb-4',
        colorClasses
      )}>
        <Icon className="h-8 w-8" />
      </div>

      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>

      {description && (
        <p className="text-sm text-white/60 max-w-sm mb-4">{description}</p>
      )}

      {children}

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
          {action && (
            <Button onClick={action.onClick} className="bg-elec-yellow hover:bg-elec-yellow/90 text-black">
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
