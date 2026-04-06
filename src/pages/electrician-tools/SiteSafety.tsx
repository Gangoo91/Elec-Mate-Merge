import { useState, useEffect, lazy, Suspense } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  FileText,
  AlertTriangle,
  Camera,
  Users,
  Wrench,
  Phone,
  ArrowLeft,
  FolderOpen,
  Loader2,
  FlaskConical,
  ClipboardCheck,
  BookOpen,
  Lock,
  Library,
  Zap,
  Eye,
  CalendarDays,
  Flame,
  Bell,
  FolderArchive,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import BusinessCard from '@/components/business-hub/BusinessCard';
import { RAMSProvider } from '@/components/electrician-tools/site-safety/rams/RAMSContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionSkeleton } from '@/components/ui/page-skeleton';
import { SafetyDashboard } from '@/components/electrician-tools/site-safety/SafetyDashboard';
import { useSafetyDashboardStats, useRecentDocuments } from '@/hooks/useSafetyDashboardStats';
import { SafetyStreakCard } from '@/components/electrician-tools/site-safety/SafetyStreakCard';
import { SafetyTrendsCard } from '@/components/electrician-tools/site-safety/charts/SafetyTrendsCard';
import { WeeklySummaryCard } from '@/components/electrician-tools/site-safety/WeeklySummaryCard';
import { useSafetyStreak } from '@/hooks/useSafetyStreak';
import { useSafetyTrends } from '@/hooks/useSafetyTrends';
import { ScoreBreakdownCard } from '@/components/electrician-tools/site-safety/charts/ScoreBreakdownCard';
import { EquipmentAlertsCard } from '@/components/electrician-tools/site-safety/EquipmentAlertsCard';
import { COSHHAlertsCard } from '@/components/electrician-tools/site-safety/COSHHAlertsCard';
import { useSafetyEquipment } from '@/hooks/useSafetyEquipment';
import { useCOSHHOverdueReviews, useCOSHHUpcomingReviews } from '@/hooks/useCOSHH';
import { WeeklyReportCard } from '@/components/electrician-tools/site-safety/WeeklyReportCard';
import { useWeeklySafetySummary } from '@/hooks/useWeeklySafetySummary';
import { SignatureTrackingDashboard } from '@/components/electrician-tools/site-safety/SignatureTrackingDashboard';

// Lazy-loaded tool components for code splitting
const RAMSGenerator = lazy(
  () => import('@/components/electrician-tools/site-safety/RAMSGenerator')
);
const MethodStatementGenerator = lazy(
  () => import('@/components/electrician-tools/site-safety/MethodStatementGenerator')
);
const IntegratedRAMSGenerator = lazy(
  () => import('@/components/electrician-tools/site-safety/IntegratedRAMSGenerator')
);
const EnhancedHazardDatabase = lazy(() =>
  import('@/components/electrician-tools/site-safety/enhanced/EnhancedHazardDatabase').then(
    (m) => ({ default: m.EnhancedHazardDatabase })
  )
);
const PhotoDocumentation = lazy(
  () => import('@/components/electrician-tools/site-safety/PhotoDocumentation')
);
const TeamBriefingTemplates = lazy(
  () => import('@/components/electrician-tools/site-safety/TeamBriefingTemplates')
);
const NearMissReporting = lazy(() =>
  import('@/components/electrician-tools/site-safety/NearMissReporting').then((m) => ({
    default: m.NearMissReporting,
  }))
);
const SafetyEquipmentTracker = lazy(
  () => import('@/components/electrician-tools/site-safety/SafetyEquipmentTracker')
);
const EmergencyProcedures = lazy(
  () => import('@/components/electrician-tools/site-safety/EmergencyProcedures')
);
const AIRAMSGenerator = lazy(() =>
  import('@/components/electrician-tools/site-safety/ai-rams/AIRAMSGenerator').then((m) => ({
    default: m.AIRAMSGenerator,
  }))
);
const DocumentHub = lazy(() =>
  import('@/components/electrician-tools/site-safety/DocumentHub').then((m) => ({
    default: m.DocumentHub,
  }))
);
const PermitToWork = lazy(() =>
  import('@/components/electrician-tools/site-safety/PermitToWork').then((m) => ({
    default: m.PermitToWork,
  }))
);
const COSHHAssessmentBuilder = lazy(() =>
  import('@/components/electrician-tools/site-safety/COSHHAssessmentBuilder').then((m) => ({
    default: m.COSHHAssessmentBuilder,
  }))
);
const InspectionChecklists = lazy(() =>
  import('@/components/electrician-tools/site-safety/InspectionChecklists').then((m) => ({
    default: m.InspectionChecklists,
  }))
);
const DigitalAccidentBook = lazy(() =>
  import('@/components/electrician-tools/site-safety/DigitalAccidentBook').then((m) => ({
    default: m.DigitalAccidentBook,
  }))
);
const SafetyTemplateLibrary = lazy(() =>
  import('@/components/electrician-tools/site-safety/templates/SafetyTemplateLibrary').then(
    (m) => ({
      default: m.SafetyTemplateLibrary,
    })
  )
);
const SafeIsolationRecord = lazy(() =>
  import('@/components/electrician-tools/site-safety/safe-isolation/SafeIsolationRecord').then(
    (m) => ({
      default: m.SafeIsolationRecord,
    })
  )
);
const PreUseCheckTool = lazy(() =>
  import('@/components/electrician-tools/site-safety/pre-use-checks/PreUseCheckTool').then((m) => ({
    default: m.PreUseCheckTool,
  }))
);
const SafetyObservationCard = lazy(() =>
  import('@/components/electrician-tools/site-safety/observations/SafetyObservationCard').then(
    (m) => ({
      default: m.SafetyObservationCard,
    })
  )
);
const ElectricianSiteDiary = lazy(() =>
  import('@/components/electrician-tools/site-safety/site-diary/ElectricianSiteDiary').then(
    (m) => ({
      default: m.ElectricianSiteDiary,
    })
  )
);
const FireWatchTimer = lazy(() =>
  import('@/components/electrician-tools/site-safety/fire-watch/FireWatchTimer').then((m) => ({
    default: m.FireWatchTimer,
  }))
);
const SafetyAlertsFeed = lazy(() =>
  import('@/components/electrician-tools/site-safety/alerts/SafetyAlertsFeed').then((m) => ({
    default: m.SafetyAlertsFeed,
  }))
);
const SafetyResourceLibrary = lazy(() =>
  import('@/components/electrician-tools/site-safety/resources/SafetyResourceLibrary').then(
    (m) => ({
      default: m.SafetyResourceLibrary,
    })
  )
);

// Animation variants (spring-based, matching ElectricalHub)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

// Skeleton loader for lazy components
const ToolLoader = SectionSkeleton;

// Stats card for the safety dashboard bar
function SafetyStatCard({ label, value, icon: Icon, variant }: {
  label: string;
  value: number;
  icon: LucideIcon;
  variant?: 'success' | 'danger';
}) {
  const accentColor = variant === 'success' ? 'text-green-500'
    : variant === 'danger' ? 'text-red-500' : 'text-orange-400';
  return (
    <div className="rounded-xl p-3 sm:p-4 bg-white/[0.04] border border-white/[0.06] transition-colors duration-150">
      <div className="flex flex-col items-start text-left">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Icon className={`h-3.5 w-3.5 ${accentColor}`} />
          <p className="text-[11px] sm:text-xs text-white">{label}</p>
        </div>
        <span className={`text-xl sm:text-2xl font-bold tracking-tight ${accentColor}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

// Section header matching ElectricalHub/BusinessHub pattern
function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
      {title}
    </h2>
  );
}

const SiteSafety = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<string | null>(null);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  // Data for dashboard
  const { stats: dashboardStats, isLoading: dashboardLoading } = useSafetyDashboardStats();
  const { data: recentDocuments } = useRecentDocuments();
  const { data: streakData } = useSafetyStreak();
  const { data: trendsData } = useSafetyTrends();
  const { overdueItems: equipmentOverdue, dueSoonItems: equipmentDueSoon } = useSafetyEquipment();
  const { data: coshhOverdue = [] } = useCOSHHOverdueReviews();
  const { data: coshhUpcoming = [] } = useCOSHHUpcomingReviews();
  const { data: weeklySummary, isLoading: weeklyLoading } = useWeeklySafetySummary();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'briefings') {
      setActiveView('team-briefing');
    } else if (tab === 'saved-rams' || tab === 'documents') {
      setActiveView('documents');
    }
  }, [searchParams]);

  const equipmentBadge = dashboardStats.equipmentDue + dashboardStats.equipmentOverdue;

  const renderToolContent = () => {
    switch (activeView) {
      case 'ai-rams':
        return <AIRAMSGenerator onBack={() => setActiveView(null)} />;
      case 'integrated-rams':
        return <IntegratedRAMSGenerator />;
      case 'rams':
        return <RAMSGenerator />;
      case 'method-statement':
        return <MethodStatementGenerator />;
      case 'hazard-database':
        return <EnhancedHazardDatabase />;
      case 'photo-docs':
        return <PhotoDocumentation onBack={() => setActiveView(null)} />;
      case 'team-briefing':
        return <TeamBriefingTemplates />;
      case 'near-miss':
        return <NearMissReporting />;
      case 'equipment':
        return <SafetyEquipmentTracker />;
      case 'emergency':
        return <EmergencyProcedures />;
      case 'permit-to-work':
        return <PermitToWork onBack={() => setActiveView(null)} />;
      case 'coshh':
        return <COSHHAssessmentBuilder onBack={() => setActiveView(null)} />;
      case 'inspection-checklists':
        return <InspectionChecklists onBack={() => setActiveView(null)} />;
      case 'accident-book':
        return <DigitalAccidentBook onBack={() => setActiveView(null)} />;
      case 'safety-templates':
        return <SafetyTemplateLibrary onBack={() => setActiveView(null)} />;
      case 'safe-isolation':
        return <SafeIsolationRecord onBack={() => setActiveView(null)} />;
      case 'pre-use-checks':
        return <PreUseCheckTool onBack={() => setActiveView(null)} />;
      case 'safety-observations':
        return <SafetyObservationCard onBack={() => setActiveView(null)} />;
      case 'site-diary':
        return <ElectricianSiteDiary onBack={() => setActiveView(null)} />;
      case 'fire-watch':
        return <FireWatchTimer onBack={() => setActiveView(null)} />;
      case 'safety-alerts':
        return <SafetyAlertsFeed onBack={() => setActiveView(null)} />;
      case 'safety-resources':
        return <SafetyResourceLibrary onBack={() => setActiveView(null)} />;
      case 'documents':
        return <DocumentHub onBack={() => setActiveView(null)} />;
      default:
        return null;
    }
  };

  if (activeView) {
    // Full-width views render without max-width container
    const isFullWidth =
      activeView === 'equipment' ||
      activeView === 'photo-docs' ||
      activeView === 'ai-rams' ||
      activeView === 'permit-to-work' ||
      activeView === 'coshh' ||
      activeView === 'inspection-checklists' ||
      activeView === 'accident-book' ||
      activeView === 'safety-templates' ||
      activeView === 'safe-isolation' ||
      activeView === 'pre-use-checks' ||
      activeView === 'safety-observations' ||
      activeView === 'site-diary' ||
      activeView === 'fire-watch' ||
      activeView === 'safety-alerts' ||
      activeView === 'safety-resources' ||
      activeView === 'documents';

    return (
      <RAMSProvider>
        <div className="bg-background animate-fade-in">
          {isFullWidth ? (
            // Edge-to-edge layout for native mobile feel
            <Suspense fallback={<ToolLoader />}>{renderToolContent()}</Suspense>
          ) : (
            // Standard contained layout for other views
            <div className="px-4 py-4 sm:py-6">
              <div className="mb-4 sm:mb-6">
                <button
                  onClick={() => setActiveView(null)}
                  className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="text-sm font-medium">Back to Safety Tools</span>
                </button>
              </div>
              <Suspense fallback={<ToolLoader />}>{renderToolContent()}</Suspense>
            </div>
          )}
        </div>
      </RAMSProvider>
    );
  }

  return (
    <RAMSProvider>
      <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
          <div className="px-4 py-2">
            <button
              onClick={() => navigate('/electrician')}
              className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Electrician Hub</span>
            </button>
          </div>
        </div>

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-4 py-4 space-y-6"
        >
          {/* Glass Hero Header */}
          <motion.div variants={itemVariants}>
            <div className="relative overflow-hidden glass-premium rounded-2xl glow-yellow">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400" />
              <div className="absolute top-0 right-0 w-40 sm:w-56 h-40 sm:h-56 bg-orange-400/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="relative z-10 p-5 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                    <Shield className="h-7 w-7 text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white mb-0.5">Site Safety</p>
                    <h1 className="text-xl sm:text-2xl font-bold text-orange-400 tracking-tight">
                      RAMS & Compliance
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Documents */}
          {recentDocuments && recentDocuments.length > 0 && (
            <motion.section variants={itemVariants} className="space-y-3">
              <SectionHeader title="Recent Documents" />
              <motion.div variants={containerVariants} className="grid grid-cols-2 gap-3">
                {recentDocuments.slice(0, 2).map((doc) => {
                  const d = new Date(doc.date);
                  const now = new Date();
                  const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
                  const dateLabel = diff === 0 ? 'Today' : diff === 1 ? 'Yesterday' : diff < 7 ? `${diff}d ago` : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
                  return (
                    <BusinessCard
                      key={`${doc.type}-${doc.id}`}
                      title={doc.title}
                      description={doc.type}
                      icon={FileText}
                      onClick={() => setActiveView('documents')}
                      variant="compact"
                      accentColor="from-amber-400 via-yellow-400 to-orange-400"
                      iconColor="text-amber-400"
                      iconBg="bg-amber-500/10 border border-amber-500/20"
                      liveSubtitle={dateLabel}
                    />
                  );
                })}
              </motion.div>
            </motion.section>
          )}

          {/* Core Tools */}
          <motion.section variants={itemVariants} className="space-y-3">
            <SectionHeader title="Core Tools" />
            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-3">
              <BusinessCard
                title="RAMS Generator"
                description="AI-powered risk assessments"
                icon={Sparkles}
                onClick={() => setActiveView('ai-rams')}
                variant="hero"
                accentColor="from-orange-400 via-red-400 to-rose-500"
                iconColor="text-orange-400"
                iconBg="bg-orange-500/10 border border-orange-500/20"
                badge="AI"
              />
              <BusinessCard
                title="Documents Hub"
                description="All safety documents in one place"
                icon={FolderOpen}
                onClick={() => setActiveView('documents')}
                variant="hero"
                accentColor="from-purple-400 via-violet-400 to-indigo-400"
                iconColor="text-purple-400"
                iconBg="bg-purple-500/10 border border-purple-500/20"
              />
              <div className="col-span-2">
                <BusinessCard
                  title="Safety Templates"
                  description="UK electrical safety document templates"
                  icon={Library}
                  onClick={() => setActiveView('safety-templates')}
                  variant="hero"
                  accentColor="from-teal-400 via-cyan-400 to-blue-400"
                  iconColor="text-teal-400"
                  iconBg="bg-teal-500/10 border border-teal-500/20"
                  badge="New"
                />
              </div>
            </motion.div>
          </motion.section>

          {/* Safety & Recording */}
          <motion.section variants={itemVariants} className="space-y-3">
            <SectionHeader title="Safety & Recording" />
            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-3">
              <BusinessCard
                title="Hazard Database"
                description="Comprehensive electrical hazard info"
                icon={Shield}
                onClick={() => setActiveView('hazard-database')}
                accentColor="from-blue-400 via-blue-500 to-indigo-400"
                iconColor="text-blue-400"
                iconBg="bg-blue-500/10 border border-blue-500/20"
              />
              <BusinessCard
                title="Photo Documentation"
                description="Document safety conditions on site"
                icon={Camera}
                onClick={() => setActiveView('photo-docs')}
                accentColor="from-emerald-400 via-green-400 to-teal-400"
                iconColor="text-emerald-400"
                iconBg="bg-emerald-500/10 border border-emerald-500/20"
              />
              <BusinessCard
                title="Team Briefing"
                description="Pre-work safety briefings & toolbox talks"
                icon={Users}
                onClick={() => setActiveView('team-briefing')}
                accentColor="from-purple-400 via-violet-400 to-indigo-400"
                iconColor="text-purple-400"
                iconBg="bg-purple-500/10 border border-purple-500/20"
                liveSubtitle={dashboardStats.upcomingBriefings > 0 ? `${dashboardStats.upcomingBriefings} upcoming` : undefined}
              />
              <BusinessCard
                title="Near Miss Reports"
                description="Report and track safety incidents"
                icon={AlertTriangle}
                onClick={() => setActiveView('near-miss')}
                accentColor="from-red-400 via-rose-400 to-pink-400"
                iconColor="text-red-400"
                iconBg="bg-red-500/10 border border-red-500/20"
              />
              <BusinessCard
                title="Safety Observations"
                description="Log positive behaviours and improvements"
                icon={Eye}
                onClick={() => setActiveView('safety-observations')}
                accentColor="from-lime-400 via-green-400 to-emerald-400"
                iconColor="text-lime-400"
                iconBg="bg-lime-500/10 border border-lime-500/20"
              />
              <BusinessCard
                title="Site Diary"
                description="Professional daily log for CDM compliance"
                icon={CalendarDays}
                onClick={() => setActiveView('site-diary')}
                accentColor="from-violet-400 via-purple-400 to-indigo-400"
                iconColor="text-violet-400"
                iconBg="bg-violet-500/10 border border-violet-500/20"
              />
            </motion.div>
          </motion.section>

          {/* Compliance & Permits */}
          <motion.section variants={itemVariants} className="space-y-3">
            <SectionHeader title="Compliance & Permits" />
            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-3">
              <BusinessCard
                title="Permit to Work"
                description="Issue and manage work permits"
                icon={Lock}
                onClick={() => setActiveView('permit-to-work')}
                accentColor="from-amber-400 via-amber-500 to-orange-400"
                iconColor="text-amber-400"
                iconBg="bg-amber-500/10 border border-amber-500/20"
                liveSubtitle={dashboardStats.activePermits > 0 ? `${dashboardStats.activePermits} active` : undefined}
              />
              <BusinessCard
                title="COSHH Assessments"
                description="Chemical substance hazard assessments"
                icon={FlaskConical}
                onClick={() => setActiveView('coshh')}
                accentColor="from-green-400 via-emerald-400 to-teal-400"
                iconColor="text-green-400"
                iconBg="bg-green-500/10 border border-green-500/20"
                liveSubtitle={dashboardStats.coshhOverdueReviews > 0 ? `${dashboardStats.coshhOverdueReviews} overdue` : undefined}
              />
              <BusinessCard
                title="Inspection Checklists"
                description="Standardised safety inspection forms"
                icon={ClipboardCheck}
                onClick={() => setActiveView('inspection-checklists')}
                accentColor="from-indigo-400 via-indigo-500 to-blue-400"
                iconColor="text-indigo-400"
                iconBg="bg-indigo-500/10 border border-indigo-500/20"
              />
              <BusinessCard
                title="Accident Book"
                description="RIDDOR-compliant incident records"
                icon={BookOpen}
                onClick={() => setActiveView('accident-book')}
                accentColor="from-red-500 via-rose-500 to-pink-400"
                iconColor="text-red-400"
                iconBg="bg-red-500/10 border border-red-500/20"
                liveSubtitle={dashboardStats.accidentCount30Days > 0 ? `${dashboardStats.accidentCount30Days} this month` : undefined}
              />
              <BusinessCard
                title="Safe Isolation (GS38)"
                description="Step-by-step GS38 isolation records"
                icon={Zap}
                onClick={() => setActiveView('safe-isolation')}
                accentColor="from-red-400 via-orange-400 to-amber-400"
                iconColor="text-red-400"
                iconBg="bg-red-500/10 border border-red-500/20"
              />
              <BusinessCard
                title="Pre-Use Checks"
                description="PUWER 1998 equipment inspection"
                icon={ClipboardCheck}
                onClick={() => setActiveView('pre-use-checks')}
                accentColor="from-sky-400 via-blue-400 to-indigo-400"
                iconColor="text-sky-400"
                iconBg="bg-sky-500/10 border border-sky-500/20"
              />
              <div className="col-span-2">
                <BusinessCard
                  title="Fire Watch"
                  description="Hot work fire watch timer and checklist"
                  icon={Flame}
                  onClick={() => setActiveView('fire-watch')}
                  accentColor="from-orange-500 via-amber-400 to-yellow-400"
                  iconColor="text-orange-400"
                  iconBg="bg-orange-500/10 border border-orange-500/20"
                />
              </div>
            </motion.div>
          </motion.section>

          {/* Resources & Equipment */}
          <motion.section variants={itemVariants} className="space-y-3">
            <SectionHeader title="Resources & Equipment" />
            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-3">
              <BusinessCard
                title="Equipment Tracker"
                description="Track PPE and safety equipment"
                icon={Wrench}
                onClick={() => setActiveView('equipment')}
                variant="compact"
                accentColor="from-cyan-400 via-teal-400 to-emerald-400"
                iconColor="text-cyan-400"
                iconBg="bg-cyan-500/10 border border-cyan-500/20"
                liveSubtitle={equipmentBadge > 0 ? `${equipmentBadge} due` : 'All clear'}
              />
              <BusinessCard
                title="Emergency Procedures"
                description="Quick access to emergency protocols"
                icon={Phone}
                onClick={() => setActiveView('emergency')}
                variant="compact"
                accentColor="from-pink-400 via-rose-400 to-red-400"
                iconColor="text-pink-400"
                iconBg="bg-pink-500/10 border border-pink-500/20"
              />
              <BusinessCard
                title="Safety Alerts"
                description="Latest safety alerts and industry notices"
                icon={Bell}
                onClick={() => setActiveView('safety-alerts')}
                variant="compact"
                accentColor="from-rose-400 via-red-400 to-pink-400"
                iconColor="text-rose-400"
                iconBg="bg-rose-500/10 border border-rose-500/20"
              />
              <BusinessCard
                title="Safety Resources"
                description="Guidance notes, posters, and HSE publications"
                icon={FolderArchive}
                onClick={() => setActiveView('safety-resources')}
                variant="compact"
                accentColor="from-slate-400 via-gray-400 to-zinc-400"
                iconColor="text-slate-400"
                iconBg="bg-slate-500/10 border border-slate-500/20"
              />
            </motion.div>
          </motion.section>

          {/* Stats Bar */}
          <motion.section variants={itemVariants}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <SafetyStatCard label="Documents" value={dashboardStats.totalDocuments} icon={FileText} />
              <SafetyStatCard
                label="Equipment Due"
                value={dashboardStats.equipmentDue + dashboardStats.equipmentOverdue}
                icon={Wrench}
                variant={dashboardStats.equipmentOverdue > 0 ? 'danger' : 'success'}
              />
              <SafetyStatCard
                label="Safety Score"
                value={weeklySummary?.safetyScore ?? 0}
                icon={Shield}
                variant={(weeklySummary?.safetyScore ?? 0) >= 80 ? 'success' : (weeklySummary?.safetyScore ?? 0) >= 60 ? undefined : 'danger'}
              />
              <SafetyStatCard label="Active Permits" value={dashboardStats.activePermits} icon={Lock} />
            </div>
          </motion.section>

          {/* Collapsible Alerts Section */}
          <motion.section variants={itemVariants}>
            <Collapsible open={alertsOpen} onOpenChange={setAlertsOpen}>
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] touch-manipulation h-14 active:bg-white/[0.06] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <h2 className="text-base font-bold text-white">Alerts</h2>
                    {equipmentOverdue.length + coshhOverdue.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="bg-red-500/20 text-red-400 border-red-500/30 text-xs"
                      >
                        {equipmentOverdue.length + coshhOverdue.length} Overdue
                      </Badge>
                    )}
                  </div>
                  <motion.div
                    animate={{ rotate: alertsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 text-white" />
                  </motion.div>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-3 space-y-3">
                  <EquipmentAlertsCard
                    overdueItems={equipmentOverdue}
                    dueSoonItems={equipmentDueSoon}
                    onTap={() => setActiveView('equipment')}
                  />
                  <COSHHAlertsCard
                    overdueAssessments={coshhOverdue}
                    upcomingAssessments={coshhUpcoming}
                    onTap={() => setActiveView('coshh')}
                    onRenew={() => setActiveView('coshh')}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </motion.section>

          {/* Collapsible Analytics & Insights Section */}
          <motion.section variants={itemVariants}>
            <Collapsible open={analyticsOpen} onOpenChange={setAnalyticsOpen}>
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] touch-manipulation h-14 active:bg-white/[0.06] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                    <h2 className="text-base font-bold text-white">Analytics & Insights</h2>
                    {weeklySummary?.safetyScore != null && (
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          weeklySummary.safetyScore >= 80
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : weeklySummary.safetyScore >= 60
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}
                      >
                        Score: {weeklySummary.safetyScore}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-white" />
                    <motion.div
                      animate={{ rotate: analyticsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 text-white" />
                    </motion.div>
                  </div>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-3 space-y-3">
                  <SafetyDashboard
                    stats={dashboardStats}
                    isLoading={dashboardLoading}
                    onCardTap={(section) => setActiveView(section)}
                    overrideScore={
                      trendsData?.scoreBreakdown
                        ? trendsData.scoreBreakdown.reduce((sum, b) => sum + b.score, 0)
                        : undefined
                    }
                  />

                  {streakData && <SafetyStreakCard streak={streakData} />}

                  <WeeklySummaryCard
                    stats={dashboardStats}
                    weekOverWeekChange={trendsData?.weekOverWeekChange}
                  />

                  <WeeklyReportCard summary={weeklySummary} isLoading={weeklyLoading} />

                  {trendsData && <SafetyTrendsCard trends={trendsData} />}

                  {trendsData?.scoreBreakdown && (
                    <ScoreBreakdownCard breakdown={trendsData.scoreBreakdown} />
                  )}

                  <SignatureTrackingDashboard onTap={(docType) => setActiveView(docType)} />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </motion.section>
        </motion.main>
      </div>
    </RAMSProvider>
  );
};

export default SiteSafety;
