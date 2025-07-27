import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Lightbulb, Target, Clock, Flag } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGoal: (goal: any) => void;
}

// Smart suggestions based on category
const getSmartSuggestions = (category: string) => {
  const suggestions = {
    training: {
      units: ['hours', 'sessions', 'modules'],
      targets: [20, 40, 80, 120],
      examples: ['Complete Health & Safety Training', 'Electrical Regulations Workshop', 'First Aid Certification']
    },
    portfolio: {
      units: ['items', 'pages', 'evidence'],
      targets: [5, 10, 15, 20],
      examples: ['Document Site Work Experience', 'Create Technical Drawings Portfolio', 'Compile Assessment Evidence']
    },
    assessment: {
      units: ['assessments', 'units', 'exams'],
      targets: [1, 3, 5, 8],
      examples: ['Pass Unit 1 Assessment', 'Complete Practical Evaluation', 'End Point Assessment']
    },
    skill: {
      units: ['hours', 'projects', 'techniques'],
      targets: [30, 60, 100, 150],
      examples: ['Master Cable Installation', 'Develop Fault Finding Skills', 'Learn Motor Control Systems']
    },
    certification: {
      units: ['certificates', 'qualifications', 'awards'],
      targets: [1, 2, 3, 5],
      examples: ['Achieve 18th Edition Certificate', 'Complete City & Guilds Level 3', 'ECS Gold Card Application']
    }
  };
  
  return suggestions[category as keyof typeof suggestions] || suggestions.training;
};

const AddGoalDialog = ({ open, onOpenChange, onAddGoal }: AddGoalDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [unit, setUnit] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState<Date>();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const smartSuggestions = category ? getSmartSuggestions(category) : null;

  // Auto-suggest unit when category changes
  useEffect(() => {
    if (category && smartSuggestions) {
      if (!unit) {
        setUnit(smartSuggestions.units[0]);
      }
      setShowSuggestions(true);
    }
  }, [category]);

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
    setShowSuggestions(false);
  };

  const applySuggestion = (suggestion: string) => {
    setTitle(suggestion);
    setShowSuggestions(false);
  };

  const applyTargetSuggestion = (target: number) => {
    setTargetValue(target.toString());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Add New Goal
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection - First for smart suggestions */}
          <MobileSelect value={category} onValueChange={setCategory}>
            <MobileSelectTrigger label="Goal Category">
              <MobileSelectValue placeholder="Select goal category" />
            </MobileSelectTrigger>
            <MobileSelectContent>
              <MobileSelectItem value="training">
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4" />
                  Training & Learning
                </div>
              </MobileSelectItem>
              <MobileSelectItem value="portfolio">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Portfolio Development
                </div>
              </MobileSelectItem>
              <MobileSelectItem value="assessment">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Assessments & Exams
                </div>
              </MobileSelectItem>
              <MobileSelectItem value="skill">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Skill Development
                </div>
              </MobileSelectItem>
              <MobileSelectItem value="certification">
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4" />
                  Certifications
                </div>
              </MobileSelectItem>
            </MobileSelectContent>
          </MobileSelect>

          {/* Smart Suggestions */}
          {showSuggestions && smartSuggestions && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Lightbulb className="h-4 w-4" />
                Smart Suggestions
              </div>
              
              {/* Title suggestions */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Popular {category} goals:</p>
                <div className="flex flex-wrap gap-2">
                  {smartSuggestions.examples.map((example, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => applySuggestion(example)}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target suggestions */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Common targets:</p>
                <div className="flex flex-wrap gap-2">
                  {smartSuggestions.targets.map((target, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => applyTargetSuggestion(target)}
                      className="text-xs px-2 py-1 bg-secondary/50 text-secondary-foreground rounded-md hover:bg-secondary/70 transition-colors"
                    >
                      {target} {smartSuggestions.units[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Goal Title */}
          <MobileInput
            label="Goal Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Complete Electrical Safety Training"
            hint="Give your goal a clear, descriptive title"
            required
          />

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you want to achieve and how you'll measure success..."
              rows={3}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
              required
            />
            <p className="text-xs text-muted-foreground">Explain your objective and success criteria</p>
          </div>

          {/* Target Value and Unit */}
          <div className="grid grid-cols-2 gap-4">
            <MobileInput
              label="Target Value"
              type="number"
              min="1"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              placeholder="e.g., 100"
              required
            />

            <MobileSelect value={unit} onValueChange={setUnit}>
              <MobileSelectTrigger label="Unit">
                <MobileSelectValue placeholder="Select unit" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {smartSuggestions ? (
                  <>
                    {smartSuggestions.units.map((unitOption) => (
                      <MobileSelectItem key={unitOption} value={unitOption}>
                        {unitOption.charAt(0).toUpperCase() + unitOption.slice(1)}
                      </MobileSelectItem>
                    ))}
                    <div className="border-t border-border my-1" />
                  </>
                ) : null}
                <MobileSelectItem value="hours">Hours</MobileSelectItem>
                <MobileSelectItem value="items">Items</MobileSelectItem>
                <MobileSelectItem value="assessments">Assessments</MobileSelectItem>
                <MobileSelectItem value="certificates">Certificates</MobileSelectItem>
                <MobileSelectItem value="modules">Modules</MobileSelectItem>
                <MobileSelectItem value="projects">Projects</MobileSelectItem>
                <MobileSelectItem value="sessions">Sessions</MobileSelectItem>
                <MobileSelectItem value="evidence">Evidence</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>
          </div>

          {/* Priority */}
          <MobileSelect value={priority} onValueChange={setPriority}>
            <MobileSelectTrigger label="Priority Level">
              <MobileSelectValue placeholder="Select priority" />
            </MobileSelectTrigger>
            <MobileSelectContent>
              <MobileSelectItem value="high">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  High Priority
                </div>
              </MobileSelectItem>
              <MobileSelectItem value="medium">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Medium Priority
                </div>
              </MobileSelectItem>
              <MobileSelectItem value="low">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Low Priority
                </div>
              </MobileSelectItem>
            </MobileSelectContent>
          </MobileSelect>

          {/* Deadline */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Target Deadline</label>
            <Popover>
              <PopoverTrigger asChild>
                <MobileButton
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !deadline && "text-muted-foreground"
                  )}
                  icon={<CalendarIcon className="h-4 w-4" />}
                >
                  {deadline ? format(deadline, "PPP") : "Pick a deadline"}
                </MobileButton>
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
            <p className="text-xs text-muted-foreground">Set a realistic target completion date</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t">
            <MobileButton 
              type="submit" 
              className="w-full"
              icon={<Target className="h-4 w-4" />}
            >
              Create Goal
            </MobileButton>
            <MobileButton 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              Cancel
            </MobileButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalDialog;