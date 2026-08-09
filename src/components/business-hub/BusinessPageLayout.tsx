import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * Two additions here, both driven by the customer detail page adopting this
 * layout:
 *
 *  - `onBack` — that page pops history rather than pushing `backUrl`, so the
 *    browser back button leaves the CRM instead of replaying the detail page.
 *    Without this hook it would have had to hand-roll the header again, which
 *    is how the house style drifted in the first place.
 *  - `actions` — a slot for page-level controls on the right of the header.
 *
 * `subtitle` was already in the props and accepted by eight callers, but was
 * never destructured and so never rendered. It renders now.
 */

type AccentColor = 'yellow' | 'blue' | 'green' | 'purple' | 'orange' | 'emerald' | 'rose' | 'cyan';

const accentConfig: Record<AccentColor, { iconText: string }> = {
  yellow: { iconText: 'text-elec-yellow' },
  blue: { iconText: 'text-elec-yellow' },
  green: { iconText: 'text-elec-yellow' },
  purple: { iconText: 'text-elec-yellow' },
  orange: { iconText: 'text-elec-yellow' },
  emerald: { iconText: 'text-elec-yellow' },
  rose: { iconText: 'text-elec-yellow' },
  cyan: { iconText: 'text-elec-yellow' },
};

interface BusinessPageLayoutProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  /** Ignored when `onBack` is supplied. */
  backUrl: string;
  onBack?: () => void;
  actions?: ReactNode;
  accentColor?: AccentColor;
  children: ReactNode;
  className?: string;
}

const BusinessPageLayout = ({
  title,
  subtitle,
  icon: Icon,
  backUrl,
  onBack,
  actions,
  accentColor = 'yellow',
  children,
  className,
}: BusinessPageLayoutProps) => {
  const navigate = useNavigate();
  const accent = accentConfig[accentColor];

  return (
    <div className={cn('-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24 min-h-screen', className)}>
      {/* Header — scrolls with content */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack ?? (() => navigate(backUrl))}
            aria-label="Back"
            className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/[0.06] touch-manipulation active:bg-white/[0.1] transition-colors flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <Icon className={cn('h-5 w-5 flex-shrink-0', accent.iconText)} />
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-white truncate">{title}</h1>
              {subtitle && <p className="text-[12px] text-white truncate">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="ml-auto flex items-center gap-1">{actions}</div>}
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-4 space-y-4">{children}</main>
    </div>
  );
};

export default BusinessPageLayout;
