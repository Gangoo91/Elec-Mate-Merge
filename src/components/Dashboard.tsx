import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import DashboardStatsBar from './dashboard/DashboardStatsBar';
import ComplianceScoreCard from './dashboard/ComplianceScoreCard';
import HeroCTA from './dashboard/HeroCTA';
import RecoverUnsavedWork from './dashboard/RecoverUnsavedWork';
import HelpPanel from './HelpPanel';
import { useNotifications } from '@/hooks/useNotifications';
import { useExpiryReminders } from '@/hooks/useExpiryReminders';
import { filterByTimeRange, getExpiryUrgency } from '@/utils/expiryHelper';
import { getDaysUntilDeadline } from '@/utils/notificationHelper';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { reportCloud } from '@/utils/reportCloud';
import { useDesignedCircuits } from '@/hooks/useDesignedCircuits';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

// --- Hub Card ---
interface HubCardProps {
  title: string;
  description: string;
  liveSubtitle?: string;
  accentColor: string;
  href?: string;
  onClick?: () => void;
}

const HubCard = ({ title, description, liveSubtitle, accentColor, href, onClick }: HubCardProps) => {
  const subtitle = liveSubtitle || description;
  const isAlert = liveSubtitle?.includes('overdue') || liveSubtitle?.includes('expired');

  const content = (
    <div
      className={cn(
        'group relative overflow-hidden h-full',
        'card-surface-interactive',
        'active:scale-[0.98] transition-all duration-200'
      )}
    >
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-30 group-hover:opacity-80 transition-opacity duration-200',
          accentColor
        )}
      />
      <div className="relative z-10 flex flex-col h-full p-4">
        <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
          {title}
        </h3>
        <p className={cn(
          'mt-1 text-[12px] leading-tight line-clamp-1',
          isAlert ? 'text-red-400 font-semibold' : 'text-white'
        )}>
          {subtitle}
        </p>
        <div className="flex-grow min-h-[12px]" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-elec-yellow">Open</span>
          <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
            <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>
    </div>
  );

  const className = "block w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation";

  if (onClick) {
    return (
      <motion.div variants={itemVariants} className="h-full">
        <button type="button" onClick={onClick} className={className}>{content}</button>
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link to={href || '#'} className={className}>{content}</Link>
    </motion.div>
  );
};

// --- Continue Card ---
interface ContinueCardProps {
  reportType: string;
  clientName: string;
  address: string;
  onClick: () => void;
}

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    eicr: 'EICR', eic: 'EIC', 'minor-works': 'MW',
    'fire-alarm': 'FA G1', 'fire-alarm-commissioning': 'FA G2',
    'fire-alarm-inspection': 'FA G7', 'fire-alarm-modification': 'FA G4',
    'ev-charging': 'EV', 'emergency-lighting': 'EM LTG',
    'pat-testing': 'PAT', 'solar-pv': 'SOLAR PV',
    'bess': 'BESS', 'lightning-protection': 'LPS',
    'g98-commissioning': 'G98', 'g99-commissioning': 'G99',
    'smoke-co-alarm': 'SMOKE/CO',
  };
  return labels[type] || type.toUpperCase().replace(/-/g, ' ').slice(0, 8);
};

const ContinueCard = ({ reportType, clientName, address, onClick }: ContinueCardProps) => (
  <motion.div variants={itemVariants}>
    <button
      onClick={onClick}
      className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
    >
      <div className="group relative overflow-hidden card-surface-interactive active:scale-[0.98] transition-all duration-200">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="relative z-10 flex items-center gap-3.5 p-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-400">
                {getTypeLabel(reportType)}
              </span>
            </div>
            <h4 className="text-[15px] font-semibold text-white truncate group-hover:text-elec-yellow transition-colors">{clientName || 'Untitled'}</h4>
            <p className="text-[12px] text-white truncate mt-0.5">{address || 'No address'}</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center flex-shrink-0 group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
            <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black transition-all" />
          </div>
        </div>
      </div>
    </button>
  </motion.div>
);

// --- Main Dashboard ---
const Dashboard = ({
  onNavigate,
}: {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}) => {
  const navigate = useNavigate();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  // Data queries
  const { notifications = [] } = useNotifications();
  const { reminders = [] } = useExpiryReminders();
  const { data: designedCircuits } = useDesignedCircuits();

  // Labels & Warnings saved docs count
  const { data: savedDocsCount = 0 } = useQuery({
    queryKey: ['labels-warnings-count', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      const { count } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .in('report_type', ['danger-notice', 'isolation-cert', 'permit-to-work', 'warning-labels', 'safe-isolation', 'limitation-notice', 'non-compliance-notice', 'completion-notice'])
        .is('deleted_at', null);
      return count || 0;
    },
    enabled: !!user,
    staleTime: 30 * 1000,
  });

  const { data: reportsData, isLoading } = useQuery({
    queryKey: ['recent-certificates', user?.id],
    queryFn: async () => {
      if (!user) return { reports: [], totalCount: 0, hasMore: false };
      return await reportCloud.getUserReports(user.id, { limit: 50 });
    },
    enabled: !!user,
    staleTime: 10 * 1000,
  });

  // Stats
  const reports = reportsData?.reports ?? [];
  const inProgressCount = reports.filter((r) => r.status === 'in-progress' || r.status === 'draft').length;
  const completedCount = reports.filter((r) => r.status === 'completed').length;
  const totalCount = reportsData?.totalCount ?? reports.length;

  const partPPending = notifications.filter(
    (n) => n.notification_status !== 'submitted' && n.notification_status !== 'cancelled'
  );
  const partPDueCount = partPPending.length;
  const overduePartP = partPPending.some(
    (n) => n.submission_deadline && getDaysUntilDeadline(n.submission_deadline) < 0
  );
  const partPOverdueCount = partPPending.filter(
    (n) => n.submission_deadline && getDaysUntilDeadline(n.submission_deadline) < 0
  ).length;

  const expiringReminders = filterByTimeRange(reminders, '90');
  const expiringCount = expiringReminders.length;
  const expiredCertsCount = reminders.filter(
    (r) => getExpiryUrgency(r.expiry_date) === 'expired'
  ).length;

  const pendingDesigns = (designedCircuits || []).filter(
    (d) => d.status === 'pending' || d.status === 'in-progress'
  ).length;

  // Most recent in-progress cert for "Continue" card
  const recentDraft = reports.find((r) => r.status === 'in-progress' || r.status === 'draft');

  const handleStatClick = (stat: 'in-progress' | 'part-p' | 'expiring') => {
    switch (stat) {
      case 'in-progress': onNavigate('my-reports'); break;
      case 'part-p': onNavigate('notifications'); break;
      case 'expiring': navigate('/certificate-expiry'); break;
    }
  };

  const handleContinue = () => {
    if (recentDraft) {
      onNavigate(recentDraft.report_type, recentDraft.report_id, recentDraft.report_type);
    }
  };

  // Live subtitles for hub cards
  const partPSubtitle = overduePartP
    ? `${partPOverdueCount} overdue`
    : partPDueCount > 0
      ? `${partPDueCount} pending`
      : 'All clear';

  const expiringSubtitle = expiredCertsCount > 0
    ? `${expiredCertsCount} expired`
    : expiringCount > 0
      ? `${expiringCount} expiring`
      : 'All clear';

  return (
    <>
      <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="px-4 py-2">
            <div className="flex items-center gap-3 h-11">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/electrician')}
                className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-sm font-bold text-white tracking-wide uppercase">Inspection & Testing</h1>
            </div>
          </div>
          <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
        </div>

        {/* Main Content */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-4 py-4 space-y-5"
        >
          {/* New Certificate + Continue — full width stacked */}
          <HeroCTA />
          {recentDraft && (
            <ContinueCard
              reportType={recentDraft.report_type}
              clientName={recentDraft.client_name}
              address={recentDraft.installation_address}
              onClick={handleContinue}
            />
          )}

          {/* Recover Unsaved Work */}
          <RecoverUnsavedWork onNavigate={onNavigate} />

          {/* Hub Card Grid */}
          <motion.section variants={itemVariants} className="space-y-3">
            <div className="grid grid-cols-2 gap-3 auto-rows-fr">
              <HubCard
                title="Certificates"
                description="4 core certificate types"
                liveSubtitle={inProgressCount > 0 ? `${inProgressCount} in progress` : '4 certificate types'}
                accentColor="from-blue-500 via-blue-400 to-cyan-400"
                onClick={() => onNavigate('certificates')}
              />
              <HubCard
                title="Specialist"
                description="14 certificate types"
                accentColor="from-red-500 via-rose-400 to-pink-400"
                onClick={() => onNavigate('specialist')}
              />
              <HubCard
                title="My Reports"
                description="All certificates"
                liveSubtitle={totalCount > 0 ? `${totalCount} certificates` : 'All certificates'}
                accentColor="from-emerald-500 via-emerald-400 to-green-400"
                onClick={() => onNavigate('my-reports')}
              />
              <HubCard
                title="Notices & Labels"
                description="11 document types"
                liveSubtitle="11 document types"
                accentColor="from-red-500 via-orange-400 to-amber-400"
                onClick={() => onNavigate('labels-warnings')}
              />
              <HubCard
                title="Expiring Certs"
                description="Expiry tracking"
                liveSubtitle={expiringSubtitle}
                accentColor="from-orange-500 via-amber-400 to-yellow-400"
                href="/certificate-expiry"
              />
              <HubCard
                title="Customers"
                description="Clients & properties"
                accentColor="from-violet-500 via-purple-400 to-indigo-400"
                href="/customers"
              />
              <HubCard
                title="Part P"
                description="Building regulations"
                liveSubtitle={partPSubtitle}
                accentColor="from-amber-500 via-amber-400 to-yellow-400"
                onClick={() => onNavigate('notifications')}
              />
              <HubCard
                title="Circuit Designer"
                description="AI-powered design"
                liveSubtitle={pendingDesigns > 0 ? `${pendingDesigns} pending` : 'AI-powered design'}
                accentColor="from-cyan-500 via-cyan-400 to-blue-400"
                href="/electrician/circuit-designer"
              />
              <HubCard
                title="I&T Hub"
                description="BS 7671 guidance"
                accentColor="from-elec-yellow via-amber-400 to-orange-400"
                onClick={() => onNavigate('learning-hub')}
              />
            </div>
          </motion.section>

          {/* Compliance & Stats — at the bottom */}
          <motion.div variants={itemVariants}>
            <ComplianceScoreCard
              partPOverdue={partPOverdueCount}
              partPPending={partPDueCount - partPOverdueCount}
              expiredCerts={expiredCertsCount}
              expiringSoon={expiringCount - expiredCertsCount}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <DashboardStatsBar
              inProgressCount={inProgressCount}
              partPDueCount={partPDueCount}
              expiringCount={expiringCount}
              completedCount={completedCount}
              overduePartP={overduePartP}
              isLoading={isLoading}
              onStatClick={handleStatClick}
            />
          </motion.div>
        </motion.main>
      </div>

      <HelpPanel open={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </>
  );
};

export default Dashboard;
