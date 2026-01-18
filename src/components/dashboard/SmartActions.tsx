/**
 * SmartActions
 *
 * AI-prioritized action queue showing urgent items, warnings, and info.
 * Each action has colored background, title, description, and action buttons.
 */

import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  AlertTriangle,
  Info,
  ChevronRight,
  Clock,
  FileText,
  Award,
  CheckCircle2,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardData, DashboardActionItem } from '@/hooks/useDashboardData';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const typeStyles: Record<
  DashboardActionItem['type'],
  {
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    borderColor: string;
    label: string;
  }
> = {
  urgent: {
    icon: AlertCircle,
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-500',
    borderColor: 'border-l-red-500',
    label: 'Urgent',
  },
  warning: {
    icon: AlertTriangle,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
    borderColor: 'border-l-amber-500',
    label: 'Action Needed',
  },
  info: {
    icon: Info,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    borderColor: 'border-l-blue-500',
    label: 'Info',
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 },
  },
};

const ActionCard = forwardRef<HTMLDivElement, { action: DashboardActionItem }>(
  ({ action }, ref) => {
    const navigate = useNavigate();
    const styles = typeStyles[action.type];
    const Icon = styles.icon;

    return (
      <motion.div
        ref={ref}
        variants={itemVariants}
        className={cn(
          // Base - relative for absolute button positioning on tablet+
          'relative group',
          // Glass morphism
          'glass-premium rounded-xl',
          // Left border accent
          'border-l-2',
          styles.borderColor,
          // Touch optimization + transform hint
          'touch-manipulation will-change-transform'
        )}
      >
        <div className="p-3 sm:p-4 sm:pr-28 flex items-start gap-3">
          {/* Icon */}
          <div className={cn('flex-shrink-0 p-2 rounded-lg', styles.iconBg)}>
            <Icon className={cn('h-4 w-4 sm:h-5 sm:w-5', styles.iconColor)} />
          </div>

          {/* Content - stacks vertically on mobile */}
          <div className="flex-1 min-w-0">
            {/* Title and description */}
            <div className="min-w-0">
              <p className="text-sm font-medium text-white line-clamp-1">
                {action.title}
              </p>
              <p className="text-xs text-white/70 mt-0.5 line-clamp-1">
                {action.description}
              </p>
            </div>

            {/* Action button - full width on mobile, absolute on tablet+ */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(action.path)}
              className={cn(
                // Mobile: full width below text
                'mt-2 w-full h-11 text-sm font-medium',
                // Tablet+: absolute positioned right
                'sm:absolute sm:right-3 sm:top-1/2 sm:-translate-y-1/2',
                'sm:w-auto sm:mt-0 sm:px-3',
                // Styling
                'bg-white/[0.05] hover:bg-white/[0.1] active:bg-white/[0.15]',
                'text-white hover:text-white',
                'transition-colors touch-manipulation'
              )}
            >
              {action.action}
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }
);
ActionCard.displayName = 'ActionCard';

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'glass-premium rounded-xl',
        'p-6 sm:p-8 text-center'
      )}
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 mb-3">
        <CheckCircle2 className="h-6 w-6 text-green-500" />
      </div>
      <h3 className="text-base font-medium text-white mb-1">All caught up!</h3>
      <p className="text-sm text-white/70">
        No urgent actions required. Great work!
      </p>
    </motion.div>
  );
}

// Define which roles can see which action types
const actionRoleFilters: Record<string, string[]> = {
  invoice: ['electrician', 'employer', 'admin'],
  quote: ['electrician', 'employer', 'admin'],
  cert: ['electrician', 'apprentice', 'admin'],
};

export function SmartActions() {
  const { actions, isLoading } = useDashboardData();
  const { profile } = useAuth();
  const userRole = profile?.role || 'visitor';

  // Filter actions based on user role
  const filteredActions = actions.filter(action => {
    // Extract action type from ID (e.g., 'invoice-123' → 'invoice')
    const actionType = action.id.split('-')[0];
    const allowedRoles = actionRoleFilters[actionType];
    return allowedRoles ? allowedRoles.includes(userRole) : true;
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-xl glass-premium animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (filteredActions.length === 0) {
    return <EmptyState />;
  }

  // Group actions by type for better organization
  const urgentActions = filteredActions.filter((a) => a.type === 'urgent');
  const warningActions = filteredActions.filter((a) => a.type === 'warning');
  const infoActions = filteredActions.filter((a) => a.type === 'info');

  const sortedActions = [...urgentActions, ...warningActions, ...infoActions];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-white">Action Required</h2>
        <div className="flex items-center gap-2">
          {urgentActions.length > 0 && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
              <AlertCircle className="h-3 w-3" />
              {urgentActions.length} urgent
            </span>
          )}
          {warningActions.length > 0 && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
              <AlertTriangle className="h-3 w-3" />
              {warningActions.length}
            </span>
          )}
        </div>
      </div>

      {/* Action cards */}
      <AnimatePresence mode="popLayout">
        {sortedActions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Compact version for sidebar or smaller spaces
 */
export function SmartActionsCompact() {
  const { actions } = useDashboardData();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const userRole = profile?.role || 'visitor';

  // Filter actions based on user role
  const filteredActions = actions.filter(action => {
    const actionType = action.id.split('-')[0];
    const allowedRoles = actionRoleFilters[actionType];
    return allowedRoles ? allowedRoles.includes(userRole) : true;
  });

  const urgentCount = filteredActions.filter((a) => a.type === 'urgent').length;
  const totalCount = filteredActions.length;

  if (totalCount === 0) return null;

  return (
    <button
      onClick={() => {
        // Navigate to first urgent action or first action
        const firstAction = filteredActions[0];
        if (firstAction) navigate(firstAction.path);
      }}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
        'bg-white/[0.03] border border-white/[0.08]',
        'hover:bg-white/[0.05] transition-colors',
        'touch-manipulation'
      )}
    >
      {urgentCount > 0 ? (
        <AlertCircle className="h-4 w-4 text-red-500" />
      ) : (
        <AlertTriangle className="h-4 w-4 text-amber-500" />
      )}
      <span className="text-xs font-medium text-white">
        {totalCount} action{totalCount !== 1 ? 's' : ''} needed
      </span>
    </button>
  );
}

export default SmartActions;
