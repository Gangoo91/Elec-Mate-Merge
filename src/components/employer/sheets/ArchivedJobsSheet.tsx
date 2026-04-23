import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Archive, RotateCcw, Trash2, MapPin, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  SheetShell,
  SecondaryButton,
  DestructiveButton,
  Pill,
  EmptyState,
} from '@/components/employer/editorial';

interface ArchivedJobsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ArchivedJob {
  id: string;
  title: string;
  client: string;
  location: string;
  value: number | null;
  archived_at: string;
}

export function ArchivedJobsSheet({ open, onOpenChange }: ArchivedJobsSheetProps) {
  const queryClient = useQueryClient();

  const { data: archivedJobs = [], isLoading } = useQuery({
    queryKey: ['archived-jobs'],
    queryFn: async (): Promise<ArchivedJob[]> => {
      const { data, error } = await supabase
        .from('employer_jobs')
        .select('id, title, client, location, value, archived_at')
        .not('archived_at', 'is', null)
        .order('archived_at', { ascending: false });

      if (error) throw error;
      return data as ArchivedJob[];
    },
    enabled: open,
  });

  const restoreJob = useMutation({
    mutationFn: async (jobId: string) => {
      const { error } = await supabase
        .from('employer_jobs')
        .update({ archived_at: null, status: 'Pending', updated_at: new Date().toISOString() })
        .eq('id', jobId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archived-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['employer-jobs'] });
      toast.success('Job restored');
    },
    onError: () => {
      toast.error('Failed to restore job');
    },
  });

  const permanentlyDelete = useMutation({
    mutationFn: async (jobId: string) => {
      const { error } = await supabase.from('employer_jobs').delete().eq('id', jobId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archived-jobs'] });
      toast.success('Job permanently deleted');
    },
    onError: () => {
      toast.error('Failed to delete job');
    },
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="Archive"
          title="Archived jobs"
          description="Restore or permanently remove archived jobs."
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          ) : archivedJobs.length === 0 ? (
            <EmptyState
              title="No archived jobs"
              description="Archived jobs will appear here."
            />
          ) : (
            <div className="space-y-3">
              {archivedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-white truncate">{job.title}</h4>
                      <p className="text-sm text-white">{job.client}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-white">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <p className="text-xs text-white mt-2">
                        Archived {format(new Date(job.archived_at), 'd MMM yyyy')}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {job.value && (
                        <Pill tone="yellow">£{(job.value / 1000).toFixed(0)}k</Pill>
                      )}
                      <div className="flex gap-2">
                        <SecondaryButton
                          size="sm"
                          onClick={() => restoreJob.mutate(job.id)}
                          disabled={restoreJob.isPending}
                        >
                          <RotateCcw className="h-3.5 w-3.5 mr-1" />
                          Restore
                        </SecondaryButton>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DestructiveButton size="sm">
                              <Trash2 className="h-3.5 w-3.5" />
                            </DestructiveButton>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Permanently delete?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete "{job.title}". This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => permanentlyDelete.mutate(job.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete forever
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
