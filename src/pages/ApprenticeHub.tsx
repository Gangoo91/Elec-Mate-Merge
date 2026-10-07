/**
 * ApprenticeHub — editorial redesign matching ElectricianHub / SiteSafety /
 * BusinessHub / Inspection & Testing / Study Centre.
 *
 * Sticky text-only masthead, date-eyebrow Hero with rotating thematic
 * two-tone tagline + verdict + CTA, numbered hairline-grid sections:
 *   01 · AT A GLANCE        (Streak / Progress / XP / Diary)
 *   02 · FROM YOUR COLLEGE  (College plan + assigned quizzes)
 *   03 · CORE LEARNING      (Study Centre · Inspection & Testing)
 *   04 · EXAM PREP          (EPA Simulator · AM2 Simulator)
 *   05 · PORTFOLIO & OJT    (Evidence · OJT hours)
 *   06 · LEARNING VIDEOS    (existing widget, unchanged)
 *   07 · TOOLS              (8 quick-access tiles)
 *
 * Black 2px hairline gaps, single yellow accent per row, mobile-flat per the
 * project working agreement.
 */
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubQuickStart,
  HubToolGrid,
  HubKpi,
  HubKpiRow,
  type HubTool,
  type HubQuickAction,
} from '@/components/hub/HubPrimitives';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { useApprenticeData } from '@/hooks/useApprenticeData';
import { useMyIlp } from '@/hooks/useMyIlp';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { useMyAssignedQuizzes } from '@/hooks/useMyAssignedQuizzes';
import { useLearningXP } from '@/hooks/useLearningXP';
import { useSiteDiaryEntries } from '@/hooks/site-diary/useSiteDiaryEntries';
import { LearningVideosSection } from '@/components/apprentice/learning-videos/LearningVideosSection';
import { DiaryEntriesDetailSheet } from '@/components/apprentice/stats-detail/DiaryEntriesDetailSheet';
import { StudyStreakDetailSheet } from '@/components/apprentice/stats-detail/StudyStreakDetailSheet';
import { ProgressDetailSheet } from '@/components/apprentice/stats-detail/ProgressDetailSheet';
import { cn } from '@/lib/utils';
import { YourFirmCard } from '@/components/worker-tools/YourFirmCard';
import { useOnTeam } from '@/hooks/useWorkerHome';
import { WORKER_TOOLS_BASE } from '@/lib/workerTeam';
import { ApprenticeFirmHours } from '@/components/apprentice/ApprenticeFirmHours';
import { DoNextList } from '@/components/apprentice-hub/do-next/DoNextList';

// ─────────────────────────────────────────────────────────────────────────
// Editorial helpers
// ─────────────────────────────────────────────────────────────────────────

/**
 * A tool entry as this page models it: a title, a line of description, and
 * either a route or a click handler. `toHubTool` maps it onto the shared
 * HubTool so these render as the same card as every other hub.
 */
interface ToolCard {
  id?: string;
  /** Category word. Carried through from the old grid; toHubTool drops it —
      every one restated the title ("LEARN · Study Centre"). */
  eyebrow?: string;
  title: string;
  description: string;
  to?: string;
  onClick?: () => void;
  meta?: string;
  /** External partner tiles (TradeFox) render a logo instead of a chevron. */
  logo?: string;
  href?: string;
}

const TOUR_STEPS = [
  {
    to: '/study-centre',
    title: 'Start a course in the Study Centre',
    sub: 'Your study time counts towards your off-the-job hours automatically.',
  },
  {
    to: '/apprentice/ojt-hub',
    title: 'Log your first work hours',
    sub: 'Track what you did on site — your supervisor can sign it off from a link.',
  },
  {
    to: '/apprentice/hub',
    title: 'Capture your first piece of evidence',
    sub: 'Photos from the job build your portfolio — get them verified as you go.',
  },
] as const;

/**
 * ToolCard → HubTool. `meta` on these cards is mostly a verb ("Open portfolio",
 * "Browse guidance") rather than a figure, so it is dropped: the description
 * already says what the tool does, and a card either reports a number or says
 * what it is for, never both.
 */
const NUMERIC_META = /^([\d,.]+)\s+(.+)$/;

const toHubTool = (c: ToolCard): HubTool => {
  const m = c.meta ? NUMERIC_META.exec(c.meta) : null;
  return {
    id: c.id ?? c.title,
    title: c.title,
    description: c.description,
    to: c.to,
    // External cards (e.g. TradeFox) carry href, not to — without this
    // mapping the card renders but a tap does nothing.
    onClick: c.onClick ?? (c.href ? () => window.open(c.href, '_blank', 'noopener') : undefined),
    value: m ? m[1] : undefined,
    valueLabel: m ? m[2] : undefined,
  };
};

export default function ApprenticeHub() {
  useSEO({
    title: 'Apprentice Hub | Level 2 & 3 Electrical Training',
    description:
      'Complete electrical apprenticeship training platform. Level 2 and Level 3 courses, AM2 exam prep, 20,000+ practice questions, OJT tracking, and industry-recognised qualifications.',
    schema: {
      '@type': 'CollectionPage',
      name: 'Electrical Apprentice Training Hub',
      description:
        'Training hub for UK electrical apprentices pursuing Level 2 and Level 3 qualifications',
      provider: { '@type': 'Organization', name: 'Elec-Mate' },
    },
  });

  const navigate = useNavigate();
  const { stats, isLoading: appLoading } = useApprenticeData();
  const { ilp, rollUp, hasCollegeLink, loading: ilpLoading } = useMyIlp();
  // Names the college and cohort on the "From your college" card.
  const { learner: collegeLearner } = useMyCollegeContext();
  const { quizzes, loading: quizzesLoading } = useMyAssignedQuizzes();
  const { entries, isLoading: diaryLoading } = useSiteDiaryEntries();
  const { totalXP, level: xpLevel } = useLearningXP();
  // On a firm's roster (ELE-2011): their jobs, clock, sign-offs and hours live
  // here too, through the same Worker Tools pages an electrician uses.
  const { onTeam, home: firmHome } = useOnTeam();

  // First-load gate — show skeletons rather than flashing 0-day streak / 0%
  // / "Pick a card below to get started" to a returning apprentice while the
  // real figures are still in flight.
  const statsLoading = appLoading || diaryLoading;
  const heroLoading = appLoading || diaryLoading || quizzesLoading || ilpLoading;

  const [streakOpen, setStreakOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const [diaryOpen, setDiaryOpen] = useState(false);

  // Solo mode — the apprentice has said "no college for now". Collapses the
  // college cell to a single quiet row; never blocks linking later (the row
  // still opens the college plan, where the invite-code card lives).
  const [soloMode, setSoloMode] = useState(
    () => localStorage.getItem('elecmate_solo_apprentice') === '1'
  );
  const dismissCollegeCard = () => {
    localStorage.setItem('elecmate_solo_apprentice', '1');
    setSoloMode(true);
  };

  // First-run tour — three steps for a brand-new account, dismissable forever.
  const [tourDismissed, setTourDismissed] = useState(
    () => localStorage.getItem('elecmate_apprentice_tour_done') === '1'
  );
  const dismissTour = () => {
    localStorage.setItem('elecmate_apprentice_tour_done', '1');
    setTourDismissed(true);
  };

  const pendingQuizzes = quizzes.filter((q) => q.status !== 'completed');
  const overdueQuizzes = pendingQuizzes.filter((q) => q.status === 'overdue');
  const notStartedQuizzes = pendingQuizzes.filter((q) => q.status === 'not_started');
  const inProgressQuizzes = pendingQuizzes.filter((q) => q.status === 'in_progress');
  const newCount =
    notStartedQuizzes.length + rollUp.unread_tutor_comments + (rollUp.needs_acknowledgement || 0);
  const { user } = useAuth();

  // Whether the Elec-ID credential exists yet — drives the "You" card. Read
  // here rather than inside a banner component so the card can live in a grid.
  const { data: elecIdProfile } = useQuery({
    queryKey: ['elec-id-banner', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from('profiles')
        .select('elec_id_number')
        .eq('id', user.id)
        .single();
      return data;
    },
    enabled: !!user?.id,
  });
  const hasElecId = !!elecIdProfile?.elec_id_number;

  const hasOverdue = overdueQuizzes.length > 0;

  // ── College plan card ────────────────────────────────────────────────
  // Brand-new account → show the three-step start-here strip until dismissed.
  const isBrandNew =
    stats.learning.currentStreak === 0 &&
    stats.portfolio.evidenceCount === 0 &&
    entries.length === 0 &&
    pendingQuizzes.length === 0;
  const showTour = !tourDismissed && !heroLoading && isBrandNew;

  const collegeDescription = !hasCollegeLink
    ? 'Everything here works without a college. Got an invite code from your tutor? Tap to enter it — your hours and portfolio link up automatically.'
    : pendingQuizzes.length > 0
      ? overdueQuizzes.length > 0
        ? `${overdueQuizzes.length} overdue · ${notStartedQuizzes.length + inProgressQuizzes.length} more pending`
        : notStartedQuizzes.length === 1 && inProgressQuizzes.length === 0
          ? `New from your tutor: ${notStartedQuizzes[0].title}`
          : `${pendingQuizzes.length} ${pendingQuizzes.length === 1 ? 'item' : 'items'} from your tutor — tap to start.`
      : ilp
        ? (ilp.headline_focus ??
          `${rollUp.completed}/${rollUp.total_goals} goals complete · set by your tutor`)
        : 'Your tutor will set goals here you can tick off and reply to.';
  // Linked: the college is the title and the cohort leads the footer, so the
  // card reads as THIS learner's college rather than a generic prompt.
  const collegeTitle = hasCollegeLink
    ? (collegeLearner?.college_name ?? 'Your college')
    : 'Link your college — optional';
  const collegeMeta = hasCollegeLink
    ? `${collegeLearner?.cohort_name ?? 'No cohort yet'} · ${rollUp.completed}/${rollUp.total_goals} goals`
    : 'Tap to open';

  // ── Tool grids ───────────────────────────────────────────────────────
  const coreLearning: ToolCard[] = [
    {
      id: 'study-centre',
      eyebrow: 'Apprenticeship',
      title: 'Study Centre',
      description: 'Level 2 & 3 courses, practice questions and exam prep — at your own pace.',
      to: '/study-centre/apprentice',
      meta: 'Active course',
    },
    {
      id: 'inspection-testing',
      eyebrow: 'BS 7671',
      title: 'Inspection & Testing',
      description: 'Comprehensive guides, quizzes and BS 7671 regulations.',
      to: '/apprentice/inspection-testing-hub',
      meta: '6 modules',
    },
  ];

  const examPrep: ToolCard[] = [
    {
      id: 'epa',
      eyebrow: 'EPA',
      title: 'EPA Simulator',
      description: 'Mock professional discussions and knowledge tests with AI scoring.',
      to: '/apprentice/epa-simulator',
      meta: 'AI-scored',
    },
    {
      id: 'am2',
      eyebrow: 'AM2',
      title: 'AM2 Simulator',
      description: 'Safe isolation, fault finding and testing simulations.',
      to: '/apprentice/am2-simulator',
      meta: 'Practice tasks',
    },
  ];

  const portfolio: ToolCard[] = [
    {
      id: 'portfolio',
      eyebrow: 'Evidence',
      title: 'Portfolio',
      description:
        'Your evidence, the criteria it covers, where it stands with your assessor and your EPA gateway readiness.',
      to: '/apprentice/hub',
      meta: 'Open portfolio',
    },
    {
      id: 'ojt',
      eyebrow: 'OTJ',
      title: 'Off-the-job hours',
      description:
        // Not "20%" — the off-the-job requirement is a fixed number of hours
        // set by the standard, not a share of the week.
        'Track your off-the-job hours against the total your programme needs, with evidence behind every entry.',
      to: '/apprentice/ojt-hub',
      meta: 'Open OJT hub',
    },
  ];

  const tools: ToolCard[] = [
    {
      id: 'ai-tutor',
      eyebrow: 'AI tutor',
      title: 'Study assistant',
      description: 'Instant help with theory and exams.',
      to: '/apprentice/advanced-help',
      meta: 'Ask anything',
    },
    {
      id: 'site-diary',
      eyebrow: 'Logbook',
      title: 'Site diary',
      description: 'What you did on site, training time and evidence.',
      to: '/apprentice/site-diary',
      meta: `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`,
    },
    {
      id: 'calculators',
      eyebrow: 'Calculations',
      title: 'Calculators',
      description: 'Cable sizing, voltage drop, and more.',
      to: '/apprentice/calculators',
      meta: 'Open tools',
    },
    {
      id: 'on-job',
      eyebrow: 'Daily work',
      title: 'On-the-job tools',
      description: 'Quick references for site tasks.',
      to: '/apprentice/on-job-tools',
      meta: 'Open',
    },
    {
      id: 'mental-health',
      eyebrow: 'Wellbeing',
      title: 'Mental health',
      description: 'Wellbeing resources and support.',
      to: '/apprentice/mental-health',
      meta: 'Open',
    },
    {
      id: 'progression',
      eyebrow: 'Career',
      title: 'Progression',
      description: 'Plan your career pathway.',
      to: '/apprentice/professional-development',
      meta: 'Open',
    },
    {
      id: 'toolbox',
      eyebrow: 'Reference',
      title: 'Guidance area',
      description: 'Tips, guides and best practices.',
      to: '/apprentice/toolbox',
      meta: 'Browse',
    },
    {
      id: 'tradefox',
      eyebrow: 'Partner app',
      title: 'TradeFox',
      description:
        'Build skills with risk-free trade simulations and courses — practise wiring, GS38 and more.',
      href: 'https://tradefoxapp.com/',
      logo: '/logos/tradefox.png',
      meta: 'Opens TradeFox',
    },
  ];

  /*
   * ── Tool groups ──────────────────────────────────────────────────────
   *
   * Was five sections of two, two, two, one and eight — `03 · CORE LEARNING`
   * through `07 · TOOLS`, each with its own numbered eyebrow. Three
   * consecutive two-card sections is not structure, it is fragmentation: the
   * page spent more height on headings than on cards, and the grid is
   * auto-fit at four tracks so a pair left half a row empty every time.
   *
   * Regrouped into fours (and one three) around what an apprentice is
   * actually doing: learning, proving it, working, and their own record.
   */
  const learnCards: HubTool[] = [...coreLearning, ...examPrep].map(toHubTool);
  const evidenceCards: HubTool[] = [
    ...[...portfolio, ...tools.filter((t) => t.title === 'Site diary')].map(toHubTool),
    // The fourth card in this row only while on a team (ELE-2011).
    ...(onTeam
      ? [
          {
            id: 'worker-tools',
            title: 'Worker Tools',
            description: firmHome?.firm
              ? `${firmHome.firm}: your jobs, timesheets and sign-offs.`
              : 'Your firm’s jobs, timesheets and sign-offs.',
            to: WORKER_TOOLS_BASE,
            alert: (firmHome?.to_sign ?? 0) > 0 || (firmHome?.timesheets_sent_back ?? 0) > 0,
          } satisfies HubTool,
        ]
      : []),
  ];
  const toolCards: HubTool[] = tools
    .filter((t) =>
      ['Calculators', 'On-the-job tools', 'Study assistant', 'Guidance area'].includes(t.title)
    )
    .map(toHubTool);
  /*
   * "You" is where My Elec-ID belongs.
   *
   * It was a standalone full-width banner under the tool grids — but the
   * component is built as a GRID CARD (min-h-[110px], flex-col, a flex-grow
   * spacer to push its footer down), so stretching it across the page left
   * ~1,900px of empty card and put "Open" and its chevron at opposite ends of
   * the screen: two affordances for one action, as far apart as they could be.
   *
   * As the fourth card here it fills the row exactly, sheds a whole section,
   * and can say something useful — whether the credential exists yet.
   */
  const youCards: HubTool[] = [
    ...tools
      .filter((t) => ['Progression', 'Mental health', 'TradeFox'].includes(t.title))
      .map(toHubTool),
    {
      id: 'elec-id',
      title: 'My Elec-ID',
      to: '/elec-id',
      description: hasElecId
        ? 'Worker-owned professional identity.'
        : 'Get your free digital credential.',
      alert: !hasElecId,
    },
  ];

  // ── Start something ──────────────────────────────────────────────────
  // The hero's CTA was the only actionable thing above the fold; it is the
  // primary card here, with the three other things an apprentice starts.
  const quickStart: HubQuickAction[] = [
    {
      title: 'Study now',
      description: hasOverdue ? 'Catch up on your tutor’s work' : 'Pick up your course',
      onClick: () =>
        hasOverdue ? navigate('/apprentice/college-plan') : navigate('/study-centre/apprentice'),
      primary: true,
    },
    {
      title: 'Log a diary entry',
      description: 'What you did on site today',
      // Straight into the entry sheet — it used to land on the diary page
      // and leave you to find the button.
      onClick: () => navigate('/apprentice/site-diary?new=1'),
    },
    {
      title: 'Add evidence',
      description: 'Photo or note for your portfolio',
      onClick: () => navigate('/apprentice/hub'),
    },
    {
      title: 'Log OTJ hours',
      description: 'Off-the-job training time',
      onClick: () => navigate('/apprentice/ojt-hub'),
    },
  ];

  return (
    <HubPage>
      <HubMasthead section="Apprentice" title="Apprentice Hub" backTo="/dashboard" />

      <HubBody>
        {/* August Referral Race — everyone, whole campaign, not dismissible.
            Self-hides after 31 Aug. */}

        {/* ELE-1896: the learner's home starts with "Do next" — one ranked
            list (plan items, referred criteria, hours, quizzes, goals,
            messages, reviews…), the same list as Today and the college area. */}
        <DoNextList />

        {/* Start something — see the other hubs. */}
        <HubQuickStart label="Start something" items={quickStart} />

        {/* Your firm + your hours — rostered apprentices only (ELE-2011). */}
        {onTeam && (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-6">
            <YourFirmCard layout="stack" />
            <ApprenticeFirmHours />
          </div>
        )}

        <HubKpiRow>
          <HubKpi
            accent
            label="Streak"
            value={
              stats.learning.currentStreak === 1 ? '1 day' : `${stats.learning.currentStreak} days`
            }
            verdict={stats.learning.currentStreak >= 7 ? 'On a roll' : 'Keep it going'}
            onClick={() => setStreakOpen(true)}
          />
          <HubKpi
            label="Progress"
            value={`${stats.progress.overallPercent}%`}
            verdict="Criteria passed"
            onClick={() => setProgressOpen(true)}
          />
          <HubKpi
            label="XP"
            value={totalXP.toLocaleString()}
            verdict={`Level ${xpLevel}`}
            onClick={() => navigate('/apprentice/hub?tab=progress')}
          />
          <HubKpi
            label="Diary"
            value={String(entries.length)}
            verdict="Site logbook"
            onClick={() => setDiaryOpen(true)}
          />
        </HubKpiRow>

        {/* First week — brand-new accounts only, dismissable forever. */}
        {showTour && (
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
                Your first week
              </h2>
              <button
                type="button"
                onClick={dismissTour}
                className="-my-2 -mr-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-semibold text-white touch-manipulation"
              >
                Got it — hide
              </button>
            </div>
            <div
              className={cn(
                '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
                CARD_SURFACE
              )}
            >
              <ul className="divide-y divide-white/[0.10]">
                {TOUR_STEPS.map((step, i) => (
                  <li key={step.to}>
                    <button
                      type="button"
                      onClick={() => navigate(step.to)}
                      className="group flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] sm:px-5"
                    >
                      <span className="w-4 shrink-0 text-[13px] font-semibold tabular-nums text-elec-yellow">
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                          {step.title}
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {step.sub}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* From your college */}
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
              From your college
            </h2>
            {!hasCollegeLink && !soloMode && !ilpLoading && (
              <button
                type="button"
                onClick={dismissCollegeCard}
                className="-my-2 -mr-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-semibold text-white touch-manipulation"
              >
                Not now
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate('/apprentice/college-plan')}
            className={cn(
              CARD_BASE,
              CARD_NEUTRAL,
              'relative overflow-hidden p-4 sm:p-5',
              hasOverdue && 'border-elec-yellow/70'
            )}
          >
            <span
              aria-hidden
              className={cn(
                'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 to-elec-yellow/0',
                hasOverdue ? 'via-elec-yellow/90' : 'via-elec-yellow/55'
              )}
            />
            <span className="flex items-center justify-between gap-3">
              <span className="text-[14.5px] font-semibold leading-tight tracking-tight text-white transition-colors group-hover:text-elec-yellow">
                {collegeTitle}
              </span>
              {hasOverdue ? (
                <span className="shrink-0 rounded border border-elec-yellow/50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-elec-yellow">
                  {overdueQuizzes.length} overdue
                </span>
              ) : newCount > 0 ? (
                <span className="shrink-0 rounded border border-white/[0.30] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  {newCount} new
                </span>
              ) : null}
            </span>
            <span className="mt-1.5 text-[12px] leading-snug text-white">{collegeDescription}</span>
            <span className="flex-grow" />
            <span className="mt-3 text-[11.5px] font-medium text-white">{collegeMeta}</span>
          </button>
        </section>

        <HubToolGrid label="Learn" cards={learnCards} columns="four" />

        <HubToolGrid label="Evidence & hours" cards={evidenceCards} columns="four" />

        <HubToolGrid label="Tools" cards={toolCards} columns="four" />

        <HubToolGrid label="You" cards={youCards} columns="four" />

        <section className="space-y-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
            Learning videos
          </h2>
          <LearningVideosSection />
        </section>
      </HubBody>

      {/* Stat detail sheets */}
      <StudyStreakDetailSheet open={streakOpen} onOpenChange={setStreakOpen} />
      <ProgressDetailSheet open={progressOpen} onOpenChange={setProgressOpen} />
      <DiaryEntriesDetailSheet open={diaryOpen} onOpenChange={setDiaryOpen} entries={entries} />
    </HubPage>
  );
}
