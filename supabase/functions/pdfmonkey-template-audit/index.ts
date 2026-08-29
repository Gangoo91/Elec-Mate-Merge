import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

/**
 * PDFMonkey template audit — draft vs published.
 *
 * Exists because the PDFMonkey API key must never leave Supabase, and because
 * this distinction is invisible until it bites:
 *
 *   • DRAFT fields    — body_draft, scss_style_draft, settings_draft,
 *                       sample_data_draft. What the DASHBOARD edits.
 *   • PUBLISHED fields — body, scss_style, settings, sample_data.
 *                       What document generation actually RENDERS.
 *
 * Publishing in the dashboard copies draft → published. So a template can
 * render perfectly through the API while showing an empty editor (published
 * set, draft empty), or render stale output while the editor looks correct
 * (draft edited, never published). Both look like the other thing is broken.
 *
 * ── ACTIONS ───────────────────────────────────────────────────────────────
 *  inspect  (default) — READ ONLY. Reports, per template, whether draft and
 *                       published are present and whether they match. Returns
 *                       lengths and a hash, never the bodies.
 *  sync     — for ONE explicitly named template, copies PUBLISHED → DRAFT so
 *             the dashboard shows what is actually rendering.
 *
 * 🔴 There is deliberately NO "publish everything" action. Copying draft →
 * published in bulk would push somebody's unreviewed, half-finished dashboard
 * edits live across every certificate in the account. `sync` only ever writes
 * the draft side, so it cannot change what any document renders.
 */

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const API = 'https://api.pdfmonkey.io/api/v1/document_templates';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const auth = () => ({
  Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
  'Content-Type': 'application/json',
});

const digest = async (s: string): Promise<string> => {
  const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).slice(0, 6).map((b) => b.toString(16).padStart(2, '0')).join('');
};

async function summarise(id: string) {
  const res = await fetch(`${API}/${id}`, { headers: auth() });
  if (!res.ok) return { id, error: `${res.status} ${await res.text()}` };
  const t = (await res.json()).document_template ?? {};
  const body = t.body ?? '';
  const draft = t.body_draft ?? '';
  const set = JSON.stringify(t.settings ?? null);
  const setDraft = JSON.stringify(t.settings_draft ?? null);
  return {
    id,
    identifier: t.identifier,
    published_body_len: body.length,
    draft_body_len: draft.length,
    body_matches: body === draft,
    published_body_hash: await digest(body),
    draft_body_hash: await digest(draft),
    settings_match: set === setDraft,
    has_settings: !!t.settings,
    has_settings_draft: !!t.settings_draft,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    if (!PDFMONKEY_API_KEY) throw new Error('PDFMONKEY_API_KEY is not set');
    const body = await req.json().catch(() => ({}));
    const action = body?.action ?? 'inspect';
    const ids: string[] = Array.isArray(body?.ids) ? body.ids : [];
    if (!ids.length) throw new Error('ids[] is required');

    if (action === 'inspect') {
      const out = [];
      for (const id of ids) out.push(await summarise(id));
      return new Response(JSON.stringify({ success: true, templates: out }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    /*
     * Returns the LIVE bodies verbatim.
     *
     * 🔴 This is the first half of the fetch-and-patch discipline. A live
     * template can be ahead of the repo seed, so the only safe way to change
     * one is to read what is actually published, build the `find` string from
     * THAT, and patch it — never to paste a local copy over the top.
     * `inspect` deliberately returns only hashes, which tell you a template
     * differs but not how.
     */
    if (action === 'read') {
      const out = [];
      for (const id of ids) {
        const res = await fetch(`${API}/${id}`, { headers: auth() });
        if (!res.ok) {
          out.push({ id, error: `${res.status}` });
          continue;
        }
        const t = (await res.json()).document_template ?? {};
        out.push({
          id,
          identifier: t.identifier,
          body: t.body ?? '',
          scss_style: t.scss_style ?? '',
          settings: t.settings ?? null,
        });
      }
      return new Response(JSON.stringify({ success: true, templates: out }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'sync') {
      /*
       * PUBLISHED → DRAFT only. This makes the dashboard show what is live.
       * It cannot alter rendering, because rendering reads the published side
       * and the published side is never written here.
       */
      const out = [];
      for (const id of ids) {
        const res = await fetch(`${API}/${id}`, { headers: auth() });
        if (!res.ok) { out.push({ id, error: `${res.status}` }); continue; }
        const t = (await res.json()).document_template ?? {};
        if (!t.body) { out.push({ id, skipped: 'no published body to copy' }); continue; }
        const patch = await fetch(`${API}/${id}`, {
          method: 'PATCH',
          headers: auth(),
          body: JSON.stringify({
            document_template: {
              body_draft: t.body,
              scss_style_draft: t.scss_style ?? '',
              settings_draft: t.settings ?? null,
              sample_data_draft: t.sample_data ?? '{}',
            },
          }),
        });
        out.push(patch.ok ? await summarise(id) : { id, error: `patch ${patch.status}: ${await patch.text()}` });
      }
      return new Response(JSON.stringify({ success: true, templates: out }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    /*
     * Targeted find/replace against the LIVE body — the fetch-and-patch
     * discipline, enforced in code.
     *
     * 🔴 It refuses unless `find` occurs EXACTLY ONCE. A live template can be
     * ahead of the repo seed, so pasting the seed over it silently discards
     * whatever was changed in the dashboard; and a find string that matches
     * twice, or not at all, means the caller is not editing what they think
     * they are. Both are rejected rather than guessed at.
     *
     * Writes body AND body_draft together, so the two can never drift — which
     * is the whole failure this file exists to prevent.
     */
    if (action === 'replace') {
      const { id, find, replace } = body ?? {};
      if (!id || typeof find !== 'string' || typeof replace !== 'string') {
        throw new Error('replace needs { id, find, replace }');
      }
      const res = await fetch(`${API}/${id}`, { headers: auth() });
      if (!res.ok) throw new Error(`fetch ${res.status}`);
      const t = (await res.json()).document_template ?? {};
      const current: string = t.body ?? '';
      const hits = current.split(find).length - 1;
      if (hits !== 1) throw new Error(`find matched ${hits} times in the live body — expected exactly 1`);
      const next = current.replace(find, replace);
      const patch = await fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: auth(),
        body: JSON.stringify({ document_template: { body: next, body_draft: next } }),
      });
      if (!patch.ok) throw new Error(`patch ${patch.status}: ${await patch.text()}`);
      return new Response(JSON.stringify({ success: true, template: await summarise(id) }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error(`Unknown action: ${action}`);
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
