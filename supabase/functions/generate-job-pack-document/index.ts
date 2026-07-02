import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { corsHeaders } from '../_shared/cors.ts';
import { callOpenAI } from '../_shared/ai-providers.ts';

const admin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

interface GenerateDocumentRequest {
  jobPackId: string;
  documentType: 'rams' | 'method_statement' | 'briefing_pack';
  jobData: {
    title: string;
    client: string;
    location: string;
    scope?: string;
    hazards?: string[];
    required_certifications?: string[];
  };
}

const DOCUMENT_PROMPTS: Record<string, string> = {
  rams: `You are a health and safety expert creating a Risk Assessment and Method Statement (RAMS) for an electrical contracting job in the UK.

Create a comprehensive RAMS document with the following sections:
1. Project Details
2. Scope of Works
3. Hazard Identification (list each hazard with risk rating)
4. Control Measures (for each hazard)
5. Emergency Procedures
6. PPE Requirements
7. Competency Requirements
8. Sign-off Section

Use UK health and safety terminology and reference relevant regulations (BS 7671, CDM 2015, etc).
Format the output as a professional document in markdown.`,

  method_statement: `You are an electrical contracting expert creating a detailed Method Statement for a job in the UK.

Create a step-by-step Method Statement with:
1. Project Overview
2. Pre-Work Checks
3. Equipment & Materials Required
4. Step-by-Step Work Procedure (numbered steps)
5. Quality Checks
6. Testing Procedures
7. Handover & Documentation
8. Waste Management

Reference UK electrical standards (BS 7671 18th Edition) where relevant.
Format the output as a professional document in markdown.`,

  briefing_pack: `You are creating a pre-job briefing pack for electrical workers in the UK.

Create a concise briefing document with:
1. Job Summary (what, where, when)
2. Key Safety Points
3. Site-Specific Hazards
4. Required PPE
5. Required Certifications/Cards
6. Emergency Contacts
7. Site Access Details
8. Key Contacts

Keep it clear and easy to read - this will be reviewed by workers on their phones.
Format the output as a professional document in markdown.`,
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Caller must be the employer who owns the job pack
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ success: false, error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const userClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );
    const {
      data: { user },
    } = await userClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { jobPackId, documentType, jobData }: GenerateDocumentRequest = await req.json();

    if (!jobPackId || !documentType || !jobData) {
      throw new Error('Missing required fields: jobPackId, documentType, jobData');
    }

    const { data: pack } = await admin
      .from('employer_job_packs')
      .select('id, employer_id')
      .eq('id', jobPackId)
      .single();
    if (!pack || pack.employer_id !== user.id) {
      return new Response(JSON.stringify({ success: false, error: 'Job pack not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = DOCUMENT_PROMPTS[documentType];
    if (!systemPrompt) {
      throw new Error(`Unknown document type: ${documentType}`);
    }

    const hazardsList = jobData.hazards?.length
      ? `\nIdentified Hazards: ${jobData.hazards.join(', ')}`
      : '';

    const certsList = jobData.required_certifications?.length
      ? `\nRequired Certifications: ${jobData.required_certifications.join(', ')}`
      : '';

    const userPrompt = `Please generate the document for the following job:

Job Title: ${jobData.title}
Client: ${jobData.client}
Location: ${jobData.location}
Scope of Works: ${jobData.scope || 'General electrical works'}${hazardsList}${certsList}

Generate a professional, comprehensive document suitable for a UK electrical contractor.`;

    console.log(`Generating ${documentType} for job pack ${jobPackId}`);

    const ai = await callOpenAI(
      {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 4000,
      },
      openAIApiKey
    );
    const generatedContent = ai.content;

    if (!generatedContent) {
      throw new Error('No content generated');
    }

    const documentTitle =
      documentType === 'rams'
        ? 'Risk Assessment & Method Statement'
        : documentType === 'method_statement'
          ? 'Method Statement'
          : 'Pre-Job Briefing Pack';

    const { error: insertError } = await admin.from('employer_job_pack_documents').insert({
      job_pack_id: jobPackId,
      title: documentTitle,
      document_type: documentType.toUpperCase(),
      description: generatedContent,
      generated_by: 'AI',
      is_required: true,
    });

    if (insertError) {
      console.error('Error saving document:', insertError);
      throw new Error(`Failed to save document: ${insertError.message}`);
    }

    const updateField = `${documentType}_generated`;
    const { error: updateError } = await admin
      .from('employer_job_packs')
      .update({ [updateField]: true })
      .eq('id', jobPackId);

    if (updateError) {
      console.error('Error updating job pack:', updateError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        documentType,
        content: generatedContent,
        message: `${documentTitle} generated successfully`,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error in generate-job-pack-document:', message);
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
