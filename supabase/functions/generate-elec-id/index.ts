import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateElecIdRequest {
  user_id: string;
  ecs_card_type?: string;
}

serve(async (req: Request): Promise<Response> => {
  console.log('Generate Elec-ID | Started:', new Date().toISOString());

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { user_id, ecs_card_type }: GenerateElecIdRequest = await req.json();

    if (!user_id) {
      throw new Error('user_id is required');
    }

    console.log(`Generating Elec-ID for user: ${user_id}`);

    // Check if user already has an Elec-ID
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('elec_id_number')
      .eq('id', user_id)
      .single();

    if (existingProfile?.elec_id_number) {
      console.log(`User already has Elec-ID: ${existingProfile.elec_id_number}`);
      return new Response(
        JSON.stringify({
          success: true,
          elec_id_number: existingProfile.elec_id_number,
          message: 'Elec-ID already exists'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate sequential Elec-ID: EM-000001, EM-000002, etc.
    // Get current max ID from profiles table
    const { data: profiles } = await supabase
      .from('profiles')
      .select('elec_id_number')
      .like('elec_id_number', 'EM-%')
      .order('elec_id_number', { ascending: false })
      .limit(1);

    let nextNumber = 1;
    if (profiles && profiles.length > 0 && profiles[0].elec_id_number) {
      const currentNum = parseInt(profiles[0].elec_id_number.replace('EM-', ''), 10);
      if (!isNaN(currentNum)) {
        nextNumber = currentNum + 1;
      }
    }

    const elecIdNumber = `EM-${String(nextNumber).padStart(6, '0')}`;
    console.log(`Generated new Elec-ID: ${elecIdNumber}`);

    // Update profile with Elec-ID
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        elec_id_number: elecIdNumber,
        elec_id_enabled: true,
        ecs_card_type: ecs_card_type || null,
      })
      .eq('id', user_id);

    if (updateError) {
      console.error('Failed to update profile:', updateError);
      throw updateError;
    }

    console.log(`Elec-ID ${elecIdNumber} assigned to user ${user_id}`);

    return new Response(
      JSON.stringify({
        success: true,
        elec_id_number: elecIdNumber,
        message: 'Elec-ID generated successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error generating Elec-ID:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate Elec-ID' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
