/**
 * Employer Hub → Quote page (ELE-1989).
 *
 * The owner or an admin edits the firm's public quote page, previews it,
 * sees views → requests, and gets everything needed to put it in front of
 * customers: van QR (PNG, SVG, print-ready PDF), a short link, Google Business
 * Profile steps, an email signature line, and a switch that adds the link to
 * every invoice and quote email.
 */
import { useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { generateQuotePosterPdf } from '@/utils/generateQuotePosterPdf';
import { useToast } from '@/hooks/use-toast';
import {
  useLeadPageConfig,
  useUpdateLeadPage,
  type LeadPageConfig,
  type LeadPagePatch,
  type QuotePageRecent,
} from '@/hooks/useLeadPageConfig';
import {
  PageFrame,
  PageHero,
  FormCard,
  Field,
  inputClass,
  textareaClass,
  PrimaryButton,
  SecondaryButton,
  LoadingBlocks,
  StatStrip,
} from '@/components/employer/editorial';
import {
  HowItWorks,
  PageHelpButton,
  type PageHelpContent,
  type HelpBlocker,
} from '@/components/hub/PageHelp';
import { Switch } from '@/components/ui/switch';
import {
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
  Printer,
  Plus,
  X,
  ImageIcon,
  Phone,
} from 'lucide-react';
import {
  PanelTitle,
  colClass,
  frameClass,
  heroPrimaryClass,
  twoColClass,
} from '@/components/employer/pageParts/PageParts';

const PUBLIC_ORIGIN = 'https://elec-mate.com';

const HELP: PageHelpContent = {
  id: 'employer-quote-page',
  title: 'Your quote page',
  what: 'A page with your name, colour and logo where a customer asks you for a quote in under a minute, with photos. Every request lands in Leads and Enquiries, and you get a bell, a push and an email.',
  steps: [
    {
      title: 'Fill it in',
      body: 'Add what you do, the areas you cover and the year you started. Your registration scheme and insurance come from Settings, and only show while they are in date.',
    },
    {
      title: 'Put it everywhere',
      body: 'Van QR, Google Business Profile, email signature, Facebook. The link also goes on every invoice and quote email unless you switch that off.',
    },
    {
      title: 'Answer fast',
      body: 'Requests arrive with the job, postcode, timing and photos. The first firm to call usually wins the job.',
    },
  ],
  notes: [
    {
      title: 'What customers never see',
      body: 'Your address, email, prices and anything else private. Reviews only show when real customers have left them.',
    },
    {
      title: 'Spam',
      body: 'Requests are rate limited on our side and bots are filtered out before they reach you.',
    },
  ],
  tasks: [
    {
      title: 'Set up your page',
      steps: [
        'Under Your page, type a link name. Pick it carefully: changing it later breaks printed QR codes.',
        'Add a headline and a few lines about you, the trading since year, and what you do and areas you cover (type one, then tap +).',
        'Tap Save changes.',
      ],
      who: 'The owner or an admin.',
      tour: [
        {
          target: 'quotepage.edit',
          caption: 'Fill in your page here, starting with the link name.',
        },
        { target: 'quotepage.save', caption: 'Tap Save changes when you are done.' },
      ],
    },
    {
      title: 'Put the page live',
      steps: [
        'At the top, switch on the toggle. It reads Your page is live.',
        'Tap Preview to see what customers see.',
        'Tap Copy or Share to send the short link.',
      ],
      after: 'Preview shows not available until the page is live.',
      who: 'The owner or an admin.',
      tour: [{ target: 'quotepage.live', caption: 'Switch it live, then Copy, Share or Preview.' }],
    },
    {
      title: 'Print a van sign or QR code',
      steps: [
        'Under Get it seen, tap Van sign PDF or A4 poster.',
        'Or tap QR (PNG), or QR (SVG) for a sign-writer.',
        'Scan it with your phone camera before you print.',
      ],
      tour: [{ target: 'quotepage.seen', caption: 'Van sign, poster and QR files are here.' }],
    },
    {
      title: 'Add the link to invoices and quotes',
      steps: [
        'Under Get it seen, find Every invoice and quote.',
        'Switch it on. A Get a quote link goes at the bottom of every invoice and quote email while the page is live.',
      ],
      tour: [
        { target: 'quotepage.seen', caption: 'Switch on Every invoice and quote in this card.' },
      ],
    },
    {
      title: 'Show your scheme and insurance',
      steps: [
        'Under Proof customers see, switch on Registration scheme or Insurance.',
        'If a switch is greyed out, add the scheme or insurer and expiry in Settings, Company, first.',
        'Anything out of date hides itself.',
      ],
      tour: [
        { target: 'quotepage.proof', caption: 'Switch on the proof you want customers to see.' },
      ],
    },
  ],
};

const SERVICE_SUGGESTIONS = [
  'Fault finding',
  'Fuse board upgrades',
  'EV chargers',
  'Rewires',
  'Sockets and lighting',
  'EICRs and landlord certificates',
  'Extensions and new builds',
  'Solar and batteries',
  'Outdoor and garden power',
  'Commercial work',
];

const slugify = (v: string) =>
  v
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 48);

/** Render the on-screen QR SVG to a high-res PNG data URL. */
const qrToPngDataUrl = (scale = 6): Promise<string> =>
  new Promise((resolve, reject) => {
    const svg = document.getElementById('quote-page-qr');
    if (!svg) return reject(new Error('QR not ready'));
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => reject(new Error('QR render failed'));
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  });

const downloadHref = (href: string, filename: string) => {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

interface Draft {
  slug: string;
  headline: string;
  about: string;
  services: string[];
  areas: string[];
  since: string;
}

const toDraft = (c: LeadPageConfig | null | undefined): Draft => ({
  slug: c?.lead_page_slug ?? (c?.company_name ? slugify(c.company_name) : ''),
  headline: c?.lead_page_headline ?? '',
  about: c?.lead_page_about ?? '',
  services: c?.lead_page_services ?? [],
  areas: c?.lead_page_areas ?? [],
  since: c?.lead_page_trading_since ? String(c.lead_page_trading_since) : '',
});

export function QuotePageSection() {
  const { toast } = useToast();
  const [, setSearchParams] = useSearchParams();
  const { data: config, isLoading, mayManage, refetch } = useLeadPageConfig();
  const update = useUpdateLeadPage();
  const [draft, setDraft] = useState<Draft>(toDraft(null));
  const [slugError, setSlugError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (config) setDraft(toDraft(config));
  }, [config]);

  const saved = toDraft(config);
  const dirty =
    JSON.stringify(draft) !== JSON.stringify(saved) || (!config?.lead_page_slug && !!draft.slug);
  const savedSlug = config?.lead_page_slug ?? '';
  const isLive = !!config?.lead_page_enabled && !!savedSlug;
  const fullUrl = savedSlug ? `${PUBLIC_ORIGIN}/get-quote/${savedSlug}` : '';
  const shortUrl = savedSlug ? `${PUBLIC_ORIGIN}/q/${savedSlug}` : '';
  const shortDisplay = shortUrl.replace(/^https:\/\//, '');

  const patchFromDraft = (): LeadPagePatch | null => {
    const clean = slugify(draft.slug).replace(/^-+|-+$/g, '');
    if (clean.length < 3) {
      setSlugError('Use at least 3 letters or numbers. It becomes your web address.');
      return null;
    }
    const since = draft.since.trim();
    if (since && !/^\d{4}$/.test(since)) {
      toast({
        title: 'Check the year',
        description: 'Enter the year you started, for example 2014.',
        variant: 'destructive',
      });
      return null;
    }
    return {
      lead_page_slug: clean,
      lead_page_headline: draft.headline.trim() || null,
      lead_page_about: draft.about.trim() || null,
      lead_page_services: draft.services,
      lead_page_areas: draft.areas,
      lead_page_trading_since: since ? Number(since) : null,
    };
  };

  const save = async (extra: LeadPagePatch = {}) => {
    const patch = patchFromDraft();
    if (!patch) return false;
    try {
      await update.mutateAsync({ ...patch, ...extra });
      setSlugError(null);
      return true;
    } catch (e) {
      const msg = e instanceof Error ? e.message : '';
      if (/taken|link name/i.test(msg)) setSlugError(msg);
      return false;
    }
  };

  const handleSave = async () => {
    if (await save()) toast({ title: 'Saved', description: 'Your quote page is up to date.' });
  };

  const toggleLive = async (on: boolean) => {
    if (on) {
      if (await save({ lead_page_enabled: true })) {
        toast({
          title: 'Your page is live',
          description: 'Now put it on the van and your Google profile.',
        });
      }
    } else {
      try {
        await update.mutateAsync({ lead_page_enabled: false });
        toast({
          title: 'Page hidden',
          description: 'Anyone opening the link sees that it is switched off.',
        });
      } catch {
        /* hook toasts */
      }
    }
  };

  const setFlag = async (patch: LeadPagePatch) => {
    try {
      await update.mutateAsync(patch);
    } catch {
      /* hook toasts */
    }
  };

  const copy = async (text: string, label: string) => {
    try {
      await copyToClipboard(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
      toast({ title: 'Copied', description: label });
    } catch {
      toast({ title: 'Copy failed', variant: 'destructive' });
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Get a quote from ${config?.company_name ?? 'us'}`,
          text: `Need an electrician? Ask ${config?.company_name ?? 'us'} for a free quote:`,
          url: shortUrl,
        });
        return;
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    void copy(shortUrl, 'Link copied');
  };

  const trustLine = useMemo(() => {
    if (!config?.lead_page_show_registration || !config.registration_scheme) return null;
    if (config.registration_expiry && new Date(config.registration_expiry) < new Date())
      return null;
    return `${config.registration_scheme} registered`;
  }, [config]);

  const artwork = async (variant: 'poster' | 'van') => {
    try {
      const qr = await qrToPngDataUrl(8);
      const { doc, filename } = await generateQuotePosterPdf(
        {
          companyName: config?.company_name ?? 'Your electrician',
          url: shortUrl,
          qrDataUrl: qr,
          colour: config?.colour,
          logo: config?.logo,
          phone: config?.phone,
          trustLine,
        },
        variant
      );
      await saveOrSharePdf(doc, filename);
    } catch {
      toast({ title: 'Could not make the PDF', variant: 'destructive' });
    }
  };

  const downloadPng = async () => {
    try {
      downloadHref(await qrToPngDataUrl(8), `quote-qr-${savedSlug}.png`);
    } catch {
      toast({ title: 'Could not make the QR image', variant: 'destructive' });
    }
  };

  const downloadSvg = () => {
    const svg = document.getElementById('quote-page-qr');
    if (!svg) return;
    const data = new XMLSerializer().serializeToString(svg);
    const url = URL.createObjectURL(new Blob([data], { type: 'image/svg+xml' }));
    downloadHref(url, `quote-qr-${savedSlug}.svg`);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  if (isLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Quote page" description="Loading your quote page." />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  // A failed background refresh keeps the page on screen; only no data at all shows this.
  if (!config) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Quote page" />
        <FormCard bleed>
          {mayManage ? (
            <>
              <p className="text-[14px] text-white">
                The quote page didn't load. Check your connection and try again.
              </p>
              <SecondaryButton onClick={() => refetch()}>Try again</SecondaryButton>
            </>
          ) : (
            <p className="text-[14px] text-white">
              Only the owner or an admin can change the quote page. Ask them to give you admin
              access if you look after the firm's marketing.
            </p>
          )}
        </FormCard>
      </PageFrame>
    );
  }

  const s = config.stats;
  const conv = (v: number, e: number) =>
    v > 0 ? `${Math.round((e / v) * 100)}% of views` : 'No views yet';
  const scheme =
    config.registration_scheme &&
    !(config.registration_expiry && new Date(config.registration_expiry) < new Date());
  const insured =
    !!config.insurance_provider &&
    !(config.insurance_expiry && new Date(config.insurance_expiry) < new Date());

  // Live "Before you start" lines for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] = [];
  const scrollToHelp = (key: string) =>
    document
      .querySelector(`[data-help="${key}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (!savedSlug) {
    helpBlockers.push({
      text: 'Save a link name first. Your link and QR code appear once it is saved.',
      fixLabel: 'Go to the link name',
      onFix: () => scrollToHelp('quotepage.edit'),
    });
  } else if (!isLive) {
    helpBlockers.push({
      text: 'Your page is hidden, so customers see not available.',
      fixLabel: 'Go to the live switch',
      onFix: () => scrollToHelp('quotepage.live'),
    });
  }

  const headline = !savedSlug
    ? 'Pick a link name and save it. Your link and QR code appear straight after.'
    : isLive
      ? s.enquiries_7 > 0
        ? `Live. ${s.enquiries_7} request${s.enquiries_7 === 1 ? '' : 's'} in the last 7 days, from ${s.views_7} view${s.views_7 === 1 ? '' : 's'}.`
        : `Live at ${shortDisplay}. No requests this week yet, so put it on the van and your Google profile.`
      : 'Hidden. Anyone opening the link sees not available until you switch it on.';

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="Quote page"
        description={headline}
        live={isLive ? { label: 'Live', tone: 'green' } : undefined}
        actions={
          <>
            {savedSlug && (
              <SecondaryButton
                onClick={() => openExternalUrl(`${fullUrl}?preview=1`)}
                className={heroPrimaryClass}
              >
                <ExternalLink className="h-4 w-4 mr-1.5" /> Preview
              </SecondaryButton>
            )}
            <PageHelpButton
              help={HELP}
              blockers={helpBlockers}
              askContext={{ page: 'quotepage' }}
            />
          </>
        }
      />
      <HowItWorks help={HELP} blockers={helpBlockers} askContext={{ page: 'quotepage' }} />

      {/* ── Numbers ────────────────────────────────────────────── */}
      <div className="space-y-2">
        <StatStrip
          columns={4}
          stats={[
            { label: 'Views, 7 days', value: s.views_7 },
            {
              label: 'Requests, 7 days',
              value: s.enquiries_7,
              tone: s.enquiries_7 > 0 ? 'emerald' : undefined,
              onClick: () => setSearchParams({ section: 'leads' }),
            },
            { label: 'Views, 30 days', value: s.views_30 },
            {
              label: 'Requests, 30 days',
              value: s.enquiries_30,
              sub: conv(s.views_30, s.enquiries_30),
              onClick: () => setSearchParams({ section: 'leads' }),
            },
          ]}
        />
        <p className="text-[12.5px] text-white">
          Views are counted from 7 October 2026, once per visitor per visit, with no third-party
          tracking. {config.leads_all} request{config.leads_all === 1 ? '' : 's'} from this page in
          total.
        </p>
      </div>

      <div className={twoColClass}>
        {/* ── Edit the page ────────────────────────────────────── */}
        <div className={colClass}>
          {/* ── Live switch + link ─────────────────────────────── */}
          <section data-help="quotepage.live">
            <PanelTitle title={isLive ? 'Your page is live' : 'Your page is hidden'} />
            <FormCard bleed>
              <div className="flex items-center justify-between gap-4">
                <p className="min-w-0 text-[14px] text-white">
                  {isLive
                    ? 'Anyone with the link or QR can ask you for a quote.'
                    : 'Switch it on when you are happy with it.'}
                </p>
                <Switch
                  checked={isLive}
                  disabled={update.isPending}
                  onCheckedChange={(v) => void toggleLive(v)}
                  aria-label="Quote page live"
                  className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-white/20"
                />
              </div>
              {savedSlug && (
                <>
                  <div className="flex flex-col gap-3 border-t border-white/[0.1] pt-4 sm:flex-row sm:items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-[12.5px] font-medium text-white">Your short link</p>
                      <p className="mt-0.5 break-all text-[16px] font-semibold text-white">
                        {shortDisplay}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
                      <SecondaryButton onClick={() => copy(shortUrl, 'Link copied')}>
                        {copied === 'Link copied' ? (
                          <Check className="h-4 w-4 mr-1.5" />
                        ) : (
                          <Copy className="h-4 w-4 mr-1.5" />
                        )}
                        Copy
                      </SecondaryButton>
                      <SecondaryButton onClick={share}>
                        <Share2 className="h-4 w-4 mr-1.5" /> Share
                      </SecondaryButton>
                    </div>
                  </div>
                  {!isLive && (
                    <p className="text-[13px] text-white">
                      Preview shows "not available" until the page is live.
                    </p>
                  )}
                </>
              )}
            </FormCard>
          </section>

          <section data-help="quotepage.edit">
            <PanelTitle title="Your page" meta="What customers read" />
            <FormCard bleed>
              <Field
                label="Link name"
                hint="Changing it later breaks any QR codes you have printed."
                required
              >
                <div className="flex items-center gap-1">
                  <span className="text-[14px] text-white whitespace-nowrap">elec-mate.com/q/</span>
                  <input
                    value={draft.slug}
                    onChange={(e) => {
                      setDraft({ ...draft, slug: slugify(e.target.value) });
                      setSlugError(null);
                    }}
                    placeholder="your-company"
                    className={inputClass}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-label="Link name"
                  />
                </div>
                {slugError && <p className="text-[13px] text-red-400">{slugError}</p>}
              </Field>

              <Field
                label="Headline"
                hint="The big line at the top. Leave blank and we use your areas."
              >
                <input
                  value={draft.headline}
                  onChange={(e) => setDraft({ ...draft, headline: e.target.value.slice(0, 120) })}
                  placeholder="Friendly, tidy electricians across Carlisle"
                  className={inputClass}
                />
              </Field>

              <Field label="About you" hint="Two or three sentences. Who you are and how you work.">
                <textarea
                  value={draft.about}
                  onChange={(e) => setDraft({ ...draft, about: e.target.value.slice(0, 1200) })}
                  rows={4}
                  placeholder="Family firm, 12 years in the trade. We turn up when we say, keep the place clean and explain everything before we start."
                  className={textareaClass}
                />
              </Field>

              <ChipEditor
                label="What you do"
                hint="These become the buttons customers tap first. Up to 12."
                values={draft.services}
                max={12}
                suggestions={SERVICE_SUGGESTIONS}
                placeholder="Add a service"
                onChange={(services) => setDraft({ ...draft, services })}
              />

              <ChipEditor
                label="Areas you cover"
                hint="Towns or postcode areas, e.g. Carlisle, CA1, Penrith."
                values={draft.areas}
                max={20}
                placeholder="Add a town or postcode area"
                onChange={(areas) => setDraft({ ...draft, areas })}
              />

              <Field
                label="Trading since"
                hint="The year you started. Shown as 'Trading since 2014'."
              >
                <input
                  value={draft.since}
                  onChange={(e) =>
                    setDraft({ ...draft, since: e.target.value.replace(/\D/g, '').slice(0, 4) })
                  }
                  inputMode="numeric"
                  placeholder="2014"
                  className={inputClass}
                />
              </Field>

              <PrimaryButton
                data-help="quotepage.save"
                onClick={handleSave}
                disabled={update.isPending || !dirty}
                className="w-full sm:w-auto sm:min-w-[160px]"
              >
                {update.isPending ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
              </PrimaryButton>
            </FormCard>
          </section>

          <section data-help="quotepage.proof">
            <PanelTitle title="Proof customers see" />
            <FormCard bleed>
              <p className="text-[13px] text-white">
                Only real facts from your account. Anything out of date is hidden automatically.
              </p>
              <ToggleRow
                title="Registration scheme"
                body={
                  scheme
                    ? `Shows "${config.registration_scheme} registered".`
                    : 'Add your scheme and number in Settings, Company, to show it.'
                }
                checked={config.lead_page_show_registration}
                disabled={!scheme || update.isPending}
                onChange={(v) => setFlag({ lead_page_show_registration: v })}
              />
              <ToggleRow
                title="Insurance"
                body={
                  insured
                    ? 'Shows that you are insured, with your cover amount if set.'
                    : 'Add your insurer and expiry in Settings, Company, to show it.'
                }
                checked={config.lead_page_show_insurance}
                disabled={!insured || update.isPending}
                onChange={(v) => setFlag({ lead_page_show_insurance: v })}
              />
              <ToggleRow
                title="Certificates issued"
                body="Shows how many electrical certificates your firm has completed in Elec-Mate, once it is 10 or more."
                checked={config.lead_page_show_certs}
                disabled={update.isPending}
                onChange={(v) => setFlag({ lead_page_show_certs: v })}
              />
              <div className="border-t border-white/[0.1] pt-3">
                <p className="text-[14px] font-semibold text-white">Reviews</p>
                <p className="text-[13px] text-white">
                  Shown automatically once customers leave you a review through Elec-Mate. We never
                  show made-up or imported reviews.
                </p>
              </div>
            </FormCard>
          </section>
        </div>

        {/* ── Requests + get it seen ──────────────────────────── */}
        <div className={colClass}>
          <RecentRequests
            recent={config.recent}
            onOpenLeads={() => setSearchParams({ section: 'leads' })}
          />

          <section data-help="quotepage.seen">
            <PanelTitle title="Get it seen" />
            <FormCard bleed>
              {!savedSlug ? (
                <p className="text-[14px] text-white">
                  Save a link name first and your QR code and links appear here.
                </p>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="rounded-2xl bg-white p-3 shrink-0">
                      <QRCodeSVG
                        id="quote-page-qr"
                        value={shortUrl}
                        size={150}
                        level="M"
                        marginSize={2}
                        bgColor="#ffffff"
                        fgColor="#0a0e17"
                      />
                    </div>
                    <p className="text-[13px] text-white text-center sm:text-left">
                      Scans straight to your page. Test it with your phone camera before you print.
                    </p>
                  </div>

                  <SeenItem title="Van and windows">
                    <p>A big QR on the back doors gets scanned in traffic and on site.</p>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <SecondaryButton onClick={() => artwork('van')} fullWidth>
                        <Printer className="h-4 w-4 mr-1.5" /> Van sign PDF
                      </SecondaryButton>
                      <SecondaryButton onClick={() => artwork('poster')} fullWidth>
                        <Printer className="h-4 w-4 mr-1.5" /> A4 poster
                      </SecondaryButton>
                      <SecondaryButton onClick={downloadPng} fullWidth>
                        <ImageIcon className="h-4 w-4 mr-1.5" /> QR (PNG)
                      </SecondaryButton>
                      <SecondaryButton onClick={downloadSvg} fullWidth>
                        <Download className="h-4 w-4 mr-1.5" /> QR (SVG)
                      </SecondaryButton>
                    </div>
                    <p>Sign-writers want the SVG: it stays sharp at any size.</p>
                  </SeenItem>

                  <SeenItem title="Google Business Profile">
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Search your business name on Google and tap Edit profile.</li>
                      <li>Open Contact, then Website (or Booking links).</li>
                      <li>Paste your link and save. Google can take a few days to show it.</li>
                    </ol>
                    <SecondaryButton
                      onClick={() => copy(fullUrl, 'Link for Google copied')}
                      fullWidth
                    >
                      <Copy className="h-4 w-4 mr-1.5" /> Copy link for Google
                    </SecondaryButton>
                  </SeenItem>

                  <SeenItem title="Every invoice and quote">
                    <div className="flex items-center justify-between gap-3">
                      <p>
                        Adds a "Get a quote" link to the bottom of every invoice and quote email you
                        send, while the page is live.
                      </p>
                      <Switch
                        checked={config.lead_page_on_documents}
                        disabled={update.isPending}
                        onCheckedChange={(v) => setFlag({ lead_page_on_documents: v })}
                        aria-label="Add the link to invoices and quotes"
                        className="shrink-0 data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-white/20"
                      />
                    </div>
                  </SeenItem>

                  <SeenItem title="Email signature">
                    <p className="rounded-lg bg-white/[0.06] px-3 py-2 font-mono text-[12.5px] break-all">
                      Need an electrician? Get a free quote: {shortDisplay}
                    </p>
                    <SecondaryButton
                      onClick={() =>
                        copy(
                          `Need an electrician? Get a free quote: ${shortUrl}`,
                          'Signature line copied'
                        )
                      }
                      fullWidth
                    >
                      <Copy className="h-4 w-4 mr-1.5" /> Copy signature line
                    </SecondaryButton>
                  </SeenItem>

                  <SeenItem title="Facebook and local groups">
                    <p>Add the link to your page's Website field and pin a post with it.</p>
                    <SecondaryButton onClick={share} fullWidth>
                      <Share2 className="h-4 w-4 mr-1.5" /> Share the link
                    </SecondaryButton>
                  </SeenItem>
                </>
              )}
            </FormCard>
          </section>
        </div>
      </div>
    </PageFrame>
  );
}

/* ── Pieces ─────────────────────────────────────────────────────────── */

function ToggleRow({
  title,
  body,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-white/[0.1] pt-3">
      <div className="min-w-0">
        <p className="text-[14px] font-semibold text-white">{title}</p>
        <p className="text-[13px] text-white">{body}</p>
      </div>
      <Switch
        checked={checked && !disabled}
        disabled={disabled}
        onCheckedChange={onChange}
        aria-label={title}
        className="shrink-0 data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-white/20"
      />
    </div>
  );
}

function SeenItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/[0.1] pt-4 space-y-2">
      <h3 className="text-[14px] font-semibold text-white">{title}</h3>
      <div className="space-y-2 text-[13px] text-white leading-relaxed">{children}</div>
    </div>
  );
}

function ChipEditor({
  label,
  hint,
  values,
  max,
  suggestions = [],
  placeholder,
  onChange,
}: {
  label: string;
  hint: string;
  values: string[];
  max: number;
  suggestions?: string[];
  placeholder: string;
  onChange: (v: string[]) => void;
}) {
  const [text, setText] = useState('');
  const has = (v: string) => values.some((x) => x.toLowerCase() === v.toLowerCase());
  const add = (raw: string) => {
    const v = raw.trim().slice(0, 40);
    if (!v || has(v) || values.length >= max) return;
    onChange([...values, v]);
    setText('');
  };
  const unused = suggestions.filter((s) => !has(s));
  return (
    <Field label={label} hint={hint}>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-1">
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1 h-11 pl-3 pr-1 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold"
            >
              {v}
              <button
                type="button"
                onClick={() => onChange(values.filter((x) => x !== v))}
                aria-label={`Remove ${v}`}
                className="h-9 w-9 grid place-items-center rounded-lg touch-manipulation"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      )}
      {values.length < max && (
        <div className="flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                add(text);
              }
            }}
            placeholder={placeholder}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => add(text)}
            disabled={!text.trim()}
            aria-label={`Add to ${label}`}
            className="h-11 w-11 shrink-0 grid place-items-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-white disabled:opacity-40 touch-manipulation"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}
      {unused.length > 0 && values.length < max && (
        <div className="flex flex-wrap gap-2 pt-1">
          {unused.slice(0, 8).map((sg) => (
            <button
              key={sg}
              type="button"
              onClick={() => add(sg)}
              className="h-11 px-3 rounded-xl border border-white/[0.12] bg-white/[0.06] text-white text-[13px] font-medium touch-manipulation"
            >
              + {sg}
            </button>
          ))}
        </div>
      )}
    </Field>
  );
}

function RecentRequests({
  recent,
  onOpenLeads,
}: {
  recent: QuotePageRecent[];
  onOpenLeads: () => void;
}) {
  const paths = useMemo(() => recent.flatMap((r) => r.photos ?? []).slice(0, 30), [recent]);
  const { data: urls } = useQuery({
    queryKey: ['quote-page-photo-urls', paths],
    enabled: paths.length > 0,
    staleTime: 30 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from('quote-page-photos')
        .createSignedUrls(paths, 60 * 60);
      if (error) throw error;
      const map: Record<string, string> = {};
      (data ?? []).forEach((d) => {
        if (d.path && d.signedUrl) map[d.path] = d.signedUrl;
      });
      return map;
    },
  });

  return (
    <section>
      <PanelTitle
        title="Latest requests"
        meta={recent.length > 0 ? `${recent.length}` : undefined}
        action="Leads"
        onAction={onOpenLeads}
      />
      <FormCard bleed>
        {recent.length === 0 ? (
          <p className="text-[14px] text-white">
            Nothing yet. Requests appear here and in Leads the moment a customer sends one.
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.08]">
            {recent.map((r) => (
              <li key={r.id} className="py-3 first:pt-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-white truncate">{r.name}</p>
                    <p className="text-[13px] text-white">
                      {[r.job_type, r.postcode, r.timing].filter(Boolean).join(' · ') ||
                        'Quote request'}
                    </p>
                  </div>
                  <span className="text-[12px] text-white shrink-0">
                    {formatDistanceToNow(new Date(r.created_at), { addSuffix: true })}
                  </span>
                </div>
                {(r.photos?.length ?? 0) > 0 && (
                  <div className="mt-2 flex gap-2">
                    {r.photos.map((p) =>
                      urls?.[p] ? (
                        <a
                          key={p}
                          href={urls[p]}
                          target="_blank"
                          rel="noreferrer"
                          className="touch-manipulation"
                        >
                          <img
                            src={urls[p]}
                            alt="Customer photo"
                            className="h-16 w-16 rounded-lg object-cover border border-white/[0.12]"
                          />
                        </a>
                      ) : (
                        <div key={p} className="h-16 w-16 rounded-lg bg-white/[0.06]" />
                      )
                    )}
                  </div>
                )}
                {r.phone && (
                  <a
                    href={`tel:${r.phone.replace(/\s+/g, '')}`}
                    className="mt-2 inline-flex items-center gap-1.5 h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                  >
                    <Phone className="h-4 w-4" /> Call {r.phone}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </FormCard>
    </section>
  );
}

export default QuotePageSection;
