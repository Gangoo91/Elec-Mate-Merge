
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
            content: `You are an AI job matching specialist for UK electrical industry jobs. Analyse job listings and provide enhanced job objects with AI insights.

Return ONLY a valid JSON array with enhanced job objects. Do not include markdown formatting, code blocks, or any other text.

For each job, add these AI enhancements:
- relevanceScore: number (1-100)
- aiTags: string array of relevant skills/categories (max 5)
- skillsRequired: string array of key skills (max 6)
- experienceLevel: "entry" | "intermediate" | "senior" | "lead"
- salaryCompetitiveness: "low" | "average" | "high"
- careerProgression: brief string about career potential (max 100 chars)
- estimatedSalaryMin: number (if salary mentioned)
- estimatedSalaryMax: number (if salary mentioned)

Keep all original job fields and add AI enhancements. Return valid JSON only.`
          },
          {
            role: 'user',
            content: `Enhance these UK electrical jobs for search: "${searchQuery}"

User preferences: ${JSON.stringify(userPreferences || {})}

Jobs to enhance:
${JSON.stringify(jobs.slice(0, 12))}

Return enhanced jobs as valid JSON array only.`
          }
        ],
        temperature: 0.2,
        max_tokens: 4000,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }
    
    const aiData = await response.json();
    let enhancedJobs = jobs; // Fallback to original jobs
    
    try {
      const aiContent = aiData.choices[0].message.content;
      console.log('Raw AI Response:', aiContent);
      
      // Multiple cleaning strategies for robust parsing
      let cleanContent = aiContent.trim();
      
      // Remove markdown code blocks
      cleanContent = cleanContent.replace(/```json\s*/g, '').replace(/```\s*/g, '');
      
      // Remove any leading/trailing non-JSON content
      const jsonStart = cleanContent.indexOf('[');
      const jsonEnd = cleanContent.lastIndexOf(']') + 1;
      
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        cleanContent = cleanContent.substring(jsonStart, jsonEnd);
      }
      
      console.log('Cleaned content for parsing:', cleanContent.substring(0, 200) + '...');
      
      const parsedJobs = JSON.parse(cleanContent);
      
      if (Array.isArray(parsedJobs) && parsedJobs.length > 0) {
        enhancedJobs = parsedJobs;
        console.log(`AI enhanced ${enhancedJobs.length} jobs successfully`);
      } else {
        console.warn('AI returned invalid job array, using original jobs');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.log('Attempting fallback parsing...');
      
      // Fallback: try to extract any valid JSON array from the response
      try {
        const content = aiData.choices[0].message.content;
        const matches = content.match(/\[[\s\S]*\]/);
        if (matches) {
          const fallbackJobs = JSON.parse(matches[0]);
          if (Array.isArray(fallbackJobs)) {
            enhancedJobs = fallbackJobs;
            console.log(`Fallback parsing successful: ${enhancedJobs.length} jobs`);
          }
        }
      } catch (fallbackError) {
        console.error('Fallback parsing also failed:', fallbackError);
        // Continue with original jobs
      }
    }
    
    // Generate market insights
    const insights = {
      averageRelevance: enhancedJobs.reduce((sum, job) => sum + (job.relevanceScore || 75), 0) / enhancedJobs.length,
      topCategories: [...new Set(enhancedJobs.flatMap(job => job.aiTags || []))].slice(0, 6),
      salaryRange: {
        min: Math.min(...enhancedJobs.filter(j => j.estimatedSalaryMin).map(j => j.estimatedSalaryMin)) || 25000,
        max: Math.max(...enhancedJobs.filter(j => j.estimatedSalaryMax).map(j => j.estimatedSalaryMax)) || 65000
      },
      totalProcessed: jobs.length,
      marketTrends: [
        "High demand for 18th Edition qualified electricians",
        "Solar PV and renewable energy skills increasingly valuable",
        "EV charging infrastructure installations growing rapidly",
        "Smart home automation expertise in demand"
      ],
      demandAreas: ["London", "Manchester", "Birmingham", "Leeds", "Bristol", "Glasgow"]
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
      JSON.stringify({ 
        error: error.message,
        enhancedJobs: [],
        aiInsights: null
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
