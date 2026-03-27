/**
 * generate-apple-wallet-pass
 * Fetches the user's Elec-ID data from Supabase, then calls the VPS
 * to generate and sign a .pkpass file, returning the binary to the client.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const VPS_URL = Deno.env.get('VPS_MCP_URL') || 'http://89.167.69.251:3100';
const VPS_API_KEY = Deno.env.get('VPS_API_KEY') ?? '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorisation header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { data: userData, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', ''),
    );
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const userId = userData.user.id;

    // Fetch Elec-ID profile
    const { data: elecId, error: elecIdError } = await supabase
      .from('employer_elec_id_profiles')
      .select('*, profiles(full_name, avatar_url)')
      .eq('user_id', userId)
      .single();

    if (elecIdError || !elecId) {
      return new Response(JSON.stringify({ error: 'Elec-ID profile not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch qualifications
    const { data: quals } = await supabase
      .from('employer_elec_id_qualifications')
      .select('qualification_name, qualification_number')
      .eq('profile_id', elecId.id)
      .order('created_at', { ascending: false })
      .limit(8);

    // Fetch skills
    const { data: skillRows } = await supabase
      .from('employer_elec_id_skills')
      .select('skill_name')
      .eq('profile_id', elecId.id)
      .limit(10);

    const qualifications = (quals || []).map((q: any) =>
      q.qualification_number ? `${q.qualification_name} (${q.qualification_number})` : q.qualification_name,
    );
    const skills = (skillRows || []).map((s: any) => s.skill_name);

    // Profile data
    const profile = (elecId as any).profiles;
    const name = profile?.full_name || 'Electrician';
    const avatarUrl = profile?.avatar_url;

    // Optionally fetch and base64-encode the user avatar
    let avatarBase64: string | undefined;
    if (avatarUrl) {
      try {
        const imgRes = await fetch(avatarUrl);
        if (imgRes.ok) {
          const imgBuf = await imgRes.arrayBuffer();
          avatarBase64 = btoa(String.fromCharCode(...new Uint8Array(imgBuf)));
        }
      } catch {
        // Non-critical — pass generates without photo
      }
    }

    // Call VPS to generate .pkpass
    const vpsRes = await fetch(`${VPS_URL}/api/apple-wallet-pass`, {
      method: 'POST',
      headers: {
        'X-API-Key': VPS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        name,
        tier: elecId.verification_tier || 'basic',
        ecsCardType: elecId.ecs_card_type || null,
        ecsCardNumber: elecId.ecs_card_number || null,
        ecsExpiry: elecId.ecs_expiry_date || null,
        elecIdNumber: elecId.elec_id_number || `EM-${userId.slice(0, 6).toUpperCase()}`,
        qualifications,
        skills,
        avatarBase64,
      }),
    });

    if (!vpsRes.ok) {
      const errText = await vpsRes.text();
      console.error('[generate-apple-wallet-pass] VPS error:', vpsRes.status, errText);
      return new Response(JSON.stringify({ error: 'Pass generation failed', details: errText }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Stream the .pkpass binary back to the client
    const passBuffer = await vpsRes.arrayBuffer();
    const elecIdNumber = elecId.elec_id_number || 'elecid';

    return new Response(passBuffer, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': `attachment; filename="elecid-${elecIdNumber}.pkpass"`,
        'Content-Length': passBuffer.byteLength.toString(),
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[generate-apple-wallet-pass] Error:', msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
