import jsPDF from "jspdf";
import { format } from "date-fns";

interface ChecklistData {
  projectName: string;
  location: string;
  date: string;
  installationSteps: string[];
  toolsRequired: string[];
  materialsRequired: Array<{ item: string; quantity: string }>;
  safetyChecks: string[];
}

export function generateInstallationChecklistPDF(data: ChecklistData): jsPDF {
  const doc = new jsPDF('portrait', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let yPos = 20;

  // Header
  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("INSTALLATION CHECKLIST", pageWidth / 2, 15, { align: "center" });
  
  doc.setFontSize(10);
  doc.text(data.projectName, pageWidth / 2, 25, { align: "center" });
  doc.text(data.location, pageWidth / 2, 32, { align: "center" });

  yPos = 50;

  // Safety Checks Section
  doc.setTextColor(220, 38, 38);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("⚠️ SAFETY CHECKS (BEFORE STARTING)", 15, yPos);
  yPos += 10;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  data.safetyChecks.forEach((check, idx) => {
    if (yPos > pageHeight - 30) {
      doc.addPage();
      yPos = 20;
    }
    doc.rect(15, yPos - 4, 4, 4);
    doc.text(`${idx + 1}. ${check}`, 22, yPos);
    yPos += 8;
  });

  yPos += 10;

  // Tools Required
  doc.setTextColor(30, 64, 175);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("🔧 TOOLS REQUIRED", 15, yPos);
  yPos += 10;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  data.toolsRequired.forEach((tool, idx) => {
    if (yPos > pageHeight - 30) {
      doc.addPage();
      yPos = 20;
    }
    doc.rect(15, yPos - 4, 4, 4);
    doc.text(`${idx + 1}. ${tool}`, 22, yPos);
    yPos += 6;
  });

  yPos += 10;

  // Materials Required
  doc.setTextColor(30, 64, 175);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("📦 MATERIALS CHECKLIST", 15, yPos);
  yPos += 10;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  data.materialsRequired.forEach((material, idx) => {
    if (yPos > pageHeight - 30) {
      doc.addPage();
      yPos = 20;
    }
    doc.rect(15, yPos - 4, 4, 4);
    doc.text(`${material.quantity}x ${material.item}`, 22, yPos);
    yPos += 6;
  });

  yPos += 10;

  // Installation Steps
  if (yPos > pageHeight - 50) {
    doc.addPage();
    yPos = 20;
  }

  doc.setTextColor(30, 64, 175);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("✅ INSTALLATION PROCEDURE", 15, yPos);
  yPos += 10;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  data.installationSteps.forEach((step, idx) => {
    if (yPos > pageHeight - 30) {
      doc.addPage();
      yPos = 20;
    }
    doc.rect(15, yPos - 4, 4, 4);
    doc.text(`Step ${idx + 1}: ${step}`, 22, yPos);
    yPos += 8;
  });

  // Sign-off section
  yPos = pageHeight - 50;
  doc.setDrawColor(200, 200, 200);
  doc.line(15, yPos, pageWidth - 15, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Installation Completed By:", 15, yPos);
  doc.text("Date:", 120, yPos);
  yPos += 15;

  doc.text("Signature:", 15, yPos);
  doc.line(40, yPos + 2, 110, yPos + 2);
  doc.text("Date:", 120, yPos);
  doc.line(135, yPos + 2, 190, yPos + 2);

  // Footer
  const footerY = pageHeight - 15;
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.text("Installation Checklist - For Professional Use", pageWidth / 2, footerY, { align: "center" });

  return doc;
}
