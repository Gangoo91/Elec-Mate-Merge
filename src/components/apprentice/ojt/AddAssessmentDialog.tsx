
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAssessment: (assessment: any) => void;
}

const AddAssessmentDialog = ({ open, onOpenChange, onAddAssessment }: AddAssessmentDialogProps) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [dueDate, setDueDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !type || !dueDate) return;

    onAddAssessment({
      title,
      type,
      dueDate: dueDate.toISOString().split('T')[0]
    });

    // Reset form
    setTitle("");
    setType("");
    setDueDate(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Assessment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Assessment Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., BS 7671 Knowledge Test"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Assessment Type</Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select assessment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Written">Written</SelectItem>
                <SelectItem value="Practical">Practical</SelectItem>
                <SelectItem value="Oral">Oral</SelectItem>
                <SelectItem value="Portfolio">Portfolio</SelectItem>
                <SelectItem value="Observation">Observation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Assessment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssessmentDialog;
