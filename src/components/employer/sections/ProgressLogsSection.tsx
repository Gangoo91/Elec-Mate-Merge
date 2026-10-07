import { useState, useCallback, useMemo, useRef, useEffect, type ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { format, isToday, isYesterday, isThisWeek, isThisMonth, parseISO } from 'date-fns';
import { Camera, CheckCircle, Loader2, Plus, RefreshCw, Trash2, X } from 'lucide-react';
import { useJobContext } from '@/hooks/useJobContext';
import { JobContextBar } from '@/components/employer/JobContextBar';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { PROGRESS_LOGS_HELP } from '@/components/employer/help/jobs-quality';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  useCreateProgressLog,
  useSignOffProgressLog,
  useDeleteProgressLog,
  type CreateProgressLogInput,
  type WeatherCondition,
} from '@/hooks/useProgressLogs';
import { useSiteDiary, useSetDiaryShared, type DiaryEntry } from '@/hooks/useSiteDiary';
import { useJobs } from '@/hooks/useJobs';
import { ViewJobSheet } from '@/components/employer/sheets/ViewJobSheet';
import type { Job } from '@/services/jobService';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { toast } from '@/hooks/use-toast';
import { uploadJobPhotos } from '@/utils/uploadJobPhotos';
import { useStorageUrls } from '@/utils/storageUrls';
import { FormSheet } from '@/components/forms/FormSheet';
import { PhotoTile } from '@/components/employer/photos/PhotoTile';
import { PhotoLightbox, type LightboxPhoto } from '@/components/employer/photos/PhotoLightbox';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  Avatar,
  IconButton,
  Pill,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

/* ==========================================================================
   Site diary (ELE-1964). One diary per job: the office's daily logs and the
   team's progress notes from site, with photos from both, in one dated list.
   Searchable, filterable by who wrote it, and every number on the page
   counts the same range as the list underneath it.
   ========================================================================== */

const weatherOptions: WeatherCondition[] = [
  'Clear',
  'Cloudy',
  'Partly Cloudy',
  'Rain',
  'Heavy Rain',
  'Snow',
  'Wind',
];

type RangeFilter = 'today' | 'week' | 'month' | 'all';
type WhoFilter = 'all' | 'team' | 'office';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const cardCn =
  'rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.03]';

function initials(name?: string | null) {
  if (!name) return '··';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function dayLabel(iso: string) {
  const d = parseISO(iso);
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return format(d, 'EEEE d MMMM');
}

const emptyForm = (): Partial<CreateProgressLogInput> & {
  work_description: string;
  work_items: string[];
  materials_list: { item: string; quantity: string; cost: number }[];
  hours_worked: number;
  shared_with_client: boolean;
} => ({
  job_id: '',
  date: format(new Date(), 'yyyy-MM-dd'),
  weather: 'Clear',
  workers_on_site: 1,
  work_description: '',
  work_items: [],
  materials_list: [],
  hours_worked: 8,
  photos: [],
  notes: '',
  shared_with_client: false,
});

export function ProgressLogsSection() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobId: contextJobId } = useJobContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>(contextJobId ? 'all' : 'week');
  const [who, setWho] = useState<WhoFilter>('all');
  const [person, setPerson] = useState('');
  const [jobFilter, setJobFilter] = useState('');
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [jobSheetJob, setJobSheetJob] = useState<Job | null>(null);
  const [lightbox, setLightbox] = useState<{ photos: LightboxPhoto[]; index: number } | null>(null);

  const [formData, setFormData] = useState(emptyForm);
  const [newWorkItem, setNewWorkItem] = useState('');
  const [newMaterial, setNewMaterial] = useState({ item: '', quantity: '', cost: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  const { data, isLoading, error, refetch } = useSiteDiary(contextJobId);
  const entries = useMemo(() => data?.entries ?? [], [data]);
  const onSite = useMemo(() => data?.onSite ?? [], [data]);
  const { data: jobs = [] } = useJobs();
  const createProgressLog = useCreateProgressLog();
  const signOffProgressLog = useSignOffProgressLog();
  const deleteProgressLog = useDeleteProgressLog();
  const setShared = useSetDiaryShared();

  // A link to one entry (?entry=<id>) opens it.
  const entryParam = searchParams.get('entry');
  useEffect(() => {
    if (!entryParam || !entries.length) return;
    const hit = entries.find((e) => e.id === entryParam);
    if (hit) {
      setSelectedKey(`${hit.kind}:${hit.id}`);
      setRangeFilter('all');
    }
  }, [entryParam, entries]);

  useEffect(() => {
    if (showCreateSheet && contextJobId) {
      setFormData((prev) => (prev.job_id ? prev : { ...prev, job_id: contextJobId }));
    }
  }, [showCreateSheet, contextJobId]);

  const handleRefresh = useCallback(async () => {
    await refetch();
    toast({ title: 'Diary refreshed' });
  }, [refetch]);

  /* ---------- filters ---------- */
  const inRange = useCallback(
    (e: DiaryEntry) => {
      const d = parseISO(e.entry_date);
      return (
        rangeFilter === 'all' ||
        (rangeFilter === 'today' && isToday(d)) ||
        (rangeFilter === 'week' && isThisWeek(d, { weekStartsOn: 1 })) ||
        (rangeFilter === 'month' && isThisMonth(d))
      );
    },
    [rangeFilter]
  );

  const scoped = useMemo(
    () =>
      entries.filter(
        (e) =>
          (who === 'all' || (who === 'team' ? e.kind === 'team' : e.kind === 'office')) &&
          (!person || e.author_name === person) &&
          (!jobFilter || e.job_id === jobFilter)
      ),
    [entries, who, person, jobFilter]
  );

  const ranged = useMemo(() => scoped.filter(inRange), [scoped, inRange]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ranged;
    return ranged.filter((e) =>
      [
        e.body,
        e.notes,
        e.materials_used,
        e.issues_encountered,
        e.delays,
        e.work_planned,
        e.author_name,
        e.job_title,
        e.client,
        e.weather,
      ]
        .filter(Boolean)
        .some((t) => String(t).toLowerCase().includes(q))
    );
  }, [ranged, searchQuery]);

  const people = useMemo(
    () => Array.from(new Set(entries.map((e) => e.author_name))).sort((a, b) => a.localeCompare(b)),
    [entries]
  );
  const diaryJobs = useMemo(() => {
    const m = new Map<string, string>();
    entries.forEach((e) => m.set(e.job_id, e.job_title || 'Job'));
    return Array.from(m.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [entries]);

  const countFor = (r: RangeFilter) =>
    scoped.filter((e) => {
      const d = parseISO(e.entry_date);
      return (
        r === 'all' ||
        (r === 'today' && isToday(d)) ||
        (r === 'week' && isThisWeek(d, { weekStartsOn: 1 })) ||
        (r === 'month' && isThisMonth(d))
      );
    }).length;

  const tabs = [
    { value: 'today', label: 'Today', count: countFor('today') },
    { value: 'week', label: 'This week', count: countFor('week') },
    { value: 'month', label: 'This month', count: countFor('month') },
    { value: 'all', label: 'All', count: countFor('all') },
  ];

  // Every stat counts the same range as the list (ELE-1964: no mixed scopes).
  const stats = {
    entries: filtered.length,
    team: filtered.filter((e) => e.kind === 'team').length,
    photos: filtered.reduce((n, e) => n + e.photos.length, 0),
    shared: filtered.filter((e) => e.shared_with_client).length,
  };
  const rangeWord =
    rangeFilter === 'today'
      ? 'today'
      : rangeFilter === 'week'
        ? 'this week'
        : rangeFilter === 'month'
          ? 'this month'
          : 'all time';

  /* ---------- grouping: day → job ---------- */
  const onSiteMap = useMemo(() => {
    const m = new Map<string, { names: string[]; hours: number }>();
    onSite.forEach((o) => m.set(`${o.job_id}|${o.date}`, { names: o.names ?? [], hours: Number(o.hours ?? 0) }));
    return m;
  }, [onSite]);

  const groups = useMemo(() => {
    const days: { date: string; jobs: { jobId: string; title: string; client: string | null; items: DiaryEntry[] }[] }[] = [];
    for (const e of filtered) {
      let day = days.find((d) => d.date === e.entry_date);
      if (!day) {
        day = { date: e.entry_date, jobs: [] };
        days.push(day);
      }
      let job = day.jobs.find((j) => j.jobId === e.job_id);
      if (!job) {
        job = { jobId: e.job_id, title: e.job_title || 'Job', client: e.client, items: [] };
        day.jobs.push(job);
      }
      job.items.push(e);
    }
    return days;
  }, [filtered]);

  /* ---------- photos ---------- */
  const visiblePaths = useMemo(() => {
    const paths: string[] = [];
    filtered.slice(0, 120).forEach((e) => paths.push(...e.photos));
    return paths;
  }, [filtered]);
  const selected = useMemo(
    () => entries.find((e) => `${e.kind}:${e.id}` === selectedKey) ?? null,
    [entries, selectedKey]
  );
  const { urls: photoSrcs, loading: photosLoading } = useStorageUrls('visual-uploads', [
    ...visiblePaths,
    ...(selected?.photos ?? []),
    ...(formData.photos ?? []),
  ]);

  const openPhotos = (e: DiaryEntry, index: number) =>
    setLightbox({
      index,
      photos: e.photos.map((p, i) => ({
        key: `${e.id}:${i}`,
        url: photoSrcs[p] ?? null,
        title: e.job_title,
        meta: `${e.author_name} · ${format(parseISO(e.created_at), 'd MMM yyyy, HH:mm')}`,
        caption: e.body,
      })),
    });

  /* ---------- create ---------- */
  const handlePhotoSelect = async (ev: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(ev.target.files || []);
    if (files.length === 0) return;
    setUploadingPhotos(true);
    try {
      const { urls, failed } = await uploadJobPhotos(files, 'progress-logs');
      if (urls.length) setFormData((prev) => ({ ...prev, photos: [...(prev.photos || []), ...urls] }));
      if (failed.length) {
        toast({
          title: `${failed.length} photo${failed.length === 1 ? '' : 's'} not added`,
          description: failed.map((f) => `${f.name}: ${f.reason}`).join(', '),
          variant: 'destructive',
        });
      }
    } catch {
      toast({ title: 'Upload failed', description: 'Could not upload photos. Try again.', variant: 'destructive' });
    } finally {
      setUploadingPhotos(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddWorkItem = () => {
    if (!newWorkItem.trim()) return;
    setFormData((prev) => ({ ...prev, work_items: [...prev.work_items, newWorkItem.trim()] }));
    setNewWorkItem('');
  };
  const handleAddMaterial = () => {
    if (!newMaterial.item.trim()) return;
    setFormData((prev) => ({ ...prev, materials_list: [...prev.materials_list, { ...newMaterial }] }));
    setNewMaterial({ item: '', quantity: '', cost: 0 });
  };

  const handleCreate = async () => {
    if (!formData.job_id || !formData.work_description.trim()) {
      toast({
        title: 'Pick the job and say what was done',
        description: 'The job and the work done are both needed.',
        variant: 'destructive',
      });
      return;
    }
    const workCompleted = [
      formData.work_description.trim(),
      formData.work_items.length ? 'Completed items:\n' + formData.work_items.map((w) => `• ${w}`).join('\n') : null,
      formData.hours_worked ? `Hours worked: ${formData.hours_worked}` : null,
    ]
      .filter(Boolean)
      .join('\n\n');
    const materialsText = formData.materials_list.length
      ? formData.materials_list
          .map((m) => `${m.item}${m.quantity ? ` ×${m.quantity}` : ''}${m.cost ? ` (£${m.cost})` : ''}`)
          .join(', ')
      : null;
    try {
      await createProgressLog.mutateAsync({
        job_id: formData.job_id,
        date: formData.date,
        weather: formData.weather,
        workers_on_site: formData.workers_on_site,
        work_completed: workCompleted,
        materials_used: materialsText,
        notes: formData.notes?.trim() || null,
        photos: formData.photos || [],
        shared_with_client: !!formData.shared_with_client,
      } as unknown as CreateProgressLogInput);
      setShowCreateSheet(false);
      setFormData(emptyForm());
      setNewWorkItem('');
      setNewMaterial({ item: '', quantity: '', cost: 0 });
      if (rangeFilter === 'today' && !isToday(parseISO(formData.date || ''))) setRangeFilter('all');
    } catch {
      // toast from the hook
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteProgressLog.mutateAsync(deleteConfirmId);
      setDeleteConfirmId(null);
      setSelectedKey(null);
    } catch {
      // toast from the hook
    }
  };

  const closeEntry = () => {
    setSelectedKey(null);
    if (entryParam) {
      setSearchParams(
        (prev) => {
          const n = new URLSearchParams(prev);
          n.delete('entry');
          return n;
        },
        { replace: true }
      );
    }
  };

  const openJob = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) setJobSheetJob(job);
  };

  /* ---------- help ---------- */
  const helpBlockers: HelpBlocker[] = [];
  if (!isLoading && jobs.length === 0) {
    helpBlockers.push({
      text: 'A diary entry belongs to a job, and there are no jobs yet.',
      fixLabel: 'Add a job',
      onFix: () => navigate('/employer?section=jobs'),
    });
  }

  const heroActions = (
    <>
      <PrimaryButton data-help="progresslogs.new" onClick={() => setShowCreateSheet(true)}>
        <Plus className="h-4 w-4 mr-1.5" />
        Write a log
      </PrimaryButton>
      <IconButton onClick={handleRefresh} aria-label="Refresh diary">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
      <PageHelpButton
        help={PROGRESS_LOGS_HELP}
        blockers={helpBlockers}
        askContext={{ page: 'progresslogs', tab: rangeFilter }}
      />
    </>
  );

  const hero = (
    <PageHero
      eyebrow="Jobs"
      title="Site diary"
      description="What happened on site each day: the office's logs and the team's notes, with their photos."
      tone="emerald"
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
        <EmptyState
          title="Couldn't load the diary"
          description={(error as Error).message}
          action="Try again"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  const filtersActive = who !== 'all' || !!person || !!jobFilter;

  const content = (
    <PageFrame>
      {hero}

      <HowItWorks help={PROGRESS_LOGS_HELP} blockers={helpBlockers} askContext={{ page: 'progresslogs', tab: rangeFilter }} />

      <JobContextBar what="Site diary" />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Entries', value: stats.entries, sub: rangeWord, tone: 'emerald' },
          { label: 'From the team', value: stats.team, sub: rangeWord, tone: 'blue' },
          { label: 'Photos', value: stats.photos, sub: rangeWord, tone: 'cyan' },
          { label: 'Shared with client', value: stats.shared, sub: rangeWord },
        ]}
      />

      <div data-help="progresslogs.tabs">
        <FilterBar
          tabs={tabs}
          activeTab={rangeFilter}
          onTabChange={(v) => setRangeFilter(v as RangeFilter)}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search notes, people, jobs…"
        />
      </div>

      <div data-help="progresslogs.who" className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none]">
          {(
            [
              ['all', 'Everyone'],
              ['team', 'From the team'],
              ['office', 'Office logs'],
            ] as [WhoFilter, string][]
          ).map(([v, l]) => (
            <button
              key={v}
              type="button"
              onClick={() => setWho(v)}
              className={cn(
                'h-11 shrink-0 rounded-full border px-4 text-[13px] touch-manipulation',
                who === v ? chipOn : chipOff
              )}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 lg:ml-auto lg:w-[28rem]">
          <Select value={person || 'all'} onValueChange={(v) => setPerson(v === 'all' ? '' : v)}>
            <SelectTrigger className={selectTriggerClass} aria-label="Filter by person">
              <SelectValue placeholder="Anyone" />
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              <SelectItem value="all">Anyone</SelectItem>
              {people.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!contextJobId ? (
            <Select value={jobFilter || 'all'} onValueChange={(v) => setJobFilter(v === 'all' ? '' : v)}>
              <SelectTrigger className={selectTriggerClass} aria-label="Filter by job">
                <SelectValue placeholder="Every job" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                <SelectItem value="all">Every job</SelectItem>
                {diaryJobs.map(([id, title]) => (
                  <SelectItem key={id} value={id}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <span />
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={entries.length === 0 ? 'Nothing in the diary yet' : 'Nothing matches'}
          description={
            entries.length === 0
              ? 'Write the first daily log, or ask the team to add a progress note from Worker Tools. Both land here.'
              : searchQuery || filtersActive
                ? 'Try a different search, or clear the filters.'
                : `No entries ${rangeWord}. Try All.`
          }
          action={entries.length === 0 ? 'Write a log' : searchQuery || filtersActive ? 'Clear filters' : 'Show all'}
          onAction={() => {
            if (entries.length === 0) setShowCreateSheet(true);
            else if (searchQuery || filtersActive) {
              setSearchQuery('');
              setWho('all');
              setPerson('');
              setJobFilter('');
            } else setRangeFilter('all');
          }}
        />
      ) : (
        <div className="space-y-6" data-help="progresslogs.list">
          {groups.map((day) => (
            <section key={day.date} aria-label={dayLabel(day.date)} className="space-y-3">
              <h2 className="text-[15px] font-semibold tracking-tight text-white">
                {dayLabel(day.date)}
                <span className="ml-2 text-[12px] font-normal text-white">
                  {format(parseISO(day.date), 'd MMM yyyy')}
                </span>
              </h2>
              {day.jobs.map((job) => {
                const crew = onSiteMap.get(`${job.jobId}|${day.date}`);
                return (
                  <div key={job.jobId} className={cn(cardCn, 'overflow-hidden')}>
                    <div className="flex flex-col gap-1 border-b border-white/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={() => openJob(job.jobId)}
                        className="min-w-0 text-left touch-manipulation"
                      >
                        <span className="block truncate text-[14px] font-semibold text-white">{job.title}</span>
                        {job.client && <span className="block truncate text-[12px] text-white">{job.client}</span>}
                      </button>
                      <span className="text-[12px] text-white">
                        {crew && crew.names.length
                          ? `On site: ${crew.names.join(', ')}${crew.hours ? ` · ${crew.hours} hrs` : ''}`
                          : 'No clock-ins that day'}
                      </span>
                    </div>
                    <ul className="divide-y divide-white/[0.08]">
                      {job.items.map((e) => (
                        <li key={`${e.kind}:${e.id}`}>
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedKey(`${e.kind}:${e.id}`)}
                            onKeyDown={(ev) => {
                              if (ev.key === 'Enter' || ev.key === ' ') {
                                ev.preventDefault();
                                setSelectedKey(`${e.kind}:${e.id}`);
                              }
                            }}
                            className="block w-full cursor-pointer px-4 py-3.5 text-left touch-manipulation hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60"
                          >
                            <div className="flex items-start gap-3">
                              <Avatar initials={initials(e.author_name)} size="sm" />
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                  <span className="text-[14px] font-semibold text-white">{e.author_name}</span>
                                  <Pill tone={e.kind === 'team' ? 'blue' : 'emerald'}>
                                    {e.kind === 'team' ? 'Team note' : 'Daily log'}
                                  </Pill>
                                  {e.shared_with_client && <Pill tone="purple">Shared with client</Pill>}
                                  {e.kind === 'office' && e.signed_off && <Pill tone="emerald">Signed off</Pill>}
                                  <span className="ml-auto text-[12px] tabular-nums text-white">
                                    {format(parseISO(e.created_at), 'HH:mm')}
                                  </span>
                                </div>
                                <p className="mt-1.5 line-clamp-4 whitespace-pre-wrap text-[13.5px] leading-relaxed text-white">
                                  {e.body || 'No words, photos only.'}
                                </p>
                                {(e.weather || e.workers_on_site || e.edited_at) && (
                                  <p className="mt-1.5 text-[12px] text-white">
                                    {[
                                      e.weather,
                                      e.workers_on_site ? `${e.workers_on_site} on site` : null,
                                      e.edited_at ? 'Edited' : null,
                                    ]
                                      .filter(Boolean)
                                      .join(' · ')}
                                  </p>
                                )}
                              </div>
                            </div>
                            {e.photos.length > 0 && (
                              <div className="mt-3 flex gap-2 pl-11">
                                {e.photos.slice(0, 4).map((p, i) => (
                                  <PhotoTile
                                    key={p}
                                    url={photoSrcs[p]}
                                    loading={photosLoading && !photoSrcs[p]}
                                    alt={`Photo ${i + 1} from ${e.author_name}`}
                                    className="h-16 w-16 sm:h-20 sm:w-20"
                                    onClick={() => openPhotos(e, i)}
                                  >
                                    {i === 3 && e.photos.length > 4 && (
                                      <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-[13px] font-semibold text-white">
                                        +{e.photos.length - 4}
                                      </span>
                                    )}
                                  </PhotoTile>
                                ))}
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </section>
          ))}
        </div>
      )}

      {/* ---------- one entry ---------- */}
      <FormSheet
        open={!!selected}
        onOpenChange={(o) => !o && closeEntry()}
        width="wide"
        eyebrow={selected?.kind === 'team' ? 'Team note' : 'Daily log'}
        title={selected?.job_title || 'Diary entry'}
        description={
          selected
            ? `${selected.author_name} · ${format(parseISO(selected.created_at), "EEEE d MMMM yyyy 'at' HH:mm")}`
            : undefined
        }
        bodyClassName="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start"
        footer={
          selected ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              {selected.kind === 'office' && !selected.signed_off && (
                <PrimaryButton
                  data-help="progresslogs.signoff"
                  fullWidth
                  size="lg"
                  disabled={signOffProgressLog.isPending}
                  onClick={() => signOffProgressLog.mutate(selected.id)}
                >
                  {signOffProgressLog.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Sign off log
                </PrimaryButton>
              )}
              <SecondaryButton fullWidth size="lg" onClick={() => openJob(selected.job_id)}>
                Open the job
              </SecondaryButton>
            </div>
          ) : null
        }
      >
        {selected && (
          <>
            <div className="space-y-4">
              <div className={cn(cardCn, 'p-4 space-y-3')}>
                <h3 className="text-sm font-semibold text-white">
                  {selected.kind === 'team' ? 'What they wrote' : 'Work done'}
                </h3>
                <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-white">
                  {selected.body || 'No words, photos only.'}
                </p>
                {selected.edited_at && (
                  <p className="text-[12px] text-white">
                    Edited {format(parseISO(selected.edited_at), 'd MMM, HH:mm')}
                  </p>
                )}
              </div>
              {[
                ['Materials used', selected.materials_used],
                ['Problems on the day', selected.issues_encountered],
                ['Delays', selected.delays],
                ['Planned next', selected.work_planned],
                ['Notes', selected.notes],
              ]
                .filter(([, v]) => !!v)
                .map(([label, v]) => (
                  <div key={label as string} className={cn(cardCn, 'p-4 space-y-2')}>
                    <h3 className="text-sm font-semibold text-white">{label}</h3>
                    <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-white">{v}</p>
                  </div>
                ))}
            </div>

            <div className="space-y-4">
              <div className={cn(cardCn, 'p-4 space-y-3')}>
                <h3 className="text-sm font-semibold text-white">The day</h3>
                <dl className="grid grid-cols-2 gap-3 text-[13px]">
                  <div>
                    <dt className="text-[12px] text-white">Date</dt>
                    <dd className="font-medium text-white">{format(parseISO(selected.entry_date), 'd MMM yyyy')}</dd>
                  </div>
                  <div>
                    <dt className="text-[12px] text-white">Written by</dt>
                    <dd className="font-medium text-white">
                      {selected.author_name} ({selected.author_role === 'crew' ? 'team' : 'office'})
                    </dd>
                  </div>
                  {selected.weather && (
                    <div>
                      <dt className="text-[12px] text-white">Weather</dt>
                      <dd className="font-medium text-white">{selected.weather}</dd>
                    </div>
                  )}
                  {(() => {
                    const crew = onSiteMap.get(`${selected.job_id}|${selected.entry_date}`);
                    return (
                      <div className="col-span-2">
                        <dt className="text-[12px] text-white">Clocked in that day</dt>
                        <dd className="font-medium text-white">
                          {crew && crew.names.length
                            ? `${crew.names.join(', ')}${crew.hours ? ` (${crew.hours} hrs)` : ''}`
                            : selected.workers_on_site
                              ? `${selected.workers_on_site} on site (from the log, no clock-ins)`
                              : 'Nobody clocked in on this job'}
                        </dd>
                      </div>
                    );
                  })()}
                  {selected.kind === 'office' && (
                    <div className="col-span-2">
                      <dt className="text-[12px] text-white">Sign-off</dt>
                      <dd className="font-medium text-white">
                        {selected.signed_off
                          ? `Signed off${selected.signed_off_at ? ` ${format(parseISO(selected.signed_off_at), 'd MMM yyyy')}` : ''}`
                          : 'Not signed off yet'}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className={cn(cardCn, 'p-4')} data-help="progresslogs.share">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white">Share with the client</h3>
                    <p className="mt-0.5 text-[12.5px] text-white">
                      {selected.shared_with_client
                        ? 'The client can see this entry on their portal.'
                        : 'Only your team can see this entry.'}
                    </p>
                  </div>
                  <Switch
                    checked={selected.shared_with_client}
                    disabled={setShared.isPending}
                    onCheckedChange={(v) => setShared.mutate({ kind: selected.kind, id: selected.id, shared: v })}
                    aria-label="Share with the client"
                  />
                </div>
              </div>

              {selected.photos.length > 0 && (
                <div className={cn(cardCn, 'p-4 space-y-3')}>
                  <h3 className="text-sm font-semibold text-white">
                    Photos <span className="font-normal">({selected.photos.length})</span>
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {selected.photos.map((p, i) => (
                      <PhotoTile
                        key={p}
                        url={photoSrcs[p]}
                        loading={photosLoading && !photoSrcs[p]}
                        alt={`Photo ${i + 1}`}
                        onClick={() => openPhotos(selected, i)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {selected.kind === 'office' && (
                <DestructiveButton fullWidth onClick={() => setDeleteConfirmId(selected.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete this log
                </DestructiveButton>
              )}
            </div>
          </>
        )}
      </FormSheet>

      {/* ---------- write a log ---------- */}
      <FormSheet
        open={showCreateSheet}
        onOpenChange={setShowCreateSheet}
        width="wide"
        eyebrow="Site diary"
        title="Write a daily log"
        description="What happened on site today. Your team's own notes land in the diary by themselves."
        bodyClassName="grid gap-5 lg:grid-cols-2 lg:items-start"
        footer={
          <PrimaryButton
            data-help="progresslogs.create"
            onClick={handleCreate}
            disabled={createProgressLog.isPending}
            fullWidth
            size="lg"
          >
            {createProgressLog.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            Save to the diary
          </PrimaryButton>
        }
      >
        <div className="space-y-5">
          <div className="space-y-2" data-help="progresslogs.form-job">
            <Label className="text-white text-[12px] font-medium">Job</Label>
            <Select value={formData.job_id} onValueChange={(v) => setFormData((p) => ({ ...p, job_id: v }))}>
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Pick the job" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                    {job.client ? ` (${job.client})` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-white text-[12px] font-medium">Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white text-[12px] font-medium">Weather</Label>
              <Select
                value={formData.weather}
                onValueChange={(v) => setFormData((p) => ({ ...p, weather: v as WeatherCondition }))}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {weatherOptions.map((w) => (
                    <SelectItem key={w} value={w}>
                      {w}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-white text-[12px] font-medium">People on site</Label>
              <Input
                type="number"
                inputMode="numeric"
                min={0}
                value={formData.workers_on_site}
                onChange={(e) => setFormData((p) => ({ ...p, workers_on_site: parseInt(e.target.value) || 0 }))}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white text-[12px] font-medium">Hours worked</Label>
              <Input
                type="number"
                inputMode="decimal"
                min={0}
                step={0.5}
                value={formData.hours_worked}
                onChange={(e) => setFormData((p) => ({ ...p, hours_worked: parseFloat(e.target.value) || 0 }))}
                className={inputClass}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white text-[12px] font-medium">Work done</Label>
            <Textarea
              value={formData.work_description}
              onChange={(e) => setFormData((p) => ({ ...p, work_description: e.target.value }))}
              placeholder="What got done today…"
              className={`${textareaClass} min-h-[110px]`}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white text-[12px] font-medium">Finished items</Label>
            <div className="flex gap-2">
              <Input
                value={newWorkItem}
                onChange={(e) => setNewWorkItem(e.target.value)}
                placeholder="e.g. Kitchen ring second fix"
                className={`${inputClass} flex-1`}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddWorkItem())}
              />
              <SecondaryButton onClick={handleAddWorkItem} className="h-11 px-4">
                Add
              </SecondaryButton>
            </div>
            {formData.work_items.length > 0 && (
              <ul className="space-y-1.5">
                {formData.work_items.map((item, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 rounded-xl bg-white/[0.05] px-3 py-2">
                    <span className="text-[13px] text-white">{item}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({ ...p, work_items: p.work_items.filter((_, x) => x !== i) }))
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-full text-white touch-manipulation"
                      aria-label={`Remove ${item}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-white text-[12px] font-medium">Materials used</Label>
            <div className="grid grid-cols-[1fr_4.5rem_5rem_auto] gap-2">
              <Input
                value={newMaterial.item}
                onChange={(e) => setNewMaterial((p) => ({ ...p, item: e.target.value }))}
                placeholder="Item"
                className={inputClass}
              />
              <Input
                value={newMaterial.quantity}
                onChange={(e) => setNewMaterial((p) => ({ ...p, quantity: e.target.value }))}
                placeholder="Qty"
                className={inputClass}
              />
              <Input
                type="number"
                inputMode="decimal"
                value={newMaterial.cost || ''}
                onChange={(e) => setNewMaterial((p) => ({ ...p, cost: parseFloat(e.target.value) || 0 }))}
                placeholder="£"
                className={inputClass}
              />
              <SecondaryButton onClick={handleAddMaterial} className="h-11 w-11 px-0" aria-label="Add material">
                <Plus className="h-4 w-4" />
              </SecondaryButton>
            </div>
            {formData.materials_list.length > 0 && (
              <ul className="space-y-1.5">
                {formData.materials_list.map((m, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 rounded-xl bg-white/[0.05] px-3 py-2">
                    <span className="text-[13px] text-white">
                      {m.item}
                      {m.quantity ? ` ×${m.quantity}` : ''}
                      {m.cost ? ` · £${m.cost}` : ''}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({ ...p, materials_list: p.materials_list.filter((_, x) => x !== i) }))
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-full text-white touch-manipulation"
                      aria-label={`Remove ${m.item}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-white text-[12px] font-medium">Notes</Label>
            <Textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Anything else worth keeping…"
              className={`${textareaClass} min-h-[80px]`}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white text-[12px] font-medium">Photos</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              multiple
              onChange={handlePhotoSelect}
              className="hidden"
            />
            <div className="flex flex-wrap gap-2">
              {(formData.photos || []).map((p) => (
                <div key={p} className="relative">
                  <PhotoTile url={photoSrcs[p]} loading={!photoSrcs[p]} alt="Site photo" className="h-20 w-20" />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, photos: (prev.photos || []).filter((x) => x !== p) }))}
                    className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black text-white touch-manipulation"
                    aria-label="Remove photo"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPhotos}
                className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/25 text-white disabled:opacity-50 touch-manipulation"
                aria-label="Add photos"
              >
                {uploadingPhotos ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
                <span className="text-[11px]">Add</span>
              </button>
            </div>
          </div>
          <div className={cn(cardCn, 'flex items-center justify-between gap-3 p-4')}>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Share with the client</p>
              <p className="mt-0.5 text-[12.5px] text-white">Off keeps it to your team. You can change it later.</p>
            </div>
            <Switch
              checked={!!formData.shared_with_client}
              onCheckedChange={(v) => setFormData((p) => ({ ...p, shared_with_client: v }))}
              aria-label="Share with the client"
            />
          </div>
        </div>
      </FormSheet>

      {lightbox && (
        <PhotoLightbox
          open
          photos={lightbox.photos}
          index={lightbox.index}
          onIndexChange={(i) => setLightbox((l) => (l ? { ...l, index: i } : l))}
          onOpenChange={(o) => !o && setLightbox(null)}
        />
      )}

      <ViewJobSheet job={jobSheetJob} open={!!jobSheetJob} onOpenChange={(o) => !o && setJobSheetJob(null)} />

      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.06]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete this daily log?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              It comes out of the diary for good. Team notes are not affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]">
              Keep it
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="h-11 bg-red-500/90 text-white hover:bg-red-500">
              {deleteProgressLog.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
