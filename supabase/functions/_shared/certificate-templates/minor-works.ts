/**
 * minor-works.ts
 * HTML template for Minor Electrical Installation Works Certificate.
 * Self-contained — produces the exact same layout as the original PDF Monkey
 * Liquid template (minor-works-template.html) with TypeScript string interpolation.
 *
 * Consumes MinorWorksPayload (Zod-validated).  Zod defaults ensure every field
 * is a concrete string/boolean — no undefined values reach the template.
 */

import type { MinorWorksPayload } from '../minor-works-schema.ts';

/* ─── helpers ──────────────────────────────────────────────────────── */

/** HTML-escape user-supplied text. */
function esc(value: string | number | boolean | undefined | null): string {
  const s = String(value ?? '');
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Render a 12 px checkbox square. */
function checkbox(checked: boolean): string {
  if (checked) {
    return '<span class="checkbox-box checked">&#10003;</span>';
  }
  return '<span class="checkbox-box"></span>';
}

/** Wrap a value in .pass / .fail / .na-text depending on content. */
function passFail(value: string): string {
  const v = value.trim().toLowerCase();
  if (['pass', 'correct', 'satisfactory', 'ok', 'no trip'].includes(v)) {
    return `<span class="pass">${esc(value)}</span>`;
  }
  if (['fail', 'incorrect', 'unsatisfactory', 'trip'].includes(v)) {
    return `<span class="fail">${esc(value)}</span>`;
  }
  return esc(value);
}

/** SPD test button has special true/false → OK / N/A logic. */
function spdTestButton(value: string | boolean): string {
  if (value === true || value === 'true' || value === 'Pass' || value === 'pass' || value === 'OK') {
    return '<span class="pass">OK</span>';
  }
  if (value === false || value === 'false' || value === '') {
    return '<span class="na-text">N/A</span>';
  }
  return esc(String(value));
}

/* ─── main template ────────────────────────────────────────────────── */

export function minorWorksTemplate(data: MinorWorksPayload): string {
  const accent = data.company.accent_color || '#f59e0b';

  /* ── ring circuit conditional ── */
  const showRing =
    (data.tests.ring_ll && data.tests.ring_ll !== '' && data.tests.ring_ll !== 'N/A') ||
    (data.tests.ring_nn && data.tests.ring_nn !== '' && data.tests.ring_nn !== 'N/A') ||
    (data.tests.ring_cpc && data.tests.ring_cpc !== '' && data.tests.ring_cpc !== 'N/A');

  const showRingFinal =
    data.tests.ring_final && data.tests.ring_final !== '' && data.tests.ring_final !== 'N/A';

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Minor Electrical Installation Works Certificate</title>
    <style>
      @page {
        size: A4;
        margin: 3mm 4mm;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 8.5px;
        line-height: 1.4;
        color: #1a1a1a;
        background: #fff;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      /* DOCUMENT HEADER */
      .doc-header {
        background: linear-gradient(180deg, #0a1628 0%, #152238 100%);
        color: #fff;
        padding: 12px 16px;
        margin-bottom: 10px;
        border-radius: 2px;
        position: relative;
        overflow: hidden;
      }

      .doc-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, ${accent}, #fbbf24, ${accent});
      }

      .doc-header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .doc-title-section {
        flex: 1;
      }

      .doc-title {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.5px;
        margin-bottom: 2px;
      }

      .doc-subtitle {
        font-size: 7.5px;
        font-weight: 400;
        opacity: 0.85;
        letter-spacing: 0.3px;
      }

      .doc-meta {
        text-align: right;
      }

      .cert-number {
        font-size: 11px;
        font-weight: 700;
        color: ${accent === '#d69e2e' ? '#fbbf24' : accent};
        letter-spacing: 0.5px;
      }

      .page-number {
        font-size: 8px;
        opacity: 0.7;
        margin-top: 2px;
      }

      .company-logo {
        flex-shrink: 0;
        margin-right: 12px;
      }

      .company-logo img {
        max-height: 45px;
        max-width: 120px;
        object-fit: contain;
      }

      .scheme-logo {
        flex-shrink: 0;
        margin-left: 12px;
      }

      .scheme-logo img {
        max-height: 36px;
        max-width: 80px;
        object-fit: contain;
      }

      .company-name {
        font-size: 9px;
        font-weight: 600;
        color: ${accent === '#d69e2e' ? '#fbbf24' : accent};
        margin-top: 4px;
        letter-spacing: 0.3px;
      }

      .company-tagline {
        font-size: 7px;
        opacity: 0.7;
        margin-top: 1px;
      }

      .company-contact {
        font-size: 7px;
        opacity: 0.6;
        margin-top: 2px;
      }

      .company-contact span {
        margin-right: 8px;
      }

      /* SECTION STYLING */
      .section {
        margin-bottom: 8px;
        page-break-inside: avoid;
      }

      .section-title {
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        color: #fff;
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        padding: 6px 12px;
        margin-bottom: 6px;
        border-left: 3px solid ${accent};
      }

      .section-subtitle {
        background: #f1f5f9;
        color: #334155;
        font-size: 8px;
        font-weight: 600;
        padding: 5px 12px;
        margin-bottom: 4px;
        border-left: 3px solid #64748b;
      }

      /* INLINE FORM LAYOUT */
      .inline-form {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 6px 8px;
        background: #fafbfc;
        border: 1px solid #e2e8f0;
        border-radius: 2px;
      }

      .inline-group {
        display: flex;
        align-items: center;
        gap: 4px;
        min-height: 22px;
      }

      .inline-label {
        font-size: 7.5px;
        font-weight: 600;
        color: #64748b;
        white-space: nowrap;
      }

      .inline-value {
        font-size: 8.5px;
        color: #1e293b;
        padding: 3px 6px;
        background: #fff;
        border: 1px solid #cbd5e1;
        border-radius: 2px;
        min-width: 50px;
        min-height: 20px;
        line-height: 1.4;
      }

      .inline-value.wide {
        min-width: 100px;
        flex: 1;
      }

      /* DATA TABLE */
      .data-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 8px;
        margin-bottom: 4px;
      }

      .data-table th {
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        color: #fff;
        font-weight: 600;
        font-size: 7.5px;
        padding: 5px 8px;
        text-align: left;
        border: 1px solid #0f172a;
      }

      .data-table td {
        padding: 4px 8px;
        border: 1px solid #e2e8f0;
        vertical-align: middle;
        background: #fff;
        font-size: 8px;
      }

      .data-table tr:nth-child(even) td {
        background: #f8fafc;
      }

      /* CHECKBOX STYLING */
      .checkbox-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
      }

      .checkbox-item {
        display: flex;
        align-items: center;
        gap: 3px;
        min-height: 18px;
      }

      .checkbox-item label {
        font-size: 7.5px;
        color: #334155;
        line-height: 1;
      }

      .checkbox-box {
        width: 12px;
        height: 12px;
        border: 1.5px solid #64748b;
        border-radius: 1px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 9px;
        font-weight: bold;
        flex-shrink: 0;
      }

      .checkbox-box.checked {
        background: #0f172a;
        border-color: #0f172a;
        color: #fff;
      }

      /* PASS / FAIL COLOUR CODING */
      .pass {
        color: #16a34a;
        font-weight: 700;
      }

      .fail {
        color: #dc2626;
        font-weight: 700;
      }

      .na-text {
        color: #9ca3af;
        font-style: italic;
      }

      /* SIGNATURE BOXES */
      .signature-grid {
        display: flex;
        gap: 10px;
        margin-top: 8px;
      }

      .signature-box {
        flex: 1;
        border: 1px solid #cbd5e1;
        border-radius: 3px;
        overflow: hidden;
      }

      .signature-box-header {
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        color: #fff;
        font-size: 8px;
        font-weight: 600;
        padding: 5px 10px;
        border-bottom: 2px solid ${accent};
      }

      .signature-box-body {
        padding: 6px 8px;
        background: #fafbfc;
      }

      .sig-field {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
        gap: 6px;
      }

      .sig-field:last-child {
        margin-bottom: 0;
      }

      .sig-field-label {
        font-size: 7px;
        font-weight: 600;
        color: #64748b;
        min-width: 65px;
        flex-shrink: 0;
      }

      .sig-field-value {
        flex: 1;
        font-size: 8px;
        color: #1e293b;
        padding: 3px 6px;
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 2px;
        min-height: 20px;
      }

      .sig-field-value.signature {
        min-height: 32px;
        display: flex;
        align-items: center;
      }

      .sig-field-value img {
        max-height: 28px;
      }

      /* DECLARATION BOX */
      .declaration-box {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 2px;
        padding: 8px 10px;
        margin-bottom: 6px;
      }

      .declaration-text {
        font-size: 7.5px;
        color: #475569;
        line-height: 1.6;
        text-align: justify;
      }

      /* GUIDANCE SECTION */
      .guidance-intro {
        font-size: 8.5px;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 6px;
        padding: 6px 8px;
        background: #f1f5f9;
        border-left: 3px solid ${accent};
      }

      .guidance-columns {
        display: flex;
        gap: 12px;
      }

      .guidance-col {
        flex: 1;
        font-size: 8px;
        line-height: 1.5;
        color: #475569;
      }

      .guidance-col p {
        margin-bottom: 4px;
        text-align: justify;
      }

      .guidance-col strong {
        color: #1e293b;
      }

      /* PAGE FOOTER */
      .page-footer {
        margin-top: 8px;
        padding: 4px 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 7px;
        color: #9ca3af;
        border-top: 1px solid #e2e8f0;
      }

      .page-footer .watermark {
        font-style: italic;
      }

      /* PAGE BREAKS */
      .page-break-before {
        page-break-before: always;
      }

      .avoid-break {
        page-break-inside: avoid;
      }

      /* UTILITIES */
      .text-center { text-align: center; }
      .font-bold { font-weight: 600; }
      .mt-4 { margin-top: 4px; }
      .mt-6 { margin-top: 6px; }
    </style>
  </head>
  <body>

    <!-- DOCUMENT HEADER -->
    <div class="doc-header">
      <div class="doc-header-content">
        ${data.company.logo_url ? `<div class="company-logo">
          <img src="${esc(data.company.logo_url)}" alt="Company Logo" />
        </div>` : ''}

        <div class="doc-title-section">
          <div class="doc-title">MINOR ELECTRICAL INSTALLATION WORKS CERTIFICATE</div>
          <div class="doc-subtitle">
            (Requirements for Electrical Installations &mdash; BS 7671)
          </div>
          <div class="doc-subtitle" style="margin-top: 2px; font-size: 7px;">
            To be used only for minor electrical work which does not include the provision of a new circuit
          </div>
          <div class="company-name">${esc(data.company.name)}</div>
          ${data.company.tagline ? `<div class="company-tagline">${esc(data.company.tagline)}</div>` : ''}
          <div class="company-contact">
            ${data.company.phone ? `<span>${esc(data.company.phone)}</span>` : ''}
            ${data.company.email ? `<span>${esc(data.company.email)}</span>` : ''}
            ${data.company.website ? `<span>${esc(data.company.website)}</span>` : ''}
          </div>
        </div>

        <div class="doc-meta">
          <div class="cert-number">${esc(data.certificate_number)}</div>
          <div class="page-number">Page 1 of 1</div>
        </div>

        ${data.company.scheme_logo ? `<div class="scheme-logo">
          <img src="${esc(data.company.scheme_logo)}" alt="Scheme Logo" />
        </div>` : ''}
      </div>
    </div>

    <!-- PART 1: DESCRIPTION OF MINOR WORKS -->
    <div class="section">
      <div class="section-title">Part 1 &mdash; Description of Minor Works</div>

      <div class="inline-form">
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Client Name:</span>
          <span class="inline-value wide">${esc(data.client.name)}</span>
        </div>
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Client Phone:</span>
          <span class="inline-value wide">${esc(data.client.phone)}</span>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Client Email:</span>
          <span class="inline-value wide">${esc(data.client.email)}</span>
        </div>
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Person Ordering Work:</span>
          <span class="inline-value wide">${esc(data.person_ordering_work)}</span>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Installation Address:</span>
          <span class="inline-value wide">${esc(data.installation.address)}${data.installation.postcode ? `, ${esc(data.installation.postcode)}` : ''}</span>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group">
          <span class="inline-label">Date of Work:</span>
          <span class="inline-value">${esc(data.work_date)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Date of Completion:</span>
          <span class="inline-value">${esc(data.date_of_completion)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Next Inspection Due:</span>
          <span class="inline-value">${esc(data.next_inspection_due)}</span>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Work Type:</span>
          <span class="inline-value wide">${esc(data.work_type)}</span>
        </div>
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Work Location:</span>
          <span class="inline-value wide">${esc(data.work_location)}</span>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Description of Work:</span>
          <span class="inline-value wide">${esc(data.work_description)}</span>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group">
          <span class="inline-label">Supply Voltage:</span>
          <span class="inline-value">${esc(data.supply.voltage)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Frequency:</span>
          <span class="inline-value">${esc(data.supply.frequency)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Phases:</span>
          <span class="inline-value">${esc(data.supply.phases)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Risk Assessment:</span>
          <div class="checkbox-row">
            <div class="checkbox-item">
              ${checkbox(data.risk_assessment_attached === true)}
              <label>Yes</label>
            </div>
            <div class="checkbox-item">
              ${checkbox(data.risk_assessment_attached !== true)}
              <label>No</label>
            </div>
          </div>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Departures from BS 7671 (Reg 120.3, 133.1.3, 133.5):</span>
          <span class="inline-value wide">${esc(data.departures)}</span>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Permitted Exceptions (Reg 411.3.3):</span>
          <span class="inline-value wide">${esc(data.permitted_exceptions)}</span>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Comments on Existing Installation (Reg 644.1.2):</span>
          <span class="inline-value wide">${esc(data.existing_installation_comments)}</span>
        </div>
      </div>
    </div>

    <!-- PART 2: EARTHING & BONDING ARRANGEMENTS -->
    <div class="section">
      <div class="section-title">Part 2 &mdash; Presence and Adequacy of Installation Earthing &amp; Bonding Arrangements (Regulation 132.16)</div>

      <div class="inline-form">
        <div class="inline-group">
          <span class="inline-label">Earthing Arrangement:</span>
          <div class="checkbox-row">
            <div class="checkbox-item">
              ${checkbox(data.earthing.type === 'TN-C')}
              <label>TN-C</label>
            </div>
            <div class="checkbox-item">
              ${checkbox(data.earthing.type === 'TN-S')}
              <label>TN-S</label>
            </div>
            <div class="checkbox-item">
              ${checkbox(data.earthing.type === 'TN-C-S')}
              <label>TN-C-S</label>
            </div>
            <div class="checkbox-item">
              ${checkbox(data.earthing.type === 'TT')}
              <label>TT</label>
            </div>
          </div>
        </div>
        <div class="inline-group">
          <span class="inline-label">Z<sub>db</sub> (&Omega;):</span>
          <span class="inline-value">${esc(data.earthing.zdb)}</span>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group">
          <span class="inline-label">Earthing Conductor:</span>
          <div class="checkbox-row">
            <div class="checkbox-item">
              ${checkbox(data.earthing.conductor_present)}
              <label>Present</label>
            </div>
          </div>
        </div>
        <div class="inline-group">
          <span class="inline-label">Size:</span>
          <span class="inline-value">${data.earthing.conductor_size ? `${esc(data.earthing.conductor_size)}mm&sup2;` : ''}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Material:</span>
          <span class="inline-value">${esc(data.earthing.conductor_material)}</span>
        </div>
      </div>

      <div class="section-subtitle mt-6">Main Protective Bonding Conductors</div>
      <div class="inline-form">
        <div class="inline-group">
          <span class="inline-label">Main Bonding Size:</span>
          <span class="inline-value">${data.bonding.size ? `${esc(data.bonding.size)}mm&sup2;` : ''}</span>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group">
          <div class="checkbox-item">
            ${checkbox(data.bonding.water)}
            <label>Water</label>
          </div>
          ${data.bonding.water_size ? `<span class="inline-value">${esc(data.bonding.water_size)}mm&sup2;</span>` : ''}
        </div>
        <div class="inline-group">
          <div class="checkbox-item">
            ${checkbox(data.bonding.gas)}
            <label>Gas</label>
          </div>
          ${data.bonding.gas_size ? `<span class="inline-value">${esc(data.bonding.gas_size)}mm&sup2;</span>` : ''}
        </div>
        <div class="inline-group">
          <div class="checkbox-item">
            ${checkbox(data.bonding.oil)}
            <label>Oil</label>
          </div>
          ${data.bonding.oil_size ? `<span class="inline-value">${esc(data.bonding.oil_size)}mm&sup2;</span>` : ''}
        </div>
        <div class="inline-group">
          <div class="checkbox-item">
            ${checkbox(data.bonding.structural)}
            <label>Structural</label>
          </div>
          ${data.bonding.structural_size ? `<span class="inline-value">${esc(data.bonding.structural_size)}mm&sup2;</span>` : ''}
        </div>
        <div class="inline-group">
          <div class="checkbox-item">
            ${checkbox(data.bonding.other)}
            <label>Other</label>
          </div>
          ${data.bonding.other_specify ? `<span class="inline-value">${esc(data.bonding.other_specify)}</span>` : ''}
        </div>
      </div>
    </div>

    <!-- PART 3: CIRCUIT DETAILS -->
    <div class="section">
      <div class="section-title">Part 3 &mdash; Circuit Details</div>

      <div class="inline-form">
        <div class="inline-group">
          <span class="inline-label">DB Reference:</span>
          <span class="inline-value">${esc(data.circuit.db_ref)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">DB Location/Type:</span>
          <span class="inline-value">${esc(data.circuit.db_location_type)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Circuit No:</span>
          <span class="inline-value">${esc(data.circuit.number)}</span>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Circuit Description:</span>
          <span class="inline-value wide">${esc(data.circuit.description)}</span>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group">
          <span class="inline-label">Circuit Type:</span>
          <span class="inline-value">${esc(data.circuit.type)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Ref Method:</span>
          <span class="inline-value">${esc(data.circuit.reference_method)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Conductors:</span>
          <span class="inline-value">${esc(data.circuit.number_of_conductors)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Cable Type:</span>
          <span class="inline-value">${esc(data.circuit.cable_type)}</span>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group">
          <span class="inline-label">Live Size:</span>
          <span class="inline-value">${data.circuit.live_size ? `${esc(data.circuit.live_size)}mm&sup2;` : ''}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">CPC Size:</span>
          <span class="inline-value">${data.circuit.cpc_size ? `${esc(data.circuit.cpc_size)}mm&sup2;` : ''}</span>
        </div>
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Installation Method:</span>
          <span class="inline-value wide">${esc(data.circuit.installation_method)}</span>
        </div>
      </div>

      <!-- Protective Devices -->
      <div class="section-subtitle mt-6">Protective Devices</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 16%">Device</th>
            <th style="width: 22%">BS EN</th>
            <th style="width: 30%">Type / Rating</th>
            <th style="width: 32%">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>OCPD</strong></td>
            <td>${esc(data.circuit.ocpd.bs_en)}</td>
            <td>${esc(data.circuit.ocpd.type)} / ${esc(data.circuit.ocpd.rating)} A</td>
            <td>Breaking capacity: ${esc(data.circuit.ocpd.breaking_capacity)} kA</td>
          </tr>
          <tr>
            <td><strong>RCD</strong></td>
            <td>${esc(data.circuit.rcd.bs_en)}</td>
            <td>${esc(data.circuit.rcd.type)} / ${esc(data.circuit.rcd.rating)} A</td>
            <td>I&Delta;n: ${esc(data.circuit.rcd.idn)} mA</td>
          </tr>
          <tr>
            <td><strong>AFDD</strong></td>
            <td>${esc(data.circuit.afdd.bs_en)}</td>
            <td>${esc(data.circuit.afdd.rating)} A</td>
            <td></td>
          </tr>
          <tr>
            <td><strong>SPD</strong></td>
            <td>${esc(data.circuit.spd.bs_en)}</td>
            <td>${esc(data.circuit.spd.type)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div class="inline-form">
        <div class="inline-group">
          <span class="inline-label">Protection Fitted:</span>
          <div class="checkbox-row">
            <div class="checkbox-item">
              ${checkbox(data.circuit.protection.rcd)}
              <label>RCD</label>
            </div>
            <div class="checkbox-item">
              ${checkbox(data.circuit.protection.rcbo)}
              <label>RCBO</label>
            </div>
            <div class="checkbox-item">
              ${checkbox(data.circuit.protection.afdd)}
              <label>AFDD</label>
            </div>
            <div class="checkbox-item">
              ${checkbox(data.circuit.protection.spd)}
              <label>SPD</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PART 4: TEST RESULTS (force new page) -->
    <div class="section page-break-before">
      <div class="section-title">Part 4 &mdash; Test Results for the Altered or Extended Circuit (where relevant and practicable)</div>

      <!-- Continuity -->
      <div class="section-subtitle">Continuity</div>
      <div class="inline-form">
        <div class="inline-group">
          <span class="inline-label">R1+R2 (&Omega;):</span>
          <span class="inline-value">${esc(data.tests.r1_r2)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">R2 (&Omega;):</span>
          <span class="inline-value">${esc(data.tests.r2)}</span>
        </div>
      </div>

      ${showRing ? `<div class="section-subtitle mt-6">Ring Final Circuit Continuity</div>
      <div class="inline-form">
        <div class="inline-group">
          <span class="inline-label">L&ndash;L (&Omega;):</span>
          <span class="inline-value">${esc(data.tests.ring_ll)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">N&ndash;N (&Omega;):</span>
          <span class="inline-value">${esc(data.tests.ring_nn)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">CPC (&Omega;):</span>
          <span class="inline-value">${esc(data.tests.ring_cpc)}</span>
        </div>
      </div>
      <div class="inline-form mt-4">
        <div class="inline-group">
          <span class="inline-label">R1 End-to-End (&Omega;):</span>
          <span class="inline-value">${esc(data.tests.ring_r1_end)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Rn End-to-End (&Omega;):</span>
          <span class="inline-value">${esc(data.tests.ring_rn_end)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">R2 End-to-End (&Omega;):</span>
          <span class="inline-value">${esc(data.tests.ring_r2_end)}</span>
        </div>
      </div>
      <div class="inline-form mt-4">
        <div class="inline-group">
          <span class="inline-label">R1 Cross (&Omega;):</span>
          <span class="inline-value">${esc(data.tests.ring_r1_cross)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Rn Cross (&Omega;):</span>
          <span class="inline-value">${esc(data.tests.ring_rn_cross)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">R2 Cross (&Omega;):</span>
          <span class="inline-value">${esc(data.tests.ring_r2_cross)}</span>
        </div>
      </div>
      ${showRingFinal ? `<div class="inline-form mt-4">
        <div class="inline-group">
          <span class="inline-label">Final Ring Continuity:</span>
          <span class="inline-value">${esc(data.tests.ring_final)}</span>
        </div>
      </div>` : ''}` : ''}

      <!-- Insulation Resistance -->
      <div class="section-subtitle mt-6">Insulation Resistance (test voltage: ${esc(data.tests.insulation_voltage)} V DC)</div>
      <div class="inline-form">
        <div class="inline-group">
          <span class="inline-label">Live&ndash;Live (M&Omega;):</span>
          <span class="inline-value">${esc(data.tests.ir_live_live)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Live&ndash;Neutral (M&Omega;):</span>
          <span class="inline-value">${esc(data.tests.ir_live_neutral)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Live&ndash;Earth (M&Omega;):</span>
          <span class="inline-value">${esc(data.tests.ir_live_earth)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Neutral&ndash;Earth (M&Omega;):</span>
          <span class="inline-value">${esc(data.tests.ir_neutral_earth)}</span>
        </div>
      </div>

      <!-- Earth Fault Loop & Polarity -->
      <div class="section-subtitle mt-6">Earth Fault Loop Impedance &amp; Polarity</div>
      <div class="inline-form">
        <div class="inline-group">
          <span class="inline-label">Polarity:</span>
          <span class="inline-value">
            ${passFail(data.tests.polarity)}
          </span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Zs (&Omega;):</span>
          <span class="inline-value">${esc(data.tests.zs)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Max Zs (&Omega;):</span>
          <span class="inline-value">${esc(data.tests.max_zs)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">PFC (kA):</span>
          <span class="inline-value">${esc(data.tests.pfc)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Earth Electrode (&Omega;):</span>
          <span class="inline-value">${esc(data.tests.earth_electrode)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Phase Rotation:</span>
          <span class="inline-value">${esc(data.tests.phase_rotation)}</span>
        </div>
      </div>

      <!-- RCD / RCBO Tests -->
      <div class="section-subtitle mt-6">RCD / RCBO Tests</div>
      <div class="inline-form">
        <div class="inline-group">
          <span class="inline-label">RCD Rating (mA):</span>
          <span class="inline-value">${esc(data.tests.rcd_rating)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">1&times; I&Delta;n (ms):</span>
          <span class="inline-value">${esc(data.tests.rcd_time)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">5&times; I&Delta;n (ms):</span>
          <span class="inline-value">${esc(data.tests.rcd_5x_time)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">&frac12;&times; I&Delta;n:</span>
          <span class="inline-value">
            ${passFail(data.tests.rcd_half_x)}
          </span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Test Button:</span>
          <span class="inline-value">
            ${passFail(data.tests.rcd_test_button)}
          </span>
        </div>
        <div class="inline-group">
          <span class="inline-label">RCBO Trip (ms):</span>
          <span class="inline-value">${esc(data.tests.rcbo_trip_time)}</span>
        </div>
      </div>

      <!-- AFDD / SPD Tests -->
      <div class="section-subtitle mt-6">AFDD / SPD Tests</div>
      <div class="inline-form">
        <div class="inline-group">
          <span class="inline-label">AFDD Test Button:</span>
          <span class="inline-value">
            ${passFail(data.tests.afdd_test_button)}
          </span>
        </div>
        <div class="inline-group">
          <span class="inline-label">AFDD Trip (ms):</span>
          <span class="inline-value">${esc(data.tests.afdd_trip_time)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">SPD Visual:</span>
          <span class="inline-value">
            ${passFail(data.tests.spd_visual)}
          </span>
        </div>
        <div class="inline-group">
          <span class="inline-label">SPD Indicator:</span>
          <span class="inline-value">${esc(data.tests.spd_indicator)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">SPD Test Btn:</span>
          <span class="inline-value">
            ${spdTestButton(data.tests.spd_test_button)}
          </span>
        </div>
      </div>

      <div class="inline-form mt-4">
        <div class="inline-group">
          <span class="inline-label">Temperature (&deg;C):</span>
          <span class="inline-value">${esc(data.tests.temperature)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Functional Testing:</span>
          <span class="inline-value">
            ${passFail(data.tests.functional_test)}
          </span>
        </div>
      </div>

      <!-- Test Equipment -->
      <div class="section-subtitle mt-6">Test Equipment</div>
      <div class="inline-form">
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Instrument:</span>
          <span class="inline-value wide">${esc(data.test_equipment.model)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Serial No:</span>
          <span class="inline-value">${esc(data.test_equipment.serial)}</span>
        </div>
        <div class="inline-group">
          <span class="inline-label">Calibration:</span>
          <span class="inline-value">${esc(data.test_equipment.calibration_date)}</span>
        </div>
        ${data.test_equipment.custom ? `<div class="inline-group">
          <span class="inline-label">Other:</span>
          <span class="inline-value">${esc(data.test_equipment.custom)}</span>
        </div>` : ''}
      </div>
    </div>

    <!-- PART 5: DECLARATION -->
    <div class="section">
      <div class="section-title">Part 5 &mdash; Declaration</div>

      <div class="declaration-box">
        <div class="declaration-text">
          I certify that the work covered by this certificate does not impair the safety of the existing
          installation and the work has been designed, constructed, inspected and tested in accordance with
          <strong>BS 7671:2018</strong> amended to <strong>A3:2024</strong> and that to the best of my
          knowledge and belief, at the time of my inspection, complied with BS 7671 except as detailed
          in Part 1 above.
        </div>
      </div>

      <!-- Declaration checkboxes -->
      <div class="inline-form mt-4">
        <div class="inline-group">
          <div class="checkbox-item">
            ${checkbox(data.declaration.bs7671_compliance)}
            <label>Complies with BS 7671:2018+A3:2024</label>
          </div>
        </div>
        <div class="inline-group">
          <div class="checkbox-item">
            ${checkbox(data.declaration.test_results_accurate)}
            <label>Test results accurate</label>
          </div>
        </div>
        <div class="inline-group">
          <div class="checkbox-item">
            ${checkbox(data.declaration.work_safety)}
            <label>Safe for continued use</label>
          </div>
        </div>
        <div class="inline-group">
          <div class="checkbox-item">
            ${checkbox(data.declaration.part_p_notification)}
            <label>Part P notification required</label>
          </div>
        </div>
        <div class="inline-group">
          <div class="checkbox-item">
            ${checkbox(data.declaration.copy_provided)}
            <label>Copy provided to person ordering the work</label>
          </div>
        </div>
      </div>

      <!-- Signature Boxes -->
      <div class="signature-grid">
        <div class="signature-box">
          <div class="signature-box-header">Signed By</div>
          <div class="signature-box-body">
            <div class="sig-field">
              <span class="sig-field-label">Name</span>
              <span class="sig-field-value">${esc(data.declaration.name)}</span>
            </div>
            <div class="sig-field">
              <span class="sig-field-label">Signature</span>
              <span class="sig-field-value signature">
                ${data.declaration.signature ? `<img src="${esc(data.declaration.signature)}" style="max-height: 28px" />` : ''}
              </span>
            </div>
            <div class="sig-field">
              <span class="sig-field-label">For/on behalf of</span>
              <span class="sig-field-value">${esc(data.declaration.company)}</span>
            </div>
            <div class="sig-field">
              <span class="sig-field-label">Position</span>
              <span class="sig-field-value">${esc(data.declaration.position)}</span>
            </div>
            <div class="sig-field">
              <span class="sig-field-label">Date</span>
              <span class="sig-field-value">${esc(data.declaration.date)}</span>
            </div>
          </div>
        </div>

        <div class="signature-box">
          <div class="signature-box-header">Contractor Details</div>
          <div class="signature-box-body">
            <div class="sig-field">
              <span class="sig-field-label">Address</span>
              <span class="sig-field-value">${esc(data.declaration.address)}</span>
            </div>
            <div class="sig-field">
              <span class="sig-field-label">Phone</span>
              <span class="sig-field-value">${esc(data.declaration.phone)}</span>
            </div>
            <div class="sig-field">
              <span class="sig-field-label">Email</span>
              <span class="sig-field-value">${esc(data.declaration.email)}</span>
            </div>
            <div class="sig-field">
              <span class="sig-field-label">Qualification</span>
              <span class="sig-field-value">${esc(data.declaration.qualification)}</span>
            </div>
            <div class="sig-field">
              <span class="sig-field-label">Scheme Provider</span>
              <span class="sig-field-value">${esc(data.declaration.scheme_provider)}</span>
            </div>
            <div class="sig-field">
              <span class="sig-field-label">Registration No</span>
              <span class="sig-field-value">${esc(data.declaration.registration_number)}</span>
            </div>
          </div>
        </div>
      </div>

      ${data.declaration.additional_notes ? `<div class="inline-form mt-6">
        <div class="inline-group" style="flex: 1">
          <span class="inline-label">Additional Notes:</span>
          <span class="inline-value wide" style="min-height: 28px">${esc(data.declaration.additional_notes)}</span>
        </div>
      </div>` : ''}
    </div>

    <!-- GUIDANCE FOR RECIPIENTS -->
    <div class="section avoid-break">
      <div class="section-title">Guidance for Recipients</div>
      <div class="guidance-intro">
        This certificate is an important and valuable document which should be retained for future reference.
      </div>
      <div class="guidance-columns">
        <div class="guidance-col">
          <p>
            <strong>1.</strong> This certificate confirms that the electrical installation work
            described above has been designed, constructed, inspected and tested in accordance with
            <strong>BS 7671:2018+A3:2024</strong> (IET Wiring Regulations, Eighteenth Edition).
          </p>
          <p>
            <strong>2.</strong> The original certificate should be given to the person ordering the
            work. A duplicate should be retained by the contractor. Where the person ordering the
            work is not the owner, a copy of this certificate should be passed to the owner.
          </p>
          <p>
            <strong>3.</strong> This certificate is only valid for the work described above and
            should be retained in a safe place.
          </p>
          <p>
            <strong>4.</strong> The installation should be periodically inspected and tested. The
            recommended date for the next inspection is shown above.
          </p>
          <p>
            <strong>5.</strong> Where an RCD/RCBO is fitted, it should be tested at six-monthly
            intervals by pressing the &lsquo;T&rsquo; or &lsquo;Test&rsquo; button.
            <strong>For safety reasons it is important that this instruction is followed.</strong>
          </p>
        </div>
        <div class="guidance-col">
          <p>
            <strong>6.</strong> Where an AFDD is fitted, it should be tested at six-monthly
            intervals by pressing the test button. Note: not all AFDDs are provided with a test
            button.
          </p>
          <p>
            <strong>7.</strong> Where an SPD is fitted, the status indicator should be checked to
            confirm the device remains in an operational condition.
            <strong>For safety reasons it is important that this instruction is followed.</strong>
          </p>
          <p>
            <strong>8.</strong> Where alternative or additional sources of supply are present,
            warning notices should be found at the origin of the installation.
          </p>
          <p>
            <strong>9.</strong> If the installation is subsequently altered, a new certificate or
            report should be issued for the altered work.
          </p>
        </div>
      </div>
    </div>

    <!-- PAGE FOOTER -->
    <div class="page-footer">
      <span>BS 7671:2018+A3:2024 &middot; Minor Electrical Installation Works Certificate</span>
      <span class="watermark">Generated by Elec-Mate</span>
    </div>

  </body>
</html>`;
}
