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
    const { guideType, userProfile = {}, forceRefresh = false } = await req.json();
    
    console.log(`🔧 Processing guide request for: ${guideType}`);

    // Create Supabase client
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
    
    // Check cache first (unless force refresh is requested)
    if (!forceRefresh) {
      const { data: cachedGuide } = await supabase
        .from('tool_guide_cache')
        .select('*')
        .eq('guide_type', guideType)
        .gt('expires_at', new Date().toISOString())
        .single();
      
      if (cachedGuide) {
        console.log(`✅ Returning cached guide for ${guideType} (cached until ${cachedGuide.expires_at})`);
        
        // Include cache metadata in response
        return new Response(JSON.stringify({ 
          guide: cachedGuide.guide_data,
          cacheInfo: {
            lastRefreshed: cachedGuide.last_refreshed,
            expiresAt: cachedGuide.expires_at,
            nextRefresh: cachedGuide.refresh_scheduled_for,
            cacheVersion: cachedGuide.cache_version
          }
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    console.log(`🔧 Generating new AI guide for: ${guideType}`);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }
    
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
    const currentYear = new Date().getFullYear();
    const systemPrompt = `You are a professional electrical trade expert and tool advisor specialising in UK electrical installations and BS7671 18th Edition compliance. Generate comprehensive, practical buying guides for electricians for ${currentYear}. The current date is ${new Date().toISOString().split('T')[0]}.

    Focus on:
    - UK suppliers (Screwfix, CEF, Toolstation, etc.) with ${currentYear} pricing and availability
    - BS7671 18th Edition compliance requirements and latest updates
    - Mobile-first recommendations for van-based electricians
    - Real-world trade applications and current market conditions
    - Budget considerations and ROI for ${currentYear} market rates
    - Professional quality and durability standards for current products
    - Latest product releases and technological advances in ${currentYear}

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

    Include specific UK supplier recommendations with current ${currentYear} pricing estimates, and ensure all recommendations meet BS7671 requirements. Focus on practical, mobile electrician needs and latest market conditions for ${currentYear}.`;

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
        max_completion_tokens: 3000,
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

    // Cache the generated guide with Sunday-based expiration
    try {
      // Calculate next Sunday at 2 AM for cache expiration
      const { data: nextSunday } = await supabase.rpc('get_next_sunday_refresh');
      
      await supabase
        .from('tool_guide_cache')
        .upsert({
          guide_type: guideType,
          guide_data: guide,
          expires_at: nextSunday,
          refresh_scheduled_for: nextSunday,
          last_refreshed: new Date().toISOString(),
          cache_version: (forceRefresh ? 
            (await supabase.from('tool_guide_cache').select('cache_version').eq('guide_type', guideType).single()).data?.cache_version + 1 || 1 
            : 1),
          refresh_status: 'completed'
        }, {
          onConflict: 'guide_type'
        });
      console.log(`💾 Cached guide for ${guideType} until next Sunday (${nextSunday})`);
    } catch (cacheError) {
      console.error('Failed to cache guide:', cacheError);
      // Continue even if caching fails
    }

    return new Response(JSON.stringify({ guide }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating guide:', error);
    
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
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