/**
 * SafetyAlertsFeed — latest safety alerts and industry notices.
 * Editorial standard: masthead + PageHero + StatStrip + FilterBar + hairline rows.
 * Read-only feed. One colour dimension = severity (red/orange/amber/blue) shown as a
 * thin ListRow accent bar + a small uppercase severity pill. Critical sorts to top.
 */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSafetyAlerts, type SafetyAlert } from '@/hooks/useSafetyAlerts';
import { SafetyModuleShell } from '../common/SafetyModuleShell';
import {
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  LoadingState,
  type Tone,
} from '@/components/college/primitives';

interface SafetyAlertsFeedProps {
  onBack?: () => void;
}

type Severity = 'critical' | 'high' | 'medium' | 'low';
const SEVERITY_ORDER: Severity[] = ['critical', 'high', 'medium', 'low'];
const SEVERITY_RANK: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 };

const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

// Colour follows one meaningful dimension: severity.
function severityTone(severity: string): Tone {
  if (severity === 'critical') return 'red';
  if (severity === 'high') return 'orange';
  if (severity === 'medium') return 'amber';
  return 'blue'; // low / unknown
}

const SEVERITY_DOT: Record<Tone, string> = {
  red: 'bg-red-400',
  orange: 'bg-orange-400',
  amber: 'bg-amber-400',
  blue: 'bg-blue-400',
  green: 'bg-emerald-400',
  emerald: 'bg-emerald-400',
  purple: 'bg-purple-400',
  yellow: 'bg-elec-yellow',
  cyan: 'bg-cyan-400',
  indigo: 'bg-indigo-400',
};

const SEVERITY_PILL: Record<Tone, string> = {
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
  yellow: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/25',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25',
};

function SeverityPill({ severity }: { severity: string }) {
  const tone = severityTone(severity);
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        SEVERITY_PILL[tone]
      )}
    >
      {severity}
    </span>
  );
}

function AlertRow({ alert }: { alert: SafetyAlert }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const tone = severityTone(alert.severity);

  return (
    <div className="overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        className="group w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors"
      >
        <span aria-hidden className={cn('w-[3px] h-10 rounded-full shrink-0', SEVERITY_DOT[tone])} />
        <div className="flex-1 min-w-0">
          <div className="text-sm sm:text-[15px] font-medium text-white truncate">{alert.title}</div>
          <div className="mt-0.5 text-[11.5px] text-white/75 line-clamp-2">{alert.summary}</div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <SeverityPill severity={alert.severity} />
          <span className="text-[11px] tabular-nums text-white/45">{fmtDate(alert.date_published)}</span>
        </div>
        <span
          className={cn(
            'text-white/40 text-[13px] transition-transform duration-200 shrink-0',
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
            <div className="px-5 sm:px-6 pb-5 pt-0">
              <div className="border-t border-white/[0.06] pt-3">
                <div
                  className="prose prose-invert prose-sm max-w-none text-white/85 [&_p]:text-white/85 [&_li]:text-white/85 [&_h3]:text-white [&_h4]:text-white [&_a]:text-elec-yellow"
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
  const [filterSeverity, setFilterSeverity] = useState<Severity | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allAlerts = useMemo(() => alerts ?? [], [alerts]);

  // Severity counts for stats + filter tabs.
  const severityCounts = useMemo(() => {
    const counts: Record<Severity, number> = { critical: 0, high: 0, medium: 0, low: 0 };
    for (const a of allAlerts) {
      const key = (SEVERITY_ORDER.includes(a.severity as Severity) ? a.severity : 'medium') as Severity;
      counts[key] += 1;
    }
    return counts;
  }, [allAlerts]);

  // Critical/high sort to top, then by date — urgent first.
  const sortedAlerts = useMemo(() => {
    return [...allAlerts].sort((a, b) => {
      const ra = SEVERITY_RANK[(a.severity as Severity) in SEVERITY_RANK ? (a.severity as Severity) : 'medium'];
      const rb = SEVERITY_RANK[(b.severity as Severity) in SEVERITY_RANK ? (b.severity as Severity) : 'medium'];
      if (ra !== rb) return ra - rb;
      return new Date(b.date_published).getTime() - new Date(a.date_published).getTime();
    });
  }, [allAlerts]);

  const filteredAlerts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return sortedAlerts.filter((a) => {
      if (filterSeverity !== 'all' && a.severity !== filterSeverity) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        (a.category ?? '').toLowerCase().includes(q)
      );
    });
  }, [sortedAlerts, filterSeverity, searchQuery]);

  const criticalCount = severityCounts.critical;
  const highCount = severityCounts.high;

  return (
    <SafetyModuleShell
      onBack={onBack ?? (() => {})}
      moduleName="Safety Alerts"
      hero={
        <PageHero
          eyebrow="Safety Alerts"
          title="Latest alerts and industry notices"
          description="Active safety alerts and industry notices, ordered by severity. Critical alerts appear first — review them before work starts."
          tone={criticalCount > 0 ? 'red' : 'blue'}
        />
      }
      stats={
        allAlerts.length > 0 ? (
          <StatStrip
            stats={[
              {
                value: criticalCount,
                label: 'Critical',
                tone: criticalCount > 0 ? 'red' : undefined,
                onClick: () => setFilterSeverity('critical'),
              },
              {
                value: highCount,
                label: 'High',
                tone: highCount > 0 ? 'orange' : undefined,
                onClick: () => setFilterSeverity('high'),
              },
              {
                value: severityCounts.medium + severityCounts.low,
                label: 'Advisory',
                sub: 'medium & low',
                onClick: () => setFilterSeverity('all'),
              },
              {
                value: allAlerts.length,
                label: 'Active',
                onClick: () => setFilterSeverity('all'),
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
              { value: 'medium', label: 'Medium', count: severityCounts.medium },
              { value: 'low', label: 'Low', count: severityCounts.low },
            ]}
            activeTab={filterSeverity}
            onTabChange={(v) => setFilterSeverity(v as Severity | 'all')}
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
          title="No active alerts"
          description="There are no safety alerts at the moment. Check back later for the latest industry notices."
        />
      ) : filteredAlerts.length === 0 ? (
        <EmptyState title="No alerts match your filter" description="Try a different severity tab or clear your search." />
      ) : (
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
          {filteredAlerts.map((alert) => (
            <AlertRow key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </SafetyModuleShell>
  );
}

export default SafetyAlertsFeed;
