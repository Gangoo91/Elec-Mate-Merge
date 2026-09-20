import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a BS7671:2018+A3:2024 expert providing quality assurance peer review for qualified electrical inspectors.

CONTEXT: The inspector has already identified this as a fault and classified it. Your role is to verify their professional judgement using BS7671 regulations.

BS7671 CLASSIFICATION DEFINITIONS:
C1 - DANGER PRESENT (Immediate risk of injury or fire)
C2 - POTENTIALLY DANGEROUS (Urgent remedial action required)
C3 - IMPROVEMENT RECOMMENDED (Non-compliance, not immediately dangerous)
NO_DEFECT_VISIBLE: When photo shows compliant installation
PHOTO_UNCLEAR: When photo quality prevents proper assessment

TONE: Professional, respectful, regulation-focused.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("STEP 1: Request received");
    
    let body;
    try {
      body = await req.json();
      console.log("STEP 2: Body parsed successfully");
    } catch (parseError) {
      console.error("STEP 2 FAILED: Body parse error:", parseError);
      return new Response(JSON.stringify({ error: "Invalid JSON body", step: "parse" }), { 
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }
    
    const { photoUrl, observationContext } = body;
    console.log("STEP 3: photoUrl:", photoUrl?.substring(0, 100));
    
    if (!photoUrl) {
      console.error("STEP 3 FAILED: No photoUrl provided");
      return new Response(JSON.stringify({ error: "Photo URL is required", step: "validation" }), { 
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    // Use GEMINI_API_KEY (matching other functions)
    const GOOGLE_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GOOGLE_API_KEY) {
      console.error("STEP 4 FAILED: GEMINI_API_KEY not set");
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY not configured", step: "api_key" }), { 
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }
    console.log("STEP 4: API key found, length:", GOOGLE_API_KEY.length);

    let imageResponse;
    try {
      console.log("STEP 5: Fetching image from:", photoUrl);
      imageResponse = await fetch(photoUrl);
      console.log("STEP 5: Image fetch status:", imageResponse.status);
    } catch (fetchError) {
      console.error("STEP 5 FAILED: Image fetch error:", fetchError);
      return new Response(JSON.stringify({ error: `Failed to fetch image: ${fetchError}`, step: "image_fetch" }), { 
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }
    
    if (!imageResponse.ok) {
      console.error("STEP 5 FAILED: Image response not OK:", imageResponse.status);
      return new Response(JSON.stringify({ error: `Image fetch failed: ${imageResponse.status}`, step: "image_response" }), { 
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    let imageBase64;
    try {
      const arrayBuffer = await imageResponse.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      console.log("STEP 6: Image size:", uint8Array.length, "bytes");
      
      let binary = '';
      const chunkSize = 65536;
      for (let i = 0; i < uint8Array.length; i += chunkSize) {
        const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
        binary += String.fromCharCode(...chunk);
      }
      imageBase64 = btoa(binary);
      console.log("STEP 6: Base64 length:", imageBase64.length);
    } catch (encodeError) {
      console.error("STEP 6 FAILED: Base64 encode error:", encodeError);
      return new Response(JSON.stringify({ error: `Base64 encoding failed: ${encodeError}`, step: "base64" }), { 
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    const userPrompt = observationContext 
      ? `The inspector has classified this defect at ${observationContext.itemLocation} as **${observationContext.classification}**.
Their description: "${observationContext.description}"
${observationContext.recommendation ? `Their recommendation: "${observationContext.recommendation}"` : ''}
Do you AGREE or DISAGREE with the ${observationContext.classification} classification?`
      : `Analyze this electrical installation photo for any defects or non-compliance with BS7671:2018+A2:2024.`;

    const model = 'gemini-2.5-flash';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GOOGLE_API_KEY}`;
    
    let geminiResponse;
    try {
      console.log("STEP 7: Calling Gemini API");
      geminiResponse = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: "user", parts: [{ text: userPrompt }, { inlineData: { mimeType: "image/jpeg", data: imageBase64 } }] }],
          tools: [{
            functionDeclarations: [{
              name: "provide_assessment",
              description: "Provide structured QA assessment of electrical installation photo",
              parameters: {
                type: "object",
                properties: {
                  aiClassification: { type: "string", enum: ["C1", "C2", "C3", "NO_DEFECT_VISIBLE", "PHOTO_UNCLEAR"] },
                  confidence: { type: "number" },
                  qualityAssurance: {
                    type: "object",
                    properties: {
                      agreesWithInspector: { type: "boolean" },
                      feedback: { type: "string" },
                      suggestedClassification: { type: "string" },
                      reasonForChallenge: { type: "string" }
                    },
                    required: ["agreesWithInspector", "feedback"]
                  },
                  photoQuality: { type: "object", properties: { adequate: { type: "boolean" }, issues: { type: "array", items: { type: "string" } } }, required: ["adequate"] },
                  regulations: { type: "array", items: { type: "object", properties: { code: { type: "string" }, title: { type: "string" }, requirement: { type: "string" }, assessment: { type: "string" } } } },
                  observations: { type: "object", properties: { visibleInPhoto: { type: "array", items: { type: "string" } }, safetyFeatures: { type: "array", items: { type: "string" } }, concerns: { type: "array", items: { type: "string" } }, cannotVerify: { type: "array", items: { type: "string" } } } },
                  inspectorGuidance: { type: "object", properties: { message: { type: "string" }, additionalChecks: { type: "array", items: { type: "string" } }, needsMoreInfo: { type: "boolean" }, questionsToConsider: { type: "array", items: { type: "string" } } }, required: ["message"] }
                },
                required: ["aiClassification", "confidence", "qualityAssurance", "regulations", "observations", "inspectorGuidance", "photoQuality"]
              }
            }]
          }],
          toolConfig: { functionCallingConfig: { mode: "ANY", allowedFunctionNames: ["provide_assessment"] } }
        })
      });
      console.log("STEP 7: Gemini response status:", geminiResponse.status);
    } catch (geminiError) {
      console.error("STEP 7 FAILED: Gemini fetch error:", geminiError);
      return new Response(JSON.stringify({ error: `Gemini API call failed: ${geminiError}`, step: "gemini_fetch" }), { 
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("STEP 7 FAILED: Gemini API error:", geminiResponse.status, errorText);
      return new Response(JSON.stringify({ error: `Gemini API error: ${geminiResponse.status}`, details: errorText, step: "gemini_response" }), { 
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    let data;
    try {
      data = await geminiResponse.json();
      console.log("STEP 8: Gemini response parsed");
    } catch (parseError) {
      console.error("STEP 8 FAILED: Gemini response parse error:", parseError);
      return new Response(JSON.stringify({ error: `Failed to parse Gemini response: ${parseError}`, step: "gemini_parse" }), { 
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    const functionCall = data.candidates?.[0]?.content?.parts?.[0]?.functionCall;
    if (!functionCall || functionCall.name !== "provide_assessment") {
      console.error("STEP 9 FAILED: No function call in response");
      return new Response(JSON.stringify({ error: "No assessment in AI response", data: JSON.stringify(data).substring(0, 500), step: "function_call" }), { 
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    console.log("SUCCESS: Returning assessment");
    return new Response(JSON.stringify(functionCall.args), { 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });

  } catch (error) {
    console.error("UNCAUGHT ERROR:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error", step: "uncaught" }), { 
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });
  }
});