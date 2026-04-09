/**
 * Bulk PDF Export Utility
 * Generates and downloads multiple PDFs for selected reports
 */

import { supabase } from '@/integrations/supabase/client';
import { reportCloud, type CloudReport } from './reportCloud';
import { optimizeForPdfGeneration } from './pdfDataOptimizer';
import { generatePdfFilename } from './pdfFilenameGenerator';

interface BulkExportResult {
  successful: number;
  failed: number;
  errors: string[];
}

interface BulkExportOptions {
  onProgress?: (current: number, total: number, reportId: string) => void;
  useZipBundle?: boolean; // Auto-determined if not specified
}

interface PdfBlobData {
  filename: string;
  blob: Blob;
  reportId: string;
}

/**
 * Get the correct edge function name based on report type
 */
const getEdgeFunctionForReportType = (reportType: string): string => {
  const t = reportType.toLowerCase().replace(/\s+/g, '-');

  // Core electrical certificates
  if (t === 'eic') return 'generate-eic-pdf';
  if (t === 'eicr') return 'generate-eicr-pdf';
  if (t === 'minor-works') return 'generate-minor-works-pdf';
  if (t === 'ev-charging') return 'generate-ev-charging-pdf';
  if (t === 'solar-pv') return 'generate-solar-pv-pdf';
  if (t === 'pat-testing') return 'generate-pat-testing-pdf';
  if (t === 'emergency-lighting') return 'generate-emergency-lighting-pdf';

  // Fire alarm variants — all use same edge function
  if (t.startsWith('fire-alarm')) return 'generate-fire-alarm-pdf';

  // Commissioning
  if (t === 'g98-commissioning') return 'generate-g98-commissioning-pdf';
  if (t === 'g99-commissioning') return 'generate-g99-commissioning-pdf';

  // Specialist
  if (t === 'bess') return 'generate-bess-pdf';
  if (t === 'lightning-protection') return 'generate-lightning-protection-pdf';
  if (t === 'smoke-co-alarm') return 'generate-smoke-co-alarm-pdf';

  // Notices & documents
  if (t === 'danger-notice') return 'generate-danger-notice-pdf';
  if (t === 'isolation-cert') return 'generate-isolation-cert-pdf';
  if (t === 'permit-to-work') return 'generate-permit-to-work-pdf';
  if (t === 'safe-isolation') return 'generate-safe-isolation-pdf';
  if (t === 'limitation-notice') return 'generate-limitation-notice-pdf';
  if (t === 'non-compliance-notice') return 'generate-non-compliance-notice-pdf';
  if (t === 'completion-notice') return 'generate-completion-notice-pdf';

  // Fallback — try generic pattern
  console.warn(`[bulkPdfExport] Unknown report type "${reportType}", trying generate-${t}-pdf`);
  return `generate-${t}-pdf`;
};

/**
 * Get template ID for a specific report type from storage
 */
const getTemplateIdForReportType = async (reportType: string): Promise<string | undefined> => {
  const { offlineStorage } = await import('./offlineStorage');
  const credentials = await offlineStorage.getApiCredentials('pdfMonkey');

  const normalizedType = reportType.toLowerCase();
  if (normalizedType === 'eic') {
    return credentials.eicTemplateId;
  } else if (normalizedType === 'eicr') {
    return credentials.eicrTemplateId;
  }

  return undefined;
};

/**
 * Fetch a PDF from URL and return as Blob
 */
const fetchPdfAsBlob = async (pdfUrl: string): Promise<Blob> => {
  try {
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }
    return await response.blob();
  } catch (error) {
    console.error('[bulkPdfExport] Fetch error:', error);
    throw error;
  }
};

/**
 * Trigger browser download for a Blob
 */
const downloadBlob = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Validate and enrich report data with required fields
 * Falls back to top-level database fields if data fields are missing
 */
/** Human-readable field names for error messages */
const FIELD_LABELS: Record<string, string> = {
  clientName: 'Client Name',
  installationAddress: 'Installation Address',
  inspectorName: 'Inspector Name',
  electricianName: 'Electrician Name',
  installerName: 'Installer Name',
  installerSignature: 'Installer Signature',
  inspectorSignature: 'Inspector Signature',
  designerSignature: 'Designer Signature',
  constructorSignature: 'Constructor Signature',
  signature: 'Signature',
  installationDate: 'Installation Date',
  dateOfInspection: 'Inspection Date',
};

const validateAndEnrichReportData = (
  report: CloudReport
): {
  isValid: boolean;
  data: any;
  missingFields: string[];
} => {
  const data = { ...report.data };
  const missingFields: string[] = [];
  const rt = report.report_type.toLowerCase().replace(/\s+/g, '-');

  // Enrich from top-level DB fields
  if (!data.clientName || (typeof data.clientName === 'string' && data.clientName.trim() === '')) {
    if (report.client_name) {
      data.clientName = report.client_name;
    }
  }
  if (!data.installationAddress || (typeof data.installationAddress === 'string' && data.installationAddress.trim() === '')) {
    if (report.installation_address) {
      data.installationAddress = report.installation_address;
    }
  }
  if (!data.inspectorName || (typeof data.inspectorName === 'string' && data.inspectorName.trim() === '')) {
    if (report.inspector_name) {
      data.inspectorName = report.inspector_name;
    }
  }

  // Cert-type-specific required fields
  if (rt === 'eicr') {
    if (!data.clientName) missingFields.push('Client Name');
    if (!data.installationAddress) missingFields.push('Installation Address');
  } else if (rt === 'eic') {
    if (!data.clientName) missingFields.push('Client Name');
    if (!data.installationAddress) missingFields.push('Installation Address');
  } else if (rt === 'minor-works') {
    if (!data.clientName) missingFields.push('Client Name');
  } else if (rt === 'ev-charging') {
    if (!data.clientName) missingFields.push('Client Name');
  } else if (rt.startsWith('fire-alarm')) {
    if (!data.clientName && !data.premisesName) missingFields.push('Client / Premises Name');
  } else if (rt === 'emergency-lighting') {
    if (!data.clientName && !data.premisesName) missingFields.push('Client / Premises Name');
  } else if (rt === 'pat-testing') {
    if (!data.clientName && !data.customerName) missingFields.push('Client Name');
  } else if (rt === 'solar-pv') {
    if (!data.clientName) missingFields.push('Client Name');
  }
  // Notices/permits: no mandatory fields for PDF generation

  const isValid = missingFields.length === 0;
  return { isValid, data, missingFields };
};

/**
 * Create a ZIP bundle containing multiple PDFs
 * @param pdfs Array of PDF blob data with filenames
 * @returns Blob containing the ZIP file
 */
const createZipBundle = async (pdfs: PdfBlobData[]): Promise<Blob> => {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  console.log(`[bulkPdfExport] Creating ZIP bundle with ${pdfs.length} PDFs...`);

  // Add each PDF to the ZIP
  for (const pdf of pdfs) {
    zip.file(pdf.filename, pdf.blob);
  }

  // Generate ZIP file
  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }, // Balance between size and speed
  });

  console.log(`[bulkPdfExport] ZIP bundle created: ${(zipBlob.size / 1024 / 1024).toFixed(2)}MB`);
  return zipBlob;
};

/**
 * Generate and download PDFs for multiple reports
 */
export const generateBulkPDFs = async (
  reportIds: string[],
  userId: string,
  options?: BulkExportOptions
): Promise<BulkExportResult> => {
  const result: BulkExportResult = {
    successful: 0,
    failed: 0,
    errors: [],
  };

  const total = reportIds.length;
  let current = 0;

  // Determine if we should use ZIP bundling
  // Use ZIP if 5+ PDFs, unless explicitly disabled
  const shouldUseZip = options?.useZipBundle ?? total >= 5;

  console.log(
    `[bulkPdfExport] Starting bulk export: ${total} reports, ZIP bundling: ${shouldUseZip}`
  );

  // Array to collect PDF blobs for ZIP bundling
  const pdfBlobs: PdfBlobData[] = [];

  // Process each report sequentially to avoid overwhelming the edge functions
  for (const reportId of reportIds) {
    try {
      current++;
      console.log(`[bulkPdfExport] ═══ Processing ${current}/${total}: ${reportId} ═══`);

      // Notify progress
      if (options?.onProgress) {
        options.onProgress(current, total, reportId);
      }

      // Fetch full report data
      const report = await reportCloud.getReportByReportId(reportId, userId);
      if (!report) {
        throw new Error(`Report not found: ${reportId}`);
      }

      // Validate and enrich data with required fields
      const validation = validateAndEnrichReportData(report);
      if (!validation.isValid) {
        const fieldsStr = validation.missingFields.join(', ');
        console.error(
          `[bulkPdfExport] Validation failed for ${reportId}:`,
          validation.missingFields
        );
        throw new Error(`Please complete: ${fieldsStr}. Open the certificate and fill in the missing fields before downloading.`);
      }

      // Get edge function name based on report type
      const edgeFunctionName = getEdgeFunctionForReportType(report.report_type);

      // Get template ID for this report type
      const templateId = await getTemplateIdForReportType(report.report_type);

      // Use pre-formatted PDF payload if available, otherwise format on-the-fly
      let dataForPdf = validation.data;
      const rtLower = report.report_type.toLowerCase().replace(/\s+/g, '-');
      if (report.pdf_payload) {
        console.log(`[bulkPdfExport] Using saved pdf_payload for ${reportId}`);
        dataForPdf = report.pdf_payload;
      } else {
        console.log(`[bulkPdfExport] No pdf_payload, attempting on-the-fly format for ${reportId} (${rtLower})`);
        if (rtLower === 'eicr') {
          const { formatEICRJson } = await import('./eicrJsonFormatter');
          dataForPdf = await formatEICRJson(validation.data, report.report_id);
        } else if (rtLower === 'eic') {
          const { formatEicJson } = await import('./eicJsonFormatter');
          dataForPdf = await formatEicJson(validation.data, null, report.report_id);
        } else if (rtLower === 'ev-charging') {
          const { formatEVChargingJson } = await import('./evChargingJsonFormatter');
          dataForPdf = formatEVChargingJson(validation.data);
        } else if (rtLower === 'pat-testing') {
          const { formatPATTestingJson } = await import('./patTestingJsonFormatter');
          dataForPdf = formatPATTestingJson(validation.data);
        } else if (rtLower.startsWith('fire-alarm')) {
          const { formatFireAlarmJson } = await import('./fireAlarmJsonFormatter');
          dataForPdf = formatFireAlarmJson(validation.data);
        } else if (rtLower === 'emergency-lighting') {
          const { formatEmergencyLightingJson } = await import('./emergencyLightingJsonFormatter');
          dataForPdf = formatEmergencyLightingJson(validation.data);
        } else if (rtLower === 'solar-pv') {
          const { formatSolarPVJson } = await import('./solarPVJsonFormatter');
          dataForPdf = formatSolarPVJson(validation.data);
        }
        // Minor Works, BESS, G98/99, notices: edge function handles transform internally
      }

      // Optimise data before sending (use enriched data)
      const optimizationResult = optimizeForPdfGeneration(dataForPdf);
      console.log(
        `[bulkPdfExport] Data size for ${reportId}: ${optimizationResult.originalSizeMB.toFixed(2)}MB → ${optimizationResult.optimizedSizeMB.toFixed(2)}MB`
      );

      if (optimizationResult.warnings.length > 0) {
        console.warn(`[bulkPdfExport] Warnings for ${reportId}:`, optimizationResult.warnings);
      }

      // Prepare request body
      const requestBody: any = { formData: optimizationResult.optimizedData };
      if (templateId) {
        requestBody.templateId = templateId;
      }

      // Call edge function to generate PDF
      console.log(`[bulkPdfExport] Invoking ${edgeFunctionName} for ${reportId}...`);
      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke(
        edgeFunctionName,
        {
          body: requestBody,
        }
      );

      if (pdfError) {
        throw new Error(`Edge function error: ${pdfError.message || 'Unknown error'}`);
      }

      if (!pdfResult?.success || !pdfResult?.pdfUrl) {
        const errorMsg = pdfResult?.error || 'No PDF URL returned';
        throw new Error(errorMsg);
      }

      // Generate filename
      const certType =
        report.report_type === 'eicr'
          ? 'EICR'
          : report.report_type === 'eic'
            ? 'EIC'
            : 'MinorWorks';
      const filename = generatePdfFilename(
        certType as any,
        report.certificate_number || reportId,
        report.client_name || 'Unknown',
        report.inspection_date ? new Date(report.inspection_date) : new Date()
      );

      // Fetch PDF as blob
      const pdfBlob = await fetchPdfAsBlob(pdfResult.pdfUrl);

      if (shouldUseZip) {
        // Add to collection for ZIP bundling
        pdfBlobs.push({ filename, blob: pdfBlob, reportId });
        console.log(`[bulkPdfExport] Added ${filename} to ZIP bundle`);
      } else {
        // Download immediately
        downloadBlob(pdfBlob, filename);
        console.log(`[bulkPdfExport] Downloaded ${filename}`);
      }

      // Update report with PDF URL
      await supabase
        .from('reports')
        .update({
          pdf_url: pdfResult.pdfUrl,
          pdf_generated_at: new Date().toISOString(),
        })
        .eq('id', report.id);

      result.successful++;
      console.log(`[bulkPdfExport] Successfully exported ${reportId}`);
    } catch (error) {
      console.error(`[bulkPdfExport] Failed to export ${reportId}:`, error);
      result.failed++;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      // Create user-friendly error message with certificate number if available
      let report: CloudReport | null = null;
      try {
        report = await reportCloud.getReportByReportId(reportId, userId);
      } catch (e) {
        // Ignore error fetching report for error message
      }

      const reportNumber = report?.certificate_number || reportId;
      result.errors.push(`${reportNumber}: ${errorMessage}`);

      // Continue with next report rather than failing entire batch
    }

    // Add a small delay between requests to avoid overwhelming the system
    if (current < total) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  // If using ZIP bundling and we have successful PDFs, create and download the ZIP
  if (shouldUseZip && pdfBlobs.length > 0) {
    try {
      console.log(`[bulkPdfExport] Creating ZIP bundle with ${pdfBlobs.length} PDFs...`);
      const zipBlob = await createZipBundle(pdfBlobs);

      // Generate ZIP filename with current date
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format
      const zipFilename = `Certificates_Export_${dateStr}.zip`;

      // Download the ZIP file
      downloadBlob(zipBlob, zipFilename);
      console.log(`[bulkPdfExport] ZIP bundle downloaded: ${zipFilename}`);
    } catch (zipError) {
      console.error('[bulkPdfExport] Failed to create ZIP bundle:', zipError);
      // Don't fail the entire export if ZIP creation fails
      // The PDFs were already generated successfully
      result.errors.push('ZIP creation failed, but PDFs were generated successfully');
    }
  }

  console.log(
    `[bulkPdfExport] Bulk export complete: ${result.successful} successful, ${result.failed} failed`
  );
  return result;
};
