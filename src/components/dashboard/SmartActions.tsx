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
      <motion.button
        ref={ref as any}
        variants={itemVariants}
        onClick={() => navigate(action.path)}
        className={cn(
          'w-full flex items-center gap-3 p-4 min-h-[56px]',
          'bg-white/5 border-l-4 rounded-lg',
          styles.borderColor,
          'text-left touch-manipulation',
          'active:bg-white/10 transition-colors'
        )}
      >
        {/* Icon */}
        <Icon className={cn('h-5 w-5 flex-shrink-0', styles.iconColor)} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {action.title}
          </p>
          <p className="text-xs text-white/50 truncate">
            {action.description}
          </p>
        </div>

        {/* Chevron */}
        <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0" />
      </motion.button>
    );
  }
);
ActionCard.displayName = 'ActionCard';

function EmptyState() {
  return (
    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
      <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">All caught up!</p>
        <p className="text-xs text-white/50">No urgent actions required</p>
      </div>
    </div>
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
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-semibold text-white">Action Required</span>
        </div>
        <span className="bg-amber-500/15 text-amber-400 border-0 text-xs font-semibold px-2 py-0.5 rounded">
          {sortedActions.length}
        </span>
      </div>

      {/* Action cards */}
      <div className="space-y-2">
        {sortedActions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
      </div>
    </div>
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
