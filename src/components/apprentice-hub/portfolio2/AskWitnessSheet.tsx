/**
 * Ask a witness to sign for one piece of evidence (ELE-1868, from the
 * evidence detail, ELE-1893). Creates a portfolio_witness_statements request;
 * the supervisor signs from a link with no account (/witness/:token). The
 * request snapshots and hashes the evidence server-side, so what the witness
 * signs is fixed.
 *
 * ELE-1869: the learner picks which criteria the witness can speak to (shown
 * in plain words; the server keeps only criteria claimed on this evidence),
 * and the link goes by email (witness-request-mail), by text (sms: with the
 * number they enter), WhatsApp, the share sheet or a copied link.
 *
 * Sharing happens from a "Link ready" step with its own buttons, so the share
 * sheet always opens from a fresh tap (iOS refuses navigator.share after a
 * network wait).
 */
import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Mail, MessageCircle, MessageSquare, Share2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { notifyPortfolioChanged, type PortfolioItemView } from '@/hooks/portfolio/usePortfolio';
import { P_BTN, P_BTN_PRIMARY, P_INPUT } from './ui';

const witnessText =
  'Could you confirm what you saw me do on site? It takes two minutes, no account needed.';

export function witnessUrl(token: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://elec-mate.com';
  return `${origin}/witness/${token}`;
}

const critKey = (c: { unit_code: string; ac_code: string }) => `${c.unit_code} AC ${c.ac_code}`;

/** sms: link that opens the phone's messages app with the text filled in. */
function smsHref(phone: string, body: string) {
  const to = phone.replace(/[^0-9+]/g, '');
  return `sms:${to}?&body=${encodeURIComponent(body)}`;
}

export function AskWitnessSheet({
  item,
  open,
  onOpenChange,
  existingToken,
}: {
  item: PortfolioItemView;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  /** Re-share a request that already exists instead of creating another. */
  existingToken?: string | null;
}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const named = (item.metadata?.witness as { name?: string } | undefined)?.name ?? '';
  const existing = useMemo(
    () => (existingToken ? item.witnesses.find((w) => w.token === existingToken) ?? null : null),
    [existingToken, item.witnesses]
  );
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [mailing, setMailing] = useState(false);
  const [emailedTo, setEmailedTo] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(existingToken ?? null);
  const [requestId, setRequestId] = useState<string | null>(existing?.id ?? null);
  const [requestEmail, setRequestEmail] = useState<string | null>(existing?.witness_email ?? null);

  useEffect(() => {
    if (open) {
      setToken(existingToken ?? null);
      setRequestId(existing?.id ?? null);
      setRequestEmail(existing?.witness_email ?? null);
      setEmail('');
      setPhone('');
      setEmailedTo(null);
      setPicked(new Set(item.claimed.map(critKey)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, existingToken]);

  const toggle = (k: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });

  const sendEmail = async (id: string, to: string) => {
    setMailing(true);
    const { data, error } = await supabase.functions.invoke('witness-request-mail', {
      body: { witness_id: id },
    });
    setMailing(false);
    const res = data as { success?: boolean; error?: string; to?: string } | null;
    if (error || !res?.success) {
      toast({
        title: 'Email not sent',
        description: res?.error ?? 'Copy the link and send it yourself.',
        variant: 'destructive',
      });
      return;
    }
    setEmailedTo(res.to ?? to);
    toast({ title: 'Emailed', description: `The link is on its way to ${res.to ?? to}.` });
  };

  const create = async () => {
    if (!user) return;
    if (item.claimed.length > 0 && picked.size === 0) {
      toast({ title: 'Pick at least one', description: 'Choose what your witness saw you do.' });
      return;
    }
    setBusy(true);
    const to = email.trim();
    const { data, error } = await supabase
      .from('portfolio_witness_statements' as never)
      .insert({
        learner_id: user.id,
        portfolio_item_id: item.id,
        witness_email: to || null,
        witness_phone: phone.trim() || null,
        criteria: item.claimed.map(critKey).filter((k) => picked.has(k)),
      } as never)
      .select('id, token')
      .single();
    setBusy(false);
    if (error || !data) {
      toast({
        title: 'Could not create the request',
        description: 'Check your connection and try again.',
        variant: 'destructive',
      });
      return;
    }
    const row = data as { id: string; token: string };
    setToken(row.token);
    setRequestId(row.id);
    setRequestEmail(to || null);
    notifyPortfolioChanged();
    if (to) void sendEmail(row.id, to);
  };

  const url = token ? witnessUrl(token) : '';
  const message = `${witnessText} ${url}`;
  const shareNow = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Elec-Mate', text: witnessText, url });
        return;
      } catch (e) {
        if ((e as DOMException)?.name === 'AbortError') return;
      }
    }
    await copyNow();
  };
  const copyNow = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: 'Link copied', description: 'Paste it into a text, WhatsApp or email.' });
    } catch {
      toast({ title: 'Copy this link', description: url });
    }
  };

  const textTo = phone.trim();

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Ask a witness"
      title={token ? 'Witness link ready' : `Who saw you do "${item.title}"?`}
      description={
        token
          ? `Send this to ${named || 'your supervisor'}. They read what you did, write a line and sign. You will see it here when they do.`
          : 'A supervisor or qualified electrician who watched you do the work. They sign from a link with no account; what they sign is fixed to this evidence as it is now.'
      }
      footer={
        token ? (
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
            <button type="button" className={P_BTN_PRIMARY} onClick={() => void shareNow()}>
              <Share2 className="h-4 w-4" /> Share
            </button>
            <a className={P_BTN} href={smsHref(textTo, message)}>
              <MessageSquare className="h-4 w-4" /> Text
            </a>
            <a
              className={P_BTN}
              href={`https://wa.me/?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <button
              type="button"
              className={P_BTN}
              disabled={!requestId || !requestEmail || mailing}
              onClick={() => requestId && requestEmail && void sendEmail(requestId, requestEmail)}
            >
              <Mail className="h-4 w-4" /> {mailing ? 'Sending…' : emailedTo ? 'Email again' : 'Email'}
            </button>
            <button type="button" className={cn(P_BTN, 'col-span-2 lg:col-span-1')} onClick={() => void copyNow()}>
              <Copy className="h-4 w-4" /> Copy link
            </button>
          </div>
        ) : (
          <button type="button" className={`${P_BTN_PRIMARY} w-full`} disabled={busy} onClick={() => void create()}>
            {busy ? 'Creating link…' : email.trim() ? 'Create link and email it' : 'Create witness link'}
          </button>
        )
      }
    >
      {token ? (
        <div className="space-y-3">
          <p className="break-all rounded-xl border border-white/[0.12] bg-white/[0.04] p-3 font-mono text-[13px] text-white">
            {url}
          </p>
          {emailedTo ? (
            <p className="text-[13px] text-white">Emailed to {emailedTo}.</p>
          ) : requestEmail ? (
            <p className="text-[13px] text-white">
              {mailing ? `Emailing ${requestEmail}…` : `Tap Email to send it to ${requestEmail}.`}
            </p>
          ) : (
            <p className="text-[13px] text-white">No email address on this request. Send it by text, WhatsApp or copy the link.</p>
          )}
          <div className="max-w-sm">
            <label htmlFor="witness-phone-ready" className="mb-1 block text-[12px] font-medium text-white">
              Their mobile, to text it (optional)
            </label>
            <input
              id="witness-phone-ready"
              className={P_INPUT}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07700 900123"
            />
          </div>
          <p className="text-[13px] text-white">
            The link lasts 30 days. You can withdraw it from the evidence at any time before they sign.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <div>
              <label htmlFor="witness-email" className="mb-1 block text-[12px] font-medium text-white">
                Their email (optional)
              </label>
              <input
                id="witness-email"
                className={P_INPUT}
                type="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="supervisor@company.co.uk"
              />
              <p className="mt-2 text-[12.5px] text-white">We email them the link from Elec-Mate.</p>
            </div>
            <div>
              <label htmlFor="witness-phone" className="mb-1 block text-[12px] font-medium text-white">
                Their mobile (optional)
              </label>
              <input
                id="witness-phone"
                className={P_INPUT}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07700 900123"
              />
              <p className="mt-2 text-[12.5px] text-white">
                {named
                  ? `You named ${named} as the witness when you captured this. Text the link from your phone on the next step.`
                  : 'Text the link from your phone on the next step, or leave both blank and share it yourself.'}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-4">
            <p className="text-[12px] font-medium text-white">What did they see you do?</p>
            {item.claimed.length ? (
              <>
                <p className="mt-1 text-[12.5px] text-white">
                  Untick anything they did not see. They are asked to confirm only what is ticked.
                </p>
                <ul className="mt-3 space-y-1.5">
                  {item.claimed.map((c) => {
                    const k = critKey(c);
                    const on = picked.has(k);
                    return (
                      <li key={k}>
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={on}
                          onClick={() => toggle(k)}
                          className="flex min-h-11 w-full items-start gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-white/[0.04] touch-manipulation"
                        >
                          <span
                            className={cn(
                              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border',
                              on ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.3]'
                            )}
                          >
                            {on && <Check className="h-3.5 w-3.5" />}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[13.5px] leading-snug text-white">
                              {c.ac_text ?? `Criterion ${c.ac_code}`}
                            </span>
                            <span className="mt-0.5 block text-[11.5px] text-white">
                              {c.unit_title ? `${c.unit_title} · ` : ''}Unit {c.unit_code}, {c.ac_code}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <p className="mt-2 text-[13px] text-white">
                What they saw you do. Claim the criteria first if you want them named.
              </p>
            )}
          </div>
        </div>
      )}
    </FormSheet>
  );
}
