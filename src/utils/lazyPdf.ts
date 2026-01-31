/**
 * Lazy PDF Loading Utility
 *
 * Dynamically imports jsPDF and jspdf-autotable only when needed.
 * This saves ~445KB from the initial bundle since most users don't export PDFs
 * on every session.
 *
 * Usage:
 *   const { jsPDF, autoTable } = await loadPdfLibraries();
 *   const doc = new jsPDF();
 *   autoTable(doc, { ... });
 *
 * Or for just jsPDF:
 *   const jsPDF = await loadJsPDF();
 *   const doc = new jsPDF();
 */

import type jsPDFType from 'jspdf';
import type { UserOptions } from 'jspdf-autotable';

// Cache the loaded modules to avoid re-importing
let jsPDFCache: typeof jsPDFType | null = null;
let autoTableCache: ((doc: jsPDFType, options: UserOptions) => void) | null = null;

/**
 * Lazily load jsPDF library
 * @returns Promise<typeof jsPDF>
 */
export async function loadJsPDF(): Promise<typeof jsPDFType> {
  if (jsPDFCache) {
    return jsPDFCache;
  }

  const module = await import('jspdf');
  jsPDFCache = module.default;
  return jsPDFCache;
}

/**
 * Lazily load both jsPDF and jspdf-autotable
 * @returns Promise with jsPDF constructor and autoTable function
 */
export async function loadPdfLibraries(): Promise<{
  jsPDF: typeof jsPDFType;
  autoTable: (doc: jsPDFType, options: UserOptions) => void;
}> {
  // Load both in parallel for faster loading
  const [jsPDFModule, autoTableModule] = await Promise.all([
    jsPDFCache ? Promise.resolve({ default: jsPDFCache }) : import('jspdf'),
    autoTableCache ? Promise.resolve({ default: autoTableCache }) : import('jspdf-autotable'),
  ]);

  jsPDFCache = jsPDFModule.default;
  autoTableCache = autoTableModule.default;

  return {
    jsPDF: jsPDFCache,
    autoTable: autoTableCache,
  };
}

/**
 * Create a new jsPDF document (convenience function)
 * Handles the lazy loading internally
 */
export async function createPdfDocument(options?: ConstructorParameters<typeof jsPDFType>[0]): Promise<jsPDFType> {
  const jsPDF = await loadJsPDF();
  return new jsPDF(options);
}

/**
 * Check if PDF libraries are already loaded (for preloading UI hints)
 */
export function isPdfLoaded(): boolean {
  return jsPDFCache !== null;
}

/**
 * Preload PDF libraries in the background (e.g., on hover over export button)
 * This improves perceived performance by loading before user clicks
 */
export function preloadPdfLibraries(): void {
  if (!jsPDFCache) {
    // Use requestIdleCallback if available, otherwise setTimeout
    const scheduleLoad = window.requestIdleCallback || ((cb) => setTimeout(cb, 100));
    scheduleLoad(() => {
      loadPdfLibraries().catch(() => {
        // Silently fail - will retry on actual export
      });
    });
  }
}
