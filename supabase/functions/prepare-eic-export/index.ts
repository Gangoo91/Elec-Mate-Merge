import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { design } = await req.json();
    
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Extract JWT from Authorization header and pass to getUser
    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(jwt);
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    console.log('📤 Preparing EIC export for design:', design.projectName);

    // Transform InstallationDesign circuits to EIC format
    const eicCircuits = design.circuits.map((circuit: any, index: number) => ({
      circuitNumber: String(index + 1),
      description: circuit.name,
      loadType: circuit.loadType,
      phases: circuit.phases,
      
      // Cable specifications
      liveSize: String(circuit.cableSize),
      cpcSize: String(circuit.cpcSize),
      cableLength: circuit.cableLength,
      installationMethod: circuit.installationMethod,
      
      // Protection device
      protectiveDeviceType: circuit.protectionDevice?.type || 'MCB',
      protectiveDeviceRating: String(circuit.protectionDevice?.rating || 0),
      protectiveDeviceCurve: circuit.protectionDevice?.curve || 'B',
      protectiveDeviceKaRating: String(circuit.protectionDevice?.kaRating || 6),
      
      // Expected test results (PRE-FILLED for future testing)
      expectedR1R2: circuit.expectedTestResults?.r1r2?.at70C || 'TBD',
      expectedZs: String(circuit.calculations?.zs || 'TBD'),
      expectedMaxZs: String(circuit.calculations?.maxZs || 'TBD'),
      expectedInsulationResistance: circuit.expectedTestResults?.insulationResistance?.minResistance || '≥1.0 MΩ',
      expectedPolarity: circuit.expectedTestResults?.polarity || 'Correct',
      
      // RCD data
      rcdProtected: circuit.rcdProtected || false,
      rcdRating: circuit.rcdProtected ? '30mA' : null,
      expectedRcdTripTime: circuit.rcdProtected ? circuit.expectedTestResults?.rcdTest?.at1x : null,
      
      // AFDD
      afddRequired: circuit.afddRequired || false,
      
      // Blank fields for ON-SITE testing (to be filled by inspector)
      actualR1R2: null,
      actualZs: null,
      actualInsulationResistance: null,
      actualPolarity: null,
      actualRcdTripTime: null,
      testDate: null,
      testedBy: null,
      remarks: null
    }));

    // Create export metadata
    const exportMetadata = {
      circuitsCount: design.circuits.length,
      voltage: design.consumerUnit.incomingSupply.voltage,
      phases: design.consumerUnit.incomingSupply.phases,
      earthingSystem: design.consumerUnit.incomingSupply.earthingSystem,
      Ze: design.consumerUnit.incomingSupply.Ze,
      incomingPFC: design.consumerUnit.incomingSupply.incomingPFC,
      mainSwitchRating: design.consumerUnit.mainSwitchRating,
      totalLoad: design.totalLoad,
      diversityApplied: design.diversityApplied
    };

    // Store in design_exports table
    const { data: exportRecord, error: insertError } = await supabaseClient
      .from('design_exports')
      .insert({
        user_id: user.id,
        design_id: `design_${Date.now()}`,
        project_name: design.projectName,
        installation_address: design.location,
        client_name: design.clientName,
        electrician_name: design.electricianName,
        export_type: 'eic',
        status: 'pending',
        circuits_count: design.circuits.length,
        voltage: design.consumerUnit.incomingSupply.voltage,
        phases: design.consumerUnit.incomingSupply.phases,
        design_data: {
          ...design,
          eicCircuits,
          exportMetadata
        }
      })
      .select()
      .single();

    if (insertError) {
      console.error('❌ Error storing export:', insertError);
      throw insertError;
    }

    console.log('✅ Export created successfully:', exportRecord.id);

    // Optional: Store backup JSON in storage bucket
    const jsonFileName = `${user.id}/${exportRecord.id}.json`;
    const { error: storageError } = await supabaseClient.storage
      .from('eic-exports')
      .upload(jsonFileName, JSON.stringify(exportRecord.design_data, null, 2), {
        contentType: 'application/json',
        upsert: false
      });

    if (storageError) {
      console.warn('⚠️ Storage backup failed (non-critical):', storageError.message);
    } else {
      console.log('📦 Backup stored in eic-exports bucket');
    }

    return new Response(JSON.stringify({
      success: true,
      exportId: exportRecord.id,
      circuitsCount: design.circuits.length,
      status: 'pending',
      message: `${design.circuits.length} circuits ready for EIC testing`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in prepare-eic-export function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to prepare EIC export' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
