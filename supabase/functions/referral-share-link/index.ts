// GET /referral-share-link?c=REF-XXXXXX&src=oct-referral-email
// Records a share event for the code's owner, then opens WhatsApp with the pre-written message and the
// owner's /r/ link. Native app on phones (whatsapp://), WhatsApp Web on desktop. No JWT: it is a link in an email.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'https://jtwygbeceundfgnkirof.supabase.co';
const SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

function message(code: string): string {
  // Just the link. They write their own words (Andrew, 4 Oct: nobody starts a text with "mate").
  return `https://www.elec-mate.com/r/${code}`;
}

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  const raw = (url.searchParams.get('c') ?? '').trim().toUpperCase();
  const src = (url.searchParams.get('src') ?? 'email').slice(0, 60);
  const code = /^REF-[A-Z0-9]{6}$/.test(raw) ? raw : '';
  if (!code) return new Response('Missing code', { status: 400 });

  // Record the share. Failures never block the redirect; the share still happens.
  try {
    const admin = createClient(SUPABASE_URL, SERVICE);
    const { data: rc } = await admin.from('referral_codes').select('user_id').eq('code', code).maybeSingle();
    if (rc?.user_id) {
      await admin.from('referral_share_events').insert({
        user_id: rc.user_id,
        channel: 'whatsapp',
        context: src,
        referral_code: code,
      });
    }
  } catch (_e) {
    // swallow
  }

  const ua = req.headers.get('user-agent') ?? '';
  const mobile = /iPhone|iPad|iPod|Android/i.test(ua);
  const text = encodeURIComponent(message(code));
  const target = mobile ? `whatsapp://send?text=${text}` : `https://web.whatsapp.com/send?text=${text}`;
  return new Response(null, { status: 302, headers: { Location: target, 'Cache-Control': 'no-store' } });
});
