import { useState } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { Send, Copy, Check, Loader2, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { openExternalUrl } from '@/utils/open-external-url';
import { supabase } from '@/integrations/supabase/client';
import { useSiteVisitStorage } from '@/hooks/useSiteVisitStorage';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import type { SiteVisit } from '@/types/siteVisit';

interface CompletionShareButtonProps {
  visit: SiteVisit;
}

export const CompletionShareButton = ({ visit }: CompletionShareButtonProps) => {
  const { toast } = useToast();
  const { updateStatus } = useSiteVisitStorage();
  const { companyProfile } = useCompanyProfile();
  const [isCreating, setIsCreating] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreateShare = async () => {
    setIsCreating(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const token = crypto.randomUUID();

      const beforePhotoUrls = visit.photos
        .filter((p) => p.photoPhase === 'before' && !p.photoUrl.startsWith('blob:'))
        .map((p) => p.photoUrl);

      const afterPhotoUrls = visit.photos
        .filter((p) => p.photoPhase === 'after' && !p.photoUrl.startsWith('blob:'))
        .map((p) => p.photoUrl);

      const scopeSummary = {
        propertyAddress: visit.propertyAddress,
        rooms: visit.rooms.map((r) => ({
          roomName: r.roomName,
          items: r.items.map((i) => ({
            itemDescription: i.itemDescription,
            quantity: i.quantity,
            unit: i.unit,
          })),
        })),
      };

      const { error } = await supabase.from('completion_signoffs').insert({
        user_id: user.id,
        site_visit_id: visit.id,
        share_token: token,
        title: `Completion — ${visit.propertyAddress || 'Site Visit'}`,
        scope_summary: scopeSummary,
        before_photo_urls: beforePhotoUrls,
        after_photo_urls: afterPhotoUrls,
        client_name: visit.customerName,
        client_email: visit.customerEmail,
        company_name: companyProfile?.company_name || null,
        company_logo_url: companyProfile?.logo_url || null,
        requires_signature: true,
        status: 'active',
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });

      if (error) throw error;

      const url = `${window.location.origin}/completion/${token}`;
      setShareUrl(url);

      // Update visit status to post_job
      if (visit.id) {
        await updateStatus(visit.id, 'post_job');
      }

      toast({
        title: 'Completion link created',
        description: 'Send this link to your client for sign-off.',
      });
    } catch (error: unknown) {
      toast({
        title: 'Failed to create completion link',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopy = async () => {
    if (!shareUrl) return;
    await copyToClipboard(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Link copied to clipboard' });
  };

  const handleWhatsApp = async () => {
    if (!shareUrl) return;
    const text = encodeURIComponent(
      `Hi ${visit.customerName || ''},\n\nPlease review the completed work and sign off:\n${shareUrl}`
    );
    await openExternalUrl(`https://wa.me/?text=${text}`);
  };

  const handleEmail = () => {
    if (!shareUrl) return;
    const subject = encodeURIComponent(`Work Completed — ${visit.propertyAddress || ''}`);
    const body = encodeURIComponent(
      `Hi ${visit.customerName || ''},\n\nThe electrical work at your property has been completed. Please review and sign off at the link below:\n\n${shareUrl}\n\nThank you.`
    );
    openExternalUrl(`mailto:${visit.customerEmail || ''}?subject=${subject}&body=${body}`);
  };

  if (!shareUrl) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-elec-yellow/25 bg-gradient-to-r from-elec-yellow/[0.06] via-elec-yellow/[0.02] to-transparent p-5">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/80 to-elec-yellow/0"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
              Client sign-off
            </div>
            <div className="mt-1 text-[15px] font-semibold text-white sm:text-[16px]">
              Send the completion for signature.
            </div>
            <p className="mt-1 text-[12.5px] text-white/65">
              Generates a secure share link. Client can sign remotely on their own device.
            </p>
          </div>
          <Button
            onClick={handleCreateShare}
            disabled={isCreating}
            className="h-11 shrink-0 rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation"
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating…
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send for sign-off →
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-500/[0.06] to-transparent p-5">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/80 to-emerald-500/0"
      />
      <div className="flex items-center gap-2">
        <Check className="h-4 w-4 text-emerald-400" />
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-400">
          Completion link ready
        </span>
      </div>
      <p className="mt-2 text-[13px] text-white/75">
        Share with the client — they can sign on their own device. Link is unique to this job.
      </p>

      <div className="mt-4 flex gap-2">
        <Input
          value={shareUrl}
          readOnly
          className="h-11 touch-manipulation rounded-xl border-white/[0.08] bg-[hsl(0_0%_10%)] text-[12px] text-white"
        />
        <Button
          onClick={handleCopy}
          variant="outline"
          className="h-11 shrink-0 rounded-xl border-white/[0.12] bg-white/[0.04] px-3 text-white hover:bg-white/[0.08] touch-manipulation"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button
          onClick={handleWhatsApp}
          className="h-11 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 touch-manipulation"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          WhatsApp
        </Button>
        <Button
          onClick={handleEmail}
          className="h-11 rounded-xl bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 touch-manipulation"
        >
          <Mail className="mr-2 h-4 w-4" />
          Email
        </Button>
      </div>
    </div>
  );
};
