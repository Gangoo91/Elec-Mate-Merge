/**
 * read-emailed-bill (gap #7): read an emailed supplier bill from the app.
 *
 * Used for a bill HELD because nobody knew the sender (the office taps
 * "Read it"), and for "Read it again" on an emailed bill. Same read as the
 * inbound path (_shared/emailed-bills.ts): the read-receipt prompt with the
 * product code per line, plus the order reference, then the PO and job match
 * by the one supplier-bill rule.
 *
 * POST { capture_id, force? } with the user's session.
 *   1. The capture and its email row are loaded through the CALLER's client,
 *      so row security decides (owner / admin of the firm).
 *   2. One AI read per bill. A second call returns the stored reading unless
 *      force is set. A read already in progress (under 90 s) is not repeated.
 * Nothing is posted here.
 */
import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { captureException } from '../_shared/sentry.ts';
import { openAiBillReader, billBase64 } from '../_shared/emailed-bills.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const MAX_BYTES = 10 * 1024 * 1024;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const url = Deno.env.get('SUPABASE_URL')!;
  const anon = Deno.env.get('SUPABASE_ANON_KEY')!;
  const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const asUser = createClient(url, anon, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
  });
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
    if (!captureId || !/^[0-9a-f-]{36}$/i.test(captureId)) {
      return json({ error: 'capture_id is required' }, 400);
    }

    const [{ data: cap, error: capErr }, { data: eb }] = await Promise.all([
      asUser
        .from('employer_receipt_captures')
        .select('id, source, status, file_path, file_mime, file_name, extracted, read_at')
        .eq('id', captureId)
        .maybeSingle(),
      // Owner / admin only (row security on employer_emailed_bills)
      asUser
        .from('employer_emailed_bills')
        .select('from_address, from_name, subject, body_text')
        .eq('capture_id', captureId)
        .maybeSingle(),
    ]);
    if (capErr) throw capErr;
    if (!cap || cap.source !== 'email' || !eb) return json({ error: 'Bill not found' }, 404);
    if (cap.status === 'posted' || cap.status === 'discarded' || (cap.extracted && !body.force)) {
      return json({ ok: true, extracted: cap.extracted, status: cap.status, cached: true });
    }
    if (
      cap.status === 'reading' &&
      cap.read_at &&
      Date.now() - new Date(cap.read_at).getTime() < 90_000
    ) {
      return json({ error: 'Already reading this one' }, 409);
    }

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) return json({ error: 'Reading bills is not set up yet' }, 503);

    await admin
      .from('employer_receipt_captures')
      .update({ status: 'reading', read_at: new Date().toISOString(), read_error: null })
      .eq('id', captureId);

    const { data: file, error: dlErr } = await admin.storage
      .from('expense-receipts')
      .download(cap.file_path);
    if (dlErr || !file) throw new Error('The file could not be opened');
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (bytes.byteLength > MAX_BYTES) throw new Error('The file is over 10 MB');
    const mime = (cap.file_mime || file.type || '').toLowerCase();
    const isText = mime.startsWith('text/');

    const reading = await openAiBillReader(openAiKey)({
      mime: isText ? null : mime || 'application/pdf',
      base64: isText ? null : billBase64(bytes),
      fileName: cap.file_name ?? 'bill',
      emailText: isText ? new TextDecoder().decode(bytes) : (eb.body_text ?? ''),
      subject: eb.subject ?? '',
      from: eb.from_name ? `${eb.from_name} <${eb.from_address ?? ''}>` : (eb.from_address ?? ''),
    });
    const { data: stored, error: stErr } = await admin.rpc('emailed_bill_reading', {
      p_capture: captureId,
      p_extracted: reading.extracted,
      p_order_ref: reading.orderRef,
    });
    if (stErr) throw stErr;
    return json({
      ok: true,
      extracted: reading.extracted,
      match: (stored as { match?: unknown } | null)?.match ?? null,
      cached: false,
    });
  } catch (e) {
    void captureException(e, {
      functionName: 'read-emailed-bill',
      extra: { capture_id: captureId },
    });
    if (captureId) {
      await admin.rpc('emailed_bill_failed', {
        p_capture: captureId,
        p_error: String((e as Error)?.message ?? e).slice(0, 300),
      });
    }
    return json({ error: 'The bill could not be read. Fill it in by hand.' }, 500);
  }
});
