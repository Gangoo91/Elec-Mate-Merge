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
    border: 'border-l-yellow-400',
    iconBg: 'bg-yellow-400/10',
    iconBorder: 'border-yellow-400/20',
    iconText: 'text-yellow-400',
  },
  blue: {
    border: 'border-l-blue-400',
    iconBg: 'bg-blue-400/10',
    iconBorder: 'border-blue-400/20',
    iconText: 'text-blue-400',
  },
  green: {
    border: 'border-l-green-400',
    iconBg: 'bg-green-400/10',
    iconBorder: 'border-green-400/20',
    iconText: 'text-green-400',
  },
  purple: {
    border: 'border-l-purple-400',
    iconBg: 'bg-purple-400/10',
    iconBorder: 'border-purple-400/20',
    iconText: 'text-purple-400',
  },
  orange: {
    border: 'border-l-orange-400',
    iconBg: 'bg-orange-400/10',
    iconBorder: 'border-orange-400/20',
    iconText: 'text-orange-400',
  },
  emerald: {
    border: 'border-l-emerald-400',
    iconBg: 'bg-emerald-400/10',
    iconBorder: 'border-emerald-400/20',
    iconText: 'text-emerald-400',
  },
  rose: {
    border: 'border-l-rose-400',
    iconBg: 'bg-rose-400/10',
    iconBorder: 'border-rose-400/20',
    iconText: 'text-rose-400',
  },
  cyan: {
    border: 'border-l-cyan-400',
    iconBg: 'bg-cyan-400/10',
    iconBorder: 'border-cyan-400/20',
    iconText: 'text-cyan-400',
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
            'bg-white/[0.03] border border-white/10',
            'border-l-4',
            accent.border,
            className
          )}
        >
          {/* Header — toggles collapse */}
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="w-full px-6 py-5 border-b border-white/5 bg-white/[0.02] touch-manipulation active:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-4">
                {Icon && (
                  <div
                    className={cn(
                      'flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center',
                      accent.iconBg,
                      accent.iconBorder
                    )}
                  >
                    <Icon className={cn('h-6 w-6', accent.iconText)} />
                  </div>
                )}
                <h3 className="text-lg font-bold text-white flex-1 text-left">{title}</h3>
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
