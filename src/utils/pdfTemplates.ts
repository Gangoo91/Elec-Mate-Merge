
import jsPDF from 'jspdf';
import { bs7671InspectionSections } from '@/data/bs7671ChecklistData';
import { safeAutoTable } from './pdfEnhancements';

// Extend jsPDF interface to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => void;
    lastAutoTable: {
      finalY: number;
    };
  }
}

export interface EICRPDFTemplate {
  addHeader: (pdf: jsPDF, formData: any) => number;
  addFooter: (pdf: jsPDF, pageNumber: number, totalPages: number, formData?: any) => void;
  addRegulatoryStatement: (pdf: jsPDF, yPosition: number) => number;
  addCircuitScheduleTable: (pdf: jsPDF, circuits: any[], yPosition: number) => number;
  addTestResultsTable: (pdf: jsPDF, testResults: any[], yPosition: number) => number;
  addComplianceSection: (pdf: jsPDF, yPosition: number) => number;
  addBrandingElements: (pdf: jsPDF, formData?: any) => void;
  addInspectionChecklistSection: (pdf: jsPDF, inspectionItems: any[], yPosition: number) => number;
  addTestResultsLandscapePage: (pdf: jsPDF, testResults: any[]) => void;
}

export const createEICRTemplate = (): EICRPDFTemplate => {
  const addHeader = (pdf: jsPDF, formData: any): number => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPos = 12;

    // Professional header with enhanced branding
    if (formData.companyLogo) {
      try {
        pdf.addImage(formData.companyLogo, 'PNG', pageWidth - 60, 8, 40, 20);
      } catch (error) {
        console.warn('Failed to add company logo:', error);
      }
    }

    // Company branding section
    if (formData.brandingCompanyName) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(51, 51, 51);
      pdf.text(formData.brandingCompanyName, 20, yPos);
      yPos += 6;
      
      if (formData.brandingTagline) {
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(102, 102, 102);
        pdf.text(formData.brandingTagline, 20, yPos);
        yPos += 4;
      }
    }

    // Professional title section
    yPos = Math.max(yPos + 8, 35);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('ELECTRICAL INSTALLATION', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 10;
    pdf.setFontSize(22);
    pdf.text('CONDITION REPORT', pageWidth / 2, yPos, { align: 'center' });
    
    // Professional certification reference
    yPos += 15;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const certRef = formData.certificateReference || `EICR-${Date.now().toString().slice(-6)}`;
    
    // Certificate info box
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.rect(pageWidth - 65, 8, 55, 25);
    
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Certificate No.', pageWidth - 62, 16);
    pdf.setFont('helvetica', 'normal');
    pdf.text(certRef, pageWidth - 62, 22);
    
    pdf.setFont('helvetica', 'bold');
    pdf.text('Date Issued:', pageWidth - 62, 28);
    pdf.setFont('helvetica', 'normal');
    pdf.text(new Date().toLocaleDateString('en-GB'), pageWidth - 62, 32);

    // Professional accent line
    pdf.setDrawColor(255, 204, 0);
    pdf.setLineWidth(3);
    pdf.line(20, yPos + 5, pageWidth - 20, yPos + 5);

    return yPos + 15;
  };

  const addFooter = (pdf: jsPDF, pageNumber: number, totalPages: number, formData?: any): void => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Professional footer with enhanced branding
    pdf.setDrawColor(230, 230, 230);
    pdf.setLineWidth(0.5);
    pdf.line(20, pageHeight - 30, pageWidth - 20, pageHeight - 30);
    
    // BS 7671 acknowledgement
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(102, 102, 102);
    pdf.text('Acknowledgement: This certificate is based on the model in appendix 6 of BS 7671: 2018 (IET Wiring Regulations)', 
             20, pageHeight - 20);
    
    // Company footer information
    if (formData?.brandingCompanyName) {
      let footerText = formData.brandingCompanyName;
      if (formData.companyPhone) footerText += ` | Tel: ${formData.companyPhone}`;
      if (formData.companyEmail) footerText += ` | Email: ${formData.companyEmail}`;
      if (formData.brandingWebsite) footerText += ` | ${formData.brandingWebsite}`;
      
      pdf.setFontSize(7);
      pdf.setTextColor(51, 51, 51);
      pdf.text(footerText, pageWidth / 2, pageHeight - 12, { align: 'center' });
    }
    
    // Professional page numbering
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - 20, pageHeight - 8, { align: 'right' });
    
    // Certificate validation
    if (pageNumber === 1) {
      const timestamp = new Date().toISOString();
      pdf.setFontSize(6);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Generated: ${timestamp}`, 20, pageHeight - 8);
    }
    
    pdf.setTextColor(0, 0, 0);
  };

  const addRegulatoryStatement = (pdf: jsPDF, yPosition: number): number => {
    // Skip regulatory statement to match official format - this will be handled in the form sections
    return yPosition;
  };

  const addCircuitScheduleTable = (pdf: jsPDF, circuits: any[], yPosition: number): number => {
    if (!circuits || circuits.length === 0) {
      return yPosition;
    }

    let yPos = yPosition;

    // Clean table format matching BS 7671
    const tableData = circuits.map((circuit, index) => [
      circuit.reference || `${index + 1}`,
      circuit.description || '',
      circuit.type || 'Power',
      circuit.rating || '32A',
      circuit.cableSize || '2.5mm2',
      circuit.installationMethod || '101',
      circuit.length || '25m',
      circuit.rcdProtected ? 'Yes' : 'No'
    ]);

    safeAutoTable(pdf, {
      startY: yPos,
      head: [['Circuit\nReference', 'Circuit\nDesignation', 'Type of\nWiring', 'Overcurrent\nProtection (A)', 'Cable\nSize (mm2)', 'Reference\nMethod', 'Length\n(m)', 'RCD\nProtected']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        fontSize: 8,
        halign: 'center',
        cellPadding: 2
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: 2,
        valign: 'middle',
        halign: 'center'
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 40, halign: 'left' },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 18 },
        5: { cellWidth: 18 },
        6: { cellWidth: 15 },
        7: { cellWidth: 15 }
      },
      margin: { left: 20, right: 20 },
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.3,
        fontSize: 8
      }
    });

    return pdf.lastAutoTable ? pdf.lastAutoTable.finalY + 10 : (yPos + 30);
  };

  const addTestResultsTable = (pdf: jsPDF, testResults: any[], yPosition: number): number => {
    if (!testResults || testResults.length === 0) {
      return yPosition;
    }

    let yPos = yPosition;

    // Check if we need a new page
    if (yPos > pdf.internal.pageSize.getHeight() - 100) {
      pdf.addPage();
      yPos = 20;
    }

    // Prepare table data in BS 7671 format
    const tableData = testResults.map((result, index) => [
      result.circuitReference || `${index + 1}`,
      result.r1r2 || '',
      result.rn || '',
      result.insulationResistance || '',
      result.zs || '',
      result.rcdRating || '',
      result.rcdTime || ''
    ]);

    // Professional test results table matching BS 7671 format
    safeAutoTable(pdf, {
      startY: yPos,
      head: [['Circuit\nRef', 'R1+R2\n(Ohms)', 'Rn\n(Ohms)', 'Insulation\nResistance\n(MOhms)', 'Zs\n(Ohms)', 'RCD\nRating\n(mA)', 'RCD\nTime\n(ms)']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        fontSize: 8,
        halign: 'center',
        cellPadding: 2
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: 2,
        valign: 'middle',
        halign: 'center'
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 25 },
        2: { cellWidth: 20 },
        3: { cellWidth: 25 },
        4: { cellWidth: 20 },
        5: { cellWidth: 25 },
        6: { cellWidth: 25 }
      },
      margin: { left: 20, right: 20 },
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.3,
        fontSize: 8
      }
    });

    return pdf.lastAutoTable ? pdf.lastAutoTable.finalY + 10 : (yPos + 30);
  };

  const addComplianceSection = (pdf: jsPDF, yPosition: number): number => {
    // This is handled in the main export function to match BS 7671 format
    return yPosition;
  };

  const addBrandingElements = (pdf: jsPDF, formData?: any): void => {
    // Add company logo if available
    if (formData?.companyLogo) {
      try {
        // Position logo in top right corner of header
        pdf.addImage(formData.companyLogo, 'JPEG', 150, 10, 40, 20);
      } catch (error) {
        console.warn('Failed to add company logo to PDF:', error);
      }
    }
    
    // Add company branding elements if available
    if (formData?.companyName || formData?.companyTagline) {
      const startY = formData?.companyLogo ? 35 : 15;
      
      if (formData.companyName) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(formData.companyName, 150, startY);
      }
      
      if (formData.companyTagline) {
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        const taglineY = formData.companyName ? startY + 5 : startY;
        pdf.text(formData.companyTagline, 150, taglineY);
      }
      
      if (formData.companyWebsite) {
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        const websiteY = (formData.companyName && formData.companyTagline) ? startY + 10 : 
                        (formData.companyName || formData.companyTagline) ? startY + 5 : startY;
        pdf.text(formData.companyWebsite, 150, websiteY);
      }
    }
  };

  const addInspectionChecklistSection = (pdf: jsPDF, inspectionItems: any[], yPosition: number): number => {
    if (!inspectionItems || inspectionItems.length === 0) return yPosition;
    
    // Check if new page needed
    if (yPosition > pdf.internal.pageSize.getHeight() - 100) {
      pdf.addPage();
      yPosition = 25;
    }
    
    // Professional section header
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(51, 51, 51);
    pdf.text('SCHEDULE OF ITEMS INSPECTED', 20, yPosition);
    yPosition += 8;
    
    // Add professional border
    pdf.setDrawColor(255, 204, 0);
    pdf.setLineWidth(2);
    pdf.line(20, yPosition, 190, yPosition);
    yPosition += 8;
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(102, 102, 102);
    pdf.text('Schedule of items inspected in accordance with BS 7671:2018 (IET Wiring Regulations)', 20, yPosition);
    yPosition += 12;
    
    // Enhanced data processing with statistics
    const sectionMap = new Map();
    let totalItems = 0;
    let satisfactoryCount = 0;
    let defectCount = 0;
    
    inspectionItems.forEach((item: any) => {
      totalItems++;
      if (item.outcome === 'satisfactory') satisfactoryCount++;
      else if (['C1', 'C2', 'C3', 'not-satisfactory'].includes(item.outcome)) defectCount++;
      
      if (!sectionMap.has(item.section)) {
        sectionMap.set(item.section, []);
      }
      sectionMap.get(item.section).push(item);
    });
    
    // Add inspection summary
    const summaryY = yPosition;
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INSPECTION SUMMARY:', 20, summaryY);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Total Items: ${totalItems}`, 50, summaryY);
    pdf.text(`Satisfactory: ${satisfactoryCount}`, 90, summaryY);
    pdf.text(`Defects Found: ${defectCount}`, 130, summaryY);
    
    const completionRate = totalItems > 0 ? Math.round((satisfactoryCount / totalItems) * 100) : 0;
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(completionRate >= 90 ? 0 : completionRate >= 70 ? 255 : 204, completionRate >= 70 ? 150 : 102, 0);
    pdf.text(`${completionRate}% Satisfactory`, 170, summaryY);
    pdf.setTextColor(0, 0, 0);
    yPosition += 15;
    
    // Professional table structure
    const tableData: any[] = [];
    
    sectionMap.forEach((items, sectionId) => {
      const sectionInfo = bs7671InspectionSections.find(s => s.id === sectionId);
      if (sectionInfo) {
        // Enhanced section header
        tableData.push([
          { 
            content: `Section ${sectionInfo.sectionNumber}: ${sectionInfo.title}`, 
            colSpan: 5, 
            styles: { 
              fontStyle: 'bold', 
              fillColor: [51, 51, 51],
              textColor: [255, 255, 255],
              fontSize: 8
            }
          }
        ]);
      }
      
      items.forEach((item: any, index: number) => {
        const outcomeSymbol = item.outcome === 'satisfactory' ? 'OK' :
                             item.outcome === 'C1' ? 'X C1' :
                             item.outcome === 'C2' ? 'X C2' :
                             item.outcome === 'C3' ? 'C3' :
                             item.outcome === 'not-satisfactory' ? 'X' :
                             item.outcome === 'not-applicable' ? 'N/A' :
                             item.outcome === 'limitation' ? 'LIM' : '-';
        
        const outcomeColor = item.outcome === 'satisfactory' ? [34, 139, 34] :
                            ['C1', 'C2', 'not-satisfactory'].includes(item.outcome) ? [220, 20, 60] :
                            item.outcome === 'C3' ? [255, 140, 0] : [128, 128, 128];
        
        tableData.push([
          `${sectionInfo?.sectionNumber || ''}.${index + 1}`,
          item.item || 'Item not specified',
          item.clause || '-',
          { content: outcomeSymbol, styles: { textColor: outcomeColor, fontStyle: 'bold' } },
          item.notes || ''
        ]);
      });
    });
    
    // Enhanced table styling
    safeAutoTable(pdf, {
      startY: yPosition,
      head: [['#', 'Inspection Item', 'BS 7671 Clause', 'Result', 'Notes/Observations']],
      body: tableData,
      styles: {
        fontSize: 7,
        cellPadding: 3,
        lineColor: [200, 200, 200],
        lineWidth: 0.2,
        overflow: 'linebreak'
      },
      headStyles: {
        fillColor: [70, 130, 180],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250]
      },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 70 },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 60 }
      },
      margin: { left: 20, right: 20 }
    });
    
    return (pdf as any).lastAutoTable.finalY + 15;
  };

  const addTestResultsLandscapePage = (pdf: jsPDF, testResults: any[]): void => {
    if (!testResults || testResults.length === 0) return;
    
    // Add new page in landscape
    pdf.addPage('a4', 'landscape');
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SCHEDULE OF TEST RESULTS', 14, 20);
    
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Test results for each circuit in accordance with BS 7671', 14, 28);
    
    const tableData = testResults.map((result: any) => [
      result.circuitNumber || '',
      result.circuitDescription || '',
      result.protectiveDeviceType || '',
      result.protectiveDeviceRating || '',
      result.liveSize || result.cableSize || '',
      result.cpcSize || '',
      result.r1r2 || '',
      result.ringContinuityLive || '',
      result.insulationLiveNeutral || '',
      result.polarity || '',
      result.zs || '',
      result.rcdRating || '',
      result.rcdOneX || '',
      result.pfcLiveNeutral || '',
      result.functionalTesting || ''
    ]);
    
    safeAutoTable(pdf, {
      startY: 35,
      head: [[
        'Cct', 'Description', 'Type', 'Rating\n(A)', 'Live\n(mm2)', 'CPC\n(mm2)',
        'R1+R2\n(Ohms)', 'Ring\n(Ohms)', 'IR\n(MOhms)', 'Pol', 'Zs\n(Ohms)', 
        'RCD\n(mA)', 'RCD\n(ms)', 'PFC\n(kA)', 'Func'
      ]],
      body: tableData,
      styles: {
        fontSize: 6,
        cellPadding: 1,
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
        halign: 'center'
      },
      headStyles: {
        fillColor: [70, 130, 180],
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 6
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 45 },
        2: { cellWidth: 20 },
        3: { cellWidth: 15 },
        4: { cellWidth: 15 },
        5: { cellWidth: 15 },
        6: { cellWidth: 15 },
        7: { cellWidth: 15 },
        8: { cellWidth: 15 },
        9: { cellWidth: 12 },
        10: { cellWidth: 15 },
        11: { cellWidth: 15 },
        12: { cellWidth: 15 },
        13: { cellWidth: 15 },
        14: { cellWidth: 12 }
      }
    });
  };

  return {
    addHeader,
    addFooter,
    addRegulatoryStatement,
    addCircuitScheduleTable,
    addTestResultsTable,
    addComplianceSection,
    addBrandingElements,
    addInspectionChecklistSection,
    addTestResultsLandscapePage
  };
};
