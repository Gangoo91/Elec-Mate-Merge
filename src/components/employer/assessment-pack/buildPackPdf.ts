/**
 * Scheme assessment pack PDF (ELE-2069). A4 landscape, tight margins, plain
 * tables: the pages an assessor reads before looking at the sample. Built
 * only from the firm's records; an empty section says so.
 */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getBrandColour, addAccentBar, readableTextOn, type RGB } from '@/utils/pdfBrand';
import type { AssessmentPackData, PackCertificate } from './types';
import type { Scheme } from './schemes';
import { typeLabel } from './schemes';
import type { Gap } from './readiness';
import { qsPeople } from './readiness';
import { insuranceLabel, money } from '@/components/employer/compliance/insurance';
import type { InsuranceKind } from '@/hooks/useComplianceDocuments';

const ukDate = (iso?: string | null) =>
  iso
    ? new Date(`${iso.slice(0, 10)}T00:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

const QS_STATUS: Record<string, string> = {
  approved: 'Approved',
  returned: 'Returned',
  pending: 'Waiting',
};

const PARTP_STATUS: Record<string, string> = {
  submitted: 'Notified',
  pending: 'To notify',
  'in-progress': 'To notify',
  overdue: 'Overdue',
  not_required: 'Not notifiable',
  cancelled: 'Cancelled',
};

const OUTCOME: Record<string, string> = {
  upheld: 'Upheld',
  partly_upheld: 'Partly upheld',
  not_upheld: 'Not upheld',
  resolved: 'Resolved',
  withdrawn: 'Withdrawn',
};

export interface PackPdfInput {
  data: AssessmentPackData;
  scheme: Scheme;
  sample: PackCertificate[];
  gaps: Gap[];
  brand?: { accent_color?: string | null; primary_color?: string | null } | null;
}

export function buildPackPdf({ data, scheme, sample, gaps, brand: b }: PackPdfInput): jsPDF {
  const doc = new jsPDF('l', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const mx = 10;
  const brand: RGB = getBrandColour(b ?? undefined);
  const head = { fillColor: brand, textColor: readableTextOn(brand), fontStyle: 'bold' as const };
  const styles = { fontSize: 8.5, cellPadding: 1.6, overflow: 'linebreak' as const };
  const firm = data.firm;
  const firmName = firm?.company_name || 'Our firm';
  let y = 0;

  const last = () =>
    (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y;

  const heading = (title: string, sub?: string) => {
    if (y > pageH - 40) {
      doc.addPage();
      y = 16;
    } else {
      y += 9;
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text(title, mx, y);
    if (sub) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(80, 80, 80);
      const lines = doc.splitTextToSize(sub, pageW - mx * 2);
      doc.text(lines, mx, y + 4.5);
      y += 4.5 * lines.length;
    }
    y += 2.5;
  };

  const table = (h: string[], body: (string | number)[][], empty: string, widths?: number[]) => {
    autoTable(doc, {
      startY: y,
      margin: { left: mx, right: mx, top: 14 },
      theme: 'grid',
      headStyles: head,
      styles,
      head: [h],
      body: body.length ? body : [[empty, ...h.slice(1).map(() => '')]],
      columnStyles: widths
        ? Object.fromEntries(widths.map((w, i) => [i, { cellWidth: w }]))
        : undefined,
    });
    y = last();
  };

  /* ── Cover ───────────────────────────────────────────── */
  addAccentBar(doc, brand, 3);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(30, 30, 30);
  doc.text(`${scheme.name} assessment pack`, mx, 16);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  doc.text(
    [
      firmName,
      firm?.registration_scheme
        ? `${firm.registration_scheme}${firm.registration_number ? ` ${firm.registration_number}` : ''}`
        : 'Registration not recorded',
      `Work from ${ukDate(data.period.from)} to ${ukDate(data.period.to)}`,
      `Produced ${ukDate(new Date().toISOString())} from our own records`,
    ].join('   ·   '),
    mx,
    22
  );
  y = 26;

  const qs = qsPeople(data);
  const qsNames = qs.length
    ? qs.map((p) => p.name).join(', ')
    : firm?.owner_is_qs
      ? `${data.owner_name || firm?.inspector_name || 'The owner'} (owner)`
      : 'Not named';
  const partPMade = data.certificates.filter((c) => c.part_p?.status === 'submitted').length;
  const openComplaints = data.complaints.filter((c) => !c.closed_on).length;
  autoTable(doc, {
    startY: y,
    margin: { left: mx, right: mx },
    theme: 'grid',
    headStyles: head,
    styles: { ...styles, fontSize: 9 },
    head: [['In this pack', 'From our records']],
    body: [
      ['Qualified Supervisor', qsNames],
      ['Certificates issued in the period', String(data.certificates.length)],
      ['Suggested sample to have ready', `${sample.length} (the assessor picks the final sample)`],
      ['QS reviews in the period', String(data.qs_reviews.length)],
      ['Test instruments on the kit register', String(data.instruments.length)],
      ['People on the team', String(data.team.length)],
      [
        'Complaints logged',
        `${data.complaints.length}${openComplaints ? `, ${openComplaints} open` : ''}`,
      ],
      ['Insurance and documents on file', String(data.documents.length)],
      ['Policies', String(data.policies.length)],
      ['Part P notifications made', String(partPMade)],
    ],
    columnStyles: { 0: { cellWidth: 80, fontStyle: 'bold' } },
  });
  y = last();

  heading(
    gaps.length ? `Before the visit: ${gaps.length} to put right` : 'Before the visit',
    gaps.length
      ? 'Found in our own records when this pack was made.'
      : 'Nothing found in our records that needs putting right.'
  );
  if (gaps.length)
    table(
      ['Area', 'What to put right'],
      gaps.map((g) => [g.area, g.text]),
      '',
      [45]
    );

  /* ── What the scheme asks for ────────────────────────── */
  heading(
    `What ${scheme.name} asks for at assessment`,
    `${scheme.sampling}${scheme.note ? ` ${scheme.note}` : ''}`
  );
  table(
    ['Section', 'Requirement', 'Rule'],
    scheme.requirements.map((r) => [r.section, r.text, r.source]),
    '',
    [40, 175]
  );
  y += 3;
  doc.setFontSize(7.5);
  doc.setTextColor(90, 90, 90);
  const src = doc.splitTextToSize(
    `Sources: ${scheme.sources.map((s) => `${s.label} (${s.url})`).join('; ')}`,
    pageW - mx * 2
  );
  doc.text(src, mx, y + 3);
  y += 3 + src.length * 3.2;

  /* ── Qualified Supervisor ────────────────────────────── */
  heading('Qualified Supervisor');
  const qsRows = qs.map((p) => [
    p.name,
    p.qualifications
      .filter((q) => ['regulations', 'testing', 'core'].includes((q.category ?? '').toLowerCase()))
      .map((q) => `${q.label}${q.achieved ? ` (${ukDate(q.achieved)})` : ''}`)
      .join('; ') ||
      (firm?.inspector_name &&
      p.name.trim().toLowerCase() === firm.inspector_name.trim().toLowerCase() &&
      firm.inspector_qualifications?.length
        ? `${firm.inspector_qualifications.join('; ')} (from the inspector details in settings)`
        : 'No qualifications on record'),
  ]);
  if (!qsRows.length && firm?.owner_is_qs)
    qsRows.push([
      `${data.owner_name || firm?.inspector_name || 'Owner'} (owner)`,
      (firm?.inspector_qualifications ?? []).join('; ') || 'No qualifications on record',
    ]);
  table(['Name', 'Qualifications'], qsRows, 'No Qualified Supervisor named', [60]);

  /* ── Certificates and sample ─────────────────────────── */
  const certRow = (c: PackCertificate) => [
    ukDate(c.issued_on),
    typeLabel(c.report_type),
    c.certificate_number ?? '',
    [c.client_name, c.installation_address].filter(Boolean).join(', '),
    c.owner_name,
    c.qs_status ? (QS_STATUS[c.qs_status] ?? c.qs_status) : 'Not reviewed',
    c.part_p_verdict === 'yes' || c.part_p
      ? c.part_p
        ? `${PARTP_STATUS[c.part_p.status] ?? c.part_p.status}${c.part_p.reference ? ` ${c.part_p.reference}` : ''}`
        : 'To notify'
      : '',
  ];
  heading(
    'Suggested sample',
    'Shortlisted to reflect the range of our work: an EIC first, then one of each certificate type and one per person, notifiable jobs first, newest first.'
  );
  table(
    ['Date', 'Type', 'Number', 'Client and site', 'By', 'QS', 'Part P'],
    sample.map(certRow),
    'No certificates in the last 12 months to sample',
    [24, 28, 32, 95, 38, 26]
  );
  heading(
    `Certificates issued (${data.certificates.length})`,
    'Every completed certificate by the team in the period.'
  );
  table(
    ['Date', 'Type', 'Number', 'Client and site', 'By', 'QS', 'Part P'],
    data.certificates.map(certRow),
    'No completed certificates in this period',
    [24, 28, 32, 95, 38, 26]
  );

  /* ── QS reviews ──────────────────────────────────────── */
  heading(
    `QS review history (${data.qs_reviews.length})`,
    'Certificates the Qualified Supervisor checked, and those returned with the reasons.'
  );
  table(
    ['Sent', 'Certificate', 'Electrician', 'Result', 'Reviewed by', 'Reasons returned'],
    data.qs_reviews.map((q) => [
      ukDate(q.submitted_at),
      `${typeLabel(q.report_type)}`,
      q.electrician,
      q.self_certified ? 'Self-certified' : (QS_STATUS[q.status] ?? q.status),
      [q.reviewer_name, q.reviewed_at ? ukDate(q.reviewed_at) : null].filter(Boolean).join(', '),
      q.reasons.join('; ') || (q.comments ?? ''),
    ]),
    'No QS reviews in this period',
    [24, 30, 40, 26, 50]
  );

  /* ── Instruments ─────────────────────────────────────── */
  heading(
    'Test instruments and calibration',
    'From the kit register. Each calibration recorded, with its certificate reference.'
  );
  table(
    ['Instrument', 'Serial', 'Held by', 'Last calibrated', 'Due', 'Calibration records'],
    data.instruments.map((i) => [
      i.name,
      i.serial ?? '',
      i.holder ?? '',
      ukDate(i.last_calibration),
      ukDate(i.next_calibration) || 'No date',
      i.checks
        .slice(0, 4)
        .map(
          (c) =>
            `${ukDate(c.checked_on)} ${c.result}${c.certificate_ref ? `, cert ${c.certificate_ref}` : ''}`
        )
        .join('; '),
    ]),
    'No test instruments on the kit register',
    [55, 32, 38, 26, 24]
  );

  /* ── Competence ──────────────────────────────────────── */
  heading(
    'Operatives: qualifications, training and competence',
    'From each person’s Elec-ID. Verification: document seen or checked at source, otherwise as declared.'
  );
  const VER: Record<string, string> = {
    verified_at_source: 'Checked at source',
    document_seen: 'Document seen',
    self_declared: 'Declared',
  };
  table(
    ['Person', 'Role', 'Qualification or training', 'Achieved', 'Expires', 'Verification'],
    data.team.flatMap((p) => {
      const role = [p.role, p.is_principal_qs ? 'QS' : null].filter(Boolean).join(', ');
      const card = p.ecs_card?.type
        ? [
            [
              p.name,
              role,
              `ECS card (${p.ecs_card.type})`,
              '',
              ukDate(p.ecs_card.expiry),
              VER[p.ecs_card.level ?? ''] ?? '',
            ],
          ]
        : [];
      const quals = p.qualifications.map((q) => [
        p.name,
        role,
        `${q.label}${q.training_status && q.training_status !== 'Completed' ? ` (${q.training_status})` : ''}`,
        ukDate(q.achieved),
        ukDate(q.expiry),
        VER[q.verification ?? ''] ?? '',
      ]);
      return quals.length || card.length
        ? [...card, ...quals]
        : [[p.name, role, 'No qualifications on record', '', '', '']];
    }),
    'Nobody on the team',
    [42, 34, 105, 24, 24]
  );

  /* ── Complaints ──────────────────────────────────────── */
  heading(
    `Complaints log (${data.complaints.length})`,
    'Customer and data protection complaints received in the period, and any still open.'
  );
  table(
    ['Received', 'Type', 'Summary', 'Owner', 'Acknowledged', 'Outcome', 'Closed'],
    data.complaints.map((c) => [
      ukDate(c.received_on),
      c.kind === 'data_protection' ? 'Data protection' : 'Customer',
      c.summary,
      c.owner_name ?? '',
      ukDate(c.acknowledged_on),
      [c.outcome_kind ? OUTCOME[c.outcome_kind] : null, c.outcome].filter(Boolean).join(': '),
      ukDate(c.closed_on) || 'Open',
    ]),
    'No complaints logged in this period',
    [22, 28, 90, 30, 24, 60]
  );

  /* ── Insurance and policies ──────────────────────────── */
  heading('Insurance');
  const ins = data.documents.filter(
    (d) => d.insurance_kind || /insur/i.test(`${d.title} ${d.category ?? ''}`)
  );
  table(
    ['Cover', 'Insurer', 'Policy number', 'Limit', 'Renews', 'Certificate'],
    ins.map((d) => [
      d.insurance_kind ? insuranceLabel(d.insurance_kind as InsuranceKind) : d.title,
      d.insurer ?? '',
      d.policy_number ?? '',
      money(d.cover_amount) || (d.cover_text ?? ''),
      ukDate(d.expiry_date) || 'No date',
      d.file_url ? 'In the zip' : 'Not attached',
    ]),
    'No insurance on record',
    [55, 50, 45, 28, 28]
  );
  heading('Policies');
  table(
    ['Policy', 'Version', 'Published', 'Review due', 'Read and signed by'],
    data.policies.map((p) => [
      p.name,
      String(p.published_version ?? p.version ?? ''),
      ukDate(p.published_at),
      ukDate(p.review_date),
      String(p.acknowledged),
    ]),
    'No policies adopted',
    [110, 22, 30, 30]
  );
  const other = data.documents.filter((d) => !ins.includes(d));
  if (other.length) {
    heading('Other compliance documents');
    table(
      ['Document', 'Type', 'Renews', 'File'],
      other.map((d) => [
        d.title,
        [d.category, d.document_type].filter(Boolean).join(', '),
        ukDate(d.expiry_date) || 'No date',
        d.file_url ? 'In the zip' : 'Not attached',
      ]),
      '',
      [110, 60, 30]
    );
  }

  /* ── Part P ──────────────────────────────────────────── */
  const pp = data.certificates.filter((c) => c.part_p || c.part_p_verdict === 'yes');
  heading(
    `Part P notifications (${pp.length})`,
    `Notifiable work in homes goes to building control through the scheme within 30 days of completion (Building Regulations 2010 reg 20(3))${scheme.partPDays < 30 ? `; ${scheme.name} asks for ${scheme.partPDays} days` : ''}.`
  );
  table(
    ['Certificate', 'Client and site', 'Deadline', 'Status', 'Notified', 'Scheme reference'],
    pp.map((c) => [
      `${typeLabel(c.report_type)} ${c.certificate_number ?? ''}`,
      [c.client_name, c.installation_address].filter(Boolean).join(', '),
      ukDate(c.part_p?.deadline),
      c.part_p ? (PARTP_STATUS[c.part_p.status] ?? c.part_p.status) : 'No record',
      ukDate(c.part_p?.submitted_at),
      c.part_p?.reference ?? '',
    ]),
    'No notifiable work in this period',
    [45, 100, 26, 26, 26]
  );

  // Footer on every page.
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(140, 140, 140);
    doc.text(`${firmName} · ${scheme.name} assessment pack`, mx, pageH - 5);
    doc.text(`Page ${i} of ${pages}`, pageW - mx, pageH - 5, { align: 'right' });
  }
  return doc;
}
