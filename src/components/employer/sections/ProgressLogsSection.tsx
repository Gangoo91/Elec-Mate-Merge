import { useState, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  RefreshCw,
  Plus,
  X,
  Loader2,
  CheckCircle,
  Trash2,
  Camera,
  Hammer,
  Package,
  FileText,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { format, isToday, isThisWeek, isThisMonth } from 'date-fns';
import {
  useProgressLogs,
  useProgressLogStats,
  useCreateProgressLog,
  useSignOffProgressLog,
  useDeleteProgressLog,
  type ProgressLog,
  type CreateProgressLogInput,
  type WeatherCondition,
} from '@/hooks/useProgressLogs';
import { useJobs } from '@/hooks/useJobs';

import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { toast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  IconButton,
  Pill,
  EmptyState,
  LoadingBlocks,
  Divider,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

const weatherOptions: WeatherCondition[] = [
  'Clear',
  'Cloudy',
  'Partly Cloudy',
  'Rain',
  'Heavy Rain',
  'Snow',
  'Wind',
];

function getInitials(name?: string | null) {
  if (!name) return '··';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

type RangeFilter = 'today' | 'week' | 'month' | 'all';

export function ProgressLogsSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>('today');
  const [selectedLog, setSelectedLog] = useState<ProgressLog | null>(null);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<CreateProgressLogInput>>({
    job_id: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    weather: 'Clear',
    workers_on_site: 1,
    work_description: '',
    work_items: [],
    materials_used: [],
    hours_worked: 8,
    photos: [],
  });
  const [newWorkItem, setNewWorkItem] = useState('');
  const [newMaterial, setNewMaterial] = useState({ item: '', quantity: '', cost: 0 });

  const { data: progressLogs = [], isLoading, error, refetch } = useProgressLogs();
  const { data: stats } = useProgressLogStats();
  const { data: jobs = [] } = useJobs();
  const createProgressLog = useCreateProgressLog();
  const signOffProgressLog = useSignOffProgressLog();
  const deleteProgressLog = useDeleteProgressLog();

  const handleRefresh = useCallback(async () => {
    await refetch();
    toast({ title: 'Logs refreshed' });
  }, [refetch]);

  const handleSignOff = (logId: string) => {
    signOffProgressLog.mutate(logId);
  };

  const handleAddWorkItem = () => {
    if (newWorkItem.trim()) {
      setFormData((prev) => ({
        ...prev,
        work_items: [...(prev.work_items || []), newWorkItem.trim()],
      }));
      setNewWorkItem('');
    }
  };

  const handleRemoveWorkItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      work_items: prev.work_items?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleAddMaterial = () => {
    if (newMaterial.item.trim()) {
      setFormData((prev) => ({
        ...prev,
        materials_used: [...(prev.materials_used || []), { ...newMaterial }],
      }));
      setNewMaterial({ item: '', quantity: '', cost: 0 });
    }
  };

  const handleRemoveMaterial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      materials_used: prev.materials_used?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleCreate = async () => {
    if (!formData.job_id || !formData.work_description) {
      toast({
        title: 'Error',
        description: 'Please fill in required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createProgressLog.mutateAsync(formData as CreateProgressLogInput);
      setShowCreateSheet(false);
      resetForm();
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteProgressLog.mutateAsync(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      job_id: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      weather: 'Clear',
      workers_on_site: 1,
      work_description: '',
      work_items: [],
      materials_used: [],
      hours_worked: 8,
      photos: [],
    });
    setNewWorkItem('');
    setNewMaterial({ item: '', quantity: '', cost: 0 });
  };

  const filteredLogs = useMemo(() => {
    return progressLogs.filter((log) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        log.work_description?.toLowerCase().includes(q) ||
        log.job?.title?.toLowerCase().includes(q) ||
        log.job?.client?.toLowerCase().includes(q);

      const logDate = new Date(log.date);
      const matchesRange =
        rangeFilter === 'all' ||
        (rangeFilter === 'today' && isToday(logDate)) ||
        (rangeFilter === 'week' && isThisWeek(logDate, { weekStartsOn: 1 })) ||
        (rangeFilter === 'month' && isThisMonth(logDate));

      return matchesSearch && matchesRange;
    });
  }, [progressLogs, searchQuery, rangeFilter]);

  const todaysLogs = progressLogs.filter((l) => isToday(new Date(l.date)));
  const totalPhotos = progressLogs.reduce((acc, l) => acc + (l.photos?.length || 0), 0);
  const jobsCovered = new Set(progressLogs.map((l) => l.job_id)).size;
  const hoursLogged = stats?.totalHours ?? 0;
  const logsTodayCount = todaysLogs.length;

  const tabs = [
    { value: 'today', label: 'Today', count: logsTodayCount },
    {
      value: 'week',
      label: 'This week',
      count: progressLogs.filter((l) => isThisWeek(new Date(l.date), { weekStartsOn: 1 })).length,
    },
    {
      value: 'month',
      label: 'This month',
      count: progressLogs.filter((l) => isThisMonth(new Date(l.date))).length,
    },
    { value: 'all', label: 'All', count: progressLogs.length },
  ];

  const newLogButton = (
    <PrimaryButton onClick={() => setShowCreateSheet(true)}>
      <Plus className="h-4 w-4 mr-1.5" />
      New log
    </PrimaryButton>
  );

  const heroActions = (
    <>
      {newLogButton}
      <IconButton onClick={handleRefresh} aria-label="Refresh logs">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
    </>
  );

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Operations"
          title="Progress Logs"
          description="Daily progress with photo evidence, time-stamped."
          tone="emerald"
          actions={heroActions}
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  if (error) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Operations"
          title="Progress Logs"
          description="Daily progress with photo evidence, time-stamped."
          tone="emerald"
          actions={heroActions}
        />
        <EmptyState
          title="Failed to load progress logs"
          description={error.message}
          action="Try again"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  const content = (
    <PageFrame>
      <PageHero
        eyebrow="Operations"
        title="Progress Logs"
        description="Daily progress with photo evidence, time-stamped."
        tone="emerald"
        actions={heroActions}
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Logs today', value: logsTodayCount, tone: 'emerald' },
          { label: 'Photos', value: totalPhotos, tone: 'blue' },
          { label: 'Hours logged', value: `${hoursLogged}h`, tone: 'amber' },
          { label: 'Jobs covered', value: jobsCovered },
        ]}
      />

      <FilterBar
        tabs={tabs}
        activeTab={rangeFilter}
        onTabChange={(v) => setRangeFilter(v as RangeFilter)}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search logs, jobs, clients…"
      />

      <ListCard>
        <ListCardHeader
          tone="emerald"
          title="Progress Logs"
          meta={<Pill tone="emerald">{filteredLogs.length}</Pill>}
        />
        {filteredLogs.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="No progress logs"
              description="Start tracking your job progress with time-stamped daily logs and photo evidence."
              action="Create first log"
              onAction={() => setShowCreateSheet(true)}
            />
          </div>
        ) : (
          <ListBody>
            {filteredLogs.map((log) => {
              const photosCount = log.photos?.length ?? 0;
              const summary = log.work_description || 'No description';
              return (
                <ListRow
                  key={log.id}
                  lead={<Avatar initials={getInitials(log.job?.title)} />}
                  title={log.job?.title || 'Unknown job'}
                  subtitle={`${summary} · ${photosCount} photo${photosCount === 1 ? '' : 's'} · ${log.hours_worked}h`}
                  trailing={
                    <>
                      {log.signed_off ? (
                        <Pill tone="emerald">Signed off</Pill>
                      ) : (
                        <Pill tone="amber">Pending</Pill>
                      )}
                      <span className="text-[11px] text-white tabular-nums">
                        {format(new Date(log.date), 'dd MMM')}
                      </span>
                    </>
                  }
                  onClick={() => setSelectedLog(log)}
                />
              );
            })}
          </ListBody>
        )}
      </ListCard>

      {/* Create Log Sheet */}
      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="px-5 py-4 border-b border-white/[0.06]">
              <SheetTitle className="text-white text-base font-semibold">New progress log</SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-5">
              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">Job *</Label>
                <Select
                  value={formData.job_id}
                  onValueChange={(v) => setFormData((prev) => ({ ...prev, job_id: v }))}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select a job" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title} — {job.client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">Date *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-white text-[12px] uppercase tracking-[0.14em]">Weather</Label>
                  <Select
                    value={formData.weather}
                    onValueChange={(v) =>
                      setFormData((prev) => ({ ...prev, weather: v as WeatherCondition }))
                    }
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
                  <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                    Workers on site
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    value={formData.workers_on_site}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        workers_on_site: parseInt(e.target.value) || 1,
                      }))
                    }
  className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                  Hours worked
                </Label>
                <Input
                  type="number"
                  min={0}
                  step={0.5}
                  value={formData.hours_worked}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      hours_worked: parseFloat(e.target.value) || 0,
                    }))
                  }
className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                  Work description *
                </Label>
                <Textarea
                  value={formData.work_description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, work_description: e.target.value }))
                  }
                  placeholder="Describe the work completed today…"
className={`${textareaClass} min-h-[100px]`}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                  Work items
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={newWorkItem}
                    onChange={(e) => setNewWorkItem(e.target.value)}
                    placeholder="Add work item…"
className={`${inputClass} flex-1`}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), handleAddWorkItem())
                    }
                  />
                  <button
                    onClick={handleAddWorkItem}
                    className="h-11 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation"
                  >
                    Add
                  </button>
                </div>
                {formData.work_items && formData.work_items.length > 0 && (
                  <ListCard className="mt-3">
                    <ListBody>
                      {formData.work_items.map((item, i) => (
                        <ListRow
                          key={i}
                          title={item}
                          trailing={
                            <button
                              onClick={() => handleRemoveWorkItem(i)}
                              className="h-8 w-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation"
                              aria-label="Remove"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          }
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                  Materials used
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    value={newMaterial.item}
                    onChange={(e) => setNewMaterial((prev) => ({ ...prev, item: e.target.value }))}
                    placeholder="Item"
className={inputClass}
                  />
                  <Input
                    value={newMaterial.quantity}
                    onChange={(e) =>
                      setNewMaterial((prev) => ({ ...prev, quantity: e.target.value }))
                    }
                    placeholder="Qty"
className={inputClass}
                  />
                  <div className="flex gap-1">
                    <Input
                      type="number"
                      value={newMaterial.cost || ''}
                      onChange={(e) =>
                        setNewMaterial((prev) => ({
                          ...prev,
                          cost: parseFloat(e.target.value) || 0,
                        }))
                      }
                      placeholder="£"
  className={`${inputClass} flex-1`}
                    />
                    <button
                      onClick={handleAddMaterial}
                      className="h-11 px-3 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation"
                      aria-label="Add material"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {formData.materials_used && formData.materials_used.length > 0 && (
                  <ListCard className="mt-3">
                    <ListBody>
                      {formData.materials_used.map((mat, i) => (
                        <ListRow
                          key={i}
                          title={mat.item}
                          subtitle={`${mat.quantity} · £${mat.cost}`}
                          trailing={
                            <button
                              onClick={() => handleRemoveMaterial(i)}
                              className="h-8 w-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation"
                              aria-label="Remove"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          }
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                  Additional notes
                </Label>
                <Textarea
                  value={formData.notes || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional notes…"
className={`${textareaClass} min-h-[80px]`}
                />
              </div>
            </div>

            <div className="px-5 py-4 border-t border-white/[0.06]">
              <PrimaryButton
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
                Create progress log
              </PrimaryButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* View Log Sheet */}
      <Sheet open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          {selectedLog && (
            <div className="flex flex-col h-full">
              <SheetHeader className="px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <Eyebrow>Progress log</Eyebrow>
                    <SheetTitle className="mt-1.5 text-white text-lg font-semibold truncate">
                      {selectedLog.job?.title || 'Unknown job'}
                    </SheetTitle>
                  </div>
                  {selectedLog.signed_off ? (
                    <Pill tone="emerald">Signed off</Pill>
                  ) : (
                    <Pill tone="amber">Pending</Pill>
                  )}
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-5">
                <StatStrip
                  columns={4}
                  stats={[
                    {
                      label: 'Date',
                      value: (
                        <span className="text-[18px] sm:text-2xl">
                          {format(new Date(selectedLog.date), 'dd MMM')}
                        </span>
                      ),
                    },
                    { label: 'Hours', value: `${selectedLog.hours_worked}h`, tone: 'amber' },
                    {
                      label: 'Workers',
                      value: selectedLog.workers_on_site ?? 0,
                      tone: 'blue',
                    },
                    {
                      label: 'Photos',
                      value: selectedLog.photos?.length ?? 0,
                      tone: 'emerald',
                    },
                  ]}
                />

                {selectedLog.job?.client && (
                  <ListCard>
                    <ListCardHeader title="Client" />
                    <div className="px-5 py-4">
                      <div className="text-[14px] font-medium text-white">
                        {selectedLog.job.client}
                      </div>
                      {selectedLog.weather && (
                        <div className="mt-1 text-[12px] text-white">
                          Weather: {selectedLog.weather}
                        </div>
                      )}
                    </div>
                  </ListCard>
                )}

                <ListCard>
                  <ListCardHeader
                    tone="emerald"
                    title="Work description"
                    meta={<Hammer className="h-3.5 w-3.5 text-elec-yellow" />}
                  />
                  <div className="px-5 py-4">
                    <p className="text-[13px] text-white leading-relaxed whitespace-pre-wrap">
                      {selectedLog.work_description}
                    </p>
                  </div>
                </ListCard>

                {selectedLog.work_items.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      title="Work items"
                      meta={<Pill tone="emerald">{selectedLog.work_items.length}</Pill>}
                    />
                    <ListBody>
                      {selectedLog.work_items.map((item, i) => (
                        <ListRow
                          key={i}
                          lead={
                            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                          }
                          title={item}
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                {selectedLog.materials_used.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="amber"
                      title="Materials used"
                      meta={
                        <span className="text-[11px] text-elec-yellow tabular-nums font-semibold">
                          £{selectedLog.materials_used.reduce((s, m) => s + m.cost, 0)}
                        </span>
                      }
                    />
                    <ListBody>
                      {selectedLog.materials_used.map((material, i) => (
                        <ListRow
                          key={i}
                          lead={<Package className="h-4 w-4 text-elec-yellow shrink-0" />}
                          title={material.item}
                          subtitle={material.quantity}
                          trailing={
                            <span className="text-[12px] font-semibold text-white tabular-nums">
                              £{material.cost}
                            </span>
                          }
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                {selectedLog.photos && selectedLog.photos.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="blue"
                      title="Photo evidence"
                      meta={<Pill tone="blue">{selectedLog.photos.length}</Pill>}
                    />
                    <div className="px-5 py-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {selectedLog.photos.map((photo, i) => {
                          const url = typeof photo === 'string' ? photo : (photo as any)?.url;
                          if (!url) return null;
                          return (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="relative aspect-square rounded-xl overflow-hidden bg-[hsl(0_0%_15%)] border border-white/[0.06] touch-manipulation"
                            >
                              <img
                                src={url}
                                alt={`Photo ${i + 1}`}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </ListCard>
                )}

                {selectedLog.notes && (
                  <ListCard>
                    <ListCardHeader
                      title="Notes"
                      meta={<FileText className="h-3.5 w-3.5 text-white" />}
                    />
                    <div className="px-5 py-4">
                      <p className="text-[13px] text-white leading-relaxed whitespace-pre-wrap">
                        {selectedLog.notes}
                      </p>
                    </div>
                  </ListCard>
                )}

                <Divider />

                <div className="flex flex-col sm:flex-row gap-3">
                  <SecondaryButton
                    onClick={() => {
                      setDeleteConfirmId(selectedLog.id);
                      setSelectedLog(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete log
                  </SecondaryButton>
                  <span className="text-[11px] text-white sm:ml-auto self-center tabular-nums">
                    Created {format(new Date(selectedLog.date), 'dd MMM yyyy')}
                    {(selectedLog as any).created_at &&
                      ` at ${format(new Date((selectedLog as any).created_at), 'HH:mm')}`}
                  </span>
                </div>
              </div>

              {!selectedLog.signed_off && (
                <div className="px-5 py-4 border-t border-white/[0.06]">
                  <PrimaryButton
                    onClick={() => {
                      handleSignOff(selectedLog.id);
                      setSelectedLog(null);
                    }}
                    disabled={signOffProgressLog.isPending}
                    fullWidth
                    size="lg"
                  >
                    {signOffProgressLog.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    Sign off log
                  </PrimaryButton>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.06]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete progress log?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This action cannot be undone. The progress log and its audit trail entry will be
              permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              {deleteProgressLog.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageFrame>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh} className="h-full">
      {content}
    </PullToRefresh>
  ) : (
    content
  );
}
