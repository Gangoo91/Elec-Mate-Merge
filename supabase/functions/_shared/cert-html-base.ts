/**
 * cert-html-base.ts
 * Certificate-specific HTML template engine for BS 7671 electrical certificates.
 * Purpose-built for professional electrical certification documents.
 *
 * Used by all certificate templates (Minor Works, EIC, EICR, etc.)
 * via Gotenberg HTML→PDF rendering.
 */

// ── Types ────────────────────────────────────────────────────────────────

export interface CertPageOpts {
  /** Document title, e.g. "Minor Electrical Installation Works Certificate" */
  title: string;
  /** Subtitle line, e.g. "BS 7671:2018+A2:2022 | IET Wiring Regulations" */
  subtitle?: string;
  /** Certificate number */
  certNumber?: string;
  /** Company branding */
  branding?: CertBranding;
  /** Inner body HTML */
  body: string;
  /** Footer note text */
  footerNote?: string;
}

export interface CertBranding {
  name?: string;
  logo_url?: string;
  phone?: string;
  email?: string;
  address?: string;
  registration_no?: string;
  tagline?: string;
  accent_color?: string;
  website?: string;
  scheme_logo?: string;
}

export interface CertKVItem {
  label: string;
  value: string;
  /** Span 2 columns */
  wide?: boolean;
}

export interface TestRow {
  /** Cells in order matching headers */
  cells: string[];
  /** Highlight row (e.g. for failures) */
  highlight?: boolean;
}

export interface DeclarationData {
  name?: string;
  company?: string;
  position?: string;
  date?: string;
  signature?: string;
  qualification?: string;
  scheme?: string;
  regNumber?: string;
  declarations?: CertCheckItem[];
}

export interface CertCheckItem {
  text: string;
  checked: boolean;
  notes?: string;
}

// ── Escape helper ────────────────────────────────────────────────────────

function esc(s: string | null | undefined): string {
  if (!s) return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Display value — show 'N/A' for empty strings */
function val(s: string | null | undefined): string {
  const escaped = esc(s);
  return escaped || 'N/A';
}

// ── Component functions ──────────────────────────────────────────────────

/** Numbered section header matching BS 7671 certificate structure */
export function certSection(num: number, title: string): string {
  return `<div class="cert-section-header">
  <span class="cert-section-num">${num}</span>
  <span class="cert-section-title">${esc(title)}</span>
</div>`;
}

/** Key-value grid for field data (2 or 3 columns) */
export function certKV(items: CertKVItem[], cols = 2): string {
  const colClass = cols === 3 ? 'cert-kv-grid-3' : 'cert-kv-grid';
  const cards = items
    .map(
      (i) => `<div class="cert-kv-card${i.wide ? ' cert-kv-wide' : ''}">
      <div class="cert-kv-label">${esc(i.label)}</div>
      <div class="cert-kv-value">${val(i.value)}</div>
    </div>`
    )
    .join('');
  return `<div class="${colClass}">${cards}</div>`;
}

/** Specialised table for test results with units */
export function certTestTable(headers: string[], rows: TestRow[]): string {
  const ths = headers.map((h) => `<th>${esc(h)}</th>`).join('');
  const trs = rows
    .map((row) => {
      const cls = row.highlight ? ' class="cert-test-highlight"' : '';
      const tds = row.cells.map((cell) => `<td>${val(cell)}</td>`).join('');
      return `<tr${cls}>${tds}</tr>`;
    })
    .join('');
  return `<table class="cert-test-table">
  <thead><tr>${ths}</tr></thead>
  <tbody>${trs}</tbody>
</table>`;
}

/** Declaration block with signature image and compliance checks */
export function certDeclaration(decl: DeclarationData): string {
  let checksHtml = '';
  if (decl.declarations && decl.declarations.length > 0) {
    checksHtml = certChecklist(decl.declarations);
  }

  const sigHtml = decl.signature
    ? `<div class="cert-sig-image"><img src="${decl.signature}" alt="Signature" /></div>`
    : '<div class="cert-sig-line"></div>';

  return `<div class="cert-declaration no-break">
  ${checksHtml}
  <div class="cert-sig-container">
    <div class="cert-sig-block">
      <div class="cert-sig-role">Signed</div>
      ${sigHtml}
      <div class="cert-sig-details">
        <div class="cert-sig-row"><span class="cert-sig-label">Name:</span> ${val(decl.name)}</div>
        <div class="cert-sig-row"><span class="cert-sig-label">Position:</span> ${val(decl.position)}</div>
        <div class="cert-sig-row"><span class="cert-sig-label">For and on behalf of:</span> ${val(decl.company)}</div>
        <div class="cert-sig-row"><span class="cert-sig-label">Date:</span> ${val(decl.date)}</div>
      </div>
    </div>
    <div class="cert-sig-block">
      <div class="cert-sig-role">Qualifications</div>
      <div class="cert-sig-details">
        <div class="cert-sig-row"><span class="cert-sig-label">Qualification:</span> ${val(decl.qualification)}</div>
        <div class="cert-sig-row"><span class="cert-sig-label">Scheme:</span> ${val(decl.scheme)}</div>
        <div class="cert-sig-row"><span class="cert-sig-label">Reg. No:</span> ${val(decl.regNumber)}</div>
      </div>
    </div>
  </div>
</div>`;
}

/** Conditional block — only renders content if show is true */
export function certConditional(show: boolean, content: string): string {
  return show ? content : '';
}

/** Tick/cross checklist */
export function certChecklist(items: CertCheckItem[]): string {
  const rows = items
    .map(
      (i) => `<div class="cert-check-row">
      <div class="cert-check-icon ${i.checked ? 'cert-check-pass' : 'cert-check-fail'}">
        ${i.checked ? '&#10003;' : '&#10007;'}
      </div>
      <div class="cert-check-content">
        <span class="cert-check-text">${esc(i.text)}</span>
        ${i.notes ? `<span class="cert-check-notes">${esc(i.notes)}</span>` : ''}
      </div>
    </div>`
    )
    .join('');
  return `<div class="cert-checklist">${rows}</div>`;
}

/** Sub-heading within a section */
export function certSubHeading(text: string): string {
  return `<div class="cert-sub-heading">${esc(text)}</div>`;
}

/** Info note box */
export function certNote(text: string): string {
  return `<div class="cert-note">${esc(text)}</div>`;
}

// ── Full page wrapper ────────────────────────────────────────────────────

export function certPage(opts: CertPageOpts): string {
  const { title, subtitle, certNumber, branding = {}, body, footerNote } = opts;
  const accent = branding.accent_color || '#d69e2e';
  const companyName = branding.name || 'Elec-Mate';
  const now = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });

  const logoHtml = branding.logo_url
    ? `<img src="${branding.logo_url}" alt="" class="cert-header-logo" />`
    : '';

  const schemeLogoHtml = branding.scheme_logo
    ? `<img src="${branding.scheme_logo}" alt="Registration Scheme" class="cert-scheme-logo" />`
    : '';

  const addressParts: string[] = [];
  if (branding.address) addressParts.push(esc(branding.address));
  const addressLine = addressParts.join(', ');

  const contactParts: string[] = [];
  if (branding.phone) contactParts.push(`Tel: ${esc(branding.phone)}`);
  if (branding.email) contactParts.push(esc(branding.email));
  if (branding.website) contactParts.push(esc(branding.website));
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
    font-size: 10px; color: #1f2937; line-height: 1.5; background: #fff;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  @page { size: A4; margin: 10mm 0 8mm 0; }
  @page:first { margin-top: 0; }

  .cert-page { padding: 0 28px 20px; max-width: 210mm; margin: 0 auto; }

  /* ── Header — Company branding tier ────────────────── */
  .cert-header-brand {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
    color: #fff; padding: 16px 28px 12px; display: flex;
    justify-content: space-between; align-items: center;
  }
  .cert-header-left { display: flex; align-items: center; gap: 12px; }
  .cert-header-logo {
    width: 44px; height: 44px; object-fit: contain;
    border-radius: 6px; background: rgba(255,255,255,0.1);
    border: 1.5px solid rgba(255,255,255,0.15);
  }
  .cert-header-company-name {
    font-size: 16px; font-weight: 800; letter-spacing: -0.3px; line-height: 1.2;
  }
  .cert-header-address {
    font-size: 8px; opacity: 0.55; margin-top: 2px; letter-spacing: 0.2px;
  }
  .cert-header-right { display: flex; align-items: center; gap: 10px; }
  .cert-scheme-logo {
    max-width: 56px; max-height: 36px; object-fit: contain;
    border-radius: 3px;
  }

  /* ── Header — Document title tier ───────────────────── */
  .cert-header-title {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    border-top: 1px solid rgba(255,255,255,0.06);
    border-bottom: 3px solid ${accent};
    padding: 9px 28px; display: flex;
    justify-content: space-between; align-items: center;
  }
  .cert-doc-title {
    font-size: 12px; font-weight: 800; color: #fff;
    text-transform: uppercase; letter-spacing: 0.7px;
  }
  .cert-doc-subtitle {
    font-size: 8px; color: rgba(255,255,255,0.45); margin-top: 2px;
    letter-spacing: 0.3px;
  }
  .cert-header-ref {
    font-size: 8px; color: rgba(255,255,255,0.4);
    font-family: 'Courier New', monospace; letter-spacing: 0.4px;
    text-align: right;
  }

  /* ── Section headers (numbered) ─────────────────────── */
  .cert-section-header {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    border-left: 4px solid ${accent};
    color: #fff; padding: 8px 14px; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.7px;
    border-radius: 5px; margin: 14px 0 8px;
    page-break-after: avoid;
    display: flex; align-items: center; gap: 10px;
  }
  .cert-page > .cert-section-header:first-child { margin-top: 12px; }
  .cert-section-num {
    display: inline-flex; align-items: center; justify-content: center;
    width: 22px; height: 22px; border-radius: 50%;
    background: ${accent}; color: #000; font-size: 10px; font-weight: 800;
    flex-shrink: 0;
  }
  .cert-section-title { flex: 1; }

  /* ── Sub-headings ───────────────────────────────────── */
  .cert-sub-heading {
    font-size: 9px; font-weight: 700; color: #475569;
    text-transform: uppercase; letter-spacing: 0.5px;
    margin: 10px 0 5px; padding-bottom: 3px;
    border-bottom: 1px solid #e2e8f0;
  }

  /* ── Key-value grid ─────────────────────────────────── */
  .cert-kv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 6px; }
  .cert-kv-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 6px; }
  .cert-kv-card {
    background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;
    padding: 7px 10px; page-break-inside: avoid;
  }
  .cert-kv-wide { grid-column: span 2; }
  .cert-kv-label {
    font-size: 7px; color: #94a3b8; text-transform: uppercase;
    letter-spacing: 0.4px; margin-bottom: 2px; font-weight: 600;
  }
  .cert-kv-value { font-size: 10px; color: #0f172a; font-weight: 600; word-break: break-word; }

  /* ── Test results table ─────────────────────────────── */
  .cert-test-table {
    width: 100%; border-collapse: separate; border-spacing: 0;
    margin: 6px 0; font-size: 9px; border-radius: 6px;
    overflow: hidden; border: 1px solid #e2e8f0;
  }
  .cert-test-table th {
    background: linear-gradient(135deg, #0f172a, #1e293b); color: #fff;
    padding: 7px 10px; text-align: left;
    font-size: 7.5px; text-transform: uppercase; letter-spacing: 0.4px; font-weight: 700;
  }
  .cert-test-table td {
    padding: 6px 10px; border-bottom: 1px solid #f1f5f9; color: #334155;
  }
  .cert-test-table tr:nth-child(even) { background: #f8fafc; }
  .cert-test-table tr:last-child td { border-bottom: none; }
  .cert-test-highlight td { background: #fef3c7 !important; color: #92400e; font-weight: 600; }

  /* ── Checklist ──────────────────────────────────────── */
  .cert-checklist {
    margin: 6px 0; background: #fafbfc; border: 1px solid #e2e8f0;
    border-radius: 6px; overflow: hidden;
  }
  .cert-check-row {
    display: flex; align-items: flex-start; gap: 8px; padding: 6px 10px;
    border-bottom: 1px solid #f1f5f9;
  }
  .cert-check-row:last-child { border-bottom: none; }
  .cert-check-icon {
    width: 18px; height: 18px; border-radius: 50%; display: flex;
    align-items: center; justify-content: center; font-size: 10px;
    font-weight: 800; flex-shrink: 0;
  }
  .cert-check-pass { background: #dcfce7; color: #166534; }
  .cert-check-fail { background: #fee2e2; color: #991b1b; }
  .cert-check-text { font-size: 9.5px; color: #1f2937; font-weight: 500; line-height: 1.5; }
  .cert-check-notes { display: block; font-size: 8px; color: #64748b; margin-top: 1px; font-style: italic; }

  /* ── Declaration ────────────────────────────────────── */
  .cert-declaration { margin-top: 6px; }
  .cert-sig-container { display: flex; gap: 14px; margin-top: 8px; }
  .cert-sig-block {
    flex: 1; background: #f8fafc; border: 1px solid #e2e8f0;
    border-radius: 8px; padding: 12px 14px; page-break-inside: avoid;
  }
  .cert-sig-role {
    font-size: 7px; text-transform: uppercase; letter-spacing: 0.5px;
    color: #94a3b8; font-weight: 700; margin-bottom: 8px;
  }
  .cert-sig-line { border-bottom: 1.5px solid #cbd5e1; margin-bottom: 8px; height: 28px; }
  .cert-sig-image { height: 36px; margin-bottom: 8px; }
  .cert-sig-image img { max-height: 36px; max-width: 140px; object-fit: contain; }
  .cert-sig-details { font-size: 9px; color: #334155; }
  .cert-sig-row { margin-bottom: 3px; }
  .cert-sig-label { color: #94a3b8; font-weight: 600; font-size: 7.5px; text-transform: uppercase; letter-spacing: 0.3px; }

  /* ── Notes ───────────────────────────────────────────── */
  .cert-note {
    background: #f8fafc; border: 1px solid #e2e8f0;
    border-left: 3px solid ${accent}; border-radius: 0 6px 6px 0;
    padding: 8px 12px; margin: 6px 0; font-size: 9px; color: #475569; line-height: 1.6;
    page-break-inside: avoid;
  }

  /* ── Footer ──────────────────────────────────────────── */
  .cert-footer {
    margin-top: 16px; padding-top: 10px; border-top: 2px solid #e2e8f0;
    display: flex; justify-content: space-between; align-items: flex-end;
    font-size: 7px; color: #94a3b8;
  }
  .cert-footer-brand { color: ${accent}; font-weight: 800; font-size: 8px; }
  .cert-footer-ref { font-family: 'Courier New', monospace; font-size: 6.5px; letter-spacing: 0.3px; }
  .cert-footer-contact { margin-top: 2px; font-size: 7px; }

  /* ── Print / page-break helpers ──────────────────────── */
  .page-break { page-break-before: always; }
  .no-break { page-break-inside: avoid; }
</style>
</head>
<body>

<!-- Header — Company Branding -->
<div class="cert-header-brand">
  <div class="cert-header-left">
    ${logoHtml}
    <div>
      <div class="cert-header-company-name">${esc(companyName)}</div>
      ${addressLine ? `<div class="cert-header-address">${addressLine}</div>` : ''}
      ${branding.tagline ? `<div class="cert-header-address">${esc(branding.tagline)}</div>` : ''}
    </div>
  </div>
  <div class="cert-header-right">
    ${schemeLogoHtml}
    ${branding.registration_no ? `<div style="font-size: 7px; color: rgba(255,255,255,0.4); text-align: right;">${esc(branding.registration_no)}</div>` : ''}
  </div>
</div>

<!-- Header — Document Title -->
<div class="cert-header-title">
  <div>
    <div class="cert-doc-title">${esc(title)}</div>
    ${subtitle ? `<div class="cert-doc-subtitle">${esc(subtitle)}</div>` : ''}
  </div>
  <div class="cert-header-ref">
    ${certNumber ? `CERT ${esc(certNumber)}` : ''}
  </div>
</div>

<!-- Body -->
<div class="cert-page">
  ${body}

  ${footerNote ? `<div class="cert-note" style="margin-top: 12px;">${esc(footerNote)}</div>` : ''}

  <!-- Footer -->
  <div class="cert-footer">
    <div>
      <span class="cert-footer-brand">ELEC-MATE</span> &mdash; Generated electronically
      ${branding.registration_no ? `<br />Registered: ${esc(branding.registration_no)}` : ''}
      ${contactLine ? `<div class="cert-footer-contact">${contactLine}</div>` : ''}
    </div>
    <div style="text-align: right;">
      ${certNumber ? `<div class="cert-footer-ref">${esc(certNumber)}</div>` : ''}
      <div style="margin-top: 2px;">${esc(now)}</div>
    </div>
  </div>
</div>

</body>
</html>`;
}
