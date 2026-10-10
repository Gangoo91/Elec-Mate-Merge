import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PageHero, LoadingBlocks } from '@/components/employer/editorial';
import {
  PageColumn,
  TwoColumn,
  FigureStrip,
  FilterRow,
  Segments,
  SearchField,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  RefreshIcon,
  Rows,
  Row,
  KeyValue,
  StatusPill,
  PlainEmpty,
  panel,
  PanelTitle,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import {
  useChaseSettings,
  useFirmDebtors,
  BUCKET_LABEL,
  TONE_LABEL,
  gbp,
  shortDate,
  stepDayLabel,
  type DebtBucket,
  type Debtor,
} from '@/hooks/useGetPaid';
import { useActingFirmId } from '@/hooks/useJobProfit';
import { ChaseScheduleSheet } from '@/components/employer/getpaid/ChaseScheduleSheet';
import { DebtorSheet } from '@/components/employer/getpaid/DebtorSheet';

/* ELE-2065 "Who owes me": every unpaid sent invoice, oldest debt first, with
   aged debt, the next automatic chase, one-tap chase and promise-to-pay notes.
   Same rows and balances as the finance model (finance_invoice_rows), so the
   total here equals "Owed to you" everywhere else. Owner and admins only. */

type Filter = 'all' | 'overdue' | 'promised' | 'stopped';

const compact = (n: number) =>
  n >= 10_000 ? `£${Math.round(n / 1000)}k` : n >= 1000 ? `£${(n / 1000).toFixed(1)}k` : gbp(n);

function todayIso() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function WhoOwesMe({
  onBack,
  focusInvoiceId,
}: {
  onBack: () => void;
  /** Opens that invoice's sheet (from a bell or a link). */
  focusInvoiceId?: string | null;
}) {
  const { data, isLoading, error, refetch, isFetching } = useFirmDebtors();
  const { data: settings } = useChaseSettings(!error);
  const { data: firmId } = useActingFirmId();
  const { data: companyName = '' } = useQuery({
    queryKey: ['firm-company-name', firmId],
    enabled: !!firmId,
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data: cp } = await supabase
        .from('company_profiles')
        .select('company_name')
        .eq('user_id', firmId!)
        .maybeSingle();
      return ((cp as { company_name?: string | null } | null)?.company_name ?? '').trim();
    },
  });
  const [filter, setFilter] = useState<Filter>('all');
  const [bucket, setBucket] = useState<DebtBucket | null>(null);
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  useEffect(() => {
    if (focusInvoiceId) setOpenId(focusInvoiceId);
  }, [focusInvoiceId]);

  const rows = useMemo(() => data?.rows ?? [], [data]);
  const today = todayIso();
  const promised = (r: Debtor) => !!r.promise_date && r.promise_date >= today;
  const stopped = (r: Debtor) => r.paused || r.customer_paused || r.disputed;

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter === 'overdue' && r.days_overdue <= 0) return false;
      if (filter === 'promised' && !promised(r)) return false;
      if (filter === 'stopped' && !stopped(r)) return false;
      if (bucket && r.bucket !== bucket) return false;
      if (!needle) return true;
      return (
        r.client.toLowerCase().includes(needle) ||
        (r.invoice_number ?? '').toLowerCase().includes(needle) ||
        (r.company_name ?? '').toLowerCase().includes(needle)
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, filter, bucket, search, today]);

  const selected = rows.find((r) => r.invoice_id === openId) ?? null;
  const denied = !!error && String((error as Error).message).includes('Only the owner');
  const t = data?.totals;
  const textStep =
    settings?.invoice_steps?.find((s) => s.channel === 'sms' && s.body)?.body ?? null;

  const chasesThisWeek = rows.filter((r) => {
    if (!r.next_chase) return false;
    const days = (new Date(`${r.next_chase.date}T12:00:00`).getTime() - Date.now()) / 86_400_000;
    return days <= 7;
  }).length;

  const statusLine = !t
    ? 'Every unpaid invoice, oldest first.'
    : t.count === 0
      ? 'Nobody owes you anything right now.'
      : [
          `${compact(t.owed)} owed on ${t.count} invoice${t.count === 1 ? '' : 's'}`,
          t.over_60 > 0 ? `${compact(t.over_60)} over 60 days late` : null,
        ]
          .filter(Boolean)
          .join(', ') +
        '.' +
        (data?.schedule_on
          ? chasesThisWeek > 0
            ? ` ${chasesThisWeek} chase${chasesThisWeek === 1 ? '' : 's'} due this week.`
            : ' The chasing schedule is on.'
          : ' Automatic chasing is off.');

  const detailFor = (r: Debtor) => {
    const parts = [r.invoice_number ? `Invoice ${r.invoice_number}` : 'Invoice'];
    if (r.disputed) parts.push('Disputed');
    else if (r.paused || r.customer_paused) parts.push('Chasing paused');
    else if (promised(r)) parts.push(`Promised by ${shortDate(r.promise_date)}`);
    else if (r.next_chase)
      parts.push(
        `Next chase ${shortDate(r.next_chase.date)} by ${r.next_chase.channel === 'sms' ? 'text' : 'email'}`
      );
    else if (r.last_chased_at) parts.push(`Chased ${shortDate(r.last_chased_at)}`);
    if (r.retention_held > 0) parts.push(`${gbp(r.retention_held)} retention`);
    return parts.join(' · ');
  };

  const pillFor = (r: Debtor) =>
    r.days_overdue > 0 ? (
      <StatusPill tone="red">{r.days_overdue}d late</StatusPill>
    ) : r.due_on ? (
      <StatusPill>Due {shortDate(r.due_on)}</StatusPill>
    ) : (
      <StatusPill>No due date</StatusPill>
    );

  const hero = (
    <PageHero
      title="Who owes me"
      description={
        denied ? 'Only the owner or an admin can see who owes the firm money.' : statusLine
      }
      actions={
        <HeroActions>
          <HeroPrimary onClick={() => setScheduleOpen(true)} disabled={denied}>
            <span className="sm:hidden">Schedule</span>
            <span className="hidden sm:inline">Chasing schedule</span>
          </HeroPrimary>
          <HeroSecondary onClick={onBack}>Quotes & invoices</HeroSecondary>
          <RefreshIcon onClick={() => void refetch()} spinning={isFetching} />
        </HeroActions>
      }
    />
  );

  if (denied) {
    return (
      <PageColumn>
        {hero}
        <PlainEmpty text="Ask the owner if you need to see what customers owe." />
      </PageColumn>
    );
  }

  if (isLoading || !data || !t) {
    return (
      <PageColumn>
        {hero}
        <LoadingBlocks />
      </PageColumn>
    );
  }

  const buckets: { key: DebtBucket; value: number }[] = [
    { key: 'not_due', value: t.not_due },
    { key: 'd1_30', value: t.d1_30 },
    { key: 'd31_60', value: t.d31_60 },
    { key: 'd61_90', value: t.d61_90 },
    { key: 'd90_plus', value: t.d90_plus },
  ];

  const list = (
    <section>
      <PanelTitle
        title={bucket ? BUCKET_LABEL[bucket] : 'Unpaid invoices'}
        meta={`${filtered.length}`}
        action={bucket ? 'Show all' : undefined}
        onAction={() => setBucket(null)}
      />
      <div className={cn(panel, 'overflow-hidden')}>
        {filtered.length === 0 ? (
          <PlainEmpty
            bare
            text={
              rows.length === 0
                ? 'Nobody owes you money. Sent invoices that are not paid show here.'
                : 'Nothing matches that.'
            }
          />
        ) : (
          <Rows>
            {filtered.map((r) => (
              <Row
                key={r.invoice_id}
                title={
                  r.company_name &&
                  !r.company_name.toLowerCase().includes(r.client.toLowerCase()) &&
                  !r.client.toLowerCase().includes(r.company_name.toLowerCase())
                    ? `${r.client}, ${r.company_name}`
                    : r.client
                }
                detail={detailFor(r)}
                amount={gbp(r.due_now)}
                status={pillFor(r)}
                chevron={false}
                onClick={() => setOpenId(r.invoice_id)}
              />
            ))}
          </Rows>
        )}
      </div>
    </section>
  );

  const side = (
    <>
      <section>
        <PanelTitle title="Aged debt" meta={compact(t.owed)} />
        <div className={cn(panel, 'overflow-hidden')}>
          <Rows>
            {buckets.map((b) => (
              <KeyValue
                key={b.key}
                label={BUCKET_LABEL[b.key]}
                value={gbp(b.value)}
                tone={
                  b.value > 0 && (b.key === 'd61_90' || b.key === 'd90_plus' || b.key === 'd31_60')
                    ? 'red'
                    : undefined
                }
                onClick={b.value > 0 ? () => setBucket(bucket === b.key ? null : b.key) : undefined}
              />
            ))}
          </Rows>
        </div>
      </section>

      <section>
        <PanelTitle
          title="Chasing schedule"
          meta={settings?.invoice_enabled ? 'On' : 'Off'}
          action="Edit"
          onAction={() => setScheduleOpen(true)}
        />
        <div className={cn(panel, 'overflow-hidden')}>
          {settings ? (
            <Rows>
              {(settings.invoice_steps ?? []).map((s) => (
                <KeyValue
                  key={s.offset}
                  label={stepDayLabel(s.offset)}
                  value={`${s.channel === 'sms' ? 'Text' : 'Email'}, ${TONE_LABEL[s.tone].toLowerCase()}`}
                />
              ))}
              {!settings.invoice_enabled && (
                <p className="px-4 py-3 text-[13px] text-white sm:px-5">
                  Off. Turn it on and invoices are chased on these days until they are paid.
                </p>
              )}
            </Rows>
          ) : (
            <p className="px-4 py-3 text-[13px] text-white sm:px-5">Loading.</p>
          )}
        </div>
      </section>
    </>
  );

  return (
    <PageColumn>
      {hero}
      <FigureStrip
        figures={[
          {
            label: 'Owed to you',
            value: compact(t.owed),
            sub: `${t.count} invoice${t.count === 1 ? '' : 's'}`,
            onOpen: () => {
              setFilter('all');
              setBucket(null);
            },
          },
          {
            label: 'Overdue',
            value: compact(t.overdue),
            sub: t.overdue_count > 0 ? `${t.overdue_count} past the due date` : 'None late',
            tone: t.overdue > 0 ? 'red' : undefined,
            onOpen: () => setFilter('overdue'),
          },
          {
            label: 'Over 60 days',
            value: compact(t.over_60),
            sub: t.over_60 > 0 ? 'Chase these first' : 'Nothing that old',
            tone: t.over_60 > 0 ? 'red' : undefined,
            onOpen: () => setBucket(t.d90_plus > 0 && t.d61_90 === 0 ? 'd90_plus' : 'd61_90'),
          },
          {
            label: 'Retention held',
            value: compact(t.retention_held),
            sub: t.retention_held > 0 ? 'Not chased until released' : 'None held',
          },
        ]}
      />
      <FilterRow>
        <Segments
          items={[
            { value: 'all', label: 'All', count: rows.length },
            {
              value: 'overdue',
              label: 'Late',
              count: rows.filter((r) => r.days_overdue > 0).length,
            },
            { value: 'promised', label: 'Promised', count: rows.filter(promised).length },
            { value: 'stopped', label: 'Paused or disputed', count: rows.filter(stopped).length },
          ]}
          value={filter}
          onChange={setFilter}
        />
        <SearchField
          className="w-full lg:w-72"
          value={search}
          onChange={setSearch}
          placeholder="Search customer or invoice"
        />
      </FilterRow>
      <TwoColumn main={list} side={side} />

      <DebtorSheet
        debtor={selected}
        open={!!selected}
        onOpenChange={(o) => !o && setOpenId(null)}
        companyName={companyName}
        textWording={textStep}
      />
      <ChaseScheduleSheet open={scheduleOpen} onOpenChange={setScheduleOpen} />
    </PageColumn>
  );
}
