import type { OtjExportData, OtjExportEntry, OtjVerification } from './otjEvidenceExport';

/* ==========================================================================
   otjEvidenceHtml — builds the print-ready HTML for the OTJ evidence pack.
   One source of truth, rendered at runtime via the browser print engine
   (window.print on an off-screen iframe) and validated with headless Chrome.
   A4 pages (794×1123px @96dpi), editorial navy + amber design language
   matching the Elec-Mate Getting-Started pack.
   ========================================================================== */

const LOG_ROWS_PER_PAGE = 15;
const SIGNOFF_ROWS_PER_PAGE = 10;

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const fmtDate = (iso: string | null) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};
const fmtHrs = (m: number) => `${(m / 60).toFixed(1)}h`;
const titleCase = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

function chunk<T>(arr: T[], n: number): T[][] {
  if (arr.length === 0) return [[]];
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

const STYLES = `
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html,body{font-family:'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;-webkit-font-smoothing:antialiased}
.page{position:relative;width:794px;height:1123px;overflow:hidden;background:#fff;page-break-after:always}
.page:last-child{page-break-after:auto}

/* ---- cover ---- */
.cover{height:100%;background:#0d1628;color:#fff;padding:56px;display:flex;flex-direction:column;justify-content:space-between}
.cover-top{display:flex;justify-content:space-between;align-items:flex-start}
.logo{width:104px;height:104px;border-radius:20px;display:block}
.circuit{display:block;margin-top:16px}
.eyebrow{font-size:12px;font-weight:800;letter-spacing:.2em;color:#f5c518}
.rule{width:56px;height:5px;background:#f5c518;border-radius:3px;margin-top:11px}
.cover-hero{padding:8px 0}
.h1{font-size:62px;font-weight:800;line-height:1;letter-spacing:-.02em;margin-top:26px}
.std{font-size:19px;font-weight:600;color:#cdd5e1;margin-top:16px}
.lede{font-size:14px;color:#8b97a8;margin-top:10px;max-width:520px;line-height:1.55}
.chips{margin-top:22px;display:flex;gap:9px}
.chip{background:#1e293b;color:#fff;font-size:11.5px;font-weight:700;letter-spacing:.08em;padding:9px 15px;border-radius:999px}
.cover-stats{display:flex;gap:0;margin-top:30px;border-top:1px solid #243248;border-bottom:1px solid #243248}
.cstat{flex:1;padding:18px 0}
.cstat + .cstat{border-left:1px solid #243248;padding-left:22px}
.cstat .k{font-size:10px;font-weight:700;letter-spacing:.14em;color:#7c889b;text-transform:uppercase;line-height:1.3;min-height:26px}
.cstat .v{font-size:26px;font-weight:800;letter-spacing:-.01em;margin-top:7px}
.cstat .v.accent{color:#f5c518}
.cover-foot{margin-top:24px;display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:700;letter-spacing:.16em}
.cover-foot .l{color:#7c889b}
.cover-foot .r{color:#f5c518}

/* ---- content pages ---- */
.content{height:100%;padding:34px 40px 32px;display:flex;flex-direction:column}
.chead{display:flex;justify-content:space-between;align-items:center;margin-bottom:26px}
.chead .logo-sm{width:34px;height:34px;border-radius:8px;display:block}
.chead .tag{font-size:11px;font-weight:800;letter-spacing:.2em;color:#94a3b8}
.chip-dark{display:inline-block;background:#0d1628;color:#fff;font-size:10.5px;font-weight:800;letter-spacing:.14em;padding:6px 12px;border-radius:7px}
.h2{font-size:30px;font-weight:800;letter-spacing:-.01em;margin-top:13px;color:#111827}
.rule2{width:62px;height:5px;background:#f5c518;border-radius:3px;margin-top:13px}
.sub{font-size:13.5px;color:#475569;margin-top:16px;line-height:1.5}

/* detail rows */
.rows{margin-top:24px}
.row{display:flex;align-items:baseline;padding:13px 0;border-bottom:1px solid #eef1f5}
.row .k{width:240px;font-size:13px;color:#94a3b8}
.row .v{flex:1;font-size:14px;font-weight:700;color:#111827}

/* stat cards */
.cards{display:flex;gap:11px;margin-top:30px}
.card{flex:1;border:1px solid #e6eaef;background:#f8f9fb;border-radius:12px;padding:15px 16px}
.card.accent{background:#fef9eb;border-color:#f5c518}
.card .k{font-size:10px;font-weight:700;letter-spacing:.08em;color:#94a3b8;text-transform:uppercase;line-height:1.3}
.card .v{font-size:26px;font-weight:800;letter-spacing:-.01em;color:#111827;margin-top:10px}
.prog-k{font-size:11px;font-weight:700;letter-spacing:.1em;color:#94a3b8;text-transform:uppercase;margin-top:30px}
.prog{height:8px;background:#eef1f5;border-radius:999px;margin-top:9px;overflow:hidden}
.prog > i{display:block;height:100%;background:#f5c518;border-radius:999px}
.note{margin-top:34px;border:1px solid #e6eaef;border-left:3px solid #f5c518;background:#fbfcfd;border-radius:0 10px 10px 0;padding:16px 20px;font-size:12.5px;color:#475569;line-height:1.65}
.note b{color:#111827}

/* tables */
table{width:100%;border-collapse:collapse;margin-top:22px;font-size:11.5px}
th{background:#0d1628;color:#fff;text-align:left;font-weight:700;font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;padding:9px 10px}
td{padding:9px 10px;border-bottom:1px solid #eef1f5;color:#1f2937;vertical-align:top;line-height:1.35}
tbody tr:nth-child(even){background:#fafbfc}
td.r,th.r{text-align:right}
td.c,th.c{text-align:center}
.pill{display:inline-block;font-size:10px;font-weight:700;padding:3px 8px;border-radius:999px;letter-spacing:.02em}
.pill.ok{background:#fef9eb;color:#a06800;border:1px solid #f5d77a}
.pill.pend{background:#eef1f5;color:#64748b;border:1px solid #dde3ea}
.muted{color:#94a3b8}

.empty{margin-top:22px;border:1px solid #e6eaef;background:#f8f9fb;border-radius:12px;padding:18px 20px;color:#475569;font-size:13.5px}

.cfoot{margin-top:auto;padding-top:14px;border-top:1px solid #eef1f5;display:flex;justify-content:space-between;font-size:10.5px;color:#94a3b8}
.cfoot b{color:#111827}
`;

// Circuit motif as an <img> data-URI — renders reliably in both headless
// Chrome (preview) and html2canvas (runtime), unlike inline <svg>.
const CIRCUIT_SVG = `<svg width="228" height="128" viewBox="-4 -4 228 132" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#f5c518" stroke-width="2" fill="none"><path d="M18 18 V86 M18 86 H92 M92 30 V118 M92 86 H196 M150 48 H196 M92 118 H150 M150 118 V48"/></g><g fill="#f5c518"><circle cx="92" cy="30" r="7"/><circle cx="196" cy="86" r="7"/></g><g fill="#0d1628" stroke="#f5c518" stroke-width="2"><circle cx="18" cy="18" r="7"/><circle cx="18" cy="86" r="7"/><circle cx="196" cy="48" r="7"/><circle cx="92" cy="118" r="7"/><circle cx="150" cy="118" r="7"/></g></svg>`;
const CIRCUIT = `<img class="circuit" width="228" height="132" alt="" src="data:image/svg+xml,${encodeURIComponent(CIRCUIT_SVG)}"/>`;

function statusPill(status: string): string {
  const isPending = /pending|returned|refer/i.test(status);
  return `<span class="pill ${isPending ? 'pend' : 'ok'}">${esc(status)}</span>`;
}

function coverPage(d: OtjExportData, logo: string): string {
  const std = d.learner.standard
    ? d.learner.level
      ? `${d.learner.standard} (${d.learner.level})`
      : d.learner.standard
    : 'Apprenticeship off-the-job training';
  const pct =
    d.totalTargetHours > 0
      ? Math.min(Math.round((d.summary.defensibleHours / d.totalTargetHours) * 100), 100)
      : 0;
  return `
  <div class="page"><div class="cover">
    <div class="cover-top">
      <img class="logo" src="${logo}" alt="Elec-Mate"/>
      ${CIRCUIT}
    </div>
    <div class="cover-hero">
      <div class="eyebrow">OFF-THE-JOB TRAINING RECORD</div>
      <div class="rule"></div>
      <div class="h1">${esc(titleCase(d.learner.name || 'Apprentice'))}</div>
      <div class="std">${esc(std)}</div>
      <div class="lede">A complete, verified record of off-the-job training hours — every entry with a clear source and verifier.</div>
      <div class="chips">
        <span class="chip">${d.totalTargetHours}H REQUIRED</span>
        <span class="chip">${pct}% BANKED</span>
        <span class="chip">VERIFIED RECORD</span>
      </div>
      <div class="cover-stats">
        <div class="cstat"><div class="k">Banked — counts to gateway</div><div class="v accent">${d.summary.defensibleHours.toFixed(1)}h</div></div>
        <div class="cstat"><div class="k">Off-the-job required</div><div class="v">${d.totalTargetHours}h</div></div>
        <div class="cstat"><div class="k">Awaiting verification</div><div class="v">${d.summary.pendingHours.toFixed(1)}h</div></div>
        <div class="cstat"><div class="k">Verification rate</div><div class="v">${d.summary.verificationRatePct}%</div></div>
      </div>
    </div>
    <div class="cover-foot"><span class="l">YOUR TRADE. YOUR APP.</span><span class="r">ELEC-MATE.COM</span></div>
  </div></div>`;
}

function chead(logo: string): string {
  return `<div class="chead"><img class="logo-sm" src="${logo}" alt=""/><span class="tag">OFF-THE-JOB RECORD</span></div>`;
}
function cfoot(page: number, total: number): string {
  return `<div class="cfoot"><span>Off-the-Job Training Record · <b>Elec-Mate</b></span><span>Page ${page} of ${total}</span></div>`;
}
function sectionHead(chip: string, title: string, sub?: string): string {
  return `<div><span class="chip-dark">${esc(chip.toUpperCase())}</span><div class="h2">${esc(title)}</div><div class="rule2"></div>${sub ? `<div class="sub">${esc(sub)}</div>` : ''}</div>`;
}

function detailsPage(
  d: OtjExportData,
  logo: string,
  page: number,
  total: number,
  generated: string
): string {
  const std = d.learner.standard
    ? d.learner.level
      ? `${d.learner.standard} (${d.learner.level})`
      : d.learner.standard
    : '—';
  const pct =
    d.totalTargetHours > 0
      ? Math.min(Math.round((d.summary.defensibleHours / d.totalTargetHours) * 100), 100)
      : 0;
  const row = (k: string, v: string) =>
    `<div class="row"><div class="k">${esc(k)}</div><div class="v">${esc(v)}</div></div>`;
  return `
  <div class="page"><div class="content">
    ${chead(logo)}
    ${sectionHead('Learner & programme', 'Who this record is for')}
    <div class="rows">
      ${row('Learner', titleCase(d.learner.name || '—'))}
      ${row('Unique Learner Number (ULN)', d.learner.uln || '—')}
      ${row('Apprenticeship standard', std)}
      ${row('Training provider', d.learner.provider || '—')}
      ${row('Employer', d.learner.employer || '—')}
      ${row('Programme start', fmtDate(d.learner.startDate))}
      ${row('Planned end (gateway)', fmtDate(d.learner.endDate))}
      ${row('Record generated', generated)}
    </div>
    <div class="cards">
      <div class="card accent"><div class="k">Banked — counts to gateway</div><div class="v">${d.summary.defensibleHours.toFixed(1)}h</div></div>
      <div class="card"><div class="k">Off-the-job required</div><div class="v">${d.totalTargetHours}h</div></div>
      <div class="card"><div class="k">Awaiting verification</div><div class="v">${d.summary.pendingHours.toFixed(1)}h</div></div>
      <div class="card"><div class="k">Verification rate</div><div class="v">${d.summary.verificationRatePct}%</div></div>
    </div>
    <div class="prog-k">Progress — ${pct}% of ${d.totalTargetHours}h</div>
    <div class="prog"><i style="width:${pct}%"></i></div>
    <div class="note"><b>How these hours are counted.</b> Banked hours — what counts toward gateway — are auto-tracked in-app learning plus entries verified by a tutor or employer. Hours awaiting verification are shown separately and count once signed off. The off-the-job requirement is the fixed total set for the apprenticeship standard. This record supports, but does not replace, the training provider's official records.</div>
    ${cfoot(page, total)}
  </div></div>`;
}

function logPage(
  rows: OtjExportEntry[],
  d: OtjExportData,
  logo: string,
  page: number,
  total: number,
  partLabel: string
): string {
  const body = rows
    .map(
      (e) => `<tr>
      <td>${fmtDate(e.date)}</td>
      <td>${esc(e.title)}</td>
      <td>${esc(e.activityType)}</td>
      <td>${esc(e.source)}</td>
      <td>${statusPill(e.status)}</td>
      <td class="r">${fmtHrs(e.durationMinutes)}</td>
      <td class="c">${e.evidenceCount > 0 ? e.evidenceCount : '<span class="muted">—</span>'}</td>
    </tr>`
    )
    .join('');
  return `
  <div class="page"><div class="content">
    ${chead(logo)}
    ${sectionHead('Training log', 'Every hour, every source', `${d.summary.totalEntries} entries across in-app, college and employer-verified activity.${partLabel}`)}
    <table>
      <thead><tr><th>Date</th><th>Activity</th><th>Type</th><th>Source</th><th>Status</th><th class="r">Hours</th><th class="c">Evid.</th></tr></thead>
      <tbody>${body}</tbody>
    </table>
    ${cfoot(page, total)}
  </div></div>`;
}

function signoffPage(
  rows: OtjVerification[],
  logo: string,
  page: number,
  total: number,
  isEmpty: boolean
): string {
  const inner = isEmpty
    ? `<div class="empty">No manual sign-offs recorded yet. In-app activity is system-attested automatically; tutor and employer verifications appear here once recorded.</div>`
    : `<table>
        <thead><tr><th>Date</th><th>Activity</th><th class="r">Hrs</th><th>Verified by</th><th>Role</th><th>Contact</th><th>Statement</th></tr></thead>
        <tbody>${rows
          .map(
            (v) => `<tr>
          <td>${fmtDate(v.date)}</td>
          <td>${esc(v.title)}</td>
          <td class="r">${fmtHrs(v.durationMinutes)}</td>
          <td><b>${esc(v.verifierName)}</b></td>
          <td>${esc(v.verifierRole)}</td>
          <td>${v.verifierContact ? esc(v.verifierContact) : '<span class="muted">—</span>'}</td>
          <td>${esc(v.statement)}</td>
        </tr>`
          )
          .join('')}</tbody>
      </table>`;
  return `
  <div class="page"><div class="content">
    ${chead(logo)}
    ${sectionHead('Verification & sign-off', 'Confirmed by tutor & employer', "The recorded name, contact and date stand as the verifier's attestation.")}
    ${inner}
    ${cfoot(page, total)}
  </div></div>`;
}

export function buildOtjHtml(
  data: OtjExportData,
  logoDataUrl: string,
  generatedLabel: string
): string {
  const logEntries = data.entries.length ? data.entries : [];
  const logChunks = chunk(logEntries, LOG_ROWS_PER_PAGE).filter(
    (c) => c.length || data.entries.length === 0
  );
  const signoffChunks = data.verifications.length
    ? chunk(data.verifications, SIGNOFF_ROWS_PER_PAGE)
    : [[]];

  // total content pages = details(1) + log pages + signoff pages
  const contentTotal = 1 + logChunks.length + signoffChunks.length;

  const pages: string[] = [coverPage(data, logoDataUrl)];
  let p = 1;
  pages.push(detailsPage(data, logoDataUrl, p++, contentTotal, generatedLabel));
  logChunks.forEach((c, i) => {
    const partLabel = logChunks.length > 1 ? ` (page ${i + 1} of ${logChunks.length})` : '';
    pages.push(logPage(c, data, logoDataUrl, p++, contentTotal, partLabel));
  });
  signoffChunks.forEach((c) => {
    pages.push(signoffPage(c, logoDataUrl, p++, contentTotal, data.verifications.length === 0));
  });

  const title = `${titleCase(data.learner.name || 'Apprentice')} - Off-the-Job Training Record`;
  return `<!doctype html><html><head><meta charset="utf-8"/><title>${esc(title)}</title><style>@page{size:794px 1123px;margin:0}${STYLES}</style></head><body>${pages.join('')}</body></html>`;
}
