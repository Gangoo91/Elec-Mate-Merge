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
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubToolGrid,
  HubKpi,
  HubKpiRow,
  type HubTool,
} from '@/components/hub/HubPrimitives';
import { RAMSProvider } from '@/components/electrician-tools/site-safety/rams/RAMSContext';
import { SectionSkeleton } from '@/components/ui/page-skeleton';
import { useSafetyDashboardStats, useRecentDocuments } from '@/hooks/useSafetyDashboardStats';
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

const SiteSafety = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<string | null>(null);
  const [scoreSheetOpen, setScoreSheetOpen] = useState(false);

  const { stats: dashboardStats } = useSafetyDashboardStats();
  const { data: recentDocuments } = useRecentDocuments();
  // Real document count across all modules — same source the Documents
  // page reads from, so the hub stat agrees with what the user sees inside.
  const { data: allDocuments = [] } = useAllSafetyDocuments();
  const totalDocuments = allDocuments?.length ?? 0;
  const { overdueItems: equipmentOverdue, dueSoonItems: equipmentDueSoon } = useSafetyEquipment();
  const { data: coshhOverdue = [] } = useCOSHHOverdueReviews();
  const { data: weeklySummary } = useWeeklySafetySummary();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'briefings') setActiveView('team-briefing');
    else if (tab === 'saved-rams' || tab === 'documents') setActiveView('documents');
  }, [searchParams]);

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
      eyebrow: doc.type,
      title: doc.title,
      description: 'Open in Documents Hub.',
      meta: dateLabel,
      onClick: () => setActiveView('documents'),
    };
  });

  const coreTools: ToolCard[] = [
    {
      id: 'ai-rams',
      eyebrow: 'AI',
      title: 'RAMS Generator',
      description: 'AI-powered risk assessments and method statements.',
      onClick: () => setActiveView('ai-rams'),
      meta: 'Start a RAMS',
    },
    {
      id: 'documents',
      eyebrow: 'Hub',
      title: 'Documents Hub',
      description: 'Every saved RAMS, permit and assessment in one place.',
      onClick: () => setActiveView('documents'),
      meta:
        totalDocuments > 0
          ? `${totalDocuments} saved`
          : 'Empty',
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
      description: 'Daily site log for CDM compliance.',
      onClick: () => setActiveView('site-diary'),
      meta: 'Open diary',
    },
  ];

  const complianceTools: ToolCard[] = [
    {
      id: 'permit-to-work',
      eyebrow: 'Permits',
      title: 'Permit to Work',
      description: 'Issue and manage live work permits.',
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
      meta:
        coshhOverdue.length > 0
          ? `${coshhOverdue.length} overdue`
          : 'All current',
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
      description: 'RIDDOR-compliant incident records.',
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
      description: 'Step-by-step GS38 isolation records.',
      onClick: () => setActiveView('safe-isolation'),
      meta: 'New record',
    },
    {
      id: 'pre-use-checks',
      eyebrow: 'PUWER',
      title: 'Pre-Use Checks',
      description: 'PUWER 1998 equipment inspection.',
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
      meta:
        equipmentDueCount > 0 ? `${equipmentDueCount} due` : 'All clear',
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
      description: 'Latest industry safety notices.',
      onClick: () => setActiveView('safety-alerts'),
      meta: 'Browse alerts',
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
        return <NearMissReporting onBack={() => setActiveView(null)} />;
      case 'equipment':
        return <SafetyEquipmentTracker onBack={() => setActiveView(null)} />;
      case 'emergency':
        return <EmergencyProcedures onBack={() => setActiveView(null)} />;
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
    ].includes(activeView);

    return (
      <RAMSProvider>
        <div className="bg-elec-dark min-h-screen animate-fade-in">
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
                  <span className="text-sm font-medium">Back to Site Safety</span>
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
    ids.map((id) => byId.get(id)).filter(Boolean).map((c) => toHubTool(c as ToolCard));

  const buildTools = group(['ai-rams', 'documents', 'safety-templates', 'hazard-database']);
  const onSiteTools = group(['team-briefing', 'photo-docs', 'site-diary', 'pre-use-checks']);
  const reportingTools = group([
    'near-miss',
    'safety-observations',
    'accident-book',
    'inspection-checklists',
  ]);
  const controlTools = group(['permit-to-work', 'safe-isolation', 'coshh', 'fire-watch']);
  const referenceTools = group(['equipment', 'emergency', 'safety-alerts', 'safety-resources']);

  return (
    <RAMSProvider>
      <HubPage>
        <HubMasthead section="Electrician" title="Site Safety" backTo="/electrician" />

        <HubBody>
          <HubKpiRow>
            <HubKpi
              accent
              label="Safety score"
              value={safetyScore != null ? String(safetyScore) : '—'}
              sentiment={
                safetyScore == null ? 'neutral' : safetyScore >= 80 ? 'good' : safetyScore >= 60 ? 'neutral' : 'bad'
              }
              verdict={
                safetyScore == null
                  ? 'No data yet'
                  : safetyScore >= 80
                    ? 'Strong'
                    : safetyScore >= 60
                      ? 'Steady'
                      : 'Needs attention'
              }
              onClick={() => setScoreSheetOpen(true)}
            />
            <HubKpi
              label="COSHH overdue"
              value={String(coshhOverdue.length)}
              sentiment={coshhOverdue.length > 0 ? 'bad' : 'neutral'}
              direction={coshhOverdue.length > 0 ? 'up' : 'flat'}
              verdict={coshhOverdue.length > 0 ? 'Review these first' : 'All reviews current'}
              onClick={() => setActiveView('coshh')}
            />
            <HubKpi
              label="Equipment due"
              value={String(equipmentDueCount)}
              sentiment={equipmentOverdue.length > 0 ? 'bad' : 'neutral'}
              verdict={
                equipmentOverdue.length > 0
                  ? 'Inspections overdue'
                  : equipmentDueCount > 0
                    ? 'Due soon'
                    : 'All clear'
              }
              context={
                equipmentOverdue.length > 0 ? `${equipmentOverdue.length} already overdue` : undefined
              }
              onClick={() => setActiveView('equipment')}
            />
            <HubKpi
              label="Permits live"
              value={String(dashboardStats.activePermits)}
              verdict={dashboardStats.activePermits > 0 ? 'Work under permit now' : 'No live permits'}
              context={totalDocuments > 0 ? `${totalDocuments} documents on file` : undefined}
              onClick={() => setActiveView('permit-to-work')}
            />
          </HubKpiRow>

          {recentCards.length > 0 && (
            <HubToolGrid label="Recent" cards={recentCards.map(recentToHubTool)} columns="four" />
          )}

          <HubToolGrid label="Build the documents" cards={buildTools} columns="four" />

          <HubToolGrid label="On site" cards={onSiteTools} columns="four" />

          <HubToolGrid label="Report something" cards={reportingTools} columns="four" />

          <HubToolGrid label="Permits & control" cards={controlTools} columns="four" />

          <HubToolGrid label="Kit & reference" cards={referenceTools} columns="four" />
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
