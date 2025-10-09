import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format as formatDate } from "date-fns";
import { parseAgentResponse, extractSections } from "./agentTextProcessor";
import { generateDesignSpecificationPDF } from "./design-spec-pdf";
import { generateRAMSPDF } from "./rams-pdf-professional";
import { generateMethodStatementPDF } from "./method-statement-pdf";
import { RAMSData, RAMSRisk } from "@/types/rams";
import { MethodStatementData, MethodStep } from "@/types/method-statement";

/**
 * Generate a Cable Design & Calculations PDF from Designer agent response
 */
export function generateDesignerPDF(
  agentResponse: string,
  projectName: string,
  companyName: string = "ElecMate User"
): jsPDF {
  const sections = extractSections(agentResponse);
  
  // Extract circuit information from the response
  const circuits: any[] = [];
  
  // Parse the response for circuit data
  const lines = agentResponse.split('\n');
  let currentCircuit: any = {};
  
  lines.forEach(line => {
    const trimmed = line.trim();
    
    // Look for circuit names/types
    if (trimmed.match(/circuit\s*\d+|lighting|socket|cooker|shower/i)) {
      if (currentCircuit.name) circuits.push(currentCircuit);
      currentCircuit = { name: trimmed, calculations: [] };
    }
    
    // Extract calculations (Ib, In, Iz, voltage drop, etc.)
    if (trimmed.match(/Ib|In|Iz|voltage drop|cable size|mm²/i)) {
      if (currentCircuit.name) {
        currentCircuit.calculations.push(trimmed);
      }
    }
  });
  
  if (currentCircuit.name) circuits.push(currentCircuit);
  
  // Create PDF
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 20;
  
  // Header
  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Cable Design & Calculations", pageWidth / 2, 20, { align: "center" });
  doc.setFontSize(10);
  doc.text(projectName, pageWidth / 2, 30, { align: "center" });
  
  yPos = 50;
  
  // Project Info
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Project Information", 15, yPos);
  yPos += 10;
  
  const projectData = [
    ["Project Name", projectName],
    ["Company", companyName],
    ["Date", formatDate(new Date(), "dd/MM/yyyy")],
    ["Standard", "BS 7671:2018+A3:2024"]
  ];
  
  autoTable(doc, {
    startY: yPos,
    body: projectData,
    theme: "grid",
    styles: { fontSize: 9 },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 50 },
      1: { cellWidth: 120 }
    }
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  // Circuit Details
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Circuit Design Details", 15, yPos);
  yPos += 10;
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const responseLines = agentResponse.split('\n');
  responseLines.forEach(line => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    const cleaned = line.replace(/[*#]/g, '').trim();
    if (cleaned) {
      const wrapped = doc.splitTextToSize(cleaned, pageWidth - 30);
      doc.text(wrapped, 15, yPos);
      yPos += wrapped.length * 5;
    }
  });
  
  return doc;
}

/**
 * Extract RAMS data from Health & Safety + Installer agent responses
 */
export function generateRAMSFromAgents(
  healthSafetyResponse: string,
  installerResponse: string,
  projectName: string,
  location: string,
  assessor: string,
  companyName: string = "ElecMate User"
): string {
  // Extract hazards and controls from H&S response
  const risks: RAMSRisk[] = [];
  const hsLines = healthSafetyResponse.split('\n');
  
  let currentHazard = "";
  let currentControls: string[] = [];
  
  hsLines.forEach(line => {
    const trimmed = line.trim();
    
    // Look for hazard indicators
    if (trimmed.match(/hazard:|risk:/i)) {
      if (currentHazard) {
      risks.push({
        id: `risk-${risks.length + 1}`,
        hazard: currentHazard,
        risk: "Electrical injury",
        likelihood: 3,
        severity: 4,
        riskRating: 12,
        controls: currentControls.join('; '),
        residualRisk: 4
      });
      }
      currentHazard = trimmed.replace(/hazard:|risk:/i, '').trim();
      currentControls = [];
    }
    
    // Look for control measures
    if (trimmed.match(/control:|measure:|ppe|isolat|lock/i)) {
      currentControls.push(trimmed.replace(/^[-*•]\s*/, ''));
    }
  });
  
  // Add last hazard
  if (currentHazard) {
    risks.push({
      id: `risk-${risks.length + 1}`,
      hazard: currentHazard,
      risk: "Electrical injury",
      likelihood: 3,
      severity: 4,
      riskRating: 12,
      controls: currentControls.join('; '),
      residualRisk: 4
    });
  }
  
  // If no risks extracted, add defaults
  if (risks.length === 0) {
    risks.push({
      id: 'risk-1',
      hazard: "Electrical shock from live conductors",
      risk: "Electric shock, burns, or fatality",
      likelihood: 4,
      severity: 5,
      riskRating: 20,
      controls: "Isolate and lock-off power supply; Use voltage tester; Wear insulated gloves and safety boots; Competent person supervision",
      residualRisk: 6
    });
  }
  
  const ramsData: RAMSData = {
    projectName,
    location,
    date: new Date().toISOString(),
    assessor,
    risks,
    activities: []
  };
  
  return generateRAMSPDF(ramsData, { companyName });
}

/**
 * Generate Method Statement from Installer agent response
 */
export function generateMethodStatementFromInstaller(
  installerResponse: string,
  projectName: string,
  location: string,
  supervisor: string,
  companyName: string = "ElecMate User"
): Uint8Array {
  // Extract method steps from installer response
  const steps: MethodStep[] = [];
  const lines = installerResponse.split('\n');
  
  let stepNumber = 1;
  let currentStep: Partial<MethodStep> | null = null;
  
  lines.forEach(line => {
    const trimmed = line.trim();
    
    // Look for step indicators
    if (trimmed.match(/^(step|stage|\d+\.|\d+\))/i)) {
      if (currentStep && currentStep.title) {
        steps.push(currentStep as MethodStep);
      }
      currentStep = {
        stepNumber: stepNumber++,
        title: trimmed.replace(/^(step|stage|\d+\.|\d+\))\s*/i, ''),
        description: "",
        estimatedDuration: "30 minutes",
        riskLevel: "medium",
        safetyRequirements: ["PPE required", "Competent person"],
        equipmentNeeded: ["Hand tools", "Test equipment"],
        qualifications: ["18th Edition", "AM2"]
      };
    } else if (currentStep && trimmed) {
      currentStep.description += (currentStep.description ? " " : "") + trimmed;
    }
  });
  
  if (currentStep && currentStep.title) {
    steps.push(currentStep as MethodStep);
  }
  
  // If no steps extracted, add defaults
  if (steps.length === 0) {
    steps.push({
      id: 'step-1',
      stepNumber: 1,
      title: "Electrical Installation Preparation",
      description: installerResponse.substring(0, 200),
      estimatedDuration: "2 hours",
      riskLevel: "medium",
      safetyRequirements: ["PPE", "Isolation", "Competent supervision"],
      equipmentNeeded: ["Tools", "Materials", "Test equipment"],
      qualifications: ["18th Edition", "AM2"]
    });
  }
  
  // Ensure all steps have IDs
  const stepsWithIds = steps.map((step, idx) => ({
    ...step,
    id: step.id || `step-${idx + 1}`
  }));
  
  const methodData: MethodStatementData = {
    jobTitle: projectName,
    location,
    contractor: companyName,
    supervisor,
    workType: "Electrical Installation",
    duration: "1-2 days",
    teamSize: "2-3 electricians",
    description: installerResponse.substring(0, 300),
    overallRiskLevel: "medium",
    reviewDate: new Date().toISOString(),
    steps: stepsWithIds
  };
  
  return generateMethodStatementPDF(methodData, { companyName });
}

/**
 * Prepare test sheet data from Commissioning agent response
 */
export interface TestSheetData {
  projectName: string;
  location: string;
  circuits: Array<{
    name: string;
    type: string;
    cableSize: string;
    protection: string;
    expectedZs: string;
    rcdRating: string;
  }>;
  testSequence: string[];
}

export function prepareTestSheetData(
  commissioningResponse: string,
  projectName: string,
  location: string
): TestSheetData {
  const circuits: any[] = [];
  const testSequence: string[] = [];
  
  const lines = commissioningResponse.split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    
    // Extract test sequence steps
    if (trimmed.match(/^(test|step|\d+\.)/i)) {
      testSequence.push(trimmed);
    }
    
    // Extract circuit test data
    if (trimmed.match(/Zs|earth fault|RCD|continuity/i)) {
      // Parse test values
      const zsMatch = trimmed.match(/Zs.*?([\d.]+)\s*Ω/i);
      const rcdMatch = trimmed.match(/RCD.*?(\d+)\s*mA/i);
      
      if (zsMatch || rcdMatch) {
        circuits.push({
          name: "Circuit from testing",
          type: "Power",
          cableSize: "2.5mm²",
          protection: "MCB",
          expectedZs: zsMatch ? `${zsMatch[1]}Ω` : "TBC",
          rcdRating: rcdMatch ? `${rcdMatch[1]}mA` : "N/A"
        });
      }
    }
  });
  
  return {
    projectName,
    location,
    circuits,
    testSequence
  };
}

/**
 * Generate Pre-Job Safety Brief PDF
 */
export function generateSafetyBriefPDF(
  hsAgentResponse: string,
  projectName: string,
  location: string,
  date: string,
  companyName: string = "ElecMate User"
): jsPDF {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  let yPos = 20;
  
  // Header
  pdf.setFillColor(220, 38, 38); // Red for safety
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('PRE-JOB SAFETY BRIEFING', pageWidth / 2, 15, { align: 'center' });
  pdf.setFontSize(10);
  pdf.text('Electrical Installation Safety', pageWidth / 2, 25, { align: 'center' });
  
  yPos = 45;
  
  // Project details
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Project: ${projectName}`, 15, yPos);
  yPos += 6;
  pdf.text(`Location: ${location}`, 15, yPos);
  yPos += 6;
  pdf.text(`Date: ${date}`, 15, yPos);
  yPos += 6;
  pdf.text(`Company: ${companyName}`, 15, yPos);
  yPos += 12;
  
  // Safety brief content
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Safety Brief', 15, yPos);
  yPos += 8;
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  const responseLines = hsAgentResponse.split('\n');
  
  responseLines.forEach(line => {
    if (yPos > 270) {
      pdf.addPage();
      yPos = 20;
    }
    
    const cleaned = line.replace(/[*#☑️✓⚡🔨]/g, '').trim();
    if (cleaned) {
      // Bold headings
      if (cleaned.match(/^(BEFORE YOU START|PPE REQUIRED|HAZARDS|EMERGENCY|HSE REGULATIONS)/i)) {
        pdf.setFont('helvetica', 'bold');
      }
      
      const wrapped = pdf.splitTextToSize(cleaned, pageWidth - 30);
      pdf.text(wrapped, 15, yPos);
      yPos += wrapped.length * 5;
      
      pdf.setFont('helvetica', 'normal');
    }
  });
  
  // Signature section
  if (yPos > 240) {
    pdf.addPage();
    yPos = 20;
  }
  
  yPos += 10;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BRIEFING ACKNOWLEDGMENT', 15, yPos);
  yPos += 10;
  
  pdf.setFont('helvetica', 'normal');
  pdf.line(15, yPos, 100, yPos);
  pdf.text('Briefing Given By:', 15, yPos + 5);
  
  pdf.line(110, yPos, 180, yPos);
  pdf.text('Date:', 110, yPos + 5);
  
  yPos += 15;
  pdf.line(15, yPos, 100, yPos);
  pdf.text('Briefing Received By:', 15, yPos + 5);
  
  pdf.line(110, yPos, 180, yPos);
  pdf.text('Signature:', 110, yPos + 5);
  
  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(100);
  pdf.text(
    `Reference: HSE Guidance HSG85 - Electricity at Work`,
    pageWidth / 2,
    285,
    { align: 'center' }
  );
  
  return pdf;
}
