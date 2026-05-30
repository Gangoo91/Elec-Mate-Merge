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
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
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

const partOfDay = (): 'MORNING' | 'AFTERNOON' | 'EVENING' => {
  const h = new Date().getHours();
  if (h < 12) return 'MORNING';
  if (h < 18) return 'AFTERNOON';
  return 'EVENING';
};

const dateEyebrow = (): string => {
  const d = new Date();
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' }).toUpperCase();
  const day = d.getDate();
  const month = d.toLocaleDateString('en-GB', { month: 'long' }).toUpperCase();
  return `${weekday} · ${day} ${month} · ${partOfDay()}`;
};

// ─────────────────────────────────────────────────────────────────────────
// Sticky masthead — College pattern
// ─────────────────────────────────────────────────────────────────────────

const PageMasthead = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center h-12 gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => navigate('/electrician')}
            className="text-[12.5px] font-medium text-white hover:text-white transition-colors touch-manipulation whitespace-nowrap"
          >
            ← Back
          </button>
          <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white hidden sm:inline">
              Electrician
            </span>
            <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
            <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
              Site Safety
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// Hero — date eyebrow + thematic two-tone headline + verdict + CTA.
//
// Same shape as AITooling ("Power up the work.") — a yellow opener and a
// white tail. Headline picks from a context-aware set so the page never
// reads the same twice in a row, and changes tone when there's something
// overdue.
// ─────────────────────────────────────────────────────────────────────────

interface HeroHeadline {
  yellow: string;
  white: string;
}

const HEADLINES_OVERDUE: HeroHeadline[] = [
  { yellow: 'Close', white: 'out the overdue.' },
  { yellow: 'Tighten', white: 'the safety up.' },
  { yellow: 'Action', white: 'the gaps.' },
];

const HEADLINES_PERMITS: HeroHeadline[] = [
  { yellow: 'Eyes', white: 'on the job.' },
  { yellow: 'Live', white: 'work, locked off.' },
  { yellow: 'Permit', white: 'in. Boots on.' },
];

const HEADLINES_CLEAR: HeroHeadline[] = [
  { yellow: 'Stay', white: 'sharp on site.' },
  { yellow: 'Plan it.', white: 'Brief it. Run it.' },
  { yellow: 'Watch', white: 'the volts.' },
  { yellow: 'Sign on,', white: 'switch off, work safe.' },
  { yellow: 'Safety', white: 'is the spec.' },
];

const HEADLINES_EMPTY: HeroHeadline[] = [
  { yellow: 'Start', white: 'with a RAMS.' },
  { yellow: 'First', white: 'job. First brief.' },
];

const pickHeadline = (pool: HeroHeadline[]): HeroHeadline => {
  // Rotate by hour so the page changes feel during the day but stays stable
  // across renders within the same hour. Hashing on the day-of-year too means
  // tomorrow opens with a different word.
  const now = new Date();
  const hour = now.getHours();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return pool[(hour + dayOfYear) % pool.length];
};

const Hero = ({
  headline,
  verdict,
  cta,
}: {
  headline: HeroHeadline;
  verdict: string;
  cta?: { label: string; onClick: () => void };
}) => (
  <motion.section
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="relative pt-2 sm:pt-4"
  >
    <motion.div variants={itemVariants}>
      <Eyebrow>{dateEyebrow()}</Eyebrow>
    </motion.div>

    <motion.h1
      variants={itemVariants}
      className="mt-3 font-semibold tracking-tight leading-[1.05] text-[34px] sm:text-[44px] lg:text-[56px]"
    >
      <span className="text-elec-yellow">{headline.yellow}</span>{' '}
      <span className="text-white">{headline.white}</span>
    </motion.h1>

    <motion.p
      variants={itemVariants}
      className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/90 max-w-2xl"
    >
      {verdict}
    </motion.p>

    {cta && (
      <motion.div variants={itemVariants} className="mt-5 sm:mt-6">
        <button
          type="button"
          onClick={cta.onClick}
          className={cn(
            'group inline-flex items-center gap-2 h-10 px-4 rounded-full',
            'border border-elec-yellow/25 bg-elec-yellow/10 hover:bg-elec-yellow/20',
            'text-[13px] font-medium text-elec-yellow touch-manipulation transition-colors'
          )}
        >
          <span>{cta.label}</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </motion.div>
    )}
  </motion.section>
);

// ─────────────────────────────────────────────────────────────────────────
// HeadlineStats — safety variant, mirrors dashboard HeadlineStats visuals
// ─────────────────────────────────────────────────────────────────────────

interface SafetyStat {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
  onClick: () => void;
}

const SafetyHeadlineStats = ({
  stats,
  number = '01',
  label = 'AT A GLANCE',
}: {
  stats: SafetyStat[];
  number?: string;
  label?: string;
}) => (
  <motion.section
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="space-y-4"
  >
    <motion.div variants={itemVariants}>
      <Eyebrow>
        {number} · {label}
      </Eyebrow>
    </motion.div>

    <motion.div
      variants={itemVariants}
      className="relative grid grid-cols-2 lg:grid-cols-4 gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />

      {stats.map((stat) => {
        const valueStr = String(stat.value);
        const isNumericish =
          typeof stat.value === 'number' || /^[\d.,+\-/%hkm£]+$/i.test(valueStr);
        const sizeClass =
          isNumericish || valueStr.length <= 4
            ? 'text-4xl sm:text-5xl lg:text-[56px]'
            : valueStr.length <= 8
              ? 'text-3xl sm:text-4xl lg:text-5xl'
              : 'text-2xl sm:text-3xl lg:text-4xl';

        return (
          <button
            key={stat.label}
            type="button"
            onClick={stat.onClick}
            className={cn(
              'group relative bg-[hsl(0_0%_10%)] px-5 py-6 sm:px-7 sm:py-8 flex flex-col text-left touch-manipulation',
              'hover:bg-elec-yellow/[0.04] transition-colors',
              stat.accent &&
                'bg-gradient-to-br from-elec-yellow/[0.06] via-amber-500/[0.02] to-transparent hover:from-elec-yellow/[0.10]'
            )}
          >
            <div
              className={cn(
                'text-[10px] font-medium uppercase tracking-[0.18em]',
                stat.accent ? 'text-elec-yellow/80' : 'text-white/50'
              )}
            >
              {stat.label}
            </div>
            <span
              className={cn(
                'mt-3 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none',
                sizeClass,
                stat.accent ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {stat.value}
            </span>
            {stat.sub && (
              <span className="mt-3 text-[11.5px] text-white/55 group-hover:text-white/75 transition-colors">
                {stat.sub}
              </span>
            )}
          </button>
        );
      })}
    </motion.div>
  </motion.section>
);

// ─────────────────────────────────────────────────────────────────────────
// EditorialToolGrid — same DNA as ElectricianHub but click-driven
// (cards trigger setActiveView, not router navigation)
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

const EditorialToolGrid = ({
  number,
  label,
  cards,
  columns = 'three',
}: {
  number: string;
  label: string;
  cards: ToolCard[];
  columns?: 'two' | 'three';
}) => {
  if (cards.length === 0) return null;

  const colClass =
    columns === 'two'
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  // Pad the final row at the largest breakpoint so the rounded grid never
  // shows the bleed-through grey from the `bg-white/[0.12]` background.
  const largestColCount = columns === 'two' ? 2 : 3;
  const fillerCount = (largestColCount - (cards.length % largestColCount)) % largestColCount;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <Eyebrow>
          {number} · {label}
        </Eyebrow>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={cn(
          'relative grid auto-rows-[220px] sm:auto-rows-[240px] gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden',
          colClass
        )}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />

        {cards.map((card, i) => (
          <button
            key={card.id}
            type="button"
            onClick={card.onClick}
            className="group relative bg-[hsl(0_0%_10%)] hover:bg-elec-yellow/[0.04] transition-colors p-5 sm:p-6 lg:p-7 text-left touch-manipulation flex flex-col h-full"
          >
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  · {card.eyebrow}
                </span>
              </div>
              {card.alert && (
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-red-300 border border-red-400/30 bg-red-500/10 px-1.5 py-0.5 rounded">
                  Action
                </span>
              )}
            </div>

            <h3 className="mt-3 sm:mt-4 text-[20px] sm:text-[22px] lg:text-[24px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors">
              {card.title}
            </h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white/60 max-w-[34ch]">
              {card.description}
            </p>

            <div className="flex-grow" />

            <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-white/[0.05]">
              <span className="text-[11px] text-white/55 truncate tabular-nums">
                {card.meta ?? 'Open'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-elec-yellow shrink-0">
                Open
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </button>
        ))}

        {Array.from({ length: fillerCount }).map((_, i) => (
          <div
            key={`filler-${i}`}
            aria-hidden
            className="hidden lg:block bg-[hsl(0_0%_10%)]"
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────

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

  // Verdict — pick the most action-worthy signal first.
  const { headline, verdict, cta } = useMemo(() => {
    if (coshhOverdue.length > 0) {
      return {
        headline: pickHeadline(HEADLINES_OVERDUE),
        verdict: `${coshhOverdue.length} COSHH ${coshhOverdue.length === 1 ? 'review' : 'reviews'} overdue. Closing those out keeps the score green.`,
        cta: { label: 'Open COSHH', onClick: () => setActiveView('coshh') },
      };
    }
    if (equipmentOverdue.length > 0) {
      return {
        headline: pickHeadline(HEADLINES_OVERDUE),
        verdict: `${equipmentOverdue.length} ${equipmentOverdue.length === 1 ? 'item' : 'items'} of equipment overdue an inspection.`,
        cta: { label: 'Open equipment', onClick: () => setActiveView('equipment') },
      };
    }
    if (dashboardStats.activePermits > 0) {
      return {
        headline: pickHeadline(HEADLINES_PERMITS),
        verdict: `${dashboardStats.activePermits} active ${dashboardStats.activePermits === 1 ? 'permit' : 'permits'} on site, nothing overdue. Steady ship.`,
        cta: { label: 'View permits', onClick: () => setActiveView('permit-to-work') },
      };
    }
    if (totalDocuments > 0) {
      return {
        headline: pickHeadline(HEADLINES_CLEAR),
        verdict: `${totalDocuments} safety ${totalDocuments === 1 ? 'document' : 'documents'} on file. Pull a RAMS together for tomorrow's job in under a minute.`,
        cta: { label: 'New RAMS', onClick: () => setActiveView('ai-rams') },
      };
    }
    return {
      headline: pickHeadline(HEADLINES_EMPTY),
      verdict: 'No safety docs yet. Generate your first RAMS in under a minute — AI handles the boilerplate.',
      cta: { label: 'New RAMS', onClick: () => setActiveView('ai-rams') },
    };
  }, [coshhOverdue.length, equipmentOverdue.length, dashboardStats.activePermits, totalDocuments]);

  const safetyScore = weeklySummary?.safetyScore ?? null;
  const stats: SafetyStat[] = [
    {
      label: 'Score',
      value: safetyScore != null ? `${safetyScore}` : '—',
      sub:
        safetyScore == null
          ? 'No data yet'
          : safetyScore >= 80
            ? 'Strong'
            : safetyScore >= 60
              ? 'Steady'
              : 'Needs attention',
      accent: true,
      onClick: () => setScoreSheetOpen(true),
    },
    {
      label: 'Documents',
      value: totalDocuments,
      sub: 'On file',
      onClick: () => setActiveView('documents'),
    },
    {
      label: 'Permits',
      value: dashboardStats.activePermits,
      sub: dashboardStats.activePermits === 1 ? '1 active' : 'Active now',
      onClick: () => setActiveView('permit-to-work'),
    },
    {
      label: 'Equipment',
      value: equipmentDueCount,
      sub:
        equipmentOverdue.length > 0
          ? `${equipmentOverdue.length} overdue`
          : equipmentDueCount > 0
            ? 'Due soon'
            : 'All clear',
      onClick: () => setActiveView('equipment'),
    },
  ];

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
  return (
    <RAMSProvider>
      <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-elec-dark min-h-screen pb-24">
        <PageMasthead />

        <div className="px-4 py-4 space-y-12 sm:space-y-16 max-w-7xl mx-auto">
          <Hero headline={headline} verdict={verdict} cta={cta} />

          <SafetyHeadlineStats stats={stats} />

          {recentCards.length > 0 && (
            <EditorialToolGrid
              number="02"
              label="RECENT"
              cards={recentCards}
              columns="three"
            />
          )}

          <EditorialToolGrid
            number={recentCards.length > 0 ? '03' : '02'}
            label="CORE TOOLS"
            cards={coreTools}
            columns="three"
          />

          <EditorialToolGrid
            number={recentCards.length > 0 ? '04' : '03'}
            label="SAFETY & RECORDING"
            cards={recordingTools}
            columns="three"
          />

          <EditorialToolGrid
            number={recentCards.length > 0 ? '05' : '04'}
            label="COMPLIANCE & PERMITS"
            cards={complianceTools}
            columns="three"
          />

          <EditorialToolGrid
            number={recentCards.length > 0 ? '06' : '05'}
            label="RESOURCES"
            cards={resourceTools}
            columns="two"
          />
        </div>
      </div>

      <SafetyScoreSheet
        open={scoreSheetOpen}
        onOpenChange={setScoreSheetOpen}
        summary={weeklySummary}
      />
    </RAMSProvider>
  );
};

export default SiteSafety;
