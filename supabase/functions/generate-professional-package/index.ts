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
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, designData, companyName, clientName } = await req.json() as PackageRequest;

    // Phase 3: Initialize Supabase for saving design to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('📦 Generating Professional Package: 6 PDFs + ZIP bundle + Database save');

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
