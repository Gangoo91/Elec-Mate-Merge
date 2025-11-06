import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// PDF Monkey template ID for Health & Safety documents (same as RAMS)
const HEALTH_SAFETY_TEMPLATE_ID = '95DF938E-D857-4573-8F0C-3E4FD85D4A24';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { healthSafetyData, userId } = await req.json();
    const pdfMonkeyApiKey = Deno.env.get('PDF_MONKEY_API_KEY');

    console.log('Generating Health & Safety PDF with template:', HEALTH_SAFETY_TEMPLATE_ID);

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
      .eq('type', 'health_safety')
      .eq('is_active', true)
      .single();

    // Use custom template if available, otherwise use default
    const templateId = template?.pdf_monkey_template_id || HEALTH_SAFETY_TEMPLATE_ID;
    const payload = template?.field_mapping 
      ? applyFieldMapping(healthSafetyData, template.field_mapping)
      : {
          projectName: healthSafetyData.projectName || 'Untitled Project',
          location: healthSafetyData.location || 'Not specified',
          date: new Date().toISOString().split('T')[0],
          assessor: 'AI Health & Safety Advisor',
          projectType: healthSafetyData.workType || 'general',
          // Sort hazards by risk score (highest first)
          hazards: [...(healthSafetyData.hazards || [])].sort((a: any, b: any) => (b.riskScore || 0) - (a.riskScore || 0)).map((hazard: any) => ({
            hazard: hazard.hazard,
            likelihood: hazard.likelihood,
            severity: hazard.severity,
            riskScore: hazard.riskScore,
            riskLevel: hazard.riskLevel || getRiskLevel(hazard.riskScore),
            controlMeasures: hazard.controlMeasures || hazard.controlMeasure || 'Control measures to be determined on site',
            residualRisk: hazard.residualRisk,
            regulation: hazard.regulation || 'BS 7671:2018+A2:2022'
          })),
          // PPE requirements
          ppe: (healthSafetyData.ppe || []).map((p: any) => ({
            ppeType: p.ppeType,
            standard: p.standard,
            mandatory: p.mandatory,
            purpose: p.purpose
          })),
          // Emergency procedures
          emergencyProcedures: healthSafetyData.emergencyProcedures || [],
          // Additional notes
          notes: healthSafetyData.notes || '',
          // Emergency contacts (if provided)
          emergencyContacts: {
            siteManager: healthSafetyData.siteManagerName,
            siteManagerPhone: healthSafetyData.siteManagerPhone,
            firstAider: healthSafetyData.firstAiderName,
            firstAiderPhone: healthSafetyData.firstAiderPhone,
            safetyOfficer: healthSafetyData.safetyOfficerName,
            safetyOfficerPhone: healthSafetyData.safetyOfficerPhone,
            assemblyPoint: healthSafetyData.assemblyPoint
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
          status: "pending",
          payload: payload,
          meta: {
            _filename: `Health-Safety-${healthSafetyData.projectName?.replace(/[^a-z0-9]/gi, '_') || Date.now()}.pdf`
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
    
    // Poll for completion if still generating
    if (status === 'draft' || status === 'pending' || status === 'generating') {
      const maxAttempts = 60;
      for (let i = 0; i < maxAttempts; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log(`Polling attempt ${i + 1}/${maxAttempts}, current status: ${status}`);
        
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
          console.log('PDF generation completed successfully');
          break;
        } else if (status === 'failure') {
          throw new Error('PDF generation failed');
        }
      }
    }

    // Check if PDF generation completed successfully
    if (!downloadUrl || status !== 'success') {
      console.log('PDF generation timed out or incomplete', { status, downloadUrl });
      return new Response(JSON.stringify({
        success: false,
        useFallback: true,
        message: 'PDF generation timed out'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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
    console.error('Error in generate-health-safety-pdf function:', error);
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

function getRiskLevel(score: number): string {
  if (score <= 4) return 'Low';
  if (score <= 9) return 'Medium';
  if (score <= 16) return 'High';
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
