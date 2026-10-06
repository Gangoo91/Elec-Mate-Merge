/**
 * SiteSafety — editorial redesign matching ElectricianHub / CollegeDashboard.
 *
 * Sticky text-only masthead, date-eyebrow Hero with safety verdict + CTA,
 * `01 · AT A GLANCE` HeadlineStats strip, then numbered hairline tool grids:
 *   02 · RECENT (when there are saved docs)
 *   03 · CORE TOOLS
 *   04 · SAFETY & RECORDING
 *   05 · COMPLIANCE & PERMITS
 *   06 · RESOURCES
 *
 * Drops the previous BusinessCard chrome, alert/analytics collapsibles. Score
 * lives in the stats strip; equipment + COSHH alerts surface as `meta` text on
 * their cards. Active-view state machine for individual tools is unchanged.
 */
import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubToolGrid,
  HubAlertLine,
  HubKpi,
  HubQuickStart,
  HubWorkList,
  HubSectionHeading,
  type HubTool,
  type HubQuickAction,
  type HubWorkItem,
} from '@/components/hub/HubPrimitives';
import { useSafeIsolationRecords } from '@/hooks/useSafeIsolationRecords';
import { useRecentGeneratedRams } from '@/hooks/useRecentGeneratedRams';
import { useBriefingsAwaitingSignatures } from '@/hooks/useBriefingsAwaitingSignatures';
import { useSafetyAlerts } from '@/hooks/useSafetyAlerts';
import { safeReturnTo, type SafetyToolLaunch } from '@/utils/safety-launch';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { SafetyConnectionNotice } from '@/components/electrician-tools/site-safety/common/SafetyConnectionNotice';

import { RAMSProvider } from '@/components/electrician-tools/site-safety/rams/RAMSContext';
import { SectionSkeleton } from '@/components/ui/page-skeleton';
import { useSafetyDashboardStats, useRecentDocuments } from '@/hooks/useSafetyDashboardStats';
import { SafetyScoreCard } from '@/components/electrician-tools/site-safety/SafetyScoreCard';
import { useFireWatchFollowUpCheck } from '@/hooks/useFireWatchRecords';
import { useAllSafetyDocuments } from '@/hooks/useAllSafetyDocuments';
import { SafetyScoreSheet } from '@/components/electrician-tools/site-safety/SafetyScoreSheet';
import { useSafetyEquipment } from '@/hooks/useSafetyEquipment';
import { useCOSHHOverdueReviews } from '@/hooks/useCOSHH';
import { useWeeklySafetySummary } from '@/hooks/useWeeklySafetySummary';

// ─────────────────────────────────────────────────────────────────────────
// Lazy-loaded tool components (full-page sub-views)
// ─────────────────────────────────────────────────────────────────────────

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
    (m) => ({ default: m.SafetyTemplateLibrary })
  )
);
const SafeIsolationRecord = lazy(() =>
  import('@/components/electrician-tools/site-safety/safe-isolation/SafeIsolationRecord').then(
    (m) => ({ default: m.SafeIsolationRecord })
  )
);
const PreUseCheckTool = lazy(() =>
  import('@/components/electrician-tools/site-safety/pre-use-checks/PreUseCheckTool').then((m) => ({
    default: m.PreUseCheckTool,
  }))
);
const SafetyObservationCard = lazy(() =>
  import('@/components/electrician-tools/site-safety/observations/SafetyObservationCard').then(
    (m) => ({ default: m.SafetyObservationCard })
  )
);
const ElectricianSiteDiary = lazy(() =>
  import('@/components/electrician-tools/site-safety/site-diary/ElectricianSiteDiary').then(
    (m) => ({ default: m.ElectricianSiteDiary })
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
    (m) => ({ default: m.SafetyResourceLibrary })
  )
);

const ToolLoader = SectionSkeleton;

// ─────────────────────────────────────────────────────────────────────────
// Editorial helpers — same pattern as ElectricianHub
// ─────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────
// A tool entry, as this page has always modelled it: a click handler rather
// than a route, because every tool opens in place via setActiveView.
// ─────────────────────────────────────────────────────────────────────────

interface ToolCard {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  onClick: () => void;
  meta?: string;
  alert?: boolean;
}

/**
 * ToolCard → HubTool.
 *
 * `meta` was a single line doing two jobs. Six entries carried a real figure
 * ("3 overdue", "12 saved"); the other fourteen carried a verb — "Start a
 * RAMS", "Browse hazards", "Capture" — which is the card's own title restated
 * as an instruction, printed where every other hub shows live data.
 *
 * So a figure becomes the card's value and everything else is dropped: the
 * description already says what the tool does, and a card is either reporting
 * or inviting, never both.
 */
const NUMERIC_META = /^([\d,.]+)\s+(.+)$/;

/**
 * Recent documents carry a DATE in `meta` ("14 Apr"), not a count — and
 * "14 Apr" matches the numeric pattern, so the generic mapper rendered "14"
 * as the card's headline figure with "Apr" as its unit. A date is not a
 * metric; it goes in the line that says what the card is.
 */
const recentToHubTool = (c: ToolCard): HubTool => ({
  id: c.id,
  title: c.title,
  description: [c.eyebrow, c.meta].filter(Boolean).join(' · '),
  onClick: c.onClick,
});

const toHubTool = (c: ToolCard): HubTool => {
  const m = c.meta ? NUMERIC_META.exec(c.meta) : null;
  return {
    id: c.id,
    title: c.title,
    description: c.description,
    onClick: c.onClick,
    value: m ? m[1] : undefined,
    valueLabel: m ? m[2] : undefined,
    alert: c.alert,
  };
};

/** Older links used `?tab=`; keep them working. */
const LEGACY_TAB: Record<string, string> = {
  briefings: 'team-briefing',
  'saved-rams': 'documents',
  documents: 'documents',
};

/** A recent record opens the tool that holds it, not a generic list. */
const TOOL_FOR_RECENT: Record<string, string> = {
  rams: 'documents',
  permit: 'permit-to-work',
  inspection: 'inspection-checklists',
  coshh: 'coshh',
  accident: 'accident-book',
  briefing: 'team-briefing',
};

const RECENT_TYPE_LABEL: Record<string, string> = {
  rams: 'RAMS',
  permit: 'Permit',
  inspection: 'Inspection',
  coshh: 'COSHH',
  accident: 'Accident book',
  briefing: 'Briefing',
};

/** The RAMS input form's autosave (AIRAMSInput INPUT_DRAFT_KEY), 48h life. */
function readRamsInputDraft(): { name: string; savedAt: number } | null {
  try {
    const raw = localStorage.getItem('rams-input-draft-v1');
    if (!raw) return null;
    const d = JSON.parse(raw);
    if (!d?.savedAt || Date.now() - d.savedAt > 48 * 3600 * 1000) return null;
    const name = String(d.projectInfo?.projectName || '').trim();
    const desc = String(d.jobDescription || '').trim();
    if (!name && !desc) return null;
    return {
      name: name || (desc.length > 50 ? `${desc.slice(0, 47)}…` : desc),
      savedAt: d.savedAt,
    };
  } catch {
    return null;
  }
}

const ago = (iso: string | number) => {
  const d = new Date(iso);
  const diff = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (diff <= 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const SiteSafety = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [scoreSheetOpen, setScoreSheetOpen] = useState(false);

  /*
   * The open tool lives in the URL (`?tool=`), not in component state. In
   * state, a refresh dropped you back on this page mid-record, the phone's
   * Back gesture left Site Safety altogether, and nothing could link straight
   * to a tool — so "Create a permit" on a job had nowhere to point.
   */
  const activeView = searchParams.get('tool') || LEGACY_TAB[searchParams.get('tab') ?? ''] || null;
  const returnTo = safeReturnTo(searchParams.get('returnTo'));
  /*
   * `new=1` is stripped from the URL straight away (below), but the tools are
   * lazy chunks: on a cold load the strip ran before the tool had mounted, so
   * it mounted with startNew false and "Safe isolation" from a job opened the
   * list instead of the form. Remember the instruction against the tool it
   * was for until we leave that tool.
   */
  const startNewFor = useRef<string | null>(null);
  if (searchParams.get('new') === '1' && activeView) startNewFor.current = activeView;
  if (!activeView) startNewFor.current = null;
  const launch: SafetyToolLaunch = {
    jobId: searchParams.get('projectId') || undefined,
    startNew: !!activeView && startNewFor.current === activeView,
    siteAddress: searchParams.get('location') || undefined,
    siteName: searchParams.get('title') || undefined,
  };
  // `new=1` is a one-shot instruction: modules read it once on mount. Drop it
  // from the URL so a refresh shows the record list, not a second blank form.
  useEffect(() => {
    if (searchParams.get('new') !== '1') return;
    const next = new URLSearchParams(searchParams);
    next.delete('new');
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  // Pushed from this page → Back pops history; arrived by link → strip the param.
  const openedHere = useRef(false);
  const { isOnline } = useNetworkStatus();
  const setActiveView = (view: string | null) => {
    if (view) {
      openedHere.current = true;
      setSearchParams({ tool: view });
      window.scrollTo(0, 0);
      return;
    }
    if (returnTo) {
      navigate(returnTo);
      return;
    }
    if (openedHere.current) {
      openedHere.current = false;
      navigate(-1);
      return;
    }
    setSearchParams({}, { replace: true });
  };

  const { stats: dashboardStats } = useSafetyDashboardStats();
  // Mounted at the hub, not inside the Fire Watch module — the whole point of
  // the two-hour check is that everyone has left the area by then. Also writes
  // to the app bell so it survives the app being closed when it falls due.
  useFireWatchFollowUpCheck();
  const { data: recentDocuments } = useRecentDocuments();
  // Real document count across all modules — same source the Documents
  // page reads from, so the hub stat agrees with what the user sees inside.
  const { data: allDocuments = [] } = useAllSafetyDocuments();
  const totalDocuments = allDocuments?.length ?? 0;
  const { overdueItems: equipmentOverdue, dueSoonItems: equipmentDueSoon } = useSafetyEquipment();
  const { data: coshhOverdue = [] } = useCOSHHOverdueReviews();
  const { data: weeklySummary, isLoading: weeklyLoading } = useWeeklySafetySummary();

  const { data: isolationRecords } = useSafeIsolationRecords();
  const { data: recentRams = [] } = useRecentGeneratedRams(3);
  const ramsInputDraft = readRamsInputDraft();
  const { data: awaiting } = useBriefingsAwaitingSignatures();
  // Notices about kit that reached buyers, published in the last 7 days.
  const { data: alerts } = useSafetyAlerts();
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
  const newAlerts = (alerts ?? []).filter(
    (a) => a.date_published >= weekAgo && !/rejected at the border/i.test(a.corrective_action ?? '')
  ).length;

  const equipmentDueCount = equipmentOverdue.length + equipmentDueSoon.length;

  /*
   * The hero is gone, and with it the rotating slogan.
   *
   * It printed a two-tone headline picked from a pool by hour and day-of-year
   * — "Watch the volts.", "Safety is the spec." — over a verdict paragraph
   * that restated the stat band directly beneath it, then a CTA duplicating a
   * tool card further down. Roughly 300px of the first screen, none of it
   * information. What was load-bearing was knowing whether anything is
   * overdue, and that is a KPI, not a slogan.
   */
  const safetyScore = weeklySummary?.safetyScore ?? null;

  // Tool grids
  const recentCards: ToolCard[] = (recentDocuments ?? []).slice(0, 3).map((doc) => {
    const d = new Date(doc.date);
    const now = new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
    const dateLabel =
      diff === 0
        ? 'Today'
        : diff === 1
          ? '1d ago'
          : diff < 7
            ? `${diff}d ago`
            : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    return {
      id: `recent-${doc.type}-${doc.id}`,
      eyebrow: RECENT_TYPE_LABEL[doc.type] ?? doc.type,
      title: doc.title,
      description: '',
      meta: dateLabel,
      onClick: () => setActiveView(TOOL_FOR_RECENT[doc.type] ?? 'documents'),
    };
  });

  const coreTools: ToolCard[] = [
    {
      id: 'ai-rams',
      eyebrow: 'AI',
      title: 'RAMS',
      description: 'Draft a risk assessment and method statement, then review it.',
      onClick: () => navigate('/electrician/site-safety/ai-rams'),
      meta: 'Start a RAMS',
    },
    {
      id: 'documents',
      eyebrow: 'Hub',
      title: 'Documents',
      description: 'Find any saved RAMS, permit, briefing or record.',
      onClick: () => setActiveView('documents'),
      meta: totalDocuments > 0 ? `${totalDocuments} saved` : 'Empty',
    },
    {
      id: 'safety-templates',
      eyebrow: 'Library',
      title: 'Safety Templates',
      description: 'UK electrical safety document templates.',
      onClick: () => setActiveView('safety-templates'),
      meta: 'Browse templates',
    },
  ];

  const recordingTools: ToolCard[] = [
    {
      id: 'hazard-database',
      eyebrow: 'Hazards',
      title: 'Hazard Database',
      description: 'Comprehensive electrical hazard reference.',
      onClick: () => setActiveView('hazard-database'),
      meta: 'Browse hazards',
    },
    {
      id: 'photo-docs',
      eyebrow: 'Photos',
      title: 'Photo Documentation',
      description: 'Document conditions on site with timestamps.',
      onClick: () => setActiveView('photo-docs'),
      meta: 'Capture',
    },
    {
      id: 'team-briefing',
      eyebrow: 'Briefings',
      title: 'Team Briefing',
      description: 'Pre-work safety briefings and toolbox talks.',
      onClick: () => setActiveView('team-briefing'),
      meta:
        dashboardStats.upcomingBriefings > 0
          ? `${dashboardStats.upcomingBriefings} upcoming`
          : 'Schedule one',
    },
    {
      id: 'near-miss',
      eyebrow: 'Incidents',
      title: 'Near Miss',
      description: 'Report and track close-calls before they bite.',
      onClick: () => setActiveView('near-miss'),
      meta: 'Log a near miss',
    },
    {
      id: 'safety-observations',
      eyebrow: 'Behaviour',
      title: 'Safety Observations',
      description: 'Log positive behaviours and improvements seen on site.',
      onClick: () => setActiveView('safety-observations'),
      meta: 'New observation',
    },
    {
      id: 'site-diary',
      eyebrow: 'CDM',
      title: 'Site Diary',
      description: 'Daily log of who was on site, work done and conditions.',
      onClick: () => setActiveView('site-diary'),
      meta: 'Open diary',
    },
  ];

  const complianceTools: ToolCard[] = [
    {
      id: 'permit-to-work',
      eyebrow: 'Permits',
      title: 'Permit to Work',
      description: 'Issue and close permits to work: hot work, confined spaces, isolations.',
      onClick: () => setActiveView('permit-to-work'),
      meta:
        dashboardStats.activePermits > 0
          ? `${dashboardStats.activePermits} active`
          : 'Issue a permit',
    },
    {
      id: 'coshh',
      eyebrow: 'COSHH',
      title: 'COSHH Assessments',
      description: 'Chemical substance hazard assessments.',
      onClick: () => setActiveView('coshh'),
      meta: coshhOverdue.length > 0 ? `${coshhOverdue.length} overdue` : 'All current',
      alert: coshhOverdue.length > 0,
    },
    {
      id: 'inspection-checklists',
      eyebrow: 'Inspections',
      title: 'Inspection Checklists',
      description: 'Standardised safety inspection forms.',
      onClick: () => setActiveView('inspection-checklists'),
      meta: 'Run an inspection',
    },
    {
      id: 'accident-book',
      eyebrow: 'RIDDOR',
      title: 'Accident Book',
      description: 'Record accidents and track what may need reporting under RIDDOR.',
      onClick: () => setActiveView('accident-book'),
      meta:
        dashboardStats.accidentCount30Days > 0
          ? `${dashboardStats.accidentCount30Days} this month`
          : 'No incidents',
    },
    {
      id: 'safe-isolation',
      eyebrow: 'GS38',
      title: 'Safe Isolation',
      description: 'Record each isolation step, your readings and lock-off.',
      onClick: () => setActiveView('safe-isolation'),
      meta: 'New record',
    },
    {
      id: 'pre-use-checks',
      eyebrow: 'PUWER',
      title: 'Pre-Use Checks',
      description: 'Check tools and access kit before use (PUWER).',
      onClick: () => setActiveView('pre-use-checks'),
      meta: 'New check',
    },
    {
      id: 'fire-watch',
      eyebrow: 'Hot work',
      title: 'Fire Watch',
      description: 'Hot-work fire-watch timer and checklist.',
      onClick: () => setActiveView('fire-watch'),
      meta: 'Start watch',
    },
  ];

  const resourceTools: ToolCard[] = [
    {
      id: 'equipment',
      eyebrow: 'PPE',
      title: 'Equipment Tracker',
      description: 'Track PPE and safety equipment inspections.',
      onClick: () => setActiveView('equipment'),
      meta: equipmentDueCount > 0 ? `${equipmentDueCount} due` : 'All clear',
      alert: equipmentOverdue.length > 0,
    },
    {
      id: 'emergency',
      eyebrow: 'Emergency',
      title: 'Emergency Procedures',
      description: 'Quick access to emergency protocols.',
      onClick: () => setActiveView('emergency'),
      meta: 'View protocols',
    },
    {
      id: 'safety-alerts',
      eyebrow: 'Alerts',
      title: 'Safety Alerts',
      description: 'Product recalls and safety alerts for electrical kit, PPE and tools.',
      onClick: () => setActiveView('safety-alerts'),
      meta: newAlerts > 0 ? `${newAlerts} new this week` : 'From GOV.UK, daily',
    },
    {
      id: 'safety-resources',
      eyebrow: 'Resources',
      title: 'Safety Resources',
      description: 'Guidance notes, posters and HSE publications.',
      onClick: () => setActiveView('safety-resources'),
      meta: 'Open library',
    },
  ];

  // ── Active sub-view ──────────────────────────────────────────────────
  const renderToolContent = () => {
    switch (activeView) {
      case 'ai-rams':
        return <AIRAMSGenerator onBack={() => setActiveView(null)} />;
      case 'integrated-rams':
        return <IntegratedRAMSGenerator />;
      case 'rams':
        return <RAMSGenerator />;
      case 'method-statement':
        return <MethodStatementGenerator onBack={() => setActiveView(null)} />;
      case 'hazard-database':
        return <EnhancedHazardDatabase onBack={() => setActiveView(null)} />;
      case 'photo-docs':
        return <PhotoDocumentation onBack={() => setActiveView(null)} />;
      case 'team-briefing':
        return <TeamBriefingTemplates />;
      case 'near-miss':
        return <NearMissReporting onBack={() => setActiveView(null)} launch={launch} />;
      case 'equipment':
        return <SafetyEquipmentTracker onBack={() => setActiveView(null)} />;
      case 'emergency':
        return <EmergencyProcedures onBack={() => setActiveView(null)} />;
      case 'permit-to-work':
        return <PermitToWork onBack={() => setActiveView(null)} launch={launch} />;
      case 'coshh':
        return <COSHHAssessmentBuilder onBack={() => setActiveView(null)} launch={launch} />;
      case 'inspection-checklists':
        return <InspectionChecklists onBack={() => setActiveView(null)} launch={launch} />;
      case 'accident-book':
        return <DigitalAccidentBook onBack={() => setActiveView(null)} launch={launch} />;
      case 'safety-templates':
        return <SafetyTemplateLibrary onBack={() => setActiveView(null)} />;
      case 'safe-isolation':
        return <SafeIsolationRecord onBack={() => setActiveView(null)} launch={launch} />;
      case 'pre-use-checks':
        return <PreUseCheckTool onBack={() => setActiveView(null)} launch={launch} />;
      case 'safety-observations':
        return <SafetyObservationCard onBack={() => setActiveView(null)} launch={launch} />;
      case 'site-diary':
        return <ElectricianSiteDiary onBack={() => setActiveView(null)} launch={launch} />;
      case 'fire-watch':
        return <FireWatchTimer onBack={() => setActiveView(null)} launch={launch} />;
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
    const isFullWidth = [
      'equipment',
      'photo-docs',
      'ai-rams',
      'permit-to-work',
      'coshh',
      'inspection-checklists',
      'accident-book',
      'safety-templates',
      'safe-isolation',
      'pre-use-checks',
      'safety-observations',
      'site-diary',
      'fire-watch',
      'safety-alerts',
      'safety-resources',
      'documents',
      // These draw their own masthead with a back button; the wrapper's
      // "Back to Site Safety" above it made two backs on one screen.
      'hazard-database',
      'emergency',
      'near-miss',
    ].includes(activeView);

    return (
      <RAMSProvider>
        <div className="bg-elec-dark min-h-screen animate-fade-in">
          <SafetyConnectionNotice online={isOnline} />
          {isFullWidth ? (
            <Suspense fallback={<ToolLoader />}>{renderToolContent()}</Suspense>
          ) : (
            <div className="px-4 py-4 sm:py-6 max-w-7xl mx-auto">
              <div className="mb-4 sm:mb-6">
                <button
                  type="button"
                  onClick={() => setActiveView(null)}
                  className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {returnTo ? 'Back to job' : 'Back to Site Safety'}
                  </span>
                </button>
              </div>
              <Suspense fallback={<ToolLoader />}>{renderToolContent()}</Suspense>
            </div>
          )}
        </div>
      </RAMSProvider>
    );
  }

  // ── Default editorial dashboard ──────────────────────────────────────
  /*
   * ── Tool groups ──────────────────────────────────────────────────────
   *
   * Twenty tools in five groups of four. They were 3 / 6 / 7 / 4, and the grid
   * is auto-fit at four tracks — so "SAFETY & RECORDING" drew 4 + 2 and
   * "COMPLIANCE & PERMITS" drew 4 + 3, each leaving a hole on the end.
   *
   * The regrouping is also a better division than the old one, which had
   * "recording" holding both the hazard reference library and the accident
   * book. Now: build the documents, work the day, report what happened,
   * control high-risk work, look things up.
   */
  const byId = new Map(
    [...coreTools, ...recordingTools, ...complianceTools, ...resourceTools].map((c) => [c.id, c])
  );
  const group = (ids: string[]): HubTool[] =>
    ids
      .map((id) => byId.get(id))
      .filter(Boolean)
      .map((c) => toHubTool(c as ToolCard));

  const quickStart: HubQuickAction[] = [
    {
      title: 'Create RAMS',
      description: 'Risk assessment and method statement for a job.',
      onClick: () => navigate('/electrician/site-safety/ai-rams'),
      primary: true,
    },
    {
      title: 'Record safe isolation',
      description: 'Log each step, readings and lock-off.',
      onClick: () => setActiveView('safe-isolation'),
    },
    {
      title: 'Brief the team',
      description: 'Toolbox talk or pre-work briefing, signed off.',
      onClick: () => setActiveView('team-briefing'),
    },
    {
      title: 'Report a near miss',
      description: 'Quick capture with photos.',
      onClick: () => setActiveView('near-miss'),
    },
    {
      title: 'Find a document',
      description:
        totalDocuments > 0
          ? `${totalDocuments} saved, searchable.`
          : 'Everything you save lands here.',
      onClick: () => setActiveView('documents'),
    },
  ];

  /*
   * Only things with a real cost of delay, each from a live count. No item is
   * shown for "nothing to do" — an empty list renders nothing.
   */
  // Isolated = a circuit is locked off now; in progress = a record started and
  // not finished. Different jobs to do, so different lines.
  const isolatedNow = (isolationRecords ?? []).filter((r) => r.status === 'isolated');
  const unfinishedIsolations = (isolationRecords ?? []).filter((r) => r.status === 'in_progress');
  const needsYou: HubWorkItem[] = [];
  if (isolatedNow.length > 0)
    needsYou.push({
      id: 'isolations',
      title:
        isolatedNow.length === 1
          ? 'A circuit is still isolated'
          : `${isolatedNow.length} circuits still isolated`,
      reason: 'Record re-energisation when it is back in service.',
      urgent: true,
      onClick: () => setActiveView('safe-isolation'),
    });
  if (unfinishedIsolations.length > 0)
    needsYou.push({
      id: 'isolations-unfinished',
      title:
        unfinishedIsolations.length === 1
          ? 'An isolation record is unfinished'
          : `${unfinishedIsolations.length} isolation records unfinished`,
      reason: 'Finish the steps, or cancel it if the work did not go ahead.',
      onClick: () => setActiveView('safe-isolation'),
    });
  if (dashboardStats.riddorPendingCount > 0)
    needsYou.push({
      id: 'riddor',
      title: `${dashboardStats.riddorPendingCount} accident${dashboardStats.riddorPendingCount === 1 ? '' : 's'} may need a RIDDOR report`,
      reason: 'Not marked as reported to the HSE yet.',
      urgent: true,
      onClick: () => setActiveView('accident-book'),
    });
  if (dashboardStats.activePermits > 0)
    needsYou.push({
      id: 'permits',
      title: `${dashboardStats.activePermits} permit${dashboardStats.activePermits === 1 ? '' : 's'} live`,
      reason: 'Close each one when the work is finished.',
      onClick: () => setActiveView('permit-to-work'),
    });
  if (awaiting && awaiting.count > 0)
    needsYou.push({
      id: 'briefing-signatures',
      title: `${awaiting.outstanding} ${awaiting.outstanding === 1 ? 'person has' : 'people have'} not signed a briefing`,
      reason: `Across ${awaiting.count} briefing${awaiting.count === 1 ? '' : 's'} in the last 30 days. Share the link or QR.`,
      onClick: () => setActiveView('team-briefing'),
    });
  if (ramsInputDraft)
    needsYou.push({
      id: 'rams-draft',
      title: `Continue RAMS: ${ramsInputDraft.name}`,
      reason: `Not generated yet · started ${ago(ramsInputDraft.savedAt).toLowerCase()}`,
      onClick: () => navigate('/electrician/site-safety/ai-rams'),
    });
  if (coshhOverdue.length > 0)
    needsYou.push({
      id: 'coshh',
      title: `${coshhOverdue.length} COSHH review${coshhOverdue.length === 1 ? '' : 's'} overdue`,
      reason: 'Check the assessment still matches the product and the work.',
      urgent: true,
      onClick: () => setActiveView('coshh'),
    });
  if (equipmentOverdue.length > 0)
    needsYou.push({
      id: 'equipment',
      title: `${equipmentOverdue.length} equipment inspection${equipmentOverdue.length === 1 ? '' : 's'} overdue`,
      reason:
        equipmentDueSoon.length > 0
          ? `${equipmentDueSoon.length} more due soon`
          : 'Inspect before next use.',
      urgent: true,
      onClick: () => setActiveView('equipment'),
    });
  if (dashboardStats.recentInspectionsFailed > 0)
    needsYou.push({
      id: 'inspections',
      title: `${dashboardStats.recentInspectionsFailed} inspection${dashboardStats.recentInspectionsFailed === 1 ? '' : 's'} with failed items`,
      reason: 'Check the remedial actions are done.',
      onClick: () => setActiveView('inspection-checklists'),
    });
  // Urgent first; the list itself is not re-sorted by HubWorkList.
  needsYou.sort((a, b) => Number(!!b.urgent) - Number(!!a.urgent));

  /*
   * Recent: generated RAMS first (they open the editable results page — the
   * only place a RAMS lives before it is exported), then filed records.
   */
  const recentItems: HubTool[] = [
    ...recentRams.map((r) => ({
      id: `gen-rams-${r.id}`,
      title: r.title,
      description: [
        r.status === 'pending' || r.status === 'processing'
          ? 'RAMS · generating'
          : r.issuedVersion
            ? `RAMS · issued v${r.issuedVersion}`
            : 'RAMS · not issued yet',
        ago(r.createdAt),
      ].join(' · '),
      onClick: () => navigate(`/electrician/site-safety/ai-rams/${r.id}`),
    })),
    ...recentCards.filter((c) => !c.id.startsWith('recent-rams-')).map(recentToHubTool),
  ].slice(0, 4);

  const buildTools = group(['ai-rams', 'documents', 'safety-templates', 'hazard-database']);
  const onSiteTools = group(['team-briefing', 'photo-docs', 'site-diary', 'pre-use-checks']);
  const reportingTools = group([
    'near-miss',
    'safety-observations',
    'accident-book',
    'inspection-checklists',
  ]);
  const controlTools = group(['permit-to-work', 'safe-isolation', 'coshh', 'fire-watch']);
  // Safety Alerts is fed daily from GOV.UK product recalls (sync-safety-alerts).
  const referenceTools = group(['equipment', 'emergency', 'safety-alerts', 'safety-resources']);

  return (
    <RAMSProvider>
      <HubPage>
        <HubMasthead section="Electrician" title="Site Safety" backTo="/electrician" />
        <SafetyConnectionNotice online={isOnline} />

        <HubBody>
          {/*
           * Full width, laid out 2x2.
           *
           * This was capped at ~900px on the theory that two columns across the
           * full 1600px body made each card a slab. In front of the actual
           * screen that was the wrong call: the cap left a quarter of the
           * window empty to the right of the cards while the rule under the
           * breadcrumb still ran the full width, so the page read as
           * unfinished rather than composed.
           */}
          <div className="w-full space-y-8 sm:space-y-10">
            {/* The two-hour fire watch check (HSG168) is the one outstanding item
              that, by definition, nobody is on site for — it leads the page. */}
            {dashboardStats.fireWatchFollowUpsDue > 0 && (
              <HubAlertLine
                text={
                  dashboardStats.fireWatchFollowUpsDue === 1
                    ? 'A fire watch needs its two-hour check'
                    : `${dashboardStats.fireWatchFollowUpsDue} fire watches need their two-hour check`
                }
                action="Check"
                onClick={() => setActiveView('fire-watch')}
              />
            )}

            {/*
             * The first screen is for STARTING something. It used to open on a
             * score gauge and four counters — on a phone, no action was visible
             * until the second screen, and then as one of twenty equal cards.
             * These five are the jobs people come here to do.
             */}
            <HubQuickStart label="Start something" items={quickStart} leadSpans compact />

            <HubWorkList items={needsYou} label="Needs you" unit="item" />

            {recentItems.length > 0 && (
              <HubToolGrid label="Recent" cards={recentItems} columns="pair" />
            )}

            <HubToolGrid label="Plan the job" cards={buildTools} columns="pair" />

            <HubToolGrid label="On site" cards={onSiteTools} columns="pair" />

            <HubToolGrid label="Report something" cards={reportingTools} columns="pair" />

            <HubToolGrid label="Permits & control" cards={controlTools} columns="pair" />

            <HubToolGrid label="Kit & reference" cards={referenceTools} columns="pair" />

            {/*
             * The record — figures for reading, not actions. It led the page;
             * now it closes it, after everything you can do.
             */}
            <section className="space-y-3">
              <HubSectionHeading>Your record</HubSectionHeading>
              <SafetyScoreCard
                summary={weeklySummary}
                isLoading={weeklyLoading}
                onClick={() => setScoreSheetOpen(true)}
              />
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <HubKpi
                  label="Days since near miss"
                  value={
                    dashboardStats.daysSinceLastNearMiss == null
                      ? '—'
                      : String(dashboardStats.daysSinceLastNearMiss)
                  }
                  verdict={
                    dashboardStats.daysSinceLastNearMiss == null
                      ? 'None reported yet'
                      : dashboardStats.daysSinceLastNearMiss === 0
                        ? 'One reported today'
                        : 'Since the last report'
                  }
                  context={
                    dashboardStats.totalNearMisses > 0
                      ? `${dashboardStats.totalNearMisses} on record`
                      : undefined
                  }
                  onClick={() => setActiveView('near-miss')}
                />
                <HubKpi
                  label="Documents on file"
                  value={String(totalDocuments)}
                  verdict={totalDocuments > 0 ? 'Across every tool' : 'Nothing saved yet'}
                  onClick={() => setActiveView('documents')}
                />
              </div>
            </section>
          </div>
        </HubBody>
      </HubPage>

      <SafetyScoreSheet
        open={scoreSheetOpen}
        onOpenChange={setScoreSheetOpen}
        summary={weeklySummary}
      />
    </RAMSProvider>
  );
};

export default SiteSafety;
