import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { design, projectName, location, clientName, electricianName } = await req.json();
    
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    console.log('📤 Preparing EIC export for user:', user.id);

    // Extract metadata
    const circuits = design.circuits || [];
    const circuitsCount = circuits.length;
    const voltage = design.consumerUnit?.incomingSupply?.voltage || 230;
    const phases = circuits.some((c: any) => c.phases === 'three') ? 'three' : 'single';

    // Transform circuits to EIC format with expected test values
    const eicCircuits = circuits.map((circuit: any, idx: number) => ({
      // Circuit identification
      circuitNumber: String(idx + 1),
      description: circuit.name,
      loadType: circuit.loadType,
      phases: circuit.phases,
      
      // Cable specifications
      liveSize: String(circuit.cableSize),
      cpcSize: String(circuit.cpcSize),
      cableLength: circuit.cableLength,
      installationMethod: circuit.installationMethod,
      referenceMethod: getReferenceMethodCode(circuit.installationMethod),
      
      // Protection device
      protectiveDeviceType: circuit.protectionDevice?.type || 'MCB',
      protectiveDeviceRating: String(circuit.protectionDevice?.rating || ''),
      protectiveDeviceCurve: circuit.protectionDevice?.curve || 'B',
      protectiveDeviceKaRating: String(circuit.protectionDevice?.kaRating || 6),
      bsStandard: 'BS 7671:2018+A3:2024',
      
      // Expected test results (PRE-FILLED from design calculations)
      expectedR1R2: circuit.expectedTestResults?.r1r2?.at70C || 'TBD',
      expectedZs: String(circuit.calculations?.zs || 'TBD'),
      expectedMaxZs: String(circuit.calculations?.maxZs || 'TBD'),
      expectedInsulationResistance: circuit.expectedTestResults?.insulationResistance?.minResistance || '≥1.0 MΩ',
      expectedPolarity: circuit.expectedTestResults?.polarity || 'Correct (verify on-site)',
      
      // RCD fields
      rcdProtected: circuit.rcdProtected || false,
      rcdRating: circuit.rcdProtected ? '30mA' : null,
      expectedRcdTripTime: circuit.rcdProtected ? circuit.expectedTestResults?.rcdTest?.at1x : null,
      
      // AFDD
      afddRequired: circuit.afddRequired || false,
      
      // Blank fields for on-site testing
      actualR1R2: null,
      actualZs: null,
      actualInsulationResistance: null,
      actualPolarity: null,
      actualRcdTripTime: null,
      actualPfc: null,
      functionalTesting: null,
      testDate: null,
      testedBy: null
    }));

    // Prepare design export data
    const designExportData = {
      user_id: user.id,
      design_id: `design-${Date.now()}`,
      project_name: projectName || design.projectName || 'Untitled Project',
      installation_address: location || design.location || '',
      client_name: clientName || design.clientName || '',
      electrician_name: electricianName || design.electricianName || '',
      export_type: 'eic',
      status: 'pending',
      circuits_count: circuitsCount,
      voltage: voltage,
      phases: phases,
      design_data: {
        ...design,
        eicCircuits: eicCircuits,
        consumerUnit: design.consumerUnit,
        exportedAt: new Date().toISOString()
      }
    };

    // Insert into design_exports table
    const { data: exportRecord, error: insertError } = await supabaseClient
      .from('design_exports')
      .insert(designExportData)
      .select()
      .single();

    if (insertError) {
      console.error('❌ Error inserting export record:', insertError);
      throw insertError;
    }

    console.log('✅ EIC export created successfully:', exportRecord.id);

    // Optional: Store JSON backup in storage bucket
    const fileName = `${user.id}/${exportRecord.id}.json`;
    const { error: storageError } = await supabaseClient.storage
      .from('eic-exports')
      .upload(fileName, JSON.stringify(designExportData, null, 2), {
        contentType: 'application/json',
        upsert: false
      });

    if (storageError) {
      console.warn('⚠️ Storage backup failed (non-critical):', storageError);
    }

    return new Response(JSON.stringify({
      success: true,
      exportId: exportRecord.id,
      circuitsCount: circuitsCount,
      reference: exportRecord.id.slice(0, 8).toUpperCase(),
      status: 'pending'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in prepare-eic-export function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to prepare EIC export',
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function to map installation method to reference method code
function getReferenceMethodCode(method?: string): string {
  const codes: Record<string, string> = {
    'Method A': '100',
    'Method B': '101',
    'Method C': '103',
    'Clipped Direct': '103',
    'In Conduit': '100',
    'In Trunking': '101',
    'Buried Direct': '120',
    'clipped-direct': '103',
    'in-conduit': '100',
    'in-trunking': '101',
    'buried-direct': '120'
  };
  return codes[method || ''] || '103';
}
