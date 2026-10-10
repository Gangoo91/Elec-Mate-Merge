/**
 * read-receipt (ELE-2071): read a captured receipt or supplier bill with AI.
 *
 * POST { capture_id, force? } with the user's session.
 *   1. The capture is loaded through the CALLER's client, so row security
 *      decides: the person who captured it, or the firm's owner / admin.
 *   2. One AI read per capture. A second call returns the stored reading
 *      unless force is set (the "Read it again" button). A read already in
 *      progress (under 90 s) is not started twice.
 *   3. The file is fetched from the private expense-receipts bucket with the
 *      service role, sent to OpenAI (gpt-5.4-mini-2026-03-17,
 *      max_completion_tokens via callOpenAI, no temperature), cleaned up
 *      (extract.ts), stored on the capture, and receipt_flag_duplicates marks
 *      duplicates and suggests where it goes.
 * Nothing is posted here. The person confirms in the app (post_receipt_capture).
 */
import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { captureException } from '../_shared/sentry.ts';
import { RECEIPT_MODEL, buildMessages, normaliseExtraction } from './extract.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const MAX_BYTES = 10 * 1024 * 1024;

function toBase64(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const url = Deno.env.get('SUPABASE_URL')!;
  const anon = Deno.env.get('SUPABASE_ANON_KEY')!;
  const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const authHeader = req.headers.get('Authorization') ?? '';
  const asUser = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
  const admin = createClient(url, service);

  let captureId: string | null = null;
  try {
    const {
      data: { user },
      error: authError,
    } = await asUser.auth.getUser();
    if (authError || !user) return json({ error: 'Not signed in' }, 401);

    const body = (await req.json().catch(() => ({}))) as { capture_id?: string; force?: boolean };
    captureId = typeof body.capture_id === 'string' ? body.capture_id : null;
    if (!captureId || !/^[0-9a-f-]{36}$/i.test(captureId)) return json({ error: 'capture_id is required' }, 400);

    // Row security on the caller's own client decides who may read it.
    const { data: cap, error: capErr } = await asUser
      .from('employer_receipt_captures')
      .select('id, status, file_path, file_mime, file_name, extracted, read_at')
      .eq('id', captureId)
      .maybeSingle();
    if (capErr) throw capErr;
    if (!cap) return json({ error: 'Receipt not found' }, 404);
    if (cap.status === 'posted' || cap.status === 'discarded') {
      return json({ ok: true, extracted: cap.extracted, status: cap.status, cached: true });
    }
    if (cap.extracted && !body.force) {
      return json({ ok: true, extracted: cap.extracted, status: cap.status, cached: true });
    }
    if (cap.status === 'reading' && cap.read_at && Date.now() - new Date(cap.read_at).getTime() < 90_000) {
      return json({ error: 'Already reading this one' }, 409);
    }

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) return json({ error: 'Reading receipts is not set up yet' }, 503);

    await admin
      .from('employer_receipt_captures')
      .update({ status: 'reading', read_at: new Date().toISOString(), read_error: null })
      .eq('id', captureId);

    const { data: file, error: dlErr } = await admin.storage.from('expense-receipts').download(cap.file_path);
    if (dlErr || !file) throw new Error('The file could not be opened');
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (bytes.byteLength > MAX_BYTES) throw new Error('The file is over 10 MB');
    const mime = cap.file_mime || file.type || (cap.file_path.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg');

    const { content } = await callOpenAI(
      {
        // Multimodal content parts; the helper's message type is text-only.
        // deno-lint-ignore no-explicit-any
        messages: buildMessages(mime, toBase64(bytes), cap.file_name ?? 'receipt') as any,
        model: RECEIPT_MODEL,
        max_tokens: 1800,
        response_format: { type: 'json_object' },
      },
      openAiKey,
      90_000
    );
    let raw: unknown = {};
    try {
      raw = JSON.parse(content);
    } catch {
      const m = content.match(/\{[\s\S]*\}/);
      raw = m ? JSON.parse(m[0]) : {};
    }
    const extracted = { ...normaliseExtraction(raw), model: RECEIPT_MODEL };

    const { error: upErr } = await admin
      .from('employer_receipt_captures')
      .update({ status: 'read', extracted, read_at: new Date().toISOString(), read_error: null })
      .eq('id', captureId);
    if (upErr) throw upErr;
    const { data: flags } = await admin.rpc('receipt_flag_duplicates', { p_id: captureId });

    return json({ ok: true, extracted, flags, cached: false });
  } catch (e) {
    void captureException(e, { functionName: 'read-receipt', extra: { capture_id: captureId } });
    if (captureId) {
      await admin
        .from('employer_receipt_captures')
        .update({ status: 'failed', read_error: String((e as Error)?.message ?? e).slice(0, 300) })
        .eq('id', captureId)
        .neq('status', 'posted');
    }
    return json({ error: 'The receipt could not be read. Fill it in by hand.' }, 500);
  }
});
