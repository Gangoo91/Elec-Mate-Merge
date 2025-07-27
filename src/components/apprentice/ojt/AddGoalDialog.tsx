
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  ScrollbarFreeSelect,
  ScrollbarFreeSelectContent,
  ScrollbarFreeSelectItem,
  ScrollbarFreeSelectTrigger,
  ScrollbarFreeSelectValue,
} from "@/components/ui/scrollbar-free-select";

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
      <DialogContent className="max-w-md max-h-[95vh] overflow-y-auto bg-elec-gray border-elec-gray/40">
        <DialogHeader className="pb-4 bg-elec-gray">
          <DialogTitle className="text-elec-light text-xl font-semibold">
            Add New Goal
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 bg-elec-gray">
          {/* Goal Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
              Goal Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Complete Electrical Safety Training"
              className="w-full h-12 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
              required
            />
            <p className="text-xs text-elec-light/70 flex items-center gap-1">
              <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
              Give your goal a clear, descriptive title
            </p>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you want to achieve and how you'll measure success..."
              rows={4}
              className="w-full h-32 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium p-4 resize-none"
              required
            />
            <p className="text-xs text-elec-light/70 flex items-center gap-1">
              <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
              Explain your objective and success criteria
            </p>
          </div>

          {/* Target Value and Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Target Value
              </label>
              <input
                type="number"
                min="1"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                placeholder="e.g., 100"
                className="w-full h-12 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
                required
              />
            </div>

            <ScrollbarFreeSelect value={unit} onValueChange={setUnit}>
              <ScrollbarFreeSelectTrigger label="Unit">
                <ScrollbarFreeSelectValue placeholder="Select unit" />
              </ScrollbarFreeSelectTrigger>
              <ScrollbarFreeSelectContent>
                <ScrollbarFreeSelectItem value="hours">Hours</ScrollbarFreeSelectItem>
                <ScrollbarFreeSelectItem value="items">Items</ScrollbarFreeSelectItem>
                <ScrollbarFreeSelectItem value="assessments">Assessments</ScrollbarFreeSelectItem>
                <ScrollbarFreeSelectItem value="certificates">Certificates</ScrollbarFreeSelectItem>
                <ScrollbarFreeSelectItem value="modules">Modules</ScrollbarFreeSelectItem>
                <ScrollbarFreeSelectItem value="projects">Projects</ScrollbarFreeSelectItem>
              </ScrollbarFreeSelectContent>
            </ScrollbarFreeSelect>
          </div>

          {/* Priority and Category */}
          <div className="grid grid-cols-2 gap-4">
            <ScrollbarFreeSelect value={priority} onValueChange={setPriority}>
              <ScrollbarFreeSelectTrigger label="Priority">
                <ScrollbarFreeSelectValue placeholder="Select priority" />
              </ScrollbarFreeSelectTrigger>
              <ScrollbarFreeSelectContent>
                <ScrollbarFreeSelectItem value="high">High</ScrollbarFreeSelectItem>
                <ScrollbarFreeSelectItem value="medium">Medium</ScrollbarFreeSelectItem>
                <ScrollbarFreeSelectItem value="low">Low</ScrollbarFreeSelectItem>
              </ScrollbarFreeSelectContent>
            </ScrollbarFreeSelect>

            <ScrollbarFreeSelect value={category} onValueChange={setCategory}>
              <ScrollbarFreeSelectTrigger label="Category">
                <ScrollbarFreeSelectValue placeholder="Select category" />
              </ScrollbarFreeSelectTrigger>
              <ScrollbarFreeSelectContent>
                <ScrollbarFreeSelectItem value="training">Training</ScrollbarFreeSelectItem>
                <ScrollbarFreeSelectItem value="portfolio">Portfolio</ScrollbarFreeSelectItem>
                <ScrollbarFreeSelectItem value="assessment">Assessment</ScrollbarFreeSelectItem>
                <ScrollbarFreeSelectItem value="skill">Skill Development</ScrollbarFreeSelectItem>
                <ScrollbarFreeSelectItem value="certification">Certification</ScrollbarFreeSelectItem>
              </ScrollbarFreeSelectContent>
            </ScrollbarFreeSelect>
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
              Deadline
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-medium bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 hover:bg-elec-card/80 transition-all duration-200",
                    !deadline && "text-elec-light/60"
                  )}
                >
                  <CalendarIcon className="mr-3 h-4 w-4" />
                  {deadline ? format(deadline, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-elec-card border-elec-gray/50">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  initialFocus
                  className="pointer-events-auto bg-elec-card text-elec-light"
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-elec-light/70 flex items-center gap-1">
              <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
              Set a target completion date for your goal
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t border-elec-gray/20">
            <Button 
              type="submit" 
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/80 font-semibold py-3 rounded-xl transition-all duration-200"
            >
              Add Goal
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
              className="w-full text-elec-light/70 hover:text-elec-light hover:bg-elec-gray/20 font-medium py-3 rounded-xl transition-all duration-200"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalDialog;
