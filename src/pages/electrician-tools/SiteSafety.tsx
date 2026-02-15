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
  ArrowRight,
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
  ArrowUpDown,
  Bell,
  FolderArchive,
  ChevronDown,
  BarChart3,
} from 'lucide-react';
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
const SavedRAMSLibrary = lazy(() =>
  import('@/components/electrician-tools/site-safety/SavedRAMSLibrary').then((m) => ({
    default: m.SavedRAMSLibrary,
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

// Skeleton loader for lazy components
const ToolLoader = SectionSkeleton;

// Tool color mapping
const toolColors: Record<string, string> = {
  'ai-rams': 'from-orange-400 to-red-500',
  documents: 'from-amber-400 to-yellow-500',
  'saved-rams': 'from-amber-400 to-yellow-500',
  'hazard-database': 'from-blue-400 to-blue-500',
  'photo-docs': 'from-emerald-400 to-green-500',
  'team-briefing': 'from-purple-400 to-purple-500',
  'near-miss': 'from-red-400 to-rose-500',
  equipment: 'from-cyan-400 to-teal-500',
  emergency: 'from-pink-400 to-rose-500',
  'permit-to-work': 'from-amber-400 to-amber-600',
  coshh: 'from-green-400 to-emerald-500',
  'inspection-checklists': 'from-indigo-400 to-indigo-600',
  'accident-book': 'from-red-500 to-rose-600',
  'safety-templates': 'from-teal-400 to-cyan-500',
  'safe-isolation': 'from-red-500 to-orange-500',
  'pre-use-checks': 'from-sky-400 to-blue-500',
  'safety-observations': 'from-lime-400 to-green-500',
  'site-diary': 'from-violet-400 to-purple-500',
  'fire-watch': 'from-orange-500 to-amber-500',
  'safety-alerts': 'from-rose-400 to-red-500',
  'safety-resources': 'from-slate-400 to-gray-500',
};

const SiteSafety = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<string | null>(null);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  // Data for dashboard
  const { stats: dashboardStats, isLoading: dashboardLoading } = useSafetyDashboardStats();
  const { data: recentDocuments, isLoading: isLoadingDocuments } = useRecentDocuments();
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
    }
  }, [searchParams]);

  const primaryTools = [
    {
      id: 'ai-rams',
      title: 'RAMS Generator',
      description: 'Create comprehensive RAMS documentation from your job description',
      icon: FileText,
      badge: 'AI',
    },
    {
      id: 'documents',
      title: 'Documents',
      description: 'All safety documents in one place',
      icon: FolderOpen,
      badge: 'Hub',
    },
    {
      id: 'safety-templates',
      title: 'Safety Templates',
      description: 'UK electrical safety document templates',
      icon: Library,
      badge: 'New',
    },
  ];

  const equipmentBadge = dashboardStats.equipmentDue + dashboardStats.equipmentOverdue;

  const safetyTools = [
    {
      id: 'hazard-database',
      title: 'Hazard Database',
      description: 'Comprehensive electrical hazard information',
      icon: Shield,
      badgeCount: 0,
      badgeUrgent: false,
    },
    {
      id: 'photo-docs',
      title: 'Photo Documentation',
      description: 'Document safety conditions on site',
      icon: Camera,
      badgeCount: 0,
      badgeUrgent: false,
    },
    {
      id: 'team-briefing',
      title: 'Team Briefing',
      description: 'Pre-work safety briefings & toolbox talks',
      icon: Users,
      badgeCount: dashboardStats.upcomingBriefings,
      badgeUrgent: false,
    },
    {
      id: 'near-miss',
      title: 'Near Miss Reports',
      description: 'Report and track safety incidents',
      icon: AlertTriangle,
      badgeCount: 0,
      badgeUrgent: false,
    },
    {
      id: 'equipment',
      title: 'Equipment Tracker',
      description: 'Track PPE and safety equipment',
      icon: Wrench,
      badgeCount: equipmentBadge,
      badgeUrgent: dashboardStats.equipmentOverdue > 0,
    },
    {
      id: 'emergency',
      title: 'Emergency Procedures',
      description: 'Quick access to emergency protocols',
      icon: Phone,
      badgeCount: 0,
      badgeUrgent: false,
    },
    {
      id: 'safety-observations',
      title: 'Safety Observations',
      description: 'Log positive behaviours and improvements',
      icon: Eye,
      badgeCount: 0,
      badgeUrgent: false,
    },
    {
      id: 'site-diary',
      title: 'Site Diary',
      description: 'Professional daily log for CDM compliance',
      icon: CalendarDays,
      badgeCount: 0,
      badgeUrgent: false,
    },
  ];

  const complianceTools = [
    {
      id: 'permit-to-work',
      title: 'Permit to Work',
      description: 'Issue and manage work permits with signatures',
      icon: Lock,
      badge: 'New',
      badgeCount: dashboardStats.activePermits,
      badgeUrgent: false,
    },
    {
      id: 'coshh',
      title: 'COSHH Assessments',
      description: 'Chemical substance hazard assessments',
      icon: FlaskConical,
      badge: 'New',
      badgeCount: dashboardStats.coshhOverdueReviews,
      badgeUrgent: dashboardStats.coshhOverdueReviews > 0,
    },
    {
      id: 'inspection-checklists',
      title: 'Inspection Checklists',
      description: 'Standardised safety inspection forms',
      icon: ClipboardCheck,
      badge: 'New',
      badgeCount: 0,
      badgeUrgent: false,
    },
    {
      id: 'accident-book',
      title: 'Accident Book',
      description: 'RIDDOR-compliant incident records',
      icon: BookOpen,
      badge: 'New',
      badgeCount: dashboardStats.accidentCount30Days,
      badgeUrgent: dashboardStats.accidentCount30Days > 0,
    },
    {
      id: 'safe-isolation',
      title: 'Safe Isolation (GS38)',
      description: 'Step-by-step GS38 isolation records',
      icon: Zap,
      badge: 'New',
      badgeCount: 0,
      badgeUrgent: false,
    },
    {
      id: 'pre-use-checks',
      title: 'Pre-Use Checks',
      description: 'PUWER 1998 equipment inspection checklists',
      icon: ClipboardCheck,
      badge: 'New',
      badgeCount: 0,
      badgeUrgent: false,
    },
    {
      id: 'fire-watch',
      title: 'Fire Watch',
      description: 'Hot work fire watch timer and checklist',
      icon: Flame,
      badge: 'New',
      badgeCount: 0,
      badgeUrgent: false,
    },
  ];

  const additionalTools = [
    {
      id: 'safety-alerts',
      title: 'Safety Alerts',
      description: 'Latest safety alerts and industry notices',
      icon: Bell,
    },
    {
      id: 'safety-resources',
      title: 'Safety Resources',
      description: 'Guidance notes, posters, and HSE publications',
      icon: FolderArchive,
    },
  ];

  const renderToolContent = () => {
    switch (activeView) {
      case 'ai-rams':
        return <AIRAMSGenerator onBack={() => setActiveView(null)} />;
      case 'saved-rams':
        return (
          <div className="space-y-4">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
              <div className="px-4 py-2">
                <button
                  onClick={() => setActiveView(null)}
                  className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="text-sm font-medium">Site Safety</span>
                </button>
              </div>
            </div>
            <div className="px-4 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Saved RAMS Documents</h2>
                <p className="text-white">
                  View and download your previously generated RAMS documentation
                </p>
              </div>
              <SavedRAMSLibrary />
            </div>
          </div>
        );
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
      activeView === 'saved-rams' ||
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
          {/* Hero Header */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <Shield className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Site Safety & RAMS</h1>
              <p className="text-sm text-white">Risk assessments & safety compliance</p>
            </div>
          </motion.div>

          {/* Quick Actions — moved up for immediate access */}
          <motion.section variants={itemVariants}>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {[
                { id: 'ai-rams', label: 'New RAMS', icon: FileText },
                { id: 'team-briefing', label: 'New Briefing', icon: Users },
                { id: 'near-miss', label: 'Report Near Miss', icon: AlertTriangle },
                { id: 'photo-docs', label: 'Take Photo', icon: Camera },
                { id: 'permit-to-work', label: 'New Permit', icon: Lock },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => setActiveView(action.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-full bg-elec-yellow/10 border border-elec-yellow/20 text-elec-yellow text-xs font-semibold whitespace-nowrap touch-manipulation active:scale-[0.97] active:bg-elec-yellow/20 transition-all flex-shrink-0"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </motion.section>

          {/* Essential Tools Section */}
          <motion.section variants={itemVariants} className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
              <h2 className="text-base font-bold text-white">Essential Tools</h2>
              <Badge
                variant="secondary"
                className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs"
              >
                2 Active
              </Badge>
            </div>

            <motion.div variants={containerVariants} className="space-y-2">
              {primaryTools.map((tool) => {
                const IconComponent = tool.icon;
                const gradient = toolColors[tool.id] || 'from-gray-400 to-gray-500';

                return (
                  <motion.button
                    key={tool.id}
                    variants={itemVariants}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveView(tool.id)}
                    className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
                  >
                    <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.08] rounded-2xl group active:bg-white/[0.06] transition-colors">
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          {/* Icon with gradient background */}
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient}`}
                          >
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-[15px] font-bold text-white">{tool.title}</h3>
                              {tool.badge && (
                                <Badge
                                  variant="secondary"
                                  className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-[10px]"
                                >
                                  {tool.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-[13px] text-white line-clamp-1">
                              {tool.description}
                            </p>
                          </div>

                          {/* Arrow indicator */}
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/[0.08] flex items-center justify-center group-active:bg-white/[0.12] transition-colors">
                            <ArrowRight className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.section>

          {/* Compliance Tools Section (NEW) */}
          <motion.section variants={itemVariants} className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <h2 className="text-base font-bold text-white">Compliance Tools</h2>
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-400 border-green-500/30 text-xs"
              >
                {complianceTools.length} Tools
              </Badge>
            </div>

            <motion.div variants={containerVariants} className="space-y-2">
              {complianceTools.map((tool) => {
                const IconComponent = tool.icon;
                const gradient = toolColors[tool.id] || 'from-gray-400 to-gray-500';

                return (
                  <motion.button
                    key={tool.id}
                    variants={itemVariants}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveView(tool.id)}
                    className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 rounded-2xl touch-manipulation"
                  >
                    <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.08] rounded-2xl group active:bg-white/[0.06] transition-colors">
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          {/* Icon with badge */}
                          <div className="relative flex-shrink-0">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient}`}
                            >
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            {tool.badgeCount > 0 && (
                              <span
                                className={`absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                  tool.badgeUrgent
                                    ? 'bg-red-500 text-white'
                                    : 'bg-elec-yellow text-black'
                                }`}
                              >
                                {tool.badgeCount}
                              </span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-[15px] font-bold text-white">{tool.title}</h3>
                              {tool.badge && (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]"
                                >
                                  {tool.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-[13px] text-white line-clamp-1">
                              {tool.description}
                            </p>
                          </div>

                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/[0.08] flex items-center justify-center group-active:bg-white/[0.12] transition-colors">
                            <ArrowRight className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.section>

          {/* Safety Tools Section */}
          <motion.section variants={itemVariants} className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              <h2 className="text-base font-bold text-white">Safety Tools</h2>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/10 text-xs">
                {safetyTools.length} Tools
              </Badge>
            </div>

            <motion.div variants={containerVariants} className="space-y-2">
              {safetyTools.map((tool) => {
                const IconComponent = tool.icon;
                const gradient = toolColors[tool.id] || 'from-gray-400 to-gray-500';

                return (
                  <motion.button
                    key={tool.id}
                    variants={itemVariants}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveView(tool.id)}
                    className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 rounded-2xl touch-manipulation"
                  >
                    <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.08] rounded-2xl group active:bg-white/[0.06] transition-colors">
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          {/* Icon with gradient background + badge */}
                          <div className="relative flex-shrink-0">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient}`}
                            >
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            {tool.badgeCount > 0 && (
                              <span
                                className={`absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                  tool.badgeUrgent
                                    ? 'bg-red-500 text-white'
                                    : 'bg-elec-yellow text-black'
                                }`}
                              >
                                {tool.badgeCount}
                              </span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-[15px] font-bold text-white">{tool.title}</h3>
                            <p className="text-[13px] text-white line-clamp-1">
                              {tool.description}
                            </p>
                          </div>

                          {/* Arrow indicator */}
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/[0.08] flex items-center justify-center group-active:bg-white/[0.12] transition-colors">
                            <ArrowRight className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
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
                    recentDocuments={recentDocuments}
                    isLoadingDocuments={isLoadingDocuments}
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
