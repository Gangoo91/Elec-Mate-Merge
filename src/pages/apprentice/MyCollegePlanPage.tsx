import useSEO from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import { useMyCollegeOverview } from '@/hooks/useMyCollegeOverview';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubKpi,
  HubKpiRow,
  HubToolGrid,
  type HubTool,
} from '@/components/hub/HubPrimitives';
import { JoinCollegeCard } from '@/components/apprentice-hub/JoinCollegeCard';
import { MyCollegeIdentityCard } from '@/components/apprentice-hub/MyCollegeIdentityCard';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { MyProgressReviewsCard } from '@/components/apprentice-hub/MyProgressReviewsCard';
import { DoNextList } from '@/components/apprentice-hub/do-next/DoNextList';

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
   ========================================================================== */

function fmtHours(min: number): string {
  if (!Number.isFinite(min) || min <= 0) return '0h';
  if (min < 60) return `${Math.round(min)}m`;
  const h = min / 60;
  return h >= 10 ? `${h.toFixed(0)}h` : `${h.toFixed(1)}h`;
}

export default function MyCollegePlanPage() {
  useSEO({
    title: 'My College Hub',
    description: 'Your college plan, quizzes, hours and EPA brief — one place.',
    noindex: true,
  });

  const navigate = useNavigate();
  const overview = useMyCollegeOverview();
  const { stats } = overview;
  // Who this learner is to their college — the masthead names the college
  // and the identity card under it carries cohort, course and tutor. The
  // overview hook has always returned `courseName`; the page never showed it.
  const { learner } = useMyCollegeContext();
  const mastheadTitle = learner?.college_name ?? 'My college';

  // ELE-1896: the to-dos (plan items, referred criteria, hours, quizzes,
  // goals, messages, reviews…) are ONE ranked list from get_my_do_next(),
  // shared with Today and the Apprentice Hub — no page-local ranking here.

  /* ─── The eight areas ──────────────────────────────────────────────── */
  const tools: HubTool[] = [
    {
      id: 'today',
      eyebrow: 'Today',
      title: 'Your day at college',
      description: "Today's focus, this week's lessons, your timetable and attendance.",
      to: '/apprentice/college/today',
    },
    {
      id: 'plan',
      eyebrow: 'ILP',
      title: 'Plan & messages',
      value:
        stats.unread_tutor_comments > 0
          ? String(stats.unread_tutor_comments)
          : String(stats.open_goals),
      valueLabel:
        stats.unread_tutor_comments > 0
          ? 'new from your tutor'
          : stats.open_goals === 1
            ? 'goal open'
            : 'goals open',
      meta: 'Both sides see the same thread',
      to: '/apprentice/college/plan',
      alert: stats.unread_tutor_comments > 0,
    },
    {
      id: 'progress',
      eyebrow: 'Progress',
      title: 'Your qualification',
      description: 'Every criterion, your assessor’s decisions, witnesses and assessors.',
      to: '/apprentice/college/progress',
    },
    {
      id: 'activities',
      eyebrow: 'Quizzes',
      title: 'Set by your tutor',
      value:
        stats.overdue_quizzes > 0
          ? String(stats.overdue_quizzes)
          : stats.pending_quizzes > 0
            ? String(stats.pending_quizzes)
            : undefined,
      valueLabel: stats.overdue_quizzes > 0 ? 'overdue' : 'to do',
      description:
        stats.overdue_quizzes === 0 && stats.pending_quizzes === 0
          ? 'Nothing outstanding — quizzes your tutor sets appear here.'
          : undefined,
      to: '/apprentice/college/activities',
      alert: stats.overdue_quizzes > 0,
    },
    {
      id: 'epa',
      eyebrow: 'EPA',
      title: 'End-point prep',
      description: 'Your pre-EPA brief and timed mocks. Scores feed your tutor’s read of you.',
      to: '/apprentice/college/epa',
    },
    {
      id: 'otj',
      eyebrow: 'Off-the-job',
      title: 'Your hours',
      value:
        stats.rejected_otj_minutes > 0
          ? fmtHours(stats.rejected_otj_minutes)
          : stats.counted_otj_hours != null
            ? fmtHours(Math.round(stats.counted_otj_hours * 60))
            : fmtHours(stats.verified_otj_minutes),
      valueLabel:
        stats.rejected_otj_minutes > 0
          ? 'returned to you'
          : stats.counted_otj_hours != null && stats.required_otj_hours
            ? `of ${Math.round(stats.required_otj_hours).toLocaleString('en-GB')}h`
            : 'verified',
      meta:
        stats.rejected_otj_minutes === 0 && stats.pending_otj_minutes > 0
          ? `${fmtHours(stats.pending_otj_minutes)} waiting on your tutor`
          : undefined,
      // Deep-linked, not the bare section. This card and the one above used
      // to point at the SAME url, so two of eight tiles did the same thing.
      to: '/apprentice/college/activities#otj',
      alert: stats.rejected_otj_minutes > 0,
    },
    {
      id: 'voice',
      eyebrow: 'Your voice',
      title: 'Survey & reflection',
      description: "Tell your college how it's going. It shapes what your tutor does next.",
      to: '/apprentice/college/voice',
    },
    {
      id: 'activity',
      eyebrow: 'Record',
      title: 'Comments & sign-offs',
      value:
        stats.unactioned_portfolio_comments > 0
          ? String(stats.unactioned_portfolio_comments)
          : undefined,
      valueLabel: 'need a reply',
      description:
        stats.unactioned_portfolio_comments === 0
          ? 'Everything your college has recorded against your work.'
          : undefined,
      to: '/apprentice/college/activity',
      alert: stats.unactioned_portfolio_comments > 0,
    },
  ];

  return (
    <HubPage>
      <HubMasthead section="College" title={mastheadTitle} backTo="/apprentice" />
      <HubBody>
        {/* The learner's home: what is waiting on them, most urgent first.
            Works with or without a college (portfolio items still count). */}
        <DoNextList />

        {!overview.loading && !overview.hasCollegeLink && (
          <>
            <JoinCollegeCard onJoined={overview.refresh} />
            {/* The portfolio is the learner's own, college or not: an
                independent assessor, witness statements and every criterion
                work without a college link. */}
            <button
              type="button"
              onClick={() => navigate('/apprentice/college/progress')}
              className="-mx-4 flex min-h-[64px] w-[calc(100%+2rem)] items-center gap-3 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 py-3 text-left touch-manipulation sm:mx-0 sm:w-full sm:rounded-2xl sm:border-x"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-white">Your qualification and assessment</span>
                <span className="block text-[12.5px] text-white">
                  Every criterion, witness statements from your supervisor, and an assessor you invite. No college needed.
                </span>
              </span>
              <span className="shrink-0 text-[13px] font-semibold text-elec-yellow">Open</span>
            </button>
          </>
        )}

        {overview.hasCollegeLink && (
          <>
            {/* Static strip — this IS the hub, so it goes nowhere. */}
            <MyCollegeIdentityCard variant="full" to={null} />

            <HubKpiRow>
              <HubKpi
                accent
                label="Off-the-job hours"
                value={
                  stats.counted_otj_hours != null
                    ? fmtHours(Math.round(stats.counted_otj_hours * 60))
                    : fmtHours(stats.verified_otj_minutes)
                }
                verdict={
                  stats.rejected_otj_minutes > 0
                    ? `${fmtHours(stats.rejected_otj_minutes)} returned to you`
                    : stats.required_otj_hours
                      ? `of ${Math.round(stats.required_otj_hours).toLocaleString('en-GB')}h, including learning in the app`
                      : stats.verified_otj_minutes > 0
                        ? 'Signed off by your tutor'
                        : 'Nothing verified yet'
                }
                context={
                  stats.pending_otj_minutes > 0
                    ? `${fmtHours(stats.pending_otj_minutes)} waiting on your tutor`
                    : undefined
                }
                sentiment={stats.rejected_otj_minutes > 0 ? 'bad' : 'neutral'}
                onClick={() => navigate('/apprentice/college/activities#otj')}
              />
              <HubKpi
                label="Open goals"
                value={String(stats.open_goals)}
                verdict={
                  stats.overdue_goals > 0
                    ? `${stats.overdue_goals} overdue`
                    : stats.blocked_goals > 0
                      ? `${stats.blocked_goals} blocked`
                      : stats.open_goals > 0
                        ? 'On your plan'
                        : 'None set'
                }
                sentiment={stats.overdue_goals > 0 || stats.blocked_goals > 0 ? 'bad' : 'neutral'}
                onClick={() => navigate('/apprentice/college/plan')}
              />
              <HubKpi
                label="Quizzes to do"
                value={String(stats.pending_quizzes)}
                verdict={
                  stats.overdue_quizzes > 0
                    ? `${stats.overdue_quizzes} overdue`
                    : stats.pending_quizzes > 0
                      ? 'Set by your tutor'
                      : 'Nothing outstanding'
                }
                sentiment={stats.overdue_quizzes > 0 ? 'bad' : 'neutral'}
                onClick={() => navigate('/apprentice/college/activities')}
              />
              <HubKpi
                label="Needs a reply"
                value={String(stats.unactioned_portfolio_comments)}
                verdict={
                  stats.unactioned_portfolio_comments > 0
                    ? 'Your tutor is waiting on you'
                    : 'Nothing outstanding'
                }
                context={
                  stats.attendance_rate !== null
                    ? `Attendance ${Math.round(stats.attendance_rate)}%`
                    : undefined
                }
                sentiment={stats.unactioned_portfolio_comments > 0 ? 'bad' : 'neutral'}
                onClick={() => navigate('/apprentice/college/activity')}
              />
            </HubKpiRow>

            {/* Three-way review with the tutor and employer, every 3 months */}
            <MyProgressReviewsCard />

            <HubToolGrid label="Your college" cards={tools} columns="four" />
          </>
        )}
      </HubBody>
    </HubPage>
  );
}
