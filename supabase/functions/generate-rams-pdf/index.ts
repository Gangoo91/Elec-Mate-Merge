import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ramsData, userId } = await req.json();
    const pdfMonkeyApiKey = Deno.env.get('PDF_MONKEY_API_KEY');

    console.log('Generating RAMS PDF');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: template } = await supabase
      .from('pdf_templates')
      .select('*')
      .eq('user_id', userId)
      .eq('type', 'rams')
      .eq('is_active', true)
      .single();

    if (!template?.pdf_monkey_template_id || !pdfMonkeyApiKey) {
      console.log('No custom template configured, using fallback');
      return new Response(JSON.stringify({ 
        success: false,
        useFallback: true,
        message: 'No custom template configured'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const mappedData = applyFieldMapping(ramsData, template.field_mapping || {});

    const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pdfMonkeyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: template.pdf_monkey_template_id,
          payload: mappedData,
          meta: {
            _filename: `RAMS_${ramsData.projectName?.replace(/[^a-z0-9]/gi, '_') || Date.now()}.pdf`
          }
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PDF Monkey API error:', response.status, errorText);
      throw new Error(`PDF Monkey API error: ${response.status}`);
    }

    const pdfResponse = await response.json();

    return new Response(JSON.stringify({
      success: true,
      documentId: pdfResponse.document.id,
      downloadUrl: pdfResponse.document.download_url,
      status: pdfResponse.document.status
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-rams-pdf function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      useFallback: true,
      error: error instanceof Error ? error.message : 'Failed to generate PDF'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function applyFieldMapping(data: any, fieldMapping: Record<string, string>): any {
  if (!fieldMapping || Object.keys(fieldMapping).length === 0) {
    return data;
  }

  const mapped: any = {};
  
  for (const [templateField, dataPath] of Object.entries(fieldMapping)) {
    const value = getNestedValue(data, dataPath);
    setNestedValue(mapped, templateField, value);
  }

  return mapped;
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
}
