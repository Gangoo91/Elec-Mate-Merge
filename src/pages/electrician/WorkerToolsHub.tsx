/**
 * WorkerToolsHub
 *
 * Self-service hub for employed electricians to manage:
 * - Status/check-in
 * - Timesheets (clock in/out)
 * - Leave requests
 * - Team communications
 * - My Jobs
 * - Credentials
 * - Progress Notes
 * - Safety Documents
 * - Expenses
 * - Snag Reports
 *
 * Yellow/amber theme to match app design language.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Palmtree,
  MessageSquare,
  Loader2,
  ChevronRight,
  Briefcase,
  IdCard,
  FileText,
  ShieldCheck,
  Receipt,
  Wrench,
  LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useWorkerSelfService, useSafetyDocs } from '@/hooks/useWorkerSelfService';
import { StatusSheet } from '@/components/worker-tools/StatusSheet';
import { TimesheetSheet } from '@/components/worker-tools/TimesheetSheet';
import { LeaveRequestSheet } from '@/components/worker-tools/LeaveRequestSheet';
import { CommsSheet } from '@/components/worker-tools/CommsSheet';
import { MyJobsSheet } from '@/components/worker-tools/MyJobsSheet';
import { CredentialsSheet } from '@/components/worker-tools/CredentialsSheet';
import { ProgressNotesSheet } from '@/components/worker-tools/ProgressNotesSheet';
import { SafetyDocsSheet } from '@/components/worker-tools/SafetyDocsSheet';
import { ExpenseSheet } from '@/components/worker-tools/ExpenseSheet';
import { SnagReportSheet } from '@/components/worker-tools/SnagReportSheet';

// Dev mode whitelist - allows access without employee record
const DEV_WHITELIST = ['founder@elec-mate.com', 'andrewgangoo91@gmail.com'];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

// Worker Status helper
const getStatusLabel = (status?: string): string => {
  switch (status) {
    case 'On Site':
      return 'On Site';
    case 'En Route':
      return 'En Route';
    case 'Office':
      return 'In Office';
    case 'Off Duty':
      return 'Off Duty';
    default:
      return 'Not Set';
  }
};

const getStatusColour = (status?: string): string => {
  switch (status) {
    case 'On Site':
      return 'text-green-400';
    case 'En Route':
      return 'text-amber-400';
    case 'Office':
      return 'text-elec-yellow';
    case 'Off Duty':
      return 'text-gray-400';
    default:
      return 'text-white/60';
  }
};

// Worker Tool Card Component
interface WorkerToolCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  subtitleColour?: string;
  badge?: number;
  onClick: () => void;
}

function WorkerToolCard({
  icon: Icon,
  title,
  subtitle,
  subtitleColour = 'text-white/60',
  badge,
  onClick,
}: WorkerToolCardProps) {
  return (
    <button
      onClick={onClick}
      className="touch-manipulation active:scale-[0.97] transition-transform w-full"
    >
      <motion.div
        whileTap={{ scale: 0.97 }}
        className="relative overflow-hidden glass-premium rounded-xl h-[130px] text-left group"
      >
        <div className="p-4 h-full flex flex-col">
          <div className="relative p-2 rounded-lg bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors w-fit mb-auto">
            <Icon className="h-5 w-5 text-elec-yellow" />
            {badge !== undefined && badge > 0 && (
              <Badge className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] px-1.5 bg-red-500 text-white text-[10px] font-bold border-0">
                {badge > 9 ? '9+' : badge}
              </Badge>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-0.5 group-hover:text-elec-yellow transition-colors">
              {title}
            </p>
            <p className={cn('text-xs', subtitleColour)}>
              {subtitle}
            </p>
          </div>
          <ChevronRight className="absolute top-4 right-3 h-4 w-4 text-white/30" />
        </div>
      </motion.div>
    </button>
  );
}

export default function WorkerToolsHub() {
  const [statusSheetOpen, setStatusSheetOpen] = useState(false);
  const [timesheetSheetOpen, setTimesheetSheetOpen] = useState(false);
  const [leaveSheetOpen, setLeaveSheetOpen] = useState(false);
  const [commsSheetOpen, setCommsSheetOpen] = useState(false);
  const [jobsSheetOpen, setJobsSheetOpen] = useState(false);
  const [credentialsSheetOpen, setCredentialsSheetOpen] = useState(false);
  const [progressNotesSheetOpen, setProgressNotesSheetOpen] = useState(false);
  const [safetyDocsSheetOpen, setSafetyDocsSheetOpen] = useState(false);
  const [expenseSheetOpen, setExpenseSheetOpen] = useState(false);
  const [snagReportSheetOpen, setSnagReportSheetOpen] = useState(false);

  const { user } = useAuth();
  const {
    employee,
    isLoadingEmployee,
    hasEmployeeRecord,
    isClockedIn,
    duration,
    todaysHours,
    leaveAllowance,
    unreadCount,
    activeJobsCount,
  } = useWorkerSelfService();

  const { data: safetyDocs } = useSafetyDocs();
  const pendingSafetyDocs = safetyDocs?.filter((d) => !d.acknowledged_at)?.length || 0;

  // Dev mode: allow whitelisted emails to access without employee record
  const isDevMode = user?.email && DEV_WHITELIST.includes(user.email);
  const hasAccess = hasEmployeeRecord || isDevMode;

  // Loading state
  if (isLoadingEmployee) {
    return (
      <div className="min-h-screen bg-elec-dark flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  // No employee record and not in dev mode - show message
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-elec-dark">
        <div className="mx-auto max-w-lg md:max-w-2xl px-4 md:px-6 py-8">
          <Link to="/electrician">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/[0.05] -ml-2 h-11 touch-manipulation mb-6"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          </Link>

          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-2xl bg-elec-yellow/10 flex items-center justify-center mx-auto mb-6">
              <Briefcase className="h-10 w-10 text-elec-yellow" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Worker Tools</h1>
            <p className="text-white/60 max-w-sm mx-auto">
              You don't have an employee profile linked to your account. Contact your employer to get access to Worker Tools.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Format duration for display
  const formatDuration = (dur: string): string => {
    const parts = dur.split(':');
    if (parts.length >= 2) {
      const hours = parseInt(parts[0], 10);
      const mins = parseInt(parts[1], 10);
      if (hours > 0) {
        return `${hours}h ${mins}m`;
      }
      return `${mins}m`;
    }
    return dur;
  };

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="mx-auto max-w-lg md:max-w-4xl lg:max-w-6xl px-4 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5 md:space-y-6 pb-20"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="pt-4">
            <Link to="/electrician">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/[0.05] -ml-2 h-11 touch-manipulation"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Worker Tools
              </Button>
            </Link>
          </motion.div>

          {/* Hero */}
          <motion.div variants={itemVariants}>
            <div className="relative overflow-hidden glass-premium rounded-2xl md:max-w-2xl">
              {/* Yellow gradient accent */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-elec-yellow/[0.08] blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10 p-5 md:p-6">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
                    {employee?.photo_url ? (
                      <img
                        src={employee.photo_url}
                        alt={employee.name}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    ) : (
                      <span className="text-lg md:text-xl font-semibold text-elec-yellow">
                        {employee?.avatar_initials || '?'}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl md:text-2xl font-bold text-white truncate">
                      {employee?.name || 'Worker'}
                    </h1>
                    <p className="text-sm md:text-base text-white/60">
                      {employee?.role || 'Electrician'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards Grid - responsive columns */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {/* Row 1 */}
              <WorkerToolCard
                icon={MapPin}
                title="My Status"
                subtitle={getStatusLabel(employee?.status as string)}
                subtitleColour={getStatusColour(employee?.status as string)}
                onClick={() => setStatusSheetOpen(true)}
              />
              <WorkerToolCard
                icon={Clock}
                title="Timesheets"
                subtitle={
                  isClockedIn
                    ? `Clocked in: ${formatDuration(duration)}`
                    : todaysHours > 0
                    ? `${todaysHours.toFixed(1)}h today`
                    : 'Not clocked in'
                }
                subtitleColour={isClockedIn ? 'text-green-400' : 'text-white/60'}
                onClick={() => setTimesheetSheetOpen(true)}
              />

              {/* Row 2 */}
              <WorkerToolCard
                icon={Palmtree}
                title="Leave"
                subtitle={`${leaveAllowance?.remainingDays ?? '--'} days remaining`}
                onClick={() => setLeaveSheetOpen(true)}
              />
              <WorkerToolCard
                icon={MessageSquare}
                title="Team Comms"
                subtitle={unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
                badge={unreadCount}
                onClick={() => setCommsSheetOpen(true)}
              />

              {/* Row 3 */}
              <WorkerToolCard
                icon={Briefcase}
                title="My Jobs"
                subtitle={activeJobsCount > 0 ? `${activeJobsCount} active` : 'View jobs'}
                onClick={() => setJobsSheetOpen(true)}
              />
              <WorkerToolCard
                icon={IdCard}
                title="Credentials"
                subtitle="View Elec-ID"
                onClick={() => setCredentialsSheetOpen(true)}
              />

              {/* Row 4 */}
              <WorkerToolCard
                icon={FileText}
                title="Progress Notes"
                subtitle="Log daily notes"
                onClick={() => setProgressNotesSheetOpen(true)}
              />
              <WorkerToolCard
                icon={ShieldCheck}
                title="Safety Docs"
                subtitle={pendingSafetyDocs > 0 ? `${pendingSafetyDocs} pending` : 'All acknowledged'}
                subtitleColour={pendingSafetyDocs > 0 ? 'text-amber-400' : 'text-white/60'}
                badge={pendingSafetyDocs}
                onClick={() => setSafetyDocsSheetOpen(true)}
              />

              {/* Row 5 */}
              <WorkerToolCard
                icon={Receipt}
                title="Expenses"
                subtitle="Submit claims"
                onClick={() => setExpenseSheetOpen(true)}
              />
              <WorkerToolCard
                icon={Wrench}
                title="Snag Reports"
                subtitle="Report issues"
                onClick={() => setSnagReportSheetOpen(true)}
              />
            </div>
          </motion.div>

          {/* Quick Actions */}
          {!isClockedIn && (
            <motion.div variants={itemVariants}>
              <Button
                onClick={() => setTimesheetSheetOpen(true)}
                className="w-full md:w-auto md:px-8 h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation"
              >
                <Clock className="h-5 w-5 mr-2" />
                Clock In
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom Sheets */}
      <StatusSheet
        open={statusSheetOpen}
        onOpenChange={setStatusSheetOpen}
      />
      <TimesheetSheet
        open={timesheetSheetOpen}
        onOpenChange={setTimesheetSheetOpen}
      />
      <LeaveRequestSheet
        open={leaveSheetOpen}
        onOpenChange={setLeaveSheetOpen}
      />
      <CommsSheet
        open={commsSheetOpen}
        onOpenChange={setCommsSheetOpen}
      />
      <MyJobsSheet
        open={jobsSheetOpen}
        onOpenChange={setJobsSheetOpen}
      />
      <CredentialsSheet
        open={credentialsSheetOpen}
        onOpenChange={setCredentialsSheetOpen}
      />
      <ProgressNotesSheet
        open={progressNotesSheetOpen}
        onOpenChange={setProgressNotesSheetOpen}
      />
      <SafetyDocsSheet
        open={safetyDocsSheetOpen}
        onOpenChange={setSafetyDocsSheetOpen}
      />
      <ExpenseSheet
        open={expenseSheetOpen}
        onOpenChange={setExpenseSheetOpen}
      />
      <SnagReportSheet
        open={snagReportSheetOpen}
        onOpenChange={setSnagReportSheetOpen}
      />
    </div>
  );
}
