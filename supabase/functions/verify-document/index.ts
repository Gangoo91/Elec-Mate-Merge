import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

/**
 * verify-document Edge Function
 *
 * Uses AI Vision to extract and verify information from uploaded documents
 * for Elec-ID credential verification.
 *
 * Supported document types:
 * - ecs_card: ECS (Electrotechnical Certification Scheme) cards
 * - qualification: City & Guilds, NVQ certificates
 * - training: Course completion certificates
 * - cscs: CSCS cards
 * - driving_licence: UK driving licences
 * - insurance: Insurance documents
 */

interface VerificationRequest {
  fileUrl: string;
  documentType: string;
  documentName: string;
  issuingBody?: string;
  documentNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  profileId: string;
}

interface ExtractedData {
  holderName?: string;
  cardType?: string;
  cardNumber?: string;
  certificateNumber?: string;
  licenceNumber?: string;
  registrationNumber?: string;
  expiryDate?: string;
  issueDate?: string;
  qualificationName?: string;
  qualificationLevel?: string;
  issuingBody?: string;
  grade?: string;
  courseName?: string;
  provider?: string;
  policyNumber?: string;
  coverageAmount?: string;
  [key: string]: string | undefined;
}

interface ExtractionConfidence {
  [key: string]: number;
}

interface VerificationResult {
  status: "verified" | "needs_review" | "rejected";
  confidence: number;
  extractedData: ExtractedData;
  extractionConfidence: ExtractionConfidence;
  rejectionCode?: string;
  rejectionReason?: string;
  suggestions?: string[];
  rawText?: string;
}

// Document type specific prompts for better extraction
const DOCUMENT_PROMPTS: Record<string, string> = {
  ecs_card: `You are analyzing a UK ECS (Electrotechnical Certification Scheme) card. These cards are issued by JIB and prove electrical competence.

Extract the following fields:
- holderName: Full name of the card holder
- cardType: The card color/type (Gold, Blue, Red, Green, Yellow, White, Black, Provisional)
- cardNumber: The unique card number (usually starts with letters followed by numbers)
- expiryDate: Expiry date in YYYY-MM-DD format
- issuingBody: Should be "JIB" or "Joint Industry Board"
- qualificationLevel: Any qualification level shown (e.g., "Installation Electrician", "Approved Electrician")

ECS Card colors indicate:
- GOLD: Approved Electrician / Technician (highest level)
- BLUE: Installation Electrician
- RED: Electrician's Mate
- GREEN: Trainee/Apprentice
- YELLOW: Provisional (awaiting full card)
- WHITE: Electrical Labourer
- BLACK: Manager/Supervisor`,

  qualification: `You are analyzing a UK electrical qualification certificate. Common issuers include City & Guilds, EAL, and NICEIC.

Extract the following fields:
- holderName: Full name of the certificate holder
- qualificationName: Full title of the qualification (e.g., "Level 3 Diploma in Electrical Installation")
- qualificationLevel: Level number (1-7) if shown
- certificateNumber: Unique certificate/registration number
- issuingBody: Organization that issued (City & Guilds, EAL, NICEIC, etc.)
- issueDate: Date of issue in YYYY-MM-DD format
- grade: Grade if shown (Pass, Merit, Distinction)

Common UK electrical qualifications:
- Level 2/3 Diploma in Electrical Installation (2365/2357)
- Level 3 Award in Requirements for Electrical Installations (2382)
- Level 3 Award in Initial and Periodic Inspection and Testing (2391)
- AM2 Assessment
- NVQ Level 3 in Electrical Installation`,

  training: `You are analyzing a training completion certificate.

Extract the following fields:
- holderName: Name of the person who completed the training
- courseName: Full name of the course or training
- provider: Training provider name
- certificateNumber: Certificate or completion number if present
- issueDate: Completion date in YYYY-MM-DD format
- expiryDate: Expiry date if applicable (some training expires, e.g., 18th Edition expires after 3 years)

Common electrical training certificates:
- 18th Edition Wiring Regulations (BS 7671)
- PAT Testing
- Safe Isolation
- Working at Heights
- First Aid at Work`,

  cscs: `You are analyzing a UK CSCS (Construction Skills Certification Scheme) card.

Extract the following fields:
- holderName: Full name on the card
- cardType: Card color/type (Blue, Gold, Black, Green, Red, White)
- cardNumber: CSCS card number
- expiryDate: Expiry date in YYYY-MM-DD format
- qualificationLevel: NVQ level if shown
- issuingBody: "CSCS"

CSCS Card types:
- BLUE: Skilled Worker (holds NVQ Level 2)
- GOLD: Advanced Craft/Supervisory (NVQ Level 3)
- BLACK: Manager (NVQ Level 4-7)
- GREEN: Labourer/Trainee
- RED: Trainee/Apprentice
- WHITE: Construction Related Occupation`,

  driving_licence: `You are analyzing a UK driving licence.

Extract the following fields:
- holderName: Full name (surname and first names)
- licenceNumber: The driver number (16 characters)
- expiryDate: Photo card expiry date in YYYY-MM-DD format
- issueDate: Issue date if visible in YYYY-MM-DD format

Note: Only extract information visible on the front of the licence. The licence number format is typically: SURNA123456AB1CD`,

  insurance: `You are analyzing an insurance document (typically public liability or professional indemnity).

Extract the following fields:
- holderName: Name of the insured person/company
- policyNumber: Insurance policy number
- issuingBody: Insurance provider name
- expiryDate: Policy expiry date in YYYY-MM-DD format
- issueDate: Policy start date in YYYY-MM-DD format
- coverageAmount: Coverage amount if shown (e.g., "£2,000,000")

Look for:
- Certificate of Insurance
- Public Liability coverage
- Professional Indemnity coverage
- Employers Liability (if applicable)`
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: VerificationRequest = await req.json();
    const { fileUrl, documentType, documentName, profileId, issuingBody, documentNumber, issueDate, expiryDate } = body;

    if (!fileUrl || !documentType || !profileId) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields: fileUrl, documentType, profileId',
          status: 'rejected',
          confidence: 0
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAiKey = Deno.env.get('OPENAI_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log(`🔍 Document Verification - Type: ${documentType}`);
    console.log(`📄 File URL: ${fileUrl}`);
    console.log(`👤 Profile ID: ${profileId}`);

    // Fetch the image and convert to base64
    console.log('⬇️ Fetching document image...');
    const imageResponse = await fetch(fileUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch document: ${imageResponse.status}`);
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));

    // Determine MIME type from URL or default to jpeg
    const mimeType = fileUrl.toLowerCase().includes('.png') ? 'image/png' :
                     fileUrl.toLowerCase().includes('.pdf') ? 'application/pdf' :
                     'image/jpeg';

    console.log(`📐 Image size: ${imageBuffer.byteLength} bytes`);

    // Get document-specific prompt or use generic
    const documentPrompt = DOCUMENT_PROMPTS[documentType] || `You are analyzing a document. Extract all relevant identifying information including names, numbers, dates, and issuing organizations.`;

    // Build the analysis prompt
    const systemPrompt = `${documentPrompt}

CRITICAL INSTRUCTIONS:
1. Extract ALL visible text fields accurately
2. Return dates in YYYY-MM-DD format
3. For confidence scores, use:
   - 0.95-1.0: Text is crystal clear and unambiguous
   - 0.8-0.95: Text is readable but may have minor uncertainty
   - 0.6-0.8: Text is partially obscured or unclear
   - Below 0.6: Unable to read reliably

4. Verification status rules:
   - "verified": Overall confidence >= 0.8 AND all critical fields extracted
   - "needs_review": Confidence 0.5-0.8 OR some fields unclear
   - "rejected": Unable to read document OR not the expected document type

5. If the image is blurry, upside down, or not the expected document type, reject it with helpful suggestions.

Respond with ONLY valid JSON in this exact format:
{
  "status": "verified|needs_review|rejected",
  "confidence": 0.0-1.0,
  "extractedData": {
    "holderName": "value or null",
    "cardType": "value or null",
    "cardNumber": "value or null",
    "certificateNumber": "value or null",
    "expiryDate": "YYYY-MM-DD or null",
    "issueDate": "YYYY-MM-DD or null",
    "qualificationName": "value or null",
    "issuingBody": "value or null"
  },
  "extractionConfidence": {
    "holderName": 0.0-1.0,
    "cardType": 0.0-1.0,
    "cardNumber": 0.0-1.0
  },
  "rejectionReason": "reason if rejected, null otherwise",
  "suggestions": ["helpful suggestion 1", "suggestion 2"]
}`;

    // Call OpenAI Vision API
    console.log('🤖 Calling Vision AI for document analysis...');
    const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Please analyze this ${documentType.replace('_', ' ')} document and extract all relevant information. The user provided document name: "${documentName}"${issuingBody ? `, issuing body: "${issuingBody}"` : ''}${documentNumber ? `, document number: "${documentNumber}"` : ''}.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        max_tokens: 1500,
        temperature: 0.1
      }),
    });

    const visionData = await visionResponse.json();

    if (!visionResponse.ok) {
      console.error('Vision API error:', visionData);
      throw new Error(`Vision API error: ${visionData.error?.message || 'Unknown error'}`);
    }

    const rawContent = visionData.choices[0].message.content;
    console.log('📝 Raw AI response:', rawContent.substring(0, 500));

    // Parse the JSON response
    let result: VerificationResult;
    try {
      // Clean up the response - remove markdown code blocks if present
      const cleanedContent = rawContent
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      result = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      result = {
        status: 'needs_review',
        confidence: 0.5,
        extractedData: {},
        extractionConfidence: {},
        suggestions: ['AI response parsing failed. Please try uploading again or contact support.']
      };
    }

    // Merge user-provided data with extracted data (user data takes precedence if provided)
    if (issuingBody && !result.extractedData.issuingBody) {
      result.extractedData.issuingBody = issuingBody;
      result.extractionConfidence.issuingBody = 1.0;
    }
    if (documentNumber) {
      if (!result.extractedData.cardNumber && !result.extractedData.certificateNumber) {
        result.extractedData.cardNumber = documentNumber;
        result.extractionConfidence.cardNumber = 1.0;
      }
    }
    if (issueDate && !result.extractedData.issueDate) {
      result.extractedData.issueDate = issueDate;
      result.extractionConfidence.issueDate = 1.0;
    }
    if (expiryDate && !result.extractedData.expiryDate) {
      result.extractedData.expiryDate = expiryDate;
      result.extractionConfidence.expiryDate = 1.0;
    }

    console.log(`✅ Verification complete - Status: ${result.status}, Confidence: ${result.confidence}`);

    // Update the document record in the database
    const { error: updateError } = await supabase
      .from('elec_id_documents')
      .update({
        verification_status: result.status === 'verified' ? 'verified' :
                            result.status === 'needs_review' ? 'pending' : 'rejected',
        verification_confidence: result.confidence,
        extracted_data: result.extractedData,
        extraction_confidence: result.extractionConfidence,
        verified_at: result.status === 'verified' ? new Date().toISOString() : null,
        verification_method: 'ai_vision',
        rejection_reason: result.rejectionReason || null,
        updated_at: new Date().toISOString()
      })
      .eq('profile_id', profileId)
      .eq('file_url', fileUrl);

    if (updateError) {
      console.error('Database update error:', updateError);
      // Don't fail the request, just log the error
    }

    // If verified, update the profile with extracted ECS card info
    if (result.status === 'verified' && documentType === 'ecs_card') {
      const { error: profileError } = await supabase
        .from('employer_elec_id_profiles')
        .update({
          ecs_card_type: result.extractedData.cardType || null,
          ecs_card_number: result.extractedData.cardNumber || null,
          ecs_expiry_date: result.extractedData.expiryDate || null,
          is_verified: true,
          verified_at: new Date().toISOString(),
          verification_tier: 'verified',
          tier_updated_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', profileId);

      if (profileError) {
        console.error('Profile update error:', profileError);
      } else {
        console.log('✅ Profile updated with ECS card verification');
      }
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in verify-document:', error);
    return new Response(
      JSON.stringify({
        status: 'rejected',
        confidence: 0,
        extractedData: {},
        extractionConfidence: {},
        rejectionReason: error instanceof Error ? error.message : 'Unknown error occurred',
        suggestions: ['Please try uploading the document again', 'Ensure the image is clear and well-lit']
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
