/**
 * PDF Data Optimizer
 * Utilities for optimizing report data before sending to PDF generation
 */

export interface OptimizationResult {
  success: boolean;
  originalSizeMB: number;
  optimizedSizeMB: number;
  warnings: string[];
  optimizedData: any;
}

const MAX_SAFE_SIZE_MB = 0.8; // 800KB - leave buffer under 1MB limit
const WARNING_SIZE_MB = 0.5; // 500KB - warn user

/**
 * Calculate the size of JSON data in megabytes
 */
export const calculateDataSize = (data: any): number => {
  const jsonString = JSON.stringify(data);
  const bytes = new TextEncoder().encode(jsonString).length;
  return bytes / (1024 * 1024);
};

/**
 * Check if a string is a base64 data URL
 */
const isBase64DataUrl = (str: string): boolean => {
  if (typeof str !== 'string') return false;
  return str.startsWith('data:image/') || str.startsWith('data:application/');
};

/**
 * Extract base64 images from data and return their info
 */
export const findBase64Images = (data: any, path = ''): Array<{ path: string; sizeMB: number }> => {
  const images: Array<{ path: string; sizeMB: number }> = [];

  if (typeof data === 'string' && isBase64DataUrl(data)) {
    const sizeMB = (data.length * 0.75) / (1024 * 1024); // base64 is ~33% larger
    images.push({ path, sizeMB });
  } else if (Array.isArray(data)) {
    data.forEach((item, index) => {
      images.push(...findBase64Images(item, `${path}[${index}]`));
    });
  } else if (typeof data === 'object' && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      const newPath = path ? `${path}.${key}` : key;
      images.push(...findBase64Images(value, newPath));
    });
  }

  return images;
};

// Signatures and scheme/company logos are stored as small base64 data URLs and
// MUST survive the strip step — otherwise locked certs (whose only download path
// is the optimiser-based one) lose every signature box and their branding. Photos
// are the large payload the size guard actually targets; signatures and logos are
// tiny by comparison and are needed on every render. ELE-1103.
//   - /signat/i  → inspector_signature, signatories[].signature, schedule_*_by_signature, …
//   - /logo/i    → registration_scheme_logo, company_logo, schemeLogo, companyLogo, …
const PRESERVE_KEY_RE = /signat|logo/i;

// Signatures and logos are meant to be tiny. If a "preserved" data URL is
// abnormally large (e.g. a user uploaded a multi-MB image as their company
// logo — ELE-1177), preserving it defeats the whole size guard and the PDF
// fails to generate. Above this cap we strip it anyway: a cert with no logo
// beats a cert that won't render. Normal logos/signatures are far smaller.
const PRESERVE_MAX_BYTES = 150 * 1024; // ~150KB

const shouldPreserveDataUrl = (key: string, value: string): boolean =>
  PRESERVE_KEY_RE.test(key) && value.length * 0.75 <= PRESERVE_MAX_BYTES;

/**
 * Strip base64 images from data (for PDF generation fallback).
 * Small signature and logo data URLs (matched by key) are preserved; photos —
 * and any oversized logo/signature — are removed so the size guard still bites.
 */
export const stripBase64Images = (data: any, key = ''): any => {
  if (typeof data === 'string' && isBase64DataUrl(data)) {
    return shouldPreserveDataUrl(key, data) ? data : ''; // Strip photos + oversized logos
  } else if (typeof data === 'string') {
    // Preserve all non-base64 strings (required fields like names, addresses)
    return data;
  } else if (Array.isArray(data)) {
    // Carry the parent key down so e.g. signatories[].signature stays preserved.
    return data.map((item) => stripBase64Images(item, key));
  } else if (typeof data === 'object' && data !== null) {
    const result: any = {};
    Object.entries(data).forEach(([k, value]) => {
      result[k] = stripBase64Images(value, k);
    });
    return result;
  }
  return data;
};

/**
 * Optimize report data for PDF generation
 * Returns optimized data and warnings about size issues
 */
export const optimizeForPdfGeneration = (data: any): OptimizationResult => {
  const warnings: string[] = [];
  const originalSizeMB = calculateDataSize(data);

  // Find all base64 images
  const images = findBase64Images(data);
  const totalImageSizeMB = images.reduce((sum, img) => sum + img.sizeMB, 0);

  // Log image findings
  if (images.length > 0) {
    console.log(`Found ${images.length} base64 images totaling ${totalImageSizeMB.toFixed(2)}MB:`);
    images.forEach((img) => {
      console.log(`  - ${img.path}: ${img.sizeMB.toFixed(2)}MB`);
    });
  }

  // Check if data is too large
  if (originalSizeMB > MAX_SAFE_SIZE_MB) {
    warnings.push(
      `Data size (${originalSizeMB.toFixed(2)}MB) exceeds safe limit (${MAX_SAFE_SIZE_MB}MB). ` +
        `This may cause PDF generation to fail.`
    );

    if (totalImageSizeMB > 0.1) {
      warnings.push(
        `Found ${totalImageSizeMB.toFixed(2)}MB of base64 images. ` +
          `Consider storing images in Supabase Storage and referencing by URL.`
      );
    }

    // Strip images as optimization
    const optimizedData = stripBase64Images(data);
    const optimizedSizeMB = calculateDataSize(optimizedData);

    // Log sample of preserved data to verify required fields remain
    console.log('[pdfDataOptimizer] Sample of optimised data:', {
      clientName: optimizedData.clientName?.substring(0, 20),
      installationAddress: optimizedData.installationAddress?.substring(0, 30),
      inspectorName: optimizedData.inspectorName?.substring(0, 20),
      hasCircuits: !!optimizedData.circuits_json,
      hasObservations: !!optimizedData.defect_observations_json,
    });

    warnings.push(
      `Attempting PDF generation without embedded images. ` +
        `Reduced size from ${originalSizeMB.toFixed(2)}MB to ${optimizedSizeMB.toFixed(2)}MB.`
    );

    return {
      success: true,
      originalSizeMB,
      optimizedSizeMB,
      warnings,
      optimizedData,
    };
  }

  // Data is within safe limits
  if (originalSizeMB > WARNING_SIZE_MB) {
    warnings.push(
      `Data size (${originalSizeMB.toFixed(2)}MB) is approaching the limit. ` +
        `Consider optimizing images or using storage URLs.`
    );
  }

  return {
    success: true,
    originalSizeMB,
    optimizedSizeMB: originalSizeMB,
    warnings,
    optimizedData: data, // No optimization needed
  };
};

/**
 * Format size warnings for user display
 */
export const formatSizeWarning = (result: OptimizationResult): string => {
  if (result.warnings.length === 0) return '';

  return result.warnings.join('\n\n');
};
