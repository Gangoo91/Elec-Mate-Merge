import React, { useState } from 'react';
import { Send, Copy, Check, Loader2, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
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
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Link copied to clipboard' });
  };

  const handleWhatsApp = () => {
    if (!shareUrl) return;
    const text = encodeURIComponent(
      `Hi ${visit.customerName || ''},\n\nPlease review and sign the scope of works for your property:\n${shareUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
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
            Send to Client for Signature
          </>
        )}
      </Button>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <Check className="h-5 w-5 text-emerald-400 flex-shrink-0" />
        <p className="text-sm font-medium text-emerald-400">Share link created</p>
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
          disabled={isSendingEmail}
          className="h-11 touch-manipulation bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSendingEmail ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Mail className="h-4 w-4 mr-2" />
          )}
          {isSendingEmail ? 'Sending...' : 'Email'}
        </Button>
      </div>
    </div>
  );
};
