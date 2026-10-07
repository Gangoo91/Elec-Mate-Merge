/**
 * transcribe-evidence-media — server transcription of an observation or
 * professional-discussion recording (or a video) already in portfolio-evidence.
 *
 * On-device transcription (Web Speech) is missing in Firefox and patchy on
 * some phones; this is the fallback the observation sheet offers as
 * "Transcribe".
 *
 * POST { path: '<learner uid>/observations/….webm', observation_id?: uuid }
 *  - caller: a signed-in user who is the learner (own folder) or staff allowed
 *    to assess that learner (public._can_assess) — checked in SQL by
 *    begin_media_transcription, which also rate-limits (20/hour, 60/day) and
 *    logs the request in media_transcriptions (no transcript text kept there)
 *  - size: checked against the stored object (max 100 MB)
 *  - provider: OpenAI gpt-4o-transcribe for files up to 24 MB in a format it
 *    takes; Gemini (File API) for larger files and .mov video
 *  - with observation_id: the text is appended to that DRAFT observation's
 *    transcript (append_observation_transcript; staff only, never once sent)
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller, deny } from '../_shared/caller.ts';

const BUCKET = 'portfolio-evidence';
const MAX_BYTES = 100 * 1024 * 1024;
const OPENAI_MAX_BYTES = 24 * 1024 * 1024;
const OPENAI_EXT = new Set(['mp3', 'mp4', 'm4a', 'mpeg', 'mpga', 'wav', 'webm', 'ogg', 'flac', 'aac']);
const MEDIA_EXT: Record<string, string> = {
  webm: 'audio/webm', ogg: 'audio/ogg', mp3: 'audio/mpeg', mpeg: 'audio/mpeg', mpga: 'audio/mpeg',
  m4a: 'audio/mp4', aac: 'audio/aac', wav: 'audio/wav', flac: 'audio/flac',
  mp4: 'video/mp4', mov: 'video/quicktime',
};
const PATH_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/[A-Za-z0-9._\-/]{1,300}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

async function openaiTranscribe(blob: Blob, filename: string, key: string): Promise<string> {
  for (const model of ['gpt-4o-transcribe', 'whisper-1']) {
    const form = new FormData();
    form.append('file', blob, filename);
    form.append('model', model);
    form.append('language', 'en');
    form.append('response_format', 'text');
    form.append(
      'prompt',
      'A UK electrical apprentice and their assessor. Terms: BS 7671, RCD, RCBO, MCB, CPC, R1+R2, Zs, Ze, insulation resistance, consumer unit, isolation, EICR, EIC.'
    );
    const r = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}` },
      body: form,
    });
    if (r.ok) return (await r.text()).trim();
    const detail = (await r.text()).slice(0, 300);
    console.warn(`openai ${model} ${r.status}: ${detail}`);
    if (r.status !== 400 && r.status !== 404) throw new Error(`transcription service ${r.status}`);
  }
  throw new Error('transcription service could not read that file');
}

async function geminiTranscribe(
  stream: ReadableStream<Uint8Array>, bytes: number, mime: string, key: string
): Promise<string> {
  const base = 'https://generativelanguage.googleapis.com';
  const start = await fetch(`${base}/upload/v1beta/files?key=${key}`, {
    method: 'POST',
    headers: {
      'X-Goog-Upload-Protocol': 'resumable',
      'X-Goog-Upload-Command': 'start',
      'X-Goog-Upload-Header-Content-Length': String(bytes),
      'X-Goog-Upload-Header-Content-Type': mime,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ file: { display_name: 'evidence-media' } }),
  });
  const uploadUrl = start.headers.get('x-goog-upload-url');
  if (!start.ok || !uploadUrl) throw new Error(`transcription upload start ${start.status}`);
  const up = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Length': String(bytes),
      'X-Goog-Upload-Offset': '0',
      'X-Goog-Upload-Command': 'upload, finalize',
    },
    body: stream,
  });
  if (!up.ok) throw new Error(`transcription upload ${up.status}`);
  let file = ((await up.json()) as { file: { name: string; uri: string; state: string } }).file;
  try {
    const deadline = Date.now() + 100_000;
    while (file.state === 'PROCESSING' && Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 3000));
      const g = await fetch(`${base}/v1beta/${file.name}?key=${key}`);
      if (g.ok) file = (await g.json()) as typeof file;
    }
    if (file.state !== 'ACTIVE') throw new Error('the file took too long to process');
    const r = await fetch(`${base}/v1beta/models/gemini-3.5-flash:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [
            { file_data: { mime_type: mime, file_uri: file.uri } },
            {
              text:
                'Transcribe the speech in this recording word for word, in UK English. ' +
                'It is usually an electrical apprentice talking with their assessor. ' +
                'Start a new paragraph when the speaker changes. Do not summarise, do not add ' +
                'anything that was not said, and do not describe the picture. Output only the ' +
                'transcript. If nobody speaks, output exactly: [no speech]',
            },
          ],
        }],
        generationConfig: { temperature: 0 },
      }),
    });
    if (!r.ok) throw new Error(`transcription service ${r.status}`);
    const out = (await r.json()) as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    return (out.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? '').join('').trim();
  } finally {
    await fetch(`${base}/v1beta/${file.name}?key=${key}`, { method: 'DELETE' }).catch(() => undefined);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);

  const caller = await identifyCaller(req);
  if (!caller || caller.kind !== 'user') return deny(corsHeaders, 401, 'Sign in first');

  let body: { path?: string; observation_id?: string | null };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Bad request' }, 400);
  }
  const path = String(body.path ?? '').trim();
  const observationId = body.observation_id ? String(body.observation_id) : null;
  if (!PATH_RE.test(path) || path.includes('..')) return json({ error: 'Bad file path' }, 400);
  if (observationId && !UUID_RE.test(observationId)) return json({ error: 'Bad observation' }, 400);

  const name = path.split('/').pop() ?? '';
  const ext = (name.match(/\.([a-z0-9]+)$/i)?.[1] ?? '').toLowerCase();
  if (!MEDIA_EXT[ext]) return json({ error: 'Only recordings and videos can be transcribed' }, 400);

  const url = Deno.env.get('SUPABASE_URL')!;
  const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
  const asUser = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
    auth: { persistSession: false },
  });

  // Size and type from the stored object, never from the request.
  const dir = path.slice(0, path.lastIndexOf('/'));
  const { data: listed, error: listErr } = await admin.storage.from(BUCKET).list(dir, { search: name, limit: 10 });
  const obj = (listed ?? []).find((o) => o.name === name);
  if (listErr || !obj) return json({ error: 'File not found' }, 404);
  const bytes = Number((obj.metadata as { size?: number } | null)?.size ?? 0);
  const mime = String((obj.metadata as { mimetype?: string } | null)?.mimetype ?? MEDIA_EXT[ext]).split(';')[0];
  if (!bytes) return json({ error: 'That file is empty' }, 400);
  if (bytes > MAX_BYTES) return json({ error: 'That file is over 100 MB' }, 413);

  // Permission (learner or their assessor) + rate limit + log, in SQL.
  const { data: reqId, error: beginErr } = await asUser.rpc('begin_media_transcription', {
    p_path: path, p_bytes: bytes, p_observation: observationId,
  });
  if (beginErr) {
    if (beginErr.hint === 'rate_limited' || /limit reached/i.test(beginErr.message)) {
      return json({ error: 'You have used the transcription limit for now. Try again in an hour.' }, 429);
    }
    if (beginErr.code === '42501') return deny(corsHeaders, 403, 'You cannot transcribe this file');
    return json({ error: beginErr.message }, 400);
  }

  const finish = (patch: Record<string, unknown>) =>
    admin.from('media_transcriptions').update({ ...patch, finished_at: new Date().toISOString() }).eq('id', reqId);

  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  const geminiKey = Deno.env.get('GEMINI_API_KEY');
  const useOpenAi = !!openaiKey && bytes <= OPENAI_MAX_BYTES && OPENAI_EXT.has(ext);
  const provider = useOpenAi ? 'openai' : geminiKey ? 'gemini' : null;
  if (!provider) {
    await finish({ status: 'failed', error: 'no provider for this file' });
    return json({ error: 'This file is too large to transcribe. Record the discussion as audio instead.' }, 413);
  }

  try {
    let text: string;
    if (provider === 'openai') {
      const { data: blob, error } = await admin.storage.from(BUCKET).download(path);
      if (error || !blob) throw new Error('could not read the file');
      text = await openaiTranscribe(blob, name, openaiKey!);
    } else {
      const { data: signed, error } = await admin.storage.from(BUCKET).createSignedUrl(path, 300);
      if (error || !signed) throw new Error('could not read the file');
      const res = await fetch(signed.signedUrl);
      if (!res.ok || !res.body) throw new Error('could not read the file');
      text = await geminiTranscribe(res.body, bytes, mime, geminiKey!);
    }
    text = text.replace(/\r\n/g, '\n').trim();
    if (!text || /^\[no speech\]$/i.test(text)) {
      await finish({ status: 'done', provider, chars: 0 });
      return json({ success: true, transcript: '', empty: true });
    }

    let observationTranscript: string | null = null;
    if (observationId) {
      const { data: merged, error: appendErr } = await asUser.rpc('append_observation_transcript', {
        p_id: observationId, p_text: text,
      });
      if (appendErr) console.warn('append_observation_transcript:', appendErr.message);
      else observationTranscript = merged as string;
    }
    await finish({ status: 'done', provider, chars: text.length });
    return json({ success: true, transcript: text, observation_transcript: observationTranscript, provider });
  } catch (e) {
    const message = (e as Error).message || 'transcription failed';
    console.error('transcribe-evidence-media:', message);
    await finish({ status: 'failed', provider, error: message.slice(0, 300) });
    return json({ error: 'Could not transcribe that file. Try again, or type the key answers.' }, 502);
  }
});
