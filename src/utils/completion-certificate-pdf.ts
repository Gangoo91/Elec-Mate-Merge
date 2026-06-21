import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import {
  getBrandColour,
  fitContain,
  ensureSpace,
  addAccentBar,
  readableTextOn,
} from '@/utils/pdfBrand';

interface CertificateData {
  companyName?: string;
  companyLogoUrl?: string;
  propertyAddress?: string;
  clientName?: string;
  rooms?: Array<{
    roomName: string;
    items: Array<{ itemDescription: string; quantity: number; unit: string }>;
  }>;
  beforePhotoUrls?: string[];
  afterPhotoUrls?: string[];
  signatureData?: string;
  signedAt?: string;
  referenceId?: string;
  /** Optional brand colour source (hex or company-profile-like) for the header accent. */
  brandColour?: string;
}

async function loadImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generateCompletionCertificatePDF(data: CertificateData): Promise<jsPDF> {
  const doc = new jsPDF('portrait', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;
  let yPos = 0;

  const brand = getBrandColour(data.brandColour);

  // --- Header bar ---
  const headerHeight = 40;
  doc.setFillColor(brand[0], brand[1], brand[2]);
  doc.rect(0, 0, pageWidth, headerHeight, 'F');
  addAccentBar(doc, brand);

  // Company logo (if available)
  if (data.companyLogoUrl) {
    try {
      const logoDataUrl = await loadImageAsDataUrl(data.companyLogoUrl);
      if (logoDataUrl) {
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(margin - 2, 5, 34, 30, 3, 3, 'F');
        doc.addImage(logoDataUrl, 'PNG', margin, 7, 30, 26);
      }
    } catch {
      // Logo failed — continue without it
    }
  }

  const textStartX = data.companyLogoUrl ? margin + 40 : pageWidth / 2;
  const textAlign: 'left' | 'center' = data.companyLogoUrl ? 'left' : 'center';

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(data.companyName || 'Completion Certificate', textStartX, 16, {
    align: textAlign,
  });

  doc.setFontSize(12);
  doc.text('COMPLETION CERTIFICATE', textStartX, 26, {
    align: textAlign,
  });

  doc.setFontSize(9);
  doc.text(`Ref: ${data.referenceId || 'N/A'}`, textStartX, 34, { align: textAlign });

  yPos = headerHeight + 12;

  // --- Property details ---
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Property Details', margin, yPos);
  yPos += 7;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  if (data.propertyAddress) {
    doc.text(`Address: ${data.propertyAddress}`, margin, yPos);
    yPos += 5;
  }
  if (data.clientName) {
    doc.text(`Client: ${data.clientName}`, margin, yPos);
    yPos += 5;
  }
  if (data.signedAt) {
    doc.text(`Signed: ${format(new Date(data.signedAt), 'dd MMMM yyyy')}`, margin, yPos);
    yPos += 5;
  }

  yPos += 8;

  // --- Scope of works table ---
  if (data.rooms && data.rooms.length > 0) {
    // Keep the section heading with at least the table header row.
    yPos = ensureSpace(doc, yPos, 24, { bottomMargin: 30, topAfterBreak: 20 });
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Scope of Works', margin, yPos);
    yPos += 6;

    const tableBody: string[][] = [];
    for (const room of data.rooms) {
      for (const item of room.items) {
        tableBody.push([room.roomName, item.itemDescription, `${item.quantity} ${item.unit}`]);
      }
    }

    if (tableBody.length > 0) {
      autoTable(doc, {
        startY: yPos,
        head: [['Room', 'Item', 'Quantity']],
        body: tableBody,
        theme: 'striped',
        headStyles: { fillColor: brand, textColor: readableTextOn(brand), fontSize: 9 },
        styles: { fontSize: 9 },
        margin: { left: margin, right: margin },
        columnStyles: {
          0: { cellWidth: 45 },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 30, halign: 'center' },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- jspdf-autotable extends doc
      yPos = (doc as any).lastAutoTable.finalY + 10;
    }
  }

  // --- Before photos ---
  const maxPhotosPerRow = 2;
  const photoWidth = 40;
  const photoHeight = 30;

  if (data.beforePhotoUrls && data.beforePhotoUrls.length > 0) {
    const photosToShow = data.beforePhotoUrls.slice(0, 4);
    const photoRows = Math.ceil(photosToShow.length / maxPhotosPerRow);
    // Heading (6) + the photo grid; keep the whole block together.
    yPos = ensureSpace(doc, yPos, 6 + photoRows * (photoHeight + 5), {
      bottomMargin: 30,
      topAfterBreak: 20,
    });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Before Photos (${data.beforePhotoUrls.length})`, margin, yPos);
    yPos += 6;

    for (let i = 0; i < photosToShow.length; i++) {
      const col = i % maxPhotosPerRow;
      const row = Math.floor(i / maxPhotosPerRow);
      const x = margin + col * (photoWidth + 5);
      const y = yPos + row * (photoHeight + 5);

      try {
        const imgData = await loadImageAsDataUrl(photosToShow[i]);
        if (imgData) {
          const props = doc.getImageProperties(imgData);
          const fit = fitContain(props.width, props.height, x, y, photoWidth, photoHeight);
          doc.addImage(imgData, 'JPEG', fit.x, fit.y, fit.w, fit.h);
        }
      } catch {
        doc.setDrawColor(200, 200, 200);
        doc.rect(x, y, photoWidth, photoHeight);
      }
    }

    yPos += photoRows * (photoHeight + 5) + 5;
  }

  // --- After photos ---
  if (data.afterPhotoUrls && data.afterPhotoUrls.length > 0) {
    const photosToShow = data.afterPhotoUrls.slice(0, 4);
    const photoRows = Math.ceil(photosToShow.length / maxPhotosPerRow);
    yPos = ensureSpace(doc, yPos, 6 + photoRows * (photoHeight + 5), {
      bottomMargin: 30,
      topAfterBreak: 20,
    });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`After Photos (${data.afterPhotoUrls.length})`, margin, yPos);
    yPos += 6;

    for (let i = 0; i < photosToShow.length; i++) {
      const col = i % maxPhotosPerRow;
      const row = Math.floor(i / maxPhotosPerRow);
      const x = margin + col * (photoWidth + 5);
      const y = yPos + row * (photoHeight + 5);

      try {
        const imgData = await loadImageAsDataUrl(photosToShow[i]);
        if (imgData) {
          const props = doc.getImageProperties(imgData);
          const fit = fitContain(props.width, props.height, x, y, photoWidth, photoHeight);
          doc.addImage(imgData, 'JPEG', fit.x, fit.y, fit.w, fit.h);
        }
      } catch {
        doc.setDrawColor(200, 200, 200);
        doc.rect(x, y, photoWidth, photoHeight);
      }
    }

    yPos += photoRows * (photoHeight + 5) + 5;
  }

  // --- Signature ---
  if (data.signatureData) {
    yPos = ensureSpace(doc, yPos, 50, { bottomMargin: 30, topAfterBreak: 20 });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Client Signature', margin, yPos);
    yPos += 6;

    try {
      const sigProps = doc.getImageProperties(data.signatureData);
      const sigFit = fitContain(sigProps.width, sigProps.height, margin, yPos, 60, 25);
      doc.addImage(data.signatureData, 'PNG', sigFit.x, sigFit.y, sigFit.w, sigFit.h);
      yPos += 28;
    } catch {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.text('[Signature on file]', margin, yPos + 10);
      yPos += 15;
    }

    if (data.clientName) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(data.clientName, margin, yPos);
      yPos += 5;
    }

    if (data.signedAt) {
      doc.setFontSize(9);
      doc.text(format(new Date(data.signedAt), 'dd MMMM yyyy, HH:mm'), margin, yPos);
    }
  }

  // --- Footer ---
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'All work completed to BS 7671:2018+A4:2026 standards.',
    pageWidth / 2,
    pageHeight - 20,
    { align: 'center' }
  );
  doc.text('Powered by Elec-Mate', pageWidth / 2, pageHeight - 14, { align: 'center' });

  return doc;
}

export async function downloadCompletionCertificatePDF(data: CertificateData): Promise<void> {
  const doc = await generateCompletionCertificatePDF(data);
  const fileName = `Completion_Certificate_${data.referenceId || 'CERT'}_${format(new Date(), 'yyyyMMdd')}.pdf`;
  await saveOrSharePdf(doc, fileName);
}
