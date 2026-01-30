import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from '../_shared/deps.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// System prompt for educational tutor
const TUTOR_SYSTEM_PROMPT = `You are a 30-year veteran electrical training tutor specializing in City & Guilds 2365, EAL Diplomas, and BS 7671:2018+A3:2024 education.

CRITICAL OUTPUT REQUIREMENTS:
1. **PDF-Ready Format**: Your response will be converted to a professional learning assessment report PDF
2. **Portfolio Quality**: This must be something apprentices can show assessors and keep in their portfolio
3. **Curriculum Aligned**: Explicitly map content to City & Guilds / EAL learning outcomes
4. **Pedagogically Sound**: Use simple → technical progression, real-world examples, and active learning
5. **Exam Focused**: Include practice questions in exam paper format with model answers

YOUR ROLE:
- Identify learning gaps and provide targeted educational guidance
- Explain concepts using simple English THEN technical terminology
- Create exam-style practice questions with detailed model answers
- Review installation photos constructively (strengths → issues → fixes → regulations)
- Map learning to specific City & Guilds / EAL curriculum requirements

KNOWLEDGE BASE:
You have access to:
- City & Guilds 2365 Level 2 & 3 syllabus
- EAL Diploma curriculum requirements
- BS 7671:2018+A3:2024 full text
- Worked calculation examples (Ohm's Law, voltage drop, earth fault loop, etc.)
- Common exam questions and marking schemes

RESPONSE STRUCTURE:
Use the provided tool schema to structure your response with these sections:
1. **Concept Explanation**: Simple → Technical → Analogy → Misconceptions
2. **Key Points**: Bullet list of must-know facts
3. **Calculations**: Formula → Variables → Worked Example → Practice Question
4. **Exam Questions**: City & Guilds style with model answers
5. **Installation Critique** (if photo provided): Strengths → Issues → Fixes → Regulations
6. **Study Plan**: Strengths → Weaknesses → Recommended Activities
7. **Curriculum Alignment**: C&G/EAL learning outcome checklist
8. **BS 7671 References**: Relevant regulation table

TEACHING PHILOSOPHY:
- Start simple, build complexity gradually
- Use real-world examples apprentices will encounter
- Address common misconceptions explicitly
- Practice is essential - always include worked examples
- Positive reinforcement while identifying areas for growth

EXAMPLE OUTPUT STYLE:
Simple Explanation: "An RCD is like a safety net that catches electricity leaking where it shouldn't."
Technical Definition: "A residual current device monitors the current balance between live and neutral conductors, tripping within 30ms if imbalance exceeds 30mA."
Worked Example: "Given: 230V circuit, 32A load, 25m cable run. Find voltage drop. Step 1: mV/A/m = 18 (from Table 4D5)..."
Installation Critique Strength: "✓ Excellent use of cable clips at <400mm spacing - shows understanding of Reg 522.8.5."
Installation Critique Issue: "⚠ Earth sleeving missing on CPC. This breaches Reg 514.4.2. Fix: Apply green/yellow sleeving at all terminations."

Remember: This is educational guidance that helps apprentices pass exams and become competent electricians. Be encouraging but thorough.`;

// Tool schema for structured educational guidance
const TUTOR_TOOL_SCHEMA = {
  name: "provide_educational_guidance",
  description: "Provide comprehensive educational guidance in PDF-ready learning report format",
  parameters: {
    type: "object",
    properties: {
      response: {
        type: "string",
        description: "Comprehensive educational overview (300-400 words) in UK English. Explain the learning approach and educational context."
      },
      conceptExplanation: {
        type: "object",
        description: "Multi-level concept explanation",
        properties: {
          simpleExplanation: { type: "string", description: "Explain in plain English (2-3 sentences)" },
          technicalDefinition: { type: "string", description: "Formal technical definition using correct terminology" },
          realWorldAnalogy: { type: "string", description: "Relatable analogy or example" },
          commonMisconceptions: { 
            type: "array",
            items: { type: "string" },
            description: "Common mistakes or misunderstandings to avoid"
          }
        },
        required: ["simpleExplanation", "technicalDefinition", "realWorldAnalogy"]
      },
      keyPoints: {
        type: "array",
        description: "Essential facts and must-know points",
        items: {
          type: "object",
          properties: {
            point: { type: "string", description: "Key fact or concept" },
            why: { type: "string", description: "Why this matters (safety/compliance/practical)" },
            examRelevance: { type: "string", description: "How this appears in exams" }
          },
          required: ["point", "why"]
        }
      },
      calculations: {
        type: "object",
        description: "Calculation guidance if applicable to the topic",
        properties: {
          formula: { type: "string", description: "Mathematical formula" },
          variablesExplained: {
            type: "array",
            items: {
              type: "object",
              properties: {
                symbol: { type: "string", description: "Variable symbol" },
                meaning: { type: "string", description: "What it represents" },
                unit: { type: "string", description: "Unit of measurement" }
              },
              required: ["symbol", "meaning", "unit"]
            }
          },
          workedExample: {
            type: "object",
            properties: {
              scenario: { type: "string", description: "Problem statement" },
              givenValues: { 
                type: "array",
                items: { type: "string" },
                description: "What's given in the problem"
              },
              steps: { 
                type: "array",
                items: { type: "string" },
                description: "Step-by-step solution"
              },
              answer: { type: "string", description: "Final answer with units" }
            }
          },
          practiceQuestion: {
            type: "object",
            properties: {
              question: { type: "string", description: "Practice problem for student" },
              answer: { type: "string", description: "Correct answer with working" }
            }
          }
        }
      },
      examQuestions: {
        type: "array",
        description: "Exam-style practice questions with model answers",
        items: {
          type: "object",
          properties: {
            questionNumber: { type: "number", description: "Question number" },
            questionType: { type: "string", enum: ["multiple_choice", "short_answer", "calculation", "extended_response"], description: "Type of question" },
            marks: { type: "number", description: "Marks available" },
            question: { type: "string", description: "Question text" },
            options: { 
              type: "array",
              items: { type: "string" },
              description: "Options for multiple choice (if applicable)"
            },
            modelAnswer: { type: "string", description: "Complete model answer with marking points" },
            examinerTips: { type: "string", description: "Tips for answering this type of question" }
          },
          required: ["questionNumber", "questionType", "marks", "question", "modelAnswer"]
        }
      },
      installationCritique: {
        type: "object",
        description: "Installation photo review (if photo provided)",
        properties: {
          hasPhoto: { type: "boolean", description: "Whether a photo was provided" },
          overallAssessment: { type: "string", description: "Overall quality assessment" },
          strengths: { 
            type: "array",
            items: {
              type: "object",
              properties: {
                observation: { type: "string", description: "What's good" },
                regulation: { type: "string", description: "BS 7671 regulation it complies with" },
                whyGood: { type: "string", description: "Why this is good practice" }
              },
              required: ["observation", "whyGood"]
            }
          },
          issues: { 
            type: "array",
            items: {
              type: "object",
              properties: {
                issue: { type: "string", description: "What needs improvement" },
                severity: { type: "string", enum: ["critical", "important", "minor"], description: "How serious" },
                regulation: { type: "string", description: "BS 7671 regulation breached" },
                whyMatters: { type: "string", description: "Safety/compliance reason" },
                howToFix: { type: "string", description: "Step-by-step fix" }
              },
              required: ["issue", "severity", "whyMatters", "howToFix"]
            }
          },
          readyForAssessment: { type: "boolean", description: "Whether this would pass assessment" },
          recommendations: { 
            type: "array",
            items: { type: "string" },
            description: "Specific actions to take"
          }
        }
      },
      studyPlan: {
        type: "object",
        description: "Personalized study recommendations",
        properties: {
          strengths: { 
            type: "array",
            items: { type: "string" },
            description: "Areas where student shows understanding"
          },
          weaknesses: { 
            type: "array",
            items: { type: "string" },
            description: "Knowledge gaps identified"
          },
          recommendedActivities: { 
            type: "array",
            items: {
              type: "object",
              properties: {
                activity: { type: "string", description: "Study activity" },
                purpose: { type: "string", description: "What this will achieve" },
                timeEstimate: { type: "string", description: "How long it should take" }
              },
              required: ["activity", "purpose"]
            }
          },
          nextSteps: { 
            type: "array",
            items: { type: "string" },
            description: "Immediate next actions"
          }
        },
        required: ["strengths", "weaknesses", "recommendedActivities", "nextSteps"]
      },
      curriculumAlignment: {
        type: "array",
        description: "City & Guilds / EAL curriculum mapping",
        items: {
          type: "object",
          properties: {
            awarding_body: { type: "string", enum: ["City & Guilds", "EAL"], description: "Which awarding body" },
            qualification: { type: "string", description: "Qualification code (e.g., '2365-03')" },
            unit: { type: "string", description: "Unit code and name" },
            learningOutcome: { type: "string", description: "Learning outcome reference" },
            covered: { type: "boolean", description: "Whether this was covered in this session" },
            notes: { type: "string", description: "How this topic relates" }
          },
          required: ["awarding_body", "qualification", "learningOutcome", "covered"]
        }
      },
      bs7671References: {
        type: "array",
        description: "BS 7671 regulations referenced",
        items: {
          type: "object",
          properties: {
            regulation: { type: "string", description: "Regulation number" },
            title: { type: "string", description: "Regulation title/topic" },
            relevance: { type: "string", description: "Why it's relevant to this topic" },
            examFrequency: { type: "string", enum: ["very_common", "common", "occasional"], description: "How often this appears in exams" }
          },
          required: ["regulation", "title", "relevance"]
        }
      },
      furtherReading: {
        type: "array",
        description: "Additional resources for deeper learning",
        items: {
          type: "object",
          properties: {
            resource: { type: "string", description: "Resource name (book, article, video)" },
            type: { type: "string", enum: ["book", "guidance_note", "video", "online_resource"], description: "Type of resource" },
            why: { type: "string", description: "Why this is recommended" }
          },
          required: ["resource", "type", "why"]
        }
      }
    },
    required: [
      "response",
      "conceptExplanation",
      "keyPoints",
      "studyPlan",
      "curriculumAlignment",
      "bs7671References"
    ],
    additionalProperties: false
  }
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    console.log('📥 Tutor-v3 request:', JSON.stringify(requestBody, null, 2));

    const { query, qualificationLevel, topicArea, learningGoal, hasPhoto } = requestBody;

    if (!query) {
      throw new Error('Query is required');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get Gemini API key
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    // Expand query for better RAG retrieval
    const expandedQuery = `${query} ${topicArea || ''} ${qualificationLevel || ''} electrical education exam`;
    console.log('🔍 Expanded query:', expandedQuery);

    // Generate embedding for query - use OpenAI for this
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) throw new Error('OPENAI_API_KEY required for embeddings');
    
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: expandedQuery
      })
    });

    if (!embeddingResponse.ok) {
      throw new Error(`Embedding generation failed: ${embeddingResponse.statusText}`);
    }

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;

    // Perform hybrid search on tutor knowledge
    const { data: ragResults, error: ragError } = await supabase.rpc('search_tutor_hybrid', {
      query_text: expandedQuery,
      query_embedding: queryEmbedding,
      level_filter: qualificationLevel || null,
      match_count: 12
    });

    if (ragError) {
      console.error('❌ RAG search error:', ragError);
    }

    console.log(`📚 Retrieved ${ragResults?.length || 0} educational knowledge documents`);

    // Build context from RAG results
    const ragContext = ragResults && ragResults.length > 0
      ? ragResults.map((doc: any, idx: number) => 
          `[EDUCATIONAL DOC ${idx + 1}]\nTopic: ${doc.topic}\nSource: ${doc.source}\nLevel: ${doc.qualification_level || 'General'}\nContent: ${doc.content}\n`
        ).join('\n\n')
      : 'No specific educational content found. Use general BS 7671 and electrical principles.';

    // Construct user message with context
    const userMessage = `Qualification Level: ${qualificationLevel || 'Not specified'}
Topic Area: ${topicArea || 'General'}
Learning Goal: ${learningGoal || 'Understanding'}
Photo Provided: ${hasPhoto ? 'Yes' : 'No'}

Student Question: ${query}

KNOWLEDGE BASE CONTEXT:
${ragContext}

Provide comprehensive educational guidance following the tool schema structure. Be pedagogically sound and curriculum-aligned.`;

    // Call AI with tool calling
    console.log('🤖 Calling AI with tutor tool schema...');

    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{
            text: `${TUTOR_SYSTEM_PROMPT}\n\n${userMessage}`
          }]
        }],
        tools: [{
          functionDeclarations: [TUTOR_TOOL_SCHEMA]
        }],
        toolConfig: {
          functionCallingConfig: {
            mode: 'ANY',
            allowedFunctionNames: ['provide_educational_guidance']
          }
        },
        generationConfig: {
          temperature: 0.3
        }
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      throw new Error(`AI request failed: ${aiResponse.status} - ${errorText}`);
    }

    const aiData = await aiResponse.json();
    console.log('✅ AI response received');

    // Extract tool call result
    const functionCall = aiData.candidates?.[0]?.content?.parts?.find((p: any) => p.functionCall);
    if (!functionCall) {
      throw new Error('No function call in AI response');
    }

    const educationalGuidance = functionCall.functionCall.args;

    return new Response(
      JSON.stringify({
        success: true,
        result: educationalGuidance,
        response: educationalGuidance.response,
        metadata: {
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          ragResultsCount: ragResults?.length || 0,
          qualificationLevel,
          topicArea
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Tutor-v3 error:', error);
    await captureException(error, {
      functionName: 'tutor-v3',
      requestUrl: req.url,
      requestMethod: req.method
    });
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
