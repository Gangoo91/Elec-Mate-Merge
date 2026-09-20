/**
 * Retention — the page the 20 Sep 2026 retention plan is measured against.
 *
 * Built on the overview primitives so it reads like the Overview: panels on
 * the lit surface, one job each, hairlines between rows, colour only where it
 * carries meaning (aqua electricians, blue apprentices, green for a change
 * that went the right way, orange for one that didn't).
 *
 * Read top to bottom: is the leak closing (3 in 7 with its history), the six
 * figures, who needs a message today, the two lists of people, why people
 * left this month in their own words, then the cohort tables for the working.
 *
 * Every rate is by signup week, never blended: a blended average mixes this
 * month's signups with year-old customers and hides a bad cohort.
 */
import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { formatDistanceToNowStrict, parseISO, differenceInCalendarDays } from 'date-fns';
import { cn } from '@/lib/utils';
import PullToRefresh from '@/components/admin/PullToRefresh';
import MessageUserSheet from '@/components/admin/MessageUserSheet';
import { PageFrame, IconButton, EmptyState, LoadingBlocks } from '@/components/admin/editorial';
import {
  ACCENT,
  GOOD,
  SERIOUS,
  Delta,
  KpiTile,
  NeedsItem,
  Panel,
  PersonRow,
  QuietBar,
  SectionHead,
  Segmented,
  Sparkline,
} from '@/components/admin/overview/primitives';
import {
  useRetentionMetrics,
  pct,
  sumWeeks,
  TARGET_3IN7,
  TARGET_BACK_WK2,
  REASON_LABELS,
  RETENTION_COLOURS,
  type RetentionWeek,
  type RetentionRole,
  type RetentionPerson,
} from '@/hooks/useRetentionMetrics';
import {
  ActivationTrendChart,
  RetentionLegend,
  ReasonBars,
} from '@/components/admin/retention/RetentionCharts';

/* ── helpers ─────────────────────────────────────────────────── */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmtWeek = (iso: string) =>
  `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`;

function initials(full: string | null, email: string): string {
  const parts = (full ?? '').trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return email.slice(0, 2).toUpperCase();
}

const tierLabel = (tier: string | null, role: string) => {
  const t = (tier ?? role).toLowerCase().replace('_yearly', '').replace('_', ' ');
  return t.charAt(0).toUpperCase() + t.slice(1);
};

/** Days since the last login, for the quiet bar; null when they never logged in. */
const quietDays = (p: RetentionPerson) =>
  p.last_login ? differenceInCalendarDays(new Date(), parseISO(p.last_login)) : null;

/** Colour for a rate against its target: green clears it, yellow is close, orange is off. */
const rateColor = (p: number | null, target?: number) =>
  p === null || target === undefined
    ? '#ffffff'
    : p >= target
      ? GOOD
      : p >= target - 10
        ? ACCENT
        : SERIOUS;

function Rate({ n, d, target }: { n: number; d: number; target?: number }) {
  const p = pct(n, d);
  if (p === null) return <span className="text-white">—</span>;
  return (
    <span className="whitespace-nowrap tabular-nums text-white">
      <b className="font-semibold" style={{ color: rateColor(p, target) }}>
        {p}%
      </b>
      <span className="ml-1.5 text-[11px]">
        {n}/{d}
      </span>
    </span>
  );
}

function WeekTable({ rows, role }: { rows: RetentionWeek[]; role: RetentionRole }) {
  const mine = rows
    .filter((r) => r.role === role)
    .slice()
    .reverse();
  if (mine.length === 0) return <EmptyState title="No carded signups in the last 12 weeks" />;
  return (
    <div className="-mx-4 overflow-x-auto sm:-mx-5 lg:-mx-6">
      <table className="w-full min-w-[560px] text-[13px]">
        <thead>
          <tr className="text-left text-[12px] font-medium text-white">
            <th className="px-4 py-2 font-medium sm:px-5 lg:px-6">Signup week</th>
            <th className="px-2 py-2 text-right font-medium">Carded</th>
            <th className="px-2 py-2 text-right font-medium">3 in 7</th>
            <th className="px-2 py-2 text-right font-medium">≤1 day</th>
            <th className="px-2 py-2 text-right font-medium">Back in week 2</th>
            <th className="px-4 py-2 text-right font-medium sm:px-5 lg:px-6">Still on</th>
          </tr>
        </thead>
        <tbody>
          {mine.map((r) => (
            <tr key={r.wk} className="border-t border-white/[0.08] text-white">
              <td className="whitespace-nowrap px-4 py-3 font-medium sm:px-5 lg:px-6">
                {fmtWeek(r.wk)}
              </td>
              <td className="px-2 py-3 text-right tabular-nums">{r.carded}</td>
              <td className="px-2 py-3 text-right">
                <Rate n={r.hit_3in7} d={r.carded} target={TARGET_3IN7[role]} />
              </td>
              <td className="px-2 py-3 text-right">
                <Rate n={r.le1day} d={r.carded} />
              </td>
              <td className="px-2 py-3 text-right">
                <Rate n={r.back_wk2} d={r.old_enough_wk2} target={TARGET_BACK_WK2[role]} />
              </td>
              <td className="px-4 py-3 text-right sm:px-5 lg:px-6">
                <Rate n={r.still_subscribed} d={r.old_enough_14d} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** One role's headline: the figure, its movement, and the target it is chasing. */
function RoleFigure({
  label,
  color,
  now,
  before,
  target,
  yearTarget,
  carded,
}: {
  label: string;
  color: string;
  now: number | null;
  before: number | null;
  target: number;
  yearTarget: number;
  carded: number;
}) {
  const diff = now !== null && before !== null ? now - before : null;
  return (
    <div className="flex min-w-0 flex-col gap-1.5 text-white">
      <div className="flex items-center gap-2 text-[13px] font-medium leading-4">
        <span className="h-2 w-2 shrink-0 rounded-[2px]" style={{ background: color }} />
        {label}
      </div>
      <div className="text-[44px] font-semibold leading-[46px] tracking-[-0.03em] lg:text-[56px] lg:leading-[56px]">
        {now === null ? <span className="opacity-40">—</span> : `${now}%`}
      </div>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px]">
        {diff !== null ? (
          <Delta
            dir={diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat'}
            tone={diff > 0 ? 'good' : diff < 0 ? 'bad' : 'neutral'}
            size={13}
          >
            {Math.abs(diff)} pts
          </Delta>
        ) : null}
        <span>
          {diff !== null ? 'on the 4 weeks before · ' : ''}
          {carded} carded · target {target}% by Dec, {yearTarget}% in a year
        </span>
      </div>
    </div>
  );
}

type ListKey = 'renewing' | 'quiet' | 'words';

/* ── page ────────────────────────────────────────────────────── */

export default function AdminRetention() {
  const qc = useQueryClient();
  const { data, isLoading, isFetching, error } = useRetentionMetrics();
  const [msgUser, setMsgUser] = useState<RetentionPerson | null>(null);
  const [expanded, setExpanded] = useState<Record<ListKey, boolean>>({
    renewing: false,
    quiet: false,
    words: false,
  });
  const [mobileList, setMobileList] = useState<ListKey>('renewing');
  const [cohortRole, setCohortRole] = useState<RetentionRole>('electrician');

  const refresh = async () => {
    await qc.invalidateQueries({ queryKey: ['admin', 'retention-metrics'] });
  };

  const h = useMemo(() => {
    if (!data) return null;
    const weeks = [...new Set(data.weekly.map((w) => w.wk))].sort();
    const last4 = weeks.slice(-4);
    const prev4 = weeks.slice(-8, -4);
    const role = (r: RetentionRole) => {
      const carded = sumWeeks(data.weekly, r, last4, 'carded');
      const now = pct(sumWeeks(data.weekly, r, last4, 'hit_3in7'), carded);
      const before = pct(
        sumWeeks(data.weekly, r, prev4, 'hit_3in7'),
        sumWeeks(data.weekly, r, prev4, 'carded')
      );
      const le1 = pct(sumWeeks(data.weekly, r, last4, 'le1day'), carded);
      // Back-in-week-2 needs 30 days of age, so it reads off the older window.
      const back = pct(
        sumWeeks(data.weekly, r, prev4, 'back_wk2'),
        sumWeeks(data.weekly, r, prev4, 'old_enough_wk2')
      );
      const d = data.dormant.find((x) => x.role === r);
      const paying = d?.paying ?? 0;
      const quiet = d?.dormant_14d ?? 0;
      // Weekly 3-in-7 history for the sparkline, weeks with too few people skipped.
      const series = weeks
        .map((wk) => data.weekly.find((w) => w.wk === wk && w.role === r))
        .filter((w): w is RetentionWeek => !!w && w.carded >= 5)
        .map((w) => pct(w.hit_3in7, w.carded) ?? 0);
      return {
        carded,
        now,
        before,
        le1,
        back,
        paying,
        quiet,
        quietPct: pct(quiet, paying),
        series,
      };
    };
    const e = role('electrician');
    const a = role('apprentice');
    const paying = e.paying + a.paying;
    const quiet = e.quiet + a.quiet;
    return {
      e,
      a,
      paying,
      quiet,
      quietPct: pct(quiet, paying),
      saves: pct(data.cancel_saves_30d.stayed, data.cancel_saves_30d.decided),
      winback: pct(data.winback_60d.back, data.winback_60d.recipients),
      reasons: data.reasons_28d.map((r) => ({
        reason: REASON_LABELS[r.reason] ?? r.reason,
        n: r.n,
      })),
      urgent: data.at_risk.filter((p) => {
        const d = p.renews_at ? differenceInCalendarDays(parseISO(p.renews_at), new Date()) : 99;
        return d <= 3;
      }).length,
    };
  }, [data]);

  const now = new Date();
  const nowTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const nowLong = `${now.toLocaleDateString('en-GB', { weekday: 'long' })} ${now.getDate()} ${now.toLocaleDateString('en-GB', { month: 'long' })}`;

  const limit = (key: ListKey, n: number) => (expanded[key] ? undefined : n);
  const toggle = (key: ListKey) => setExpanded((x) => ({ ...x, [key]: !x[key] }));
  const showAll = (key: ListKey, total: number, n: number) =>
    total > n ? (expanded[key] ? 'Show fewer' : `Show all ${total}`) : undefined;
  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  /* ── lists (rendered once for desktop, once behind the mobile switch) ── */

  const renewingList = data ? (
    <div className="flex min-w-0 flex-col">
      <SectionHead
        title="Renewing soon, gone quiet"
        meta={`${data.at_risk.length} in the next 10 days`}
        action={showAll('renewing', data.at_risk.length, 8)}
        onAction={() => toggle('renewing')}
      />
      <p className="pb-3 pt-0.5 text-[12px] leading-4 text-white">
        Paying, renewal inside ten days, no session in fourteen. A message offering a pause beats a
        cancellation at the bank statement. Orange means three days or less.
      </p>
      {data.at_risk.length === 0 ? (
        <EmptyState
          title="Nobody quiet is renewing this week"
          description="That is the good outcome. Check again on Monday."
        />
      ) : (
        data.at_risk.slice(0, limit('renewing', 8)).map((p) => {
          const days = p.renews_at
            ? differenceInCalendarDays(parseISO(p.renews_at), new Date())
            : null;
          const when =
            days === null ? '—' : days <= 0 ? 'today' : days === 1 ? 'tomorrow' : `in ${days} days`;
          const seen = p.last_login
            ? `seen ${formatDistanceToNowStrict(parseISO(p.last_login), { addSuffix: true })}`
            : 'never logged in';
          return (
            <PersonRow
              key={p.id}
              initials={initials(p.full_name, p.email)}
              name={p.full_name || p.email}
              sub={`${tierLabel(p.tier, p.role)} · ${seen}`}
              cells={
                <span
                  className="whitespace-nowrap text-[13px] font-semibold tabular-nums"
                  style={{ color: days !== null && days <= 3 ? SERIOUS : '#ffffff' }}
                >
                  renews {when}
                </span>
              }
              onClick={() => setMsgUser(p)}
            />
          );
        })
      )}
    </div>
  ) : null;

  const quietList =
    data && h ? (
      <div className="flex min-w-0 flex-col">
        <SectionHead
          title="Paying but quiet"
          meta={`${h.quiet} of ${h.paying} electricians and apprentices · most recently seen first`}
          action={showAll('quiet', data.dormant_list.length, 8)}
          onAction={() => toggle('quiet')}
        />
        <p className="pb-3 pt-0.5 text-[12px] leading-4 text-white">
          Genuine payers with no session in 14 days. The bar is how long since they were last in.
          The daily note from Andrew reaches them at day ten; these are the ones to ring.
        </p>
        {data.dormant_list.length === 0 ? (
          <EmptyState title="Everyone paying has been in this fortnight" />
        ) : (
          data.dormant_list
            .slice(0, limit('quiet', 8))
            .map((p) => (
              <PersonRow
                key={p.id}
                initials={initials(p.full_name, p.email)}
                name={p.full_name || p.email}
                sub={`${tierLabel(p.tier, p.role)}${p.source && p.source !== 'stripe' ? ' · App Store or Play Store' : ''}`}
                cells={<QuietBar days={quietDays(p)} max={120} />}
                onClick={() => setMsgUser(p)}
              />
            ))
        )}
      </div>
    ) : null;

  return (
    <PullToRefresh onRefresh={refresh}>
      <PageFrame className="space-y-5 sm:space-y-6">
        {/* Title row */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.02em] text-white lg:text-[26px] lg:leading-[30px]">
              Retention
            </h1>
            <div className="mt-0.5 flex items-center gap-2 text-[12px] text-white">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOOD }} />
              <span>
                {nowLong}, {nowTime} · 3 in 7 = opened the app on three or more days in the first
                week
              </span>
            </div>
          </div>
          <IconButton
            onClick={refresh}
            disabled={isFetching}
            aria-label="Refresh"
            className="hidden h-9 w-9 lg:flex"
          >
            <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
          </IconButton>
        </div>

        {isLoading && <LoadingBlocks />}
        {error && (
          <Panel>
            <EmptyState
              title="Could not load retention metrics"
              description={error instanceof Error ? error.message : 'Try again in a moment.'}
            />
          </Panel>
        )}

        {data && h && (
          <>
            {/* The number: 3 in 7, both roles, with its history */}
            <Panel tone="accent">
              <div className="grid gap-5 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-x-10">
                <div className="flex min-w-0 flex-col gap-6">
                  <div className="text-[13px] font-medium leading-4 text-white">
                    Back on 3 days in their first week · last 4 weeks
                  </div>
                  <RoleFigure
                    label="Electricians"
                    color={RETENTION_COLOURS.electrician}
                    now={h.e.now}
                    before={h.e.before}
                    target={TARGET_3IN7.electrician}
                    yearTarget={60}
                    carded={h.e.carded}
                  />
                  <RoleFigure
                    label="Apprentices"
                    color={RETENTION_COLOURS.apprentice}
                    now={h.a.now}
                    before={h.a.before}
                    target={TARGET_3IN7.apprentice}
                    yearTarget={65}
                    carded={h.a.carded}
                  />
                </div>
                <div className="flex min-w-0 flex-col justify-between">
                  <div className="-mx-2 lg:mx-0">
                    <div className="hidden lg:block">
                      <ActivationTrendChart weekly={data.weekly} height={300} />
                    </div>
                    <div className="lg:hidden">
                      <ActivationTrendChart weekly={data.weekly} height={190} />
                    </div>
                  </div>
                  <div className="mt-3 border-t border-white/[0.1] pt-3">
                    <RetentionLegend />
                  </div>
                </div>
              </div>
            </Panel>

            {/* Six figures */}
            <Panel padded={false} className="px-4 sm:px-5 lg:px-6">
              <div className="grid grid-cols-2 gap-x-4 lg:grid-cols-6 lg:gap-x-5 [&>*:nth-child(-n+4)]:border-b [&>*:nth-child(-n+4)]:border-white/[0.08] [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-white/[0.08] lg:[&>*:last-child]:border-r-0 lg:[&>*]:border-b-0 lg:[&>*]:border-r lg:[&>*]:border-white/[0.08]">
                {/* Same figure as the Overview, then what this page covers.
                    The gap is employers plus store or Stripe subscriptions not
                    yet matched to an account (Sync now on the Overview). */}
                <KpiTile
                  label="Paying"
                  value={
                    data.paying_today ? data.paying_today.stripe + data.paying_today.rc : h.paying
                  }
                  delta={
                    data.paying_today ? (
                      <Delta dir="flat" tone="neutral">
                        {h.paying} electricians and apprentices
                      </Delta>
                    ) : undefined
                  }
                  definition={
                    data.paying_today
                      ? `Stripe ${data.paying_today.stripe} + stores ${data.paying_today.rc} · ${data.paying_other_roles} employers · ${Math.max(0, data.paying_today.stripe + data.paying_today.rc - h.paying - data.paying_other_roles)} not matched to an account`
                      : 'paid, not on trial, not free access'
                  }
                  onClick={() => jump('quiet')}
                />
                <KpiTile
                  label="Quiet 14 days"
                  value={h.quietPct === null ? '—' : `${h.quietPct}%`}
                  delta={
                    h.quietPct !== null ? (
                      <Delta
                        dir={h.quietPct <= 45 ? 'down' : 'up'}
                        tone={h.quietPct <= 45 ? 'good' : 'bad'}
                      >
                        target 45% by Dec
                      </Delta>
                    ) : undefined
                  }
                  definition={`${h.quiet} of ${h.paying} electricians and apprentices · electricians ${h.e.quietPct ?? '—'}%, apprentices ${h.a.quietPct ?? '—'}%`}
                  onClick={() => jump('quiet')}
                />
                <KpiTile
                  label="Renewing quiet"
                  value={data.at_risk.length}
                  delta={
                    h.urgent > 0 ? (
                      <Delta dir="flat" tone="bad">
                        {h.urgent} inside 3 days
                      </Delta>
                    ) : undefined
                  }
                  definition="renew in 10 days, not seen in 14"
                  onClick={() => jump('renewing')}
                />
                <KpiTile
                  label="Back in week 2"
                  value={h.e.back === null ? '—' : `${h.e.back}%`}
                  delta={
                    h.e.back !== null ? (
                      <Delta
                        dir={h.e.back >= TARGET_BACK_WK2.electrician ? 'up' : 'down'}
                        tone={h.e.back >= TARGET_BACK_WK2.electrician ? 'good' : 'bad'}
                      >
                        target {TARGET_BACK_WK2.electrician}%
                      </Delta>
                    ) : undefined
                  }
                  definition={`electricians · apprentices ${h.a.back ?? '—'}% · 2+ days in days 8–30`}
                  viz={<Sparkline series={h.e.series} accent={RETENTION_COLOURS.electrician} />}
                  onClick={() => jump('cohorts')}
                />
                <KpiTile
                  label="Cancel-flow saves"
                  value={h.saves === null ? '—' : `${h.saves}%`}
                  delta={
                    h.saves !== null ? (
                      <Delta
                        dir={h.saves >= 10 ? 'up' : 'down'}
                        tone={h.saves >= 10 ? 'good' : 'bad'}
                      >
                        target 10% by Dec
                      </Delta>
                    ) : undefined
                  }
                  definition={`${data.cancel_saves_30d.stayed} stayed of ${data.cancel_saves_30d.decided} who saw the offer, 30 days`}
                  onClick={() => jump('reasons')}
                />
                <KpiTile
                  label="Win-back"
                  value={h.winback === null ? '—' : `${h.winback}%`}
                  delta={
                    h.winback !== null ? (
                      <Delta
                        dir={h.winback >= 8 ? 'up' : 'down'}
                        tone={h.winback >= 8 ? 'good' : 'bad'}
                      >
                        target 8% by Dec
                      </Delta>
                    ) : undefined
                  }
                  definition={`${data.winback_60d.back} back of ${data.winback_60d.recipients} emailed, 60 days`}
                />
              </div>
            </Panel>

            {/* Needs you today */}
            <Panel>
              <SectionHead title="Needs you today" meta="people, not numbers" className="min-h-0" />
              <div className="mt-2 lg:mt-3 lg:grid lg:grid-cols-3 lg:gap-x-6">
                <NeedsItem
                  title="Renewing in 3 days, not seen"
                  detail="A message now, offering a pause, is the last honest chance"
                  count={h.urgent}
                  action="See who"
                  onClick={() => jump('renewing')}
                  urgent
                />
                <NeedsItem
                  title="Paying but quiet"
                  detail={`${h.quiet} people · ${h.quietPct ?? '—'}% of paying electricians and apprentices`}
                  count={h.quiet}
                  action="See who"
                  onClick={() => jump('quiet')}
                />
                <NeedsItem
                  title="Wrote a reason this fortnight"
                  detail="Their own words on why they left · reply to the ones that can be fixed"
                  count={data.words_14d.length}
                  action="Read them"
                  onClick={() => jump('reasons')}
                  last
                />
              </div>
            </Panel>

            {/* Lists — panels on desktop, one at a time on a phone */}
            <div className="hidden gap-6 lg:grid lg:grid-cols-2">
              <Panel id="renewing">{renewingList}</Panel>
              <Panel id="quiet">{quietList}</Panel>
            </div>
            <Panel className="lg:hidden">
              <Segmented<ListKey>
                options={[
                  { key: 'renewing', label: 'Renewing', count: data.at_risk.length },
                  { key: 'quiet', label: 'Quiet', count: h.quiet },
                ]}
                value={mobileList}
                onChange={setMobileList}
                size="lg"
              />
              <div className="mt-2">{mobileList === 'renewing' ? renewingList : quietList}</div>
            </Panel>

            {/* Why they leave */}
            <Panel id="reasons">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-10">
                <div className="flex min-w-0 flex-col">
                  <SectionHead
                    title="Why they leave"
                    meta="last 28 days, from the cancel flow"
                    className="min-h-0"
                  />
                  <div className="mt-4">
                    <ReasonBars reasons={h.reasons} />
                  </div>
                </div>
                <div className="flex min-w-0 flex-col">
                  <SectionHead
                    title="In their words"
                    meta="last 14 days"
                    className="min-h-0"
                    action={showAll('words', data.words_14d.length, 6)}
                    onAction={() => toggle('words')}
                  />
                  {data.words_14d.length === 0 ? (
                    <div className="mt-4">
                      <EmptyState title="Nothing written in the last fortnight" />
                    </div>
                  ) : (
                    <div className="mt-2">
                      {data.words_14d.slice(0, limit('words', 6)).map((w, i) => (
                        <div
                          key={i}
                          className="border-t border-white/[0.08] py-3 text-[13px] leading-[18px] text-white"
                        >
                          <div className="font-medium">“{w.reason_detail}”</div>
                          <div className="mt-0.5 text-[12px] leading-4">
                            {(REASON_LABELS[w.reason] ?? w.reason).toLowerCase()}
                            {w.tier ? ` · ${w.tier.replace('_', ' ')}` : ''}
                            {w.full_name ? ` · ${w.full_name}` : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Panel>

            {/* The working */}
            <Panel id="cohorts">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <SectionHead
                  title="By signup week"
                  meta="newest first · 12 weeks"
                  className="min-h-0"
                />
                <Segmented<RetentionRole>
                  options={[
                    { key: 'electrician', label: 'Electricians' },
                    { key: 'apprentice', label: 'Apprentices' },
                  ]}
                  value={cohortRole}
                  onChange={setCohortRole}
                />
              </div>
              <div className="mt-3">
                <WeekTable rows={data.weekly} role={cohortRole} />
              </div>
              <p className="mt-3 text-[12px] leading-4 text-white">
                Green clears the target, yellow is within ten points, orange is further off. Back in
                week 2 and still on only count people old enough for the measure to mean anything,
                so the newest weeks show a dash.
              </p>
            </Panel>
          </>
        )}

        <MessageUserSheet
          open={!!msgUser}
          onOpenChange={(o) => !o && setMsgUser(null)}
          user={
            msgUser
              ? {
                  id: msgUser.id,
                  full_name: msgUser.full_name ?? undefined,
                  email: msgUser.email,
                  role: msgUser.role,
                }
              : null
          }
        />
      </PageFrame>
    </PullToRefresh>
  );
}
