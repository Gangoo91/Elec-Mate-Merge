import { useState } from 'react';
import { Share2, Copy, Check, QrCode, Zap } from 'lucide-react';
import { copyToClipboard } from '@/utils/clipboard';
import { useToast } from '@/hooks/use-toast';
import { useLeadPageConfig } from '@/hooks/useLeadPageConfig';
import type { Section } from '@/pages/employer/EmployerDashboard';

interface QuotePagePromoCardProps {
  /** How many leads have already come via the quote page — hide once the channel is proven. */
  quotePageLeads: number;
  onNavigate: (section: Section) => void;
}

/**
 * Surfaces the auto-provisioned quote page on the Overview so owners actually
 * discover and share it. Self-dismisses once the page has produced its first
 * lead (channel proven) — or if it isn't live yet.
 */
export function QuotePagePromoCard({ quotePageLeads, onNavigate }: QuotePagePromoCardProps) {
  const { toast } = useToast();
  const { data: config } = useLeadPageConfig();
  const [copied, setCopied] = useState(false);

  if (!config?.lead_page_enabled || !config.lead_page_slug || quotePageLeads > 0) return null;

  const url = `${window.location.origin}/get-quote/${config.lead_page_slug}`;

  const copy = async () => {
    try {
      await copyToClipboard(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      toast({ title: 'Link copied', description: 'Paste it anywhere customers can see it.' });
    } catch {
      toast({ title: 'Copy failed', variant: 'destructive' });
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Get a quote', text: 'Request a quote from us', url });
      } catch {
        /* cancelled */
      }
    } else {
      copy();
    }
  };

  return (
    <div className="rounded-2xl border border-elec-yellow/25 bg-gradient-to-b from-elec-yellow/[0.08] to-transparent p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 shrink-0 rounded-xl bg-elec-yellow/15 border border-elec-yellow/25 grid place-items-center">
          <Zap className="h-5 w-5 text-elec-yellow" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-elec-yellow">
            Get more work
          </p>
          <h3 className="mt-0.5 text-[15px] font-semibold text-white">Your quote page is live</h3>
          <p className="mt-1 text-[12.5px] text-white/60 leading-relaxed">
            Share your link and customers request quotes straight into your Leads. Put it on
            invoices, your van and your Google profile.
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.1] bg-black/20 px-3 py-2">
        <span className="text-[12px] text-white/80 font-mono truncate">{url}</span>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        <button
          onClick={copy}
          className="h-11 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-[12.5px] font-medium inline-flex items-center justify-center gap-1.5 touch-manipulation active:scale-[0.98]"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button
          onClick={share}
          className="h-11 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-[12.5px] font-medium inline-flex items-center justify-center gap-1.5 touch-manipulation active:scale-[0.98]"
        >
          <Share2 className="h-4 w-4" /> Share
        </button>
        <button
          onClick={() => onNavigate('quotepage')}
          className="h-11 rounded-xl bg-elec-yellow text-black text-[12.5px] font-semibold inline-flex items-center justify-center gap-1.5 touch-manipulation active:scale-[0.98]"
        >
          <QrCode className="h-4 w-4" /> QR
        </button>
      </div>
    </div>
  );
}
