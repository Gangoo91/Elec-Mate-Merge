/**
 * ExpandableSection — editorial collapsible section.
 *
 * Drops the icon avatar block and Card-style chrome for editorial gradient
 * surface. Optional `icon` prop preserved for back-compat but no longer
 * rendered (we want type-led, no icons).
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpandableSectionProps {
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export function ExpandableSection({
  title,
  badge,
  defaultOpen = false,
  children,
  className,
  headerClassName,
}: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        'rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] overflow-hidden',
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between gap-3 px-5 py-4 min-h-[56px] touch-manipulation',
          'hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors text-left',
          headerClassName
        )}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-[13.5px] font-semibold tracking-tight text-white truncate">
            {title}
          </span>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-white/65"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-4 border-t border-white/[0.06]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ExpandableSection;
