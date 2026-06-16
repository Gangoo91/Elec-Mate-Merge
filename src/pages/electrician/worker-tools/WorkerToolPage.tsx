/**
 * WorkerToolPage — shared shell for every Worker Tools sub-page.
 *
 * Gives all worker tool pages the same editorial DNA as the Electrician Hub /
 * Worker Tools hub: a sticky text masthead (← Worker Tools), an eyebrow + title
 * hero, optional header actions, and a width-constrained content column.
 *
 * It also guards access centrally: a user who isn't linked to a team (and isn't
 * a dev-whitelisted account) is bounced back to the hub, which shows the
 * join-team gate.
 */

import type { ReactNode } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useWorkerSelfService } from '@/hooks/useWorkerSelfService';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';

// Keep in sync with WorkerToolsHub's dev whitelist.
const DEV_WHITELIST = ['founder@elec-mate.com', 'andrewgangoo91@gmail.com'];

const maxWidthClass: Record<string, string> = {
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '5xl': 'max-w-5xl',
  '7xl': 'max-w-7xl',
};

interface WorkerToolPageProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  maxWidth?: keyof typeof maxWidthClass;
  children: ReactNode;
}

export function WorkerToolPage({
  eyebrow,
  title,
  description,
  actions,
  maxWidth = '7xl',
  children,
}: WorkerToolPageProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isLoadingEmployee, hasEmployeeRecord } = useWorkerSelfService();

  const isDevMode = Boolean(user?.email && DEV_WHITELIST.includes(user.email));
  const hasAccess = hasEmployeeRecord || isDevMode;

  if (isLoadingEmployee) {
    return (
      <div className="min-h-screen bg-elec-dark flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  if (!hasAccess) {
    return <Navigate to="/electrician/worker-tools" replace />;
  }

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-elec-dark min-h-screen pb-24">
      {/* Masthead */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center h-12 gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => navigate('/electrician/worker-tools')}
              className="text-[12.5px] font-medium text-white hover:text-white transition-colors touch-manipulation whitespace-nowrap"
            >
              ← Worker Tools
            </button>
            <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white hidden sm:inline">
                Worker
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className={cn('px-4 py-4 space-y-8 sm:space-y-10 mx-auto', maxWidthClass[maxWidth])}>
        {/* Hero */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative pt-2 sm:pt-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {eyebrow && (
                <motion.div variants={itemVariants}>
                  <Eyebrow>{eyebrow}</Eyebrow>
                </motion.div>
              )}
              <motion.h2
                variants={itemVariants}
                className="mt-2 font-semibold tracking-tight leading-[1.05] text-[28px] sm:text-[38px] lg:text-[44px] text-white"
              >
                {title}
              </motion.h2>
              {description && (
                <motion.p
                  variants={itemVariants}
                  className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-white/90 max-w-2xl"
                >
                  {description}
                </motion.p>
              )}
            </div>
            {actions && (
              <motion.div variants={itemVariants} className="shrink-0 flex items-center gap-2">
                {actions}
              </motion.div>
            )}
          </div>
        </motion.section>

        {children}
      </div>
    </div>
  );
}
