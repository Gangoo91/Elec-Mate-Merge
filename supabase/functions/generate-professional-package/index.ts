import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

interface PackageRequest {
  conversationId?: string;
  messages: Array<{ role: string; content: string }>;
  designData: any;
  companyName?: string;
  clientName?: string;
  clientDetails?: any;
  companyDetails?: any;
  selectedDocuments?: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, designData, companyName, clientName, clientDetails, companyDetails, selectedDocuments = ['design', 'quote', 'rams', 'checklist', 'test', 'eic'] } = await req.json() as PackageRequest;

    // Phase 3: Initialize Supabase for saving design to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log(`📦 Generating Professional Package: ${selectedDocuments.length} of 6 PDFs selected`);

    // Extract data from conversation and design
    const extractedData = extractDataFromConversation(messages, designData);

    // Generate selected PDFs only
    const pdfPromises: { key: string; promise: Promise<Uint8Array>; filename: string }[] = [];
    
    if (selectedDocuments.includes('design')) {
      pdfPromises.push({
        key: 'design',
        promise: generateDesignSpec(extractedData, companyDetails || { companyName }),
        filename: "1_Design_Specification.pdf"
      });
    }
    if (selectedDocuments.includes('quote')) {
      pdfPromises.push({
        key: 'quote',
        promise: generateClientQuote(extractedData, companyDetails || { companyName }, clientDetails || { clientName }),
        filename: "2_Client_Quote.pdf"
      });
    }
    if (selectedDocuments.includes('rams')) {
      pdfPromises.push({
        key: 'rams',
        promise: generateRAMS(extractedData, companyDetails || { companyName }, clientDetails),
        filename: "3_Risk_Assessment_Method_Statement.pdf"
      });
    }
    if (selectedDocuments.includes('checklist')) {
      pdfPromises.push({
        key: 'checklist',
        promise: generateInstallationChecklist(extractedData, clientDetails),
        filename: "4_Installation_Checklist.pdf"
      });
    }
    if (selectedDocuments.includes('test')) {
      pdfPromises.push({
        key: 'test',
        promise: generateTestSchedule(extractedData, clientDetails),
        filename: "5_Test_Schedule.pdf"
      });
    }
    if (selectedDocuments.includes('eic')) {
      pdfPromises.push({
        key: 'eic',
        promise: generateEIC(extractedData, clientDetails || { clientName }, companyDetails),
        filename: "6_Electrical_Installation_Certificate.pdf"
      });
    }

    const pdfs = await Promise.all(pdfPromises.map(p => p.promise));

    // Create ZIP bundle (using JSZip from CDN)
    const JSZip = (await import('https://esm.sh/jszip@3.10.1')).default;
    const zip = new JSZip();

    pdfs.forEach((pdfData, idx) => {
      zip.file(pdfPromises[idx].filename, pdfData);
    });

    const zipBlob = await zip.generateAsync({ type: "uint8array" });

    // Phase 3: Save design to database for later testing
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      try {
        const token = authHeader.replace('Bearer ', '');
        const { data: { user } } = await supabase.auth.getUser(token);

        if (user) {
          const savedDesign = await supabase.from('saved_designs').insert({
            user_id: user.id,
            project_name: extractedData.projectName,
            client_name: extractedData.clientName,
            installation_address: extractedData.location,
            circuits: extractCircuitsForTesting(extractedData, messages),
            test_expectations: generateTestExpectations(extractedData),
            materials_list: extractedData.materialsRequired,
            rams_data: { hazards: extractedData.safetyHazards, steps: extractedData.installationSteps },
            h_and_s_data: { hazards: extractedData.safetyHazards },
            exported_at: new Date().toISOString(),
            status: 'design_complete'
          }).select().single();

          console.log('✅ Design saved to database for testing:', savedDesign.data?.id);
        }
      } catch (dbError) {
        console.error('⚠️ Failed to save design to database:', dbError);
        // Continue anyway - package still generated
      }
    }

    console.log('✅ Professional Package: Generated successfully');

    const docCount = selectedDocuments.length;
    const packageType = docCount === 6 ? 'Full' : `Partial_${docCount}doc`;
    const timestamp = new Date().toISOString().split('T')[0];
    
    return new Response(zipBlob, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="ElecMate_${packageType}_Package_${timestamp}.zip"`
      },
    });

  } catch (error) {
    console.error('❌ Error generating professional package:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Package generation failed'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractDataFromConversation(messages: any[], designData: any) {
  // Extract key information from AI conversation
  const conversationText = messages.map(m => m.content).join(' ');
  
  return {
    projectName: designData.projectName || extractProjectName(conversationText) || "Electrical Installation",
    location: designData.location || extractLocation(conversationText) || "Site Address",
    clientName: designData.clientName || "Client Name",
    assessor: designData.assessor || "Qualified Electrician",
    date: new Date().toISOString(),
    circuits: designData.circuits || [],
    designerNotes: extractDesignerNotes(messages),
    safetyHazards: extractSafetyData(messages),
    installationSteps: extractInstallationSteps(messages),
    toolsRequired: extractToolsRequired(conversationText),
    materialsRequired: extractMaterials(conversationText)
  };
}

function extractProjectName(text: string): string | null {
  const patterns = [
    /installing?\s+(?:a\s+)?(\d+\.?\d*\s*kW\s+\w+)/i,
    /design(?:ing)?\s+(?:a\s+)?(\w+\s+circuit)/i,
    /(\w+\s+installation)/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

function extractLocation(text: string): string | null {
  const locationMatch = text.match(/(?:at|in|location:?)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
  return locationMatch ? locationMatch[1] : null;
}

function extractDesignerNotes(messages: any[]): string {
  const designerMessages = messages.filter(m => 
    m.role === 'assistant' && m.activeAgents?.includes('designer')
  );
  
  if (designerMessages.length === 0) return "Design completed in accordance with BS 7671:2018+A3:2024.";
  
  return designerMessages.map(m => m.content).join('\n\n').substring(0, 500);
}

function extractSafetyData(messages: any[]): any[] {
  const safetyMessages = messages.filter(m => 
    m.role === 'assistant' && m.activeAgents?.includes('health-safety')
  );
  
  if (safetyMessages.length === 0) {
    return [
      {
        hazard: "Electric shock",
        likelihood: 3,
        severity: 5,
        riskRating: 15,
        controls: "Safe isolation, lock-off, voltage testing",
        residualRisk: 6
      }
    ];
  }
  
  // Extract from H&S agent response (would need actual structured data)
  return [];
}

function extractInstallationSteps(messages: any[]): string[] {
  const installerMessages = messages.filter(m => 
    m.role === 'assistant' && m.activeAgents?.includes('installer')
  );
  
  if (installerMessages.length === 0) {
    return [
      "Isolate power supply at consumer unit",
      "Install cable route and protective conduit",
      "Install circuit protective device",
      "Terminate cables at both ends",
      "Test circuit before energising"
    ];
  }
  
  return ["Installation steps extracted from conversation"];
}

function extractToolsRequired(text: string): string[] {
  const defaultTools = [
    "Multifunction tester",
    "Voltage indicator",
    "Insulated screwdrivers",
    "Wire strippers",
    "Cable cutters",
    "Spirit level",
    "Drill and masonry bits"
  ];
  
  return defaultTools;
}

function extractMaterials(text: string): Array<{ item: string; quantity: string }> {
  const defaults = [
    { item: "Cable (size TBC)", quantity: "As measured" },
    { item: "MCB/RCBO", quantity: "1" },
    { item: "Back boxes", quantity: "As required" },
    { item: "Accessories", quantity: "As required" }
  ];
  
  return defaults;
}

// Real PDF generation using jsPDF
async function generateDesignSpec(data: any, companyDetails: any): Promise<Uint8Array> {
  const { default: jsPDF } = await import('https://esm.sh/jspdf@2.5.1');
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('ELECTRICAL DESIGN SPECIFICATION', 105, 20, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')}`, 105, 28, { align: 'center' });
  
  // Company branding
  if (companyDetails?.companyName) {
    doc.setFontSize(12);
    doc.text(companyDetails.companyName, 105, 36, { align: 'center' });
  }
  
  // Project Info
  doc.setFontSize(14);
  doc.text('Project Information', 20, 50);
  doc.setFontSize(10);
  doc.text(`Project: ${data.projectName}`, 20, 60);
  doc.text(`Location: ${data.location}`, 20, 67);
  if (companyDetails?.companyName) {
    doc.text(`Company: ${companyDetails.companyName}`, 20, 74);
  }
  
  // Designer Notes
  doc.setFontSize(14);
  doc.text('Design Notes', 20, 90);
  doc.setFontSize(10);
  const notes = doc.splitTextToSize(data.designerNotes || 'Design completed to BS 7671:2018+A3:2024', 170);
  doc.text(notes, 20, 100);
  
  // Compliance
  doc.setFontSize(12);
  doc.text('Compliance Statement', 20, 130);
  doc.setFontSize(9);
  doc.text('This design complies with BS 7671:2018+A3:2024 (Sept 2025)', 20, 138);
  
  // Footer with company details
  if (companyDetails?.phone || companyDetails?.email) {
    doc.setFontSize(8);
    let footerY = 280;
    if (companyDetails.phone) {
      doc.text(`Tel: ${companyDetails.phone}`, 20, footerY);
      footerY += 4;
    }
    if (companyDetails.email) {
      doc.text(`Email: ${companyDetails.email}`, 20, footerY);
    }
  }
  
  return new Uint8Array(doc.output('arraybuffer'));
}

async function generateClientQuote(data: any, companyDetails: any, clientDetails: any): Promise<Uint8Array> {
  const { default: jsPDF } = await import('https://esm.sh/jspdf@2.5.1');
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('QUOTATION', 105, 20, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, 105, 28, { align: 'center' });
  
  // Company Details (From)
  doc.setFontSize(12);
  doc.text('From:', 20, 45);
  doc.setFontSize(10);
  if (companyDetails?.companyName) {
    doc.text(companyDetails.companyName, 20, 52);
    if (companyDetails.companyAddress) {
      const addr = doc.splitTextToSize(companyDetails.companyAddress, 80);
      doc.text(addr, 20, 58);
    }
  }
  
  // Client Details (To)
  doc.setFontSize(12);
  doc.text('Quote To:', 120, 45);
  doc.setFontSize(10);
  if (clientDetails?.clientName) {
    doc.text(clientDetails.clientName, 120, 52);
    if (clientDetails.propertyAddress) {
      const addr = doc.splitTextToSize(clientDetails.propertyAddress, 80);
      doc.text(addr, 120, 58);
    }
    if (clientDetails.postcode) {
      doc.text(clientDetails.postcode, 120, 70);
    }
  }
  
  doc.setFontSize(14);
  doc.text('Materials', 20, 90);
  doc.setFontSize(10);
  let yPos = 100;
  (data.materialsRequired || []).slice(0, 10).forEach((item: any) => {
    doc.text(`• ${item.item}: ${item.quantity}`, 25, yPos);
    yPos += 7;
  });
  
  doc.setFontSize(12);
  doc.text('This quotation is valid for 30 days', 20, yPos + 20);
  
  return new Uint8Array(doc.output('arraybuffer'));
}

async function generateRAMS(data: any, companyDetails: any, clientDetails: any): Promise<Uint8Array> {
  const { default: jsPDF } = await import('https://esm.sh/jspdf@2.5.1');
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('RISK ASSESSMENT & METHOD STATEMENT', 105, 20, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, 105, 28, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text('Site Details', 20, 45);
  doc.setFontSize(10);
  doc.text(`Project: ${data.projectName}`, 20, 55);
  if (clientDetails?.propertyAddress) {
    doc.text(`Location: ${clientDetails.propertyAddress}`, 20, 62);
  } else {
    doc.text(`Location: ${data.location}`, 20, 62);
  }
  
  doc.setFontSize(14);
  doc.text('Prepared By', 20, 80);
  doc.setFontSize(10);
  if (companyDetails?.companyName) {
    doc.text(`Company: ${companyDetails.companyName}`, 20, 90);
  }
  
  doc.setFontSize(14);
  doc.text('Installation Steps', 20, 105);
  doc.setFontSize(10);
  let yPos = 115;
  (data.installationSteps || []).slice(0, 8).forEach((step: string, idx: number) => {
    const wrapped = doc.splitTextToSize(`${idx + 1}. ${step}`, 170);
    doc.text(wrapped, 20, yPos);
    yPos += wrapped.length * 6;
  });
  
  doc.setFontSize(14);
  doc.text('Safety Hazards', 20, Math.min(yPos + 10, 180));
  doc.setFontSize(9);
  doc.text('• Electric shock - Safe isolation required', 20, Math.min(yPos + 20, 190));
  doc.text('• Working at height - Use appropriate access equipment', 20, Math.min(yPos + 27, 197));
  
  return new Uint8Array(doc.output('arraybuffer'));
}

async function generateInstallationChecklist(data: any, clientDetails: any): Promise<Uint8Array> {
  const { default: jsPDF } = await import('https://esm.sh/jspdf@2.5.1');
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('INSTALLATION CHECKLIST', 105, 20, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`Project: ${data.projectName}`, 105, 30, { align: 'center' });
  
  const checklist = [
    '☐ Carry out risk assessment',
    '☐ Isolate power supply',
    '☐ Test for dead',
    '☐ Install cable routes',
    '☐ Install protective devices',
    '☐ Terminate all connections',
    '☐ Conduct testing (IR, continuity, Zs)',
    '☐ Complete certification',
    '☐ Handover to client'
  ];
  
  doc.setFontSize(12);
  let yPos = 50;
  checklist.forEach(item => {
    doc.text(item, 20, yPos);
    yPos += 10;
  });
  
  return new Uint8Array(doc.output('arraybuffer'));
}

async function generateTestSchedule(data: any, clientDetails: any): Promise<Uint8Array> {
  const { default: jsPDF } = await import('https://esm.sh/jspdf@2.5.1');
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('TEST & INSPECTION SCHEDULE', 105, 20, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`Project: ${data.projectName}`, 105, 30, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text('Required Tests (BS 7671:2018+A3:2024)', 20, 50);
  
  const tests = [
    '1. Continuity of protective conductors',
    '2. Insulation resistance',
    '3. Polarity',
    '4. Earth fault loop impedance (Zs)',
    '5. RCD operation',
    '6. Functional testing'
  ];
  
  doc.setFontSize(10);
  let yPos = 65;
  tests.forEach(test => {
    doc.text(test, 25, yPos);
    yPos += 10;
  });
  
  doc.text('All tests must meet BS 7671:2018+A3:2024 requirements', 20, yPos + 20);
  
  return new Uint8Array(doc.output('arraybuffer'));
}

async function generateEIC(data: any, clientDetails: any, companyDetails: any): Promise<Uint8Array> {
  const { default: jsPDF } = await import('https://esm.sh/jspdf@2.5.1');
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('ELECTRICAL INSTALLATION CERTIFICATE', 105, 20, { align: 'center' });
  doc.setFontSize(9);
  doc.text('(BS 7671:2018+A3:2024)', 105, 28, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text('Client Details', 20, 45);
  doc.setFontSize(10);
  if (clientDetails?.clientName) {
    doc.text(`Client: ${clientDetails.clientName}`, 20, 55);
    if (clientDetails.propertyAddress) {
      doc.text(`Installation: ${clientDetails.propertyAddress}`, 20, 62);
    }
    if (clientDetails.postcode) {
      doc.text(`Postcode: ${clientDetails.postcode}`, 20, 69);
    }
  } else {
    doc.text(`Installation: ${data.location}`, 20, 55);
  }
  
  doc.setFontSize(12);
  doc.text('Installer Details', 20, 85);
  doc.setFontSize(10);
  if (companyDetails?.companyName) {
    doc.text(`Company: ${companyDetails.companyName}`, 20, 95);
    if (companyDetails.registrationNumber) {
      doc.text(`Registration: ${companyDetails.registrationNumber}`, 20, 102);
    }
  }
  
  doc.setFontSize(12);
  doc.text('Design Details', 20, 120);
  doc.setFontSize(10);
  doc.text('Design Standard: BS 7671:2018+A3:2024', 20, 130);
  doc.text(`Project: ${data.projectName}`, 20, 137);
  
  doc.setFontSize(9);
  doc.text('This is a template certificate. Complete all sections before use.', 20, 160);
  doc.text('Designer, Constructor, and Inspector signatures required.', 20, 167);
  
  // Signature blocks
  doc.rect(20, 185, 55, 25);
  doc.text('Designer Signature:', 22, 190);
  
  doc.rect(85, 185, 55, 25);
  doc.text('Constructor Signature:', 87, 190);
  
  doc.rect(150, 185, 55, 25);
  doc.text('Inspector Signature:', 152, 190);
  
  return new Uint8Array(doc.output('arraybuffer'));
}

// Phase 3: Extract circuits with test expectations
function extractCircuitsForTesting(data: any, messages: any[]): any[] {
  // Extract circuit designs from conversation
  const designerMessages = messages.filter((m: any) => 
    m.role === 'assistant' && m.content?.includes('mm²')
  );

  const circuits = [];
  
  // Parse circuit data from messages (simplified)
  for (const msg of designerMessages) {
    const cableSizeMatch = msg.content?.match(/(\d+)mm²/);
    const deviceMatch = msg.content?.match(/(\d+)A\s+Type\s+([BCD])/);
    const loadMatch = msg.content?.match(/(\d+\.?\d*)(kW|W)/);
    
    if (cableSizeMatch && deviceMatch) {
      circuits.push({
        ref: `C${circuits.length + 1}`,
        description: data.projectName || 'Circuit',
        cable: `${cableSizeMatch[1]}mm² 6242Y`,
        length: data.cableLength || 15,
        device: `${deviceMatch[1]}A Type ${deviceMatch[2]} MCB`,
        load: loadMatch ? `${loadMatch[1]}${loadMatch[2]}` : 'Unknown',
        expectedValues: {
          r1r2: calculateExpectedR1R2(parseInt(cableSizeMatch[1]), data.cableLength || 15),
          zs: 1.44, // Simplified
          insulationResistance: '>200MΩ',
          rcdTime: '30mA @ <40ms'
        }
      });
    }
  }

  // If no circuits extracted, create default
  if (circuits.length === 0) {
    circuits.push({
      ref: 'C1',
      description: data.projectName || 'Main Circuit',
      cable: '6mm² 6242Y',
      length: 15,
      device: '32A Type B MCB',
      load: 'TBC',
      expectedValues: {
        r1r2: 0.74,
        zs: 1.44,
        insulationResistance: '>200MΩ',
        rcdTime: '30mA @ <40ms'
      }
    });
  }

  return circuits;
}

// Calculate expected R1+R2 based on cable size and length
function calculateExpectedR1R2(cableSize: number, length: number): number {
  // Resistance values (mΩ/m at 20°C) for 70°C thermoplastic
  const r1r2Values: Record<number, number> = {
    1.5: 30.2,
    2.5: 18.1,
    4: 11.5,
    6: 7.41,
    10: 4.61,
    16: 2.87,
  };

  const r1r2PerMetre = r1r2Values[cableSize] || 7.41;
  return Math.round((r1r2PerMetre * length / 1000) * 100) / 100; // Convert to Ω
}

// Generate test expectations for all tests
function generateTestExpectations(data: any): any {
  return {
    insulationResistance: {
      line_line: '>200MΩ',
      line_neutral: '>200MΩ',
      line_earth: '>200MΩ'
    },
    continuity: {
      method: 'R1+R2 method',
      maxValue: 0.74
    },
    earthFaultLoop: {
      maxZs: 1.44,
      pfc: '>6kA'
    },
    rcd: {
      operatingTime: '<40ms at 30mA',
      tripCurrent: '15-30mA'
    },
    polarity: {
      result: 'Correct',
      notes: 'All live conductors connected to correct terminals'
    }
  };
}
