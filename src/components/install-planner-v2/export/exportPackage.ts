// Export Package Generator with EIC and Circuit Diagrams
import { downloadEICPDF } from '@/lib/eic/pdfGenerator';
import { exportDiagramsAsPDF, exportDiagramAsPNG } from '@/lib/diagramGenerator/exportDiagram';
import JSZip from 'jszip';
import { EICScheduleOfTests } from '@/types/eic-integration';

export interface ExportOptions {
  selectedDocuments: string[];
  eicSchedule?: EICScheduleOfTests;
  circuitDiagrams?: SVGSVGElement[];
  consumerUnitDiagram?: SVGSVGElement;
  projectName: string;
}

export async function generateExportPackage(options: ExportOptions): Promise<void> {
  const { selectedDocuments, eicSchedule, circuitDiagrams, consumerUnitDiagram, projectName } = options;
  const zip = new JSZip();

  // Add EIC Schedule PDF if selected
  if (selectedDocuments.includes('eic') && eicSchedule) {
    const { generateEICPDF } = await import('@/lib/eic/pdfGenerator');
    const eicBlob = await generateEICPDF(eicSchedule);
    zip.file(`${projectName}_EIC_Schedule.pdf`, eicBlob);
  }

  // Add Circuit Diagrams if available
  if (selectedDocuments.includes('drawings') && circuitDiagrams && circuitDiagrams.length > 0) {
    // Generate combined PDF with all circuit diagrams
    const { exportDiagramsAsPDF } = await import('@/lib/diagramGenerator/exportDiagram');
    
    // Create a temporary div to render diagrams (they need to be in DOM)
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    document.body.appendChild(tempContainer);
    
    // Clone diagrams into container
    const clonedDiagrams = circuitDiagrams.map(svg => {
      const clone = svg.cloneNode(true) as SVGSVGElement;
      tempContainer.appendChild(clone);
      return clone;
    });
    
    // Export to PDF
    await exportDiagramsAsPDF(clonedDiagrams, projectName);
    
    // Cleanup
    document.body.removeChild(tempContainer);
  }

  // Add Consumer Unit Diagram if available
  if (selectedDocuments.includes('drawings') && consumerUnitDiagram) {
    const { exportDiagramAsPNG } = await import('@/lib/diagramGenerator/exportDiagram');
    await exportDiagramAsPNG(consumerUnitDiagram, `${projectName}_Consumer_Unit.png`);
  }

  // Generate ZIP and download
  if (Object.keys(zip.files).length > 0) {
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName}_Export_Package.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
