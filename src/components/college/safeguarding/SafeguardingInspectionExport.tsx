import { useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn, infoPanelCn } from '@/components/forms/fieldStyles';
import { QBTN } from '@/components/college/quality/QualityHubKit';
import { useToast } from '@/hooks/use-toast';
import {
  CP_METHOD_LABEL,
  CSC_CASE_LABEL,
  RECEIPT_HOW_LABEL,
  SG_DECISION_LABEL,
  fetchSafeguardingInspectionExport,
  type CpMethod,
  type CscCaseType,
  type ReceiptHow,
  type SgDecision,
  type SgInspectionExport,
} from '@/hooks/useSafeguardingRecords';

/* ==========================================================================
   SafeguardingInspectionExport (ELE-2043): the day-one record an inspector
   asks for. Every safeguarding concern with its summary, follow-up, decision,
   reasons and outcome (KCSIE 2026 para 74), referrals made, learners with an
   open children's social care case (para 218), and child protection file
   transfers with receipt (para 150). Leads only; each export is logged in
   college_activity.
   ========================================================================== */

const d = (v: unknown) =>
  v
    ? new Date(String(v)).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';
const esc = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
const csvCell = (v: unknown) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const decisionLabel = (v: unknown) =>
  v ? (SG_DECISION_LABEL[v as SgDecision] ?? String(v)) : 'Not recorded';

function referrals(c: Record<string, unknown>): string {
  const out: string[] = [];
  if (c.la_referral_on)
    out.push(
      `Local authority ${d(c.la_referral_on)}${c.la_name ? ` (${c.la_name})` : ''}${c.la_reference ? ` ref ${c.la_reference}` : ''}`
    );
  if (c.lado_referral_on)
    out.push(`LADO ${d(c.lado_referral_on)}${c.lado_reference ? ` ref ${c.lado_reference}` : ''}`);
  if (c.channel_referral_on)
    out.push(
      `Channel ${d(c.channel_referral_on)}${c.channel_reference ? ` ref ${c.channel_reference}` : ''}`
    );
  return out.join('; ');
}

function toCsv(x: SgInspectionExport): string {
  const head = [
    'Learner',
    'Date of birth',
    'Logged',
    'Logged by',
    'Title',
    'Summary of the concern',
    'Action required',
    'Acknowledged',
    'Decision',
    'Reasons',
    'Decided by',
    'Decided on',
    'Referrals',
    'Outcome',
    'Closed',
  ];
  const rows = x.concerns.map((c) =>
    [
      c.learner,
      d(c.date_of_birth),
      d(c.logged_at),
      c.logged_by,
      c.title,
      c.summary,
      c.action_required,
      d(c.acknowledged_at),
      decisionLabel(c.decision),
      c.rationale,
      c.decided_by,
      d(c.decided_at),
      referrals(c),
      c.outcome,
      d(c.closed_at),
    ]
      .map(csvCell)
      .join(',')
  );
  return [head.join(','), ...rows].join('\n');
}

function toHtml(x: SgInspectionExport): string {
  const concerns = x.concerns
    .map(
      (c) => `<tr><td>${esc(c.learner)}<br><small>${esc(d(c.date_of_birth))}</small></td>
<td>${esc(d(c.logged_at))}<br><small>${esc(c.logged_by)}</small></td>
<td><b>${esc(c.title)}</b><br>${esc(c.summary)}${c.action_required ? `<br><i>Action: ${esc(c.action_required)}</i>` : ''}</td>
<td><b>${esc(decisionLabel(c.decision))}</b><br>${esc(c.rationale)}<br><small>${esc(c.decided_by)} ${esc(d(c.decided_at))}${Number(c.earlier_decisions) > 0 ? ` · ${esc(c.earlier_decisions)} earlier` : ''}</small></td>
<td>${esc(referrals(c))}</td>
<td>${esc(c.outcome)}${c.closed_at ? `<br><small>Closed ${esc(d(c.closed_at))}</small>` : '<br><small>Open</small>'}</td></tr>`
    )
    .join('');
  const csc = x.open_csc_cases
    .map(
      (c) =>
        `<tr><td>${esc(c.learner)}</td><td>${esc(c.case_type ? CSC_CASE_LABEL[c.case_type as CscCaseType] : '')}</td><td>${esc(c.local_authority)}</td><td>${esc(c.social_worker)}</td><td>${esc(d(c.since))}</td></tr>`
    )
    .join('');
  const tr = x.transfers
    .map(
      (t) =>
        `<tr><td>${esc(t.learner)}</td><td>${esc(d(t.left_on))}</td><td>${esc(t.to)}${t.to_lead ? `<br><small>${esc(t.to_lead)}</small>` : ''}</td><td>${esc(d(t.sent_at))} · ${esc(CP_METHOD_LABEL[t.method as CpMethod] ?? t.method)}<br><small>${esc(t.sent_by)}</small></td><td>${t.receipt_at ? `${esc(d(t.receipt_at))} · ${esc(t.receipt_by)}${t.receipt_role ? `, ${esc(t.receipt_role)}` : ''}<br><small>${esc(RECEIPT_HOW_LABEL[t.receipt_how as ReceiptHow] ?? '')}</small>` : '<b>Not yet confirmed</b>'}</td></tr>`
    )
    .join('');
  const leads = x.leads
    .map((l) => `${esc(l.name)} (${esc(l.role)}${l.prevent_lead ? ', Prevent lead' : ''})`)
    .join('; ');
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>Safeguarding records · ${esc(x.college)}</title>
<style>body{font:12px/1.45 -apple-system,Segoe UI,Arial,sans-serif;color:#111;margin:14mm}h1{font-size:18px;margin:0}h2{font-size:14px;margin:18px 0 6px}
table{width:100%;border-collapse:collapse}th,td{border:1px solid #bbb;padding:5px 6px;vertical-align:top;text-align:left}th{background:#eee}small{color:#444}
.meta{margin:4px 0 0}@page{size:A4 landscape;margin:10mm}</style></head><body>
<h1>Safeguarding records: ${esc(x.college)}</h1>
<p class="meta">Produced ${esc(new Date(x.generated_at).toLocaleString('en-GB'))} by ${esc(x.generated_by)}. Confidential: designated safeguarding leads only.</p>
<p class="meta">Leads: ${leads || 'none set'}</p>
<h2>Concerns, decisions and outcomes (${x.concerns.length})</h2>
<table><thead><tr><th>Learner</th><th>Logged</th><th>Concern</th><th>Decision and reasons</th><th>Referrals</th><th>Outcome</th></tr></thead><tbody>${concerns || '<tr><td colspan="6">None logged.</td></tr>'}</tbody></table>
<h2>Open children's social care cases (${x.open_csc_cases.length})</h2>
<table><thead><tr><th>Learner</th><th>Type</th><th>Local authority</th><th>Social worker</th><th>Since</th></tr></thead><tbody>${csc || '<tr><td colspan="5">None recorded.</td></tr>'}</tbody></table>
<h2>Child protection file transfers (${x.transfers.length})</h2>
<table><thead><tr><th>Learner</th><th>Left</th><th>Sent to</th><th>Sent</th><th>Receipt</th></tr></thead><tbody>${tr || '<tr><td colspan="5">None.</td></tr>'}</tbody></table>
</body></html>`;
}

function download(name: string, body: string, type: string) {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function SafeguardingInspectionExport({ collegeId }: { collegeId: string | null }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [data, setData] = useState<SgInspectionExport | null>(null);

  const load = async () => {
    if (!collegeId) return;
    setOpen(true);
    setBusy(true);
    const r = await fetchSafeguardingInspectionExport(collegeId);
    setBusy(false);
    if (r.error || !r.data) {
      toast({ title: 'Could not build the export', description: r.error, variant: 'destructive' });
      setOpen(false);
      return;
    }
    setData(r.data);
  };

  const stamp = new Date().toISOString().slice(0, 10);
  const open5 = data?.concerns.filter((c) => !c.closed_at).length ?? 0;
  const noDecision = data?.concerns.filter((c) => !c.decision).length ?? 0;
  const noReceipt = data?.transfers.filter((t) => !t.receipt_at).length ?? 0;

  return (
    <>
      <button type="button" className={QBTN} onClick={() => void load()} disabled={!collegeId}>
        Inspection export
      </button>
      <FormSheet
        open={open}
        onOpenChange={setOpen}
        width="wide"
        eyebrow="Safeguarding · leads only"
        title="Inspection day-one export"
        description="Every concern with its decision, reasons, referrals and outcome, open social care cases, and file transfers with receipt. Each export is logged."
        footer={
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              className={buttonSecondaryCn}
              disabled={!data}
              onClick={() =>
                data && download(`safeguarding-concerns-${stamp}.csv`, toCsv(data), 'text/csv')
              }
            >
              Download CSV
            </button>
            <button
              type="button"
              className={buttonPrimaryCn}
              disabled={!data}
              onClick={() =>
                data && download(`safeguarding-records-${stamp}.html`, toHtml(data), 'text/html')
              }
            >
              Download report
            </button>
          </div>
        }
      >
        {busy || !data ? (
          <p className="text-[13.5px] text-white">Building the export…</p>
        ) : (
          <div className="space-y-4" data-testid="sg-export-summary">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                [data.concerns.length, 'concerns'],
                [open5, 'open'],
                [data.open_csc_cases.length, 'open social care cases'],
                [data.transfers.length, 'file transfers'],
              ].map(([n, l]) => (
                <div key={String(l)} className={infoPanelCn}>
                  <p className="text-[22px] font-bold tabular-nums text-white">{n}</p>
                  <p className="text-[12.5px] text-white">{l}</p>
                </div>
              ))}
            </div>
            {(noDecision > 0 || noReceipt > 0) && (
              <p className="text-[13px] font-semibold leading-relaxed text-orange-300">
                {noDecision > 0 &&
                  `${noDecision} concern${noDecision === 1 ? ' has' : 's have'} no recorded decision. `}
                {noReceipt > 0 &&
                  `${noReceipt} file transfer${noReceipt === 1 ? ' has' : 's have'} no confirmation of receipt.`}
              </p>
            )}
            <p className="text-[13px] leading-relaxed text-white">
              The report opens in any browser and prints on A4 landscape. Keep it confidential and
              store it securely.
            </p>
          </div>
        )}
      </FormSheet>
    </>
  );
}
