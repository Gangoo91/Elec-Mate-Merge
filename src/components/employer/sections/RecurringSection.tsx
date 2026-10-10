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
import { Loader2, Pause, Play, Square } from 'lucide-react';
import { toast } from 'sonner';
import {
  frameClass,
  twoColClass,
  colClass,
  panel,
  PanelTitle,
  HeroActions,
  HeroPrimary,
  StatusPill,
  Row,
  RowList,
  PlainEmpty,
  Segments,
} from '@/components/employer/pageParts/PageParts';
import { PageFrame, PageHero, StatStrip, LoadingState } from '@/components/employer/editorial';
import { FormSheet } from '@/components/forms/FormSheet';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { RECURRING_HELP as HELP } from '@/components/employer/help/recurring';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
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
  r.frequency === 'custom'
    ? `Every ${r.frequency_custom_days ?? 30} days`
    : FREQUENCY_LABELS[r.frequency];

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

  const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
  const liveLine = (() => {
    if (recurring.isLoading || renewals.isLoading) return 'Loading recurring work.';
    const todo: string[] = [];
    if (stats.certsOverdue > 0) todo.push(`${plural(stats.certsOverdue, 'renewal')} overdue`);
    if (stats.certsOpen - stats.certsOverdue > 0)
      todo.push(`${plural(stats.certsOpen - stats.certsOverdue, 'renewal')} to book`);
    const visits =
      stats.active > 0
        ? `${plural(stats.active, 'repeat visit')}${stats.soon ? `, ${stats.soon} booking in the next 14 days` : ''}`
        : 'No repeat visits yet';
    return todo.length
      ? `${todo.join(', ')}. ${visits}.`
      : `${visits}. No renewals waiting to book.`;
  })();

  const visitsList = recurring.isLoading ? (
    <LoadingState className="py-12" />
  ) : list.length === 0 ? (
    <PlainEmpty
      text="Repeat visits appear here once you open a job and tap Make this recurring. Each visit is booked as a job before it is due."
      action="Open Jobs"
      onAction={() => navigate('/employer?section=jobs')}
    />
  ) : (
    <RowList>
      {list.map((r) => (
        <Row
          key={r.id}
          onClick={() => setParam({ visit: r.id })}
          title={r.title}
          detail={[r.client, r.location, freqText(r)].filter(Boolean).join(' · ')}
          meta={
            <span>
              {r.status !== 'ended' && (
                <span
                  className={cn(
                    r.status === 'active' && r.next_due_date <= in14 && 'text-elec-yellow'
                  )}
                >
                  Next {nextVisitLabel(r.next_due_date)}
                </span>
              )}
              {r.status !== 'ended' && ' · '}
              {r.same_crew
                ? r.crew.length
                  ? r.crew.join(', ')
                  : 'No crew yet'
                : 'Crew picked each time'}
              {canSeeMoney && r.amount != null && (
                <>
                  {' · '}£{Number(r.amount).toFixed(2)} a visit
                  {r.auto_create_invoice ? ', invoice drafted' : ''}
                </>
              )}
            </span>
          }
          trailing={
            <StatusPill tone={r.status === 'active' ? 'green' : 'neutral'}>
              {STATUS_LABEL[r.status]}
            </StatusPill>
          }
        />
      ))}
    </RowList>
  );

  const renewalsList = renewals.isLoading ? (
    <LoadingState className="py-12" />
  ) : certs.length === 0 ? (
    <PlainEmpty
      text={
        ahead === 365
          ? 'Nothing the firm issued, or approved in QS review, is due for re-test within a year.'
          : 'Certificates the firm issued, or approved in QS review, appear here four months before their re-test date. Look further ahead with Next 12 months.'
      }
    />
  ) : (
    <RenewalsList certs={certs} onOpenJob={openJob} />
  );

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="Recurring work"
        description={liveLine}
        actions={
          <HeroActions>
            <HeroPrimary onClick={() => navigate('/employer?section=jobs')}>
              Make a job recurring
            </HeroPrimary>
            <PageHelpButton help={HELP} askContext={{ page: 'recurring', tab }} />
          </HeroActions>
        }
      />
      <HowItWorks help={HELP} askContext={{ page: 'recurring', tab }} />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Repeating', value: stats.active, onClick: () => setParam({ tab: null }) },
          {
            label: 'Booking in 14 days',
            value: stats.soon,
            onClick: () => setParam({ tab: null }),
          },
          {
            label: 'Renewals due',
            value: stats.certsOpen,
            tone: stats.certsOpen ? 'yellow' : undefined,
            sub: 'Not booked yet',
            onClick: () => setParam({ tab: 'renewals' }),
          },
          {
            label: 'Renewals overdue',
            value: stats.certsOverdue,
            tone: stats.certsOverdue ? 'red' : undefined,
            sub: stats.certsOverdue ? 'Past the re-test date' : 'None past due',
            onClick: () => setParam({ tab: 'renewals' }),
          },
        ]}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div data-help="recurring.tabs">
          <Segments
            items={[
              { value: 'visits' as const, label: 'Repeat visits' },
              { value: 'renewals' as const, label: 'Renewals' },
            ]}
            value={tab}
            onChange={(v) => setParam({ tab: v === 'visits' ? null : v })}
          />
        </div>
        {tab === 'renewals' && (
          <Segments
            quiet
            items={[
              { value: '4' as const, label: 'Next 4 months' },
              { value: '12' as const, label: 'Next 12 months' },
            ]}
            value={ahead === 365 ? '12' : '4'}
            onChange={(v) => setParam({ ahead: v === '12' ? '12' : null })}
          />
        )}
      </div>

      <div className={twoColClass}>
        <div className={colClass}>{tab === 'visits' ? visitsList : renewalsList}</div>
        {/* Desktop: the other list alongside, so both sides of the work are in view. */}
        <div className={cn(colClass, 'hidden lg:block')}>
          {tab === 'visits' ? (
            <section>
              <PanelTitle
                title="Renewals coming up"
                meta={certs.length ? `${certs.length}` : undefined}
                action={certs.length ? 'All renewals' : undefined}
                onAction={() => setParam({ tab: 'renewals' })}
              />
              {renewals.isLoading ? (
                <PlainEmpty text="Loading renewals." />
              ) : certs.length === 0 ? (
                <PlainEmpty
                  text={`No certificate is due for re-test in the next ${ahead === 365 ? '12' : 'four'} months.`}
                />
              ) : (
                <RowList>
                  {certs.slice(0, 5).map((c) => (
                    <Row
                      key={c.id}
                      onClick={() => setParam({ tab: 'renewals' })}
                      title={`${certLabel(c.report_type)} · ${c.client_name || 'Client'}`}
                      detail={
                        <span className={c.overdue ? 'text-red-400' : undefined}>
                          {c.employer_job_id ? 'Booked' : dueText(c.expiry_date)}
                        </span>
                      }
                    />
                  ))}
                </RowList>
              )}
            </section>
          ) : (
            <section>
              <PanelTitle
                title="Repeat visits"
                meta={list.length ? `${list.length}` : undefined}
                action={list.length ? 'All visits' : undefined}
                onAction={() => setParam({ tab: null })}
              />
              {recurring.isLoading ? (
                <PlainEmpty text="Loading repeat visits." />
              ) : list.length === 0 ? (
                <PlainEmpty text="No repeat visits yet. Open a job and tap Make this recurring." />
              ) : (
                <RowList>
                  {list.slice(0, 5).map((r) => (
                    <Row
                      key={r.id}
                      onClick={() => setParam({ visit: r.id })}
                      title={r.title}
                      detail={
                        r.status === 'ended'
                          ? 'Ended'
                          : `${freqText(r)} · next ${nextVisitLabel(r.next_due_date)}`
                      }
                    />
                  ))}
                </RowList>
              )}
            </section>
          )}
        </div>
      </div>

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

function RenewalsList({
  certs,
  onOpenJob,
}: {
  certs: FirmRenewal[];
  onOpenJob: (id: string) => void;
}) {
  const book = useBookRenewal();
  const [busy, setBusy] = useState<string | null>(null);

  const run = async (c: FirmRenewal, repeat: boolean) => {
    setBusy(`${c.id}:${repeat}`);
    try {
      const jobId = await book.mutateAsync({ id: c.id, makeRecurring: repeat });
      toast.success(repeat ? 'Booked, and it will repeat' : 'Booked as a job', {
        description:
          'It is in the diary two weeks before the re-test date. Add the crew from the job.',
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
    {
      title: 'Due in the next 30 days',
      items: certs.filter((c) => !c.overdue && daysFromToday(c.expiry_date) <= 30),
    },
    { title: 'Later', items: certs.filter((c) => daysFromToday(c.expiry_date) > 30) },
  ].filter((g) => g.items.length);

  return (
    <div className="space-y-6 sm:space-y-8">
      {groups.map((g) => (
        <section key={g.title}>
          <PanelTitle title={g.title} meta={`${g.items.length}`} />
          <div className={cn(panel, 'overflow-hidden divide-y divide-white/[0.07]')}>
            {g.items.map((c) => (
              <div key={c.id} className="px-4 py-3 sm:px-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-white truncate">
                      {certLabel(c.report_type)} · {c.client_name || 'Client'}
                    </p>
                    <p className="mt-0.5 text-[13px] text-white truncate">
                      {c.installation_address || 'No address on the certificate'}
                    </p>
                  </div>
                  <StatusPill tone={c.overdue ? 'red' : 'neutral'}>
                    {dueText(c.expiry_date)}
                  </StatusPill>
                </div>
                <p className="mt-0.5 text-[13px] text-white">
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
                      className={cn(
                        buttonSecondaryCn,
                        'inline-flex items-center justify-center px-4 col-span-2 sm:w-auto'
                      )}
                      onClick={() => onOpenJob(c.employer_job_id!)}
                    >
                      Booked{c.booked_for_date ? ` for ${nextVisitLabel(c.booked_for_date)}` : ''}.
                      Open job
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className={cn(
                          buttonSecondaryCn,
                          'inline-flex items-center justify-center px-4 sm:w-auto'
                        )}
                        disabled={!!busy}
                        onClick={() => run(c, false)}
                      >
                        {busy === `${c.id}:false` ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          'Book as a job'
                        )}
                      </button>
                      <button
                        type="button"
                        className={cn(
                          buttonSecondaryCn,
                          'inline-flex items-center justify-center px-4 sm:w-auto'
                        )}
                        disabled={!!busy}
                        onClick={() => run(c, true)}
                      >
                        {busy === `${c.id}:true` ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          'Book and repeat'
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
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
      toast.success(
        status === 'active' ? 'Repeating again' : status === 'paused' ? 'Paused' : 'Ended'
      );
    } catch (e) {
      toast.error((e as Error).message || 'Not saved');
    }
  };

  const facts: Array<[string, string]> = [
    ['How often', freqText(visit)],
    [
      'Next visit',
      visit.status === 'ended' ? 'None, it has ended' : nextVisitLabel(visit.next_due_date),
    ],
    ['Booked', `${visit.reminder_days_before} days ahead`],
    [
      'Crew',
      visit.same_crew
        ? visit.crew.length
          ? visit.crew.join(', ')
          : 'No one on the last visit'
        : 'Picked each time',
    ],
    ['Visits booked so far', String(visit.visits)],
    ...(visit.end_date
      ? ([['Stops after', nextVisitLabel(visit.end_date)]] as Array<[string, string]>)
      : []),
    ...(canSeeMoney && visit.amount != null
      ? ([
          [
            'Price per visit',
            `£${Number(visit.amount).toFixed(2)}${visit.auto_create_invoice ? ', invoice drafted each time' : ''}`,
          ],
        ] as Array<[string, string]>)
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
              <button
                type="button"
                className={cn(
                  buttonSecondaryCn,
                  'inline-flex items-center justify-center px-4 sm:w-auto'
                )}
                disabled={setStatus.isPending}
                onClick={() => change('paused')}
              >
                <Pause className="mr-1.5 h-4 w-4" /> Pause
              </button>
            )}
            {visit.status !== 'active' && (
              <button
                type="button"
                className={cn(
                  buttonSecondaryCn,
                  'inline-flex items-center justify-center px-4 sm:w-auto'
                )}
                disabled={setStatus.isPending}
                onClick={() => change('active')}
              >
                <Play className="mr-1.5 h-4 w-4" />{' '}
                {visit.status === 'ended' ? 'Start again' : 'Resume'}
              </button>
            )}
            {visit.status !== 'ended' && (
              <button
                type="button"
                className={cn(
                  buttonSecondaryCn,
                  'inline-flex items-center justify-center px-4 sm:w-auto'
                )}
                disabled={setStatus.isPending}
                onClick={() => change('ended')}
              >
                <Square className="mr-1.5 h-4 w-4" /> End
              </button>
            )}
            {visit.status !== 'ended' && (
              <button
                type="button"
                className={cn(
                  buttonPrimaryCn,
                  'inline-flex items-center justify-center px-4 sm:w-auto'
                )}
                onClick={() => setEditing(true)}
              >
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
              <button
                type="button"
                className={cn(
                  buttonSecondaryCn,
                  'inline-flex items-center justify-center px-4 w-full'
                )}
                onClick={() => onOpenJob(visit.last_visit!.id)}
              >
                Open the latest visit
                {visit.last_visit.date ? ` (${nextVisitLabel(visit.last_visit.date)})` : ''}
              </button>
            )}
            <button
              type="button"
              className={cn(
                buttonSecondaryCn,
                'inline-flex items-center justify-center px-4 w-full'
              )}
              onClick={() => onOpenJob(visit.source_job_id)}
            >
              Open the original job
            </button>
            <p className="pt-2 text-[13px] leading-relaxed text-white">
              Each visit is booked as its own job {visit.reminder_days_before} days before it is
              due, with the client, site and notes from the original job. You get a bell when it is
              booked.
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
