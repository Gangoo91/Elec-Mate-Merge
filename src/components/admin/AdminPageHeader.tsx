import { ReactNode } from 'react';
import { LucideIcon, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  accentColor?: string;
  actions?: ReactNode;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function AdminPageHeader({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'text-amber-400',
  iconBg = 'bg-amber-500/10 border-amber-500/20',
  accentColor = 'from-amber-500 via-yellow-400 to-amber-500',
  actions,
  onRefresh,
  isRefreshing,
}: AdminPageHeaderProps) {
  return (
    <div className="relative rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-50',
          accentColor
        )}
      />
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={cn(
              'w-10 h-10 rounded-xl border flex items-center justify-center shrink-0',
              iconBg
            )}
          >
            <Icon className={cn('h-5 w-5', iconColor)} />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-semibold text-white truncate">{title}</h1>
            {subtitle && (
              <p className="text-xs text-white mt-0.5 truncate">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {actions}
          {onRefresh && (
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 text-white hover:text-white hover:bg-white/5 touch-manipulation"
              onClick={onRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
