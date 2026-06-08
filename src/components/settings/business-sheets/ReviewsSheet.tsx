import React, { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, X } from 'lucide-react';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';
import { Eyebrow } from '@/components/college/primitives';

const DEFAULT_REVIEW_MESSAGE =
  'Thanks for choosing us — it was a pleasure doing the work. If you were happy, a quick review really helps a small business like ours. It only takes a minute.';

interface ReviewLink {
  url: string;
  label?: string;
}

/** Derive a friendly button label from a review URL's domain. */
function labelForReviewUrl(url: string, explicit?: string): string {
  if (explicit && explicit.trim()) return explicit.trim();
  const u = url.toLowerCase();
  if (u.includes('google') || u.includes('g.page')) return 'Leave a Google review';
  if (u.includes('checkatrade')) return 'Review us on Checkatrade';
  if (u.includes('trustpilot')) return 'Review us on Trustpilot';
  if (u.includes('facebook') || u.includes('fb.')) return 'Review us on Facebook';
  if (u.includes('yell.')) return 'Review us on Yell';
  if (u.includes('trustatrader')) return 'Review us on TrustATrader';
  return 'Leave us a review';
}

interface ReviewsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CompanyProfile | null;
  onSave: (data: Record<string, unknown>) => Promise<boolean>;
}

const ReviewsSheet = ({ open, onOpenChange, profile, onSave }: ReviewsSheetProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [links, setLinks] = useState<string[]>(['']);
  const [message, setMessage] = useState('');

  const hydratedForOpenRef = useRef(false);
  useEffect(() => {
    if (!open) {
      hydratedForOpenRef.current = false;
      return;
    }
    if (hydratedForOpenRef.current) return;
    if (!profile) return;
    const p = profile as unknown as Record<string, unknown>;
    setEnabled(!!p.review_request_enabled);
    const stored = Array.isArray(p.review_links) ? (p.review_links as ReviewLink[]) : [];
    const urls = stored.map((l) => l?.url || '').filter(Boolean);
    setLinks(urls.length ? urls : ['']);
    setMessage((p.review_request_message as string) || '');
    hydratedForOpenRef.current = true;
  }, [profile, open]);

  const updateLink = (i: number, value: string) =>
    setLinks((prev) => prev.map((l, idx) => (idx === i ? value : l)));
  const addLink = () => setLinks((prev) => [...prev, '']);
  const removeLink = (i: number) =>
    setLinks((prev) => (prev.length === 1 ? [''] : prev.filter((_, idx) => idx !== i)));

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const cleaned: ReviewLink[] = links
        .map((u) => u.trim())
        .filter(Boolean)
        .map((url) => ({ url, label: labelForReviewUrl(url) }));
      const success = await onSave({
        review_request_enabled: enabled,
        review_links: cleaned,
        review_request_message: message.trim() || null,
      });
      if (success) {
        toast.success('Review settings saved');
        onOpenChange(false);
      }
    } catch {
      toast.error('Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const hasAnyUrl = links.some((u) => u.trim());

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06] bg-[#0a0a0a]"
      >
        <div className="flex flex-col h-full bg-[#0a0a0a]">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 pb-4">
            <Eyebrow>Reviews</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">Ask for reviews</h2>
            <p className="mt-1 text-[13px] text-white/60">
              Add your review links once. We&apos;ll invite customers to leave a review in your invoice
              emails and when they pay — no extra sending on your part.
            </p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-5">
            {/* Enable toggle */}
            <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-white">Ask for reviews in emails</p>
                <p className="text-[11.5px] text-white/55 mt-0.5">
                  Adds a review request to invoice + payment-received emails.
                </p>
              </div>
              <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>

            {enabled && !hasAnyUrl && (
              <div className="rounded-xl bg-elec-yellow/[0.08] border border-elec-yellow/25 px-3.5 py-2.5">
                <p className="text-[12px] text-elec-yellow/90">Add at least one review link below for the request to appear.</p>
              </div>
            )}

            {/* Review links — dynamic list */}
            <div className="space-y-2.5">
              <Eyebrow>Your review links</Eyebrow>
              {links.map((url, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    inputMode="url"
                    autoCapitalize="none"
                    value={url}
                    onChange={(e) => updateLink(i, e.target.value)}
                    placeholder="Paste a review link (Google, Checkatrade…)"
                    className="flex-1 min-w-0 h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                  />
                  <button
                    type="button"
                    aria-label="Remove link"
                    onClick={() => removeLink(i)}
                    className="h-11 w-11 shrink-0 rounded-xl flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addLink}
                className="flex items-center gap-2 h-10 px-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-[13px] font-medium text-white touch-manipulation active:scale-[0.98] hover:bg-white/[0.07] transition-colors"
              >
                <Plus className="h-4 w-4" /> Add another link
              </button>
              <p className="text-[11.5px] text-white/45 leading-relaxed pt-1">
                Tip: for Google, use your &quot;Get more reviews&quot; short link so customers land straight on the
                star-rating screen. We&apos;ll label each button automatically from the link.
              </p>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Custom message */}
            <div className="space-y-1.5">
              <Label className="text-white font-medium text-[13px]">Message to customers</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={DEFAULT_REVIEW_MESSAGE}
                className="min-h-[96px] bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation text-[13px]"
              />
              <p className="text-[11.5px] text-white/45">Leave blank to use our default wording.</p>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ReviewsSheet;
