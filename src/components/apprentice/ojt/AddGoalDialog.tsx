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
      <DialogContent className="max-w-md max-h-[95vh] overflow-y-auto bg-elec-gray border-elec-gray/40">
        <DialogHeader className="pb-4 bg-elec-gray">
          <DialogTitle className="text-elec-light text-xl font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Add New Goal
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 bg-elec-gray">
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
            <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-elec-yellow">
                <Lightbulb className="h-4 w-4" />
                Smart Suggestions
              </div>
              
              {/* Title suggestions */}
              <div className="space-y-2">
                <p className="text-xs text-elec-light/70 flex items-center gap-1">
                  <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
                  Popular {category} goals:
                </p>
                <div className="flex flex-wrap gap-2">
                  {smartSuggestions.examples.map((example, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => applySuggestion(example)}
                      className="text-xs px-3 py-2 bg-elec-yellow/20 text-elec-light rounded-lg hover:bg-elec-yellow/30 transition-all duration-200 font-medium"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target suggestions */}
              <div className="space-y-2">
                <p className="text-xs text-elec-light/70 flex items-center gap-1">
                  <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
                  Common targets:
                </p>
                <div className="flex flex-wrap gap-2">
                  {smartSuggestions.targets.map((target, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => applyTargetSuggestion(target)}
                      className="text-xs px-3 py-2 bg-elec-card border border-elec-gray/50 text-elec-light rounded-lg hover:border-elec-yellow/40 transition-all duration-200 font-medium"
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
            <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you want to achieve and how you'll measure success..."
              rows={3}
              className="w-full bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium p-4 resize-none"
              required
            />
            <p className="text-xs text-elec-light/70 flex items-center gap-1">
              <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
              Explain your objective and success criteria
            </p>
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
            <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
              Target Deadline
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "w-full h-12 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 text-base font-medium px-4 flex items-center gap-3 justify-start",
                    !deadline && "text-elec-light/60"
                  )}
                >
                  <CalendarIcon className="h-4 w-4" />
                  {deadline ? format(deadline, "PPP") : "Pick a deadline"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-elec-card border-elec-gray/50">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  initialFocus
                  className="bg-elec-card text-elec-light"
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-elec-light/70 flex items-center gap-1">
              <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
              Set a realistic target completion date
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t border-elec-gray/20">
            <button 
              type="submit" 
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/80 font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Target className="h-4 w-4" />
              Create Goal
            </button>
            <button 
              type="button" 
              onClick={() => onOpenChange(false)}
              className="w-full text-elec-light/70 hover:text-elec-light hover:bg-elec-gray/20 font-medium py-3 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalDialog;