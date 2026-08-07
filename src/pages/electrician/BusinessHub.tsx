/**
 * Business Hub.
 *
 * Rebuilt on the shared hub shell (`@/components/hub/HubPrimitives`), the same
 * one Inspection & Testing uses, so the two pages can't drift into separate
 * dialects again.
 *
 *   masthead → alert (only when something is overdue) → Mate → start → tools
 *
 * Three things went, and it is worth saying why:
 *
 * The HERO. A date eyebrow, a slogan picked from a pool by hour and
 * day-of-year, a verdict paragraph and a CTA — roughly 300px of page before an
 * electrician reached a single tool, most of it restating numbers that appear
 * again immediately below. Inspection & Testing dropped its hero for exactly
 * this reason; the only load-bearing part was the overdue warning, which is
 * now one AlertLine that appears only when there is something to warn about.
 *
 * The STAT BOARD. Four cells with 56px numbers — Paid, Outstanding, Overdue,
 * Win rate. Every one of those numbers already lives on the card that owns it
 * (Invoices carries the overdue figure, Quotes carries the win rate), so the
 * board was repeating the page back to itself. A number next to the thing it
 * counts beats a scoreboard at the top.
 *
 * MATE's introduction. See MateBar — it is a row now, not a section.
 *
 * Everything is `text-white`. The old grid ran on white/60, /55, /50, /45 and
 * /40, which renders as grey and is not allowed.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { BusinessInsights } from '@/components/electrician/analytics/BusinessInsights';
import { useBusinessHubData } from '@/hooks/useBusinessHubData';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import { useSparkTasks } from '@/hooks/useSparkTasks';
import { useCustomers } from '@/hooks/useCustomers';
import { useSnags } from '@/hooks/useSnags';
import { useTimeTracker, formatDuration } from '@/hooks/useTimeTracker';
import { usePortalBookings, splitBookings } from '@/hooks/usePortalBookings';
import { Assistant } from '@/components/business-hub/Assistant';
import { MateBar } from '@/components/business-hub/MateBar';
import { NeedsYou } from '@/components/business-hub/NeedsYou';
import { useBusinessInsights } from '@/hooks/useBusinessInsights';
import { useHubToolCounts } from '@/hooks/useHubToolCounts';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubAlertLine,
  HubQuickStart,
  HubToolGrid,
  HubSectionHeading,
  HubKpi,
  HubKpiRow,
  type HubTool,
  type HubQuickAction,
} from '@/components/hub/HubPrimitives';

const BusinessHub = () => {
  const navigate = useNavigate();

  const {
    revenue,
    paidThisMonth,
    outstanding,
    overdueAmount,
    winRate,
    quotes,
    invoices,
    lastUpdated,
    formatCurrency,
  } = useBusinessHubData();
  const {
    counts: projectCounts,
    projects,
    createProject,
    updateProject,
    completeProject,
    deleteProject,
  } = useSparkProjects('active');
  const { counts: snagCounts, snags } = useSnags();

  // In-progress site visits — drafts reach the cloud as they're captured, so
  // the hub can honestly say "2 in progress".
  const [draftVisitCount, setDraftVisitCount] = useState(0);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || cancelled) return;
      const { count } = await supabase
        .from('site_visits')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'in_progress');
      if (!cancelled && typeof count === 'number') setDraftVisitCount(count);
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  /*
   * What's actually in the diary.
   *
   * The Calendar card showed today's date and today's weekday — a clock, not
   * an agenda. "7 Aug / Friday" is the one thing on a dashboard the reader
   * already knows, and it sat in the slot every other card uses for its live
   * figure.
   *
   * Deliberately NOT derived from usePortalBookings, which is already loaded
   * on this page: that hook returns only bookings taken through the public
   * link (it filters on the note the edge function writes), so a job entered
   * by hand — most of them — would be missing and the card would confidently
   * report a free day.
   */
  const [diary, setDiary] = useState<{ today: number; next: { title: string; at: Date } | null }>({
    today: 0,
    next: null,
  });
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || cancelled) return;
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const endOfToday = new Date(startOfToday);
      endOfToday.setDate(endOfToday.getDate() + 1);

      const [todayRes, nextRes] = await Promise.all([
        supabase
          .from('calendar_events')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .gte('start_at', startOfToday.toISOString())
          .lt('start_at', endOfToday.toISOString()),
        supabase
          .from('calendar_events')
          .select('title, start_at')
          .eq('user_id', user.id)
          .gte('start_at', endOfToday.toISOString())
          .order('start_at', { ascending: true })
          .limit(1)
          .maybeSingle(),
      ]);

      if (cancelled) return;
      const row = nextRes.data as { title: string | null; start_at: string } | null;
      setDiary({
        today: todayRes.count ?? 0,
        next: row?.start_at
          ? { title: row.title || 'Booked in', at: new Date(row.start_at) }
          : null,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const { tasks, saveTask, updateTask, deleteTask, markDone } = useSparkTasks('all');
  const { customers, saveCustomer, updateCustomer, deleteCustomer } = useCustomers();
  const { activeSession, elapsedSeconds } = useTimeTracker();

  const [mateOpen, setMateOpen] = useState(false);
  const [matePrompt, setMatePrompt] = useState<string | undefined>(undefined);

  const openMate = (prompt?: string) => {
    setMatePrompt(prompt);
    setMateOpen(true);
  };
  const closeMate = () => {
    setMateOpen(false);
    setMatePrompt(undefined);
  };

  // ⌘+K / Ctrl+K — open Mate from anywhere on the page
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openMate();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /*
   * Bookings that came in through the public link, for the tile's meta line.
   *
   * The tile used to fire the OS share sheet directly. That looked like a send
   * screen on a phone and did nothing visible on desktop, where there is no
   * `navigator.share` — so it now opens `/electrician/booking`, which does the
   * sending properly and shows what the link has brought in. Same React Query
   * key as that page, so landing on it costs no second fetch.
   */
  const { data: portalBookings = [] } = usePortalBookings();
  const bookingCount = splitBookings(portalBookings).upcoming.length;

  // `TaskStatus` is 'open' | 'done' | 'snoozed' | 'cancelled'. This used to
  // read `t.status !== 'completed'` — a status that does not exist — so the
  // test was always true and the card reported every task ever created as
  // open, including the done ones.
  const openTaskCount = tasks.filter((t) => t.status === 'open').length;

  /*
   * Overdue is what makes the Tasks card an alert — not merely having tasks.
   *
   * `alert` painted the figure volt whenever a single task was open, which on
   * this account is always. Volt that is always on is not a signal, and with
   * unsent quotes, unbilled invoices and an unfinished site visit all lighting
   * up beside it, four volt numbers in one screen left nothing standing out.
   * Having a to-do list is the normal state of a business; being late is not.
   */
  const overdueTaskCount = tasks.filter(
    (t) => t.status === 'open' && t.dueAt && new Date(t.dueAt).getTime() < Date.now()
  ).length;

  /**
   * Money in this month against last, so the KPI row can show movement rather
   * than a bare state. Paid-at is the honest date for "when did the money
   * arrive"; invoice_date is when it was raised.
   */
  const paidLastMonth = useMemo(() => {
    const now = new Date();
    const startThis = new Date(now.getFullYear(), now.getMonth(), 1);
    const startLast = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return invoices
      .filter((i) => i.invoice_status === 'paid')
      .filter((i) => {
        const d = i.invoice_paid_at ?? i.invoice_date;
        if (!d) return false;
        const at = new Date(d);
        return at >= startLast && at < startThis;
      })
      .reduce((sum, i) => sum + (i.total || 0), 0);
  }, [invoices]);

  const paidDelta = paidLastMonth > 0 ? ((paidThisMonth - paidLastMonth) / paidLastMonth) * 100 : null;

  /**
   * When the last payment actually landed.
   *
   * With nothing paid in this month and nothing last month, this card's
   * context line fell back to "£6,027 still out there" — the exact figure the
   * "Owed to you" KPI shows one card to the left. The banner that used to sit
   * above this row was deleted for saying £6,027 a third time; putting it back
   * in a context line is the same mistake in smaller type. A date answers a
   * question no other card on the page answers: how long has it been?
   */
  const lastPaymentAt = useMemo(() => {
    const dates = invoices
      .filter((i) => i.invoice_status === 'paid')
      .map((i) => i.invoice_paid_at ?? i.invoice_date)
      .filter(Boolean)
      .map((d) => new Date(d as Date).getTime())
      .filter((t) => Number.isFinite(t));
    return dates.length ? new Date(Math.max(...dates)) : null;
  }, [invoices]);

  const oldestOverdueDays = useMemo(() => {
    const now = Date.now();
    const days = invoices
      .filter((i) => i.invoice_status !== 'paid' && i.invoice_due_date)
      .map((i) => Math.floor((now - new Date(i.invoice_due_date!).getTime()) / 86400000))
      .filter((d) => d > 0);
    return days.length ? Math.max(...days) : null;
  }, [invoices]);

  const overdueCount = invoices.filter(
    (i) => i.invoice_status !== 'paid' && i.invoice_status !== 'draft' && i.invoice_due_date
      && new Date(i.invoice_due_date).getTime() < Date.now()
  ).length;

  const acceptedQuotes = quotes.filter((q) => q.acceptance_status === 'accepted').length;

  /*
   * Work started and abandoned — the quietest way to lose money on this page.
   *
   * The Invoices card reported "14 raised in total", which is every invoice
   * ever sent and nothing you would ever act on. Drafts are the opposite:
   * billable work that has been typed up and never sent. Deliberately not
   * "unpaid", which is what "Owed to you" and the Needs you list already say
   * twice over.
   */
  const draftQuotes = quotes.filter((q) => q.status === 'draft').length;
  const draftInvoices = invoices.filter((i) => i.invoice_status === 'draft').length;

  // Same React Query keys the Insights panel uses, so this is served from
  // cache rather than costing a second fetch.
  const { expenses: expenseRows, hours: hourRows } = useBusinessInsights();
  const toolCounts = useHubToolCounts();

  const expensesThisMonth = useMemo(() => {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    return expenseRows
      .filter((e) => e.at >= from)
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenseRows]);

  const hoursThisWeek = useMemo(() => {
    // Week starts Monday — a UK working week, not the Sunday the Date API
    // assumes.
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
    const seconds = hourRows
      .filter((h) => h.at >= start)
      .reduce((sum, h) => sum + h.seconds, 0);
    return seconds / 3600;
  }, [hourRows]);

  const awaitingQuotes = quotes.filter(
    (q) => q.status === 'sent' && q.acceptance_status !== 'accepted'
  ).length;

  // The overdue alert banner that used to sit here said exactly what the
  // "Owed to you" KPI now says, with less context — and the Invoices card said
  // it a third time. £6,027 appeared three times on one screen, which makes
  // none of the three feel urgent.

  // ── Start something ──────────────────────────────────────────────────
  // What someone opens this page to BEGIN. A quote is the one that leads to
  // money, so it takes the single solid volt card.
  const quickStart: HubQuickAction[] = [
    {
      title: 'New quote',
      description: 'Price up a job',
      onClick: () => navigate('/electrician/quotes'),
      primary: true,
    },
    {
      title: 'New invoice',
      description: 'Bill completed work',
      onClick: () => navigate('/electrician/invoices'),
    },
    {
      title: 'Log expense',
      description: 'Receipt or mileage',
      onClick: () => navigate('/electrician/expenses'),
    },
    {
      title: 'New job',
      description: 'Open a project',
      onClick: () => navigate('/electrician/projects'),
    },
  ];

  /*
   * ── Tool groups ──────────────────────────────────────────────────────
   *
   * Every group is three or four cards, and that is a layout constraint as
   * much as a taxonomy one. The grid is auto-fit at four tracks on desktop,
   * and auto-fit only collapses tracks that are empty for the WHOLE grid —
   * not per row. So a group of seven drew 4 + 3 with a hole on the end, and a
   * group of five left "Tools" sitting alone in a quarter-width track. Both
   * read as something failing to load rather than as a deliberate layout.
   *
   * Three fills the row (the fourth track collapses); four fills it exactly.
   * Anything else orphans, so nothing else is allowed here.
   *
   * No eyebrows. They were on nine of twenty-one cards and every one restated
   * the title — "SNAGS / Snagging", "PHOTOS / Photo Docs", "PRICING / Live
   * Pricing" — while a couple actively misled ("STOCK / Materials" sitting
   * next to "INVENTORY / Stock Tracker"). Being optional, they also pushed the
   * titles of the cards that had one down by a line, so no two cards in a row
   * started at the same height. Removing them costs nothing and squares up
   * every grid on the page.
   *
   * Every card that CAN report a number now does. A card describing what it is
   * for is the fallback for having nothing to say yet, not the default.
   */
  const money: HubTool[] = [
    {
      id: 'quotes',
      title: 'Quotes',
      to: '/electrician/quotes',
      value:
        awaitingQuotes > 0
          ? String(awaitingQuotes)
          : draftQuotes > 0
            ? String(draftQuotes)
            : winRate != null
              ? `${winRate}%`
              : undefined,
      valueLabel:
        awaitingQuotes > 0
          ? 'awaiting a reply'
          : draftQuotes > 0
            ? 'priced up, not sent'
            : winRate != null
              ? 'of decided quotes won'
              : undefined,
      description: 'Price up a job and send it out.',
      alert: awaitingQuotes > 0 || draftQuotes > 0,
    },
    {
      id: 'invoices',
      title: 'Invoices',
      to: '/electrician/invoices',
      value: draftInvoices > 0 ? String(draftInvoices) : undefined,
      valueLabel: draftInvoices > 0 ? 'drafted, not billed' : undefined,
      description: 'Raise, send and chase invoices.',
      alert: draftInvoices > 0,
    },
    {
      id: 'expenses',
      title: 'Expenses',
      to: '/electrician/expenses',
      value: expensesThisMonth > 0 ? formatCurrency(expensesThisMonth) : undefined,
      valueLabel: expensesThisMonth > 0 ? 'logged this month' : undefined,
      description: 'Receipts, mileage and reimbursables.',
    },
    // Day rate, take-home, breakeven — this is money, not growth. It sat
    // under "Grow" next to a page of written guides.
    {
      id: 'calculators',
      title: 'Calculators',
      description: 'Day rate, take-home, breakeven and more.',
      to: '/electrician/business-development/tools',
    },
  ];

  const yourDay: HubTool[] = [
    {
      id: 'tasks',
      title: 'Tasks',
      to: '/electrician/tasks',
      value: openTaskCount > 0 ? String(openTaskCount) : undefined,
      valueLabel:
        openTaskCount > 0
          ? overdueTaskCount > 0
            ? `open · ${overdueTaskCount} overdue`
            : 'still open'
          : undefined,
      description: 'Nothing outstanding.',
      alert: overdueTaskCount > 0,
    },
    {
      id: 'calendar',
      title: 'Calendar',
      to: '/electrician/business/calendar',
      value: diary.today > 0 ? String(diary.today) : undefined,
      valueLabel: diary.today > 0 ? 'on today' : undefined,
      description:
        diary.today > 0
          ? undefined
          : diary.next
            ? `Next: ${diary.next.title} — ${diary.next.at.toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}`
            : 'Nothing booked in. Jobs, appointments and bookings.',
      alert: diary.today > 0,
    },
    {
      id: 'time-tracker',
      title: 'Time Tracker',
      to: '/electrician/time-tracker',
      value: activeSession
        ? formatDuration(elapsedSeconds)
        : hoursThisWeek > 0
          ? `${hoursThisWeek.toFixed(1)}h`
          : undefined,
      valueLabel: activeSession
        ? 'running now'
        : hoursThisWeek > 0
          ? 'logged this week'
          : undefined,
      description: 'Log hours on site, billable or otherwise.',
      alert: !!activeSession,
    },
  ];

  const onTheJob: HubTool[] = [
    {
      // No figure here on purpose: the "Open jobs" KPI at the top of this page
      // already shows it, and every other card in these grids was chosen to
      // report something its KPI row does NOT — drafts rather than owed,
      // expenses rather than paid. This was the one that printed the same
      // number twice.
      id: 'projects',
      title: 'Jobs',
      to: '/electrician/projects',
      description: 'Quotes, certs, invoices and tasks — every job in one place.',
    },
    {
      id: 'site-visits',
      title: 'Site Visits',
      to: '/electrician/site-visits',
      value: draftVisitCount > 0 ? String(draftVisitCount) : undefined,
      valueLabel: draftVisitCount > 0 ? 'still in progress' : undefined,
      description: 'Pre-job and post-job site visit records.',
      alert: draftVisitCount > 0,
    },
    {
      id: 'snagging',
      title: 'Snagging',
      to: '/electrician/snagging',
      value: snagCounts.open > 0 ? String(snagCounts.open) : undefined,
      valueLabel:
        snagCounts.open > 0
          ? snagCounts.critical > 0
            ? `open · ${snagCounts.critical} critical`
            : 'still open'
          : undefined,
      description: 'Track and resolve outstanding snags.',
      alert: snagCounts.open > 0,
    },
    {
      id: 'photo-docs',
      title: 'Photo Docs',
      to: '/electrician/photo-docs',
      value: toolCounts.photoProjects > 0 ? String(toolCounts.photoProjects) : undefined,
      valueLabel: toolCounts.photoProjects > 0 ? 'photo projects' : undefined,
      description: 'Project photos with timestamps and notes.',
    },
  ];

  // Everything that faces the client, together — who they are, how they book
  // you, and what they're due to have re-inspected. Customers and Booking Link
  // were the tail of "On the job"; the renewal book was under "Grow" even
  // though it is entirely a list of past clients to ring.
  const clients: HubTool[] = [
    {
      id: 'customers',
      title: 'Customers',
      to: '/customers',
      value: customers.length > 0 ? String(customers.length) : undefined,
      valueLabel: customers.length > 0 ? 'on the books' : undefined,
      description: 'Client records and job history.',
    },
    {
      id: 'booking-link',
      title: 'Booking Link',
      to: '/electrician/booking',
      value: bookingCount > 0 ? String(bookingCount) : undefined,
      valueLabel: bookingCount > 0 ? 'booked in' : undefined,
      description: 'Send clients a link to book you, and see what comes in.',
    },
    {
      id: 'renewals',
      title: 'Renewal book',
      description: 'Certs due for re-inspection — booked from your past work.',
      to: '/electrician/renewals',
    },
  ];

  const pricingAndStock: HubTool[] = [
    {
      id: 'live-pricing',
      title: 'Live Pricing',
      description: 'Real-time market rates from suppliers.',
      to: '/electrician/live-pricing',
    },
    {
      id: 'price-book',
      title: 'Price Book',
      description: 'Your own materials, markup and labour rates.',
      to: '/electrician/price-book',
    },
    {
      id: 'materials',
      title: 'Materials',
      to: '/electrician/materials',
      value: toolCounts.materialsLists > 0 ? String(toolCounts.materialsLists) : undefined,
      valueLabel: toolCounts.materialsLists > 0 ? 'saved lists' : undefined,
      description: 'Build and reuse materials lists.',
    },
    {
      id: 'stock-tracker',
      title: 'Stock Tracker',
      to: '/electrician/inventory',
      // Running low is the only thing about stock worth putting on a
      // dashboard. A total is just a number; a shortfall is a trip to the
      // wholesaler you haven't made yet.
      value:
        toolCounts.lowStock > 0
          ? String(toolCounts.lowStock)
          : toolCounts.stockItems > 0
            ? String(toolCounts.stockItems)
            : undefined,
      valueLabel:
        toolCounts.lowStock > 0
          ? 'running low'
          : toolCounts.stockItems > 0
            ? 'items tracked'
            : undefined,
      description: 'Van and garage stock levels.',
      alert: toolCounts.lowStock > 0,
    },
  ];

  const kitAndGuides: HubTool[] = [
    {
      id: 'tools',
      title: 'Tools',
      to: '/electrician/tools',
      // Calibration and PAT dates are the reason to open this page. A tester
      // that has gone out of calibration invalidates the certificates signed
      // with it, so it outranks a count of how much kit is on the books.
      value:
        toolCounts.toolsDue > 0
          ? String(toolCounts.toolsDue)
          : toolCounts.tools > 0
            ? String(toolCounts.tools)
            : undefined,
      valueLabel:
        toolCounts.toolsDue > 0
          ? 'due calibration or PAT'
          : toolCounts.tools > 0
            ? 'items logged'
            : undefined,
      description: 'Equipment, calibration and PAT dates.',
      alert: toolCounts.toolsDue > 0,
    },
    {
      id: 'room-planner',
      title: 'Room Planner',
      description: 'Quick electrical floor plans and layouts.',
      to: '/electrician/business/room-planner',
    },
    {
      id: 'start-grow',
      title: 'Start & Grow',
      description: 'Business guides for sole traders and Ltds.',
      to: '/electrician/business-development',
    },
  ];

  const canonical = `${window.location.origin}/electrician/business`;

  return (
    <HubPage>
      <Helmet>
        <title>Business Hub for Electricians | Quotes, Invoices & More</title>
        <meta
          name="description"
          content="All business tools for UK electricians in one place — quotes, invoices, customers, expenses, live pricing and growth tools."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <HubMasthead title="Business" />

      <HubBody>
        <MateBar onOpen={() => openMate()} />

        {/* Start something FIRST. These pages opened with state — how much you
            are owed, what is unfinished — and put the handful of things you might
            actually begin below all of it. Someone opening the app on a van seat is
            far more often here to start a cert than to read a figure, and the
            figures are still one scroll away. */}
        <HubQuickStart label="Start something" items={quickStart} />

        {/* Four KPIs, capped at four on purpose. The hub used to open with
            twenty equally-weighted launcher cards and no sense of whether the
            business was going well or badly. */}
        <HubKpiRow>
          <HubKpi
            accent
            label="Owed to you"
            value={formatCurrency(outstanding)}
            delta={overdueAmount > 0 && overdueAmount < outstanding ? `${Math.round((overdueAmount / outstanding) * 100)}% late` : undefined}
            direction={overdueAmount > 0 ? 'up' : 'flat'}
            sentiment={overdueAmount > 0 ? 'bad' : 'neutral'}
            verdict={overdueAmount > 0 ? 'Chase the oldest first' : 'Nothing overdue'}
            context={
              overdueCount > 0
                ? `${overdueCount} overdue${oldestOverdueDays ? `, oldest ${oldestOverdueDays} days` : ''}`
                : 'All invoices within terms'
            }
            onClick={() => navigate('/electrician/invoices?filter=outstanding')}
          />
          <HubKpi
            label="Paid this month"
            value={formatCurrency(paidThisMonth)}
            delta={paidDelta === null ? undefined : `${paidDelta >= 0 ? '+' : ''}${paidDelta.toFixed(0)}%`}
            direction={paidDelta === null ? 'flat' : paidDelta >= 0 ? 'up' : 'down'}
            sentiment={paidDelta === null ? 'neutral' : paidDelta >= 0 ? 'good' : 'bad'}
            verdict={
              paidDelta === null
                ? paidThisMonth > 0
                  ? 'First month with payments in'
                  : 'Nothing paid in yet this month'
                : paidDelta >= 0
                  ? 'Up on last month'
                  : 'Down on last month'
            }
            context={
              paidLastMonth > 0
                ? `${formatCurrency(paidLastMonth)} last month`
                : lastPaymentAt
                  ? `Last payment ${lastPaymentAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
                  : undefined
            }
            onClick={() => navigate('/electrician/invoices?filter=paid_month')}
          />
          <HubKpi
            label="Quotes out"
            value={String(awaitingQuotes)}
            verdict={awaitingQuotes > 0 ? 'Follow the quiet ones up' : 'Nothing waiting'}
            context={
              winRate != null
                ? `${winRate}% of decided quotes won`
                : acceptedQuotes > 0
                  ? `${acceptedQuotes} accepted — mark lost ones rejected for a win rate`
                  : undefined
            }
            onClick={() => navigate('/electrician/quotes')}
          />
          <HubKpi
            label="Open jobs"
            value={String(projectCounts.active)}
            verdict={
              projectCounts.active > 0 ? 'On the go right now' : 'Nothing open — quote something'
            }
            context={[
              snagCounts.open > 0 ? `${snagCounts.open} snags` : null,
              draftVisitCount > 0 ? `${draftVisitCount} site visit${draftVisitCount === 1 ? '' : 's'} in progress` : null,
            ]
              .filter(Boolean)
              .join(' · ') || undefined}
            onClick={() => navigate('/electrician/projects')}
          />
        </HubKpiRow>

        {/* The work itself, straight after the numbers that flagged it. The
            KPI row says "4 overdue, oldest 153 days" — this is where you go
            and do something about it, rather than hunting through Invoices. */}
        <NeedsYou
          invoices={invoices}
          quotes={quotes}
          tasks={tasks}
          snags={snags}
          draftVisitCount={draftVisitCount}
        />

        <HubToolGrid label="Money" cards={money} columns="four" />

        <HubToolGrid label="Your day" cards={yourDay} columns="four" />

        <HubToolGrid label="On the job" cards={onTheJob} columns="four" />

        <HubToolGrid label="Pricing & stock" cards={pricingAndStock} columns="four" />

        <HubToolGrid label="Clients" cards={clients} columns="four" />

        <HubToolGrid label="Kit & guides" cards={kitAndGuides} columns="four" />

        {/* Insights last — this is the one place a chart earns its keep, and
            it is where you go to review rather than to act. */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
            <HubSectionHeading>Insights</HubSectionHeading>
            {/* "All time" is not decoration — this is every paid invoice ever
                (useBusinessHubData.ts:87), and it sits directly above a panel
                with its own range chips. Unlabelled, it read as the same
                measure: "£13,946 revenue" on top of "£0 in · £0 out" for the
                selected window. Both were right; the pair looked broken. */}
            <span className="text-[11px] tabular-nums text-white">
              {formatCurrency(revenue)} paid to you, all time
            </span>
          </motion.div>
          <motion.div variants={itemVariants}>
            <BusinessInsights quotes={quotes} invoices={invoices} lastUpdated={lastUpdated} />
          </motion.div>
        </motion.section>
      </HubBody>

      <Assistant
        isOpen={mateOpen}
        onClose={closeMate}
        initialPrompt={matePrompt}
        currentTasks={tasks}
        currentProjects={projects}
        currentCustomers={customers}
        onSave={saveTask}
        onUpdate={updateTask}
        onMarkDone={markDone}
        onDelete={deleteTask}
        onCreateProject={createProject}
        onUpdateProject={updateProject}
        onCompleteProject={completeProject}
        onDeleteProject={deleteProject}
        onCreateCustomer={saveCustomer}
        onUpdateCustomer={updateCustomer}
        onDeleteCustomer={deleteCustomer}
      />
    </HubPage>
  );
};

export default BusinessHub;
