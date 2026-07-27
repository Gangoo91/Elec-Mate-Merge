import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalloutCardProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  variant?: 'tip' | 'warning' | 'info';
  className?: string;
}

const variantConfig = {
  tip: {
    bg: 'bg-white/[0.05]',
    border: 'border-white/[0.08]',
    iconBg: 'bg-white/[0.05]',
    iconText: 'text-elec-yellow',
  },
  warning: {
    bg: 'bg-white/[0.05]',
    border: 'border-white/[0.08]',
    iconBg: 'bg-white/[0.05]',
    iconText: 'text-elec-yellow',
  },
  info: {
    bg: 'bg-white/[0.05]',
    border: 'border-white/[0.08]',
    iconBg: 'bg-white/[0.05]',
    iconText: 'text-elec-yellow',
  },
};

const CalloutCard = ({
  icon: Icon,
  title,
  children,
  variant = 'tip',
  className,
}: CalloutCardProps) => {
  const config = variantConfig[variant];

  return (
    <div className={cn('p-5 rounded-2xl border', config.bg, config.border, className)}>
      <div className="flex items-start gap-4">
        <div className={cn('p-2.5 rounded-xl flex-shrink-0', config.iconBg)}>
          <Icon className={cn('h-5 w-5', config.iconText)} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
          <div className="text-sm text-white leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CalloutCard;
