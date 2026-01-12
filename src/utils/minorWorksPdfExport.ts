import jsPDF from 'jspdf';
import { generatePdfFilename } from './pdfFilenameGenerator';

interface MinorWorksFormData {
  certificateNumber: string;
  clientName: string;
  propertyAddress: string;
  postcode: string;
  workDate: string;
  workDescription: string;
  workType: string;
  supplyVoltage: string;
  earthingArrangement: string;
  circuitDesignation: string;
  protectiveDeviceType: string;
  protectiveDeviceRating: string;
  continuityR1R2: string;
  earthFaultLoopImpedance: string;
  maxPermittedZs: string;
  polarity: string;
  electricianName: string;
  position: string;
  signatureDate: string;
  bs7671Compliance: boolean;
  testResultsAccurate: boolean;
  workSafety: boolean;
  [key: string]: any;
}

export const generateMinorWorksPdf = (formData: MinorWorksFormData): void => {
  const doc = new jsPDF();
  let yPosition = 20;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Helper function to add text with word wrap
  const addText = (text: string, x: number, y: number, maxWidth?: number): number => {
    const lines = maxWidth ? doc.splitTextToSize(text, maxWidth) : [text];
    doc.text(lines, x, y);
    return y + (lines.length * 6);
  };

  // Helper function to add a section
  const addSection = (title: string, content: string, value?: string): void => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFont('helvetica', 'bold');
    yPosition = addText(title, margin, yPosition);
    yPosition += 2;
    
    doc.setFont('helvetica', 'normal');
    const displayValue = value || content || 'Not specified';
    yPosition = addText(displayValue, margin, yPosition, contentWidth) + 5;
  };

  // Header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('MINOR ELECTRICAL INSTALLATION WORKS CERTIFICATE', margin, yPosition, contentWidth);
  
  doc.setFontSize(12);
  yPosition = addText('BS 7671:2018+A3:2024 - Requirements for Electrical Installations', margin, yPosition, contentWidth) + 10;

  // Certificate Reference
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  yPosition = addText(`Certificate Reference: ${formData.certificateNumber}`, margin, yPosition, contentWidth) + 10;

  doc.setFontSize(10);

  // Part 1: Client & Installation Details
  doc.setFont('helvetica', 'bold');
  yPosition = addText('PART 1: CLIENT & INSTALLATION DETAILS', margin, yPosition) + 5;
  
  addSection('Client Name:', '', formData.clientName);
  addSection('Installation Address:', '', formData.propertyAddress);
  if (formData.postcode) {
    addSection('Postcode:', '', formData.postcode);
  }
  addSection('Date of Work:', '', formData.workDate ? new Date(formData.workDate).toLocaleDateString('en-GB') : '');

  // Part 2: Description of Work
  yPosition += 5;
  doc.setFont('helvetica', 'bold');
  yPosition = addText('PART 2: DESCRIPTION OF WORK', margin, yPosition) + 5;
  
  addSection('Type of Work:', '', formData.workType);
  addSection('Description of Work:', '', formData.workDescription);

  // Part 3: Supply & Earthing
  yPosition += 5;
  doc.setFont('helvetica', 'bold');
  yPosition = addText('PART 3: SUPPLY CHARACTERISTICS & EARTHING', margin, yPosition) + 5;
  
  addSection('Supply Voltage:', '', formData.supplyVoltage);
  addSection('Earthing Arrangement:', '', formData.earthingArrangement);
  addSection('Main Earthing Conductor:', '', formData.mainEarthingConductorSize ? `${formData.mainEarthingConductorSize}mm2` : '');
  addSection('Main Bonding Conductor:', '', formData.mainBondingConductorSize ? `${formData.mainBondingConductorSize}mm2` : '');

  // Part 4: Circuit Details
  yPosition += 5;
  doc.setFont('helvetica', 'bold');
  yPosition = addText('PART 4: CIRCUIT DETAILS & PROTECTION', margin, yPosition) + 5;
  
  addSection('Circuit Designation:', '', formData.circuitDesignation);
  addSection('Circuit Description:', '', formData.circuitDescription);
  addSection('Protective Device:', '', `${formData.protectiveDeviceType} ${formData.protectiveDeviceRating}A`);
  addSection('Live Conductor Size:', '', formData.liveConductorSize ? `${formData.liveConductorSize}mm2` : '');
  addSection('CPC Size:', '', formData.cpcSize ? `${formData.cpcSize}mm2` : '');

  // Check if we need a new page
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }

  // Part 5: Test Results
  yPosition += 5;
  doc.setFont('helvetica', 'bold');
  yPosition = addText('PART 5: TEST RESULTS', margin, yPosition) + 5;
  
  addSection('Continuity R1+R2:', '', formData.continuityR1R2 ? `${formData.continuityR1R2} Ohms` : '');
  addSection('Insulation Resistance:', '', 'See detailed results below');
  if (formData.insulationLiveNeutral) {
    addSection('  Live-Neutral:', '', `${formData.insulationLiveNeutral} MOhms`);
  }
  if (formData.insulationLiveEarth) {
    addSection('  Live-Earth:', '', `${formData.insulationLiveEarth} MOhms`);
  }
  if (formData.insulationNeutralEarth) {
    addSection('  Neutral-Earth:', '', `${formData.insulationNeutralEarth} MOhms`);
  }
  addSection('Polarity:', '', formData.polarity);
  addSection('Earth Fault Loop Impedance (Zs):', '', formData.earthFaultLoopImpedance ? `${formData.earthFaultLoopImpedance} Ohms` : '');
  addSection('Maximum Permitted Zs:', '', formData.maxPermittedZs ? `${formData.maxPermittedZs} Ohms` : '');
  addSection('Prospective Fault Current:', '', formData.prospectiveFaultCurrent ? `${formData.prospectiveFaultCurrent}kA` : '');

  // RCD Testing (if applicable)
  if (formData.protectiveDeviceType === 'rcbo' && formData.rcdRating) {
    yPosition += 3;
    doc.setFont('helvetica', 'bold');
    yPosition = addText('RCD Testing:', margin, yPosition) + 2;
    doc.setFont('helvetica', 'normal');
    addSection('RCD Rating:', '', `${formData.rcdRating}mA`);
    addSection('Operating Time:', '', formData.rcdOperatingTime ? `${formData.rcdOperatingTime}ms` : '');
  }

  // Test Equipment
  if (yPosition > 200) {
    doc.addPage();
    yPosition = 20;
  }

  yPosition += 5;
  doc.setFont('helvetica', 'bold');
  yPosition = addText('TEST EQUIPMENT USED', margin, yPosition) + 5;
  
  if (formData.continuityTesterMake) {
    addSection('Continuity Tester:', '', `${formData.continuityTesterMake} (${formData.continuityTesterSerial})`);
  }
  if (formData.insulationTesterMake) {
    addSection('Insulation Tester:', '', `${formData.insulationTesterMake} (${formData.insulationTesterSerial})`);
  }
  if (formData.loopTesterMake) {
    addSection('Loop Tester:', '', `${formData.loopTesterMake} (${formData.loopTesterSerial})`);
  }


  // Declaration
  if (yPosition > 180) {
    doc.addPage();
    yPosition = 20;
  }

  yPosition += 10;
  doc.setFont('helvetica', 'bold');
  yPosition = addText('DECLARATION', margin, yPosition) + 5;
  
  doc.setFont('helvetica', 'normal');
  yPosition = addText('I/We certify that:', margin, yPosition) + 3;

  const certifications = [
    { 
      text: 'The work described has been designed, constructed, inspected and tested in accordance with BS 7671:2018+A3:2024', 
      checked: formData.bs7671Compliance
    },
    { 
      text: 'The test results recorded are accurate and relate to the work described', 
      checked: formData.testResultsAccurate 
    },
    { 
      text: 'The work is safe to energise and use', 
      checked: formData.workSafety 
    }
  ];

  certifications.forEach(cert => {
    const checkbox = cert.checked ? '☑' : '☐';
    yPosition = addText(`${checkbox} ${cert.text}`, margin, yPosition, contentWidth) + 3;
  });

  yPosition += 10;
  addSection('Name:', '', formData.electricianName);
  addSection('Position:', '', formData.position);
  addSection('Signature Date:', '', formData.signatureDate ? new Date(formData.signatureDate).toLocaleDateString('en-GB') : '');

  if (formData.schemeProvider) {
    addSection('Competent Person Scheme:', '', formData.schemeProvider);
  }
  if (formData.registrationNumber) {
    addSection('Registration Number:', '', formData.registrationNumber);
  }

  // Footer
  yPosition += 15;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  yPosition = addText('This certificate is issued in accordance with BS 7671:2018+A3:2024', margin, yPosition, contentWidth);
  yPosition = addText(`Generated: ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString('en-GB')}`, margin, yPosition, contentWidth);

  // Save the PDF with professional filename
  const fileName = generatePdfFilename(
    'MinorWorks',
    formData.certificateNumber || 'MW',
    formData.clientName || formData.propertyAddress || 'Client',
    formData.workDate || new Date()
  );
  doc.save(fileName);
};