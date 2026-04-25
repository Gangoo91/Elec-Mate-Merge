import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  useAuditPack,
  type AuditPackData,
  type ScrRow,
  type PolicyWithAckLog,
  type PolicyAckLogEntry,
} from '@/hooks/useAuditPack';

/* ==========================================================================
   CompliancePackPage — /college/compliance/pack
   A4-styled audit pack: cover sheet · SCR · policies · per-policy ack logs
   · staff matrix. Built for browser print → PDF.
   ?auto=1 triggers window.print() once data is ready.
   ========================================================================== */

const STATUS_LABEL = {
  valid: 'In date',
  expiring: 'Expiring',
  expired: 'Expired',
  missing: 'Not on file',
  pending_verification: 'Awaiting verification',
} as const;

const STATUS_DOT = {
  valid: 'bg-emerald-500',
  expiring: 'bg-amber-500',
  expired: 'bg-red-500',
  missing: 'bg-blue-500',
  pending_verification: 'bg-purple-500',
} as const;

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
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { data, loading, error } = useAuditPack();
  const auto = params.get('auto') === '1';

  // Auto-print once data is ready (used when opened from "Print pack" button)
  useEffect(() => {
    if (!auto || !data || loading) return;
    const t = setTimeout(() => window.print(), 600);
    return () => clearTimeout(t);
  }, [auto, data, loading]);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-white text-black p-12">
        <p className="text-[14px] text-gray-600">
          Building audit pack — this may take a moment for larger colleges.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black p-12">
        <p className="text-[14px] text-red-700">Could not build pack: {error}</p>
      </div>
    );
  }

  return (
    <div className="audit-pack min-h-screen bg-white text-black">
      {/* Screen-only toolbar */}
      <div className="no-print sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-[12.5px] font-medium text-gray-700 hover:text-black transition-colors"
        >
          ← Back
        </button>
        <span className="text-[12.5px] text-gray-500 mx-2">·</span>
        <span className="text-[12.5px] text-gray-700 truncate flex-1">
          Compliance audit pack · {data.college?.name ?? 'College'}
        </span>
        <button
          type="button"
          onClick={() => window.print()}
          className="h-9 px-4 rounded-full bg-black text-white text-[12.5px] font-semibold hover:bg-gray-800 transition-colors"
        >
          Print / Save as PDF
        </button>
      </div>

      <Cover data={data} />
      <ScrPage data={data} />
      <PoliciesPage data={data} />
      {data.policies
        .filter((p) => p.requires_acknowledgement && p.status !== 'archived')
        .map((p) => (
          <PolicyAckPage key={p.id} policy={p} />
        ))}
      <StaffMatrixPage data={data} />

      {/* Print stylesheet */}
      <style>{printCss}</style>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function Cover({ data }: { data: AuditPackData }) {
  const s = data.summary;
  const inDate = s.valid + s.expiring;
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
          <Tally label="Missing" value={s.missing} tone="blue" />
          <Tally label="Awaiting sign-off" value={s.pending_verification} tone="purple" />
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
  tone: 'red' | 'amber' | 'blue' | 'purple';
}) {
  const colorClass =
    tone === 'red'
      ? 'text-red-700 border-red-300 bg-red-50'
      : tone === 'amber'
        ? 'text-amber-700 border-amber-300 bg-amber-50'
        : tone === 'blue'
          ? 'text-blue-700 border-blue-300 bg-blue-50'
          : 'text-purple-700 border-purple-300 bg-purple-50';
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
          <tbody>
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
                        <span className="capitalize">{STATUS_LABEL[r.computed_status]}</span>
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
          </tbody>
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
        <Tally label="Signed v" value={signed} tone="purple" />
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
        Cell colours: green = in date; amber = expiring within 60 days; red = expired; blue = not on
        file; purple = awaiting verification.
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
                          cell.computed_status === 'valid' && 'bg-emerald-200 border-emerald-400',
                          cell.computed_status === 'expiring' && 'bg-amber-200 border-amber-400',
                          cell.computed_status === 'expired' && 'bg-red-200 border-red-400',
                          cell.computed_status === 'missing' && 'bg-blue-100 border-blue-300',
                          cell.computed_status === 'pending_verification' &&
                            'bg-purple-200 border-purple-400'
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
@media print {
  .no-print { display: none !important; }
  body, html { background: white !important; color: black !important; }
  .audit-page { page-break-after: always; }
  .audit-page-landscape { page-break-before: always; }
  .print-page-break { page-break-before: always; }
}
@page { size: A4; margin: 16mm; }
@page audit-landscape { size: A4 landscape; margin: 12mm; }
.audit-pack { font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; }
`;
