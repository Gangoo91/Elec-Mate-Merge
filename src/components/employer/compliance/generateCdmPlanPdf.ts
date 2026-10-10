/**
 * Construction phase plan PDF (ELE-2076, CDM 2015 reg 12 / 15(5)). Laid out
 * on the HSE CIS80 headings (Plan, Organise, Work together) with the L153
 * Appendix 3 content: description and key dates, site rules, induction,
 * welfare, fire and emergency, cooperation, and control of the site risks.
 * Generic risk assessments and method statements are left out on purpose
 * (L153 App 3 para 4): the RAMS are referenced, not copied.
 */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getBrandColour, addAccentBar, readableTextOn } from '@/utils/pdfBrand';
import { ROLE_LABEL, f10Check, type CdmDetails, type FirmRole } from './cdm';

const ukDate = (iso?: string | null) =>
  iso
    ? new Date(`${iso.slice(0, 10)}T00:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Not set';

export interface CdmPdfInput {
  company: {
    company_name: string | null;
    company_address?: string | null;
    company_phone?: string | null;
    accent_color?: string | null;
    primary_color?: string | null;
  } | null;
  job: {
    title: string;
    client: string | null;
    location: string | null;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
    site_contact_name?: string | null;
    site_contact_phone?: string | null;
    access_notes?: string | null;
  };
  plan: {
    firm_role: FirmRole;
    domestic_client: boolean;
    working_days: number | null;
    peak_workers: number | null;
    person_days: number | null;
    details: CdmDetails;
  };
  crew: { name: string; role: string | null; phone?: string | null }[];
  responsible: { name: string; phone?: string | null } | null;
  rams: { title: string; status: string | null; hazards: string[] }[];
  inducted: { name: string; at: string }[];
}

export function generateCdmPlanPdf(input: CdmPdfInput): jsPDF {
  const { company, job, plan, crew, responsible, rams, inducted } = input;
  const d = plan.details;
  const brand = getBrandColour(company ?? undefined);
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const mx = 14;
  const head = { fillColor: brand, textColor: readableTextOn(brand), fontStyle: 'bold' as const };
  const styles = { fontSize: 9.5, cellPadding: 2.2, overflow: 'linebreak' as const };
  let y = 0;
  const last = () =>
    (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y;

  const heading = (t: string) => {
    if (y > pageH - 40) {
      doc.addPage();
      y = 18;
    } else y += 9;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12.5);
    doc.setTextColor(30, 30, 30);
    doc.text(t, mx, y);
    y += 3;
  };

  const kv = (rows: [string, string][]) => {
    autoTable(doc, {
      startY: y,
      margin: { left: mx, right: mx, top: 16 },
      theme: 'grid',
      styles,
      body: rows.map(([k, v]) => [k, v || 'Not recorded']),
      columnStyles: { 0: { cellWidth: 52, fontStyle: 'bold', fillColor: [245, 245, 245] } },
    });
    y = last();
  };

  addAccentBar(doc, brand, 4);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(30, 30, 30);
  doc.text('Construction phase plan', mx, 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(70, 70, 70);
  doc.text(
    `${job.title}  ·  ${company?.company_name || 'Our firm'}  ·  Prepared ${ukDate(new Date().toISOString())}`,
    mx,
    27
  );
  doc.setFontSize(8.5);
  doc.text(
    doc.splitTextToSize(
      'Drawn up under the Construction (Design and Management) Regulations 2015 (regulation 12, or regulation 15(5) where we are the only contractor). Kept on site and updated if the work changes.',
      pageW - mx * 2
    ),
    mx,
    32
  );
  y = 38;

  /* Plan */
  heading('1. The project');
  kv([
    ['Job', job.title],
    ['Client', `${job.client ?? ''}${plan.domestic_client ? ' (domestic client)' : ''}`],
    ['Site address', job.location ?? ''],
    ['Start and finish', `${ukDate(job.start_date)} to ${ukDate(job.end_date)}`],
    ['Our role', ROLE_LABEL[plan.firm_role]],
    [
      'Contractor',
      [company?.company_name, company?.company_address, company?.company_phone]
        .filter(Boolean)
        .join(', '),
    ],
    ['Site contact', [job.site_contact_name, job.site_contact_phone].filter(Boolean).join(', ')],
    ['Description of the work', d.scope || job.description || ''],
    ['Access', job.access_notes ?? ''],
  ]);

  const f10 = f10Check({
    workingDays: plan.working_days,
    peakWorkers: plan.peak_workers,
    personDays: plan.person_days,
    domestic: plan.domestic_client,
    firmRole: plan.firm_role,
  });
  heading('2. Notification to HSE (F10)');
  kv([
    ['Working days', plan.working_days == null ? '' : String(plan.working_days)],
    ['Most people on site at once', plan.peak_workers == null ? '' : String(plan.peak_workers)],
    ['Person days', plan.person_days == null ? '' : String(plan.person_days)],
    [
      'Result',
      `${f10.notifiable ? 'Notifiable.' : 'Not notifiable.'} ${f10.reason}${f10.notifiable ? ` ${f10.who}` : ''}`,
    ],
  ]);

  heading('3. Services, asbestos and the main dangers');
  kv([
    ['Services and isolation points', d.services],
    ['Asbestos', d.asbestos],
    [
      'Main dangers and controls',
      [d.hazards, ...rams.flatMap((r) => r.hazards)].filter(Boolean).join('\n'),
    ],
    [
      'RAMS for this job',
      rams.length
        ? rams.map((r) => `${r.title}${r.status ? ` (${r.status})` : ''}`).join('\n')
        : 'No RAMS linked to the job',
    ],
  ]);

  /* Organise */
  heading('4. Who is in charge and who is on the job');
  kv([
    [
      'Person responsible for running the job safely',
      responsible ? [responsible.name, responsible.phone].filter(Boolean).join(', ') : '',
    ],
  ]);
  autoTable(doc, {
    startY: y + 2,
    margin: { left: mx, right: mx, top: 16 },
    theme: 'grid',
    headStyles: head,
    styles,
    head: [['Name', 'Role on the job', 'Inducted']],
    body: crew.length
      ? crew.map((c) => {
          const ind = inducted.find((i) => i.name === c.name);
          return [c.name, c.role ?? '', ind ? ukDate(ind.at) : 'Not yet'];
        })
      : [['Nobody assigned yet', '', '']],
  });
  y = last();

  heading('5. Site rules');
  kv([['Site rules', d.site_rules]]);

  heading('6. Induction, cooperation and involving workers');
  kv([
    ['Induction', d.induction],
    ['Working with others', d.cooperation],
  ]);

  heading('7. Welfare');
  kv([['Toilets, washing, drinking water and rest', d.welfare]]);

  heading('8. Fire and emergency arrangements');
  kv([
    ['First aid', d.first_aid],
    ['Emergency', d.emergency],
    ['Fire', d.fire],
  ]);

  // Sign-off and footer.
  if (y > pageH - 40) {
    doc.addPage();
    y = 18;
  }
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(40, 40, 40);
  doc.text('Prepared by: ____________________________', mx, y);
  doc.text('Date: ______________', pageW - mx - 50, y);

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setTextColor(150, 150, 150);
    doc.text(`Construction phase plan · ${job.title}`, mx, pageH - 7);
    doc.text(`Page ${i} of ${pages}`, pageW - mx, pageH - 7, { align: 'right' });
  }
  return doc;
}
