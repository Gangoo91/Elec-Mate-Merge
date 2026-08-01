/**
 * Elec-ID verification PDF — the one-pager a site manager staples into the
 * induction pack. Generated client-side from the public verify page, carries
 * a QR back to the live record so paper can always be re-checked.
 */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { getBrandColour, readableTextOn } from '@/utils/pdfBrand';

export interface VerificationPdfInput {
  name: string;
  role: string;
  elecIdNumber: string;
  isVerified: boolean;
  verifiedAt: string | null;
  ecsCardLabel: string | null;
  ecsCardNumber: string | null;
  ecsExpiry: string | null;
  qualifications: {
    name: string;
    awardingBody: string | null;
    dateAchieved: string | null;
    expiryDate: string | null;
    verified: boolean;
  }[];
  skillsCount: number;
  yearsExperience: number | null;
  /** PNG data URL of the QR code pointing at the live verify page. */
  qrDataUrl: string | null;
}

const fmt = (iso: string | null) =>
  iso ? format(new Date(iso), 'dd/MM/yyyy') : '—';

export async function generateElecIdVerificationPdf(input: VerificationPdfInput): Promise<void> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const brand = getBrandColour();
  const onBrand = readableTextOn(brand);
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 16;
  const verifyUrl = `https://www.elec-mate.com/verify/${input.elecIdNumber}`;

  // ── Header band ──
  doc.setFillColor(...brand);
  doc.rect(0, 0, pageW, 34, 'F');
  doc.setTextColor(...onBrand);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Elec-ID Credential Verification', margin, 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(
    'Verified professional record — re-check any time by scanning the QR code or visiting the link below.',
    margin,
    21
  );
  doc.setFontSize(9);
  doc.setFont('courier', 'normal');
  doc.text(verifyUrl, margin, 28);

  // ── QR (top right, overlapping the band edge) ──
  if (input.qrDataUrl) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(pageW - margin - 34, 6, 34, 34, 2, 2, 'F');
    doc.addImage(input.qrDataUrl, 'PNG', pageW - margin - 31, 9, 28, 28);
  }

  // ── Identity ──
  let y = 52;
  doc.setTextColor(20, 20, 20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(input.name, margin, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(input.role, margin, y);
  y += 9;

  const statusColour: [number, number, number] = input.isVerified ? [30, 122, 58] : [138, 109, 0];
  doc.setFillColor(...statusColour);
  doc.roundedRect(margin, y - 4.5, input.isVerified ? 58 : 46, 7, 3.5, 3.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text(
    input.isVerified
      ? `VERIFIED ${input.verifiedAt ? fmt(input.verifiedAt) : ''}`.trim()
      : 'REGISTERED',
    margin + 3,
    y
  );
  y += 10;

  // ── Summary table ──
  autoTable(doc, {
    startY: y,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 1.8, textColor: [30, 30, 30] },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 48 } },
    body: [
      ['Elec-ID number', input.elecIdNumber],
      ['ECS card', input.ecsCardLabel ?? 'Not recorded'],
      ...(input.ecsCardNumber ? [['ECS card number', input.ecsCardNumber]] : []),
      ...(input.ecsExpiry ? [['ECS card expiry', fmt(input.ecsExpiry)]] : []),
      ...(input.yearsExperience != null
        ? [['Experience', `${input.yearsExperience} years`]]
        : []),
      ['Skills recorded', String(input.skillsCount)],
      ['Verification checked', format(new Date(), 'dd/MM/yyyy HH:mm')],
    ] as string[][],
  });

  // ── Qualifications ──
  const lastY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y;
  if (input.qualifications.length) {
    doc.setTextColor(...brand);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Qualifications', margin, lastY + 12);
    autoTable(doc, {
      startY: lastY + 15,
      head: [['Qualification', 'Awarding body', 'Achieved', 'Expires', 'Status']],
      body: input.qualifications.map((q) => [
        q.name,
        q.awardingBody ?? '—',
        fmt(q.dateAchieved),
        q.expiryDate ? fmt(q.expiryDate) : '—',
        q.verified ? 'Verified' : 'Declared',
      ]),
      styles: { fontSize: 9, cellPadding: 2, textColor: [30, 30, 30] },
      headStyles: { fillColor: brand, textColor: onBrand, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [246, 246, 246] },
      margin: { left: margin, right: margin },
    });
  }

  // ── Footer ──
  const h = doc.internal.pageSize.getHeight();
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    `This document reflects the live Elec-ID record at the time of generation. Paper goes stale — the QR code never does. Elec-Mate · elec-mate.com`,
    margin,
    h - 10,
    { maxWidth: pageW - margin * 2 }
  );

  const safe = input.name.replace(/[^\w\- ]+/g, '').trim().replace(/ +/g, '-');
  await saveOrSharePdf(doc, `elec-id-verification-${safe}-${format(new Date(), 'yyyyMMdd')}.pdf`);
}
