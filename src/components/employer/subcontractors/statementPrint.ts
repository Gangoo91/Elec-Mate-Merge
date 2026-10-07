/**
 * Printable CIS payment and deduction statement (self-bill), ELE-1830.
 * Opens a plain white page in a new window and asks the browser to print it
 * (or save it as a PDF). Carries what HMRC asks a statement to show: the
 * contractor's name and employer reference, the period, the subcontractor's
 * name and UTR (and verification number at the higher rate), the gross
 * amount, the cost of materials, the amount liable to deduction and the
 * amount deducted.
 */
import {
  cisLabel,
  fmtDay,
  fmtDays,
  gbp,
  type SubcontractorStatement,
} from '@/hooks/useSubcontractors';

const esc = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function statementHtml(
  s: SubcontractorStatement,
  firm: { companyName: string | null; employerRef: string | null; accountsOfficeRef: string | null }
): string {
  const labour = Number(s.labour_amount ?? 0);
  const other = Number(s.other_costs ?? 0);
  const materials = Number(s.materials_amount ?? 0);
  const liable = labour + other;
  const rows = (s.lines ?? [])
    .map((l) =>
      l.kind === 'day'
        ? `<tr><td>${esc(fmtDay(l.date))}</td><td>Day worked${l.jobs ? `: ${esc(l.jobs)}` : ''}</td><td class="r">${Number(l.hours ?? 0).toFixed(1)} h</td></tr>`
        : `<tr><td>${esc(fmtDay(l.date))}</td><td>${l.kind === 'materials' ? 'Materials' : 'Other cost'}: ${esc(l.description ?? '')}</td><td class="r">${esc(gbp(l.amount))}</td></tr>`
    )
    .join('');
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8">
<title>${esc(s.statement_number)} ${esc(s.name ?? '')}</title>
<style>
  body{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111;margin:32px;font-size:13px}
  h1{font-size:20px;margin:0 0 4px}
  .muted{color:#444}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0}
  .box{border:1px solid #ccc;border-radius:8px;padding:12px}
  .box h2{font-size:12px;text-transform:uppercase;letter-spacing:.06em;margin:0 0 8px;color:#333}
  table{width:100%;border-collapse:collapse;margin-top:8px}
  td,th{padding:6px 4px;border-bottom:1px solid #e5e5e5;text-align:left;vertical-align:top}
  .r{text-align:right;white-space:nowrap}
  .total td{font-weight:700;border-top:2px solid #111;border-bottom:none}
  .note{margin-top:16px;font-size:12px}
  @media print{body{margin:12mm}}
</style></head><body>
<h1>CIS payment and deduction statement</h1>
<div class="muted">Self-bill statement ${esc(s.statement_number)} · issued ${esc(fmtDay(s.issued_at))}</div>
<div class="grid">
  <div class="box"><h2>Contractor</h2>
    <div><strong>${esc(firm.companyName ?? '')}</strong></div>
    <div>Employer reference: ${esc(firm.employerRef || 'Not set')}</div>
    ${firm.accountsOfficeRef ? `<div>Accounts office reference: ${esc(firm.accountsOfficeRef)}</div>` : ''}
  </div>
  <div class="box"><h2>Subcontractor</h2>
    <div><strong>${esc(s.name ?? '')}</strong>${s.trading_name ? ` trading as ${esc(s.trading_name)}` : ''}</div>
    <div>UTR: ${esc(s.utr || 'Not recorded')}</div>
    ${s.cis_verification_number ? `<div>Verification number: ${esc(s.cis_verification_number)}</div>` : ''}
    <div>CIS: ${esc(cisLabel(s.cis_status))}</div>
  </div>
</div>
<div>Period: ${esc(fmtDay(s.period_start))} to ${esc(fmtDay(s.period_end))} (tax month ending ${esc(fmtDay(s.period_end))})</div>
<table>
  <tr><td>Labour: ${esc(s.rate_basis === 'hour' ? `${Number(s.hours).toFixed(2)} h` : fmtDays(Number(s.day_count)))} at ${esc(gbp(s.rate))}</td><td class="r">${esc(gbp(labour))}</td></tr>
  ${other ? `<tr><td>Other costs</td><td class="r">${esc(gbp(other))}</td></tr>` : ''}
  <tr><td>Cost of materials</td><td class="r">${esc(gbp(materials))}</td></tr>
  <tr><td><strong>Gross amount paid</strong></td><td class="r"><strong>${esc(gbp(s.gross_amount))}</strong></td></tr>
  <tr><td>Amount liable to deduction</td><td class="r">${esc(gbp(liable))}</td></tr>
  <tr><td>CIS deducted at ${Math.round(Number(s.cis_rate ?? 0) * 100)}%</td><td class="r">${esc(gbp(s.cis_deduction))}</td></tr>
  <tr class="total"><td>Net payable</td><td class="r">${esc(gbp(s.net_payable))}</td></tr>
</table>
${rows ? `<h2 style="font-size:14px;margin-top:24px">Detail</h2><table><tr><th>Date</th><th>Item</th><th class="r"></th></tr>${rows}</table>` : ''}
${s.vat_registered ? '<p class="note"><strong>Reverse charge:</strong> customer to account to HMRC for the VAT on these services. VAT is not shown on this statement.</p>' : ''}
<p class="note muted">Keep this statement. It shows the tax deducted under the Construction Industry Scheme, which you can claim against your tax bill.</p>
</body></html>`;
}

export function printStatement(
  s: SubcontractorStatement,
  firm: { companyName: string | null; employerRef: string | null; accountsOfficeRef: string | null }
) {
  const w = window.open('', '_blank');
  if (!w) return;
  w.document.open();
  w.document.write(statementHtml(s, firm));
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 300);
}
