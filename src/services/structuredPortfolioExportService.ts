import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type {
  StructuredExportData,
  UnitSection,
  KSBItem,
} from '@/hooks/portfolio/usePortfolioExportData';

// ============================================
// Constants
// ============================================
const ELEC_YELLOW: [number, number, number] = [255, 193, 7];
const DARK_BG: [number, number, number] = [10, 15, 26];
const GREEN: [number, number, number] = [34, 197, 94];
const RED: [number, number, number] = [239, 68, 68];
const WHITE: [number, number, number] = [255, 255, 255];
const LIGHT_GREY: [number, number, number] = [245, 245, 245];
const PAGE_MARGIN = 20;

export interface StructuredExportOptions {
  includeAppendix?: boolean;
}

// ============================================
// Service
// ============================================

export class StructuredPortfolioExportService {
  private doc: jsPDF;
  private pageHeight: number;
  private pageWidth: number;
  private tocEntries: { title: string; page: number }[] = [];

  constructor() {
    this.doc = new jsPDF();
    this.pageHeight = this.doc.internal.pageSize.height;
    this.pageWidth = this.doc.internal.pageSize.width;
  }

  async exportToPDF(
    data: StructuredExportData,
    options: StructuredExportOptions = {}
  ): Promise<void> {
    this.tocEntries = [];

    // 1. Front Cover
    this.renderFrontCover(data);

    // 2. Placeholder for Table of Contents (we'll come back to fill it)
    const tocPageStart = this.doc.getNumberOfPages() + 1;
    this.doc.addPage();
    // Leave ToC blank for now — we'll render it after we know all page numbers

    // 3. Unit Sections
    for (const unit of data.units) {
      this.doc.addPage();
      const pageNum = this.doc.getNumberOfPages();
      this.tocEntries.push({ title: `Unit ${unit.unit_code}: ${unit.unit_title}`, page: pageNum });
      this.renderUnitSection(unit);
    }

    // 4. KSB Coverage Summary
    this.doc.addPage();
    this.tocEntries.push({ title: 'KSB Coverage Summary', page: this.doc.getNumberOfPages() });
    this.renderKSBSummary(data);

    // 5. OTJ Hours Summary
    this.doc.addPage();
    this.tocEntries.push({ title: 'Off-the-Job Hours Summary', page: this.doc.getNumberOfPages() });
    this.renderOTJSummary(data);

    // 6. Evidence Appendix (optional)
    if (options.includeAppendix !== false && data.entries.length > 0) {
      this.doc.addPage();
      this.tocEntries.push({ title: 'Evidence Appendix', page: this.doc.getNumberOfPages() });
      this.renderEvidenceAppendix(data);
    }

    // 7. Now render the Table of Contents on the reserved page
    this.renderTableOfContents(tocPageStart);

    // 8. Add page numbers to all pages
    this.addPageNumbers();

    // Save
    const timestamp = new Date().toISOString().split('T')[0];
    const safeName = data.apprentice.name.replace(/[^a-zA-Z0-9]/g, '_');
    this.doc.save(`${safeName}_Structured_Portfolio_${timestamp}.pdf`);
  }

  // ============================================
  // Front Cover
  // ============================================
  private renderFrontCover(data: StructuredExportData) {
    const { apprentice } = data;
    const cx = this.pageWidth / 2;

    // Dark background header band
    this.doc.setFillColor(...DARK_BG);
    this.doc.rect(0, 0, this.pageWidth, 80, 'F');

    // Yellow accent line
    this.doc.setFillColor(...ELEC_YELLOW);
    this.doc.rect(0, 80, this.pageWidth, 4, 'F');

    // Branding
    this.doc.setTextColor(...WHITE);
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Elec-Mate', cx, 25, { align: 'center' });

    this.doc.setFontSize(28);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Apprentice Portfolio', cx, 50, { align: 'center' });

    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Structured Evidence Portfolio', cx, 65, { align: 'center' });

    // Apprentice details
    this.doc.setTextColor(0, 0, 0);
    let y = 105;

    this.doc.setFontSize(22);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(apprentice.name, cx, y, { align: 'center' });
    y += 15;

    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(apprentice.qualification, cx, y, { align: 'center' });
    y += 10;

    if (apprentice.code) {
      this.doc.setFontSize(11);
      this.doc.setTextColor(100, 100, 100);
      this.doc.text(`Qualification Code: ${apprentice.code}`, cx, y, { align: 'center' });
      y += 8;
    }

    if (apprentice.awarding_body) {
      this.doc.text(`Awarding Body: ${apprentice.awarding_body}`, cx, y, { align: 'center' });
      y += 8;
    }

    if (apprentice.level) {
      this.doc.text(`Level: ${apprentice.level}`, cx, y, { align: 'center' });
      y += 8;
    }

    y += 10;

    // Info table
    this.doc.setTextColor(0, 0, 0);
    const infoRows: string[][] = [];
    if (apprentice.employer) infoRows.push(['Employer', apprentice.employer]);
    if (apprentice.training_provider) infoRows.push(['Training Provider', apprentice.training_provider]);
    if (apprentice.start_date) infoRows.push(['Start Date', new Date(apprentice.start_date).toLocaleDateString('en-GB')]);
    if (apprentice.expected_end) infoRows.push(['Expected End Date', new Date(apprentice.expected_end).toLocaleDateString('en-GB')]);
    infoRows.push(['Export Date', new Date().toLocaleDateString('en-GB')]);

    if (infoRows.length > 0) {
      autoTable(this.doc, {
        startY: y,
        body: infoRows,
        theme: 'plain',
        styles: { fontSize: 11, cellPadding: 4 },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 60 },
        },
        margin: { left: 50, right: 50 },
      });
    }

    // Summary stats at bottom
    const totalACs = data.units.reduce((sum, u) =>
      sum + u.learning_outcomes.reduce((s, lo) => s + lo.assessment_criteria.length, 0), 0);
    const metACs = data.units.reduce((sum, u) =>
      sum + u.learning_outcomes.reduce((s, lo) =>
        s + lo.assessment_criteria.filter(ac => ac.is_met).length, 0), 0);
    const totalKSBs = data.ksb_summary.knowledge.length + data.ksb_summary.behaviours.length;
    const completedKSBs = [...data.ksb_summary.knowledge, ...data.ksb_summary.behaviours]
      .filter(k => k.status === 'completed' || k.status === 'verified').length;

    const statsY = this.pageHeight - 50;
    this.doc.setFillColor(...LIGHT_GREY);
    this.doc.rect(PAGE_MARGIN, statsY - 5, this.pageWidth - PAGE_MARGIN * 2, 35, 'F');

    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(0, 0, 0);

    const col1 = PAGE_MARGIN + 10;
    const col2 = this.pageWidth / 3 + 5;
    const col3 = (this.pageWidth / 3) * 2;

    this.doc.text(`ACs Met: ${metACs}/${totalACs}`, col1, statsY + 8);
    this.doc.text(`KSBs Complete: ${completedKSBs}/${totalKSBs}`, col2, statsY + 8);
    this.doc.text(`OTJ: ${data.otj_hours.percentage}%`, col3, statsY + 8);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9);
    this.doc.text(`${data.entries.length} evidence items`, col1, statsY + 18);
    this.doc.text(`${data.units.length} units`, col2, statsY + 18);
    this.doc.text(`${data.otj_hours.current}/${data.otj_hours.target} hours`, col3, statsY + 18);
  }

  // ============================================
  // Table of Contents
  // ============================================
  private renderTableOfContents(tocPage: number) {
    this.doc.setPage(tocPage);

    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Table of Contents', PAGE_MARGIN, 30);

    this.doc.setFillColor(...ELEC_YELLOW);
    this.doc.rect(PAGE_MARGIN, 34, 50, 2, 'F');

    let y = 50;
    this.doc.setFontSize(11);

    for (const entry of this.tocEntries) {
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(0, 0, 0);

      // Title on left
      const truncated = entry.title.length > 70 ? entry.title.substring(0, 67) + '...' : entry.title;
      this.doc.text(truncated, PAGE_MARGIN, y);

      // Page number on right
      this.doc.text(String(entry.page), this.pageWidth - PAGE_MARGIN, y, { align: 'right' });

      // Dotted leader
      const titleWidth = this.doc.getTextWidth(truncated);
      const pageNumWidth = this.doc.getTextWidth(String(entry.page));
      const dotsStart = PAGE_MARGIN + titleWidth + 3;
      const dotsEnd = this.pageWidth - PAGE_MARGIN - pageNumWidth - 3;
      if (dotsEnd > dotsStart) {
        this.doc.setTextColor(180, 180, 180);
        const dots = '.'.repeat(Math.floor((dotsEnd - dotsStart) / 2));
        this.doc.text(dots, dotsStart, y);
      }

      y += 8;
      if (y > this.pageHeight - 30) break;
    }
  }

  // ============================================
  // Unit Section
  // ============================================
  private renderUnitSection(unit: UnitSection) {
    let y = 20;

    // Unit header
    this.doc.setFillColor(...ELEC_YELLOW);
    this.doc.rect(PAGE_MARGIN, y - 5, this.pageWidth - PAGE_MARGIN * 2, 12, 'F');
    this.doc.setFontSize(13);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text(`Unit ${unit.unit_code}: ${unit.unit_title}`, PAGE_MARGIN + 4, y + 3);
    y += 18;

    // AC tracking matrix table
    for (const lo of unit.learning_outcomes) {
      // Check page space
      if (y > this.pageHeight - 60) {
        this.doc.addPage();
        y = 20;
      }

      // LO header
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(0, 0, 0);
      const loLabel = lo.lo_number ? `LO${lo.lo_number}: ` : '';
      const loText = this.doc.splitTextToSize(`${loLabel}${lo.lo_text}`, this.pageWidth - PAGE_MARGIN * 2);
      this.doc.text(loText, PAGE_MARGIN, y);
      y += loText.length * 5 + 3;

      if (lo.assessment_criteria.length > 0) {
        const tableBody = lo.assessment_criteria.map((ac, idx) => [
          `AC${lo.lo_number ? lo.lo_number + '.' : ''}${idx + 1}`,
          ac.ac_text,
          ac.is_met ? '\u2713' : '\u2717',
        ]);

        autoTable(this.doc, {
          startY: y,
          head: [['Ref', 'Assessment Criterion', 'Status']],
          body: tableBody,
          theme: 'grid',
          headStyles: { fillColor: DARK_BG, textColor: WHITE, fontSize: 9 },
          styles: { fontSize: 8, cellPadding: 3 },
          columnStyles: {
            0: { cellWidth: 25, halign: 'center' },
            1: { cellWidth: 'auto' },
            2: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
          },
          margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
          didParseCell: (hookData: any) => {
            if (hookData.section === 'body' && hookData.column.index === 2) {
              const isMet = hookData.cell.raw === '\u2713';
              hookData.cell.styles.textColor = isMet ? GREEN : RED;
            }
          },
          didDrawCell: (hookData: any) => {
            if (hookData.section === 'body') {
              const rowIdx = hookData.row.index;
              const ac = lo.assessment_criteria[rowIdx];
              if (ac) {
                const bgColour = ac.is_met
                  ? [220, 252, 231] as [number, number, number]  // green-100
                  : [254, 226, 226] as [number, number, number]; // red-100
                hookData.cell.styles.fillColor = bgColour;
              }
            }
          },
        });

        y = (this.doc as any).lastAutoTable.finalY + 10;
      }
    }
  }

  // ============================================
  // KSB Coverage Summary
  // ============================================
  private renderKSBSummary(data: StructuredExportData) {
    let y = 20;

    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('KSB Coverage Summary', PAGE_MARGIN, y);
    y += 5;
    this.doc.setFillColor(...ELEC_YELLOW);
    this.doc.rect(PAGE_MARGIN, y, 50, 2, 'F');
    y += 12;

    // Knowledge
    y = this.renderKSBTable('Knowledge', data.ksb_summary.knowledge, y);

    // Behaviours
    if (y > this.pageHeight - 80) {
      this.doc.addPage();
      y = 20;
    }
    y += 8;
    y = this.renderKSBTable('Behaviours', data.ksb_summary.behaviours, y);
  }

  private renderKSBTable(title: string, items: KSBItem[], startY: number): number {
    this.doc.setFontSize(13);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text(title, PAGE_MARGIN, startY);
    startY += 5;

    if (items.length === 0) {
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'italic');
      this.doc.text('No KSBs defined', PAGE_MARGIN, startY + 5);
      return startY + 15;
    }

    const statusLabel = (s: string) => {
      switch (s) {
        case 'completed': return 'Complete';
        case 'verified': return 'Verified';
        case 'in_progress': return 'In Progress';
        case 'evidence_submitted': return 'Evidence Submitted';
        default: return 'Not Started';
      }
    };

    const tableBody = items.map(k => [
      k.code,
      k.title,
      k.route !== 'core' ? k.route.charAt(0).toUpperCase() + k.route.slice(1) : 'Core',
      statusLabel(k.status),
      k.delivering_units
        .filter(u => u.mapping_type === 'primary')
        .map(u => u.unit_code)
        .join(', ') || '-',
    ]);

    autoTable(this.doc, {
      startY,
      head: [['Code', 'Title', 'Route', 'Status', 'Delivering Units']],
      body: tableBody,
      theme: 'grid',
      headStyles: { fillColor: DARK_BG, textColor: WHITE, fontSize: 9 },
      styles: { fontSize: 8, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center', fontStyle: 'bold' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 35, halign: 'center' },
        4: { cellWidth: 30, halign: 'center' },
      },
      margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
      didParseCell: (hookData: any) => {
        if (hookData.section === 'body' && hookData.column.index === 3) {
          const status = hookData.cell.raw as string;
          if (status === 'Complete' || status === 'Verified') {
            hookData.cell.styles.textColor = GREEN;
          } else if (status === 'Not Started') {
            hookData.cell.styles.textColor = RED;
          }
        }
      },
    });

    return (this.doc as any).lastAutoTable.finalY + 5;
  }

  // ============================================
  // OTJ Hours Summary
  // ============================================
  private renderOTJSummary(data: StructuredExportData) {
    let y = 20;
    const { otj_hours } = data;

    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Off-the-Job Training Hours', PAGE_MARGIN, y);
    y += 5;
    this.doc.setFillColor(...ELEC_YELLOW);
    this.doc.rect(PAGE_MARGIN, y, 50, 2, 'F');
    y += 20;

    // Stats cards
    const cardWidth = (this.pageWidth - PAGE_MARGIN * 2 - 20) / 3;
    const cards = [
      { label: 'Target Hours', value: String(otj_hours.target), colour: DARK_BG },
      { label: 'Current Hours', value: String(otj_hours.current), colour: ELEC_YELLOW },
      { label: 'Completion', value: `${otj_hours.percentage}%`, colour: otj_hours.percentage >= 100 ? GREEN : RED },
    ];

    cards.forEach((card, i) => {
      const x = PAGE_MARGIN + i * (cardWidth + 10);
      this.doc.setFillColor(...LIGHT_GREY);
      this.doc.roundedRect(x, y, cardWidth, 40, 3, 3, 'F');

      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(100, 100, 100);
      this.doc.text(card.label, x + cardWidth / 2, y + 12, { align: 'center' });

      this.doc.setFontSize(22);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(...card.colour);
      this.doc.text(card.value, x + cardWidth / 2, y + 30, { align: 'center' });
    });

    y += 55;

    // Progress bar
    const barWidth = this.pageWidth - PAGE_MARGIN * 2;
    const barHeight = 12;
    const pct = Math.min(otj_hours.percentage, 100) / 100;

    this.doc.setFillColor(230, 230, 230);
    this.doc.roundedRect(PAGE_MARGIN, y, barWidth, barHeight, 3, 3, 'F');

    if (pct > 0) {
      const fillColour = otj_hours.percentage >= 100 ? GREEN : ELEC_YELLOW;
      this.doc.setFillColor(...fillColour);
      this.doc.roundedRect(PAGE_MARGIN, y, barWidth * pct, barHeight, 3, 3, 'F');
    }

    this.doc.setFontSize(8);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text(`${otj_hours.percentage}%`, PAGE_MARGIN + barWidth / 2, y + barHeight / 2 + 3, { align: 'center' });
  }

  // ============================================
  // Evidence Appendix
  // ============================================
  private renderEvidenceAppendix(data: StructuredExportData) {
    let y = 20;

    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Evidence Appendix', PAGE_MARGIN, y);
    y += 5;
    this.doc.setFillColor(...ELEC_YELLOW);
    this.doc.rect(PAGE_MARGIN, y, 50, 2, 'F');
    y += 10;

    const tableBody = data.entries.map((entry, idx) => [
      String(idx + 1),
      entry.title,
      entry.category || '-',
      entry.grade || '-',
      new Date(entry.created_at).toLocaleDateString('en-GB'),
    ]);

    autoTable(this.doc, {
      startY: y,
      head: [['#', 'Title', 'Category', 'Grade', 'Date']],
      body: tableBody,
      theme: 'grid',
      headStyles: { fillColor: DARK_BG, textColor: WHITE, fontSize: 9 },
      styles: { fontSize: 8, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 12, halign: 'center' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 35 },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 25, halign: 'center' },
      },
      margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
    });
  }

  // ============================================
  // Page Numbers
  // ============================================
  private addPageNumbers() {
    const totalPages = this.doc.getNumberOfPages();
    for (let i = 2; i <= totalPages; i++) {
      this.doc.setPage(i);
      this.doc.setFontSize(8);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(150, 150, 150);
      this.doc.text(
        `Page ${i} of ${totalPages}`,
        this.pageWidth / 2,
        this.pageHeight - 10,
        { align: 'center' }
      );
    }
  }
}
