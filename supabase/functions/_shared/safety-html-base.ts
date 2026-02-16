/**
 * safety-html-base.ts
 * Base HTML template engine for professional safety document PDFs.
 * Matches the design language of the PDF Monkey invoice/quote templates.
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
}

interface KVItem {
  label: string;
  value: string;
}

interface CheckItem {
  label: string;
  passed: boolean;
  notes?: string;
}

interface SignatureParty {
  role: string;
  name?: string;
  date?: string;
  signatureDataUrl?: string;
}

// ── Colour maps ──────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<StatusColour, { bg: string; text: string }> = {
  success: { bg: '#dcfce7', text: '#166534' },
  warning: { bg: '#fef3c7', text: '#92400e' },
  danger: { bg: '#fee2e2', text: '#991b1b' },
  info: { bg: '#dbeafe', text: '#1e40af' },
  grey: { bg: '#f1f5f9', text: '#475569' },
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
  return `<div class="section-header">${esc(title)}</div>`;
}

export function kvGrid(items: KVItem[], cols = 2): string {
  const colClass = cols === 3 ? 'kv-grid-3' : 'kv-grid';
  const cards = items
    .map(
      (i) => `
    <div class="kv-card">
      <div class="kv-label">${esc(i.label)}</div>
      <div class="kv-value">${esc(i.value) || 'N/A'}</div>
    </div>`
    )
    .join('');
  return `<div class="${colClass}">${cards}</div>`;
}

export function textBox(text: string, accentColour = '#f59e0b'): string {
  return `
    <div class="text-box" style="border-left-color: ${accentColour};">
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
    .map((row) => {
      const tds = row.map((cell) => `<td>${esc(cell)}</td>`).join('');
      return `<tr>${tds}</tr>`;
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
      <div class="check-icon ${i.passed ? 'check-pass' : 'check-fail'}">
        ${i.passed ? '&#10003;' : '&#10007;'}
      </div>
      <div class="check-content">
        <span class="check-label">${esc(i.label)}</span>
        ${i.notes ? `<span class="check-notes">${esc(String(i.notes))}</span>` : ''}
      </div>
    </div>`
    )
    .join('');
  return `<div class="checklist">${rows}</div>`;
}

export function badges(items: string[], colour = '#f59e0b'): string {
  const tags = items
    .map(
      (i) =>
        `<span class="badge-tag" style="background: ${colour}15; color: ${colour}; border-color: ${colour}40;">${esc(i)}</span>`
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
        <span>${esc(p.name) || 'Name: ___________________'}</span>
        <span>${esc(p.date) || 'Date: ___________________'}</span>
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

  // Company logo — prefer public URL (lighter payload), fall back to data URL
  const logoSrc = branding.logo_url || branding.logo_data_url;
  const logoHtml = logoSrc
    ? `<img src="${logoSrc}" alt="" class="header-logo" />`
    : '';

  // Scheme logo (NAPIT, NICEIC, etc.)
  const schemeLogoHtml = branding.scheme_logo_data_url
    ? `<img src="${branding.scheme_logo_data_url}" alt="${esc(branding.registration_scheme || '')}" class="scheme-logo" />`
    : '';

  const companyName = branding.company_name || 'Elec-Mate';

  // Build address line
  const addressParts: string[] = [];
  if (branding.company_address) addressParts.push(esc(branding.company_address));
  if (branding.company_postcode) addressParts.push(esc(branding.company_postcode));
  const addressLine = addressParts.join(', ');

  // Build contact line
  const contactParts: string[] = [];
  if (branding.company_phone) contactParts.push(`Tel: ${esc(branding.company_phone)}`);
  if (branding.company_email) contactParts.push(esc(branding.company_email));
  if (branding.company_website) contactParts.push(esc(branding.company_website));
  const contactLine = contactParts.join(' &nbsp;&#183;&nbsp; ');

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
    font-size: 11px; color: #1f2937; line-height: 1.5; background: #fff;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  @page { size: A4; margin: 12mm 0 10mm 0; }
  @page:first { margin-top: 0; }

  .page { padding: 0 32px 24px; max-width: 210mm; margin: 0 auto; }

  /* ── Header — top tier: company branding ────────────── */
  .header-brand {
    background: linear-gradient(135deg, ${secondary} 0%, #1e293b 50%, #334155 100%);
    color: #fff; padding: 18px 32px 14px; display: flex;
    justify-content: space-between; align-items: center;
  }
  .header-brand-left { display: flex; align-items: center; gap: 14px; }
  .header-logo {
    width: 48px; height: 48px; object-fit: contain;
    border-radius: 8px; background: rgba(255,255,255,0.1);
    border: 1.5px solid rgba(255,255,255,0.15);
  }
  .header-company-info {}
  .header-company-name {
    font-size: 18px; font-weight: 800; letter-spacing: -0.3px; line-height: 1.2;
  }
  .header-address {
    font-size: 8.5px; opacity: 0.6; margin-top: 3px; letter-spacing: 0.2px;
  }
  .header-brand-right { display: flex; align-items: center; gap: 12px; }
  .scheme-logo {
    max-width: 60px; max-height: 40px; object-fit: contain;
    border-radius: 4px;
  }

  /* ── Header — bottom tier: document title ───────────── */
  .header-title-bar {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    border-top: 1px solid rgba(255,255,255,0.08);
    border-bottom: 3px solid ${primary};
    padding: 10px 32px 10px; display: flex;
    justify-content: space-between; align-items: center;
  }
  .header-title-left { display: flex; align-items: center; gap: 16px; }
  .header-doc-title {
    font-size: 14px; font-weight: 800; color: #fff;
    text-transform: uppercase; letter-spacing: 0.8px;
  }
  .header-title-right { display: flex; align-items: center; gap: 12px; }
  .status-badge {
    display: inline-block; padding: 4px 16px; border-radius: 9999px;
    font-size: 8.5px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.8px;
    background: ${badge.bg}; color: ${badge.text};
  }
  .header-ref {
    font-size: 8px; color: rgba(255,255,255,0.4);
    font-family: 'Courier New', monospace; letter-spacing: 0.5px;
  }

  /* ── Sections ──────────────────────────────────────── */
  .section-header {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    border-left: 4px solid ${primary};
    color: #fff; padding: 10px 18px; font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.8px;
    border-radius: 6px; margin: 18px 0 10px;
    page-break-after: avoid;
  }
  .page > .section-header:first-child { margin-top: 14px; }

  /* ── Key-value grid ────────────────────────────────── */
  .kv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; }
  .kv-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 8px; }
  .kv-card {
    background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;
    padding: 10px 14px; page-break-inside: avoid;
  }
  .kv-label {
    font-size: 7.5px; color: #94a3b8; text-transform: uppercase;
    letter-spacing: 0.5px; margin-bottom: 3px; font-weight: 600;
  }
  .kv-value { font-size: 11px; color: #0f172a; font-weight: 600; word-break: break-word; }

  /* ── Text box ──────────────────────────────────────── */
  .text-box {
    background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #f59e0b;
    border-radius: 0 8px 8px 0; padding: 14px 18px; margin: 10px 0;
    page-break-inside: avoid;
  }
  .text-box p { font-size: 10.5px; line-height: 1.7; color: #334155; }

  /* ── Warning banner ────────────────────────────────── */
  .warning-banner {
    background: linear-gradient(135deg, #fee2e2, #fecaca); border: 2px solid #ef4444;
    border-radius: 8px; padding: 14px 18px; display: flex; align-items: center;
    gap: 14px; margin: 16px 0; page-break-inside: avoid;
  }
  .warning-icon { font-size: 24px; flex-shrink: 0; }
  .warning-text { font-size: 11px; font-weight: 700; color: #991b1b; line-height: 1.5; }

  /* ── Table ─────────────────────────────────────────── */
  .data-table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 10px 0; font-size: 10px; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; }
  .data-table th {
    background: linear-gradient(135deg, #0f172a, #1e293b); color: #fff;
    padding: 10px 14px; text-align: left;
    font-size: 8.5px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
  }
  .data-table td { padding: 9px 14px; border-bottom: 1px solid #f1f5f9; color: #334155; }
  .data-table tr:nth-child(even) { background: #f8fafc; }
  .data-table tr:last-child td { border-bottom: none; }

  /* ── Checklist ─────────────────────────────────────── */
  .checklist { margin: 10px 0; background: #fafbfc; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
  .check-row {
    display: flex; align-items: flex-start; gap: 12px; padding: 9px 14px;
    border-bottom: 1px solid #f1f5f9;
  }
  .check-row:last-child { border-bottom: none; }
  .check-icon {
    width: 22px; height: 22px; border-radius: 50%; display: flex;
    align-items: center; justify-content: center; font-size: 12px;
    font-weight: 800; flex-shrink: 0; margin-top: 0;
  }
  .check-pass { background: #dcfce7; color: #166534; }
  .check-fail { background: #fee2e2; color: #991b1b; }
  .check-label { font-size: 10.5px; color: #1f2937; font-weight: 500; line-height: 1.5; }
  .check-notes { display: block; font-size: 9px; color: #64748b; margin-top: 2px; font-style: italic; }

  /* ── Badges / tags ─────────────────────────────────── */
  .badge-list { display: flex; flex-wrap: wrap; gap: 6px; margin: 10px 0; }
  .badge-tag {
    display: inline-block; padding: 5px 14px; border-radius: 9999px;
    font-size: 9.5px; font-weight: 600; border: 1.5px solid;
  }

  /* ── Bullet list ───────────────────────────────────── */
  .bullet-list { margin: 10px 0 10px 8px; list-style: none; }
  .bullet-list li {
    padding: 5px 0 5px 18px; font-size: 10.5px; color: #334155;
    position: relative; line-height: 1.6;
  }
  .bullet-list li::before {
    content: ''; position: absolute; left: 0; top: 12px;
    width: 7px; height: 7px; background: ${primary}; border-radius: 50%;
  }

  /* ── Signature block ───────────────────────────────── */
  .sig-container { display: flex; gap: 20px; margin: 14px 0; }
  .sig-block {
    flex: 1; background: #f8fafc; border: 1px solid #e2e8f0;
    border-radius: 10px; padding: 16px 18px; page-break-inside: avoid;
  }
  .sig-role {
    font-size: 8px; text-transform: uppercase; letter-spacing: 0.6px;
    color: #94a3b8; font-weight: 700; margin-bottom: 10px;
  }
  .sig-line { border-bottom: 1.5px solid #cbd5e1; margin-bottom: 10px; height: 32px; }
  .sig-image { height: 40px; margin-bottom: 10px; }
  .sig-image img { max-height: 40px; max-width: 160px; object-fit: contain; }
  .sig-details { display: flex; justify-content: space-between; font-size: 9px; color: #64748b; font-weight: 500; }

  /* ── Body text ─────────────────────────────────────── */
  .body-text { font-size: 10.5px; line-height: 1.7; color: #334155; margin: 8px 0; }
  .text-secondary { color: #94a3b8; font-style: italic; }

  /* ── Footnotes ─────────────────────────────────────── */
  .footnote-text {
    font-size: 7.5px; color: #94a3b8; margin-top: 16px;
    padding-top: 10px; border-top: 1px solid #e2e8f0; line-height: 1.6;
  }

  /* ── Footer ────────────────────────────────────────── */
  .doc-footer {
    margin-top: 24px; padding-top: 14px; border-top: 2px solid #e2e8f0;
    display: flex; justify-content: space-between; align-items: flex-end;
    font-size: 7.5px; color: #94a3b8;
  }
  .doc-footer-brand { color: ${primary}; font-weight: 800; font-size: 9px; }
  .doc-footer-ref { font-family: 'Courier New', monospace; font-size: 7px; letter-spacing: 0.3px; }

  /* ── Print / page break helpers ─────────────────────── */
  .page-break { page-break-before: always; }
  .no-break { page-break-inside: avoid; }
</style>
</head>
<body>

<!-- Header — Top Tier: Company Branding -->
<div class="header-brand">
  <div class="header-brand-left">
    ${logoHtml}
    <div class="header-company-info">
      <div class="header-company-name">${esc(companyName)}</div>
      ${addressLine ? `<div class="header-address">${addressLine}</div>` : ''}
    </div>
  </div>
  <div class="header-brand-right">
    ${schemeLogoHtml}
  </div>
</div>

<!-- Header — Bottom Tier: Document Title -->
<div class="header-title-bar">
  <div class="header-title-left">
    <div class="header-doc-title">${esc(title)}</div>
  </div>
  <div class="header-title-right">
    <div class="status-badge">${esc(statusLabel)}</div>
    <div class="header-ref">REF ${esc(refId.substring(0, 8).toUpperCase())}</div>
  </div>
</div>

<!-- Body -->
<div class="page">
  ${bodyHtml}

  ${footerNote ? `<div class="footnote-text">${esc(footerNote)}</div>` : ''}

  <!-- Audit Footer -->
  <div class="doc-footer">
    <div>
      <span class="doc-footer-brand">ELEC-MATE</span> &mdash; Generated electronically
      ${branding.company_registration ? `<br />Company Reg: ${esc(branding.company_registration)}` : ''}
      ${branding.vat_number ? ` &nbsp;&#183;&nbsp; VAT: ${esc(branding.vat_number)}` : ''}
      ${contactLine ? `<br />${contactLine}` : ''}
    </div>
    <div style="text-align: right;">
      <div class="doc-footer-ref">${esc(refId)}</div>
      <div style="margin-top: 2px;">${esc(now)}</div>
    </div>
  </div>
</div>

</body>
</html>`;
}
