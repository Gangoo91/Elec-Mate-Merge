import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { LayoutTemplate, Plus, MapPin, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useCreateJob } from '@/hooks/useJobs';
import { useAddChecklistItem } from '@/hooks/useJobChecklists';
import { useAssignLabel } from '@/hooks/useJobLabels';
import { toast } from 'sonner';
import { useState } from 'react';
import { SheetShell, PrimaryButton } from './editorial';

interface JobTemplatesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TemplateJob {
  id: string;
  title: string;
  client: string;
  location: string;
  value: number | null;
  description: string | null;
}

export function JobTemplatesSheet({ open, onOpenChange }: JobTemplatesSheetProps) {
  const [creatingFromId, setCreatingFromId] = useState<string | null>(null);
  const createJob = useCreateJob();
  const addChecklistItem = useAddChecklistItem();
  const assignLabel = useAssignLabel();

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['job-templates'],
    queryFn: async (): Promise<TemplateJob[]> => {
      const { data, error } = await supabase
        .from('employer_jobs')
        .select('id, title, client, location, value, description')
        .eq('is_template', true)
        .is('archived_at', null)
        .order('title');

      if (error) throw error;
      return data as TemplateJob[];
    },
    enabled: open,
  });

  const handleCreateFromTemplate = async (template: TemplateJob) => {
    setCreatingFromId(template.id);

    try {
      // Fetch template's checklist items and labels
      const [checklistRes, labelsRes] = await Promise.all([
        supabase
          .from('employer_job_checklist_items')
          .select('title')
          .eq('job_id', template.id)
          .order('position'),
        supabase
          .from('employer_job_label_assignments')
          .select('label_id')
          .eq('job_id', template.id),
      ]);

      // Create new job from template
      const newJob = await createJob.mutateAsync({
        title: `New ${template.title}`,
        client: template.client,
        location: template.location,
        lat: null,
        lng: null,
        status: 'Pending',
        progress: 0,
        value: template.value || 0,
        workers_count: 0,
        start_date: null,
        end_date: null,
        description: template.description,
      });

      // Copy checklist items
      if (checklistRes.data) {
        for (const item of checklistRes.data) {
          await addChecklistItem.mutateAsync({ jobId: newJob.id, title: item.title });
        }
      }

      // Copy labels
      if (labelsRes.data) {
        for (const assignment of labelsRes.data) {
          await assignLabel.mutateAsync({ jobId: newJob.id, labelId: assignment.label_id });
        }
      }

      toast.success('Job created from template');
      onOpenChange(false);
    } catch {
      toast.error('Failed to create job from template');
    } finally {
      setCreatingFromId(null);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden"
      >
        <SheetShell
          eyebrow="Templates"
          title="Job Templates"
          description="Pick a template to scaffold a new job"
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-12">
              <LayoutTemplate className="h-12 w-12 mx-auto mb-3 text-white" />
              <p className="text-white">No templates yet</p>
              <p className="text-sm text-white mt-1">
                Right-click a job and select "Save as Template"
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4 hover:bg-[hsl(0_0%_15%)] transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-white truncate">{template.title}</h4>
                      <p className="text-sm text-white">{template.client}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-white">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{template.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {template.value && (
                        <Badge variant="secondary" className="text-xs bg-white/[0.06] text-white">
                          £{(template.value / 1000).toFixed(0)}k
                        </Badge>
                      )}
                      <PrimaryButton
                        size="sm"
                        onClick={() => handleCreateFromTemplate(template)}
                        disabled={creatingFromId === template.id}
                      >
                        {creatingFromId === template.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-1.5" />
                            Use
                          </>
                        )}
                      </PrimaryButton>
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
