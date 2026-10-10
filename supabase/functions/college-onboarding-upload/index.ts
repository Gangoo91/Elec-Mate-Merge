/**
 * college-onboarding-upload — ELE-2088.
 *
 * The apprentice uploads a copy of their ID or right-to-work document from
 * their personal onboarding link (/start/:token). The file goes to the PRIVATE
 * bucket college-learner-evidence under <college_id>/onboarding/<student_id>/,
 * which only staff of that college can read (storage policy
 * learner_evidence_files_read). Nothing about the document is stored except its
 * type, name, size check and SHA-256 (funding rules 2026/27, evidence box after
 * para 34; paras 346–347).
 *
 * The token is checked by onboarding_upload_target (service role only). A
 * learner who has an Elec-Mate account must be signed in as themselves.
 *
 * POST multipart/form-data: token, document_type, signer_name, file
 */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';

const BUCKET = 'college-learner-evidence';
const MAX_BYTES = 10 * 1024 * 1024;
const TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/heic': 'heic',
  'application/pdf': 'pdf',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

async function sha256(buf: ArrayBuffer): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  try {
    return await handle(req);
  } catch (e) {
    console.error('college-onboarding-upload', e);
    return json({ error: 'Something went wrong. Try again.' }, 500);
  }
});

async function handle(req: Request): Promise<Response> {
  const url = Deno.env.get('SUPABASE_URL') as string;
  const service = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string, {
    auth: { persistSession: false },
  });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ error: 'Send the file as a form.' }, 400);
  }
  const token = String(form.get('token') ?? '').trim();
  const documentType = String(form.get('document_type') ?? '')
    .trim()
    .slice(0, 80);
  const signerName = String(form.get('signer_name') ?? '')
    .trim()
    .slice(0, 200);
  const file = form.get('file');
  if (!token || !(file instanceof File)) return json({ error: 'Choose a file to upload.' }, 400);
  if (documentType.length < 2) return json({ error: 'Say which document it is.' }, 400);
  if (signerName.length < 2) return json({ error: 'Type your full name.' }, 400);
  const ext = TYPES[file.type];
  if (!ext) return json({ error: 'Upload a photo (JPG, PNG, WEBP, HEIC) or a PDF.' }, 400);
  if (file.size > MAX_BYTES) return json({ error: 'The file is over 10 MB.' }, 400);

  // Who is uploading, if signed in (a learner with an account must be).
  let userId: string | null = null;
  const auth = req.headers.get('Authorization');
  if (auth) {
    const { data } = await createClient(url, Deno.env.get('SUPABASE_ANON_KEY') as string, {
      global: { headers: { Authorization: auth } },
      auth: { persistSession: false },
    }).auth.getUser();
    userId = data?.user?.id ?? null;
  }

  const { data: target, error: tErr } = await service.rpc('onboarding_upload_target', {
    p_token: token,
    p_user: userId,
  });
  const t = target as { ok?: boolean; error?: string; folder?: string } | null;
  if (tErr || !t?.ok || !t.folder)
    return json({ error: t?.error ?? 'This link is not valid.' }, 403);

  const buf = await file.arrayBuffer();
  const hash = await sha256(buf);
  const path = `${t.folder}/${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await service.storage
    .from(BUCKET)
    .upload(path, buf, { contentType: file.type, upsert: false });
  if (upErr) return json({ error: 'Could not store the file. Try again.' }, 500);

  const { data: rec, error: rErr } = await service.rpc('record_onboarding_upload', {
    p_token: token,
    p_user: userId,
    p_signer_name: signerName,
    p_document_type: documentType,
    p_path: path,
    p_file_name: file.name.replace(/[^\w.\- ]+/g, '_').slice(-120),
    p_file_hash: hash,
    p_user_agent: (req.headers.get('user-agent') ?? '').slice(0, 300),
  });
  const r = rec as { ok?: boolean; error?: string } | null;
  if (rErr || !r?.ok) {
    // Nothing points at the file, so it must not stay.
    await service.storage.from(BUCKET).remove([path]);
    return json({ error: r?.error ?? 'Could not record the upload.' }, 400);
  }
  return json({ ok: true });
}
