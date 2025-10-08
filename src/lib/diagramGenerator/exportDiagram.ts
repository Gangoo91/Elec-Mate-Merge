// Export Diagram Utilities
// Convert SVG to PNG/PDF for download

import jsPDF from 'jspdf';

/**
 * Download a file with given data and filename
 */
function downloadFile(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Convert SVG element to data URL
 */
async function svgToDataUrl(svgElement: SVGSVGElement): Promise<string> {
  // Clone the SVG to avoid modifying the original
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  
  // Set white background
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('width', '100%');
  rect.setAttribute('height', '100%');
  rect.setAttribute('fill', 'white');
  clone.insertBefore(rect, clone.firstChild);
  
  // Convert to string
  const svgString = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(svgBlob);
  });
}

/**
 * Export diagram as PNG
 */
export async function exportDiagramAsPNG(
  svgElement: SVGSVGElement,
  filename: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Get SVG dimensions
      const bbox = svgElement.getBBox();
      const width = bbox.width;
      const height = bbox.height;
      
      // Create canvas
      const canvas = document.createElement('canvas');
      const scale = 2; // For better resolution
      canvas.width = width * scale;
      canvas.height = height * scale;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      // Scale for better quality
      ctx.scale(scale, scale);
      
      // White background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);
      
      // Convert SVG to image
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        
        // Convert to PNG
        canvas.toBlob((blob) => {
          if (blob) {
            const dataUrl = URL.createObjectURL(blob);
            downloadFile(dataUrl, filename);
            URL.revokeObjectURL(dataUrl);
            resolve();
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, 'image/png');
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load SVG image'));
      };
      
      img.src = url;
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Export diagrams as multi-page PDF
 */
export async function exportDiagramsAsPDF(
  svgElements: SVGSVGElement[],
  projectName: string
): Promise<void> {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });
  
  for (let i = 0; i < svgElements.length; i++) {
    if (i > 0) {
      pdf.addPage();
    }
    
    try {
      const dataUrl = await svgToDataUrl(svgElements[i]);
      
      // Calculate dimensions to fit A4 landscape (297mm x 210mm)
      const pageWidth = 297;
      const pageHeight = 210;
      const margin = 10;
      const availableWidth = pageWidth - (2 * margin);
      const availableHeight = pageHeight - (2 * margin);
      
      // Add image to PDF
      pdf.addImage(
        dataUrl,
        'PNG',
        margin,
        margin,
        availableWidth,
        availableHeight,
        undefined,
        'FAST'
      );
      
      // Add page number
      pdf.setFontSize(10);
      pdf.setTextColor(100);
      pdf.text(
        `Page ${i + 1} of ${svgElements.length}`,
        pageWidth / 2,
        pageHeight - 5,
        { align: 'center' }
      );
    } catch (error) {
      console.error(`Failed to add diagram ${i + 1} to PDF:`, error);
    }
  }
  
  // Download PDF
  pdf.save(`${projectName}_circuit_diagrams.pdf`);
}

/**
 * Export single diagram as PDF
 */
export async function exportSingleDiagramAsPDF(
  svgElement: SVGSVGElement,
  filename: string
): Promise<void> {
  await exportDiagramsAsPDF([svgElement], filename.replace('.pdf', ''));
}

/**
 * Export diagram as SVG file
 */
export async function exportDiagramAsSVG(
  svgElement: SVGSVGElement,
  filename: string
): Promise<void> {
  const svgString = new XMLSerializer().serializeToString(svgElement);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  downloadFile(url, filename);
  URL.revokeObjectURL(url);
}
