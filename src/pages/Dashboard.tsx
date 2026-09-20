/**
 * Dashboard
 *
 * The first page users see. Editorial layout — verdict over data, numbered
 * sections, hairline grids, role-aware copy. Composes from college editorial
 * primitives so the whole product feels like one designer's hand.
 *
 * Flow:
 *   ——   GREETING      — "Hello, Andrew." + verdict line + CTA pill
 *   ——   RESUME        — pick up where you left off (draft cert/quote)
 *   ——   QUICK ACCESS  — one-tap launchers for the daily tools
 *   01 · THIS MONTH    — calm monochrome stat strip (every cell clickable)
 *   02 · YOUR HUBS     — monochrome hub cards (incl. Mate teaser + Bring a Mate referral)
 *   03 · MOMENTUM      — newspaper-style closer
 *
 * Single accent: elec-yellow on arrows / one stat cell when relevant.
 * No multi-colour tone gradients — restraint is the whole point.
 * Apprentice and electrician roles each see their own variant.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DashboardContainer } from '@/components/dashboard/DashboardContainer';
import TrialBanner from '@/components/dashboard/TrialBanner';
import TrialReceiptCard from '@/components/dashboard/TrialReceiptCard';
import ResumeCard from '@/components/dashboard/editorial/ResumeCard';
import WelcomeModal from '@/components/onboarding/WelcomeModal';
import FirstWeekChecklist from '@/components/dashboard/FirstWeekChecklist';

import { EditorialHubGrid } from '@/components/dashboard/editorial/EditorialHubGrid';
import { ReferralRaceCard } from '@/components/referrals/ReferralRaceCard';
import { MateBar } from '@/components/business-hub/MateBar';
import { Assistant } from '@/components/business-hub/Assistant';
import { useSparkTasks } from '@/hooks/useSparkTasks';
import DiaryPanel from '@/components/calendar/DiaryPanel';
import {
  HubQuickStart,
  HubKpi,
  HubKpiRow,
  type HubQuickAction,
} from '@/components/hub/HubPrimitives';

import { DashboardDataProvider, useSharedDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';
import useSEO from '@/hooks/useSEO';
import { storageGetSync } from '@/utils/storage';

// Exact, not "£6.0k". A KPI card has room for six characters, and the whole
// point of the figure is that it is money someone owes you — rounding £6,027
// to £6.0k loses £27 and makes three pages show three different numbers for
// the same thing.
const money = (v: number) => `£${Math.round(v).toLocaleString('en-GB')}`;

// `as const` on the spring type: framer-motion's Variants wants the literal
// 'spring', and a widened `string` fails to satisfy AnimationGeneratorType —
// which is why this whole object would not assign to Variants.
const Dashboard = () => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);

  // Safety net: redirect users with NULL role to complete their profile
  useEffect(() => {
    if (!isLoading && user && profile && !profile.role) {
      navigate('/auth/complete-profile');
    }
  }, [profile, isLoading, user, navigate]);

  // Private page - don't index
  useSEO({
    title: 'Dashboard',
    description: 'Your Elec-Mate dashboard - manage training, tools, and business',
    noindex: true,
  });

  // Show welcome modal for first-time users
  useEffect(() => {
    if (!isLoading && profile && !profile.onboarding_completed) {
      if (storageGetSync('elec-mate-onboarding-done')) return;
      const timer = setTimeout(() => setShowWelcome(true), 500);
      return () => clearTimeout(timer);
    }
  }, [profile, isLoading]);

  return (
    <DashboardContainer>
      <DashboardDataProvider>
        <div className="space-y-10 sm:space-y-14">
          {/* First week — seven day-dots and four things that tick themselves
              off. Replaces the first-visit banner (retention plan, 20 Sep 2026):
              three active days in the first seven is what predicts who stays,
              so the dashboard shows that, not a feature tour. Hides itself once
              they have three days and a real document, or after day eight. */}
          <FirstWeekChecklist />

          {/* Trial receipt — their own numbers ("3 certs, £4,200 quoted")
              while the trial runs; flips to an activation nudge when they
              haven't made anything yet. */}
          <TrialReceiptCard />

          {/* August Referral Race — everyone, whole campaign, not dismissible.
              Self-hides after 31 Aug. */}
          <ReferralRaceCard />

          {/* Editorial dashboard — single component so it can read the
              shared dashboard context the parent provider mounts. */}
          <EditorialDashboard />

          {/* Trial banner only — referral now lives inside the editorial flow
              as section 05 (BringAMate), gated to first 7 days. */}
          <TrialBanner />

          {/* Footer spacing for mobile nav */}
          <div className="h-4 sm:h-6" />
        </div>

        {/* Welcome modal for first-time users */}
        <WelcomeModal isOpen={showWelcome} onClose={() => setShowWelcome(false)} />
      </DashboardDataProvider>
    </DashboardContainer>
  );
};

export default Dashboard;

/**
 * EditorialDashboard — the dashboard body, rebuilt on the shared hub shell.
 *
 * This is the app's front door, and it opened with roughly 340px of greeting:
 * a date eyebrow, "Hello, ANDREW." at 64px, a verdict sentence and a CTA —
 * the whole first screen, on the one page every user lands on every session.
 * Four hub pages had the same hero and it came out of all of them; this is the
 * one where it cost the most.
 *
 * The verdict was the only load-bearing part ("4 overdue invoices worth
 * £6,126"), and a sentence is the wrong shape for it: you cannot act on a
 * sentence. It is now a KPI row you can tap and a work list that names each
 * invoice.
 *
 * Order is deliberate and unchanged in intent — where was I, what needs me,
 * what do I start, where do I go:
 *
 *   Mate → how am I doing (KPIs) → what needs me → pick up where I left off
 *        → start something → your hubs
 *
 * MOMENTUM went. "12 invoices total · 3 active quotes · 140 certificates" is a
 * scoreboard of things that only ever go up; none of it changes what you do
 * next, and it was the last thing on the page nobody scrolled to.
 */
function EditorialDashboard() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const data = useSharedDashboardData();
  const isApprentice = profile?.role === 'apprentice';

  const [mateOpen, setMateOpen] = useState(false);
  const { tasks, saveTask, updateTask, deleteTask, markDone } = useSparkTasks('all');

  // ⌘K opens Mate here too — same binding as every hub, so the shortcut does
  // not change meaning depending on which page you happen to be on.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setMateOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const { business, certificates, learning } = data;

  // ── Start something ──────────────────────────────────────────────────
  const quickStart: HubQuickAction[] = isApprentice
    ? [
        {
          title: 'Study now',
          description: 'Pick up your course',
          onClick: () => navigate('/study-centre/apprentice'),
          primary: true,
        },
        {
          title: 'Flashcards',
          description: 'Ten minutes of revision',
          onClick: () => navigate('/apprentice/on-job-tools/flashcards'),
        },
        {
          title: 'Mock exam',
          description: 'Test yourself',
          onClick: () => navigate('/study-centre/mock-exams'),
        },
        {
          title: 'On-job tools',
          description: 'What you need on site',
          onClick: () => navigate('/apprentice/on-job-tools'),
        },
      ]
    : [
        {
          title: 'New certificate',
          description: 'EICR, EIC or Minor Works',
          onClick: () => navigate('/electrician/inspection-testing'),
          primary: true,
        },
        {
          title: 'New quote',
          description: 'Price up a job',
          onClick: () => navigate('/electrician/quotes'),
        },
        {
          title: 'New invoice',
          description: 'Bill completed work',
          onClick: () => navigate('/electrician/invoices'),
        },
        {
          title: 'Site safety',
          description: 'RAMS and permits',
          onClick: () => navigate('/electrician/site-safety'),
        },
      ];

  return (
    <div className="space-y-8 sm:space-y-10">
      <MateBar onOpen={() => setMateOpen(true)} />

      {/* Start something FIRST. These pages opened with state — how much you
          are owed, what is unfinished — and put the handful of things you might
          actually begin below all of it. Someone opening the app on a van seat is
          far more often here to start a cert than to read a figure, and the
          figures are still one scroll away. */}
      <HubQuickStart label="Start something" items={quickStart} />

      {/* What is next, before the figures. An apprentice has no diary to keep,
          so they get the KPI row straight away. */}
      {!isApprentice && <DiaryPanel variant="compact" />}

      <HubKpiRow>
        {isApprentice ? (
          <>
            <HubKpi
              accent
              label="Streak"
              value={String(learning.currentStreak)}
              verdict={learning.studiedToday ? 'Studied today' : 'Open today'}
              onClick={() => navigate('/study-centre/apprentice')}
            />
            <HubKpi
              label="Sessions"
              value={String(learning.totalSessions)}
              verdict="All time"
              onClick={() => navigate('/study-centre/apprentice')}
            />
            <HubKpi
              label="Cards reviewed"
              value={String(learning.totalCardsReviewed)}
              verdict="All time"
              onClick={() => navigate('/study-centre/apprentice')}
            />
            <HubKpi
              label="Best run"
              value={String(learning.longestStreak)}
              verdict="Longest streak"
              onClick={() => navigate('/study-centre/leaderboard')}
            />
          </>
        ) : (
          <>
            <HubKpi
              accent
              label="Overdue"
              value={money(business.overdueValue)}
              sentiment={business.overdueInvoices > 0 ? 'bad' : 'neutral'}
              direction={business.overdueInvoices > 0 ? 'up' : 'flat'}
              verdict={business.overdueInvoices > 0 ? 'Chase the oldest first' : 'Nothing overdue'}
              context={
                business.overdueInvoices > 0
                  ? `${business.overdueInvoices} invoice${business.overdueInvoices === 1 ? '' : 's'}`
                  : 'All invoices within terms'
              }
              onClick={() => navigate('/electrician/invoices?filter=overdue')}
            />
            <HubKpi
              label="Certs in progress"
              value={String(certificates.expiringSoon)}
              verdict={
                certificates.expiringSoon > 0 ? 'Finish and issue these' : 'Nothing part-written'
              }
              context={certificates.total > 0 ? `${certificates.total} on file` : undefined}
              onClick={() => navigate('/electrician/inspection-testing?section=my-reports')}
            />
            <HubKpi
              label="Open jobs"
              value={String(business.activeProjects)}
              verdict={business.activeProjects > 0 ? 'On the go right now' : 'Nothing open'}
              onClick={() => navigate('/electrician/projects')}
            />
            <HubKpi
              label="Pipeline"
              value={business.formattedQuoteValue}
              verdict={
                business.activeQuotes > 0
                  ? `${business.activeQuotes} with clients`
                  : 'Nothing out with a client'
              }
              context={
                business.activeQuotes === 0 && business.draftQuotes > 0
                  ? `${business.draftQuotes} priced up, not sent`
                  : undefined
              }
              onClick={() => navigate('/electrician/quotes')}
            />
          </>
        )}
      </HubKpiRow>

      {/* Where was I. Renders nothing when there is nothing in flight. */}
      <ResumeCard />

      <EditorialHubGrid label="Your hubs" />

      <Assistant
        isOpen={mateOpen}
        onClose={() => setMateOpen(false)}
        currentTasks={tasks}
        onSave={saveTask}
        onUpdate={updateTask}
        onMarkDone={markDone}
        onDelete={deleteTask}
      />
    </div>
  );
}
