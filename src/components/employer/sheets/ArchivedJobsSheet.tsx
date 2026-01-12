import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Archive, RotateCcw, Trash2, MapPin, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

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
      toast.success("Job restored");
    },
    onError: () => {
      toast.error("Failed to restore job");
    }
  });
  
  const permanentlyDelete = useMutation({
    mutationFn: async (jobId: string) => {
      const { error } = await supabase
        .from('employer_jobs')
        .delete()
        .eq('id', jobId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archived-jobs'] });
      toast.success("Job permanently deleted");
    },
    onError: () => {
      toast.error("Failed to delete job");
    }
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Archived Jobs
          </SheetTitle>
        </SheetHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : archivedJobs.length === 0 ? (
          <div className="text-center py-12">
            <Archive className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
            <p className="text-muted-foreground">No archived jobs</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Archived jobs will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {archivedJobs.map((job) => (
              <Card key={job.id} className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-foreground truncate">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.client}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <p className="text-xs text-muted-foreground/70 mt-2">
                        Archived {format(new Date(job.archived_at), "d MMM yyyy")}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {job.value && (
                        <Badge variant="secondary" className="text-xs">
                          £{(job.value / 1000).toFixed(0)}k
                        </Badge>
                      )}
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-elec-yellow hover:text-elec-yellow hover:bg-elec-yellow/10"
                          onClick={() => restoreJob.mutate(job.id)}
                          disabled={restoreJob.isPending}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Permanently Delete?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete "{job.title}". This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => permanentlyDelete.mutate(job.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete Forever
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
