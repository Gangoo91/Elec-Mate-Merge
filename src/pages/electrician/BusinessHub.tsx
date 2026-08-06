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
import { useEffect, useState } from 'react';
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
import { shareContent } from '@/utils/share';
import { Assistant } from '@/components/business-hub/Assistant';
import { MateBar } from '@/components/business-hub/MateBar';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubAlertLine,
  HubQuickStart,
  HubToolGrid,
  HubSectionHeading,
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
  const { counts: snagCounts } = useSnags();

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

  const handleShareBookingLink = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return;
    const url = `https://www.elec-mate.com/book/${session.user.id}`;
    await shareContent({
      title: 'Book an Appointment',
      text: 'Book a time slot with me:',
      url,
      onFallback: () => {
        toast({ title: 'Share this link', description: url });
      },
    });
  };

  // `TaskStatus` is 'open' | 'done' | 'snoozed' | 'cancelled'. This used to
  // read `t.status !== 'completed'` — a status that does not exist — so the
  // test was always true and the card reported every task ever created as
  // open, including the done ones.
  const openTaskCount = tasks.filter((t) => t.status === 'open').length;

  // ── Alert — the one thing that genuinely needs attention today ────────
  const alert =
    overdueAmount > 0
      ? {
          text: `${formatCurrency(overdueAmount)} overdue — chase today`,
          onClick: () => navigate('/electrician/invoices?filter=overdue'),
        }
      : null;

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

  // ── Tool groups ──────────────────────────────────────────────────────
  const money: HubTool[] = [
    {
      id: 'quotes',
      title: 'Quotes',
      description: 'Build, send and track quotes.',
      to: '/electrician/quotes',
      meta: (() => {
        const awaiting = quotes.filter(
          (q) => q.status === 'sent' && q.acceptance_status !== 'accepted'
        ).length;
        if (awaiting > 0) return `${awaiting} awaiting reply`;
        return winRate != null ? `${winRate}% win rate` : 'Open quotes';
      })(),
    },
    {
      id: 'invoices',
      title: 'Invoices',
      description: 'Billing, payments and reminders.',
      to: '/electrician/invoices',
      meta:
        overdueAmount > 0
          ? `${formatCurrency(overdueAmount)} overdue`
          : outstanding > 0
            ? `${formatCurrency(outstanding)} out`
            : `${formatCurrency(paidThisMonth)} paid this month`,
      alert: overdueAmount > 0,
    },
    {
      id: 'expenses',
      title: 'Expenses',
      description: 'Receipts, mileage and reimbursables.',
      to: '/electrician/expenses',
      meta: 'Log an expense',
    },
  ];

  const yourDay: HubTool[] = [
    {
      id: 'tasks',
      title: 'Tasks',
      description: 'To-dos, reminders and follow-ups.',
      to: '/electrician/tasks',
      meta: openTaskCount > 0 ? `${openTaskCount} open` : 'All clear',
      alert: openTaskCount > 0,
    },
    {
      id: 'calendar',
      title: 'Calendar',
      description: 'Jobs, appointments and bookings.',
      to: '/electrician/business/calendar',
      meta: new Date().toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
    },
    {
      id: 'time-tracker',
      eyebrow: 'Hours',
      title: 'Time Tracker',
      description: 'Log hours on site, billable or otherwise.',
      to: '/electrician/time-tracker',
      meta: activeSession ? `Running · ${formatDuration(elapsedSeconds)}` : 'Log hours',
      alert: !!activeSession,
    },
  ];

  const onTheJob: HubTool[] = [
    {
      id: 'projects',
      eyebrow: 'Work',
      title: 'Jobs',
      description: 'Quotes, certs, invoices and tasks — every job in one place.',
      to: '/electrician/projects',
      meta: projectCounts.active > 0 ? `${projectCounts.active} active` : 'Start a job',
    },
    {
      id: 'site-visits',
      eyebrow: 'Visits',
      title: 'Site Visits',
      description: 'Pre-job and post-job site visit records.',
      to: '/electrician/site-visits',
      meta: draftVisitCount > 0 ? `${draftVisitCount} in progress` : 'New visit',
      alert: draftVisitCount > 0,
    },
    {
      id: 'snagging',
      eyebrow: 'Snags',
      title: 'Snagging',
      description: 'Track and resolve outstanding snags.',
      to: '/electrician/snagging',
      meta: snagCounts.open > 0 ? `${snagCounts.open} open` : 'All clear',
      alert: snagCounts.open > 0,
    },
    {
      id: 'photo-docs',
      eyebrow: 'Photos',
      title: 'Photo Docs',
      description: 'Project photos with timestamps and notes.',
      to: '/electrician/photo-docs',
      meta: 'Capture',
    },
    {
      id: 'room-planner',
      eyebrow: 'Plans',
      title: 'Room Planner',
      description: 'Quick electrical floor plans and layouts.',
      to: '/electrician/business/room-planner',
      meta: 'Open planner',
    },
    {
      id: 'customers',
      eyebrow: 'Clients',
      title: 'Customers',
      description: 'Client records and job history.',
      to: '/customers',
      meta: customers.length > 0 ? `${customers.length} on file` : 'Add your first',
    },
    {
      id: 'booking-link',
      eyebrow: 'Share',
      title: 'Booking Link',
      description: 'Public booking page to share with clients.',
      onClick: handleShareBookingLink,
      meta: 'Share link',
    },
  ];

  const pricingAndStock: HubTool[] = [
    {
      id: 'live-pricing',
      eyebrow: 'Pricing',
      title: 'Live Pricing',
      description: 'Real-time market rates from suppliers.',
      to: '/electrician/live-pricing',
      meta: 'Check rates',
    },
    {
      id: 'price-book',
      eyebrow: 'Markup',
      title: 'Price Book',
      description: 'Materials, markup and labour rates.',
      to: '/electrician/price-book',
      meta: 'Edit rates',
    },
    {
      id: 'materials',
      eyebrow: 'Stock',
      title: 'Materials',
      description: 'Stock and inventory levels.',
      to: '/electrician/materials',
      meta: 'Open stock',
    },
    {
      id: 'stock-tracker',
      eyebrow: 'Inventory',
      title: 'Stock Tracker',
      description: 'Van and garage stock levels.',
      to: '/electrician/inventory',
      meta: 'Open inventory',
    },
    {
      id: 'tools',
      title: 'Tools',
      description: 'Equipment and asset tracking.',
      to: '/electrician/tools',
      meta: 'Open tools',
    },
  ];

  const grow: HubTool[] = [
    {
      id: 'renewals',
      eyebrow: 'Repeat work',
      title: 'Renewal book',
      description: 'Certs due for re-inspection — booked from your past work.',
      to: '/electrician/renewals',
      meta: 'Email or book in one tap',
    },
    {
      id: 'start-grow',
      eyebrow: 'Guides',
      title: 'Start & Grow',
      description: 'Business guides for sole traders and Ltds.',
      to: '/electrician/business-development',
      meta: 'Read guides',
    },
    {
      id: 'calculators',
      eyebrow: 'Numbers',
      title: 'Calculators',
      description: 'Day rate, take-home, breakeven and more.',
      to: '/electrician/business-development/tools',
      meta: 'Run a calc',
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
        {alert && <HubAlertLine text={alert.text} onClick={alert.onClick} />}

        <MateBar onOpen={() => openMate()} />

        <HubQuickStart label="Start something" items={quickStart} />

        <HubToolGrid label="Money" cards={money} columns="three" />

        <HubToolGrid label="Your day" cards={yourDay} columns="three" />

        <HubToolGrid label="On the job" cards={onTheJob} columns="four" />

        <HubToolGrid label="Pricing & stock" cards={pricingAndStock} columns="four" />

        <HubToolGrid label="Grow" cards={grow} columns="three" />

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
            <span className="text-[11px] tabular-nums text-white">
              {formatCurrency(revenue)} revenue
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
