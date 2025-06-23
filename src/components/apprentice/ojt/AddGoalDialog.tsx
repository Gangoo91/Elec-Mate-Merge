
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGoal: (goal: any) => void;
}

const AddGoalDialog = ({ open, onOpenChange, onAddGoal }: AddGoalDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [unit, setUnit] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !targetValue || !unit || !priority || !category || !deadline) return;

    onAddGoal({
      title,
      description,
      targetValue: parseInt(targetValue),
      unit,
      priority,
      category,
      deadline: deadline.toISOString().split('T')[0]
    });

    // Reset form
    setTitle("");
    setDescription("");
    setTargetValue("");
    setUnit("");
    setPriority("");
    setCategory("");
    setDeadline(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Complete Electrical Safety Training"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you want to achieve..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetValue">Target Value</Label>
              <Input
                id="targetValue"
                type="number"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                placeholder="e.g., 100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select value={unit} onValueChange={setUnit} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="items">Items</SelectItem>
                  <SelectItem value="assessments">Assessments</SelectItem>
                  <SelectItem value="certificates">Certificates</SelectItem>
                  <SelectItem value="modules">Modules</SelectItem>
                  <SelectItem value="projects">Projects</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                  <SelectItem value="skill">Skill Development</SelectItem>
                  <SelectItem value="certification">Certification</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? format(deadline, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Goal</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalDialog;
