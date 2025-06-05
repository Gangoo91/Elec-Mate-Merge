
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

const openAIApiKey = Deno.env.get('OpenAI API');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { jobs, userPreferences, searchQuery } = await req.json();
    
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // AI-powered job enhancement and scoring
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an AI job matching specialist for UK electrical industry jobs. Analyze job listings and provide:
1. Relevance score (1-100) based on search query and user preferences
2. Enhanced job categories/tags
3. Skill requirements extraction
4. Experience level classification
5. Career progression insights
6. Salary competitiveness analysis

Return valid JSON with enhanced job objects.`
          },
          {
            role: 'user',
            content: `Analyze these electrical jobs:
Search Query: ${searchQuery || 'electrical jobs'}
User Preferences: ${JSON.stringify(userPreferences || {})}
Jobs: ${JSON.stringify(jobs.slice(0, 20))} // Limit for API efficiency

Please enhance each job with AI insights and return the enhanced job array.`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }
    
    const aiData = await response.json();
    const enhancedJobs = JSON.parse(aiData.choices[0].message.content);
    
    console.log(`AI enhanced ${enhancedJobs.length} jobs`);
    
    return new Response(
      JSON.stringify({ 
        enhancedJobs,
        totalProcessed: jobs.length,
        aiInsights: {
          averageRelevance: enhancedJobs.reduce((sum, job) => sum + (job.relevanceScore || 0), 0) / enhancedJobs.length,
          topCategories: [...new Set(enhancedJobs.flatMap(job => job.aiTags || []))].slice(0, 5),
          salaryRange: {
            min: Math.min(...enhancedJobs.filter(j => j.estimatedSalaryMin).map(j => j.estimatedSalaryMin)),
            max: Math.max(...enhancedJobs.filter(j => j.estimatedSalaryMax).map(j => j.estimatedSalaryMax))
          }
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in AI job aggregator:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
