import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LayoutTemplate, Plus, MapPin, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCreateJob } from "@/hooks/useJobs";
import { useJobChecklist, useAddChecklistItem } from "@/hooks/useJobChecklists";
import { useJobLabelAssignments, useAssignLabel } from "@/hooks/useJobLabels";
import { toast } from "sonner";
import { useState } from "react";

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
        .from('jobs')
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
        supabase.from('job_checklist_items').select('title').eq('job_id', template.id).order('position'),
        supabase.from('job_label_assignments').select('label_id').eq('job_id', template.id),
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
      
      toast.success("Job created from template");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to create job from template");
    } finally {
      setCreatingFromId(null);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <LayoutTemplate className="h-5 w-5" />
            Job Templates
          </SheetTitle>
        </SheetHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-12">
            <LayoutTemplate className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
            <p className="text-muted-foreground">No templates yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Right-click a job and select "Save as Template"
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {templates.map((template) => (
              <Card key={template.id} className="bg-elec-gray hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-foreground truncate">{template.title}</h4>
                      <p className="text-sm text-muted-foreground">{template.client}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{template.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {template.value && (
                        <Badge variant="secondary" className="text-xs">
                          £{(template.value / 1000).toFixed(0)}k
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        className="gap-1.5"
                        onClick={() => handleCreateFromTemplate(template)}
                        disabled={creatingFromId === template.id}
                      >
                        {creatingFromId === template.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Plus className="h-4 w-4" />
                            Use
                          </>
                        )}
                      </Button>
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
