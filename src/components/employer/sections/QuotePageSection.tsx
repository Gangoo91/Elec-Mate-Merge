import { useState, useEffect, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { generateQuotePosterPdf } from '@/utils/generateQuotePosterPdf';
import { useToast } from '@/hooks/use-toast';
import { useLeadPageConfig, useUpdateLeadPage } from '@/hooks/useLeadPageConfig';
import {
  PageFrame,
  PageHero,
  FormCard,
  Field,
  textareaClass,
  PrimaryButton,
  SecondaryButton,
  LoadingBlocks,
} from '@/components/employer/editorial';
import {
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
  Sparkles,
  QrCode,
  Link2,
  Printer,
} from 'lucide-react';

// Render the on-screen quote-page QR (SVG) to a high-res PNG data URL.
const qrToPngDataUrl = (): Promise<string> =>
  new Promise((resolve, reject) => {
    const svg = document.getElementById('quote-page-qr');
    if (!svg) return reject(new Error('QR not ready'));
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width * 4;
      canvas.height = img.height * 4;
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => reject(new Error('QR render failed'));
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  });

const slugify = (v: string) =>
  v
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 48);

export function QuotePageSection() {
  const { toast } = useToast();
  const { data: config, isLoading } = useLeadPageConfig();
  const update = useUpdateLeadPage();

  const [slug, setSlug] = useState('');
  const [headline, setHeadline] = useState('');
  const [copied, setCopied] = useState(false);
  const [slugError, setSlugError] = useState<string | null>(null);

  useEffect(() => {
    if (!config) return;
    setSlug(config.lead_page_slug ?? '');
    setHeadline(config.lead_page_headline ?? '');
  }, [config]);

  const suggestedSlug = useMemo(
    () => (config?.company_name ? slugify(config.company_name) : ''),
    [config?.company_name]
  );

  const enabled = config?.lead_page_enabled ?? false;
  const savedSlug = config?.lead_page_slug ?? '';
  const publicUrl = savedSlug ? `${window.location.origin}/get-quote/${savedSlug}` : '';
  const isLive = enabled && !!savedSlug;

  const dirty =
    slug !== (config?.lead_page_slug ?? '') || headline !== (config?.lead_page_headline ?? '');

  const handleSave = async () => {
    const clean = slugify(slug);
    if (!clean) {
      setSlugError('Add a link name — it becomes your public web address.');
      return;
    }
    try {
      await update.mutateAsync({
        lead_page_slug: clean,
        lead_page_headline: headline.trim() || null,
      });
      setSlug(clean);
      setSlugError(null);
      toast({ title: 'Saved', description: 'Your quote page is up to date.' });
    } catch (e) {
      // The hook toasts too, but a taken link name deserves an inline nudge
      // right where the owner is typing.
      const msg = e instanceof Error ? e.message : '';
      setSlugError(
        /duplicate|unique/i.test(msg)
          ? 'That link name is already taken — try another.'
          : 'Could not save your link name. Please try again.'
      );
    }
  };

  const handleToggle = async () => {
    if (!savedSlug && !slug) {
      toast({
        title: 'Set a link name first',
        description: 'Add a link name and save before going live.',
        variant: 'destructive',
      });
      return;
    }
    try {
      // If turning on and there are unsaved edits, save them too.
      if (!enabled && dirty) {
        const clean = slugify(slug);
        if (!clean) {
          setSlugError('Add a link name before going live.');
          return;
        }
        await update.mutateAsync({
          lead_page_slug: clean,
          lead_page_headline: headline.trim() || null,
          lead_page_enabled: true,
        });
        setSlug(clean);
      } else {
        await update.mutateAsync({ lead_page_enabled: !enabled });
      }
      toast({
        title: enabled ? 'Page hidden' : 'Page is live',
        description: enabled
          ? 'Your quote page is no longer public.'
          : 'Anyone with the link can now request a quote.',
      });
    } catch {
      /* useUpdateLeadPage surfaces the error */
    }
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: 'Link copied', description: 'Paste it anywhere customers can see it.' });
    } catch {
      toast({ title: 'Copy failed', variant: 'destructive' });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Get a quote',
          text: `Request a quote from ${config?.company_name ?? 'us'}`,
          url: publicUrl,
        });
      } catch {
        /* cancelled */
      }
    } else {
      handleCopy();
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('quote-page-qr');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width * 3;
      canvas.height = img.height * 3;
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `quote-page-qr-${savedSlug}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    toast({ title: 'QR downloaded', description: 'Print it on invoices, vans and job sheets.' });
  };

  const handleDownloadPoster = async () => {
    try {
      const qr = await qrToPngDataUrl();
      const { doc, filename } = await generateQuotePosterPdf(
        config?.company_name ?? 'Your electrician',
        publicUrl,
        qr
      );
      await saveOrSharePdf(doc, filename);
    } catch {
      toast({ title: 'Could not make the poster', variant: 'destructive' });
    }
  };

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero eyebrow="Lead generation" title="Quote page" tone="cyan" />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="Get work"
        title="Your quote page"
        description="You've got your own branded page where customers request a quote — it's ready to go. Share the link or QR below and every enquiry drops straight into your Leads."
        tone="cyan"
        live={isLive ? { label: 'Live', tone: 'green' } : undefined}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Config */}
        <FormCard eyebrow="Your link">
          <Field
            label="Link name"
            hint="We set this from your company name — change it if you like."
            required
          >
            <div
              className={`flex items-center gap-1.5 rounded-xl border bg-white/[0.05] px-3.5 focus-within:ring-2 ${
                slugError
                  ? 'border-red-500/60 focus-within:border-red-500 focus-within:ring-red-500/15'
                  : 'border-white/[0.10] focus-within:border-elec-yellow focus-within:ring-elec-yellow/15'
              }`}
            >
              <span className="text-[13px] text-white/40 whitespace-nowrap hidden sm:inline">
                /get-quote/
              </span>
              <input
                value={slug}
                onChange={(e) => {
                  setSlug(slugify(e.target.value));
                  if (slugError) setSlugError(null);
                }}
                placeholder={suggestedSlug || 'your-company'}
                className="h-12 flex-1 min-w-0 bg-transparent text-white text-base placeholder:text-white/40 focus:outline-none touch-manipulation"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
            {slugError && (
              <p className="mt-1.5 text-[12.5px] text-red-400 leading-snug">{slugError}</p>
            )}
          </Field>

          {suggestedSlug && slug !== suggestedSlug && (
            <button
              onClick={() => setSlug(suggestedSlug)}
              className="inline-flex items-center gap-1.5 text-[12px] text-elec-yellow/90 hover:text-elec-yellow touch-manipulation"
            >
              <Sparkles className="h-3.5 w-3.5" /> Use “{suggestedSlug}”
            </button>
          )}

          <Field
            label="Headline"
            hint="A friendly line customers see at the top. Leave blank for a sensible default."
          >
            <textarea
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Fast, tidy electrical work across [your area]. Tell us what you need and we'll come straight back with a price."
              rows={3}
              maxLength={280}
              className={textareaClass}
            />
          </Field>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-2.5 pt-1">
            <button
              onClick={handleToggle}
              disabled={update.isPending}
              className={`inline-flex items-center gap-2 h-11 px-3.5 rounded-xl border text-[13px] font-medium touch-manipulation transition-colors disabled:opacity-50 ${
                isLive
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-white/[0.12] bg-white/[0.04] text-white/70'
              }`}
            >
              <span
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  isLive ? 'bg-emerald-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                    isLive ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </span>
              {isLive ? 'Page is live' : 'Page hidden'}
            </button>
            <div className="sm:ml-auto">
              <PrimaryButton onClick={handleSave} disabled={update.isPending || !dirty} fullWidth>
                {dirty ? 'Save changes' : 'Saved'}
              </PrimaryButton>
            </div>
          </div>
        </FormCard>

        {/* Share */}
        <FormCard eyebrow="Share it">
          {publicUrl ? (
            <>
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-2xl bg-white p-4 shadow-lg">
                  <QRCodeSVG
                    id="quote-page-qr"
                    value={publicUrl}
                    size={168}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#0a0e17"
                  />
                </div>
                {!isLive && (
                  <p className="text-[12px] text-amber-300/90 text-center leading-snug">
                    Turn the page live for the link and QR code to work.
                  </p>
                )}
              </div>

              <Field label="Your link">
                <div className="flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.05] px-3.5 py-3">
                  <Link2 className="h-4 w-4 shrink-0 text-white/40" />
                  <span className="text-[13px] text-white/80 font-mono break-all">{publicUrl}</span>
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-2">
                <SecondaryButton onClick={handleCopy} fullWidth>
                  {copied ? (
                    <Check className="h-4 w-4 mr-1.5" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1.5" />
                  )}
                  {copied ? 'Copied' : 'Copy'}
                </SecondaryButton>
                <SecondaryButton onClick={handleShare} fullWidth>
                  <Share2 className="h-4 w-4 mr-1.5" /> Share
                </SecondaryButton>
                <SecondaryButton onClick={handleDownloadQR} fullWidth>
                  <Download className="h-4 w-4 mr-1.5" /> QR code
                </SecondaryButton>
                <SecondaryButton onClick={() => openExternalUrl(publicUrl)} fullWidth>
                  <ExternalLink className="h-4 w-4 mr-1.5" /> Preview
                </SecondaryButton>
              </div>

              <SecondaryButton onClick={handleDownloadPoster} fullWidth>
                <Printer className="h-4 w-4 mr-1.5" /> Print a “Scan for a quote” poster
              </SecondaryButton>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5">
                <p className="text-[12px] font-medium text-white/80">Where to put it</p>
                <ul className="mt-1.5 space-y-1 text-[12px] text-white/55 leading-relaxed">
                  <li>• Print the QR on invoices, business cards and the van</li>
                  <li>• Add the link to your Google profile and social bios</li>
                  <li>• Text it to anyone who asks “can you send a price?”</li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="h-12 w-12 rounded-xl bg-white/[0.05] border border-white/[0.08] grid place-items-center">
                <QrCode className="h-6 w-6 text-white/40" />
              </div>
              <p className="mt-3 text-[13px] text-white/60 max-w-[16rem]">
                Set a link name and save to get your shareable link and QR code.
              </p>
            </div>
          )}
        </FormCard>
      </div>
    </PageFrame>
  );
}

export default QuotePageSection;
