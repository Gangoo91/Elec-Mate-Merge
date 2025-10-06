import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts';

interface PackageRequest {
  conversationId?: string;
  messages: Array<{ role: string; content: string }>;
  designData: any;
  companyName?: string;
  clientName?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, designData, companyName, clientName } = await req.json() as PackageRequest;

    console.log('📦 Generating Professional Package: 6 PDFs + ZIP bundle');

    // Extract data from conversation and design
    const extractedData = extractDataFromConversation(messages, designData);

    // Generate 6 PDFs (using the edge function's ability to import from CDN)
    const pdfGenerationPromises = [
      generateDesignSpec(extractedData, companyName),
      generateClientQuote(extractedData, companyName, clientName),
      generateRAMS(extractedData, companyName),
      generateInstallationChecklist(extractedData),
      generateTestSchedule(extractedData),
      generateEIC(extractedData, clientName)
    ];

    const [designSpec, quote, rams, checklist, testSchedule, eic] = await Promise.all(pdfGenerationPromises);

    // Create ZIP bundle (using JSZip from CDN)
    const JSZip = (await import('https://esm.sh/jszip@3.10.1')).default;
    const zip = new JSZip();

    zip.file("1_Design_Specification.pdf", designSpec);
    zip.file("2_Client_Quote.pdf", quote);
    zip.file("3_Risk_Assessment_Method_Statement.pdf", rams);
    zip.file("4_Installation_Checklist.pdf", checklist);
    zip.file("5_Test_Schedule.pdf", testSchedule);
    zip.file("6_Electrical_Installation_Certificate.pdf", eic);

    const zipBlob = await zip.generateAsync({ type: "uint8array" });

    console.log('✅ Professional Package: Generated successfully');

    return new Response(zipBlob, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="Electrical_Design_Package_${Date.now()}.zip"`
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

// Simplified PDF generation - in production, these would call the actual PDF utilities
async function generateDesignSpec(data: any, companyName: string): Promise<Uint8Array> {
  // Mock PDF - in production, import and use actual PDF generation
  const mockPDF = new TextEncoder().encode("Design Specification PDF placeholder");
  return mockPDF;
}

async function generateClientQuote(data: any, companyName: string, clientName: string): Promise<Uint8Array> {
  const mockPDF = new TextEncoder().encode("Client Quote PDF placeholder");
  return mockPDF;
}

async function generateRAMS(data: any, companyName: string): Promise<Uint8Array> {
  const mockPDF = new TextEncoder().encode("RAMS PDF placeholder");
  return mockPDF;
}

async function generateInstallationChecklist(data: any): Promise<Uint8Array> {
  const mockPDF = new TextEncoder().encode("Installation Checklist PDF placeholder");
  return mockPDF;
}

async function generateTestSchedule(data: any): Promise<Uint8Array> {
  const mockPDF = new TextEncoder().encode("Test Schedule PDF placeholder");
  return mockPDF;
}

async function generateEIC(data: any, clientName: string): Promise<Uint8Array> {
  const mockPDF = new TextEncoder().encode("EIC Template PDF placeholder");
  return mockPDF;
}
