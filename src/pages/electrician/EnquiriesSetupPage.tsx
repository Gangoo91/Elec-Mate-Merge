import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { QRCodeCanvas } from 'qrcode.react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Copy,
  Download,
  ExternalLink,
  Loader2,
  Send,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { copyToClipboard } from '@/utils/clipboard';
import { saveOrShareFile } from '@/utils/save-or-share-file';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  cardCn,
  eyebrowCn,
  ghostButtonCn,
  primaryButtonCn,
  warningPanelCn,
  containerVariants,
  itemVariants,
} from '@/components/shared/surfaceStyles';
import {
  enquiryPageUrl,
  formPostUrl,
  gmailFilterQuery,
  showJunkWarning,
  useEnquiries,
  useSetSenderBlocked,
  useSetEnquiryPreferences,
  JOB_TYPES,
  OFFERABLE_JOBS,
  type JobKey,
  inboxAddress,
  useEnquiryInbox,
  useResetInboxToken,
  useSetInboxEnabled,
} from '@/hooks/useEnquiries';

/**
 * Enquiries set-up (ELE-2022): connect the places customers get in touch —
 * website form (any builder), Gmail and lead sites, or the hosted enquiry page.
 *
 * Desktop: guides on the left, "what you paste / share" pinned on the right.
 * Phone: the address and page first, then the guides.
 */

const PAGE_WIDTH = 'lg:mx-auto lg:max-w-[1400px] lg:px-8';

// ── Builders ────────────────────────────────────────────────────────────────

type Guide =
  | 'ai'
  | 'wix'
  | 'squarespace'
  | 'wordpress'
  | 'framer'
  | 'webflow'
  | 'godaddy'
  | 'carrd'
  | 'none'
  | 'other';

type Method = 'email' | 'link' | 'prompt' | 'page';

const METHOD: Record<Method, { short: string; paste: string }> = {
  email: { short: 'Email address', paste: 'Paste this address' },
  link: { short: 'Form link', paste: 'Paste this link' },
  prompt: { short: 'One instruction', paste: 'Paste this into the chat' },
  page: { short: 'Enquiry page', paste: 'Share this link' },
};

const GUIDES: Record<Guide, { label: string; method: Method; steps: string[]; note?: string }> = {
  ai: {
    label: 'Lovable / Bolt / v0',
    method: 'prompt',
    steps: [
      'Open your website project in Lovable (or Bolt, v0, Replit, Cursor).',
      'Copy the instruction and paste it into the chat.',
      'Publish, then send yourself a test enquiry from the live site.',
      'It lands in your Enquiries within seconds, already read.',
    ],
    note: 'Sites built with AI send the form straight to Elec-Mate. No email set-up, and the form keeps doing whatever it does now.',
  },
  wix: {
    label: 'Wix',
    method: 'email',
    steps: [
      'In the Wix editor, click your contact form and open its settings.',
      'Find who gets notified about new submissions (Notifications, or an email Automation).',
      'Add your Elec-Mate address as a recipient. Keep your own too if you like.',
      'Publish, then send yourself a test enquiry.',
    ],
  },
  squarespace: {
    label: 'Squarespace',
    method: 'email',
    steps: [
      'Edit the page with your form and open the form block.',
      'Go to Storage and choose Email.',
      'Enter your Elec-Mate address and save.',
      'Send yourself a test enquiry from the live site.',
    ],
  },
  wordpress: {
    label: 'WordPress',
    method: 'email',
    steps: [
      'Open your form plugin (Contact Form 7, WPForms, Gravity Forms, Elementor…).',
      'Find the form’s Notifications or Mail settings.',
      'Add your Elec-Mate address to the “Send to” box, separated from yours with a comma.',
      'Save, then send yourself a test enquiry.',
    ],
  },
  framer: {
    label: 'Framer',
    method: 'link',
    steps: [
      'Select your form in Framer and open its settings.',
      'Where it asks where submissions go, choose Webhook.',
      'Paste your form link.',
      'Publish, then send yourself a test enquiry.',
    ],
    note: 'Any field names work (Name, Phone number, Your message…). No Webhook option? Use Gmail forwarding or your enquiry page instead.',
  },
  webflow: {
    label: 'Webflow',
    method: 'link',
    steps: [
      'Select the Form Block and open its settings.',
      'Set Action to your form link and Method to POST.',
      'To come back to your own thank-you page, add &redirect=https://your-site/thank-you to the link.',
      'Publish, then send yourself a test enquiry.',
    ],
    note: 'With a custom Action, Webflow stops storing the submission itself. Elec-Mate keeps it instead.',
  },
  godaddy: {
    label: 'GoDaddy',
    method: 'email',
    steps: [
      'Edit your site and open the section with your contact form.',
      'In the form settings, find the email address that receives submissions.',
      'Use your Elec-Mate address, then publish.',
      'Send yourself a test enquiry.',
    ],
    note: 'If it will only send to your own email, set up Gmail forwarding instead.',
  },
  carrd: {
    label: 'Carrd',
    method: 'link',
    steps: [
      'Select your form (forms need Carrd Pro).',
      'Set the form type to Send to URL, method POST.',
      'Paste your form link.',
      'Publish, then send yourself a test enquiry.',
    ],
  },
  none: {
    label: 'No website',
    method: 'page',
    steps: [
      'Use your Elec-Mate enquiry page as your “Get a quote” link.',
      'Facebook page: Edit → Add button → choose a contact button and paste the link.',
      'Instagram, TikTok, Google Business Profile, Linktree: put it in your bio or website box.',
      'Print the QR code on the van, business cards and invoices.',
    ],
    note: 'Customers can add photos of the job, and it works on any phone.',
  },
  other: {
    label: 'Something else',
    method: 'email',
    steps: [
      'Almost every website builder can email you each form submission.',
      'Find where it says where submissions are sent, and add your Elec-Mate address.',
      'If it can only email you, set up Gmail forwarding below.',
      'Or link a “Get a quote” button to your enquiry page.',
    ],
  },
};

const aiPrompt = (postUrl: string) =>
  `Update my website's contact / enquiry form so every submission is also sent to my Elec-Mate account:

1. When the form is submitted, send a POST request from the browser to:
${postUrl}
2. Send JSON with the header Content-Type: application/json, using these keys for whichever fields the form has: name, email, phone, address, postcode, message.
3. Add a hidden text input called company_website (positioned off-screen, tabIndex -1, autocomplete off, aria-hidden) and include its value as company_website. It is a spam trap: real visitors never fill it.
4. Keep everything the form already does (saving, emailing, analytics).
5. After sending, show the visitor a thank-you message. If the request fails, still thank them and do not show an error.
6. No API key or login is needed. Do not add one.`;

// ── Small pieces ────────────────────────────────────────────────────────────

/** Native clipboard in the app, browser clipboard on the web. Returns success. */
async function copy(text: string, title: string, description?: string): Promise<boolean> {
  const ok = await copyToClipboard(text);
  if (ok) toast({ title, description });
  else toast({ title: 'Could not copy', description: 'Select the text and copy it instead.' });
  return ok;
}

function CopyButton({
  value,
  label,
  copiedTitle,
  variant = 'primary',
}: {
  value: string;
  label: string;
  copiedTitle: string;
  variant?: 'primary' | 'ghost';
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copy(value, copiedTitle)) {
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        }
      }}
      className={cn(
        variant === 'primary' ? primaryButtonCn : ghostButtonCn,
        'flex w-full items-center justify-center gap-2'
      )}
    >
      {done ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {done ? 'Copied' : label}
    </button>
  );
}

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol>
      {steps.map((step, i) => (
        <li key={step} className="relative flex gap-3 pb-5 last:pb-0">
          {i < steps.length - 1 && (
            <span
              className="absolute bottom-0 left-[13px] top-8 w-px bg-white/[0.15]"
              aria-hidden
            />
          )}
          <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-elec-yellow/50 bg-elec-yellow/10 text-[12px] font-bold text-elec-yellow">
            {i + 1}
          </span>
          <p className="pt-1 text-[14px] leading-snug text-white">{step}</p>
        </li>
      ))}
    </ol>
  );
}

function SectionTitle({ n, title, sub }: { n?: string; title: string; sub?: string }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        {n && <p className={cn(eyebrowCn, 'text-elec-yellow')}>Step {n}</p>}
        <h2 className="mt-1 text-[17px] font-semibold tracking-tight text-white">{title}</h2>
      </div>
      {sub && <span className="shrink-0 text-[12px] font-medium text-white">{sub}</span>}
    </div>
  );
}

function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cardCn}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[56px] w-full items-center justify-between gap-3 px-4 text-left touch-manipulation sm:px-5"
      >
        <span className="text-[15px] font-semibold text-white">{title}</span>
        <ChevronDown
          className={cn('h-5 w-5 text-white transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="space-y-3 border-t border-white/[0.1] px-4 pb-5 pt-4 sm:px-5">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Calls and texts (Twilio) ────────────────────────────────────────────────
// The number is set up by Elec-Mate; until then this explains what's coming.

interface PhoneLine {
  user_id: string;
  twilio_number: string;
  enabled: boolean;
  auto_text: boolean;
  voicemail: boolean;
}

// Same as ukDisplay in supabase/functions/_shared/twilio.ts
const ukNumber = (e164: string) => {
  if (!e164.startsWith('+44')) return e164;
  const n = `0${e164.slice(3)}`;
  if (n.startsWith('02')) return `${n.slice(0, 3)} ${n.slice(3, 7)} ${n.slice(7)}`; // 020 7946 0000
  if (/^0(11\d|1\d1|[389]\d\d)/.test(n)) return `${n.slice(0, 4)} ${n.slice(4, 7)} ${n.slice(7)}`; // 0161 496 0000, 0800 123 4567
  return `${n.slice(0, 5)} ${n.slice(5)}`; // 07700 900123, 01234 567890
};

function PhoneLineSection({ ownerId }: { ownerId: string }) {
  const qc = useQueryClient();
  const { data: line, isLoading } = useQuery({
    queryKey: ['phone-line', ownerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('phone_lines' as never)
        .select('user_id, twilio_number, enabled, auto_text, voicemail')
        .eq('user_id', ownerId)
        .maybeSingle();
      if (error) throw error;
      return data as PhoneLine | null;
    },
  });
  const [saving, setSaving] = useState<string | null>(null);
  const setFlag = async (key: 'auto_text' | 'voicemail', value: boolean) => {
    setSaving(key);
    const { error } = await supabase
      .from('phone_lines' as never)
      .update({ [key]: value } as never)
      .eq('user_id', ownerId);
    setSaving(null);
    if (error) {
      toast({ title: 'Could not save', description: error.message, variant: 'destructive' });
      return;
    }
    qc.invalidateQueries({ queryKey: ['phone-line', ownerId] });
  };

  if (isLoading) return null;

  if (!line) {
    return (
      <motion.section variants={itemVariants}>
        <SectionTitle title="Missed calls and texts" sub="Coming soon" />
        <div className={cn(cardCn, 'space-y-3 p-4 sm:p-5')}>
          <p className="text-[14px] leading-snug text-white">
            Soon you'll get your own Elec-Mate number. Calls you can't answer forward to it, and:
          </p>
          <ul className="space-y-2 text-[14px] leading-snug text-white">
            <li className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow" />A card appears here
              straight away: "Missed call from 07…"
            </li>
            <li className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow" />
              The caller gets a text with your enquiry page, so the job isn't lost
            </li>
            <li className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow" />
              Voicemails are written out and read like any other enquiry
            </li>
            <li className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow" />
              Texts to the number land here too
            </li>
          </ul>
          <p className="text-[12.5px] leading-snug text-white">
            You keep your own number. Nothing changes until you switch it on.
          </p>
        </div>
      </motion.section>
    );
  }

  const n = line.twilio_number;
  // National form dials on every UK network
  const dial = n.startsWith('+44') ? `0${n.slice(3)}` : n;
  const codes = [
    { code: `**61*${dial}#`, label: "When you don't answer" },
    { code: `**67*${dial}#`, label: "When you're on another call" },
  ];
  const toggles = [
    {
      key: 'auto_text' as const,
      title: 'Text the caller back',
      sub: 'Mobiles get a link to tell you what they need',
      on: line.auto_text,
    },
    {
      key: 'voicemail' as const,
      title: 'Take a voicemail',
      sub: 'Written out by AI and read like an enquiry',
      on: line.voicemail,
    },
  ];

  return (
    <motion.section variants={itemVariants}>
      <SectionTitle title="Missed calls and texts" sub={line.enabled ? 'On' : 'Off'} />
      <div className={cn(cardCn, 'space-y-5 p-4 sm:p-5')}>
        <div>
          <p className={eyebrowCn}>Your Elec-Mate number</p>
          <p className="mt-1 font-mono text-[20px] font-semibold tabular-nums text-white">
            {ukNumber(n)}
          </p>
          <p className="mt-1 text-[12.5px] leading-snug text-white">
            Texts to this number arrive here. Customers keep calling your own number.
          </p>
        </div>

        <div className="border-t border-white/[0.1] pt-4">
          <h3 className="text-sm font-semibold text-white">Forward missed calls to it</h3>
          <p className="mt-1 text-[13px] leading-snug text-white">
            On your mobile, open the keypad, dial each code and press call. Works on most UK
            networks.
          </p>
          <div className="mt-3 space-y-2">
            {codes.map((c) => (
              <div
                key={c.code}
                className="flex items-center justify-between gap-3 rounded-xl bg-black/20 py-2 pl-3 pr-2"
              >
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-white">{c.label}</p>
                  <p className="break-all font-mono text-[15px] font-semibold tabular-nums text-white">
                    {c.code}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copy(c.code, 'Code copied', 'Paste it into your keypad')}
                  aria-label={`Copy ${c.label} code`}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white touch-manipulation active:bg-white/[0.08]"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[12.5px] leading-snug text-white">
            To stop forwarding, dial <span className="font-mono font-semibold">##002#</span>
          </p>
        </div>

        <div className="space-y-1 border-t border-white/[0.1] pt-3">
          {toggles.map((t) => (
            <label
              key={t.key}
              htmlFor={`phone-${t.key}`}
              className="flex min-h-[52px] cursor-pointer items-center justify-between gap-3 touch-manipulation"
            >
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-white">{t.title}</p>
                <p className="text-[12.5px] leading-snug text-white">{t.sub}</p>
              </div>
              <Switch
                id={`phone-${t.key}`}
                checked={t.on}
                disabled={saving === t.key}
                onCheckedChange={(v) => setFlag(t.key, v)}
              />
            </label>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ── No website? Elec-Mate builds one (£199 set-up + £39/month, 12-month minimum) ─
// Interest only: one tap tells Elec-Mate, who follow up. Nothing is charged here.

type WebsiteRequest = {
  created_at: string;
  status: 'new' | 'contacted' | 'paid' | 'building' | 'live';
  subscription_status: string | null;
  site_url: string | null;
  commitment_ends_at: string | null;
  origin: 'interest' | 'checkout';
};

/** The account's website order, if any. Polls briefly after Stripe sends them back. */
function useWebsiteRequest(waitingForPayment = false) {
  return useQuery({
    queryKey: ['website-build-request'],
    queryFn: async () => {
      const { data } = await supabase
        .from('website_build_requests' as never)
        .select('created_at, status, subscription_status, site_url, commitment_ends_at, origin')
        .in('status', ['new', 'contacted', 'paid', 'building', 'live'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      return data as WebsiteRequest | null;
    },
    refetchInterval: (q) =>
      waitingForPayment && !['paid', 'building', 'live'].includes(q.state.data?.status ?? '')
        ? 3000
        : false,
  });
}

function WebsiteOffer() {
  const qc = useQueryClient();
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState<null | 'pay' | 'ask' | 'card'>(null);
  // Back from Stripe: the webhook may land a moment after the redirect
  const [returned] = useState(() => new URLSearchParams(window.location.search).get('website'));
  const { data: request } = useWebsiteRequest(returned === 'paid');

  useEffect(() => {
    if (!returned) return;
    if (returned === 'paid') {
      toast({
        title: 'Payment received',
        description: "Thanks. We'll be in touch to start your website.",
      });
    }
    // Tidy the address bar so a refresh doesn't repeat it
    const url = new URL(window.location.href);
    url.searchParams.delete('website');
    window.history.replaceState(null, '', url.toString());
  }, [returned]);

  const call = async (fn: string, body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke(fn, { body });
    if (error) {
      const ctx = (error as { context?: Response }).context;
      const detail = ctx ? await ctx.json().catch(() => null) : null;
      throw new Error(detail?.error ?? error.message);
    }
    return data as { url?: string; already?: boolean };
  };

  const pay = async () => {
    setBusy('pay');
    try {
      const out = await call('website-checkout', { action: 'checkout', notes });
      if (out.url) await openExternalUrl(out.url);
    } catch (err) {
      toast({
        title: 'Could not open payment',
        description: (err as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };
  const updateCard = async () => {
    setBusy('card');
    try {
      const out = await call('website-checkout', { action: 'card' });
      if (out.url) await openExternalUrl(out.url);
    } catch (err) {
      toast({
        title: 'Could not open',
        description: (err as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };
  const ask = async () => {
    setBusy('ask');
    try {
      await call('website-build-request', { notes });
      toast({ title: 'Request sent', description: "We'll be in touch to talk it through." });
      qc.invalidateQueries({ queryKey: ['website-build-request'] });
    } catch (err) {
      toast({
        title: 'Could not send',
        description: (err as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  const status = request?.status;
  const paid = status === 'paid' || status === 'building' || status === 'live';
  const failing = paid && ['past_due', 'unpaid'].includes(request?.subscription_status ?? '');
  const confirming = returned === 'paid' && !paid;
  // They tapped "Talk to us first" (opening the payment page alone isn't asking)
  const asked = (status === 'new' || status === 'contacted') && request?.origin === 'interest';

  const statusLine = (text: string) => (
    <p className="flex items-start gap-2 rounded-xl bg-black/20 px-3 py-3 text-[14px] font-medium leading-snug text-white">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow" />
      <span>{text}</span>
    </p>
  );

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-elec-yellow/40 bg-gradient-to-br from-elec-yellow/[0.12] to-transparent">
      <div className="space-y-3 p-4 sm:p-5">
        <p className={cn(eyebrowCn, 'text-elec-yellow')}>
          {status === 'live' ? 'Your website' : 'Want a proper website?'}
        </p>
        <h3 className="text-[17px] font-semibold tracking-tight text-white">
          {status === 'live'
            ? 'Your website is live'
            : paid
              ? "We're building your website"
              : "We'll build one for you"}
        </h3>

        {!paid && (
          <>
            <p className="text-[14px] leading-snug text-white">
              A website for your business, built by Elec-Mate, with its enquiry form already
              connected to this inbox.
            </p>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <p className="text-white">
                <span className="text-[24px] font-bold tabular-nums">£199</span>{' '}
                <span className="text-[13px]">to set up</span>
              </p>
              <p className="text-white">
                <span className="text-[24px] font-bold tabular-nums">£39</span>{' '}
                <span className="text-[13px]">a month</span>
              </p>
            </div>
            <p className="text-[12.5px] leading-snug text-white">
              Hosting included. 12-month minimum, then cancel any time.
            </p>
          </>
        )}

        {confirming && (
          <p className="flex items-center gap-2 rounded-xl bg-black/20 px-3 py-3 text-[14px] font-medium text-white">
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-elec-yellow" />
            Confirming your payment…
          </p>
        )}

        {status === 'live' && request?.site_url && (
          <a
            href={request.site_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center gap-2 break-all rounded-xl bg-black/20 px-3 text-[14px] font-semibold text-elec-yellow touch-manipulation"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            {request.site_url.replace(/^https?:\/\//, '')}
          </a>
        )}
        {paid &&
          status !== 'live' &&
          statusLine(
            "Payment received. We'll be in touch for your details and photos, then build it."
          )}
        {paid && request?.commitment_ends_at && (
          <p className="text-[12.5px] leading-snug text-white">
            £39 a month, hosting included. Minimum term ends{' '}
            {new Date(request.commitment_ends_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
            . To make changes or cancel after that, just contact us.
          </p>
        )}
        {failing && (
          <div className={warningPanelCn}>
            <p className="text-[13px] font-semibold text-orange-300">
              Your last payment didn't go through
            </p>
            <p className="mt-1 text-[12.5px] leading-snug text-white">
              Update your card to keep the website online.
            </p>
            <button
              type="button"
              onClick={updateCard}
              disabled={busy === 'card'}
              className={cn(
                primaryButtonCn,
                'mt-3 flex w-full items-center justify-center gap-2 sm:w-auto sm:px-6'
              )}
            >
              {busy === 'card' && <Loader2 className="h-4 w-4 animate-spin" />}
              Update card
            </button>
          </div>
        )}

        {!paid && !confirming && (
          <>
            {(status === 'new' || status === 'contacted') &&
              request?.origin === 'interest' &&
              statusLine(
                `You asked ${formatDistanceToNow(new Date(request!.created_at), { addSuffix: true })}. We'll be in touch, or start now below.`
              )}
            {!asked && (
              <label className="block">
                <span className="mb-1 block text-[12px] font-medium text-white">
                  Anything we should know? (optional)
                </span>
                <textarea
                  value={notes}
                  onChange={(ev) => setNotes(ev.target.value)}
                  rows={2}
                  placeholder="e.g. the areas you cover, a domain you already own"
                  className="w-full resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white placeholder:text-white/40 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                />
              </label>
            )}
            <div className="grid gap-2 sm:flex sm:flex-wrap">
              <button
                type="button"
                onClick={pay}
                disabled={!!busy}
                className={cn(
                  primaryButtonCn,
                  'flex w-full items-center justify-center gap-2 sm:w-auto sm:px-6'
                )}
              >
                {busy === 'pay' && <Loader2 className="h-4 w-4 animate-spin" />}
                Get my website
              </button>
              {!asked && (
                <button
                  type="button"
                  onClick={ask}
                  disabled={!!busy}
                  className={cn(
                    ghostButtonCn,
                    'flex w-full items-center justify-center gap-2 sm:w-auto sm:px-6'
                  )}
                >
                  {busy === 'ask' && <Loader2 className="h-4 w-4 animate-spin" />}
                  Talk to us first
                </button>
              )}
            </div>
            <p className="text-[12.5px] leading-snug text-white">
              Secure payment by Stripe: £199 plus your first month today. Your free enquiry page
              above works in the meantime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

const EnquiriesSetupPage = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { companyProfile, loading: profileLoading } = useCompanyProfile();
  const { data: inbox, isLoading } = useEnquiryInbox({ watchForGmailCode: true });
  const reset = useResetInboxToken();
  const setEnabled = useSetInboxEnabled();
  const [guide, setGuide] = useState<Guide>('ai');
  const { data: websiteOrder } = useWebsiteRequest();
  const [hasWebsiteReturn] = useState(() =>
    new URLSearchParams(window.location.search).has('website')
  );
  // No website on the company profile: open on "No website" (and the offer to build one)
  const guidePicked = useRef(false);
  useEffect(() => {
    if (guidePicked.current || profileLoading) return;
    guidePicked.current = true;
    if (!companyProfile?.company_website?.trim()) setGuide('none');
  }, [companyProfile, profileLoading]);
  const [confirmReset, setConfirmReset] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const qrRef = useRef<HTMLCanvasElement>(null);
  const { data: enquiries = [] } = useEnquiries();
  const unblock = useSetSenderBlocked();
  const savePrefs = useSetEnquiryPreferences();
  // null = everything electrical
  const [services, setServices] = useState<JobKey[] | null>(null);
  const [radius, setRadius] = useState(25);
  const [prefsLoaded, setPrefsLoaded] = useState(false);
  useEffect(() => {
    if (inbox && !prefsLoaded) {
      setServices(inbox.services ?? null);
      setRadius(inbox.travel_radius_miles ?? 25);
      setPrefsLoaded(true);
    }
  }, [inbox, prefsLoaded]);
  const prefsDirty =
    !!inbox &&
    (radius !== inbox.travel_radius_miles ||
      JSON.stringify([...(services ?? [])].sort()) !==
        JSON.stringify([...(inbox.services ?? [])].sort()));
  const toggleService = (k: JobKey) => {
    const current = services ?? OFFERABLE_JOBS;
    const next = current.includes(k) ? current.filter((x) => x !== k) : [...current, k];
    if (next.length === 0) {
      toast({ title: 'Keep at least one', description: 'Tick the work you do take on.' });
      return;
    }
    setServices(next.length === OFFERABLE_JOBS.length ? null : next);
  };
  const { data: me } = useQuery({
    queryKey: ['auth-user-email'],
    queryFn: async () => (await supabase.auth.getUser()).data.user?.email ?? null,
    staleTime: Infinity,
  });
  const filterQuery = gmailFilterQuery(enquiries, me);
  const gmailRef = useRef<HTMLElement>(null);

  // Arriving from the junk banner (#gmail): jump straight to the Gmail section
  useEffect(() => {
    if (window.location.hash === '#gmail') {
      setTimeout(
        () => gmailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        400
      );
    }
  }, []);

  const address = inbox ? inboxAddress(inbox) : '';
  const postUrl = inbox ? formPostUrl(inbox) : '';
  const pageUrl = inbox ? enquiryPageUrl(inbox) : '';
  const businessName = companyProfile?.company_name?.trim() || 'Your business';
  const g = GUIDES[guide];

  const pasteValue =
    g.method === 'email'
      ? address
      : g.method === 'link'
        ? postUrl
        : g.method === 'page'
          ? pageUrl
          : aiPrompt(postUrl);

  const snippet = `<form action="${postUrl}&redirect=https://YOUR-SITE.co.uk/thank-you" method="POST">
  <input name="name" placeholder="Your name" required>
  <input name="email" type="email" placeholder="Email">
  <input name="phone" type="tel" placeholder="Phone">
  <input name="postcode" placeholder="Postcode">
  <textarea name="message" placeholder="What do you need doing?" required></textarea>
  <!-- Leave this hidden field in: it catches spam bots -->
  <input name="company_website" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
  <button type="submit">Send enquiry</button>
</form>`;

  const checklist = [
    { label: 'Your address is ready', done: !!inbox },
    { label: 'First enquiry received', done: !!inbox?.last_received_at || testSent },
    { label: 'Gmail forwarding (optional)', done: !!inbox?.forwarding_confirmation_at },
  ];
  const doneCount = checklist.filter((c) => c.done).length;

  const sendTest = async () => {
    if (!inbox) return;
    setTesting(true);
    try {
      // Signed in: the server only treats it as a test for the account's own people
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const res = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({
          is_test: true,
          name: 'Test enquiry',
          phone: '07700 900000',
          message:
            'This is a test from your Elec-Mate set-up page. A real enquiry from your website will look just like this.',
        }),
      });
      if (!res.ok) throw new Error();
      setTestSent(true);
      toast({ title: 'Test sent', description: 'It will be in Enquiries in a few seconds.' });
      qc.invalidateQueries({ queryKey: ['enquiries'] });
      qc.invalidateQueries({ queryKey: ['enquiry-inbox'] });
    } catch {
      toast({
        title: 'Test did not send',
        description: 'Check the switch is on and try again.',
        variant: 'destructive',
      });
    } finally {
      setTesting(false);
    }
  };

  // saveOrShareFile: share sheet in the iOS/Android app (a.download does nothing there)
  const downloadQr = async () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    try {
      await saveOrShareFile(canvas.toDataURL('image/png'), 'enquiry-page-qr.png');
    } catch {
      toast({ title: 'Could not save the QR code', variant: 'destructive' });
    }
  };

  return (
    <div className="-mt-3 min-h-screen bg-background pb-24 sm:-mt-4 md:-mt-6 lg:pb-12">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-white/[0.10] bg-background/95 backdrop-blur-sm">
        <div className={cn('px-4 py-2', PAGE_WIDTH)}>
          <div className="flex h-11 items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/enquiries')}
              aria-label="Back to Enquiries"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="min-w-0 flex-1 truncate text-[19px] font-semibold tracking-tight text-white">
              Connect enquiries
            </h1>
            <button
              type="button"
              onClick={() => navigate('/electrician/enquiries')}
              className="hidden h-11 items-center rounded-xl px-3 text-[13px] font-medium text-white transition-colors hover:bg-white/10 touch-manipulation sm:flex"
            >
              Go to inbox
            </button>
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn('px-4', PAGE_WIDTH)}
      >
        {/* Hero + checklist */}
        <motion.section
          variants={itemVariants}
          className="grid gap-6 py-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end lg:gap-8 lg:py-10"
        >
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
              Set-up · about 5 minutes
            </p>
            <h2 className="mt-3 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[34px] xl:text-[40px]">
              Connect where your customers
              <span className="text-elec-yellow"> find you.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white">
              Pick what your website is built with and follow a few steps. Gmail, lead sites and
              your own enquiry page work too. Everything lands in one inbox, already read.
            </p>
          </div>

          <div className={cn(cardCn, 'p-4 sm:p-5')}>
            <div className="flex items-center justify-between">
              <p className={eyebrowCn}>Your progress</p>
              <p className="text-[13px] font-semibold tabular-nums text-elec-yellow">
                {doneCount} of 3
              </p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-elec-yellow transition-all duration-500"
                style={{ width: `${(doneCount / 3) * 100}%` }}
              />
            </div>
            <ul className="mt-4 space-y-2.5">
              {checklist.map((c) => (
                <li key={c.label} className="flex items-center gap-3">
                  <span
                    className={cn(
                      'grid h-6 w-6 shrink-0 place-items-center rounded-full border',
                      c.done
                        ? 'border-elec-yellow bg-elec-yellow text-black'
                        : 'border-white/25 text-transparent'
                    )}
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-[14px] font-medium text-white">{c.label}</span>
                </li>
              ))}
            </ul>
            {!checklist[1].done && (
              <button
                type="button"
                disabled={!inbox || testing}
                onClick={sendTest}
                className={cn(ghostButtonCn, 'mt-4 flex w-full items-center justify-center gap-2')}
              >
                {testing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send a test enquiry
              </button>
            )}
          </div>
        </motion.section>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
          {/* ── Main ─────────────────────────────────────────────── */}
          <div className="min-w-0 space-y-10">
            {/* Website */}
            <motion.section variants={itemVariants}>
              <SectionTitle n="1" title="What is your website built with?" />
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
                {(Object.keys(GUIDES) as Guide[]).map((key) => {
                  const on = key === guide;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setGuide(key)}
                      aria-pressed={on}
                      className={cn(
                        'flex min-h-[72px] flex-col justify-between rounded-2xl border p-3 text-left transition-colors touch-manipulation active:scale-[0.98]',
                        on
                          ? 'border-elec-yellow bg-elec-yellow/[0.12]'
                          : 'border-white/[0.12] bg-white/[0.03] hover:border-white/[0.25] hover:bg-white/[0.06]'
                      )}
                    >
                      <span className="text-[14px] font-semibold leading-tight text-white">
                        {GUIDES[key].label}
                      </span>
                      <span
                        className={cn(
                          'mt-2 text-[11.5px] font-medium',
                          on ? 'text-elec-yellow' : 'text-white'
                        )}
                      >
                        {METHOD[GUIDES[key].method].short}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className={cn(cardCn, 'mt-4 overflow-hidden')}>
                <div className="flex items-center justify-between gap-3 border-b border-white/[0.1] px-4 py-3 sm:px-5">
                  <p className="text-[15px] font-semibold text-white">{g.label}</p>
                  <span className="rounded-full bg-elec-yellow/15 px-2.5 py-1 text-[11.5px] font-semibold text-elec-yellow">
                    {METHOD[g.method].short}
                  </span>
                </div>
                <div className="grid gap-6 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                  <div>
                    <Steps steps={g.steps} />
                    {g.note && (
                      <p className="mt-5 border-t border-white/[0.1] pt-4 text-[13px] leading-snug text-white">
                        {g.note}
                      </p>
                    )}
                  </div>
                  <div className="min-w-0 rounded-2xl border border-white/[0.12] bg-black/20 p-4">
                    <p className={eyebrowCn}>{METHOD[g.method].paste}</p>
                    {!inbox ? (
                      <div className="mt-3 h-10 animate-pulse rounded-lg bg-white/[0.06]" />
                    ) : g.method === 'prompt' ? (
                      <pre className="mt-3 max-h-56 overflow-y-auto whitespace-pre-wrap break-words font-sans text-[12.5px] leading-snug text-white">
                        {pasteValue}
                      </pre>
                    ) : (
                      <p className="mt-3 break-all font-mono text-[14px] leading-snug text-white">
                        {pasteValue}
                      </p>
                    )}
                    {inbox && (
                      <div className="mt-4">
                        <CopyButton
                          value={pasteValue}
                          label={
                            g.method === 'prompt'
                              ? 'Copy instruction'
                              : g.method === 'email'
                                ? 'Copy address'
                                : 'Copy link'
                          }
                          copiedTitle={g.method === 'prompt' ? 'Instruction copied' : 'Copied'}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {(guide === 'none' ||
                ['paid', 'building', 'live'].includes(websiteOrder?.status ?? '') ||
                hasWebsiteReturn) && <WebsiteOffer />}
            </motion.section>

            {/* Gmail */}
            <motion.section
              variants={itemVariants}
              id="gmail"
              ref={gmailRef}
              className="scroll-mt-24"
            >
              <SectionTitle n="2" title="Gmail and lead sites" sub="Optional" />
              <div
                className={cn(
                  cardCn,
                  'grid gap-6 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]'
                )}
              >
                <div>
                  {showJunkWarning(inbox) && (
                    <div className={cn(warningPanelCn, 'mb-4')}>
                      <p className="text-[13px] font-semibold text-orange-300">
                        Your whole inbox seems to be forwarded
                      </p>
                      <p className="mt-1 text-[12.5px] leading-snug text-white">
                        In Gmail, turn off “Forward a copy of incoming mail” (Forwarding and
                        POP/IMAP), then add the filter below so only enquiries come through.
                      </p>
                    </div>
                  )}
                  <p className="mb-4 text-[14px] leading-snug text-white">
                    Forward only the enquiries that reach your Gmail, including Checkatrade,
                    MyBuilder, Bark and Rated People leads. Never forward everything: a filter keeps
                    your inbox private and the junk out.
                  </p>
                  <Steps
                    steps={[
                      'On a computer, open Gmail → Settings → See all settings → Forwarding and POP/IMAP.',
                      'Click “Add a forwarding address” and paste your Elec-Mate address. Leave “Disable forwarding” selected.',
                      'Gmail sends us a confirmation code. It appears here within a minute.',
                      'In Gmail’s search bar, click the filter icon, paste the filter text into “Has the words”, then Create filter → “Forward it to” your Elec-Mate address.',
                    ]}
                  />
                </div>
                <div className="min-w-0 space-y-3">
                  <div className="rounded-2xl border border-white/[0.12] bg-black/20 p-4">
                    <p className={eyebrowCn}>Paste this address in Gmail</p>
                    <p className="mt-3 break-all font-mono text-[14px] text-white">
                      {address || '…'}
                    </p>
                    {inbox && (
                      <div className="mt-4">
                        <CopyButton
                          value={address}
                          label="Copy address"
                          copiedTitle="Address copied"
                          variant="ghost"
                        />
                      </div>
                    )}
                  </div>
                  <div className="rounded-2xl border border-white/[0.12] bg-black/20 p-4">
                    <p className={eyebrowCn}>Your Gmail filter, ready to paste</p>
                    <p className="mt-3 break-words font-mono text-[12.5px] leading-snug text-white">
                      {filterQuery}
                    </p>
                    <p className="mt-2 text-[12px] leading-snug text-white">
                      Built from where your enquiries come from. It gets better as more arrive.
                    </p>
                    <div className="mt-4">
                      <CopyButton
                        value={filterQuery}
                        label="Copy filter"
                        copiedTitle="Filter copied"
                        variant="ghost"
                      />
                    </div>
                  </div>
                  {inbox?.forwarding_confirmation_code ? (
                    <div className="rounded-2xl border border-elec-yellow/50 bg-elec-yellow/[0.10] p-4">
                      <p className="text-[13px] font-semibold text-white">
                        Gmail confirmation code
                      </p>
                      <p className="mt-1 font-mono text-[30px] font-bold tracking-wider text-elec-yellow">
                        {inbox.forwarding_confirmation_code}
                      </p>
                      <p className="mt-1 text-[12.5px] text-white">
                        Type this into Gmail’s forwarding settings to finish.
                      </p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <CopyButton
                          value={inbox.forwarding_confirmation_code}
                          label="Copy code"
                          copiedTitle="Code copied"
                        />
                        {inbox.forwarding_confirmation_link && (
                          <a
                            href={inbox.forwarding_confirmation_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(ghostButtonCn, 'flex items-center justify-center')}
                          >
                            Confirm with Google
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-white/[0.18] p-4">
                      <span className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-elec-yellow/60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-elec-yellow" />
                      </span>
                      <p className="text-[13px] text-white">
                        Waiting for Gmail’s code. It shows here on its own.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>

            {/* Your work and area */}
            <motion.section variants={itemVariants}>
              <SectionTitle n="3" title="Your work and area" sub="Makes the AI smarter" />
              <div className={cn(cardCn, 'space-y-6 p-4 sm:p-5')}>
                <p className="text-[14px] leading-snug text-white">
                  Enquiries outside your area, or for work you don't do, are labelled and moved to
                  the bottom with no push alert. They still arrive, so you can reply or pass them
                  on.
                </p>
                <div>
                  <p className={eyebrowCn}>Work you take on</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {OFFERABLE_JOBS.map((k) => {
                      const on = (services ?? OFFERABLE_JOBS).includes(k);
                      return (
                        <button
                          key={k}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleService(k)}
                          className={cn(
                            'flex h-11 items-center gap-1.5 rounded-xl border px-3 text-[13px] font-semibold transition-colors touch-manipulation active:scale-[0.98]',
                            on
                              ? 'border-elec-yellow bg-elec-yellow/[0.14] text-white'
                              : 'border-white/[0.12] bg-white/[0.03] text-white'
                          )}
                        >
                          {on && <Check className="h-3.5 w-3.5 text-elec-yellow" strokeWidth={3} />}
                          {JOB_TYPES[k]}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className={eyebrowCn}>How far you travel</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[5, 10, 15, 20, 25, 30, 40, 50].map((m) => (
                      <button
                        key={m}
                        type="button"
                        aria-pressed={radius === m}
                        onClick={() => setRadius(m)}
                        className={cn(
                          'h-11 min-w-[64px] rounded-xl border px-3 text-[13px] font-semibold tabular-nums transition-colors touch-manipulation',
                          radius === m
                            ? 'border-elec-yellow bg-elec-yellow text-black'
                            : 'border-white/[0.12] bg-white/[0.03] text-white'
                        )}
                      >
                        {m} mi
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-[12.5px] leading-snug text-white">
                    Measured from the office postcode in your company profile.
                  </p>
                </div>
                {prefsDirty && (
                  <button
                    type="button"
                    disabled={savePrefs.isPending}
                    onClick={async () => {
                      try {
                        await savePrefs.mutateAsync({ services, radius });
                        toast({ title: 'Saved', description: 'New enquiries are judged on this.' });
                      } catch (err) {
                        toast({
                          title: 'Could not save',
                          description: (err as Error).message,
                          variant: 'destructive',
                        });
                      }
                    }}
                    className={cn(primaryButtonCn, 'w-full sm:w-auto')}
                  >
                    Save
                  </button>
                )}
              </div>
            </motion.section>

            {inbox && <PhoneLineSection ownerId={inbox.user_id} />}

            {/* More */}
            <motion.section variants={itemVariants} className="space-y-3">
              <SectionTitle title="More options" />
              {inbox && inbox.blocked_senders.length > 0 && (
                <Collapsible title={`Blocked senders (${inbox.blocked_senders.length})`}>
                  <p className="text-[14px] leading-snug text-white">
                    Emails from these are dropped before they reach you. Senders that only ever send
                    junk are added automatically. Tap one to let it through again.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {inbox.blocked_senders.map((b) => (
                      <button
                        key={b}
                        type="button"
                        disabled={unblock.isPending}
                        onClick={async () => {
                          try {
                            await unblock.mutateAsync({ sender: b, blocked: false });
                            toast({ title: `${b} unblocked` });
                          } catch {
                            toast({ title: 'Could not unblock', variant: 'destructive' });
                          }
                        }}
                        className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-3 font-mono text-[13px] text-white touch-manipulation hover:border-white/[0.3]"
                      >
                        {b}
                        <span className="font-sans text-[12px] font-semibold text-elec-yellow">
                          Unblock
                        </span>
                      </button>
                    ))}
                  </div>
                </Collapsible>
              )}

              <Collapsible title="For your web developer">
                <p className="text-[14px] leading-snug text-white">
                  A form can post straight to Elec-Mate instead of emailing. Any field names work;
                  these are the ones we look for first: name, email, phone, address, postcode,
                  message. Add <span className="font-mono">&amp;redirect=</span> with a thank-you
                  page on the same site. This link is separate from your email address, so it is
                  safe in page code.
                </p>
                <p className="break-all rounded-xl bg-black/20 p-3 font-mono text-[13px] text-white">
                  {postUrl}
                </p>
                <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-xl bg-black/20 p-3 font-mono text-[11.5px] leading-snug text-white">
                  {snippet}
                </pre>
                <div className="grid gap-2 sm:grid-cols-2">
                  <CopyButton
                    value={postUrl}
                    label="Copy link"
                    copiedTitle="Form link copied"
                    variant="ghost"
                  />
                  <CopyButton
                    value={snippet}
                    label="Copy example form"
                    copiedTitle="Example form copied"
                    variant="ghost"
                  />
                </div>
              </Collapsible>

              <Collapsible title="Getting spam?">
                <p className="text-[14px] leading-snug text-white">
                  Get a new address and form link. The old ones stop working straight away, so
                  update your website form and Gmail filter afterwards.
                </p>
                {confirmReset ? (
                  <div className={warningPanelCn}>
                    <p className="text-[13px] font-semibold text-orange-300">
                      Your current address and link will stop working
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setConfirmReset(false)}
                        className={ghostButtonCn}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={reset.isPending}
                        onClick={async () => {
                          await reset.mutateAsync('both');
                          setConfirmReset(false);
                          toast({
                            title: 'New address ready',
                            description: 'Update your website form and Gmail filter.',
                          });
                        }}
                        className={primaryButtonCn}
                      >
                        Get new ones
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmReset(true)}
                    className={cn(ghostButtonCn, 'w-full')}
                  >
                    Get a new address and link
                  </button>
                )}
              </Collapsible>
            </motion.section>
          </div>

          {/* ── Side: what you paste / share ─────────────────────── */}
          <div className="order-first min-w-0 space-y-4 lg:order-last">
            {/* Address */}
            <motion.div variants={itemVariants} className={cn(cardCn, 'overflow-hidden')}>
              <div className="bg-gradient-to-br from-elec-yellow/[0.16] to-transparent px-4 pb-4 pt-4 sm:px-5">
                <p className={cn(eyebrowCn, 'text-elec-yellow')}>Your enquiry address</p>
                {isLoading || !inbox ? (
                  <div className="mt-3 h-6 animate-pulse rounded bg-white/[0.08]" />
                ) : (
                  <p className="mt-2 break-all font-mono text-[15px] font-semibold leading-snug text-white">
                    {address}
                  </p>
                )}
                <p className="mt-2 text-[12.5px] leading-snug text-white">
                  Customers never see it. It sits behind your website form and Gmail.
                </p>
              </div>
              <div className="space-y-3 border-t border-white/[0.1] px-4 py-4 sm:px-5">
                {inbox && (
                  <CopyButton value={address} label="Copy address" copiedTitle="Address copied" />
                )}
                {inbox && (
                  <label
                    htmlFor="receive-enquiries"
                    className="flex min-h-11 cursor-pointer items-center justify-between gap-3 touch-manipulation"
                  >
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-white">
                        {inbox.enabled ? 'Receiving enquiries' : 'Paused'}
                      </p>
                      <p className="truncate text-[12px] text-white">
                        {inbox.last_received_at
                          ? `Last one ${formatDistanceToNow(new Date(inbox.last_received_at), { addSuffix: true })}`
                          : 'Nothing received yet'}
                      </p>
                    </div>
                    <Switch
                      id="receive-enquiries"
                      checked={inbox.enabled}
                      disabled={setEnabled.isPending}
                      onCheckedChange={(v) => setEnabled.mutate(v)}
                      aria-label="Receive enquiries"
                    />
                  </label>
                )}
              </div>
            </motion.div>

            {/* Enquiry page */}
            <motion.div variants={itemVariants} className={cn(cardCn, 'overflow-hidden')}>
              <div className="px-4 pt-4 sm:px-5">
                <p className={eyebrowCn}>Your enquiry page</p>
                <p className="mt-1 text-[13px] leading-snug text-white">
                  For Facebook, your bio, the van, or no website at all. Customers can add photos.
                </p>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_112px] items-center gap-4 px-4 py-4 sm:px-5">
                {/* Mini preview of the hosted page */}
                <a
                  href={pageUrl || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open your enquiry page"
                  className="block rounded-xl border border-white/[0.12] bg-[#0a0e17] p-3 transition-colors hover:border-white/[0.25] touch-manipulation"
                >
                  <div className="h-0.5 rounded-full bg-gradient-to-r from-elec-yellow to-orange-400" />
                  <div className="mt-2.5 flex items-center gap-2">
                    {companyProfile?.logo_url ? (
                      <img
                        src={companyProfile.logo_url}
                        alt=""
                        className="h-6 w-6 rounded-md object-cover"
                      />
                    ) : (
                      <span className="grid h-6 w-6 place-items-center rounded-md bg-elec-yellow/15">
                        <Zap className="h-3.5 w-3.5 text-elec-yellow" />
                      </span>
                    )}
                    <span className="truncate text-[11.5px] font-semibold text-white">
                      {businessName}
                    </span>
                  </div>
                  <div className="mt-2.5 space-y-1.5" aria-hidden>
                    <div className="h-4 rounded bg-white/[0.07]" />
                    <div className="h-4 rounded bg-white/[0.07]" />
                    <div className="h-7 rounded bg-white/[0.07]" />
                    <div className="h-4 rounded bg-elec-yellow" />
                  </div>
                </a>

                {/* QR */}
                <div className="rounded-xl bg-white p-2">
                  {pageUrl ? (
                    <QRCodeCanvas
                      ref={qrRef}
                      value={pageUrl}
                      size={512}
                      marginSize={1}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  ) : (
                    <div className="aspect-square animate-pulse rounded bg-black/10" />
                  )}
                </div>
              </div>

              {inbox && (
                <div className="space-y-2 border-t border-white/[0.1] px-4 py-4 sm:px-5">
                  <p className="break-all font-mono text-[12.5px] text-white">{pageUrl}</p>
                  <CopyButton
                    value={pageUrl}
                    label="Copy page link"
                    copiedTitle="Link copied"
                    variant="ghost"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(ghostButtonCn, 'flex items-center justify-center gap-2')}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open
                    </a>
                    <button
                      type="button"
                      onClick={downloadQr}
                      className={cn(ghostButtonCn, 'flex items-center justify-center gap-2')}
                    >
                      <Download className="h-4 w-4" />
                      QR code
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnquiriesSetupPage;
