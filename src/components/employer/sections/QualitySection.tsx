import { useState, useRef, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  useJobIssuesByType,
  useJobIssueStats,
  useCreateJobIssue,
  useUpdateJobIssueStatus,
  type JobIssue,
  type IssueType,
  type IssueSeverity,
} from '@/hooks/useJobIssues';
import { useJobs } from '@/hooks/useJobs';
import {
  Plus,
  Camera,
  CheckCircle2,
  Loader2,
  RefreshCw,
  X,
} from 'lucide-react';
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
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';

const severityTone: Record<string, Tone> = {
  Low: 'blue',
  Medium: 'yellow',
  High: 'orange',
  Critical: 'red',
};

const statusTone: Record<string, Tone> = {
  Open: 'amber',
  'In Progress': 'cyan',
  Resolved: 'emerald',
  Closed: 'emerald',
};

function getInitials(name?: string | null): string {
  if (!name) return 'NA';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-GB');
}

export const QualitySection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewSnag, setShowNewSnag] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState<JobIssue | null>(null);

  const [selectedJobId, setSelectedJobId] = useState('');
  const [snagTitle, setSnagTitle] = useState('');
  const [snagDescription, setSnagDescription] = useState('');
  const [snagSeverity, setSnagSeverity] = useState<IssueSeverity>('Medium');
  const [snagLocation, setSnagLocation] = useState('');
  const [snagPhotos, setSnagPhotos] = useState<string[]>([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: snagIssues, isLoading, error, refetch } = useJobIssuesByType(['Snag', 'Defect']);
  const { data: stats } = useJobIssueStats();
  const { data: jobs } = useJobs();
  const createIssue = useCreateJobIssue();
  const updateStatus = useUpdateJobIssueStatus();

  const filteredSnags = useMemo(
    () =>
      snagIssues?.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [],
    [snagIssues, searchQuery]
  );

  const openSnags = filteredSnags.filter(
    (s) => s.status === 'Open' || s.status === 'In Progress'
  );
  const reviewSnags = filteredSnags.filter((s) => s.status === 'In Progress');
  const resolvedSnags = filteredSnags.filter(
    (s) => s.status === 'Resolved' || s.status === 'Closed'
  );

  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const resolvedLast7d = filteredSnags.filter(
    (s) =>
      (s.status === 'Resolved' || s.status === 'Closed') &&
      s.resolved_at &&
      new Date(s.resolved_at).getTime() >= sevenDaysAgo
  ).length;

  const visibleSnags = useMemo(() => {
    switch (activeTab) {
      case 'open':
        return openSnags;
      case 'review':
        return reviewSnags;
      case 'signed':
        return resolvedSnags;
      case 'all':
      default:
        return filteredSnags;
    }
  }, [activeTab, filteredSnags, openSnags, reviewSnags, resolvedSnags]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingPhoto(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/snags/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('visual-uploads')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from('visual-uploads').getPublicUrl(fileName);

        uploadedUrls.push(publicUrl);
      }

      setSnagPhotos((prev) => [...prev, ...uploadedUrls]);
      toast({ title: 'Photo uploaded', description: `${uploadedUrls.length} photo(s) added` });
    } catch (err) {
      console.error('Photo upload error:', err);
      toast({
        title: 'Upload failed',
        description: 'Could not upload photo',
        variant: 'destructive',
      });
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removePhoto = (index: number) => {
    setSnagPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateSnag = async () => {
    if (!selectedJobId || !snagTitle) return;

    await createIssue.mutateAsync({
      job_id: selectedJobId,
      title: snagTitle,
      description: snagDescription,
      issue_type: 'Snag' as IssueType,
      severity: snagSeverity,
      status: 'Open',
      location: snagLocation,
      photos: snagPhotos,
    });

    setSelectedJobId('');
    setSnagTitle('');
    setSnagDescription('');
    setSnagSeverity('Medium');
    setSnagLocation('');
    setSnagPhotos([]);
    setShowNewSnag(false);
  };

  const handleResolve = async (issue: JobIssue) => {
    await updateStatus.mutateAsync({
      id: issue.id,
      status: 'Resolved',
    });
    setSelectedIssue(null);
  };

  if (error) {
    return (
      <PageFrame>
        <EmptyState
          title="Failed to load quality data"
          description="There was a problem fetching snags and defects."
          action="Retry"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  const heroActions = (
    <>
      <Sheet open={showNewSnag} onOpenChange={setShowNewSnag}>
        <SheetTrigger asChild>
          <PrimaryButton>
            <Plus className="h-4 w-4 mr-1.5" />
            Log snag
          </PrimaryButton>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b border-white/[0.06]">
              <SheetTitle className="text-white">Log new snag</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Select job *</Label>
                <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Choose a job…" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {jobs?.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title} - {job.client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Snag title *</Label>
                <Input
                  placeholder="Brief description of the issue…"
                  value={snagTitle}
                  onChange={(e) => setSnagTitle(e.target.value)}
className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Location</Label>
                <Input
                  placeholder="Where is this issue?"
                  value={snagLocation}
                  onChange={(e) => setSnagLocation(e.target.value)}
className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Severity</Label>
                <Select
                  value={snagSeverity}
                  onValueChange={(v) => setSnagSeverity(v as IssueSeverity)}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Detailed description</Label>
                <Textarea
                  placeholder="Describe the defect or issue in detail…"
                  value={snagDescription}
                  onChange={(e) => setSnagDescription(e.target.value)}
                  className={`${textareaClass} min-h-[100px]`}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Photos</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                <SecondaryButton
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  fullWidth
                >
                  {uploadingPhoto ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Camera className="h-4 w-4 mr-2" />
                  )}
                  {uploadingPhoto ? 'Uploading…' : 'Add photos'}
                </SecondaryButton>

                {snagPhotos.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {snagPhotos.map((url, index) => (
                      <div
                        key={index}
                        className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/[0.08]"
                      >
                        <img
                          src={url}
                          alt={`Snag photo ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 touch-manipulation"
                        >
                          <X className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-white/[0.06]">
              <div className="flex gap-3">
                <SecondaryButton onClick={() => setShowNewSnag(false)} fullWidth>
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  onClick={handleCreateSnag}
                  disabled={!selectedJobId || !snagTitle || createIssue.isPending}
                  fullWidth
                >
                  {createIssue.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Create snag'
                  )}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <IconButton onClick={() => refetch()} aria-label="Refresh">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
    </>
  );

  return (
    <PageFrame>
      <PageHero
        eyebrow="Operations"
        title="Quality & Snags"
        description="Defect tracking with photo evidence and sign-off."
        tone="amber"
        actions={heroActions}
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Open', value: openSnags.length, tone: 'amber' },
          { label: 'Resolved 7d', value: resolvedLast7d, tone: 'emerald' },
          { label: 'Awaiting sign', value: reviewSnags.length, tone: 'orange' },
          {
            label: 'Signed off',
            value: resolvedSnags.length,
            tone: 'emerald',
            accent: true,
          },
        ]}
      />

      <FilterBar
        tabs={[
          { value: 'all', label: 'All', count: filteredSnags.length },
          { value: 'open', label: 'Open', count: openSnags.length },
          { value: 'review', label: 'Review', count: reviewSnags.length },
          { value: 'signed', label: 'Signed', count: resolvedSnags.length },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search snags by title, job, or description…"
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : visibleSnags.length === 0 ? (
        <EmptyState
          title="All clear"
          description="No snags match the current filter. Defect tracking with photo evidence keeps every site sign-off ready."
          action="Log first snag"
          onAction={() => setShowNewSnag(true)}
        />
      ) : (
        <ListCard>
          <ListCardHeader
            tone="amber"
            title="Snags"
            meta={<Pill tone="amber">{visibleSnags.length}</Pill>}
          />
          <ListBody>
            {visibleSnags.map((s) => {
              const reporter = s.job?.client ?? s.job?.title ?? 'Site';
              const room = s.location ?? 'Unspecified location';
              const jobTitle = s.job?.title ?? 'No job linked';
              return (
                <ListRow
                  key={s.id}
                  lead={<Avatar initials={getInitials(reporter)} />}
                  title={s.title}
                  subtitle={`${jobTitle} · ${room} · ${timeAgo(s.created_at)}`}
                  trailing={
                    <>
                      <Pill tone={severityTone[s.severity] ?? 'yellow'}>{s.severity}</Pill>
                      <Pill tone={statusTone[s.status] ?? 'amber'}>{s.status}</Pill>
                    </>
                  }
                  onClick={() => setSelectedIssue(s)}
                />
              );
            })}
          </ListBody>
        </ListCard>
      )}

      <Sheet open={!!selectedIssue} onOpenChange={(open) => !open && setSelectedIssue(null)}>
        <SheetContent
          side="bottom"
          className="h-[88vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          {selectedIssue && (
            <div className="flex flex-col h-full">
              <SheetHeader className="p-4 border-b border-white/[0.06]">
                <SheetTitle className="text-white text-left">{selectedIssue.title}</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
                <StatStrip
                  columns={3}
                  stats={[
                    {
                      label: 'Severity',
                      value: selectedIssue.severity,
                      tone: severityTone[selectedIssue.severity] ?? 'yellow',
                    },
                    {
                      label: 'Status',
                      value: selectedIssue.status,
                      tone: statusTone[selectedIssue.status] ?? 'amber',
                    },
                    {
                      label: 'Logged',
                      value: timeAgo(selectedIssue.created_at),
                    },
                  ]}
                />

                <ListCard>
                  <ListCardHeader tone="amber" title="Detail" />
                  <div className="p-5 space-y-4">
                    <div>
                      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                        Job
                      </div>
                      <div className="mt-1.5 text-[14px] text-white">
                        {selectedIssue.job?.title ?? 'No job linked'}
                        {selectedIssue.job?.client && ` · ${selectedIssue.job.client}`}
                      </div>
                    </div>
                    {selectedIssue.location && (
                      <div>
                        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                          Location
                        </div>
                        <div className="mt-1.5 text-[14px] text-white">{selectedIssue.location}</div>
                      </div>
                    )}
                    {selectedIssue.description && (
                      <div>
                        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                          Description
                        </div>
                        <div className="mt-1.5 text-[14px] text-white leading-relaxed">
                          {selectedIssue.description}
                        </div>
                      </div>
                    )}
                    {selectedIssue.resolution_notes && (
                      <div>
                        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                          Resolution notes
                        </div>
                        <div className="mt-1.5 text-[14px] text-white leading-relaxed">
                          {selectedIssue.resolution_notes}
                        </div>
                      </div>
                    )}
                  </div>
                </ListCard>

                {selectedIssue.photos && selectedIssue.photos.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="amber"
                      title="Photo evidence"
                      meta={<Pill tone="amber">{selectedIssue.photos.length}</Pill>}
                    />
                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedIssue.photos.map((url, idx) => (
                        <a
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative aspect-square rounded-xl overflow-hidden border border-white/[0.08] touch-manipulation"
                        >
                          <img
                            src={url}
                            alt={`Issue photo ${idx + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </a>
                      ))}
                    </div>
                  </ListCard>
                )}
              </div>

              {(selectedIssue.status === 'Open' ||
                selectedIssue.status === 'In Progress') && (
                <div className="p-4 border-t border-white/[0.06]">
                  <PrimaryButton
                    onClick={() => handleResolve(selectedIssue)}
                    disabled={updateStatus.isPending}
                    fullWidth
                  >
                    {updateStatus.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Mark resolved · sign off
                      </>
                    )}
                  </PrimaryButton>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </PageFrame>
  );
};
