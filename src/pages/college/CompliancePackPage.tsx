import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download } from 'lucide-react';
import { downloadLearnerDocument } from '@/lib/documents/learnerDocuments';
import { cn } from '@/lib/utils';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { AreaHero } from '@/components/college/student360/Student360AreaHeroes';
import { Donut } from '@/components/college/quality/QualityKit';
import {
  useAuditPack,
  type AuditPackData,
  type ScrRow,
  type PolicyWithAckLog,
  type PolicyAckLogEntry,
  type IqaSampleAuditRow,
  type IqaVerdict,
  type InterventionMethod,
} from '@/hooks/useAuditPack';
import { SCR_LEGEND, SCR_ORDER, SCR_PRINT, SCR_STATUS, scrCounts, scrSegments, type ScrStatus } from '@/components/college/quality/complianceStatus';

/* ==========================================================================
   CompliancePackPage — /college/compliance/pack
   A4-styled audit pack: cover sheet · SCR · policies · per-policy ack logs
   · staff matrix. The download is a PDFMonkey document (learner-document-pdf,
   kind audit_pack, ELE-2017); ?auto=1 starts it once data is ready.
   ========================================================================== */

// One definition of each state, shared with Compliance docs and the hub.
const STATUS_LABEL = Object.fromEntries(SCR_ORDER.map((k) => [k, SCR_STATUS[k].label])) as Record<ScrStatus, string>;
const STATUS_DOT = Object.fromEntries(SCR_ORDER.map((k) => [k, SCR_PRINT[k].dot])) as Record<ScrStatus, string>;

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return `${d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })} at ${d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;
}

export default function CompliancePackPage() {
  const [params] = useSearchParams();
  const { data, loading, error } = useAuditPack();
  const auto = params.get('auto') === '1';

  // The pack is a PDFMonkey document (ELE-2017): the function rebuilds it from
  // the live record for the caller's college. ?auto=1 starts the download.
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const downloadPdf = async () => {
    if (downloading) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      await downloadLearnerDocument({ kind: 'audit_pack' });
    } catch (e) {
      setDownloadError((e as Error).message);
    } finally {
      setDownloading(false);
    }
  };
  const autoStarted = useRef(false);
  useEffect(() => {
    if (!auto || !data || loading || autoStarted.current) return;
    autoStarted.current = true;
    void downloadPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, data, loading]);

  const s = data?.summary;
  const ackPolicies = data ? data.policies.filter((p) => p.requires_acknowledgement && p.status !== 'archived') : [];
  const counts = s
    ? scrCounts({ valid: s.valid, expiring: s.expiring, expired: s.expired, missing: s.missing, pending_verification: s.pending_verification, total: s.total_scr_rows })
    : null;
  const inDate = counts?.valid ?? 0;
  const pct = counts?.inDatePct ?? 0;
  const contents = [
    { id: 'pack-cover', label: 'Cover and summary' },
    { id: 'pack-scr', label: 'Single central record' },
    { id: 'pack-policies', label: 'Institution policies' },
    ...(ackPolicies.length ? [{ id: 'pack-acks', label: `Sign-off logs (${ackPolicies.length})` }] : []),
    { id: 'pack-matrix', label: 'Staff compliance matrix' },
    { id: 'pack-iqa', label: 'IQA verification chain' },
    { id: 'pack-standardisation', label: 'Standardisation record' },
    ...(data?.interventions ? [{ id: 'pack-interventions', label: 'Intervention history' }] : []),
  ];
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <HubPage ground="landing">
      {/* `contents` so the masthead stays sticky (a plain wrapper boxed it in). */}
      <div className="no-print contents">
        <HubMasthead section="College" title="Audit pack" backTo="/college/compliance#pack" />
      </div>
      <HubBody hidePushPrompt>
        <div className="no-print space-y-8 sm:space-y-10">
          <CollegePageHeader
            eyebrow="Compliance"
            title="Audit pack"
            description={
              data
                ? `${data.college?.name ?? 'Your college'}. Built ${formatDateTime(data.generated_at)} from live records. Print it or save it as a PDF.`
                : 'Your single central record, policies, sign-offs, staff matrix and IQA chain in one document.'
            }
            help={PACK_HELP}
            actions={
              <button type="button" onClick={downloadPdf} disabled={!data || downloading} className={COLLEGE_BTN_PRIMARY}>
                <Download className="h-4 w-4" aria-hidden />
                {downloading ? 'Making the PDF…' : 'Download PDF'}
              </button>
            }
          />

          {downloadError && (
            <div className={cn(COLLEGE_CARD, 'border-red-400/40 text-[13.5px] text-white')}>Could not make the PDF: {downloadError}</div>
          )}
          {error ? (
            <div className={cn(COLLEGE_CARD, 'border-red-400/40 text-[13.5px] text-white')}>Could not build the pack: {error}</div>
          ) : loading || !data || !s ? (
            <div className={cn(COLLEGE_CARD, 'text-[13.5px] text-white')}>Building the audit pack. This can take a moment for larger colleges.</div>
          ) : (
            <AreaHero
              figures={[
                { label: 'Staff checks in date', value: `${pct}%`, sub: `${inDate} of ${s.total_scr_rows} checks`, good: pct >= 95, warn: pct < 80 },
                { label: 'Expired', value: String(s.expired), warn: s.expired > 0 },
                { label: 'Missing', value: String(s.missing), warn: s.missing > 0, sub: 'never put on file' },
                { label: 'Live policies', value: String(s.policies_live), sub: `${s.policies_draft} draft` },
              ]}
              chartTitle="Single central record by status"
              chart={
                <Donut
                  centre={String(s.total_scr_rows)}
                  centreSub="checks"
                  segments={counts ? scrSegments(counts) : []}
                />
              }
              side={
                <div>
                  <p className="mb-2 text-[13px] font-semibold text-white">In this pack</p>
                  <ol className="space-y-1">
                    {contents.map((c, i) => (
                      <li key={c.id}>
                        <button
                          type="button"
                          onClick={() => jump(c.id)}
                          className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-2 text-left text-[13px] text-white touch-manipulation hover:bg-white/[0.04]"
                        >
                          <span className="w-5 shrink-0 text-[12px] font-semibold tabular-nums">{i + 1}</span>
                          {c.label}
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
              }
            />
          )}

          {data && <CollegeSectionTitle title="The document" sub="A preview of the record. The PDF carries the same figures, laid out for print. On a phone, swipe the wider tables sideways." />}
        </div>

        {data && !error && (
          <div className="audit-pack -mx-4 space-y-4 text-black sm:mx-0 sm:space-y-6">
            <div id="pack-cover" className="audit-sheet">
              <Cover data={data} />
            </div>
            <div id="pack-scr" className="audit-sheet">
              <ScrPage data={data} />
            </div>
            <div id="pack-policies" className="audit-sheet">
              <PoliciesPage data={data} />
            </div>
            {ackPolicies.map((p, i) => (
              <div key={p.id} id={i === 0 ? 'pack-acks' : undefined} className="audit-sheet">
                <PolicyAckPage policy={p} />
              </div>
            ))}
            <div id="pack-matrix" className="audit-sheet">
              <StaffMatrixPage data={data} />
            </div>
            <div id="pack-iqa" className="audit-sheet">
              <IqaChainPage data={data} />
            </div>
            <div id="pack-standardisation" className="audit-sheet">
              <StandardisationPage data={data} />
            </div>
            {data.interventions && (
              <div id="pack-interventions" className="audit-sheet">
                <InterventionsPage data={data} />
              </div>
            )}
          </div>
        )}

        {/* Print stylesheet */}
        <style>{printCss}</style>
      </HubBody>
    </HubPage>
  );
}

const PACK_HELP: PageHelpContent = {
  id: 'college-audit-pack',
  title: 'The audit pack',
  what: 'One document for an inspector, auditor or awarding body: your single central record, live policies, who has signed each policy, the staff compliance matrix, the IQA verification chain with the sampling rate, the standardisation record and the intervention history.',
  steps: [
    { title: 'Check the summary', body: 'Expired and missing checks show at the top. Fix them in the vault first if you can.' },
    { title: 'Read the document', body: 'Everything below the summary is the record the PDF is built from.' },
    { title: 'Download the PDF', body: 'Use the button at the top. The PDF is made fresh from the live record, ready to hand to an inspector or auditor.' },
  ],
  notes: [
    { title: 'Always live', body: 'The pack is built from your records each time you open it, so it is only as current as the vault.' },
  ],
  legend: SCR_LEGEND,
};

/* ──────────────────────────────────────────────────────── */

function Cover({ data }: { data: AuditPackData }) {
  const s = data.summary;
  const inDate = s.valid;
  const totalAck = data.policies
    .filter((p) => p.requires_acknowledgement && p.status === 'live')
    .reduce(
      (acc, p) => ({
        signed: acc.signed + p.log.filter((l) => l.status === 'signed').length,
        target: acc.target + p.log.length,
      }),
      { signed: 0, target: 0 }
    );

  return (
    <section className="audit-page p-12">
      <div className="max-w-[720px] mx-auto pt-12">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4">
          Compliance audit pack
        </div>
        <h1 className="text-[40px] font-bold text-black leading-tight tracking-tight">
          {data.college?.name ?? 'College'}
        </h1>
        {data.college?.code && (
          <p className="mt-1 text-[14px] font-mono text-gray-600">{data.college.code}</p>
        )}
        {data.college?.address && (
          <p className="mt-1 text-[13px] text-gray-700 max-w-md leading-snug">
            {data.college.address}
          </p>
        )}

        <div className="mt-12 grid grid-cols-2 gap-8 text-[13px]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              Generated
            </div>
            <div className="mt-1 text-black tabular-nums">{formatDateTime(data.generated_at)}</div>
          </div>
          {data.officer && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                Generated by
              </div>
              <div className="mt-1 text-black">
                {data.officer.name}
                {data.officer.role && (
                  <span className="text-gray-600 capitalize">
                    {' · '}
                    {data.officer.role.replace(/_/g, ' ')}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <h2 className="mt-12 mb-4 text-[14px] font-semibold uppercase tracking-[0.18em] text-gray-700">
          At a glance
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Stat label="Staff (active)" value={s.total_staff} sub={`${s.total_scr_rows} SCR rows`} />
          <Stat
            label="Compliance in date"
            value={`${s.total_scr_rows > 0 ? Math.round((inDate / s.total_scr_rows) * 100) : 0}%`}
            sub={`${inDate} of ${s.total_scr_rows}`}
            tone="emerald"
          />
          <Stat
            label="Policies live"
            value={s.policies_live}
            sub={`${s.policies_draft} draft · ${s.policies_archived} archived`}
          />
          <Stat
            label="Acknowledged"
            value={
              totalAck.target > 0
                ? `${Math.round((totalAck.signed / totalAck.target) * 100)}%`
                : '—'
            }
            sub={`${totalAck.signed} of ${totalAck.target} signatures`}
            tone="emerald"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px]">
          <Tally label="Expired" value={s.expired} tone="red" />
          <Tally label="Expiring (60d)" value={s.expiring} tone="amber" />
          <Tally label="Missing" value={s.missing} tone="grey" />
          <Tally label="Awaiting verification" value={s.pending_verification} tone="sky" />
        </div>

        <div className="mt-12 pt-6 border-t border-gray-300">
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gray-700">
            Contents
          </h3>
          <ol className="mt-2 space-y-1 text-[13px] text-gray-800 list-decimal list-inside">
            <li>Single Central Record</li>
            <li>Institution policies</li>
            <li>Per-policy acknowledgement logs</li>
            <li>Staff compliance matrix</li>
            <li>IQA verification chain</li>
          </ol>
        </div>

        <p className="mt-12 text-[10.5px] text-gray-500 leading-relaxed border-t border-gray-200 pt-3">
          This pack is a snapshot generated from the Elec-Mate compliance vault. Every entry is
          backed by a corresponding row in the system's audit log (compliance_audit_events)
          capturing who recorded or signed off each item and when. Evidence files are held in
          secure, RLS-scoped private storage and can be produced on request.
        </p>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string | number;
  sub?: string;
  tone?: 'emerald';
}) {
  return (
    <div className="border border-gray-300 rounded-md px-3 py-3">
      <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-500">
        {label}
      </div>
      <div
        className={cn(
          'mt-1 text-[24px] font-bold tabular-nums leading-none',
          tone === 'emerald' ? 'text-emerald-700' : 'text-black'
        )}
      >
        {value}
      </div>
      {sub && <div className="mt-1 text-[10.5px] text-gray-600">{sub}</div>}
    </div>
  );
}

function Tally({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'red' | 'amber' | 'sky' | 'grey' | 'emerald';
}) {
  // Same meanings as the on-screen states: sky = awaiting verification,
  // grey = missing / pending, emerald = agreed / in date.
  const colorClass =
    tone === 'red'
      ? 'text-red-700 border-red-300 bg-red-50'
      : tone === 'amber'
        ? 'text-amber-700 border-amber-300 bg-amber-50'
        : tone === 'sky'
          ? 'text-sky-700 border-sky-300 bg-sky-50'
          : tone === 'emerald'
            ? 'text-emerald-700 border-emerald-300 bg-emerald-50'
            : 'text-gray-700 border-gray-300 bg-gray-50';
  return (
    <div className={cn('border rounded-md px-3 py-2', colorClass)}>
      <div className="text-[9px] font-semibold uppercase tracking-[0.18em]">{label}</div>
      <div className="mt-0.5 text-[18px] font-bold tabular-nums leading-none">{value}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function ScrPage({ data }: { data: AuditPackData }) {
  // Group SCR rows by staff for readability
  const byStaff = new Map<string, ScrRow[]>();
  for (const r of data.scr) {
    const list = byStaff.get(r.college_staff_id) ?? [];
    list.push(r);
    byStaff.set(r.college_staff_id, list);
  }
  const staffOrdered = Array.from(byStaff.entries()).sort((a, b) =>
    a[1][0].staff_name.localeCompare(b[1][0].staff_name)
  );

  return (
    <section className="audit-page p-12 print-page-break">
      <SectionHeader index={1} title="Single Central Record" />
      {staffOrdered.length === 0 ? (
        <p className="text-[12.5px] text-gray-700">No statutory compliance rows tracked yet.</p>
      ) : (
        <table className="w-full border-collapse text-[11.5px]">
          <thead>
            <tr className="border-y-2 border-black text-left">
              <th className="py-2 pr-3 font-semibold w-[28%]">Staff</th>
              <th className="py-2 pr-3 font-semibold w-[26%]">Requirement</th>
              <th className="py-2 pr-3 font-semibold w-[14%]">Status</th>
              <th className="py-2 pr-3 font-semibold w-[14%]">Expiry</th>
              <th className="py-2 pr-3 font-semibold">Reference / Verified</th>
            </tr>
          </thead>
          {/* One <tbody> per staff member, directly under <table> (a tbody
              inside a tbody is invalid HTML and React warned on it). */}
          {staffOrdered.map(([staffId, rows]) => (
              <tbody key={staffId} className="border-b border-gray-300 align-top">
                {rows.map((r, i) => (
                  <tr key={r.requirement_code} className="border-b border-gray-100">
                    {i === 0 ? (
                      <td
                        rowSpan={rows.length}
                        className="py-2 pr-3 font-medium text-black border-r border-gray-200 align-top"
                      >
                        <div>{r.staff_name}</div>
                        <div className="mt-0.5 text-[10.5px] text-gray-600 capitalize font-normal">
                          {r.staff_role.replace(/_/g, ' ')}
                          {r.department && ` · ${r.department}`}
                        </div>
                      </td>
                    ) : null}
                    <td className="py-1.5 pr-3">
                      {r.requirement_label}
                      <div className="text-[10.5px] text-gray-500 capitalize">{r.category}</div>
                    </td>
                    <td className="py-1.5 pr-3">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          aria-hidden
                          className={cn(
                            'inline-block h-2 w-2 rounded-full',
                            STATUS_DOT[r.computed_status]
                          )}
                        />
                        <span>{STATUS_LABEL[r.computed_status]}</span>
                      </span>
                    </td>
                    <td className="py-1.5 pr-3 tabular-nums">{formatDate(r.expires_at)}</td>
                    <td className="py-1.5 pr-3 text-gray-700">
                      {r.reference_no && <span className="font-mono">{r.reference_no}</span>}
                      {r.reference_no && r.verified_at && ' · '}
                      {r.verified_at && (
                        <span className="text-emerald-700">✓ {formatDate(r.verified_at)}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
          ))}
        </table>
      )}
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function PoliciesPage({ data }: { data: AuditPackData }) {
  return (
    <section className="audit-page p-12 print-page-break">
      <SectionHeader index={2} title="Institution policies" />
      {data.policies.length === 0 ? (
        <p className="text-[12.5px] text-gray-700">No policies recorded yet.</p>
      ) : (
        <table className="w-full border-collapse text-[11.5px]">
          <thead>
            <tr className="border-y-2 border-black text-left">
              <th className="py-2 pr-3 font-semibold">Policy</th>
              <th className="py-2 pr-3 font-semibold w-[10%]">Status</th>
              <th className="py-2 pr-3 font-semibold w-[8%]">Version</th>
              <th className="py-2 pr-3 font-semibold w-[14%]">Effective from</th>
              <th className="py-2 pr-3 font-semibold w-[14%]">Next review</th>
              <th className="py-2 pr-3 font-semibold w-[14%]">Acknowledged</th>
            </tr>
          </thead>
          <tbody>
            {data.policies.map((p) => (
              <tr key={p.id} className="border-b border-gray-200">
                <td className="py-2 pr-3 align-top">
                  <div className="font-medium text-black">{p.title}</div>
                  <div className="mt-0.5 text-[10.5px] text-gray-600 capitalize">
                    {p.category}
                    {p.code && ` · ${p.code}`}
                    {p.owner_role && ` · Owner: ${p.owner_role}`}
                  </div>
                </td>
                <td className="py-2 pr-3 align-top capitalize">{p.status}</td>
                <td className="py-2 pr-3 align-top tabular-nums">v{p.version}</td>
                <td className="py-2 pr-3 align-top tabular-nums">{formatDate(p.effective_from)}</td>
                <td className="py-2 pr-3 align-top tabular-nums">{formatDate(p.review_due_at)}</td>
                <td className="py-2 pr-3 align-top tabular-nums">
                  {p.requires_acknowledgement ? `${p.ack_count} / ${p.ack_target}` : 'Not required'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function PolicyAckPage({ policy }: { policy: PolicyWithAckLog }) {
  const signed = policy.log.filter((l) => l.status === 'signed').length;
  const outdated = policy.log.filter((l) => l.status === 'outdated').length;
  const outstanding = policy.log.filter((l) => l.status === 'outstanding').length;

  return (
    <section className="audit-page p-12 print-page-break">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
        Acknowledgement log · v{policy.version}
      </div>
      <h2 className="mt-1 text-[24px] font-bold text-black tracking-tight leading-tight">
        {policy.title}
      </h2>
      <div className="mt-1 text-[12px] text-gray-600 capitalize">
        {policy.category}
        {policy.code && ` · ${policy.code}`}
        {policy.effective_from && ` · effective ${formatDate(policy.effective_from)}`}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-[12px]">
        <Tally label="Signed v" value={signed} tone="emerald" />
        <Tally label="Outdated" value={outdated} tone="amber" />
        <Tally label="Outstanding" value={outstanding} tone="red" />
      </div>

      <table className="mt-5 w-full border-collapse text-[11.5px]">
        <thead>
          <tr className="border-y-2 border-black text-left">
            <th className="py-2 pr-3 font-semibold w-[40%]">Staff</th>
            <th className="py-2 pr-3 font-semibold w-[20%]">Status</th>
            <th className="py-2 pr-3 font-semibold w-[15%]">Signed v</th>
            <th className="py-2 pr-3 font-semibold">Signed at</th>
          </tr>
        </thead>
        <tbody>
          {policy.log
            .slice()
            .sort((a, b) => {
              const order = { outstanding: 0, outdated: 1, signed: 2 };
              const ra = order[a.status] - order[b.status];
              if (ra !== 0) return ra;
              return a.staff_name.localeCompare(b.staff_name);
            })
            .map((entry) => (
              <AckLogRow key={entry.staff_id} entry={entry} />
            ))}
        </tbody>
      </table>
    </section>
  );
}

function AckLogRow({ entry }: { entry: PolicyAckLogEntry }) {
  const labelMap = {
    signed: 'Signed',
    outdated: 'Outdated',
    outstanding: 'Outstanding',
  } as const;
  const colorMap = {
    signed: 'text-emerald-700',
    outdated: 'text-amber-700',
    outstanding: 'text-red-700',
  } as const;
  return (
    <tr className="border-b border-gray-200">
      <td className="py-1.5 pr-3 align-top">
        <div className="font-medium text-black">{entry.staff_name}</div>
        <div className="mt-0.5 text-[10.5px] text-gray-600 capitalize">
          {entry.staff_role.replace(/_/g, ' ')}
          {entry.department && ` · ${entry.department}`}
        </div>
      </td>
      <td className={cn('py-1.5 pr-3 align-top font-medium', colorMap[entry.status])}>
        {labelMap[entry.status]}
      </td>
      <td className="py-1.5 pr-3 align-top tabular-nums">
        {entry.signed_version ? `v${entry.signed_version}` : '—'}
      </td>
      <td className="py-1.5 pr-3 align-top tabular-nums">{formatDate(entry.signed_at)}</td>
    </tr>
  );
}

/* ──────────────────────────────────────────────────────── */

function StaffMatrixPage({ data }: { data: AuditPackData }) {
  // Build a wide table: rows=staff, cols=requirement codes
  const codeOrder = Array.from(new Set(data.scr.map((r) => r.requirement_code)));
  const codeLabels = new Map<string, string>();
  for (const r of data.scr) {
    if (!codeLabels.has(r.requirement_code))
      codeLabels.set(r.requirement_code, r.requirement_label);
  }
  const byStaffCode = new Map<string, Map<string, ScrRow>>();
  for (const r of data.scr) {
    let inner = byStaffCode.get(r.college_staff_id);
    if (!inner) {
      inner = new Map();
      byStaffCode.set(r.college_staff_id, inner);
    }
    inner.set(r.requirement_code, r);
  }

  const staffOrdered = data.staff.slice().sort((a, b) => a.name.localeCompare(b.name));

  if (codeOrder.length === 0) {
    return (
      <section className="audit-page p-12 print-page-break">
        <SectionHeader index={4} title="Staff compliance matrix" />
        <p className="text-[12.5px] text-gray-700">No SCR-required items mapped yet.</p>
      </section>
    );
  }

  return (
    <section className="audit-page audit-page-landscape p-12 print-page-break">
      <SectionHeader index={4} title="Staff compliance matrix" />
      <p className="text-[11.5px] text-gray-600 mb-4 max-w-prose">
        Cell colours: green = in date; orange = expiring within 60 days; red = expired; dark grey =
        missing (never put on file); light blue = awaiting verification; pale grey = not required.
      </p>
      <table className="w-full border-collapse text-[10px]">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="py-2 pr-2 text-left font-semibold sticky left-0 bg-white">Staff</th>
            {codeOrder.map((code) => (
              <th
                key={code}
                className="py-2 px-1 text-left font-semibold align-bottom"
                title={codeLabels.get(code)}
              >
                <div className="rotate-[-30deg] origin-bottom-left whitespace-nowrap pb-2">
                  {codeLabels.get(code)?.slice(0, 22)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staffOrdered.map((s) => {
            const inner = byStaffCode.get(s.id);
            return (
              <tr key={s.id} className="border-b border-gray-200">
                <td className="py-1 pr-2 align-top sticky left-0 bg-white">
                  <div className="font-medium text-black text-[11px]">{s.name}</div>
                  <div className="text-[9.5px] text-gray-600 capitalize">
                    {s.role.replace(/_/g, ' ')}
                  </div>
                </td>
                {codeOrder.map((code) => {
                  const cell = inner?.get(code);
                  if (!cell) {
                    return (
                      <td key={code} className="px-1 py-1 align-top">
                        <span className="inline-block h-3 w-3 rounded-sm bg-gray-100 border border-gray-200" />
                      </td>
                    );
                  }
                  return (
                    <td key={code} className="px-1 py-1 align-top">
                      <span
                        className={cn(
                          'inline-block h-3 w-3 rounded-sm border',
                          SCR_PRINT[cell.computed_status as ScrStatus]?.cell
                        )}
                        title={`${codeLabels.get(code)} · ${STATUS_LABEL[cell.computed_status]}${cell.expires_at ? ` · expires ${formatDate(cell.expires_at)}` : ''}`}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

const IQA_VERDICT_LABEL: Record<IqaVerdict, string> = {
  pending: 'Awaiting verdict',
  agree: 'Agree',
  disagree: 'Disagree',
  refer: 'Returned',
};

const IQA_VERDICT_DOT: Record<IqaVerdict, string> = {
  pending: 'bg-amber-500',
  agree: 'bg-emerald-500',
  disagree: 'bg-red-500',
  refer: 'bg-amber-600',
};

/** IqaChainPage — Section 5 of the audit pack.

    Renders the IQA-checks-assessor chain: every observation + OTJ entry
    sampled within active sampling plans, with the IQA's verdict + comments.
    Exists so Ofsted/EQA can see the assessor → IQA verification loop in
    one print. Empty state explains the gap so it can't read as
    "we haven't done it" when there are simply no samples yet. */
function IqaChainPage({ data }: { data: AuditPackData }) {
  const samples = data.iqa_samples;
  const s = data.summary;

  if (samples.length === 0) {
    return (
      <section className="audit-page p-12 print-page-break">
        <SectionHeader index={5} title="IQA verification chain" />
        <p className="text-[12.5px] text-gray-700 max-w-prose">
          No IQA samples in scope yet. Once an IQA opens a sampling plan and records verdicts on
          observation or OTJ assessor decisions, every sample appears here with the verdict, IQA
          name, sample date and comments. The chain is the Ofsted "prove it" evidence that the
          assessor's decisions are being independently verified.
        </p>
        <SamplingRateBlock data={data} />
      </section>
    );
  }

  return (
    <section className="audit-page p-12 print-page-break">
      <SectionHeader index={5} title="IQA verification chain" />
      <p className="text-[11.5px] text-gray-600 mb-4 max-w-prose">
        Independent IQA verification of assessor decisions across observations and OTJ submissions.{' '}
        {s.iqa_samples_total} {s.iqa_samples_total === 1 ? 'sample' : 'samples'} in scope —{' '}
        {s.iqa_samples_observation} observation
        {s.iqa_samples_observation === 1 ? '' : 's'}, {s.iqa_samples_otj} OTJ.
      </p>

      <div className="mb-6 grid grid-cols-4 gap-3">
        <Tally label="Agree" value={s.iqa_samples_agree} tone="emerald" />
        <Tally label="Disagree" value={s.iqa_samples_disagree} tone="red" />
        <Tally label="Returned" value={s.iqa_samples_refer} tone="amber" />
        <Tally label="Pending" value={s.iqa_samples_pending} tone="grey" />
      </div>

      <SamplingRateBlock data={data} />

      <table className="w-full border-collapse text-[10.5px]">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="py-2 pr-2 text-left font-semibold">Target</th>
            <th className="py-2 pr-2 text-left font-semibold">Activity</th>
            <th className="py-2 pr-2 text-left font-semibold">Activity date</th>
            <th className="py-2 pr-2 text-left font-semibold">Sampled</th>
            <th className="py-2 pr-2 text-left font-semibold">IQA</th>
            <th className="py-2 pr-2 text-left font-semibold">Verdict</th>
            <th className="py-2 text-left font-semibold">Comments</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((row) => (
            <IqaChainRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

function IqaChainRow({ row }: { row: IqaSampleAuditRow }) {
  return (
    <tr className="border-b border-gray-200 align-top">
      <td className="py-2 pr-2">
        <span
          className={cn(
            'inline-flex items-center h-5 px-1.5 rounded-md border text-[9.5px] font-semibold uppercase tracking-[0.16em]',
            row.target_kind === 'otj'
              ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
              : row.target_kind === 'decision' || row.target_kind === 'evidence'
                ? 'border-amber-300 bg-amber-50 text-amber-800'
                : 'border-cyan-300 bg-cyan-50 text-cyan-800'
          )}
        >
          {row.target_kind === 'otj'
            ? 'OTJ'
            : row.target_kind === 'decision'
              ? 'Decision'
              : row.target_kind === 'evidence'
                ? 'Evidence'
                : 'Observation'}
        </span>
      </td>
      <td className="py-2 pr-2 text-black">
        {row.target_title ?? <span className="text-gray-400">—</span>}
      </td>
      <td className="py-2 pr-2 text-gray-700 tabular-nums whitespace-nowrap">
        {formatDate(row.target_date)}
      </td>
      <td className="py-2 pr-2 text-gray-700 tabular-nums whitespace-nowrap">
        {formatDate(row.sampled_at)}
      </td>
      <td className="py-2 pr-2 text-gray-700">
        {row.iqa_name_snapshot ?? <span className="text-gray-400">—</span>}
      </td>
      <td className="py-2 pr-2">
        <span className="inline-flex items-center gap-1.5">
          <span className={cn('h-2 w-2 rounded-full', IQA_VERDICT_DOT[row.verdict])} />
          <span className="text-black font-medium">{IQA_VERDICT_LABEL[row.verdict]}</span>
        </span>
      </td>
      <td className="py-2 text-gray-800 leading-snug">
        {row.comments ? row.comments : <span className="text-gray-400">—</span>}
      </td>
    </tr>
  );
}

/* ──────────────────────────────────────────────────────── */

/** The sampling-compliance figure (ELE-1871): of the assessment decisions
    college assessors made in the last year, how many an IQA sampled, against
    each assessor's plan target (100% for a new assessor). */
function SamplingRateBlock({ data }: { data: AuditPackData }) {
  const r = data.sampling_rate;
  if (!r) return null;
  return (
    <div className="mb-6 rounded-md border border-gray-300 p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">Sampling rate · last {r.months} months</div>
      <p className="mt-1 text-[13px] text-black">
        <span className="text-[22px] font-bold tabular-nums">{r.rate_pct == null ? 'No decisions' : `${r.rate_pct}%`}</span>{' '}
        {r.rate_pct != null && (
          <>
            of assessment decisions sampled by an IQA ({r.decisions_sampled} of {r.decisions_total}). {r.confirmed} confirmed,{' '}
            {r.returned} returned. {r.assessors_at_target} of {r.assessors_total} assessors at their plan target.
            {r.open_actions > 0 ? ` ${r.open_actions} returned ${r.open_actions === 1 ? 'decision is' : 'decisions are'} still with the assessor.` : ''}
          </>
        )}
      </p>
      {r.assessors.length > 0 && (
        <table className="mt-3 w-full border-collapse text-[10.5px]">
          <thead>
            <tr className="border-b border-black">
              <th className="py-1.5 pr-2 text-left font-semibold">Assessor</th>
              <th className="py-1.5 pr-2 text-left font-semibold">Decisions</th>
              <th className="py-1.5 pr-2 text-left font-semibold">Sampled</th>
              <th className="py-1.5 pr-2 text-left font-semibold">Rate</th>
              <th className="py-1.5 pr-2 text-left font-semibold">Target</th>
              <th className="py-1.5 text-left font-semibold">Returned</th>
            </tr>
          </thead>
          <tbody>
            {r.assessors.map((a) => {
              const met = a.target_pct != null && a.rate_pct != null && a.rate_pct >= a.target_pct;
              return (
                <tr key={a.staff_id} className="border-b border-gray-200">
                  <td className="py-1.5 pr-2 text-black">
                    {a.name}
                    {a.is_new ? <span className="ml-1 text-gray-600">(new assessor)</span> : null}
                  </td>
                  <td className="py-1.5 pr-2 tabular-nums">{a.total}</td>
                  <td className="py-1.5 pr-2 tabular-nums">{a.sampled}</td>
                  <td className={cn('py-1.5 pr-2 font-semibold tabular-nums', met ? 'text-emerald-700' : 'text-red-700')}>
                    {a.rate_pct == null ? 'None' : `${a.rate_pct}%`}
                  </td>
                  <td className="py-1.5 pr-2 tabular-nums">{a.target_pct == null ? 'No plan' : `${Number(a.target_pct)}%`}</td>
                  <td className="py-1.5 tabular-nums">{a.returned}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

/** Standardisation record (ELE-1871): every meeting with who came, what was
    agreed and the actions. Full minutes are in the IQA sampling report. */
function StandardisationPage({ data }: { data: AuditPackData }) {
  const rows = data.standardisation;
  return (
    <section className="audit-page p-12 print-page-break">
      <SectionHeader index={6} title="Standardisation record" />
      {rows.length === 0 ? (
        <p className="max-w-prose text-[12.5px] text-gray-700">
          No standardisation meetings recorded yet. Record them on the IQA dashboard: who came, what was agreed and the
          actions. They appear here and in the IQA sampling report.
        </p>
      ) : (
        <>
          <p className="mb-4 max-w-prose text-[11.5px] text-gray-600">
            {rows.length} {rows.length === 1 ? 'meeting' : 'meetings'} where assessors and the IQA compared decisions and
            agreed how criteria are judged. Full minutes are in the IQA sampling report.
          </p>
          <table className="w-full border-collapse text-[10.5px]">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="py-2 pr-2 text-left font-semibold">Date</th>
                <th className="py-2 pr-2 text-left font-semibold">Topic</th>
                <th className="py-2 pr-2 text-left font-semibold">Status</th>
                <th className="py-2 pr-2 text-left font-semibold">Chair and attendees</th>
                <th className="py-2 pr-2 text-left font-semibold">Agreed</th>
                <th className="py-2 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.id} className="border-b border-gray-200 align-top">
                  <td className="whitespace-nowrap py-2 pr-2 tabular-nums">{formatDate(m.date)}</td>
                  <td className="py-2 pr-2 text-black">{m.topic}</td>
                  <td className="py-2 pr-2">{m.status === 'completed' ? 'Held' : m.status === 'scheduled' ? 'Planned' : m.status}</td>
                  <td className="py-2 pr-2">
                    {m.chair ? `Chair: ${m.chair}. ` : ''}
                    {m.attendees.join(', ') || 'Not recorded'}
                  </td>
                  <td className="py-2 pr-2 leading-snug">{m.decisions || 'Not recorded'}</td>
                  <td className="py-2 leading-snug">{m.action_items.length ? m.action_items.join('; ') : 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}

const METHOD_LABEL: Record<InterventionMethod, string> = {
  call: 'Phone call',
  one_to_one: '1-2-1',
  email: 'Email',
  referral: 'Referral',
  not_recorded: 'Contact',
};

/** Intervention history (ELE-1909): contact logged from the risk flags in
    the last year. Shows that contact happened, how and by whom; the note
    itself stays in the learner's record. */
function InterventionsPage({ data }: { data: AuditPackData }) {
  const h = data.interventions;
  if (!h) return null;
  return (
    <section className="audit-page p-12 print-page-break">
      <SectionHeader index={7} title="Intervention history" />
      <p className="mb-4 max-w-prose text-[11.5px] text-gray-600">
        Contact staff logged with learners flagged at risk, last {h.months} months. {h.total}{' '}
        {h.total === 1 ? 'contact' : 'contacts'} with {h.learners} {h.learners === 1 ? 'learner' : 'learners'}. What was said
        stays in the learner's record.
      </p>
      <div className="mb-6 grid grid-cols-5 gap-3">
        <Tally label="Calls" value={h.by_method.call} tone="sky" />
        <Tally label="1-2-1s" value={h.by_method.one_to_one} tone="emerald" />
        <Tally label="Emails" value={h.by_method.email} tone="grey" />
        <Tally label="Referrals" value={h.by_method.referral} tone="amber" />
        <Tally label="Next steps open" value={h.open_next_steps} tone={h.open_next_steps > 0 ? 'red' : 'grey'} />
      </div>
      {h.rows.length === 0 ? (
        <p className="text-[12.5px] text-gray-700">No contact logged yet.</p>
      ) : (
        <table className="w-full border-collapse text-[10.5px]">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-2 pr-2 text-left font-semibold">Date</th>
              <th className="py-2 pr-2 text-left font-semibold">Learner</th>
              <th className="py-2 pr-2 text-left font-semibold">How</th>
              <th className="py-2 pr-2 text-left font-semibold">About</th>
              <th className="py-2 pr-2 text-left font-semibold">By</th>
              <th className="py-2 text-left font-semibold">Next step</th>
            </tr>
          </thead>
          <tbody>
            {h.rows.map((r) => (
              <tr key={r.id} className="border-b border-gray-200 align-top">
                <td className="whitespace-nowrap py-2 pr-2 tabular-nums">{formatDate(r.at)}</td>
                <td className="py-2 pr-2 text-black">{r.learner}</td>
                <td className="py-2 pr-2">{METHOD_LABEL[r.method] ?? 'Contact'}</td>
                <td className="py-2 pr-2">{r.title || 'Not recorded'}</td>
                <td className="py-2 pr-2">{r.by}</td>
                <td className="py-2 leading-snug">
                  {r.next_step
                    ? `${r.next_step}${r.next_step_by ? ` by ${formatDate(r.next_step_by)}` : ''}${r.next_step_done ? ' (done)' : ''}`
                    : 'None'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function SectionHeader({ index, title }: { index: number; title: string }) {
  return (
    <div className="mb-6">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
        Section {String(index).padStart(2, '0')}
      </div>
      <h2 className="mt-1 text-[28px] font-bold text-black tracking-tight leading-tight">
        {title}
      </h2>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

const printCss = `
/* On screen: each page is a white sheet on the landing ground. Wide tables
   scroll inside their sheet on a phone. */
.audit-sheet { background: white; color: black; overflow-x: auto; }
.audit-sheet table { min-width: 600px; }
@media (min-width: 640px) {
  .audit-sheet { border-radius: 1.5rem; box-shadow: 0 1px 0 rgba(255,255,255,0.08), 0 20px 50px -20px rgba(0,0,0,0.6); }
}
@media (max-width: 639px) {
  .audit-sheet > .audit-page { padding: 20px !important; }
  .audit-sheet h1 { font-size: 28px; }
}
@media print {
  .no-print { display: none !important; }
  body, html { background: white !important; color: black !important; }
  body * { visibility: hidden; }
  .audit-pack, .audit-pack * { visibility: visible; }
  .audit-pack { position: absolute; left: 0; top: 0; width: 100%; margin: 0 !important; }
  .audit-sheet { border-radius: 0; box-shadow: none; overflow: visible; }
  .audit-sheet table { min-width: 0; }
  .audit-page { page-break-after: always; }
  .audit-page-landscape { page-break-before: always; }
  .print-page-break { page-break-before: always; }
}
@page { size: A4; margin: 16mm; }
@page audit-landscape { size: A4 landscape; margin: 12mm; }
.audit-pack { font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; }
`;
