/**
 * SafetyAlertsFeed — latest safety alerts and industry notices.
 *
 * Read-only feed over `safety_alerts`. One colour dimension = severity, shown
 * as a thin accent bar on the row plus a small severity pill. Critical sorts
 * to the top.
 *
 * ⚠️ DATA NOTE (verified 2026-08-09): `public.safety_alerts` currently holds
 * ZERO rows — migration 20250824083635 deleted every row and nothing has
 * repopulated it. The table also carries a SELECT-only RLS policy ("Anyone
 * can view active safety alerts") with no INSERT policy, so the in-app seeder
 * (`electrician/safety-shares/SampleDataLoader.tsx`) cannot write to it
 * either. In production this module therefore always renders the empty state.
 * That is a content/back-office gap, not a bug in this file — but the empty
 * copy below was rewritten so it no longer promises alerts that will not
 * arrive.
 *
 * `alert.content` is injected as HTML. That is only safe because there is no
 * INSERT policy on the table: rows can reach it via a service-role/admin path
 * only, never from a user session. If an INSERT policy is ever added, this
 * becomes stored XSS and must be sanitised first.
 */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSafetyAlerts, type SafetyAlert } from '@/hooks/useSafetyAlerts';
import { SafetyModuleShell } from '../common/SafetyModuleShell';
import { SafetyListCard } from '../common/SafetyList';
import { FilterBar, EmptyState, LoadingState, type Tone } from '@/components/college/primitives';
import { SafetyPageHeader, SafetyStatStrip } from '../common/SafetyPageHeader';

interface SafetyAlertsFeedProps {
  onBack?: () => void;
}

type Severity = 'critical' | 'high' | 'medium' | 'low';
/** 'advisory' is a VIEW over medium+low, not a stored severity. */
type FilterValue = Severity | 'advisory' | 'all';

const SEVERITY_RANK: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 };

/**
 * One normalisation, used by the counts, the sort AND the filter.
 *
 * This was the bug: `severityCounts` bucketed any unrecognised severity into
 * `medium`, but `filteredAlerts` compared the RAW `a.severity` string against
 * the selected tab. An alert stored as e.g. "info" was therefore counted in
 * the Medium tab's badge and then vanished when you tapped Medium — the tab
 * said 3 and showed 2. Normalising once, at the edge, makes the count and the
 * filter agree by construction.
 */
function normaliseSeverity(raw: string | null | undefined): Severity {
  const s = (raw ?? '').toLowerCase().trim();
  return s === 'critical' || s === 'high' || s === 'medium' || s === 'low' ? s : 'medium';
}

const fmtDate = (d?: string | null) => {
  if (!d) return '—';
  const t = new Date(d);
  // A malformed date_published previously rendered "Invalid Date" in the row
  // and produced NaN in the sort comparator, quietly scrambling the order.
  return Number.isNaN(t.getTime())
    ? '—'
    : t.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const toMillis = (d?: string | null) => {
  const t = d ? new Date(d).getTime() : NaN;
  return Number.isNaN(t) ? 0 : t;
};

// Colour follows one meaningful dimension: severity.
const SEVERITY_TONE: Record<Severity, Tone> = {
  critical: 'red',
  high: 'orange',
  medium: 'amber',
  low: 'blue',
};

const SEVERITY_BAR: Record<Severity, string> = {
  critical: 'bg-red-400',
  high: 'bg-orange-400',
  medium: 'bg-amber-400',
  low: 'bg-blue-400',
};

/**
 * Status pills are a NEUTRAL surface with COLOURED TEXT, not a tinted wash.
 *
 * They were `bg-red-500/10 … border-red-500/25` etc. Five of those stacked
 * down a list turn the page into a colour chart: the eye reads the blocks of
 * tint, not the words, and "low" ends up as visually loud as "critical"
 * because both are a filled lozenge. Holding the surface constant and moving
 * only the ink means severity is legible as a difference in colour rather than
 * a difference in area — and it stops the pills competing with the red 999-
 * grade signals used elsewhere in the hub.
 */
const SEVERITY_PILL_TEXT: Record<Severity, string> = {
  critical: 'text-red-400',
  high: 'text-orange-400',
  medium: 'text-amber-400',
  low: 'text-blue-400',
};

function SeverityPill({ severity }: { severity: Severity }) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border border-white/10 bg-white/[0.05]',
        'px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em]',
        SEVERITY_PILL_TEXT[severity]
      )}
    >
      {severity}
    </span>
  );
}

function AlertRow({ alert, severity }: { alert: SafetyAlert; severity: Severity }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        aria-expanded={isExpanded}
        className={cn(
          'group flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5',
          'touch-manipulation [-webkit-tap-highlight-color:transparent]',
          // Brighten on press, never dim, and no flat opaque fill over the
          // card's gradient — a solid hsl() hover wipes the ramp out and the
          // row visibly changes material under the thumb.
          'transition-[background-color,transform] duration-150',
          'hover:bg-white/[0.05] active:scale-[0.99] active:bg-white/[0.08]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60'
        )}
      >
        <span
          aria-hidden
          className={cn('h-10 w-[3px] shrink-0 rounded-full', SEVERITY_BAR[severity])}
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-white sm:text-[15px]">
            {alert.title}
          </div>
          <div className="mt-0.5 line-clamp-2 text-[11.5px] text-white">{alert.summary}</div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <SeverityPill severity={severity} />
          <span className="text-[11px] tabular-nums text-white">
            {fmtDate(alert.date_published)}
          </span>
        </div>
        <span
          className={cn(
            'shrink-0 text-[13px] text-white transition-transform duration-200',
            isExpanded && 'rotate-180'
          )}
          aria-hidden
        >
          ⌄
        </span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 sm:px-6">
              <div className="border-t border-white/[0.08] pt-3">
                <div
                  className="prose prose-invert prose-sm max-w-none text-white [&_a]:text-elec-yellow [&_h3]:text-white [&_h4]:text-white [&_li]:text-white [&_p]:text-white"
                  dangerouslySetInnerHTML={{ __html: alert.content }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SafetyAlertsFeed({ onBack }: SafetyAlertsFeedProps) {
  const { data: alerts, isLoading } = useSafetyAlerts();
  const [filter, setFilter] = useState<FilterValue>('all');
  const [searchQuery, setSearchQuery] = useState('');

  /** Normalise once, at the edge. Everything downstream uses `severity`. */
  const allAlerts = useMemo(
    () => (alerts ?? []).map((a) => ({ alert: a, severity: normaliseSeverity(a.severity) })),
    [alerts]
  );

  const severityCounts = useMemo(() => {
    const counts: Record<Severity, number> = { critical: 0, high: 0, medium: 0, low: 0 };
    for (const a of allAlerts) counts[a.severity] += 1;
    return counts;
  }, [allAlerts]);

  // Critical/high sort to top, then newest first — urgent before recent.
  const sortedAlerts = useMemo(
    () =>
      [...allAlerts].sort((a, b) => {
        const d = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
        return d !== 0 ? d : toMillis(b.alert.date_published) - toMillis(a.alert.date_published);
      }),
    [allAlerts]
  );

  const filteredAlerts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return sortedAlerts.filter(({ alert, severity }) => {
      if (filter === 'advisory') {
        if (severity !== 'medium' && severity !== 'low') return false;
      } else if (filter !== 'all' && severity !== filter) {
        return false;
      }
      if (!q) return true;
      return (
        alert.title.toLowerCase().includes(q) ||
        alert.summary.toLowerCase().includes(q) ||
        (alert.category ?? '').toLowerCase().includes(q)
      );
    });
  }, [sortedAlerts, filter, searchQuery]);

  const criticalCount = severityCounts.critical;
  const highCount = severityCounts.high;
  const advisoryCount = severityCounts.medium + severityCounts.low;

  return (
    <SafetyModuleShell
      onBack={onBack ?? (() => {})}
      moduleName="Safety Alerts"
      hero={
        <SafetyPageHeader
          eyebrow="Safety Alerts"
          title="Latest alerts and industry notices"
          description="Active safety alerts and industry notices, ordered by severity. Critical alerts appear first — review them before work starts."
          tone={criticalCount > 0 ? 'red' : 'blue'}
        />
      }
      stats={
        allAlerts.length > 0 ? (
          <SafetyStatStrip
            stats={[
              {
                value: criticalCount,
                label: 'Critical',
                tone: criticalCount > 0 ? 'red' : undefined,
                onClick: () => setFilter('critical'),
              },
              {
                value: highCount,
                label: 'High',
                tone: highCount > 0 ? 'orange' : undefined,
                onClick: () => setFilter('high'),
              },
              {
                // Was `setFilterSeverity('all')` — the tile was labelled
                // "Advisory · medium & low" and then cleared the filter
                // instead of applying it, so tapping it showed MORE alerts
                // than the number printed on it. 'advisory' is now a real
                // filter value over medium+low.
                value: advisoryCount,
                label: 'Advisory',
                sub: 'medium & low',
                onClick: () => setFilter('advisory'),
              },
              {
                value: allAlerts.length,
                label: 'Active',
                onClick: () => setFilter('all'),
              },
            ]}
          />
        ) : undefined
      }
      filter={
        allAlerts.length > 0 ? (
          <FilterBar
            tabs={[
              { value: 'all', label: 'All', count: allAlerts.length },
              { value: 'critical', label: 'Critical', count: severityCounts.critical },
              { value: 'high', label: 'High', count: severityCounts.high },
              { value: 'advisory', label: 'Advisory', count: advisoryCount },
            ]}
            activeTab={filter}
            onTabChange={(v) => setFilter(v as FilterValue)}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search alerts…"
          />
        ) : undefined
      }
    >
      {isLoading ? (
        <LoadingState />
      ) : allAlerts.length === 0 ? (
        <EmptyState
          title="No alerts published"
          // Was "Check back later for the latest industry notices" — a promise
          // the product cannot currently keep (see the data note at the top).
          // Better to state the position and point at the reference material
          // that does exist than to imply a feed is running.
          description="There are no published safety alerts. Site-specific hazards belong in your risk assessment and daily briefing."
        />
      ) : filteredAlerts.length === 0 ? (
        <EmptyState
          title="No alerts match your filter"
          description="Try a different severity tab or clear your search."
          action="Show all alerts"
          onAction={() => {
            setFilter('all');
            setSearchQuery('');
          }}
        />
      ) : (
        <SafetyListCard>
          {filteredAlerts.map(({ alert, severity }) => (
            <AlertRow key={alert.id} alert={alert} severity={severity} />
          ))}
        </SafetyListCard>
      )}
    </SafetyModuleShell>
  );
}

export default SafetyAlertsFeed;
