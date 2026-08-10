/**
 * OutputPanel — the generated copy, in the four shapes you actually send it in.
 *
 * Sits in a sticky right-hand rail on a desktop and inside a bottom sheet on a
 * phone, so it is sized by its container: `flex h-full flex-col` with the body
 * as the only scrolling part, and the actions pinned to the bottom edge where
 * a thumb is.
 *
 * ── The bug this rewrite exists to fix ─────────────────────────────────────
 *
 * Every action ignored the tab you were looking at and operated on the raw
 * generated text instead. Three separate instances, all shipped:
 *
 *   • Email tab previewed `formatForEmail(content)` — a full letter with a
 *     greeting and a sign-off — and "Open in Email" put a DIFFERENT, hand-
 *     rolled "Dear Client, …" wrapper in the mailto body.
 *   • SMS tab previewed `formatForSMS(content)` — first sentence, ~90 chars,
 *     with a live 160-character counter next to it — and "Send SMS" pasted
 *     `content.substring(0, 157)` into the sms: body. The counter was
 *     measuring a string that was never sent.
 *   • Quote tab previewed `formatForQuote(content)` and "Download" saved the
 *     raw content with none of it.
 *
 * So what you proofread was not what went to the client. The fix is
 * structural rather than three patches: `FORMATS` derives the text for each
 * tab once, `activeText` is the text of the tab you are on, and copy, PDF,
 * download and send all take `activeText`. There is no longer a path by which
 * an action can reach a string the panel isn't showing you.
 *
 * ── The other thing that reached the client ────────────────────────────────
 *
 * The email closed with "[Your Name] / Qualified Electrician / [Your Contact
 * Details] / [Your Company Name]" — four literal placeholders in square
 * brackets — and the PDF was stamped "ElecConnect Professional" and "Generated
 * by ElecConnect AI Client Explainer Tool". Neither is this product's name.
 * Both now come from the company profile the electrician has already filled in
 * for their certificates and invoices.
 */

import { useMemo, useState } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Copy, Check, FileDown, Download, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { generateProfessionalElectricalPDF } from '@/utils/professional-electrical-pdf';
import { cn } from '@/lib/utils';
import DOMPurify from 'dompurify';
import { copyToClipboard } from '@/utils/clipboard';

export interface OutputSettings {
  tone: string;
  readingLevel: string;
  clientType: string;
  includeAnalogy: boolean;
  emphasizeSafety: boolean;
  includeCostInfo: boolean;
}

interface OutputPanelProps {
  content: string;
  settings: OutputSettings;
  /** Shown while the edge function is working, so the rail is never blank. */
  isGenerating?: boolean;
}

type FormatId = 'standard' | 'email' | 'sms' | 'quote';

const FORMAT_TABS: { id: FormatId; label: string }[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'SMS' },
  { id: 'quote', label: 'Quote' },
];

/** Shown before the first run, where the four formats are otherwise unknowable. */
const FORMAT_BLURBS: { id: FormatId; label: string; blurb: string }[] = [
  { id: 'standard', label: 'Standard', blurb: 'Read it out on site, or paste it anywhere.' },
  { id: 'email', label: 'Email', blurb: 'A full letter, signed off with your details.' },
  { id: 'sms', label: 'SMS', blurb: 'Cut to fit a single text message.' },
  { id: 'quote', label: 'Quote', blurb: 'Wording to sit underneath a quotation.' },
];

/** One SMS segment. Over this and the network bills it as two. */
const SMS_LIMIT = 160;

// ───────────────────────────────────────────────────────────────────────────
// Formatting
// ───────────────────────────────────────────────────────────────────────────

/**
 * Markdown-ish text → HTML for the Standard and Quote tabs.
 *
 * `C1`/`C2`/`C3`/`FI` are the only thing still coloured, and they stay red
 * because on an EICR they are a classification with a legal meaning, not a
 * decorative badge.
 */
const toHtml = (text: string) => {
  if (!text) return '';

  let clean = text.replace(/[ \t]+/g, ' ').trim();

  if (!clean.includes('\n\n')) {
    clean = clean
      .replace(/(\*\*[^*]+\*\*:?)(\s+)(?=[A-Z])/g, '$1\n\n')
      .replace(/([.!?])\s+(?=[A-Z][a-z]+ [A-Z])/g, '$1\n\n')
      .replace(/([.!?])\s+(What |Why |How |Next |This )/g, '$1\n\n$2');
  }

  return clean
    .split(/\n\n+/)
    .map((section) => {
      let s = section.trim();
      if (!s) return '';

      if (/^\*\*.*\*\*:?$/.test(s)) {
        const heading = s.replace(/\*\*/g, '').replace(/:$/, '');
        return `<h3 class="text-[15px] font-semibold text-elec-yellow mt-5 mb-2 first:mt-0">${heading}</h3>`;
      }

      s = s
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic text-white">$1</em>')
        .replace(/BS 7671/gi, '<span class="text-elec-yellow font-medium">BS 7671</span>')
        .replace(
          /\b(C[123]|FI)\b/g,
          '<span class="rounded bg-red-500/20 px-1.5 py-0.5 text-[12px] font-semibold text-red-300">$1</span>'
        );

      if (/^[\d\-*•]\s/.test(s)) {
        const items = s
          .split(/\n/)
          .filter((i) => i.trim())
          .map(
            (i) =>
              `<li class="relative pl-5 text-white leading-relaxed before:absolute before:left-0 before:font-bold before:text-elec-yellow before:content-['•']">${i
                .replace(/^[\d\-*•]\s*/, '')
                .trim()}</li>`
          )
          .join('');
        return `<ul class="mb-4 space-y-2 list-none">${items}</ul>`;
      }

      return `<p class="mb-4 leading-relaxed text-white">${s}</p>`;
    })
    .filter(Boolean)
    .join('');
};

/** Strip the markdown so a letter or a text message reads as plain prose. */
const stripMarkdown = (text: string) =>
  text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s/g, '')
    .replace(/^[-*+]\s/gm, '')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();

interface Signer {
  name: string;
  company: string;
  contact: string;
}

const buildEmail = (content: string, signer: Signer) => {
  // Only the lines we actually have. The old version printed "[Your Name]",
  // "[Your Contact Details]" and "[Your Company Name]" whether or not there
  // was anything to put in them.
  const signOff = [signer.name, signer.company, signer.contact].filter(Boolean).join('\n');

  return `Dear Client,

I wanted to give you a clear explanation of what I found during the recent work on your property.

${stripMarkdown(content)}

If anything here isn't clear, or you'd like to talk any of it through, please give me a call — I'm happy to go over it.

Best regards,

${signOff}`;
};

/**
 * As many whole sentences as fit inside one segment.
 *
 * The old version took the first sentence and nothing else, which for a
 * two-clause finding threw away the half that said what to do about it.
 *
 * Two things this has to get right, because the result goes to a client's
 * phone unedited:
 *
 *   Headings are dropped. The model writes the long-form answer in sections —
 *   "What we found:", "Why it matters:" — and a text message that opens
 *   "What we found: We found that…" reads like a machine wrote it.
 *
 *   A trim lands on a word boundary. When even the first sentence is longer
 *   than the allowance there is no choice but to cut, but cutting at exactly
 *   the character limit produced "…and it does no…".
 */
const buildSms = (content: string, signer: Signer) => {
  const plain = stripMarkdown(content)
    // A short line ending in a colon is a section heading, not prose.
    .replace(/^.{0,40}:\s*$/gm, '')
    .replace(/^(.{0,40}?:)\s+(?=[A-Z])/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  const prefix = signer.company ? `${signer.company}: ` : '';
  const suffix = ' Call me if you have any questions.';
  const room = SMS_LIMIT - prefix.length - suffix.length;

  const sentences = plain.match(/[^.!?]+[.!?]+/g) ?? [plain];
  let body = '';
  for (const sentence of sentences) {
    if ((body + sentence).trim().length > room) break;
    body += sentence;
  }

  // Nothing whole fits — cut at the last space inside the allowance so the
  // message ends on a word rather than halfway through one.
  if (!body.trim()) {
    const slice = plain.slice(0, Math.max(room - 1, 0));
    const lastSpace = slice.lastIndexOf(' ');
    body = `${(lastSpace > 20 ? slice.slice(0, lastSpace) : slice).trim()}…`;
  }

  return `${prefix}${body.trim()}${suffix}`;
};

const buildQuote = (content: string, signer: Signer) =>
  `ELECTRICAL WORK — EXPLANATION OF FINDINGS
${signer.company ? `${signer.company}\n` : ''}
${stripMarkdown(content)}

This explanation accompanies our quotation and sets out the work needed to address the findings above.

Next steps:
1. Read through this explanation
2. Come back to us with any questions
3. Approve the quotation and we'll book the work in`;

// ───────────────────────────────────────────────────────────────────────────

const OutputPanel = ({ content, settings, isGenerating = false }: OutputPanelProps) => {
  const { toast } = useToast();
  const haptic = useHaptic();
  const { companyProfile } = useCompanyProfile();
  const [format, setFormat] = useState<FormatId>('standard');
  const [copied, setCopied] = useState(false);
  const [isBuildingPdf, setIsBuildingPdf] = useState(false);

  const signer: Signer = useMemo(
    () => ({
      name: companyProfile?.inspector_name?.trim() || '',
      company: companyProfile?.company_name?.trim() || '',
      contact: [companyProfile?.company_phone, companyProfile?.company_email]
        .filter(Boolean)
        .join(' · '),
    }),
    [companyProfile]
  );

  /**
   * The single source of truth for every action on this panel. Copy, PDF,
   * download and send all read `activeText` — so whatever you are looking at
   * is, by construction, what leaves the app.
   */
  const formats = useMemo(
    () => ({
      standard: stripMarkdown(content),
      email: buildEmail(content, signer),
      sms: buildSms(content, signer),
      quote: buildQuote(content, signer),
    }),
    [content, signer]
  );

  const activeText = formats[format];
  const activeLabel = FORMAT_TABS.find((t) => t.id === format)?.label ?? 'Standard';

  const handleCopy = async () => {
    try {
      await copyToClipboard(activeText);
      haptic.success();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: `${activeLabel} copied`,
        description: 'Ready to paste.',
        variant: 'success',
      });
    } catch {
      toast({
        title: 'Could not copy',
        description: 'Select the text and copy it manually.',
        variant: 'destructive',
      });
    }
  };

  const handlePdf = async () => {
    setIsBuildingPdf(true);
    try {
      const company = signer.company || 'Elec-Mate';
      await generateProfessionalElectricalPDF(
        `# Explanation of findings\n\n${activeText}\n\n---\n\nPrepared ${new Date().toLocaleDateString('en-GB')}`,
        'Explanation of findings',
        'client-explanation.pdf',
        {
          reportType: 'Client explanation',
          companyName: company,
          includeSignatures: false,
          watermark: '',
        }
      );
      toast({ title: 'PDF ready', description: 'Saved to your downloads.', variant: 'success' });
    } catch {
      toast({
        title: 'PDF failed',
        description: 'Try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsBuildingPdf(false);
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([activeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `client-explanation-${format}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // The old version leaked an object URL on every download.
    URL.revokeObjectURL(url);
  };

  const handleSend = () => {
    if (format === 'sms') {
      openExternalUrl(`sms:?body=${encodeURIComponent(activeText)}`);
      return;
    }
    const subject = encodeURIComponent('Your electrical work — explanation of findings');
    openExternalUrl(`mailto:?subject=${subject}&body=${encodeURIComponent(activeText)}`);
  };

  // ── Empty / working states ───────────────────────────────────────────────
  //
  // Same surface as every other panel, and sized by the caller rather than by
  // a viewport calc — a 770px dashed box beside a 635px column of controls
  // read as a hole in the page rather than a place something will appear.
  //
  // It also earns its space now. The four output shapes were undiscoverable
  // until after you had generated something, so the one thing worth saying
  // before the first run is what you are about to get.
  if (!content) {
    return (
      <div
        className={cn(
          'flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-elec-yellow/35 p-5',
          'bg-gradient-to-br from-white/[0.14] via-white/[0.075] to-white/[0.045]',
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_2px_8px_-3px_rgba(0,0,0,0.75)]'
        )}
      >
        <h2 className="text-[14px] font-semibold tracking-tight text-elec-yellow">
          Your explanation
        </h2>

        {isGenerating ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" aria-hidden />
            <p className="text-[13.5px] font-semibold text-white">Writing it up…</p>
            <p className="max-w-[28ch] text-[12px] leading-snug text-white">
              Turning your findings into something a client will follow.
            </p>
          </div>
        ) : (
          <>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white">
              Write up what you found, then press Generate. The same explanation comes back in four
              shapes:
            </p>
            <ul className="mt-4 space-y-2.5">
              {FORMAT_BLURBS.map(({ id, label, blurb }) => (
                <li key={id} className="flex gap-3">
                  <span className="w-[62px] shrink-0 text-[12px] font-semibold text-white">
                    {label}
                  </span>
                  <span className="min-w-0 flex-1 text-[12px] leading-snug text-white">{blurb}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }

  const smsLength = formats.sms.length;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.14] via-white/[0.075] to-white/[0.045] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_2px_8px_-3px_rgba(0,0,0,0.75)]">
      {/* Format switch. Segmented, not four Radix tabs with their own theming
          — this has to survive being 340px wide inside a bottom sheet. */}
      <div className="shrink-0 border-b border-white/[0.10] p-2">
        <div
          role="tablist"
          aria-label="Output format"
          className="grid grid-cols-4 gap-1 rounded-xl bg-black/25 p-1"
        >
          {FORMAT_TABS.map((tab) => {
            const on = tab.id === format;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => {
                  haptic.light();
                  setFormat(tab.id);
                }}
                className={cn(
                  'min-h-11 rounded-lg text-[12.5px] font-semibold transition-colors touch-manipulation',
                  '[-webkit-tap-highlight-color:transparent]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
                  on ? 'bg-elec-yellow text-black' : 'text-white hover:bg-white/[0.08]'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body — the only scrolling region. */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
        {format === 'standard' || format === 'quote' ? (
          <div
            className="text-[15px] leading-[1.7]"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(toHtml(activeText)) }}
          />
        ) : (
          // Letters and text messages are prose with deliberate line breaks —
          // rendering each line as its own <p> inside a space-y-4 stack turned
          // a signature block into four widely-spaced paragraphs.
          <p className="whitespace-pre-wrap text-[15px] leading-[1.7] text-white">{activeText}</p>
        )}
      </div>

      {/* SMS is the one format with a hard limit, so it gets a meter — now
          measuring the string that is actually sent. */}
      {format === 'sms' && (
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/[0.10] px-4 py-2.5 sm:px-5">
          <span className="text-[11.5px] font-medium text-white">
            {smsLength <= SMS_LIMIT ? 'Fits one message' : 'Will send as two messages'}
          </span>
          <span
            className={cn(
              'text-[11.5px] font-semibold tabular-nums',
              smsLength > SMS_LIMIT ? 'text-red-300' : 'text-white'
            )}
          >
            {smsLength}/{SMS_LIMIT}
          </span>
        </div>
      )}

      {/* Actions. Every one of these acts on the format above it. */}
      <div className="shrink-0 border-t border-white/[0.10] p-2.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.28] active:bg-white/[0.10]"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-300" aria-hidden />
            ) : (
              <Copy className="h-4 w-4" aria-hidden />
            )}
            {copied ? 'Copied' : 'Copy'}
          </button>

          <button
            type="button"
            onClick={format === 'quote' ? handleDownloadTxt : handlePdf}
            disabled={isBuildingPdf}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.28] active:bg-white/[0.10] disabled:opacity-50"
          >
            {isBuildingPdf ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : format === 'quote' ? (
              <Download className="h-4 w-4" aria-hidden />
            ) : (
              <FileDown className="h-4 w-4" aria-hidden />
            )}
            {format === 'quote' ? 'Download' : 'PDF'}
          </button>

          <button
            type="button"
            onClick={handleSend}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-3 text-[12.5px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 active:bg-elec-yellow/85"
          >
            <Send className="h-4 w-4" aria-hidden />
            {format === 'sms' ? 'Text' : 'Email'}
          </button>
        </div>

        <p className="mt-2 px-0.5 text-[11px] leading-snug text-white">
          {settings.tone} tone · {settings.readingLevel} reading level · written for a{' '}
          {settings.clientType}
        </p>
      </div>
    </div>
  );
};

export default OutputPanel;
