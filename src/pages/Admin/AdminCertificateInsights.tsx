/**
 * Certificate insights — what issued certificates find and what installations
 * measure, from the platform's own data (ELE-1584 / ELE-1587).
 *
 * For our own use, not users (Andrew, 4 Oct 2026). Anonymous aggregates
 * rebuilt every Sunday from every issued EICR and EIC: staff accounts
 * excluded, nothing published with fewer than five certificates behind it,
 * no report id, user or address anywhere in the tables.
 *
 * Built on the Overview primitives like Retention: panels with one job each,
 * colour only where it carries meaning — orange C1, yellow C2, blue C3,
 * violet FI.
 */
import { useMemo, useState } from 'react';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { PageFrame, IconButton, EmptyState, LoadingBlocks } from '@/components/admin/editorial';
import {
  ACCENT,
  BLUE,
  GOOD,
  SERIOUS,
  VIOLET,
  Fig,
  KpiTile,
  Panel,
  SectionHead,
  Segmented,
} from '@/components/admin/overview/primitives';
import {
  MEASUREMENTS,
  readingBucketsFor,
  readingSummaryFor,
  useCertificateInsights,
  useRefreshCertificateInsights,
  type CertificateInsights,
  type DefectCategory,
  type DefectCode,
  type InsightEarthing,
  type InsightMeasurement,
} from '@/hooks/useCertificateInsights';
import ReadingHistogram from '@/components/admin/insights/ReadingHistogram';

/* ── vocabulary ──────────────────────────────────────────────── */

const CODES: Array<{ key: DefectCode; meaning: string; colour: string }> = [
  { key: 'C1', meaning: 'Danger present', colour: SERIOUS },
  { key: 'C2', meaning: 'Potentially dangerous', colour: ACCENT },
  { key: 'C3', meaning: 'Improvement recommended', colour: BLUE },
  { key: 'FI', meaning: 'Further investigation required', colour: VIOLET },
];

const EARTHINGS: Array<{ key: InsightEarthing; label: string }> = [
  { key: 'ALL', label: 'All supplies' },
  { key: 'TN-C-S', label: 'TN-C-S' },
  { key: 'TN-S', label: 'TN-S' },
  { key: 'TT', label: 'TT' },
];

const MEASUREMENT_KEYS = Object.keys(MEASUREMENTS) as InsightMeasurement[];

/**
 * Regulation numbers that are not regulations. 830.3.201 came from the AI
 * observation helper's old retrieval text (relabelled 29 Sep 2026); 65 issued
 * reports still carry it, so it keeps appearing here until they age out.
 */
const PHANTOM_REGULATIONS: Record<string, string> = {
  '830.3.201': 'not a BS 7671 regulation — older AI observation text, fixed 29 Sep',
};

const pct = (n: number, d: number) => (d > 0 ? Math.round((100 * n) / d) : 0);
const num = (v: number | null | undefined, dp: number) =>
  v === null || v === undefined ? '—' : Number(v).toFixed(dp);

/* ── pieces ──────────────────────────────────────────────────── */

/** Categories for one code, ranked by certificates, as bars against the top one. */
function CategoryBars({
  rows,
  eicrs,
  colour,
}: {
  rows: DefectCategory[];
  eicrs: number;
  colour: string;
}) {
  if (rows.length === 0) {
    return <EmptyState title="Fewer than five certificates carry this code" />;
  }
  const max = Math.max(1, ...rows.map((r) => r.reports));
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={r.category} className="text-[13px] text-white">
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="truncate">{r.category}</span>
            <span className="shrink-0 whitespace-nowrap tabular-nums">
              <b className="font-semibold">{pct(r.reports, eicrs)}%</b> of EICRs
              <span className="ml-1.5 text-[11px]">
                · {r.reports} certs · {r.observations} obs
              </span>
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.max(2, (100 * r.reports) / max)}%`, background: colour }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** The regulations cited against one code, most-cited first. */
function RegulationTable({
  rows,
}: {
  rows: Array<{ regulation: string; observations: number; reports: number }>;
}) {
  if (rows.length === 0) {
    return <EmptyState title="No regulation cited on five or more certificates" />;
  }
  return (
    <div className="-mx-4 overflow-x-auto sm:-mx-5 lg:-mx-6">
      <table className="w-full min-w-[420px] text-[13px]">
        <thead>
          <tr className="text-left text-[12px] font-medium text-white">
            <th className="px-4 py-2 font-medium sm:px-5 lg:px-6">Regulation</th>
            <th className="px-2 py-2 text-right font-medium">Certificates</th>
            <th className="px-4 py-2 text-right font-medium sm:px-5 lg:px-6">Observations</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const phantom = PHANTOM_REGULATIONS[r.regulation];
            return (
              <tr key={r.regulation} className="border-t border-white/[0.08] text-white">
                <td className="px-4 py-2.5 sm:px-5 lg:px-6">
                  <span className={cn('font-medium tabular-nums', phantom && 'line-through')}>
                    {r.regulation}
                  </span>
                  {phantom && <span className="ml-2 text-[11px]">{phantom}</span>}
                </td>
                <td className="px-2 py-2.5 text-right tabular-nums">{r.reports}</td>
                <td className="px-4 py-2.5 text-right tabular-nums sm:px-5 lg:px-6">
                  {r.observations}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Sentences ready for a press line or the December report, each with the n
 * behind it. Built from the same rows the panels show, so a quote can never
 * disagree with the page.
 */
function buildQuotes(data: CertificateInsights): string[] {
  const eicrs = data.reports.eicr;
  const byCode = Object.fromEntries(data.defects_by_code.map((d) => [d.code, d]));
  const lines: string[] = [];
  if (eicrs >= 25 && byCode.C2) {
    lines.push(
      `${pct(byCode.C2.reports, eicrs)}% of the ${eicrs.toLocaleString()} EICRs issued on Elec-Mate record at least one C2 (potentially dangerous) observation` +
        (byCode.C1 ? `, and ${pct(byCode.C1.reports, eicrs)}% record a C1 (danger present).` : '.')
    );
  }
  const topC2 = data.defect_categories
    .filter((d) => d.code === 'C2' && d.category !== 'Other')
    .slice()
    .sort((a, b) => b.reports - a.reports);
  if (topC2[0]) {
    const second = topC2[1] ? `, followed by ${topC2[1].category.toLowerCase()} on ${pct(topC2[1].reports, eicrs)}%` : '';
    lines.push(
      `The most common potentially dangerous finding is ${topC2[0].category.toLowerCase()}, on ${pct(topC2[0].reports, eicrs)}% of EICRs${second}.`
    );
  }
  const supplyName: Record<string, string> = { 'TN-C-S': 'TN-C-S (PME)', 'TN-S': 'TN-S', TT: 'TT' };
  (['TN-C-S', 'TN-S', 'TT'] as const).forEach((e) => {
    const r = readingSummaryFor(data, 'ze', e);
    if (r && r.p50 !== null && r.p25 !== null && r.p75 !== null) {
      lines.push(
        `The median measured Ze on a ${supplyName[e]} supply is ${num(r.p50, 2)} Ω; the middle half of installations read ${num(r.p25, 2)}–${num(r.p75, 2)} Ω (n = ${r.n.toLocaleString()} certificates).`
      );
    }
  });
  const zs = readingSummaryFor(data, 'zs', 'TN-C-S');
  if (zs && zs.p50 !== null) {
    lines.push(
      `Across ${zs.n.toLocaleString()} circuits on TN-C-S supplies the median measured Zs is ${num(zs.p50, 2)} Ω, with the middle half between ${num(zs.p25, 2)} and ${num(zs.p75, 2)} Ω.`
    );
  }
  const rcd = readingSummaryFor(data, 'rcd_1x', 'ALL');
  if (rcd && rcd.p50 !== null) {
    lines.push(
      `RCDs trip in a median ${num(rcd.p50, 0)} ms at 1× IΔn; nine in ten trip within ${num(rcd.p90, 0)} ms (n = ${rcd.n.toLocaleString()} circuits).`
    );
  }
  const irBuckets = readingBucketsFor(data, 'ir', 'ALL');
  const irTotal = irBuckets.reduce((a, b) => a + b.n, 0);
  const irUnder2 = irBuckets.filter((b) => b.hi !== null && Number(b.hi) <= 2).reduce((a, b) => a + b.n, 0);
  if (irTotal >= 100) {
    const share = (100 * irUnder2) / irTotal;
    lines.push(
      `${share < 1 ? share.toFixed(1) : Math.round(share)}% of ${irTotal.toLocaleString()} measured circuits have an insulation resistance below 2 MΩ, the point at which BS 7671 guidance asks for further investigation.`
    );
  }
  return lines;
}

function QuotableLines({ data }: { data: CertificateInsights }) {
  const lines = useMemo(() => buildQuotes(data), [data]);
  const [copied, setCopied] = useState<number | null>(null);
  const copy = async (i: number) => {
    try {
      await navigator.clipboard.writeText(lines[i]);
      setCopied(i);
      window.setTimeout(() => setCopied((c) => (c === i ? null : c)), 1500);
    } catch {
      /* clipboard blocked — the text is on screen to select */
    }
  };
  if (lines.length === 0) return null;
  return (
    <Panel>
      <SectionHead
        title="Lines you can quote"
        meta="Built from the rows above, so a quote never disagrees with the page · every figure carries its n"
      />
      <ul className="mt-3 divide-y divide-white/[0.08]">
        {lines.map((line, i) => (
          <li key={line} className="flex items-start justify-between gap-3 py-3 text-[13px] leading-5 text-white">
            <span className="min-w-0">{line}</span>
            <button
              type="button"
              onClick={() => copy(i)}
              aria-label="Copy this line"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white touch-manipulation hover:bg-white/[0.08]"
            >
              {copied === i ? <Check className="h-4 w-4" style={{ color: GOOD }} /> : <Copy className="h-4 w-4" />}
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ── page ────────────────────────────────────────────────────── */

export default function AdminCertificateInsights() {
  const { data, isLoading, isFetching, error, refetch } = useCertificateInsights();
  const refresh = useRefreshCertificateInsights();
  const [code, setCode] = useState<DefectCode>('C2');
  const [measurement, setMeasurement] = useState<InsightMeasurement>('ze');
  const [earthing, setEarthing] = useState<InsightEarthing>('TN-C-S');

  const eicrs = data?.reports.eicr ?? 0;
  const byCode = useMemo(
    () => Object.fromEntries((data?.defects_by_code ?? []).map((d) => [d.code, d])),
    [data]
  );
  const categories = useMemo(
    () =>
      (data?.defect_categories ?? [])
        .filter((d) => d.code === code && d.category !== 'Other')
        .slice()
        .sort((a, b) => b.reports - a.reports),
    [data, code]
  );
  const regulations = useMemo(
    () =>
      (data?.regulations ?? [])
        .filter((r) => r.code === code)
        .slice()
        .sort((a, b) => b.reports - a.reports)
        .slice(0, 12),
    [data, code]
  );
  const topC2 = useMemo(
    () =>
      (data?.defect_categories ?? [])
        .filter((d) => d.code === 'C2' && d.category !== 'Other')
        .slice()
        .sort((a, b) => b.reports - a.reports)[0] ?? null,
    [data]
  );

  const meta = MEASUREMENTS[measurement];
  const summary = readingSummaryFor(data, measurement, earthing);
  const buckets = readingBucketsFor(data, measurement, earthing);
  const bySupply = useMemo(
    () =>
      EARTHINGS.map((e) => ({ ...e, row: readingSummaryFor(data, measurement, e.key) })).filter(
        (e) => e.row
      ),
    [data, measurement]
  );

  const codeMeta = CODES.find((c) => c.key === code)!;
  const refreshedAt = data?.computed_at ? format(parseISO(data.computed_at), 'EEE d MMM, HH:mm') : null;
  const busy = isFetching || refresh.isPending;

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame className="space-y-5 sm:space-y-6">
        {/* Title row */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.02em] text-white lg:text-[26px] lg:leading-[30px]">
              Certificate insights
            </h1>
            <div className="mt-0.5 flex items-center gap-2 text-[12px] text-white">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOOD }} />
              <span>
                {refreshedAt ? `Rebuilt ${refreshedAt}` : 'Not built yet'} · every Sunday 02:30 ·
                issued EICRs and EICs, staff accounts excluded, nothing with fewer than five
                certificates behind it
              </span>
            </div>
          </div>
          <IconButton
            onClick={() => refresh.mutate()}
            disabled={busy}
            aria-label="Rebuild now"
            className="h-9 w-9"
          >
            <RefreshCw className={cn('h-4 w-4', busy && 'animate-spin')} />
          </IconButton>
        </div>

        {isLoading && <LoadingBlocks />}
        {error && (
          <Panel>
            <EmptyState
              title="Could not load certificate insights"
              description={error instanceof Error ? error.message : 'Try again in a moment.'}
            />
          </Panel>
        )}
        {refresh.error && (
          <Panel>
            <EmptyState
              title="Rebuild failed"
              description={refresh.error instanceof Error ? refresh.error.message : 'Try again.'}
            />
          </Panel>
        )}

        {data && (
          <>
            {/* The headline */}
            <Panel tone="accent">
              <div className="grid gap-5 lg:grid-cols-2 lg:gap-x-10">
                <div className="flex min-w-0 flex-col gap-1.5 text-white">
                  <div className="text-[13px] font-medium leading-4">
                    Issued EICRs carrying at least one C2
                  </div>
                  <div className="text-[44px] font-semibold leading-[46px] tracking-[-0.03em] lg:text-[56px] lg:leading-[56px]">
                    {pct(byCode.C2?.reports ?? 0, eicrs)}%
                  </div>
                  <div className="text-[13px]">
                    {(byCode.C2?.reports ?? 0).toLocaleString()} of {eicrs.toLocaleString()} certificates
                    {topC2 && (
                      <>
                        {' '}
                        · most often <b className="font-semibold">{topC2.category.toLowerCase()}</b>,
                        on {pct(topC2.reports, eicrs)}% of EICRs
                      </>
                    )}
                  </div>
                </div>
                <div className="flex min-w-0 flex-col gap-1.5 text-white">
                  <div className="text-[13px] font-medium leading-4">Carrying a C1 — danger present</div>
                  <div
                    className="text-[44px] font-semibold leading-[46px] tracking-[-0.03em] lg:text-[56px] lg:leading-[56px]"
                    style={{ color: SERIOUS }}
                  >
                    {pct(byCode.C1?.reports ?? 0, eicrs)}%
                  </div>
                  <div className="text-[13px]">
                    {(byCode.C1?.reports ?? 0).toLocaleString()} certificates · C3 on{' '}
                    {pct(byCode.C3?.reports ?? 0, eicrs)}% · FI on {pct(byCode.FI?.reports ?? 0, eicrs)}%
                  </div>
                </div>
              </div>
            </Panel>

            {/* The dataset */}
            <Panel padded={false} className="px-4 sm:px-5 lg:px-6">
              <div className="grid grid-cols-2 gap-x-4 lg:grid-cols-4 lg:gap-x-5 [&>*:nth-child(-n+2)]:border-b [&>*:nth-child(-n+2)]:border-white/[0.08] [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-white/[0.08] lg:[&>*:last-child]:border-r-0 lg:[&>*]:border-b-0 lg:[&>*]:border-r lg:[&>*]:border-white/[0.08]">
                <KpiTile
                  label="Issued EICRs"
                  value={eicrs.toLocaleString()}
                  definition="Status completed, not deleted, not a staff account"
                />
                <KpiTile
                  label="Issued EICs"
                  value={data.reports.eic.toLocaleString()}
                  definition="Readings only — an EIC carries no observations"
                />
                <KpiTile
                  label="Coded observations"
                  value={data.observations.toLocaleString()}
                  definition="C1, C2, C3 and FI on EICRs; uncoded text ignored"
                />
                <KpiTile
                  label="Readings"
                  value={data.readings.toLocaleString()}
                  definition="Ze per certificate plus Zs, R1+R2, IR, RCD and PFC per circuit row, within the sanity bounds"
                />
              </div>
            </Panel>

            {/* What inspections find */}
            <Panel>
              <SectionHead
                title="What inspections find"
                meta={`${codeMeta.key} — ${codeMeta.meaning} · on ${pct(byCode[code]?.reports ?? 0, eicrs)}% of EICRs`}
              />
              <Segmented<DefectCode>
                className="mt-3"
                options={CODES.map((c) => ({
                  key: c.key,
                  label: c.key,
                  count: byCode[c.key]?.reports ?? 0,
                }))}
                value={code}
                onChange={setCode}
              />
              <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-x-10">
                <div>
                  <div className="mb-3 text-[13px] font-medium text-white">
                    By category · share of issued EICRs with at least one {code} there
                  </div>
                  <CategoryBars rows={categories} eicrs={eicrs} colour={codeMeta.colour} />
                </div>
                <div>
                  <div className="mb-3 text-[13px] font-medium text-white">
                    Regulations cited with a {code}
                  </div>
                  <RegulationTable rows={regulations} />
                </div>
              </div>
            </Panel>

            {/* What installations measure */}
            <Panel>
              <SectionHead
                title="What installations measure"
                meta={`${meta.label} · ${meta.per}`}
              />
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <Segmented<InsightMeasurement>
                  options={MEASUREMENT_KEYS.map((k) => ({ key: k, label: MEASUREMENTS[k].short }))}
                  value={measurement}
                  onChange={setMeasurement}
                />
                <Segmented<InsightEarthing> options={EARTHINGS} value={earthing} onChange={setEarthing} />
              </div>

              {summary ? (
                <>
                  <div className="mt-5 grid grid-cols-3 gap-x-4 gap-y-4 sm:grid-cols-6">
                    <Fig value={summary.n.toLocaleString()} label="readings" />
                    <Fig value={`${num(summary.p10, meta.dp)} ${meta.unit}`} label="10th percentile" sub="1 in 10 read below" />
                    <Fig value={`${num(summary.p25, meta.dp)} ${meta.unit}`} label="lower quartile" />
                    <Fig value={`${num(summary.p50, meta.dp)} ${meta.unit}`} label="median" />
                    <Fig value={`${num(summary.p75, meta.dp)} ${meta.unit}`} label="upper quartile" />
                    <Fig value={`${num(summary.p90, meta.dp)} ${meta.unit}`} label="90th percentile" sub="1 in 10 read above" />
                  </div>
                  <div className="mt-5 -mx-2 lg:mx-0">
                    <div className="hidden lg:block">
                      <ReadingHistogram buckets={buckets} unit={meta.unit} height={280} />
                    </div>
                    <div className="lg:hidden">
                      <ReadingHistogram buckets={buckets} unit={meta.unit} height={220} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-5">
                  <EmptyState
                    title={`Fewer than five certificates with a ${meta.short} reading on ${earthing === 'ALL' ? 'any supply' : earthing}`}
                  />
                </div>
              )}

              {bySupply.length > 1 && (
                <div className="mt-5 border-t border-white/[0.1] pt-4">
                  <div className="mb-2 text-[13px] font-medium text-white">
                    {meta.short} by supply type
                  </div>
                  <div className="-mx-4 overflow-x-auto sm:-mx-5 lg:-mx-6">
                    <table className="w-full min-w-[480px] text-[13px]">
                      <thead>
                        <tr className="text-left text-[12px] font-medium text-white">
                          <th className="px-4 py-2 font-medium sm:px-5 lg:px-6">Supply</th>
                          <th className="px-2 py-2 text-right font-medium">Readings</th>
                          <th className="px-2 py-2 text-right font-medium">Lower quartile</th>
                          <th className="px-2 py-2 text-right font-medium">Median</th>
                          <th className="px-4 py-2 text-right font-medium sm:px-5 lg:px-6">
                            Upper quartile
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {bySupply.map((e) => (
                          <tr
                            key={e.key}
                            className={cn(
                              'border-t border-white/[0.08] text-white',
                              e.key === earthing && 'bg-white/[0.04]'
                            )}
                          >
                            <td className="px-4 py-2.5 font-medium sm:px-5 lg:px-6">{e.label}</td>
                            <td className="px-2 py-2.5 text-right tabular-nums">
                              {e.row!.n.toLocaleString()}
                            </td>
                            <td className="px-2 py-2.5 text-right tabular-nums">
                              {num(e.row!.p25, meta.dp)} {meta.unit}
                            </td>
                            <td className="px-2 py-2.5 text-right tabular-nums">
                              {num(e.row!.p50, meta.dp)} {meta.unit}
                            </td>
                            <td className="px-4 py-2.5 text-right tabular-nums sm:px-5 lg:px-6">
                              {num(e.row!.p75, meta.dp)} {meta.unit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {summary && (
                <p className="mt-4 text-[12px] leading-4 text-white">
                  Readings outside {num(summary.lower_bound, meta.dp)}–
                  {num(summary.upper_bound, meta.dp)} {meta.unit} are treated as typos or wrong
                  units and left out. A reading written as a ceiling (&gt;200, LIM) counts at the
                  ceiling; N/A, LIM-only and device rows are skipped. Histogram bins backed by
                  fewer than five certificates are left out, so a gap is suppression, not an
                  empty range. Insulation resistance is
                  dominated by instrument ceilings at 200 and 999 MΩ, so its upper half is the
                  meter, not the installation.
                </p>
              )}
            </Panel>

            <QuotableLines data={data} />
          </>
        )}
      </PageFrame>
    </PullToRefresh>
  );
}
