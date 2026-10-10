import { useState, type ReactNode } from 'react';
import useSEO from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  CalendarDays,
  Target,
  GraduationCap,
  FileQuestion,
  Clock,
  Award,
  MessageSquareText,
  History,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useMyCollegeOverview, type CollegeOverviewStat } from '@/hooks/useMyCollegeOverview';
import { usePortfolioAcState } from '@/hooks/portfolio/usePortfolioAcState';
import { useGatewayReadiness } from '@/hooks/epa/useGatewayReadiness';
import { useGatewayForecast } from '@/hooks/epa/useGatewayForecast';
import { FORECAST_HELP_NOTE_LEARNER } from '@/lib/epa/gatewayForecast';
import { MyGatewayForecastText } from '@/components/apprentice-hub/MyGatewayForecast';
import { useMyCollegeAccess } from '@/hooks/college/useCollegeAccess';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { CollegePageHeader, CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { JoinCollegeCard } from '@/components/apprentice-hub/JoinCollegeCard';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { MyProgressReviewsCard } from '@/components/apprentice-hub/MyProgressReviewsCard';
import { CollegeCalendarFeedCard } from '@/components/college/calendar/CollegeCalendarFeedCard';
import { DoNextList } from '@/components/apprentice-hub/do-next/DoNextList';
import { MoveCollegeSheet } from '@/components/apprentice-hub/MoveCollegeSheet';
import {
  LC_TILE,
  LC_TOP_LINE,
  lcChip,
  type ChipTone,
} from '@/components/apprentice-hub/college-hub/learnerUi';

/* ==========================================================================
   MyCollegePlanPage — /apprentice/college-plan

   The apprentice's College Hub landing page.

   REBUILT on the shared hub primitives (`components/hub/HubPrimitives`) —
   the same masthead, KPI row, work list and tool grid as the Business Hub,
   the portfolio hub and the OJT hub. It previously ran its own private set
   in `apprentice-hub/college-hub/` (HubHero, HubHeadlineStrip,
   HubActionRequired, HubGrid), which is how the app ended up with a fourth
   dialect: a different card material, a different back button, a different
   KPI tile and a purple eyebrow nobody else used.

   Two things that were wrong here beyond the styling:

   🔴 EVERY LINK WAS A FULL PAGE RELOAD. The KPI tiles and the action list
      were raw `<a href="/apprentice/…">`. In a single-page app that tears
      the whole thing down and boots it again — several seconds, every
      cached query lost, on a phone on site. They are router navigations now.

   ⚠️ The editorial hero — eyebrow, a 40px "Andrew's college hub", the course
      name and a two-line paragraph — used roughly the first 200px of the
      page to say where you already knew you were. The masthead says it in
      one line and the figures start at the top.

   8 Oct 2026, College Hub design language: one header (eyebrow, the college,
   one sentence with the hours and the cohort, the "?"), then Do next, then
   the eight areas as cards that say in words where each one stands. The row
   of four figure tiles went: every one of them repeated a Do next row or an
   area card ("a lot going on here"). So did the gold-edged identity card; its
   facts are the header sentence now.
   ========================================================================== */

function fmtHours(h: number): string {
  if (!Number.isFinite(h) || h <= 0) return '0h';
  if (h < 1) return `${Math.round(h * 60)}m`;
  return h >= 10 ? `${Math.round(h).toLocaleString('en-GB')}h` : `${h.toFixed(1)}h`;
}

const HOME_HELP: PageHelpContent = {
  id: 'apprentice-college-home',
  title: 'Your college',
  what: 'Everything your college asks of you and everything it has recorded about you, in one place. Your tutor sees the same figures.',
  steps: [
    {
      title: 'Start with Do next',
      body: 'Anything waiting on you is at the top, most urgent first. Tap a row and it opens the exact place to deal with it.',
    },
    {
      title: 'Check where you stand',
      body: 'Each card under Your college says in words how that part is going: criteria passed, hours counted, goals open.',
    },
    {
      title: 'Add your view before a review',
      body: 'Every three months you, your tutor and your employer meet. Tell your tutor how you think it is going first.',
    },
  ],
  notes: [
    {
      title: 'Off-the-job hours',
      body: 'The hours figure is the same one your tutor sees: hours your tutor or employer has signed off, plus learning time the app measured. Hours waiting on your tutor are not counted yet.',
    },
    {
      title: 'Criteria passed',
      body: 'Only your assessor can mark a criterion passed. Evidence you have claimed or sent counts once they decide.',
    },
    FORECAST_HELP_NOTE_LEARNER,
  ],
};

interface Area {
  id: string;
  /** The area's name, sentence case, beside its line icon. */
  title: string;
  icon: LucideIcon;
  /** One line in words: where this part stands. */
  status: string;
  /** An optional second line (what is waiting, who on). */
  detail?: string;
  chip?: { label: string; tone: ChipTone };
  /** Optional richer line under the status (the gateway forecast). */
  extra?: ReactNode;
  to: string;
}

function hoursStatus(stats: CollegeOverviewStat): Pick<Area, 'status' | 'detail' | 'chip'> {
  const counted = stats.counted_otj_hours ?? stats.verified_otj_minutes / 60;
  const req = stats.required_otj_hours;
  const status = req
    ? `${fmtHours(counted)} of ${fmtHours(req)} counted`
    : counted > 0
      ? `${fmtHours(counted)} counted`
      : 'No hours counted yet';
  const detail =
    stats.pending_otj_minutes > 0
      ? `${fmtHours(stats.pending_otj_minutes / 60)} waiting on your tutor`
      : stats.planned_otj_hours != null && req
        ? `Plan says ${fmtHours(stats.planned_otj_hours)} by today`
        : undefined;
  const chip =
    stats.rejected_otj_minutes > 0
      ? { label: 'Returned to you', tone: 'action' as const }
      : stats.otj_risk === 'behind'
        ? { label: 'Behind', tone: 'action' as const }
        : stats.otj_risk === 'slightly_behind'
          ? { label: 'Slightly behind', tone: 'action' as const }
          : stats.otj_risk === 'on_track'
            ? { label: 'On track', tone: 'done' as const }
            : undefined;
  return { status, detail, chip };
}

/**
 * One area of the learner's college. A row in one joined list on a phone
 * (name, where it stands, chip or chevron); a same-size card in a grid from
 * `sm:` up, so every card in a row ends at the same line.
 */
function AreaCard({ area, onOpen }: { area: Area; onOpen: (to: string) => void }) {
  const Icon = area.icon;
  return (
    <li className="h-full">
      <button
        type="button"
        onClick={() => onOpen(area.to)}
        className={cn(
          'group relative flex h-full min-h-[76px] w-full items-start gap-3 overflow-hidden px-4 py-3.5 text-left touch-manipulation transition-colors',
          'hover:bg-white/[0.04] active:bg-white/[0.07]',
          'sm:flex-col sm:gap-0 sm:rounded-2xl sm:border sm:border-white/[0.08] sm:bg-gradient-to-b sm:from-white/[0.07] sm:to-white/[0.025] sm:p-5 sm:hover:border-white/[0.16]'
        )}
      >
        <span className={cn(LC_TOP_LINE, 'max-sm:hidden')} aria-hidden />
        <Icon
          className="mt-0.5 h-5 w-5 shrink-0 text-white sm:hidden"
          strokeWidth={1.5}
          aria-hidden
        />
        <span className="flex w-full min-w-0 flex-1 flex-col">
          <span className="flex w-full items-center justify-between gap-3">
            <span className="inline-flex min-w-0 items-center gap-2 text-[15px] font-semibold leading-snug text-white">
              <Icon
                className="hidden h-[18px] w-[18px] shrink-0 sm:block"
                strokeWidth={1.5}
                aria-hidden
              />
              {area.title}
            </span>
            {area.chip ? (
              <span className={lcChip(area.chip.tone)}>{area.chip.label}</span>
            ) : (
              <ChevronRight
                className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 group-hover:text-elec-yellow"
                aria-hidden
              />
            )}
          </span>
          <span className="mt-1 block text-[14px] font-medium leading-snug text-white sm:mt-3">
            {area.status}
          </span>
          {area.detail && (
            <span className="mt-0.5 block text-[13px] leading-snug text-white">{area.detail}</span>
          )}
          {area.extra}
        </span>
      </button>
    </li>
  );
}

export default function MyCollegePlanPage() {
  useSEO({
    title: 'My College Hub',
    description: 'Your college plan, quizzes, hours and EPA brief in one place.',
    noindex: true,
  });

  const navigate = useNavigate();
  const { user } = useAuth();
  const overview = useMyCollegeOverview();
  const [moveOpen, setMoveOpen] = useState(false);
  const { stats } = overview;
  const { learner } = useMyCollegeContext();
  const { data: access } = useMyCollegeAccess();
  // Criteria passed: the same per-criterion state the assessor and tutor read.
  const ac = usePortfolioAcState(overview.hasCollegeLink ? user?.id : null);
  // The gateway in words: the same lines the tutor sees (get_gateway_readiness).
  const gate = useGatewayReadiness(overview.hasCollegeLink ? user?.id : null);
  const gateItems = gate.data?.items ?? [];
  const gateMet = gateItems.filter((i) => i.state === 'green').length;
  // When, at this pace (get_gateway_forecast): the same date the tutor sees.
  const { data: forecast } = useGatewayForecast(overview.hasCollegeLink ? user?.id : null);

  // ELE-1896: the to-dos (plan items, referred criteria, hours, quizzes,
  // goals, messages, reviews…) are ONE ranked list from get_my_do_next(),
  // shared with Today and the Apprentice Hub. No page-local ranking here.

  const courseLine = learner?.qualification_title ?? learner?.course_name ?? null;
  const hours = hoursStatus(stats);
  const passed = ac.totals.passedAll;
  const needsMore = ac.totals.referred + ac.totals.not_yet;

  // Showcase pass (10 Oct): cohort and tutor as one plain line, the long
  // qualification title on its own line under it.
  const description = overview.hasCollegeLink ? (
    <>
      <span className="block font-semibold">
        {[
          learner?.cohort_name ?? 'No cohort yet',
          learner?.tutor_name ? `Tutor ${learner.tutor_name}` : null,
        ]
          .filter(Boolean)
          .join(' · ')}
      </span>
      {courseLine && <span className="mt-0.5 block text-[13.5px]">{courseLine}</span>}
    </>
  ) : overview.loading ? null : (
    'Join your college with the code your tutor gives you. Your portfolio, hours and study all work without one.'
  );

  /* ─── The eight areas ──────────────────────────────────────────────── */
  const areas: Area[] = [
    {
      id: 'today',
      title: 'Today at college',
      icon: CalendarDays,
      status:
        stats.attendance_rate !== null
          ? `Attendance ${Math.round(stats.attendance_rate)}% over ${stats.attendance_sessions} ${
              stats.attendance_sessions === 1 ? 'session' : 'sessions'
            }`
          : 'No register taken yet',
      detail: 'Lessons, timetable and attendance',
      to: '/apprentice/college/today',
    },
    {
      id: 'plan',
      title: 'Learning plan',
      icon: Target,
      status:
        stats.open_goals === 0
          ? 'No goals open'
          : `${stats.open_goals} ${stats.open_goals === 1 ? 'goal' : 'goals'} open`,
      detail:
        stats.unread_tutor_comments > 0
          ? `${stats.unread_tutor_comments} new from your tutor`
          : stats.overdue_goals > 0
            ? `${stats.overdue_goals} overdue`
            : 'You and your tutor see the same thread',
      chip:
        stats.unread_tutor_comments > 0
          ? { label: 'New reply', tone: 'action' }
          : stats.overdue_goals > 0 || stats.blocked_goals > 0
            ? { label: stats.overdue_goals > 0 ? 'Overdue' : 'Blocked', tone: 'action' }
            : undefined,
      to: '/apprentice/college/plan',
    },
    {
      id: 'progress',
      title: 'Your qualification',
      icon: GraduationCap,
      status: ac.loading
        ? 'Checking your criteria…'
        : ac.error || ac.totals.total === 0
          ? 'Every criterion and your assessor’s decisions'
          : `${passed} of ${ac.totals.total} criteria passed`,
      detail:
        !ac.loading && ac.totals.total > 0
          ? [
              ac.totals.submitted > 0 && `${ac.totals.submitted} with your assessor`,
              ac.totals.claimed > 0 && `${ac.totals.claimed} claimed by you`,
            ]
              .filter(Boolean)
              .join(', ') || undefined
          : undefined,
      chip:
        needsMore > 0
          ? { label: `${needsMore} need${needsMore === 1 ? 's' : ''} more`, tone: 'action' }
          : undefined,
      to: '/apprentice/college/progress',
    },
    {
      id: 'activities',
      title: 'Quizzes from your tutor',
      icon: FileQuestion,
      status:
        stats.pending_quizzes === 0
          ? 'Nothing to do'
          : `${stats.pending_quizzes} ${stats.pending_quizzes === 1 ? 'quiz' : 'quizzes'} to do`,
      detail: stats.overdue_quizzes > 0 ? `${stats.overdue_quizzes} overdue` : undefined,
      chip: stats.overdue_quizzes > 0 ? { label: 'Overdue', tone: 'action' } : undefined,
      to: '/apprentice/college/activities',
    },
    {
      id: 'otj',
      title: 'Off-the-job hours',
      icon: Clock,
      ...hours,
      to: '/apprentice/college/activities#otj',
    },
    {
      id: 'epa',
      title: 'End-point assessment',
      icon: Award,
      status: gate.data?.gateway_passed
        ? 'Gateway passed'
        : gateItems.length > 0 && gateMet === gateItems.length
          ? 'Ready for gateway'
          : gateItems.length > 0
            ? `${gateMet} of ${gateItems.length} gateway lines met`
            : 'Your pre-EPA brief and timed mocks',
      detail: gateItems.length > 0 && !forecast ? 'Your pre-EPA brief and timed mocks' : undefined,
      extra:
        forecast && !gate.data?.gateway_passed ? (
          <MyGatewayForecastText
            forecast={forecast}
            className="mt-1.5 text-[12.5px] leading-snug text-white"
          />
        ) : undefined,
      to: '/apprentice/college/epa',
    },
    {
      id: 'voice',
      title: 'Survey and reflection',
      icon: MessageSquareText,
      status: 'Tell your college how it is going',
      to: '/apprentice/college/voice',
    },
    {
      id: 'activity',
      title: 'Comments and sign-offs',
      icon: History,
      status:
        stats.unactioned_portfolio_comments > 0
          ? `${stats.unactioned_portfolio_comments} ${
              stats.unactioned_portfolio_comments === 1 ? 'comment needs' : 'comments need'
            } a reply`
          : 'Nothing waiting on a reply',
      chip:
        stats.unactioned_portfolio_comments > 0 ? { label: 'Reply', tone: 'action' } : undefined,
      to: '/apprentice/college/activity',
    },
  ];

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title={learner?.college_name ?? 'My college'}
        backTo="/apprentice"
      />
      <HubBody pushContext="Get told when your tutor sets work, replies or signs something off">
        <CollegePageHeader
          eyebrow="My college"
          title={learner?.college_name ?? 'My college'}
          description={description}
          help={HOME_HELP}
        />
        {access?.provided_by_college && access.has_access && (
          <p className="-mt-5 text-[13px] text-white sm:-mt-7">
            Your Elec-Mate access is provided by {access.college_name}.
          </p>
        )}

        {/* The learner's home: what is waiting on them, most urgent first.
            Works with or without a college (portfolio items still count). */}
        <DoNextList />

        {!overview.loading && !overview.hasCollegeLink && (
          <div className="grid gap-4 lg:grid-cols-2">
            <JoinCollegeCard onJoined={overview.refresh} />
            {/* The portfolio is the learner's own, college or not: an
                independent assessor, witness statements and every criterion
                work without a college link. */}
            <button
              type="button"
              onClick={() => navigate('/apprentice/college/progress')}
              className={LC_TILE}
            >
              <span className={LC_TOP_LINE} aria-hidden />
              <span className="text-[15px] font-semibold text-white">
                Your qualification and assessment
              </span>
              <span className="mt-1 block text-[13px] leading-snug text-white">
                Every criterion, witness statements from your supervisor, and an assessor you
                invite. No college needed.
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-elec-yellow">
                Open
                <ChevronRight className="h-4 w-4" aria-hidden />
              </span>
            </button>
          </div>
        )}

        {overview.hasCollegeLink && (
          <section className="space-y-3" aria-labelledby="your-college-title">
            <CollegeSectionTitle
              id="your-college-title"
              title="Your college"
              sub="Where each part stands. Tap one to open it."
            />
            {/* One joined list on a phone; same-size cards from sm: up. */}
            <ul
              className={cn(
                '-mx-4 divide-y divide-white/[0.06] border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]',
                'sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:divide-y-0 sm:border-0 sm:bg-none'
              )}
            >
              {areas.map((a) => (
                <AreaCard key={a.id} area={a} onOpen={(to) => navigate(to)} />
              ))}
            </ul>
          </section>
        )}

        {overview.hasCollegeLink && (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
            <div className="min-w-0 space-y-6">
              {/* Three-way review with the tutor and employer, every 3 months */}
              <MyProgressReviewsCard />

              {/* ELE-1882: changing college keeps the whole record */}
              <section
                aria-labelledby="moving-college-title"
                className="-mx-4 flex flex-col gap-3 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5"
              >
                <div>
                  <h2 id="moving-college-title" className="text-[15px] font-semibold text-white">
                    Moving college or provider?
                  </h2>
                  <p className="mt-1 text-[13px] leading-snug text-white">
                    Your decisions, witness statements and hours move with you. Nothing is rebuilt.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMoveOpen(true)}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.18] px-4 text-[14px] font-semibold text-white touch-manipulation hover:border-white/[0.4] active:bg-white/[0.06] sm:w-auto sm:self-start"
                >
                  Move to a new college
                </button>
              </section>
            </div>
            {/* Classes, deadlines and reviews in the learner's own phone calendar */}
            <div className="min-w-0">
              <CollegeCalendarFeedCard variant="learner" />
            </div>
          </div>
        )}
        <MoveCollegeSheet
          open={moveOpen}
          onOpenChange={setMoveOpen}
          onMoved={() => overview.refresh()}
        />
      </HubBody>
    </HubPage>
  );
}
