/**
 * ApprenticeHub — the apprentice's home (/apprentice).
 *
 * Redesigned 10 Oct 2026 to read like the College Hub home: a greeting with
 * one status line of figures (streak, criteria passed, XP, diary), "Do next",
 * four quick actions, the college row, then the places to go — a hairline
 * list on a phone and a grid of same-size cards on desktop. Headings are
 * white; the one solid yellow action is the first row of "Do next".
 */
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import {
  Directory,
  HomeRowCard,
  HomeSectionTitle,
  ProgressPanel,
  StartCards,
  longDate,
  partOfDay,
  type DirectoryGroup,
  type HomeLink,
  type ProgressCell,
  type StartCard,
} from '@/components/apprentice/ApprenticeHomeUi';
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
 * either a route or a click handler. `toLink` maps it onto a HomeLink.
 */
interface ToolCard {
  id?: string;
  /** Category word. Carried through from the old grid; toLink drops it —
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

/** A meta like "6 modules" is a figure; anything else ("Open tools") is dropped. */
const NUMERIC_META = /^([\d,.]+)\s+(.+)$/;

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
  const { stats, isLoading: appLoading, user: apprentice } = useApprenticeData();
  const { ilp, rollUp, hasCollegeLink, loading: ilpLoading } = useMyIlp();
  // Names the college and cohort on the "From your college" card.
  const { learner: collegeLearner } = useMyCollegeContext();
  const { quizzes, loading: quizzesLoading } = useMyAssignedQuizzes();
  const { entries, isLoading: diaryLoading } = useSiteDiaryEntries();
  const { totalXP, level: xpLevel, xpProgress, xpToNextLevel } = useLearningXP();
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
      description: 'Level 2 and 3 courses, practice questions and mock exams.',
      to: '/study-centre/apprentice',
      meta: 'Active course',
    },
    {
      id: 'inspection-testing',
      eyebrow: 'BS 7671',
      title: 'Inspection & Testing',
      description: 'Guides, quizzes and the BS 7671 regulations.',
      to: '/apprentice/inspection-testing-hub',
      meta: '6 modules',
    },
  ];

  const examPrep: ToolCard[] = [
    {
      id: 'epa',
      eyebrow: 'EPA',
      title: 'EPA Simulator',
      description: 'Practise the professional discussion and knowledge test.',
      to: '/apprentice/epa-simulator',
      meta: 'AI-scored',
    },
    {
      id: 'am2',
      eyebrow: 'AM2',
      title: 'AM2 Simulator',
      description: 'Safe isolation, fault finding and testing practice.',
      to: '/apprentice/am2-simulator',
      meta: 'Practice tasks',
    },
  ];

  const portfolio: ToolCard[] = [
    {
      id: 'portfolio',
      eyebrow: 'Evidence',
      title: 'Portfolio',
      description: 'Your evidence and the criteria it covers.',
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
        'Your off-the-job hours against the total your programme needs.',
      to: '/apprentice/ojt-hub',
      meta: 'Open OJT hub',
    },
  ];

  const tools: ToolCard[] = [
    {
      id: 'ai-tutor',
      eyebrow: 'AI tutor',
      title: 'Study assistant',
      description: 'Ask anything about theory or exams.',
      to: '/apprentice/advanced-help',
      meta: 'Ask anything',
    },
    {
      id: 'site-diary',
      eyebrow: 'Logbook',
      title: 'Site diary',
      description: 'What you did on site, day by day.',
      to: '/apprentice/site-diary',
      meta: `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`,
    },
    {
      id: 'calculators',
      eyebrow: 'Calculations',
      title: 'Calculators',
      description: 'Cable sizing, voltage drop and more.',
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
      description: 'Plan your next steps in the trade.',
      to: '/apprentice/professional-development',
      meta: 'Open',
    },
    {
      id: 'toolbox',
      eyebrow: 'Reference',
      title: 'Guidance area',
      description: 'Tips, guides and good practice.',
      to: '/apprentice/toolbox',
      meta: 'Browse',
    },
    {
      id: 'tradefox',
      eyebrow: 'Partner app',
      title: 'TradeFox',
      description: 'Practise wiring and GS38 in a trade simulator.',
      href: 'https://tradefoxapp.com/',
      logo: '/logos/tradefox.png',
      meta: 'Opens TradeFox',
    },
  ];
  /*
   * ── Tool groups ──────────────────────────────────────────────────────
   *
   * Grouped around what an apprentice is doing: learning, proving it,
   * working, and their own record. A hairline list on a phone (a name line
   * and a detail line, figure on the right), a grid of same-size cards on
   * desktop (10 Oct: the 2-up tiles cut every description to a stub and
   * left an odd card alone on its row).
   */
  const toLink = (c: ToolCard): HomeLink => {
    const m = c.meta ? NUMERIC_META.exec(c.meta) : null;
    return {
      id: c.id ?? c.title,
      title: c.title,
      detail: c.description,
      figure: m ? m[1] : undefined,
      figureLabel: m ? m[2] : undefined,
      onClick:
        c.onClick ??
        (c.href ? () => window.open(c.href, '_blank', 'noopener') : () => c.to && navigate(c.to)),
    };
  };
  const toDir = toLink;
  const byTitle = (titles: string[]) =>
    titles.map((t) => tools.find((x) => x.title === t)).filter((x): x is ToolCard => !!x);

  const directory: DirectoryGroup[] = [
    {
      title: 'Learn',
      sub: 'Courses, guides and exam practice',
      items: [...coreLearning, ...examPrep].map(toDir),
    },
    {
      title: 'Evidence and hours',
      sub: 'What proves your apprenticeship',
      items: [
        ...[...portfolio, ...byTitle(['Site diary'])].map(toDir),
        {
          id: 'progress',
          title: 'Your progress',
          detail: 'Course progress, badges and your XP level.',
          onClick: () => navigate('/apprentice/hub?tab=progress'),
        } satisfies HomeLink,
        // The fourth row only while on a team (ELE-2011).
        ...(onTeam
          ? [
              {
                id: 'worker-tools',
                title: 'Worker Tools',
                detail: firmHome?.firm
                  ? `${firmHome.firm}: your jobs, timesheets and sign-offs.`
                  : 'Your firm’s jobs, timesheets and sign-offs.',
                alert: (firmHome?.to_sign ?? 0) > 0 || (firmHome?.timesheets_sent_back ?? 0) > 0,
                onClick: () => navigate(WORKER_TOOLS_BASE),
              } satisfies HomeLink,
            ]
          : []),
      ],
    },
    {
      title: 'Tools',
      sub: 'For college and on site',
      items: byTitle(['Study assistant', 'Calculators', 'On-the-job tools', 'Guidance area']).map(
        toDir
      ),
    },
    {
      title: 'You',
      sub: 'Your career and wellbeing',
      items: [
        ...byTitle(['Progression', 'Mental health', 'TradeFox']).map(toDir),
        {
          id: 'elec-id',
          title: 'My Elec-ID',
          detail: hasElecId
            ? 'Worker-owned professional identity.'
            : 'Get your free digital credential.',
          alert: !hasElecId,
          onClick: () => navigate('/elec-id'),
        },
      ],
    },
  ];

  // ── Start something ──────────────────────────────────────────────────
  const quickStart: StartCard[] = [
    {
      title: 'Study now',
      detail: hasOverdue ? 'Catch up on your tutor’s work' : 'Pick up your course',
      onClick: () =>
        hasOverdue ? navigate('/apprentice/college-plan') : navigate('/study-centre/apprentice'),
    },
    {
      title: 'Log a diary entry',
      detail: 'What you did on site today',
      // Straight into the entry sheet — it used to land on the diary page
      // and leave you to find the button.
      onClick: () => navigate('/apprentice/site-diary?new=1'),
    },
    {
      title: 'Add evidence',
      detail: 'Photo or note for your portfolio',
      onClick: () => navigate('/apprentice/hub'),
    },
    {
      title: 'Log off-the-job hours',
      detail: 'Training time away from the tools',
      onClick: () => navigate('/apprentice/ojt-hub'),
    },
  ];

  // ── Progress: four figures, each opens its detail ────────────────────
  const streak = stats.learning.currentStreak;
  const pct = stats.progress.overallPercent;
  const progress: ProgressCell[] = [
    {
      colour: 'bg-orange-400',
      value: streak === 1 ? '1 day' : `${streak} days`,
      label: 'Study streak',
      meta: streak > 0 ? 'Study today to keep it going' : 'Study today to start one',
      onClick: () => setStreakOpen(true),
    },
    {
      colour: 'bg-emerald-400',
      pct,
      // Words over a bare percentage (showcase pass, 10 Oct): "4 of 340"
      // says more than "1%", and never leads with a 0% figure.
      value:
        stats.progress.criteriaTotal > 0
          ? `${stats.progress.criteriaPassed} of ${stats.progress.criteriaTotal}`
          : `${pct}%`,
      label: 'Criteria signed off',
      meta:
        stats.progress.criteriaPassed === 0
          ? 'Your first sign-off starts this'
          : `${pct}% of your whole course`,
      onClick: () => setProgressOpen(true),
    },
    {
      colour: 'bg-elec-yellow',
      pct: xpProgress,
      value: totalXP.toLocaleString('en-GB'),
      label: `XP · level ${xpLevel}`,
      meta: `${xpToNextLevel.toLocaleString('en-GB')} XP to level ${xpLevel + 1}`,
      onClick: () => navigate('/apprentice/hub?tab=progress'),
    },
    {
      colour: 'bg-teal-300',
      value: String(entries.length),
      label: entries.length === 1 ? 'Diary entry' : 'Diary entries',
      meta: entries.length === 0 ? 'Log what you did on site' : 'What you did on site',
      onClick: () => setDiaryOpen(true),
    },
  ];

  // Accounts that came in as "ANDREW" read as shouting; show the name as a name.
  const rawName =
    apprentice.firstName && apprentice.firstName !== 'there' ? apprentice.firstName.trim() : '';
  const firstName =
    rawName.length > 1 && rawName === rawName.toUpperCase()
      ? rawName.charAt(0) + rawName.slice(1).toLowerCase()
      : rawName;

  const collegeCount = hasOverdue ? (
    <span className="shrink-0 text-[13px] font-semibold tabular-nums text-orange-300">
      {overdueQuizzes.length} overdue
    </span>
  ) : newCount > 0 ? (
    <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
      {newCount} new
    </span>
  ) : null;

  return (
    <HubPage ground="landing">
      <HubMasthead section="Apprentice" title="Apprentice Hub" backTo="/dashboard" />

      <HubBody>
        {/* Greeting, then the four figures as one designed strip. */}
        <header className="min-w-0">
          <p className="text-[13px] font-medium text-white">{longDate()}</p>
          <h2 className="mt-1.5 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[34px]">
            {partOfDay()}
            {firstName ? `, ${firstName}` : ''}
          </h2>
        </header>
        <ProgressPanel items={progress} loading={statsLoading} />

        {/* ELE-1896: "Do next" (the same ranked list as Today and the college
            area) beside the things to start and the college. Desktop: the
            list takes the width, the side column stays narrow. */}
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:gap-6">
          <DoNextList />
          <div className="space-y-8 lg:sticky lg:top-24 lg:space-y-6 lg:pt-5">
            <section className="space-y-3" aria-label="Start something">
              <HomeSectionTitle title="Start something" sub="Log your day in a tap." />
              <StartCards items={quickStart} />
            </section>
            <section className="space-y-3">
              <HomeSectionTitle
                title="Your college"
                action={
                  !hasCollegeLink && !soloMode && !ilpLoading ? (
                    <button
                      type="button"
                      onClick={dismissCollegeCard}
                      className="flex h-11 items-center px-2 text-[13px] font-semibold text-white touch-manipulation"
                    >
                      Not now
                    </button>
                  ) : undefined
                }
              />
              <HomeRowCard
                title={collegeTitle}
                detail={collegeDescription}
                meta={collegeMeta}
                trailing={collegeCount}
                onClick={() => navigate('/apprentice/college-plan')}
                className={cn(hasOverdue && 'border-orange-400/40')}
              />
            </section>
          </div>
        </div>

        {/* Your firm + your hours — rostered apprentices only (ELE-2011). */}
        {onTeam && (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-6">
            <YourFirmCard layout="stack" />
            <ApprenticeFirmHours />
          </div>
        )}

        {/* First week — brand-new accounts only, dismissable forever. */}
        {showTour && (
          <section className="space-y-3">
            <HomeSectionTitle
              title="Your first week"
              action={
                <button
                  type="button"
                  onClick={dismissTour}
                  className="flex h-11 items-center px-2 text-[13px] font-semibold text-white touch-manipulation"
                >
                  Got it, hide
                </button>
              }
            />
            <ol
              className={cn(
                '-mx-4 divide-y divide-white/[0.06] overflow-hidden border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x',
                CARD_SURFACE
              )}
            >
              {TOUR_STEPS.map((step, i) => (
                <li key={step.to}>
                  <button
                    type="button"
                    onClick={() => navigate(step.to)}
                    className="group flex min-h-[64px] w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.2] text-[13px] font-semibold tabular-nums text-white">
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold leading-snug text-white">
                        {step.title}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-white">
                        {step.sub}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                  </button>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="space-y-3">
          <HomeSectionTitle title="Everything in your hub" />
          <Directory groups={directory} />
        </section>

        <section className="space-y-3">
          <HomeSectionTitle title="Learning videos" />
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
