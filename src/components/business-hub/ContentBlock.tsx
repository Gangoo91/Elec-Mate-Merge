import { ReactNode, useState } from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

type AccentColor = 'yellow' | 'blue' | 'green' | 'purple' | 'orange' | 'emerald' | 'rose' | 'cyan';

const accentConfig: Record<
  AccentColor,
  { border: string; iconBg: string; iconBorder: string; iconText: string }
> = {
  yellow: {
    border: '',
    iconBg: 'bg-white/[0.05]',
    iconBorder: 'border-white/[0.08]',
    iconText: 'text-elec-yellow',
  },
  blue: {
    border: '',
    iconBg: 'bg-white/[0.05]',
    iconBorder: 'border-white/[0.08]',
    iconText: 'text-elec-yellow',
  },
  green: {
    border: '',
    iconBg: 'bg-white/[0.05]',
    iconBorder: 'border-white/[0.08]',
    iconText: 'text-elec-yellow',
  },
  purple: {
    border: '',
    iconBg: 'bg-white/[0.05]',
    iconBorder: 'border-white/[0.08]',
    iconText: 'text-elec-yellow',
  },
  orange: {
    border: '',
    iconBg: 'bg-white/[0.05]',
    iconBorder: 'border-white/[0.08]',
    iconText: 'text-elec-yellow',
  },
  emerald: {
    border: '',
    iconBg: 'bg-white/[0.05]',
    iconBorder: 'border-white/[0.08]',
    iconText: 'text-elec-yellow',
  },
  rose: {
    border: '',
    iconBg: 'bg-white/[0.05]',
    iconBorder: 'border-white/[0.08]',
    iconText: 'text-elec-yellow',
  },
  cyan: {
    border: '',
    iconBg: 'bg-white/[0.05]',
    iconBorder: 'border-white/[0.08]',
    iconText: 'text-elec-yellow',
  },
};

interface ContentBlockProps {
  title: string;
  icon?: LucideIcon;
  summary?: ReactNode;
  children?: ReactNode;
  id?: string;
  accentColor?: AccentColor;
  defaultOpen?: boolean;
  className?: string;
}

const ContentBlock = ({
  title,
  icon: Icon,
  summary,
  children,
  id,
  accentColor = 'yellow',
  defaultOpen = true,
  className,
}: ContentBlockProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const accent = accentConfig[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div
          id={id}
          className={cn(
            'rounded-2xl overflow-hidden scroll-mt-24',
            'bg-[hsl(0_0%_12%)] border border-white/[0.08]',
            accent.border,
            className
          )}
        >
          {/* Header — toggles collapse */}
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="w-full px-5 sm:px-6 py-4 border-b border-white/[0.06] touch-manipulation active:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-4">
                {Icon && (
                  <div
                    className={cn(
                      'flex-shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center',
                      accent.iconBg,
                      accent.iconBorder
                    )}
                  >
                    <Icon className={cn('h-4 w-4', accent.iconText)} />
                  </div>
                )}
                <h3 className="text-[15px] font-semibold text-white flex-1 text-left tracking-tight">{title}</h3>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white flex-shrink-0 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                />
              </div>
            </button>
          </CollapsibleTrigger>

          {/* Content */}
          <CollapsibleContent>
            <div className="p-6 space-y-5">
              {summary && <div className="text-base text-white leading-relaxed">{summary}</div>}
              {children && (
                <div className={cn(summary && 'pt-5 border-t border-white/10')}>{children}</div>
              )}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </motion.div>
  );
};

export default ContentBlock;
