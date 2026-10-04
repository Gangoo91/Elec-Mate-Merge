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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';

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
  EditBar,
  EditFrame,
  FrameButton,
  HiddenBlocks,
  HubCardsSheet,
  NumbersChoice,
  ShortcutsSheet,
} from '@/components/dashboard/HomeEditMode';
import {
  HOME_PRESETS,
  HOME_SHORTCUTS,
  matchingPreset,
  useHomeLayout,
  type HomeBlockId,
} from '@/hooks/useHomeLayout';
import { toast } from 'sonner';
import { trackFeatureUse } from '@/components/ActivityTracker';
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
  // Lifted so the campaign cards above the layout step aside while editing.
  const [editing, setEditing] = useState(false);

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
          {!editing && <FirstWeekChecklist />}

          {/* Trial receipt — their own numbers ("3 certs, £4,200 quoted")
              while the trial runs; flips to an activation nudge when they
              haven't made anything yet. */}
          {!editing && <TrialReceiptCard />}

          {/* August Referral Race — everyone, whole campaign, not dismissible.
              Self-hides after 31 Aug. */}
          {!editing && <ReferralRaceCard />}

          {/* Editorial dashboard — single component so it can read the
              shared dashboard context the parent provider mounts. */}
          <EditorialDashboard editing={editing} setEditing={setEditing} />

          {/* Trial banner only — referral now lives inside the editorial flow
              as section 05 (BringAMate), gated to first 7 days. */}
          {!editing && <TrialBanner />}

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
 * Default order (no saved layout) — where was I, what needs me, what do I
 * start, where do I go:
 *
 *   Mate → start something → diary → how am I doing (KPIs)
 *        → pick up where I left off → your hubs
 *
 * Since ELE-1804 every block can be hidden and reordered per user, the four
 * shortcuts are the user's own, and the figures can be business or study —
 * see useHomeLayout. The apprentice/electrician split is now just the default.
 *
 * MOMENTUM went. "12 invoices total · 3 active quotes · 140 certificates" is a
 * scoreboard of things that only ever go up; none of it changes what you do
 * next, and it was the last thing on the page nobody scrolled to.
 */
function EditorialDashboard({
  editing,
  setEditing,
}: {
  editing: boolean;
  setEditing: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const data = useSharedDashboardData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [mateOpen, setMateOpen] = useState(false);
  const { tasks, saveTask, updateTask, deleteTask, markDone } = useSparkTasks('all');

  // ELE-1804 — what shows, in what order, is now the user's call. No saved
  // layout = exactly the old fixed layout for their role.
  const {
    layout,
    isLoading: layoutLoading,
    isVisible,
    dismissHint,
    update,
    applyPreset,
    reset,
    flush,
  } = useHomeLayout();

  // Edit mode — the real page, with ▲ ▼ Hide on every block (see HomeEditMode).
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [hubsOpen, setHubsOpen] = useState(false);

  const openCustomise = (source: string) => {
    setEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (user) trackFeatureUse(user.id, 'home_customise_opened', { source });
  };

  const finishEditing = () => {
    void flush();
    setEditing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast('Home screen saved');
    // What people actually choose — the point of ELE-1804 is to learn this.
    if (user)
      trackFeatureUse(user.id, 'home_customise_saved', {
        preset: matchingPreset(layout) ?? 'custom',
        blocks: layout.order.filter(isVisible),
        shortcuts: layout.shortcuts,
        numbers: layout.numbers,
      });
  };

  // Reset and the three layouts replace the whole arrangement in one tap —
  // offer the way back rather than a confirm dialog in the way of every tap.
  const replaceLayout = (apply: () => void, message: string) => {
    const before = { ...layout };
    apply();
    toast(message, { action: { label: 'Undo', onClick: () => update(before) } });
  };

  const moveBlock = (id: HomeBlockId, dir: -1 | 1) => {
    // Move among the VISIBLE blocks — hidden ones sit at the bottom and must
    // not swallow a tap (▲ on the 2nd block always lands it 1st).
    const visible = layout.order.filter(isVisible);
    const i = visible.indexOf(id);
    const target = visible[i + dir];
    if (!target) return;
    const order = [...layout.order];
    const a = order.indexOf(id);
    const b = order.indexOf(target);
    [order[a], order[b]] = [order[b], order[a]];
    update({ order });
    // Keep the block you just moved under your thumb.
    requestAnimationFrame(() =>
      document
        .getElementById(`home-block-${id}`)
        ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    );
  };

  const hideBlock = (id: HomeBlockId) => update({ hidden: [...layout.hidden, id] });

  // Shown blocks return at the BOTTOM of the visible list, where the user can see them land.
  const showBlock = (id: HomeBlockId) =>
    update({
      hidden: layout.hidden.filter((b) => b !== id),
      order: [...layout.order.filter((b) => b !== id && isVisible(b)), id, ...layout.order.filter((b) => b !== id && !isVisible(b))],
    });

  // Settings → App links here with ?customise=1 so the sheet opens over the
  // real screen instead of a list of switches somewhere else.
  useEffect(() => {
    if (searchParams.get('customise') === '1') {
      openCustomise('settings');
      searchParams.delete('customise');
      setSearchParams(searchParams, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // One-time nudge. None of the people who asked for this had found the old
  // link, so tell established users it exists — once. Not in the first week:
  // the first-week checklist owns the top of the screen then.
  const accountAgeDays = user?.created_at
    ? (Date.now() - new Date(user.created_at).getTime()) / 86_400_000
    : 0;
  const showHint = !layoutLoading && !layout.hintDismissed && accountAgeDays >= 7;

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
  // The user's own four, first one is the solid volt card.
  const quickStart: HubQuickAction[] = layout.shortcuts
    .map((id) => HOME_SHORTCUTS.find((s) => s.id === id))
    .filter((s): s is (typeof HOME_SHORTCUTS)[number] => !!s)
    .map((s, i) => ({
      title: s.title,
      description: s.description,
      onClick: () => navigate(s.path),
      primary: i === 0,
    }));

  const blocks: Record<HomeBlockId, React.ReactNode> = {
    mate: <MateBar onOpen={() => setMateOpen(true)} />,

    // Start something before state: someone opening the app on a van seat is
    // far more often here to start a cert than to read a figure.
    shortcuts: <HubQuickStart label="Start something" items={quickStart} />,

    diary: <DiaryPanel variant="compact" />,

    numbers: (
      <HubKpiRow>
        {layout.numbers === 'study' ? (
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
    ),

    // Where was I. Renders nothing when there is nothing in flight.
    resume: <ResumeCard />,

    hubs: <EditorialHubGrid label="Your hubs" onCustomise={() => openCustomise('hubs')} />,
  };

  const visibleBlocks = layout.order.filter(isVisible);

  // Block-specific control shown inside its frame while editing.
  const frameExtra: Partial<Record<HomeBlockId, React.ReactNode>> = {
    shortcuts: <FrameButton onClick={() => setShortcutsOpen(true)}>Change shortcuts</FrameButton>,
    numbers: <NumbersChoice value={layout.numbers} onChange={(numbers) => update({ numbers })} />,
    hubs: <FrameButton onClick={() => setHubsOpen(true)}>Choose hub cards</FrameButton>,
  };

  if (editing) {
    return (
      <div className="space-y-6 pb-44 sm:space-y-8">
        <div>
          <h2 className="text-[20px] font-bold tracking-tight text-white">Editing your home screen</h2>
          <p className="mt-1 text-[13.5px] leading-snug text-white">
            Move or hide each block. It saves as you go.
          </p>
        </div>

        {visibleBlocks.map((id, i) => (
          <EditFrame
            key={id}
            id={id}
            isFirst={i === 0}
            isLast={i === visibleBlocks.length - 1}
            onMove={(dir) => moveBlock(id, dir)}
            onHide={() => hideBlock(id)}
            extra={frameExtra[id]}
          >
            {blocks[id]}
          </EditFrame>
        ))}

        <HiddenBlocks hidden={layout.order.filter((b) => !isVisible(b))} onShow={showBlock} />

        <EditBar
          preset={matchingPreset(layout)}
          onPreset={(id) =>
            replaceLayout(() => applyPreset(id), `Switched to ${HOME_PRESETS[id].label}`)
          }
          onReset={() => replaceLayout(reset, 'Back to the standard layout')}
          onDone={finishEditing}
        />
        <ShortcutsSheet
          open={shortcutsOpen}
          onOpenChange={setShortcutsOpen}
          layout={layout}
          onChange={(shortcuts) => update({ shortcuts })}
        />
        <HubCardsSheet open={hubsOpen} onOpenChange={setHubsOpen} />
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      {showHint ? (
        <div className="-mx-4 flex items-start gap-3 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
          <SlidersHorizontal className="mt-0.5 h-5 w-5 shrink-0 text-elec-yellow" />
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-white">Make this screen yours</p>
            <p className="mt-0.5 text-[13px] leading-snug text-white">
              Put your diary first, hide what you don't use, pick your own shortcuts.
            </p>
            <button
              type="button"
              onClick={() => openCustomise('hint')}
              className="mt-3 h-11 rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation"
            >
              Customise
            </button>
          </div>
          <button
            type="button"
            onClick={dismissHint}
            aria-label="Dismiss"
            className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center text-white touch-manipulation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        // Always reachable from the top — the old link was the last thing on
        // the page, under a heading that made it look hub-only.
        <div className="-mb-6 -mt-4 flex justify-end sm:-mb-8 sm:-mt-6">
          <button
            type="button"
            onClick={() => openCustomise('top')}
            className="-my-1.5 flex h-11 items-center gap-1.5 rounded-xl px-2.5 text-[13px] font-semibold text-white touch-manipulation active:bg-white/[0.06]"
          >
            <SlidersHorizontal className="h-4 w-4 text-elec-yellow" />
            Customise
          </button>
        </div>
      )}

      {visibleBlocks.map((id) => (
        <div key={id}>{blocks[id]}</div>
      ))}

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
