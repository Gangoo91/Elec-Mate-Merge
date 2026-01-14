import jsPDF from "jspdf";
import { format } from "date-fns";
import type { Briefing, BriefingAttendee } from "@/hooks/useBriefings";

interface BriefingPdfOptions {
  briefing: Briefing;
  attendees?: BriefingAttendee[];
  companyName?: string;
  companyLogo?: string; // Base64 encoded logo
}

// Professional colour palette
const COLORS = {
  PRIMARY: [24, 51, 138] as [number, number, number],       // Deep professional blue
  PRIMARY_LIGHT: [59, 89, 182] as [number, number, number], // Lighter blue
  ACCENT: [45, 85, 175] as [number, number, number],        // Mid blue
  SUCCESS: [22, 163, 74] as [number, number, number],       // Professional green
  WARNING: [217, 119, 6] as [number, number, number],       // Rich amber
  DANGER: [185, 28, 28] as [number, number, number],        // Deep red
  INFO: [79, 70, 229] as [number, number, number],          // Indigo
  LIGHT_BG: [248, 250, 252] as [number, number, number],    // Light grey
  LIGHTER_BG: [252, 252, 253] as [number, number, number],  // Near white
  BORDER: [203, 213, 225] as [number, number, number],      // Border grey
  BORDER_LIGHT: [226, 232, 240] as [number, number, number],// Light border
  TEXT_DARK: [15, 23, 42] as [number, number, number],      // Near black
  TEXT_BODY: [51, 65, 85] as [number, number, number],      // Body text
  TEXT_MUTED: [100, 116, 139] as [number, number, number],  // Muted text
  WHITE: [255, 255, 255] as [number, number, number],
  YELLOW: [234, 179, 8] as [number, number, number],        // Warning/Elec yellow
};

// Risk level colours
const RISK_COLORS: Record<string, [number, number, number]> = {
  high: COLORS.DANGER,
  medium: COLORS.WARNING,
  low: COLORS.SUCCESS,
};

// Parse HTML content to structured sections
function htmlToSections(html: string): { sections: Array<{ heading: string; content: string[]; isList?: boolean }> } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const sections: Array<{ heading: string; content: string[]; isList?: boolean }> = [];
  let currentSection: { heading: string; content: string[]; isList?: boolean } | null = null;

  const processNode = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      if (tagName === "h1" || tagName === "h2" || tagName === "h3") {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = { heading: element.textContent?.trim() || "", content: [] };
      } else if (tagName === "p") {
        const text = element.textContent?.trim();
        if (text) {
          if (!currentSection) {
            currentSection = { heading: "", content: [] };
          }
          currentSection.content.push(text);
        }
      } else if (tagName === "ul" || tagName === "ol") {
        const items = element.querySelectorAll("li");
        items.forEach((li) => {
          const text = li.textContent?.trim();
          if (text) {
            if (!currentSection) {
              currentSection = { heading: "", content: [], isList: true };
            }
            currentSection.content.push(`• ${text}`);
          }
        });
      } else if (tagName === "table") {
        // Process table rows
        const rows = element.querySelectorAll("tr");
        rows.forEach((row) => {
          const cells = row.querySelectorAll("td, th");
          const rowText = Array.from(cells).map(c => c.textContent?.trim()).join(": ");
          if (rowText) {
            if (!currentSection) {
              currentSection = { heading: "", content: [] };
            }
            currentSection.content.push(rowText);
          }
        });
      } else if (tagName === "strong" || tagName === "b") {
        // Handle bold text within paragraphs
        const text = element.textContent?.trim();
        if (text) {
          if (!currentSection) {
            currentSection = { heading: "", content: [] };
          }
          currentSection.content.push(`**${text}**`);
        }
      } else {
        node.childNodes.forEach(processNode);
      }
    }
  };

  doc.body.childNodes.forEach(processNode);

  if (currentSection) {
    sections.push(currentSection);
  }

  return { sections };
}

export function generateBriefingPDF(options: BriefingPdfOptions): jsPDF {
  const { briefing, attendees = [], companyName = "Your Company" } = options;

  const doc = new jsPDF("portrait", "mm", "a4");
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 0;
  let currentPage = 1;

  // Parse HTML content
  const { sections } = briefing.content ? htmlToSections(briefing.content) : { sections: [] };

  // Get risk level colour
  const riskColor = briefing.risk_level ? RISK_COLORS[briefing.risk_level] : COLORS.PRIMARY;

  // Dates
  const briefingDate = briefing.date
    ? format(new Date(briefing.date), "dd MMMM yyyy")
    : format(new Date(), "dd MMMM yyyy");
  const generatedDate = format(new Date(), "dd/MM/yyyy HH:mm");

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  const checkPageBreak = (requiredSpace: number): boolean => {
    if (yPos + requiredSpace > pageHeight - 25) {
      doc.addPage();
      currentPage++;
      yPos = margin + 5;
      addContinuationHeader();
      return true;
    }
    return false;
  };

  const addContinuationHeader = () => {
    // Top accent bar
    doc.setFillColor(...COLORS.PRIMARY);
    doc.rect(0, 0, pageWidth, 2, "F");

    // Yellow accent
    doc.setFillColor(...COLORS.YELLOW);
    doc.rect(0, 2, pageWidth, 0.8, "F");

    // Briefing title
    doc.setTextColor(...COLORS.TEXT_MUTED);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(briefing.title, margin, 8);

    // Company name on right
    doc.text(companyName, pageWidth - margin, 8, { align: "right" });

    yPos = 14;
  };

  const addFooter = (pageNum: number, totalPages: number) => {
    const footerY = pageHeight - 15;

    // Footer line
    doc.setDrawColor(...COLORS.BORDER_LIGHT);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY, pageWidth - margin, footerY);

    // Footer text
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.TEXT_MUTED);
    doc.setFont("helvetica", "normal");

    // Left: Type
    doc.text(briefing.briefing_type || "Toolbox Talk", margin, footerY + 4);

    // Centre: Company
    doc.setFont("helvetica", "bold");
    doc.text(companyName, pageWidth / 2, footerY + 4, { align: "center" });

    // Right: Page number
    doc.setFont("helvetica", "normal");
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, footerY + 4, { align: "right" });

    // Bottom line - generated by
    doc.setFontSize(6);
    doc.setTextColor(...COLORS.BORDER);
    doc.text(`Generated by Elec-Mate | ${generatedDate}`, pageWidth / 2, footerY + 8, { align: "center" });
  };

  // ============================================
  // HEADER SECTION
  // ============================================

  // Top accent bar - with risk colour
  doc.setFillColor(...riskColor);
  doc.rect(0, 0, pageWidth, 4, "F");

  // Yellow accent stripe
  doc.setFillColor(...COLORS.YELLOW);
  doc.rect(0, 4, pageWidth, 2, "F");

  // Header background
  doc.setFillColor(...COLORS.PRIMARY);
  doc.rect(0, 6, pageWidth, 38, "F");

  // Company name
  doc.setTextColor(...COLORS.WHITE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(companyName.toUpperCase(), margin, 16);

  // Type badge
  const typeText = (briefing.briefing_type || "TOOLBOX TALK").toUpperCase();
  doc.setFontSize(8);
  const typeBadgeWidth = doc.getTextWidth(typeText) + 12;
  doc.setFillColor(...COLORS.YELLOW);
  doc.roundedRect(pageWidth - margin - typeBadgeWidth, 10, typeBadgeWidth, 7, 2, 2, "F");
  doc.setTextColor(...COLORS.TEXT_DARK);
  doc.text(typeText, pageWidth - margin - typeBadgeWidth / 2, 14.5, { align: "center" });

  // Title
  doc.setTextColor(...COLORS.WHITE);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  const titleLines = doc.splitTextToSize(briefing.title, contentWidth - 20);
  let titleY = 28;
  titleLines.forEach((line: string) => {
    doc.text(line, margin, titleY);
    titleY += 7;
  });

  // Risk level badge if applicable
  if (briefing.risk_level) {
    const riskText = `${briefing.risk_level.toUpperCase()} RISK`;
    doc.setFontSize(7);
    const riskBadgeWidth = doc.getTextWidth(riskText) + 10;
    doc.setFillColor(...riskColor);
    doc.roundedRect(margin, 36, riskBadgeWidth, 6, 2, 2, "F");
    doc.setTextColor(...COLORS.WHITE);
    doc.setFont("helvetica", "bold");
    doc.text(riskText, margin + riskBadgeWidth / 2, 40, { align: "center" });
  }

  yPos = 50;

  // ============================================
  // INFO BAR
  // ============================================

  doc.setFillColor(...COLORS.LIGHT_BG);
  doc.rect(0, yPos, pageWidth, 16, "F");

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");

  const infoItems = [
    { label: "Date", value: briefingDate },
    { label: "Time", value: briefing.time || "-" },
    { label: "Location", value: briefing.location || "-" },
    { label: "Presenter", value: briefing.presenter || "-" },
    { label: "Duration", value: briefing.duration_minutes ? `${briefing.duration_minutes} min` : "-" },
  ];

  let infoX = margin;
  const infoSpacing = (contentWidth - 10) / infoItems.length;

  infoItems.forEach((item) => {
    doc.setTextColor(...COLORS.TEXT_MUTED);
    doc.text(item.label, infoX, yPos + 5);
    doc.setTextColor(...COLORS.TEXT_DARK);
    doc.setFont("helvetica", "bold");
    doc.text(item.value, infoX, yPos + 10);
    doc.setFont("helvetica", "normal");
    infoX += infoSpacing;
  });

  yPos = 72;

  // ============================================
  // CONTENT SECTION
  // ============================================

  if (sections.length > 0) {
    sections.forEach((section) => {
      checkPageBreak(20);

      // Section heading
      if (section.heading) {
        doc.setFillColor(...COLORS.LIGHT_BG);
        doc.roundedRect(margin, yPos - 2, contentWidth, 8, 2, 2, "F");

        // Left accent bar
        doc.setFillColor(...COLORS.PRIMARY);
        doc.rect(margin, yPos - 2, 2.5, 8, "F");

        doc.setTextColor(...COLORS.PRIMARY);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(section.heading, margin + 6, yPos + 3);

        yPos += 12;
      }

      // Section content
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...COLORS.TEXT_BODY);

      section.content.forEach((paragraph) => {
        checkPageBreak(8);

        const isBullet = paragraph.startsWith("•");
        const isBold = paragraph.startsWith("**") && paragraph.endsWith("**");
        const indent = isBullet ? margin + 5 : margin;
        const textWidth = isBullet ? contentWidth - 7 : contentWidth;

        // For bullets, add a coloured dot
        if (isBullet) {
          doc.setFillColor(...COLORS.PRIMARY);
          doc.circle(margin + 2, yPos - 1, 1, "F");
          paragraph = paragraph.substring(2);
        }

        if (isBold) {
          doc.setFont("helvetica", "bold");
          paragraph = paragraph.slice(2, -2);
        }

        const lines = doc.splitTextToSize(paragraph, textWidth);
        lines.forEach((line: string, lineIndex: number) => {
          checkPageBreak(5);
          const xPos = isBullet && lineIndex > 0 ? indent + 2 : indent;
          doc.text(line, xPos, yPos);
          yPos += 4.5;
        });

        if (isBold) {
          doc.setFont("helvetica", "normal");
        }

        yPos += 1;
      });

      yPos += 4;
    });
  } else {
    // No content message
    checkPageBreak(20);
    doc.setTextColor(...COLORS.TEXT_MUTED);
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("No briefing content provided.", margin, yPos);
    yPos += 15;
  }

  // ============================================
  // ATTENDANCE REGISTER SECTION
  // ============================================

  checkPageBreak(60);
  yPos += 8;

  // Section header
  doc.setFillColor(...COLORS.PRIMARY);
  doc.roundedRect(margin, yPos, contentWidth, 10, 3, 3, "F");
  doc.rect(margin, yPos + 5, contentWidth, 5, "F");

  doc.setTextColor(...COLORS.WHITE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("ATTENDANCE REGISTER", pageWidth / 2, yPos + 7, { align: "center" });

  yPos += 14;

  // Stats row
  const signed = attendees.filter(a => a.acknowledged).length;
  const total = attendees.length;
  const pending = total - signed;

  doc.setFillColor(...COLORS.LIGHT_BG);
  doc.roundedRect(margin, yPos, contentWidth, 12, 2, 2, "F");

  doc.setFontSize(8);
  doc.setTextColor(...COLORS.TEXT_MUTED);

  const statsY = yPos + 8;
  doc.text(`Total: ${total}`, margin + 10, statsY);

  doc.setTextColor(...COLORS.SUCCESS);
  doc.text(`Signed: ${signed}`, margin + 50, statsY);

  doc.setTextColor(...COLORS.WARNING);
  doc.text(`Pending: ${pending}`, margin + 90, statsY);

  if (total > 0) {
    const rate = Math.round((signed / total) * 100);
    doc.setTextColor(...COLORS.TEXT_DARK);
    doc.setFont("helvetica", "bold");
    doc.text(`Completion: ${rate}%`, pageWidth - margin - 35, statsY);
  }

  yPos += 16;

  // Table header
  doc.setFillColor(...COLORS.BORDER_LIGHT);
  doc.roundedRect(margin, yPos, contentWidth, 8, 2, 2, "F");

  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.TEXT_DARK);

  const colName = margin + 3;
  const colCompany = margin + 60;
  const colSignature = margin + 110;
  const colTime = margin + 155;

  doc.text("NAME", colName, yPos + 5.5);
  doc.text("COMPANY", colCompany, yPos + 5.5);
  doc.text("SIGNATURE", colSignature, yPos + 5.5);
  doc.text("TIME", colTime, yPos + 5.5);

  yPos += 10;

  // Attendee rows
  if (attendees.length > 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    for (const attendee of attendees) {
      checkPageBreak(14);

      // Row background - alternating
      const rowBg = attendees.indexOf(attendee) % 2 === 0
        ? COLORS.WHITE
        : COLORS.LIGHTER_BG;
      doc.setFillColor(...rowBg);
      doc.rect(margin, yPos - 1, contentWidth, 12, "F");

      // Border
      doc.setDrawColor(...COLORS.BORDER_LIGHT);
      doc.setLineWidth(0.2);
      doc.line(margin, yPos + 11, margin + contentWidth, yPos + 11);

      // Name
      const name = attendee.employee?.name || attendee.guest_name || "Unknown";
      doc.setTextColor(...COLORS.TEXT_DARK);
      doc.text(name, colName, yPos + 5);

      // Company (for guests)
      doc.setTextColor(...COLORS.TEXT_MUTED);
      doc.text(attendee.guest_company || "-", colCompany, yPos + 5);

      // Signature or status
      if (attendee.acknowledged && attendee.signature_url) {
        // Try to add signature image
        try {
          doc.addImage(attendee.signature_url, "PNG", colSignature, yPos - 1, 35, 10, undefined, "FAST");
        } catch {
          // Fallback to checkmark
          doc.setFillColor(...COLORS.SUCCESS);
          doc.circle(colSignature + 17, yPos + 4, 3, "F");
          doc.setTextColor(...COLORS.WHITE);
          doc.setFontSize(6);
          doc.text("✓", colSignature + 17, yPos + 5.5, { align: "center" });
        }
      } else if (attendee.acknowledged) {
        // Signed but no image
        doc.setFillColor(...COLORS.SUCCESS);
        doc.circle(colSignature + 17, yPos + 4, 3, "F");
        doc.setTextColor(...COLORS.WHITE);
        doc.setFontSize(6);
        doc.text("✓", colSignature + 17, yPos + 5.5, { align: "center" });
      } else {
        // Pending
        doc.setDrawColor(...COLORS.BORDER);
        doc.setLineWidth(0.5);
        doc.roundedRect(colSignature, yPos + 1, 35, 7, 1, 1, "S");
      }

      doc.setFontSize(8);

      // Time
      doc.setTextColor(...COLORS.TEXT_MUTED);
      if (attendee.acknowledged_at) {
        doc.text(format(new Date(attendee.acknowledged_at), "HH:mm"), colTime, yPos + 5);
      } else {
        doc.text("-", colTime, yPos + 5);
      }

      yPos += 12;
    }
  } else {
    // Empty state - draw lines for manual sign-off
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(...COLORS.TEXT_MUTED);

    for (let i = 0; i < 8; i++) {
      checkPageBreak(12);

      // Row
      doc.setDrawColor(...COLORS.BORDER_LIGHT);
      doc.setLineWidth(0.2);
      doc.line(margin, yPos + 10, margin + contentWidth, yPos + 10);

      // Line numbers
      doc.text(`${i + 1}.`, colName, yPos + 5);

      // Blank signature box
      doc.setLineWidth(0.5);
      doc.roundedRect(colSignature, yPos, 35, 8, 1, 1, "S");

      yPos += 11;
    }
  }

  // ============================================
  // PRESENTER SIGNATURE SECTION
  // ============================================

  checkPageBreak(40);
  yPos += 10;

  // Box
  doc.setFillColor(...COLORS.LIGHTER_BG);
  doc.setDrawColor(...COLORS.BORDER);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, yPos, contentWidth, 30, 3, 3, "FD");

  // Header
  doc.setFillColor(...COLORS.YELLOW);
  doc.roundedRect(margin, yPos, contentWidth, 9, 3, 3, "F");
  doc.rect(margin, yPos + 5, contentWidth, 4, "F");
  doc.setTextColor(...COLORS.TEXT_DARK);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("PRESENTED BY", margin + 8, yPos + 6);

  // Presenter name
  doc.setTextColor(...COLORS.TEXT_BODY);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Name:", margin + 8, yPos + 16);
  doc.setFont("helvetica", "bold");
  doc.text(briefing.presenter || "[Presenter Name]", margin + 23, yPos + 16);

  // Signature area
  doc.setFont("helvetica", "normal");
  doc.text("Signature:", margin + 8, yPos + 24);

  if (briefing.presenter_signature_url) {
    try {
      doc.addImage(briefing.presenter_signature_url, "PNG", margin + 28, yPos + 17, 40, 12, undefined, "FAST");
    } catch {
      // Signature image failed
      doc.setDrawColor(...COLORS.PRIMARY);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin + 28, yPos + 17, 40, 10, 2, 2, "S");
    }
  } else {
    // Empty signature box
    doc.setDrawColor(...COLORS.PRIMARY);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin + 28, yPos + 17, 40, 10, 2, 2, "S");
  }

  // Date
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.TEXT_BODY);
  doc.text("Date:", margin + 95, yPos + 16);
  doc.setFont("helvetica", "bold");
  doc.text(briefingDate, margin + 110, yPos + 16);

  // ============================================
  // ADD FOOTERS TO ALL PAGES
  // ============================================

  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(i, totalPages);
  }

  return doc;
}

export async function downloadBriefingPDF(options: BriefingPdfOptions): Promise<void> {
  const doc = generateBriefingPDF(options);

  // Generate filename
  const safeName = options.briefing.title
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "_")
    .substring(0, 50);
  const dateStr = format(new Date(), "yyyyMMdd");
  const fileName = `Briefing_${safeName}_${dateStr}.pdf`;

  doc.save(fileName);
}

export function getBriefingPDFBlob(options: BriefingPdfOptions): Blob {
  const doc = generateBriefingPDF(options);
  return doc.output("blob");
}
