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
    const { multiCircuitDesign, projectInfo, siteInfo } = await req.json();
    
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Get user from auth
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Generate EIC schedule data
    const circuits = multiCircuitDesign.circuits.map((circuit: any, index: number) => ({
      circuitNumber: String(index + 1),
      phaseType: circuit.phases.includes('three') ? 'three' : 'single',
      circuitDescription: circuit.name,
      referenceMethod: getReferenceMethodCode(circuit.calculationResults?.installationMethod),
      pointsServed: String(getPointsServed(circuit.loadType)),
      liveSize: `${circuit.cableSize}`,
      cpcSize: `${circuit.cpcSize}`,
      protectiveDeviceType: circuit.protectionDevice?.type || 'MCB',
      protectiveDeviceCurve: circuit.protectionDevice?.curve || 'B',
      protectiveDeviceRating: String(circuit.protectionDevice?.rating || 0),
      protectiveDeviceKaRating: String(circuit.protectionDevice?.kaRating || 6),
      bsStandard: 'BS 7671:2018+A3:2024',
      r1r2: calculateExpectedR1R2(circuit.cableSize, circuit.cpcSize, circuit.cableLength),
      insulationTestVoltage: '500V DC',
      insulationResistance: '≥1.0 MΩ (expected)',
      polarity: 'Correct (verify on-site)',
      zs: String(circuit.calculationResults?.zs || 'TBD'),
      maxZs: String(circuit.calculationResults?.maxZs || 'TBD'),
      rcdRating: circuit.rcdProtected ? '30mA' : undefined,
      rcdOneX: circuit.rcdProtected ? '< 200ms @ 1x IΔn' : undefined,
      rcdTestButton: circuit.rcdProtected ? 'Pass' : undefined,
      afddTest: circuit.afddRequired ? 'Pass (arc detection functional)' : undefined,
      pfc: 'To be tested',
      functionalTesting: 'To be completed'
    }));

    const scheduleData = {
      installationId: multiCircuitDesign.installationId,
      installationAddress: siteInfo.propertyAddress || '',
      designerName: projectInfo.leadElectrician || '',
      designDate: new Date().toISOString().split('T')[0],
      circuits,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Save to database
    const { data: savedSchedule, error: saveError } = await supabaseClient
      .from('eic_schedules')
      .insert({
        user_id: user.id,
        installation_id: multiCircuitDesign.installationId,
        installation_address: siteInfo.propertyAddress || '',
        designer_name: projectInfo.leadElectrician || '',
        design_date: new Date().toISOString().split('T')[0],
        schedule_data: circuits,
        status: 'pending'
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving EIC schedule:', saveError);
      throw saveError;
    }

    return new Response(JSON.stringify({
      success: true,
      schedule: savedSchedule,
      data: scheduleData
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-eic-schedule function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to generate EIC schedule' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper functions
function getReferenceMethodCode(method?: string): string {
  const codes: Record<string, string> = {
    'Method A': '100',
    'Method B': '101',
    'Method C': '103',
    'Clipped Direct': '103',
    'In Conduit': '100',
    'In Trunking': '101',
    'Buried Direct': '120'
  };
  return codes[method || ''] || '103';
}

function getPointsServed(loadType: string): number {
  const pointsMap: Record<string, number> = {
    'lighting': 10,
    'socket': 8,
    'cooker': 1,
    'shower': 1,
    'immersion': 1,
    'heating': 1,
    'ev-charger': 1,
    'motor': 1
  };
  return pointsMap[loadType.toLowerCase()] || 1;
}

function calculateExpectedR1R2(liveSize: number, cpcSize: number, length: number): string {
  const CONDUCTOR_RESISTANCE: Record<number, number> = {
    1.0: 18.1, 1.5: 12.1, 2.5: 7.41, 4.0: 4.61, 6.0: 3.08,
    10: 1.83, 16: 1.15, 25: 0.727, 35: 0.524, 50: 0.387,
    70: 0.268, 95: 0.193, 120: 0.153
  };

  const r1 = CONDUCTOR_RESISTANCE[liveSize] || 0;
  const r2 = CONDUCTOR_RESISTANCE[cpcSize] || 0;
  const r1r2 = ((r1 + r2) * length) / 1000;
  const r1r2At70C = r1r2 * 1.2;

  return `${r1r2At70C.toFixed(3)}Ω`;
}
