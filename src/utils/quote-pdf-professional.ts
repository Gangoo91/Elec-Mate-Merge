import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Quote } from '@/types/quote';
import { CompanyProfile } from '@/types/company';
import { safeText, safeNumber, safeDate } from './rams-pdf-helpers';

interface PDFGenerationOptions {
  quote: Partial<Quote>;
  companyProfile?: CompanyProfile | null;
}

export const generateProfessionalQuotePDF = ({ quote, companyProfile }: PDFGenerationOptions) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);
  
  let yPosition = margin;

  // Helper functions
  const formatCurrency = (amount: number): string => {
    const currency = companyProfile?.currency || 'GBP';
    const locale = companyProfile?.locale || 'en-GB';
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const addText = (text: string, x: number, y: number, options: any = {}) => {
    const fontSize = options.fontSize || 10;
    const fontStyle = options.fontStyle || 'normal';
    const maxWidth = options.maxWidth || contentWidth;
    
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', fontStyle);
    
    if (options.color) {
      pdf.setTextColor(options.color[0], options.color[1], options.color[2]);
    } else {
      pdf.setTextColor(0, 0, 0);
    }
    
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    
    return y + (lines.length * fontSize * 0.3528); // Convert pt to mm
  };

  const hexToRgb = (hex: string): number[] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [30, 64, 175]; // Default blue
  };

  const primaryColor = companyProfile?.primary_color ? hexToRgb(companyProfile.primary_color) : [30, 64, 175];
  const secondaryColor = companyProfile?.secondary_color ? hexToRgb(companyProfile.secondary_color) : [59, 130, 246];

  // Header Section
  const renderHeader = () => {
    // Company logo (if available) with proper proportions
    if (companyProfile?.logo_data_url) {
      try {
        const logoImg = new Image();
        logoImg.src = companyProfile.logo_data_url;
        
        // Wait for logo to load to get dimensions
        logoImg.onload = () => {
          // Calculate proper logo dimensions maintaining aspect ratio
          const maxWidth = 45;
          const maxHeight = 25;
          const aspectRatio = logoImg.width / logoImg.height;
          
          let logoWidth = maxWidth;
          let logoHeight = maxWidth / aspectRatio;
          
          if (logoHeight > maxHeight) {
            logoHeight = maxHeight;
            logoWidth = maxHeight * aspectRatio;
          }
          
          // Position logo in top right with proper proportions
          const logoX = pageWidth - margin - logoWidth;
          pdf.addImage(companyProfile.logo_data_url!, 'JPEG', logoX, yPosition, logoWidth, logoHeight);
        };
        
        // Fallback dimensions if image doesn't load
        const logoX = pageWidth - margin - 45;
        pdf.addImage(companyProfile.logo_data_url, 'JPEG', logoX, yPosition, 45, 25);
      } catch (error) {
        console.warn('Could not add logo to PDF:', error);
      }
    }

    // Company details (left side)
    const companyName = safeText(companyProfile?.company_name || 'Your Company');
    
    yPosition = addText(companyName, margin, yPosition + 8, {
      fontSize: 18,
      fontStyle: 'bold',
      color: primaryColor
    });

    if (companyProfile?.company_address) {
      yPosition = addText(safeText(companyProfile.company_address), margin, yPosition + 2, {
        fontSize: 9,
        maxWidth: contentWidth - 60
      });
    }

    // Contact info with proper spacing
    if (companyProfile?.company_phone) {
      yPosition = addText(`Tel:  ${safeText(companyProfile.company_phone)}`, margin, yPosition + 3, {
        fontSize: 9,
        maxWidth: contentWidth - 60
      });
    }
    
    if (companyProfile?.company_email) {
      yPosition = addText(`Email:  ${safeText(companyProfile.company_email)}`, margin, yPosition + 3, {
        fontSize: 9,
        maxWidth: contentWidth - 60
      });
    }
    
    if (companyProfile?.company_website) {
      yPosition = addText(`Web: ${safeText(companyProfile.company_website)}`, margin, yPosition + 3, {
        fontSize: 9,
        maxWidth: contentWidth - 60
      });
    }

    // Quote title and number
    yPosition += 15;
    const quoteTitle = `QUOTATION ${safeText(quote.quoteNumber)}`;
    yPosition = addText(quoteTitle, margin, yPosition, {
      fontSize: 22,
      fontStyle: 'bold',
      color: primaryColor
    });

    // Line separator
    yPosition += 5;
    pdf.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    pdf.setLineWidth(2);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    return yPosition;
  };

  // Client and quote details
  const renderQuoteDetails = () => {
    const leftColX = margin;
    const rightColX = margin + (contentWidth / 2) + 5;
    const startY = yPosition;

    // Client details
    addText('QUOTATION FOR:', leftColX, yPosition, {
      fontSize: 11,
      fontStyle: 'bold',
      color: primaryColor
    });

    let clientY = yPosition + 6;
    if (quote.client) {
      clientY = addText(safeText(quote.client.name), leftColX, clientY, {
        fontSize: 10,
        fontStyle: 'bold'
      });
      
      if (quote.client.address) {
        clientY = addText(safeText(quote.client.address), leftColX, clientY + 4, {
          fontSize: 9
        });
      }
      
      if (quote.client.postcode) {
        clientY = addText(safeText(quote.client.postcode), leftColX, clientY + 4, {
          fontSize: 9
        });
      }
      
      // Render Tel separately
      if (quote.client.phone) {
        clientY = addText(`Tel:  ${safeText(quote.client.phone)}`, leftColX, clientY + 4, {
          fontSize: 9
        });
      }

      // Render Email separately  
      if (quote.client.email) {
        clientY = addText(`Email:  ${safeText(quote.client.email)}`, leftColX, clientY + 4, {
          fontSize: 9
        });
      }
    }

    // Quote details
    addText('QUOTE DETAILS:', rightColX, yPosition, {
      fontSize: 11,
      fontStyle: 'bold',
      color: primaryColor
    });

    let detailsY = yPosition + 6;
    
    const quoteDetails = [
      [`Date:`, safeDate(quote.createdAt)],
      [`Valid Until:`, safeDate(quote.expiryDate)],
      [`Status:`, safeText(quote.status).toUpperCase()],
    ];

    if (companyProfile?.vat_number) {
      quoteDetails.push([`VAT No:`, safeText(companyProfile.vat_number)]);
    }

    if (companyProfile?.company_registration) {
      quoteDetails.push([`Company Reg:`, safeText(companyProfile.company_registration)]);
    }

    quoteDetails.forEach(([label, value]) => {
      addText(`${label}`, rightColX, detailsY, {
        fontSize: 9,
        fontStyle: 'bold'
      });
      addText(value, rightColX + 25, detailsY, {
        fontSize: 9
      });
      detailsY += 6;
    });

    yPosition = Math.max(clientY, detailsY) + 10;

    return yPosition;
  };

  // Quote items table
  const renderItemsTable = () => {
    if (!quote.items || quote.items.length === 0) {
      yPosition = addText('No items added to this quote.', margin, yPosition, {
        fontSize: 10,
        color: [128, 128, 128]
      });
      return yPosition + 10;
    }

    // Add section title before table
    yPosition = addText('Quote Items:', margin, yPosition, {
      fontSize: 12,
      fontStyle: 'bold',
      color: primaryColor
    }) + 8;

    const tableData = quote.items.map((item, index) => [
      (index + 1).toString(),
      safeText(item.description),
      `${safeNumber(item.quantity)}`,
      safeText(item.unit),
      formatCurrency(safeNumber(item.unitPrice)),
      formatCurrency(safeNumber(item.totalPrice))
    ]);

    autoTable(pdf, {
      startY: yPosition,
      head: [['#', 'Description', 'Qty', 'Unit', 'Unit Price', 'Total']],
      body: tableData,
      theme: 'striped',
      tableLineWidth: 0.5,
      headStyles: {
        fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'center',
        cellPadding: { top: 6, bottom: 6, left: 4, right: 4 }
      },
      bodyStyles: {
        fontSize: 9,
        cellPadding: { top: 5, bottom: 5, left: 4, right: 4 },
        lineColor: [230, 230, 230],
        lineWidth: 0.3
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 12 },
        1: { halign: 'left', cellWidth: 80 },
        2: { halign: 'center', cellWidth: 18 },
        3: { halign: 'center', cellWidth: 18 },
        4: { halign: 'right', cellWidth: 28 },
        5: { halign: 'right', cellWidth: 28 }
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250]
      },
      styles: {
        lineWidth: 0.3,
        lineColor: [230, 230, 230],
        overflow: 'linebreak',
        cellWidth: 'wrap'
      },
      margin: { left: margin, right: margin },
      showHead: 'everyPage',
      rowPageBreak: 'avoid',
      pageBreak: 'avoid'
    });

    yPosition = (pdf as any).lastAutoTable.finalY + 15;

    return yPosition;
  };

  // Totals and terms section with left-right layout
  const renderTotals = () => {
    // Create clean grey panel for totals and terms with quadrant layout
    const panelStartY = yPosition + 5;
    pdf.setFillColor(248, 248, 248);
    
    // Calculate panel height for content
    const panelHeight = 70;
    
    pdf.rect(margin, panelStartY, contentWidth, panelHeight, 'F');
    
    // Define quadrant positions
    const leftColX = margin + 10;
    const rightColX = margin + (contentWidth * 0.6);
    const topY = panelStartY + 12;
    const bottomY = panelStartY + 40;

    // QUOTE TOTALS (top-right quadrant)
    addText('QUOTE TOTALS', rightColX, topY, {
      fontSize: 12,
      fontStyle: 'bold',
      color: primaryColor
    });
    
    let totalsY = topY + 10;

    // Build totals array
    const totalsData = [];
    
    if (quote.subtotal) {
      totalsData.push(['Subtotal:', formatCurrency(safeNumber(quote.subtotal))]);
    }

    if (quote.overhead && quote.overhead > 0) {
      totalsData.push(['Overhead:', formatCurrency(safeNumber(quote.overhead))]);
    }

    if (quote.profit && quote.profit > 0) {
      totalsData.push(['Profit:', formatCurrency(safeNumber(quote.profit))]);
    }

    if (quote.vatAmount && quote.vatAmount > 0) {
      totalsData.push(['VAT:', formatCurrency(safeNumber(quote.vatAmount))]);
    }

    // Display subtotals
    totalsData.forEach(([label, amount]) => {
      addText(label, rightColX, totalsY, {
        fontSize: 10,
        fontStyle: 'normal'
      });
      addText(amount, rightColX + 35, totalsY, {
        fontSize: 10,
        fontStyle: 'normal'
      });
      totalsY += 5;
    });

    // Final total with emphasis (still in top-right)
    totalsY += 2;
    pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.setLineWidth(1);
    pdf.line(rightColX, totalsY, Math.min(rightColX + 70, margin + contentWidth - 10), totalsY);
    totalsY += 6;

    addText('TOTAL:', rightColX, totalsY, {
      fontSize: 12,
      fontStyle: 'bold',
      color: primaryColor
    });
    addText(formatCurrency(safeNumber(quote.total)), rightColX + 35, totalsY, {
      fontSize: 12,
      fontStyle: 'bold',
      color: primaryColor
    });

    // TERMS & CONDITIONS (full width below totals)
    addText('TERMS & CONDITIONS', leftColX, bottomY, {
      fontSize: 10,
      fontStyle: 'bold',
      color: primaryColor
    });
    
    let termsY = bottomY + 6;
    const simpleTerms = [
      '• Payment: 50% deposit, balance within 30 days',
      '• Valid for 30 days from date issued',
      '• Materials comply with BS 7671:18th Edition',
      '• 12 months warranty on workmanship'
    ];

    // Display each term on its own line using full width
    const termWidth = contentWidth - 20; // Full width minus padding
    
    simpleTerms.forEach(term => {
      addText(term, leftColX, termsY, {
        fontSize: 8,
        maxWidth: termWidth
      });
      termsY += 5;
    });

    yPosition = panelStartY + panelHeight + 10;
    return yPosition;
  };

  // Footer section - now minimal since terms are in totals panel
  const renderFooter = () => {
    // Only add custom notes if they exist
    if (quote.notes) {
      yPosition += 5;
      yPosition = addText('ADDITIONAL NOTES:', margin, yPosition, {
        fontSize: 10,
        fontStyle: 'bold',
        color: primaryColor
      });
      yPosition += 3;
      
      yPosition = addText(safeText(quote.notes), margin, yPosition, {
        fontSize: 9,
        maxWidth: contentWidth
      });
      yPosition += 5;
    }
  };

  // Add footer to all pages
  const addFooterToAllPages = () => {
    const totalPages = pdf.getNumberOfPages();
    
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      
      const footerY = pageHeight - 25;
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(margin, footerY, pageWidth - margin, footerY);

      addText('Please note: This quote is valid for 30 days from the date raised.', margin, footerY + 5, {
        fontSize: 8,
        color: [100, 100, 100]
      });

      // Page number
      addText(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, footerY + 5, {
        fontSize: 8,
        color: [100, 100, 100]
      });
    }
  };

  // Generate PDF
  try {
    yPosition = renderHeader();
    yPosition = renderQuoteDetails();
    yPosition = renderItemsTable();
    yPosition = renderTotals();
    renderFooter();

    // Add footer to all pages
    addFooterToAllPages();

    // Save the PDF
    const fileName = `Quote_${safeText(quote.quoteNumber)}_${safeDate(quote.createdAt).replace(/\//g, '-')}.pdf`;
    pdf.save(fileName);

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};