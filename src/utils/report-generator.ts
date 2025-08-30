
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TimeEntry } from '@/types/time-tracking';
import { format } from 'date-fns';

interface ReportData {
  studentName: string;
  totalHours: {
    hours: number;
    minutes: number;
  };
  entries: TimeEntry[];
  filterMonth?: string;
  targetHours?: number;
  weeklyHours?: number;
}

export const generateTrainingReport = (data: ReportData): void => {
  const { studentName, totalHours, entries, filterMonth, targetHours, weeklyHours } = data;
  
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: 'Off-the-Job Training Report',
    subject: 'Training Report',
    author: 'ElecConnect LMS',
    creator: 'ElecConnect LMS'
  });
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(0, 102, 204);
  doc.text('Off-the-Job Training Report', 105, 15, { align: 'center' });
  
  // Add student information
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Student: ${studentName}`, 20, 30);
  doc.text(`Report Date: ${format(new Date(), 'dd MMM yyyy')}`, 20, 40);
  doc.text(`Report Period: ${filterMonth || 'All Time'}`, 20, 50);
  
  // Add total hours information - ensure we're calculating correct hours
  const calculatedHours = entries.reduce((total, entry) => total + entry.duration, 0) / 60;
  const calculatedHoursWhole = Math.floor(calculatedHours);
  const calculatedMinutes = Math.round((calculatedHours - calculatedHoursWhole) * 60);
  
  const totalTimeText = `Total Training Hours: ${calculatedHoursWhole}h ${calculatedMinutes}m`;
  doc.text(totalTimeText, 20, 60);
  
  // Add target information if available
  if (targetHours) {
    const completion = (calculatedHours / targetHours) * 100;
    doc.text(`Target Hours: ${targetHours}h (${completion.toFixed(1)}% complete)`, 20, 70);
  }
  
  if (weeklyHours) {
    doc.text(`Average Weekly Hours: ${weeklyHours}h`, 20, 80);
  }
  
  // Group entries by date before sorting
  const entriesByDate = entries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {} as Record<string, TimeEntry[]>);
  
  // Prepare data for the table
  const tableData = Object.entries(entriesByDate)
    .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
    .flatMap(([date, dayEntries]) => {
      return dayEntries.map(entry => {
        const hours = Math.floor(entry.duration / 60);
        const minutes = entry.duration % 60;
        const durationText = `${hours}h ${minutes}m`;
        const formattedDate = format(new Date(entry.date), 'dd MMM yyyy');
        
        return [
          formattedDate,
          entry.activity,
          durationText,
          entry.isAutomatic ? 'Auto-tracked' : 'Manual',
          entry.notes || '-'
        ];
      });
    });
  
  // Add the table
  autoTable(doc, {
    startY: 85,
    head: [['Date', 'Activity', 'Duration', 'Type', 'Notes']],
    body: tableData,
    headStyles: {
      fillColor: [0, 102, 204],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
    margin: { top: 85 },
    styles: {
      fontSize: 9,
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: 25 },  // Date
      1: { cellWidth: 50 },  // Activity
      2: { cellWidth: 20 },  // Duration
      3: { cellWidth: 25 },  // Type
      4: { cellWidth: 'auto' }, // Notes
    },
  });
  
  // Add footer with page numbers
  // Fix the getNumberOfPages error by using doc.internal.pages.length - 1
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }
  
  // Save the PDF
  doc.save('training-report.pdf');
};
