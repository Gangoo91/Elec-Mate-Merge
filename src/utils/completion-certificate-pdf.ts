import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

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

  // --- Header bar ---
  const headerHeight = 40;
  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, pageWidth, headerHeight, 'F');

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
        headStyles: { fillColor: [30, 64, 175], fontSize: 9 },
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
    // Check if we need a new page
    if (yPos + 50 > pageHeight - 30) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Before Photos (${data.beforePhotoUrls.length})`, margin, yPos);
    yPos += 6;

    const photosToShow = data.beforePhotoUrls.slice(0, 4);
    for (let i = 0; i < photosToShow.length; i++) {
      const col = i % maxPhotosPerRow;
      const row = Math.floor(i / maxPhotosPerRow);
      const x = margin + col * (photoWidth + 5);
      const y = yPos + row * (photoHeight + 5);

      try {
        const imgData = await loadImageAsDataUrl(photosToShow[i]);
        if (imgData) {
          doc.addImage(imgData, 'JPEG', x, y, photoWidth, photoHeight);
        }
      } catch {
        doc.setDrawColor(200, 200, 200);
        doc.rect(x, y, photoWidth, photoHeight);
      }
    }

    const rows = Math.ceil(photosToShow.length / maxPhotosPerRow);
    yPos += rows * (photoHeight + 5) + 5;
  }

  // --- After photos ---
  if (data.afterPhotoUrls && data.afterPhotoUrls.length > 0) {
    if (yPos + 50 > pageHeight - 30) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`After Photos (${data.afterPhotoUrls.length})`, margin, yPos);
    yPos += 6;

    const photosToShow = data.afterPhotoUrls.slice(0, 4);
    for (let i = 0; i < photosToShow.length; i++) {
      const col = i % maxPhotosPerRow;
      const row = Math.floor(i / maxPhotosPerRow);
      const x = margin + col * (photoWidth + 5);
      const y = yPos + row * (photoHeight + 5);

      try {
        const imgData = await loadImageAsDataUrl(photosToShow[i]);
        if (imgData) {
          doc.addImage(imgData, 'JPEG', x, y, photoWidth, photoHeight);
        }
      } catch {
        doc.setDrawColor(200, 200, 200);
        doc.rect(x, y, photoWidth, photoHeight);
      }
    }

    const rows = Math.ceil(photosToShow.length / maxPhotosPerRow);
    yPos += rows * (photoHeight + 5) + 5;
  }

  // --- Signature ---
  if (data.signatureData) {
    if (yPos + 50 > pageHeight - 30) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Client Signature', margin, yPos);
    yPos += 6;

    try {
      doc.addImage(data.signatureData, 'PNG', margin, yPos, 60, 25);
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
    'All work completed to BS 7671:2018+A3:2024 standards.',
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
  doc.save(fileName);
}
