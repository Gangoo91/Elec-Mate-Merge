/**
 * CollegeOverviewSection — the College Hub home.
 *
 * Rebuilt on the shared hub shell (`@/components/hub/HubPrimitives`), the same
 * one the Business Hub, Inspection & Testing and the apprentice's college hub
 * use, so a tutor and an electrician on the same phone see one product.
 *
 *   quick start → KPI row → needs you → the six areas → momentum → compliance
 *
 * What went, and why:
 *
 * The HERO. A date eyebrow, "Hello, ANDREW." at 56px and a verdict paragraph
 * — roughly 250px before a tutor reached anything they could act on. The
 * verdict restated the numbers that appeared again in the strip directly
 * beneath it.
 *
 * The NUMBERED STAT STRIP and the EMBEDDED TODAY VIEW. `TutorTodayBody` carried
 * its own five-cell strip — classes, OTJ, comments, IQA, at risk — directly
 * under a four-cell strip showing three of the same numbers. Two scoreboards
 * on one screen, and neither told you what to do about any of it. The counts
 * are now four KPIs with a verdict each, and the lists behind them are one
 * ranked "Needs you" list. `/college/today` is still the full view.
 *
 * The COLLAPSIBLE sections. Momentum and Compliance were closed by default,
 * which on first visit made the page end at the hub grid; a tutor who never
 * tapped the chevron never knew there was anything under it.
 *
 * Everything is `text-white`. The old surface ran on white/50, /75 and /85,
 * which renders as grey and is not allowed.
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  HubQuickStart,
  HubKpi,
  HubKpiRow,
  HubWorkList,
  HubToolGrid,
  HubSectionHeading,
  type HubTool,
  type HubQuickAction,
  type HubWorkItem,
} from '@/components/hub/HubPrimitives';
import { LearnerQuickJump } from '@/components/college/sections/LearnerQuickJump';
import { AtRiskPredictor } from '@/components/college/widgets/AtRiskPredictor';
import { EPACountdown } from '@/components/college/widgets/EPACountdown';
import { ActivityFeed } from '@/components/college/widgets/ActivityFeed';
import { MyComplianceWidget } from '@/components/college/widgets/MyComplianceWidget';
import { ComplianceLeadsWidget } from '@/components/college/widgets/ComplianceLeadsWidget';
import { SafeguardingReadinessBanner } from '@/components/college/widgets/SafeguardingReadinessBanner';
import { VerifierInboxWidget } from '@/components/college/widgets/VerifierInboxWidget';
import { MyAcknowledgementsWidget } from '@/components/college/widgets/MyAcknowledgementsWidget';
import { TopExpiringWidget } from '@/components/college/widgets/TopExpiringWidget';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useTutorToday } from '@/hooks/useTutorToday';

interface CollegeOverviewSectionProps {
  onNavigate: (section: CollegeSection) => void;
  /** Opens the learner search (⌘K palette). Falls back to the Students list. */
  onFindLearner?: () => void;
}

const DAY_MS = 86_400_000;

function daysAgo(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return null;
  return Math.max(0, Math.floor((Date.now() - t) / DAY_MS));
}

function fmtMinutes(min: number | null | undefined): string | null {
  if (!min || min <= 0) return null;
  if (min < 60) return `${Math.round(min)}m`;
  const h = min / 60;
  return h >= 10 ? `${h.toFixed(0)}h` : `${h.toFixed(1)}h`;
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

export function CollegeOverviewSection({ onNavigate, onFindLearner }: CollegeOverviewSectionProps) {
  const navigate = useNavigate();
  const { students, getStaffByRole, getPendingGradesData, isLoading } = useCollegeSupabase();
  const { data: today } = useTutorToday();

  const activeTutors = getStaffByRole('tutor').length;
  const activeStudents = students.filter((s) => s.status?.toLowerCase() === 'active').length;
  const pendingAssessments = getPendingGradesData().length;

  const counts = today?.counts;
  const otjAwaiting = counts?.otj_awaiting ?? 0;
  const commentsDue = counts?.comments_action_required ?? 0;
  const iqaAwaiting = counts?.iqa_awaiting ?? 0;
  const atRiskCount = counts?.at_risk ?? 0;
  const lessonsToday = counts?.lessons_today ?? 0;
  const inboxTotal = otjAwaiting + commentsDue + iqaAwaiting;

  const criticalCount = today?.atRisk.filter((l) => l.level === 'critical').length ?? 0;
  const oldestOtjDays = useMemo(() => {
    const ages = (today?.otj ?? [])
      .map((o) => daysAgo(o.created_at ?? o.activity_date))
      .filter((d): d is number => d !== null);
    return ages.length ? Math.max(...ages) : null;
  }, [today?.otj]);

  /*
   * ── Needs you ────────────────────────────────────────────────────────
   * One ranked list, not four boxes. Order is cost of delay: a learner in
   * trouble outranks paperwork, paperwork that has been sitting a week
   * outranks paperwork from this morning, and today's classes close the
   * list because they happen whether or not you look at them here.
   */
  const work: HubWorkItem[] = useMemo(() => {
    if (!today) return [];
    const items: HubWorkItem[] = [];

    for (const l of today.atRisk) {
      const urgent = l.level !== 'medium';
      items.push({
        id: `risk-${l.student_id}`,
        title: l.student_name,
        reason: [`${l.level.charAt(0).toUpperCase()}${l.level.slice(1)} risk`, l.top_factor ?? l.cohort_name]
          .filter(Boolean)
          .join(' · '),
        trailing: `${Math.round(l.score)}`,
        urgent,
        onClick: () =>
          navigate(`/college?section=student360&studentId=${encodeURIComponent(l.student_id)}`),
      });
    }

    for (const o of today.otj) {
      const age = daysAgo(o.created_at ?? o.activity_date);
      const dur = fmtMinutes(o.duration_minutes);
      items.push({
        id: `otj-${o.id}`,
        title: o.student_name ?? 'Learner',
        reason: [`Off-the-job to verify`, o.title, dur].filter(Boolean).join(' · '),
        trailing: age !== null ? `${age}d` : undefined,
        // A week unverified starts to cost the learner their hours record.
        urgent: age !== null && age >= 7,
        to: '/college/inbox',
      });
    }

    for (const c of today.comments) {
      items.push({
        id: `comment-${c.id}`,
        title: c.student_name ?? 'Learner',
        reason: `Needs a reply · ${c.content.replace(/\s+/g, ' ').trim()}`,
        trailing: (() => {
          const d = daysAgo(c.created_at);
          return d !== null ? `${d}d` : undefined;
        })(),
        to: '/college/inbox',
      });
    }

    for (const q of today.iqa) {
      items.push({
        id: `iqa-${q.id}`,
        title: q.target_title,
        reason: `IQA verdict due · ${q.target_kind === 'otj' ? 'off-the-job sample' : 'observation sample'}`,
        trailing: (() => {
          const d = daysAgo(q.sampled_at);
          return d !== null ? `${d}d` : undefined;
        })(),
        onClick: () => onNavigate('iqaworkflow'),
      });
    }

    for (const l of today.lessons) {
      items.push({
        id: `lesson-${l.id}`,
        title: l.title,
        reason: [l.cohort_name, l.is_mine ? 'Your class today' : 'Class today']
          .filter(Boolean)
          .join(' · '),
        trailing: l.scheduled_start_time?.slice(0, 5) ?? undefined,
        onClick: () => navigate(`/college/lessons/${l.id}`),
      });
    }

    // Urgent first; within each band keep the source order (already sorted
    // by the hook — severity for risk, oldest first for the inbox).
    return items.sort((a, b) => Number(!!b.urgent) - Number(!!a.urgent));
  }, [today, navigate, onNavigate]);

  /*
   * ── Start something ──────────────────────────────────────────────────
   * What a tutor opens this page to BEGIN. The day's queue is the one that
   * leads to everything else, so it takes the single solid volt card.
   */
  const quickStart: HubQuickAction[] = [
    {
      title: "Today's queue",
      description:
        inboxTotal > 0 ? `${plural(inboxTotal, 'item')} waiting on you` : 'Classes, inbox, at risk',
      onClick: () => navigate('/college/today'),
      primary: true,
    },
    {
      title: 'Mark work',
      description: pendingAssessments > 0 ? `${pendingAssessments} to mark` : 'Grading queue',
      onClick: () => onNavigate('grading'),
    },
    {
      title: 'Take a register',
      description: 'Attendance for a class',
      onClick: () => onNavigate('attendance'),
    },
    {
      title: 'Find a learner',
      description: 'Student 360',
      onClick: () => (onFindLearner ? onFindLearner() : onNavigate('students')),
    },
  ];

  /*
   * ── The six areas ────────────────────────────────────────────────────
   * Every College Hub feature lives under exactly one of these. A card
   * reports a figure when it has one and says what it is for when it
   * doesn't — never both.
   *
   * Two groups of three, not one of six. The grid is auto-fit, and auto-fit
   * only collapses tracks that are empty for the WHOLE grid — so six cards
   * on a desktop drew 4 + 2 with a hole on the end, which reads as a failed
   * load. Three fills a row at every width. The split is also a real one:
   * the first three carry today's figures, the second three are how the
   * college is run.
   */
  const today3: HubTool[] = [
    {
      id: 'my-work',
      title: 'My Work',
      to: '/college/today',
      value: inboxTotal > 0 ? String(inboxTotal) : lessonsToday > 0 ? String(lessonsToday) : undefined,
      valueLabel:
        inboxTotal > 0 ? 'waiting on you' : lessonsToday > 0 ? 'classes today' : undefined,
      description: "Today's classes, your inbox, marking and off-the-job to verify.",
      alert: inboxTotal > 0,
    },
    {
      id: 'assessment',
      title: 'Assessment',
      onClick: () => onNavigate(pendingAssessments > 0 ? 'grading' : 'assessmenthub'),
      value: pendingAssessments > 0 ? String(pendingAssessments) : undefined,
      valueLabel: pendingAssessments > 0 ? 'to mark' : undefined,
      description: 'Grading, attendance, ILPs, EPA gateway, portfolio and off-the-job.',
      alert: pendingAssessments > 0,
    },
    {
      id: 'quality',
      title: 'Quality & Compliance',
      onClick: () => onNavigate('qualityhub'),
      value: iqaAwaiting > 0 ? String(iqaAwaiting) : undefined,
      valueLabel: iqaAwaiting > 0 ? 'IQA verdicts due' : undefined,
      description: 'IQA sampling, Ofsted EIF, SAR, QIP, audit pack and policies.',
      alert: iqaAwaiting > 0,
    },
  ];

  const college3: HubTool[] = [
    {
      id: 'people',
      title: 'People',
      onClick: () => onNavigate('peoplehub'),
      value: activeStudents > 0 ? String(activeStudents) : undefined,
      valueLabel: activeStudents > 0 ? 'active learners' : undefined,
      description: 'Learners, tutors, cohorts and support staff.',
      meta: activeTutors > 0 ? `${plural(activeTutors, 'tutor')} on the team` : undefined,
    },
    {
      id: 'teaching',
      title: 'Teaching',
      onClick: () => onNavigate('curriculumhub'),
      description: 'Lesson plans, schemes of work, resources and the tutor notebook.',
    },
    {
      id: 'settings',
      title: 'Settings',
      onClick: () => onNavigate('collegesettings'),
      description: 'Curriculum and operational settings, integrations, staff roles.',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  const inboxBreakdown =
    [
      otjAwaiting > 0 ? `${otjAwaiting} off-the-job` : null,
      commentsDue > 0 ? `${plural(commentsDue, 'comment')}` : null,
      iqaAwaiting > 0 ? `${iqaAwaiting} IQA` : null,
    ]
      .filter(Boolean)
      .join(' · ') || undefined;

  return (
    <>
      {/* Renders only when concerns can't be routed to a DSL. */}
      <SafeguardingReadinessBanner />

      {/* Start something FIRST. A tutor between classes is here to do a
          thing, not to read a figure; the figures are one scroll away. */}
      <HubQuickStart label="Start something" items={quickStart} />

      {/* Four KPIs, capped at four on purpose, each with a verdict. */}
      <HubKpiRow>
        <HubKpi
          accent
          label="Learners"
          value={String(activeStudents)}
          verdict={activeStudents > 0 ? 'Active on the roll' : 'No active learners yet'}
          context={activeTutors > 0 ? `${plural(activeTutors, 'tutor')} on the team` : undefined}
          onClick={() => onNavigate('students')}
        />
        <HubKpi
          label="Waiting on you"
          value={String(inboxTotal)}
          verdict={
            oldestOtjDays !== null && oldestOtjDays >= 7
              ? `Oldest has sat ${oldestOtjDays} days`
              : inboxTotal > 0
                ? 'Clear the inbox before it grows'
                : 'Inbox clear'
          }
          context={inboxBreakdown}
          sentiment={oldestOtjDays !== null && oldestOtjDays >= 7 ? 'bad' : 'neutral'}
          onClick={() => navigate('/college/inbox')}
        />
        <HubKpi
          label="To mark"
          value={String(pendingAssessments)}
          verdict={pendingAssessments > 0 ? 'Clear the oldest first' : 'All caught up'}
          sentiment={pendingAssessments > 0 ? 'bad' : 'neutral'}
          onClick={() => onNavigate('grading')}
        />
        <HubKpi
          label="At risk"
          value={String(atRiskCount)}
          verdict={
            criticalCount > 0
              ? `${criticalCount} critical — check in today`
              : atRiskCount > 0
                ? 'Worth a check-in this week'
                : 'Nothing flagged'
          }
          context={
            atRiskCount > 0 && today?.atRisk[0]?.top_factor
              ? `Top factor: ${today.atRisk[0].top_factor}`
              : undefined
          }
          sentiment={atRiskCount > 0 ? 'bad' : 'neutral'}
          onClick={() => navigate('/college/today')}
        />
      </HubKpiRow>

      {/* Renders nothing on a quiet day — a short page is the reward. */}
      <HubWorkList items={work} unit="item" />

      <HubToolGrid label="Today" cards={today3} columns="three" />

      <HubToolGrid label="Run the college" cards={college3} columns="three" />

      {/* Student 360 is the most-used destination; the search stays on the
          front page rather than behind a palette shortcut nobody on a phone
          can press. */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible">
        <LearnerQuickJump />
      </motion.div>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>Momentum</HubSectionHeading>
        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3 md:grid-cols-2 sm:gap-4">
          <AtRiskPredictor onNavigate={onNavigate} compact />
          <EPACountdown onNavigate={onNavigate} compact />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ActivityFeed maxItems={6} iconless />
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>Compliance</HubSectionHeading>
          <button
            type="button"
            onClick={() => onNavigate('compliancedocs')}
            className="-my-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
          >
            Open hub
          </button>
        </motion.div>
        <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
          <MyAcknowledgementsWidget />
          <VerifierInboxWidget />
          <TopExpiringWidget />
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
        >
          <MyComplianceWidget />
          <ComplianceLeadsWidget />
        </motion.div>
      </motion.section>
    </>
  );
}
