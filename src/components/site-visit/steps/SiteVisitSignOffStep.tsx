import { useState, useCallback, useEffect, useRef } from 'react';
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
  const [signedAt, setSignedAt] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check for remote signature on mount + poll when fallback is shown
  useEffect(() => {
    if (isSigned || !visit.id) return;

    const checkRemoteSignature = async () => {
      const { data } = await supabase
        .from('scope_share_links')
        .select('client_name, signature_data, signed_at')
        .eq('site_visit_id', visit.id!)
        .eq('status', 'signed')
        .order('signed_at', { ascending: false })
        .limit(1)
        .single();

      if (data?.signature_data) {
        setIsSigned(true);
        setClientName(data.client_name || '');
        setSignatureData(data.signature_data);
        setSignedAt(data.signed_at || null);
        if (pollRef.current) {
          clearInterval(pollRef.current);
          pollRef.current = null;
        }
      }
    };

    // Check immediately on mount
    checkRemoteSignature();

    // Start polling when fallback (send-link) is visible
    if (showFallback && !pollRef.current) {
      pollRef.current = setInterval(checkRemoteSignature, 10_000);
    }

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [visit.id, isSigned, showFallback]);

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
      setSignedAt(new Date().toISOString());
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

  const buildPDFData = useCallback(
    (includeSig: boolean) => ({
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
      ...(includeSig && signatureData
        ? {
            signatureData,
            signedByName: clientName.trim(),
            signedAt: signedAt || new Date().toISOString(),
          }
        : {}),
    }),
    [visit, assumptions, companyProfile, signatureData, clientName, signedAt]
  );

  const handleDownloadPDF = useCallback(async () => {
    setIsDownloadingPDF(true);
    try {
      await downloadScopePDF(buildPDFData(isSigned));
    } finally {
      setIsDownloadingPDF(false);
    }
  }, [buildPDFData, isSigned]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[18px] font-semibold tracking-tight text-white sm:text-[20px]">
          Client sign-off
        </h2>
        <p className="mt-1 text-[12.5px] text-white/65">
          Hand the device to the client to sign the scope of works.
        </p>
      </div>

      {/* Locked scope summary card */}
      <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.12]">
          <Lock className="h-4 w-4 text-elec-yellow" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium text-white">
            {visit.propertyAddress || 'Site Visit'}
          </p>
          <p className="text-[12px] text-white/65">
            {totalRooms} room{totalRooms !== 1 ? 's' : ''} · {totalItems} item
            {totalItems !== 1 ? 's' : ''}
          </p>
        </div>
        <Check className="h-4 w-4 shrink-0 text-elec-yellow" />
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
            <label className="text-[11.5px] font-medium text-white/65">Client name</label>
            <Input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter client name"
              className="h-11 touch-manipulation rounded-xl border-white/[0.08] bg-[hsl(0_0%_10%)] text-[14px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-elec-yellow/20"
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
          {/* Signed confirmation — editorial */}
          <div className="relative flex items-center gap-3 overflow-hidden rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-500/[0.06] to-transparent p-4">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/80 to-emerald-500/0"
            />
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/[0.12]">
              <Check className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-400">
                Scope signed
              </div>
              <p className="mt-0.5 text-[12.5px] text-white/65">
                Signed by {clientName} ·{' '}
                {signedAt
                  ? new Date(signedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }) +
                    ' at ' +
                    new Date(signedAt).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : new Date().toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
              </p>
            </div>
          </div>

          {/* Signature preview */}
          {signatureData && (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
              <p className="text-xs text-white mb-2">Client Signature</p>
              <div className="rounded-lg bg-white p-2">
                <img
                  src={signatureData}
                  alt={`Signature by ${clientName}`}
                  className="w-full h-auto max-h-32 object-contain"
                />
              </div>
            </div>
          )}

          {/* Download Signed PDF */}
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloadingPDF}
            variant="outline"
            className="h-11 w-full touch-manipulation rounded-xl border-white/[0.12] bg-white/[0.04] text-white hover:bg-white/[0.08]"
          >
            {isDownloadingPDF ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating PDF…
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download signed PDF
              </>
            )}
          </Button>

          {/* Send to Quote Wizard */}
          <div className="space-y-2 border-t border-white/[0.06] pt-4">
            <Button
              onClick={onSendToQuote}
              className="h-12 w-full touch-manipulation rounded-xl bg-elec-yellow text-[14px] font-semibold text-black hover:bg-elec-yellow/90"
            >
              <FileText className="mr-2 h-5 w-5" />
              Send to quote wizard →
            </Button>
            <p className="text-center text-[12px] text-white/55">
              Pre-fills materials from your scope into the quote builder
            </p>
          </div>
        </>
      )}
    </div>
  );
};
