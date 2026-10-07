import { useState, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { Check, Download, Eye, ExternalLink, Pencil, RefreshCw, Upload } from 'lucide-react';
import { PhotoMapView, type MapPhoto } from '@/components/employer/PhotoMapView';
import { PhotoCompareSlider, type ComparePhoto } from '@/components/employer/PhotoCompareSlider';
import { PhotoAnnotationEditor } from '@/components/employer/PhotoAnnotationEditor';
import { UploadPhotoSheet } from '@/components/employer/dialogs/UploadPhotoSheet';
import { useTogglePhotoApproval, useTogglePhotoSharing, useUploadJobPhoto, type PhotoCategory } from '@/hooks/useJobPhotos';
import { usePhotoFeed, PHOTO_SOURCE_LABEL, type FeedPhoto, type PhotoSource } from '@/hooks/usePhotoFeed';
import { useJobContext } from '@/hooks/useJobContext';
import { JobContextBar } from '@/components/employer/JobContextBar';
import { PhotoTile } from '@/components/employer/photos/PhotoTile';
import { PhotoLightbox, type LightboxPhoto } from '@/components/employer/photos/PhotoLightbox';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { cn } from '@/lib/utils';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { PHOTO_GALLERY_HELP } from '@/components/employer/help/jobs-quality';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  LoadingBlocks,
  IconButton,
  PrimaryButton,
  SecondaryButton,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

/* ==========================================================================
   Photo gallery (ELE-1970). Every photo from every job in one place:
   office uploads, snag and issue photos, site diary photos (office logs and
   the team's notes) and task photos, from get_photo_feed. Grouped by job or
   by day, filtered by where it came from. A file that is really missing
   shows a "Photo unavailable" tile, never a broken image.
   Deep link: ?section=photos&job=<id>&source=snag
   ========================================================================== */

type ViewMode = 'job' | 'date' | 'map' | 'compare';
type SourceFilter = 'all' | PhotoSource;

const SOURCES: PhotoSource[] = ['job', 'snag', 'issue', 'diary', 'task'];
const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const cardCn = 'rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.03]';
const GROUP_PREVIEW = 12;

function sourceLabel(p: FeedPhoto) {
  if (p.source === 'job') return p.category || 'Uploaded';
  if (p.source === 'diary') return p.ref_type === 'team' ? 'Team note' : 'Daily log';
  if (p.source === 'snag' || p.source === 'issue') return p.category || 'Issue';
  return 'Task';
}

function dayLabel(iso: string) {
  const d = parseISO(iso);
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return format(d, 'EEEE d MMMM yyyy');
}

export function PhotoGallerySection() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { jobId: contextJobId } = useJobContext();
  const { data: feed = [], isLoading, error, refetch } = usePhotoFeed(contextJobId);
  const toggleApproval = useTogglePhotoApproval();
  const toggleSharing = useTogglePhotoSharing();
  const uploadPhoto = useUploadJobPhoto();

  const initialSource = searchParams.get('source') as SourceFilter | null;
  const [source, setSource] = useState<SourceFilter>(
    initialSource && (initialSource === 'all' || SOURCES.includes(initialSource as PhotoSource)) ? initialSource : 'all'
  );
  const [viewMode, setViewMode] = useState<ViewMode>('job');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobFilter, setJobFilter] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [viewer, setViewer] = useState<{ list: FeedPhoto[]; index: number } | null>(null);
  const [annotating, setAnnotating] = useState<FeedPhoto | null>(null);
  const [compare, setCompare] = useState<{ before: ComparePhoto; after: ComparePhoto } | null>(null);
  const [uploadSheetOpen, setUploadSheetOpen] = useState(false);

  const handleRefresh = useCallback(async () => {
    await refetch();
    toast({ title: 'Photos refreshed' });
  }, [refetch]);

  /* ---------- filtering ---------- */
  const byJob = useMemo(() => (jobFilter ? feed.filter((p) => p.job_id === jobFilter) : feed), [feed, jobFilter]);
  const searched = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return byJob;
    return byJob.filter((p) =>
      [p.caption, p.author, p.job_title, p.client, p.category, p.address, PHOTO_SOURCE_LABEL[p.source]]
        .filter(Boolean)
        .some((t) => String(t).toLowerCase().includes(q))
    );
  }, [byJob, searchQuery]);
  const filtered = useMemo(
    () => (source === 'all' ? searched : searched.filter((p) => p.source === source)),
    [searched, source]
  );

  const sourceCounts = useMemo(() => {
    const c: Record<string, number> = { all: searched.length };
    SOURCES.forEach((s) => (c[s] = searched.filter((p) => p.source === s).length));
    return c;
  }, [searched]);

  const jobOptions = useMemo(() => {
    const m = new Map<string, string>();
    feed.forEach((p) => m.set(p.job_id, p.job_title || 'Job'));
    return Array.from(m.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [feed]);

  const weekAgo = Date.now() - 7 * 86400000;
  const stats = {
    total: filtered.length,
    week: filtered.filter((p) => new Date(p.taken_at).getTime() >= weekAgo).length,
    team: filtered.filter((p) => p.source !== 'job' || p.author !== 'Office').length,
    unavailable: filtered.filter((p) => !p.url).length,
  };

  const jobGroups = useMemo(() => {
    const m = new Map<string, { jobId: string; title: string; client: string | null; photos: FeedPhoto[] }>();
    filtered.forEach((p) => {
      const g = m.get(p.job_id) ?? { jobId: p.job_id, title: p.job_title || 'Job', client: p.client, photos: [] };
      g.photos.push(p);
      m.set(p.job_id, g);
    });
    return Array.from(m.values());
  }, [filtered]);

  const dayGroups = useMemo(() => {
    const m = new Map<string, FeedPhoto[]>();
    filtered.forEach((p) => {
      const k = format(new Date(p.taken_at), 'yyyy-MM-dd');
      m.set(k, [...(m.get(k) ?? []), p]);
    });
    return Array.from(m.entries());
  }, [filtered]);

  // Before/after pairs: one per job that has both (uploads only carry a stage).
  const pairs = useMemo(() => {
    const out: { jobTitle: string; before: FeedPhoto; after: FeedPhoto }[] = [];
    jobGroups.forEach((g) => {
      const before = g.photos.filter((p) => p.source === 'job' && p.category === 'Before' && p.url).pop();
      const after = g.photos.find((p) => p.source === 'job' && (p.category === 'After' || p.category === 'Completion') && p.url);
      if (before && after) out.push({ jobTitle: g.title, before, after });
    });
    return out;
  }, [jobGroups]);

  const mapPhotos: MapPhoto[] = useMemo(
    () =>
      filtered
        .filter((p) => p.lat != null && p.lng != null)
        .map((p) => ({
          id: p.key,
          jobId: p.job_id,
          jobTitle: p.job_title || 'Job',
          uploadedBy: p.author,
          filename: p.url ?? undefined,
          category: ((p.category || 'during').toLowerCase() as MapPhoto['category']),
          timestamp: p.taken_at,
          location: p.address ?? undefined,
          lat: Number(p.lat),
          lng: Number(p.lng),
          isApproved: !!p.approved,
          isShared: !!p.shared,
        })),
    [filtered]
  );

  /* ---------- viewer ---------- */
  const open = (list: FeedPhoto[], p: FeedPhoto) => setViewer({ list, index: Math.max(0, list.indexOf(p)) });
  const lightboxPhotos: LightboxPhoto[] = useMemo(
    () =>
      (viewer?.list ?? []).map((p) => ({
        key: p.key,
        url: p.url,
        title: p.job_title || 'Job',
        meta: `${sourceLabel(p)} · ${p.author} · ${format(new Date(p.taken_at), 'd MMM yyyy, HH:mm')}`,
        caption: p.caption,
      })),
    [viewer]
  );

  const recordLink = (p: FeedPhoto) => {
    if (p.source === 'snag' || p.source === 'issue')
      return { label: p.source === 'snag' ? 'Open the snag' : 'Open the issue', to: `/employer?section=issues&issue=${p.ref_id}&job=${p.job_id}` };
    if (p.source === 'diary')
      return { label: 'Open the diary entry', to: `/employer?section=progresslogs&job=${p.job_id}&entry=${p.ref_id}` };
    if (p.source === 'task') return { label: 'Open the job', to: `/employer?section=jobs&job=${p.job_id}` };
    return { label: 'Open the job', to: `/employer?section=jobs&job=${p.job_id}` };
  };

  const download = async (p: FeedPhoto) => {
    if (!p.url) return;
    try {
      const res = await fetch(p.url);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${(p.job_title || 'job-photo').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${format(new Date(p.taken_at), 'yyyyMMdd-HHmm')}.jpg`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    } catch {
      window.open(p.url, '_blank', 'noopener');
    }
  };

  const saveMarkup = async (blob: Blob) => {
    if (!annotating) return;
    const p = annotating;
    try {
      await uploadPhoto.mutateAsync({
        file: new File([blob], `marked-up-${Date.now()}.jpg`, { type: 'image/jpeg' }),
        jobId: p.job_id,
        category: (p.source === 'snag' || p.source === 'issue' ? 'Issue' : (p.category as PhotoCategory) || 'During') as PhotoCategory,
        notes: `Marked up copy of a ${sourceLabel(p).toLowerCase()} photo${p.caption ? `: ${p.caption.slice(0, 120)}` : ''}`,
      });
      setAnnotating(null);
      setViewer(null);
      setSource('all');
    } catch {
      // toast from the hook
    }
  };

  const lightboxActions = (_lp: LightboxPhoto, index: number) => {
    const snap = viewer?.list[index];
    // Read the live row so Approve / Share flip as soon as the feed refetches.
    const p = snap ? (feed.find((x) => x.key === snap.key) ?? snap) : undefined;
    if (!p) return null;
    const link = recordLink(p);
    return (
      <>
        {p.source === 'job' && (
          <>
            <SecondaryButton
              data-help="photogallery.approve"
              className="h-11"
              onClick={() => toggleApproval.mutate(p.ref_id, { onSuccess: () => toast({ title: p.approved ? 'Approval removed' : 'Photo approved' }) })}
            >
              <Check className="h-4 w-4 mr-1.5" />
              {p.approved ? 'Approved' : 'Approve'}
            </SecondaryButton>
            <SecondaryButton
              className="h-11"
              onClick={() =>
                toggleSharing.mutate(p.ref_id, {
                  onSuccess: () => toast({ title: p.shared ? 'No longer shared with the client' : 'Shared with the client' }),
                })
              }
            >
              <Eye className="h-4 w-4 mr-1.5" />
              {p.shared ? 'Shared with client' : 'Share with client'}
            </SecondaryButton>
          </>
        )}
        {p.url && (
          <SecondaryButton data-help="photogallery.markup" className="h-11" onClick={() => setAnnotating(p)}>
            <Pencil className="h-4 w-4 mr-1.5" />
            Mark up
          </SecondaryButton>
        )}
        <SecondaryButton
          className="h-11"
          onClick={() => {
            setViewer(null);
            navigate(link.to);
          }}
        >
          <ExternalLink className="h-4 w-4 mr-1.5" />
          {link.label}
        </SecondaryButton>
        {p.url && (
          <SecondaryButton className="h-11" onClick={() => download(p)} aria-label="Download photo">
            <Download className="h-4 w-4" />
          </SecondaryButton>
        )}
      </>
    );
  };

  /* ---------- render helpers ---------- */
  const tile = (p: FeedPhoto, list: FeedPhoto[]) => (
    <PhotoTile key={p.key} url={p.url} alt={`${sourceLabel(p)} photo, ${p.job_title ?? 'job'}`} onClick={() => open(list, p)}>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2 pb-1.5 pt-5 text-left">
        <span className="block truncate text-[11px] font-semibold text-white">{sourceLabel(p)}</span>
        <span className="block truncate text-[10.5px] text-white">
          {p.author} · {format(new Date(p.taken_at), 'd MMM')}
        </span>
      </span>
      {(p.approved || p.shared) && (
        <span className="absolute right-1.5 top-1.5 flex gap-1">
          {p.approved && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500" title="Approved">
              <Check className="h-3 w-3 text-black" />
            </span>
          )}
          {p.shared && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500" title="Shared with client">
              <Eye className="h-3 w-3 text-black" />
            </span>
          )}
        </span>
      )}
    </PhotoTile>
  );
  const gridCn = 'grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8';

  const heroActions = (
    <>
      <PrimaryButton data-help="photogallery.upload" onClick={() => setUploadSheetOpen(true)}>
        <Upload className="h-4 w-4 mr-1.5" />
        Upload
      </PrimaryButton>
      <IconButton onClick={handleRefresh} aria-label="Refresh photos">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
      <PageHelpButton help={PHOTO_GALLERY_HELP} askContext={{ page: 'photogallery', tab: viewMode }} />
    </>
  );
  const hero = (
    <PageHero
      eyebrow="Jobs"
      title="Photo gallery"
      description="Every photo from every job: what the office uploads and what the team takes on site."
      tone="cyan"
      actions={heroActions}
    />
  );

  if (isLoading) {
    return (
      <PageFrame>
        {hero}
        <LoadingBlocks />
      </PageFrame>
    );
  }
  if (error) {
    return (
      <PageFrame>
        {hero}
        <EmptyState title="Couldn't load photos" description={(error as Error).message} action="Try again" onAction={() => refetch()} />
      </PageFrame>
    );
  }

  const empty = (
    <EmptyState
      title={feed.length === 0 ? 'No photos yet' : 'No photos match'}
      description={
        feed.length === 0
          ? 'Upload one here, or they arrive by themselves when the team adds photos to a snag, a progress note or a task.'
          : 'Try another source, job or search.'
      }
      action={feed.length === 0 ? 'Upload a photo' : 'Show everything'}
      onAction={() => {
        if (feed.length === 0) setUploadSheetOpen(true);
        else {
          setSource('all');
          setJobFilter('');
          setSearchQuery('');
        }
      }}
    />
  );

  const content = (
    <PageFrame>
      {hero}

      <HowItWorks help={PHOTO_GALLERY_HELP} askContext={{ page: 'photogallery', tab: viewMode }} />

      <JobContextBar what="Photos" />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Photos', value: stats.total, tone: 'cyan' },
          { label: 'This week', value: stats.week, tone: 'blue' },
          { label: 'From the team', value: stats.team, tone: 'emerald' },
          stats.unavailable
            ? { label: 'Unavailable', value: stats.unavailable, tone: 'orange' }
            : { label: 'Jobs', value: jobGroups.length },
        ]}
      />

      <div data-help="photogallery.views">
        <FilterBar
          tabs={[
            { value: 'job', label: 'By job' },
            { value: 'date', label: 'By day' },
            { value: 'map', label: 'Map' },
            { value: 'compare', label: 'Before & after' },
          ]}
          activeTab={viewMode}
          onTabChange={(v) => setViewMode(v as ViewMode)}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search captions, people, jobs…"
        />
      </div>

      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div
          className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none]"
          data-help="photogallery.filter"
        >
          {(['all', ...SOURCES] as SourceFilter[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSource(s)}
              className={cn('h-11 shrink-0 rounded-full border px-4 text-[13px] touch-manipulation', source === s ? chipOn : chipOff)}
            >
              {s === 'all' ? 'Everything' : PHOTO_SOURCE_LABEL[s]}
              <span className="ml-1.5 tabular-nums">{sourceCounts[s] ?? 0}</span>
            </button>
          ))}
        </div>
        {!contextJobId && jobOptions.length > 1 && (
          <div className="lg:ml-auto lg:w-72">
            <Select value={jobFilter || 'all'} onValueChange={(v) => setJobFilter(v === 'all' ? '' : v)}>
              <SelectTrigger className={selectTriggerClass} aria-label="Filter by job">
                <SelectValue placeholder="Every job" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                <SelectItem value="all">Every job</SelectItem>
                {jobOptions.map(([id, t]) => (
                  <SelectItem key={id} value={id}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {viewMode === 'job' &&
        (jobGroups.length === 0 ? (
          empty
        ) : (
          <div className="space-y-4" data-help="photogallery.grid">
            {jobGroups.map((g) => {
              const showAll = expanded[g.jobId] || g.photos.length <= GROUP_PREVIEW;
              return (
                <section key={g.jobId} className={cn(cardCn, 'p-4 space-y-3')} aria-label={g.title}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-[15px] font-semibold tracking-tight text-white">{g.title}</h2>
                      <p className="truncate text-[12px] text-white">
                        {[g.client, `${g.photos.length} photo${g.photos.length === 1 ? '' : 's'}`].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    {!contextJobId && (
                      <SecondaryButton className="h-11 shrink-0 px-4" onClick={() => navigate(`/employer?section=photogallery&job=${g.jobId}`)}>
                        Just this job
                      </SecondaryButton>
                    )}
                  </div>
                  <div className={gridCn}>{(showAll ? g.photos : g.photos.slice(0, GROUP_PREVIEW)).map((p) => tile(p, g.photos))}</div>
                  {!showAll && (
                    <SecondaryButton fullWidth onClick={() => setExpanded((e) => ({ ...e, [g.jobId]: true }))}>
                      Show all {g.photos.length}
                    </SecondaryButton>
                  )}
                </section>
              );
            })}
          </div>
        ))}

      {viewMode === 'date' &&
        (dayGroups.length === 0 ? (
          empty
        ) : (
          <div className="space-y-5">
            {dayGroups.map(([day, list]) => (
              <section key={day} className="space-y-2" aria-label={dayLabel(day)}>
                <h2 className="text-[15px] font-semibold tracking-tight text-white">
                  {dayLabel(day)} <span className="text-[12px] font-normal">{list.length}</span>
                </h2>
                <div className={gridCn}>{list.map((p) => tile(p, list))}</div>
              </section>
            ))}
          </div>
        ))}

      {viewMode === 'map' && (
        <div className={cn(cardCn, 'p-3 space-y-2')}>
          <p className="px-1 text-[12.5px] text-white">
            {mapPhotos.length
              ? `${mapPhotos.length} photo${mapPhotos.length === 1 ? '' : 's'} with a location. Uploads tagged with Add current location show here.`
              : 'No photos have a location yet. Tick Add current location when you upload.'}
          </p>
          {mapPhotos.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-white/[0.08]">
              <PhotoMapView
                photos={mapPhotos}
                onPhotoClick={(mp) => {
                  const p = filtered.find((x) => x.key === mp.id);
                  if (p) open(filtered, p);
                }}
                onToggleApproval={(id) => {
                  const p = filtered.find((x) => x.key === id);
                  if (p?.source === 'job') toggleApproval.mutate(p.ref_id);
                }}
                onToggleSharing={(id) => {
                  const p = filtered.find((x) => x.key === id);
                  if (p?.source === 'job') toggleSharing.mutate(p.ref_id);
                }}
              />
            </div>
          )}
        </div>
      )}

      {viewMode === 'compare' &&
        (pairs.length === 0 ? (
          <EmptyState
            title="No before and after yet"
            description="Upload a Before photo and an After or Completion photo on the same job, and the pair shows here."
            action="Upload a photo"
            onAction={() => setUploadSheetOpen(true)}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pairs.map((pr) => (
              <button
                key={pr.before.key}
                type="button"
                onClick={() =>
                  setCompare({
                    before: { id: pr.before.key, category: 'Before', jobTitle: pr.jobTitle, timestamp: pr.before.taken_at, filename: pr.before.url ?? undefined },
                    after: { id: pr.after.key, category: pr.after.category || 'After', jobTitle: pr.jobTitle, timestamp: pr.after.taken_at, filename: pr.after.url ?? undefined },
                  })
                }
                className={cn(cardCn, 'p-3 text-left touch-manipulation active:scale-[0.99]')}
              >
                <div className="grid grid-cols-2 gap-2">
                  <PhotoTile url={pr.before.url} alt="Before" />
                  <PhotoTile url={pr.after.url} alt="After" />
                </div>
                <p className="mt-2 truncate text-[14px] font-semibold text-white">{pr.jobTitle}</p>
                <p className="text-[12px] text-white">Tap to slide between before and after</p>
              </button>
            ))}
          </div>
        ))}

      {viewer && (
        <PhotoLightbox
          open
          photos={lightboxPhotos}
          index={viewer.index}
          onIndexChange={(i) => setViewer((v) => (v ? { ...v, index: i } : v))}
          onOpenChange={(o) => !o && setViewer(null)}
          actions={lightboxActions}
        />
      )}

      <PhotoAnnotationEditor
        open={!!annotating}
        imageUrl={annotating?.url ?? null}
        title={annotating?.job_title}
        saving={uploadPhoto.isPending}
        onClose={() => setAnnotating(null)}
        onSave={saveMarkup}
      />

      {compare && (
        <PhotoCompareSlider beforePhoto={compare.before} afterPhoto={compare.after} isOpen onClose={() => setCompare(null)} />
      )}

      <UploadPhotoSheet open={uploadSheetOpen} onOpenChange={setUploadSheetOpen} initialJobId={contextJobId} />
    </PageFrame>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh}>
      {content}
    </PullToRefresh>
  ) : (
    content
  );
}
