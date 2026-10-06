/**
 * SafetyAlertsFeed — product recalls and safety alerts for the kit electricians
 * fit, use and find on site.
 *
 * Source (from 6 Oct 2026): the government's Product Safety Alerts, Reports and
 * Recalls (Office for Product Safety and Standards, on GOV.UK), copied daily
 * into `safety_alerts` by the `sync-safety-alerts` edge function for electrical
 * appliances, lighting, plugs and sockets, PPE, tools, machinery and
 * construction products. Before that the table was empty and this screen was
 * a dead end.
 *
 * Rules:
 *  - Each notice keeps its own wording, type and risk level. A notice that
 *    states no risk level shows "Risk not stated" — never a grade we made up.
 *    (`severity` is stored for sorting only; the screen shows `risk_level`.)
 *  - Text only. `content` used to be injected as HTML; nothing here renders
 *    markup now, so a bad row cannot become stored XSS.
 *  - The official notice is one tap away. We summarise, GOV.UK is the record.
 */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSafetyAlerts, type SafetyAlert } from '@/hooks/useSafetyAlerts';
import { SafetyModuleShell } from '../common/SafetyModuleShell';
import { SafetyListCard } from '../common/SafetyList';
import { FilterBar, EmptyState, LoadingState } from '@/components/college/primitives';
import { SafetyPageHeader } from '../common/SafetyPageHeader';

interface SafetyAlertsFeedProps {
  onBack?: () => void;
}

type FilterValue = 'all' | 'reached' | 'recalls' | 'electrical' | 'ppe-tools' | 'machinery';

const RISK_TEXT: Record<string, string> = {
  serious: 'text-red-400',
  high: 'text-orange-400',
  medium: 'text-amber-400',
  low: 'text-white',
};
const RISK_BAR: Record<string, string> = {
  serious: 'bg-red-400',
  high: 'bg-orange-400',
  medium: 'bg-amber-400',
  low: 'bg-white/40',
};

const fmtDate = (d?: string | null) => {
  if (!d) return '';
  const t = new Date(d);
  return Number.isNaN(t.getTime())
    ? ''
    : t.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

/** "Product Recall: Zebra PSU (2607-0208)" → "Zebra PSU" — the type has its own pill. */
const cleanTitle = (t: string) =>
  t
    .replace(/^product (recall|safety report|safety alert)\s*:\s*/i, '')
    .replace(/\s*\(\d{4}-\d{4}\)\s*$/, '')
    .trim() || t;

const isRecall = (a: SafetyAlert) => (a.alert_type ?? '').toLowerCase() === 'recall';
const isSerious = (a: SafetyAlert) => a.risk_level === 'serious' || a.risk_level === 'high';
/**
 * Most OPSS safety reports are imports refused at the border: the product
 * never went on sale here (58 of 83 in Oct 2026). Worth knowing, but not
 * kit anyone will find on site, so they are marked and can be filtered out.
 */
const stoppedAtBorder = (a: SafetyAlert) =>
  /rejected at the border/i.test(a.corrective_action ?? '');

/**
 * Tabs by WHAT the kit is. A risk tab was tried first: 75 of 83 notices were
 * serious or high, so it filtered almost nothing; each row shows its risk.
 * Category names are the ones sync-safety-alerts writes.
 */
const GROUP: Record<Exclude<FilterValue, 'all' | 'recalls' | 'reached'>, string[]> = {
  electrical: [
    'Electrical appliances and equipment',
    'Lighting',
    'Adaptors, plugs and sockets',
    'Measuring instruments',
  ],
  'ppe-tools': ['PPE', 'Hand tools', 'Construction products'],
  machinery: ['Machinery'],
};
const inGroup = (a: SafetyAlert, g: keyof typeof GROUP) => GROUP[g].includes(a.category ?? '');

/** OPSS reference, e.g. "2607-0208" or "PSA9", from the notice title. */
const referenceOf = (t: string) => t.match(/\(((?:\d{4}-\d{4})|(?:PSA\d+))\)\s*$/i)?.[1] ?? '';

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[11px] font-medium',
        className ?? 'text-white'
      )}
    >
      {children}
    </span>
  );
}

function AlertRow({ alert }: { alert: SafetyAlert }) {
  const [open, setOpen] = useState(false);
  const risk = alert.risk_level ?? '';

  return (
    <div className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          'flex w-full items-start gap-3 px-4 py-3.5 text-left sm:px-6 sm:py-4',
          'touch-manipulation [-webkit-tap-highlight-color:transparent]',
          'transition-[background-color,transform] duration-150 hover:bg-white/[0.05] active:scale-[0.99] active:bg-white/[0.08]'
        )}
      >
        <span
          aria-hidden
          className={cn('mt-1 h-9 w-[3px] shrink-0 rounded-full', RISK_BAR[risk] ?? 'bg-white/25')}
        />
        <div className="min-w-0 flex-1">
          <div className="line-clamp-2 text-[14px] font-medium leading-snug text-white sm:text-[15px]">
            {cleanTitle(alert.title)}
          </div>
          {alert.hazard && (
            <div className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-white">
              {alert.hazard}
            </div>
          )}
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {alert.alert_type && <Pill>{alert.alert_type}</Pill>}
            {stoppedAtBorder(alert) && <Pill>Stopped at the border</Pill>}
            <Pill className={RISK_TEXT[risk]}>
              {risk ? `${risk.charAt(0).toUpperCase()}${risk.slice(1)} risk` : 'Risk not stated'}
            </Pill>
            <span className="text-[11.5px] tabular-nums text-white">
              {fmtDate(alert.date_published)}
            </span>
          </div>
        </div>
        <span
          className={cn(
            'shrink-0 text-[13px] text-white transition-transform duration-200',
            open && 'rotate-180'
          )}
          aria-hidden
        >
          ⌄
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-white/[0.08] px-5 pb-5 pt-3 sm:px-6">
              {alert.hazard ? (
                <>
                  <div>
                    <p className="text-[12px] font-semibold text-white">Hazard</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-white">{alert.hazard}</p>
                  </div>
                  {alert.corrective_action && (
                    <div>
                      <p className="text-[12px] font-semibold text-white">Action taken</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-white">
                        {alert.corrective_action}
                      </p>
                    </div>
                  )}
                  <p className="text-[12px] leading-snug text-white">
                    {stoppedAtBorder(alert)
                      ? 'This product was refused entry, so it should not be on sale in the UK. If you find one in use, treat it as unsafe.'
                      : isRecall(alert)
                        ? 'If a customer has one, check whether their model is affected and point them to the recall on the notice.'
                        : 'Check the notice for the affected models before you fit, use or leave one in service.'}
                  </p>
                </>
              ) : (
                <p className="text-[13px] leading-relaxed text-white">{alert.summary}</p>
              )}
              <p className="text-[12px] text-white">
                {[
                  alert.category,
                  referenceOf(alert.title) && `OPSS reference ${referenceOf(alert.title)}`,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
              {alert.source_url && (
                <a
                  href={alert.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation"
                >
                  Read the notice on GOV.UK
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SafetyAlertsFeed({ onBack }: SafetyAlertsFeedProps) {
  const { data: alerts, isLoading, isError, refetch } = useSafetyAlerts();
  const [filter, setFilter] = useState<FilterValue>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Newest first. A severity-first sort would push notices that state no risk
  // level to the bottom as if they were minor, which the notice never said.
  const all = useMemo(
    () =>
      [...(alerts ?? [])].sort((a, b) =>
        (b.date_published ?? '').localeCompare(a.date_published ?? '')
      ),
    [alerts]
  );
  const recallCount = all.filter(isRecall).length;
  const seriousCount = all.filter(isSerious).length;

  const shown = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return all.filter((a) => {
      if (filter === 'recalls' && !isRecall(a)) return false;
      if (filter === 'reached' && stoppedAtBorder(a)) return false;
      if (filter !== 'all' && filter !== 'recalls' && filter !== 'reached' && !inGroup(a, filter))
        return false;
      if (!q) return true;
      return [a.title, a.summary, a.category, a.hazard].some((v) =>
        (v ?? '').toLowerCase().includes(q)
      );
    });
  }, [all, filter, searchQuery]);

  return (
    <SafetyModuleShell
      onBack={onBack ?? (() => {})}
      moduleName="Safety Alerts"
      hero={
        <SafetyPageHeader
          eyebrow="Safety Alerts"
          title="Product recalls and safety alerts"
          description="From the Office for Product Safety and Standards on GOV.UK, updated daily: electrical kit, lighting, plugs and sockets, PPE, tools and machinery. Last 90 days."
          tone={seriousCount > 0 ? 'red' : 'blue'}
        />
      }
      filter={
        all.length > 0 ? (
          <FilterBar
            touch
            tabs={[
              { value: 'all', label: 'All', count: all.length },
              {
                value: 'reached',
                label: 'Reached buyers',
                count: all.filter((a) => !stoppedAtBorder(a)).length,
              },
              { value: 'recalls', label: 'Recalls', count: recallCount },
              {
                value: 'electrical',
                label: 'Electrical and lighting',
                count: all.filter((a) => inGroup(a, 'electrical')).length,
              },
              {
                value: 'ppe-tools',
                label: 'PPE and tools',
                count: all.filter((a) => inGroup(a, 'ppe-tools')).length,
              },
              {
                value: 'machinery',
                label: 'Machinery',
                count: all.filter((a) => inGroup(a, 'machinery')).length,
              },
            ]}
            activeTab={filter}
            onTabChange={(v) => setFilter(v as FilterValue)}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search, e.g. charger, RCD, light"
          />
        ) : undefined
      }
    >
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <EmptyState
          touch
          title="Couldn't load alerts"
          description="Check your connection and try again."
          action="Try again"
          onAction={() => refetch()}
        />
      ) : all.length === 0 ? (
        <EmptyState
          touch
          title="No alerts yet"
          description="Product recalls and safety alerts are added each morning. None have been published for this kit in the last 90 days."
        />
      ) : shown.length === 0 ? (
        <EmptyState
          touch
          title="Nothing matches"
          description="Try another tab or clear your search."
          action="Show all"
          onAction={() => {
            setFilter('all');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="space-y-3">
          {/* The page description is hidden on phones; the source must not be. */}
          <p className="text-[12px] leading-snug text-white">
            {shown.length} notice{shown.length === 1 ? '' : 's'} from the Office for Product Safety
            and Standards (GOV.UK), last 90 days. Updated every morning.
          </p>
          <SafetyListCard className="-mx-4 rounded-none border-x-0 sm:mx-0 sm:rounded-2xl sm:border-x">
            {shown.map((a) => (
              <AlertRow key={a.id} alert={a} />
            ))}
          </SafetyListCard>
        </div>
      )}
    </SafetyModuleShell>
  );
}

export default SafetyAlertsFeed;
