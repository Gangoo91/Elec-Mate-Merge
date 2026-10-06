import { identifyCaller, deny } from '../_shared/caller.ts';
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/*
 * ELE-1748 — was a local copy of the CORS headers that omitted
 * `x-request-id`, which the browser client sets on EVERY request. The
 * preflight refused it, so the browser never sent the real call and the
 * function was unreachable from the app with only a bare "Failed to fetch".
 *
 * Imported rather than corrected in place, so the next header the client
 * starts sending does not leave this file behind again.
 */
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Signed-in users (or internal callers) only: this runs paid PDF / AI work.
  // The anon key passes verify_jwt, so this check is the real gate (7 Oct 2026).
  {
    const caller = await identifyCaller(req);
    if (!caller) return deny(corsHeaders);
  }

  try {
    const { text, voice = 'brian', speed = 1.0 } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ELEVENLABS_API_KEY not configured');
    }

    const voiceIds: Record<string, string> = {
      brian: 'nPczCjzI2devNBz1zQrb',
      alice: 'Xb7hH8MSUJpSbSDYk0k2',
      charlie: 'IKne3meq5aSn9XLyUdCD',
    };

    const isCustomVoiceId = voice.length === 20 && /^[a-zA-Z0-9]+$/.test(voice);
    const voiceId = isCustomVoiceId ? voice : (voiceIds[voice] || voiceIds.brian);

    console.log(`Generating speech: "${text}" with voice ${voice}`);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_flash_v2_5',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);
      
      if (response.status === 401) {
        throw new Error('Invalid ElevenLabs API key');
      } else if (response.status === 402) {
        throw new Error('ElevenLabs credits exhausted. Please add credits to your account.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
      
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(audioBuffer))
    );

    console.log(`Speech generated successfully (${audioBuffer.byteLength} bytes)`);

    return new Response(
      JSON.stringify({ 
        audioContent: base64Audio,
        contentType: 'audio/mpeg'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in text-to-speech function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        fallbackToNative: true
      }),
      {
        status: error instanceof Error && error.message.includes('credits') ? 402 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});