import jsPDF from 'jspdf';
import { createEICRTemplate } from './pdfTemplates';
import {
  formatCircuitDataForPDF,
  formatTestResultsForPDF,
  formatInspectionDataForPDF,
  formatObservationsForPDF,
  formatSupplyCharacteristics,
  formatInstallationDetails,
  formatClientDetails,
  formatInspectorDetails,
  formatCompanyBranding,
  getDefectCodeDescription,
  getUrgencyLevel
} from './pdfDataFormatters';
import { supabase } from '@/integrations/supabase/client';

interface DefectObservation {
  id: string;
  item: string;
  defectCode: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A' | 'LIM';
  description: string;
  recommendation: string;
  rectified: boolean;
}

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'not-verified' | 'limitation';
  notes?: string;
}

interface ExportOptions {
  includeHeader?: boolean;
  includeFooter?: boolean;
  format?: 'A4' | 'Letter';
  includeInspectionChecklist?: boolean;
  includeTestResults?: boolean;
  includeDigitalSignatures?: boolean;
}

// Track if Unicode font is available for proper symbols
let unicodeFontAvailable = false;

// Helper to get the correct font name based on Unicode support
const getFont = (): string => unicodeFontAvailable ? 'Roboto' : 'helvetica';

// Helper to get proper symbol - uses Unicode if font available, ASCII fallback otherwise
const getSymbol = (type: 'squared' | 'ohm' | 'degree'): string => {
  if (unicodeFontAvailable) {
    switch (type) {
      case 'squared': return '²';
      case 'ohm': return 'Ω';
      case 'degree': return '°';
    }
  }
  // ASCII fallbacks
  switch (type) {
    case 'squared': return '2';
    case 'ohm': return ' Ohms';
    case 'degree': return ' deg';
  }
};

// Helper to ensure any value is a safe string for pdf.text()
const toSafeString = (val: any): string => {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') return val;
  return String(val);
};

// Patch jsPDF instance to log and fix any non-string values
const patchPdfText = (pdf: jsPDF): void => {
  // Patch text()
  const originalText = pdf.text.bind(pdf);
  (pdf as any).text = (text: any, x: number, y: number, options?: any) => {
    if (text !== null && text !== undefined && typeof text !== 'string' && !Array.isArray(text)) {
      console.error('[PDF DEBUG] Non-string passed to pdf.text:', typeof text, text);
      console.trace('[PDF DEBUG] Stack trace:');
    }
    let safeText: string | string[];
    if (Array.isArray(text)) {
      safeText = text.map(t => (t === null || t === undefined) ? '' : String(t));
    } else {
      safeText = (text === null || text === undefined) ? '' : String(text);
    }
    try {
      return originalText(safeText, x, y, options);
    } catch (err) {
      console.error('[PDF DEBUG] pdf.text FAILED with:', { text: safeText, x, y, options });
      console.error('[PDF DEBUG] Error:', err);
      throw err;
    }
  };

  // Patch splitTextToSize()
  const originalSplit = pdf.splitTextToSize.bind(pdf);
  (pdf as any).splitTextToSize = (text: any, maxWidth: number, options?: any) => {
    if (text !== null && text !== undefined && typeof text !== 'string') {
      console.error('[PDF DEBUG] Non-string passed to splitTextToSize:', typeof text, text);
      console.trace('[PDF DEBUG] Stack trace:');
    }
    const safeText = (text === null || text === undefined) ? '' : String(text);
    try {
      return originalSplit(safeText, maxWidth, options);
    } catch (err) {
      console.error('[PDF DEBUG] splitTextToSize FAILED with:', { text: safeText, maxWidth });
      console.error('[PDF DEBUG] Error:', err);
      throw err;
    }
  };
};

// Helper to add signature image
const addSignatureToPDF = async (pdf: jsPDF, signatureData: string, x: number, y: number, width: number = 60, height: number = 20): Promise<void> => {
  return new Promise((resolve) => {
    if (signatureData && signatureData.startsWith('data:image/')) {
      try {
        pdf.addImage(signatureData, 'PNG', x, y, width, height);
      } catch (error) {
        console.warn('Failed to add signature image:', error);
      }
    }
    resolve();
  });
};

// Helper to check if new page needed
const addNewPageIfNeeded = (pdf: jsPDF, yPosition: number, requiredSpace: number = 60): number => {
  if (yPosition > pdf.internal.pageSize.getHeight() - requiredSpace) {
    pdf.addPage();
    return 20;
  }
  return yPosition;
};

// Draw checkbox matching BS 7671 format
const drawCheckbox = (pdf: jsPDF, x: number, y: number, checked: boolean = false, size: number = 4) => {
  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.3);
  pdf.rect(x, y, size, size);

  if (checked) {
    // Draw checkmark using lines (jsPDF doesn't support Unicode)
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(0, 128, 0); // Green checkmark
    pdf.line(x + 0.8, y + size/2, x + size/2 - 0.3, y + size - 1);
    pdf.line(x + size/2 - 0.3, y + size - 1, x + size - 0.8, y + 1);
    pdf.setDrawColor(0, 0, 0);
  }
};

// Draw section header with yellow accent
const drawSectionHeader = (pdf: jsPDF, title: string, y: number, pageWidth: number): number => {
  const margin = 15;

  // Grey background
  pdf.setFillColor(74, 85, 104);
  pdf.rect(margin, y, pageWidth - 2 * margin, 7, 'F');

  // Title text
  pdf.setFontSize(9);
  pdf.setFont(getFont(), 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text(title, margin + 3, y + 5);

  pdf.setTextColor(0, 0, 0);
  return y + 10;
};

// Draw form row with label and value
const drawFormRow = (pdf: jsPDF, label: string, value: any, x: number, y: number, labelWidth: number = 45, valueWidth: number = 60): number => {
  pdf.setFontSize(8);
  pdf.setFont(getFont(), 'bold');
  pdf.setTextColor(51, 51, 51);
  pdf.text(String(label || ''), x, y);

  pdf.setFont(getFont(), 'normal');
  pdf.setTextColor(0, 0, 0);

  // Draw input box
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.3);
  pdf.rect(x + labelWidth, y - 3.5, valueWidth, 5);

  // Value text - ensure it's a string
  const safeValue = value != null ? String(value) : '';
  if (safeValue) {
    const truncatedValue = safeValue.length > 35 ? safeValue.substring(0, 35) + '...' : safeValue;
    pdf.text(truncatedValue, x + labelWidth + 2, y);
  }

  return y + 7;
};

// Fetch photos for observations
const fetchObservationPhotos = async (observationId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('inspection_photos')
      .select('file_path')
      .eq('observation_id', observationId)
      .order('uploaded_at', { ascending: true });

    if (error) {
      console.error('Error fetching observation photos:', error);
      return [];
    }

    const photoUrls = await Promise.all(
      (data || []).map(async (photo) => {
        const { data: urlData } = supabase.storage
          .from('inspection-photos')
          .getPublicUrl(photo.file_path);
        return urlData.publicUrl;
      })
    );

    return photoUrls;
  } catch (error) {
    console.error('Error in fetchObservationPhotos:', error);
    return [];
  }
};

// Add photo to PDF with aspect ratio preservation
const addPhotoToPDF = async (pdf: jsPDF, photoUrl: string, x: number, y: number, maxWidth: number, maxHeight: number): Promise<number> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        let width = img.width;
        let height = img.height;
        const aspectRatio = width / height;

        if (width > maxWidth) {
          width = maxWidth;
          height = width / aspectRatio;
        }
        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }

        const widthMm = (width / 96) * 25.4;
        const heightMm = (height / 96) * 25.4;

        pdf.addImage(img, 'JPEG', x, y, widthMm, heightMm);
        resolve(heightMm);
      } catch (error) {
        console.error('Error adding image to PDF:', error);
        resolve(0);
      }
    };

    img.onerror = () => {
      console.error('Error loading image:', photoUrl);
      resolve(0);
    };

    img.src = photoUrl;
  });
};

export const exportObservationsToPDF = async (
  observations: DefectObservation[],
  formData: any,
  options: ExportOptions = {}
): Promise<void> => {
  const {
    includeHeader = true,
    includeFooter = true,
    format = 'A4',
    includeDigitalSignatures = true
  } = options;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: format.toLowerCase() as 'a4' | 'letter',
  });

  // Patch pdf.text to ensure all values are strings
  patchPdfText(pdf);

  const template = createEICRTemplate();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  if (includeHeader) {
    yPosition = template.addHeader(pdf, {
      ...formData,
      certificateReference: `OBS-${Date.now().toString().slice(-6)}`
    });
  }

  // Installation details
  pdf.setFontSize(12);
  pdf.setFont(getFont(), 'bold');
  pdf.text('INSTALLATION DETAILS', margin, yPosition);
  yPosition += 10;

  const installationDetails = [
    `Client: ${formData.clientName || 'Not specified'}`,
    `Installation Address: ${formData.installationAddress || 'Not specified'}`,
    `Description: ${formData.description || 'Not specified'}`,
    `Inspection Date: ${formData.inspectionDate ? new Date(formData.inspectionDate).toLocaleDateString('en-GB') : 'Not specified'}`,
    `Inspector: ${formData.inspectorName || 'Not specified'}`
  ];

  pdf.setFontSize(10);
  pdf.setFont(getFont(), 'normal');
  installationDetails.forEach(detail => {
    pdf.text(detail, margin, yPosition);
    yPosition += 6;
  });

  yPosition += 10;

  // Observations section
  pdf.setFontSize(12);
  pdf.setFont(getFont(), 'bold');
  pdf.text('DEFECTS AND OBSERVATIONS', margin, yPosition);
  yPosition += 10;

  if (observations.length === 0) {
    pdf.setFontSize(10);
    pdf.setFont(getFont(), 'normal');
    pdf.text('No defects or observations recorded during this inspection.', margin, yPosition);
  } else {
    const formattedObservations = formatObservationsForPDF(observations);

    for (let index = 0; index < formattedObservations.length; index++) {
      const obs = formattedObservations[index];
      yPosition = addNewPageIfNeeded(pdf, yPosition, 40);

      pdf.setFontSize(10);
      pdf.setFont(getFont(), 'bold');
      const safeCode = String(obs.defectCode || 'C3');
      const safeItem = String(obs.item || 'Observation');
      pdf.text(`${index + 1}. [${safeCode}] ${safeItem}`, margin, yPosition);
      yPosition += 6;

      if (obs.description) {
        pdf.setFont(getFont(), 'normal');
        const safeDesc = String(obs.description || '');
        const descLines = pdf.splitTextToSize(safeDesc, pageWidth - 2 * margin - 5);
        pdf.text(descLines, margin + 5, yPosition);
        yPosition += descLines.length * 5;
      }

      const originalObs = observations[index];
      if (originalObs?.id) {
        const photos = await fetchObservationPhotos(originalObs.id);

        if (photos.length > 0) {
          yPosition += 5;
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'italic');
          pdf.text(`Photo Evidence (${photos.length} photo${photos.length > 1 ? 's' : ''}):`, margin + 5, yPosition);
          yPosition += 8;

          for (const photoUrl of photos) {
            yPosition = addNewPageIfNeeded(pdf, yPosition, 80);
            const photoHeight = await addPhotoToPDF(pdf, photoUrl, margin + 5, yPosition, 80, 60);
            if (photoHeight > 0) {
              yPosition += photoHeight + 5;
            }
          }
        }
      }

      yPosition += 10;
    }
  }

  if (includeFooter) {
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      template.addFooter(pdf, i, totalPages, formData);
    }
  }

  const { generateObservationsFilename } = await import('./pdfFilenameGenerator');
  const filename = generateObservationsFilename(
    formData.certificateNumber || formData.certificateReference || 'EICR',
    formData.clientName || 'Client',
    formData.inspectionDate || new Date()
  );
  pdf.save(filename);
};

export const exportCompleteEICRToPDF = async (
  formData: any,
  inspectionItems: InspectionItem[] = [],
  observations: DefectObservation[] = [],
  options: ExportOptions = {}
): Promise<void> => {
  console.log('Starting professional EICR PDF generation...');

  // Sanitize all form data
  const { sanitizeObject } = await import('./inputSanitization');
  const sanitizedFormData = sanitizeObject(formData);

  // Import enhanced utilities
  const { validateEICRData, calculateQualityMetrics, generateCompletionReport } = await import('./pdfValidation');
  const {
    addDigitalSignature,
    addProfessionalWatermark,
    enhanceTableStyling,
    addCertificateValidation,
    generateCertificateMetadata,
    formatDateTime,
    safeAutoTable
  } = await import('./pdfEnhancements');

  const {
    includeHeader = true,
    includeFooter = true,
    format = 'A4',
    includeInspectionChecklist = true,
    includeTestResults = true,
    includeDigitalSignatures = true
  } = options;

  const validation = validateEICRData(sanitizedFormData, inspectionItems, observations);
  const qualityMetrics = calculateQualityMetrics(sanitizedFormData, inspectionItems, observations);

  console.log('Certificate Quality:', {
    overall: qualityMetrics.overallScore,
    completion: validation.completionScore
  });

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: format.toLowerCase() as 'a4' | 'letter',
  });

  // Patch pdf.text to ensure all values are strings - prevents charCodeAt errors
  patchPdfText(pdf);

  // Load Unicode font for symbols like Ω, ², °
  const { addUnicodeFont } = await import('./pdfFonts');
  unicodeFontAvailable = await addUnicodeFont(pdf);
  if (unicodeFontAvailable) {
    console.log('Unicode font (Roboto) loaded - symbols like mm², Ω, °C will render correctly');
  } else {
    console.warn('Unicode font not loaded, using ASCII fallbacks (mm2, Ohms, deg)');
  }

  // Set PDF metadata
  const metadata = generateCertificateMetadata(sanitizedFormData);
  pdf.setProperties(metadata);

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = margin;

  // Certificate ID
  const certificateId = sanitizedFormData.certificateReference || sanitizedFormData.certificateNumber || `EICR-${Date.now().toString().slice(-6)}`;

  // ==================== PAGE 1: HEADER & CLIENT DETAILS ====================

  // Professional title
  pdf.setFontSize(16);
  pdf.setFont(getFont(), 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('ELECTRICAL INSTALLATION', pageWidth / 2, yPos + 5, { align: 'center' });
  pdf.setFontSize(18);
  pdf.text('CONDITION REPORT', pageWidth / 2, yPos + 12, { align: 'center' });

  // Yellow accent line
  pdf.setDrawColor(255, 204, 0);
  pdf.setLineWidth(2);
  pdf.line(margin, yPos + 16, pageWidth - margin, yPos + 16);

  // Certificate number box
  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.5);
  pdf.rect(pageWidth - 55, yPos, 40, 15);
  pdf.setFontSize(7);
  pdf.setFont(getFont(), 'bold');
  pdf.text('Certificate No:', pageWidth - 53, yPos + 5);
  pdf.setFontSize(8);
  pdf.setFont(getFont(), 'normal');
  pdf.text(certificateId, pageWidth - 53, yPos + 11);

  yPos += 25;

  // CLIENT DETAILS SECTION
  yPos = drawSectionHeader(pdf, 'CLIENT DETAILS', yPos, pageWidth);

  let col1X = margin + 2;
  let col2X = pageWidth / 2 + 5;

  yPos = drawFormRow(pdf, 'Name:', sanitizedFormData.clientName || '', col1X, yPos, 30, 55);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Email:', sanitizedFormData.clientEmail || '', col2X, yPos, 30, 50);

  yPos = drawFormRow(pdf, 'Phone:', sanitizedFormData.clientPhone || '', col1X, yPos, 30, 40);
  yPos += 0;

  yPos = drawFormRow(pdf, 'Address:', sanitizedFormData.clientAddress || '', col1X, yPos, 30, 55);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'INSTALLATION ADDRESS:', sanitizedFormData.installationAddress || '', col2X, yPos, 50, 30);

  yPos += 5;

  // DESCRIPTION OF PREMISES SECTION
  yPos = drawSectionHeader(pdf, 'DESCRIPTION OF PREMISES', yPos, pageWidth);

  // Premises type checkboxes
  pdf.setFontSize(8);
  pdf.setFont(getFont(), 'bold');
  pdf.text('Description of Work:', col1X, yPos + 3);

  const premises = sanitizedFormData.description?.toLowerCase() || '';
  let checkX = col1X + 40;

  drawCheckbox(pdf, checkX, yPos, premises === 'domestic');
  pdf.setFont(getFont(), 'normal');
  pdf.text('Domestic', checkX + 6, yPos + 3);

  checkX += 30;
  drawCheckbox(pdf, checkX, yPos, premises === 'commercial');
  pdf.text('Commercial', checkX + 6, yPos + 3);

  checkX += 35;
  drawCheckbox(pdf, checkX, yPos, premises === 'industrial');
  pdf.text('Industrial', checkX + 6, yPos + 3);

  checkX += 30;
  drawCheckbox(pdf, checkX, yPos, premises === 'other');
  pdf.text('Other', checkX + 6, yPos + 3);

  yPos += 8;

  yPos = drawFormRow(pdf, 'Estimated Age of Installation:', `${sanitizedFormData.estimatedAge || ''} ${sanitizedFormData.ageUnit || 'years'}`, col1X, yPos, 55, 30);

  // Evidence of alterations
  pdf.setFont(getFont(), 'bold');
  pdf.text('Evidence of additions / alterations:', col1X, yPos + 3);
  const alterations = sanitizedFormData.evidenceOfAlterations || '';
  drawCheckbox(pdf, col1X + 60, yPos, alterations === 'yes');
  pdf.setFont(getFont(), 'normal');
  pdf.text('Yes', col1X + 66, yPos + 3);
  drawCheckbox(pdf, col1X + 80, yPos, alterations === 'no');
  pdf.text('No', col1X + 86, yPos + 3);
  yPos += 8;

  // Date of last inspection
  pdf.setFont(getFont(), 'bold');
  pdf.text('Date of Last Inspection:', col1X, yPos + 3);
  const lastType = sanitizedFormData.lastInspectionType || '';
  drawCheckbox(pdf, col1X + 45, yPos, lastType === 'known');
  pdf.setFont(getFont(), 'normal');
  pdf.text('Known', col1X + 51, yPos + 3);
  drawCheckbox(pdf, col1X + 70, yPos, lastType === 'unknown');
  pdf.text('Unknown', col1X + 76, yPos + 3);
  drawCheckbox(pdf, col1X + 100, yPos, lastType === 'not-applicable');
  pdf.text('N/A (First)', col1X + 106, yPos + 3);

  if (sanitizedFormData.dateOfLastInspection) {
    pdf.text(`Date: ${toSafeString(formatDateTime(sanitizedFormData.dateOfLastInspection))}`, col1X + 140, yPos + 3);
  }
  yPos += 10;

  // PURPOSE & INSPECTION DETAILS SECTION
  yPos = drawSectionHeader(pdf, 'PURPOSE & INSPECTION DETAILS', yPos, pageWidth);

  yPos = drawFormRow(pdf, 'Purpose of Inspection:', sanitizedFormData.purposeOfInspection || 'Periodic inspection', col1X, yPos, 45, 70);

  yPos = drawFormRow(pdf, 'Date of Inspection:', formatDateTime(sanitizedFormData.inspectionDate || new Date()), col1X, yPos, 40, 30);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Inspection Interval:', `${sanitizedFormData.inspectionInterval || '5'} years`, col2X - 20, yPos, 38, 20);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Next Inspection Date:', sanitizedFormData.nextInspectionDate ? formatDateTime(sanitizedFormData.nextInspectionDate) : '', col2X + 40, yPos, 40, 25);

  yPos = drawFormRow(pdf, 'Extent of Inspection:', sanitizedFormData.extentOfInspection || 'Full installation', col1X, yPos, 40, pageWidth - margin * 2 - 45);
  yPos = drawFormRow(pdf, 'Limitations of Inspection:', sanitizedFormData.limitationsOfInspection || 'None', col1X, yPos, 45, pageWidth - margin * 2 - 50);

  // Agreed Limitations list (if any specific limitations exist)
  const agreedLimitations = sanitizedFormData.agreedLimitations || [];
  const limitationNotes = sanitizedFormData.limitationNotes || sanitizedFormData.accessLimitations || '';

  if (agreedLimitations.length > 0 || limitationNotes) {
    yPos += 3;
    pdf.setFontSize(7);
    pdf.setFont(getFont(), 'bold');
    pdf.text('Agreed Limitations:', col1X, yPos);
    yPos += 4;

    pdf.setFont(getFont(), 'normal');
    if (Array.isArray(agreedLimitations) && agreedLimitations.length > 0) {
      agreedLimitations.forEach((limitation: any, idx: number) => {
        const limText = String(limitation.description || limitation || '');
        if (limText) {
          const limLines = pdf.splitTextToSize(`${idx + 1}. ${limText}`, pageWidth - margin * 2 - 10);
          pdf.text(limLines, col1X + 3, yPos);
          yPos += limLines.length * 3;
        }
      });
    } else if (limitationNotes) {
      const notesLines = pdf.splitTextToSize(String(limitationNotes), pageWidth - margin * 2 - 10);
      pdf.text(notesLines, col1X + 3, yPos);
      yPos += notesLines.length * 3;
    }
  }

  yPos += 5;

  // DECLARATION
  yPos = drawSectionHeader(pdf, 'DECLARATION', yPos, pageWidth);
  pdf.setFontSize(7);
  pdf.setFont(getFont(), 'normal');
  const declarationText = 'I/We, being the person(s) responsible for the inspection and testing of the electrical installation (as indicated by my/our signatures below), particulars which are described above, having exercised reasonable skill and care when carrying out the inspection and testing, hereby declare this report, including the related schedules, provides an accurate assessment of the condition of the electrical installation taking into account the stated extent and limitations of this report.';
  const declLines = pdf.splitTextToSize(declarationText, pageWidth - margin * 2 - 10);
  pdf.text(declLines, col1X, yPos + 3);
  yPos += declLines.length * 3.5 + 5;

  // SUPPLY & EARTHING CHARACTERISTICS
  yPos = drawSectionHeader(pdf, 'SUPPLY & EARTHING CHARACTERISTICS', yPos, pageWidth);

  // Earthing arrangement checkboxes
  pdf.setFontSize(8);
  pdf.setFont(getFont(), 'bold');
  pdf.text('Earthing Arrangement:', col1X, yPos + 3);

  const earthing = sanitizedFormData.earthingArrangement || '';
  checkX = col1X + 40;

  drawCheckbox(pdf, checkX, yPos, earthing === 'TN-C');
  pdf.setFont(getFont(), 'normal');
  pdf.text('TN-C', checkX + 6, yPos + 3);

  checkX += 22;
  drawCheckbox(pdf, checkX, yPos, earthing === 'TN-S');
  pdf.text('TN-S', checkX + 6, yPos + 3);

  checkX += 22;
  drawCheckbox(pdf, checkX, yPos, earthing === 'TN-C-S');
  pdf.text('TN-C-S', checkX + 6, yPos + 3);

  checkX += 26;
  drawCheckbox(pdf, checkX, yPos, earthing === 'TT');
  pdf.text('TT', checkX + 6, yPos + 3);

  yPos += 8;

  // DNO / Supply Authority Details
  yPos = drawFormRow(pdf, 'DNO:', sanitizedFormData.dnoName || '', col1X, yPos, 20, 50);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'MPAN:', sanitizedFormData.mpan || '', col2X, yPos, 25, 55);

  yPos = drawFormRow(pdf, 'Cutout Location:', sanitizedFormData.cutoutLocation || '', col1X, yPos, 38, 45);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Service Entry:', sanitizedFormData.serviceEntry || '', col2X, yPos, 35, 45);

  yPos += 3;

  // Supply details in two columns
  yPos = drawFormRow(pdf, 'Nominal Voltage U0/U*:', `${sanitizedFormData.supplyVoltage || '230'} V`, col1X, yPos, 45, 25);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Nominal Frequency f*:', `${sanitizedFormData.supplyFrequency || '50'} Hz`, col2X, yPos, 45, 20);

  yPos = drawFormRow(pdf, 'Phase:', sanitizedFormData.phases || 'Single', col1X, yPos, 30, 25);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Supply PME:', sanitizedFormData.supplyPME || '', col2X, yPos, 35, 25);

  yPos = drawFormRow(pdf, 'Earth Electrode Type:', sanitizedFormData.earthElectrodeType || '', col1X, yPos, 45, 40);
  yPos += 3;

  // Main Protective Device
  yPos = drawFormRow(pdf, 'Main Protective Device:', sanitizedFormData.mainProtectiveDevice || '', col1X, yPos, 48, 40);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'RCD Main Switch:', sanitizedFormData.rcdMainSwitch || '', col2X, yPos, 40, 25);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'RCD Rating:', sanitizedFormData.rcdRating || '', col2X + 70, yPos, 30, 20);

  yPos += 5;

  // MAIN PROTECTIVE BONDING
  yPos = drawSectionHeader(pdf, 'MAIN PROTECTIVE BONDING', yPos, pageWidth);

  yPos = drawFormRow(pdf, 'Main Bonding Conductor Size:', `${sanitizedFormData.mainBondingSize || ''} mm${getSymbol('squared')}`, col1X, yPos, 55, 25);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Bonding Compliance:', sanitizedFormData.bondingCompliance || '', col2X, yPos, 45, 35);

  yPos = drawFormRow(pdf, 'Main Bonding Locations:', sanitizedFormData.mainBondingLocations || '', col1X, yPos, 50, pageWidth - margin * 2 - 55);

  yPos = drawFormRow(pdf, 'Supplementary Bonding Size:', `${sanitizedFormData.supplementaryBondingSize || ''} mm${getSymbol('squared')}`, col1X, yPos, 55, 25);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Equipotential Bonding:', sanitizedFormData.equipotentialBonding || '', col2X, yPos, 50, 30);

  yPos += 5;

  // CONSUMER UNIT / DISTRIBUTION BOARD
  yPos = drawSectionHeader(pdf, 'CONSUMER UNIT / DISTRIBUTION BOARD', yPos, pageWidth);

  yPos = drawFormRow(pdf, 'Board Size:', sanitizedFormData.boardSize || '', col1X, yPos, 30, 25);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Board Type:', sanitizedFormData.cuType || '', col1X + 60, yPos, 30, 25);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Board Location:', sanitizedFormData.cuLocation || '', col2X + 20, yPos, 35, 30);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Manufacturer:', sanitizedFormData.cuManufacturer || '', col2X + 90, yPos, 30, 30);

  yPos = drawFormRow(pdf, 'Intake Cable Size:', `${sanitizedFormData.intakeCableSize || ''} mm${getSymbol('squared')}`, col1X, yPos, 40, 25);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Intake Cable Type:', sanitizedFormData.intakeCableType || '', col1X + 70, yPos, 40, 30);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Meter Tails Size:', `${sanitizedFormData.tailsSize || ''} mm${getSymbol('squared')}`, col2X + 50, yPos, 40, 20);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Length(m):', sanitizedFormData.tailsLength || 'N/A', col2X + 115, yPos, 25, 20);

  yPos += 5;

  // DISTRIBUTION BOARD VERIFICATION
  yPos = drawSectionHeader(pdf, 'DISTRIBUTION BOARD VERIFICATION', yPos, pageWidth);

  yPos = drawFormRow(pdf, 'DB Reference:', sanitizedFormData.dbReference || 'Main CU', col1X, yPos, 35, 30);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Zdb (Ohms):', sanitizedFormData.zdb || '', col1X + 70, yPos, 30, 20);
  yPos -= 7;
  yPos = drawFormRow(pdf, 'Ipf (kA):', sanitizedFormData.ipf || '', col2X + 20, yPos, 25, 20);

  // Confirmed checkboxes
  pdf.setFontSize(8);
  pdf.setFont(getFont(), 'bold');
  pdf.text('Confirmed:', col1X, yPos + 3);

  drawCheckbox(pdf, col1X + 30, yPos, sanitizedFormData.confirmedCorrectPolarity);
  pdf.setFont(getFont(), 'normal');
  pdf.text('Correct polarity', col1X + 36, yPos + 3);

  drawCheckbox(pdf, col1X + 75, yPos, sanitizedFormData.confirmedPhaseSequence);
  pdf.text('Phase sequence', col1X + 81, yPos + 3);

  pdf.setFont(getFont(), 'bold');
  pdf.text('SPD:', col2X, yPos + 3);
  drawCheckbox(pdf, col2X + 20, yPos, sanitizedFormData.spdOperationalStatus);
  pdf.setFont(getFont(), 'normal');
  pdf.text('Operational', col2X + 26, yPos + 3);
  drawCheckbox(pdf, col2X + 55, yPos, sanitizedFormData.spdNA);
  pdf.text('N/A', col2X + 61, yPos + 3);

  yPos += 10;

  // ==================== OVERALL ASSESSMENT SUMMARY ====================

  const formattedObservations = formatObservationsForPDF(sanitizedFormData.defectObservations || observations);

  // Calculate defect counts
  const defectCounts = {
    c1: formattedObservations.filter((o: any) => String(o.defectCode || '').toUpperCase() === 'C1').length,
    c2: formattedObservations.filter((o: any) => String(o.defectCode || '').toUpperCase() === 'C2').length,
    c3: formattedObservations.filter((o: any) => String(o.defectCode || '').toUpperCase() === 'C3').length,
    fi: formattedObservations.filter((o: any) => String(o.defectCode || '').toUpperCase() === 'FI').length
  };

  // Determine overall assessment
  const hasC1 = defectCounts.c1 > 0;
  const hasC2 = defectCounts.c2 > 0;
  const hasFI = defectCounts.fi > 0;
  const isSatisfactory = !hasC1 && !hasC2 && !hasFI &&
    (sanitizedFormData.overallAssessment === 'satisfactory' ||
     sanitizedFormData.satisfactoryForContinuedUse === true ||
     sanitizedFormData.satisfactoryForContinuedUse === 'yes');

  // Draw Overall Assessment box
  yPos = addNewPageIfNeeded(pdf, yPos, 50);

  yPos = drawSectionHeader(pdf, 'OVERALL ASSESSMENT OF THE INSTALLATION', yPos, pageWidth);

  // Assessment box with colour coding
  const assessBoxHeight = 35;
  const assessBoxY = yPos;

  if (isSatisfactory) {
    // Green border for satisfactory
    pdf.setDrawColor(34, 197, 94);
    pdf.setFillColor(240, 253, 244);
  } else {
    // Red border for unsatisfactory
    pdf.setDrawColor(239, 68, 68);
    pdf.setFillColor(254, 242, 242);
  }

  pdf.setLineWidth(1);
  pdf.rect(margin, yPos, pageWidth - margin * 2, assessBoxHeight, 'FD');

  // Assessment result
  pdf.setFontSize(12);
  pdf.setFont(getFont(), 'bold');

  if (isSatisfactory) {
    pdf.setTextColor(34, 197, 94);
    pdf.text('SATISFACTORY', margin + 5, yPos + 10);
    pdf.setFontSize(8);
    pdf.setFont(getFont(), 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.text('The electrical installation is in a satisfactory condition for continued use.', margin + 5, yPos + 18);
  } else {
    pdf.setTextColor(239, 68, 68);
    pdf.text('UNSATISFACTORY', margin + 5, yPos + 10);
    pdf.setFontSize(8);
    pdf.setFont(getFont(), 'normal');
    pdf.setTextColor(0, 0, 0);
    if (hasC1) {
      pdf.text('DANGER PRESENT - Immediate remedial action required.', margin + 5, yPos + 18);
    } else if (hasC2) {
      pdf.text('Potentially dangerous - Urgent remedial action required.', margin + 5, yPos + 18);
    } else if (hasFI) {
      pdf.text('Further investigation required without delay.', margin + 5, yPos + 18);
    } else {
      pdf.text('The electrical installation requires attention.', margin + 5, yPos + 18);
    }
  }

  // Defect summary on right side
  pdf.setFontSize(7);
  pdf.setFont(getFont(), 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('Defect Summary:', pageWidth - margin - 55, yPos + 8);

  pdf.setFont(getFont(), 'normal');
  pdf.setTextColor(220, 38, 38);
  pdf.text(`C1: ${defectCounts.c1}`, pageWidth - margin - 55, yPos + 14);
  pdf.setTextColor(249, 115, 22);
  pdf.text(`C2: ${defectCounts.c2}`, pageWidth - margin - 40, yPos + 14);
  pdf.setTextColor(245, 158, 11);
  pdf.text(`C3: ${defectCounts.c3}`, pageWidth - margin - 25, yPos + 14);
  pdf.setTextColor(139, 92, 246);
  pdf.text(`FI: ${defectCounts.fi}`, pageWidth - margin - 10, yPos + 14);

  pdf.setTextColor(0, 0, 0);
  pdf.setFont(getFont(), 'normal');
  pdf.setFontSize(7);
  pdf.text(`Total observations: ${formattedObservations.length}`, pageWidth - margin - 55, yPos + 20);

  // Next inspection date
  if (sanitizedFormData.nextInspectionDate) {
    pdf.setFont(getFont(), 'bold');
    pdf.text('Next inspection recommended by:', margin + 5, yPos + 28);
    pdf.setFont(getFont(), 'normal');
    pdf.text(toSafeString(formatDateTime(sanitizedFormData.nextInspectionDate)), margin + 60, yPos + 28);
  }

  yPos += assessBoxHeight + 8;

  // ==================== PAGE 2+: OBSERVATIONS ====================

  if (formattedObservations.length > 0) {
    pdf.addPage();
    yPos = margin;

    yPos = drawSectionHeader(pdf, 'OBSERVATIONS', yPos, pageWidth);

    // Observations header row
    pdf.setFillColor(248, 249, 250);
    pdf.rect(margin, yPos, pageWidth - margin * 2 - 30, 8, 'F');
    pdf.setFontSize(8);
    pdf.setFont(getFont(), 'bold');
    pdf.text('OBSERVATIONS (include schedule reference as appropriate)', margin + 3, yPos + 5);

    pdf.setFillColor(74, 85, 104);
    pdf.rect(pageWidth - margin - 28, yPos, 28, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.text('CODE', pageWidth - margin - 20, yPos + 5);
    pdf.setTextColor(0, 0, 0);

    yPos += 12;

    // Each observation
    for (let i = 0; i < formattedObservations.length; i++) {
      const obs = formattedObservations[i];
      yPos = addNewPageIfNeeded(pdf, yPos, 15);

      // Observation box
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.3);
      pdf.rect(margin, yPos, pageWidth - margin * 2 - 30, 8);
      pdf.rect(pageWidth - margin - 28, yPos, 28, 8);

      pdf.setFontSize(8);
      pdf.setFont(getFont(), 'normal');
      const obsItem = String(obs.item || 'Observation');
      const obsDesc = String(obs.description || '');
      const obsText = `${obsItem}: ${obsDesc}`.substring(0, 80);
      pdf.text(obsText, margin + 2, yPos + 5);

      // Code with colour
      const codeColours: Record<string, [number, number, number]> = {
        'C1': [220, 38, 38],
        'C2': [249, 115, 22],
        'C3': [245, 158, 11],
        'FI': [139, 92, 246]
      };
      const obsCode = String(obs.defectCode || 'C3');
      const codeColour = codeColours[obsCode] || [100, 100, 100];
      pdf.setTextColor(...codeColour);
      pdf.setFont(getFont(), 'bold');
      pdf.text(obsCode, pageWidth - margin - 18, yPos + 5);
      pdf.setTextColor(0, 0, 0);

      yPos += 10;
    }

    // Classification codes legend
    yPos += 5;
    pdf.setFontSize(7);
    pdf.setFont(getFont(), 'normal');
    pdf.text('Classification Codes:', margin, yPos);
    yPos += 4;
    pdf.setFont(getFont(), 'bold');
    pdf.setTextColor(220, 38, 38);
    pdf.text('C1', margin, yPos);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(getFont(), 'normal');
    pdf.text(' - Danger present. Risk of injury. Immediate remedial action required.', margin + 6, yPos);
    yPos += 4;
    pdf.setFont(getFont(), 'bold');
    pdf.setTextColor(249, 115, 22);
    pdf.text('C2', margin, yPos);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(getFont(), 'normal');
    pdf.text(' - Potentially dangerous - urgent remedial action required.', margin + 6, yPos);
    yPos += 4;
    pdf.setFont(getFont(), 'bold');
    pdf.setTextColor(245, 158, 11);
    pdf.text('C3', margin, yPos);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(getFont(), 'normal');
    pdf.text(' - Improvement recommended.', margin + 6, yPos);
    yPos += 4;
    pdf.setFont(getFont(), 'bold');
    pdf.setTextColor(139, 92, 246);
    pdf.text('FI', margin, yPos);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(getFont(), 'normal');
    pdf.text(' - Further investigation required without delay.', margin + 6, yPos);
  }

  // ==================== SCHEDULE OF TEST RESULTS (LANDSCAPE) ====================

  const testResults = sanitizedFormData.scheduleOfTests || [];

  if (testResults.length > 0 && includeTestResults) {
    // Add landscape page for circuit details
    pdf.addPage('a4', 'landscape');
    const landscapeWidth = pdf.internal.pageSize.getWidth();
    const landscapeHeight = pdf.internal.pageSize.getHeight();
    yPos = 12;

    // Header
    pdf.setFillColor(74, 85, 104);
    pdf.rect(10, yPos, landscapeWidth - 20, 8, 'F');
    pdf.setFontSize(10);
    pdf.setFont(getFont(), 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('CIRCUIT DETAILS - SCHEDULE OF TEST RESULTS', 15, yPos + 5.5);
    pdf.setTextColor(0, 0, 0);

    yPos += 12;

    // Group test results by board
    const boardGroups = new Map<string, any[]>();
    testResults.forEach((result: any) => {
      const boardId = result.boardId || 'main';
      if (!boardGroups.has(boardId)) {
        boardGroups.set(boardId, []);
      }
      boardGroups.get(boardId)!.push(result);
    });

    // Render each board's schedule
    boardGroups.forEach((circuits, boardId) => {
      // Board header
      if (boardGroups.size > 1) {
        pdf.setFontSize(9);
        pdf.setFont(getFont(), 'bold');
        const safeBoardId = String(boardId || 'main');
        pdf.text(`Distribution Board: ${safeBoardId === 'main' ? 'Main Consumer Unit' : safeBoardId}`, 12, yPos);
        yPos += 6;
      }

      // Table headers (BS 7671 format) - use proper symbols if Unicode font available
      const sq = getSymbol('squared');
      const headers = [
        ['Cct', 'Description', 'Type', 'Ref', 'Pts', `Live\nmm${sq}`, `CPC\nmm${sq}`, 'BS EN', 'Type', 'A', 'kA', 'Max\nZs', 'BS EN', 'Type', 'mA', 'A', 'r1', 'rn', 'r2', 'R1+R2', 'R2', 'V', 'L-L', 'L-E', 'Pol', 'Zs', 'ms', 'TB', 'AFDD', 'Remarks']
      ];

      // Helper to safely convert any value to string
      const safeStr = (val: any, maxLen?: number): string => {
        const str = val != null ? String(val) : '';
        return maxLen ? str.substring(0, maxLen) : str;
      };

      const tableData = circuits.map((r: any, idx: number) => [
        safeStr(r.circuitNumber) || `C${idx + 1}`,
        safeStr(r.circuitDescription, 20),
        safeStr(r.typeOfWiring),
        safeStr(r.referenceMethod),
        safeStr(r.pointsServed),
        safeStr(r.liveSize),
        safeStr(r.cpcSize),
        safeStr(r.bsStandard),
        safeStr(r.protectiveDeviceCurve),
        safeStr(r.protectiveDeviceRating),
        safeStr(r.protectiveDeviceKaRating),
        safeStr(r.maxZs),
        safeStr(r.rcdBsStandard),
        safeStr(r.rcdType),
        safeStr(r.rcdRating),
        safeStr(r.rcdRatingA),
        safeStr(r.ringR1),
        safeStr(r.ringRn),
        safeStr(r.ringR2),
        safeStr(r.r1r2),
        safeStr(r.r2),
        safeStr(r.insulationTestVoltage),
        safeStr(r.insulationLiveNeutral),
        safeStr(r.insulationLiveEarth),
        safeStr(r.polarity),
        safeStr(r.zs),
        safeStr(r.rcdOneX),
        safeStr(r.rcdTestButton),
        safeStr(r.afddTest),
        safeStr(r.notes, 15)
      ]);

      safeAutoTable(pdf, {
        startY: yPos,
        head: headers,
        body: tableData,
        styles: {
          fontSize: 5.5,
          cellPadding: 0.8,
          lineColor: [180, 180, 180],
          lineWidth: 0.1,
          halign: 'center',
          valign: 'middle',
          overflow: 'ellipsize'
        },
        headStyles: {
          fillColor: [70, 130, 180],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 5
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250]
        },
        columnStyles: {
          0: { cellWidth: 8 },
          1: { cellWidth: 22, halign: 'left' },
          2: { cellWidth: 8 },
          3: { cellWidth: 7 },
          4: { cellWidth: 7 },
          5: { cellWidth: 8 },
          6: { cellWidth: 8 },
          7: { cellWidth: 10 },
          8: { cellWidth: 7 },
          9: { cellWidth: 7 },
          10: { cellWidth: 7 },
          11: { cellWidth: 9 },
          12: { cellWidth: 10 },
          13: { cellWidth: 7 },
          14: { cellWidth: 8 },
          15: { cellWidth: 7 },
          16: { cellWidth: 8 },
          17: { cellWidth: 8 },
          18: { cellWidth: 8 },
          19: { cellWidth: 10 },
          20: { cellWidth: 8 },
          21: { cellWidth: 7 },
          22: { cellWidth: 9 },
          23: { cellWidth: 9 },
          24: { cellWidth: 7 },
          25: { cellWidth: 9 },
          26: { cellWidth: 8 },
          27: { cellWidth: 7 },
          28: { cellWidth: 8 },
          29: { cellWidth: 18, halign: 'left' }
        },
        margin: { left: 10, right: 10 },
        tableWidth: 'auto'
      });

      yPos = (pdf as any).lastAutoTable?.finalY + 10 || yPos + 50;
    });
  }

  // ==================== INSPECTION CHECKLIST ====================

  const itemsToUse = sanitizedFormData.inspectionItems?.length > 0 ? sanitizedFormData.inspectionItems : inspectionItems;

  if (itemsToUse.length > 0 && includeInspectionChecklist) {
    pdf.addPage('a4', 'portrait');
    yPos = margin;

    yPos = drawSectionHeader(pdf, 'EICR INSPECTION CHECKLIST', yPos, pageWidth);

    // Group items by section
    const sectionMap = new Map<string, any[]>();
    itemsToUse.forEach((item: any) => {
      const section = item.section || 'General';
      if (!sectionMap.has(section)) {
        sectionMap.set(section, []);
      }
      sectionMap.get(section)!.push(item);
    });

    const tableData: any[] = [];
    let sectionIndex = 1;

    sectionMap.forEach((items, sectionName) => {
      // Section header row
      tableData.push([
        { content: `${sectionIndex}.0  ${sectionName}`, colSpan: 7, styles: { fontStyle: 'bold', fillColor: [51, 51, 51], textColor: [255, 255, 255] } }
      ]);

      items.forEach((item: any, idx: number) => {
        const outcome = String(item.outcome || '');
        const itemDesc = String(item.item || item.description || '');
        tableData.push([
          `${sectionIndex}.${idx + 1}`,
          itemDesc,
          outcome === 'satisfactory' ? 'X' : '',
          outcome === 'not-applicable' ? 'X' : '',
          ['C1', 'C2'].includes(outcome) ? outcome : '',
          outcome === 'C3' ? 'X' : '',
          outcome === 'not-verified' ? 'X' : ''
        ]);
      });

      sectionIndex++;
    });

    safeAutoTable(pdf, {
      startY: yPos,
      head: [['#', 'Description', 'OK', 'N/A', 'C1/C2', 'C3', 'N/V']],
      body: tableData,
      styles: {
        fontSize: 7,
        cellPadding: 2,
        lineColor: [200, 200, 200],
        lineWidth: 0.2
      },
      headStyles: {
        fillColor: [70, 130, 180],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 7
      },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 95 },
        2: { cellWidth: 12, halign: 'center' },
        3: { cellWidth: 12, halign: 'center' },
        4: { cellWidth: 15, halign: 'center' },
        5: { cellWidth: 12, halign: 'center' },
        6: { cellWidth: 12, halign: 'center' }
      },
      margin: { left: margin, right: margin }
    });

    yPos = (pdf as any).lastAutoTable?.finalY + 10 || yPos + 100;
  }

  // ==================== TEST INSTRUMENT & INSPECTOR DETAILS ====================

  pdf.addPage();
  yPos = margin;

  // MFT Details
  yPos = drawSectionHeader(pdf, 'MFT - MULTI FUNCTIONAL TESTER', yPos, pageWidth);

  yPos = drawFormRow(pdf, 'Test Instrument Make/Model:', sanitizedFormData.testInstrumentMake || '', margin + 2, yPos, 55, pageWidth - margin * 2 - 60);
  yPos = drawFormRow(pdf, 'Serial Number:', sanitizedFormData.testInstrumentSerial || '', margin + 2, yPos, 35, 50);
  yPos = drawFormRow(pdf, 'Calibration Date:', sanitizedFormData.calibrationDate ? formatDateTime(sanitizedFormData.calibrationDate) : '', margin + 2, yPos, 38, 35);
  yPos = drawFormRow(pdf, 'Test Temperature (C):', sanitizedFormData.testTemperature || '', margin + 2, yPos, 45, 25);

  yPos += 8;

  // Inspector Declaration
  yPos = drawSectionHeader(pdf, 'INSPECTOR DECLARATION', yPos, pageWidth);

  pdf.setFontSize(7);
  pdf.setFont(getFont(), 'normal');
  const inspectorDecl = 'I/We, being the person(s) responsible for the inspection and testing of the electrical installation (as indicated by my/our signatures below), particulars of which are described above, having exercised reasonable skill and care when carrying out the inspection and testing, hereby declare that the information in this report, including the observations and the attached schedules, provides an accurate assessment of the condition of the electrical installation taking into account the stated extent and limitations in section D of this report.';
  const inspDeclLines = pdf.splitTextToSize(inspectorDecl, pageWidth - margin * 2 - 5);
  pdf.text(inspDeclLines, margin + 2, yPos + 3);
  yPos += inspDeclLines.length * 3 + 5;

  yPos = drawFormRow(pdf, 'Inspector Name:', sanitizedFormData.inspectorName || '', margin + 2, yPos, 35, 60);
  yPos = drawFormRow(pdf, 'Professional Qualifications:', sanitizedFormData.inspectorQualifications || '', margin + 2, yPos, 50, 80);
  yPos = drawFormRow(pdf, 'Company/Organisation:', sanitizedFormData.companyName || sanitizedFormData.inspectorCompany || '', margin + 2, yPos, 48, 80);
  yPos = drawFormRow(pdf, 'Date of Declaration:', formatDateTime(new Date()), margin + 2, yPos, 42, 35);

  yPos += 5;

  // Professional Registration Display Box
  yPos = addNewPageIfNeeded(pdf, yPos, 30);

  pdf.setFillColor(245, 250, 255); // Light blue background
  pdf.setDrawColor(59, 130, 246); // Blue border
  pdf.setLineWidth(0.5);
  pdf.rect(margin, yPos, pageWidth - margin * 2, 22, 'FD');

  pdf.setFontSize(8);
  pdf.setFont(getFont(), 'bold');
  pdf.setTextColor(59, 130, 246);
  pdf.text('PROFESSIONAL REGISTRATION', margin + 3, yPos + 5);
  pdf.setTextColor(0, 0, 0);

  pdf.setFontSize(7);
  pdf.setFont(getFont(), 'normal');
  const regScheme = sanitizedFormData.registrationScheme || sanitizedFormData.inspectedByCpScheme || '';
  const regNumber = sanitizedFormData.registrationNumber || '';
  const cpStatus = sanitizedFormData.competentPersonStatus || (regScheme ? 'Competent Person' : '');

  pdf.text(`Registration Scheme: ${regScheme}`, margin + 3, yPos + 11);
  pdf.text(`Registration Number: ${regNumber}`, margin + 3, yPos + 17);
  pdf.text(`Status: ${cpStatus}`, margin + (pageWidth - margin * 2) / 2, yPos + 11);

  yPos += 27;

  // SIGNATURE BOXES
  yPos = drawSectionHeader(pdf, 'AUTHORISATION SIGNATURES', yPos, pageWidth);

  const sigBoxWidth = (pageWidth - margin * 2 - 10) / 2;
  const sigBoxHeight = 70;

  // Inspected By box
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.5);
  pdf.rect(margin, yPos, sigBoxWidth, sigBoxHeight);

  pdf.setFontSize(9);
  pdf.setFont(getFont(), 'bold');
  pdf.text('INSPECTED BY:', margin + 3, yPos + 6);

  let sigY = yPos + 12;
  pdf.setFontSize(7);
  pdf.setFont(getFont(), 'normal');
  pdf.text('Name (Capitals):', margin + 3, sigY);
  pdf.text(toSafeString(sanitizedFormData.inspectedByName), margin + 35, sigY);

  sigY += 6;
  pdf.text('Signature:', margin + 3, sigY);
  // Add signature if available
  if (sanitizedFormData.inspectedBySignature && sanitizedFormData.inspectedBySignature.startsWith('data:image/')) {
    try {
      pdf.addImage(sanitizedFormData.inspectedBySignature, 'PNG', margin + 30, sigY - 3, 40, 15);
    } catch (e) {
      console.warn('Failed to add inspected by signature');
    }
  }

  sigY += 18;
  pdf.text('For/on behalf of:', margin + 3, sigY);
  pdf.text(toSafeString(sanitizedFormData.inspectedByForOnBehalfOf), margin + 35, sigY);

  sigY += 6;
  pdf.text('Position:', margin + 3, sigY);
  pdf.text(toSafeString(sanitizedFormData.inspectedByPosition), margin + 25, sigY);

  sigY += 6;
  pdf.text('Address:', margin + 3, sigY);
  const inspAddr = toSafeString(sanitizedFormData.inspectedByAddress).substring(0, 50);
  pdf.text(inspAddr, margin + 22, sigY);

  sigY += 6;
  pdf.text('CP Scheme:', margin + 3, sigY);
  pdf.text(toSafeString(sanitizedFormData.inspectedByCpScheme || (sanitizedFormData.inspectedByCpSchemeNA ? 'N/A' : '')), margin + 28, sigY);

  // Report Authorised By box
  const rightBoxX = margin + sigBoxWidth + 10;
  pdf.rect(rightBoxX, yPos, sigBoxWidth, sigBoxHeight);

  pdf.setFontSize(9);
  pdf.setFont(getFont(), 'bold');
  pdf.text('REPORT AUTHORISED FOR ISSUE BY:', rightBoxX + 3, yPos + 6);

  sigY = yPos + 12;
  pdf.setFontSize(7);
  pdf.setFont(getFont(), 'normal');
  pdf.text('Name (Capitals):', rightBoxX + 3, sigY);
  pdf.text(toSafeString(sanitizedFormData.reportAuthorisedByName), rightBoxX + 35, sigY);
  pdf.text('Date:', rightBoxX + sigBoxWidth - 30, sigY);
  pdf.text(toSafeString(formatDateTime(sanitizedFormData.reportAuthorisedByDate)), rightBoxX + sigBoxWidth - 15, sigY);

  sigY += 6;
  pdf.text('Signature:', rightBoxX + 3, sigY);
  if (sanitizedFormData.reportAuthorisedBySignature && sanitizedFormData.reportAuthorisedBySignature.startsWith('data:image/')) {
    try {
      pdf.addImage(sanitizedFormData.reportAuthorisedBySignature, 'PNG', rightBoxX + 30, sigY - 3, 40, 15);
    } catch (e) {
      console.warn('Failed to add authorised by signature');
    }
  }

  sigY += 18;
  pdf.text('For/on behalf of:', rightBoxX + 3, sigY);
  pdf.text(toSafeString(sanitizedFormData.reportAuthorisedByForOnBehalfOf), rightBoxX + 35, sigY);

  sigY += 6;
  pdf.text('Position:', rightBoxX + 3, sigY);
  pdf.text(toSafeString(sanitizedFormData.reportAuthorisedByPosition), rightBoxX + 25, sigY);

  sigY += 6;
  pdf.text('Address:', rightBoxX + 3, sigY);
  const authAddr = toSafeString(sanitizedFormData.reportAuthorisedByAddress).substring(0, 50);
  pdf.text(authAddr, rightBoxX + 22, sigY);

  sigY += 6;
  pdf.text('Membership No:', rightBoxX + 3, sigY);
  pdf.text(toSafeString(sanitizedFormData.reportAuthorisedByMembershipNo), rightBoxX + 35, sigY);

  yPos += sigBoxHeight + 10;

  // ==================== NEXT INSPECTION RECOMMENDATION ====================

  yPos = addNewPageIfNeeded(pdf, yPos, 40);

  // Prominent next inspection box
  pdf.setFillColor(255, 251, 235); // Light amber background
  pdf.setDrawColor(255, 204, 0); // Yellow border
  pdf.setLineWidth(1);
  pdf.rect(margin, yPos, pageWidth - margin * 2, 25, 'FD');

  pdf.setFontSize(9);
  pdf.setFont(getFont(), 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('RECOMMENDED NEXT INSPECTION', pageWidth / 2, yPos + 7, { align: 'center' });

  pdf.setFontSize(8);
  pdf.setFont(getFont(), 'normal');
  pdf.text('This installation should be re-inspected no later than:', pageWidth / 2, yPos + 13, { align: 'center' });

  pdf.setFontSize(12);
  pdf.setFont(getFont(), 'bold');
  const nextDate = sanitizedFormData.nextInspectionDate
    ? toSafeString(formatDateTime(sanitizedFormData.nextInspectionDate))
    : 'Date to be confirmed';
  pdf.text(nextDate || 'Date to be confirmed', pageWidth / 2, yPos + 21, { align: 'center' });

  yPos += 30;

  // ==================== GUIDANCE FOR RECIPIENTS ====================

  yPos = drawSectionHeader(pdf, 'GUIDANCE FOR RECIPIENTS', yPos, pageWidth);

  pdf.setFontSize(7);
  pdf.setFont(getFont(), 'bold');
  pdf.text('This Report is an important and valuable document which should be retained for future reference.', margin + 2, yPos + 3);
  yPos += 8;

  const guidanceCol1 = [
    '1. The purpose of this Report is to confirm, as far as reasonably practicable, whether or not the electrical installation is in a satisfactory condition for continued service.',
    '2. This Report is only valid if accompanied by the Inspection Schedule(s) and the Schedule(s) of Circuit Details and Test Results.',
    '3. The \'original\' Report should be retained in a safe place and be made available to any person inspecting or undertaking work on the electrical installation in the future.',
    '4. For items classified as C1 (\'Danger present\') the safety of those using the installation is at risk, and it is recommended that a skilled person undertakes the necessary remedial work immediately.',
    '5. For items classified as C2 (\'Potentially dangerous\') it is recommended that a skilled person undertakes the necessary remedial work as a matter of urgency.',
  ];

  const guidanceCol2 = [
    '6. Where it has been stated that an observation requires further investigation (code FI) the inspection has revealed an apparent deficiency which could not be fully identified. Such observations should be investigated without delay.',
    '7. For safety reasons, the electrical installation should be re-inspected at appropriate intervals by a skilled person. The recommended date is stated in Section F of the Report.',
    '8. Where the installation includes an RCD it should be tested six-monthly by pressing the button marked \'T\' or \'Test\'.',
    '9. Where the installation includes an AFDD having a manual test facility it should be tested six-monthly by pressing the test button.',
    '10. Where the installation includes an SPD the status indicator should be checked to confirm it is in operational condition.',
  ];

  pdf.setFont(getFont(), 'normal');

  const colWidth = (pageWidth - margin * 2 - 10) / 2;
  let col1Y = yPos;
  let col2Y = yPos;

  guidanceCol1.forEach(text => {
    const lines = pdf.splitTextToSize(text, colWidth - 5);
    pdf.text(lines, margin + 2, col1Y);
    col1Y += lines.length * 3 + 2;
  });

  guidanceCol2.forEach(text => {
    const lines = pdf.splitTextToSize(text, colWidth - 5);
    pdf.text(lines, margin + colWidth + 8, col2Y);
    col2Y += lines.length * 3 + 2;
  });

  // ==================== ADD WATERMARK & FOOTER ====================

  addProfessionalWatermark(pdf, 'ORIGINAL CERTIFICATE', 0.05);

  if (includeFooter) {
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      const currentPageHeight = pdf.internal.pageSize.getHeight();
      const currentPageWidth = pdf.internal.pageSize.getWidth();

      // Footer line
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(margin, currentPageHeight - 18, currentPageWidth - margin, currentPageHeight - 18);

      // BS 7671 acknowledgement
      pdf.setFontSize(6);
      pdf.setFont(getFont(), 'normal');
      pdf.setTextColor(128, 128, 128);
      pdf.text('Acknowledgement: This certificate is based on the model in appendix 6 of BS 7671: 2018 (IET Wiring Regulations)', margin, currentPageHeight - 12);

      // Company info
      if (sanitizedFormData.companyName) {
        let footerText = sanitizedFormData.companyName;
        if (sanitizedFormData.companyPhone) footerText += ` | Tel: ${sanitizedFormData.companyPhone}`;
        if (sanitizedFormData.companyEmail) footerText += ` | ${sanitizedFormData.companyEmail}`;
        pdf.text(footerText, currentPageWidth / 2, currentPageHeight - 8, { align: 'center' });
      }

      // Page number
      pdf.setFontSize(8);
      pdf.setFont(getFont(), 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Page ${i} of ${totalPages}`, currentPageWidth - margin, currentPageHeight - 8, { align: 'right' });
    }
  }

  // ==================== SAVE PDF ====================

  const { generatePdfFilename } = await import('./pdfFilenameGenerator');
  const filename = generatePdfFilename(
    'EICR',
    certificateId,
    sanitizedFormData.clientName || 'Client',
    sanitizedFormData.inspectionDate || new Date()
  );

  pdf.save(filename);
  console.log(`Professional EICR certificate saved: ${filename}`);
  console.log(`Quality Score: ${qualityMetrics.overallScore}% | Completion: ${validation.completionScore}%`);
};
