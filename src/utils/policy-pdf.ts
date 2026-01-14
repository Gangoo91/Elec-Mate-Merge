import jsPDF from "jspdf";
import { format } from "date-fns";
import type { PolicyTemplate, UserPolicy } from "@/hooks/usePolicies";

interface PolicyPdfOptions {
  template?: PolicyTemplate | null;
  userPolicy?: UserPolicy | null;
  companyName?: string;
}

// Professional colour palette - refined
const COLORS = {
  PRIMARY: [24, 51, 138] as [number, number, number],       // Deep professional blue
  PRIMARY_LIGHT: [59, 89, 182] as [number, number, number], // Lighter blue
  ACCENT: [45, 85, 175] as [number, number, number],        // Mid blue
  SUCCESS: [22, 163, 74] as [number, number, number],       // Professional green
  WARNING: [217, 119, 6] as [number, number, number],       // Rich amber
  INFO: [79, 70, 229] as [number, number, number],          // Indigo
  LIGHT_BG: [248, 250, 252] as [number, number, number],    // Light grey
  LIGHTER_BG: [252, 252, 253] as [number, number, number],  // Near white
  BORDER: [203, 213, 225] as [number, number, number],      // Border grey
  BORDER_LIGHT: [226, 232, 240] as [number, number, number],// Light border
  TEXT_DARK: [15, 23, 42] as [number, number, number],      // Near black
  TEXT_BODY: [51, 65, 85] as [number, number, number],      // Body text
  TEXT_MUTED: [100, 116, 139] as [number, number, number],  // Muted text
  WHITE: [255, 255, 255] as [number, number, number],
  GOLD: [180, 140, 50] as [number, number, number],         // Premium gold accent
};

// Category colours
const CATEGORY_COLORS: Record<string, [number, number, number]> = {
  "Safety": COLORS.SUCCESS,
  "HR": COLORS.WARNING,
  "Legal": COLORS.INFO,
  "Operations": COLORS.ACCENT,
};

// Compliance badges
const COMPLIANCE_BADGES: Record<string, string> = {
  "Safety": "BS 7671:2018+A3:2024 COMPLIANT",
  "HR": "UK EMPLOYMENT LAW COMPLIANT",
  "Legal": "UK GDPR COMPLIANT",
  "Operations": "COMPANY POLICY",
};

// Parse HTML content to structured sections
function htmlToSections(html: string): { title: string; sections: Array<{ heading: string; content: string[]; isList?: boolean }> } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const sections: Array<{ heading: string; content: string[]; isList?: boolean }> = [];
  let currentSection: { heading: string; content: string[]; isList?: boolean } | null = null;
  let title = "";

  const processNode = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      if (tagName === "h1" || tagName === "h2") {
        if (currentSection) {
          sections.push(currentSection);
        }
        const text = element.textContent?.trim() || "";
        if (tagName === "h1" && !title) {
          title = text;
        }
        currentSection = { heading: text, content: [] };
      } else if (tagName === "h3") {
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
      } else {
        node.childNodes.forEach(processNode);
      }
    }
  };

  doc.body.childNodes.forEach(processNode);

  if (currentSection) {
    sections.push(currentSection);
  }

  return { title, sections };
}

export function generatePolicyPDF(options: PolicyPdfOptions): jsPDF {
  const { template, userPolicy, companyName } = options;

  const policy = userPolicy || template;
  if (!policy) {
    throw new Error("No policy data provided");
  }

  const doc = new jsPDF("portrait", "mm", "a4");
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 0;
  let currentPage = 1;

  // Parse HTML content
  const { sections } = htmlToSections(policy.content);

  // Get category and metadata
  const category = "category" in policy
    ? policy.category
    : userPolicy?.template?.category || "Policy";

  const categoryColor = CATEGORY_COLORS[category] || COLORS.PRIMARY;
  const complianceBadge = COMPLIANCE_BADGES[category] || "COMPANY POLICY";
  const displayCompany = userPolicy?.company_name || companyName || "[Company Name]";
  const version = "version" in policy ? policy.version : "1.0";
  const dateStr = userPolicy?.adopted_at
    ? format(new Date(userPolicy.adopted_at), "dd MMMM yyyy")
    : format(new Date(), "dd MMMM yyyy");

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  const checkPageBreak = (requiredSpace: number): boolean => {
    if (yPos + requiredSpace > pageHeight - 28) {
      doc.addPage();
      currentPage++;
      yPos = margin + 8;
      addContinuationHeader();
      return true;
    }
    return false;
  };

  const addContinuationHeader = () => {
    // Subtle top accent
    doc.setFillColor(...COLORS.PRIMARY);
    doc.rect(0, 0, pageWidth, 2.5, "F");

    // Gold accent line
    doc.setFillColor(...COLORS.GOLD);
    doc.rect(0, 2.5, pageWidth, 0.8, "F");

    // Policy name
    doc.setTextColor(...COLORS.TEXT_MUTED);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(policy.name, margin, 10);

    // Company name on right
    doc.text(displayCompany, pageWidth - margin, 10, { align: "right" });

    yPos = 18;
  };

  const addFooter = (pageNum: number, totalPages: number) => {
    const footerY = pageHeight - 18;

    // Footer line
    doc.setDrawColor(...COLORS.BORDER_LIGHT);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY, pageWidth - margin, footerY);

    // Footer text
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.TEXT_MUTED);
    doc.setFont("helvetica", "normal");

    // Left: Confidentiality notice
    doc.text("CONFIDENTIAL - For internal use only", margin, footerY + 5);

    // Centre: Company
    doc.setFont("helvetica", "bold");
    doc.text(displayCompany, pageWidth / 2, footerY + 5, { align: "center" });

    // Right: Page number
    doc.setFont("helvetica", "normal");
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, footerY + 5, { align: "right" });

    // Bottom line - generated by
    doc.setFontSize(6);
    doc.setTextColor(...COLORS.BORDER);
    doc.text("Generated by Elec-Mate Policy Management System", pageWidth / 2, footerY + 10, { align: "center" });
  };

  // ============================================
  // COVER PAGE
  // ============================================

  // Top accent bar - deep blue with gold stripe
  doc.setFillColor(...COLORS.PRIMARY);
  doc.rect(0, 0, pageWidth, 45, "F");

  // Gold accent stripe
  doc.setFillColor(...COLORS.GOLD);
  doc.rect(0, 45, pageWidth, 3, "F");

  // Decorative corner elements
  doc.setFillColor(...COLORS.PRIMARY_LIGHT);
  doc.triangle(0, 0, 30, 0, 0, 30, "F");
  doc.triangle(pageWidth, 0, pageWidth - 30, 0, pageWidth, 30, "F");

  // Company name at top
  doc.setTextColor(...COLORS.WHITE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(displayCompany.toUpperCase(), pageWidth / 2, 18, { align: "center" });

  // Thin separator
  doc.setDrawColor(255, 255, 255, 0.3);
  doc.setLineWidth(0.3);
  doc.line(pageWidth / 2 - 40, 23, pageWidth / 2 + 40, 23);

  // "POLICY DOCUMENT" label
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("POLICY DOCUMENT", pageWidth / 2, 30, { align: "center" });

  // Category badge on cover
  doc.setFontSize(8);
  const coverBadgeWidth = doc.getTextWidth(category.toUpperCase()) + 14;
  doc.setFillColor(...categoryColor);
  doc.roundedRect((pageWidth - coverBadgeWidth) / 2, 34, coverBadgeWidth, 7, 2, 2, "F");
  doc.text(category.toUpperCase(), pageWidth / 2, 39, { align: "center" });

  // Main title area - white background
  yPos = 70;

  // Large policy title
  doc.setTextColor(...COLORS.PRIMARY);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");

  const titleLines = doc.splitTextToSize(policy.name, contentWidth - 20);
  titleLines.forEach((line: string) => {
    doc.text(line, pageWidth / 2, yPos, { align: "center" });
    yPos += 12;
  });

  // Decorative line under title
  yPos += 5;
  doc.setDrawColor(...COLORS.GOLD);
  doc.setLineWidth(1.5);
  doc.line(pageWidth / 2 - 35, yPos, pageWidth / 2 + 35, yPos);

  // Version info
  yPos += 15;
  doc.setTextColor(...COLORS.TEXT_MUTED);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Version ${version}`, pageWidth / 2, yPos, { align: "center" });

  // Compliance badge - prominent
  yPos += 20;
  doc.setFillColor(...COLORS.SUCCESS);
  const compBadgeWidth = doc.getTextWidth(complianceBadge) + 24;
  doc.roundedRect((pageWidth - compBadgeWidth) / 2, yPos, compBadgeWidth, 10, 3, 3, "F");
  doc.setTextColor(...COLORS.WHITE);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text(complianceBadge, pageWidth / 2, yPos + 6.5, { align: "center" });

  // ============================================
  // DOCUMENT CONTROL BOX (Cover page)
  // ============================================

  yPos = 160;
  const controlBoxHeight = 55;

  // Box with shadow effect
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(margin + 2, yPos + 2, contentWidth, controlBoxHeight, 4, 4, "F");
  doc.setFillColor(...COLORS.WHITE);
  doc.roundedRect(margin, yPos, contentWidth, controlBoxHeight, 4, 4, "F");
  doc.setDrawColor(...COLORS.BORDER);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, yPos, contentWidth, controlBoxHeight, 4, 4, "S");

  // Header
  doc.setFillColor(...COLORS.PRIMARY);
  doc.roundedRect(margin, yPos, contentWidth, 11, 4, 4, "F");
  doc.rect(margin, yPos + 6, contentWidth, 5, "F");
  doc.setTextColor(...COLORS.WHITE);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("DOCUMENT CONTROL", pageWidth / 2, yPos + 7.5, { align: "center" });

  // Control info in columns
  const ctrlY = yPos + 18;
  const col1 = margin + 10;
  const col2 = margin + 55;
  const col3 = margin + contentWidth / 2 + 10;
  const col4 = margin + contentWidth / 2 + 55;

  doc.setTextColor(...COLORS.TEXT_MUTED);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");

  // Row 1
  doc.text("Document ID:", col1, ctrlY);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.TEXT_DARK);
  doc.text(`POL-${category.substring(0, 3).toUpperCase()}-${version.replace(".", "")}`, col2, ctrlY);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.TEXT_MUTED);
  doc.text("Version:", col3, ctrlY);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.TEXT_DARK);
  doc.text(version, col4, ctrlY);

  // Row 2
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.TEXT_MUTED);
  doc.text("Issue Date:", col1, ctrlY + 8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.TEXT_DARK);
  doc.text(dateStr, col2, ctrlY + 8);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.TEXT_MUTED);
  doc.text("Category:", col3, ctrlY + 8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...categoryColor);
  doc.text(category, col4, ctrlY + 8);

  // Row 3
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.TEXT_MUTED);
  doc.text("Review Due:", col1, ctrlY + 16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.TEXT_DARK);
  const reviewDate = userPolicy?.review_date
    ? format(new Date(userPolicy.review_date), "dd MMMM yyyy")
    : "12 months from issue";
  doc.text(reviewDate, col2, ctrlY + 16);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.TEXT_MUTED);
  doc.text("Owner:", col3, ctrlY + 16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.TEXT_DARK);
  doc.text(userPolicy?.approved_by || "Management", col4, ctrlY + 16);

  // Row 4 - Status badge
  const status = userPolicy?.status || "Active";
  const statusColor = status === "Active" ? COLORS.SUCCESS :
                      status === "Review Due" ? COLORS.WARNING : COLORS.TEXT_MUTED;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.TEXT_MUTED);
  doc.text("Status:", col1, ctrlY + 26);

  const statusBadgeWidth = doc.getTextWidth(status.toUpperCase()) + 10;
  doc.setFillColor(...statusColor);
  doc.roundedRect(col2 - 2, ctrlY + 22, statusBadgeWidth, 7, 2, 2, "F");
  doc.setTextColor(...COLORS.WHITE);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.text(status.toUpperCase(), col2 + statusBadgeWidth / 2 - 2, ctrlY + 26.5, { align: "center" });

  // Confidentiality notice at bottom of cover
  yPos = pageHeight - 45;
  doc.setFillColor(...COLORS.LIGHT_BG);
  doc.roundedRect(margin, yPos, contentWidth, 22, 3, 3, "F");
  doc.setDrawColor(...COLORS.BORDER_LIGHT);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, yPos, contentWidth, 22, 3, 3, "S");

  doc.setTextColor(...COLORS.TEXT_MUTED);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.text("CONFIDENTIALITY NOTICE", margin + 8, yPos + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  const confText = "This document contains confidential information belonging to " + displayCompany + ". It is intended solely for internal use. Unauthorised copying, distribution, or disclosure is strictly prohibited.";
  const confLines = doc.splitTextToSize(confText, contentWidth - 16);
  confLines.forEach((line: string, i: number) => {
    doc.text(line, margin + 8, yPos + 11 + (i * 4));
  });

  // ============================================
  // CONTENT PAGES
  // ============================================

  doc.addPage();
  currentPage++;

  // Page header for content
  addContinuationHeader();

  // Content sections
  sections.forEach((section) => {
    checkPageBreak(22);

    // Section heading
    if (section.heading) {
      // Section header with accent bar
      doc.setFillColor(...COLORS.LIGHT_BG);
      doc.roundedRect(margin, yPos - 2, contentWidth, 9, 2, 2, "F");

      // Left accent bar - category coloured
      doc.setFillColor(...categoryColor);
      doc.rect(margin, yPos - 2, 3, 9, "F");

      // Section number circle if heading starts with number
      const numMatch = section.heading.match(/^(\d+)\./);
      if (numMatch) {
        doc.setFillColor(...COLORS.PRIMARY);
        doc.circle(margin + 10, yPos + 2.5, 4, "F");
        doc.setTextColor(...COLORS.WHITE);
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.text(numMatch[1], margin + 10, yPos + 3.5, { align: "center" });

        // Heading text after number
        doc.setTextColor(...COLORS.PRIMARY);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(section.heading.replace(/^\d+\.\s*/, ""), margin + 18, yPos + 4);
      } else {
        doc.setTextColor(...COLORS.PRIMARY);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(section.heading, margin + 8, yPos + 4);
      }

      yPos += 13;
    }

    // Section content
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLORS.TEXT_BODY);

    section.content.forEach((paragraph) => {
      checkPageBreak(10);

      const isBullet = paragraph.startsWith("•");
      const indent = isBullet ? margin + 6 : margin + 2;
      const textWidth = isBullet ? contentWidth - 8 : contentWidth - 4;

      // For bullets, add a small coloured dot
      if (isBullet) {
        doc.setFillColor(...categoryColor);
        doc.circle(margin + 3, yPos - 1, 1, "F");
        paragraph = paragraph.substring(2); // Remove bullet character
      }

      const lines = doc.splitTextToSize(paragraph, textWidth);
      lines.forEach((line: string, lineIndex: number) => {
        checkPageBreak(5);
        const xPos = isBullet && lineIndex > 0 ? indent + 2 : indent;
        doc.text(line, xPos, yPos);
        yPos += 4.5;
      });
      yPos += 1.5;
    });

    yPos += 5;
  });

  // ============================================
  // SIGNATURE PAGE
  // ============================================

  checkPageBreak(110);
  yPos += 10;

  // Main signature box
  const sigBoxHeight = 100;

  // Shadow effect
  doc.setFillColor(235, 235, 235);
  doc.roundedRect(margin + 2, yPos + 2, contentWidth, sigBoxHeight, 4, 4, "F");

  // Main box
  doc.setFillColor(...COLORS.WHITE);
  doc.setDrawColor(...COLORS.PRIMARY);
  doc.setLineWidth(1.5);
  doc.roundedRect(margin, yPos, contentWidth, sigBoxHeight, 4, 4, "FD");

  // Header bar with gradient effect
  doc.setFillColor(...COLORS.PRIMARY);
  doc.roundedRect(margin, yPos, contentWidth, 14, 4, 4, "F");
  doc.rect(margin, yPos + 8, contentWidth, 6, "F");

  // Gold accent under header
  doc.setFillColor(...COLORS.GOLD);
  doc.rect(margin, yPos + 14, contentWidth, 2, "F");

  // Header text
  doc.setTextColor(...COLORS.WHITE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("POLICY ACKNOWLEDGEMENT", pageWidth / 2, yPos + 10, { align: "center" });

  // Declaration text
  let declY = yPos + 24;
  doc.setTextColor(...COLORS.TEXT_BODY);
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  const declaration = "I confirm that I have read, understood, and agree to comply with this policy. I understand my responsibilities as outlined and the consequences of non-compliance. I have had the opportunity to ask questions and clarify any points.";
  const declLines = doc.splitTextToSize(declaration, contentWidth - 20);
  declLines.forEach((line: string) => {
    doc.text(line, margin + 10, declY);
    declY += 4;
  });

  // Two signature columns
  const sigStartY = declY + 8;
  const colWidth = (contentWidth - 20) / 2;
  const leftColX = margin + 5;
  const rightColX = margin + colWidth + 15;
  const boxHeight = 42;

  // ---- EMPLOYEE SIGNATURE BOX ----
  doc.setFillColor(...COLORS.LIGHTER_BG);
  doc.setDrawColor(...COLORS.BORDER);
  doc.setLineWidth(0.5);
  doc.roundedRect(leftColX, sigStartY, colWidth, boxHeight, 3, 3, "FD");

  // Employee header
  doc.setFillColor(...COLORS.SUCCESS);
  doc.roundedRect(leftColX, sigStartY, colWidth, 9, 3, 3, "F");
  doc.rect(leftColX, sigStartY + 5, colWidth, 4, "F");
  doc.setTextColor(...COLORS.WHITE);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("EMPLOYEE", leftColX + colWidth / 2, sigStartY + 6, { align: "center" });

  // Employee fields
  const empY = sigStartY + 14;
  doc.setTextColor(...COLORS.TEXT_MUTED);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");

  doc.text("Print Name:", leftColX + 4, empY);
  doc.setDrawColor(...COLORS.BORDER);
  doc.setLineWidth(0.3);
  doc.line(leftColX + 4, empY + 6, leftColX + colWidth - 4, empY + 6);

  doc.text("Signature:", leftColX + 4, empY + 11);
  doc.setDrawColor(...COLORS.PRIMARY);
  doc.setLineWidth(0.8);
  doc.roundedRect(leftColX + 4, empY + 13, colWidth - 8, 10, 2, 2, "S");

  doc.setDrawColor(...COLORS.BORDER);
  doc.setLineWidth(0.3);
  doc.text("Date:", leftColX + 4, empY + 28);
  doc.line(leftColX + 14, empY + 28, leftColX + 45, empY + 28);

  // ---- MANAGER SIGNATURE BOX ----
  doc.setFillColor(...COLORS.LIGHTER_BG);
  doc.setDrawColor(...COLORS.BORDER);
  doc.setLineWidth(0.5);
  doc.roundedRect(rightColX, sigStartY, colWidth, boxHeight, 3, 3, "FD");

  // Manager header
  doc.setFillColor(...COLORS.PRIMARY);
  doc.roundedRect(rightColX, sigStartY, colWidth, 9, 3, 3, "F");
  doc.rect(rightColX, sigStartY + 5, colWidth, 4, "F");
  doc.setTextColor(...COLORS.WHITE);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("MANAGER / WITNESS", rightColX + colWidth / 2, sigStartY + 6, { align: "center" });

  // Manager fields
  doc.setTextColor(...COLORS.TEXT_MUTED);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");

  doc.text("Print Name:", rightColX + 4, empY);
  doc.setDrawColor(...COLORS.BORDER);
  doc.setLineWidth(0.3);
  doc.line(rightColX + 4, empY + 6, rightColX + colWidth - 4, empY + 6);

  doc.text("Signature:", rightColX + 4, empY + 11);
  doc.setDrawColor(...COLORS.PRIMARY);
  doc.setLineWidth(0.8);
  doc.roundedRect(rightColX + 4, empY + 13, colWidth - 8, 10, 2, 2, "S");

  doc.setDrawColor(...COLORS.BORDER);
  doc.setLineWidth(0.3);
  doc.text("Date:", rightColX + 4, empY + 28);
  doc.line(rightColX + 14, empY + 28, rightColX + 45, empY + 28);

  // ============================================
  // ADD FOOTERS TO ALL PAGES
  // ============================================

  const totalPages = doc.internal.pages.length - 1;
  for (let i = 2; i <= totalPages; i++) { // Skip cover page
    doc.setPage(i);
    addFooter(i - 1, totalPages - 1); // Adjust numbering to exclude cover
  }

  return doc;
}

export async function downloadPolicyPDF(options: PolicyPdfOptions): Promise<void> {
  const policy = options.userPolicy || options.template;
  if (!policy) {
    throw new Error("No policy data provided");
  }

  const doc = generatePolicyPDF(options);

  // Generate filename
  const safeName = policy.name
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "_")
    .substring(0, 50);
  const dateStr = format(new Date(), "yyyyMMdd");
  const fileName = `${safeName}_${dateStr}.pdf`;

  doc.save(fileName);
}
