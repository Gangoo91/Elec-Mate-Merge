/**
 * Zip of the assessment pack's source documents (ELE-2069): the pack PDF,
 * a CSV per section, and the files we hold: insurance and compliance
 * certificates (private bucket, signed for 10 minutes by firm-pack-files so
 * files any team member uploaded come through; browser signing until it is
 * deployed), Part P scheme
 * certificates, and the PDFs of the sampled certificates. A file we cannot
 * fetch is listed in MISSING.txt rather than failing the whole zip.
 */
import JSZip from 'jszip';
import type jsPDF from 'jspdf';
import { signFirmDocuments } from '@/components/employer/compliance/packFiles';
import type { AssessmentPackData, PackCertificate } from './types';
import { typeLabel } from './schemes';
import type { Gap } from './readiness';

const csvCell = (v: unknown) => {
  const s = v == null ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const csv = (rows: unknown[][]) => rows.map((r) => r.map(csvCell).join(',')).join('\n');
const safe = (s: string) => s.replace(/[^\w.-]+/g, '_').slice(0, 80);

async function fetchBlob(url: string): Promise<Blob | null> {
  try {
    const r = await fetch(url);
    return r.ok ? await r.blob() : null;
  } catch {
    return null;
  }
}

const ext = (name: string, blob: Blob) => {
  const m = name.match(/\.(pdf|png|jpe?g|webp|heic)$/i);
  if (m) return '';
  if (blob.type.includes('pdf')) return '.pdf';
  if (blob.type.includes('png')) return '.png';
  if (blob.type.includes('jpeg')) return '.jpg';
  return '';
};

export async function buildPackZip(input: {
  data: AssessmentPackData;
  pdf: jsPDF;
  pdfName: string;
  sample: PackCertificate[];
  gaps: Gap[];
  onProgress?: (text: string) => void;
}): Promise<Blob> {
  const { data, pdf, pdfName, sample, gaps, onProgress } = input;
  const zip = new JSZip();
  const missing: string[] = [];
  zip.file(pdfName, pdf.output('blob'));

  const s = zip.folder('sections')!;
  s.file(
    'certificates-issued.csv',
    csv([
      ['Date', 'Type', 'Number', 'Client', 'Site', 'By', 'QS', 'Part P', 'Part P reference'],
      ...data.certificates.map((c) => [
        c.issued_on,
        typeLabel(c.report_type),
        c.certificate_number,
        c.client_name,
        c.installation_address,
        c.owner_name,
        c.qs_status ?? '',
        c.part_p?.status ?? (c.part_p_verdict === 'yes' ? 'pending' : ''),
        c.part_p?.reference ?? '',
      ]),
    ])
  );
  s.file(
    'suggested-sample.csv',
    csv([
      ['Date', 'Type', 'Number', 'Client', 'Site', 'By'],
      ...sample.map((c) => [
        c.issued_on,
        typeLabel(c.report_type),
        c.certificate_number,
        c.client_name,
        c.installation_address,
        c.owner_name,
      ]),
    ])
  );
  s.file(
    'qs-reviews.csv',
    csv([
      ['Sent', 'Type', 'Electrician', 'Result', 'Reviewed by', 'Reviewed', 'Reasons', 'Comments'],
      ...data.qs_reviews.map((q) => [
        q.submitted_at?.slice(0, 10),
        typeLabel(q.report_type),
        q.electrician,
        q.self_certified ? 'self-certified' : q.status,
        q.reviewer_name,
        q.reviewed_at?.slice(0, 10),
        q.reasons.join('; '),
        q.comments,
      ]),
    ])
  );
  s.file(
    'instruments-calibration.csv',
    csv([
      [
        'Instrument',
        'Serial',
        'Held by',
        'Last calibrated',
        'Due',
        'Checked on',
        'Result',
        'Certificate ref',
      ],
      ...data.instruments.flatMap((i) =>
        i.checks.length
          ? i.checks.map((c) => [
              i.name,
              i.serial,
              i.holder,
              i.last_calibration,
              i.next_calibration,
              c.checked_on,
              c.result,
              c.certificate_ref,
            ])
          : [[i.name, i.serial, i.holder, i.last_calibration, i.next_calibration, '', '', '']]
      ),
    ])
  );
  s.file(
    'team-competence.csv',
    csv([
      [
        'Person',
        'Role',
        'QS',
        'Qualification',
        'Category',
        'Awarding body',
        'Number',
        'Achieved',
        'Expires',
        'Verification',
      ],
      ...data.team.flatMap((p) =>
        (p.qualifications.length ? p.qualifications : [null]).map((q) => [
          p.name,
          p.role,
          p.is_principal_qs ? 'Yes' : '',
          q?.label ?? 'None on record',
          q?.category,
          q?.awarding_body,
          q?.number,
          q?.achieved,
          q?.expiry,
          q?.verification,
        ])
      ),
    ])
  );
  s.file(
    'complaints-log.csv',
    csv([
      [
        'Received',
        'Type',
        'Channel',
        'Complainant',
        'Summary',
        'Owner',
        'Acknowledged',
        'Reply due',
        'Outcome',
        'Detail',
        'ICO route given',
        'Closed',
      ],
      ...data.complaints.map((c) => [
        c.received_on,
        c.kind,
        c.channel,
        c.complainant_name,
        c.summary,
        c.owner_name,
        c.acknowledged_on,
        c.response_due,
        c.outcome_kind,
        c.outcome,
        c.kind === 'data_protection' ? (c.ico_route_given ? 'Yes' : 'No') : '',
        c.closed_on,
      ]),
    ])
  );
  s.file(
    'insurance-and-documents.csv',
    csv([
      ['Document', 'Category', 'Cover', 'Insurer', 'Policy number', 'Limit', 'Renews', 'File held'],
      ...data.documents.map((d) => [
        d.title,
        d.category,
        d.insurance_kind,
        d.insurer,
        d.policy_number,
        d.cover_amount,
        d.expiry_date,
        d.file_url ? 'Yes' : 'No',
      ]),
    ])
  );
  s.file(
    'policies.csv',
    csv([
      ['Policy', 'Version', 'Published', 'Review due', 'Signed by'],
      ...data.policies.map((p) => [
        p.name,
        p.published_version ?? p.version,
        p.published_at?.slice(0, 10),
        p.review_date,
        p.acknowledged,
      ]),
    ])
  );
  s.file(
    'before-the-visit.csv',
    csv([['Area', 'What to put right', 'Where'], ...gaps.map((g) => [g.area, g.text, g.route])])
  );

  // Insurance and compliance files.
  const docs = data.documents.filter((d) => d.file_url);
  const df = zip.folder('insurance-and-documents')!;
  // A Settings record's file sits on its certificate row (Gap #10).
  const links = docs.length
    ? await signFirmDocuments(docs.map((d) => ({ id: d.file_id ?? d.id, file_url: d.file_url })))
    : {};
  for (const [i, d] of docs.entries()) {
    onProgress?.(`Adding documents ${i + 1} of ${docs.length}`);
    const url = links[d.file_id ?? d.id];
    const blob = url ? await fetchBlob(url) : null;
    if (!blob) {
      missing.push(
        `Document: ${d.title} (${url ? 'the file could not be downloaded' : 'uploaded by someone else, so only they can add it for now'})`
      );
      continue;
    }
    const base = safe(`${d.title}-${(d.file_url!.split('/').pop() ?? '').replace(/^\d+-/, '')}`);
    df.file(base + ext(base, blob), blob);
  }

  // Part P scheme certificates.
  const pp = data.certificates.filter((c) => c.part_p?.certificate_url);
  const pf = zip.folder('part-p-scheme-certificates')!;
  for (const [i, c] of pp.entries()) {
    onProgress?.(`Adding Part P certificates ${i + 1} of ${pp.length}`);
    const blob = await fetchBlob(c.part_p!.certificate_url!);
    if (!blob) {
      missing.push(`Part P certificate for ${c.certificate_number ?? c.report_id}`);
      continue;
    }
    const base = safe(`${c.certificate_number ?? c.report_id}-scheme-certificate`);
    pf.file(base + (ext(base, blob) || '.pdf'), blob);
  }

  // PDFs of the sampled certificates, where one is stored.
  const cf = zip.folder('sample-certificates')!;
  for (const [i, c] of sample.entries()) {
    onProgress?.(`Adding sample certificates ${i + 1} of ${sample.length}`);
    if (!c.pdf_url) {
      missing.push(
        `${typeLabel(c.report_type)} ${c.certificate_number ?? ''}: no stored PDF (open it from the certificate)`
      );
      continue;
    }
    const blob = await fetchBlob(c.pdf_url);
    if (!blob) {
      missing.push(
        `${typeLabel(c.report_type)} ${c.certificate_number ?? ''}: PDF could not be fetched`
      );
      continue;
    }
    cf.file(`${safe(c.certificate_number ?? c.report_id)}.pdf`, blob);
  }

  if (missing.length)
    zip.file(
      'MISSING.txt',
      `These could not be added to the zip:\n\n${missing.map((m) => `- ${m}`).join('\n')}\n`
    );
  onProgress?.('Compressing');
  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
}
