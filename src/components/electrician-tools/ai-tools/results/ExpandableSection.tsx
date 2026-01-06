import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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

/**
 * ExpandableSection - Animated collapsible section for progressive disclosure
 *
 * Features:
 * - Smooth height animation with framer-motion
 * - Optional icon with custom color
 * - Badge support for counts/status
 * - 48px touch target on header
 */
export function ExpandableSection({
  title,
  icon: Icon,
  iconColor = "text-elec-yellow",
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
        "rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden",
        className
      )}
    >
      {/* Header - clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between gap-3 p-4",
          "min-h-[56px] touch-manipulation",
          "hover:bg-accent/30 active:bg-accent/50 transition-colors",
          "text-left",
          headerClassName
        )}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {Icon && (
            <div className={cn("flex-shrink-0", iconColor)}>
              <Icon className="h-5 w-5" />
            </div>
          )}
          <span className="font-semibold text-foreground truncate">{title}</span>
          {badge && <div className="flex-shrink-0">{badge}</div>}
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-muted-foreground"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      {/* Content - animated */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4 pt-0">
              <div className="border-t border-border/30 pt-4">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ExpandableSection;
