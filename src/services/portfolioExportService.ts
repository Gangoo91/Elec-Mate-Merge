import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PortfolioEntry, ExportOptions } from '@/types/portfolio';

export interface ExportProgress {
  step: string;
  progress: number;
  total: number;
}

export class PortfolioExportService {
  private onProgress?: (progress: ExportProgress) => void;

  constructor(onProgress?: (progress: ExportProgress) => void) {
    this.onProgress = onProgress;
  }

  private updateProgress(step: string, current: number, total: number) {
    if (this.onProgress) {
      this.onProgress({ step, progress: current, total });
    }
  }

  async exportToPDF(entries: PortfolioEntry[], options: ExportOptions): Promise<void> {
    const doc = new jsPDF();
    let yPosition = 20;
    const pageHeight = doc.internal.pageSize.height;
    const lineHeight = 7;
    
    // Filter entries based on options
    const filteredEntries = this.filterEntries(entries, options);
    this.updateProgress('Preparing PDF export...', 0, filteredEntries.length);

    // Add title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Portfolio Export', 20, yPosition);
    yPosition += 15;

    // Add export info
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Export Date: ${new Date().toLocaleDateString()}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Total Entries: ${filteredEntries.length}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Format: PDF`, 20, yPosition);
    yPosition += 15;

    // Process each entry
    for (let i = 0; i < filteredEntries.length; i++) {
      const entry = filteredEntries[i];
      this.updateProgress(`Processing entry ${i + 1}`, i + 1, filteredEntries.length);

      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }

      // Entry title
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(entry.title, 20, yPosition);
      yPosition += 10;

      // Entry details table
      const entryData = [
        ['Category', entry.category.name],
        ['Date Created', new Date(entry.dateCreated).toLocaleDateString()],
        ['Status', entry.status],
        ['Self Assessment', `${entry.selfAssessment}/5`],
        ['Time Spent', `${Math.round(entry.timeSpent / 60)} hours`]
      ];

      if (entry.dateCompleted) {
        entryData.push(['Date Completed', new Date(entry.dateCompleted).toLocaleDateString()]);
      }

      autoTable(doc, {
        startY: yPosition,
        head: [['Field', 'Value']],
        body: entryData,
        theme: 'grid',
        headStyles: { fillColor: [255, 193, 7] }, // elec-yellow
        margin: { left: 20, right: 20 },
        tableWidth: 'auto',
        styles: { fontSize: 9 }
      });

      yPosition = (doc as any).lastAutoTable.finalY + 10;

      // Description
      if (entry.description) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Description:', 20, yPosition);
        yPosition += 7;
        
        doc.setFont('helvetica', 'normal');
        const splitDescription = doc.splitTextToSize(entry.description, 170);
        doc.text(splitDescription, 20, yPosition);
        yPosition += splitDescription.length * 5 + 10;
      }

      // Skills demonstrated
      if (entry.skills && entry.skills.length > 0) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Skills Demonstrated:', 20, yPosition);
        yPosition += 7;
        
        doc.setFont('helvetica', 'normal');
        const skillsText = entry.skills.join(', ');
        const splitSkills = doc.splitTextToSize(skillsText, 170);
        doc.text(splitSkills, 20, yPosition);
        yPosition += splitSkills.length * 5 + 10;
      }

      // Reflection (if included)
      if (options.includeReflections && entry.reflection) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Reflection:', 20, yPosition);
        yPosition += 7;
        
        doc.setFont('helvetica', 'normal');
        const splitReflection = doc.splitTextToSize(entry.reflection, 170);
        doc.text(splitReflection, 20, yPosition);
        yPosition += splitReflection.length * 5 + 10;
      }

      // Learning outcomes
      if (entry.learningOutcomes && entry.learningOutcomes.length > 0) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Learning Outcomes:', 20, yPosition);
        yPosition += 7;
        
        doc.setFont('helvetica', 'normal');
        entry.learningOutcomes.forEach(outcome => {
          doc.text(`• ${outcome}`, 25, yPosition);
          yPosition += 5;
        });
        yPosition += 5;
      }

      // Assessment criteria
      if (entry.assessmentCriteria && entry.assessmentCriteria.length > 0) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Assessment Criteria:', 20, yPosition);
        yPosition += 7;
        
        doc.setFont('helvetica', 'normal');
        entry.assessmentCriteria.forEach(criteria => {
          doc.text(`• ${criteria}`, 25, yPosition);
          yPosition += 5;
        });
        yPosition += 5;
      }

      // Supervisor feedback
      if (entry.supervisorFeedback) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Supervisor Feedback:', 20, yPosition);
        yPosition += 7;
        
        doc.setFont('helvetica', 'normal');
        const splitFeedback = doc.splitTextToSize(entry.supervisorFeedback, 170);
        doc.text(splitFeedback, 20, yPosition);
        yPosition += splitFeedback.length * 5 + 10;
      }

      // Evidence files (if included)
      if (options.includeEvidence && entry.evidenceFiles && entry.evidenceFiles.length > 0) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Evidence Files:', 20, yPosition);
        yPosition += 7;
        
        doc.setFont('helvetica', 'normal');
        entry.evidenceFiles.forEach(file => {
          doc.text(`• ${file.name} (${file.type})`, 25, yPosition);
          yPosition += 5;
        });
        yPosition += 5;
      }

      yPosition += 10; // Space between entries
    }

    // Generate filename
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `portfolio-export-${timestamp}.pdf`;

    // Save the PDF
    doc.save(filename);
    this.updateProgress('Export complete', filteredEntries.length, filteredEntries.length);
  }

  async exportToHTML(entries: PortfolioEntry[], options: ExportOptions): Promise<void> {
    const filteredEntries = this.filterEntries(entries, options);
    this.updateProgress('Generating HTML export...', 0, filteredEntries.length);

    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio Export</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
          .header { border-bottom: 2px solid #ffc107; padding-bottom: 20px; margin-bottom: 30px; }
          .entry { margin-bottom: 40px; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
          .entry-title { color: #ffc107; font-size: 1.5em; margin-bottom: 10px; }
          .field-label { font-weight: bold; color: #333; }
          .skills { background: #f8f9fa; padding: 10px; border-radius: 4px; margin: 10px 0; }
          .reflection { background: #fff3cd; padding: 15px; border-radius: 4px; margin: 10px 0; }
          ul { padding-left: 20px; }
          .export-info { background: #e9ecef; padding: 15px; border-radius: 4px; margin-bottom: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Portfolio Export</h1>
          <div class="export-info">
            <p><span class="field-label">Export Date:</span> ${new Date().toLocaleDateString()}</p>
            <p><span class="field-label">Total Entries:</span> ${filteredEntries.length}</p>
            <p><span class="field-label">Format:</span> HTML</p>
          </div>
        </div>
    `;

    for (let i = 0; i < filteredEntries.length; i++) {
      const entry = filteredEntries[i];
      this.updateProgress(`Processing entry ${i + 1}`, i + 1, filteredEntries.length);

      html += `
        <div class="entry">
          <h2 class="entry-title">${this.escapeHtml(entry.title)}</h2>
          
          <p><span class="field-label">Category:</span> ${this.escapeHtml(entry.category.name)}</p>
          <p><span class="field-label">Date Created:</span> ${new Date(entry.dateCreated).toLocaleDateString()}</p>
          <p><span class="field-label">Status:</span> ${this.escapeHtml(entry.status)}</p>
          <p><span class="field-label">Self Assessment:</span> ${entry.selfAssessment}/5</p>
          <p><span class="field-label">Time Spent:</span> ${Math.round(entry.timeSpent / 60)} hours</p>
          ${entry.dateCompleted ? `<p><span class="field-label">Date Completed:</span> ${new Date(entry.dateCompleted).toLocaleDateString()}</p>` : ''}
          
          ${entry.description ? `<p><span class="field-label">Description:</span></p><p>${this.escapeHtml(entry.description)}</p>` : ''}
          
          ${entry.skills && entry.skills.length > 0 ? `
            <div class="skills">
              <p class="field-label">Skills Demonstrated:</p>
              <p>${entry.skills.map(skill => this.escapeHtml(skill)).join(', ')}</p>
            </div>
          ` : ''}
          
          ${options.includeReflections && entry.reflection ? `
            <div class="reflection">
              <p class="field-label">Reflection:</p>
              <p>${this.escapeHtml(entry.reflection)}</p>
            </div>
          ` : ''}
          
          ${entry.learningOutcomes && entry.learningOutcomes.length > 0 ? `
            <p class="field-label">Learning Outcomes:</p>
            <ul>
              ${entry.learningOutcomes.map(outcome => `<li>${this.escapeHtml(outcome)}</li>`).join('')}
            </ul>
          ` : ''}
          
          ${entry.assessmentCriteria && entry.assessmentCriteria.length > 0 ? `
            <p class="field-label">Assessment Criteria:</p>
            <ul>
              ${entry.assessmentCriteria.map(criteria => `<li>${this.escapeHtml(criteria)}</li>`).join('')}
            </ul>
          ` : ''}
          
          ${entry.supervisorFeedback ? `
            <p><span class="field-label">Supervisor Feedback:</span></p>
            <p>${this.escapeHtml(entry.supervisorFeedback)}</p>
          ` : ''}
          
          ${options.includeEvidence && entry.evidenceFiles && entry.evidenceFiles.length > 0 ? `
            <p class="field-label">Evidence Files:</p>
            <ul>
              ${entry.evidenceFiles.map(file => `<li>${this.escapeHtml(file.name)} (${this.escapeHtml(file.type)})</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `;
    }

    html += `
      </body>
      </html>
    `;

    // Create download
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-export-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.updateProgress('Export complete', filteredEntries.length, filteredEntries.length);
  }

  private filterEntries(entries: PortfolioEntry[], options: ExportOptions): PortfolioEntry[] {
    let filtered = entries;

    // Filter by categories
    if (options.categories && options.categories.length > 0) {
      filtered = filtered.filter(entry => options.categories.includes(entry.category.id));
    }

    // Filter by date range
    if (options.dateRange?.from && options.dateRange?.to) {
      const fromDate = new Date(options.dateRange.from);
      const toDate = new Date(options.dateRange.to);
      filtered = filtered.filter(entry => {
        const entryDate = new Date(entry.dateCreated);
        return entryDate >= fromDate && entryDate <= toDate;
      });
    }

    return filtered;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}