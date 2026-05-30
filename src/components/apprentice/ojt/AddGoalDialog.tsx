import { useEffect, useState } from 'react';
import { Lightbulb } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eyebrow } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import { cn } from '@/lib/utils';

interface AddGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAddGoal: (goal: any) => void;
}

const CATEGORIES = [
  { value: 'training', label: 'Training & learning' },
  { value: 'portfolio', label: 'Portfolio development' },
  { value: 'assessment', label: 'Assessments & exams' },
  { value: 'skill', label: 'Skill development' },
  { value: 'certification', label: 'Certifications' },
] as const;

const PRIORITIES = [
  { value: 'high', label: 'High priority', tone: 'bg-red-400' },
  { value: 'medium', label: 'Medium priority', tone: 'bg-elec-yellow' },
  { value: 'low', label: 'Low priority', tone: 'bg-white/40' },
] as const;

const UNITS = ['hours', 'sessions', 'modules', 'items', 'evidence', 'assessments', 'certificates', 'projects'];

const SUGGESTIONS: Record<string, { units: string[]; targets: number[]; examples: string[] }> = {
  training: {
    units: ['hours', 'sessions', 'modules'],
    targets: [20, 40, 80, 120],
    examples: ['Complete Health & Safety training', 'Electrical regulations workshop', 'First aid certification'],
  },
  portfolio: {
    units: ['items', 'pages', 'evidence'],
    targets: [5, 10, 15, 20],
    examples: ['Document site work experience', 'Technical drawings portfolio', 'Compile assessment evidence'],
  },
  assessment: {
    units: ['assessments', 'units', 'exams'],
    targets: [1, 3, 5, 8],
    examples: ['Pass Unit 1 assessment', 'Complete practical evaluation', 'End-point assessment'],
  },
  skill: {
    units: ['hours', 'projects', 'techniques'],
    targets: [30, 60, 100, 150],
    examples: ['Master cable installation', 'Develop fault-finding skills', 'Learn motor control systems'],
  },
  certification: {
    units: ['certificates', 'qualifications', 'awards'],
    targets: [1, 2, 3, 5],
    examples: ['Achieve 18th Edition certificate', 'Complete City & Guilds Level 3', 'ECS Gold Card application'],
  },
};

const todayIso = () => new Date().toISOString().slice(0, 10);

const AddGoalDialog = ({ open, onOpenChange, onAddGoal }: AddGoalDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [unit, setUnit] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');

  const suggestions = category ? SUGGESTIONS[category] : null;

  // Default the unit to the category's first suggested unit.
  useEffect(() => {
    if (suggestions && !unit) setUnit(suggestions.units[0]);
  }, [category]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => {
    setTitle('');
    setDescription('');
    setTargetValue('');
    setUnit('');
    setPriority('');
    setCategory('');
    setDeadline('');
  };

  const valid =
    !!title.trim() &&
    !!description.trim() &&
    !!targetValue &&
    Number(targetValue) > 0 &&
    !!unit &&
    !!priority &&
    !!category &&
    !!deadline;

  const handleSubmit = () => {
    if (!valid) return;
    onAddGoal({
      title: title.trim(),
      description: description.trim(),
      targetValue: parseInt(targetValue, 10),
      unit,
      priority,
      category,
      deadline,
    });
    reset();
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <SheetContent
        side="bottom"
        className="h-[92vh] sm:h-[88vh] rounded-t-3xl bg-[hsl(0_0%_8%)] border-white/[0.06] p-0"
      >
        <div className="w-12 h-1 bg-white/15 rounded-full mx-auto mt-3 mb-2" />
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 sm:px-6 pb-4">
            <SheetTitle className="text-left">
              <Eyebrow>New goal</Eyebrow>
              <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-white mt-1">
                Set a personal target
              </h2>
            </SheetTitle>
            <SheetDescription className="text-left text-[13px] text-white/70 leading-snug">
              Track something measurable alongside your hours — pick a category for suggestions.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-32 space-y-4">
            <div className="space-y-2">
              <Eyebrow>Category</Eyebrow>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {suggestions && (
              <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-3.5 space-y-3">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
                  <Lightbulb className="h-3.5 w-3.5" />
                  Suggestions
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.examples.map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setTitle(ex)}
                      className="text-[11.5px] px-2.5 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/85 hover:bg-white/[0.06] transition-colors touch-manipulation"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.targets.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTargetValue(String(t))}
                      className="text-[11.5px] px-2.5 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/85 hover:bg-white/[0.06] transition-colors touch-manipulation tabular-nums"
                    >
                      {t} {suggestions.units[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Eyebrow>Goal title</Eyebrow>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Complete electrical safety training"
                className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
              />
            </div>

            <div className="space-y-2">
              <Eyebrow>Description</Eyebrow>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What you want to achieve and how you'll measure it."
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg bg-[hsl(0_0%_10%)] border border-white/[0.08] text-[13px] text-white placeholder:text-white/40 leading-snug focus:outline-none focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 touch-manipulation resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-2">
                <Eyebrow>Target</Eyebrow>
                <Input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  placeholder="e.g. 20"
                  className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
                />
              </div>
              <div className="space-y-2">
                <Eyebrow>Unit</Eyebrow>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {(suggestions?.units ?? UNITS).map((u) => (
                      <SelectItem key={u} value={u}>
                        {u.charAt(0).toUpperCase() + u.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Eyebrow>Priority</Eyebrow>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      <span className="inline-flex items-center gap-2">
                        <span className={cn('h-2 w-2 rounded-full', p.tone)} />
                        {p.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Eyebrow>Target deadline</Eyebrow>
              <Input
                type="date"
                min={todayIso()}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white"
              />
            </div>
          </div>

          <div className="px-4 sm:px-6 py-3 border-t border-white/[0.06] bg-[hsl(0_0%_8%)] pb-20 sm:pb-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-12 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)] text-white text-[13px] font-semibold hover:bg-white/[0.04]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!valid}
                className="h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 disabled:opacity-40"
              >
                Create goal
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddGoalDialog;
