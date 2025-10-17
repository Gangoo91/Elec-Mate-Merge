import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Placeholder template ID - replace with actual PDF Monkey template ID
const RAMS_TEMPLATE_ID = 'PLACEHOLDER-RAMS-TEMPLATE-ID';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ramsData, userId } = await req.json();
    const pdfMonkeyApiKey = Deno.env.get('PDF_MONKEY_API_KEY');

    console.log('Generating RAMS PDF with template:', RAMS_TEMPLATE_ID);

    if (!pdfMonkeyApiKey) {
      console.log('PDF_MONKEY_API_KEY not configured, using fallback');
      return new Response(JSON.stringify({ 
        success: false,
        useFallback: true,
        message: 'PDF Monkey not configured'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check for custom user template (optional override)
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

    // Use custom template if available, otherwise use default
    const templateId = template?.pdf_monkey_template_id || RAMS_TEMPLATE_ID;
    const payload = template?.field_mapping 
      ? applyFieldMapping(ramsData, template.field_mapping)
      : {
          projectName: ramsData.projectName,
          location: ramsData.location,
          date: ramsData.date,
          assessor: ramsData.assessor,
          contractor: ramsData.contractor,
          supervisor: ramsData.supervisor,
          risks: ramsData.risks.map((risk: any) => ({
            hazard: risk.hazard,
            likelihood: risk.likelihood,
            severity: risk.severity,
            riskRating: risk.riskRating,
            riskLevel: getRiskLevel(risk.riskRating),
            controls: risk.controls,
            residualRisk: risk.residualRisk
          })),
          emergencyContacts: {
            siteManager: ramsData.siteManagerName,
            siteManagerPhone: ramsData.siteManagerPhone,
            firstAider: ramsData.firstAiderName,
            firstAiderPhone: ramsData.firstAiderPhone,
            safetyOfficer: ramsData.safetyOfficerName,
            safetyOfficerPhone: ramsData.safetyOfficerPhone,
            assemblyPoint: ramsData.assemblyPoint
          }
        };

    const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pdfMonkeyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: templateId,
          payload: payload,
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
    const documentId = pdfResponse.document.id;
    let downloadUrl = pdfResponse.document.download_url;
    let status = pdfResponse.document.status;
    
    // Poll for completion if still generating (include 'draft' status)
    if (status === 'draft' || status === 'pending' || status === 'generating') {
      const maxAttempts = 60;
      for (let i = 0; i < maxAttempts; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const statusResponse = await fetch(
          `https://api.pdfmonkey.io/api/v1/documents/${documentId}`,
          {
            headers: {
              'Authorization': `Bearer ${pdfMonkeyApiKey}`,
            }
          }
        );
        
        const statusData = await statusResponse.json();
        status = statusData.document.status;
        downloadUrl = statusData.document.download_url;
        
        if (status === 'success') {
          break;
        } else if (status === 'failure') {
          throw new Error('PDF generation failed');
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      documentId: documentId,
      downloadUrl: downloadUrl,
      status: status
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

function getRiskLevel(rating: number): string {
  if (rating <= 4) return 'Low';
  if (rating <= 9) return 'Medium';
  if (rating <= 16) return 'High';
  return 'Very High';
}

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
