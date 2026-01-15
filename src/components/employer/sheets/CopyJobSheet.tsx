import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Loader2 } from "lucide-react";
import { useCreateJob } from "@/hooks/useJobs";
import { useJobChecklist, useAddChecklistItem } from "@/hooks/useJobChecklists";
import { useJobLabelAssignments, useAssignLabel } from "@/hooks/useJobLabels";
import { toast } from "sonner";
import { Job } from "@/services/jobService";

interface CopyJobSheetProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const stages = [
  { id: "Quoted", label: "Quoted", status: "Pending", progress: 0 },
  { id: "Confirmed", label: "Confirmed", status: "On Hold", progress: 0 },
  { id: "Scheduled", label: "Scheduled", status: "Active", progress: 0 },
  { id: "In Progress", label: "In Progress", status: "Active", progress: 25 },
  { id: "Testing", label: "Testing", status: "Active", progress: 90 },
  { id: "Complete", label: "Complete", status: "Completed", progress: 100 },
];

export function CopyJobSheet({ job, open, onOpenChange }: CopyJobSheetProps) {
  const [title, setTitle] = useState("");
  const [targetStage, setTargetStage] = useState("Quoted");
  const [copyLabels, setCopyLabels] = useState(true);
  const [copyChecklist, setCopyChecklist] = useState(true);
  const [copyDescription, setCopyDescription] = useState(true);
  const [isCopying, setIsCopying] = useState(false);
  
  const createJob = useCreateJob();
  const { data: checklistItems = [] } = useJobChecklist(job?.id || "");
  const { data: labelAssignments = [] } = useJobLabelAssignments(job?.id || "");
  const addChecklistItem = useAddChecklistItem();
  const assignLabel = useAssignLabel();

  // Reset form when job changes
  useEffect(() => {
    if (job) {
      setTitle(`Copy of ${job.title}`);
      setTargetStage("Quoted");
    }
  }, [job]);

  const handleCopy = async () => {
    if (!job || !title.trim()) return;
    
    setIsCopying(true);
    const stage = stages.find(s => s.id === targetStage) || stages[0];
    
    try {
      // Create the new job
      const newJob = await createJob.mutateAsync({
        title: title.trim(),
        client: job.client,
        location: job.location,
        lat: job.lat,
        lng: job.lng,
        status: stage.status as any,
        progress: stage.progress,
        value: job.value || 0,
        workers_count: 0,
        start_date: null,
        end_date: null,
        description: copyDescription ? job.description : null,
      });
      
      // Copy labels
      if (copyLabels && labelAssignments.length > 0) {
        for (const assignment of labelAssignments) {
          try {
            await assignLabel.mutateAsync({ 
              jobId: newJob.id, 
              labelId: assignment.label_id 
            });
          } catch (e) {
            console.error("Failed to copy label:", e);
          }
        }
      }
      
      // Copy checklist items
      if (copyChecklist && checklistItems.length > 0) {
        for (const item of checklistItems) {
          try {
            await addChecklistItem.mutateAsync({ 
              jobId: newJob.id, 
              title: item.title 
            });
          } catch (e) {
            console.error("Failed to copy checklist item:", e);
          }
        }
      }
      
      toast.success("Job copied successfully");
      onOpenChange(false);
      setTitle("");
    } catch (error) {
      toast.error("Failed to copy job");
    } finally {
      setIsCopying(false);
    }
  };

  if (!job) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Copy className="h-5 w-5" />
            Copy Job
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">New Job Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`Copy of ${job.title}`}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Target Stage</Label>
            <Select value={targetStage} onValueChange={setTargetStage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {stages.map(stage => (
                  <SelectItem key={stage.id} value={stage.id}>
                    {stage.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label className="text-muted-foreground">Copy Options</Label>
            
            <div className="flex items-center gap-3">
              <Checkbox 
                id="copy-description"
                checked={copyDescription}
                onCheckedChange={(checked) => setCopyDescription(checked as boolean)}
              />
              <label htmlFor="copy-description" className="text-sm cursor-pointer">
                Copy description
              </label>
            </div>
            
            <div className="flex items-center gap-3">
              <Checkbox 
                id="copy-labels"
                checked={copyLabels}
                onCheckedChange={(checked) => setCopyLabels(checked as boolean)}
              />
              <label htmlFor="copy-labels" className="text-sm cursor-pointer">
                Copy labels ({labelAssignments.length})
              </label>
            </div>
            
            <div className="flex items-center gap-3">
              <Checkbox 
                id="copy-checklist"
                checked={copyChecklist}
                onCheckedChange={(checked) => setCopyChecklist(checked as boolean)}
              />
              <label htmlFor="copy-checklist" className="text-sm cursor-pointer">
                Copy checklist items ({checklistItems.length})
              </label>
            </div>
          </div>
          
          <div className="pt-4 flex gap-2">
            <Button
              onClick={handleCopy}
              disabled={!title.trim() || isCopying}
              className="flex-1 gap-2"
            >
              {isCopying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Copying...
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Job
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
