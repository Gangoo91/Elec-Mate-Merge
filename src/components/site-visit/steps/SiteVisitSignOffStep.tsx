import { useState, useCallback } from 'react';
import { PenTool, Lock, Check, Loader2, FileText, Send, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SignatureCapture } from '@/components/ui/signature-capture';
import { ScopeShareButton } from '../scope/ScopeShareButton';
import { useToast } from '@/hooks/use-toast';
import { useSiteVisitStorage } from '@/hooks/useSiteVisitStorage';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { downloadScopePDF } from '@/utils/scope-pdf';
import { supabase } from '@/integrations/supabase/client';
import type { SiteVisit } from '@/types/siteVisit';

interface SiteVisitSignOffStepProps {
  visit: SiteVisit;
  assumptions: string;
  onSendToQuote: () => void;
}

export const SiteVisitSignOffStep = ({
  visit,
  assumptions,
  onSendToQuote,
}: SiteVisitSignOffStepProps) => {
  const { toast } = useToast();
  const { updateStatus } = useSiteVisitStorage();
  const { companyProfile } = useCompanyProfile();

  const [clientName, setClientName] = useState(visit.customerName || '');
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);

  const totalRooms = visit.rooms.length;
  const totalItems = visit.rooms.reduce((sum, r) => sum + r.items.length, 0);

  const handleSignatureCapture = useCallback((data: string) => {
    setSignatureData(data || null);
  }, []);

  const handleConfirmSign = useCallback(async () => {
    if (!signatureData || !clientName.trim()) return;
    setIsSigning(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const token = `in-app-${crypto.randomUUID()}`;
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

      const { error } = await supabase.from('scope_share_links').insert({
        user_id: user.id,
        site_visit_id: visit.id,
        share_token: token,
        title: `Scope of Works — ${visit.propertyAddress || 'Site Visit'}`,
        scope_data: scopeData,
        assumptions,
        client_name: clientName.trim(),
        client_email: visit.customerEmail,
        company_name: companyProfile?.company_name || null,
        requires_signature: true,
        status: 'signed',
        signature_data: signatureData,
        signed_at: new Date().toISOString(),
      });

      if (error) throw error;

      // Update visit status to signed
      if (visit.id) {
        await updateStatus(visit.id, 'signed');
      }

      setIsSigned(true);
      toast({
        title: 'Scope signed',
        description: 'The client has signed the scope of works.',
      });
    } catch (error: unknown) {
      toast({
        title: 'Signing failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsSigning(false);
    }
  }, [signatureData, clientName, visit, assumptions, companyProfile, updateStatus, toast]);

  const handleDownloadPDF = useCallback(async () => {
    setIsDownloadingPDF(true);
    try {
      await downloadScopePDF({
        companyName: companyProfile?.company_name || undefined,
        companyLogoUrl: companyProfile?.logo_url || undefined,
        referenceId: visit.id?.slice(0, 8).toUpperCase(),
        customerName: visit.customerName,
        customerEmail: visit.customerEmail,
        customerPhone: visit.customerPhone,
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
          .map((p) => {
            const room = p.roomId ? visit.rooms.find((r) => r.id === p.roomId) : undefined;
            return {
              promptQuestion: p.promptQuestion,
              response: p.response || '',
              roomName: room?.roomName,
            };
          }),
        assumptions,
      });
    } finally {
      setIsDownloadingPDF(false);
    }
  }, [visit, assumptions, companyProfile]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">Client Sign-Off</h2>
        <p className="text-sm text-white mt-1">
          Hand the device to the client to sign the scope of works
        </p>
      </div>

      {/* Locked scope summary card */}
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
          <Lock className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-medium text-white">
            {visit.propertyAddress || 'Site Visit'}
          </p>
          <p className="text-[13px] text-white">
            {totalRooms} room{totalRooms !== 1 ? 's' : ''} · {totalItems} item
            {totalItems !== 1 ? 's' : ''}
          </p>
        </div>
        <Check className="h-5 w-5 text-emerald-400 flex-shrink-0" />
      </div>

      {/* Download Scope PDF */}
      <Button
        onClick={handleDownloadPDF}
        disabled={isDownloadingPDF}
        variant="outline"
        className="w-full h-11 touch-manipulation border-white/20 text-white hover:border-elec-yellow hover:text-elec-yellow"
      >
        {isDownloadingPDF ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            Download Scope PDF
          </>
        )}
      </Button>

      {!isSigned ? (
        <>
          {/* Client name input */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">Client Name</label>
            <Input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter client name"
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          {/* Signature capture */}
          <SignatureCapture
            onCapture={handleSignatureCapture}
            variant="dark"
            showActions={false}
            height={180}
          />

          {/* Confirm & Sign button */}
          <Button
            onClick={handleConfirmSign}
            disabled={!signatureData || !clientName.trim() || isSigning}
            className="w-full h-12 text-base font-semibold touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            {isSigning ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Saving signature...
              </>
            ) : (
              <>
                <PenTool className="h-5 w-5 mr-2" />
                Confirm & Sign Scope
              </>
            )}
          </Button>

          {/* Fallback: Send link instead */}
          {!showFallback ? (
            <button
              onClick={() => setShowFallback(true)}
              className="w-full text-center text-sm text-white underline underline-offset-2 py-2 touch-manipulation"
            >
              <Send className="h-3.5 w-3.5 inline mr-1.5" />
              Client not present? Send a link instead
            </button>
          ) : (
            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
              <p className="text-xs text-white text-center">
                Send a link for the client to sign remotely
              </p>
              <ScopeShareButton visit={visit} assumptions={assumptions} />
            </div>
          )}
        </>
      ) : (
        <>
          {/* Signed confirmation */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <Check className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-medium text-emerald-400">Scope Signed</p>
              <p className="text-[13px] text-white">
                Signed by {clientName} ·{' '}
                {new Date().toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          {/* Send to Quote Wizard */}
          <div className="space-y-2 pt-4 border-t border-white/[0.06]">
            <Button
              onClick={onSendToQuote}
              className="w-full h-12 text-base font-semibold touch-manipulation bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <FileText className="h-5 w-5 mr-2" />
              Send to Quote Wizard
            </Button>
            <p className="text-xs text-white text-center">
              Pre-fills materials from your scope into the quote builder
            </p>
          </div>
        </>
      )}
    </div>
  );
};
