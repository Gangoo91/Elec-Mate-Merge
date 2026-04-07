/**
 * PremiumHubGrid
 *
 * Hub cards with solid surfaces, bento layout (primary hub 2-col on mobile),
 * gradient accent lines, real stats per hub, and spring micro-interactions.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Zap,
  Briefcase,
  ChevronRight,
  Clock,
  FileText,
  Award,
  Users,
  School,
  BookOpen,
  Heart,
  Settings2,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboardPreferences } from '@/hooks/useDashboardPreferences';

interface HubConfig {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  path: string;
  accentGradient: string;
  iconColor: string;
  iconBg: string;
  roles: string[]; // Which user roles can see this hub
  allowedEmails?: string[]; // Only show to specific email addresses
  isPrimary?: boolean; // Gets 2-col span on mobile
  getStat: (data: ReturnType<typeof useDashboardData>) => {
    label: string;
    value: string;
    icon: LucideIcon;
  } | null;
}

const hubsConfig: HubConfig[] = [
  {
    id: 'apprentice',
    title: 'Apprentice Hub',
    subtitle: 'Training',
    description: 'Track your journey, log training hours, and build your portfolio.',
    icon: GraduationCap,
    path: '/apprentice',
    accentGradient: 'from-blue-500 via-blue-400 to-cyan-400',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10 border border-blue-500/20',
    roles: ['apprentice', 'electrician', 'college', 'admin'],
    getStat: (data) => ({
      label: 'Study streak',
      value: `${data.learning.currentStreak} days`,
      icon: Clock,
    }),
  },
  {
    id: 'electrician',
    title: 'Electrical Hub',
    subtitle: 'Tools',
    description: 'Inspection tools, certificates, pricing, and AI assistants.',
    icon: Zap,
    path: '/electrician',
    accentGradient: 'from-elec-yellow via-amber-400 to-orange-400',
    iconColor: 'text-elec-yellow',
    iconBg: 'bg-elec-yellow/10 border border-elec-yellow/20',
    roles: ['electrician', 'apprentice', 'employer', 'admin'],
    getStat: (data) =>
      data.business.activeQuotes > 0
        ? {
            label: 'Active quotes',
            value: String(data.business.activeQuotes),
            icon: FileText,
          }
        : data.certificates.total > 0
          ? {
              label: 'Certificates',
              value: String(data.certificates.total),
              icon: Award,
            }
          : null,
  },
  {
    id: 'study-centre',
    title: 'Study Centre',
    subtitle: 'Learn',
    description: 'Courses, revision, and CPD for every stage of your career.',
    icon: BookOpen,
    path: '/study-centre',
    accentGradient: 'from-purple-500 via-violet-400 to-indigo-400',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border border-purple-500/20',
    roles: ['apprentice', 'electrician', 'employer', 'admin', 'college'],
    getStat: (data) =>
      data.learning.currentStreak > 0
        ? {
            label: 'Study streak',
            value: `${data.learning.currentStreak} days`,
            icon: Clock,
          }
        : null,
  },
  {
    id: 'college',
    title: 'College Hub',
    subtitle: 'Tutor',
    description: 'Manage students, cohorts, assessments and curriculum.',
    icon: School,
    path: '/college',
    accentGradient: 'from-emerald-500 via-teal-400 to-cyan-400',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border border-emerald-500/20',
    roles: ['admin', 'college'],
    getStat: () => ({
      label: 'Dashboard',
      value: 'Active',
      icon: School,
    }),
  },
  {
    id: 'wellbeing',
    title: 'Wellbeing Hub',
    subtitle: 'Wellbeing',
    description: 'Mental health support, stress tools, and wellbeing resources.',
    icon: Heart,
    path: '/mental-health',
    accentGradient: 'from-pink-500 via-rose-400 to-red-400',
    iconColor: 'text-pink-400',
    iconBg: 'bg-pink-500/10 border border-pink-500/20',
    roles: ['apprentice', 'electrician', 'employer', 'admin', 'college'],
    getStat: () => null,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

function PremiumHubCard({
  hub,
  data,
  isPrimary,
}: {
  hub: HubConfig;
  data: ReturnType<typeof useDashboardData>;
  isPrimary?: boolean;
}) {
  const navigate = useNavigate();
  const stat = hub.getStat(data);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(hub.path)}
      className={cn(
        // Base
        'group relative cursor-pointer',
        // Solid surface
        'card-surface-interactive',
        // Touch optimization
        'touch-manipulation',
        // Overflow for gradient line
        'overflow-hidden'
        // All cards same size in 2x2 grid
      )}
    >
      {/* Gradient accent line at top */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px]',
          'bg-gradient-to-r',
          hub.accentGradient,
          'opacity-40 group-hover:opacity-100',
          'transition-opacity duration-200'
        )}
      />

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full min-h-[160px] sm:min-h-[180px]">
        {/* Top row - badge */}
        <div className="flex items-start justify-end mb-3">
          <span
            className={cn(
              'text-[10px] sm:text-xs font-medium',
              'text-white uppercase tracking-wider',
              'px-2 py-1 rounded-md bg-white/[0.04]'
            )}
          >
            {hub.subtitle}
          </span>
        </div>

        {/* Text content */}
        <div className="flex-grow">
          <h3
            className={cn(
              'text-base sm:text-lg font-semibold text-white mb-1',
              'group-hover:text-elec-yellow transition-colors'
            )}
          >
            {hub.title}
          </h3>
          <p className="text-xs sm:text-sm text-white leading-relaxed line-clamp-2">
            {hub.description}
          </p>
        </div>

        {/* Stat badge (if available) */}
        {stat && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={cn(
              'inline-flex items-center gap-1.5 self-start',
              'mt-3 px-2.5 py-1 rounded-full',
              'bg-white/[0.05] border border-white/[0.08]'
            )}
          >
            <stat.icon className="h-3 w-3 text-white" />
            <span className="text-[10px] sm:text-xs text-white">{stat.label}:</span>
            <span className={cn('text-[10px] sm:text-xs font-semibold', hub.iconColor)}>
              {stat.value}
            </span>
          </motion.div>
        )}

        {/* Bottom action row */}
        <div className="mt-3 flex items-center justify-between">
          <span
            className={cn(
              'text-xs sm:text-sm font-medium',
              'text-elec-yellow',
              'transition-colors'
            )}
          >
            Open
          </span>
          <div
            className={cn(
              'w-7 h-7 sm:w-8 sm:h-8 rounded-full',
              'bg-white/[0.05] border border-elec-yellow/20',
              'flex items-center justify-center',
              'group-hover:bg-elec-yellow group-hover:border-elec-yellow',
              'transition-all duration-200'
            )}
          >
            <ChevronRight
              className={cn(
                'w-4 h-4 text-white',
                'group-hover:text-black group-hover:translate-x-0.5',
                'transition-all'
              )}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PremiumHubGrid() {
  const navigate = useNavigate();
  const dashboardData = useDashboardData();
  const { profile, user, isLoading } = useAuth();
  const { isHubVisible } = useDashboardPreferences();
  const userRole = profile?.role || '';
  const userEmail = user?.email?.toLowerCase() || '';

  // Filter hubs based on user role, allowed emails, and user preferences
  const filteredHubs = hubsConfig.filter((hub) => {
    // Check email restriction first
    if (hub.allowedEmails && hub.allowedEmails.length > 0) {
      if (!userEmail || !hub.allowedEmails.includes(userEmail)) {
        return false;
      }
    }
    // Then check role
    if (userRole && !isLoading && !hub.roles.includes(userRole)) {
      return false;
    }
    // Then check user preference (Electrical Hub always visible)
    if (hub.id !== 'electrician' && !isHubVisible(hub.id)) {
      return false;
    }
    return true;
  });

  // Show loading skeleton while profile loads
  if (isLoading) {
    return (
      <div className={cn('grid gap-3 sm:gap-4', 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4')}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card-surface rounded-2xl h-[180px] animate-pulse" />
        ))}
      </div>
    );
  }

  if (filteredHubs.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-white mb-2">No hubs visible on your dashboard.</p>
        <button
          onClick={() => navigate('/settings?tab=preferences')}
          className="text-xs text-elec-yellow font-medium touch-manipulation h-11 px-4 rounded-xl active:scale-[0.98]"
        >
          Customise in Settings
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Section header with customise gear */}
      <div className="flex items-center justify-between mb-3 px-0.5">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider">Your Hubs</h2>
        <button
          onClick={() => navigate('/settings?tab=preferences')}
          className="h-11 w-11 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.97] transition-all touch-manipulation -mr-2"
          aria-label="Customise dashboard"
        >
          <Settings2 className="h-4 w-4 text-white" />
        </button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {filteredHubs.map((hub, index) => {
          // First hub = hero (spans 2 cols on mobile), last odd hub also spans 2 cols
          const isHero = index === 0;
          const isLastOdd = filteredHubs.length % 2 === 1 && index === filteredHubs.length - 1;
          const shouldSpan = isHero || isLastOdd;

          return (
            <div key={hub.id} className={shouldSpan ? 'col-span-2 lg:col-span-1' : undefined}>
              <PremiumHubCard hub={hub} data={dashboardData} isPrimary={shouldSpan} />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default PremiumHubGrid;
