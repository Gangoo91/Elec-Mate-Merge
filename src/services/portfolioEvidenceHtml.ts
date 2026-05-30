import type {
  PortfolioPackData,
  PortfolioPackItem,
  PortfolioCriterion,
  CoverageUnit,
  AcState,
} from './portfolioEvidenceExport';

/* ==========================================================================
   portfolioEvidenceHtml — print-ready HTML for the portfolio evidence pack.
   Navy editorial cover, summary, each evidence item (write-up + photos + the
   assessment criteria it meets WITH their full text + supervisor sign-off),
   then an assessor justification summary. Items are greedily packed onto A4
   pages so variable-height content never clips. Rendered via the browser
   print engine; validated with headless Chrome.
   ========================================================================== */

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const fmtDate = (iso: string | null) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
};
const titleCase = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
const prettyCat = (c: string) => (c ? c.replace(/[_-]/g, ' ').replace(/\b\w/g, (x) => x.toUpperCase()) : 'Evidence');
const truncate = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

const MAX_PHOTOS = 6;
const MAX_CRITERIA_WITH_TEXT = 12;
const AC_TEXT_CAP = 130;
const WRITEUP_CAP = 460;

const STYLES = `
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html,body{font-family:'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;-webkit-font-smoothing:antialiased}
.page{position:relative;width:794px;height:1123px;overflow:hidden;background:#fff;page-break-after:always}
.page:last-child{page-break-after:auto}

/* cover */
.cover{height:100%;background:#0d1628;color:#fff;padding:56px;display:flex;flex-direction:column;justify-content:space-between}
.cover-top{display:flex;justify-content:space-between;align-items:flex-start}
.logo{width:104px;height:104px;border-radius:20px;display:block}
.circuit{display:block;margin-top:16px}
.eyebrow{font-size:12px;font-weight:800;letter-spacing:.2em;color:#f5c518}
.rule{width:56px;height:5px;background:#f5c518;border-radius:3px;margin-top:11px}
.h1{font-size:62px;font-weight:800;line-height:1;letter-spacing:-.02em;margin-top:26px}
.std{font-size:19px;font-weight:600;color:#cdd5e1;margin-top:16px}
.lede{font-size:14px;color:#8b97a8;margin-top:10px;max-width:540px;line-height:1.55}
.chips{margin-top:22px;display:flex;gap:9px}
.chip{background:#1e293b;color:#fff;font-size:11.5px;font-weight:700;letter-spacing:.08em;padding:9px 15px;border-radius:999px}
.cover-stats{display:flex;gap:0;margin-top:30px;border-top:1px solid #243248;border-bottom:1px solid #243248}
.cstat{flex:1;padding:18px 0}
.cstat + .cstat{border-left:1px solid #243248;padding-left:22px}
.cstat .k{font-size:10px;font-weight:700;letter-spacing:.14em;color:#7c889b;text-transform:uppercase;line-height:1.3;min-height:26px}
.cstat .v{font-size:26px;font-weight:800;letter-spacing:-.01em;margin-top:7px}
.cstat .v.accent{color:#f5c518}
.cover-foot{display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:700;letter-spacing:.16em}
.cover-foot .l{color:#7c889b}
.cover-foot .r{color:#f5c518}

/* content pages */
.content{height:100%;padding:34px 40px 32px;display:flex;flex-direction:column}
.chead{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
.chead .logo-sm{width:34px;height:34px;border-radius:8px;display:block}
.chead .tag{font-size:11px;font-weight:800;letter-spacing:.2em;color:#94a3b8}
.chip-dark{display:inline-block;background:#0d1628;color:#fff;font-size:10.5px;font-weight:800;letter-spacing:.14em;padding:6px 12px;border-radius:7px}
.h2{font-size:30px;font-weight:800;letter-spacing:-.01em;margin-top:13px;color:#111827}
.rule2{width:62px;height:5px;background:#f5c518;border-radius:3px;margin-top:13px}

.rows{margin-top:24px}
.row{display:flex;align-items:baseline;padding:13px 0;border-bottom:1px solid #eef1f5}
.row .k{width:240px;font-size:13px;color:#94a3b8}
.row .v{flex:1;font-size:14px;font-weight:700;color:#111827}

.cards{display:flex;gap:11px;margin-top:30px}
.card{flex:1;border:1px solid #e6eaef;background:#f8f9fb;border-radius:12px;padding:15px 16px}
.card.accent{background:#fef9eb;border-color:#f5c518}
.card .k{font-size:10px;font-weight:700;letter-spacing:.08em;color:#94a3b8;text-transform:uppercase;line-height:1.3}
.card .v{font-size:26px;font-weight:800;letter-spacing:-.01em;color:#111827;margin-top:10px}
.note{margin-top:34px;border:1px solid #e6eaef;border-left:3px solid #f5c518;background:#fbfcfd;border-radius:0 10px 10px 0;padding:16px 20px;font-size:12.5px;color:#475569;line-height:1.65}
.note b{color:#111827}

/* declarations */
.declintro{margin-top:20px;font-size:13px;color:#475569;line-height:1.6}
.declintro b{color:#111827}
.decl{margin-top:15px;border:1px solid #e6eaef;border-radius:12px;padding:15px 18px}
.decl .role{font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#caa406}
.decl .stmt{font-size:11.5px;color:#374151;line-height:1.55;margin-top:7px}
.sigrow{display:flex;gap:18px;margin-top:14px}
.sig{flex:1}
.sig.dt{flex:0 0 150px}
.sig .lbl{font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#94a3b8}
.sig .line{border-bottom:1.5px solid #cbd5e1;height:24px;margin-top:5px;font-size:12.5px;color:#111827;font-weight:600;display:flex;align-items:flex-end;padding-bottom:3px}
.declnote{margin-top:18px;font-size:10.5px;color:#94a3b8;line-height:1.5}

/* evidence items */
.item{border:1px solid #e6eaef;border-radius:14px;padding:16px 18px;margin-top:14px;background:#fff}
.item:first-of-type{margin-top:18px}
.it-top{display:flex;justify-content:space-between;align-items:flex-start;gap:14px}
.it-title{font-size:15.5px;font-weight:800;color:#111827;line-height:1.25}
.it-meta{font-size:11px;color:#94a3b8;margin-top:4px}
.it-badges{flex-shrink:0;display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
.badge{font-size:9.5px;font-weight:700;letter-spacing:.04em;padding:4px 9px;border-radius:999px;white-space:nowrap}
.badge.ok{background:#fef9eb;color:#a06800;border:1px solid #f5d77a}
.badge.pend{background:#eef1f5;color:#64748b;border:1px solid #dde3ea}
.badge.review{background:#fff1e6;color:#b45309;border:1px solid #fdba74}

/* contents */
.tocs{margin-top:22px}
.toc{display:flex;align-items:baseline;gap:8px;padding:11px 0;border-bottom:1px solid #eef1f5}
.toc-l{font-size:14px;font-weight:600;color:#111827}
.toc-d{flex:1;border-bottom:1px dotted #cbd5e1;transform:translateY(-3px)}
.toc-p{font-size:12px;font-weight:700;color:#64748b;font-variant-numeric:tabular-nums}
.units{margin-top:8px}
.urow{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:7px 0;border-bottom:1px solid #f1f5f9}
.uc{font-size:11.5px;color:#475569;min-width:0}
.uc b{color:#0d1628;font-weight:800;margin-right:6px;font-variant-numeric:tabular-nums}
.up{display:flex;align-items:center;gap:8px;flex:0 0 170px}
.ubar{flex:1;height:6px;background:#eef1f5;border-radius:999px;overflow:hidden}
.ubar i{display:block;height:100%;background:#f5c518;border-radius:999px}
.un{font-size:10.5px;font-weight:700;color:#64748b;white-space:nowrap;font-variant-numeric:tabular-nums;width:38px;text-align:right}
.writeup{margin-top:10px;font-size:12px;color:#374151;line-height:1.55;white-space:pre-line}
.subh{font-size:9.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#94a3b8;margin-top:12px;margin-bottom:5px}
.crit{font-size:11px;color:#475569;line-height:1.45;padding:5px 0 5px 11px;border-left:2px solid #f1f5f9;margin-bottom:3px}
.crit b{color:#0d1628;font-weight:700;margin-right:5px;white-space:nowrap}
.crit-more{font-size:10.5px;color:#94a3b8;padding-left:11px;margin-top:2px}
.skills{margin-top:10px;display:flex;flex-wrap:wrap;gap:5px}
.skill{font-size:10px;font-weight:600;background:#f1f5f9;color:#475569;padding:3px 9px;border-radius:6px}
.photos{margin-top:8px;display:flex;gap:8px;flex-wrap:wrap}
.photos img{flex:0 0 auto;width:150px;height:118px;object-fit:cover;border-radius:8px;border:1px solid #e6eaef;background:#f1f5f9;display:block}
.photos .more{flex:0 0 auto;width:72px;height:118px;border-radius:8px;border:1px dashed #cbd5e1;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#94a3b8}
.signoff{margin-top:12px;border-left:3px solid #f5c518;background:#fbfcfd;border-radius:0 8px 8px 0;padding:10px 14px;font-size:11.5px;color:#475569;line-height:1.5}
.signoff b{color:#111827}

/* coverage map */
.legend{display:flex;flex-wrap:wrap;gap:14px;margin-top:18px;padding-bottom:14px;border-bottom:1px solid #eef1f5}
.lg{display:flex;align-items:center;gap:6px;font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#94a3b8}
.lg i{width:12px;height:12px;border-radius:3px;display:block}
.covroll{display:flex;gap:0;margin-top:18px}
.cr{flex:1;text-align:center;padding:0 4px}
.cr + .cr{border-left:1px solid #eef1f5}
.cr .v{font-size:22px;font-weight:800;color:#111827;line-height:1}
.cr .v.gold{color:#caa406}
.cr .v.red{color:#dc2626}
.cr .k{font-size:8.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#94a3b8;margin-top:5px}
.covpct{margin-top:16px;font-size:13px;color:#475569}
.covpct b{color:#111827;font-weight:700}
.covu{margin-top:15px}
.covu-h{display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:6px}
.covu-h .u{font-size:12px;color:#475569;min-width:0}
.covu-h .u b{color:#0d1628;font-weight:800;margin-right:7px;font-variant-numeric:tabular-nums}
.covu-h .n{font-size:10.5px;font-weight:700;color:#64748b;white-space:nowrap}
.tiles{display:flex;flex-wrap:wrap;gap:3px}
.t{width:15px;height:15px;border-radius:3px;background:#eef1f5;flex:0 0 auto}
.t.iqa{background:#f5c518;box-shadow:inset 0 0 0 2px #fff, 0 0 0 1px #caa406}
.t.signed{background:#f5c518}
.t.evid{background:#fdf3cf;border:1.5px solid #f5c518}
.t.ref{background:#fde8e8;border:1.5px solid #ef4444}
.t.nty{background:#fff1e6;border:1.5px solid #fb923c}

/* justification summary */
.jrow{padding:13px 0;border-bottom:1px solid #eef1f5}
.jtop{display:flex;justify-content:space-between;gap:12px;align-items:baseline}
.jtitle{font-size:13px;font-weight:700;color:#111827}
.jstatus{font-size:9.5px;font-weight:700;color:#94a3b8;white-space:nowrap}
.jcodes{font-size:10.5px;color:#64748b;margin-top:4px;line-height:1.5}
.jcodes b{color:#94a3b8;font-weight:700}
.jtext{font-size:11.5px;color:#475569;line-height:1.5;margin-top:5px}

.cfoot{margin-top:auto;padding-top:14px;border-top:1px solid #eef1f5;display:flex;justify-content:space-between;font-size:10.5px;color:#94a3b8}
.cfoot b{color:#111827}
`;

const CIRCUIT_SVG = `<svg width="228" height="132" viewBox="-4 -4 228 132" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#f5c518" stroke-width="2" fill="none"><path d="M18 18 V86 M18 86 H92 M92 30 V118 M92 86 H196 M150 48 H196 M92 118 H150 M150 118 V48"/></g><g fill="#f5c518"><circle cx="92" cy="30" r="7"/><circle cx="196" cy="86" r="7"/></g><g fill="#0d1628" stroke="#f5c518" stroke-width="2"><circle cx="18" cy="18" r="7"/><circle cx="18" cy="86" r="7"/><circle cx="196" cy="48" r="7"/><circle cx="92" cy="118" r="7"/><circle cx="150" cy="118" r="7"/></g></svg>`;
const CIRCUIT = `<img class="circuit" width="228" height="132" alt="" src="data:image/svg+xml,${encodeURIComponent(CIRCUIT_SVG)}"/>`;

function chead(logo: string): string {
  return `<div class="chead"><img class="logo-sm" src="${logo}" alt=""/><span class="tag">PORTFOLIO EVIDENCE</span></div>`;
}
function cfoot(page: number, total: number): string {
  return `<div class="cfoot"><span>Portfolio Evidence Record · <b>Elec-Mate</b></span><span>Page ${page} of ${total}</span></div>`;
}
function sectionHead(chip: string, title: string): string {
  return `<div><span class="chip-dark">${esc(chip.toUpperCase())}</span><div class="h2">${esc(title)}</div><div class="rule2"></div></div>`;
}

function coverPage(d: PortfolioPackData, logo: string): string {
  const std = d.learner.standard
    ? d.learner.level
      ? `${d.learner.standard} (${d.learner.level})`
      : d.learner.standard
    : 'Apprenticeship portfolio of evidence';
  const verifiedPct = d.summary.totalItems > 0 ? Math.round((d.summary.verifiedItems / d.summary.totalItems) * 100) : 0;
  return `
  <div class="page"><div class="cover">
    <div class="cover-top"><img class="logo" src="${logo}" alt="Elec-Mate"/>${CIRCUIT}</div>
    <div class="cover-hero">
      <div class="eyebrow">PORTFOLIO OF EVIDENCE</div>
      <div class="rule"></div>
      <div class="h1">${esc(titleCase(d.learner.name || 'Apprentice'))}</div>
      <div class="std">${esc(std)}</div>
      <div class="lede">A complete record of portfolio evidence — each piece with the apprentice's write-up, the assessment criteria it meets, photo evidence and supervisor sign-off.</div>
      <div class="chips">
        <span class="chip">${d.summary.totalItems} EVIDENCE ITEMS</span>
        <span class="chip">${verifiedPct}% VERIFIED</span>
      </div>
      <div class="cover-stats">
        <div class="cstat"><div class="k">Evidence items</div><div class="v accent">${d.summary.totalItems}</div></div>
        <div class="cstat"><div class="k">Supervisor verified</div><div class="v">${d.summary.verifiedItems}</div></div>
        <div class="cstat"><div class="k">Criteria evidenced</div><div class="v">${d.summary.criteriaEvidenced}</div></div>
        <div class="cstat"><div class="k">Hours evidenced</div><div class="v">${d.summary.hoursEvidenced}h</div></div>
      </div>
    </div>
    <div class="cover-foot"><span class="l">YOUR TRADE. YOUR APP.</span><span class="r">ELEC-MATE.COM</span></div>
  </div></div>`;
}

function detailsPage(d: PortfolioPackData, logo: string, page: number, total: number, generated: string): string {
  const std = d.learner.standard ? (d.learner.level ? `${d.learner.standard} (${d.learner.level})` : d.learner.standard) : '—';
  const row = (k: string, v: string) => `<div class="row"><div class="k">${esc(k)}</div><div class="v">${esc(v)}</div></div>`;
  return `
  <div class="page"><div class="content">
    ${chead(logo)}
    ${sectionHead('Learner & portfolio', 'About this portfolio')}
    <div class="rows">
      ${row('Learner', titleCase(d.learner.name || '—'))}
      ${row('Unique Learner Number (ULN)', d.learner.uln || '—')}
      ${row('Apprenticeship', std)}
      ${row('Training provider', d.learner.provider || '—')}
      ${row('Employer', d.learner.employer || '—')}
      ${row('Programme start', fmtDate(d.learner.startDate))}
      ${row('Planned end (gateway)', fmtDate(d.learner.endDate))}
      ${row('Record generated', generated)}
    </div>
    <div class="cards">
      <div class="card accent"><div class="k">Evidence items</div><div class="v">${d.summary.totalItems}</div></div>
      <div class="card"><div class="k">Supervisor verified</div><div class="v">${d.summary.verifiedItems}</div></div>
      <div class="card"><div class="k">Criteria evidenced</div><div class="v">${d.summary.criteriaEvidenced}</div></div>
      <div class="card"><div class="k">Hours evidenced</div><div class="v">${d.summary.hoursEvidenced}h</div></div>
    </div>
    <div class="note"><b>How to read this pack.</b> Each item is a piece of portfolio evidence with the apprentice's own write-up of what they did, the assessment criteria (AC) and learning outcomes (LO) it meets — shown in full — and any photo evidence. "Supervisor verified" items carry a workplace sign-off. The final pages summarise the justification for every entry. This record supports, but does not replace, the training provider's official portfolio system.</div>
    ${cfoot(page, total)}
  </div></div>`;
}

function critList(items: PortfolioCriterion[], label: string): string {
  if (!items.length) return '';
  const shown = items.slice(0, MAX_CRITERIA_WITH_TEXT);
  const extra = items.length - shown.length;
  const rows = shown
    .map((c) => {
      const code = c.code ? `<b>${esc(c.code)}</b>` : '';
      const text = c.text ? esc(truncate(c.text, AC_TEXT_CAP)) : '';
      return `<div class="crit">${code}${text}</div>`;
    })
    .join('');
  const more = extra > 0 ? `<div class="crit-more">+ ${extra} more — see the justification summary</div>` : '';
  return `<div class="subh">${esc(label)}</div>${rows}${more}`;
}

function isStale(iso: string | null): boolean {
  if (!iso) return false;
  const t = new Date(iso).getTime();
  if (!isFinite(t)) return false;
  return (Date.now() - t) / (30.44 * 86_400_000) > 18; // older than ~18 months
}

function itemBlock(it: PortfolioPackItem): string {
  const verifiedBadge = it.verified
    ? `<span class="badge ok">SUPERVISOR VERIFIED</span>`
    : `<span class="badge pend">${esc((it.status || 'draft').replace(/_/g, ' ').toUpperCase())}</span>`;
  const reviewBadge = isStale(it.date) ? `<span class="badge review">REVIEW · OLDER</span>` : '';
  const badge = `<div class="it-badges">${reviewBadge}${verifiedBadge}</div>`;
  const meta = [it.evidenceType, fmtDate(it.date), prettyCat(it.category), it.timeSpentMins > 0 ? `${(it.timeSpentMins / 60).toFixed(1)}h` : null, it.grade ? `Grade: ${it.grade}` : null]
    .filter(Boolean)
    .join('  ·  ');
  const writeUp = it.writeUp ? `<div class="writeup">${esc(truncate(it.writeUp, WRITEUP_CAP))}</div>` : '';
  const criteria = critList(it.criteria, 'Assessment criteria evidenced');
  const outcomes = critList(it.outcomes, 'Learning outcomes');
  const skills = it.skills.length
    ? `<div class="skills">${it.skills.slice(0, 10).map((s) => `<span class="skill">${esc(s)}</span>`).join('')}</div>`
    : '';
  const shown = it.photos.slice(0, MAX_PHOTOS);
  const extra = it.photos.length - shown.length;
  const photos = shown.length
    ? `<div class="subh">Photo evidence</div><div class="photos">${shown.map((p) => `<img src="${esc(p.url)}" alt="${esc(p.name)}"/>`).join('')}${extra > 0 ? `<div class="more">+${extra}</div>` : ''}</div>`
    : '';
  const signoff =
    it.verified && it.supervisorFeedback
      ? `<div class="signoff"><b>Supervisor sign-off.</b> ${esc(it.supervisorFeedback)}</div>`
      : '';
  return `<div class="item">
    <div class="it-top"><div><div class="it-title">${esc(it.title)}</div><div class="it-meta">${esc(meta)}</div></div>${badge}</div>
    ${writeUp}${criteria}${outcomes}${skills}${photos}${signoff}
  </div>`;
}

function estimateHeight(it: PortfolioPackItem): number {
  let h = 64;
  if (it.writeUp) h += Math.min(Math.ceil(Math.min(it.writeUp.length, WRITEUP_CAP) / 92), 6) * 17 + 8;
  const crit = Math.min(it.criteria.length, MAX_CRITERIA_WITH_TEXT);
  if (crit) h += 22 + crit * 32 + (it.criteria.length > MAX_CRITERIA_WITH_TEXT ? 16 : 0);
  const out = Math.min(it.outcomes.length, MAX_CRITERIA_WITH_TEXT);
  if (out) h += 22 + out * 30;
  if (it.skills.length) h += Math.ceil(it.skills.length / 6) * 22 + 4;
  if (it.photos.length) h += 146;
  if (it.verified && it.supervisorFeedback) h += 54;
  return h + 30;
}

function packByHeight(items: PortfolioPackItem[], first: number, rest: number): PortfolioPackItem[][] {
  const pages: PortfolioPackItem[][] = [];
  let cur: PortfolioPackItem[] = [];
  let used = 0;
  let budget = first;
  for (const it of items) {
    const h = estimateHeight(it);
    if (cur.length && used + h > budget) {
      pages.push(cur);
      cur = [];
      used = 0;
      budget = rest;
    }
    cur.push(it);
    used += h;
  }
  if (cur.length) pages.push(cur);
  return pages.length ? pages : [[]];
}

function evidencePage(items: PortfolioPackItem[], logo: string, page: number, total: number, first: boolean, partLabel: string): string {
  const head = first
    ? sectionHead('Portfolio evidence', 'Your evidence, item by item')
    : `<div class="chip-dark">PORTFOLIO EVIDENCE${partLabel}</div>`;
  const body = items.length
    ? items.map(itemBlock).join('')
    : `<div class="note" style="margin-top:24px">No portfolio evidence has been added yet.</div>`;
  return `<div class="page"><div class="content">${chead(logo)}${head}<div>${body}</div>${cfoot(page, total)}</div></div>`;
}

/* ── justification summary ─────────────────────────────────────────────── */
function jRow(it: PortfolioPackItem): string {
  const codes = it.criteria.filter((c) => c.code).map((c) => c.code);
  const codesLine = codes.length
    ? `<div class="jcodes"><b>Evidences:</b> ${esc(codes.join(',  '))}</div>`
    : '';
  const just = it.writeUp || it.reflection;
  const justLine = just ? `<div class="jtext">${esc(truncate(just, 360))}</div>` : '';
  const status = it.verified ? 'Verified' : (it.status || 'draft').replace(/_/g, ' ');
  return `<div class="jrow">
    <div class="jtop"><div class="jtitle">${esc(it.title)}</div><div class="jstatus">${esc(status.toUpperCase())}</div></div>
    ${codesLine}${justLine}
  </div>`;
}
function jEstimate(it: PortfolioPackItem): number {
  let h = 34;
  const codes = it.criteria.filter((c) => c.code).length;
  if (codes) h += Math.ceil(codes / 4) * 15;
  const just = it.writeUp || it.reflection;
  if (just) h += Math.min(Math.ceil(Math.min(just.length, 360) / 100) * 17, 80);
  return h + 14;
}
function packJustification(items: PortfolioPackItem[]): PortfolioPackItem[][] {
  const FIRST = 880;
  const REST = 980;
  const pages: PortfolioPackItem[][] = [];
  let cur: PortfolioPackItem[] = [];
  let used = 0;
  let budget = FIRST;
  for (const it of items) {
    const h = jEstimate(it);
    if (cur.length && used + h > budget) {
      pages.push(cur);
      cur = [];
      used = 0;
      budget = REST;
    }
    cur.push(it);
    used += h;
  }
  if (cur.length) pages.push(cur);
  return pages.length ? pages : [];
}
function justificationPage(items: PortfolioPackItem[], logo: string, page: number, total: number, first: boolean, partLabel: string): string {
  const head = first
    ? sectionHead('Evidence summary', 'Justification for each entry')
    : `<div class="chip-dark">EVIDENCE SUMMARY${partLabel}</div>`;
  return `<div class="page"><div class="content">${chead(logo)}${head}<div style="margin-top:14px">${items.map(jRow).join('')}</div>${cfoot(page, total)}</div></div>`;
}

/* ── declarations & authenticity ───────────────────────────────────────── */
function declarationsPage(d: PortfolioPackData, logo: string, page: number, total: number): string {
  const assessor = d.coverage?.assessors?.[0] ?? '';
  const iqa = d.coverage?.iqas?.[0] ?? '';
  const decl = (role: string, stmt: string, name: string) => `
    <div class="decl">
      <div class="role">${esc(role)}</div>
      <div class="stmt">${esc(stmt)}</div>
      <div class="sigrow">
        <div class="sig"><div class="lbl">Name</div><div class="line">${esc(name)}</div></div>
        <div class="sig"><div class="lbl">Signature</div><div class="line"></div></div>
        <div class="sig dt"><div class="lbl">Date</div><div class="line"></div></div>
      </div>
    </div>`;
  return `<div class="page"><div class="content">
    ${chead(logo)}
    ${sectionHead('Declarations', 'Authenticity & sign-off')}
    <div class="declintro">All evidence in this portfolio is assessed against the principles of <b>Valid, Authentic, Current, Sufficient and Reliable (VACSR)</b>. The declarations below confirm the authenticity and assessment of the evidence presented.</div>
    ${decl('Apprentice / learner', "I confirm that all the evidence in this portfolio is my own work and accurately reflects the work I have carried out. Where I have worked as part of a team, my own contribution is clearly identified. I understand the awarding organisation's policy on plagiarism and malpractice.", titleCase(d.learner.name || ''))}
    ${decl('Employer / workplace supervisor', 'I confirm that I have witnessed the apprentice carry out the work evidenced in this portfolio and that, to the best of my knowledge, it is an accurate and authentic record of their work.', d.learner.employer || '')}
    ${decl('Assessor', 'I confirm that I have assessed this evidence and judged it to be valid, authentic, current, sufficient and reliable, and that it meets the requirements of the qualification standard.', assessor)}
    ${decl('Internal Quality Assurer (IQA)', "I confirm that this portfolio has been internally quality assured in line with the centre's IQA strategy.", iqa)}
    <div class="declnote">Digital assessor and IQA confirmations recorded in Elec-Mate are reflected in the coverage map. Physical signatures may be added where your provider or awarding organisation requires them.</div>
    ${cfoot(page, total)}
  </div></div>`;
}

/* ── coverage map ──────────────────────────────────────────────────────── */
const TILE: Record<AcState, string> = {
  iqa_confirmed: 'iqa',
  signed_off: 'signed',
  evidenced: 'evid',
  referred: 'ref',
  not_yet: 'nty',
  in_progress: '',
  not_started: '',
};
function unitBlock(u: CoverageUnit): string {
  const tiles = u.acs.map((a) => `<span class="t ${TILE[a.state]}" title="AC ${esc(a.code)}"></span>`).join('');
  return `<div class="covu"><div class="covu-h"><div class="u"><b>${esc(u.unitCode)}</b>${esc(truncate(u.unitTitle || '', 58))}</div><div class="n">${u.done}/${u.total}</div></div><div class="tiles">${tiles}</div></div>`;
}
function uEstimate(u: CoverageUnit): number {
  const rows = Math.max(1, Math.ceil(u.acs.length / 39));
  return 24 + rows * 18 + 12;
}
function packUnits(units: CoverageUnit[]): CoverageUnit[][] {
  const FIRST = 760;
  const REST = 990;
  const pages: CoverageUnit[][] = [];
  let cur: CoverageUnit[] = [];
  let used = 0;
  let budget = FIRST;
  for (const u of units) {
    const h = uEstimate(u);
    if (cur.length && used + h > budget) {
      pages.push(cur);
      cur = [];
      used = 0;
      budget = REST;
    }
    cur.push(u);
    used += h;
  }
  if (cur.length) pages.push(cur);
  return pages.length ? pages : [[]];
}
function coverageHeader(cov: NonNullable<PortfolioPackData['coverage']>): string {
  const pct = cov.totalACs > 0 ? Math.round((cov.evidencedACs / cov.totalACs) * 100) : 0;
  const roll = `<div class="covroll">
    <div class="cr"><div class="v gold">${cov.counts.iqaConfirmed}</div><div class="k">IQA confirmed</div></div>
    <div class="cr"><div class="v gold">${cov.counts.signedOff}</div><div class="k">Signed off</div></div>
    <div class="cr"><div class="v">${cov.counts.evidenced}</div><div class="k">Evidenced</div></div>
    <div class="cr"><div class="v red">${cov.counts.referred}</div><div class="k">Referred</div></div>
    <div class="cr"><div class="v">${cov.counts.open}</div><div class="k">Open</div></div>
  </div>`;
  const pctline = `<div class="covpct"><b>${cov.evidencedACs} of ${cov.totalACs}</b> assessment criteria evidenced — <b>${pct}%</b> of ${esc(cov.qualificationName || 'the qualification')} covered.</div>`;
  const legend = `<div class="legend">
    <span class="lg"><i style="background:#f5c518;box-shadow:inset 0 0 0 2px #fff,0 0 0 1px #caa406"></i>IQA confirmed</span>
    <span class="lg"><i style="background:#f5c518"></i>Signed off</span>
    <span class="lg"><i style="background:#fdf3cf;border:1.5px solid #f5c518"></i>Evidenced</span>
    <span class="lg"><i style="background:#fde8e8;border:1.5px solid #ef4444"></i>Referred</span>
    <span class="lg"><i style="background:#eef1f5"></i>Open</span>
  </div>`;
  return roll + pctline + legend;
}
function coveragePage(
  cov: NonNullable<PortfolioPackData['coverage']>,
  units: CoverageUnit[],
  logo: string,
  page: number,
  total: number,
  first: boolean,
  partLabel: string
): string {
  const head = first
    ? sectionHead('Coverage map', 'Verified against every criterion') + coverageHeader(cov)
    : `<div class="chip-dark">COVERAGE MAP${partLabel}</div>`;
  return `<div class="page"><div class="content">${chead(logo)}${head}<div>${units.map(unitBlock).join('')}</div>${cfoot(page, total)}</div></div>`;
}

function contentsPage(
  d: PortfolioPackData,
  refs: { details: number; decl: number; coverage: number | null; evidence: number | null; justification: number | null },
  logo: string,
  page: number,
  total: number
): string {
  const tocRow = (label: string, pg: number | null) =>
    pg ? `<div class="toc"><span class="toc-l">${esc(label)}</span><span class="toc-d"></span><span class="toc-p">Page ${pg}</span></div>` : '';
  const cov = d.coverage;
  const units = cov ? cov.units.slice(0, 28) : [];
  const moreUnits = cov ? cov.units.length - units.length : 0;
  const unitRows = units
    .map((u) => {
      const pct = u.total > 0 ? Math.round((u.done / u.total) * 100) : 0;
      return `<div class="urow"><div class="uc"><b>${esc(u.unitCode)}</b>${esc(truncate(u.unitTitle || '', 52))}</div><div class="up"><span class="ubar"><i style="width:${pct}%"></i></span><span class="un">${u.done}/${u.total}</span></div></div>`;
    })
    .join('');
  return `<div class="page"><div class="content">
    ${chead(logo)}
    ${sectionHead('Contents', "What's in this pack")}
    <div class="tocs">
      ${tocRow('Learner & portfolio', refs.details)}
      ${tocRow('Declarations & authenticity', refs.decl)}
      ${tocRow('Coverage map', refs.coverage)}
      ${tocRow('Portfolio evidence', refs.evidence)}
      ${tocRow('Justification summary', refs.justification)}
    </div>
    ${cov ? `<div class="subh" style="margin-top:24px">Units &amp; coverage</div><div class="units">${unitRows}${moreUnits > 0 ? `<div class="crit-more" style="padding-left:0;margin-top:6px">+ ${moreUnits} more units</div>` : ''}</div>` : ''}
    ${cfoot(page, total)}
  </div></div>`;
}

export function buildPortfolioHtml(data: PortfolioPackData, logoDataUrl: string, generatedLabel: string): string {
  const covChunks = data.coverage && data.coverage.units.length ? packUnits(data.coverage.units) : [];
  const itemPages = packByHeight(data.items, 905, 985);
  const justPages = data.items.length ? packJustification(data.items) : [];
  const contentTotal = 3 + covChunks.length + itemPages.length + justPages.length;

  // Content-page numbers (1-based, matching the footer "Page X of total").
  const pContents = 1;
  const pDetails = 2;
  const pDecl = 3;
  const pCovStart = 4;
  const pEvidStart = pCovStart + covChunks.length;
  const pJustStart = pEvidStart + itemPages.length;
  const refs = {
    details: pDetails,
    decl: pDecl,
    coverage: covChunks.length ? pCovStart : null,
    evidence: itemPages.length ? pEvidStart : null,
    justification: justPages.length ? pJustStart : null,
  };

  const pages: string[] = [coverPage(data, logoDataUrl)];
  pages.push(contentsPage(data, refs, logoDataUrl, pContents, contentTotal));
  pages.push(detailsPage(data, logoDataUrl, pDetails, contentTotal, generatedLabel));
  pages.push(declarationsPage(data, logoDataUrl, pDecl, contentTotal));
  if (data.coverage) {
    covChunks.forEach((units, i) => {
      const part = covChunks.length > 1 ? ` · ${i + 1}/${covChunks.length}` : '';
      pages.push(coveragePage(data.coverage!, units, logoDataUrl, pCovStart + i, contentTotal, i === 0, part));
    });
  }
  itemPages.forEach((chunk, i) => {
    const part = itemPages.length > 1 ? ` · ${i + 1}/${itemPages.length}` : '';
    pages.push(evidencePage(chunk, logoDataUrl, pEvidStart + i, contentTotal, i === 0, part));
  });
  justPages.forEach((chunk, i) => {
    const part = justPages.length > 1 ? ` · ${i + 1}/${justPages.length}` : '';
    pages.push(justificationPage(chunk, logoDataUrl, pJustStart + i, contentTotal, i === 0, part));
  });

  const title = `${titleCase(data.learner.name || 'Apprentice')} - Portfolio of Evidence`;
  return `<!doctype html><html><head><meta charset="utf-8"/><title>${esc(title)}</title><style>@page{size:794px 1123px;margin:0}${STYLES}</style></head><body>${pages.join('')}</body></html>`;
}
