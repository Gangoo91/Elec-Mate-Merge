/**
 * useDashboardVerdict
 *
 * Role-aware data layer for the editorial dashboard hero. Computes:
 * - `verdict`: the headline sentence ("You're owed £6,105." / "Day 12 — keep going.")
 * - `sub`: the supporting line under the verdict
 * - `cta`: optional primary action attached to the verdict
 * - `queueItems`: the prioritised "what to do today" rows
 * - `eyebrow`: contextual eyebrow ("Thursday · 30 April · Good afternoon")
 *
 * Reads from the shared dashboard context so it doesn't double-fetch. Apprentice
 * and electrician roles each get their own verdict logic; falls back to the
 * electrician path for any unknown role for now.
 */
import { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSharedDashboardData } from './useDashboardData';
import type { Tone } from '@/components/college/primitives';

export interface VerdictCta {
  label: string;
  href: string;
}

export interface QueueItem {
  id: string;
  title: string;
  subtitle?: string;
  trailing?: string;
  href: string;
  tone?: Tone;
}

export interface DashboardVerdict {
  eyebrow: string;
  greeting: string;
  verdict: string;
  cta?: VerdictCta;
  queueItems: QueueItem[];
  isLoading: boolean;
  role: 'apprentice' | 'electrician';
}

const GBP = (n: number): string =>
  n >= 1000
    ? `£${(n / 1000).toFixed(1)}k`
    : `£${n.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;

const GBP_FULL = (n: number): string =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function buildEyebrow(): string {
  const now = new Date();
  const hour = now.getHours();
  const partOfDay =
    hour < 5
      ? 'Late one'
      : hour < 12
        ? 'Morning'
        : hour < 17
          ? 'Afternoon'
          : hour < 21
            ? 'Evening'
            : 'Late evening';
  const day = now.toLocaleDateString('en-GB', { weekday: 'long' });
  const date = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  return `${day} · ${date} · ${partOfDay}`;
}

export function useDashboardVerdict(): DashboardVerdict {
  const { profile } = useAuth();
  const data = useSharedDashboardData();
  const role: 'apprentice' | 'electrician' =
    profile?.role === 'apprentice' ? 'apprentice' : 'electrician';

  return useMemo(() => {
    const eyebrow = buildEyebrow();
    const greeting = `Hello, ${data.user.firstName}.`;

    if (role === 'apprentice') {
      const { currentStreak, studiedToday, longestStreak } = data.learning;

      let verdict: string;
      let cta: VerdictCta | undefined;

      if (studiedToday && currentStreak > 0) {
        verdict =
          longestStreak > currentStreak
            ? `Day ${currentStreak} done. Your record is ${longestStreak} — keep going.`
            : `Day ${currentStreak} done. Every day you show up extends the streak.`;
        cta = { label: 'Open Study Centre', href: '/study-centre/apprentice' };
      } else if (currentStreak > 0) {
        verdict = `Keep your ${currentStreak}-day streak alive — one section is enough.`;
        cta = { label: 'Study now', href: '/study-centre/apprentice' };
      } else {
        verdict = 'Start your streak today. Five minutes, one section.';
        cta = { label: 'Open Study Centre', href: '/study-centre/apprentice' };
      }

      const queueItems: QueueItem[] = [];

      if (!studiedToday) {
        queueItems.push({
          id: 'study-today',
          title: 'Study today',
          subtitle:
            currentStreak > 0
              ? `Keeps your ${currentStreak}-day streak alive`
              : 'Start a streak with one section',
          trailing: '5 min',
          href: '/study-centre/apprentice',
          tone: 'amber',
        });
      }

      queueItems.push({
        id: 'log-otj',
        title: "Log today's training hours",
        subtitle: 'OTJ time counts toward your apprenticeship',
        href: '/apprentice-hub/otj',
        tone: 'blue',
      });

      queueItems.push({
        id: 'portfolio',
        title: "Add today's portfolio evidence",
        subtitle: 'Photo, reflection, or task — 60 seconds',
        href: '/apprentice-hub/portfolio',
        tone: 'purple',
      });

      queueItems.push({
        id: 'site-diary',
        title: 'Site diary entry',
        subtitle: 'What you did, what you learned',
        href: '/apprentice-hub/site-diary',
        tone: 'cyan',
      });

      return {
        eyebrow,
        verdict,
        sub,
        tone,
        cta,
        queueItems,
        isLoading: data.isLoading,
        role,
      };
    }

    // ── Electrician (default) ────────────────────────────────────────────
    const {
      overdueInvoices,
      overdueValue,
      unpaidInvoices,
      activeQuotes,
      pendingQuotes,
      formattedQuoteValue,
      activeJobs,
    } = data.business;

    const { expiringSoon: incompleteCerts } = data.certificates;

    let verdict: string;
    let sub: string;
    let tone: Tone;
    let cta: VerdictCta | undefined;

    if (overdueValue > 0) {
      verdict = `You're owed ${GBP_FULL(overdueValue)}.`;
      sub = `${overdueInvoices} overdue invoice${overdueInvoices > 1 ? 's' : ''} · chase before the weekend.`;
      tone = 'red';
      cta = { label: 'View overdue', href: '/electrician/invoices?filter=overdue' };
    } else if (pendingQuotes > 0) {
      verdict = `${pendingQuotes} quote${pendingQuotes > 1 ? 's' : ''} waiting on a reply.`;
      sub = `${formattedQuoteValue} pipeline — a nudge today turns into payment next week.`;
      tone = 'amber';
      cta = { label: 'Follow up', href: '/electrician/quotes' };
    } else if (incompleteCerts > 0) {
      verdict = `${incompleteCerts} cert${incompleteCerts > 1 ? 's' : ''} need finishing.`;
      sub = 'Drafts and in-progress reports — close them out so you can invoice.';
      tone = 'yellow';
      cta = {
        label: 'Open certificates',
        href: '/electrician/inspection-testing?section=my-reports',
      };
    } else if (activeJobs > 0) {
      verdict = `${activeJobs} job${activeJobs > 1 ? 's' : ''} running.`;
      sub = 'No fires today — the books are clear, certs are up, invoices paid.';
      tone = 'emerald';
      cta = { label: 'Open jobs', href: '/electrician/jobs' };
    } else if (unpaidInvoices > 0) {
      verdict = `${unpaidInvoices} invoice${unpaidInvoices > 1 ? 's' : ''} out for payment.`;
      sub = 'Nothing overdue yet — keep an eye on it.';
      tone = 'blue';
      cta = { label: 'View invoices', href: '/electrician/invoices' };
    } else {
      verdict = 'All clear today.';
      sub = 'Nothing overdue, every cert closed out. Use the calm to push a quote out.';
      tone = 'emerald';
      cta = { label: 'New quote', href: '/electrician/quotes/new' };
    }

    // Build queue from existing actions[] + a couple of derived items.
    const queueItems: QueueItem[] = [];

    for (const action of data.actions.slice(0, 4)) {
      const itemTone: Tone =
        action.type === 'urgent' ? 'red' : action.type === 'warning' ? 'amber' : 'blue';
      const trailing =
        typeof action.metadata?.amount === 'number'
          ? GBP(action.metadata.amount as number)
          : typeof action.metadata?.daysOverdue === 'number'
            ? `${action.metadata.daysOverdue}d`
            : undefined;
      queueItems.push({
        id: action.id,
        title: action.title,
        subtitle: action.description,
        trailing,
        href: action.path,
        tone: itemTone,
      });
    }

    if (queueItems.length === 0) {
      queueItems.push({
        id: 'quote-today',
        title: 'Send a quote today',
        subtitle: 'Pipeline grows when you push, not when you wait',
        href: '/electrician/quotes/new',
        tone: 'yellow',
      });
      if (activeQuotes > 0) {
        queueItems.push({
          id: 'review-quotes',
          title: `${activeQuotes} active quote${activeQuotes > 1 ? 's' : ''}`,
          subtitle: 'Review and follow up on open quotes',
          trailing: formattedQuoteValue,
          href: '/electrician/quotes',
          tone: 'blue',
        });
      }
    }

    return {
      eyebrow,
      verdict,
      sub,
      tone,
      cta,
      queueItems,
      isLoading: data.isLoading,
      role,
    };
  }, [data, role]);
}
