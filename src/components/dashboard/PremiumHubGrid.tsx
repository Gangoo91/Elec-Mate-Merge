/**
 * PremiumHubGrid
 *
 * Enhanced hub cards with gradient accent lines, real stats per hub,
 * glass morphism styling, and premium micro-interactions.
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
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';

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
    id: 'employer',
    title: 'Employer Hub',
    subtitle: 'Manage',
    description: 'Employees, jobs, timesheets, and business management.',
    icon: Briefcase,
    path: '/employer',
    accentGradient: 'from-purple-500 via-purple-400 to-pink-400',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border border-purple-500/20',
    roles: ['electrician', 'employer', 'admin'],
    getStat: (data) => ({
      label: 'Active jobs',
      value: String(data.business.activeJobs),
      icon: Briefcase,
    })
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

function PremiumHubCard({ hub, data }: { hub: HubConfig; data: ReturnType<typeof useDashboardData> }) {
  const navigate = useNavigate();
  const Icon = hub.icon;
  const stat = hub.getStat(data);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(hub.path)}
      className={cn(
        // Base
        'group relative cursor-pointer',
        // Glass morphism
        'glass-premium rounded-2xl',
        // Touch optimization
        'touch-manipulation',
        // Overflow for gradient line
        'overflow-hidden'
      )}
    >
      {/* Gradient accent line at top */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px]',
          'bg-gradient-to-r',
          hub.accentGradient,
          'opacity-60 group-hover:opacity-100',
          'transition-opacity duration-200'
        )}
      />

      {/* Decorative gradient blob */}
      <div
        className={cn(
          'absolute -top-16 -right-16 w-32 h-32',
          'bg-gradient-to-br',
          hub.accentGradient,
          'opacity-[0.03] blur-3xl',
          'group-hover:opacity-[0.08]',
          'transition-opacity duration-300',
          'pointer-events-none'
        )}
      />

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full min-h-[160px] sm:min-h-[180px]">
        {/* Top row - Icon and badge */}
        <div className="flex items-start justify-between mb-3">
          <div
            className={cn(
              'p-2.5 sm:p-3 rounded-xl',
              hub.iconBg,
              hub.iconColor,
              'transition-all duration-200',
              'group-hover:scale-110'
            )}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <span
            className={cn(
              'text-[10px] sm:text-xs font-medium',
              'text-white/70 uppercase tracking-wider',
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
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-2">
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
            <stat.icon className="h-3 w-3 text-white/60" />
            <span className="text-[10px] sm:text-xs text-white/80">
              {stat.label}:
            </span>
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
              'text-elec-yellow group-hover:text-elec-yellow',
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
                'w-4 h-4 text-white/60',
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
  const dashboardData = useDashboardData();
  const { profile } = useAuth();
  const userRole = profile?.role || 'visitor';

  // Filter hubs based on user role
  const filteredHubs = hubsConfig.filter(hub => hub.roles.includes(userRole));

  // Determine grid columns based on number of hubs
  const gridCols = filteredHubs.length === 1
    ? 'grid-cols-1'
    : filteredHubs.length === 2
    ? 'grid-cols-1 sm:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-3';

  if (filteredHubs.length === 0) {
    return null;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('grid gap-3 sm:gap-4', gridCols)}
    >
      {filteredHubs.map((hub) => (
        <PremiumHubCard key={hub.id} hub={hub} data={dashboardData} />
      ))}
    </motion.div>
  );
}

export default PremiumHubGrid;
