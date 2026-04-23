import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DataField {
  label: string;
  value: ReactNode;
  fullWidth?: boolean;
}

interface MobileDataCardProps {
  title: string;
  subtitle?: string;
  fields: DataField[];
  status?: {
    label: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    className?: string;
  };
  actions?: ReactNode;
  onClick?: () => void;
  className?: string;
  leftIcon?: ReactNode;
}

export function MobileDataCard({
  title,
  subtitle,
  fields,
  status,
  actions,
  onClick,
  className,
  leftIcon,
}: MobileDataCardProps) {
  return (
    <div
      className={cn(
        'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4 transition-colors touch-manipulation',
        onClick && 'cursor-pointer hover:bg-[hsl(0_0%_15%)] active:bg-[hsl(0_0%_17%)]',
        className
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {leftIcon && <div className="flex-shrink-0">{leftIcon}</div>}
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-white text-sm truncate">{title}</h4>
            {subtitle && <p className="text-xs text-white truncate">{subtitle}</p>}
          </div>
        </div>
        {status && (
          <Badge
            variant={status.variant || 'default'}
            className={cn('text-[10px] flex-shrink-0', status.className)}
          >
            {status.label}
          </Badge>
        )}
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {fields.map((field, index) => (
          <div key={index} className={cn('min-w-0', field.fullWidth && 'col-span-2')}>
            <p className="text-[10px] text-white uppercase tracking-wide">{field.label}</p>
            <div className="text-sm text-white truncate">{field.value}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      {actions && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-white/[0.06]">{actions}</div>
      )}
    </div>
  );
}
