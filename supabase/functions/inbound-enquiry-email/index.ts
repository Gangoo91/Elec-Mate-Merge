/**
 * Inbound enquiry email (ELE-2022)
 *
 * Called by the Cloudflare Email Worker (services/inbound-email-worker) for every
 * message sent to <prefix>-<token>@in.elec-mate.com. Also accepts the same JSON
 * from a website form via POST /inbound-enquiry-email?token=<token> (no secret),
 * for forms that can post but can't email.
 *
 *   1. token → the account's inbox (404 if unknown or switched off)
 *   2. Gmail forwarding confirmation → stored on the inbox, not as an enquiry
 *   3. rate limit + auto-reply / loop filtering
 *   4. AI reads name / phone / email / postcode / job out of the message
 *   5. match an existing customer by phone or email (never creates one)
 *   6. insert into enquiries (status new) + bell + push
 *
 * verify_jwt = false: authenticated by INBOUND_EMAIL_SECRET (worker) or by the
 * unguessable inbox token (form posts).
 */

const serve = Deno.serve;
import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';
import { readEnquiry, type JobKey } from '../_shared/enquiry-reader.ts';
import { proposeVisits, type ProposedSlot } from '../_shared/visit-planner.ts';
// Gap #7: bills-<token>@ addresses are supplier bills, not enquiries (own module)
import { handleBillsEmail, openAiBillReader } from '../_shared/emailed-bills.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Domains that receive enquiry email (set INBOUND_EMAIL_DOMAINS, comma separated,
// when the dedicated domain is connected). The old one keeps working alongside.
const INBOUND_DOMAINS = new Set(
  (Deno.env.get('INBOUND_EMAIL_DOMAINS') ?? 'in.elec-mate.com')
    .split(',')
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean)
);
const MAX_EMAILS_PER_HOUR = 30;
// Everything that reaches the address, junk included: bounds AI cost if a whole inbox is forwarded
const MAX_ALL_MAIL_PER_HOUR = 100;
const MAX_FORM_POSTS_PER_HOUR = 10;
// Over the form limit: kept in Spam (no AI read) up to this many, so a real
// customer caught behind a bot flood is never silently lost
const MAX_HELD_FORM_POSTS_PER_HOUR = 50;
// Quote-page leads arrive via a database trigger from a public page: their own cap
const MAX_INTERNAL_PER_HOUR: Record<string, number> = { quote_page: 20, phone: 60, sms: 60 };
// Sources that are not email, so they never use up the email allowance
const NOT_EMAIL = '(form_post,quote_page,phone,sms,manual)';
const SOURCE_LABEL_SERVER: Record<string, string> = {
  website: 'your website',
  form_post: 'your website',
  email: 'email',
  quote_page: 'your quote page',
  phone: 'a phone call',
  sms: 'a text',
  checkatrade: 'Checkatrade',
  mybuilder: 'MyBuilder',
  bark: 'Bark',
  ratedpeople: 'Rated People',
  trustatrader: 'TrustATrader',
  yell: 'Yell',
};
const URGENT_BYPASS_EVERY_MS = 6 * 3600_000; // one quiet-hours bypass per 6h per account

type Source =
  | 'website'
  | 'email'
  | 'checkatrade'
  | 'mybuilder'
  | 'bark'
  | 'ratedpeople'
  | 'trustatrader'
  | 'yell'
  | 'form_post'
  | 'quote_page'
  | 'phone'
  | 'sms';

interface InboundPayload {
  to?: string;
  envelope_from?: string;
  from?: string;
  from_name?: string | null;
  reply_to?: string | null;
  subject?: string;
  text?: string;
  html?: string;
  message_id?: string | null;
  original_from?: string | null;
  auto_submitted?: string | null;
  list_unsubscribe?: string | null;
  precedence?: string | null;
  // Form-post fields (when posted straight from a website form)
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  postcode?: string;
  message?: string;
  // Honeypot: real people never fill this (hidden field in the example form)
  company_website?: string;
  // "Send a test enquiry" on the set-up page: stored and flagged, never alerts
  is_test?: boolean | string;
  // Internal callers only (service key): which channel this came in on
  channel?: string;
  employer_lead_id?: string;
  call_sid?: string;
  // Internal only: add this to an existing card (voicemail, follow-up text) and re-read the lot
  append_to?: string;
  append_kind?: 'voicemail' | 'sms';
  voicemail_seconds?: number;
  photos?: Array<{ filename: string | null; mime_type: string; data: string }>;
}

const LEAD_SITES: Array<[RegExp, Source]> = [
  [/checkatrade\.com$/i, 'checkatrade'],
  [/mybuilder\.com$/i, 'mybuilder'],
  [/bark\.com$/i, 'bark'],
  [/ratedpeople\.com$/i, 'ratedpeople'],
  [/trustatrader\.com$/i, 'trustatrader'],
  [/yell\.com$/i, 'yell'],
];

// Form builders that send "new submission" notification emails
const FORM_SENDERS =
  /(wix\.com|wixforms|squarespace|wordpress|wpforms|jotform|typeform|formspree|framer|godaddy|webflow|hubspot|google\.com\/forms|forms-receipts|elementor|ninjaforms|gravityforms|contactform)/i;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function domainOf(address: string | null | undefined): string {
  return (address ?? '').split('@')[1]?.toLowerCase().replace(/>$/, '') ?? '';
}

// Never a customer's address: system senders, lead sites, form builders, us
const NOT_A_CUSTOMER =
  /^(no-?reply|do-?not-?reply|notifications?|mailer-daemon|postmaster|bounce|forms?|wordpress|support|info@checkatrade)/i;

function usableCustomerEmail(
  email: string | null | undefined,
  ownEmails: Set<string>
): string | null {
  const e = email?.trim().toLowerCase().replace(/^<|>$/g, '') ?? '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return null;
  if (ownEmails.has(e)) return null;
  if (NOT_A_CUSTOMER.test(e)) return null;
  const dom = domainOf(e);
  if (dom.endsWith('elec-mate.com')) return null;
  if (LEAD_SITES.some(([re]) => re.test(dom))) return null;
  if (FORM_SENDERS.test(dom)) return null;
  return e;
}

/** The account's own addresses, so a hand-forwarded email isn't read as from the customer. */
async function ownEmailsFor(supabase: SupabaseClient, userId: string): Promise<Set<string>> {
  const out = new Set<string>();
  try {
    const { data } = await supabase.auth.admin.getUserById(userId);
    if (data?.user?.email) out.add(data.user.email.toLowerCase());
  } catch {
    /* ignore */
  }
  const { data: cp } = await supabase
    .from('company_profiles')
    .select('company_email, notification_email')
    .eq('user_id', userId)
    .maybeSingle();
  for (const v of [cp?.company_email, cp?.notification_email]) {
    if (v) out.add(String(v).toLowerCase().trim());
  }
  return out;
}

const escapeLike = (v: string) => v.replace(/[\\%_]/g, (m) => '\\' + m);

// ── Junk guard ──────────────────────────────────────────────────────────────
// Customers write from these, so they are never auto-blocked as a whole domain
const PERSONAL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'hotmail.co.uk',
  'outlook.com',
  'outlook.co.uk',
  'live.com',
  'live.co.uk',
  'msn.com',
  'yahoo.com',
  'yahoo.co.uk',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'aol.co.uk',
  'btinternet.com',
  'btopenworld.com',
  'sky.com',
  'virginmedia.com',
  'ntlworld.com',
  'blueyonder.co.uk',
  'talktalk.net',
  'tiscali.co.uk',
  'protonmail.com',
  'proton.me',
  'mail.com',
  'gmx.com',
  'gmx.co.uk',
  'zoho.com',
]);
const JUNK_WARNING_THRESHOLD = 5; // junk emails in 24h before we warn
const AUTO_BLOCK_AFTER = 3; // junk from one company domain, with no real enquiry, before blocking

function senderOf(p: InboundPayload): { address: string; domain: string } {
  const raw = (p.original_from || p.from || '').toLowerCase();
  const address = raw.match(/[^\s<>"]+@[^\s<>"]+/)?.[0] ?? raw;
  return { address, domain: domainOf(address) };
}

/** After a junk email is stored: warn once if the inbox is being flooded, and auto-block repeat offenders. */
async function junkGuard(
  supabase: SupabaseClient,
  ownerId: string,
  sender: { address: string; domain: string },
  alreadyWarnedAt: string | null,
  ownEmails: Set<string>
) {
  const dayAgo = new Date(Date.now() - 24 * 3600_000).toISOString();
  const { count: junkToday } = await supabase
    .from('enquiries')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', ownerId)
    .eq('status', 'spam')
    .neq('source', 'form_post')
    .gte('received_at', dayAgo);

  const weekAgo = Date.now() - 7 * 24 * 3600_000;
  if (
    (junkToday ?? 0) >= JUNK_WARNING_THRESHOLD &&
    (!alreadyWarnedAt || new Date(alreadyWarnedAt).getTime() < weekAgo)
  ) {
    await supabase
      .from('enquiry_inboxes')
      .update({ junk_warning_at: new Date().toISOString(), junk_warning_dismissed_at: null })
      .eq('user_id', ownerId);
    for (const userId of await recipients(supabase, ownerId)) {
      await supabase.from('user_notifications').insert({
        user_id: userId,
        type: 'enquiry_junk',
        title: 'Lots of junk is reaching Enquiries',
        message: `${junkToday} emails in the last day weren't enquiries. It looks like all your email is being forwarded. A Gmail filter fixes it in a minute.`,
        link: '/electrician/enquiries/setup#gmail',
        metadata: { junk_today: junkToday },
        is_read: false,
      });
    }
  }

  // Auto-block the exact ADDRESS that only ever sends junk (news@…, offers@…).
  // Never a whole domain (a letting agent's invoices must not block their next
  // EICR request), never the electrician's own addresses or domains, never lead
  // sites or form builders. Blocked mail is still filed under Spam, not lost.
  const addr = sender.address;
  const d = sender.domain;
  const ownDomains = new Set([...ownEmails].map((e) => e.split('@')[1]).filter(Boolean));
  if (
    !addr ||
    ownEmails.has(addr) ||
    (ownDomains.has(d) && !PERSONAL_DOMAINS.has(d)) ||
    LEAD_SITES.some(([re]) => re.test(d)) ||
    FORM_SENDERS.test(d) ||
    d.endsWith('google.com') ||
    d.endsWith('elec-mate.com')
  ) {
    return;
  }
  const monthAgo = new Date(Date.now() - 30 * 24 * 3600_000).toISOString();
  const pattern = `%${escapeLike(addr)}%`;
  const [{ count: junkFrom }, { count: realFrom }] = await Promise.all([
    supabase
      .from('enquiries')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', ownerId)
      .eq('status', 'spam')
      .ilike('raw_from', pattern)
      .gte('received_at', monthAgo),
    supabase
      .from('enquiries')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', ownerId)
      .neq('status', 'spam')
      .ilike('raw_from', pattern),
  ]);
  if ((junkFrom ?? 0) >= AUTO_BLOCK_AFTER && (realFrom ?? 0) === 0) {
    const { data: inbox } = await supabase
      .from('enquiry_inboxes')
      .select('blocked_senders')
      .eq('user_id', ownerId)
      .maybeSingle();
    const list = new Set<string>((inbox?.blocked_senders as string[] | null) ?? []);
    if (!list.has(addr)) {
      list.add(addr);
      await supabase
        .from('enquiry_inboxes')
        .update({ blocked_senders: [...list] })
        .eq('user_id', ownerId);
    }
  }
}

/**
 * Website builders name fields however they like ("Full Name", "Phone Number",
 * "How can we help?", Framer/Webflow labels…). Map the common ones onto ours and
 * keep everything else as "Label: value" lines so the reader still sees it.
 */
const SKIP_FIELD =
  /^(_|token$|redirect$|companywebsite$|botfield$|grecaptcharesponse$|hcaptcharesponse$|cfturnstileresponse$|formname$|formid$|submit$|pageurl$|source$|istest$|siteurl$|createdat$|number$|title$|summary$|body$|id$|ip$|useragent$|referrer$|subject$|channel$|employerleadid$|callsid$|appendto$|appendkind$|voicemailseconds$|messageid$)/;

export function normaliseFormFields(input: Record<string, unknown>) {
  // Some builders wrap the fields: { data: {...} } / { fields: {...} } / { submission: {...} }
  let raw: Record<string, unknown> = input;
  for (const k of ['data', 'fields', 'submission', 'formData', 'payload']) {
    const v = input[k];
    if (v && typeof v === 'object' && !Array.isArray(v))
      raw = { ...input, ...(v as Record<string, unknown>) };
  }
  const out: Record<
    'name' | 'email' | 'phone' | 'address' | 'postcode' | 'message',
    string | undefined
  > = {
    name: undefined,
    email: undefined,
    phone: undefined,
    address: undefined,
    postcode: undefined,
    message: undefined,
  };
  let first = '';
  let last = '';
  const extras: string[] = [];
  for (const [label, value] of Object.entries(raw)) {
    if (value == null || typeof value === 'object') continue;
    const v = String(value).trim().slice(0, 4000);
    if (!v) continue;
    const k = label.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (
      SKIP_FIELD.test(k) ||
      ['data', 'fields', 'submission', 'formdata', 'payload', 'photos'].includes(k)
    )
      continue;
    const take = (key: keyof typeof out) => {
      if (!out[key]) out[key] = v;
      else extras.push(`${label}: ${v}`);
    };
    if (/^(first|fore)name$/.test(k)) first = v;
    else if (/^(last|sur)name$|^surname$/.test(k)) last = v;
    else if (/email/.test(k)) take('email');
    else if (/phone|mobile|tel|contactnumber|^number$/.test(k)) take('phone');
    else if (/postcode|postalcode|zip/.test(k)) take('postcode');
    else if (/address|street|town|city/.test(k)) take('address');
    else if (/^(full)?name$|yourname|contactname|^customer$/.test(k)) take('name');
    else if (
      /message|enquiry|inquiry|details|comment|description|howcanwehelp|job|work|notes|query|question/.test(
        k
      )
    )
      take('message');
    else extras.push(`${label}: ${v}`);
  }
  if (!out.name && (first || last)) out.name = `${first} ${last}`.trim();
  return { ...out, extras };
}

/**
 * Website-form webhooks (Netlify Forms and others) send uploaded files as links,
 * e.g. { photo1: { url, filename, type } }. Fetch up to 3 images, safely: https
 * only, no IP-literal / local hosts, image content only, 5 MB each, 8 s each.
 */
/** https, a real hostname, and (when DNS can be checked) not a private address. */
async function isPublicHttps(u: URL): Promise<boolean> {
  const host = u.hostname.toLowerCase();
  if (
    u.protocol !== 'https:' ||
    /^\d+\.\d+\.\d+\.\d+$/.test(host) ||
    host.includes(':') ||
    host === 'localhost' ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    !host.includes('.')
  ) {
    return false;
  }
  const privateV4 = (ip: string) =>
    /^(10\.|127\.|0\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.)/.test(
      ip
    );
  const privateV6 = (ip: string) => /^(::1|::|f[cd]|fe8|::ffff:)/i.test(ip);
  try {
    const [v4, v6] = await Promise.all([
      Deno.resolveDns(host, 'A').catch(() => [] as string[]),
      Deno.resolveDns(host, 'AAAA').catch(() => [] as string[]),
    ]);
    if (v4.some(privateV4) || v6.some(privateV6)) return false;
  } catch {
    /* DNS lookups unavailable here: the hostname checks above still apply */
  }
  return true;
}

export async function photosFromLinks(
  input: Record<string, unknown>
): Promise<Array<{ filename: string | null; mime_type: string; data: string }>> {
  const raw: Record<string, unknown> = {
    ...input,
    ...((input.data as Record<string, unknown>) ?? {}),
  };
  const urls: Array<{ url: string; filename: string | null }> = [];
  for (const v of Object.values(raw)) {
    const items = Array.isArray(v) ? v : [v];
    for (const it of items) {
      const o = it as { url?: unknown; filename?: unknown; type?: unknown } | null;
      if (o && typeof o === 'object' && typeof o.url === 'string') {
        urls.push({ url: o.url, filename: typeof o.filename === 'string' ? o.filename : null });
      }
    }
  }
  const out: Array<{ filename: string | null; mime_type: string; data: string }> = [];
  for (const { url, filename } of urls.slice(0, 6)) {
    if (out.length >= 3) break;
    try {
      // Every hop is checked: a public link must not redirect us somewhere internal
      let res: Response | null = null;
      let next = url;
      for (let hop = 0; hop < 4 && next; hop++) {
        const u = new URL(next);
        if (!(await isPublicHttps(u))) {
          res = null;
          break;
        }
        res = await fetch(u, { signal: AbortSignal.timeout(8000), redirect: 'manual' });
        const loc = res.status >= 300 && res.status < 400 ? res.headers.get('location') : null;
        next = loc ? new URL(loc, u).toString() : '';
        if (loc) res = null;
      }
      if (!res) continue;
      const type = (res.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase();
      if (!res.ok || !/^image\/(jpeg|png|webp|heic|heif)$/.test(type)) continue;
      const buf = new Uint8Array(await res.arrayBuffer());
      if (buf.byteLength < 2 * 1024 || buf.byteLength > 5 * 1024 * 1024) continue;
      let bin = '';
      for (let i = 0; i < buf.length; i += 0x8000)
        bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
      out.push({ filename, mime_type: type, data: btoa(bin) });
    } catch {
      /* skip this file */
    }
  }
  return out;
}

/** "isaacelectrical-3f9a0c1b2d@in.elec-mate.com" → "3f9a0c1b2d" */
function tokenFromAddress(to: string | undefined): string | null {
  if (!to) return null;
  const [local, domain] = to.toLowerCase().trim().split('@');
  if (!local || !INBOUND_DOMAINS.has(domain)) return null;
  const token = local.split('+')[0].split('-').pop() ?? '';
  return /^[a-z0-9]{8,16}$/.test(token) ? token : null;
}

function detectSource(p: InboundPayload): Source {
  const dom = domainOf(p.from);
  for (const [re, src] of LEAD_SITES) if (re.test(dom)) return src;
  const haystack = `${dom} ${p.subject ?? ''} ${(p.text ?? '').slice(0, 600)}`;
  if (
    FORM_SENDERS.test(haystack) ||
    /new (form )?(submission|enquiry|entry)|contact form/i.test(p.subject ?? '')
  ) {
    return 'website';
  }
  return 'email';
}

/** Digits only, UK-normalised: +44 7700 900123 → 07700900123 */
export function normalisePhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  let d = phone.replace(/\D/g, '');
  if (d.startsWith('44')) d = '0' + d.slice(2);
  if (d.startsWith('0044')) d = '0' + d.slice(4);
  return d.length >= 10 ? d : null;
}

function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|tr|li|h\d)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n\n')
    .trim();
}

function isGmailForwardingConfirmation(p: InboundPayload): boolean {
  return (
    /forwarding-noreply@google\.com/i.test(p.from ?? '') &&
    /forwarding confirmation/i.test(p.subject ?? '')
  );
}

async function storeForwardingConfirmation(supabase: SupabaseClient, userId: string, body: string) {
  const code = body.match(/Confirmation code:\s*(\d{6,12})/i)?.[1] ?? null;
  const link =
    body.match(/https:\/\/mail(?:-settings)?\.google\.com\/mail\/[^\s"'<>]+/i)?.[0] ?? null;
  await supabase
    .from('enquiry_inboxes')
    .update({
      forwarding_confirmation_code: code,
      forwarding_confirmation_link: link,
      forwarding_confirmation_at: new Date().toISOString(),
    })
    .eq('user_id', userId);
  await supabase.from('user_notifications').insert({
    user_id: userId,
    type: 'enquiry_forwarding',
    title: 'Gmail forwarding: one step left',
    message: code
      ? `Enter code ${code} in Gmail to finish forwarding enquiries to Elec-Mate.`
      : 'Open Enquiries settings to finish forwarding enquiries to Elec-Mate.',
    link: '/electrician/enquiries/setup',
    metadata: { code },
    is_read: false,
  });
}

async function matchCustomer(
  supabase: SupabaseClient,
  userId: string,
  email: string | null,
  phone: string | null
): Promise<{ id: string; name: string } | null> {
  if (email) {
    const { data } = await supabase
      .from('customers')
      .select('id, name')
      .eq('user_id', userId)
      .ilike('email', escapeLike(email))
      .limit(1);
    if (data?.[0]) return data[0];
  }
  const norm = normalisePhone(phone);
  if (norm) {
    // Match on the last 10 digits so "07700 900123" and "+44 7700 900123" agree
    const tail = norm.slice(-10);
    // Stored numbers carry spaces/dashes ("07700 900 123"): match the last six
    // digits with anything between them, then compare exactly in code
    const pattern = '%' + tail.slice(-6).split('').join('%');
    const { data } = await supabase
      .from('customers')
      .select('id, name, phone')
      .eq('user_id', userId)
      .not('phone', 'is', null)
      .ilike('phone', pattern)
      .limit(100);
    const hit = data?.find((c) => normalisePhone(c.phone)?.slice(-10) === tail);
    if (hit) return { id: hit.id, name: hit.name };
  }
  return null;
}

/** postcodes.io lookup + straight-line miles from the account's office. Never throws. */
async function locate(
  supabase: SupabaseClient,
  userId: string,
  postcode: string | null
): Promise<{ latitude: number; longitude: number; distance_miles: number | null } | null> {
  if (!postcode) return null;
  try {
    const res = await fetch(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode.replace(/\s+/g, ''))}`,
      { signal: AbortSignal.timeout(3000) }
    );
    if (!res.ok) return null;
    const { result } = await res.json();
    if (typeof result?.latitude !== 'number') return null;
    const { data: cp } = await supabase
      .from('company_profiles')
      .select('office_lat, office_lng')
      .eq('user_id', userId)
      .maybeSingle();
    let distance: number | null = null;
    if (typeof cp?.office_lat === 'number' && typeof cp?.office_lng === 'number') {
      const R = 3958.8;
      const toRad = (d: number) => (d * Math.PI) / 180;
      const dLat = toRad(result.latitude - cp.office_lat);
      const dLng = toRad(result.longitude - cp.office_lng);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(cp.office_lat)) * Math.cos(toRad(result.latitude)) * Math.sin(dLng / 2) ** 2;
      distance = Math.round(2 * R * Math.asin(Math.sqrt(a)) * 10) / 10;
    }
    return { latitude: result.latitude, longitude: result.longitude, distance_miles: distance };
  } catch {
    return null;
  }
}

/** The account owner plus the firm's active co-admins: everyone who works the inbox. */
async function recipients(supabase: SupabaseClient, ownerId: string): Promise<string[]> {
  const { data } = await supabase
    .from('employer_admins')
    .select('user_id')
    .eq('employer_id', ownerId)
    .eq('status', 'active');
  return [...new Set([ownerId, ...((data ?? []) as { user_id: string }[]).map((a) => a.user_id)])];
}

async function notify(
  supabase: SupabaseClient,
  ownerId: string,
  enquiryId: string,
  title: string,
  body: string,
  urgent: boolean,
  push = true,
  extraData: Record<string, unknown> = {}
) {
  const ownerLink = `/electrician/enquiries?open=${enquiryId}`;
  // A firm's co-admins work in the Employer Hub, where Enquiries is the
  // firm's front door (ELE-2094); the owner keeps their usual link.
  const firmLink = `/employer?section=leads&enquiry=${enquiryId}`;
  for (const userId of await recipients(supabase, ownerId)) {
    const link = userId === ownerId ? ownerLink : firmLink;
    await supabase.from('user_notifications').insert({
      user_id: userId,
      type: 'enquiry',
      title,
      message: body,
      link,
      metadata: { enquiry_id: enquiryId },
      is_read: false,
    });
    if (!push) continue;
    try {
      await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-push-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        },
        body: JSON.stringify({
          userId,
          title,
          body,
          type: 'default',
          data: {
            deep_link: link,
            category: 'enquiry_received',
            enquiry_id: enquiryId,
            ...extraData,
          },
          // A new enquiry is time-sensitive; an emergency one always gets through
          skipQuietHours: urgent,
        }),
      });
    } catch {
      /* non-critical — the enquiry is stored and in the bell regardless */
    }
  }
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const url = new URL(req.url);
    const secret = Deno.env.get('INBOUND_EMAIL_SECRET');
    const fromWorker = !!secret && req.headers.get('x-inbound-secret') === secret;
    // Our own database triggers / functions (service key): may name the channel
    const internal =
      req.headers.get('authorization') === `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`;

    let p: InboundPayload;
    const ctype = req.headers.get('content-type') ?? '';
    if (
      ctype.includes('application/x-www-form-urlencoded') ||
      ctype.includes('multipart/form-data')
    ) {
      const form = await req.formData();
      p = Object.fromEntries([...form.entries()].map(([k, v]) => [k, String(v)])) as InboundPayload;
    } else {
      try {
        p = await req.json();
      } catch {
        return json({ error: 'invalid body' }, 400);
      }
    }

    // ── Gap #7: emailed supplier bills ─────────────────────────────────
    // A bills-<token>@ address that is a firm's bills inbox goes to the bills
    // path and returns here. Anything else (null) carries on unchanged below.
    if (fromWorker) {
      const openAiKey = Deno.env.get('OPENAI_API_KEY');
      const bills = await handleBillsEmail(p as Parameters<typeof handleBillsEmail>[0], {
        db: supabase,
        domains: INBOUND_DOMAINS,
        read: openAiKey
          ? openAiBillReader(openAiKey)
          : () => Promise.reject(new Error('Reading bills is not set up yet')),
      });
      if (bills) return json(bills.body, bills.status);
    }
    // ── end gap #7 ─────────────────────────────────────────────────────

    const isFormPost = !fromWorker;
    const redirect = isFormPost ? url.searchParams.get('redirect') : null;
    // A website visitor always gets a thank-you, whatever happened behind it
    // (spam, rate limit, paused inbox): never show them our errors.
    // Only back to the site the form was posted from (no open redirect)
    const safeRedirect = (target: string) => {
      try {
        const t = new URL(target);
        const src = req.headers.get('origin') || req.headers.get('referer') || '';
        const host = src ? new URL(src).hostname.replace(/^www\./, '') : '';
        return t.protocol === 'https:' && !!host && t.hostname.replace(/^www\./, '') === host;
      } catch {
        return false;
      }
    };
    const visitorDone = (fallback: Response) => {
      if (!isFormPost) return fallback;
      if (redirect && safeRedirect(redirect)) {
        return new Response(null, { status: 303, headers: { ...corsHeaders, Location: redirect } });
      }
      if ((req.headers.get('accept') ?? '').includes('text/html')) {
        return new Response(
          '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Thank you</title><body style="font-family:system-ui,sans-serif;max-width:480px;margin:15vh auto;padding:0 20px;text-align:center"><h1 style="font-size:22px">Thanks, your enquiry has been sent</h1><p>We\'ll be in touch soon.</p><p><a href="javascript:history.back()">Go back</a></p></body>',
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' } }
        );
      }
      return fallback;
    };

    // ── 1. Whose inbox? ────────────────────────────────────────────────
    const token = fromWorker
      ? tokenFromAddress(p.to)
      : (url.searchParams.get('token') ?? '').toLowerCase();
    if (!token || !/^[a-z0-9]{8,16}$/.test(token))
      return visitorDone(json({ error: 'unknown recipient' }, 404));

    // Email address token and website-form token are different: the form one is public
    const { data: inbox } = await supabase
      .from('enquiry_inboxes')
      .select(
        'user_id, enabled, last_urgent_push_at, junk_warning_at, blocked_senders, services, travel_radius_miles'
      )
      .eq(fromWorker ? 'token' : 'form_token', token)
      .maybeSingle();
    if (!inbox || !inbox.enabled) return visitorDone(json({ error: 'unknown recipient' }, 404));
    const userId = inbox.user_id as string;

    // Honeypot filled = bot. Pretend it worked.
    if (isFormPost && p.company_website?.trim()) return visitorDone(json({ ok: true }));

    // Website forms: accept any field names
    let extras: string[] = [];
    if (isFormPost) {
      const f = normaliseFormFields(p as unknown as Record<string, unknown>);
      p = {
        ...p,
        name: f.name,
        email: f.email,
        phone: f.phone,
        address: f.address,
        postcode: f.postcode,
        message: f.message,
      };
      extras = f.extras;
    }

    // Calls and texts: just what was said (the number is stored on the card)
    const phoneOrText = internal && (p.channel === 'phone' || p.channel === 'sms');
    const body = phoneOrText
      ? (p.message ?? '').slice(0, 20000)
      : isFormPost
        ? [
            p.name && `Name: ${p.name}`,
            p.email && `Email: ${p.email}`,
            p.phone && `Phone: ${p.phone}`,
            p.address && `Address: ${p.address}`,
            p.postcode && `Postcode: ${p.postcode}`,
            p.message && `Message: ${p.message}`,
            ...extras,
          ]
            .filter(Boolean)
            .join('\n')
            .slice(0, 20000)
        : (p.text?.trim() || htmlToText(p.html ?? '')).slice(0, 20000);

    // ── 2. Gmail forwarding confirmation ──────────────────────────────
    if (fromWorker && isGmailForwardingConfirmation(p)) {
      await storeForwardingConfirmation(supabase, userId, body);
      return json({ ok: true, kind: 'forwarding_confirmation' });
    }

    // ── 3. Filters ────────────────────────────────────────────────────
    if (fromWorker) {
      const auto = (p.auto_submitted ?? '').toLowerCase();
      if (auto && auto !== 'no') return json({ ok: true, skipped: 'auto_submitted' }, 202);
      if (domainOf(p.from).endsWith('elec-mate.com'))
        return json({ ok: true, skipped: 'loop' }, 202);
    }
    if (!body.trim()) return visitorDone(json({ ok: true, skipped: 'empty' }, 202));

    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    // Hard cap on all mail, junk included (AI cost). Email gets a retry, not a loss.
    if (fromWorker) {
      const { count: all } = await supabase
        .from('enquiries')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .not('source', 'in', NOT_EMAIL)
        .gte('received_at', since);
      if ((all ?? 0) >= MAX_ALL_MAIL_PER_HOUR) return json({ error: 'busy' }, 503);
    }

    // Per channel, spam excluded: a flood of bot form posts can't block real email.
    // Test posts count too (is_test comes from the request, so it can't buy a free pass).
    // Internal channels (quote page, calls, texts) each have their own allowance;
    // adding to an existing card makes no new row, so it isn't counted here.
    const internalSource =
      internal && ['quote_page', 'phone', 'sms'].includes(p.channel ?? '') ? p.channel! : null;
    const appending = internal && typeof p.append_to === 'string';
    let recent = supabase
      .from('enquiries')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .neq('status', 'spam')
      .gte('received_at', since);
    recent = internalSource
      ? recent.eq('source', internalSource)
      : isFormPost
        ? recent.eq('source', 'form_post')
        : recent.not('source', 'in', NOT_EMAIL);
    const { count } = appending ? { count: 0 } : await recent;
    const cap = internalSource
      ? MAX_INTERNAL_PER_HOUR[internalSource]
      : isFormPost
        ? MAX_FORM_POSTS_PER_HOUR
        : MAX_EMAILS_PER_HOUR;
    if ((count ?? 0) >= cap) {
      if (internalSource) return json({ error: 'rate limited' }, 429);
      // Email: temporary failure so the sending server retries later, nothing is lost
      if (!isFormPost) return json({ error: 'busy' }, 503);
      // Website form: keep it in Spam without an AI read, so a real customer behind a
      // bot flood can still be found. Beyond that, drop it.
      const { count: held } = await supabase
        .from('enquiries')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('source', 'form_post')
        .eq('status', 'spam')
        .gte('received_at', since);
      if ((held ?? 0) < MAX_HELD_FORM_POSTS_PER_HOUR) {
        await supabase.from('enquiries').insert({
          user_id: userId,
          source: 'form_post',
          status: 'spam',
          name: p.name ?? null,
          email: p.email ?? null,
          phone: p.phone ?? null,
          postcode: p.postcode?.toUpperCase() ?? null,
          job_description: p.message ?? null,
          summary: (p.message ?? 'Website enquiry').slice(0, 120),
          raw_text: body,
          fit_note: 'Held: unusually many form posts this hour',
        });
      }
      return visitorDone(json({ error: 'rate limited' }, 429));
    }

    // Form posts have no Message-ID: a webhook that times out and retries would
    // double up. Same token + same text within the hour = the same enquiry.
    if (isFormPost && !p.message_id) {
      const hourBucket = new Date().toISOString().slice(0, 13);
      const digest = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(`${token}|${hourBucket}|${body}`)
      );
      p.message_id =
        'form:' +
        [...new Uint8Array(digest)]
          .slice(0, 16)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
    }

    if (p.message_id) {
      const { data: dupe } = await supabase
        .from('enquiries')
        .select('id')
        .eq('user_id', userId)
        .eq('message_id', p.message_id)
        .maybeSingle();
      if (dupe) return visitorDone(json({ ok: true, duplicate: true, id: dupe.id }));
    }

    // Webhook photo links (Netlify Forms etc.) become real photos. Only now, after
    // the limits and the duplicate check, so a flood can't make us fetch anything.
    if (isFormPost && !internal && (!Array.isArray(p.photos) || !p.photos.length)) {
      const linked = await photosFromLinks(p as unknown as Record<string, unknown>);
      if (linked.length) p.photos = linked;
    }

    // Blocked senders and bulk mail are filed as spam WITHOUT the AI read: nothing
    // is silently lost (it's in the Spam tab), and junk costs nothing to process.
    if (fromWorker) {
      const blocked = new Set<string>((inbox.blocked_senders as string[] | null) ?? []);
      const sender = senderOf(p);
      const senderDomain = sender.domain;
      const isBlocked = blocked.has(sender.address) || blocked.has(senderDomain);
      const trusted =
        LEAD_SITES.some(([re]) => re.test(senderDomain)) || FORM_SENDERS.test(senderDomain);
      const bulk =
        !trusted &&
        (!!p.list_unsubscribe || /^(bulk|list|junk)$/i.test((p.precedence ?? '').trim()));
      if (isBlocked || bulk) {
        await supabase.from('enquiries').insert({
          user_id: userId,
          source: 'email',
          status: 'spam',
          summary: (p.subject || 'No subject').slice(0, 120),
          raw_from: p.from_name ? `${p.from_name} <${p.from ?? ''}>` : (p.from ?? null),
          raw_subject: p.subject ?? null,
          raw_text: body.slice(0, 5000),
          message_id: p.message_id ?? null,
          fit_note: isBlocked ? 'Blocked sender' : 'Newsletter or bulk mail',
        });
        if (bulk) {
          // A flood of newsletters is exactly the "forwarding everything" case
          try {
            await junkGuard(
              supabase,
              userId,
              sender,
              inbox.junk_warning_at as string | null,
              await ownEmailsFor(supabase, userId)
            );
          } catch (err) {
            console.error('[inbound-enquiry] junk guard failed', err);
          }
        }
        return json({ ok: true, filed: isBlocked ? 'blocked sender' : 'bulk mail' }, 202);
      }
    }

    // ── 4. Read it ────────────────────────────────────────────────────
    // A voicemail or follow-up text joins its card; the whole conversation is re-read
    // so a postcode in the second message still gets distance, fit and visit times.
    type Existing = {
      id: string;
      raw_text: string | null;
      visit_status: string | null;
      name: string | null;
      email: string | null;
      phone: string | null;
      address: string | null;
      postcode: string | null;
    };
    let existing: Existing | null = null;
    if (internal && typeof p.append_to === 'string' && /^[0-9a-f-]{36}$/i.test(p.append_to)) {
      const { data } = await supabase
        .from('enquiries')
        .select('id, raw_text, visit_status, name, email, phone, address, postcode')
        .eq('id', p.append_to)
        .eq('user_id', userId)
        .maybeSingle();
      existing = data as Existing | null;
    }
    // Append in the database in one step, so two texts seconds apart both land
    let readText = body;
    if (existing) {
      const { data: joined, error: joinErr } = await supabase.rpc('append_enquiry_text', {
        p_id: existing.id,
        p_text: body,
        p_message_id: p.message_id ?? null,
      });
      if (joinErr) throw joinErr;
      const out = joined as { status: string; text?: string };
      if (out.status === 'duplicate') return json({ ok: true, duplicate: true, id: existing.id });
      // Conversation is at its size limit: keep the card as it is
      if (out.status !== 'appended' || !out.text) {
        return json({ ok: true, id: existing.id, skipped: 'conversation too long' });
      }
      readText = out.text;
      // A very chatty card: keep the words, but don't re-read or re-alert every message
      const messages = readText.match(/\n\n(Text at|Voicemail|Called again)/g)?.length ?? 0;
      if (messages > 15) return json({ ok: true, id: existing.id, appended: true });
    }
    // The reader sees the first message and the latest ones, never only the old part
    const readInput =
      readText.length > 7500
        ? `${readText.slice(0, 2000)}\n\n[…earlier messages…]\n\n${readText.slice(-5000)}`
        : readText;

    const internalChannel =
      internal && ['quote_page', 'phone', 'sms'].includes(p.channel ?? '')
        ? (p.channel as Source)
        : null;
    const source: Source = internalChannel ?? (isFormPost ? 'form_post' : detectSource(p));
    const ownEmails = await ownEmailsFor(supabase, userId);

    // Photos are read by the AI as well as stored
    const photoCap = fromWorker ? 5 * 1024 * 1024 : 1.5 * 1024 * 1024;
    const photos = (Array.isArray(p.photos) ? p.photos : [])
      .filter(
        (ph) =>
          typeof ph?.data === 'string' &&
          ph.data.length * 0.75 <= photoCap &&
          /^image\/(jpeg|png|webp|heic|heif)$/i.test(ph?.mime_type ?? '')
      )
      .slice(0, fromWorker ? 4 : 3);

    // What the reader knows about this business
    const [{ data: cp }, { data: sent }] = await Promise.all([
      supabase
        .from('company_profiles')
        .select('company_name, company_postcode, company_phone')
        .eq('user_id', userId)
        .maybeSingle(),
      supabase
        .from('enquiries')
        .select('sent_message')
        .eq('user_id', userId)
        .not('sent_message', 'is', null)
        .eq('is_test', false)
        .order('first_actioned_at', { ascending: false })
        .limit(3),
    ]);
    const radius = (inbox.travel_radius_miles as number | null) ?? 25;
    const ex = await readEnquiry(
      {
        from: p.from,
        fromName: p.from_name,
        replyTo: p.reply_to,
        subject: p.subject,
        text: readInput,
        photos: photos.map((ph) => ({ mime_type: ph.mime_type, data: ph.data })),
      },
      {
        businessName: (cp?.company_name as string | null)?.trim() || null,
        baseArea: (cp?.company_postcode as string | null)?.trim() || null,
        services: (inbox.services as JobKey[] | null) ?? null,
        travelRadiusMiles: radius,
        ownEmails: [...ownEmails],
        ownPhone: (cp?.company_phone as string | null)?.trim() || null,
        ownPostcode: (cp?.company_postcode as string | null)?.trim() || null,
        toneSamples: ((sent ?? []) as { sent_message: string }[]).map((r) => r.sent_message),
      },
      // Evals only: prove the OpenAI backup works (worker secret + dry run required)
      {
        skipGemini:
          fromWorker &&
          url.searchParams.get('dry_run') === '1' &&
          url.searchParams.get('backup') === '1',
      }
    );

    // Forwarded by hand from the electrician's own address: the sender is not the customer
    const fromOwner = !isFormPost && ownEmails.has((p.from ?? '').toLowerCase());
    const fallbackEmail = isFormPost
      ? usableCustomerEmail(p.email, ownEmails)
      : (usableCustomerEmail(p.reply_to, ownEmails) ??
        usableCustomerEmail(p.original_from, ownEmails) ??
        (source === 'email' && !fromOwner ? usableCustomerEmail(p.from, ownEmails) : null));

    const fields = {
      name:
        ex?.name ??
        (isFormPost ? p.name : source === 'email' && !fromOwner ? p.from_name : null) ??
        null,
      email: usableCustomerEmail(ex?.email, ownEmails) ?? fallbackEmail,
      phone: ex?.phone ?? (isFormPost ? p.phone : null) ?? null,
      address: ex?.address ?? (isFormPost ? p.address : null) ?? null,
      postcode: ex?.postcode ?? (isFormPost ? p.postcode?.toUpperCase() : null) ?? null,
      job_description: ex?.job_description ?? (isFormPost ? p.message : null) ?? null,
      job_key: ex?.job_key ?? null,
      job_type: ex?.job_type ?? null,
      work_category: ex?.work_category ?? null,
      urgency: ex?.urgency ?? null,
      summary: ex?.summary ?? (p.subject || null),
      confidence: ex?.confidence ?? null,
      not_our_work: ex?.not_our_work ?? false,
      contact_hidden: ex?.contact_hidden ?? false,
      photo_findings: ex?.photo_findings ?? [],
      photo_danger: ex?.photo_danger ?? false,
      draft_reply: ex?.reply ?? null,
      availability: ex?.availability ?? null,
      ai_model: ex?.model ?? null,
      prompt_version: ex?.prompt_version ?? null,
    };

    // ── 5. Existing customer? ─────────────────────────────────────────
    const [match, place] = await Promise.all([
      matchCustomer(supabase, userId, fields.email, fields.phone),
      locate(supabase, userId, fields.postcode),
    ]);

    // Fit: distance is arithmetic, never the model's guess
    const outOfArea = place?.distance_miles != null && place.distance_miles > radius;
    // Short, consistent labels written here, not by the model
    const offered = (inbox.services as JobKey[] | null) ?? null;
    const fit_note = outOfArea
      ? `Outside your ${radius}-mile area`
      : fields.job_key === 'not_electrical'
        ? 'Not electrical work'
        : offered &&
            fields.job_key &&
            fields.job_key !== 'other' &&
            !offered.includes(fields.job_key)
          ? `${fields.job_type} isn't on your list`
          : fields.not_our_work
            ? 'Probably not your kind of job'
            : null;

    // Dry run (evals): same read, nothing stored. Worker secret required.
    if (fromWorker && url.searchParams.get('dry_run') === '1') {
      return json({
        ok: true,
        dry_run: true,
        fields,
        fit_note,
        distance_miles: place?.distance_miles ?? null,
        matched: match?.name ?? null,
        is_enquiry: ex?.is_enquiry ?? null,
      });
    }

    // ── 6. Store ──────────────────────────────────────────────────────
    // A website form is an enquiry by definition (bots are caught by the honeypot);
    // only emails can be filed as spam by the reader
    const looksLikeSpam = !isFormPost && ex !== null && !ex.is_enquiry;
    // "Send a test" from the set-up page: honoured only for the signed-in owner or a co-admin
    let isTest = false;
    if (isFormPost && (p.is_test === true || p.is_test === 'true')) {
      const jwt = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
      if (jwt) {
        const { data: who } = await supabase.auth.getUser(jwt);
        const uid = who?.user?.id;
        if (uid) isTest = (await recipients(supabase, userId)).includes(uid);
      }
    }
    const voicemailSeconds =
      internal && Number.isFinite(Number(p.voicemail_seconds))
        ? Math.round(Number(p.voicemail_seconds))
        : null;
    if (existing) {
      // Keep what we already knew where the new read found nothing
      const keep = Object.fromEntries(
        Object.entries(fields).filter(([, v]) => v !== null && v !== undefined)
      );
      const { error: upErr } = await supabase
        .from('enquiries')
        .update({
          ...keep,
          fit_note,
          ...(match ? { matched_customer_id: match.id } : {}),
          ...(voicemailSeconds != null ? { voicemail_seconds: voicemailSeconds } : {}),
          ...(place ?? {}),
        })
        .eq('id', existing.id);
      if (upErr) throw upErr;
    }
    const { data: row, error } = existing
      ? { data: { id: existing.id }, error: null }
      : await supabase
          .from('enquiries')
          .insert({
            user_id: userId,
            source,
            status: looksLikeSpam ? 'spam' : 'new',
            ...fields,
            raw_from: p.from_name ? `${p.from_name} <${p.from ?? ''}>` : (p.from ?? null),
            raw_subject: p.subject ?? null,
            raw_text: body,
            message_id: p.message_id ?? null,
            matched_customer_id: match?.id ?? null,
            is_test: isTest,
            fit_note,
            employer_lead_id:
              internal &&
              typeof p.employer_lead_id === 'string' &&
              /^[0-9a-f-]{36}$/i.test(p.employer_lead_id)
                ? p.employer_lead_id
                : null,
            call_sid: internal && typeof p.call_sid === 'string' ? p.call_sid.slice(0, 64) : null,
            voicemail_seconds: voicemailSeconds,
            ...(place ?? {}),
          })
          .select('id')
          .single();
    if (error) {
      // Unique (user_id, message_id) race with a parallel delivery = already stored
      if (error.code === '23505') return json({ ok: true, duplicate: true });
      throw error;
    }

    await supabase
      .from('enquiry_inboxes')
      .update({ last_received_at: new Date().toISOString() })
      .eq('user_id', userId);

    if (looksLikeSpam) {
      try {
        await junkGuard(
          supabase,
          userId,
          senderOf(p),
          inbox.junk_warning_at as string | null,
          ownEmails
        );
      } catch (err) {
        console.error('[inbound-enquiry] junk guard failed', err);
      }
    }

    // ── 7. Photos (from the worker only) ──────────────────────────────
    // Email (worker): up to 4 × 5 MB. Hosted page / form posts: up to 3, already
    // shrunk in the browser, so anything over 1.5 MB there is not from our page.
    if (photos.length && !looksLikeSpam) {
      const paths: string[] = [];
      for (const [i, ph] of photos.entries()) {
        const ext = (ph.mime_type.split('/')[1] ?? 'jpg').replace('jpeg', 'jpg').slice(0, 5);
        const path = `${userId}/${row.id}/${i + 1}.${ext}`;
        try {
          const bytes = Uint8Array.from(atob(ph.data), (c) => c.charCodeAt(0));
          if (bytes.byteLength > photoCap) continue;
          const { error: upErr } = await supabase.storage
            .from('enquiry-photos')
            .upload(path, bytes, { contentType: ph.mime_type, upsert: true });
          if (!upErr) paths.push(path);
        } catch (err) {
          console.error(
            '[inbound-enquiry] photo upload failed',
            err instanceof Error ? err.message : err
          );
        }
      }
      if (paths.length) await supabase.from('enquiries').update({ photos: paths }).eq('id', row.id);
    }

    // Visit suggestions + alerts run AFTER the response: a website visitor gets
    // their thank-you straight away instead of waiting on the diary lookup.
    const afterResponse = async () => {
      // ── 8. Suggest visit times (approval needed; nothing is booked) ───
      let proposals: ProposedSlot[] = [];
      let visitToken: string | null = null;
      if (
        !looksLikeSpam &&
        !isTest &&
        // Booked, or "No visit" already decided: a new text doesn't reopen it
        existing?.visit_status !== 'booked' &&
        existing?.visit_status !== 'declined' &&
        !fit_note &&
        fields.urgency !== 'emergency' &&
        !fields.contact_hidden &&
        (fields.phone || fields.email)
      ) {
        proposals = await proposeVisits(
          supabase,
          userId,
          place ? { latitude: place.latitude, longitude: place.longitude } : null,
          fields.availability
        );
        if (proposals.length) {
          // Single-use code for the Book / No-visit buttons on the notification
          const raw = crypto.getRandomValues(new Uint8Array(24));
          visitToken = [...raw].map((b) => b.toString(16).padStart(2, '0')).join('');
          const hash = [
            ...new Uint8Array(
              await crypto.subtle.digest('SHA-256', new TextEncoder().encode(visitToken))
            ),
          ]
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
          const { error: saveErr } = await supabase
            .from('enquiries')
            .update({
              proposed_slots: proposals,
              visit_status: 'proposed',
              visit_action_hash: hash,
              visit_action_expires_at: new Date(Date.now() + 48 * 3600_000).toISOString(),
            })
            .eq('id', row.id);
          // No saved code = no buttons (they would only ever say "expired")
          if (saveErr) {
            console.error('[inbound-enquiry] saving proposals failed', saveErr.message);
            visitToken = null;
          }
        }
      }

      // An existing customer got in touch: on their timeline straight away
      if (!looksLikeSpam && !isTest && !existing && match) {
        await supabase.from('customer_activity_log').insert({
          customer_id: match.id,
          user_id: userId,
          activity_type: 'note',
          title: `New enquiry via ${SOURCE_LABEL_SERVER[source] ?? 'Enquiries'}`,
          description:
            [fields.summary, fields.job_description].filter(Boolean).join('\n\n').slice(0, 1000) ||
            null,
          metadata: { enquiry_id: row.id, source },
        });
      }

      if (!looksLikeSpam && !isTest) {
        const who = fields.name ?? fields.email ?? fields.phone ?? 'Someone';
        const what = fields.summary ?? fields.job_type ?? 'New enquiry';
        const kind =
          p.append_kind === 'voicemail'
            ? 'voicemail'
            : p.append_kind === 'sms'
              ? 'text'
              : 'enquiry';
        const title =
          fields.urgency === 'emergency'
            ? `⚠️ Urgent ${kind}: ${who}`
            : existing
              ? `${kind === 'text' ? 'Text' : kind === 'voicemail' ? 'Voicemail' : 'More'} from ${who}`
              : `New enquiry: ${who}`;
        const miles = place?.distance_miles != null ? ` · ${place.distance_miles} mi` : '';
        const pics = photos.length
          ? ` · ${photos.length} photo${photos.length > 1 ? 's' : ''}`
          : '';
        const visit = proposals[0]
          ? ` · Free ${proposals[0].label}${proposals[0].near_miles != null ? ' near another job' : ''}. Tap to book`
          : '';
        const line =
          (match ? `${what} · existing customer` : what) +
          miles +
          pics +
          (fit_note ? ` · ${fit_note}` : '') +
          visit;
        const lastBypass = inbox.last_urgent_push_at
          ? new Date(inbox.last_urgent_push_at).getTime()
          : 0;
        const bypass =
          fields.urgency === 'emergency' && Date.now() - lastBypass > URGENT_BYPASS_EVERY_MS;
        if (bypass) {
          await supabase
            .from('enquiry_inboxes')
            .update({ last_urgent_push_at: new Date().toISOString() })
            .eq('user_id', userId);
        }
        // Out of area / not their work: in the bell, but no push to interrupt them
        const quiet = !!fit_note && fields.urgency !== 'emergency';
        // Buttons: web push shows them now; the iOS app once its next build registers the category
        const visitData =
          visitToken && proposals[0]
            ? {
                action_token: visitToken,
                visit_book_title: `Book ${proposals[0].label}`,
                visit_label: proposals[0].label,
                // The exact time on the button; the server books this time or nothing
                slot_start: proposals[0].start,
                ios_category: 'ENQUIRY_VISIT',
                tag: `enquiry-${row.id}`,
              }
            : {};
        await notify(supabase, userId, row.id, title, line, bypass, !quiet, visitData);
      }
    };
    const runtime = (globalThis as { EdgeRuntime?: { waitUntil: (p: Promise<unknown>) => void } })
      .EdgeRuntime;
    const background = afterResponse().catch(async (err) => {
      console.error('[inbound-enquiry] after-response failed', err);
      await captureException(err, {
        functionName: 'inbound-enquiry-email',
        extra: { step: 'after-response' },
      });
    });
    if (runtime?.waitUntil) runtime.waitUntil(background);
    else await background;

    return visitorDone(json({ ok: true, id: row.id, status: looksLikeSpam ? 'spam' : 'new' }));
  } catch (err) {
    console.error('[inbound-enquiry] failed', err);
    await captureException(err, {
      functionName: 'inbound-enquiry-email',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: 'internal error' }, 500);
  }
});
