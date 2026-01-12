import { useState } from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogBody,
  ResponsiveDialogFooter,
} from "@/components/ui/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEmployer, type Employee, type WorkerNote } from "@/contexts/EmployerContext";
import { toast } from "@/hooks/use-toast";
import { StickyNote, MessageSquare, AlertTriangle, ThumbsUp, FileText } from "lucide-react";

interface AddNoteDialogProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const noteTypes: { value: WorkerNote['type']; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'General', label: 'General Note', icon: <FileText className="h-4 w-4" />, color: 'text-muted-foreground' },
  { value: 'Performance', label: 'Performance', icon: <MessageSquare className="h-4 w-4" />, color: 'text-info' },
  { value: 'Incident', label: 'Incident', icon: <AlertTriangle className="h-4 w-4" />, color: 'text-warning' },
  { value: 'Positive', label: 'Positive Feedback', icon: <ThumbsUp className="h-4 w-4" />, color: 'text-success' },
];

export function AddNoteDialog({ employee, open, onOpenChange }: AddNoteDialogProps) {
  const { addWorkerNote } = useEmployer();
  const [content, setContent] = useState("");
  const [noteType, setNoteType] = useState<WorkerNote['type']>('General');

  if (!employee) return null;

  const handleSubmit = () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter a note.",
        variant: "destructive",
      });
      return;
    }

    addWorkerNote(employee.id, content.trim(), noteType, 'Current User');
    
    toast({
      title: "Note Added",
      description: `Note added to ${employee.name}'s profile.`,
    });

    setContent("");
    setNoteType('General');
    onOpenChange(false);
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="sm:max-w-md">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/50 rounded-t-lg" />

        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle className="flex items-center gap-2">
            <StickyNote className="h-5 w-5 text-elec-yellow" />
            Add Note
          </ResponsiveDialogTitle>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center font-bold text-elec-yellow flex-shrink-0">
              {employee.avatar}
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate">{employee.name}</p>
              <p className="text-sm text-muted-foreground">{employee.role}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Note Type</Label>
            <RadioGroup value={noteType} onValueChange={(v) => setNoteType(v as WorkerNote['type'])} className="grid grid-cols-2 gap-2">
              {noteTypes.map((type) => (
                <div key={type.value}>
                  <RadioGroupItem
                    value={type.value}
                    id={type.value}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={type.value}
                    className={`flex items-center gap-2 rounded-lg border-2 p-3 cursor-pointer transition-all touch-manipulation
                      peer-data-[state=checked]:border-elec-yellow peer-data-[state=checked]:bg-elec-yellow/5
                      hover:bg-muted ${type.color}`}
                  >
                    {type.icon}
                    <span className="text-sm font-medium text-foreground">{type.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Note Content</Label>
            <Textarea
              id="content"
              placeholder="Enter your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="resize-none touch-manipulation"
            />
          </div>
        </ResponsiveDialogBody>

        <ResponsiveDialogFooter>
          <Button variant="outline" className="flex-1 h-11 touch-manipulation" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="flex-1 h-11 touch-manipulation" onClick={handleSubmit} disabled={!content.trim()}>
            Add Note
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}