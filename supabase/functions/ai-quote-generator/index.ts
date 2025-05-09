
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

const openAIApiKey = Deno.env.get('OpenAI API') || Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if OpenAI API key is available
    if (!openAIApiKey) {
      console.error('OpenAI API key is not configured or not accessible');
      return new Response(
        JSON.stringify({ error: "OpenAI API key is not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const requestData = await req.json();
    const { 
      jobType, 
      propertyDetails, 
      clientRequirements, 
      templateType 
    } = requestData;

    if (!jobType) {
      return new Response(
        JSON.stringify({ error: "Job type is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create system prompt based on request type
    const systemMessage = `
      You are a professional electrical quote generator for UK electricians. 
      Generate detailed, accurate quotes for electrical work with the following characteristics:
      - Use UK electrical terminology and standards (BS 7671)
      - Include appropriate materials and labour estimates for the job type
      - Structure quotes with proper line items
      - Include relevant certification requirements
      - Use realistic UK pricing for both materials and labour
      - Format the response as a JSON object that can be easily parsed
      
      For a ${jobType} job, with the following details:
      Property: ${JSON.stringify(propertyDetails)}
      Requirements: ${clientRequirements || "Standard installation"}
      
      Generate a detailed quote with:
      1. A comprehensive scope of work
      2. Complete materials list with quantities and unit prices
      3. Labour requirements in days
      4. Any necessary certificates or compliance requirements
    `;

    console.log('Sending request to OpenAI API for quote generation');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: `Generate a professional electrical quote for ${jobType}.` }
        ],
        temperature: 0.2, // Lower temperature for more consistent responses
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API Error:', data.error || response.statusText);
      return new Response(
        JSON.stringify({ 
          error: `Error from OpenAI API: ${data.error?.message || response.statusText}`,
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (data.error) {
      console.error('OpenAI API Error:', data.error);
      return new Response(
        JSON.stringify({ error: "Error from OpenAI API: " + data.error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResponse = data.choices[0].message.content;
    console.log('OpenAI response received successfully');

    // Try to parse the AI response as JSON
    let parsedQuote;
    try {
      // Check if the response contains a JSON object
      const jsonMatch = aiResponse.match(/```json([\s\S]*?)```/) || 
                         aiResponse.match(/{[\s\S]*?}/);
      
      const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : aiResponse;
      parsedQuote = JSON.parse(jsonString.replace(/```json|```/g, '').trim());
    } catch (error) {
      console.error('Error parsing AI response as JSON:', error);
      
      // Return the raw AI response if parsing fails
      return new Response(
        JSON.stringify({ 
          raw: aiResponse,
          error: "Could not parse the AI response as structured data"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ quote: parsedQuote }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-quote-generator function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
