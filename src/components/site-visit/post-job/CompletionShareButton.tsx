import { useState } from 'react';
import { Send, Copy, Check, Loader2, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
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
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Link copied to clipboard' });
  };

  const handleWhatsApp = () => {
    if (!shareUrl) return;
    const text = encodeURIComponent(
      `Hi ${visit.customerName || ''},\n\nPlease review the completed work and sign off:\n${shareUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    if (!shareUrl) return;
    const subject = encodeURIComponent(`Work Completed — ${visit.propertyAddress || ''}`);
    const body = encodeURIComponent(
      `Hi ${visit.customerName || ''},\n\nThe electrical work at your property has been completed. Please review and sign off at the link below:\n\n${shareUrl}\n\nThank you.`
    );
    window.open(`mailto:${visit.customerEmail || ''}?subject=${subject}&body=${body}`);
  };

  if (!shareUrl) {
    return (
      <Button
        onClick={handleCreateShare}
        disabled={isCreating}
        className="w-full h-12 text-base font-semibold touch-manipulation bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isCreating ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Creating link...
          </>
        ) : (
          <>
            <Send className="h-5 w-5 mr-2" />
            Send Completion for Sign-off
          </>
        )}
      </Button>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <Check className="h-5 w-5 text-emerald-400 flex-shrink-0" />
        <p className="text-sm font-medium text-emerald-400">Completion link created</p>
      </div>

      <div className="flex gap-2">
        <Input
          value={shareUrl}
          readOnly
          className="h-11 text-xs touch-manipulation border-white/30"
        />
        <Button
          onClick={handleCopy}
          variant="outline"
          className="h-11 px-3 touch-manipulation border-white/20 text-white"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={handleWhatsApp}
          className="h-11 touch-manipulation bg-green-600 hover:bg-green-700 text-white"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          WhatsApp
        </Button>
        <Button
          onClick={handleEmail}
          className="h-11 touch-manipulation bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>
      </div>
    </div>
  );
};
