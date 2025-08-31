import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { guideType, userProfile = {} } = await req.json();
    
    console.log(`🔧 Generating AI guide for: ${guideType}`);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create Supabase client to fetch live tool data
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
    
    // Get current tool data from Firecrawl scraper
    let liveToolData = [];
    try {
      const { data: tools } = await supabase
        .functions
        .invoke('firecrawl-tools-scraper');
      
      if (tools?.tools) {
        liveToolData = tools.tools.slice(0, 10); // Limit for prompt size
      }
    } catch (error) {
      console.log('Failed to fetch live tool data, proceeding without it:', error);
    }

    // Generate comprehensive guide using AI
    const systemPrompt = `You are a professional electrical trade expert and tool advisor specialising in UK electrical installations and BS7671 18th Edition compliance. Generate comprehensive, practical buying guides for electricians.

    Focus on:
    - UK suppliers (Screwfix, CEF, Toolstation, etc.)
    - BS7671 18th Edition compliance requirements
    - Mobile-first recommendations for van-based electricians
    - Real-world trade applications
    - Budget considerations and ROI
    - Professional quality and durability

    Return ONLY valid JSON in this exact structure:
    {
      "title": "Guide title",
      "summary": "Brief overview",
      "sections": [
        {
          "title": "Section name",
          "content": "Detailed content with practical advice",
          "recommendations": [
            {
              "tool": "Tool name",
              "price": "£XX-XX",
              "supplier": "Supplier name",
              "reason": "Why recommended",
              "compliance": "Relevant standards"
            }
          ]
        }
      ],
      "quickTips": ["Practical tip 1", "Practical tip 2"],
      "budgetBreakdown": {
        "starter": "£XX-XX",
        "professional": "£XX-XX",
        "premium": "£XX-XX"
      }
    }`;

    const userPrompt = `Generate a comprehensive buying guide for: ${guideType}

    User Profile: ${JSON.stringify(userProfile)}
    
    Current Market Data: ${JSON.stringify(liveToolData)}

    Include specific UK supplier recommendations, current pricing estimates, and ensure all recommendations meet BS7671 requirements. Focus on practical, mobile electrician needs.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 3000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiContent = data.choices[0].message.content;
    
    console.log('Raw AI response:', aiContent);

    // Parse the AI response
    let guide;
    try {
      guide = JSON.parse(aiContent);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Fallback response
      guide = {
        title: `${guideType} Buying Guide`,
        summary: 'Professional tool recommendations for UK electricians',
        sections: [
          {
            title: 'Essential Tools',
            content: 'AI-generated content temporarily unavailable. Please try again.',
            recommendations: []
          }
        ],
        quickTips: ['Prioritise quality over quantity', 'Check BS7671 compliance'],
        budgetBreakdown: {
          starter: '£50-150',
          professional: '£200-500',
          premium: '£500+'
        }
      };
    }

    console.log(`✅ Generated guide for ${guideType}`);

    return new Response(JSON.stringify({ guide }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating guide:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      guide: {
        title: 'Guide Generation Error',
        summary: 'Unable to generate guide at this time',
        sections: [],
        quickTips: [],
        budgetBreakdown: {}
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});