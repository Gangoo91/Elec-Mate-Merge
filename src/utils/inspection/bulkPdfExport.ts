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
  const normalizedType = reportType.toLowerCase();
  
  if (normalizedType === 'eic') {
    return 'generate-eic-pdf';
  } else if (normalizedType === 'eicr') {
    return 'generate-eicr-pdf';
  } else if (normalizedType === 'minor works' || normalizedType === 'minor-works') {
    return 'generate-minor-works-pdf';
  }
  
  throw new Error(`Unsupported report type: ${reportType}`);
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
const validateAndEnrichReportData = (report: CloudReport): { 
  isValid: boolean; 
  data: any; 
  missingFields: string[] 
} => {
  const data = { ...report.data };
  const missingFields: string[] = [];
  const reportType = report.report_type.toLowerCase();
  
  // clientName is always required for all certificate types
  if (!data.clientName || data.clientName.trim() === '') {
    if (report.client_name) {
      data.clientName = report.client_name;
    } else {
      missingFields.push('clientName');
    }
  }
  
  // installationAddress - required for EICR/EIC, optional for Minor Works
  if (!data.installationAddress || data.installationAddress.trim() === '') {
    if (report.installation_address) {
      data.installationAddress = report.installation_address;
    } else if (reportType === 'eicr' || reportType === 'eic') {
      missingFields.push('installationAddress');
    }
  }
  
  // inspectorName - required for EICR/EIC, optional for Minor Works
  if (!data.inspectorName || data.inspectorName.trim() === '') {
    if (report.inspector_name) {
      data.inspectorName = report.inspector_name;
    } else if (reportType === 'eicr' || reportType === 'eic') {
      missingFields.push('inspectorName');
    }
  }
  
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

  // Add each PDF to the ZIP
  for (const pdf of pdfs) {
    zip.file(pdf.filename, pdf.blob);
  }
  
  // Generate ZIP file
  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 } // Balance between size and speed
  });

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
    errors: []
  };
  
  const total = reportIds.length;
  let current = 0;
  
  // Determine if we should use ZIP bundling
  // Use ZIP if 5+ PDFs, unless explicitly disabled
  const shouldUseZip = options?.useZipBundle ?? (total >= 5);

  // Array to collect PDF blobs for ZIP bundling
  const pdfBlobs: PdfBlobData[] = [];
  
  // Process each report sequentially to avoid overwhelming the edge functions
  for (const reportId of reportIds) {
    try {
      current++;

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
        console.error(`[bulkPdfExport] Validation failed for ${reportId}:`, validation.missingFields);
        throw new Error(`Missing required fields: ${fieldsStr}`);
      }
      
      // Get edge function name based on report type
      const edgeFunctionName = getEdgeFunctionForReportType(report.report_type);
      
      // Get template ID for this report type
      const templateId = await getTemplateIdForReportType(report.report_type);
      
      // Optimise data before sending (use enriched data)
      const optimizationResult = optimizeForPdfGeneration(validation.data);

      if (optimizationResult.warnings.length > 0) {
        console.warn(`[bulkPdfExport] Warnings for ${reportId}:`, optimizationResult.warnings);
      }
      
      // Prepare request body
      const requestBody: any = { formData: optimizationResult.optimizedData };
      if (templateId) {
        requestBody.templateId = templateId;
      }
      
      // Call edge function to generate PDF
      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke(edgeFunctionName, {
        body: requestBody
      });
      
      if (pdfError) {
        throw new Error(`Edge function error: ${pdfError.message || 'Unknown error'}`);
      }
      
      if (!pdfResult?.success || !pdfResult?.pdfUrl) {
        const errorMsg = pdfResult?.error || 'No PDF URL returned';
        throw new Error(errorMsg);
      }
      
      // Generate filename
      const certType = report.report_type === 'eicr' ? 'EICR' : 
                       report.report_type === 'eic' ? 'EIC' : 
                       'MinorWorks';
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
      } else {
        // Download immediately
        downloadBlob(pdfBlob, filename);
      }
      
      // Update report with PDF URL
      await supabase
        .from('reports')
        .update({ 
          pdf_url: pdfResult.pdfUrl,
          pdf_generated_at: new Date().toISOString()
        })
        .eq('id', report.id);
      
      result.successful++;

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
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  // If using ZIP bundling and we have successful PDFs, create and download the ZIP
  if (shouldUseZip && pdfBlobs.length > 0) {
    try {
      const zipBlob = await createZipBundle(pdfBlobs);
      
      // Generate ZIP filename with current date
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format
      const zipFilename = `Certificates_Export_${dateStr}.zip`;
      
      // Download the ZIP file
      downloadBlob(zipBlob, zipFilename);
    } catch (zipError) {
      console.error('[bulkPdfExport] Failed to create ZIP bundle:', zipError);
      // Don't fail the entire export if ZIP creation fails
      // The PDFs were already generated successfully
      result.errors.push('ZIP creation failed, but PDFs were generated successfully');
    }
  }

  return result;
};
