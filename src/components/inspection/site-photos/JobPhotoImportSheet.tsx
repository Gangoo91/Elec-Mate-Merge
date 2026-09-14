/**
 * Import photos taken on a job into a certificate.
 * ────────────────────────────────────────────────────────────────────────
 * Origin: ELE-1729 — an electrician photographs his test results on site
 * against the job, then wants them on the certificate when he gets home.
 *
 * Both halves already existed and could not see each other: job photos live in
 * `project_documents` (bucket `project-documents`, written by the job's own
 * photo section), certificate photos live in `inspection_photos` (bucket
 * `inspection-photos`). This is the bridge, and it is deliberately a COPY.
 *
 * WHY COPY RATHER THAN REFERENCE
 * A certificate is a record someone may rely on long after the job is tidied
 * away. If it merely pointed at the job's photo, deleting that job — or its
 * photo — would silently empty part of the certificate. Copying costs a little
 * storage and leaves the certificate standing on its own.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, FolderOpen, Loader2 } from 'lucide-react';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface JobSummary {
  id: string;
  /** ELE-1727. Several jobs can share a title ("Job — John Smith"); the number does not. */
  job_number: string | null;
  title: string;
  location: string | null;
  customer_id: string | null;
}

interface JobPhoto {
  id: string;
  file_path: string;
  /** `project_documents.name` — the original filename. */
  name: string | null;
  file_type: string | null;
  signedUrl?: string;
}

interface JobPhotoImportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Customer on the certificate, so their jobs can be offered first. */
  customerId?: string | null;
  /**
   * Copies one file into the certificate. MUST resolve false when the upload
   * failed — the underlying `uploadPhoto` swallows its errors and resolves
   * undefined, so a caller that assumes success reports photos it never added.
   */
  onImport: (file: File) => Promise<boolean>;
}

export function JobPhotoImportSheet({
  open,
  onOpenChange,
  customerId,
  onImport,
}: JobPhotoImportSheetProps) {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<JobSummary[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [activeJob, setActiveJob] = useState<JobSummary | null>(null);
  const [photos, setPhotos] = useState<JobPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [importing, setImporting] = useState(false);

  // ── the electrician's jobs, the certificate's customer first ─────────────
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      setLoadingJobs(true);
      const { data, error } = await supabase
        .from('spark_projects')
        .select('id, job_number, title, location, customer_id')
        .order('created_at', { ascending: false })
        .limit(50);
      if (cancelled) return;
      if (error) console.error('[JobPhotoImportSheet] could not load jobs', error);
      setJobs(data ?? []);
      setLoadingJobs(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const orderedJobs = useMemo(() => {
    if (!customerId) return jobs;
    // The job this certificate is most likely about belongs to its customer.
    return [...jobs].sort((a, b) => {
      const aMatch = a.customer_id === customerId ? 0 : 1;
      const bMatch = b.customer_id === customerId ? 0 : 1;
      return aMatch - bMatch;
    });
  }, [jobs, customerId]);

  const openJob = useCallback(async (job: JobSummary) => {
    setActiveJob(job);
    setSelected(new Set());
    setLoadingPhotos(true);
    const { data, error } = await supabase
      .from('project_documents')
      .select('id, file_path, name, file_type')
      .eq('project_id', job.id)
      .eq('doc_type', 'photo')
      .order('uploaded_at', { ascending: false });
    if (error) console.error('[JobPhotoImportSheet] could not load job photos', error);
    const withUrls = await Promise.all(
      (data ?? []).map(async (p) => {
        const { data: url } = await supabase.storage
          .from('project-documents')
          .createSignedUrl(p.file_path, 3600);
        return { ...p, signedUrl: url?.signedUrl } as JobPhoto;
      })
    );
    setPhotos(withUrls);
    setLoadingPhotos(false);
  }, []);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const handleImport = async () => {
    const chosen = photos.filter((p) => selected.has(p.id));
    if (!chosen.length) return;
    setImporting(true);
    let copied = 0;
    try {
      // Each photo is independent — one failure must not abandon the rest.
      for (const photo of chosen) {
        // Download from the job's bucket and hand a real File to the
        // certificate's own uploader, so compression, naming and the
        // inspection_photos row all stay that hook's business.
        const { data, error } = await supabase.storage
          .from('project-documents')
          .download(photo.file_path);
        if (error || !data) {
          console.error('[JobPhotoImportSheet] download failed', error);
          continue;
        }
        const name = photo.name || photo.file_path.split('/').pop() || 'job-photo.jpg';
        const stored = await onImport(
          new File([data], name, { type: photo.file_type || data.type || 'image/jpeg' })
        );
        if (stored) copied += 1;
      }
      if (copied === 0) {
        toast({
          title: 'Nothing could be added',
          description:
            'The photos could not be copied across — very large photos may be rejected by the certificate store.',
          variant: 'destructive',
        });
      } else {
        toast(
          copied === chosen.length
            ? { title: `${copied} photo${copied === 1 ? '' : 's'} added to this certificate` }
            : {
                title: `${copied} of ${chosen.length} photos added`,
                description: 'The rest could not be copied — please try them again.',
                variant: 'destructive',
              }
        );
        onOpenChange(false);
      }
    } finally {
      setImporting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex h-full flex-col bg-background">
          <SheetHeader className="border-b border-white/[0.1] px-4 py-3">
            <SheetTitle className="text-[15px] font-semibold text-white">
              {activeJob ? activeJob.title : 'Add photos from a job'}
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 py-3">
            {/* ── choose a job ─────────────────────────────────────────── */}
            {!activeJob && (
              <>
                {loadingJobs && (
                  <div className="flex items-center gap-2 py-8 text-[14px] text-white">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading your jobs…
                  </div>
                )}
                {!loadingJobs && orderedJobs.length === 0 && (
                  <p className="py-8 text-center text-[14px] text-white">
                    No jobs yet. Photos you take against a job will show up here.
                  </p>
                )}
                <ul className="space-y-2">
                  {orderedJobs.map((job) => (
                    <li key={job.id}>
                      <button
                        type="button"
                        onClick={() => openJob(job)}
                        className="flex min-h-[44px] w-full touch-manipulation items-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-left"
                      >
                        <FolderOpen className="h-4 w-4 shrink-0 text-elec-yellow" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14px] font-semibold text-white">
                            {job.title}
                          </span>
                          {(job.job_number || job.location) && (
                            <span className="block truncate text-[12px] text-white">
                              {job.job_number && (
                                <span className="font-semibold tabular-nums">{job.job_number}</span>
                              )}
                              {job.job_number && job.location && ' · '}
                              {job.location}
                            </span>
                          )}
                        </span>
                        {customerId && job.customer_id === customerId && (
                          <span className="shrink-0 rounded-md bg-elec-yellow px-2 py-0.5 text-[10px] font-semibold text-black">
                            This client
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* ── choose photos ────────────────────────────────────────── */}
            {activeJob && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveJob(null)}
                  className="mb-3 min-h-[44px] touch-manipulation text-[13px] font-medium text-elec-yellow"
                >
                  ← All jobs
                </button>

                {loadingPhotos && (
                  <div className="flex items-center gap-2 py-8 text-[14px] text-white">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading photos…
                  </div>
                )}

                {!loadingPhotos && photos.length === 0 && (
                  <p className="py-8 text-center text-[14px] text-white">
                    This job has no photos on it yet.
                  </p>
                )}

                <div className="grid grid-cols-3 gap-2">
                  {photos.map((photo) => {
                    const isSelected = selected.has(photo.id);
                    return (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => toggle(photo.id)}
                        className={cn(
                          'relative aspect-square touch-manipulation overflow-hidden rounded-lg border-2',
                          isSelected ? 'border-elec-yellow' : 'border-white/[0.12]'
                        )}
                      >
                        {photo.signedUrl && (
                          <img
                            src={photo.signedUrl}
                            alt={photo.name ?? 'Job photo'}
                            className="h-full w-full object-cover"
                          />
                        )}
                        {isSelected && (
                          <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-elec-yellow">
                            <Check className="h-3 w-3 text-black" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {activeJob && photos.length > 0 && (
            <div className="border-t border-white/[0.1] px-4 py-3">
              <Button
                type="button"
                onClick={handleImport}
                disabled={selected.size === 0 || importing}
                className="h-11 w-full touch-manipulation bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90"
              >
                {importing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding…
                  </>
                ) : (
                  `Add ${selected.size || ''} photo${selected.size === 1 ? '' : 's'}`.replace(
                    '  ',
                    ' '
                  )
                )}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
