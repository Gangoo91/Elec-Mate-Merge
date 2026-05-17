import { useState, useCallback, useEffect } from 'react';
import {
  Save,
  Check,
  Loader2,
  Receipt,
  Download,
  PenTool,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useSiteVisitStorage } from '@/hooks/useSiteVisitStorage';
import { useQuoteStorage } from '@/hooks/useQuoteStorage';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { RoomPhotoCapture } from '@/components/site-visit/capture/RoomPhotoCapture';
import { SignatureCapture } from '@/components/ui/signature-capture';
import { CompletionShareButton } from './CompletionShareButton';
import { downloadCompletionCertificatePDF } from '@/utils/completion-certificate-pdf';
import { supabase } from '@/integrations/supabase/client';
import type { SiteVisit, SiteVisitPhoto } from '@/types/siteVisit';
import { Eyebrow, Dot } from '@/components/college/primitives';

interface PostJobTabProps {
  visit: SiteVisit;
  onVisitUpdate: (visit: SiteVisit) => void;
}

export const PostJobTab = ({ visit, onVisitUpdate }: PostJobTabProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { saveSiteVisit, uploadSiteVisitPhotos, bridgePhotosToSafetyPhotos, updateStatus } =
    useSiteVisitStorage();
  const { updateQuoteStatus } = useQuoteStorage();
  const { companyProfile } = useCompanyProfile();

  const [afterPhotos, setAfterPhotos] = useState<SiteVisitPhoto[]>(
    visit.photos.filter((p) => p.photoPhase === 'after')
  );
  const [isSavingPhotos, setIsSavingPhotos] = useState(false);
  const [photosSaved, setPhotosSaved] = useState(false);
  const [isRaisingInvoice, setIsRaisingInvoice] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [compareIndex, setCompareIndex] = useState(0);
  const [completionSigned, setCompletionSigned] = useState(false);
  const [completionClientName, setCompletionClientName] = useState(visit.customerName || '');
  const [completionSignatureData, setCompletionSignatureData] = useState<string | null>(null);
  const [isSigningCompletion, setIsSigningCompletion] = useState(false);
  const [showCompletionFallback, setShowCompletionFallback] = useState(false);

  const beforePhotos = visit.photos.filter((p) => p.photoPhase === 'before');
  const isCompletionSent = visit.status === 'post_job';
  const hasAfterPhotos = afterPhotos.some((p) => !p.photoUrl.startsWith('blob:'));
  const savedAfterPhotos = afterPhotos.filter((p) => !p.photoUrl.startsWith('blob:'));

  // Realtime subscription for completion signing
  useEffect(() => {
    if (!visit.id || !isCompletionSent) return;

    const channel = supabase
      .channel(`completion-${visit.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'completion_signoffs',
          filter: `site_visit_id=eq.${visit.id}`,
        },
        (payload) => {
          if (payload.new?.status === 'signed') {
            setCompletionSigned(true);
            toast({
              title: 'Client has signed off',
              description: 'The completion has been signed by the client.',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [visit.id, isCompletionSent, toast]);

  const handleAddAfterPhoto = (photoUrl: string, description?: string) => {
    const newPhoto: SiteVisitPhoto = {
      id: crypto.randomUUID(),
      siteVisitId: visit.id,
      photoUrl,
      description,
      photoPhase: 'after',
    };
    setAfterPhotos((prev) => [...prev, newPhoto]);
    setPhotosSaved(false);
  };

  const handleRemoveAfterPhoto = (photoId: string) => {
    setAfterPhotos((prev) => prev.filter((p) => p.id !== photoId));
    setPhotosSaved(false);
  };

  const handleSaveAfterPhotos = useCallback(async () => {
    if (afterPhotos.length === 0) return;
    setIsSavingPhotos(true);
    setPhotosSaved(false);

    try {
      const allPhotos = [...beforePhotos, ...afterPhotos];
      const updatedVisit: SiteVisit = { ...visit, photos: allPhotos };

      // Upload blob photos
      const uploadedPhotos = await uploadSiteVisitPhotos(updatedVisit);
      const finalVisit: SiteVisit = { ...updatedVisit, photos: uploadedPhotos };

      // Save to database
      await saveSiteVisit(finalVisit);

      // Bridge after photos to safety_photos for Photo Documentation
      await bridgePhotosToSafetyPhotos(finalVisit);

      // Update local state
      onVisitUpdate(finalVisit);
      setAfterPhotos(uploadedPhotos.filter((p) => p.photoPhase === 'after'));
      setPhotosSaved(true);

      toast({
        title: 'After photos saved',
        description: `${afterPhotos.length} photo(s) uploaded and saved.`,
      });
    } catch (error: unknown) {
      toast({
        title: 'Save failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsSavingPhotos(false);
    }
  }, [
    visit,
    beforePhotos,
    afterPhotos,
    uploadSiteVisitPhotos,
    saveSiteVisit,
    bridgePhotosToSafetyPhotos,
    onVisitUpdate,
    toast,
  ]);

  const handleCompletionSignatureCapture = useCallback((data: string) => {
    setCompletionSignatureData(data || null);
  }, []);

  const handleSignCompletion = useCallback(async () => {
    if (!completionSignatureData || !completionClientName.trim()) return;
    setIsSigningCompletion(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const token = `in-app-${crypto.randomUUID()}`;

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
        client_name: completionClientName.trim(),
        client_email: visit.customerEmail,
        company_name: companyProfile?.company_name || null,
        company_logo_url: companyProfile?.logo_url || null,
        requires_signature: true,
        status: 'signed',
        signature_data: completionSignatureData,
        signed_at: new Date().toISOString(),
      });

      if (error) throw error;

      // Update visit status to post_job
      if (visit.id) {
        await updateStatus(visit.id, 'post_job');
      }

      setCompletionSigned(true);
      toast({
        title: 'Completion signed',
        description: 'The client has signed off the completed work.',
      });
    } catch (error: unknown) {
      toast({
        title: 'Signing failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsSigningCompletion(false);
    }
  }, [completionSignatureData, completionClientName, visit, companyProfile, updateStatus, toast]);

  const handleRaiseInvoice = useCallback(async () => {
    if (!visit.quoteId) return;
    setIsRaisingInvoice(true);

    try {
      // Mark quote as work_done — this triggers the existing auto-invoice flow
      const success = await updateQuoteStatus(visit.quoteId, 'approved', ['work_done'], 'accepted');

      if (!success) throw new Error('Failed to update quote status');

      toast({
        title: 'Invoice raised',
        description: 'Your invoice has been created from the accepted quote.',
      });

      navigate('/electrician/invoices');
    } catch (error: unknown) {
      toast({
        title: 'Invoice failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsRaisingInvoice(false);
    }
  }, [visit.quoteId, updateQuoteStatus, navigate, toast]);

  const handleDownloadCertificate = useCallback(async () => {
    setIsDownloading(true);
    try {
      await downloadCompletionCertificatePDF({
        companyName: companyProfile?.company_name || undefined,
        companyLogoUrl: companyProfile?.logo_url || undefined,
        propertyAddress: visit.propertyAddress,
        clientName: visit.customerName,
        rooms: visit.rooms.map((r) => ({
          roomName: r.roomName,
          items: r.items.map((i) => ({
            itemDescription: i.itemDescription,
            quantity: i.quantity,
            unit: i.unit,
          })),
        })),
        beforePhotoUrls: beforePhotos
          .filter((p) => !p.photoUrl.startsWith('blob:'))
          .map((p) => p.photoUrl),
        afterPhotoUrls: savedAfterPhotos.map((p) => p.photoUrl),
        referenceId: visit.id.slice(0, 8).toUpperCase(),
      });
    } catch {
      toast({ title: 'PDF generation failed', variant: 'destructive' });
    } finally {
      setIsDownloading(false);
    }
  }, [visit, beforePhotos, savedAfterPhotos, companyProfile, toast]);

  const canCompare = beforePhotos.length > 0 && savedAfterPhotos.length > 0;
  const maxCompareIndex = Math.min(beforePhotos.length, savedAfterPhotos.length) - 1;

  return (
    <div className="space-y-5">
      {/* Section 01 — After photos capture */}
      <section className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Eyebrow>01 · AFTER PHOTOS</Eyebrow>
            <h3 className="mt-1.5 text-[18px] font-semibold tracking-tight text-white sm:text-[20px]">
              Capture the finished work
            </h3>
            <p className="mt-1 text-[12.5px] text-white/65">
              Match the same areas as the before-photos — handover pack pairs them automatically.
            </p>
          </div>
          {photosSaved && (
            <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.10] px-2.5 text-[11px] font-medium text-emerald-400">
              <Dot tone="emerald" />
              Saved
            </span>
          )}
        </div>
        <div className="mt-4">
          <RoomPhotoCapture
            photos={afterPhotos}
            roomId=""
            photoPhase="after"
            onAddPhoto={handleAddAfterPhoto}
            onRemovePhoto={handleRemoveAfterPhoto}
          />
        </div>
        {afterPhotos.length > 0 && (
          <Button
            onClick={handleSaveAfterPhotos}
            disabled={isSavingPhotos || photosSaved}
            className="mt-4 h-11 w-full rounded-xl bg-elec-yellow text-[13px] font-semibold text-black hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation"
          >
            {isSavingPhotos ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading…
              </>
            ) : photosSaved ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Photos saved
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save after photos
              </>
            )}
          </Button>
        )}
      </section>

      {/* Section 02 — Before / after gallery */}
      {beforePhotos.length > 0 && (
        <section className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-5">
          <Eyebrow>
            02 · BEFORE {canCompare ? '& AFTER' : ''} · {beforePhotos.length} photo
            {beforePhotos.length !== 1 ? 's' : ''}
          </Eyebrow>
          <h3 className="mt-1.5 text-[18px] font-semibold tracking-tight text-white sm:text-[20px]">
            {canCompare ? 'Side-by-side compare' : 'Before photos'}
          </h3>

          {canCompare ? (
            <>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-blue-400">
                    Before
                  </span>
                  <div className="aspect-square overflow-hidden rounded-xl border border-blue-500/20 bg-white/[0.03]">
                    <img
                      src={beforePhotos[compareIndex]?.photoUrl}
                      alt="Before"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-400">
                    After
                  </span>
                  <div className="aspect-square overflow-hidden rounded-xl border border-emerald-500/20 bg-white/[0.03]">
                    <img
                      src={savedAfterPhotos[compareIndex]?.photoUrl}
                      alt="After"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
              {maxCompareIndex > 0 && (
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  {Array.from({ length: maxCompareIndex + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCompareIndex(i)}
                      className={`h-8 w-8 touch-manipulation rounded-full text-[12px] font-semibold transition-colors ${
                        i === compareIndex
                          ? 'bg-elec-yellow text-black'
                          : 'border border-white/[0.08] bg-white/[0.04] text-white/65 hover:bg-white/[0.08]'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {beforePhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03]"
                >
                  <img
                    src={photo.photoUrl}
                    alt={photo.description || 'Before photo'}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Section 03 — Client sign-off */}
      {!isCompletionSent && !completionSigned && hasAfterPhotos && photosSaved && (
        <section className="overflow-hidden rounded-2xl border border-elec-yellow/25 bg-gradient-to-b from-elec-yellow/[0.04] to-white/[0.015] p-5">
          <div
            aria-hidden
            className="-mx-5 -mt-5 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0"
          />
          <div className="pt-5">
            <Eyebrow>03 · CLIENT SIGN-OFF</Eyebrow>
            <h3 className="mt-1.5 text-[18px] font-semibold tracking-tight text-white sm:text-[20px]">
              Hand over the device to sign
            </h3>
            <p className="mt-1 text-[12.5px] text-white/65">
              Client name + signature locks in the completion record.
            </p>
          </div>

          <div className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <label className="text-[11.5px] font-medium text-white/65">Client name</label>
              <Input
                value={completionClientName}
                onChange={(e) => setCompletionClientName(e.target.value)}
                placeholder="Enter client name"
                className="h-11 rounded-xl border-white/[0.08] bg-[hsl(0_0%_10%)] text-[14px] text-white placeholder:text-white/35 focus:border-elec-yellow/40 focus:ring-elec-yellow/20 touch-manipulation"
              />
            </div>

            <SignatureCapture
              onCapture={handleCompletionSignatureCapture}
              variant="dark"
              showActions={false}
              height={180}
            />

            <Button
              onClick={handleSignCompletion}
              disabled={
                !completionSignatureData || !completionClientName.trim() || isSigningCompletion
              }
              className="h-12 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation"
            >
              {isSigningCompletion ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving signature…
                </>
              ) : (
                <>
                  <PenTool className="mr-2 h-4 w-4" />
                  Confirm completion
                </>
              )}
            </Button>

            {!showCompletionFallback ? (
              <button
                onClick={() => setShowCompletionFallback(true)}
                className="w-full text-center text-[12.5px] text-elec-yellow/90 underline underline-offset-2 transition-colors hover:text-elec-yellow touch-manipulation"
              >
                <Send className="mr-1.5 inline h-3.5 w-3.5" />
                Client not present? Send a link instead
              </button>
            ) : (
              <div className="mt-3 border-t border-white/[0.06] pt-3">
                <CompletionShareButton visit={visit} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Pre-condition prompts */}
      {!isCompletionSent && !completionSigned && hasAfterPhotos && !photosSaved && (
        <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-4 text-center">
          <p className="text-[12.5px] font-medium text-amber-400">
            Save your after-photos before requesting client sign-off
          </p>
        </div>
      )}
      {!isCompletionSent && !completionSigned && !hasAfterPhotos && (
        <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-4 text-center">
          <p className="text-[12.5px] font-medium text-amber-400">
            Add and save at least one after-photo before client sign-off
          </p>
        </div>
      )}

      {/* Section 04 — Completion certificate */}
      {(isCompletionSent || completionSigned) && (
        <section className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Eyebrow>04 · COMPLETION PDF</Eyebrow>
              <h3 className="mt-1.5 text-[16px] font-semibold tracking-tight text-white sm:text-[17px]">
                Hand the customer their copy
              </h3>
              <p className="mt-1 text-[12.5px] text-white/65">
                Before/after photos, signatures, scope summary — all in one PDF.
              </p>
            </div>
            <Button
              onClick={handleDownloadCertificate}
              disabled={isDownloading}
              className="h-11 shrink-0 rounded-full bg-white/[0.04] border border-white/[0.12] px-5 text-[13px] font-medium text-white hover:bg-white/[0.08] disabled:opacity-50 touch-manipulation"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </section>
      )}

      {/* Section 05 — Raise invoice */}
      {isCompletionSent && visit.quoteId && (
        <section className="relative overflow-hidden rounded-2xl border border-elec-yellow/25 bg-gradient-to-r from-elec-yellow/[0.06] to-transparent p-5">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/80 to-elec-yellow/0"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Eyebrow>05 · GET PAID</Eyebrow>
              <h3 className="mt-1.5 text-[16px] font-semibold tracking-tight text-white sm:text-[17px]">
                Raise the invoice
              </h3>
              <p className="mt-1 text-[12.5px] text-white/65">
                Creates an invoice from the accepted quote. Stripe link included.
              </p>
            </div>
            <Button
              onClick={handleRaiseInvoice}
              disabled={isRaisingInvoice}
              className="h-11 shrink-0 rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation"
            >
              {isRaisingInvoice ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <Receipt className="mr-2 h-4 w-4" />
                  Raise invoice →
                </>
              )}
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};
