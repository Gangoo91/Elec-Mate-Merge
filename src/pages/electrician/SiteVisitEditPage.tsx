import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Save, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteVisitWizard } from '@/components/site-visit/SiteVisitWizard';
import { useSiteVisitStorage } from '@/hooks/useSiteVisitStorage';
import { RoomPhotoCapture } from '@/components/site-visit/capture/RoomPhotoCapture';
import { PostJobTab } from '@/components/site-visit/post-job/PostJobTab';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect, useCallback, useMemo } from 'react';
import type { SiteVisit, SiteVisitPhoto } from '@/types/siteVisit';
import { Eyebrow, StatStrip, Pill, Dot } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

type StatusKey = 'in_progress' | 'completed' | 'scope_sent' | 'signed' | 'post_job';

const statusToneMap: Record<StatusKey, 'amber' | 'green' | 'blue' | 'emerald' | 'purple'> = {
  in_progress: 'amber',
  completed: 'green',
  scope_sent: 'blue',
  signed: 'emerald',
  post_job: 'purple',
};

const statusLabelMap: Record<StatusKey, string> = {
  in_progress: 'In progress',
  completed: 'Completed',
  scope_sent: 'Scope sent',
  signed: 'Signed',
  post_job: 'Post-job',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

// Status order for the horizontal stepper.
const STATUS_STEPS: { key: StatusKey; label: string }[] = [
  { key: 'in_progress', label: 'Captured' },
  { key: 'completed', label: 'Scoped' },
  { key: 'scope_sent', label: 'Sent' },
  { key: 'signed', label: 'Signed' },
  { key: 'post_job', label: 'Invoiced' },
];

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
  } = useSiteVisitStorage();
  const { toast } = useToast();
  const [visit, setVisit] = useState<SiteVisit | null>(null);
  const [activeTab, setActiveTab] = useState<'edit' | 'after' | 'post-job'>('edit');
  const [afterPhotos, setAfterPhotos] = useState<SiteVisitPhoto[]>([]);
  const [isSavingPhotos, setIsSavingPhotos] = useState(false);
  const [photosSaved, setPhotosSaved] = useState(false);
  const [postJobEligible, setPostJobEligible] = useState(false);
  const [quoteStatusValue, setQuoteStatusValue] = useState<string | null>(null);
  const [quoteTotal, setQuoteTotal] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    loadSiteVisit(id).then(async (v) => {
      if (!v) return;
      setVisit(v);
      setAfterPhotos(v.photos.filter((p) => p.photoPhase === 'after'));

      if (['completed', 'scope_sent', 'signed', 'post_job'].includes(v.status) && v.quoteId) {
        const quoteStatus = await getQuoteStatus(v.quoteId);
        if (quoteStatus) {
          setQuoteStatusValue(quoteStatus.acceptanceStatus || null);
          // Quote total may or may not be returned; coerce to null if missing.
          const total = (quoteStatus as unknown as { total?: number }).total;
          if (typeof total === 'number') setQuoteTotal(total);
          if (quoteStatus.acceptanceStatus === 'accepted') {
            setPostJobEligible(true);
          }
        }
      }

      const tabParam = searchParams.get('tab');
      if (tabParam === 'post-job') setActiveTab('post-job');
      if (tabParam === 'after') setActiveTab('after');
    });
  }, [id, loadSiteVisit, getQuoteStatus, searchParams]);

  const showAfterTab = !!visit && ['completed', 'scope_sent', 'signed', 'post_job'].includes(visit.status);
  const showPostJobTab = showAfterTab && postJobEligible;

  const counts = useMemo(() => {
    const rooms = visit?.rooms?.length || 0;
    const items = visit?.rooms?.reduce((s, r) => s + (r.items?.length || 0), 0) || 0;
    const photos = visit?.photos?.length || 0;
    return { rooms, items, photos };
  }, [visit]);

  const status = (visit?.status || 'in_progress') as StatusKey;
  const currentStepIdx = STATUS_STEPS.findIndex((s) => s.key === status);

  // Next-action banner computation
  const nextAction = useMemo(() => {
    if (!visit) return null;
    if (status === 'in_progress') {
      return {
        eyebrow: 'Suggested next action',
        title: 'Finish scoping',
        sub: `${counts.rooms} room${counts.rooms === 1 ? '' : 's'} captured · scope still draft`,
        cta: 'Continue scoping →',
        onClick: () => setActiveTab('edit'),
      };
    }
    if (status === 'completed') {
      return {
        eyebrow: 'Suggested next action',
        title: 'Send scope to the client',
        sub: 'Scope is locked. Email or share a sign-off link.',
        cta: 'Open scope →',
        onClick: () => setActiveTab('edit'),
      };
    }
    if (status === 'scope_sent') {
      return {
        eyebrow: 'Awaiting client',
        title: 'Waiting on signature',
        sub: 'Resend the link or follow up.',
        cta: 'Resend link →',
        onClick: () => setActiveTab('edit'),
      };
    }
    if (status === 'signed' && postJobEligible) {
      return {
        eyebrow: 'Suggested next action',
        title: 'Capture after-photos and invoice',
        sub: 'Quote accepted — finish the job.',
        cta: 'Open post-job →',
        onClick: () => setActiveTab('post-job'),
      };
    }
    if (status === 'signed') {
      return {
        eyebrow: 'Suggested next action',
        title: 'Add after-photos',
        sub: 'Document the completed work.',
        cta: 'Open after-photos →',
        onClick: () => setActiveTab('after'),
      };
    }
    return null;
  }, [visit, status, counts.rooms, postJobEligible]);

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
      const beforePhotos = visit.photos.filter((p) => p.photoPhase !== 'after');
      const allPhotos = [...beforePhotos, ...afterPhotos];
      const updatedVisit: SiteVisit = { ...visit, photos: allPhotos };

      const uploadedPhotos = await uploadSiteVisitPhotos(updatedVisit);
      const finalVisit: SiteVisit = { ...updatedVisit, photos: uploadedPhotos };

      await saveSiteVisit(finalVisit);

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

  const tabs: { key: 'edit' | 'after' | 'post-job'; label: string; show: boolean }[] = [
    { key: 'edit', label: 'Scope & rooms', show: true },
    { key: 'after', label: 'After photos', show: showAfterTab },
    { key: 'post-job', label: 'Post-job', show: showPostJobTab },
  ];

  return (
    <motion.div
      className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Helmet>
        <title>Site visit · {visit.propertyAddress || 'Untitled'} | Elec-Mate</title>
      </Helmet>

      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md">
        <div className="flex h-14 items-center gap-2 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/electrician/site-visits')}
            className="-ml-2 h-9 w-9 touch-manipulation hover:bg-white/5 active:scale-95"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-bold uppercase tracking-wide text-white">
              {visit.propertyAddress || 'Site visit'}
            </h1>
          </div>
          <Pill tone={statusToneMap[status]}>
            <Dot tone={statusToneMap[status]} className="mr-1.5" />
            {statusLabelMap[status]}
          </Pill>
        </div>
        <div className="h-px bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </header>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl space-y-6 px-4 py-5 sm:space-y-7 sm:py-6"
      >
        {/* Hero */}
        <motion.div variants={itemVariants}>
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-5 sm:p-7">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 opacity-80"
            />
            <Eyebrow>
              SITE VISIT ·{' '}
              {new Date(visit.createdAt || Date.now())
                .toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                .toUpperCase()}
            </Eyebrow>
            <h2 className="mt-1.5 text-[24px] font-semibold leading-tight tracking-tight text-white sm:text-[30px]">
              {visit.propertyAddress || 'Untitled visit'}
            </h2>
            {visit.customerName && (
              <p className="mt-2 text-[13px] text-white/65 sm:text-[14px]">
                Customer: <span className="text-white">{visit.customerName}</span>
                {visit.propertyType && (
                  <>
                    {' · '}
                    <span className="capitalize">{visit.propertyType}</span>
                  </>
                )}
              </p>
            )}
          </div>
        </motion.div>

        {/* Status horizontal stepper */}
        <motion.div variants={itemVariants}>
          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4 sm:p-5">
            <Eyebrow className="mb-3">STATUS</Eyebrow>
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {STATUS_STEPS.map((step, i) => {
                const isPast = i < currentStepIdx;
                const isCurrent = i === currentStepIdx;
                return (
                  <div
                    key={step.key}
                    className={cn(
                      'flex items-center gap-2 whitespace-nowrap',
                      i < STATUS_STEPS.length - 1 && 'flex-1'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold tabular-nums',
                        isCurrent
                          ? 'border-elec-yellow bg-elec-yellow text-black'
                          : isPast
                            ? 'border-emerald-500 bg-emerald-500 text-black'
                            : 'border-white/[0.15] bg-white/[0.04] text-white/45'
                      )}
                    >
                      {isPast ? '✓' : i + 1}
                    </div>
                    <span
                      className={cn(
                        'text-[11.5px] font-medium',
                        isCurrent
                          ? 'text-white'
                          : isPast
                            ? 'text-emerald-400'
                            : 'text-white/45'
                      )}
                    >
                      {step.label}
                    </span>
                    {i < STATUS_STEPS.length - 1 && (
                      <div
                        className={cn(
                          'h-px flex-1',
                          isPast ? 'bg-emerald-500/40' : 'bg-white/[0.08]'
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Next-action banner */}
        {nextAction && (
          <motion.div variants={itemVariants}>
            <div className="flex flex-col gap-3 rounded-2xl border border-elec-yellow/25 bg-gradient-to-r from-elec-yellow/[0.06] to-transparent p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-start gap-3">
                <Dot tone="yellow" className="mt-[7px] !h-2 !w-2" />
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                    {nextAction.eyebrow}
                  </div>
                  <div className="mt-1 text-[14px] font-semibold text-white sm:text-[15px]">
                    {nextAction.title}
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-white/65">{nextAction.sub}</div>
                </div>
              </div>
              <button
                onClick={nextAction.onClick}
                className="flex h-9 items-center rounded-full bg-elec-yellow px-3.5 text-[12px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
              >
                {nextAction.cta}
              </button>
            </div>
          </motion.div>
        )}

        {/* StatStrip */}
        <motion.div variants={itemVariants}>
          <StatStrip
            columns={4}
            stats={[
              { label: 'Rooms', value: counts.rooms, tone: 'emerald' },
              { label: 'Items', value: counts.items, tone: 'blue' },
              { label: 'Photos', value: counts.photos, tone: 'purple' },
              {
                label: 'Quote',
                value:
                  quoteTotal !== null
                    ? `£${Math.round(quoteTotal).toLocaleString('en-GB')}`
                    : visit.quoteId
                      ? quoteStatusValue
                        ? quoteStatusValue
                        : 'Linked'
                      : 'None',
                tone: 'amber',
              },
            ]}
          />
        </motion.div>

        {/* Linked quote panel — only when there's a quote */}
        {visit.quoteId && (
          <motion.div variants={itemVariants}>
            <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Eyebrow>LINKED QUOTE</Eyebrow>
                  <div className="mt-1.5 text-[15px] font-semibold text-white">
                    Quote #{visit.quoteId.slice(0, 8)}
                  </div>
                  <div className="mt-0.5 text-[12px] text-white/65">
                    Status:{' '}
                    <span className="text-white capitalize">
                      {quoteStatusValue || 'pending'}
                    </span>
                    {quoteTotal !== null && (
                      <>
                        {' · '}£{Math.round(quoteTotal).toLocaleString('en-GB')}
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/electrician/quotes?focus=${visit.quoteId}`)}
                  className="flex h-9 items-center rounded-full bg-elec-yellow px-3.5 text-[12px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
                >
                  Open →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <motion.div variants={itemVariants}>
          <div className="flex gap-1 overflow-x-auto rounded-full border border-white/[0.06] bg-[hsl(0_0%_12%)] p-1 scrollbar-hide">
            {tabs
              .filter((t) => t.show)
              .map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={cn(
                    'h-9 shrink-0 rounded-full px-4 text-[12.5px] font-medium transition-colors touch-manipulation',
                    activeTab === t.key
                      ? 'bg-elec-yellow text-black'
                      : 'text-white hover:bg-white/[0.04]'
                  )}
                >
                  {t.label}
                </button>
              ))}
          </div>
        </motion.div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'edit' && <SiteVisitWizard initialVisit={visit} />}

          {activeTab === 'after' && showAfterTab && (
            <div className="space-y-4">
              <div>
                <Eyebrow>AFTER PHOTOS</Eyebrow>
                <h3 className="mt-1.5 text-[20px] font-semibold tracking-tight text-white sm:text-[22px]">
                  Document the finished work
                </h3>
                <p className="mt-1 text-[13px] text-white/65">
                  Capture the same areas as the before-photos — handover pack pairs them
                  automatically.
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
                  className="h-12 w-full touch-manipulation bg-elec-yellow text-base font-semibold text-black hover:bg-elec-yellow/90"
                >
                  {isSavingPhotos ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Uploading & saving…
                    </>
                  ) : photosSaved ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Photos saved
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Save after photos
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
        </motion.div>
      </motion.main>

    </motion.div>
  );
};

export default SiteVisitEditPage;
