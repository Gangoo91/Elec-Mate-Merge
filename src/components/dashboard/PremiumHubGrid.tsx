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
    roles: ['apprentice', 'electrician', 'employer', 'college', 'admin'],
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
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(hub.path)}
      className={cn(
        'group relative cursor-pointer h-full',
        'card-surface-interactive',
        'touch-manipulation',
        'overflow-hidden',
        'active:scale-[0.98] transition-all duration-200'
      )}
    >
      {/* Gradient accent line at top */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px]',
          'bg-gradient-to-r',
          hub.accentGradient,
          'opacity-30 group-hover:opacity-80',
          'transition-opacity duration-200'
        )}
      />

      {/* Content */}
      <div className="relative z-10 p-3.5 sm:p-4 flex flex-col h-full min-h-[130px]">
        {/* Title */}
        <h3 className="text-[13px] sm:text-sm font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
          {hub.title}
        </h3>

        {/* Description */}
        <p className="mt-0.5 text-[11px] sm:text-[12px] text-white leading-tight line-clamp-2">
          {hub.description}
        </p>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Stat (if available) */}
        {stat && (
          <p className="mt-2 text-[11px] text-white">
            <span className={cn('font-semibold', hub.iconColor)}>{stat.value}</span>
            {' '}{stat.label}
          </p>
        )}

        {/* Bottom action */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-medium text-elec-yellow">Open</span>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
            <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
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
  const isAdmin = profile?.admin_role === 'super_admin' || profile?.admin_role === 'admin';
  const userEmail = user?.email?.toLowerCase() || '';

  // Filter hubs based on user role, allowed emails, and user preferences
  const filteredHubs = hubsConfig.filter((hub) => {
    // Admins bypass email and role restrictions
    if (!isAdmin) {
      // Check email restriction
      if (hub.allowedEmails && hub.allowedEmails.length > 0) {
        if (!userEmail || !hub.allowedEmails.includes(userEmail)) {
          return false;
        }
      }
      // Check role
      if (userRole && !isLoading && !hub.roles.includes(userRole)) {
        return false;
      }
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
          // Last card spans full width if odd count, so no orphan half-card
          const isLastOdd = filteredHubs.length % 2 === 1 && index === filteredHubs.length - 1;

          return (
            <div key={hub.id} className={isLastOdd ? 'col-span-2 lg:col-span-1' : undefined}>
              <PremiumHubCard hub={hub} data={dashboardData} />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default PremiumHubGrid;
