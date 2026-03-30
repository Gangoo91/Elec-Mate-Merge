/**
 * safety-html-base.ts
 * Professional safety document PDF template engine.
 * Designed to match Tier 1 contractor document standards (Balfour Beatty, Kier, Morgan Sindall).
 * Company-branded with user's business details from company_profiles.
 */

// ── Types ────────────────────────────────────────────────────────────────────

export type StatusColour = 'success' | 'warning' | 'danger' | 'info' | 'grey';

export interface Branding {
  company_name?: string;
  company_address?: string;
  company_postcode?: string;
  company_phone?: string;
  company_email?: string;
  company_website?: string;
  company_registration?: string;
  vat_number?: string;
  logo_data_url?: string;
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  scheme_logo_data_url?: string;
  registration_scheme?: string;
  registration_number?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
  insurance_expiry?: string;
}

interface KVItem {
  label: string;
  value: string;
}

interface CheckItem {
  label: string;
  passed: boolean;
  na?: boolean;
  notes?: string;
}

interface SignatureParty {
  role: string;
  name?: string;
  date?: string;
  signatureDataUrl?: string;
}

// ── Colour maps ──────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<StatusColour, { bg: string; text: string; border: string }> = {
  success: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
  warning: { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
  danger: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
  info: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
  grey: { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' },
};

// ── Escape helper ────────────────────────────────────────────────────────────

function esc(s: string | null | undefined): string {
  if (!s) return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Component helpers (return HTML strings) ──────────────────────────────────

export function sectionHeader(title: string): string {
  return `<div class="section-header"><span class="section-header-text">${esc(title)}</span></div>`;
}

export function kvGrid(items: KVItem[], cols = 2): string {
  const colClass = cols === 3 ? 'kv-grid kv-grid-3' : cols === 4 ? 'kv-grid kv-grid-4' : 'kv-grid';
  const cards = items
    .map(
      (i) => `
    <div class="kv-card">
      <div class="kv-label">${esc(i.label)}</div>
      <div class="kv-value">${esc(i.value) || '<span class="na-text">N/A</span>'}</div>
    </div>`
    )
    .join('');
  return `<div class="${colClass}">${cards}</div>`;
}

export function textBox(text: string, accentColour?: string): string {
  const borderStyle = accentColour ? `border-left-color: ${accentColour};` : '';
  return `
    <div class="text-box" style="${borderStyle}">
      <p>${esc(text)}</p>
    </div>`;
}

export function warningBanner(text: string): string {
  return `
    <div class="warning-banner">
      <div class="warning-icon">&#9888;</div>
      <div class="warning-text"><strong>WARNING:</strong> ${esc(text)}</div>
    </div>`;
}

export function dataTable(headers: string[], rows: string[][]): string {
  const ths = headers.map((h) => `<th>${esc(h)}</th>`).join('');
  const trs = rows
    .map((row, idx) => {
      const tds = row.map((cell) => `<td>${esc(cell)}</td>`).join('');
      return `<tr class="${idx % 2 === 0 ? 'row-even' : 'row-odd'}">${tds}</tr>`;
    })
    .join('');
  return `
    <table class="data-table">
      <thead><tr>${ths}</tr></thead>
      <tbody>${trs}</tbody>
    </table>`;
}

export function checklist(items: CheckItem[]): string {
  const rows = items
    .map(
      (i) => `
    <div class="check-row">
      <div class="check-icon ${i.na ? 'check-na' : i.passed ? 'check-pass' : 'check-fail'}">
        ${i.na ? '&#8212;' : i.passed ? '&#10003;' : '&#10007;'}
      </div>
      <div class="check-content">
        <span class="check-label">${esc(i.label)}</span>
        ${i.notes ? `<span class="check-notes">${esc(String(i.notes))}</span>` : ''}
      </div>
      <div class="check-status-text ${i.na ? 'status-na' : i.passed ? 'status-pass' : 'status-fail'}">
        ${i.na ? 'N/A' : i.passed ? 'PASS' : 'FAIL'}
      </div>
    </div>`
    )
    .join('');
  return `<div class="checklist">${rows}</div>`;
}

/** Summary stat boxes — e.g. 21 Pass, 0 Fail, 0 N/A */
export function statBoxes(items: { label: string; value: string | number; colour: StatusColour }[]): string {
  const boxes = items
    .map((i) => {
      const c = STATUS_BADGE[i.colour];
      return `<div class="stat-box" style="background: ${c.bg}; border-color: ${c.border};">
        <div class="stat-value" style="color: ${c.text};">${esc(String(i.value))}</div>
        <div class="stat-label" style="color: ${c.text};">${esc(i.label)}</div>
      </div>`;
    })
    .join('');
  return `<div class="stat-row">${boxes}</div>`;
}

export function badges(items: string[], colour = '#f59e0b'): string {
  const tags = items
    .map(
      (i) =>
        `<span class="badge-tag" style="background: ${colour}12; color: ${colour}; border-color: ${colour}30;">${esc(i)}</span>`
    )
    .join('');
  return `<div class="badge-list">${tags}</div>`;
}

export function bulletList(items: string[]): string {
  const lis = items.map((i) => `<li>${esc(i)}</li>`).join('');
  return `<ul class="bullet-list">${lis}</ul>`;
}

export function signatureBlock(parties: SignatureParty[]): string {
  const blocks = parties
    .map(
      (p) => `
    <div class="sig-block">
      <div class="sig-role">${esc(p.role)}</div>
      ${
        p.signatureDataUrl
          ? `<div class="sig-image"><img src="${p.signatureDataUrl}" alt="Signature" /></div>`
          : `<div class="sig-line"></div>`
      }
      <div class="sig-details">
        <div class="sig-detail-row"><span class="sig-detail-label">Name:</span> <span>${esc(p.name) || '___________________'}</span></div>
        <div class="sig-detail-row"><span class="sig-detail-label">Date:</span> <span>${esc(p.date) || '___________________'}</span></div>
      </div>
    </div>`
    )
    .join('');
  return `<div class="sig-container">${blocks}</div>`;
}

export function paragraph(text: string, secondary = false): string {
  return `<p class="body-text${secondary ? ' text-secondary' : ''}">${esc(text)}</p>`;
}

export function footnote(text: string): string {
  return `<div class="footnote-text">${esc(text)}</div>`;
}

/** Page break — insert between major sections */
export function pageBreak(): string {
  return '<div class="page-break"></div>';
}

// ── Base page wrapper ────────────────────────────────────────────────────────

export function renderPage(opts: {
  title: string;
  refId: string;
  statusLabel: string;
  statusColour: StatusColour;
  branding: Branding;
  bodyHtml: string;
  footerNote?: string;
}): string {
  const { title, refId, statusLabel, statusColour, branding, bodyHtml, footerNote } = opts;
  const primary = branding.primary_color || '#f59e0b';
  const secondary = branding.secondary_color || '#0f172a';
  const badge = STATUS_BADGE[statusColour];
  const now = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });

  const logoSrc = branding.logo_url || branding.logo_data_url;
  const logoHtml = logoSrc
    ? `<img src="${logoSrc}" alt="" class="header-logo" />`
    : '';

  const schemeLogoHtml = branding.scheme_logo_data_url
    ? `<img src="${branding.scheme_logo_data_url}" alt="${esc(branding.registration_scheme || '')}" class="scheme-logo" />`
    : '';

  const companyName = branding.company_name || 'Company Name';

  // Address
  const addressParts: string[] = [];
  if (branding.company_address) addressParts.push(esc(branding.company_address));
  if (branding.company_postcode) addressParts.push(esc(branding.company_postcode));
  const addressLine = addressParts.join(', ');

  // Contact
  const contactParts: string[] = [];
  if (branding.company_phone) contactParts.push(esc(branding.company_phone));
  if (branding.company_email) contactParts.push(esc(branding.company_email));
  if (branding.company_website) contactParts.push(esc(branding.company_website));

  // Registration & Insurance
  const regParts: string[] = [];
  if (branding.registration_scheme && branding.registration_number)
    regParts.push(`${esc(branding.registration_scheme)}: ${esc(branding.registration_number)}`);
  if (branding.company_registration) regParts.push(`Co. Reg: ${esc(branding.company_registration)}`);
  if (branding.vat_number) regParts.push(`VAT: ${esc(branding.vat_number)}`);

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<style>
  /* ── Reset ─────────────────────────────────────────── */
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 10.5px; color: #1e293b; line-height: 1.55; background: #fff;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  @page { size: A4; margin: 0; }

  .page { padding: 0 28px 20px; max-width: 210mm; margin: 0 auto; }

  /* ── Header — Company bar ──────────────────────────── */
  .header-brand {
    background: ${secondary};
    color: #fff; padding: 20px 28px 16px;
    display: flex; justify-content: space-between; align-items: flex-start;
  }
  .header-brand-left { display: flex; align-items: center; gap: 16px; }
  .header-logo {
    width: 52px; height: 52px; object-fit: contain;
    border-radius: 6px; background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
  }
  .header-company-name {
    font-size: 20px; font-weight: 800; letter-spacing: -0.3px; line-height: 1.15;
  }
  .header-address {
    font-size: 8px; opacity: 0.55; margin-top: 4px; letter-spacing: 0.3px;
  }
  .header-contact {
    font-size: 7.5px; opacity: 0.45; margin-top: 2px; letter-spacing: 0.2px;
  }
  .header-brand-right {
    display: flex; flex-direction: column; align-items: flex-end; gap: 6px;
  }
  .scheme-logo {
    max-width: 64px; max-height: 44px; object-fit: contain; border-radius: 4px;
  }
  .header-reg {
    font-size: 7px; opacity: 0.4; text-align: right; letter-spacing: 0.2px; line-height: 1.5;
  }

  /* ── Header — Document title bar ───────────────────── */
  .header-title-bar {
    background: #fff;
    border-bottom: 3px solid ${primary};
    padding: 12px 28px; display: flex;
    justify-content: space-between; align-items: center;
  }
  .header-doc-title {
    font-size: 13px; font-weight: 800; color: ${secondary};
    text-transform: uppercase; letter-spacing: 1px;
  }
  .header-title-right { display: flex; align-items: center; gap: 12px; }
  .status-badge {
    display: inline-block; padding: 4px 16px; border-radius: 4px;
    font-size: 8px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.8px; border: 1.5px solid;
    background: ${badge.bg}; color: ${badge.text}; border-color: ${badge.border};
  }
  .header-ref {
    font-size: 7.5px; color: #94a3b8;
    font-family: 'Courier New', monospace; letter-spacing: 0.5px;
  }
  .header-date {
    font-size: 7.5px; color: #64748b; font-weight: 500;
  }

  /* ── Sections ──────────────────────────────────────── */
  .section-header {
    background: ${secondary};
    border-left: 4px solid ${primary};
    color: #fff; padding: 9px 16px; font-size: 10px;
    text-transform: uppercase; letter-spacing: 0.8px;
    border-radius: 3px; margin: 20px 0 10px;
    page-break-after: avoid;
  }
  .section-header-text { font-weight: 700; }
  .page > .section-header:first-child { margin-top: 16px; }

  /* ── Stat boxes ────────────────────────────────────── */
  .stat-row {
    display: flex; gap: 10px; margin: 12px 0 16px;
  }
  .stat-box {
    flex: 1; text-align: center; padding: 12px 8px; border-radius: 6px;
    border: 1.5px solid; page-break-inside: avoid;
  }
  .stat-value { font-size: 22px; font-weight: 800; line-height: 1.2; }
  .stat-label { font-size: 7.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px; }

  /* ── Key-value grid ────────────────────────────────── */
  .kv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px; }
  .kv-grid-3 { grid-template-columns: 1fr 1fr 1fr; }
  .kv-grid-4 { grid-template-columns: 1fr 1fr 1fr 1fr; }
  .kv-card {
    background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px;
    padding: 8px 12px; page-break-inside: avoid;
  }
  .kv-label {
    font-size: 7px; color: #64748b; text-transform: uppercase;
    letter-spacing: 0.5px; margin-bottom: 2px; font-weight: 600;
  }
  .kv-value { font-size: 10.5px; color: #0f172a; font-weight: 600; word-break: break-word; }
  .na-text { color: #94a3b8; font-weight: 400; font-style: italic; }

  /* ── Text box ──────────────────────────────────────── */
  .text-box {
    background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid ${primary};
    border-radius: 0 4px 4px 0; padding: 12px 16px; margin: 10px 0;
    page-break-inside: avoid;
  }
  .text-box p { font-size: 10px; line-height: 1.65; color: #334155; }

  /* ── Warning banner ────────────────────────────────── */
  .warning-banner {
    background: #fff5f5; border: 1.5px solid #ef4444;
    border-radius: 4px; padding: 12px 16px; display: flex; align-items: flex-start;
    gap: 12px; margin: 14px 0; page-break-inside: avoid;
  }
  .warning-icon { font-size: 20px; flex-shrink: 0; line-height: 1; }
  .warning-text { font-size: 10px; font-weight: 600; color: #991b1b; line-height: 1.5; }

  /* ── Table ─────────────────────────────────────────── */
  .data-table {
    width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 10px;
    border: 1px solid #d1d5db; border-radius: 4px; overflow: hidden;
  }
  .data-table th {
    background: ${secondary}; color: #fff;
    padding: 8px 12px; text-align: left;
    font-size: 8px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
    border-bottom: 2px solid ${primary};
  }
  .data-table td {
    padding: 7px 12px; border-bottom: 1px solid #e5e7eb; color: #374151;
  }
  .row-even { background: #fff; }
  .row-odd { background: #f9fafb; }
  .data-table tr:last-child td { border-bottom: none; }

  /* ── Checklist ─────────────────────────────────────── */
  .checklist {
    margin: 10px 0; border: 1px solid #d1d5db; border-radius: 4px; overflow: hidden;
  }
  .check-row {
    display: flex; align-items: center; gap: 10px; padding: 7px 12px;
    border-bottom: 1px solid #f1f5f9; page-break-inside: avoid;
  }
  .check-row:nth-child(odd) { background: #fff; }
  .check-row:nth-child(even) { background: #f9fafb; }
  .check-row:last-child { border-bottom: none; }
  .check-icon {
    width: 20px; height: 20px; border-radius: 50%; display: flex;
    align-items: center; justify-content: center; font-size: 11px;
    font-weight: 800; flex-shrink: 0;
  }
  .check-pass { background: #dcfce7; color: #166534; }
  .check-fail { background: #fee2e2; color: #991b1b; }
  .check-na { background: #f1f5f9; color: #64748b; }
  .check-content { flex: 1; min-width: 0; }
  .check-label { font-size: 10px; color: #1e293b; font-weight: 500; line-height: 1.4; }
  .check-notes { display: block; font-size: 8.5px; color: #64748b; margin-top: 1px; font-style: italic; }
  .check-status-text {
    font-size: 7.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
    flex-shrink: 0; padding: 2px 8px; border-radius: 3px;
  }
  .status-pass { background: #dcfce7; color: #166534; }
  .status-fail { background: #fee2e2; color: #991b1b; }
  .status-na { background: #f1f5f9; color: #64748b; }

  /* ── Badges / tags ─────────────────────────────────── */
  .badge-list { display: flex; flex-wrap: wrap; gap: 5px; margin: 8px 0; }
  .badge-tag {
    display: inline-block; padding: 3px 12px; border-radius: 3px;
    font-size: 9px; font-weight: 600; border: 1px solid;
  }

  /* ── Bullet list ───────────────────────────────────── */
  .bullet-list { margin: 8px 0 8px 4px; list-style: none; }
  .bullet-list li {
    padding: 4px 0 4px 16px; font-size: 10px; color: #374151;
    position: relative; line-height: 1.55;
  }
  .bullet-list li::before {
    content: ''; position: absolute; left: 0; top: 10px;
    width: 5px; height: 5px; background: ${primary}; border-radius: 50%;
  }

  /* ── Signature block ───────────────────────────────── */
  .sig-container { display: flex; gap: 16px; margin: 14px 0; }
  .sig-block {
    flex: 1; background: #fff; border: 1.5px solid #d1d5db;
    border-radius: 4px; padding: 14px 16px; page-break-inside: avoid;
  }
  .sig-role {
    font-size: 8px; text-transform: uppercase; letter-spacing: 0.6px;
    color: #64748b; font-weight: 700; margin-bottom: 8px;
    padding-bottom: 4px; border-bottom: 1px solid #e5e7eb;
  }
  .sig-line {
    border-bottom: 1px dashed #94a3b8; margin-bottom: 10px; height: 36px;
  }
  .sig-image { height: 44px; margin-bottom: 8px; }
  .sig-image img { max-height: 44px; max-width: 180px; object-fit: contain; }
  .sig-details { font-size: 9px; color: #374151; }
  .sig-detail-row { margin-bottom: 2px; }
  .sig-detail-label { font-weight: 600; color: #64748b; font-size: 7.5px; text-transform: uppercase; letter-spacing: 0.3px; }

  /* ── Body text ─────────────────────────────────────── */
  .body-text { font-size: 10px; line-height: 1.65; color: #374151; margin: 6px 0; }
  .text-secondary { color: #94a3b8; font-style: italic; }

  /* ── Footnotes ─────────────────────────────────────── */
  .footnote-text {
    font-size: 7.5px; color: #94a3b8; margin-top: 14px;
    padding-top: 8px; border-top: 1px solid #e5e7eb; line-height: 1.5;
  }

  /* ── Document footer ──────────────────────────────── */
  .doc-footer {
    margin-top: 20px; padding-top: 12px; border-top: 1.5px solid #d1d5db;
    font-size: 7.5px; color: #94a3b8; line-height: 1.6;
  }
  .doc-footer-row {
    display: flex; justify-content: space-between; align-items: flex-start;
  }
  .doc-footer-ref {
    font-family: 'Courier New', monospace; font-size: 7px; letter-spacing: 0.3px;
  }

  /* ── Print / page break helpers ─────────────────────── */
  .page-break { page-break-before: always; }
  .no-break { page-break-inside: avoid; }
</style>
</head>
<body>

<!-- Header — Company Bar -->
<div class="header-brand">
  <div class="header-brand-left">
    ${logoHtml}
    <div>
      <div class="header-company-name">${esc(companyName)}</div>
      ${addressLine ? `<div class="header-address">${addressLine}</div>` : ''}
      ${contactParts.length > 0 ? `<div class="header-contact">${contactParts.join(' &nbsp;&#183;&nbsp; ')}</div>` : ''}
    </div>
  </div>
  <div class="header-brand-right">
    ${schemeLogoHtml}
    ${regParts.length > 0 ? `<div class="header-reg">${regParts.join('<br />')}</div>` : ''}
  </div>
</div>

<!-- Header — Document Title Bar -->
<div class="header-title-bar">
  <div>
    <div class="header-doc-title">${esc(title)}</div>
    <div class="header-date">Generated: ${esc(now)}</div>
  </div>
  <div class="header-title-right">
    <div class="status-badge">${esc(statusLabel)}</div>
    <div class="header-ref">REF: ${esc(refId.substring(0, 8).toUpperCase())}</div>
  </div>
</div>

<!-- Body -->
<div class="page">
  ${bodyHtml}

  ${footerNote ? `<div class="footnote-text">${esc(footerNote)}</div>` : ''}

  <!-- Document Footer -->
  <div class="doc-footer">
    <div class="doc-footer-row">
      <div>
        ${branding.company_registration ? `Company Reg: ${esc(branding.company_registration)}` : ''}
        ${branding.vat_number ? ` &nbsp;&#183;&nbsp; VAT: ${esc(branding.vat_number)}` : ''}
        ${branding.insurance_provider ? `<br />Insured by: ${esc(branding.insurance_provider)}${branding.insurance_policy_number ? ` (${esc(branding.insurance_policy_number)})` : ''}` : ''}
      </div>
      <div style="text-align: right;">
        <div class="doc-footer-ref">REF: ${esc(refId)}</div>
        <div style="margin-top: 2px;">${esc(now)}</div>
      </div>
    </div>
  </div>
</div>

</body>
</html>`;
}
