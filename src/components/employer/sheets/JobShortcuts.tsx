import { useJobSheetCounts } from '@/hooks/useJobContext';
import { useMaterialOrders } from '@/hooks/useFinance';
import { cn } from '@/lib/utils';
import { useSignatureRequests, isOpenRequest } from '@/hooks/useSignatureRequests';

/**
 * "Everything on this job" — the job sheet's shortcut grid (ELE-1960).
 *
 * Every tile carries the job: hub sections open filtered with `?job=<id>`
 * (and a "Back to job" bar), Team opens on top of the sheet, Checklist jumps
 * down the sheet. Each tile shows what is actually there, so the office
 * answers "where are we on Orchard Close?" without opening six screens.
 * Counts only — money stays in the control centre, gated by role.
 */

export type JobShortcutTarget =
  | { kind: 'section'; section: string; params?: Record<string, string> }
  | { kind: 'team' }
  | { kind: 'checklist' };

interface Tile {
  key: string;
  label: string;
  sub: string;
  tone?: 'alert' | 'warn' | 'good';
  target: JobShortcutTarget;
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

export function JobShortcuts({
  jobId,
  canSeeMoney,
  onSelect,
}: {
  jobId: string;
  canSeeMoney: boolean;
  onSelect: (target: JobShortcutTarget) => void;
}) {
  const { data: c, isLoading } = useJobSheetCounts(jobId);
  // Purchase orders for this job (ELE-1978). Counts only — no money here.
  const { data: jobOrders = [] } = useMaterialOrders(jobId);
  const openOrders = jobOrders.filter((o) => ['Sent', 'Confirmed', 'Part-received'].includes(o.status)).length;
  // Client sign-offs on this job: handover, variations, its quote (ELE-1993).
  const { data: jobSignatures = [] } = useSignatureRequests(jobId);
  const sigWaiting = jobSignatures.filter(isOpenRequest).length;
  const sigSigned = jobSignatures.filter((s) => s.status === 'Signed').length;

  const tiles: Tile[] = c
    ? [
        {
          key: 'quotes',
          label: 'Quotes',
          sub: c.quotes ? plural(c.quotes, 'quote') : 'None yet',
          target: { kind: 'section', section: 'quotes', params: { tab: 'quotes' } },
        },
        {
          key: 'invoices',
          label: 'Invoices',
          sub: c.invoices ? plural(c.invoices, 'invoice') : 'Not invoiced',
          target: { kind: 'section', section: 'quotes', params: { tab: 'invoices' } },
        },
        {
          key: 'packs',
          label: 'RAMS & packs',
          sub:
            c.packs || c.rams
              ? [c.packs ? plural(c.packs, 'pack') : null, c.rams ? `${c.rams} RAMS` : null]
                  .filter(Boolean)
                  .join(' · ')
              : 'No pack yet',
          tone: c.packs || c.rams ? undefined : 'warn',
          target: { kind: 'section', section: 'jobpacks' },
        },
        {
          key: 'team',
          label: 'Team',
          sub: c.team ? `${c.team} on the job` : 'Nobody assigned',
          tone: c.team ? undefined : 'alert',
          target: { kind: 'team' },
        },
        {
          key: 'hours',
          label: 'Hours',
          sub: c.timesheets
            ? `${Number(c.hours).toLocaleString('en-GB', { maximumFractionDigits: 1 })} hrs logged`
            : 'No time yet',
          target: { kind: 'section', section: 'timesheets' },
        },
        {
          key: 'materials',
          label: 'Materials',
          sub: jobOrders.length
            ? openOrders
              ? `${openOrders} awaiting delivery`
              : plural(jobOrders.length, 'order')
            : canSeeMoney
              ? 'Order materials'
              : 'No orders yet',
          // No orders yet: owner/admin land straight in a new order filled
          // from this job's quote; everyone else sees the job's orders.
          target: {
            kind: 'section',
            section: 'procurement',
            params: !jobOrders.length && canSeeMoney ? { order: '1' } : undefined,
          } as JobShortcutTarget,
        },
        {
          key: 'photos',
          label: 'Photos',
          // Every source: uploads, snags, site diary and task photos (ELE-1970).
          sub: c.photos ? plural(c.photos, 'photo') : 'None yet',
          target: { kind: 'section', section: 'photogallery' },
        },
        {
          key: 'snags',
          label: 'Punch list',
          sub: c.snags_open
            ? `${c.snags_open} open`
            : c.snags_total
              ? `All ${c.snags_total} cleared`
              : 'None logged',
          tone: c.snags_open ? 'warn' : c.snags_total ? 'good' : undefined,
          // Snags live in Issues now (ELE-1967); this opens the job's punch list.
          target: { kind: 'section', section: 'issues', params: { type: 'snags', punch: '1' } },
        },
        {
          key: 'issues',
          label: 'Issues',
          // The Issues list shows every type, snags included, so count the same.
          sub:
            c.issues_open + c.snags_open
              ? `${c.issues_open + c.snags_open} open`
              : c.issues_total + c.snags_total
                ? 'All resolved'
                : 'None',
          tone: c.issues_open + c.snags_open ? 'alert' : undefined,
          target: { kind: 'section', section: 'issues' },
        },
        {
          key: 'progress',
          label: 'Site diary',
          // Office logs and the team's notes together (ELE-1964).
          sub: c.progress_logs ? plural(c.progress_logs, 'entry', 'entries') : 'Nothing yet',
          target: { kind: 'section', section: 'progresslogs' },
        },
        {
          key: 'testing',
          label: 'Certificates',
          // ELE-1973: counts the job's linked certificates; "failed" = returned by the QS.
          sub: c.tests
            ? c.tests_failed
              ? `${c.tests_failed} returned by QS`
              : plural(c.tests, 'certificate')
            : 'Link a certificate',
          tone: c.tests_failed ? 'alert' : undefined,
          target: { kind: 'section', section: 'testing' },
        },
        {
          key: 'signatures',
          label: 'Client sign-off',
          sub: sigWaiting
            ? `${sigWaiting} waiting`
            : sigSigned
              ? plural(sigSigned, 'signed document')
              : 'Handover, variations',
          tone: sigWaiting ? 'warn' : sigSigned ? 'good' : undefined,
          target: { kind: 'section', section: 'signatures' },
        },
        {
          key: 'checklist',
          label: 'Checklist',
          sub: c.checklist_total ? `${c.checklist_done} of ${c.checklist_total} done` : 'Add items',
          tone:
            c.checklist_total && c.checklist_done === c.checklist_total ? 'good' : undefined,
          target: { kind: 'checklist' },
        },
        ...(canSeeMoney
          ? [
              {
                key: 'financials',
                label: 'Financials',
                sub: 'Costs & profit',
                target: { kind: 'section', section: 'financials' } as JobShortcutTarget,
              },
            ]
          : []),
      ]
    : [];

  return (
    <section aria-label="Everything on this job">
      <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
        Everything on this job
      </h2>
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-[64px] rounded-xl bg-white/[0.04] animate-pulse" />
          ))}
        </div>
      ) : !c ? (
        <p className="text-[13px] text-white">Couldn't load this job's records. Pull to refresh.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {tiles.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => onSelect(t.target)}
              className={cn(
                'min-h-[64px] rounded-xl border px-3.5 py-2.5 text-left touch-manipulation transition-colors active:scale-[0.98]',
                'bg-gradient-to-b from-white/[0.07] to-white/[0.03] hover:from-white/[0.1]',
                t.tone === 'alert'
                  ? 'border-red-500/40'
                  : t.tone === 'warn'
                    ? 'border-orange-500/40'
                    : 'border-white/[0.1]'
              )}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-[13.5px] font-semibold text-white truncate">{t.label}</span>
                <span aria-hidden className="text-white text-[13px] shrink-0">
                  ›
                </span>
              </span>
              <span
                className={cn(
                  'mt-0.5 block text-[12px] truncate',
                  t.tone === 'alert'
                    ? 'text-red-300'
                    : t.tone === 'warn'
                      ? 'text-orange-300'
                      : t.tone === 'good'
                        ? 'text-emerald-300'
                        : 'text-white'
                )}
              >
                {t.sub}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
