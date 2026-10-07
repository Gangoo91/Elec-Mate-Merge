/**
 * Jobs › Recurring work (ELE-1821).
 *
 * Repeat visits: firm jobs made recurring. The nightly generator books each
 * next visit as a firm job before it is due, with the same crew when asked.
 * Renewals: the re-test date on each of the firm's certificates (its own and
 * those approved in its QS review), bookable as a job in one tap.
 * Deep links: ?section=recurring&tab=renewals, &visit=<contract id>.
 */
import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CalendarClock, Loader2, Pause, Play, Repeat, Square, Users } from 'lucide-react';
import { toast } from 'sonner';
import {
  PageFrame,
  PageHero,
  StatStrip,
  EmptyState,
  LoadingState,
} from '@/components/employer/editorial';
import { FormSheet } from '@/components/forms/FormSheet';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { RECURRING_HELP as HELP } from '@/components/employer/help/recurring';
import { chipBase, chipOn, chipOff, buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { FREQUENCY_LABELS } from '@/hooks/useMaintenanceContracts';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import {
  useFirmRecurring,
  useFirmRenewals,
  useSetRecurringStatus,
  useBookRenewal,
  nextVisitLabel,
  certLabel,
  type FirmRecurring,
  type FirmRenewal,
} from '@/hooks/useFirmRecurring';
import { MakeRecurringSheet } from '@/components/employer/jobs/MakeRecurringSheet';

const rowCn =
  'w-full text-left -mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-white/[0.1] bg-white/[0.04] px-4 py-4 sm:px-5 touch-manipulation transition-colors hover:bg-white/[0.07]';

const daysFromToday = (iso: string) => {
  const noon = new Date();
  noon.setHours(12, 0, 0, 0);
  return Math.round((new Date(`${iso}T12:00:00`).getTime() - noon.getTime()) / 86400e3);
};

function dueText(iso: string) {
  const d = daysFromToday(iso);
  if (d < 0) return `${Math.abs(d)} day${d === -1 ? '' : 's'} overdue`;
  if (d === 0) return 'Due today';
  if (d === 1) return 'Due tomorrow';
  if (d <= 60) return `Due in ${d} days`;
  return `Due ${nextVisitLabel(iso)}`;
}

const freqText = (r: FirmRecurring) =>
  r.frequency === 'custom' ? `Every ${r.frequency_custom_days ?? 30} days` : FREQUENCY_LABELS[r.frequency];

const STATUS_CHIP: Record<FirmRecurring['status'], string> = {
  active: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30',
  paused: 'bg-orange-500/15 text-orange-200 border-orange-400/30',
  ended: 'bg-white/[0.06] text-white border-white/[0.14]',
};
const STATUS_LABEL: Record<FirmRecurring['status'], string> = {
  active: 'Repeating',
  paused: 'Paused',
  ended: 'Ended',
};

export function RecurringSection() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const tab = params.get('tab') === 'renewals' ? 'renewals' : 'visits';
  const visitId = params.get('visit');
  const setParam = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    setParams(next, { replace: true });
  };

  const { data: role } = useEmployerRole();
  const canSeeMoney = !!role?.canSeeMoney;
  const recurring = useFirmRecurring();
  // Four months by default; a year when planning ahead.
  const ahead = params.get('ahead') === '12' ? 365 : 120;
  const renewals = useFirmRenewals(ahead);
  const list = recurring.data ?? [];
  const certs = renewals.data ?? [];

  const in14 = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return format(d, 'yyyy-MM-dd');
  }, []);
  const stats = {
    active: list.filter((r) => r.status === 'active').length,
    soon: list.filter((r) => r.status === 'active' && r.next_due_date <= in14).length,
    certsOpen: certs.filter((c) => !c.employer_job_id).length,
    certsOverdue: certs.filter((c) => c.overdue && !c.employer_job_id).length,
  };

  const openJob = (id: string) => navigate(`/employer?section=jobs&job=${id}`);
  const selected = list.find((r) => r.id === visitId) ?? null;

  return (
    <PageFrame>
      <PageHero
        eyebrow="Jobs"
        title="Recurring work"
        description="Repeat visits that book themselves, and every certificate's re-test date, before the client has to chase you."
        tone="cyan"
        actions={<PageHelpButton help={HELP} askContext={{ page: 'recurring', tab }} />}
      />
      <HowItWorks help={HELP} askContext={{ page: 'recurring', tab }} />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Repeating', value: stats.active, tone: 'cyan', onClick: () => setParam({ tab: null }) },
          { label: 'Booked in 14 days', value: stats.soon, tone: stats.soon ? 'amber' : 'emerald', onClick: () => setParam({ tab: null }) },
          { label: 'Renewals due', value: stats.certsOpen, tone: 'blue', onClick: () => setParam({ tab: 'renewals' }) },
          {
            label: 'Renewals overdue',
            value: stats.certsOverdue,
            tone: stats.certsOverdue ? 'red' : 'emerald',
            onClick: () => setParam({ tab: 'renewals' }),
          },
        ]}
      />

      <div data-help="recurring.tabs" className="grid grid-cols-2 gap-2 sm:max-w-sm">
        {(
          [
            ['visits', 'Repeat visits'],
            ['renewals', 'Renewals'],
          ] as const
        ).map(([v, l]) => (
          <button
            key={v}
            type="button"
            onClick={() => setParam({ tab: v === 'visits' ? null : v })}
            className={cn(chipBase, tab === v ? chipOn : chipOff)}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === 'renewals' && (
        <div className="flex flex-wrap gap-2">
          {(
            [
              [null, 'Next 4 months'],
              ['12', 'Next 12 months'],
            ] as const
          ).map(([v, l]) => (
            <button
              key={l}
              type="button"
              onClick={() => setParam({ ahead: v })}
              className={cn(chipBase, 'px-4', (v === '12') === (ahead === 365) ? chipOn : chipOff)}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      {tab === 'visits' ? (
        recurring.isLoading ? (
          <LoadingState className="py-12" />
        ) : list.length === 0 ? (
          <EmptyState
            title="No repeat visits yet"
            description="Open a job and tap Make this recurring. Annual EICRs, PAT rounds, quarterly emergency lighting: the next visit is booked as a job before it's due."
            action="Open Jobs"
            onAction={() => navigate('/employer?section=jobs')}
          />
        ) : (
          <div className="space-y-2">
            {list.map((r) => (
              <button key={r.id} type="button" className={rowCn} onClick={() => setParam({ visit: r.id })}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-white truncate">{r.title}</p>
                    <p className="mt-0.5 text-[13px] text-white truncate">
                      {[r.client, r.location].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <span className={cn('shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium', STATUS_CHIP[r.status])}>
                    {STATUS_LABEL[r.status]}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-white">
                  <span className="inline-flex items-center gap-1.5">
                    <Repeat className="h-3.5 w-3.5 text-elec-yellow" />
                    {freqText(r)}
                  </span>
                  {r.status !== 'ended' && (
                    <span className={cn('inline-flex items-center gap-1.5', r.status === 'active' && r.next_due_date <= in14 && 'text-amber-200')}>
                      <CalendarClock className="h-3.5 w-3.5 text-elec-yellow" />
                      Next {nextVisitLabel(r.next_due_date)}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-elec-yellow" />
                    {r.same_crew ? (r.crew.length ? r.crew.join(', ') : 'No crew yet') : 'Crew picked each time'}
                  </span>
                  {canSeeMoney && r.amount != null && (
                    <span>£{Number(r.amount).toFixed(2)} a visit{r.auto_create_invoice ? ', invoice drafted' : ''}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )
      ) : renewals.isLoading ? (
        <LoadingState className="py-12" />
      ) : certs.length === 0 ? (
        <EmptyState
          title={ahead === 365 ? 'No renewals in the next 12 months' : 'No renewals in the next four months'}
          description={
            ahead === 365
              ? 'Nothing the firm issued, or approved in QS review, is due for re-test within a year.'
              : 'When a certificate the firm issued, or approved in QS review, is within four months of its re-test date, it shows here to book. Look further ahead with Next 12 months.'
          }
        />
      ) : (
        <RenewalsList certs={certs} onOpenJob={openJob} />
      )}

      {selected && (
        <VisitSheet
          visit={selected}
          canSeeMoney={canSeeMoney}
          onClose={() => setParam({ visit: null })}
          onOpenJob={openJob}
        />
      )}
    </PageFrame>
  );
}

function RenewalsList({ certs, onOpenJob }: { certs: FirmRenewal[]; onOpenJob: (id: string) => void }) {
  const book = useBookRenewal();
  const [busy, setBusy] = useState<string | null>(null);

  const run = async (c: FirmRenewal, repeat: boolean) => {
    setBusy(`${c.id}:${repeat}`);
    try {
      const jobId = await book.mutateAsync({ id: c.id, makeRecurring: repeat });
      toast.success(repeat ? 'Booked, and it will repeat' : 'Booked as a job', {
        description: 'It is in the diary two weeks before the re-test date. Add the crew from the job.',
        action: jobId ? { label: 'Open job', onClick: () => onOpenJob(jobId) } : undefined,
      });
    } catch (e) {
      toast.error((e as Error).message || 'Not booked');
    } finally {
      setBusy(null);
    }
  };

  const groups: Array<{ title: string; items: FirmRenewal[] }> = [
    { title: 'Overdue', items: certs.filter((c) => c.overdue) },
    { title: 'Due in the next 30 days', items: certs.filter((c) => !c.overdue && daysFromToday(c.expiry_date) <= 30) },
    { title: 'Later', items: certs.filter((c) => daysFromToday(c.expiry_date) > 30) },
  ].filter((g) => g.items.length);

  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <section key={g.title} className="space-y-2">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            {g.title} <span className="font-normal">({g.items.length})</span>
          </h2>
          {g.items.map((c) => (
            <div key={c.id} className={cn(rowCn, 'hover:bg-white/[0.04]')}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-white truncate">
                    {certLabel(c.report_type)} · {c.client_name || 'Client'}
                  </p>
                  <p className="mt-0.5 text-[13px] text-white truncate">{c.installation_address || 'No address on the certificate'}</p>
                </div>
                <span
                  className={cn(
                    'shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium',
                    c.overdue
                      ? 'bg-red-500/15 text-red-200 border-red-400/30'
                      : 'bg-white/[0.06] text-white border-white/[0.14]'
                  )}
                >
                  {dueText(c.expiry_date)}
                </span>
              </div>
              <p className="mt-2 text-[12.5px] text-white">
                {[
                  c.certificate_number ? `Certificate ${c.certificate_number}` : null,
                  c.inspection_date ? `last done ${nextVisitLabel(c.inspection_date)}` : null,
                  c.done_by ? `by ${c.done_by}` : null,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                {c.employer_job_id ? (
                  <button
                    type="button"
                    className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center px-4 col-span-2 sm:w-auto')}
                    onClick={() => onOpenJob(c.employer_job_id!)}
                  >
                    Booked{c.booked_for_date ? ` for ${nextVisitLabel(c.booked_for_date)}` : ''}. Open job
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center px-4 sm:w-auto')}
                      disabled={!!busy}
                      onClick={() => run(c, false)}
                    >
                      {busy === `${c.id}:false` ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Book as a job'}
                    </button>
                    <button
                      type="button"
                      className={cn(buttonPrimaryCn, 'inline-flex items-center justify-center px-4 sm:w-auto')}
                      disabled={!!busy}
                      onClick={() => run(c, true)}
                    >
                      {busy === `${c.id}:true` ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Book and repeat'}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

function VisitSheet({
  visit,
  canSeeMoney,
  onClose,
  onOpenJob,
}: {
  visit: FirmRecurring;
  canSeeMoney: boolean;
  onClose: () => void;
  onOpenJob: (id: string) => void;
}) {
  const setStatus = useSetRecurringStatus();
  const [editing, setEditing] = useState(false);

  const change = async (status: FirmRecurring['status']) => {
    try {
      await setStatus.mutateAsync({ id: visit.id, status });
      toast.success(status === 'active' ? 'Repeating again' : status === 'paused' ? 'Paused' : 'Ended');
    } catch (e) {
      toast.error((e as Error).message || 'Not saved');
    }
  };

  const facts: Array<[string, string]> = [
    ['How often', freqText(visit)],
    ['Next visit', visit.status === 'ended' ? 'None, it has ended' : nextVisitLabel(visit.next_due_date)],
    ['Booked', `${visit.reminder_days_before} days ahead`],
    ['Crew', visit.same_crew ? (visit.crew.length ? visit.crew.join(', ') : 'No one on the last visit') : 'Picked each time'],
    ['Visits booked so far', String(visit.visits)],
    ...(visit.end_date ? ([['Stops after', nextVisitLabel(visit.end_date)]] as Array<[string, string]>) : []),
    ...(canSeeMoney && visit.amount != null
      ? ([[ 'Price per visit', `£${Number(visit.amount).toFixed(2)}${visit.auto_create_invoice ? ', invoice drafted each time' : ''}` ]] as Array<[string, string]>)
      : []),
  ];

  return (
    <>
      <FormSheet
        open={!editing}
        onOpenChange={(o) => !o && onClose()}
        eyebrow="Repeat visit"
        title={visit.title}
        description={[visit.client, visit.location].filter(Boolean).join(' · ')}
        width="wide"
        footer={
          <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
            {visit.status === 'active' && (
              <button type="button" className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center px-4 sm:w-auto')} disabled={setStatus.isPending} onClick={() => change('paused')}>
                <Pause className="mr-1.5 h-4 w-4" /> Pause
              </button>
            )}
            {visit.status !== 'active' && (
              <button type="button" className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center px-4 sm:w-auto')} disabled={setStatus.isPending} onClick={() => change('active')}>
                <Play className="mr-1.5 h-4 w-4" /> {visit.status === 'ended' ? 'Start again' : 'Resume'}
              </button>
            )}
            {visit.status !== 'ended' && (
              <button type="button" className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center px-4 sm:w-auto')} disabled={setStatus.isPending} onClick={() => change('ended')}>
                <Square className="mr-1.5 h-4 w-4" /> End
              </button>
            )}
            {visit.status !== 'ended' && (
              <button type="button" className={cn(buttonPrimaryCn, 'inline-flex items-center justify-center px-4 sm:w-auto')} onClick={() => setEditing(true)}>
                Change
              </button>
            )}
          </div>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <dl className="divide-y divide-white/[0.08] rounded-2xl border border-white/[0.1] bg-white/[0.04]">
            {facts.map(([k, v]) => (
              <div key={k} className="px-4 py-3">
                <dt className="text-[12px] font-medium text-white">{k}</dt>
                <dd className="mt-0.5 text-[15px] text-white">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="space-y-2">
            {visit.last_visit && (
              <button type="button" className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center px-4 w-full')} onClick={() => onOpenJob(visit.last_visit!.id)}>
                Open the latest visit{visit.last_visit.date ? ` (${nextVisitLabel(visit.last_visit.date)})` : ''}
              </button>
            )}
            <button type="button" className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center px-4 w-full')} onClick={() => onOpenJob(visit.source_job_id)}>
              Open the original job
            </button>
            <p className="pt-2 text-[13px] leading-relaxed text-white">
              Each visit is booked as its own job {visit.reminder_days_before} days before it is due, with the client, site and notes
              from the original job. You get a bell when it is booked.
            </p>
          </div>
        </div>
      </FormSheet>
      <MakeRecurringSheet
        open={editing}
        onOpenChange={(o) => {
          if (!o) setEditing(false);
        }}
        job={{ id: visit.source_job_id, title: visit.title }}
        existing={visit}
      />
    </>
  );
}
