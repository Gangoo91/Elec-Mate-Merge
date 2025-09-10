import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Quote } from '@/types/quote';
import { CompanyProfile } from '@/types/company';
import { safeText, safeNumber, safeDate } from './rams-pdf-helpers';
import { AIService } from '@/components/cv-builder/ai/AIService';

// Extend jsPDF with autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface AIQuotePDFOptions {
  quote: Partial<Quote>;
  companyProfile?: CompanyProfile | null;
  aiEnhancements?: {
    enhancedDescriptions?: boolean;
    executiveSummary?: boolean;
    smartTerms?: boolean;
    recommendations?: boolean;
  };
}

interface AIGeneratedContent {
  executiveSummary?: string;
  enhancedJobDescription?: string;
  termsAndConditions?: string;
  additionalServices?: string[];
}

export const generateAIEnhancedQuotePDF = async ({ 
  quote, 
  companyProfile, 
  aiEnhancements = {
    enhancedDescriptions: true,
    executiveSummary: true,
    smartTerms: true,
    recommendations: true
  } 
}: AIQuotePDFOptions) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);
  
  let yPosition = margin;

  // Generate AI content
  let aiContent: AIGeneratedContent = {};
  
  try {
    if (aiEnhancements.executiveSummary && quote.jobDetails) {
      aiContent.executiveSummary = await AIService.generateQuoteSummary(quote, companyProfile);
    }
    
    if (aiEnhancements.enhancedDescriptions && quote.jobDetails) {
      aiContent.enhancedJobDescription = await AIService.enhanceJobDescription(quote.jobDetails);
    }
    
    if (aiEnhancements.smartTerms) {
      aiContent.termsAndConditions = await AIService.generateTermsAndConditions(quote);
    }
    
    if (aiEnhancements.recommendations) {
      aiContent.additionalServices = await AIService.suggestAdditionalServices(quote);
    }
  } catch (error) {
    console.warn('AI enhancement failed, falling back to standard content:', error);
  }

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
    // Company logo (if available)
    if (companyProfile?.logo_data_url) {
      try {
        pdf.addImage(companyProfile.logo_data_url, 'JPEG', margin, yPosition, 30, 20);
      } catch (error) {
        console.warn('Could not add logo to PDF:', error);
      }
    }

    // Company details
    const companyX = companyProfile?.logo_data_url ? margin + 35 : margin;
    const companyName = safeText(companyProfile?.company_name || 'Your Company');
    
    yPosition = addText(companyName, companyX, yPosition + 8, {
      fontSize: 18,
      fontStyle: 'bold',
      color: primaryColor
    });

    if (companyProfile?.company_address) {
      yPosition = addText(safeText(companyProfile.company_address), companyX, yPosition + 2, {
        fontSize: 9,
        maxWidth: contentWidth - 35
      });
    }

    const contactInfo = [];
    if (companyProfile?.company_phone) contactInfo.push(`Tel: ${safeText(companyProfile.company_phone)}`);
    if (companyProfile?.company_email) contactInfo.push(`Email: ${safeText(companyProfile.company_email)}`);
    if (companyProfile?.company_website) contactInfo.push(`Web: ${safeText(companyProfile.company_website)}`);

    if (contactInfo.length > 0) {
      yPosition = addText(contactInfo.join(' | '), companyX, yPosition + 2, {
        fontSize: 9,
        maxWidth: contentWidth - 35
      });
    }

    // Quote title and number
    yPosition += 15;
    const quoteTitle = `PROFESSIONAL QUOTATION ${safeText(quote.quoteNumber)}`;
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

  // Executive Summary Section
  const renderExecutiveSummary = () => {
    if (!aiContent.executiveSummary) return yPosition;

    yPosition = addText('EXECUTIVE SUMMARY', margin, yPosition, {
      fontSize: 14,
      fontStyle: 'bold',
      color: primaryColor
    });

    yPosition += 5;
    yPosition = addText(aiContent.executiveSummary, margin, yPosition, {
      fontSize: 10,
      maxWidth: contentWidth
    });

    yPosition += 10;
    return yPosition;
  };

  // Enhanced Job Description Section
  const renderJobDescription = () => {
    const description = aiContent.enhancedJobDescription || quote.jobDetails?.description || '';
    if (!description) return yPosition;

    yPosition = addText('PROJECT DESCRIPTION', margin, yPosition, {
      fontSize: 14,
      fontStyle: 'bold',
      color: primaryColor
    });

    yPosition += 5;
    yPosition = addText(description, margin, yPosition, {
      fontSize: 10,
      maxWidth: contentWidth
    });

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
        clientY = addText(safeText(quote.client.address), leftColX, clientY + 2, {
          fontSize: 9
        });
      }
      
      if (quote.client.postcode) {
        clientY = addText(safeText(quote.client.postcode), leftColX, clientY + 2, {
          fontSize: 9
        });
      }
      
      const clientContact = [];
      if (quote.client.phone) clientContact.push(`Tel: ${safeText(quote.client.phone)}`);
      if (quote.client.email) clientContact.push(`Email: ${safeText(quote.client.email)}`);
      
      if (clientContact.length > 0) {
        clientY = addText(clientContact.join('\n'), leftColX, clientY + 2, {
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
      detailsY += 5;
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

    const tableData = quote.items.map((item, index) => [
      (index + 1).toString(),
      safeText(item.description),
      `${safeNumber(item.quantity)}`,
      safeText(item.unit),
      formatCurrency(safeNumber(item.unitPrice)),
      formatCurrency(safeNumber(item.totalPrice))
    ]);

    const tableResult = pdf.autoTable({
      startY: yPosition,
      head: [['#', 'Description', 'Qty', 'Unit', 'Unit Price', 'Total']],
      body: tableData,
      theme: 'striped',
      tableLineWidth: 0.5,
      lineWidth: 0.5,
      lineColor: [220, 220, 220],
      headStyles: {
        fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 9,
        cellPadding: 3
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 10 },
        1: { halign: 'left', cellWidth: 70 },
        2: { halign: 'center', cellWidth: 15 },
        3: { halign: 'center', cellWidth: 15 },
        4: { halign: 'right', cellWidth: 25 },
        5: { halign: 'right', cellWidth: 25 }
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250]
      },
      styles: {
        lineWidth: 0.5,
        lineColor: [220, 220, 220]
      },
      margin: { left: margin, right: margin },
      didDrawPage: (data) => {
        yPosition = data.cursor?.y || yPosition;
      }
    });

    yPosition = (tableResult as any).finalY + 10;

    return yPosition;
  };

  // Totals section
  const renderTotals = () => {
    const totalsX = pageWidth - margin - 70;
    const totalsWidth = 70;

    // Background for totals
    pdf.setFillColor(248, 249, 250);
    pdf.rect(totalsX - 5, yPosition - 5, totalsWidth + 10, 50, 'F');

    const totalsData = [
      ['Subtotal:', formatCurrency(safeNumber(quote.subtotal))],
    ];

    if (quote.overhead && quote.overhead > 0) {
      totalsData.push(['Overhead:', formatCurrency(safeNumber(quote.overhead))]);
    }

    if (quote.profit && quote.profit > 0) {
      totalsData.push(['Profit:', formatCurrency(safeNumber(quote.profit))]);
    }

    if (quote.vatAmount && quote.vatAmount > 0) {
      totalsData.push(['VAT:', formatCurrency(safeNumber(quote.vatAmount))]);
    }

    totalsData.forEach(([label, amount], index) => {
      const isTotal = index === totalsData.length - 1 && label === 'Total:';
      const fontSize = isTotal ? 12 : 10;
      const fontStyle = isTotal ? 'bold' : 'normal';
      const textColor = isTotal ? primaryColor : [0, 0, 0];

      addText(label, totalsX, yPosition, {
        fontSize,
        fontStyle,
        color: textColor
      });
      addText(amount, totalsX + 35, yPosition, {
        fontSize,
        fontStyle,
        color: textColor
      });
      yPosition += fontSize === 12 ? 7 : 5;
    });

    // Final total
    pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.setLineWidth(0.5);
    pdf.line(totalsX, yPosition, totalsX + totalsWidth - 5, yPosition);
    yPosition += 3;

    addText('TOTAL:', totalsX, yPosition, {
      fontSize: 12,
      fontStyle: 'bold',
      color: primaryColor
    });
    addText(formatCurrency(safeNumber(quote.total)), totalsX + 35, yPosition, {
      fontSize: 12,
      fontStyle: 'bold',
      color: primaryColor
    });

    yPosition += 20;

    return yPosition;
  };

  // Additional Services Recommendations
  const renderRecommendations = () => {
    if (!aiContent.additionalServices || aiContent.additionalServices.length === 0) {
      return yPosition;
    }

    yPosition = addText('RECOMMENDED ADDITIONAL SERVICES', margin, yPosition, {
      fontSize: 11,
      fontStyle: 'bold',
      color: primaryColor
    });

    yPosition += 5;

    aiContent.additionalServices.forEach(service => {
      yPosition = addText(`• ${service}`, margin + 5, yPosition, {
        fontSize: 9
      });
      yPosition += 3;
    });

    yPosition += 5;
    return yPosition;
  };

  // Enhanced Footer section
  const renderFooter = () => {
    // AI-generated terms and conditions
    if (aiContent.termsAndConditions) {
      yPosition = addText('TERMS & CONDITIONS:', margin, yPosition, {
        fontSize: 11,
        fontStyle: 'bold',
        color: primaryColor
      });

      yPosition += 5;
      yPosition = addText(aiContent.termsAndConditions, margin, yPosition, {
        fontSize: 9,
        maxWidth: contentWidth
      });
      yPosition += 5;
    }

    // Payment terms and notes
    if (quote.notes || companyProfile?.payment_terms) {
      if (companyProfile?.payment_terms) {
        yPosition = addText(`Payment Terms: ${safeText(companyProfile.payment_terms)}`, margin, yPosition, {
          fontSize: 9
        });
        yPosition += 3;
      }

      if (quote.notes) {
        yPosition = addText(`Notes: ${safeText(quote.notes)}`, margin, yPosition, {
          fontSize: 9
        });
        yPosition += 5;
      }
    }

    // Compliance footer
    const footerY = pageHeight - 25;
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(margin, footerY, pageWidth - margin, footerY);

    addText('This quotation is valid for 30 days from the date of issue. All work will be carried out in accordance with BS 7671:2018 and current building regulations.', margin, footerY + 5, {
      fontSize: 8,
      color: [100, 100, 100]
    });

    // Page number
    const pageCount = pdf.getNumberOfPages();
    addText(`Page 1 of ${pageCount}`, pageWidth - margin - 20, footerY + 5, {
      fontSize: 8,
      color: [100, 100, 100]
    });
  };

  // Generate PDF
  try {
    yPosition = renderHeader();
    yPosition = renderExecutiveSummary();
    yPosition = renderJobDescription();
    yPosition = renderQuoteDetails();
    yPosition = renderItemsTable();
    yPosition = renderTotals();
    yPosition = renderRecommendations();
    renderFooter();

    // Save the PDF
    const fileName = `AI_Enhanced_Quote_${safeText(quote.quoteNumber)}_${safeDate(quote.createdAt).replace(/\//g, '-')}.pdf`;
    pdf.save(fileName);

    return true;
  } catch (error) {
    console.error('Error generating AI-enhanced PDF:', error);
    return false;
  }
};