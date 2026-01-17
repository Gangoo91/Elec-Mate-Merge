import jsPDF from 'jspdf';
// (autoTable imported via safeAutoTable in pdfEnhancements)
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

const addNewPageIfNeeded = (pdf: jsPDF, yPosition: number, requiredSpace: number = 60): number => {
  if (yPosition > pdf.internal.pageSize.getHeight() - requiredSpace) {
    pdf.addPage();
    return 20; // Reset to top margin
  }
  return yPosition;
};

// Helper function to draw checkboxes matching BS 7671 format
const drawCheckbox = (pdf: jsPDF, x: number, y: number, checked: boolean = false, label: string = '') => {
  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.3);
  pdf.rect(x, y, 4, 4);
  
  if (checked) {
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('X', x + 2, y + 3, { align: 'center' });
  }
  
  if (label) {
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(toSafeString(label), x + 6, y + 3);
  }
};

// Helper function to add form fields with labels
// Helper to safely convert any value to string for PDF
const toSafeString = (value: any): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
};

const addFormField = (pdf: jsPDF, x: number, y: number, width: number, height: number, label: string, value: string = '', bold: boolean = false) => {
  // Field box
  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.3);
  pdf.rect(x, y, width, height);

  // Label
  pdf.setFontSize(8);
  pdf.setFont('helvetica', bold ? 'bold' : 'normal');
  pdf.text(toSafeString(label), x, y - 2);

  // Value
  if (value) {
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(toSafeString(value), x + 2, y + height - 2);
  }
};

// Helper function to fetch photos for observations
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

    // Convert file paths to full URLs
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

// Helper function to add photo to PDF
const addPhotoToPDF = async (pdf: jsPDF, photoUrl: string, x: number, y: number, maxWidth: number, maxHeight: number): Promise<number> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        // Calculate dimensions to maintain aspect ratio
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

        // Convert to mm (assuming 96 DPI)
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
  // Sanitize all form data before PDF generation
  const { sanitizeObject } = await import('./inputSanitization');
  const sanitizedFormData = sanitizeObject(formData);

  // This function remains the same for observations-only reports
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

  const template = createEICRTemplate();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  // Professional header
  if (includeHeader) {
    yPosition = template.addHeader(pdf, {
      ...sanitizedFormData,
      certificateReference: `OBS-${Date.now().toString().slice(-6)}`
    });
  }

  // Installation details
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('INSTALLATION DETAILS', margin, yPosition);
  yPosition += 10;

  const installationDetails = [
    `Client: ${sanitizedFormData.clientName || 'Not specified'}`,
    `Installation Address: ${sanitizedFormData.installationAddress || 'Not specified'}`,
    `Description: ${sanitizedFormData.description || 'Not specified'}`,
    `Inspection Date: ${sanitizedFormData.inspectionDate ? new Date(sanitizedFormData.inspectionDate).toLocaleDateString('en-GB') : 'Not specified'}`,
    `Inspector: ${sanitizedFormData.inspectorName || 'Not specified'}`
  ];

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  installationDetails.forEach(detail => {
    pdf.text(toSafeString(detail), margin, yPosition);
    yPosition += 6;
  });

  yPosition += 10;

  // Observations section
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('DEFECTS AND OBSERVATIONS', margin, yPosition);
  yPosition += 10;

  if (observations.length === 0) {
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('No defects or observations recorded during this inspection.', margin, yPosition);
  } else {
    const formattedObservations = formatObservationsForPDF(observations);
    
    for (let index = 0; index < formattedObservations.length; index++) {
      const obs = formattedObservations[index];
      yPosition = addNewPageIfNeeded(pdf, yPosition, 40);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text(toSafeString(`${index + 1}. [${obs.defectCode}] ${obs.item}`), margin, yPosition);
      yPosition += 6;

      if (obs.description) {
        pdf.setFont('helvetica', 'normal');
        const descLines = pdf.splitTextToSize(toSafeString(obs.description), pageWidth - 2 * margin - 5);
        pdf.text(descLines, margin + 5, yPosition);
        yPosition += descLines.length * 5;
      }
      
      // Fetch and add photos for this observation
      const originalObs = observations[index];
      if (originalObs?.id) {
        const photos = await fetchObservationPhotos(originalObs.id);
        
        if (photos.length > 0) {
          yPosition += 5;
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'italic');
          pdf.text(toSafeString(`Photo Evidence (${photos.length} photo${photos.length > 1 ? 's' : ''}):`), margin + 5, yPosition);
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

  // Add footer
  if (includeFooter) {
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      template.addFooter(pdf, i, totalPages, sanitizedFormData);
    }
  }

  const { generateObservationsFilename } = await import('./pdfFilenameGenerator');
  const filename = generateObservationsFilename(
    sanitizedFormData.certificateNumber || sanitizedFormData.certificateReference || 'EICR',
    sanitizedFormData.clientName || 'Client',
    sanitizedFormData.inspectionDate || new Date()
  );
  pdf.save(filename);
};

export const exportCompleteEICRToPDF = async (
  formData: any,
  inspectionItems: InspectionItem[] = [],
  observations: DefectObservation[] = [],
  options: ExportOptions = {}
): Promise<void> => {
  // Sanitize all form data before PDF generation
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

  // Validate data quality before generation
  const validation = validateEICRData(sanitizedFormData, inspectionItems, observations);
  const qualityMetrics = calculateQualityMetrics(sanitizedFormData, inspectionItems, observations);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: format.toLowerCase() as 'a4' | 'letter',
  });

  // Set PDF metadata for professional presentation
  const metadata = generateCertificateMetadata(sanitizedFormData);
  pdf.setProperties(metadata);

  const template = createEICRTemplate();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  // Generate unique certificate ID
  const certificateId = sanitizedFormData.certificateReference || `EICR-${Date.now().toString().slice(-6)}`;

  // Enhanced data formatting with comprehensive field mapping
  const formattedCircuits = formatCircuitDataForPDF(sanitizedFormData);
  const formattedTestResults = formatTestResultsForPDF(sanitizedFormData);

  // FIX: Use explicit length check - empty arrays are truthy and won't trigger || fallback
  const inspectionSource = (sanitizedFormData.inspectionItems?.length > 0)
    ? sanitizedFormData.inspectionItems
    : inspectionItems;
  const formattedInspectionData = formatInspectionDataForPDF(inspectionSource);

  // FIX: Form uses 'defectObservations', not 'observations' (legacy field)
  const observationsSource = (sanitizedFormData.defectObservations?.length > 0)
    ? sanitizedFormData.defectObservations
    : (sanitizedFormData.observations?.length > 0)
      ? sanitizedFormData.observations
      : observations;
  const formattedObservations = formatObservationsForPDF(observationsSource);

  const supplyCharacteristics = formatSupplyCharacteristics(sanitizedFormData);
  const installationDetails = formatInstallationDetails(sanitizedFormData);
  const clientDetails = formatClientDetails(sanitizedFormData);
  const inspectorDetails = formatInspectorDetails(sanitizedFormData);
  const companyBranding = formatCompanyBranding(sanitizedFormData);

  // PAGE 1 - PROFESSIONAL HEADER & CLIENT DETAILS
  if (includeHeader) {
    yPosition = template.addHeader(pdf, { 
      ...sanitizedFormData, 
      certificateReference: certificateId,
      ...companyBranding
    });
  }

  // Add certificate validation box
  addCertificateValidation(pdf, {
    id: certificateId,
    issueDate: new Date(),
    version: '2.0',
    expiryDate: sanitizedFormData.nextInspectionDate ? new Date(sanitizedFormData.nextInspectionDate) : undefined
  });

  // Enhanced Client Details Section
  yPosition = addNewPageIfNeeded(pdf, yPosition, 100);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(51, 51, 51);
  pdf.text('CLIENT AND INSTALLATION DETAILS', margin, yPosition);
  
  // Professional section divider
  pdf.setDrawColor(255, 204, 0);
  pdf.setLineWidth(2);
  pdf.line(margin, yPosition + 3, pageWidth - margin, yPosition + 3);
  yPosition += 12;

  // Client information in professional format
  const clientInfo = [
    ['Client Name:', clientDetails.name],
    ['Installation Address:', clientDetails.installationAddress],
    ['Contact Phone:', clientDetails.phone],
    ['Contact Email:', clientDetails.email],
    ['Property Type:', sanitizedFormData.description || 'Not specified'],
    ['Estimated Age:', sanitizedFormData.estimatedAge ? `${sanitizedFormData.estimatedAge} ${sanitizedFormData.ageUnit || 'years'}` : 'Not specified']
  ];

  pdf.setFontSize(9);
  clientInfo.forEach(([label, value]) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(51, 51, 51);
    pdf.text(toSafeString(label), margin, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.text(toSafeString(value), margin + 45, yPosition);
    yPosition += 6;
  });

  // PURPOSE AND SCOPE Section
  yPosition += 10;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(51, 51, 51);
  pdf.text('PURPOSE AND SCOPE OF INSPECTION', margin, yPosition);
  yPosition += 8;

  const purposeInfo = [
    ['Inspection Date:', formatDateTime(sanitizedFormData.inspectionDate || new Date())],
    ['Inspector:', inspectorDetails.name],
    ['Qualifications:', inspectorDetails.qualifications],
    ['Purpose:', sanitizedFormData.purposeOfInspection || 'Periodic inspection'],
    ['Extent:', sanitizedFormData.extentOfInspection || 'Full installation'],
    ['Limitations:', sanitizedFormData.limitationsOfInspection || 'None specified']
  ];

  pdf.setFontSize(9);
  purposeInfo.forEach(([label, value]) => {
    const safeValue = toSafeString(value);
    if (safeValue && safeValue !== 'Not specified') {
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(51, 51, 51);
      pdf.text(toSafeString(label), margin, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(0, 0, 0);

      // Handle long text with wrapping
      const maxWidth = pageWidth - margin - 50;
      if (pdf.getTextWidth(safeValue) > maxWidth) {
        const lines = pdf.splitTextToSize(safeValue, maxWidth);
        pdf.text(lines, margin + 45, yPosition);
        yPosition += (lines.length - 1) * 4;
      } else {
        pdf.text(safeValue, margin + 45, yPosition);
      }
      yPosition += 6;
    }
  });

  // PAGE 2 - SUPPLY CHARACTERISTICS & EARTHING
  pdf.addPage();
  yPosition = 25;

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(51, 51, 51);
  pdf.text('SUPPLY CHARACTERISTICS & EARTHING ARRANGEMENTS', margin, yPosition);
  pdf.setDrawColor(255, 204, 0);
  pdf.setLineWidth(2);
  pdf.line(margin, yPosition + 3, pageWidth - margin, yPosition + 3);
  yPosition += 15;

  // Enhanced supply characteristics table
  const supplyData = supplyCharacteristics.map(char => [char]);
  
  if (supplyData.length > 0) {
    safeAutoTable(pdf, enhanceTableStyling({
      startY: yPosition,
      head: [['Supply and Installation Characteristics']],
      body: supplyData,
      columnStyles: {
        0: { cellWidth: pageWidth - 2 * margin }
      },
      margin: { left: margin, right: margin }
    }));
    yPosition = (pdf as any).lastAutoTable.finalY + 15;
  }

  // Installation Details
  if (installationDetails.length > 0) {
    const installationData = installationDetails.map(detail => [detail]);
    
    safeAutoTable(pdf, enhanceTableStyling({
      startY: yPosition,
      head: [['Installation Configuration Details']],
      body: installationData,
      columnStyles: {
        0: { cellWidth: pageWidth - 2 * margin }
      },
      margin: { left: margin, right: margin }
    }));
    yPosition = (pdf as any).lastAutoTable.finalY + 15;
  }

  // PAGE 3+ - CIRCUIT SCHEDULE AND TEST RESULTS
  if (formattedTestResults.length > 0 && includeTestResults) {
    pdf.addPage();
    yPosition = 25;

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(51, 51, 51);
    pdf.text('SCHEDULE OF CIRCUIT DETAILS AND TEST RESULTS', margin, yPosition);
    pdf.setDrawColor(255, 204, 0);
    pdf.setLineWidth(2);
    pdf.line(margin, yPosition + 3, pageWidth - margin, yPosition + 3);
    yPosition += 15;

    // Enhanced circuit schedule
    if (formattedCircuits.length > 0) {
      yPosition = template.addCircuitScheduleTable(pdf, formattedCircuits, yPosition);
      yPosition += 10;
    }

    // Enhanced test results
    yPosition = template.addTestResultsTable(pdf, formattedTestResults, yPosition);
    
    // Add comprehensive landscape test results page
    template.addTestResultsLandscapePage(pdf, formattedTestResults);
  }

  // INSPECTION CHECKLIST (Enhanced)
  if (includeInspectionChecklist && (sanitizedFormData.inspectionItems?.length > 0 || inspectionItems.length > 0)) {
    pdf.addPage();
    yPosition = 25;

    const itemsToUse = sanitizedFormData.inspectionItems?.length > 0 ? sanitizedFormData.inspectionItems : inspectionItems;
    yPosition = template.addInspectionChecklistSection(pdf, itemsToUse, yPosition);
  }

  // OBSERVATIONS AND DEFECTS
  if (formattedObservations.length > 0) {
    yPosition = addNewPageIfNeeded(pdf, yPosition, 80);
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(51, 51, 51);
    pdf.text('SCHEDULE OF ITEMS INSPECTED AND RECORD OF OBSERVATIONS', margin, yPosition);
    pdf.setDrawColor(255, 204, 0);
    pdf.setLineWidth(2);
    pdf.line(margin, yPosition + 3, pageWidth - margin, yPosition + 3);
    yPosition += 15;

    // Enhanced observations with photos
    for (let index = 0; index < formattedObservations.length; index++) {
      const obs = formattedObservations[index];
      yPosition = addNewPageIfNeeded(pdf, yPosition, 50);
      
      // Observation header
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(51, 51, 51);
      pdf.text(toSafeString(`${index + 1}. [${obs.defectCode}] ${obs.item}`), margin, yPosition);
      yPosition += 7;

      // Classification
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(80, 80, 80);
      pdf.text(toSafeString(`Classification: ${obs.codeDescription}`), margin + 5, yPosition);
      yPosition += 6;

      // Description
      if (obs.description) {
        pdf.setTextColor(0, 0, 0);
        const descLines = pdf.splitTextToSize(toSafeString(`Description: ${obs.description}`), pageWidth - 2 * margin - 5);
        pdf.text(descLines, margin + 5, yPosition);
        yPosition += descLines.length * 5;
      }

      // Recommendation
      if (obs.recommendation) {
        yPosition += 2;
        pdf.setTextColor(0, 0, 0);
        const recLines = pdf.splitTextToSize(toSafeString(`Recommendation: ${obs.recommendation}`), pageWidth - 2 * margin - 5);
        pdf.text(recLines, margin + 5, yPosition);
        yPosition += recLines.length * 5;
      }

      // Rectified status
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      if (obs.rectified) {
        pdf.setTextColor(34, 139, 34); // Green for rectified
      } else {
        pdf.setTextColor(178, 34, 34); // Red for not rectified
      }
      pdf.text(toSafeString(`Status: ${obs.rectified ? 'Rectified' : 'Not Rectified'}`), margin + 5, yPosition);
      pdf.setTextColor(0, 0, 0); // Reset to black
      yPosition += 6;
      
      // Fetch and add photos for this observation (use observationsSource for consistency)
      const originalObs = observationsSource[index];
      if (originalObs?.id) {
        const photos = await fetchObservationPhotos(originalObs.id);
        
        if (photos.length > 0) {
          yPosition += 3;
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'italic');
          pdf.setTextColor(0, 0, 0);
          pdf.text(toSafeString(`Photo Evidence (${photos.length} photo${photos.length > 1 ? 's' : ''}):`), margin + 5, yPosition);
          yPosition += 6;
          
          for (const photoUrl of photos) {
            yPosition = addNewPageIfNeeded(pdf, yPosition, 80);
            
            // Add photo border
            pdf.setDrawColor(200, 200, 200);
            pdf.setLineWidth(0.5);
            const photoHeight = await addPhotoToPDF(pdf, photoUrl, margin + 10, yPosition, 90, 70);
            
            if (photoHeight > 0) {
              pdf.rect(margin + 9, yPosition - 1, 92, photoHeight + 2);
              yPosition += photoHeight + 5;
            }
          }
        }
      }
      
      // Separator line
      yPosition += 5;
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.3);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;
    }
  }

  // PROFESSIONAL DECLARATION SECTION
  pdf.addPage();
  yPosition = 25;

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(51, 51, 51);
  pdf.text('DECLARATION AND CERTIFICATION', margin, yPosition);
  pdf.setDrawColor(255, 204, 0);
  pdf.setLineWidth(2);
  pdf.line(margin, yPosition + 3, pageWidth - margin, yPosition + 3);
  yPosition += 15;

  // Enhanced declaration text
  const declarationText = [
    'I/We, being the person(s) responsible for the inspection and testing of the electrical installation',
    'described in this report, having exercised reasonable skill and care when carrying out the inspection',
    'and testing, hereby declare that the information in this report, including the observations and the',
    'attached schedules, provides an accurate assessment of the condition of the electrical installation',
    'taking into account the stated extent and limitations of this inspection.',
    '',
    'This certificate is issued in accordance with BS 7671:2018 (IET Wiring Regulations) and complies',
    'with the requirements for electrical installation condition reporting as specified in the regulations.'
  ];

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  declarationText.forEach((line, index) => {
    if (line.trim() !== '') {
      pdf.text(toSafeString(line), margin, yPosition + (index * 5));
    }
  });
  yPosition += declarationText.length * 5 + 10;

  // Professional signature section
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('INSPECTOR CERTIFICATION', margin, yPosition);
  yPosition += 10;

  // Signature fields in professional layout
  const sigFields = [
    ['Inspector Name:', inspectorDetails.name],
    ['Qualifications:', inspectorDetails.qualifications],
    ['Registration No.:', inspectorDetails.registrationNumber],
    ['Company:', inspectorDetails.company],
    ['Date:', formatDateTime(new Date())]
  ];

  pdf.setFontSize(9);
  sigFields.forEach(([label, value]) => {
    pdf.setFont('helvetica', 'bold');
    pdf.text(toSafeString(label), margin, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(toSafeString(value), margin + 35, yPosition);
    yPosition += 8;
  });

  yPosition += 5;

  // Digital signature integration
  if (includeDigitalSignatures && sanitizedFormData.inspectorSignature) {
    await addDigitalSignature(pdf, {
      signature: sanitizedFormData.inspectorSignature,
      timestamp: new Date(),
      location: inspectorDetails.company,
      reason: 'EICR Certification'
    }, margin, yPosition, 80, 30);
  } else {
    // Signature box placeholder
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.rect(margin, yPosition, 80, 25);
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text('Digital Signature', margin + 2, yPosition + 15);
    pdf.setTextColor(0, 0, 0);
  }

  // Add professional watermark
  addProfessionalWatermark(pdf, 'ORIGINAL CERTIFICATE', 0.05);

  // Enhanced footer with quality metrics
  if (includeFooter) {
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      template.addFooter(pdf, i, totalPages, {
        ...sanitizedFormData,
        ...companyBranding,
        qualityScore: qualityMetrics.overallScore
      });
    }
  }

  // Generate quality assessment report in console
  if (validation.criticalIssues.length > 0 || qualityMetrics.overallScore < 80) {
    console.warn('Certificate Quality Assessment:');
    console.warn(generateCompletionReport(validation, qualityMetrics));
  }

  // Professional filename using standardised generator
  const { generatePdfFilename } = await import('./pdfFilenameGenerator');
  const filename = generatePdfFilename(
    'EICR',
    certificateId,
    sanitizedFormData.clientName || 'Client',
    sanitizedFormData.inspectionDate || new Date()
  );

  pdf.save(filename);
};
