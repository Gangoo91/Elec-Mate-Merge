import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionButton {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'destructive' | 'success';
  disabled?: boolean;
}

interface MobileActionBarProps {
  actions: ActionButton[];
  className?: string;
}

const variantStyles = {
  default: 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.1]',
  primary: 'bg-elec-yellow hover:bg-elec-yellow/90 text-black',
  destructive: 'bg-red-500/15 hover:bg-red-500/20 text-red-400 border border-red-500/25',
  success: 'bg-green-500/15 hover:bg-green-500/20 text-green-400 border border-green-500/25',
};

/**
 * Fixed bottom action bar for mobile.
 * Use for primary actions that should always be accessible.
 */
export function MobileActionBar({ actions, className }: MobileActionBarProps) {
  if (actions.length === 0) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40',
        'bg-[hsl(0_0%_8%)]/95 backdrop-blur-lg border-t border-white/[0.06]',
        'px-4 py-3 pb-safe',
        'md:hidden', // Only show on mobile
        className
      )}
    >
      <div className="flex gap-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const isLast = index === actions.length - 1;

          return (
            <button
              key={index}
              onClick={action.onClick}
              disabled={action.disabled}
              className={cn(
                'flex-1 h-12 gap-2 text-sm font-medium transition-all rounded-full flex items-center justify-center touch-manipulation',
                'active:scale-[0.98] disabled:opacity-40',
                variantStyles[action.variant || 'default'],
                isLast && actions.length > 1 && 'flex-[2]' // Last button is wider if multiple
              )}
            >
              <Icon className="h-4 w-4" />
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Floating action button for mobile.
 * Use for a single primary action.
 */
interface MobileFABProps {
  icon: LucideIcon;
  label?: string;
  onClick: () => void;
  variant?: 'default' | 'primary';
  className?: string;
}

export function MobileFAB({
  icon: Icon,
  label,
  onClick,
  variant = 'primary',
  className,
}: MobileFABProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed z-40 shadow-lg transition-all',
        'active:scale-95 hover:shadow-xl',
        'flex items-center justify-center gap-2 touch-manipulation',
        label
          ? 'bottom-20 right-4 h-12 px-5 rounded-full'
          : 'bottom-20 right-4 h-14 w-14 rounded-full',
        variant === 'primary'
          ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
          : 'bg-[hsl(0_0%_12%)] text-white border border-white/[0.08] hover:bg-[hsl(0_0%_15%)]',
        'md:bottom-6', // Higher on mobile to avoid bottom nav
        className
      )}
    >
      <Icon className={cn('shrink-0', label ? 'h-4 w-4' : 'h-6 w-6')} />
      {label && <span className="font-medium text-sm">{label}</span>}
    </button>
  );
}
