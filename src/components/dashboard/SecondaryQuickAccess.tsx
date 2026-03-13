import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ClipboardCheck,
  Calculator,
  Heart,
  Sparkles,
  FileText,
  Gift,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ReferralShareSheet from '@/components/referrals/ReferralShareSheet';

interface QuickAccessItemProps {
  title: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
  color?: string;
  onClick?: () => void;
}

function QuickAccessItem({ title, icon, path, badge, color = 'elec-yellow', onClick }: QuickAccessItemProps) {
  const navigate = useNavigate();

  return (
    <button
      className={cn(
        'group flex items-center gap-3 w-full',
        'p-3 sm:p-3.5 rounded-xl',
        'bg-white/[0.03] border border-white/[0.06]',
        'hover:bg-white/[0.06] hover:border-white/[0.12]',
        'active:scale-[0.97] active:opacity-90',
        'transition-all duration-200',
        'touch-manipulation min-h-[44px]',
        'text-left'
      )}
      onClick={() => (onClick ? onClick() : navigate(path))}
    >
      <div
        className={cn(
          'p-2 rounded-xl flex-shrink-0 transition-colors duration-200',
          color === 'elec-yellow' && 'bg-elec-yellow/10 text-elec-yellow group-hover:bg-elec-yellow/15',
          color === 'red' && 'bg-red-500/10 text-red-400 group-hover:bg-red-500/15',
          color === 'purple' && 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/15',
          color === 'green' && 'bg-green-500/10 text-green-400 group-hover:bg-green-500/15',
          color === 'blue' && 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/15',
          color === 'amber' && 'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/15',
          color === 'pink' && 'bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/15'
        )}
      >
        {icon}
      </div>
      <span className="text-sm font-medium text-white flex-1 truncate">
        {title}
      </span>
      {badge ? (
        <span className={cn(
          'px-2 py-0.5 text-[10px] font-semibold rounded-full flex-shrink-0',
          badge === 'New'
            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
            : 'bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/25'
        )}>
          {badge}
        </span>
      ) : (
        <ChevronRight className="h-3.5 w-3.5 text-white opacity-0 group-hover:opacity-40 transition-opacity flex-shrink-0" />
      )}
    </button>
  );
}

export function SecondaryQuickAccess() {
  const [referralOpen, setReferralOpen] = useState(false);

  const items: (QuickAccessItemProps & { color?: string })[] = [
    {
      title: 'Study Centre',
      icon: <BookOpen className="h-4 w-4" />,
      path: '/study-centre',
      color: 'blue',
    },
    {
      title: 'Inspection & Testing',
      icon: <ClipboardCheck className="h-4 w-4" />,
      path: '/electrician/inspection-testing',
      color: 'green',
    },
    {
      title: 'Quotes & Invoices',
      icon: <Calculator className="h-4 w-4" />,
      path: '/electrician/quotes',
      color: 'elec-yellow',
    },
    {
      title: 'Wellbeing Hub',
      icon: <Heart className="h-4 w-4" />,
      path: '/mental-health',
      color: 'pink',
    },
    {
      title: 'AI Tools',
      icon: <Sparkles className="h-4 w-4" />,
      path: '/electrician-tools/ai-tooling',
      badge: 'New',
      color: 'purple',
    },
    {
      title: 'Documents & Reports',
      icon: <FileText className="h-4 w-4" />,
      path: '/electrician/inspection-testing?section=my-reports',
      color: 'amber',
    },
    {
      title: 'Refer a Mate',
      icon: <Gift className="h-4 w-4" />,
      path: '#',
      badge: 'Free month',
      color: 'elec-yellow',
      onClick: () => setReferralOpen(true),
    },
  ];

  return (
    <div>
      <h3 className="text-xs font-medium text-white uppercase tracking-wider mb-3 px-0.5">
        Quick Access
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
        {items.map((item) => (
          <QuickAccessItem key={item.path + item.title} {...item} />
        ))}
      </div>
      <ReferralShareSheet open={referralOpen} onOpenChange={setReferralOpen} context="dashboard" />
    </div>
  );
}
