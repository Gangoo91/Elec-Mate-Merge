/**
 * Vision tools — AI photo analysis for electrical installations.
 *
 * Tools:
 *   - analyse_photo — Claude vision analysis of consumer units, installations, receipts
 *   - attach_photo_to_entity — Link a photo to a job, certificate, diary, project, quote, or invoice
 *   - get_entity_photos — Retrieve all photos linked to an entity
 */

import type { UserContext } from '../auth.js';
import { config } from '../config.js';

const VISION_SYSTEM_PROMPT = `You are an expert UK electrician analysing a photo. You have deep knowledge of BS 7671:2018+A2:2022 (18th Edition Wiring Regulations), all IET Guidance Notes, and UK electrical installation practice.

When analysing a consumer unit / fuse board:
- Identify the make and model (Hager, Wylex, MK, Schneider, Crabtree, etc.)
- Estimate the age based on design and style
- Count populated ways and identify device types (MCBs, RCBOs, RCDs)
- Identify the main switch (DP isolator, DP RCD, etc.) and its rating
- Check for SPD (Surge Protection Device) presence
- Note the RCD configuration (split-load, dual-RCD, RCBO board, etc.)
- Identify any visible defects: scorch marks, missing blanks, poor labelling, damaged cables
- Reference specific BS 7671 regulations for observations

When analysing an installation photo:
- Assess cable routing and containment
- Check labelling and identification
- Note any visible non-compliance
- Assess workmanship quality

When analysing a receipt:
- Extract supplier name, date, items, quantities, unit prices, total
- Identify the category: materials, tools, PPE, fuel, other

IMPORTANT CAVEATS:
- Always state "This is visual guidance only — always verify on site with instruments"
- Never give definitive pass/fail — only visual observations
- Use UK terminology (consumer unit not breaker panel, earth not ground)
- Reference regulations by number (e.g., Reg 411.3.3, Reg 443.4)

Return your analysis as structured JSON matching this schema:
{
  "analysis_type": "consumer_unit" | "installation" | "receipt" | "general",
  "summary": "Brief one-line summary",
  "details": {
    // For consumer_unit:
    "board_make": "string or null",
    "board_model": "string or null",
    "estimated_age": "string or null",
    "main_switch": "string or null",
    "total_ways": number or null,
    "populated_ways": number or null,
    "rcd_config": "string or null",
    "spd_present": boolean or null,
    "circuit_chart_visible": boolean or null,

    // For receipt:
    "supplier": "string",
    "date": "string",
    "items": [{ "description": "string", "quantity": number, "unit_price": number }],
    "total": number,
    "category": "materials" | "tools" | "ppe" | "fuel" | "other"
  },
  "observations": [
    {
      "severity": "C1" | "C2" | "C3" | "FI" | "info",
      "description": "What was observed",
      "regulation": "e.g. Reg 411.3.3",
      "recommendation": "What to do about it"
    }
  ],
  "caveat": "This is visual guidance only — always verify on site with instruments"
}`;

export async function analysePhoto(args: Record<string, unknown>, user: UserContext) {
  const imageUrl = typeof args.image_url === 'string' ? args.image_url : '';
  const context = typeof args.context === 'string' ? args.context : '';

  if (!imageUrl) {
    throw new Error('image_url is required');
  }

  if (!config.anthropicApiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured — vision analysis unavailable');
  }

  // Call Claude vision API
  const userPrompt = context
    ? `Analyse this photo. Additional context from the electrician: "${context}"`
    : 'Analyse this photo.';

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.anthropicApiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      system: VISION_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'url',
                url: imageUrl,
              },
            },
            {
              type: 'text',
              text: userPrompt,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Vision API error (${response.status}): ${errorText}`);
  }

  const result = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const textContent = result.content?.find((c) => c.type === 'text');
  const analysisText = textContent?.text || '';

  // Parse the JSON from Claude's response
  let analysis;
  try {
    // Extract JSON from markdown code blocks if present
    const jsonMatch = analysisText.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonStr = jsonMatch ? jsonMatch[1].trim() : analysisText.trim();
    analysis = JSON.parse(jsonStr);
  } catch {
    // If JSON parsing fails, return raw text as a general analysis
    analysis = {
      analysis_type: 'general',
      summary: 'Photo analysed (unstructured response)',
      details: {},
      observations: [],
      raw_analysis: analysisText,
      caveat: 'This is visual guidance only — always verify on site with instruments',
    };
  }

  // Build insert payload with optional linked entity columns
  const insertPayload: Record<string, unknown> = {
    user_id: user.userId,
    analysis_type: analysis.analysis_type || 'general',
    image_url: imageUrl,
    analysis_result: analysis.details || {},
    observations: analysis.observations || [],
    property_address: typeof args.property_address === 'string' ? args.property_address : null,
    ai_description: typeof analysis.summary === 'string' ? analysis.summary : null,
    tags: Array.isArray(args.tags) ? args.tags : [],
  };

  // Optional entity linking (when called from attach_photo_to_entity or directly)
  if (typeof args.linked_portfolio_id === 'string')
    insertPayload.linked_portfolio_id = args.linked_portfolio_id;
  if (typeof args.linked_diary_entry_id === 'string')
    insertPayload.linked_diary_entry_id = args.linked_diary_entry_id;
  if (typeof args.linked_project_id === 'string')
    insertPayload.linked_project_id = args.linked_project_id;
  if (typeof args.linked_quote_id === 'string')
    insertPayload.linked_quote_id = args.linked_quote_id;
  if (typeof args.linked_invoice_id === 'string')
    insertPayload.linked_invoice_id = args.linked_invoice_id;

  // Store analysis in photo_analyses table
  const supabase = user.supabase;
  const { data: insertedRow, error: insertError } = await supabase
    .from('photo_analyses')
    .insert(insertPayload)
    .select('id')
    .single();

  if (insertError) {
    console.error('Failed to store photo analysis:', insertError.message);
    // Don't throw — still return the analysis even if storage fails
  }

  return {
    ...analysis,
    photo_analysis_id: insertedRow?.id || null,
  };
}

/** Valid entity types that can have photos attached */
const ENTITY_LINK_COLUMNS: Record<string, string> = {
  job: 'linked_project_id', // jobs map to projects in our schema
  certificate: 'linked_project_id', // certs link via project
  site_diary: 'linked_diary_entry_id',
  portfolio: 'linked_portfolio_id',
  project: 'linked_project_id',
  quote: 'linked_quote_id',
  invoice: 'linked_invoice_id',
};

export async function attachPhotoToEntity(args: Record<string, unknown>, user: UserContext) {
  const imageUrl = typeof args.image_url === 'string' ? args.image_url : '';
  const entityType = typeof args.entity_type === 'string' ? args.entity_type : '';
  const entityId = typeof args.entity_id === 'string' ? args.entity_id : '';

  if (!imageUrl) throw new Error('image_url is required');
  if (!entityType || !ENTITY_LINK_COLUMNS[entityType]) {
    throw new Error(`entity_type must be one of: ${Object.keys(ENTITY_LINK_COLUMNS).join(', ')}`);
  }
  if (!entityId) throw new Error('entity_id is required');

  const linkColumn = ENTITY_LINK_COLUMNS[entityType];

  // Run analyse_photo with the entity link baked in
  const analysisArgs: Record<string, unknown> = {
    image_url: imageUrl,
    context: typeof args.description === 'string' ? args.description : undefined,
    property_address: typeof args.property_address === 'string' ? args.property_address : undefined,
    tags: Array.isArray(args.tags) ? args.tags : [],
    [linkColumn.replace('linked_', 'linked_')]: entityId,
  };

  const analysis = await analysePhoto(analysisArgs, user);

  const supabase = user.supabase;

  // If analyse_photo stored the row, update the link column (in case the column wasn't in the insert)
  if (analysis.photo_analysis_id) {
    await supabase
      .from('photo_analyses')
      .update({
        [linkColumn]: entityId,
        ai_description:
          typeof args.description === 'string' ? args.description : analysis.summary || null,
        tags: Array.isArray(args.tags) ? args.tags : [],
      })
      .eq('id', analysis.photo_analysis_id);
  }

  // For portfolios: also create portfolio_evidence_files entry
  if (entityType === 'portfolio' && analysis.photo_analysis_id) {
    await supabase
      .from('portfolio_evidence_files')
      .insert({
        portfolio_item_id: entityId,
        file_url: imageUrl,
        file_type: 'image',
        description: analysis.summary || 'Photo evidence',
      })
      .then(({ error }) => {
        if (error) console.error('Failed to create portfolio evidence file:', error.message);
      });
  }

  // For site diaries: append photo URL to the diary entry's photos array
  if (entityType === 'site_diary') {
    const { data: diary } = await supabase
      .from('site_diary_entries')
      .select('photos')
      .eq('id', entityId)
      .single();

    if (diary) {
      const existingPhotos = Array.isArray(diary.photos) ? diary.photos : [];
      await supabase
        .from('site_diary_entries')
        .update({ photos: [...existingPhotos, imageUrl] })
        .eq('id', entityId);
    }
  }

  return {
    photo_analysis_id: analysis.photo_analysis_id,
    entity_type: entityType,
    entity_id: entityId,
    ai_description: analysis.summary || null,
    analysis_type: analysis.analysis_type,
    observations: analysis.observations || [],
  };
}

export async function getEntityPhotos(args: Record<string, unknown>, user: UserContext) {
  const entityType = typeof args.entity_type === 'string' ? args.entity_type : '';
  const entityId = typeof args.entity_id === 'string' ? args.entity_id : '';

  if (!entityType || !ENTITY_LINK_COLUMNS[entityType]) {
    throw new Error(`entity_type must be one of: ${Object.keys(ENTITY_LINK_COLUMNS).join(', ')}`);
  }
  if (!entityId) throw new Error('entity_id is required');

  const linkColumn = ENTITY_LINK_COLUMNS[entityType];
  const supabase = user.supabase;

  const { data, error } = await supabase
    .from('photo_analyses')
    .select('id, image_url, analysis_type, ai_description, observations, tags, created_at')
    .eq(linkColumn, entityId)
    .eq('user_id', user.userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get entity photos: ${error.message}`);

  return {
    entity_type: entityType,
    entity_id: entityId,
    photos: (data || []).map((p) => ({
      id: p.id,
      image_url: p.image_url,
      analysis_type: p.analysis_type,
      ai_description: p.ai_description,
      observations: p.observations,
      tags: p.tags,
      created_at: p.created_at,
    })),
    total: (data || []).length,
  };
}
