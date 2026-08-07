/**
 * WorkerToolsHub — self-service hub for employed electricians.
 *
 * Rebuilt on the shared hub primitives. It was the last page besides Site
 * Safety still drawn in the old editorial dialect it inherited from the
 * Electrician Hub: a "Hello, NAME." hero, numbered `01 · AT A GLANCE` …
 * `05 · COMMS & REPORTS` sections, and a hairline grid of 200–220px cells each
 * stamped with its own `01 ·`, `02 ·` index. Once the hub above it moved, this
 * was one tap away and looked like a different application.
 *
 * What changed, beyond the shell:
 *
 *   The hero verdict — "Clocked in 2h 15m, 3 tasks open, 2 unread" — was the
 *   stat band directly beneath it written out as a sentence. The stat band
 *   keeps the numbers; the sentence has gone.
 *
 *   The per-card colour coding (emerald for clocked in, amber for tasks,
 *   purple for unread) was a four-colour scheme carrying no meaning the words
 *   didn't. Volt now marks the one thing it means everywhere else in the app:
 *   work that is outstanding.
 *
 *   Sections regrouped to three or four cards each. "WORK" held five, or six
 *   for a QS, and the grid is auto-fit at four tracks — so it wrapped and left
 *   a hole on the end.
 *
 * Each tool is its own routed page under /electrician/worker-tools/*.
 */

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { Briefcase, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useWorkerSelfService } from '@/hooks/useWorkerSelfService';
import { useMyLatestLocation } from '@/hooks/useWorkerLocations';
import { JoinTeamCard } from '@/components/worker-tools/JoinTeamCard';
import { useMyTasks } from '@/hooks/useJobTasks';
import { useQsTeamContext } from '@/hooks/useQsReview';
import { useQsPendingCount } from '@/hooks/useQsReviewQueue';
import { MessagesSheet } from '@/components/auth/MessagesSheet';
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

// Dev mode whitelist - allows access without employee record (dev builds only;
// never bypasses the team gate in production bundles)
const DEV_WHITELIST = import.meta.env.DEV
  ? ['founder@elec-mate.com', 'andrewgangoo91@gmail.com']
  : [];

const BASE = '/electrician/worker-tools';

// Worker Status helpers
const getStatusLabel = (status?: string): string => {
  switch (status) {
    case 'On Site':
      return 'On Site';
    case 'En Route':
      return 'En Route';
    case 'Office':
      return 'In Office';
    case 'Off Duty':
      return 'Off Duty';
    default:
      return 'Not Set';
  }
};

const formatDuration = (dur: string): string => {
  const parts = dur.split(':');
  if (parts.length >= 2) {
    const hours = parseInt(parts[0], 10);
    const mins = parseInt(parts[1], 10);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  }
  return dur;
};

export default function WorkerToolsHub() {
  useSEO({
    title: 'Worker Tools',
    description:
      'Self-service hub for employed electricians. Timesheets, leave, team comms, and expenses.',
    noindex: true,
  });
  const navigate = useNavigate();

  const [messagesOpen, setMessagesOpen] = useState(false);

  const { user } = useAuth();
  const { data: myTasks = [] } = useMyTasks();
  const openTaskCount = myTasks.filter((t) => t.status !== 'Done').length;

  // QS reviews — surfaced to any team worker (originator-first: see the QS's
  // feedback on your certs). A worker who's also a QS gets the reviewer side too.
  const { data: qsCtx } = useQsTeamContext();
  const amIQs = Boolean(qsCtx?.am_i_qs);
  const isTeamMember = Boolean(qsCtx?.is_team_member);
  const qsPending = useQsPendingCount();

  // Push deep-links land here with ?task=<id> / ?signoff — redirect to the page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('task')) {
      navigate(`${BASE}/tasks${window.location.search}`, { replace: true });
    } else if (params.get('signoff')) {
      navigate(`${BASE}/signoffs${window.location.search}`, { replace: true });
    }
  }, [navigate]);

  const {
    employee,
    isLoadingEmployee,
    hasEmployeeRecord,
    isClockedIn,
    duration,
    todaysHours,
    leaveAllowance,
    unreadCount,
    activeJobsCount,
  } = useWorkerSelfService();

  // Presence for the My Status card — from the worker's latest location row.
  // employee.status is EMPLOYMENT status ('active'), never 'On Site' etc.
  const { data: myLocation } = useMyLatestLocation(employee?.id);

  // Dev mode: allow whitelisted emails to access without employee record
  const isDevMode = user?.email && DEV_WHITELIST.includes(user.email);
  const hasAccess = hasEmployeeRecord || isDevMode;

  // Loading state
  if (isLoadingEmployee) {
    return (
      <div className="min-h-screen bg-elec-dark flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  // No employee record and not in dev mode - show join-team gate
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-elec-dark">
        <div className="mx-auto max-w-lg md:max-w-2xl px-4 md:px-6 py-8">
          <Link to="/electrician">
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/[0.05] -ml-2 h-11 touch-manipulation mb-6"
            >
              ← Back
            </Button>
          </Link>

          {/* Neutral surface, not bg-elec-yellow/10 — a translucent volt on
              this ground goes muddy brown. */}
          <div className="text-center py-8 mb-6">
            <div className="w-20 h-20 rounded-2xl border border-white/[0.18] bg-white/[0.06] flex items-center justify-center mx-auto mb-6">
              <Briefcase className="h-10 w-10 text-elec-yellow" />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Worker Tools
            </span>
            <h1 className="mt-2 text-2xl font-bold text-white mb-3">Join your team</h1>
            <p className="text-white max-w-sm mx-auto text-[13px] leading-relaxed">
              Your account isn't linked to a company team yet. If your employer added you by email,
              signing in with that email links you automatically — otherwise enter their team invite
              code below.
            </p>
          </div>

          <JoinTeamCard onJoined={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  const remainingDays = leaveAllowance?.remainingDays ?? null;

  // ── Start something ──────────────────────────────────────────────────
  // The hero verdict that used to sit here ("Clocked in 2h 15m, 3 tasks open,
  // 2 unread") was the KPI row below it written out as a sentence, under a
  // 56px "Hello, NAME." Clocking in was the only load-bearing thing in it, so
  // that is what survives — as the primary card, where every other hub puts
  // its most-reached-for action.
  const quickStart: HubQuickAction[] = [
    {
      title: isClockedIn ? `Clock out · ${formatDuration(duration)}` : 'Clock in',
      description: isClockedIn ? 'End your shift' : 'Start your shift',
      onClick: () => navigate(`${BASE}/timesheets`),
      primary: true,
    },
    {
      title: 'Request leave',
      description: remainingDays !== null ? `${remainingDays} days left` : 'Book time off',
      onClick: () => navigate(`${BASE}/leave`),
    },
    {
      title: 'Claim an expense',
      description: 'Receipt or mileage',
      onClick: () => navigate(`${BASE}/expenses`),
    },
    {
      title: 'Log a progress note',
      description: 'Against a job',
      onClick: () => navigate(`${BASE}/progress-notes`),
    },
  ];

  /*
   * ── Tool groups ──────────────────────────────────────────────────────
   *
   * Three or four cards each. "WORK" held five — six for a QS — and the grid
   * is auto-fit at four tracks, so it wrapped and left a hole on the end.
   * Splitting sign-off work out fixes it in both cases: two cards with a QS
   * role, one without, and any count up to four fills the row.
   *
   * No eyebrows and no per-card colour tones. Emerald for clocked in, amber
   * for tasks and purple for unread was a four-colour scheme carrying nothing
   * the words didn't already say, and it left volt — the app's one signal for
   * "outstanding" — meaning nothing here.
   */
  const todayCards: HubTool[] = [
    {
      id: 'timesheets',
      title: 'Timesheets',
      to: `${BASE}/timesheets`,
      value: isClockedIn
        ? formatDuration(duration)
        : todaysHours > 0
          ? `${todaysHours.toFixed(1)}h`
          : undefined,
      valueLabel: isClockedIn ? 'on the clock' : todaysHours > 0 ? 'logged today' : undefined,
      description: 'Clock in and out and review your logged hours.',
      alert: isClockedIn,
    },
    {
      id: 'tasks',
      title: 'My Tasks',
      to: `${BASE}/tasks`,
      value: openTaskCount > 0 ? String(openTaskCount) : undefined,
      valueLabel: openTaskCount > 0 ? 'still open' : undefined,
      description: 'Track what’s on your plate and claim up-for-grabs tickets.',
      alert: openTaskCount > 0,
    },
    {
      id: 'jobs',
      title: 'My Jobs',
      to: `${BASE}/jobs`,
      value: activeJobsCount > 0 ? String(activeJobsCount) : undefined,
      valueLabel: activeJobsCount > 0 ? 'assigned to you' : undefined,
      description: 'See the jobs you’re assigned to and where they’re up to.',
    },
    {
      id: 'status',
      title: 'My Status',
      to: `${BASE}/status`,
      value: myLocation?.status ? getStatusLabel(myLocation.status) : undefined,
      valueLabel: myLocation?.status ? 'right now' : undefined,
      description: 'Set where you are so the team can see your availability.',
    },
  ];

  const signOffCards: HubTool[] = [
    {
      id: 'signoffs',
      title: 'Sign-offs',
      description: 'Review and sign RAMS and job packs sent to you.',
      to: `${BASE}/signoffs`,
    },
    ...(isTeamMember || amIQs
      ? [
          {
            id: 'qs-reviews',
            title: 'QS Reviews',
            to: `${BASE}/qs-reviews`,
            value: amIQs && qsPending > 0 ? String(qsPending) : undefined,
            valueLabel: amIQs && qsPending > 0 ? 'awaiting your sign-off' : undefined,
            description: amIQs
              ? 'Your QS feedback, plus certificates awaiting your sign-off.'
              : 'Your QS’s feedback on your certificates — edit and resubmit.',
            alert: amIQs && qsPending > 0,
          },
        ]
      : []),
  ];

  const payCards: HubTool[] = [
    {
      id: 'pay',
      title: 'My Pay',
      description: 'Approved hours, what you’ve earned, and what’s owed.',
      to: `${BASE}/pay`,
    },
    {
      id: 'leave',
      title: 'Leave',
      to: `${BASE}/leave`,
      value: remainingDays !== null ? String(remainingDays) : undefined,
      valueLabel: remainingDays !== null ? 'days left' : undefined,
      description: 'Request time off and track your remaining allowance.',
    },
    {
      id: 'expenses',
      title: 'Expenses',
      description: 'Submit expense claims and track their approval.',
      to: `${BASE}/expenses`,
    },
  ];

  const recordCards: HubTool[] = [
    {
      id: 'credentials',
      title: 'Credentials',
      description: 'Your Elec-ID, qualifications and verified credentials.',
      to: `${BASE}/credentials`,
    },
    {
      id: 'equipment',
      title: 'My Equipment',
      description: 'Tools assigned to you with PAT and calibration status.',
      to: `${BASE}/equipment`,
    },
    {
      id: 'progress-notes',
      title: 'Progress Notes',
      description: 'Log daily progress notes against your jobs.',
      to: `${BASE}/progress-notes`,
    },
  ];

  const commsCards: HubTool[] = [
    {
      id: 'comms',
      title: 'Team Comms',
      to: `${BASE}/comms`,
      value: unreadCount > 0 ? String(unreadCount) : undefined,
      valueLabel: unreadCount > 0 ? 'unread' : undefined,
      description: 'Announcements and messages from your team.',
      alert: unreadCount > 0,
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'Message your employer and team directly.',
      onClick: () => setMessagesOpen(true),
    },
    {
      id: 'reports',
      title: 'Reports',
      description: 'Raise a snag, near-miss or safety incident on a job.',
      to: `${BASE}/reports`,
    },
  ];

  return (
    <HubPage>
      <HubMasthead section="Worker" title="Worker Tools" backTo="/electrician" />

      <HubBody>

        {/* Start something FIRST. These pages opened with state — how much you
            are owed, what is unfinished — and put the handful of things you might
            actually begin below all of it. Someone opening the app on a van seat is
            far more often here to start a cert than to read a figure, and the
            figures are still one scroll away. */}
        <HubQuickStart label="Start something" items={quickStart} />

        <HubKpiRow>
          <HubKpi
            accent
            label="Today"
            value={isClockedIn ? formatDuration(duration) : `${todaysHours.toFixed(1)}h`}
            sentiment={isClockedIn ? 'good' : 'neutral'}
            verdict={isClockedIn ? 'On the clock now' : todaysHours > 0 ? 'Logged so far today' : 'Not clocked in'}
            onClick={() => navigate(`${BASE}/timesheets`)}
          />
          <HubKpi
            label="Open tasks"
            value={String(openTaskCount)}
            verdict={openTaskCount > 0 ? 'Still on your plate' : 'Nothing outstanding'}
            onClick={() => navigate(`${BASE}/tasks`)}
          />
          <HubKpi
            label="Leave left"
            value={remainingDays !== null ? String(remainingDays) : '—'}
            verdict={remainingDays !== null ? 'Days of allowance' : 'Allowance not set'}
            onClick={() => navigate(`${BASE}/leave`)}
          />
          <HubKpi
            label="Unread"
            value={String(unreadCount)}
            sentiment={unreadCount > 0 ? 'bad' : 'neutral'}
            verdict={unreadCount > 0 ? 'Messages waiting' : 'All caught up'}
            onClick={() => navigate(`${BASE}/comms`)}
          />
        </HubKpiRow>

        <HubToolGrid label="Today" cards={todayCards} columns="four" />

        <HubToolGrid label="Sign-offs" cards={signOffCards} columns="four" />

        <HubToolGrid label="Pay & leave" cards={payCards} columns="four" />

        <HubToolGrid label="Kit & records" cards={recordCards} columns="four" />

        <HubToolGrid label="Comms & reports" cards={commsCards} columns="four" />
      </HubBody>

      <MessagesSheet open={messagesOpen} onOpenChange={setMessagesOpen} />
    </HubPage>
  );
}
