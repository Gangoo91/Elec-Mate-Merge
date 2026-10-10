/**
 * The public signing link for a briefing (/briefing-sign/:token): reuse a live
 * one, or make a new one valid for seven days. The same rule as the share
 * sheet, for screens that send the link on someone's behalf.
 */
import { supabase } from '@/integrations/supabase/client';

export async function getBriefingSigningUrl(briefingId: string): Promise<string> {
  const { data: existing } = await supabase
    .from('briefing_signing_tokens')
    .select('public_token')
    .eq('briefing_id', briefingId)
    .eq('is_active', true)
    // Never hand out a link that is about to expire (an hour's grace).
    .gt('expires_at', new Date(Date.now() + 60 * 60 * 1000).toISOString())
    .order('expires_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  let token = existing?.public_token as string | undefined;
  if (!token) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('Sign in again to make a signing link.');
    token = crypto.randomUUID();
    const { error } = await supabase.from('briefing_signing_tokens').insert({
      briefing_id: briefingId,
      public_token: token,
      created_by_user_id: user.id,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
    if (error) throw error;
  }
  return `${window.location.origin}/briefing-sign/${token}`;
}

/** Opens the phone's messages app with the link written for them. */
export function smsHref(phone: string, text: string): string {
  const to = phone.replace(/[^\d+]/g, '');
  return `sms:${to}?&body=${encodeURIComponent(text)}`;
}
