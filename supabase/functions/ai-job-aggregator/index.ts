
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
            content: `You are an AI job matching specialist for UK electrical industry jobs. Analyse job listings and provide ONLY valid JSON with enhanced job objects. Do not include any markdown formatting, code blocks, or additional text - return only the JSON array.

For each job, add these AI enhancements:
- relevanceScore: number (1-100)
- aiTags: string array of relevant skills/categories
- skillsRequired: string array
- experienceLevel: "entry" | "intermediate" | "senior" | "lead"
- salaryCompetitiveness: "low" | "average" | "high"
- careerProgression: brief string about career potential
- estimatedSalaryMin: number (if salary mentioned)
- estimatedSalaryMax: number (if salary mentioned)

Return the enhanced jobs array as valid JSON only.`
          },
          {
            role: 'user',
            content: `Analyse these UK electrical jobs:
Search Query: ${searchQuery || 'electrical jobs'}
User Preferences: ${JSON.stringify(userPreferences || {})}
Jobs: ${JSON.stringify(jobs.slice(0, 15))}

Return enhanced job array as valid JSON only, no formatting or extra text.`
          }
        ],
        temperature: 0.2,
        max_tokens: 3000,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }
    
    const aiData = await response.json();
    let enhancedJobs = jobs; // Fallback to original jobs
    
    try {
      const aiContent = aiData.choices[0].message.content;
      console.log('AI Response:', aiContent);
      
      // Clean the response - remove markdown formatting if present
      const cleanContent = aiContent
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      const parsedJobs = JSON.parse(cleanContent);
      
      if (Array.isArray(parsedJobs) && parsedJobs.length > 0) {
        enhancedJobs = parsedJobs;
        console.log(`AI enhanced ${enhancedJobs.length} jobs successfully`);
      } else {
        console.warn('AI returned invalid job array, using original jobs');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.log('Raw AI content:', aiData.choices[0].message.content);
      // Continue with original jobs
    }
    
    // Calculate insights from enhanced jobs
    const insights = {
      averageRelevance: enhancedJobs.reduce((sum, job) => sum + (job.relevanceScore || 75), 0) / enhancedJobs.length,
      topCategories: [...new Set(enhancedJobs.flatMap(job => job.aiTags || []))].slice(0, 5),
      salaryRange: {
        min: Math.min(...enhancedJobs.filter(j => j.estimatedSalaryMin).map(j => j.estimatedSalaryMin)) || 25000,
        max: Math.max(...enhancedJobs.filter(j => j.estimatedSalaryMax).map(j => j.estimatedSalaryMax)) || 65000
      },
      totalProcessed: jobs.length,
      marketTrends: [
        "High demand for 18th Edition qualified electricians",
        "Solar PV installation skills increasingly valuable",
        "EV charging point installation growing rapidly"
      ],
      demandAreas: ["London", "Manchester", "Birmingham", "Leeds", "Bristol"]
    };
    
    return new Response(
      JSON.stringify({ 
        enhancedJobs,
        aiInsights: insights
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
