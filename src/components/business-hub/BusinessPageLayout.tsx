import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type AccentColor = 'yellow' | 'blue' | 'green' | 'purple' | 'orange' | 'emerald' | 'rose' | 'cyan';

const accentConfig: Record<AccentColor, { iconText: string }> = {
  yellow: { iconText: 'text-yellow-400' },
  blue: { iconText: 'text-blue-400' },
  green: { iconText: 'text-green-400' },
  purple: { iconText: 'text-purple-400' },
  orange: { iconText: 'text-orange-400' },
  emerald: { iconText: 'text-emerald-400' },
  rose: { iconText: 'text-rose-400' },
  cyan: { iconText: 'text-cyan-400' },
};

interface BusinessPageLayoutProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  backUrl: string;
  accentColor?: AccentColor;
  children: ReactNode;
  className?: string;
}

const BusinessPageLayout = ({
  title,
  icon: Icon,
  backUrl,
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
            onClick={() => navigate(backUrl)}
            className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/[0.06] touch-manipulation active:bg-white/[0.1] transition-colors flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <Icon className={cn('h-5 w-5 flex-shrink-0', accent.iconText)} />
            <h1 className="text-lg font-bold text-white truncate">{title}</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-4 space-y-4">{children}</main>
    </div>
  );
};

export default BusinessPageLayout;
