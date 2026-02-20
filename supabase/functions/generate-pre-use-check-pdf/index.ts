import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { preUseCheckTemplate } from '../_shared/safety-templates/pre-use-check.ts';
import { htmlToPdf } from '../_shared/safety-pdf-renderer.ts';
import type { Branding } from '../_shared/safety-html-base.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-request-id',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing authorization header');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const userSupabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await userSupabase.auth.getUser();
    if (userError || !user) throw new Error('Unauthorised');

    // Fetch company branding
    const { data: profileRows } = await supabase
      .from('company_profiles')
      .select(
        'company_name, company_address, company_postcode, company_phone, company_email, company_website, company_registration, vat_number, logo_data_url, logo_url, primary_color, secondary_color, scheme_logo_data_url, registration_scheme'
      )
      .eq('user_id', user.id)
      .limit(1);
    const branding: Branding = profileRows?.[0] ?? {};

    const { recordId } = await req.json();
    if (!recordId) throw new Error('Missing recordId');

    const { data: record, error: fetchError } = await userSupabase
      .from('pre_use_checks')
      .select('*')
      .eq('id', recordId)
      .single();

    if (fetchError || !record) throw new Error('Record not found');

    // ── Build PDF via HTML template + Browserless ────────────────────
    const html = preUseCheckTemplate(record, branding);
    const pdfBytes = await htmlToPdf(html);

    // ── Upload PDF ─────────────────────────────────────────────────────
    const fileName = `pre-use-check-${recordId}-${Date.now()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from('safety-documents')
      .upload(`${user.id}/${fileName}`, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      // Fallback: return base64-encoded PDF as JSON (chunked to avoid stack overflow)
      const bytes = new Uint8Array(pdfBytes);
      let binary = '';
      const chunkSize = 8192;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
      }
      const base64 = btoa(binary);
      return new Response(JSON.stringify({ success: true, pdf_base64: base64 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: urlData } = supabase.storage
      .from('safety-documents')
      .getPublicUrl(`${user.id}/${fileName}`);

    await supabase.from('pre_use_checks').update({ pdf_url: urlData.publicUrl }).eq('id', recordId);

    return new Response(JSON.stringify({ success: true, url: urlData.publicUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
