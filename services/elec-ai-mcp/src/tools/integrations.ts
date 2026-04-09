/**
 * External integrations — ElevenLabs, Perplexity, PDF reading
 *
 * Tools:
 *  - speak_response → ElevenLabs TTS, returns audio URL (Mate sends voice note)
 *  - web_search     → Perplexity Sonar, real-time web search with citations
 *  - read_pdf       → Extract text from a PDF URL or base64
 */

import { createClient } from '@supabase/supabase-js';
import type { UserContext } from '../auth.js';

// ─── ElevenLabs ─────────────────────────────────────────────────────────────

/**
 * Convert text to speech via ElevenLabs.
 * Uploads the audio to Supabase storage so Mate can send it as a voice note.
 * Default voice: "Daniel" (British male, natural pacing — good for UK sparks)
 */
export async function speakResponse(args: Record<string, unknown>, user: UserContext) {
  const text = args.text as string;
  const voiceId = (args.voice_id as string) || 'onwK4e9ZLuTAKqWW03F9'; // Daniel — British male

  if (!text) return { error: 'text is required' };
  if (text.length > 2500)
    return { error: 'Text too long — keep under 2500 characters for voice notes' };

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return { error: 'ElevenLabs API key not configured' };

  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_turbo_v2_5',
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { error: `ElevenLabs error: ${res.status} — ${err}` };
    }

    const audioBuffer = await res.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');

    // Upload using service role client to bypass RLS — audio is not sensitive
    const supabaseUrl = process.env.SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co';
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) return { error: 'Storage not configured' };

    const adminClient = createClient(supabaseUrl, serviceKey);
    const fileName = `voice-${user.userId}-${Date.now()}.mp3`;

    const { error: uploadError } = await adminClient.storage
      .from('visual-uploads')
      .upload(fileName, Buffer.from(audioBuffer), {
        contentType: 'audio/mpeg',
        upsert: false,
      });

    if (uploadError) {
      return { error: `Audio storage failed: ${uploadError.message}` };
    }

    const { data: urlData } = adminClient.storage.from('visual-uploads').getPublicUrl(fileName);

    return {
      success: true,
      audio_url: urlData.publicUrl,
      character_count: text.length,
      voice: 'Daniel (British)',
      note: 'Send this URL as a voice note via MEDIA: prefix in your reply',
    };
  } catch {
    return { error: 'ElevenLabs TTS failed' };
  }
}

// ─── Perplexity ─────────────────────────────────────────────────────────────

/**
 * Real-time web search via Perplexity Sonar.
 * Returns an answer with citations — grounded in live web results.
 * Great for: regulation updates, material prices, product specs, news.
 */
export async function webSearch(args: Record<string, unknown>, _user: UserContext) {
  const query = args.query as string;
  const focus = (args.focus as string) || 'web'; // web | news | academic

  if (!query) return { error: 'query is required' };

  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) return { error: 'Perplexity API key not configured' };

  // sonar = real-time web search; sonar-pro = deeper multi-step reasoning (costs more)
  const model = 'sonar';

  try {
    const res = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant for UK electricians. Answer concisely with UK-specific information where relevant. Include specific numbers, prices, and references when available.',
          },
          { role: 'user', content: query },
        ],
        max_tokens: 1024,
        search_recency_filter: focus === 'news' ? 'week' : 'month',
        return_citations: true,
        return_images: false,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { error: `Perplexity error: ${res.status} — ${err}` };
    }

    const data = (await res.json()) as {
      choices: Array<{ message: { content: string } }>;
      citations?: string[];
    };

    const answer = data.choices?.[0]?.message?.content || '';
    const citations = data.citations || [];

    return {
      success: true,
      answer,
      citations: citations.slice(0, 5), // top 5 sources
      query,
      searched_at: new Date().toISOString(),
    };
  } catch {
    return { error: 'Web search failed' };
  }
}

// ─── PDF Reading ─────────────────────────────────────────────────────────────

/**
 * Extract text from a PDF — either from a URL or base64.
 * Useful for: client-sent spec docs, planning applications, compliance reports.
 * Uses built-in PDF parsing via binary stream reading.
 */
export async function readPdf(args: Record<string, unknown>, _user: UserContext) {
  const pdfUrl = args.pdf_url as string;
  const pdfBase64 = args.pdf_base64 as string;

  if (!pdfUrl && !pdfBase64) return { error: 'pdf_url or pdf_base64 is required' };

  try {
    let pdfBuffer: Buffer;

    if (pdfUrl) {
      const res = await fetch(pdfUrl);
      if (!res.ok) return { error: `Failed to download PDF: ${res.status}` };

      const contentType = res.headers.get('content-type') || '';
      const looksLikePdf = contentType.includes('pdf') || pdfUrl.toLowerCase().endsWith('.pdf');
      if (!looksLikePdf) {
        return {
          error: `URL does not appear to be a PDF (content-type: ${contentType || 'unknown'}). Make sure you're sending a direct link to a .pdf file.`,
        };
      }

      pdfBuffer = Buffer.from(await res.arrayBuffer());
    } else {
      const raw = pdfBase64.replace(/^data:[^;]+;base64,/, '');
      pdfBuffer = Buffer.from(raw, 'base64');
    }

    // Basic PDF text extraction — scan for readable text between stream markers
    // Works for most text-based PDFs without needing pdfjs
    const pdfString = pdfBuffer.toString('latin1');

    // Extract text from PDF content streams
    const textSegments: string[] = [];

    // Find BT...ET blocks (PDF text blocks)
    const btEtRegex = /BT([\s\S]*?)ET/g;
    let match: RegExpExecArray | null;

    while ((match = btEtRegex.exec(pdfString)) !== null) {
      const block = match[1];
      // Extract text from Tj, TJ, and ' operators
      const tjRegex = /\(([^)]*)\)\s*(?:Tj|'|")/g;
      const tjArrayRegex = /\[([^\]]*)\]\s*TJ/g;

      let textMatch: RegExpExecArray | null;
      while ((textMatch = tjRegex.exec(block)) !== null) {
        const text = textMatch[1]
          .replace(/\\n/g, '\n')
          .replace(/\\r/g, '\r')
          .replace(/\\t/g, '\t')
          .replace(/\\\(/g, '(')
          .replace(/\\\)/g, ')')
          .replace(/\\\\/g, '\\');
        if (text.trim()) textSegments.push(text);
      }

      while ((textMatch = tjArrayRegex.exec(block)) !== null) {
        const arrayContent = textMatch[1];
        const innerTextRegex = /\(([^)]*)\)/g;
        let innerMatch: RegExpExecArray | null;
        while ((innerMatch = innerTextRegex.exec(arrayContent)) !== null) {
          if (innerMatch[1].trim()) textSegments.push(innerMatch[1]);
        }
      }
    }

    // Count pages (count /Page objects)
    const pageCount = (pdfString.match(/\/Type\s*\/Page\b/g) || []).length;

    const extractedText = textSegments.join(' ').replace(/\s+/g, ' ').trim();

    if (!extractedText) {
      return {
        success: false,
        error:
          'Could not extract text — PDF may be image-based (scanned). Try analyse_photo for scanned documents.',
        page_count: pageCount,
        size_kb: Math.round(pdfBuffer.length / 1024),
      };
    }

    // Truncate if very large
    const maxChars = 8000;
    const truncated = extractedText.length > maxChars;

    return {
      success: true,
      text: truncated
        ? extractedText.slice(0, maxChars) + '\n\n[... truncated — document is longer]'
        : extractedText,
      page_count: pageCount || 'unknown',
      char_count: extractedText.length,
      size_kb: Math.round(pdfBuffer.length / 1024),
      truncated,
    };
  } catch (err) {
    return { error: `PDF reading failed: ${err instanceof Error ? err.message : 'unknown error'}` };
  }
}
