import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, ClipboardList, Loader2, Camera, Save, Check, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteVisitWizard } from '@/components/site-visit/SiteVisitWizard';
import { useSiteVisitStorage } from '@/hooks/useSiteVisitStorage';
import { RoomPhotoCapture } from '@/components/site-visit/capture/RoomPhotoCapture';
import { PostJobTab } from '@/components/site-visit/post-job/PostJobTab';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect, useCallback } from 'react';
import type { SiteVisit, SiteVisitPhoto } from '@/types/siteVisit';

const SiteVisitEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const {
    loadSiteVisit,
    saveSiteVisit,
    uploadSiteVisitPhotos,
    getQuoteStatus,
    isLoading,
    isSaving,
  } = useSiteVisitStorage();
  const { toast } = useToast();
  const [visit, setVisit] = useState<SiteVisit | null>(null);
  const [activeTab, setActiveTab] = useState<'edit' | 'after' | 'post-job'>('edit');
  const [afterPhotos, setAfterPhotos] = useState<SiteVisitPhoto[]>([]);
  const [isSavingPhotos, setIsSavingPhotos] = useState(false);
  const [photosSaved, setPhotosSaved] = useState(false);
  const [postJobEligible, setPostJobEligible] = useState(false);

  useEffect(() => {
    if (id) {
      loadSiteVisit(id).then(async (v) => {
        if (v) {
          setVisit(v);
          setAfterPhotos(v.photos.filter((p) => p.photoPhase === 'after'));

          // Check post-job eligibility
          if (['completed', 'scope_sent', 'signed', 'post_job'].includes(v.status) && v.quoteId) {
            const quoteStatus = await getQuoteStatus(v.quoteId);
            if (quoteStatus?.acceptanceStatus === 'accepted') {
              setPostJobEligible(true);
            }
          }

          // Handle ?tab=post-job URL param
          const tabParam = searchParams.get('tab');
          if (tabParam === 'post-job') {
            setActiveTab('post-job');
          }
        }
      });
    }
  }, [id, loadSiteVisit, getQuoteStatus, searchParams]);

  const showAfterTab =
    visit?.status === 'completed' ||
    visit?.status === 'scope_sent' ||
    visit?.status === 'signed' ||
    visit?.status === 'post_job';

  const showPostJobTab = postJobEligible || visit?.status === 'post_job';

  const handleAddAfterPhoto = (photoUrl: string, description?: string) => {
    const newPhoto: SiteVisitPhoto = {
      id: crypto.randomUUID(),
      siteVisitId: visit?.id || '',
      photoUrl,
      description,
      photoPhase: 'after',
    };
    setAfterPhotos((prev) => [...prev, newPhoto]);
  };

  const handleRemoveAfterPhoto = (photoId: string) => {
    setAfterPhotos((prev) => prev.filter((p) => p.id !== photoId));
    setPhotosSaved(false);
  };

  const handleSaveAfterPhotos = useCallback(async () => {
    if (!visit || afterPhotos.length === 0) return;
    setIsSavingPhotos(true);
    setPhotosSaved(false);

    try {
      // Merge after photos with existing before photos
      const beforePhotos = visit.photos.filter((p) => p.photoPhase !== 'after');
      const allPhotos = [...beforePhotos, ...afterPhotos];
      const updatedVisit: SiteVisit = { ...visit, photos: allPhotos };

      // Upload any blob photos to Supabase storage
      const uploadedPhotos = await uploadSiteVisitPhotos(updatedVisit);
      const finalVisit: SiteVisit = { ...updatedVisit, photos: uploadedPhotos };

      // Persist to database
      await saveSiteVisit(finalVisit);

      // Update local state with persisted URLs
      setVisit(finalVisit);
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
  }, [visit, afterPhotos, uploadSiteVisitPhotos, saveSiteVisit, toast]);

  if (isLoading || !visit) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-background pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Helmet>
        <title>Edit Site Visit | Elec-Mate</title>
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/electrician/business')}
            className="h-10 w-10 -ml-2 touch-manipulation active:scale-95 hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
            <ClipboardList className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-white truncate">
              {visit.propertyAddress || 'Site Visit'}
            </h1>
            <p className="text-[11px] text-white capitalize">{visit.status.replace('_', ' ')}</p>
          </div>
        </div>

        {/* Tabs (if after photos or post-job tab visible) */}
        {(showAfterTab || showPostJobTab) && (
          <div className="flex gap-1 px-4 pb-2">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium touch-manipulation transition-all ${
                activeTab === 'edit'
                  ? 'bg-elec-yellow/20 text-white border border-elec-yellow'
                  : 'text-white'
              }`}
            >
              Edit Visit
            </button>
            {showAfterTab && (
              <button
                onClick={() => setActiveTab('after')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium touch-manipulation transition-all ${
                  activeTab === 'after'
                    ? 'bg-elec-yellow/20 text-white border border-elec-yellow'
                    : 'text-white'
                }`}
              >
                <Camera className="h-3.5 w-3.5 inline mr-1.5" />
                After Photos
              </button>
            )}
            {showPostJobTab && (
              <button
                onClick={() => setActiveTab('post-job')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium touch-manipulation transition-all ${
                  activeTab === 'post-job'
                    ? 'bg-elec-yellow/20 text-white border border-elec-yellow'
                    : 'text-white'
                }`}
              >
                <Briefcase className="h-3.5 w-3.5 inline mr-1.5" />
                Post-Job
              </button>
            )}
          </div>
        )}
      </header>

      <main className="px-4 py-4">
        {activeTab === 'edit' && <SiteVisitWizard initialVisit={visit} />}

        {activeTab === 'after' && showAfterTab && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white">Completion Photos</h2>
              <p className="text-sm text-white mt-1">
                Add after photos to document the completed work
              </p>
            </div>

            <RoomPhotoCapture
              photos={afterPhotos}
              roomId=""
              photoPhase="after"
              onAddPhoto={handleAddAfterPhoto}
              onRemovePhoto={handleRemoveAfterPhoto}
            />

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
          </div>
        )}

        {activeTab === 'post-job' && showPostJobTab && visit && (
          <PostJobTab
            visit={visit}
            onVisitUpdate={(updated) => {
              setVisit(updated);
              setAfterPhotos(updated.photos.filter((p) => p.photoPhase === 'after'));
            }}
          />
        )}
      </main>
    </motion.div>
  );
};

export default SiteVisitEditPage;
