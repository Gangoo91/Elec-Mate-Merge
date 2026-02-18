import { useState, useCallback, useEffect } from 'react';
import {
  Camera,
  Save,
  Check,
  Loader2,
  Image,
  Receipt,
  Download,
  ArrowLeftRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useSiteVisitStorage } from '@/hooks/useSiteVisitStorage';
import { useQuoteStorage } from '@/hooks/useQuoteStorage';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { RoomPhotoCapture } from '@/components/site-visit/capture/RoomPhotoCapture';
import { CompletionShareButton } from './CompletionShareButton';
import { downloadCompletionCertificatePDF } from '@/utils/completion-certificate-pdf';
import { supabase } from '@/integrations/supabase/client';
import type { SiteVisit, SiteVisitPhoto } from '@/types/siteVisit';

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
    <div className="space-y-6">
      {/* Before Photos Grid */}
      {beforePhotos.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Image className="h-4 w-4 text-blue-400" />
            Before Photos ({beforePhotos.length})
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {beforePhotos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06]"
              >
                <img
                  src={photo.photoUrl}
                  alt={photo.description || 'Before photo'}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* After Photos Capture */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Camera className="h-4 w-4 text-emerald-400" />
          After Photos
        </h3>
        <p className="text-xs text-white">Capture photos of the completed work</p>
        <RoomPhotoCapture
          photos={afterPhotos}
          roomId=""
          photoPhase="after"
          onAddPhoto={handleAddAfterPhoto}
          onRemovePhoto={handleRemoveAfterPhoto}
        />
      </div>

      {/* Save After Photos */}
      {afterPhotos.length > 0 && (
        <Button
          onClick={handleSaveAfterPhotos}
          disabled={isSavingPhotos || photosSaved}
          className="w-full h-12 text-base font-semibold touch-manipulation bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {isSavingPhotos ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Uploading & saving...
            </>
          ) : photosSaved ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              Photos Saved
            </>
          ) : (
            <>
              <Save className="h-5 w-5 mr-2" />
              Save After Photos
            </>
          )}
        </Button>
      )}

      {/* Before/After Comparison */}
      {canCompare && (
        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4 text-amber-400" />
            Before & After Comparison
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                Before
              </span>
              <div className="aspect-square rounded-xl overflow-hidden bg-white/[0.03] border border-blue-500/20">
                <img
                  src={beforePhotos[compareIndex]?.photoUrl}
                  alt="Before"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                After
              </span>
              <div className="aspect-square rounded-xl overflow-hidden bg-white/[0.03] border border-emerald-500/20">
                <img
                  src={savedAfterPhotos[compareIndex]?.photoUrl}
                  alt="After"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          {maxCompareIndex > 0 && (
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: maxCompareIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCompareIndex(i)}
                  className={`w-8 h-8 rounded-full touch-manipulation flex items-center justify-center text-xs font-semibold ${
                    i === compareIndex ? 'bg-elec-yellow text-black' : 'bg-white/[0.06] text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Send Completion for Sign-off */}
      {!isCompletionSent && (
        <div className="pt-4 border-t border-white/[0.06] space-y-2">
          {!hasAfterPhotos && (
            <p className="text-xs text-amber-400 text-center">
              Add and save at least one after photo before sharing
            </p>
          )}
          <div className={!hasAfterPhotos ? 'opacity-50 pointer-events-none' : ''}>
            <CompletionShareButton visit={visit} />
          </div>
        </div>
      )}

      {/* Download Certificate — shown after completion is signed */}
      {(isCompletionSent || completionSigned) && (
        <div className="pt-4 border-t border-white/[0.06]">
          <Button
            onClick={handleDownloadCertificate}
            disabled={isDownloading}
            className="w-full h-12 text-base font-semibold touch-manipulation bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" />
                Download Completion Certificate
              </>
            )}
          </Button>
        </div>
      )}

      {/* Raise Invoice — shown after completion is sent or signed */}
      {isCompletionSent && visit.quoteId && (
        <div className="pt-4 border-t border-white/[0.06]">
          <Button
            onClick={handleRaiseInvoice}
            disabled={isRaisingInvoice}
            className="w-full h-12 text-base font-semibold touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            {isRaisingInvoice ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Creating invoice...
              </>
            ) : (
              <>
                <Receipt className="h-5 w-5 mr-2" />
                Raise Invoice
              </>
            )}
          </Button>
          <p className="text-xs text-white text-center mt-2">
            Creates an invoice from the accepted quote
          </p>
        </div>
      )}
    </div>
  );
};
