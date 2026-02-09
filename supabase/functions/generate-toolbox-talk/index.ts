/**
 * Generate Toolbox Talk - AI Briefing Content Generator
 *
 * Generates professional toolbox talk/briefing content for electrical contractors.
 * Can generate from job details, hazards, or use a template as a starting point.
 */

import { serve } from '../_shared/deps.ts';
import { corsHeaders } from '../_shared/cors.ts';

const openAIApiKey = Deno.env.get('OpenAI API') || Deno.env.get('OPENAI_API_KEY');

interface GenerateRequest {
  // Job-based generation
  jobDescription?: string;
  siteType?: 'domestic' | 'commercial' | 'industrial';
  hazards?: string[];

  // Template-based generation
  templateId?: string;
  templateContent?: string;

  // Context
  location?: string;
  weather?: string;
  teamSize?: number;
  specialConsiderations?: string;

  // Duration preference
  targetDuration?: number; // minutes (5, 10, 15)
}

interface BriefingContent {
  title: string;
  introduction: string;
  keyHazards: Array<{
    hazard: string;
    whyItMatters: string;
    controlMeasure: string;
  }>;
  discussionPoints: string[];
  keyTakeaway: string;
  estimatedDuration: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const requestData: GenerateRequest = await req.json();
    const {
      jobDescription,
      siteType = 'domestic',
      hazards = [],
      templateContent,
      location,
      weather,
      teamSize,
      specialConsiderations,
      targetDuration = 10,
    } = requestData;

    // Validate we have something to generate from
    if (!jobDescription && !templateContent && hazards.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Please provide job description, hazards, or template content' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build context for the AI
    let contextInfo = '';
    if (jobDescription) {
      contextInfo += `\nJob Description: ${jobDescription}`;
    }
    if (siteType) {
      contextInfo += `\nSite Type: ${siteType}`;
    }
    if (hazards.length > 0) {
      contextInfo += `\nKnown Hazards: ${hazards.join(', ')}`;
    }
    if (location) {
      contextInfo += `\nLocation: ${location}`;
    }
    if (weather) {
      contextInfo += `\nWeather Conditions: ${weather}`;
    }
    if (teamSize) {
      contextInfo += `\nTeam Size: ${teamSize} workers`;
    }
    if (specialConsiderations) {
      contextInfo += `\nSpecial Considerations: ${specialConsiderations}`;
    }

    // System prompt for generating toolbox talks
    const systemPrompt = `You are an experienced UK electrical health and safety adviser.
Generate a professional toolbox talk/safety briefing for electrical contractors.

CRITICAL REQUIREMENTS:
- Use UK English throughout (analyse, colour, centre, minimise, metre)
- Reference UK standards: BS 7671:2018+A3:2024, HSE guidance, CDM 2015
- Keep content practical and actionable for site workers
- Target duration: ${targetDuration} minutes
- Focus on engagement - make it a discussion, not a lecture

${templateContent ? `BASE TEMPLATE (adapt and expand):\n${templateContent}\n` : ''}

CONTEXT FOR THIS BRIEFING:${contextInfo}

Generate a structured briefing with:
1. Brief introduction (why this topic matters TODAY)
2. 3-5 key hazards with why they matter and how to control them
3. 2-3 discussion questions to engage the team
4. One clear takeaway message

RESPONSE FORMAT (JSON):
{
  "title": "Clear, concise briefing title",
  "introduction": "2-3 sentences explaining why this matters today",
  "keyHazards": [
    {
      "hazard": "Specific hazard description",
      "whyItMatters": "Why workers should care (make it personal)",
      "controlMeasure": "Practical control with specific action"
    }
  ],
  "discussionPoints": [
    "Question to ask the team...",
    "Another engagement question..."
  ],
  "keyTakeaway": "One sentence the team should remember",
  "estimatedDuration": ${targetDuration}
}

Make it practical, engaging, and relevant to the work described.`;

    console.log('Generating toolbox talk content via OpenAI');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Generate a professional ${targetDuration}-minute toolbox talk briefing for this electrical work.\n\nMake it practical, engaging, and focused on keeping the team safe today.`,
          },
        ],
        max_completion_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      return new Response(
        JSON.stringify({
          error: `OpenAI API Error: ${errorData.error?.message || response.statusText}`,
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    console.log('OpenAI response received for toolbox talk');

    // Parse JSON response
    let briefingContent: BriefingContent;
    try {
      const jsonMatch =
        aiResponse.match(/```json\s*([\s\S]*?)\s*```/) || aiResponse.match(/{[\s\S]*}/);

      if (!jsonMatch) {
        throw new Error('No JSON structure found in AI response');
      }

      const jsonString = jsonMatch[1] || jsonMatch[0];
      briefingContent = JSON.parse(jsonString.trim());

      // Validate essential fields
      if (!briefingContent.title || !briefingContent.keyHazards) {
        throw new Error('Invalid briefing structure');
      }

      console.log('Successfully parsed toolbox talk content');
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);

      // Return raw response with error context
      return new Response(
        JSON.stringify({
          raw: aiResponse,
          error: 'Could not parse AI response as valid briefing structure',
          details: parseError instanceof Error ? parseError.message : 'Unknown parsing error',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Convert to HTML for the briefing editor
    const htmlContent = convertToHTML(briefingContent);

    return new Response(
      JSON.stringify({
        success: true,
        briefing: briefingContent,
        htmlContent,
        generatedAt: new Date().toISOString(),
        targetDuration,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-toolbox-talk function:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Convert structured briefing content to HTML for the TipTap editor
 */
function convertToHTML(briefing: BriefingContent): string {
  let html = '';

  // Introduction
  html += `<h2>Introduction</h2>\n`;
  html += `<p>${briefing.introduction}</p>\n\n`;

  // Key Hazards
  html += `<h2>Key Hazards</h2>\n`;
  briefing.keyHazards.forEach((hazard, index) => {
    html += `<h3>${index + 1}. ${hazard.hazard}</h3>\n`;
    html += `<p><strong>Why it matters:</strong> ${hazard.whyItMatters}</p>\n`;
    html += `<p><strong>Control:</strong> ${hazard.controlMeasure}</p>\n\n`;
  });

  // Discussion Points
  if (briefing.discussionPoints && briefing.discussionPoints.length > 0) {
    html += `<h2>Discussion Points</h2>\n`;
    html += `<ul>\n`;
    briefing.discussionPoints.forEach((point) => {
      html += `<li>${point}</li>\n`;
    });
    html += `</ul>\n\n`;
  }

  // Key Takeaway
  html += `<h2>Key Takeaway</h2>\n`;
  html += `<p><strong>${briefing.keyTakeaway}</strong></p>\n`;

  return html;
}
