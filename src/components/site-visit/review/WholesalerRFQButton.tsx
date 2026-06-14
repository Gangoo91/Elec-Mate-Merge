/**
 * WholesalerRFQButton (ELE-1118)
 *
 * Turns the (editable, live-priced) site-visit materials list into a clean
 * Request-for-Quotation the spark can fire at one or more wholesalers — copy,
 * WhatsApp or email. Deliberately price-free: it lists what's needed (qty,
 * unit, description) so suppliers quote their own best price ("cc all the
 * wholesalers and let them fight for it").
 *
 * No backend — shares via clipboard / wa.me / mailto, like the scope share.
 */
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Store, Copy, Check, MessageSquare, Mail } from 'lucide-react';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { useToast } from '@/hooks/use-toast';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import type { SiteVisit } from '@/types/siteVisit';
import type { MaterialItem } from '@/types/surveyAnalysis';

interface WholesalerRFQButtonProps {
  visit: SiteVisit;
  materials: MaterialItem[];
}

function buildRfqText(
  materials: MaterialItem[],
  visit: SiteVisit,
  companyName: string
): string {
  const lines = materials
    .filter((m) => m.description?.trim())
    .map((m) => `• ${m.quantity} ${m.unit} — ${m.description}`);

  const parts: string[] = [
    `Request for Quotation${companyName ? ` — ${companyName}` : ''}`,
  ];
  if (visit.propertyAddress) parts.push(`Site: ${visit.propertyAddress}`);
  parts.push(
    '',
    'Please quote your best price and availability for the following:',
    '',
    ...lines,
    '',
    'Many thanks.',
  );
  if (companyName) parts.push(companyName);
  return parts.join('\n');
}

export const WholesalerRFQButton = ({ visit, materials }: WholesalerRFQButtonProps) => {
  const { toast } = useToast();
  const { companyProfile } = useCompanyProfile();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const companyName = companyProfile?.companyName?.trim() || '';
  const rfqText = buildRfqText(materials, visit, companyName);
  const itemCount = materials.filter((m) => m.description?.trim()).length;

  const handleCopy = async () => {
    const ok = await copyToClipboard(rfqText);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: 'RFQ copied', description: 'Paste it to any wholesaler.' });
    }
  };

  const handleWhatsApp = () =>
    openExternalUrl(`https://wa.me/?text=${encodeURIComponent(rfqText)}`);

  const handleEmail = () =>
    openExternalUrl(
      `mailto:?subject=${encodeURIComponent(
        `Request for Quotation${companyName ? ` — ${companyName}` : ''}`
      )}&body=${encodeURIComponent(rfqText)}`
    );

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        disabled={itemCount === 0}
        variant="outline"
        className="h-11 flex-1 touch-manipulation rounded-xl border-white/[0.15] bg-white/[0.04] text-[13px] font-medium text-white transition-transform hover:bg-white/[0.08] active:scale-[0.98] disabled:opacity-50"
      >
        <Store className="mr-2 h-4 w-4" />
        Wholesaler RFQ
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.08] bg-elec-dark p-0 lg:left-64"
        >
          <SheetHeader className="border-b border-white/[0.06] px-5 pb-3 pt-5">
            <SheetTitle className="text-left text-white">Request wholesaler quotes</SheetTitle>
            <p className="text-left text-[12px] text-white/60">
              {itemCount} item{itemCount !== 1 ? 's' : ''} · price-free, so suppliers quote their best
            </p>
          </SheetHeader>

          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <pre className="whitespace-pre-wrap break-words rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 font-sans text-[12.5px] leading-relaxed text-white/85">
                {rfqText}
              </pre>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-white/[0.06] px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="h-12 touch-manipulation flex-col gap-0.5 rounded-xl border-white/[0.15] bg-white/[0.04] text-[11px] font-medium text-white active:scale-[0.98]"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <Button
                onClick={handleWhatsApp}
                variant="outline"
                className="h-12 touch-manipulation flex-col gap-0.5 rounded-xl border-white/[0.15] bg-white/[0.04] text-[11px] font-medium text-white active:scale-[0.98]"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button
                onClick={handleEmail}
                variant="outline"
                className="h-12 touch-manipulation flex-col gap-0.5 rounded-xl border-white/[0.15] bg-white/[0.04] text-[11px] font-medium text-white active:scale-[0.98]"
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default WholesalerRFQButton;
