/**
 * CollegeOverviewSection — College Hub home, rebuilt to match the
 * editorial /dashboard surface (the main Dashboard.tsx route).
 *
 * Layout mirrors `Dashboard.tsx` exactly:
 *   ——   GREETING        "Hello, ANDREW." with first word in elec-yellow
 *   01 · THIS MONTH       monochrome stat strip, single yellow accent cell
 *   02 · YOUR HUBS        numbered editorial hub grid
 *   03 · TODAY            actionable inbox / classes / at-risk (TutorTodayBody)
 *   04 · MOMENTUM         recent activity feed
 *   ——   COMPLIANCE       optional collapsible details below the fold
 *   ——   TOOLS            workflow utilities
 *
 * Single colour accent: elec-yellow on the hero greeting, the leftmost
 * stat cell, and the hub grid's top hairline. Restraint is the point.
 *
 * Cards: `bg-[hsl(0_0%_10%)]` (matches the main dashboard editorial cards)
 * Page bg: inherited `bg-elec-dark` from CollegeDashboard wrapper.
 */

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
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
import { TutorTodayBody } from '@/pages/college/TutorTodayPage';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTutorToday } from '@/hooks/useTutorToday';

/* ──────────────── Section ID & collapse helpers ─────────────────────────
   Compliance + tools live below-the-fold and are collapsible — they hold
   real signal but most tutors don't open them daily. State persists per
   browser so a returning user lands where they left off. */
type DashSectionId = 'compliance' | 'tools' | 'momentum';
const COLLAPSE_KEY = 'college.overview.collapsed.v3';

function useDashCollapse() {
  const [collapsed, setCollapsed] = useState<Set<DashSectionId>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const raw = window.localStorage.getItem(COLLAPSE_KEY);
      if (raw) return new Set(JSON.parse(raw) as DashSectionId[]);
      // First visit: closed by default — Today + hubs are the daily
      // workflow, compliance/tools are reach-for-when-you-need-them.
      return new Set<DashSectionId>(['compliance', 'tools', 'momentum']);
    } catch {
      return new Set();
    }
  });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(COLLAPSE_KEY, JSON.stringify(Array.from(collapsed)));
    } catch {
      // ignore
    }
  }, [collapsed]);
  const toggle = (id: DashSectionId) =>
    setCollapsed((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  return { collapsed, toggle };
}

interface CollegeOverviewSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

/* ──────────────── Greeting helpers ─────────────────────────────────── */

function partOfDay(): 'MORNING' | 'AFTERNOON' | 'EVENING' {
  const h = new Date().getHours();
  if (h < 12) return 'MORNING';
  if (h < 18) return 'AFTERNOON';
  return 'EVENING';
}

function dateEyebrow(): string {
  const d = new Date();
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' }).toUpperCase();
  const day = d.getDate();
  const month = d.toLocaleDateString('en-GB', { month: 'long' }).toUpperCase();
  return `${weekday} · ${day} ${month} · ${partOfDay()}`;
}

/* ──────────────── Hero (matches main Dashboard's VerdictHero) ──────── */

function CollegeHero({
  firstName,
  verdict,
  cta,
}: {
  firstName: string | null;
  verdict: string;
  cta?: { label: string; onClick: () => void };
}) {
  return (
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
        <span className="text-elec-yellow">Hello, </span>
        <span className="text-white uppercase">{firstName ?? 'TUTOR'}.</span>
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
}

/* ──────────────── 01 · THIS MONTH (HeadlineStats look-alike) ───────── */

function CollegeStats({
  activeStudents,
  activeTutors,
  pendingAssessments,
  atRisk,
  onOpenPeople,
  onOpenAssessment,
}: {
  activeStudents: number;
  activeTutors: number;
  pendingAssessments: number;
  atRisk: number;
  onOpenPeople: () => void;
  onOpenAssessment: () => void;
}) {
  // Each cell is clickable so the strip works as a launcher. Single
  // yellow accent on the leftmost (LEARNERS) cell — the headline number
  // for a tutor.
  type Stat = {
    label: string;
    value: string | number;
    sub: string;
    accent?: boolean;
    onClick: () => void;
  };
  const stats: Stat[] = [
    {
      label: 'Learners',
      value: activeStudents,
      sub: `${activeTutors} tutors active`,
      accent: true,
      onClick: onOpenPeople,
    },
    {
      label: 'Pending',
      value: pendingAssessments,
      sub: pendingAssessments > 0 ? 'Awaiting marks' : 'All caught up',
      onClick: onOpenAssessment,
    },
    {
      label: 'At risk',
      value: atRisk,
      sub: atRisk > 0 ? 'Need attention' : 'On track',
      onClick: onOpenPeople,
    },
    {
      label: 'Tutors',
      value: activeTutors,
      sub: 'On the team',
      onClick: onOpenPeople,
    },
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <Eyebrow>01 · THIS MONTH</Eyebrow>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="relative grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
        {stats.map((s) => {
          const v = String(s.value);
          const sizeClass =
            v.length <= 4
              ? 'text-4xl sm:text-5xl lg:text-[56px]'
              : v.length <= 8
                ? 'text-3xl sm:text-4xl lg:text-5xl'
                : 'text-2xl sm:text-3xl lg:text-4xl';
          return (
            <button
              key={s.label}
              type="button"
              onClick={s.onClick}
              className={cn(
                'group relative bg-[hsl(0_0%_10%)] px-4 py-5 sm:px-7 sm:py-8 flex flex-col text-left touch-manipulation active:scale-[0.99]',
                'hover:bg-elec-yellow/[0.04] transition-all',
                s.accent &&
                  'bg-gradient-to-br from-elec-yellow/[0.08] via-amber-500/[0.03] to-transparent hover:from-elec-yellow/[0.14]'
              )}
            >
              <div
                className={cn(
                  'text-[10.5px] font-semibold uppercase tracking-[0.18em]',
                  s.accent ? 'text-elec-yellow' : 'text-white/75'
                )}
              >
                {s.label}
              </div>
              <span
                className={cn(
                  'mt-2.5 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none',
                  sizeClass,
                  s.accent ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {s.value}
              </span>
              <span className="mt-2.5 text-[11.5px] text-white/80 group-hover:text-white transition-colors leading-snug">
                {s.sub}
              </span>
            </button>
          );
        })}
      </motion.div>
    </motion.section>
  );
}

/* ──────────────── 02 · YOUR HUBS (EditorialHubGrid look-alike) ──── */

interface HubDef {
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  /** What opening the card does — a route push or a section switch. */
  onOpen: () => void;
  /** Amber cue + meta highlight when there's something pressing inside. */
  urgent?: boolean;
}

function CollegeHubs({ hubs }: { hubs: HubDef[] }) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants} className="flex items-baseline justify-between gap-3">
        <Eyebrow>GET AROUND</Eyebrow>
        <span className="text-[11px] text-white/50 tabular-nums">{hubs.length} areas</span>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="relative grid gap-px bg-white/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
        {hubs.map((hub, i) => (
          <button
            key={hub.title}
            type="button"
            onClick={hub.onOpen}
            className="group relative bg-[hsl(0_0%_10%)] hover:bg-elec-yellow/[0.04] active:scale-[0.99] transition-all p-5 sm:p-7 text-left touch-manipulation flex flex-col min-h-[160px] sm:min-h-[200px]"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/75">
                · {hub.eyebrow}
              </span>
              {hub.urgent && (
                <span className="ml-auto h-2 w-2 rounded-full bg-amber-400 shrink-0" aria-hidden />
              )}
            </div>
            <h3 className="mt-3 sm:mt-5 text-[22px] sm:text-[26px] lg:text-[30px] font-semibold tracking-tight leading-[1.1] text-white group-hover:text-elec-yellow transition-colors">
              {hub.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/85 max-w-[34ch]">
              {hub.description}
            </p>
            <div className="flex-grow" />
            <div className="mt-4 sm:mt-6 flex items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-white/[0.08]">
              <span
                className={cn(
                  'text-[11.5px] truncate tabular-nums',
                  hub.urgent ? 'text-amber-300 font-medium' : 'text-white/85'
                )}
              >
                {hub.meta}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-elec-yellow shrink-0">
                Open
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </button>
        ))}
      </motion.div>
    </motion.section>
  );
}

/* ──────────────── Numbered section header (03 · TODAY etc) ──────── */

function NumberedHeader({
  number,
  label,
  action,
  onAction,
  collapsible,
  isCollapsed,
  onToggle,
}: {
  number: string;
  label: string;
  action?: string;
  onAction?: () => void;
  collapsible?: boolean;
  isCollapsed?: boolean;
  onToggle?: () => void;
}) {
  const inner = (
    <div className="flex items-baseline justify-between gap-3">
      <Eyebrow>{number ? `${number} · ${label}` : label}</Eyebrow>
      <div className="flex items-center gap-3 shrink-0">
        {action && onAction && !isCollapsed && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAction();
            }}
            className="text-[11.5px] font-semibold text-elec-yellow hover:text-elec-yellow/90 transition-colors touch-manipulation"
          >
            {action} →
          </button>
        )}
        {collapsible && (
          <span
            className={cn(
              'text-white/75 text-[13px] transition-transform select-none',
              isCollapsed ? '' : 'rotate-180'
            )}
            aria-hidden
          >
            ▾
          </span>
        )}
      </div>
    </div>
  );
  if (!collapsible) return inner;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle?.();
        }
      }}
      className="w-full text-left touch-manipulation active:opacity-70 transition-opacity cursor-pointer"
      aria-expanded={!isCollapsed}
    >
      {inner}
    </div>
  );
}

/* ──────────────── Main component ─────────────────────────────────── */

export function CollegeOverviewSection({ onNavigate }: CollegeOverviewSectionProps) {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { students, getStaffByRole, getPendingGradesData, isLoading } = useCollegeSupabase();
  const { data: today } = useTutorToday();
  const { collapsed, toggle } = useDashCollapse();

  const firstName = useMemo(() => {
    const full = profile?.full_name?.trim();
    if (!full) return null;
    return full.split(/\s+/)[0]?.toUpperCase() ?? null;
  }, [profile?.full_name]);

  const activeTutors = getStaffByRole('tutor').length;
  const activeStudents = students.filter((s) => s.status?.toLowerCase() === 'active').length;
  const pendingAssessments = getPendingGradesData().length;
  const atRiskCount = today?.counts.at_risk ?? 0;

  // Verdict line — picks the most pressing single fact and surfaces it.
  // Order: pending assessments > at-risk learners > inbox load > the
  // calm default. This is the same shape as Dashboard.tsx — verdict
  // over data.
  const verdict = useMemo(() => {
    const inboxTotal =
      (today?.counts.otj_awaiting ?? 0) +
      (today?.counts.comments_action_required ?? 0) +
      (today?.counts.iqa_awaiting ?? 0);
    if (pendingAssessments > 0) {
      return `${pendingAssessments} learner${pendingAssessments === 1 ? '' : 's'} waiting for a grade — clear before the weekend if you can.`;
    }
    if (atRiskCount > 0) {
      return `${atRiskCount} learner${atRiskCount === 1 ? ' is' : 's are'} flagged at risk. Today's a good day for a check-in.`;
    }
    if (inboxTotal > 0) {
      return `${inboxTotal} item${inboxTotal === 1 ? '' : 's'} in your inbox — OTJ verifications, action comments, IQA verdicts.`;
    }
    return `Quiet ${partOfDay().toLowerCase()} — no assessments pending, no risk flags. A good window to plan ahead.`;
  }, [pendingAssessments, atRiskCount, today]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
      </div>
    );
  }

  const inboxTotal =
    (today?.counts.otj_awaiting ?? 0) +
    (today?.counts.comments_action_required ?? 0) +
    (today?.counts.iqa_awaiting ?? 0);

  // The six job-based areas. Every College Hub feature lives under exactly one
  // of these — no orphans, nothing more than two clicks from here.
  const hubs: HubDef[] = [
    {
      eyebrow: 'Your day',
      title: 'My Work',
      description: "Today's classes, your inbox, marking and OTJ to verify.",
      meta: inboxTotal > 0 ? `${inboxTotal} waiting on you` : 'Inbox clear',
      urgent: inboxTotal > 0,
      onOpen: () => navigate('/college/today'),
    },
    {
      eyebrow: 'Students & staff',
      title: 'People',
      description: 'Learners (Student 360), tutors, cohorts, support staff.',
      meta: `${activeStudents} active learners`,
      onOpen: () => onNavigate('peoplehub'),
    },
    {
      eyebrow: 'Plan & deliver',
      title: 'Teaching',
      description: 'Lesson plans, schemes of work, resources, curriculum, notebook.',
      meta: 'Lesson planner ready',
      onOpen: () => onNavigate('curriculumhub'),
    },
    {
      eyebrow: 'Grade & track',
      title: 'Assessment',
      description: 'Grading, attendance, ILPs, EPA & gateway, portfolio, OTJ.',
      meta: pendingAssessments > 0 ? `${pendingAssessments} to mark` : 'All caught up',
      urgent: pendingAssessments > 0,
      onOpen: () => onNavigate(pendingAssessments > 0 ? 'grading' : 'assessmenthub'),
    },
    {
      eyebrow: 'IQA & Ofsted',
      title: 'Quality & Compliance',
      description: 'IQA sampling, reports, Ofsted EIF, SAR, QIP, audit pack, policies.',
      meta: 'Inspection-ready',
      onOpen: () => onNavigate('qualityhub'),
    },
    {
      eyebrow: 'Configure',
      title: 'Settings',
      description: 'Curriculum & operational settings, integrations, staff roles.',
      meta: 'Admin & config',
      onOpen: () => onNavigate('collegesettings'),
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full mx-auto max-w-7xl space-y-7 sm:space-y-12 lg:space-y-16"
    >
      {/* HERO */}
      <CollegeHero
        firstName={firstName}
        verdict={verdict}
        cta={{ label: "View today's queue", onClick: () => navigate('/college/today') }}
      />

      {/* SAFEGUARDING GATE — renders only when concerns can't be routed to a DSL. */}
      <motion.div variants={itemVariants}>
        <SafeguardingReadinessBanner />
      </motion.div>

      {/* GET AROUND — the six areas first: the clear answer to "where do I go?" */}
      <CollegeHubs hubs={hubs} />

      {/* JUMP TO A LEARNER — Student 360, the most-used destination. */}
      <motion.div variants={itemVariants}>
        <LearnerQuickJump />
      </motion.div>

      {/* TODAY — the actionable daily view (its own KPI strip, classes, inbox,
          at-risk). TutorTodayBody in bare embed mode (the hero above greets). */}
      <motion.section variants={itemVariants} className="space-y-4">
        <NumberedHeader
          number=""
          label="TODAY"
          action="Open full view"
          onAction={() => navigate('/college/today')}
        />
        <TutorTodayBody mode="embed-bare" />
      </motion.section>

      {/* MOMENTUM — collapsible below-the-fold detail */}
      <motion.section variants={itemVariants} className="space-y-4">
        <NumberedHeader
          number=""
          label="MOMENTUM"
          collapsible
          isCollapsed={collapsed.has('momentum')}
          onToggle={() => toggle('momentum')}
        />
        {!collapsed.has('momentum') && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <AtRiskPredictor onNavigate={onNavigate} compact />
              <EPACountdown onNavigate={onNavigate} compact />
            </div>
            <ActivityFeed maxItems={6} iconless />
          </>
        )}
      </motion.section>

      {/* COMPLIANCE — collapsible below-the-fold detail */}
      <motion.section variants={itemVariants} className="space-y-4">
        <NumberedHeader
          number=""
          label="COMPLIANCE"
          action="Open hub"
          onAction={() => onNavigate('compliancedocs')}
          collapsible
          isCollapsed={collapsed.has('compliance')}
          onToggle={() => toggle('compliance')}
        />
        {!collapsed.has('compliance') && (
          <>
            <div className="space-y-3 sm:space-y-4">
              <MyAcknowledgementsWidget />
              <VerifierInboxWidget />
              <TopExpiringWidget />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-3 sm:gap-4">
              <MyComplianceWidget />
              <ComplianceLeadsWidget />
            </div>
          </>
        )}
      </motion.section>

    </motion.div>
  );
}
