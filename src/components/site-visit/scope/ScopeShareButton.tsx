import React, { useState } from 'react';
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

interface ScopeShareButtonProps {
  visit: SiteVisit;
  assumptions: string;
}

export const ScopeShareButton = ({ visit, assumptions }: ScopeShareButtonProps) => {
  const { toast } = useToast();
  const { updateStatus } = useSiteVisitStorage();
  const { companyProfile } = useCompanyProfile();
  const [isCreating, setIsCreating] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [scopeShareLinkId, setScopeShareLinkId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleCreateShare = async () => {
    setIsCreating(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const token = crypto.randomUUID();
      const scopeData = {
        customerName: visit.customerName,
        customerEmail: visit.customerEmail,
        propertyAddress: visit.propertyAddress,
        propertyPostcode: visit.propertyPostcode,
        propertyType: visit.propertyType,
        rooms: visit.rooms.map((r) => ({
          roomName: r.roomName,
          items: r.items.map((i) => ({
            itemDescription: i.itemDescription,
            quantity: i.quantity,
            unit: i.unit,
          })),
          notes: r.notes,
        })),
        prompts: visit.prompts
          .filter((p) => p.response)
          .map((p) => ({
            promptQuestion: p.promptQuestion,
            response: p.response,
          })),
        assumptions,
      };

      const { data: insertedLink, error } = await supabase
        .from('scope_share_links')
        .insert({
          user_id: user.id,
          site_visit_id: visit.id,
          share_token: token,
          title: `Scope of Works — ${visit.propertyAddress || 'Site Visit'}`,
          scope_data: scopeData,
          assumptions,
          client_name: visit.customerName,
          client_email: visit.customerEmail,
          company_name: companyProfile?.company_name || null,
          requires_signature: true,
          status: 'active',
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        })
        .select('id')
        .single();

      if (error) throw error;

      const url = `${window.location.origin}/scope/${token}`;
      setShareUrl(url);
      setScopeShareLinkId(insertedLink?.id ?? null);

      // Update visit status to scope_sent
      if (visit.id) {
        await updateStatus(visit.id, 'scope_sent');
      }

      toast({ title: 'Share link created', description: 'Send this link to your client.' });
    } catch (error: unknown) {
      toast({
        title: 'Failed to create share link',
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
      `Hi ${visit.customerName || ''},\n\nPlease review and sign the scope of works for your property:\n${shareUrl}`
    );
    await openExternalUrl(`https://wa.me/?text=${text}`);
  };

  const handleEmail = async () => {
    if (!shareUrl || !scopeShareLinkId) return;

    if (!visit.customerEmail?.trim()) {
      toast({
        title: 'No client email',
        description: 'Add a client email address to the site visit first.',
        variant: 'destructive',
      });
      return;
    }

    setIsSendingEmail(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-scope-email', {
        body: { scopeShareLinkId, clientEmail: visit.customerEmail.trim() },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({
        title: 'Email sent',
        description: `Scope email sent to ${visit.customerEmail}`,
      });
    } catch (err: unknown) {
      toast({
        title: 'Email failed',
        description: err instanceof Error ? err.message : 'Failed to send email',
        variant: 'destructive',
      });
    } finally {
      setIsSendingEmail(false);
    }
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
              Client review
            </div>
            <div className="mt-1 text-[15px] font-semibold text-white sm:text-[16px]">
              Send the scope for client signature.
            </div>
            <p className="mt-1 text-[12.5px] text-white/65">
              Secure share link. Client reviews the scope and signs on their own device.
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
                Send to client →
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
          Share link ready
        </span>
      </div>
      <p className="mt-2 text-[13px] text-white/75">
        Share with the client — they review the scope and sign on their own device.
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
          variant="outline"
          className="h-11 touch-manipulation rounded-xl border-white/[0.15] bg-white/[0.04] text-white transition-transform hover:bg-white/[0.08] active:scale-[0.98]"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          WhatsApp
        </Button>
        <Button
          onClick={handleEmail}
          disabled={isSendingEmail}
          variant="outline"
          className="h-11 touch-manipulation rounded-xl border-white/[0.15] bg-white/[0.04] text-white transition-transform hover:bg-white/[0.08] active:scale-[0.98] disabled:opacity-50"
        >
          {isSendingEmail ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Mail className="mr-2 h-4 w-4" />
          )}
          {isSendingEmail ? 'Sending…' : 'Email'}
        </Button>
      </div>
    </div>
  );
};
